import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        // Theme-aware colors
        bg: {
          base: "var(--bg-base)",
          surface: "var(--bg-surface)",
          card: "var(--bg-card)"
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)"
        },
        accent: {
          cyan: "var(--accent-cyan)",
          blue: "var(--accent-blue)",
          purple: "var(--accent-purple)",
          pink: "var(--accent-pink)",
          DEFAULT: "var(--accent-cyan)"
        },
        border: "var(--border-color)",
        // Legacy colors for backward compatibility
        panel: "#0e1230",
        glow: "#5c7cff"
      },
      boxShadow: {
        glass: "0 20px 55px -20px var(--shadow-color)",
        card: "0 10px 40px -15px var(--shadow-color)",
        "card-hover": "0 20px 60px -15px var(--shadow-color)"
      },
      backgroundImage: {
        grid: "radial-gradient(circle at 1px 1px, var(--border-color) 1px, transparent 0)"
      }
    }
  },
  plugins: []
};

export default config;
