import React, { useId } from 'react';
import { cn } from '@/lib/utils';

interface ScoreRingProps {
  /** 0–100 */
  value: number;
  size?: number;
  stroke?: number;
  className?: string;
  children?: React.ReactNode;
}

/**
 * The execution-score ring. It fills in on load (900ms, ease-out) rather than
 * snapping in; geometry is passed to CSS via custom properties so the
 * keyframes in globals.css can animate to any value, and reduced-motion users
 * get the final state directly.
 */
export function ScoreRing({ value, size = 72, stroke = 7, className, children }: ScoreRingProps) {
  const id = useId();
  const pct = Math.max(0, Math.min(100, value || 0));
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (circ * pct) / 100;

  return (
    <div className={cn('relative shrink-0', className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90" aria-hidden>
        <defs>
          <linearGradient id={`ring-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3B6EF6" />
            <stop offset="100%" stopColor="#EF4444" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgb(var(--line))" strokeWidth={stroke} />
        {/* key restarts the sweep when the score changes */}
        <circle
          key={Math.round(pct)}
          className="apex-ring-arc"
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`url(#ring-${id})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          style={{ ['--ring-circ' as string]: circ, ['--ring-offset' as string]: offset } as React.CSSProperties}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  );
}
