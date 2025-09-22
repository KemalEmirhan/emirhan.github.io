import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Blur from '../';

describe('Blur', () => {
  it('should render', () => {
    const { container } = render(<Blur />);
    expect(container).toMatchSnapshot();
  });
});
