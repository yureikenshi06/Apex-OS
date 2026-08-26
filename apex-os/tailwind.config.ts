import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0f",
        foreground: "#fafafa",
        card: "#111118",
        "card-foreground": "#fafafa",
        popover: "#111118",
        "popover-foreground": "#fafafa",
        primary: "#6366f1",
        "primary-foreground": "#fafafa",
        secondary: "#1e1e2e",
        "secondary-foreground": "#fafafa",
        accent: "#6366f1",
        "accent-foreground": "#fafafa",
        muted: "#1e1e2e",
        "muted-foreground": "#a1a1aa",
        border: "#27272a",
        destructive: "#ef4444",
        "destructive-foreground": "#fafafa",
        ring: "#6366f1",
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.25rem",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
