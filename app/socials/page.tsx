import React from 'react';
import Table from '@/components/Table';

const Socials = () => {
  const accountsData = [
    { platform: 'GITHUB', accountName: 'https://github.com/KemalEmirhan' },
    {
      platform: 'LINKEDIN',
      accountName: 'https://www.linkedin.com/in/emirhan-kemal-kosem-259569b3/',
    },
    {
      platform: 'MEDIUM',
      accountName: 'https://medium.com/emirhankemalkosem',
    },
    { platform: 'TWITTER', accountName: 'https://x.com/KsemEmir' },
    {
      platform: 'INSTAGRAM',
      accountName: 'https://www.instagram.com/emirhankemalkosem/',
    },
    {
      platform: 'BLUESKY',
      accountName: 'https://bsky.app/profile/emirkosem.bsky.social',
    },
  ];

  const headers: [string, string] = ['PLATFROM', 'ACCOUNT'];

  return (
    <div className='px-8'>
      <Table headers={headers} data={accountsData} linkField='ACCOUNT' />
    </div>
  );
};

export default Socials;
