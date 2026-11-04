import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Pond from '../';

describe('Pond', () => {
  it('is a keyboard-reachable button with a clear name', () => {
    render(<Pond />);
    const button = screen.getByRole('button', {
      name: 'Drop a stone in the pond',
    });
    button.focus();
    expect(button).toHaveFocus();
  });

  it('falls back to the static drawing without WebGL and survives a click', () => {
    render(<Pond />);
    const button = screen.getByRole('button', {
      name: 'Drop a stone in the pond',
    });
    fireEvent.pointerDown(button, { clientX: 10, clientY: 10 });
    fireEvent.click(button);
    expect(button).toHaveAttribute('data-ready', 'false');
    expect(button.querySelector('svg')).toBeInTheDocument();
  });

  it('hides tilt where there are no motion sensors', () => {
    render(<Pond />);
    expect(screen.queryByRole('button', { name: /tilt/ })).toBeNull();
  });
});
