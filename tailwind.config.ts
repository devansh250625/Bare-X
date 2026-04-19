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
        background: "#050507",
        foreground: "#FFFFFF",
        accent: "#3A86FF",
        "accent-light": "#5a9cff",
        muted: "#8B95A7",
        border: "rgba(255,255,255,0.08)",
        surface: "rgba(255,255,255,0.04)",
        "surface-hover": "rgba(255,255,255,0.08)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-space-grotesk)", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 60px rgba(58, 134, 255, 0.18)",
        "glow-lg": "0 0 100px rgba(58, 134, 255, 0.25)",
        "glow-xl": "0 0 140px rgba(58, 134, 255, 0.3)",
        luxury: "0 32px 100px -20px rgba(0, 0, 0, 0.6)",
        "card-hover": "0 40px 100px -20px rgba(58, 134, 255, 0.15), 0 20px 60px -10px rgba(0, 0, 0, 0.5)"
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)"
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        pulseGlow: "pulseGlow 3s ease-in-out infinite",
        "spin-slow": "spin 12s linear infinite",
        shimmer: "shimmer 2.5s ease-in-out infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" }
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.65" },
          "50%": { opacity: "1" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
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
