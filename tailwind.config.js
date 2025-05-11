/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // <-- This is crucial!
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        beat: 'beat 1.5s ease-in-out infinite',
      },
      keyframes: {
        beat: {
          '0%, 100%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.1)' },
        },
      },
    },
  },
  plugins: [],
};
