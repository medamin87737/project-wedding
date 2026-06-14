import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: "#F5E6E8",
        "blush-light": "#FDF2F5",
        "blush-dark": "#FCE4EC",
        peach: "#F9DED3",
        "peach-warm": "#F5E1DA",
        "dusty-rose": "#E8C4B8",
        "text-dark": "#2D2926",
        "text-brown": "#3E2723",
        "text-wine": "#5D3A3A",
        gold: "#C5A059",
        "gold-light": "#D4AF37",
        "gold-dark": "#8B6914",
        "beige-warm": "#7A5C3E",
        "beige-soft": "#F8EBE0",
        "zen-cream": "#F8F0EA",
        "zen-glass": "rgba(255, 250, 247, 0.72)",
        olive: "#6B6E5E",
        "arch-fill": "#FAF0ED",
        admin: {
          bg: "#1a1816",
          surface: "#252220",
          elevated: "#2e2a27",
          border: "rgba(197, 160, 89, 0.22)",
          text: "#ebe4dc",
          muted: "rgba(235, 228, 220, 0.55)",
        },
      },
      fontFamily: {
        script: ["var(--font-great-vibes)", "cursive"],
        display: ["var(--font-cormorant)", "serif"],
        arabic: ["var(--font-amiri)", "var(--font-scheherazade)", "serif"],
        body: ["var(--font-cormorant)", "serif"],
      },
      animation: {
        "fade-in": "fadeIn 1s ease-out forwards",
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "envelope-open": "envelopeOpen 1.2s ease-in-out forwards",
        "bounce-slow": "bounceSlow 2s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        envelopeOpen: {
          "0%": { transform: "rotateX(0deg)" },
          "100%": { transform: "rotateX(-180deg)" },
        },
        bounceSlow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      maxWidth: {
        mobile: "430px",
      },
    },
  },
  plugins: [],
};

export default config;
