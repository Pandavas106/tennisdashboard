/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-primary': 'rgb(var(--color-bg-primary) / <alpha-value>)',
        'bg-secondary': 'rgb(var(--color-bg-secondary) / <alpha-value>)',
        'text-primary': 'rgb(var(--color-text-primary) / <alpha-value>)',
        'text-secondary': 'rgb(var(--color-text-secondary) / <alpha-value>)',
        'accent-primary': 'rgb(var(--color-accent-primary) / <alpha-value>)',
        'accent-secondary': 'rgb(var(--color-accent-secondary) / <alpha-value>)',
        'border': 'rgb(var(--color-border) / <alpha-value>)',
        'card-bg': 'rgb(var(--color-card-bg) / <alpha-value>)',
        'success': 'rgb(var(--color-success) / <alpha-value>)',
        'warning': 'rgb(var(--color-warning) / <alpha-value>)',
        'error': 'rgb(var(--color-error) / <alpha-value>)',
        'chart-bg': 'rgb(var(--color-chart-bg) / <alpha-value>)',
        'chart-grid': 'rgb(var(--color-chart-grid) / <alpha-value>)',
        'stats-bg': 'rgb(var(--color-stats-bg) / <alpha-value>)',
      },
      backgroundImage: {
        'gradient-primary': 'var(--gradient-primary)',
      },
    },
  },
  plugins: [],
}
