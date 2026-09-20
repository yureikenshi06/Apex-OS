import { useEffect } from 'react';
import { Keyboard } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { useUIStore } from '@/store/ui-store';

const shortcuts = [
  { key: '⌘K / Ctrl+K', description: 'Command palette (search + run commands)' },
  { key: 'n', description: 'New task' },
  { key: 'g h', description: 'Go to Home' },
  { key: 'g t', description: 'Go to Timetable' },
  { key: 'g f', description: 'Go to Finance' },
  { key: 'g w', description: 'Go to Fitness' },
  { key: 'g c', description: 'Go to CFA' },
  { key: '?', description: 'This help' },
  { key: 'Esc', description: 'Close modal / palette' },
];

export function HelpModal() {
  const open = useUIStore((s) => s.helpModalOpen);
  const setOpen = useUIStore((s) => s.setHelpModalOpen);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName) || el.isContentEditable) return;
      if (e.key === '?') {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [setOpen]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-[10px] bg-white/[0.05] text-fg-muted">
            <Keyboard className="h-[18px] w-[18px]" aria-hidden />
          </div>
          <div>
            <DialogTitle>Keyboard shortcuts</DialogTitle>
            <DialogDescription className="sr-only">Available keyboard shortcuts.</DialogDescription>
          </div>
        </div>

        <div className="divide-y divide-line">
          {shortcuts.map((s) => (
            <div key={s.key} className="flex items-center justify-between gap-4 py-2.5">
              <span className="text-sm text-fg-muted">{s.description}</span>
              <span className="flex shrink-0 items-center gap-1">
                {s.key.split(' ').map((k, j) => (
                  <kbd key={j} className="rounded-md border border-line-strong bg-surface-2 px-2 py-1 font-mono text-[11px] font-semibold text-foreground">
                    {k}
                  </kbd>
                ))}
              </span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
