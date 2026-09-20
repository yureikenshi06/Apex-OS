import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Mic, Square, Check, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useUIStore } from '@/store/ui-store';
import { useQuickActions } from '@/hooks/use-quick-actions';
import { describeParsed } from '@/lib/quick-parse';
import { cn } from '@/lib/utils';

// The Web Speech API is prefixed in Chromium/Safari and missing in Firefox.
type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((e: any) => void) | null;
  onerror: ((e: any) => void) | null;
  onend: (() => void) | null;
};
const getRecognition = (): (new () => SpeechRecognitionLike) | null => {
  if (typeof window === 'undefined') return null;
  const w = window as any;
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
};

const EXAMPLES = ['spent 340 on coffee', 'add task finish LOS 12 tomorrow', 'did my workout'];

/**
 * Speak (or type) an expense, task or workout. The utterance is parsed
 * on-device, previewed, and only written after the user confirms.
 */
export function VoiceLogDialog() {
  const open = useUIStore((s) => s.voiceLogOpen);
  const setOpen = useUIStore((s) => s.setVoiceLogOpen);
  const { parse, run, isSaving } = useQuickActions();

  const Recognition = useMemo(getRecognition, []);
  const recRef = useRef<SpeechRecognitionLike | null>(null);
  const [listening, setListening] = useState(false);
  const [text, setText] = useState('');

  const parsed = useMemo(() => (text.trim() ? parse(text) : null), [text, parse]);
  const preview = parsed ? describeParsed(parsed) : null;

  const stop = useCallback(() => {
    recRef.current?.abort();
    recRef.current = null;
    setListening(false);
  }, []);

  // Reset + release the mic whenever the dialog closes
  useEffect(() => {
    if (!open) {
      stop();
      setText('');
    }
    return stop;
  }, [open, stop]);

  const start = () => {
    if (!Recognition) return;
    const rec = new Recognition();
    rec.lang = 'en-IN';
    rec.continuous = false;
    rec.interimResults = true;
    rec.onresult = (e: any) => {
      let transcript = '';
      for (let i = 0; i < e.results.length; i++) transcript += e.results[i][0].transcript;
      setText(transcript);
    };
    rec.onerror = (e: any) => {
      setListening(false);
      if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
        toast.error('Microphone access is blocked', { description: 'Allow it in your browser settings, or type instead.' });
      } else if (e.error !== 'aborted' && e.error !== 'no-speech') {
        toast.error('Couldn’t hear that', { description: 'Try again, or type it below.' });
      }
    };
    rec.onend = () => setListening(false);
    recRef.current = rec;
    setText('');
    try {
      rec.start();
      setListening(true);
    } catch {
      setListening(false);
    }
  };

  const save = async () => {
    if (!parsed) return;
    if (await run(parsed)) setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="gap-4 sm:max-w-md">
        <div className="space-y-1">
          <DialogTitle>Voice log</DialogTitle>
          <DialogDescription>Say or type an expense, a task, or a finished workout.</DialogDescription>
        </div>

        {Recognition && (
          <div className="flex flex-col items-center gap-3 py-2">
            <button
              type="button"
              onClick={listening ? stop : start}
              aria-pressed={listening}
              aria-label={listening ? 'Stop listening' : 'Start listening'}
              className={cn(
                'tap relative grid h-[72px] w-[72px] place-items-center rounded-full text-white transition-colors',
                listening ? 'bg-danger' : 'bg-violet-500'
              )}
            >
              {listening && <span aria-hidden className="animate-mic absolute inset-0 rounded-full bg-danger" />}
              {listening ? <Square className="relative h-6 w-6 fill-current" /> : <Mic className="relative h-7 w-7" />}
            </button>
            <p className="text-xs font-semibold text-fg-muted" role="status" aria-live="polite">
              {listening ? 'Listening…' : 'Tap the mic and speak'}
            </p>
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="voice-text" className="text-xs font-semibold text-fg-muted">
            {Recognition ? 'What I heard (you can edit it)' : 'Type or use your keyboard’s mic'}
          </label>
          <textarea
            id="voice-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={2}
            placeholder={`e.g. “${EXAMPLES[0]}”`}
            className="flex min-h-[72px] w-full resize-none rounded-xl border border-line-strong bg-surface-2 px-3.5 py-2.5 text-sm text-foreground placeholder:text-fg-subtle focus-visible:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          />
        </div>

        {preview ? (
          <div className="animate-enter flex items-center gap-3 rounded-2xl border border-success/25 bg-success/[0.08] p-3.5" role="status">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px] bg-success/[0.18]">
              <Check className="h-4 w-4 text-green-400" aria-hidden />
            </span>
            <div className="min-w-0">
              <div className="truncate font-mono text-sm font-semibold">{preview.title}</div>
              <div className="text-xs text-fg-muted">{preview.detail}</div>
            </div>
          </div>
        ) : text.trim() ? (
          <p className="text-xs text-fg-subtle">
            I couldn’t find an action in that. Try: {EXAMPLES.map((e) => `“${e}”`).join(' · ')}
          </p>
        ) : (
          <p className="text-xs text-fg-subtle">
            Try: {EXAMPLES.map((e) => `“${e}”`).join(' · ')}
          </p>
        )}

        <div className="grid grid-cols-2 gap-3">
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={save} disabled={!parsed || isSaving}>
            {isSaving ? <Loader2 className="animate-spin" /> : null}
            Save
          </Button>
        </div>

        {Recognition && (
          <p className="text-center text-[11px] text-fg-subtle">
            Speech-to-text is provided by your browser. Parsing happens on this device.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
