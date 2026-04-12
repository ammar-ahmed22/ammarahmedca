import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-mono)"],
        mono: ["var(--font-mono)"],
        display: ["var(--font-display)"],
        serif: ["var(--font-display)"],
      },
      fontSize: {
        "2xs": ["0.6875rem", "1rem"],
        xs: ["0.75rem", "1.1rem"],
        sm: ["0.8125rem", "1.35rem"],
        base: ["0.9375rem", "1.6"],
        lg: ["1.0625rem", "1.6"],
        xl: ["1.25rem", "1.4"],
        "2xl": ["1.5rem", "1.3"],
        "3xl": ["1.875rem", "1.2"],
        "4xl": ["clamp(2rem, 4vw, 2.75rem)", "1.05"],
        "5xl": ["clamp(2.5rem, 6vw, 4rem)", "1"],
        "6xl": ["clamp(3rem, 8vw, 5.5rem)", "0.95"],
        "7xl": ["clamp(4rem, 10vw, 7rem)", "0.95"],
      },
      colors: {
        background: "oklch(var(--bg) / <alpha-value>)",
        foreground: "oklch(var(--fg) / <alpha-value>)",
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted) / <alpha-value>)",
        },
        surface: "oklch(var(--surface) / <alpha-value>)",
        border: "oklch(var(--border) / <alpha-value>)",
        input: "oklch(var(--border) / <alpha-value>)",
        ring: "oklch(var(--fg) / <alpha-value>)",
        card: {
          DEFAULT: "oklch(var(--bg) / <alpha-value>)",
          foreground: "oklch(var(--fg) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "oklch(var(--bg) / <alpha-value>)",
          foreground: "oklch(var(--fg) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "oklch(var(--fg) / <alpha-value>)",
          foreground: "oklch(var(--bg) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "oklch(var(--surface) / <alpha-value>)",
          foreground: "oklch(var(--fg) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--surface) / <alpha-value>)",
          foreground: "oklch(var(--fg) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "oklch(var(--fg) / <alpha-value>)",
          foreground: "oklch(var(--bg) / <alpha-value>)",
        },
      },
      borderRadius: {
        none: "0",
        sm: "0",
        DEFAULT: "0",
        md: "0",
        lg: "0",
        xl: "0",
        "2xl": "0",
        "3xl": "0",
        full: "9999px",
      },
      spacing: {
        section: "clamp(3rem, 8vw, 6rem)",
      },
      keyframes: {
        "cursor-blink": {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "cursor-blink": "cursor-blink 1.1s steps(1) infinite",
        "fade-up": "fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  darkMode: "class",
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
