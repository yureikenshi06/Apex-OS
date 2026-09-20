import React from 'react';
import { useReducedMotion } from 'framer-motion';

export function AmbientBackground() {
  const prefersReduced = useReducedMotion();

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Deep Obsidian Base */}
      <div className="absolute inset-0 bg-[#05060a]" />

      {/* Cyber Grid Overlay — very light, no GPU cost */}
      <div
        className="absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #3b82f6 1px, transparent 1px),
            linear-gradient(to bottom, #ef4444 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* 
        Animated orbs use pure CSS @keyframes defined in globals.css.
        - will-change + translateZ(0) forces GPU compositing layer → no layout thrash
        - Reduced blur (80px vs 130px) cuts fill-rate cost dramatically on mobile
        - prefers-reduced-motion collapses animation-duration to 0s (instant / frozen)
      */}

      {/* Blue Nebula — top-left */}
      <div
        className="apex-orb apex-orb-blue absolute -top-[15%] -left-[10%] rounded-full"
        style={{
          width: 'min(55vw, 600px)',
          height: 'min(55vw, 600px)',
          background: 'radial-gradient(circle, rgba(59,130,246,0.28) 0%, rgba(99,102,241,0.14) 50%, transparent 75%)',
          filter: 'blur(80px)',
          willChange: prefersReduced ? 'auto' : 'transform',
          transform: 'translateZ(0)',
          animationPlayState: prefersReduced ? 'paused' : 'running',
        }}
      />

      {/* Red Nebula — bottom-right */}
      <div
        className="apex-orb apex-orb-red absolute -bottom-[15%] -right-[10%] rounded-full"
        style={{
          width: 'min(60vw, 650px)',
          height: 'min(60vw, 650px)',
          background: 'radial-gradient(circle, rgba(239,68,68,0.22) 0%, rgba(220,38,38,0.12) 50%, transparent 75%)',
          filter: 'blur(80px)',
          willChange: prefersReduced ? 'auto' : 'transform',
          transform: 'translateZ(0)',
          animationPlayState: prefersReduced ? 'paused' : 'running',
        }}
      />

      {/* Central pulse core — subtle, cheapest to animate */}
      <div
        className="apex-orb apex-orb-pulse absolute top-1/3 left-1/2 -translate-x-1/2 rounded-full"
        style={{
          width: 'min(38vw, 440px)',
          height: 'min(38vw, 440px)',
          background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, rgba(59,130,246,0.08) 50%, transparent 75%)',
          filter: 'blur(70px)',
          willChange: prefersReduced ? 'auto' : 'transform, opacity',
          transform: 'translateX(-50%) translateZ(0)',
          animationPlayState: prefersReduced ? 'paused' : 'running',
        }}
      />

      {/* Subtle vignette — static, zero cost */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(5,6,10,0.7) 100%)',
        }}
      />
    </div>
  );
}
