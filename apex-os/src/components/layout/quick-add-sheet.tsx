import { CheckSquare, Wallet, CalendarClock, Mic, Dumbbell, Utensils, type LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/ui-store';

interface Tile {
  label: string;
  icon: LucideIcon;
  tint: string;
  fg: string;
  badge?: string;
  onSelect: () => void;
}

/**
 * The "Quick add" chooser: a one-thumb bottom sheet on phones, a compact dialog
 * on desktop. Four large targets, then a couple of context shortcuts.
 */
export function QuickAddSheet() {
  const open = useUIStore((s) => s.quickAddSheetOpen);
  const close = useUIStore((s) => s.closeQuickAddSheet);
  const openQuickAdd = useUIStore((s) => s.openQuickAdd);
  const setVoiceLogOpen = useUIStore((s) => s.setVoiceLogOpen);
  const navigate = useNavigate();

  const go = (path: string) => {
    close();
    navigate(path);
  };

  const tiles: Tile[] = [
    { label: 'Task', icon: CheckSquare, tint: 'bg-primary/[0.16]', fg: 'text-blue-400', onSelect: () => openQuickAdd('task') },
    { label: 'Expense', icon: Wallet, tint: 'bg-success/[0.16]', fg: 'text-green-400', onSelect: () => openQuickAdd('transaction') },
    { label: 'Schedule block', icon: CalendarClock, tint: 'bg-danger/[0.16]', fg: 'text-red-400', onSelect: () => openQuickAdd('block') },
    { label: 'Voice log', icon: Mic, tint: 'bg-violet-500/[0.16]', fg: 'text-violet-400', badge: 'NEW', onSelect: () => setVoiceLogOpen(true) },
  ];

  return (
    <Dialog open={open} onOpenChange={(o) => !o && close()}>
      <DialogContent className="gap-[18px] sm:max-w-sm">
        <DialogTitle className="text-center text-[17px]">Quick add</DialogTitle>
        <DialogDescription className="sr-only">Choose what you want to add.</DialogDescription>

        <div className="grid grid-cols-2 gap-3">
          {tiles.map(({ label, icon: Icon, tint, fg, badge, onSelect }) => (
            <button
              key={label}
              type="button"
              onClick={onSelect}
              className="tap flex min-h-[96px] flex-col items-start gap-2.5 rounded-[18px] border border-line-strong bg-surface-2 p-[18px] text-left transition-colors hover:bg-surface-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className={cn('grid h-[34px] w-[34px] place-items-center rounded-[10px]', tint)}>
                <Icon className={cn('h-[18px] w-[18px]', fg)} aria-hidden />
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="text-[13px] font-bold">{label}</span>
                {badge && <span className="font-mono text-[11px] font-bold text-violet-400">{badge}</span>}
              </span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => go('/fitness/log')}
            className="tap flex h-11 items-center justify-center gap-2 rounded-xl bg-white/[0.03] text-[13px] font-semibold text-fg-muted transition-colors hover:bg-white/[0.06] hover:text-foreground"
          >
            <Dumbbell className="h-4 w-4" aria-hidden /> Log workout
          </button>
          <button
            type="button"
            onClick={() => go('/fitness/food-log')}
            className="tap flex h-11 items-center justify-center gap-2 rounded-xl bg-white/[0.03] text-[13px] font-semibold text-fg-muted transition-colors hover:bg-white/[0.06] hover:text-foreground"
          >
            <Utensils className="h-4 w-4" aria-hidden /> Log food
          </button>
        </div>

        <button
          type="button"
          onClick={close}
          className="tap h-12 rounded-2xl bg-white/[0.03] text-[13px] font-semibold text-fg-muted transition-colors hover:bg-white/[0.06]"
        >
          Cancel
        </button>
      </DialogContent>
    </Dialog>
  );
}
