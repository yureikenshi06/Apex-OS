import React from 'react';
import { Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StreakBadgeProps {
  streak: number;
  /** Text after the count, e.g. "workout streak". Defaults to "day streak". */
  label?: string;
  tone?: 'red' | 'blue' | 'green';
  className?: string;
}

const TONES = {
  red: 'bg-danger/[0.12] text-red-400',
  blue: 'bg-primary/[0.12] text-blue-400',
  green: 'bg-success/[0.12] text-green-400',
};

export function StreakBadge({ streak, label = 'day streak', tone = 'red', className }: StreakBadgeProps) {
  const milestone = streak > 0 && (streak === 7 || streak === 30 || streak % 100 === 0);

  return (
    <span
      className={cn(
        'animate-fade inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[12px] font-bold',
        TONES[tone],
        milestone && 'ring-1 ring-current/40',
        className
      )}
    >
      <Flame className={cn('h-3.5 w-3.5', milestone && 'fill-current')} aria-hidden />
      <span className="font-mono">{streak}</span>
      <span>{label}</span>
    </span>
  );
}
