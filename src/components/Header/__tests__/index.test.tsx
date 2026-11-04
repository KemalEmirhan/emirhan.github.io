import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Header from '../';

describe('Header', () => {
  it('renders the name as the page heading', () => {
    render(<Header />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Emirhan Kemal Kosem'
    );
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('shows only the city when weather is unavailable', () => {
    render(<Header weather={null} />);
    expect(screen.getByText('berlin')).toBeInTheDocument();
  });

  it('shows Berlin weather when available', () => {
    render(
      <Header weather={{ temperature: 9, label: 'overcast', rainy: false }} />
    );
    expect(screen.getByText(/berlin · 9° overcast/)).toBeInTheDocument();
  });
});
