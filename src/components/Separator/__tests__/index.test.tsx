import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Separator from '../';

describe('Separator', () => {
  it('should render', () => {
    const { container } = render(<Separator />);
    expect(container).toMatchSnapshot();
  });
});
