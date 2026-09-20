import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import { SyncPill } from './sync-pill';

interface StatCardProps {
  title: string;
  value: number;
  suffix?: string;
  prefix?: string;
  change?: number;
  changeLabel?: string;
  icon?: LucideIcon;
  /** Any `text-<hue>-<shade>` class; the hue picks the icon tint. */
  color?: string;
  format?: 'number' | 'currency' | 'percent' | 'hours';
  className?: string;
  /** @deprecated cards are flat now; accepted so existing call-sites compile. */
  gradient?: string;
  /** Module whose queued (offline) writes should surface on this card. */
  syncScope?: string;
}

// Icon tints: 14% fill + a readable foreground. Literal class names so the
// Tailwind scanner can see them.
const TONES: Record<string, { tint: string; icon: string }> = {
  blue: { tint: 'bg-primary/[0.14]', icon: 'text-blue-400' },
  green: { tint: 'bg-success/[0.14]', icon: 'text-green-400' },
  violet: { tint: 'bg-violet-500/[0.14]', icon: 'text-violet-400' },
  red: { tint: 'bg-danger/[0.14]', icon: 'text-red-400' },
  amber: { tint: 'bg-warning/[0.14]', icon: 'text-amber-400' },
};
const HUE_TO_TONE: Record<string, keyof typeof TONES> = {
  blue: 'blue', indigo: 'blue', cyan: 'blue', sky: 'blue',
  emerald: 'green', green: 'green', teal: 'green',
  purple: 'violet', violet: 'violet', fuchsia: 'violet',
  rose: 'red', red: 'red', pink: 'red',
  amber: 'amber', orange: 'amber', yellow: 'amber',
};
function toneFor(color?: string) {
  const hue = color?.match(/text-([a-z]+)-\d+/)?.[1] ?? 'blue';
  return TONES[HUE_TO_TONE[hue] ?? 'blue'];
}

function AnimatedNumber({ value, format = 'number', prefix = '', suffix = '' }: {
  value: number;
  format?: StatCardProps['format'];
  prefix?: string;
  suffix?: string;
}) {
  const reduce = useReducedMotion();
  const motionValue = useMotionValue(reduce ? value : 0);
  const display = useTransform(motionValue, (latest) => {
    switch (format) {
      case 'currency':
        return `${prefix}${Math.round(latest).toLocaleString('en-IN')}`;
      case 'percent':
        return Number.isInteger(value) ? `${Math.round(latest)}%` : `${latest.toFixed(1)}%`;
      case 'hours':
        return `${latest.toFixed(1)}h`;
      default:
        return `${prefix}${Number.isInteger(value) ? Math.round(latest).toString() : latest.toFixed(1)}${suffix}`;
    }
  });

  useEffect(() => {
    if (reduce) {
      motionValue.set(value);
      return;
    }
    const controls = animate(motionValue, value, { duration: 0.7, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [value, motionValue, reduce]);

  return <motion.span>{display}</motion.span>;
}

/**
 * Phone: compact tile (icon, value, label) so three fit a swipeable row.
 * ≥ sm: label + icon on top, value, hairline, supporting line.
 */
export function StatCard({
  title,
  value,
  suffix = '',
  prefix = '',
  change,
  changeLabel,
  icon: Icon,
  color = 'text-blue-400',
  format = 'number',
  className,
  syncScope,
}: StatCardProps) {
  const tone = toneFor(color);
  const hasSub = change !== undefined || !!changeLabel;

  return (
    <div
      className={cn(
        'lift animate-enter flex h-full min-h-[128px] flex-col justify-between gap-3 rounded-[18px] border border-line bg-surface-1 p-4 sm:p-[18px]',
        className
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="hidden min-w-0 truncate text-xs font-semibold text-fg-muted sm:block">
          {title}
        </span>
        <div className="flex items-center gap-1.5">
          {syncScope && <SyncPill scope={syncScope} />}
          {Icon && (
            <div className={cn('grid h-[26px] w-[26px] shrink-0 place-items-center rounded-lg', tone.tint)}>
              <Icon className={cn('h-3.5 w-3.5', tone.icon)} aria-hidden />
            </div>
          )}
        </div>
      </div>

      <p className="font-mono text-[19px] font-bold leading-none tracking-tight text-fg sm:text-2xl">
        <AnimatedNumber value={value} format={format} prefix={prefix} suffix={suffix} />
      </p>

      <div className="min-w-0">
        <span className="block text-[11px] font-semibold leading-snug text-fg-muted sm:hidden">{title}</span>
        <div className="flex min-w-0 items-center gap-1.5 text-[11px] leading-snug text-fg-subtle sm:mt-0 sm:border-t sm:border-line sm:pt-2.5 sm:text-xs">
          {change !== undefined && (
            <span className={cn('inline-flex shrink-0 items-center font-semibold', change >= 0 ? 'text-green-400' : 'text-red-400')}>
              {change >= 0 ? '↑' : '↓'} {Math.abs(change).toFixed(1)}%
            </span>
          )}
          {changeLabel && <span className="line-clamp-2 sm:truncate">{changeLabel}</span>}
          {!hasSub && <span className="hidden sm:inline">—</span>}
        </div>
      </div>
    </div>
  );
}

/**
 * Phones: one swipeable row (cards keep full size and legibility instead of
 * being squeezed into 2×2). ≥ sm: a normal grid.
 */
export function StatGrid({
  children,
  className,
  columns = 'sm:grid-cols-2 lg:grid-cols-4',
}: {
  children: React.ReactNode;
  className?: string;
  columns?: string;
}) {
  return (
    <div
      className={cn(
        'no-scrollbar snap-row -mx-5 flex gap-2.5 overflow-x-auto px-5 pb-1',
        '[&>*]:w-[156px] [&>*]:shrink-0 sm:mx-0 sm:grid sm:gap-3.5 sm:overflow-visible sm:px-0 sm:pb-0 sm:[&>*]:w-auto',
        columns,
        className
      )}
    >
      {children}
    </div>
  );
}
