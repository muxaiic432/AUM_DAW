/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'daw-dark': '#1a1a1a',
        'daw-darker': '#0f0f0f',
        'daw-accent': '#3b82f6',
        'daw-secondary': '#6366f1',
        'daw-success': '#10b981',
        'daw-warning': '#f59e0b',
        'daw-error': '#ef4444',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}