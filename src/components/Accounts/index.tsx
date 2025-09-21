import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import type { Variants } from 'motion/react';
import accountLinks from '@/constants/accountLinks';
import { ACCOUNT_ICON_MAPPING } from '@/constants/iconMapping';

const Account = (): React.ReactElement => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <motion.nav
      className='border-gray-200 max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8'
      aria-label='account links'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      <div className='flex flex-wrap justify-center gap-4 sm:gap-6'>
        {accountLinks.map(account => {
          const IconComponent = ACCOUNT_ICON_MAPPING.get(account.name);

          return (
            <motion.div
              key={account.name}
              variants={itemVariants}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            >
              <Link
                href={account.url}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-150 group'
              >
                {IconComponent && (
                  <IconComponent
                    size={20}
                    className='text-gray-700 group-hover:text-gray-900 transition-colors duration-150'
                  />
                )}
                <span className='text-sm sm:text-base text-gray-700 font-medium group-hover:text-gray-900 transition-colors duration-150'>
                  {account.name}
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default Account;
