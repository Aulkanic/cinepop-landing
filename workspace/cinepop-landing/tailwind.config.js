/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink)',
        crimson: 'var(--crimson)',
        rose: 'var(--rose)',
        champagne: 'var(--champagne)',
        slate: 'var(--slate)'
      },
      fontFamily: {
        display: ['Bebas Neue', 'Anton', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif']
      },
      boxShadow: {
        neon: '0 0 24px rgba(225,25,58,.35)'
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: 1 },
          '10%': { opacity: 0.8 },
          '20%': { opacity: 1 },
          '30%': { opacity: 0.6 },
          '40%': { opacity: 1 },
        },
      },
      animation: {
        flicker: 'flicker 1.2s ease-out 1'
      }
    },
  },
  plugins: [],
}

