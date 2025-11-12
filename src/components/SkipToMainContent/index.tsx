import React from 'react';

import { ArrowDown } from 'lucide-react';

const SkipToMainContent = () => {
  return (
    <a
      href='#main-content'
      className='w-fit inline-flex items-center justify-center gap-0.5rem transform -translate-y-[200%] transition-transform duration-300 focus-visible:translate-y-1 focus-visible:focus-ring'
    >
      <span className='text-base font-medium text-gray-800'>
        Skip to main content
      </span>
      <ArrowDown className='w-4 h-4' />
    </a>
  );
};

export default SkipToMainContent;
