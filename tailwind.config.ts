import type { Config } from "tailwindcss";

/**
 * Corewell Systems design tokens — see docs/spec.md Section 4.
 * Color values live as CSS variables in app/globals.css (RGB channel triplets
 * so Tailwind opacity modifiers like `bg-accent/10` keep working).
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Backgrounds — warm off-white, never pure white page bg
        canvas: {
          DEFAULT: "rgb(var(--color-canvas) / <alpha-value>)",
          subtle: "rgb(var(--color-canvas-subtle) / <alpha-value>)",
        },
        // Card/raised surfaces
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        // Primary text & headings — deep navy / near-charcoal
        ink: {
          DEFAULT: "rgb(var(--color-ink) / <alpha-value>)",
          strong: "rgb(var(--color-ink-strong) / <alpha-value>)",
        },
        // Warm-gray neutrals for secondary text
        soft: "rgb(var(--color-soft) / <alpha-value>)",
        faint: "rgb(var(--color-faint) / <alpha-value>)",
        // Borders / dividers
        line: "rgb(var(--color-line) / <alpha-value>)",
        // Single accent — teal. CTAs, active states, key icons only. Never backgrounds.
        accent: {
          DEFAULT: "rgb(var(--color-accent) / <alpha-value>)",
          strong: "rgb(var(--color-accent-strong) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        display: "-0.02em",
      },
      maxWidth: {
        // Max content width per spec: ~1200–1280px
        content: "77.5rem", // 1240px
      },
    },
  },
  plugins: [],
};

export default config;
