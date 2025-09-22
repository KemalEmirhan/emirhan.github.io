import { type TTableData } from '@/schemas';
import { createTextCell, createLinkCell } from '@/components/Table/utilities';

const socialAccountsTableData: TTableData = {
  columns: [
    {
      key: 'platform',
      label: 'PLATFORM',
      align: 'left',
    },
    {
      key: 'account',
      label: 'ACCOUNT',
      align: 'right',
    },
  ],
  rows: [
    {
      platform: createTextCell('Github'),
      account: createLinkCell(
        'https://github.com/KemalEmirhan',
        'https://github.com/KemalEmirhan'
      ),
    },
    {
      platform: createTextCell('Linkedin'),
      account: createLinkCell(
        'https://www.linkedin.com/in/emirhan-kemal-kosem-259569b3/',
        'https://www.linkedin.com/in/emirhan-kemal-kosem-259569b3/'
      ),
    },
    {
      platform: createTextCell('Medium'),
      account: createLinkCell(
        'https://medium.com/@emirhankemalkosem',
        'https://medium.com/@emirhankemalkosem'
      ),
    },
    {
      platform: createTextCell('Twitter'),
      account: createLinkCell(
        'https://x.com/KsemEmir',
        'https://x.com/KsemEmir'
      ),
    },
    {
      platform: createTextCell('Instagram'),
      account: createLinkCell(
        'https://www.instagram.com/emirhankemalkosem/',
        'https://www.instagram.com/emirhankemalkosem/'
      ),
    },
    {
      platform: createTextCell('Bluesky'),
      account: createLinkCell(
        'https://bsky.app/profile/emirkosem.bsky.social',
        'https://bsky.app/profile/emirkosem.bsky.social'
      ),
    },
  ],
};

export default socialAccountsTableData;
