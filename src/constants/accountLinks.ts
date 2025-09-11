import {
  AccountLinksArraySchema,
  type TAccountLinks,
  type TAccountLink,
} from '@/schemas';

const accountLinksData: TAccountLink[] = [
  {
    url: 'https://github.com/KemalEmirhan',
    name: 'Github',
    color: '#181717',
  },
  {
    url: 'https://www.linkedin.com/in/emirhan-kemal-kosem-259569b3/',
    name: 'LinkedIn',
    color: '#0077B5',
  },
  {
    url: 'https://medium.com/@emirhankemalkosem',
    name: 'Medium',
    color: '#12100E',
  },
  {
    url: 'https://twitter.com/KsemEmir',
    name: 'Twitter',
    color: '#1DA1F2',
  },
];

// Validate and parse account links with Zod
const accountLinks: TAccountLinks =
  AccountLinksArraySchema.parse(accountLinksData);

export default accountLinks;
