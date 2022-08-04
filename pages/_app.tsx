import * as React from 'react';
import type { AppProps } from 'next/app';
import '@style/main.scss';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Component {...pageProps} />
  );
}

export default MyApp;
