import * as React from 'react';

import About from '@/components/About/About';
import Account from '@/components/Accounts/Accounts';
import Header from '@/components/Header/Header';

const Home = (): React.ReactElement => {
  return (
    <main className='page bg-gray-50 min-h-screen'>
      <nav className='bg-white shadow-sm border-b border-gray-200'>
        <div className='max-w-4xl mx-auto px-6 py-4'>
          <Header />
        </div>
      </nav>

      <section className='flex-1'>
        <About />
      </section>

      <footer className='bg-white border-t border-gray-200'>
        <Account />
      </footer>
    </main>
  );
};

export default Home;
