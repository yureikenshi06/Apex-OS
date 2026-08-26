import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Command } from 'cmdk';
import { useNavigate } from 'react-router-dom';
import { Search, Home, Calendar, DollarSign, Dumbbell, BookOpen, CheckSquare, Settings, Plus, UserCheck, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/ui-store';

export function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const { openQuickAdd } = useUIStore();
  
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isOpen) onClose();
        else useUIStore.getState().setCommandPaletteOpen(true);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [isOpen, onClose]);

  const runCommand = (command: () => void) => {
    command();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -15 }}
            transition={{ duration: 0.2 }}
            className="relative z-50 w-full max-w-xl bg-[#111118] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            <Command
              className="w-full"
              label="Global Command Menu"
              shouldFilter={true}
              filter={(value, search) => {
                if (value.toLowerCase().includes(search.toLowerCase())) return 1;
                return 0;
              }}
            >
              <div className="flex items-center border-b border-white/10 px-4 bg-white/5">
                <Search className="w-5 h-5 text-indigo-400 mr-3 shrink-0" />
                <Command.Input 
                  value={search}
                  onValueChange={setSearch}
                  placeholder="Type a command or navigate anywhere..." 
                  className="w-full bg-transparent border-0 outline-none text-white placeholder-zinc-500 h-14 text-sm font-medium"
                  autoFocus
                />
              </div>

              <Command.List className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
                <Command.Empty className="py-8 text-center text-sm text-zinc-500">
                  No matching results found.
                </Command.Empty>

                <Command.Group heading="Quick Actions" className="text-[11px] text-zinc-400 px-3 py-1.5 uppercase tracking-wider font-bold">
                  <Command.Item onSelect={() => runCommand(() => openQuickAdd('task'))} className={commandItemClass}>
                    <Plus className="w-4 h-4 mr-2.5 text-indigo-400" />
                    <span className="font-medium">New Task</span>
                    <span className="ml-auto text-xs text-zinc-500 font-mono">n</span>
                  </Command.Item>
                  <Command.Item onSelect={() => runCommand(() => openQuickAdd('transaction'))} className={commandItemClass}>
                    <DollarSign className="w-4 h-4 mr-2.5 text-emerald-400" />
                    <span className="font-medium">New Transaction</span>
                  </Command.Item>
                  <Command.Item onSelect={() => runCommand(() => openQuickAdd('block'))} className={commandItemClass}>
                    <Calendar className="w-4 h-4 mr-2.5 text-purple-400" />
                    <span className="font-medium">New Timetable Block</span>
                  </Command.Item>
                  <Command.Item onSelect={() => runCommand(() => navigate('/fitness/log'))} className={commandItemClass}>
                    <Dumbbell className="w-4 h-4 mr-2.5 text-orange-400" />
                    <span className="font-medium">Log Workout</span>
                  </Command.Item>
                  <Command.Item onSelect={() => runCommand(() => navigate('/fitness/food-log'))} className={commandItemClass}>
                    <Flame className="w-4 h-4 mr-2.5 text-rose-400" />
                    <span className="font-medium">Log Food / Nutrition</span>
                  </Command.Item>
                </Command.Group>

                <Command.Group heading="Navigation" className="text-[11px] text-zinc-400 px-3 py-1.5 mt-2 uppercase tracking-wider font-bold">
                  <Command.Item onSelect={() => runCommand(() => navigate('/home'))} className={commandItemClass}>
                    <Home className="w-4 h-4 mr-2.5 text-indigo-400" />
                    <span>Home Dashboard</span>
                    <span className="ml-auto text-xs text-zinc-500 font-mono">g h</span>
                  </Command.Item>
                  <Command.Item onSelect={() => runCommand(() => navigate('/timetable'))} className={commandItemClass}>
                    <Calendar className="w-4 h-4 mr-2.5 text-purple-400" />
                    <span>Master Timetable</span>
                    <span className="ml-auto text-xs text-zinc-500 font-mono">g t</span>
                  </Command.Item>
                  <Command.Item onSelect={() => runCommand(() => navigate('/timetable/daily'))} className={commandItemClass}>
                    <Calendar className="w-4 h-4 mr-2.5 text-purple-300" />
                    <span>Daily Planner</span>
                  </Command.Item>
                  <Command.Item onSelect={() => runCommand(() => navigate('/timetable/habits'))} className={commandItemClass}>
                    <Flame className="w-4 h-4 mr-2.5 text-amber-400" />
                    <span>Habit Tracker</span>
                  </Command.Item>
                  <Command.Item onSelect={() => runCommand(() => navigate('/finance'))} className={commandItemClass}>
                    <DollarSign className="w-4 h-4 mr-2.5 text-emerald-400" />
                    <span>Finance Command</span>
                    <span className="ml-auto text-xs text-zinc-500 font-mono">g f</span>
                  </Command.Item>
                  <Command.Item onSelect={() => runCommand(() => navigate('/fitness'))} className={commandItemClass}>
                    <Dumbbell className="w-4 h-4 mr-2.5 text-orange-400" />
                    <span>Fitness Command</span>
                    <span className="ml-auto text-xs text-zinc-500 font-mono">g w</span>
                  </Command.Item>
                  <Command.Item onSelect={() => runCommand(() => navigate('/cfa'))} className={commandItemClass}>
                    <BookOpen className="w-4 h-4 mr-2.5 text-blue-400" />
                    <span>CFA Level I Tracker</span>
                    <span className="ml-auto text-xs text-zinc-500 font-mono">g c</span>
                  </Command.Item>
                  <Command.Item onSelect={() => runCommand(() => navigate('/tasks'))} className={commandItemClass}>
                    <CheckSquare className="w-4 h-4 mr-2.5 text-indigo-400" />
                    <span>Task Manager</span>
                  </Command.Item>
                  <Command.Item onSelect={() => runCommand(() => navigate('/settings'))} className={commandItemClass}>
                    <Settings className="w-4 h-4 mr-2.5 text-zinc-400" />
                    <span>Settings & Backups</span>
                    <span className="ml-auto text-xs text-zinc-500 font-mono">g s</span>
                  </Command.Item>
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

const commandItemClass = cn(
  "flex items-center px-3 py-2.5 text-sm text-zinc-200 rounded-xl cursor-pointer transition-all",
  "hover:bg-white/10 hover:text-white aria-selected:bg-white/10 aria-selected:text-white"
);
