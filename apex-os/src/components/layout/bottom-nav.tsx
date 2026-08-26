import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Calendar, Wallet, Dumbbell, GraduationCap, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Home', path: '/home', icon: LayoutDashboard },
  { name: 'Timetable', path: '/timetable', icon: Calendar },
  { name: 'Finance', path: '/finance', icon: Wallet },
  { name: 'Fitness', path: '/fitness', icon: Dumbbell },
  { name: 'CFA', path: '/cfa', icon: GraduationCap },
];

export function BottomNav() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#111118]/80 backdrop-blur-xl border-t border-white/5 pb-safe">
      <div className="flex items-center justify-around h-16 px-2 relative">
        {navItems.map((item, index) => (
          <React.Fragment key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) => cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors relative",
                isActive ? "text-indigo-400" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              {({ isActive }) => (
                <>
                  <item.icon className={cn("h-5 w-5", isActive && "fill-indigo-500/20")} strokeWidth={isActive ? 2.5 : 2} />
                  <span className="text-[10px] font-medium tracking-wide">{item.name}</span>
                </>
              )}
            </NavLink>
            
            {/* Insert FAB in the middle */}
            {index === 2 && (
              <div className="w-full flex justify-center -mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 border-4 border-[#0a0a0f] z-10"
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
