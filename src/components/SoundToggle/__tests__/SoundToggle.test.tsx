import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SoundToggle from '../';

describe('SoundToggle', () => {
  it('starts off and says its new state when toggled', () => {
    render(<SoundToggle />);
    fireEvent.click(screen.getByRole('button', { name: 'sound off' }));
    fireEvent.click(screen.getByRole('button', { name: 'sound on' }));
    expect(
      screen.getByRole('button', { name: 'sound off' })
    ).toBeInTheDocument();
  });
});
