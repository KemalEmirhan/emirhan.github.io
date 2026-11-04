'use client';

import { useSyncExternalStore } from 'react';

const formatter = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Europe/Berlin',
});

const subscribe = (onChange: () => void) => {
  const id = window.setInterval(onChange, 15_000);
  return () => window.clearInterval(id);
};

const getSnapshot = () => formatter.format(new Date());
// The server doesn't know when the page is read, so it renders a placeholder of the same width.
const getServerSnapshot = () => '--:--';

const Clock = () => {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return (
    <time className='tabular-nums' aria-label={`Berlin time ${time}`}>
      {time}
    </time>
  );
};

export default Clock;
