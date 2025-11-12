import React from 'react';
import type { Metadata } from 'next';
import Table from '@/components/Table';
import socialAccountsTableData from '@/constants/accountLinks';
import Card from '@/components/Card';

export const metadata: Metadata = {
  title: 'Socials',
  description:
    'Connect with Emirhan Kemal Kosem on social media platforms. Find links to GitHub, LinkedIn, Twitter, Medium, and Instagram.',
  openGraph: {
    title: 'Socials | Emirhan Kemal Kosem',
    description: 'Connect with Emirhan Kemal Kosem on social media platforms.',
    url: 'https://emirkemal.com/socials',
  },
  alternates: {
    canonical: '/socials',
  },
};

const Socials = () => {
  return (
    <Card className='grid-col-full'>
      <Table data={socialAccountsTableData} />
    </Card>
  );
};

export default Socials;
