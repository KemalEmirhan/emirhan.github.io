import React from 'react';
import Card from '../Card';

const Footer = () => {
  return (
    <footer className='mt-auto py-24'>
      <Card>
        <h2 className='text-2xl font-bold'>This is Footer</h2>
        <p>Thank you for visiting and hope to see you again!</p>
        <hr className='border-gray-700' />
        <p className='text-sm text-gray-500 text-right'>
          <small>© {new Date().getFullYear()} Emirhan Kemal Kosem.</small>
        </p>
      </Card>
    </footer>
  );
};

export default Footer;
