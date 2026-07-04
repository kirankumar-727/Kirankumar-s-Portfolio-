import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0EA5C6",
          50: "#ECFCFF",
          100: "#CFF6FD",
          200: "#A5ECFB",
          300: "#67DDF7",
          400: "#22C6EA",
          500: "#0EA5C6",
          600: "#0B85A6",
          700: "#106A86",
          800: "#15576E",
          900: "#16495D",
        },
        secondary: "#111827",
        surface: "#F8FAFC",
        line: "#E5E7EB",
        ink: "#111827",
        muted: "#6B7280",
        success: "#10B981",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "ui-sans-serif", "system-ui", "sans-serif"],
        kannada: [
          "var(--font-kannada)",
          "var(--font-jakarta)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      borderRadius: {
        xl: "18px",
        "2xl": "20px",
        "3xl": "24px",
      },
      boxShadow: {
        soft: "0 2px 8px rgba(17, 24, 39, 0.04), 0 8px 24px rgba(17, 24, 39, 0.06)",
        card: "0 1px 2px rgba(17, 24, 39, 0.04), 0 12px 32px rgba(17, 24, 39, 0.08)",
        lift: "0 18px 48px rgba(17, 24, 39, 0.12)",
        glow: "0 0 0 1px rgba(14, 165, 198, 0.18), 0 18px 48px rgba(14, 165, 198, 0.18)",
      },
      maxWidth: {
        container: "1200px",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
