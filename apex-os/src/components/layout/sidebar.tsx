import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Calendar, 
  Wallet, 
  Dumbbell, 
  GraduationCap, 
  CheckSquare, 
  ChevronLeft,
  ChevronRight,
  LogOut,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/ui-store';
import { useSyncStore } from '@/store/sync-store';
import { useAuth } from './auth-provider';

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
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const syncColor = syncStatus === 'synced' ? 'bg-emerald-500' : syncStatus === 'syncing' ? 'bg-amber-500' : 'bg-rose-500';

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (e) {
      console.error('Logout error:', e);
    }
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarCollapsed ? 72 : 240 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className="hidden md:flex flex-col h-screen bg-[#060810] border-r border-white/5 sticky top-0 z-40 shrink-0 select-none overflow-hidden"
    >
      {/* App Header / Logo */}
      <div className={cn(
        "flex h-16 items-center border-b border-white/5 shrink-0 transition-all",
        sidebarCollapsed ? "justify-center px-0" : "justify-between px-4"
      )}>
        <div className="flex items-center gap-3 overflow-hidden">
          {/* Futuristic Cyber Monogram Logo */}
          <div className="relative group shrink-0 cursor-pointer" onClick={toggleSidebar}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[1.5px] shadow-lg shadow-blue-600/30 group-hover:shadow-blue-500/50 transition-all">
              <div className="w-full h-full bg-[#080b16] rounded-[10px] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-cyan-500/10 opacity-50" />
                {/* Stylized Geometric Apex Glyph */}
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-cyan-400 relative z-10 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" fill="currentColor">
                  <path d="M12 2L2 20h4.5l5.5-10.5 5.5 10.5H22L12 2zm0 6.5l3.2 6.5H8.8L12 8.5z" />
                </svg>
              </div>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden"
              >
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-white whitespace-nowrap text-lg tracking-wider block font-mono">
                    APEX
                  </span>
                  <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-blue-600/30 text-blue-400 border border-blue-500/30 tracking-widest font-mono">
                    OS
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!sidebarCollapsed && (
          <button 
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            title="Collapse sidebar"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto py-4 px-2 space-y-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              title={sidebarCollapsed ? item.name : undefined}
              className={({ isActive }) =>
                cn(
                  'flex items-center rounded-xl transition-all duration-200 group relative',
                  sidebarCollapsed ? 'justify-center w-11 h-11 mx-auto p-0' : 'gap-3 px-3.5 py-2.5 w-full',
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
                    className="whitespace-nowrap text-xs font-semibold tracking-wide"
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          );
        })}
      </div>

      {/* Bottom Footer: Logout & Sync Indicator */}
      <div className="p-2 border-t border-white/5 space-y-1">
        {/* Logout Button */}
        <button
          type="button"
          onClick={handleLogout}
          title={sidebarCollapsed ? 'Sign Out' : undefined}
          className={cn(
            'flex items-center rounded-xl transition-all duration-200 text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 font-medium',
            sidebarCollapsed ? 'justify-center w-11 h-11 mx-auto p-0' : 'gap-3 px-3.5 py-2.5 w-full text-xs font-semibold'
          )}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          <AnimatePresence initial={false}>
            {!sidebarCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="whitespace-nowrap"
              >
                Sign Out
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {/* Sync Status / Expand Toggle */}
        <div className={cn(
          "flex items-center py-2 text-xs text-zinc-500",
          sidebarCollapsed ? "justify-center flex-col gap-2" : "justify-between px-3"
        )}>
          <div className="flex items-center gap-2">
            <div className={cn("h-2 w-2 rounded-full", syncColor, syncStatus === 'syncing' && "animate-pulse")} />
            {!sidebarCollapsed && (
              <span className="text-[11px] font-mono font-medium text-zinc-400">
                {syncStatus === 'synced' ? 'Live Synced' : syncStatus === 'syncing' ? 'Syncing...' : 'Offline'}
              </span>
            )}
          </div>

          {sidebarCollapsed && (
            <button 
              onClick={toggleSidebar}
              className="p-1 rounded-md hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
              title="Expand sidebar"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
