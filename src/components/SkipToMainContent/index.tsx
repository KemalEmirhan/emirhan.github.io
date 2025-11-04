import React from 'react';

import { ArrowDown } from 'lucide-react';

const SkipToMainContent = () => {
  return (
    <a href='#main-content' className='visually-hidden-focusable'>
      <span className='text-base font-medium text-gray-800'>
        Skip to main content
      </span>
      <ArrowDown className='w-4 h-4' />
    </a>
  );
};

export default SkipToMainContent;
