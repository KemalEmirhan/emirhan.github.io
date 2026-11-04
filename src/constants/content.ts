export const BIO_NAME = 'Emirhan Kemal Kosem';

export type Item = { label: string; aside?: string };

export const FLOATS: Item[] = [
  { label: 'Animations' },
  { label: 'Accessibility' },
  { label: 'Design and UX' },
  { label: 'Bouldering' },
  { label: 'Classical music' },
  { label: 'Books, movies, games' },
  { label: 'Football', aside: '(not soccer)' },
];

export const SINKS: Item[] = [
  { label: 'Coriander' },
  { label: 'Slow walkers' },
  { label: 'Shopping malls' },
  { label: 'Eggs' },
  { label: 'Turkish pop' },
];

export const SOCIALS = [
  { label: 'github', href: 'https://github.com/KemalEmirhan' },
  {
    label: 'linkedin',
    href: 'https://www.linkedin.com/in/emirhan-kemal-kosem-259569b3/',
  },
  { label: 'x', href: 'https://x.com/KsemEmir' },
  { label: 'bluesky', href: 'https://bsky.app/profile/emirkosem.bsky.social' },
] as const;

export type Work = {
  name: string;
  description: string;
  href: string;
  npm?: string;
  links: { label: string; href: string }[];
};

export const WORKS: Work[] = [
  {
    name: 'browser-haptic',
    description: 'Haptic feedback for the web, even on iPhone.',
    href: 'https://playground-neon-gamma.vercel.app',
    npm: 'browser-haptic',
    links: [
      { label: 'npm', href: 'https://www.npmjs.com/package/browser-haptic' },
      {
        label: 'github',
        href: 'https://github.com/KemalEmirhan/browser-haptic',
      },
    ],
  },
];
