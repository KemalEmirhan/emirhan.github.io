import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SEOData from '../index';

describe('SEOData', () => {
  it('renders JSON-LD scripts', () => {
    const { container } = render(<SEOData />);
    const scripts = container.querySelectorAll(
      'script[type="application/ld+json"]'
    );
    expect(scripts.length).toBe(2);

    const personData = JSON.parse(scripts[0].innerHTML);
    expect(personData['@type']).toBe('Person');
    expect(personData.name).toBe('Emirhan Kemal Kosem');

    const websiteData = JSON.parse(scripts[1].innerHTML);
    expect(websiteData['@type']).toBe('WebSite');
  });
});
