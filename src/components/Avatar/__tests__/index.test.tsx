import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Avatar from '../';

describe('Avatar', () => {
  it('should render', () => {
    const { container } = render(<Avatar />);
    expect(container).toMatchSnapshot();
  });

  it('should render profile image with correct alt text', () => {
    render(<Avatar />);

    const profileImage = screen.getByAltText('Emirhan profile picture');
    expect(profileImage).toBeInTheDocument();
    expect(profileImage).toHaveAttribute(
      'src',
      expect.stringContaining('pp.png')
    );
  });
});
