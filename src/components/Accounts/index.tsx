import React from 'react';
import Link from 'next/link';
import accountLinks from '@/constants/accountLinks';
import { ACCOUNT_ICON_MAPPING } from '@/constants/iconMapping';

const Account = (): React.ReactElement => {
  return (
    <nav
      className='border-gray-200 max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8'
      aria-label='account links'
    >
      <div className='flex flex-wrap justify-center gap-4 sm:gap-6'>
        {accountLinks.map(account => {
          const IconComponent = ACCOUNT_ICON_MAPPING[account.name];
          return (
            <Link
              key={account.name}
              href={account.url}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-150 group'
            >
              <IconComponent
                size={20}
                className='text-gray-700 group-hover:text-gray-900 transition-colors duration-150'
              />
              <span className='text-sm sm:text-base text-gray-700 font-medium group-hover:text-gray-900 transition-colors duration-150'>
                {account.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Account;
