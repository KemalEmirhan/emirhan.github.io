import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Table from '../';

const mockData = [
  { platform: 'GITHUB', accountName: 'httml' },
  {
    platform: 'LINKEDIN',
    accountName: 'https://www.linkedin.com/in/emirhan-kemal-kosem-259569b3/',
  },
  { platform: 'MEDIUM', accountName: 'https://medium.com/emirhankemalkosem' },
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

const mockHeaders: [string, string] = ['PLATFORM', 'ACCOUNT'];

describe('Table Component', () => {
  it('should render', () => {
    const { container } = render(
      <Table headers={mockHeaders} data={mockData} />
    );
    expect(container).toMatchSnapshot();
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-table-class';
    const { container } = render(
      <Table headers={mockHeaders} data={mockData} className={customClass} />
    );

    expect(container.firstChild).toHaveClass(customClass);
    expect(container).toMatchSnapshot();
  });

  it('renders with empty data array', () => {
    const { container, getByText } = render(
      <Table headers={mockHeaders} data={[]} />
    );

    expect(getByText('PLATFORM')).toBeInTheDocument();
    expect(getByText('ACCOUNT')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('renders links when linkField is provided', () => {
    const linkData = [
      { platform: 'GITHUB', accountName: 'https://github.com/KemalEmirhan' },
    ];
    const linkHeaders: [string, string] = ['PLATFORM', 'ACCOUNT'];

    const { container, getByRole } = render(
      <Table headers={linkHeaders} data={linkData} linkField='ACCOUNT' />
    );

    const link = getByRole('link', { name: 'https://github.com/KemalEmirhan' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://github.com/KemalEmirhan');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(container).toMatchSnapshot();
  });

  it('renders regular text when linkField is not provided', () => {
    const { container, getByText, queryByRole } = render(
      <Table headers={mockHeaders} data={mockData} />
    );

    expect(getByText('GITHUB')).toBeInTheDocument();
    expect(getByText('LINKEDIN')).toBeInTheDocument();
    expect(
      getByText('https://www.linkedin.com/in/emirhan-kemal-kosem-259569b3/')
    ).toBeInTheDocument();
    expect(getByText('MEDIUM')).toBeInTheDocument();
    expect(
      getByText('https://medium.com/emirhankemalkosem')
    ).toBeInTheDocument();

    // Should not be links
    expect(queryByRole('link')).not.toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
