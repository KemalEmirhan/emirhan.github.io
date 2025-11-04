import React from 'react';

import Card from '@/components/Card';

const Home = () => {
  return (
    <>
      <Card className='grid-col-full'>
        <h2 className='text-2xl font-bold'>Hello 🖖🏽, welcome to my ...</h2>

        <p>Here are some random facts about me if you are interested...</p>

        <ul className='list-disc list-inside'>
          <li>I'm a Software Engineer but mostly frontend focused.</li>
          <li>I'm based in Berlin, Germany but I'm originally from Turkey.</li>
        </ul>
      </Card>

      <Card className='gap-4'>
        <h3 className='text-lg font-bold'>Things I like</h3>
        <ol className='list-disc list-inside'>
          <li>Accessibility.</li>
          <li>Animations.</li>
          <li>Design and UX.</li>
          <li>Games.</li>
          <li>Bouldering and gym stuff.</li>
          <li>Spending time in the kitchen.</li>
          <li>Sociology, history and philosophy.</li>
          <li>Books.</li>
        </ol>
      </Card>
    </>
  );
};

export default Home;
