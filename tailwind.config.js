/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        chicago: ['Chicago', 'Geneva', 'Arial', 'sans-serif'],
        vt323: ['VT323', 'monospace'],
      },
      colors: {
        mac: {
          gray: '#cecece',
          blue: '#7d88c2',
          dark: '#333333',
        }
      },
      boxShadow: {
        'retro': '2px 2px 0px rgba(0,0,0,0.5)',
        'retro-lg': '4px 4px 0px rgba(0,0,0,0.8)',
      }
    },
  },
  plugins: [],
}