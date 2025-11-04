import React from 'react';
import Table from '@/components/Table';
import socialAccountsTableData from '@/constants/accountLinks';
import Card from '@/components/Card';

const Socials = () => {
  return (
    <Card className='grid-col-full'>
      <Table data={socialAccountsTableData} />
    </Card>
  );
};

export default Socials;
