import React from 'react';
import useAge from '@/hooks/useAge';

const About = (): React.ReactElement => {
  const age = useAge();

  return (
    <article className='max-w-4xl mx-auto px-6 py-12'>
      <h2 className='text-3xl font-bold text-gray-900 mb-8'>About Me</h2>
      <section className='mb-8'>
        <p className='text-lg text-gray-700 leading-relaxed mb-4'>
          Hey, I'm Emirhan 👋 &nbsp; {age} years old. I'm Front-End Software
          Engineer who writes HTML5, CSS3 and JS(reactjs, nextjs). I'm
          interested with web standards, a11y and Figma these days. <wbr />
        </p>
        <p className='text-lg text-gray-700 leading-relaxed'>
          If you reach me, you feel free ✌
        </p>
      </section>
      <section>
        <p className='text-lg text-gray-700 leading-relaxed'>
          Front-End Software Engineer @Iyzico
        </p>
      </section>
    </article>
  );
};

export default About;
