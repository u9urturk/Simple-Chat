/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primaryColor: "#6200ee",
        primaryColorVol2:"#5100d4",
        backColor:"#f0f0f0"
      }
    },
  },
  plugins: [],
}