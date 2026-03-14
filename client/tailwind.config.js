/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: "#1B4332",
        green:  "#2D6A4F",
        mid:    "#40916C",
        light:  "#74C69D",
        pale:   "#D8F3DC",
        gold:   "#C8922A",
      },
    },
  },
  plugins: [],
};