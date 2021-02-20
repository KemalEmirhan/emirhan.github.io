import React from 'react';
import 'tailwindcss/tailwind.css';

const MyApp = ({ Component, pageProps }) => {

  React.useEffect(() => {
    localStorage.setItem('theme', 'light');
  }, []);
  
  return <Component {...pageProps} />
}

export default MyApp;
