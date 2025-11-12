import React from 'react';
import type { Metadata } from 'next';
import Resume from '@/components/Resume';
import Card from '@/components/Card';

export const metadata: Metadata = {
  title: 'Resume',
  description:
    'Professional resume of Emirhan Kemal Kosem - Frontend Software Engineer with 8+ years of experience in React, Next.js, TypeScript, and GraphQL. View work experience, skills, and education.',
  openGraph: {
    title: 'Resume | Emirhan Kemal Kosem',
    description:
      'Professional resume of Emirhan Kemal Kosem - Frontend Software Engineer with 8+ years of experience.',
    url: 'https://emirkemal.com/resume',
  },
  alternates: {
    canonical: '/resume',
  },
};

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
