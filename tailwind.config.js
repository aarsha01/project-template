/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "pulse-fast": "pulse 1s linear infinite",
      },
    },
  },
  plugins: [],
};
