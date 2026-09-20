import { Search, Plus, LogOut } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useAuth } from './auth-provider';
import { useUIStore } from '@/store/ui-store';
import { greetingFor, useDisplayName } from '@/modules/home/insights';
import { StreakReminderButton } from '@/components/shared/streak-reminder-toggle';

const TITLES: Record<string, string> = {
  home: 'Home',
  timetable: 'Timetable',
  finance: 'Finance',
  fitness: 'Fitness',
  cfa: 'CFA',
  tasks: 'Tasks',
  settings: 'Settings',
};

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const name = useDisplayName();
  const setCommandPaletteOpen = useUIStore((s) => s.setCommandPaletteOpen);
  const openQuickAddSheet = useUIStore((s) => s.openQuickAddSheet);

  const first = location.pathname.split('/').filter(Boolean)[0] || 'home';
  const title = TITLES[first] ?? first.charAt(0).toUpperCase() + first.slice(1);
  const isHome = first === 'home';

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (e) {
      console.error('Failed to sign out', e);
    }
  };

  return (
    <header className="pt-safe sticky top-0 z-30 shrink-0 border-b border-line/70 bg-void/90 md:bg-void/80">
      <div className="flex h-16 items-center justify-between gap-3 px-5 md:px-7">
        {/* Phone: greeting on Home, page title elsewhere. Desktop: always the page title. */}
        <div className="min-w-0">
          {isHome && (
            <div className="md:hidden">
              <div className="font-mono text-[11px] font-semibold text-fg-subtle">{format(new Date(), 'EEE d MMM')}</div>
              <h1 className="mt-px truncate text-[19px] font-extrabold leading-tight tracking-tight">
                {greetingFor()}, {name}
              </h1>
            </div>
          )}
          <h1 className={isHome ? 'hidden text-base font-extrabold md:block' : 'truncate text-[19px] font-extrabold tracking-tight md:text-base'}>
            {title}
          </h1>
        </div>

        {/* Desktop search / command palette */}
        <button
          type="button"
          onClick={() => setCommandPaletteOpen(true)}
          className="tap hidden h-[38px] max-w-[420px] flex-1 items-center gap-2 rounded-[11px] border border-line bg-surface-1 px-3.5 text-left text-[13px] text-fg-subtle transition-colors hover:border-line-strong md:flex"
          aria-label="Search or jump to"
        >
          <Search className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span className="flex-1 truncate">Search, jump to, or type “log expense 340 dining”…</span>
          <kbd className="rounded-[5px] bg-surface-2 px-1.5 py-0.5 font-mono text-[11px] text-fg-subtle">⌘K</kbd>
        </button>

        <div className="flex shrink-0 items-center gap-2">
          {/* Phone: search opens the same command palette */}
          <button
            type="button"
            onClick={() => setCommandPaletteOpen(true)}
            aria-label="Search or run a command"
            className="tap grid h-[38px] w-[38px] place-items-center rounded-xl border border-line-strong bg-surface-2 text-fg-muted md:hidden"
          >
            <Search className="h-4 w-4" />
          </button>

          <StreakReminderButton className="hidden md:grid" />

          <button
            type="button"
            onClick={openQuickAddSheet}
            className="tap hidden h-9 items-center gap-1.5 rounded-[10px] bg-primary px-3.5 text-[13px] font-bold text-white transition-colors hover:bg-primary/90 md:inline-flex"
          >
            <Plus className="h-4 w-4" strokeWidth={2.5} aria-hidden />
            Quick add
          </button>

          <button
            type="button"
            onClick={handleSignOut}
            title="Sign out"
            aria-label="Sign out"
            className="tap hidden h-9 w-9 place-items-center rounded-[10px] border border-line-strong bg-surface-2 text-fg-muted transition-colors hover:text-red-400 md:grid"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
