import React from 'react';
import Image from 'next/image';
import useAge from '@/hooks/useAge';

const About = (): React.ReactElement => {
  const age = useAge();

  return (
    <article className='max-w-4xl mx-auto px-6 py-12'>
      <div className='flex flex-col lg:flex-row gap-8 items-start'>
        {/* Profile Picture Section */}
        <div className='flex-shrink-0 mx-auto lg:mx-0'>
          <div className='relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64'>
            <Image
              src='/pp.jpeg'
              alt='Emirhan profile picture'
              fill
              className='object-cover rounded-lg border border-gray-200 shadow-sm'
              priority
            />
          </div>
        </div>

        {/* About Content */}
        <section className='flex-1'>
          <div className='space-y-4'>
            <p className='text-lg text-gray-700 leading-relaxed'>
              Hey, I'm Emirhan 👋 &nbsp; {age} years old. I'm a Frontend
              Software Engineer with over 8 years of experience building
              high-performance web applications across various industries. Based
              in Berlin, I specialise in React, Next.js, JavaScript, TypeScript,
              and GraphQL, with a strong focus on accessibility and web
              standards.
            </p>
            <p className='text-lg text-gray-700 leading-relaxed'>
              Throughout my career in fintech, media, telecommunications, and
              e-commerce, I've collaborated closely with cross-functional teams
              to develop scalable solutions. I enjoy modernising outdated
              systems, designing efficient component libraries that accelerate
              development, and optimising web applications for seamless user
              experiences. By combining technical expertise with a strategic
              mindset, I make architectural decisions that enhance performance
              and drive business success.
            </p>
            <p className='text-lg text-gray-700 leading-relaxed'>
              Passionate about creating accessible, user-friendly digital
              experiences, I'm always eager to stay ahead of the latest frontend
              technologies and continuously expand my skill set.
            </p>
          </div>
        </section>
      </div>
    </article>
  );
};

export default About;
