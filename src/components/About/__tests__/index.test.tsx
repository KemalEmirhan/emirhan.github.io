import { describe, expect, test, vi } from 'vitest';
import { render } from '@testing-library/react';
import About from '../';

vi.mock('@/hooks/useAge', () => ({
  default: () => 30,
}));

describe('About Component', () => {
  test('should render', () => {
    const { container } = render(<About />);
    expect(container).toMatchSnapshot();
  });
});
