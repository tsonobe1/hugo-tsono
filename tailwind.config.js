/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./themes/my-high-contrast-theme/layouts/**/*.html",
    "./layouts/**/*.html",
    "./content/**/*.{md,org}",
    "./assets/**/*.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'bg-dark': '#1a1a1a',
        'text-dark': '#e0e0e0',
        'link-dark': '#61dafb',
        'link-hover-dark': '#4dff58',
        'accent-dark': '#282c34',
        'border-dark': '#444',
        'button-dark': '#333',
        'bg-light': '#ffffff',
        'text-light': '#222222',
        'link-light': '#007acc',
        'link-hover-light': '#005599',
        'accent-light': '#f8f9fa',
        'border-light': '#dee2e6',
        'button-light': '#e9ecef',
      },
      fontFamily: {
        'sans': ['-apple-system', 'BlinkMacSystemFont', '"Hiragino Kaku Gothic ProN"', '"Hiragino Sans"', 'Meiryo', 'sans-serif'],
      },
      maxWidth: {
        'container': '800px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
