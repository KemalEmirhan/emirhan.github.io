import React from 'react';
import Table from '@/components/Table';
import socialAccountsTableData from '@/constants/accountLinks';

const Socials = () => {
  return (
    <div className='px-2'>
      <Table data={socialAccountsTableData} />
    </div>
  );
};

export default Socials;
