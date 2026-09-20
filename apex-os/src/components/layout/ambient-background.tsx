/**
 * ONE ambient glow per screen.
 *
 * - Phones: a single static radial gradient (top-right). No animation, no
 *   blur filter — a gradient is essentially free on any GPU.
 * - Desktop (≥1024px): the same glow drifts very slowly (transform only,
 *   opacity ≤ .10). Paused under prefers-reduced-motion (see .apex-glow).
 *
 * It replaces the previous three animated, 80px-blurred orbs plus grid overlay.
 */
export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 select-none overflow-hidden bg-void">
      <div
        className="apex-glow absolute -right-[100px] -top-[120px] h-[280px] w-[280px] rounded-full lg:-right-[160px] lg:-top-[200px] lg:h-[560px] lg:w-[560px]"
        style={{
          background:
            'radial-gradient(circle, rgb(59 110 246 / 0.16) 0%, rgb(59 110 246 / 0) 70%)',
        }}
      />
    </div>
  );
}
