/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['InterVariable', 'sans-serif'],
        poppins: ['PoppinsVariable', 'sans-serif'],
      },
      transitionProperty: {
      'colors': 'background-color, border-color, color, fill, stroke',
    },
    },
  },
  plugins: [],
}