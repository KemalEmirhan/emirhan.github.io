import { test, expect, type Page } from '@playwright/test';
import { axeAnalyze } from '@/utilities/axeBuilder';
import { PAGES } from '../constants';

// The load fade-in briefly lowers contrast; measure the settled page.
const settle = (page: Page) =>
  page.evaluate(() =>
    Promise.all(document.getAnimations().map(a => a.finished))
  );

test.describe('Home page accessibility test', () => {
  test('should render without detected accessibility issues', async ({
    page,
  }) => {
    await page.goto(PAGES.HOME, { waitUntil: 'load' });
    await settle(page);
    const { violations } = await axeAnalyze(page);

    if (violations.length) {
      await test.info().attach('violations.json', {
        body: JSON.stringify(violations, null, 2),
        contentType: 'application/json',
      });
    }

    expect(violations).toHaveLength(0);
  });

  test('should be accessible on mobile devices', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(PAGES.HOME, { waitUntil: 'load' });
    await settle(page);

    const { violations } = await axeAnalyze(page);

    if (violations.length) {
      await test.info().attach('mobile-violations.json', {
        body: JSON.stringify(violations, null, 2),
        contentType: 'application/json',
      });
    }

    expect(violations).toHaveLength(0);
  });
});
