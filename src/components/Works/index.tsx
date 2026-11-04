import React from 'react';
import ExternalLink from '@/components/ExternalLink';
import type { Work } from '@/constants/content';
import { formatDownloads, type PackageStats } from '@/lib/npm';

type WorksProps = {
  works: Work[];
  stats?: Record<string, PackageStats | null>;
};

const Works = ({ works, stats = {} }: WorksProps) => (
  <section
    aria-labelledby='works-label'
    className='rise'
    style={{ '--i': 3 } as React.CSSProperties}
  >
    <h2 id='works-label' className='label pb-2.5'>
      works<span className='sr-only'> (things I made)</span>
    </h2>
    <ul className='flex flex-col gap-6'>
      {works.map(work => {
        const stat = work.npm ? stats[work.npm] : null;
        return (
          <li key={work.name} className='flex flex-col gap-1'>
            <div className='flex items-baseline justify-between gap-4'>
              <ExternalLink href={work.href} className='work-name'>
                {work.name}
              </ExternalLink>
              {stat && (
                <span className='label whitespace-nowrap'>
                  v{stat.version} · {formatDownloads(stat.weeklyDownloads)}/wk
                </span>
              )}
            </div>
            <p className='work-description'>{work.description}</p>
            <div className='flex gap-5'>
              {work.links.map(link => (
                <ExternalLink
                  key={link.label}
                  href={link.href}
                  className='link-button'
                >
                  {link.label}
                </ExternalLink>
              ))}
            </div>
          </li>
        );
      })}
    </ul>
  </section>
);

export default Works;
