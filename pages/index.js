import Head from 'next/head'
import { FileList, Bio } from '../components/index';

import styles from '../styles/home.module.scss'

export default function Home() {
  return (
    <div className="page container">
      <Head>
        <title>Emirhan</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;700&display=swap" rel="stylesheet" />
      </Head>

      <main className={styles.layout}>
        <Bio />
        <FileList />
      </main>
    </div>
  );
}
