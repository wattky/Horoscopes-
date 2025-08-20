/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'rgb(255 255 255)',
        foreground: 'rgb(10 10 10)',
        muted: 'rgb(245 245 246)',
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}
