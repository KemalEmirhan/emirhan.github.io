import * as React from 'react';

import About from '@/components/About';
import Account from '@/components/Accounts';

const Home = (): React.ReactElement => {
  return (
    <main className='page bg-gray-50 min-h-screen flex flex-col'>
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
