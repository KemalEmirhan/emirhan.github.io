import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Resume from '../index';

describe('Resume', () => {
  it('renders resume header correctly', () => {
    render(<Resume />);
    expect(
      screen.getByRole('heading', { name: /Emirhan Kemal KOSEM/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Berlin, Germany/i)).toBeInTheDocument();
  });

  it('renders contact information', () => {
    render(<Resume />);
    expect(
      screen.getByText(/emirhankemalkosem@gmail.com/i)
    ).toBeInTheDocument();
  });

  it('renders experience section', () => {
    render(<Resume />);
    expect(
      screen.getByRole('heading', { name: /Experience/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/FRONTEND ENGINEER \| ADAC PINCAMP GMBH/i)
    ).toBeInTheDocument();
  });

  it('renders education section', () => {
    render(<Resume />);
    expect(
      screen.getByRole('heading', { name: /Education/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Istanbul Aydin University/i)).toBeInTheDocument();
  });

  it('renders skills section', () => {
    render(<Resume />);
    expect(
      screen.getByRole('heading', { name: /Skills/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/React, NextJS, TypeScript/i)).toBeInTheDocument();
  });
});
