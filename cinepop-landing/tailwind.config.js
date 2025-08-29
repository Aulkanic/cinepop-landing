/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Outfit"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        brand: ['"Coiny"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          purple: '#7C3AED',
          pink: '#EC4899',
        },
      },
      boxShadow: {
        glow: '0 0 120px 40px rgba(124,58,237,0.35)',
      },
    },
  },
  plugins: [],
}

