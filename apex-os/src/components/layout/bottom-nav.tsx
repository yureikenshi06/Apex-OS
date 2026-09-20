import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, Wallet, Menu, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/ui-store';

const tabClass = (active: boolean) =>
  cn(
    'tap flex min-h-[56px] flex-col items-center justify-end gap-1 pb-1 pt-1.5 text-[11px] leading-none transition-colors',
    active ? 'font-bold text-blue-400' : 'font-semibold text-fg-subtle'
  );

/**
 * Phones only: 4 tabs + a centred FAB. Every target is ≥ 44px, the bar pads for
 * the home indicator (safe-area), and the FAB owns the centre cell so it can
 * never overlap a tab.
 */
export function BottomNav() {
  const openQuickAddSheet = useUIStore((s) => s.openQuickAddSheet);
  const setMoreSheetOpen = useUIStore((s) => s.setMoreSheetOpen);
  const { pathname } = useLocation();

  // "More" is active on any screen that has no tab of its own
  const onMore = !/^\/(home|timetable|finance)/.test(pathname);

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line/70 bg-void/95 pb-[max(10px,env(safe-area-inset-bottom))] md:hidden"
    >
      {/* soft fade so scrolling content doesn't butt against the bar */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-full h-6 bg-gradient-to-t from-void to-transparent" />

      <div className="grid grid-cols-5 items-end px-2 pt-1">
        <NavLink to="/home" className={({ isActive }) => tabClass(isActive)}>
          {({ isActive }) => (
            <>
              <LayoutDashboard className="h-[22px] w-[22px]" strokeWidth={isActive ? 2.4 : 1.9} aria-hidden />
              Home
            </>
          )}
        </NavLink>

        <NavLink to="/timetable" className={({ isActive }) => tabClass(isActive)}>
          {({ isActive }) => (
            <>
              <CalendarDays className="h-[22px] w-[22px]" strokeWidth={isActive ? 2.4 : 1.9} aria-hidden />
              Plan
            </>
          )}
        </NavLink>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={openQuickAddSheet}
            aria-label="Quick add"
            className="tap -mt-[22px] grid h-[52px] w-[52px] place-items-center rounded-full border-4 border-void text-white shadow-[0_8px_20px_-4px_rgb(59_110_246_/_0.55)]"
            style={{ background: 'linear-gradient(135deg, #3B6EF6, #2952C8)' }}
          >
            <Plus className="h-6 w-6" strokeWidth={2.6} aria-hidden />
          </button>
        </div>

        <NavLink to="/finance" className={({ isActive }) => tabClass(isActive)}>
          {({ isActive }) => (
            <>
              <Wallet className="h-[22px] w-[22px]" strokeWidth={isActive ? 2.4 : 1.9} aria-hidden />
              Money
            </>
          )}
        </NavLink>

        <button type="button" onClick={() => setMoreSheetOpen(true)} className={tabClass(onMore)} aria-haspopup="dialog">
          <Menu className="h-[22px] w-[22px]" strokeWidth={onMore ? 2.4 : 1.9} aria-hidden />
          More
        </button>
      </div>
    </nav>
  );
}
