import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

// Every colour resolves to a CSS variable defined in src/styles/globals.css,
// so there is exactly one place to change the palette.
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

// Tailwind's `blue` / `indigo` scales are re-pointed at signal-blue (#3B6EF6)
// so every existing `bg-blue-600` / `text-indigo-400` lands on-brand.
const signalBlue = {
  50: "#EEF3FF",
  100: "#DCE6FF",
  200: "#BFD0FF",
  300: "#9DB5FB",
  400: "#7C9BF7",
  500: "#3B6EF6",
  600: "#2F5CDB",
  700: "#2952C8",
  800: "#1F3F9A",
  900: "#1B3070",
  950: "#0E1830",
};

// Neutral scale re-pointed at the surface ramp / text tokens.
const neutral = {
  50: "#F7F8FB",
  100: "#F2F4F8",
  200: "#DDE1EB",
  300: "#C7CCDA",
  400: "#8A93A6",
  500: "#6F7C99",
  600: "#56627D",
  700: "#2A2F40",
  800: "#1A1F2C",
  900: "#12161F",
  950: "#0C0F16",
};

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // ── Tokens ────────────────────────────────────────────
        void: token("void"),
        "surface-1": token("surface-1"),
        "surface-2": token("surface-2"),
        "surface-3": token("surface-3"),
        line: token("line"),
        "line-strong": token("line-strong"),
        fg: token("fg"),
        "fg-muted": token("fg-muted"),
        "fg-subtle": token("fg-subtle"),
        signal: {
          blue: token("primary"),
          red: token("danger"),
        },
        danger: token("danger"),
        success: token("success"),
        warning: token("warning"),

        // ── shadcn-style aliases (used by ui/* components) ────
        background: token("void"),
        foreground: token("fg"),
        card: token("surface-1"),
        "card-foreground": token("fg"),
        popover: token("surface-2"),
        "popover-foreground": token("fg"),
        primary: { DEFAULT: token("primary"), foreground: "#FFFFFF" },
        secondary: { DEFAULT: token("surface-2"), foreground: token("fg") },
        muted: { DEFAULT: token("surface-2"), foreground: token("fg-muted") },
        accent: { DEFAULT: token("danger"), foreground: "#FFFFFF" },
        destructive: { DEFAULT: token("danger"), foreground: "#FFFFFF" },
        border: token("line"),
        input: token("line-strong"),
        ring: token("primary"),

        // ── Palette remaps ───────────────────────────────────
        blue: signalBlue,
        indigo: signalBlue,
        zinc: neutral,
        gray: neutral,
        slate: neutral,
        neutral,

        // Legacy names kept so nothing breaks while modules are migrated
        cyber: {
          blue: "#3B6EF6",
          darkblue: "#2952C8",
          red: "#EF4444",
          darkred: "#B91C1C",
          black: "#050608",
          obsidian: "#0C0F16",
          glass: "rgba(12, 15, 22, 0.85)",
        },
      },
      borderRadius: {
        lg: "0.875rem",   // 14px — controls
        md: "0.75rem",    // 12px — controls
        sm: "0.5rem",
        card: "1.25rem",  // 20px — cards
      },
      fontFamily: {
        sans: ["Manrope", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ["'IBM Plex Mono'", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      spacing: {
        "safe-b": "env(safe-area-inset-bottom, 0px)",
        "safe-t": "env(safe-area-inset-top, 0px)",
      },
      minHeight: {
        touch: "44px",
      },
      minWidth: {
        touch: "44px",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
