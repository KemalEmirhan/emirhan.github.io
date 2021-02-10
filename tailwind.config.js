module.exports = {
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false,
    theme: {
        screens: {
          sm: '480px',
          md: '768px',
          lg: '976px',
          xl: '1440px',
        },
        colors: {
          black: '#111',
          white: '#fff',
        },
        extend: {},
      },
      variants: {
        extend: {},
      },
      plugins: [],
}