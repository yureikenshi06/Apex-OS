# Apex OS — Redesign Suggestions

Companion notes to the design canvas. Covers what's wrong with the current UI, what changes, and new features worth adding.

## What's wrong with the current build

- **No single source of truth for color.** `globals.css`, `tailwind.config.ts`, and individual components (`stat-card.tsx`, `home-page.tsx`, `sidebar.tsx`, etc.) each hardcode their own background hex — `#05060a`, `#090d16`, `#0c1019`, `#0b0f19`, `#111827`, `#080b16` all appear as "the card background" in different places. Nothing reads as one coherent surface — it reads as many similar-but-different grays stacked together.
- **Monospace overused.** Nav labels, badges, section headers, and buttons are frequently set in a mono/uppercase-tracked style borrowed from the numeric stat displays. It makes the whole app feel like a terminal dashboard rather than a product people relax into using.
- **Too much simultaneous decoration.** Individual cards each carry their own gradient wash, border glow, hover-glow, and backdrop blur. On a single dashboard screen this stacks into 4-5 different glow effects competing for attention, so nothing is actually emphasized.
- **Mobile is under-designed, not just "responsive."** The ambient background orbs are correctly disabled on mobile (good instinct for GPU cost), but nothing replaced them — mobile just loses an effect rather than gaining a mobile-appropriate one. The 2×2 stat grid gets cramped at phone width. The "Smart Attention Radar" section renders as a 2-column grid that doesn't fit a phone screen well and pushes content down.
- **Animation is decorative, not functional.** Most motion is a generic `opacity: 0, y: 12 → opacity: 1, y: 0` stagger applied uniformly to every list and card. It doesn't communicate anything — it's the same fade for a completed task, a new stat, and a schedule block.
- **Contrast and target-size issues on small text.** A lot of secondary text sits at 9-11px in `zinc-500`/`zinc-600` on a near-black background — borderline for accessibility and hard to read on a phone screen outdoors or at a glance.

## What the redesign changes

- **One surface ramp**: `void` (#050608) → `surface-1` (#0C0F16) → `surface-2` (#12161F) → `surface-3` (#1A1F2C), used everywhere instead of ad hoc hex values. One border color (`#1A2030`) and one radius scale (20px cards, 12-14px controls).
- **Manrope for all reading text**; monospace (IBM Plex Mono) reserved strictly for numbers, timestamps, and currency — this alone makes the biggest difference in how "designed" vs. "hacked together" the app feels.
- **One ambient glow per screen**, not three animated orbs. Cheaper on mobile GPUs, and it stops competing with the content for attention.
- **Motion with a purpose**: a defined set of transitions — 180ms enter (translateY 8px→0), 90ms press (scale to 0.97, the only feedback mobile taps get since there's no hover), 260ms task-complete (checkbox fills + row flashes success-tint before settling), and the score ring fills in on load rather than snapping in.
- **Mobile-first bottom nav**: 4 tabs plus a centered FAB, 44px+ touch targets, safe-area-aware padding, no overlap between the FAB and the tab bar.
- **Stat cards scroll horizontally on phone** instead of being squeezed into a 2-column grid — each card keeps its full size and legibility.
- **Attention/alerts collapse to the single most urgent item on mobile** instead of a 2-column alert grid, so it doesn't eat the fold.

## New features worth adding

1. **Voice log quick-add** — speak an expense, task, or workout log; parse it (on-device or via a lightweight API call) before writing to Supabase. Fits directly into the existing quick-add sheet pattern and removes the main friction point for logging on the go, which is where most entries actually happen.

2. **Weekly digest card** — an auto-generated Sunday-night summary (CFA hours vs. plan, spend vs. budget, habit consistency, streaks at risk) shown as a dismissible card on Home. This reuses the `daily-digest-modal` pattern that already exists in the codebase, just at a weekly cadence and with a broader rollup.

3. **Streak-aware notifications** — instead of separate reminders per module, one daily notification timed around whichever streak is most at risk that day (workout, CFA, habits). Uses the PWA's existing service worker — no new infrastructure needed.

4. **Command palette actions, not just navigation** — extend Cmd+K (and a mobile equivalent) to execute actions directly: `add task: finish LOS 12`, `log expense 340 dining`, rather than only jumping between pages. This turns the palette into a genuine power-user shortcut instead of a fancy search bar.

5. **Per-card offline-sync indicator** — the sync status dot already exists in `sync-store.ts` but only shows in the header/sidebar. Surfacing a small "queued" indicator directly on any card with unsynced edits makes it obvious *which* changes haven't synced yet when connectivity drops mid-session, instead of a single ambiguous global status.

## Suggested rollout order

1. Design tokens first (`globals.css` + `tailwind.config.ts`) — this alone fixes most of the visual inconsistency with minimal component-level changes, since components already reference token names like `bg-card`, `text-muted-foreground`, etc.
2. Layout shell (sidebar, header, bottom nav, ambient background) — highest visibility, used on every screen.
3. Shared components (`Card`, `Button`, `StatCard`, badges) — cascades the new look through every module automatically.
4. Per-module polish (Home, Finance, Timetable, Fitness, CFA, Tasks) — mostly spacing/hierarchy cleanup once tokens and shared components are fixed.
5. New features, roughly in the order listed above (voice quick-add and the weekly digest are the highest-leverage, lowest-effort additions given what already exists in the codebase).
