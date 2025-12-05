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
        background: "#F7FAFC",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#1A73E8",
          50: "#e8f0fe",
          100: "#d2e7fd",
          200: "#a5cffb",
          300: "#78b7f9",
          400: "#4b9ff7",
          500: "#1A73E8",
          600: "#1559ba",
          700: "#0f3f8b",
          800: "#0a255d",
          900: "#050b2e",
        },
        secondary: {
          DEFAULT: "#0B3C61",
          50: "#e6f0f5",
          100: "#cce1eb",
          200: "#99c3d7",
          300: "#66a5c3",
          400: "#3387af",
          500: "#0B3C61",
          600: "#09304e",
          700: "#07243a",
          800: "#041827",
          900: "#020c13",
        },
        aqua: {
          50: "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",
        },
      },
    },
  },
  plugins: [],
};
export default config;

