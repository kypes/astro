/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        custom:
          "0 10px 40px -10px rgba(0, 0, 0, 0.1), 0 2px 20px -10px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        dark: {
          primary: "#f59e0b", // Amber/gold
          secondary: "#0ea5e9", // Sky blue
          accent: "#10b981", // Emerald
          neutral: "#1f2937",
          "base-100": "#1d232a",
          "base-200": "#191e24",
          "base-300": "#15191e",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
      },
    ],
  },
};
