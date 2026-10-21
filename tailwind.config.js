/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: '#fbf8f5',
          100: '#f6f0ea',
          200: '#eddcd0',
          300: '#dfc2ad',
          400: '#cd9f82',
          500: '#b87d5e',
          600: '#9b5f42',
          700: '#75452f',
          800: '#5c3523',
          900: '#432818', // Primary Dark Coffee
          950: '#26150b',
        },
        theme: {
          primary: 'var(--color-primary)',
          'primary-hover': 'var(--color-primary-hover)',
          'primary-fg': 'var(--color-primary-fg)',
          'bg-light': 'var(--color-bg-light)',
          'bg-card': 'var(--color-bg-card)',
          'bg-footer': 'var(--color-bg-footer)',
          border: 'var(--color-border)',
          'text-main': 'var(--color-text-main)',
          'text-muted': 'var(--color-text-muted)',
          star: 'var(--color-star)',
          'discount-bg': 'var(--color-discount-bg)',
          'discount-fg': 'var(--color-discount-fg)',
          verified: 'var(--color-verified)',
          'input-bg': 'var(--color-input-bg)',
        }
      },
      fontFamily: {
        display: ['"Integral CF"', '"Montserrat"', '"Cabinet Grotesk"', 'sans-serif'],
        sans: ['"Satoshi"', '"Inter"', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
