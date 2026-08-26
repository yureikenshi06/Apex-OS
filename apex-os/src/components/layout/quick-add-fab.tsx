import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, CheckSquare, DollarSign, Dumbbell, BookOpen, Calendar } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function QuickAddFab() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const path = location.pathname;

  const getOptions = () => {
    if (path.startsWith('/finance')) {
      return [{ icon: DollarSign, label: 'New Transaction', color: 'text-emerald-400', bg: 'bg-emerald-400/20' }];
    }
    if (path.startsWith('/fitness')) {
      return [
        { icon: Dumbbell, label: 'Log Workout', color: 'text-orange-400', bg: 'bg-orange-400/20' },
        { icon: Plus, label: 'Log Food', color: 'text-orange-400', bg: 'bg-orange-400/20' }
      ];
    }
    if (path.startsWith('/cfa')) {
      return [{ icon: BookOpen, label: 'Add Topic', color: 'text-blue-400', bg: 'bg-blue-400/20' }];
    }
    if (path.startsWith('/timetable')) {
      return [{ icon: Calendar, label: 'New Block', color: 'text-purple-400', bg: 'bg-purple-400/20' }];
    }
    return [{ icon: CheckSquare, label: 'New Task', color: 'text-indigo-400', bg: 'bg-indigo-400/20' }];
  };

  const options = getOptions();

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <div className="flex flex-col items-end gap-3 mb-4">
            {options.map((option, i) => (
              <motion.button
                key={option.label}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 bg-[#1a1a24] border border-white/10 pr-4 pl-3 py-2 rounded-full shadow-lg hover:bg-white/10 transition-colors"
                onClick={() => {
                  console.log(option.label);
                  setIsOpen(false);
                }}
              >
                <div className={cn("p-1.5 rounded-full", option.bg)}>
                  <option.icon className={cn("w-4 h-4", option.color)} />
                </div>
                <span className="text-sm font-medium text-white">{option.label}</span>
              </motion.button>
            ))}
          </div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-indigo-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.4)] text-white hover:bg-indigo-600 transition-colors"
        animate={{ rotate: isOpen ? 45 : 0 }}
      >
        <Plus className="w-6 h-6" />
      </motion.button>
    </div>
  );
}
