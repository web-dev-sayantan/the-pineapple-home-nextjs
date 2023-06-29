const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        toPink: {
          "0%": { color: colors.transparent },
          "25%": { color: colors.transparent },
          "100%": { color: colors.fuchsia[400] },
        },
        toViolet: {
          "0%": { color: colors.transparent },
          "50%": { color: colors.transparent },
          "100%": { color: colors.violet[600] },
        },
        skeletonLoading: {
          "0%": {
            backgroundColor: 'hsl(200, "20%", "80%")',
          },
          "100%": {
            backgroundColor: 'hsl(200, "20%", "95%")',
          },
        },
      },
      animation: {
        toPink: "toPink 3s ease-in",
        toViolet: "toViolet 4s ease-in",
        skeletonLoading: "skeletonLoading 1s linear infinite alternate",
      },
    },
  },
  plugins: [],
};
