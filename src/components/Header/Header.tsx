import * as React from 'react';
import Link from 'next/link';

const Header = (): React.ReactElement => {
  return (
    <div className='flex items-center'>
      <Link
        href='/'
        title='Ana Sayfa'
        id='ana-sayfa'
        className='text-xl font-semibold text-gray-900 hover:text-gray-700 transition-colors duration-200'
      >
        <h3>emrhnksm.</h3>
      </Link>
    </div>
  );
};

export default Header;
