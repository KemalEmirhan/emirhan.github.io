import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

const { attach } = vi.hoisted(() => ({
  attach: vi.fn(() => () => undefined),
}));
vi.mock('browser-haptic', () => ({ default: { attach } }));

import ExternalLink from '../';

describe('ExternalLink', () => {
  it('opens in a new tab, says so, and gets a haptic tick', () => {
    render(
      <ExternalLink href='https://github.com/KemalEmirhan' className='social'>
        github
      </ExternalLink>
    );
    const link = screen.getByRole('link', {
      name: 'github (opens in a new tab)',
    });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveClass('social', 'tap-target');
    expect(attach).toHaveBeenCalledWith(link, 'light');
  });
});
