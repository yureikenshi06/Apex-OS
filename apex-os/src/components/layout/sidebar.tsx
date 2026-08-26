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
  ChevronRight,
  Sparkles
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

  const syncColor = syncStatus === 'synced' ? 'bg-emerald-500' : syncStatus === 'syncing' ? 'bg-amber-500' : 'bg-rose-500';

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarCollapsed ? 80 : 270 }}
      className="hidden md:flex flex-col h-screen bg-[#070a12] border-r border-white/5 sticky top-0 z-40 shrink-0 select-none"
    >
      <div className="flex h-16 items-center px-4 justify-between border-b border-white/5">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-blue-500 text-white font-black text-xl shadow-lg shadow-blue-600/30 border border-blue-400/30">
            A
          </div>
          <AnimatePresence initial={false}>
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden"
              >
                <span className="font-black text-white whitespace-nowrap text-lg tracking-tight block">
                  Apex OS
                </span>
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block -mt-1">
                  Executive Suite
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-5 px-3 space-y-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 group relative font-medium',
                  isActive
                    ? 'bg-blue-600/15 text-blue-400 font-bold border border-blue-500/30 shadow-inner'
                    : 'text-zinc-400 hover:bg-white/5 hover:text-white'
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
                    className="whitespace-nowrap text-sm"
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          );
        })}
      </div>

      <div className="p-3 border-t border-white/5 space-y-1">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 font-medium',
              isActive
                ? 'bg-blue-600/15 text-blue-400 font-bold border border-blue-500/30 shadow-inner'
                : 'text-zinc-400 hover:bg-white/5 hover:text-white'
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
                className="whitespace-nowrap text-sm"
              >
                Settings
              </motion.span>
            )}
          </AnimatePresence>
        </NavLink>
        
        <div className="flex items-center justify-between px-3 py-2 text-xs text-zinc-500">
          <div className="flex items-center gap-2 font-medium">
            <div className={cn("h-2 w-2 rounded-full", syncColor, syncStatus === 'syncing' && "animate-pulse")} />
            {!sidebarCollapsed && <span>{syncStatus === 'synced' ? 'Live Synced' : syncStatus === 'syncing' ? 'Syncing...' : 'Offline'}</span>}
          </div>
          {!sidebarCollapsed && (
            <button 
              onClick={toggleSidebar}
              className="p-1 rounded-md hover:bg-white/5 transition-colors text-zinc-400 hover:text-white"
              aria-label="Collapse sidebar"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
        </div>
        {sidebarCollapsed && (
          <button 
            onClick={toggleSidebar}
            className="mx-auto p-2 rounded-md hover:bg-white/5 transition-colors text-zinc-400 hover:text-white flex justify-center w-full"
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
