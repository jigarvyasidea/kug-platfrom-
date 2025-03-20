/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'kotlin-blue': '#1a73e8',
        'kotlin-orange': '#f88909',
        'kotlin-purple': '#7f52ff',
      },
    },
  },
  plugins: [],
}
