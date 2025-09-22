import { createLinkCell, createTextCell } from '@/components/Table/utilities';
import { type TTableData } from '@/schemas';

// New generic table data
export const mockTableData: TTableData = {
  columns: [
    { key: 'platform', label: 'PLATFORM', align: 'left' },
    { key: 'account', label: 'ACCOUNT', align: 'right' },
  ],
  rows: [
    {
      platform: createTextCell('GITHUB'),
      account: createTextCell('httml'),
    },
    {
      platform: createTextCell('LINKEDIN'),
      account: createTextCell(
        'https://www.linkedin.com/in/emirhan-kemal-kosem-259569b3/'
      ),
    },
    {
      platform: createTextCell('MEDIUM'),
      account: createTextCell('https://medium.com/emirhankemalkosem'),
    },
    {
      platform: createTextCell('TWITTER'),
      account: createTextCell('https://x.com/KsemEmir'),
    },
    {
      platform: createTextCell('INSTAGRAM'),
      account: createTextCell('https://www.instagram.com/emirhankemalkosem/'),
    },
    {
      platform: createTextCell('BLUESKY'),
      account: createTextCell('https://bsky.app/profile/emirkosem.bsky.social'),
    },
  ],
};

// Mock data with links
export const mockTableDataWithLinks: TTableData = {
  columns: [
    { key: 'platform', label: 'PLATFORM', align: 'left' },
    { key: 'account', label: 'ACCOUNT', align: 'right' },
  ],
  rows: [
    {
      platform: createTextCell('GITHUB'),
      account: createLinkCell(
        'https://github.com/KemalEmirhan',
        'https://github.com/KemalEmirhan'
      ),
    },
  ],
};
