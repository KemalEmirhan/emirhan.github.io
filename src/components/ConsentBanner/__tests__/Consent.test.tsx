import { act, fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@next/third-parties/google', () => ({
  GoogleAnalytics: ({ gaId }: { gaId: string }) => (
    <div data-testid='ga'>{gaId}</div>
  ),
  GoogleTagManager: () => <div data-testid='gtm' />,
}));

const load = async () => {
  vi.resetModules();
  const banner = (await import('../')).default;
  const analytics = (await import('@/components/Analytics')).default;
  const toggle = (await import('@/components/AnalyticsToggle')).default;
  return {
    ConsentBanner: banner,
    Analytics: analytics,
    AnalyticsToggle: toggle,
  };
};

describe('consent', () => {
  beforeEach(() => {
    localStorage.clear();
    document.cookie = '_ga=GA1.1.123; path=/';
    (window as unknown as { dataLayer?: unknown[] }).dataLayer = [];
  });

  it('asks first and loads nothing before consent', async () => {
    const { ConsentBanner, Analytics } = await load();
    render(
      <>
        <ConsentBanner />
        <Analytics gaId='G-409F5ZW24Z' enabled />
      </>
    );
    expect(
      screen.getByRole('region', { name: 'Analytics consent' })
    ).toBeInTheDocument();
    expect(screen.queryByTestId('ga')).toBeNull();
  });

  it('loads Google Analytics after accepting and hides the banner', async () => {
    const { ConsentBanner, Analytics } = await load();
    render(
      <>
        <ConsentBanner />
        <Analytics gaId='G-409F5ZW24Z' enabled />
      </>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Sure' }));
    expect(screen.getByTestId('ga')).toHaveTextContent('G-409F5ZW24Z');
    expect(
      screen.queryByRole('region', { name: 'Analytics consent' })
    ).toBeNull();
    expect(localStorage.getItem('consent-analytics')).toBe('granted');
  });

  it('never loads on previews, even with consent', async () => {
    localStorage.setItem('consent-analytics', 'granted');
    const { Analytics } = await load();
    render(<Analytics gaId='G-409F5ZW24Z' enabled={false} />);
    expect(screen.queryByTestId('ga')).toBeNull();
  });

  it('declining remembers the choice and stores nothing', async () => {
    const { ConsentBanner, Analytics } = await load();
    render(
      <>
        <ConsentBanner />
        <Analytics gaId='G-409F5ZW24Z' enabled />
      </>
    );
    fireEvent.click(screen.getByRole('button', { name: 'No thanks' }));
    expect(screen.queryByTestId('ga')).toBeNull();
    expect(localStorage.getItem('consent-analytics')).toBe('denied');
    expect(document.cookie).not.toContain('_ga=');
  });

  it('the footer toggle withdraws consent and clears GA cookies', async () => {
    localStorage.setItem('consent-analytics', 'granted');
    const { Analytics, AnalyticsToggle } = await load();
    render(
      <>
        <AnalyticsToggle />
        <Analytics gaId='G-409F5ZW24Z' enabled />
      </>
    );
    expect(screen.getByTestId('ga')).toBeInTheDocument();
    act(() => {
      fireEvent.click(screen.getByRole('button', { name: 'analytics on' }));
    });
    expect(screen.queryByTestId('ga')).toBeNull();
    expect(
      screen.getByRole('button', { name: 'analytics off' })
    ).toBeInTheDocument();
    expect(document.cookie).not.toContain('_ga=');
    const layer = (window as unknown as { dataLayer: IArguments[] }).dataLayer;
    const last = Array.from(layer.at(-1)!);
    expect(last.slice(0, 2)).toEqual(['consent', 'update']);
  });
});
