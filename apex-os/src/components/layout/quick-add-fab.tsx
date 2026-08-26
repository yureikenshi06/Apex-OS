import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, CheckSquare, DollarSign, Dumbbell, BookOpen, Calendar, Utensils } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/ui-store';

export function QuickAddFab() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const { openQuickAdd } = useUIStore();

  const handleAction = (action: () => void) => {
    setIsOpen(false);
    action();
  };

  const getOptions = () => {
    if (path.startsWith('/finance')) {
      return [
        { icon: DollarSign, label: 'New Transaction', color: 'text-emerald-400', bg: 'bg-emerald-400/20', action: () => openQuickAdd('transaction') },
        { icon: CheckSquare, label: 'New Task', color: 'text-indigo-400', bg: 'bg-indigo-400/20', action: () => openQuickAdd('task') },
      ];
    }
    if (path.startsWith('/fitness')) {
      return [
        { icon: Dumbbell, label: 'Log Workout', color: 'text-orange-400', bg: 'bg-orange-400/20', action: () => navigate('/fitness/log') },
        { icon: Utensils, label: 'Log Food', color: 'text-rose-400', bg: 'bg-rose-400/20', action: () => navigate('/fitness/food-log') },
        { icon: CheckSquare, label: 'New Task', color: 'text-indigo-400', bg: 'bg-indigo-400/20', action: () => openQuickAdd('task') },
      ];
    }
    if (path.startsWith('/cfa')) {
      return [
        { icon: BookOpen, label: 'Add CFA Topic', color: 'text-blue-400', bg: 'bg-blue-400/20', action: () => navigate('/cfa/topics') },
        { icon: CheckSquare, label: 'New Task', color: 'text-indigo-400', bg: 'bg-indigo-400/20', action: () => openQuickAdd('task') },
      ];
    }
    if (path.startsWith('/timetable')) {
      return [
        { icon: Calendar, label: 'New Timetable Block', color: 'text-purple-400', bg: 'bg-purple-400/20', action: () => openQuickAdd('block') },
        { icon: CheckSquare, label: 'New Task', color: 'text-indigo-400', bg: 'bg-indigo-400/20', action: () => openQuickAdd('task') },
      ];
    }
    return [
      { icon: CheckSquare, label: 'New Task', color: 'text-indigo-400', bg: 'bg-indigo-400/20', action: () => openQuickAdd('task') },
      { icon: DollarSign, label: 'New Transaction', color: 'text-emerald-400', bg: 'bg-emerald-400/20', action: () => openQuickAdd('transaction') },
      { icon: Calendar, label: 'New Block', color: 'text-purple-400', bg: 'bg-purple-400/20', action: () => openQuickAdd('block') },
    ];
  };

  const options = getOptions();

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <div className="flex flex-col items-end gap-2.5 mb-3">
            {options.map((option, i) => (
              <motion.button
                key={option.label}
                initial={{ opacity: 0, y: 15, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.9 }}
                transition={{ delay: i * 0.04, duration: 0.2 }}
                className="flex items-center gap-3 bg-[#181824] border border-white/10 pr-4 pl-3 py-2 rounded-full shadow-2xl hover:bg-white/10 hover:border-indigo-500/40 transition-all group"
                onClick={() => handleAction(option.action)}
              >
                <div className={cn("p-1.5 rounded-full", option.bg)}>
                  <option.icon className={cn("w-4 h-4", option.color)} />
                </div>
                <span className="text-xs font-semibold text-zinc-200 group-hover:text-white">{option.label}</span>
              </motion.button>
            ))}
          </div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-tr from-indigo-600 to-indigo-500 rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(99,102,241,0.5)] text-white transition-all border border-white/20"
        animate={{ rotate: isOpen ? 45 : 0 }}
      >
        <Plus className="w-6 h-6 stroke-[2.5]" />
      </motion.button>
    </div>
  );
}
