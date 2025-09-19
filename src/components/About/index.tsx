'use client';

import React from 'react';
import useAge from '@/hooks/useAge';

const About = (): React.ReactElement => {
  const age = useAge();

  return (
    <article className='px-6'>
      <div className='space-y-4'>
        <p className='text-lg text-gray-700 leading-relaxed'>
          Hey, I'm Emirhan 👋 {age} years old. I'm a Frontend Software Engineer
          with over 8 years of experience building high-performance web
          applications across various industries. Based in Berlin, I specialise
          in React, Next.js, JavaScript, TypeScript, and GraphQL, with a strong
          focus on accessibility and web standards.
        </p>
        <p className='text-lg text-gray-700 leading-relaxed'>
          Throughout my career in fintech, media, telecommunications, and
          e-commerce, I've collaborated closely with cross-functional teams to
          develop scalable solutions. I enjoy modernising outdated systems,
          designing efficient component libraries that accelerate development,
          and optimising web applications for seamless user experiences. By
          combining technical expertise with a strategic mindset, I make
          architectural decisions that enhance performance and drive business
          success.
        </p>
        <p className='text-lg text-gray-700 leading-relaxed'>
          Passionate about creating accessible, user-friendly digital
          experiences, I'm always eager to stay ahead of the latest software
          technologies and continuously expand my skill set.
        </p>
      </div>
    </article>
  );
};

export default About;
