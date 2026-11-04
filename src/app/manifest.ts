import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Emirhan Kemal Kosem - Frontend Software Engineer',
    short_name: 'Emirhan Kosem',
    description:
      'Personal website of Emirhan Kemal Kosem, a frontend engineer in Berlin.',
    start_url: '/',
    display: 'standalone',
    background_color: '#e8ecee',
    theme_color: '#e8ecee',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    categories: ['business', 'productivity', 'developer'],
    lang: 'en',
    scope: '/',
  };
}
