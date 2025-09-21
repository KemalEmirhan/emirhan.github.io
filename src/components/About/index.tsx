'use client';

import React from 'react';
import { motion } from 'motion/react';
import useAge from '@/hooks/useAge';

const About = (): React.ReactElement => {
  const age = useAge();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.article
      className='space-y-6 text-base md:text-lg text-gray-700 leading-relaxed max-w-none'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      <motion.p
        variants={paragraphVariants}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        Hey, I'm Emirhan 👋 {age} years old. I'm a Frontend Software Engineer
        with over 8 years of experience building high-performance web
        applications across various industries. Based in Berlin, I specialise in
        React, Next.js, JavaScript, TypeScript, and GraphQL, with a strong focus
        on accessibility and web standards.
      </motion.p>
      <motion.p
        variants={paragraphVariants}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        Throughout my career in fintech, media, telecommunications, and
        e-commerce, I've collaborated closely with cross-functional teams to
        develop scalable solutions. I enjoy modernising outdated systems,
        designing efficient component libraries that accelerate development, and
        optimising web applications for seamless user experiences. By combining
        technical expertise with a strategic mindset, I make architectural
        decisions that enhance performance and drive business success.
      </motion.p>
      <motion.p
        variants={paragraphVariants}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        Passionate about creating accessible, user-friendly digital experiences,
        I'm always eager to stay ahead of the latest software technologies and
        continuously expand my skill set.
      </motion.p>
    </motion.article>
  );
};

export default About;
