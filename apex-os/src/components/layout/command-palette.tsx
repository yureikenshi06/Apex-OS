import { useEffect, useMemo, useState } from 'react';
import { Command } from 'cmdk';
import { useNavigate } from 'react-router-dom';
import {
  Search, Home, Calendar, Wallet, Dumbbell, BookOpen, CheckSquare, Plus, Flame,
  Mic, Sparkles, Zap, CalendarCheck, type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/ui-store';
import { useQuickActions } from '@/hooks/use-quick-actions';
import { describeParsed } from '@/lib/quick-parse';

interface Entry {
  label: string;
  icon: LucideIcon;
  tint: string;
  hint?: string;
  keywords?: string;
  run: () => void;
}

/**
 * ⌘K on desktop, the search button on phones. It navigates, and — new — it
 * executes: type "add task: finish LOS 12" or "log expense 340 dining" and the
 * first result runs it directly.
 */
export function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const openQuickAdd = useUIStore((s) => s.openQuickAdd);
  const setVoiceLogOpen = useUIStore((s) => s.setVoiceLogOpen);
  const { parse, run } = useQuickActions();

  // Reset the query each time the palette opens
  useEffect(() => {
    if (isOpen) setSearch('');
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const parsed = useMemo(() => (search.trim() ? parse(search) : null), [search, parse]);
  const parsedInfo = parsed ? describeParsed(parsed) : null;

  const exec = (fn: () => void) => {
    onClose();
    fn();
  };

  const actions: Entry[] = [
    { label: 'New task', icon: Plus, tint: 'text-blue-400', hint: 'n', run: () => openQuickAdd('task') },
    { label: 'New transaction', icon: Wallet, tint: 'text-green-400', run: () => openQuickAdd('transaction') },
    { label: 'New timetable block', icon: Calendar, tint: 'text-red-400', run: () => openQuickAdd('block') },
    { label: 'Voice log', icon: Mic, tint: 'text-violet-400', keywords: 'speak dictate', run: () => setVoiceLogOpen(true) },
    { label: 'Log workout', icon: Dumbbell, tint: 'text-violet-400', run: () => navigate('/fitness/log') },
    { label: 'Log food / nutrition', icon: Flame, tint: 'text-amber-400', run: () => navigate('/fitness/food-log') },
    { label: 'Weekly digest', icon: CalendarCheck, tint: 'text-blue-400', keywords: 'summary review week', run: () => navigate('/home?digest=1') },
  ];

  const nav: Entry[] = [
    { label: 'Home dashboard', icon: Home, tint: 'text-blue-400', hint: 'g h', run: () => navigate('/home') },
    { label: 'Master timetable', icon: Calendar, tint: 'text-blue-400', hint: 'g t', run: () => navigate('/timetable') },
    { label: 'Daily planner', icon: Calendar, tint: 'text-fg-muted', run: () => navigate('/timetable/daily') },
    { label: 'Habit tracker', icon: Flame, tint: 'text-amber-400', run: () => navigate('/timetable/habits') },
    { label: 'Finance', icon: Wallet, tint: 'text-green-400', hint: 'g f', run: () => navigate('/finance') },
    { label: 'Fitness', icon: Dumbbell, tint: 'text-violet-400', hint: 'g w', run: () => navigate('/fitness') },
    { label: 'CFA Level I tracker', icon: BookOpen, tint: 'text-blue-400', hint: 'g c', run: () => navigate('/cfa') },
    { label: 'Tasks', icon: CheckSquare, tint: 'text-green-400', run: () => navigate('/tasks') },
  ];

  const item = (e: Entry) => (
    <Command.Item
      key={e.label}
      value={`${e.label} ${e.keywords ?? ''}`}
      onSelect={() => exec(e.run)}
      className={itemClass}
    >
      <e.icon className={cn('mr-3 h-4 w-4 shrink-0', e.tint)} aria-hidden />
      <span className="truncate">{e.label}</span>
      {e.hint && (
        <kbd className="ml-auto hidden rounded-[5px] bg-surface-3 px-1.5 py-0.5 font-mono text-[11px] text-fg-subtle md:inline">
          {e.hint}
        </kbd>
      )}
    </Command.Item>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[max(1rem,env(safe-area-inset-top))] md:pt-24">
      <div className="animate-fade fixed inset-0 bg-black/70 md:backdrop-blur-[2px]" onClick={onClose} aria-hidden />
      <div className="animate-enter relative z-10 w-full max-w-xl overflow-hidden rounded-[20px] border border-line-strong bg-surface-2 shadow-2xl shadow-black/60">
        <Command
          label="Command palette"
          shouldFilter
          filter={(value, q) => {
            if (value.startsWith('__action')) return 1; // the parsed action is always relevant
            return value.toLowerCase().includes(q.toLowerCase()) ? 1 : 0;
          }}
        >
          <div className="flex items-center border-b border-line px-4">
            <Search className="mr-3 h-4 w-4 shrink-0 text-blue-400" aria-hidden />
            <Command.Input
              value={search}
              onValueChange={setSearch}
              placeholder="Search, or type “log expense 340 dining”…"
              className="h-14 w-full border-0 bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-fg-subtle"
              autoFocus
            />
          </div>

          <Command.List className="max-h-[60dvh] overflow-y-auto overscroll-contain p-2">
            <Command.Empty className="py-10 text-center text-sm text-fg-subtle">No matching results.</Command.Empty>

            {parsed && parsedInfo && (
              <Command.Group heading="Run this" className={groupClass}>
                <Command.Item
                  value={`__action ${search}`}
                  onSelect={() => exec(() => void run(parsed))}
                  className={cn(itemClass, 'border border-primary/25 bg-primary/[0.08]')}
                >
                  <Zap className="mr-3 h-4 w-4 shrink-0 text-blue-400" aria-hidden />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-mono text-[13px] font-semibold">{parsedInfo.title}</span>
                    <span className="block text-xs text-fg-muted">{parsedInfo.detail}</span>
                  </span>
                  <kbd className="ml-2 hidden rounded-[5px] bg-surface-3 px-1.5 py-0.5 font-mono text-[11px] text-fg-subtle md:inline">↵</kbd>
                </Command.Item>
              </Command.Group>
            )}

            <Command.Group heading="Quick actions" className={groupClass}>
              {actions.map(item)}
            </Command.Group>
            <Command.Group heading="Go to" className={groupClass}>
              {nav.map(item)}
            </Command.Group>
          </Command.List>

          <div className="hidden items-center gap-1.5 border-t border-line px-4 py-2.5 text-[11px] text-fg-subtle md:flex">
            <Sparkles className="h-3 w-3" aria-hidden />
            Try “add task: finish LOS 12 tomorrow”, “spent 340 on dining”, or “did my workout”.
          </div>
        </Command>
      </div>
    </div>
  );
}

const groupClass =
  'mb-1 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:text-fg-subtle';

const itemClass = cn(
  'tap flex min-h-[44px] cursor-pointer items-center rounded-xl px-3 py-2 text-sm font-semibold text-fg-muted transition-colors md:min-h-[40px]',
  'aria-selected:bg-white/[0.06] aria-selected:text-foreground'
);
