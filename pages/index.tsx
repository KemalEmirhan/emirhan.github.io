import * as React from 'react';
import Head from 'next/head';

import About from '@components/About/About';
import Account from '@components/Accounts/Accounts';
import Header from '@components/Header/Header';

const Home = (): React.ReactElement => {
  return (
    <main>
      <Head>
        <title>emrhnksm</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;700&display=swap" rel="stylesheet" />
      </Head>

      <header>
        <Header />
      </header>
      
      <section>
        <About />
      </section>

      <footer>
        <Account />
      </footer>
    </main>
  );
}

export default Home;
