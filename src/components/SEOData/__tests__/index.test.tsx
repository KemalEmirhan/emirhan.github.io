// src/components/SEOData/index.test.tsx
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SEOData from '../';

describe('SEOData', () => {
  it('renders two JSON-LD script tags with valid JSON', () => {
    render(<SEOData />);
    const scripts = document.querySelectorAll(
      'script[type="application/ld+json"]'
    );
    expect(scripts.length).toBe(2);
    scripts.forEach(script => {
      expect(() => JSON.parse(script.textContent || '')).not.toThrow();
      expect(script.textContent).toMatchSnapshot();
    });
  });

  it('renders Person schema with correct structure and required fields', () => {
    render(<SEOData />);
    const scripts = document.querySelectorAll(
      'script[type="application/ld+json"]'
    );

    const personScript = Array.from(scripts).find(script => {
      const content = JSON.parse(script.textContent || '');
      return content['@type'] === 'Person';
    });

    expect(personScript).toBeDefined();

    const personSchema = JSON.parse(personScript?.textContent || '');

    // Test Person schema structure
    expect(personSchema['@context']).toBe('https://schema.org');
    expect(personSchema['@type']).toBe('Person');
    expect(personSchema.name).toBe('Emirhan Kemal Kosem');
    expect(personSchema.alternateName).toBe('Emir');
    expect(personSchema.jobTitle).toBe('Frontend Software Engineer');
    expect(personSchema.url).toBe('https://emirkemal.com');
    expect(personSchema.image).toBe('https://emirhan.github.io/pp.png');
    expect(personSchema.email).toBe('emirhankemalkosem@gmail.com');
    expect(personSchema.birthDate).toBe('1994-08-13');
    expect(personSchema.nationality).toBe('Turkish');
    expect(personSchema.gender).toBe('Male');

    // Test arrays
    expect(Array.isArray(personSchema.sameAs)).toBe(true);
    expect(personSchema.sameAs).toHaveLength(5);
    expect(personSchema.sameAs).toContain('https://github.com/KemalEmirhan');
    expect(personSchema.sameAs).toContain(
      'https://www.linkedin.com/in/emirhan-kemal-kosem-259569b3/'
    );

    expect(Array.isArray(personSchema.knowsAbout)).toBe(true);
    expect(personSchema.knowsAbout).toHaveLength(10);
    expect(personSchema.knowsAbout).toContain('React');
    expect(personSchema.knowsAbout).toContain('Next.js');
    expect(personSchema.knowsAbout).toContain('TypeScript');

    // Test nested address object
    expect(personSchema.address).toBeDefined();
    expect(personSchema.address['@type']).toBe('PostalAddress');
    expect(personSchema.address.addressLocality).toBe('Berlin');
    expect(personSchema.address.addressCountry).toBe('Germany');
  });

  it('renders WebSite schema with correct structure and required fields', () => {
    render(<SEOData />);
    const scripts = document.querySelectorAll(
      'script[type="application/ld+json"]'
    );

    const websiteScript = Array.from(scripts).find(script => {
      const content = JSON.parse(script.textContent || '');
      return content['@type'] === 'WebSite';
    });

    expect(websiteScript).toBeDefined();

    const websiteSchema = JSON.parse(websiteScript?.textContent || '');

    // Test WebSite schema structure
    expect(websiteSchema['@context']).toBe('https://schema.org');
    expect(websiteSchema['@type']).toBe('WebSite');
    expect(websiteSchema.name).toBe(
      'Emirhan Kemal Kosem - Frontend Software Engineer'
    );
    expect(websiteSchema.url).toBe('https://emirkemal.com');
    expect(websiteSchema.inLanguage).toBe('en-US');

    // Test dynamic copyright year
    const currentYear = new Date().getFullYear();
    expect(websiteSchema.copyrightYear).toBe(currentYear);

    // Test nested author object
    expect(websiteSchema.author).toBeDefined();
    expect(websiteSchema.author['@type']).toBe('Person');
    expect(websiteSchema.author.name).toBe('Emirhan Kemal Kosem');

    // Test nested publisher object
    expect(websiteSchema.publisher).toBeDefined();
    expect(websiteSchema.publisher['@type']).toBe('Person');
    expect(websiteSchema.publisher.name).toBe('Emirhan Kemal Kosem');

    // Test nested copyright holder object
    expect(websiteSchema.copyrightHolder).toBeDefined();
    expect(websiteSchema.copyrightHolder['@type']).toBe('Person');
    expect(websiteSchema.copyrightHolder.name).toBe('Emirhan Kemal Kosem');
  });

  it('ensures JSON-LD scripts have proper attributes for SEO', () => {
    render(<SEOData />);
    const scripts = document.querySelectorAll(
      'script[type="application/ld+json"]'
    );

    scripts.forEach(script => {
      expect(script.getAttribute('type')).toBe('application/ld+json');
      expect(script.textContent).toBeTruthy();
      expect(script.textContent?.trim()).not.toBe('');
    });
  });

  it('validates that all JSON-LD data is properly formatted and parseable', () => {
    render(<SEOData />);
    const scripts = document.querySelectorAll(
      'script[type="application/ld+json"]'
    );

    scripts.forEach(script => {
      const content = script.textContent || '';
      expect(content).toBeTruthy();

      // Test that JSON is valid
      expect(() => JSON.parse(content)).not.toThrow();

      const parsedContent = JSON.parse(content);

      // Test that it has required schema.org properties
      expect(parsedContent['@context']).toBe('https://schema.org');
      expect(parsedContent['@type']).toBeTruthy();
      expect(typeof parsedContent['@type']).toBe('string');
    });
  });

  it('ensures Person schema contains all expected social media links', () => {
    render(<SEOData />);
    const scripts = document.querySelectorAll(
      'script[type="application/ld+json"]'
    );

    const personScript = Array.from(scripts).find(script => {
      const content = JSON.parse(script.textContent || '');
      return content['@type'] === 'Person';
    });

    const personSchema = JSON.parse(personScript?.textContent || '');
    const expectedSocialLinks = [
      'https://github.com/KemalEmirhan',
      'https://www.linkedin.com/in/emirhan-kemal-kosem-259569b3/',
      'https://medium.com/@emirhankemalkosem',
      'https://twitter.com/KsemEmir',
      'https://www.instagram.com/emirhankemalkosem/',
    ];

    expectedSocialLinks.forEach(link => {
      expect(personSchema.sameAs).toContain(link);
    });
  });

  it('ensures Person schema contains all expected technical skills', () => {
    render(<SEOData />);
    const scripts = document.querySelectorAll(
      'script[type="application/ld+json"]'
    );

    const personScript = Array.from(scripts).find(script => {
      const content = JSON.parse(script.textContent || '');
      return content['@type'] === 'Person';
    });

    const personSchema = JSON.parse(personScript?.textContent || '');
    const expectedSkills = [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'GraphQL',
      'Web Accessibility',
      'Frontend Development',
      'Web Performance',
      'Component Libraries',
      'UI/UX Design',
    ];

    expectedSkills.forEach(skill => {
      expect(personSchema.knowsAbout).toContain(skill);
    });
  });
});
