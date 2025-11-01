/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'space-dark': '#0f172a', // slate-900
        'space-light': '#1e293b', // slate-800
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        sans: ['Roboto', 'sans-serif'],
      },
      keyframes: {
        'spinner-spin': {
          to: {
            transform: 'rotate(var(--final-rotation, 360deg))',
          },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
            from: { opacity: '0', transform: 'translateY(20px)' },
            to: { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        'spinner-spin': 'spinner-spin 3s cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'slide-up': 'slide-up 0.5s ease-out forwards',
      },
      transitionDuration: {
        '3000': '3000ms',
      }
    },
  },
  plugins: [],
}