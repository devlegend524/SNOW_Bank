/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,css,scss}',],
  theme: {
    extend: {
      colors: {
        primary: '#16171E',
        secondary: '#1F212A',
        symbol: '#fd2fff',
        symbolHover: '#ca21cb',
        symbolBorder: '#ac26d53d'
      }
    },
  },
  plugins: [],
}

