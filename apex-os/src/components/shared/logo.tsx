import { cn } from '@/lib/utils';

/** Apex mark: blue→red gradient tile with a void-coloured peak. */
export function Logo({ size = 30, className }: { size?: number; className?: string }) {
  return (
    <div
      className={cn('grid shrink-0 place-items-center', className)}
      style={{
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.3),
        background: 'linear-gradient(135deg, #3B6EF6, #EF4444)',
      }}
      aria-hidden
    >
      <div
        style={{
          width: size * 0.4,
          height: size * 0.4,
          background: '#050608',
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          borderRadius: 2,
        }}
      />
    </div>
  );
}
