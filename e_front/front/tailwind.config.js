/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "23px 23px 46px rgba(0, 0, 0, 0.3)",
      },
      animation: {
        disappear: "disappear 0.6s",
        appear: "appear 0.6s",
      },
      keyframes: {
        appear: {
          "0% ": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        disappear: {
          "0% ": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
            display: "none",
          },
        },
      },
    },
  },
  plugins: [],
};
