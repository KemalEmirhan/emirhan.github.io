import * as React from 'react';
import Link from 'next/link';
import Icon from '@/components/Icons';
import accountLinks from '@/constants/accountLinks';

const Account = (): React.ReactElement => {
  return (
    <div className='max-w-4xl mx-auto px-6 py-8'>
      <header className='text-center'>
        <p className='text-lg text-gray-600 mb-6'>You can find me at</p>

        <div className='flex flex-wrap justify-center gap-6'>
          {accountLinks.map(account => (
            <Link
              key={account.name}
              href={account.url}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-3 px-4 py-3 rounded-lg bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 group'
            >
              <Icon iconName={account.name} color={account.color} />
              <span className='text-gray-700 font-medium group-hover:text-gray-900 transition-colors duration-200'>
                {account.name}
              </span>
            </Link>
          ))}
        </div>
      </header>
    </div>
  );
};

export default Account;
