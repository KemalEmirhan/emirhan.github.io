import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import FloatSink from '../';
import { FLOATS, SINKS } from '@/constants/content';

describe('FloatSink', () => {
  it('labels both lists for screen readers', () => {
    render(<FloatSink floats={FLOATS} sinks={SINKS} />);
    const likes = screen.getByRole('region', { name: /things I like/ });
    const dislikes = screen.getByRole('region', {
      name: /things I don't like/,
    });
    expect(within(likes).getAllByRole('listitem')).toHaveLength(FLOATS.length);
    expect(within(dislikes).getAllByRole('listitem')).toHaveLength(
      SINKS.length
    );
  });

  it('sinks each dislike further than the one before', () => {
    render(<FloatSink floats={FLOATS} sinks={SINKS} />);
    const dislikes = screen.getByRole('region', {
      name: /things I don't like/,
    });
    const offsets = within(dislikes)
      .getAllByRole('listitem')
      .map(li => parseFloat(li.style.paddingTop || '0'));
    expect(offsets).toEqual([...offsets].sort((a, b) => a - b));
    expect(offsets.at(-1)).toBeGreaterThan(offsets[0]);
  });

  it('keeps the football aside', () => {
    render(<FloatSink floats={FLOATS} sinks={SINKS} />);
    expect(screen.getByText('(not soccer)')).toBeInTheDocument();
  });
});
