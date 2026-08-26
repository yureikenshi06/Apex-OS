import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Keyboard, X } from 'lucide-react';

const shortcuts = [
  { key: '⌘K / Ctrl+K', description: 'Command palette' },
  { key: 'n', description: 'New task' },
  { key: 'g h', description: 'Go to Home' },
  { key: 'g t', description: 'Go to Timetable' },
  { key: 'g f', description: 'Go to Finance' },
  { key: 'g w', description: 'Go to Fitness' },
  { key: 'g c', description: 'Go to CFA' },
  { key: 'g s', description: 'Go to Settings' },
  { key: '?', description: 'This help' },
  { key: 'Esc', description: 'Close modal/palette' },
];

export function HelpModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // ignore if focus is in an input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) return;
      
      if (e.key === '?') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative z-50 w-full max-w-md bg-[#0a0a0f] border border-white/10 rounded-2xl shadow-2xl p-6"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-white/5 rounded-xl text-white/60">
                <Keyboard className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold text-white">Keyboard Shortcuts</h2>
            </div>

            <div className="space-y-2">
              {shortcuts.map((shortcut, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <span className="text-sm text-white/60">{shortcut.description}</span>
                  <div className="flex items-center gap-1">
                    {shortcut.key.split(' ').map((k, j) => (
                      <span key={j} className="px-2 py-1 text-xs font-medium text-white/80 bg-white/10 rounded-md">
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
