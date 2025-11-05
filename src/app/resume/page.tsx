import React from 'react';
import Resume from '@/components/Resume';
import Card from '@/components/Card';

const ResumePage = () => {
  return (
    <Card className='grid-col-full'>
      <h2 className='text-2xl font-bold'>Resume</h2>

      <Resume />

      <p className='text-base text-gray-800 text-center mt-4'>
        ~ Thanks for your time! ~
      </p>
    </Card>
  );
};

export default ResumePage;
