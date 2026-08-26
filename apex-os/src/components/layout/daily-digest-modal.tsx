import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import { CheckCircle2, TrendingUp, Calendar, AlertCircle } from 'lucide-react';
import { StreakBadge } from '@/components/shared/streak-badge';

interface DailyDigestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DailyDigestModal({ isOpen, onClose }: DailyDigestModalProps) {
  const { user } = useAuth();
  
  // Example dummy data
  const score = 85;
  const previousScore = 78;
  const tasksDue = 5;
  const overdueTasks = 2;
  const plannedBlocks = 8;
  const cfaHours = 8.5;
  const cfaTarget = 12;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg z-50 bg-[#0a0a0f] border border-white/10 rounded-t-2xl md:rounded-2xl p-6 shadow-2xl"
          >
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">Good morning, {user?.user_metadata?.first_name || 'Prakhar'}</h2>
                <p className="text-white/60">Here's your daily briefing</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col items-center justify-center">
                  <div className="text-sm text-white/60 mb-1">Yesterday's Score</div>
                  <div className="text-3xl font-bold text-white flex items-center gap-2">
                    {score}
                    {score >= previousScore ? (
                      <TrendingUp className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <TrendingUp className="w-5 h-5 text-red-500 rotate-180" />
                    )}
                  </div>
                </div>
                
                <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col items-center justify-center space-y-2">
                  <div className="text-sm text-white/60">Current Streak</div>
                  <StreakBadge streak={12} />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">Today's Schedule</div>
                    <div className="text-xs text-white/60">{plannedBlocks} blocks planned</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">Tasks Due Today</div>
                    <div className="text-xs text-white/60">{tasksDue} tasks remaining</div>
                  </div>
                </div>

                {overdueTasks > 0 && (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                    <div className="p-2 rounded-lg bg-red-500/20 text-red-400">
                      <AlertCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-red-400">Overdue Items</div>
                      <div className="text-xs text-red-400/80">{overdueTasks} tasks need attention</div>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-medium transition-colors"
              >
                Let's go
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
