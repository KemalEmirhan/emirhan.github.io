import React from 'react';
import type { Item } from '@/constants/content';

type FloatSinkProps = {
  floats: Item[];
  sinks: Item[];
};

// Each sink drops further than the last; colour never goes below 4.5:1 on fog.
const SINK_STEPS = [
  { offset: 0, drift: 0, color: '#26375c', scale: 1 },
  { offset: 6, drift: 2, color: '#33446a', scale: 0.978 },
  { offset: 14, drift: 0, color: '#405071', scale: 0.956 },
  { offset: 24, drift: 3, color: '#4d5d78', scale: 0.934 },
  { offset: 36, drift: 1, color: '#5b6b80', scale: 0.912 },
];

const Label = ({
  id,
  text,
  hidden,
}: {
  id: string;
  text: string;
  hidden: string;
}) => (
  <h2 id={id} className='label pb-2.5'>
    {text}
    <span className='sr-only'> ({hidden})</span>
  </h2>
);

const FloatSink = ({ floats, sinks }: FloatSinkProps) => (
  <div
    className='rise grid grid-cols-[1.2fr_1fr] gap-6 md:grid-cols-2 md:gap-10'
    style={{ '--i': 4 } as React.CSSProperties}
  >
    <section aria-labelledby='floats-label'>
      <Label id='floats-label' text='floats' hidden='things I like' />
      <ul className='lean flex flex-col gap-1.5 md:gap-2' data-lean>
        {floats.map(item => (
          <li key={item.label} className='item' data-bob='float'>
            {item.label}
            {item.aside && (
              <span className='italic text-muted'> {item.aside}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
    <section aria-labelledby='sinks-label'>
      <Label id='sinks-label' text='sinks' hidden="things I don't like" />
      <ul className='flex flex-col gap-1.5 md:gap-2'>
        {sinks.map((item, index) => {
          const step = SINK_STEPS[Math.min(index, SINK_STEPS.length - 1)];
          return (
            <li
              key={item.label}
              className='item'
              data-bob='sink'
              style={{
                paddingTop: step.offset,
                paddingLeft: step.drift,
                color: step.color,
                fontSize: `calc(var(--item-size) * ${step.scale})`,
              }}
            >
              {item.label}
            </li>
          );
        })}
      </ul>
    </section>
  </div>
);

export default FloatSink;
