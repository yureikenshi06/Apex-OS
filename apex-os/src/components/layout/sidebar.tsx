import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Wallet,
  Dumbbell,
  GraduationCap,
  CheckSquare,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/ui-store';
import { useSyncStore } from '@/store/sync-store';
import { Logo } from '@/components/shared/logo';
import { useAuth } from './auth-provider';

export const NAV_ITEMS = [
  { name: 'Home', path: '/home', icon: LayoutDashboard },
  { name: 'Timetable', path: '/timetable', icon: Calendar },
  { name: 'Finance', path: '/finance', icon: Wallet },
  { name: 'Fitness', path: '/fitness', icon: Dumbbell },
  { name: 'CFA', path: '/cfa', icon: GraduationCap },
  { name: 'Tasks', path: '/tasks', icon: CheckSquare },
];

const SYNC_COPY = {
  synced: { label: 'Live synced', dot: 'bg-success' },
  syncing: { label: 'Syncing…', dot: 'bg-warning animate-pulse' },
  offline: { label: 'Offline', dot: 'bg-danger' },
  error: { label: 'Sync error', dot: 'bg-danger' },
} as const;

export function Sidebar() {
  const collapsed = useUIStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const syncStatus = useSyncStore((s) => s.syncStatus);
  const pending = useSyncStore((s) => s.pendingChanges);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const sync = SYNC_COPY[syncStatus];

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (e) {
      console.error('Logout error:', e);
    }
  };

  return (
    <aside
      style={{ width: collapsed ? 72 : 216 }}
      className="sticky top-0 z-40 hidden h-dvh shrink-0 select-none flex-col overflow-hidden border-r border-line/70 bg-void/80 transition-[width] duration-200 ease-out md:flex"
    >
      {/* Brand */}
      <div
        className={cn(
          'flex h-16 shrink-0 items-center border-b border-line/70',
          collapsed ? 'justify-center' : 'gap-2.5 px-5'
        )}
      >
        <Logo />
        {!collapsed && <span className="text-[15px] font-extrabold tracking-tight">Apex OS</span>}
      </div>

      {/* Navigation */}
      <nav aria-label="Primary" className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-4">
        {NAV_ITEMS.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={name}
            to={path}
            title={collapsed ? name : undefined}
            aria-label={collapsed ? name : undefined}
            className={({ isActive }) =>
              cn(
                'tap flex items-center rounded-[11px] border text-[13px] transition-colors duration-150',
                collapsed ? 'mx-auto h-11 w-11 justify-center' : 'gap-3 px-3 py-2.5',
                isActive
                  ? 'border-primary/25 bg-primary/[0.12] font-bold text-blue-400'
                  : 'border-transparent font-semibold text-fg-muted hover:bg-white/[0.04] hover:text-foreground'
              )
            }
          >
            <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden />
            {!collapsed && <span className="truncate">{name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="shrink-0 space-y-1 border-t border-line/70 p-3">
        <button
          type="button"
          onClick={handleLogout}
          title={collapsed ? 'Sign out' : undefined}
          aria-label="Sign out"
          className={cn(
            'tap flex items-center rounded-[11px] text-[13px] font-semibold text-fg-muted transition-colors hover:bg-danger/10 hover:text-red-400',
            collapsed ? 'mx-auto h-11 w-11 justify-center' : 'w-full gap-3 px-3 py-2.5'
          )}
        >
          <LogOut className="h-[18px] w-[18px] shrink-0" aria-hidden />
          {!collapsed && <span>Sign out</span>}
        </button>

        <div className={cn('flex items-center gap-2', collapsed ? 'flex-col py-1' : 'justify-between px-3 py-1.5')}>
          <div className="flex items-center gap-2" role="status" title={pending ? `${pending} queued` : sync.label}>
            <span className={cn('h-[7px] w-[7px] rounded-full', sync.dot)} />
            {!collapsed && (
              <span className="text-[12px] font-semibold text-fg-subtle">
                {sync.label}
                {pending > 0 && <span className="font-mono"> · {pending}</span>}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={toggleSidebar}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="grid h-8 w-8 place-items-center rounded-lg text-fg-subtle transition-colors hover:bg-white/[0.06] hover:text-foreground"
          >
            {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </aside>
  );
}
