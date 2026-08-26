import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';
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
      duration: 1,
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
  color = 'text-primary',
  format = 'number',
  className,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      <Card className={cn('p-4 md:p-6', className)}>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-xs md:text-sm text-muted-foreground font-medium">{title}</p>
            <p className={cn('text-xl md:text-2xl font-bold', color)}>
              <AnimatedNumber value={value} format={format} prefix={prefix} suffix={suffix} />
            </p>
          </div>
          {Icon && (
            <div className={cn('p-2 rounded-xl bg-primary/10', color)}>
              <Icon className="w-4 h-4 md:w-5 md:h-5" />
            </div>
          )}
        </div>
        {change !== undefined && (
          <div className="mt-2 flex items-center gap-1">
            <span
              className={cn(
                'text-xs font-medium',
                change >= 0 ? 'text-emerald-400' : 'text-red-400'
              )}
            >
              {change >= 0 ? '↑' : '↓'} {Math.abs(change).toFixed(1)}%
            </span>
            {changeLabel && (
              <span className="text-xs text-muted-foreground">{changeLabel}</span>
            )}
          </div>
        )}
      </Card>
    </motion.div>
  );
}
