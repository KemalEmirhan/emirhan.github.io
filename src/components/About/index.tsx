'use client';

import React from 'react';
import useAge from '@/hooks/useAge';

const About = (): React.ReactElement => {
  const age = useAge();

  return (
    <article className='space-y-6 text-base md:text-lg text-gray-700 leading-relaxed max-w-none'>
      <p>
        Hey, I'm Emirhan 👋 {age} years old. I'm a Frontend Software Engineer
        with over 8 years of experience building high-performance web
        applications across various industries. Based in Berlin, I specialise in
        React, Next.js, JavaScript, TypeScript, and GraphQL, with a strong focus
        on accessibility and web standards.
      </p>
      <p>
        Throughout my career in fintech, media, telecommunications, and
        e-commerce, I've collaborated closely with cross-functional teams to
        develop scalable solutions. I enjoy modernising outdated systems,
        designing efficient component libraries that accelerate development, and
        optimising web applications for seamless user experiences. By combining
        technical expertise with a strategic mindset, I make architectural
        decisions that enhance performance and drive business success.
      </p>
      <p>
        Passionate about creating accessible, user-friendly digital experiences,
        I'm always eager to stay ahead of the latest software technologies and
        continuously expand my skill set.
      </p>
    </article>
  );
};

export default About;
