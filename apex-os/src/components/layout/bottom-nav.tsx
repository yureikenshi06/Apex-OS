import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Calendar, Wallet, Dumbbell, GraduationCap, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/ui-store';

const navItems = [
  { name: 'Home', path: '/home', icon: LayoutDashboard },
  { name: 'Timetable', path: '/timetable', icon: Calendar },
  { name: 'Finance', path: '/finance', icon: Wallet },
  { name: 'Fitness', path: '/fitness', icon: Dumbbell },
  { name: 'CFA', path: '/cfa', icon: GraduationCap },
];

export function BottomNav() {
  const { openQuickAdd } = useUIStore();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#05060a]/90 backdrop-blur-2xl border-t border-white/10 pb-safe">
      <div className="flex items-center justify-around h-16 px-2 relative">
        {navItems.map((item, index) => (
          <React.Fragment key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) => cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors relative",
                isActive ? "text-blue-400 font-bold" : "text-zinc-400 hover:text-zinc-200"
              )}
            >
              {({ isActive }) => (
                <>
                  <item.icon className={cn("h-5 w-5", isActive && "fill-blue-500/20 text-blue-400")} strokeWidth={isActive ? 2.5 : 2} />
                  <span className="text-[10px] tracking-wide font-medium">{item.name}</span>
                </>
              )}
            </NavLink>
            
            {/* Insert FAB in the middle */}
            {index === 2 && (
              <div className="w-full flex justify-center -mt-8">
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => openQuickAdd('task')}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/40 border-4 border-[#05060a] z-10"
                >
                  <Plus className="h-6 w-6" strokeWidth={2.5} />
                </motion.button>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
