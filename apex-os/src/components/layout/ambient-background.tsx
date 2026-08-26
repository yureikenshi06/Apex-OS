import React from 'react';
import { motion } from 'framer-motion';

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Deep Obsidian Base */}
      <div className="absolute inset-0 bg-[#05060a]" />

      {/* Cyber Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #3b82f6 1px, transparent 1px),
            linear-gradient(to bottom, #ef4444 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Animated Electric Blue Nebula Orb (Top-Left / Center Drift) */}
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.15, 0.95, 1],
          opacity: [0.35, 0.5, 0.35],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full bg-gradient-to-br from-blue-600/30 via-indigo-700/20 to-transparent blur-[120px]"
      />

      {/* Animated Crimson Red Nebula Orb (Bottom-Right / Corner Drift) */}
      <motion.div
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 50, -30, 0],
          scale: [1, 1.2, 0.9, 1],
          opacity: [0.3, 0.45, 0.3],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -bottom-[15%] -right-[10%] w-[60vw] h-[60vw] max-w-[750px] max-h-[750px] rounded-full bg-gradient-to-tl from-red-600/25 via-rose-700/20 to-transparent blur-[130px]"
      />

      {/* Central Blue-Red Dual Pulse Core */}
      <motion.div
        animate={{
          scale: [0.9, 1.1, 0.9],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-tr from-blue-500/15 via-purple-600/10 to-red-500/15 blur-[100px]"
      />

      {/* Subtle Scanline / Vignette */}
      <div className="absolute inset-0 bg-radial-vignette opacity-40" />
    </div>
  );
}
