/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,css,scss}',],
  theme: {
    extend: {
      colors: {
        primary: '#020d1e',
        secondary: '#111c29',
        symbol: '#fd2fff',
        symbolHover: '#ca21cb',
        symbolBorder: '#ac26d53d'
      }
    },
  },
  plugins: [],
}

