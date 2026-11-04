import React from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Pond from '@/components/Pond';
import FloatSink from '@/components/FloatSink';
import Works from '@/components/Works';
import LinkPreview from '@/components/LinkPreview';
import { FLOATS, SINKS, WORKS } from '@/constants/content';
import { getBerlinWeather } from '@/lib/weather';
import { getPackageStats } from '@/lib/npm';

export const revalidate = 3600;

const Home = async () => {
  const [weather, ...packageStats] = await Promise.all([
    getBerlinWeather(),
    ...WORKS.map(work =>
      work.npm ? getPackageStats(work.npm) : Promise.resolve(null)
    ),
  ]);
  const stats = Object.fromEntries(
    WORKS.map((work, i) => [work.npm ?? work.name, packageStats[i]])
  );

  return (
    <div className='page'>
      <Header weather={weather} />
      <main id='main-content' className='stack'>
        <p className='rise lede' style={{ '--i': 1 } as React.CSSProperties}>
          Frontend engineer in Berlin, originally from Türkiye. I work at{' '}
          <LinkPreview
            href='https://madita.ai/en'
            image='/previews/madita.jpg'
            domain='madita.ai'
            title='AI-powered first interviews for recruiting teams'
          >
            HeyJobs
          </LinkPreview>
          , where I do both design and engineering. I spend most of my time on
          animations, accessibility, and <em>how things feel</em> under a
          finger.
        </p>
        <div className='rise-fade' style={{ '--i': 2 } as React.CSSProperties}>
          <Pond rainy={weather?.rainy ?? false} />
        </div>
        <Works works={WORKS} stats={stats} />
        <FloatSink floats={FLOATS} sinks={SINKS} />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
