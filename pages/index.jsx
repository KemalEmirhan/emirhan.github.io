import React from 'react';
import Head from 'next/head';

// Import Local Components
import About from '@components/about';
import Photo from '@components/photo';
import Account from '@components/accounts';

const Home = () => {
  return (
    <div className="page">
      <Head>
        <title>Emirhan</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;700&display=swap" rel="stylesheet" />
      </Head>

      <main className="container">
        <div>
          <About />
          <Photo />
        </div>
        
        <Account />
      </main>
    </div>
  );
}

export default Home;
