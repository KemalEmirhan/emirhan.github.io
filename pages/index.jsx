import React from 'react';
import Head from 'next/head';

// Import Local Components
import About from '@components/about';
import Account from '@components/accounts';
import Photo from '@components/photo';

const Home = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <Head>
        <title>Emirhan Kosem</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;700&display=swap" rel="stylesheet" />
      </Head>

      <main className="container mx-auto">
        <div className="flex items-center">
          <Photo />
          <About />
        </div>
        <Account />
      </main>
    </div>
  );
}

export default Home;
