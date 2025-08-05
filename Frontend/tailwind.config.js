/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // ← ativa o modo escuro baseado em classe
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['InterVariable', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
