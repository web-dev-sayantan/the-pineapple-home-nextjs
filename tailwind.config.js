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
        toYellow: {
          "0%": { color: colors.transparent },
          "25%": { color: colors.transparent },
          "100%": { color: colors.yellow[400] },
        },
        toTeal: {
          "0%": { color: colors.transparent },
          "50%": { color: colors.transparent },
          "100%": { color: colors.teal[600] },
        },
      },
      animation: {
        toYellow: "toYellow 3s ease-in",
        toTeal: "toTeal 4s ease-in",
      },
    },
  },
  plugins: [],
};
