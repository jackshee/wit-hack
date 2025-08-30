/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        background: 'var(--color-background)',
        'content-bg': 'var(--color-content-bg)',
        text: 'var(--color-text)',
        border: 'var(--color-border)',
        success: 'var(--color-success)',
      },
      fontFamily: {
        'heading': ['Baloo 2', 'cursive'],
        'body': ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 