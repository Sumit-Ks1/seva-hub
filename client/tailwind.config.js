/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/App.css", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: { "spread-white": "0 0 18px 6px rgba(255, 255, 255, 0.4)" },
    },
  },
  plugins: [],
};
