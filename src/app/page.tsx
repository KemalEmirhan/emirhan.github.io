import React from 'react';

import Card from '@/components/Card';

const Home = () => {
  return (
    <>
      <Card className='grid-col-full'>
        <h2 className='text-2xl font-bold'>Hello 🖖🏽, welcome to my ...</h2>
        <p>Here is some random facts about me if you are interested...</p>
      </Card>

      <Card>
        <h3 className='text-lg font-bold'>Me</h3>
        <ol className='list-disc list-inside'>
          <li>I'm a Software Engineer but mostly frontend focused.</li>
          <li>I'm based in Berlin, Germany but I'm originally from Turkey.</li>
        </ol>
      </Card>

      <Card>
        <h3 className='text-lg font-bold inline-flex items-center gap-2'>
          Things That I Like
          <small className='text-sm font-light text-gray-700'>
            (in random order)
          </small>
        </h3>
        <ol className='list-disc list-inside'>
          <li>Accessibility.</li>
          <li>Animations.</li>
          <li>Design and UX.</li>
          <li>Games.</li>
          <li>Bouldering and gym stuff.</li>
          <li>Spending time in the kitchen.</li>
          <li>Sociology, history and philosophy.</li>
          <li>Books.</li>
          <li>Movies.</li>
          <li>Classical music.</li>
          <li>Football (not soccer).</li>
        </ol>
      </Card>

      <Card>
        <h3 className='text-lg font-bold inline-flex items-center gap-2'>
          Things Don't I Like
          <small className='text-sm font-light text-gray-700'>
            (in random order)
          </small>
        </h3>
        <ol className='list-disc list-inside'>
          <li>RPG games.</li>
          <li>Turkish pop music.</li>
          <li>Coriander.</li>
          <li>Discussing politics.</li>
          <li>Shopping malls.</li>
          <li>Slow walkers.</li>
          <li>Eggs.</li>
        </ol>
      </Card>

      <Card className='grid-col-full'>
        <h3 className='text-lg'>This is a banner</h3>
      </Card>
    </>
  );
};

export default Home;
