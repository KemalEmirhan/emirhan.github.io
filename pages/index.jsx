import React from 'react';
import Head from 'next/head';

// Import Local Components
import About from '@components/about';
import Account from '@components/accounts';

const Home = () => {
  return (
    <div className="w-full h-screen grid grid-rows-4 px-4 md:px-0 dark:bg-dark-background">
      <Head>
        <title>Emirhan Kosem</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;700&display=swap" rel="stylesheet" />
      </Head>

      <main className="container lg:container-md mx-auto my-auto flex flex-col md:items-center row-start-1 row-end-4">
        <About />
      </main>

      <footer className="container my-auto mx-auto row-start-4">
        <Account />
      </footer>
    </div>
  );
}

export default Home;
