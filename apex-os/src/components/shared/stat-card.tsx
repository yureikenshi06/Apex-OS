import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  suffix?: string;
  prefix?: string;
  change?: number;
  changeLabel?: string;
  icon?: LucideIcon;
  color?: string;
  format?: 'number' | 'currency' | 'percent' | 'hours';
  className?: string;
  gradient?: string;
}

function AnimatedNumber({ value, format = 'number', prefix = '', suffix = '' }: {
  value: number;
  format?: StatCardProps['format'];
  prefix?: string;
  suffix?: string;
}) {
  const motionValue = useMotionValue(0);
  const display = useTransform(motionValue, (latest) => {
    switch (format) {
      case 'currency':
        return `${prefix}${Math.round(latest).toLocaleString('en-IN')}`;
      case 'percent':
        return `${latest.toFixed(1)}%`;
      case 'hours':
        return `${latest.toFixed(1)}h`;
      default:
        return `${prefix}${Number.isInteger(value) ? Math.round(latest).toString() : latest.toFixed(1)}${suffix}`;
    }
  });

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 0.8,
      ease: 'easeOut',
    });
    return () => controls.stop();
  }, [value, motionValue]);

  return <motion.span>{display}</motion.span>;
}

export function StatCard({
  title,
  value,
  suffix = '',
  prefix = '',
  change,
  changeLabel,
  icon: Icon,
  color = 'text-indigo-400',
  format = 'number',
  className,
  gradient = 'from-indigo-500/10 via-purple-500/5 to-transparent',
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -3, transition: { duration: 0.15 } }}
      className="h-full"
    >
      <Card className={cn(
        'relative overflow-hidden h-full min-h-[135px] flex flex-col justify-between p-5 rounded-3xl',
        'bg-[#090d16]/85 backdrop-blur-xl border border-white/10 hover:border-blue-500/40 transition-all duration-300 shadow-xl group',
        'hover:shadow-2xl hover:shadow-blue-900/20',
        className
      )}>
        {/* Subtle background glow */}
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-40 group-hover:opacity-100 transition-opacity pointer-events-none", gradient)} />
        
        <div className="relative z-10 flex items-start justify-between gap-2">
          <div className="space-y-1.5 flex-1 min-w-0">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 truncate font-mono">{title}</p>
            <p className={cn('text-2xl md:text-3xl font-black tracking-tight text-white font-mono', color)}>
              <AnimatedNumber value={value} format={format} prefix={prefix} suffix={suffix} />
            </p>
          </div>
          {Icon && (
            <div className={cn(
              'p-2.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-inner transition-transform duration-300 group-hover:scale-110 shrink-0',
              color
            )}>
              <Icon className="w-5 h-5" />
            </div>
          )}
        </div>

        {/* Bottom Subtitle / Change Row - Always rendered to ensure identical height */}
        <div className="relative z-10 mt-3 pt-2 border-t border-white/5 flex items-center gap-1.5 text-xs text-zinc-400">
          {change !== undefined && (
            <span
              className={cn(
                'font-semibold inline-flex items-center',
                change >= 0 ? 'text-emerald-400' : 'text-rose-400'
              )}
            >
              {change >= 0 ? '↑' : '↓'} {Math.abs(change).toFixed(1)}%
            </span>
          )}
          {changeLabel && (
            <span className="truncate font-medium text-zinc-400">{changeLabel}</span>
          )}
          {change === undefined && !changeLabel && (
            <span className="text-zinc-600 font-medium">—</span>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
