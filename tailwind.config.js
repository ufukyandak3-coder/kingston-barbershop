/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#EFEAD9',
        'paper-deep': '#E5DEC8',
        'paper-soft': '#F5F1E5',
        ink: '#1A1612',
        'ink-muted': '#6B6253',
        'ink-soft': '#9E9685',
        gold: '#8B7355',
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        body: ['Almarai', 'sans-serif'],
      },
      letterSpacing: {
        ultra: '0.4em',
      },
      transitionDuration: {
        400: '400ms',
        600: '600ms',
        800: '800ms',
      },
    },
  },
  plugins: [],
}
