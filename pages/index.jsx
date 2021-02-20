import React from 'react';
import Head from 'next/head';

// Import Local Components
import About from '@components/about';
import Account from '@components/accounts';
import Header from '@components/header';

const Home = () => {
  return (
    <main className="w-full h-screen grid grid-rows-4 px-4 md:px-0 dark:bg-dark-background">
      <Head>
        <title>Emirhan Kosem</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;700&display=swap" rel="stylesheet" />
      </Head>

      <header className="container lg:container-md mx-auto my-auto row-start-1 row-end-2">
        <Header />
      </header>
      
      <section className="container lg:container-md mx-auto my-auto flex flex-col md:items-center row-start-2 row-end-4">
        <About />
      </section>

      <footer className="container my-auto mx-auto row-start-4">
        <Account />
      </footer>
    </main>
  );
}

export default Home;
