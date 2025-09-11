import * as React from 'react';

import About from '@/components/About';
import Account from '@/components/Accounts';
import Header from '@/components/Header';

const Home = (): React.ReactElement => {
  return (
    <main className='page bg-gray-50 min-h-screen flex flex-col'>
      <nav className='bg-white shadow-sm border-b border-gray-200'>
        <div className='max-w-4xl mx-auto px-6 py-4'>
          <Header />
        </div>
      </nav>

      <section className='flex-1'>
        <About />
      </section>

      <footer className='bg-white border-t border-gray-200 mt-auto'>
        <Account />
      </footer>
    </main>
  );
};

export default Home;
