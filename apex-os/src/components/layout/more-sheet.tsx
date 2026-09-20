import { useNavigate } from 'react-router-dom';
import { Dumbbell, GraduationCap, CheckSquare, LogOut, HelpCircle, type LucideIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { StreakReminderRow } from '@/components/shared/streak-reminder-toggle';
import { useUIStore } from '@/store/ui-store';
import { useSyncStore } from '@/store/sync-store';
import { cn } from '@/lib/utils';
import { useAuth } from './auth-provider';

const DESTINATIONS: Array<{ name: string; path: string; icon: LucideIcon; tint: string; fg: string }> = [
  { name: 'Fitness', path: '/fitness', icon: Dumbbell, tint: 'bg-violet-500/[0.16]', fg: 'text-violet-400' },
  { name: 'CFA', path: '/cfa', icon: GraduationCap, tint: 'bg-primary/[0.16]', fg: 'text-blue-400' },
  { name: 'Tasks', path: '/tasks', icon: CheckSquare, tint: 'bg-success/[0.16]', fg: 'text-green-400' },
];

const SYNC_LABEL = { synced: 'Live synced', syncing: 'Syncing…', offline: 'Offline', error: 'Sync error' } as const;
const SYNC_DOT = { synced: 'bg-success', syncing: 'bg-warning', offline: 'bg-danger', error: 'bg-danger' } as const;

/** The 5th tab: everything that doesn't have its own tab, plus account controls. */
export function MoreSheet() {
  const open = useUIStore((s) => s.moreSheetOpen);
  const setOpen = useUIStore((s) => s.setMoreSheetOpen);
  const setHelp = useUIStore((s) => s.setHelpModalOpen);
  const status = useSyncStore((s) => s.syncStatus);
  const pending = useSyncStore((s) => s.pendingChanges);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const go = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="gap-4 md:hidden">
        <DialogTitle className="text-center text-[17px]">More</DialogTitle>
        <DialogDescription className="sr-only">Other sections, reminders and account.</DialogDescription>

        <div className="grid grid-cols-3 gap-3">
          {DESTINATIONS.map(({ name, path, icon: Icon, tint, fg }) => (
            <button
              key={name}
              type="button"
              onClick={() => go(path)}
              className="tap flex min-h-[88px] flex-col items-center justify-center gap-2 rounded-[18px] border border-line-strong bg-surface-2 p-3 transition-colors hover:bg-surface-3"
            >
              <span className={cn('grid h-[34px] w-[34px] place-items-center rounded-[10px]', tint)}>
                <Icon className={cn('h-[18px] w-[18px]', fg)} aria-hidden />
              </span>
              <span className="text-[13px] font-bold">{name}</span>
            </button>
          ))}
        </div>

        <StreakReminderRow />

        <div className="flex items-center justify-between rounded-2xl border border-line bg-surface-2 px-4 py-3" role="status">
          <span className="text-sm font-bold">Sync</span>
          <span className="flex items-center gap-2 text-[13px] font-semibold text-fg-muted">
            <span className={cn('h-2 w-2 rounded-full', SYNC_DOT[status])} />
            {SYNC_LABEL[status]}
            {pending > 0 && <span className="font-mono text-amber-400">· {pending} queued</span>}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              setHelp(true);
            }}
            className="tap flex h-12 items-center justify-center gap-2 rounded-2xl bg-white/[0.03] text-[13px] font-semibold text-fg-muted"
          >
            <HelpCircle className="h-4 w-4" aria-hidden /> Help
          </button>
          <button
            type="button"
            onClick={async () => {
              setOpen(false);
              await signOut();
              navigate('/login');
            }}
            className="tap flex h-12 items-center justify-center gap-2 rounded-2xl border border-danger/25 bg-danger/[0.12] text-[13px] font-bold text-red-400"
          >
            <LogOut className="h-4 w-4" aria-hidden /> Sign out
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
