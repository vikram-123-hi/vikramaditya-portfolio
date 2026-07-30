/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        terminal: '#00ff41',
        'terminal-dim': '#00cc33',
        dark: '#0a0a0a',
        'dark-panel': '#111111',
        'dark-border': '#1a1a1a',
      },
      fontFamily: {
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};
