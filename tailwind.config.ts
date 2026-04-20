import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./store/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAF9F7",
        foreground: "#1A1A2E",
        accent: "#3A86FF",
        "accent-soft": "#EBF2FF",
        muted: "#8E8E9A",
        surface: "#FFFFFF",
        "surface-dark": "#141420",
        warm: "#F5F0EB",
        "warm-dark": "#E8DFD6",
        blush: "#F8E8E0",
        sage: "#E8F0E8",
        lavender: "#EEEBF5"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-space-grotesk)", "sans-serif"]
      },
      boxShadow: {
        soft: "0 2px 20px rgba(26, 26, 46, 0.06)",
        card: "0 4px 24px rgba(26, 26, 46, 0.04)",
        "card-hover": "0 8px 40px rgba(26, 26, 46, 0.08)",
        elevated: "0 8px 48px rgba(26, 26, 46, 0.06)"
      },
      animation: {
        float: "float 5s ease-in-out infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" }
        }
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.23, 1, 0.32, 1)"
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem"
      }
    }
  },
  plugins: []
};

export default config;
