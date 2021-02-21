import React from 'react';
import 'tailwindcss/tailwind.css';

const MyApp = ({ Component, pageProps }) => {
  
  React.useEffect(() => {  
    const html = document.documentElement;
    
    localStorage.setItem('theme', 'light');
    if (html) html.classList.add('light');
  }, []);
  
  return <Component {...pageProps} />
}

export default MyApp;
