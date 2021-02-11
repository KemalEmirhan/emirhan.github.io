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
        extend: {
          colors: {
            'company-blue': '#1e64ff',
          }
        },
      },
      variants: {
        extend: {},
      },
      plugins: [],
}