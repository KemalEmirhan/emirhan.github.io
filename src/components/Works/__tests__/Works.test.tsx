import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Works from '../';
import { WORKS } from '@/constants/content';

describe('Works', () => {
  it('lists browser-haptic with its links', () => {
    render(<Works works={WORKS} />);
    const section = screen.getByRole('region', { name: /things I made/ });
    expect(
      within(section).getByRole('link', { name: /^browser-haptic/ })
    ).toHaveAttribute('href', 'https://playground-neon-gamma.vercel.app');
    expect(
      within(section).getByRole('link', { name: /^npm/ })
    ).toBeInTheDocument();
    expect(
      within(section).getByRole('link', { name: /^github/ })
    ).toBeInTheDocument();
  });

  it('shows live npm stats when available, and nothing when not', () => {
    const { rerender } = render(
      <Works
        works={WORKS}
        stats={{
          'browser-haptic': { version: '1.1.1', weeklyDownloads: 1234 },
        }}
      />
    );
    expect(screen.getByText('v1.1.1 · 1.2k/wk')).toBeInTheDocument();
    rerender(<Works works={WORKS} stats={{ 'browser-haptic': null }} />);
    expect(screen.queryByText(/\/wk/)).toBeNull();
  });
});
