import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import Icon from '../';
import { TIconName } from '@/schemas';

describe('Icon Component', () => {
  const cases = [
    {
      iconName: 'Github',
    },
    {
      iconName: 'LinkedIn',
    },
    {
      iconName: 'Medium',
    },
    {
      iconName: 'Twitter',
    },
  ];

  test.each(cases)('should render $iconName icon', ({ iconName }) => {
    const { container } = render(<Icon name={iconName as TIconName} />);

    expect(container).toMatchSnapshot();
  });
});
