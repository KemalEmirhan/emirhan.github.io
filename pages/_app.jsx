import React from 'react';
import '@style/index.css';

import { AppProvider } from 'src/context';

const MyApp = ({ Component, pageProps }) => {

  React.useEffect(() => {
    const html = document.documentElement;
    html.classList.add('light');
  }, []);

  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default MyApp;
