import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import About from '../index';

// Mock the useAge hook to return a consistent age for testing
vi.mock('@/hooks/useAge', () => ({
  default: () => 30,
}));

describe('About Component', () => {
  test('should render', () => {
    const { container } = render(<About />);
    expect(container).toMatchSnapshot();
  });

  test('should display the age in the about text', () => {
    render(<About />);

    expect(
      screen.getByText(/Hey, I'm Emirhan 👋 30 years old/)
    ).toBeInTheDocument();
  });

  test('should render the profile image with correct alt text', () => {
    render(<About />);

    const profileImage = screen.getByAltText('Emirhan profile picture');
    expect(profileImage).toBeInTheDocument();
    // Next.js Image component transforms the src, so we check if it contains the original path
    expect(profileImage).toHaveAttribute(
      'src',
      expect.stringContaining('pp.png')
    );
  });

  test('should have proper accessibility attributes', () => {
    render(<About />);

    const aboutSection = screen.getByRole('article');
    expect(aboutSection).toBeInTheDocument();

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('About Me');
  });
});
