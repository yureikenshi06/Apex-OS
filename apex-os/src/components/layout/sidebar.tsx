import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Calendar, 
  Wallet, 
  Dumbbell, 
  GraduationCap, 
  CheckSquare, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/ui-store';
import { useSyncStore } from '@/store/sync-store';

const navItems = [
  { name: 'Home', path: '/home', icon: LayoutDashboard },
  { name: 'Timetable', path: '/timetable', icon: Calendar },
  { name: 'Finance', path: '/finance', icon: Wallet },
  { name: 'Fitness', path: '/fitness', icon: Dumbbell },
  { name: 'CFA', path: '/cfa', icon: GraduationCap },
  { name: 'Tasks', path: '/tasks', icon: CheckSquare },
];

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useUIStore();
  const { syncStatus } = useSyncStore();

  const syncColor = syncStatus === 'synced' ? 'bg-emerald-500' : syncStatus === 'syncing' ? 'bg-amber-500' : 'bg-destructive';

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarCollapsed ? 80 : 280 }}
      className="hidden md:flex flex-col h-screen bg-card border-r border-border/50 sticky top-0 z-40 shrink-0"
    >
      <div className="flex h-16 items-center px-4 justify-between border-b border-border/50">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-xl shadow-lg shadow-primary/20">
            A
          </div>
          <AnimatePresence initial={false}>
            {!sidebarCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="font-bold text-foreground whitespace-nowrap text-lg tracking-tight"
              >
                Apex OS
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative',
                  isActive
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                )
              }
            >
              <Icon className="h-5 w-5 shrink-0" />
              <AnimatePresence initial={false}>
                {!sidebarCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="whitespace-nowrap font-medium text-sm"
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          );
        })}
      </div>

      <div className="p-3 border-t border-border/50 space-y-1">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200',
              isActive
                ? 'bg-primary/10 text-primary font-medium'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            )
          }
        >
          <Settings className="h-5 w-5 shrink-0" />
          <AnimatePresence initial={false}>
            {!sidebarCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="whitespace-nowrap font-medium text-sm"
              >
                Settings
              </motion.span>
            )}
          </AnimatePresence>
        </NavLink>
        
        <div className="flex items-center justify-between px-3 py-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className={cn("h-2 w-2 rounded-full", syncColor, syncStatus === 'syncing' && "animate-pulse")} />
            {!sidebarCollapsed && <span>{syncStatus === 'synced' ? 'Synced' : syncStatus === 'syncing' ? 'Syncing...' : 'Offline'}</span>}
          </div>
          {!sidebarCollapsed && (
            <button 
              onClick={toggleSidebar}
              className="p-1 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Collapse sidebar"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
        </div>
        {sidebarCollapsed && (
          <button 
            onClick={toggleSidebar}
            className="mx-auto p-2 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground flex justify-center w-full"
            aria-label="Expand sidebar"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </motion.aside>
  );
}

export default Sidebar;
