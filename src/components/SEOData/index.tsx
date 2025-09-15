import React from 'react';

const SEOData = () => {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Emirhan Kemal Kosem',
    alternateName: 'emrhnksm',
    jobTitle: 'Frontend Software Engineer',
    description:
      'Frontend Software Engineer with 8+ years of experience in React, Next.js, TypeScript, and GraphQL. Based in Berlin, specializing in high-performance web applications, accessibility, and modern web standards.',
    url: 'https://emirkemal.com',
    image: 'https://emirhan.github.io/pp.png',
    sameAs: [
      'https://github.com/KemalEmirhan',
      'https://www.linkedin.com/in/emirhan-kemal-kosem-259569b3/',
      'https://medium.com/@emirhankemalkosem',
      'https://twitter.com/KsemEmir',
      'https://www.instagram.com/emirhankemalkosem/',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Berlin',
      addressCountry: 'Germany',
    },
    knowsAbout: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'GraphQL',
      'Web Accessibility',
      'Frontend Development',
      'Web Performance',
      'Component Libraries',
      'UI/UX Design',
    ],
    alumniOf: {
      '@type': 'Organization',
      name: 'Software Engineering',
    },
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance',
    },
    email: 'emirhankemalkosem@gmail.com',
    birthDate: '1994-08-13',
    nationality: 'Turkish',
    gender: 'Male',
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Emirhan Kemal Kosem - Frontend Software Engineer',
    description:
      'Personal website of Emirhan Kemal Kosem, a Frontend Software Engineer with 8+ years of experience.',
    url: 'https://emirkemal.com',
    author: {
      '@type': 'Person',
      name: 'Emirhan Kemal Kosem',
    },
    publisher: {
      '@type': 'Person',
      name: 'Emirhan Kemal Kosem',
    },
    inLanguage: 'en-US',
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: {
      '@type': 'Person',
      name: 'Emirhan Kemal Kosem',
    },
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  );
};

export default SEOData;
