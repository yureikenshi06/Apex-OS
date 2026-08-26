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
        background: "#05060a",
        foreground: "#f8fafc",
        card: "#0c1019",
        "card-foreground": "#f8fafc",
        popover: "#0c1019",
        "popover-foreground": "#f8fafc",
        primary: "#3b82f6", // Electric Cyber Blue
        "primary-foreground": "#ffffff",
        secondary: "#111827",
        "secondary-foreground": "#f8fafc",
        accent: "#ef4444", // Crimson Neon Red
        "accent-foreground": "#ffffff",
        muted: "#131b2e",
        "muted-foreground": "#94a3b8",
        border: "#1e293b",
        destructive: "#ef4444",
        "destructive-foreground": "#ffffff",
        ring: "#3b82f6",
        cyber: {
          blue: "#3b82f6",
          darkblue: "#1d4ed8",
          red: "#ef4444",
          darkred: "#b91c1c",
          black: "#05060a",
          obsidian: "#0a0e17",
          glass: "rgba(12, 16, 25, 0.85)",
        },
      },
      borderRadius: {
        lg: "0.85rem",
        md: "0.6rem",
        sm: "0.35rem",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
