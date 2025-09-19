import React from 'react';
import Image from 'next/image';

const Avatar = () => {
  return (
    <div className='relative w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full border border-gray-200 shadow-sm'>
      <Image
        src='/pp.png'
        alt='Emirhan profile picture'
        fill
        className='object-cover rounded-full'
        priority
      />
    </div>
  );
};

export default Avatar;
