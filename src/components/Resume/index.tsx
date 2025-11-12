'use client';

import React from 'react';

const Resume = () => {
  return (
    <div className='w-full overflow-x-auto'>
      <div className='bg-white shadow-2xl max-w-4xl w-full mx-auto p-4 sm:p-8 md:p-12 text-gray-900'>
        <header className='mb-6'>
          <h1 className='text-2xl sm:text-3xl font-bold mb-2 break-words'>
            Emirhan Kemal KOSEM
          </h1>
          <div className='text-sm text-gray-700 flex flex-wrap gap-2 sm:gap-4'>
            <a href='tel:+4917620739060' className='focus-visible:focus-ring'>
              0176 207 390 60
            </a>
            <a
              href='mailto:emirhankemalkosem@gmail.com'
              className='focus-visible:focus-ring'
            >
              emirhankemalkosem@gmail.com
            </a>
            <span>Berlin, Germany</span>
          </div>
        </header>

        <section className='mb-6'>
          <div className='text-sm leading-relaxed text-gray-900 space-y-3 text-justify break-words'>
            <p>
              I'm a Frontend Software Engineer with over 8 years of experience
              building high-performance web applications across various
              industries. Based in Berlin, I specialise in React, Next.js,
              JavaScript, TypeScript, and GraphQL, with a strong focus on
              accessibility and web standards.
            </p>
            <p>
              Throughout my career in fintech, media, telecommunications, and
              e-commerce, I've collaborated closely with cross-functional teams
              to develop scalable solutions. I enjoy modernising outdated
              systems, designing efficient component libraries that accelerate
              development, and optimising web applications for seamless user
              experiences. By combining technical expertise with a strategic
              mindset, I make architectural decisions that enhance performance
              and drive business success.
            </p>
            <p>
              Passionate about creating accessible, user-friendly digital
              experiences, I'm always eager to stay ahead of the latest frontend
              technologies and continuously expand my skill set.
            </p>
          </div>
        </section>

        <div className='border-t border-gray-300 my-6'></div>

        <section className='mb-6'>
          <h2 className='text-xl font-bold mb-2 uppercase'>Experience</h2>
          <div className='border-t border-gray-300 mb-4'></div>

          <div className='text-sm text-gray-900 space-y-5'>
            <div>
              <h3 className='font-bold uppercase mb-2 break-words'>
                FRONTEND ENGINEER | ADAC PINCAMP GMBH | BERLIN | 2022 - PRESENT
              </h3>
              <ul className='list-disc list-inside ml-4 space-y-1'>
                <li>
                  Optimise and maintain the PiNCAMP web platform, a leading
                  camper marketplace in Germany, Switzerland, and the
                  Netherlands.
                </li>
                <li>
                  Collaborate closely with Product and Design teams to enhance
                  UX, UI consistency and help them for{' '}
                  <strong>design tokens</strong> and{' '}
                  <strong>design system</strong>.
                </li>
                <li>
                  Implement <strong>technical design decisions</strong>, monitor
                  and improve core web vitals(LCP, INP, CLS)
                </li>
                <li>
                  Lead <strong>accessibility</strong> compliance initiatives
                  across multiple projects
                </li>
                <li>
                  Assist backend team as a{' '}
                  <strong>cross-functional team collaboration</strong>.
                </li>
                <li>Improve SEO and taking care of Google Analytics' events</li>
                <li>
                  Tech Stack: JavaScript, TypeScript, NextJS, Web Components,
                  Context API, Jest, React Testing Library, EmotionJS, GraphQL,
                  Python, Hygraph Headless CMS, CI/CD Pipelines, Github Actions,
                  AWS, Datadog.
                </li>
              </ul>
            </div>

            <div>
              <h3 className='font-bold uppercase mb-2 break-words'>
                FRONTEND ENGINEER | IYZICO | ISTANBUL | 2021 - 2022
              </h3>
              <ul className='list-disc list-inside ml-4 space-y-1'>
                <li>
                  Developed and optimised the <strong>merchant web app</strong>,
                  improving usability and performance.
                </li>
                <li>
                  Led frontend development for onboarding funnels and financial
                  dashboards for B2B users.
                </li>
                <li>
                  Provided technical support for the{' '}
                  <strong>checkout widget</strong> used by business clients.
                </li>
                <li>
                  Led <strong>technical architecture decisions</strong> and
                  mentored junior developers.
                </li>
                <li>
                  Contributed to the <strong>Frontend Manifesto</strong> and led
                  initiatives in the{' '}
                  <strong>Frontend Training Community</strong>.
                </li>
                <li>
                  Tech Stack: JavaScript, TypeScript, Redux, React, Preact,
                  GraphQL, Jest, React Testing Library, Cypress,
                  Styled-Components, Sentry, Datadog, Java, Spring MVC, AWS,
                  Github Actions.
                </li>
              </ul>
            </div>

            <div>
              <h3 className='font-bold uppercase mb-2 break-words'>
                FRONTEND ENGINEER | DIGITURK | ISTANBUL | 2019 - 2021
              </h3>
              <ul className='list-disc list-inside ml-4 space-y-1'>
                <li>
                  Modernised beIN Connect, an
                  OTT(Over-the-Top)/VOD(Video-On-Demand) platform handling 500K+
                  concurrent users during peak events.
                </li>
                <li>
                  Migrated the legacy <strong>ASP.NET/jQuery</strong> project to{' '}
                  <strong>React</strong>, significantly improving
                  maintainability and performance.
                </li>
                <li>
                  Created reusable <strong>design system components</strong>,
                  reducing development time.
                </li>
                <li>
                  Enhanced <strong>cross-browser compatibility</strong> with
                  optimised CSS utilities.
                </li>
                <li>
                  Tech Stack: JavaScript, jQuery, React, Styled-Components, REST
                  API, ASP.NET.
                </li>
              </ul>
            </div>

            <div>
              <h3 className='font-bold uppercase mb-2 break-words'>
                ASSISTANT SOFTWARE ENGINEER | HUAWEI | ISTANBUL | 2018 - 2019
              </h3>
              <ul className='list-disc list-inside ml-4 space-y-1'>
                <li>
                  Developed <strong>business web applications</strong> for
                  Vodafone Turkey and Saudi Telecom Company.
                </li>
                <li>
                  Handled end-to-end development, from data preparation to
                  frontend implementation.
                </li>
                <li>
                  Optimised <strong>big data processing</strong> for scalable
                  web systems.
                </li>
                <li>
                  Tech Stack: Java, JavaScript, TypeScript, React, Redux, Ant
                  Design, Styled-Components, Scala, Hadoop, PostgreSQL.
                </li>
              </ul>
            </div>

            <div>
              <h3 className='font-bold uppercase mb-2 break-words'>
                JR. SOFTWARE ENGINEER | D-CAT TECHNOLOGIES | ISTANBUL | 2015 -
                2018
              </h3>
              <ul className='list-disc list-inside ml-4 space-y-1'>
                <li>
                  Developed Java EE web applications and REST APIs with Spring
                  MVC.
                </li>
                <li>Built cross-platform mobile apps using Ionic Framework.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className='mb-6'>
          <h2 className='text-xl font-bold mb-2'>Education</h2>
          <div className='text-sm text-gray-900'>
            <p>
              <strong>Istanbul Aydin University</strong> - Software
              Engineering(2018)
            </p>
          </div>
        </section>

        <section className='mb-6'>
          <h2 className='text-xl font-bold mb-2'>Skills</h2>
          <div className='text-sm text-gray-900 space-y-2'>
            <p>
              <strong>Frontend</strong>: React, NextJS, TypeScript, JavaScript,
              Redux, Webpack
            </p>
            <p>
              <strong>Backend</strong>: NodeJS, Java, Spring, REST API, GraphQL
            </p>
            <p>
              <strong>Testing</strong>: Jest, Cypress, React Testing Library,
              Vitest, Playwright
            </p>
            <p>
              <strong>Styling</strong>: CSS, SASS, Styled-Components, EmotionJS,
              CSS modules, TailwindCSS
            </p>
            <p>
              <strong>Tools & Methodologies</strong>: Git, Docker, Github
              Actions, CI/CD, Agile (Scrum), a11y(Accessibility), UX/UI Design,
              Design Systems
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Resume;
