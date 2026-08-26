import React from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StreakBadgeProps {
  streak: number;
  className?: string;
}

export function StreakBadge({ streak, className }: StreakBadgeProps) {
  // Determine if it's a milestone streak
  const isMilestone = streak > 0 && (streak === 7 || streak === 30 || streak === 100 || streak % 100 === 0);
  
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn(
        "inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-sm font-medium",
        "bg-orange-500/10 text-orange-500 border border-orange-500/20",
        isMilestone && "shadow-[0_0_15px_rgba(249,115,22,0.3)] border-orange-500/50",
        className
      )}
    >
      <motion.span
        animate={isMilestone ? {
          scale: [1, 1.2, 1],
          rotate: [0, -10, 10, -10, 0],
        } : {}}
        transition={{ 
          duration: 1.5, 
          repeat: isMilestone ? Infinity : 0, 
          repeatType: "reverse" 
        }}
        className="flex items-center justify-center"
      >
        <Flame className={cn("w-4 h-4", isMilestone && "fill-orange-500")} />
      </motion.span>
      <span>{streak} day streak</span>
    </motion.div>
  );
}
