import {
  AccountLinksArraySchema,
  type TAccountLinks,
  type TAccountLink,
} from '@/schemas';

const accountLinksData: TAccountLink[] = [
  {
    url: 'https://github.com/KemalEmirhan',
    name: 'Github',
  },
  {
    url: 'https://www.linkedin.com/in/emirhan-kemal-kosem-259569b3/',
    name: 'Linkedin',
  },
  {
    url: 'https://medium.com/@emirhankemalkosem',
    name: 'Medium',
  },
  {
    url: 'https://twitter.com/KsemEmir',
    name: 'Twitter',
  },
  {
    url: 'https://www.instagram.com/emirhankemalkosem/',
    name: 'Instagram',
  },
];

// Validate and parse account links with Zod
const accountLinks: TAccountLinks =
  AccountLinksArraySchema.parse(accountLinksData);

export default accountLinks;
