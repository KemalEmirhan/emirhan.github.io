import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import Icon from '../';
import { TIconName } from '@/schemas';

describe('Icon Component', () => {
  const cases = [
    {
      iconName: 'Github',
      color: '#181717',
    },
    {
      iconName: 'LinkedIn',
      color: '#0077B5',
    },
    {
      iconName: 'Medium',
      color: '#12100E',
    },
    {
      iconName: 'Twitter',
      color: '#1DA1F2',
    },
  ];

  test.each(cases)(
    'should render $iconName icon with $color color',
    ({ iconName, color }) => {
      const { container } = render(
        <Icon iconName={iconName as TIconName} color={color} />
      );

      expect(container).toMatchSnapshot();
    }
  );
});
