import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import LinkPreview from '../';

const setup = () =>
  render(
    <LinkPreview
      href='https://madita.ai/en'
      image='/previews/madita.jpg'
      domain='madita.ai'
      title='AI-powered first interviews for recruiting teams'
    >
      HeyJobs
    </LinkPreview>
  );

describe('LinkPreview', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('links out in a new tab and describes the destination', () => {
    setup();
    const link = screen.getByRole('link', { name: /HeyJobs/ });
    expect(link).toHaveAttribute('href', 'https://madita.ai/en');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAccessibleDescription(
      'AI-powered first interviews for recruiting teams'
    );
  });

  it('opens on mouse hover after a short delay and closes on leave', () => {
    setup();
    const link = screen.getByRole('link', { name: /HeyJobs/ });
    const card = screen.getByRole('tooltip', { hidden: true });
    fireEvent.pointerEnter(link, { pointerType: 'mouse' });
    expect(card).toHaveAttribute('data-open', 'false');
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(card).toHaveAttribute('data-open', 'true');
    fireEvent.pointerLeave(link);
    act(() => {
      vi.advanceTimersByTime(150);
    });
    expect(card).toHaveAttribute('data-open', 'false');
  });

  it('ignores touch and closes on Escape', () => {
    setup();
    const link = screen.getByRole('link', { name: /HeyJobs/ });
    const card = screen.getByRole('tooltip', { hidden: true });
    fireEvent.pointerEnter(link, { pointerType: 'touch' });
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(card).toHaveAttribute('data-open', 'false');

    fireEvent.pointerEnter(link, { pointerType: 'mouse' });
    act(() => {
      vi.advanceTimersByTime(300);
    });
    fireEvent.keyDown(link, { key: 'Escape' });
    act(() => {
      vi.advanceTimersByTime(10);
    });
    expect(card).toHaveAttribute('data-open', 'false');
  });
});
