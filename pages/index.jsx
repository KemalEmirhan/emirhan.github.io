import React from 'react';
import Head from 'next/head';

import About from '@components/about';
import Account from '@components/accounts';
import Header from '@components/header';
import styles from '@style/home.module.css';

const Home = () => {
  return (
    <main className={styles.main}>
      <Head>
        <title>Emirhan Kosem</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;700&display=swap" rel="stylesheet" />
      </Head>

      <header className={styles.header}>
        <Header />
      </header>
      
      <section className={styles.content}>
        <About />
      </section>

      <footer className={styles.footer}>
        <Account />
      </footer>
    </main>
  );
}

export default Home;
