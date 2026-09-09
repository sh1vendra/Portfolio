/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#080a09',
          900: '#0e110f',
          800: '#161b17',
          700: '#222a24',
        },
        gold: {
          300: '#d9ffb1',
          400: '#c5fb89',
          500: '#b0ef72',
          600: '#437620',
          700: '#315a16',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
