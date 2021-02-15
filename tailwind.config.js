module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        'company-blue': '#1e64ff',
        'dark-background': '#070910',
        'dark-text-color': '#c9d1d9',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
