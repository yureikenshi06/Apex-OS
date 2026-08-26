import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Command } from 'cmdk';
import { useNavigate } from 'react-router-dom';
import { Search, Home, Calendar, DollarSign, Dumbbell, BookOpen, CheckSquare, Settings, Plus, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

export function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // You would typically have a global store function to open this
          // e.g. useUIStore.getState().setCommandPaletteOpen(true)
        }
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
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="relative z-50 w-full max-w-xl bg-[#0a0a0f] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            <Command
              className="w-full"
              label="Global Command Menu"
              shouldFilter={true}
              filter={(value, search) => {
                if (value.includes(search.toLowerCase())) return 1;
                return 0;
              }}
            >
              <div className="flex items-center border-b border-white/10 px-4">
                <Search className="w-5 h-5 text-white/40 mr-2" />
                <Command.Input 
                  value={search}
                  onValueChange={setSearch}
                  placeholder="Type a command or search..." 
                  className="w-full bg-transparent border-0 outline-none text-white placeholder-white/40 h-14 text-sm"
                  autoFocus
                />
              </div>

              <Command.List className="max-h-[60vh] overflow-y-auto p-2">
                <Command.Empty className="py-6 text-center text-sm text-white/60">
                  No results found.
                </Command.Empty>

                <Command.Group heading="Navigation" className="text-xs text-white/40 px-2 py-1 uppercase tracking-wider font-semibold">
                  <Command.Item onSelect={() => runCommand(() => navigate('/'))} className={commandItemClass}>
                    <Home className="w-4 h-4 mr-2 text-indigo-400" />
                    <span>Home</span>
                    <span className="ml-auto text-xs text-white/30">g h</span>
                  </Command.Item>
                  <Command.Item onSelect={() => runCommand(() => navigate('/timetable'))} className={commandItemClass}>
                    <Calendar className="w-4 h-4 mr-2 text-indigo-400" />
                    <span>Timetable</span>
                    <span className="ml-auto text-xs text-white/30">g t</span>
                  </Command.Item>
                  <Command.Item onSelect={() => runCommand(() => navigate('/finance'))} className={commandItemClass}>
                    <DollarSign className="w-4 h-4 mr-2 text-indigo-400" />
                    <span>Finance</span>
                    <span className="ml-auto text-xs text-white/30">g f</span>
                  </Command.Item>
                  <Command.Item onSelect={() => runCommand(() => navigate('/fitness'))} className={commandItemClass}>
                    <Dumbbell className="w-4 h-4 mr-2 text-indigo-400" />
                    <span>Fitness</span>
                    <span className="ml-auto text-xs text-white/30">g w</span>
                  </Command.Item>
                  <Command.Item onSelect={() => runCommand(() => navigate('/cfa'))} className={commandItemClass}>
                    <BookOpen className="w-4 h-4 mr-2 text-indigo-400" />
                    <span>CFA</span>
                    <span className="ml-auto text-xs text-white/30">g c</span>
                  </Command.Item>
                  <Command.Item onSelect={() => runCommand(() => navigate('/settings'))} className={commandItemClass}>
                    <Settings className="w-4 h-4 mr-2 text-indigo-400" />
                    <span>Settings</span>
                    <span className="ml-auto text-xs text-white/30">g s</span>
                  </Command.Item>
                </Command.Group>

                <Command.Group heading="Quick Actions" className="text-xs text-white/40 px-2 py-1 mt-4 uppercase tracking-wider font-semibold">
                  <Command.Item onSelect={() => runCommand(() => console.log('New Task'))} className={commandItemClass}>
                    <Plus className="w-4 h-4 mr-2 text-emerald-400" />
                    <span>New Task</span>
                    <span className="ml-auto text-xs text-white/30">n</span>
                  </Command.Item>
                  <Command.Item onSelect={() => runCommand(() => console.log('New Transaction'))} className={commandItemClass}>
                    <DollarSign className="w-4 h-4 mr-2 text-emerald-400" />
                    <span>New Transaction</span>
                  </Command.Item>
                  <Command.Item onSelect={() => runCommand(() => console.log('Log Workout'))} className={commandItemClass}>
                    <Dumbbell className="w-4 h-4 mr-2 text-emerald-400" />
                    <span>Log Workout</span>
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
  "flex items-center px-3 py-2 text-sm text-white/80 rounded-lg cursor-pointer transition-colors",
  "hover:bg-white/10 aria-selected:bg-white/10 aria-selected:text-white"
);
