import * as React from 'react';
import Head from 'next/head';

import About from '@components/About/About';
import Account from '@components/Accounts/Accounts';
import Header from '@components/Header/Header';

const Home = (): React.ReactElement => {
  return (
    <main className='page'>
      <Head>
        <title>emrhnksm</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className='nav-menu'>
        <Header />
      </nav>
      
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
