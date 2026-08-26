import React from 'react';
import { motion } from 'framer-motion';

export interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  label?: string;
  children?: React.ReactNode;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 100,
  strokeWidth = 8,
  color = '#3b82f6',
  trackColor = '#1e293b',
  label,
  children,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const safeProgress = Math.min(100, Math.max(0, progress || 0));
  const offset = circumference - (safeProgress / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center select-none" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 4px ${color}80)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none p-1">
        {children || (
          <>
            <span 
              className="font-black text-white leading-none" 
              style={{ fontSize: size < 90 ? '14px' : '18px' }}
            >
              {Math.round(safeProgress)}%
            </span>
            {label && (
              <span 
                className="text-zinc-400 font-bold uppercase tracking-wider truncate max-w-[90%] mt-0.5" 
                style={{ fontSize: size < 90 ? '9px' : '11px' }}
              >
                {label}
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProgressRing;
