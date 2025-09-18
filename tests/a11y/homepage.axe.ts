import { test, expect } from '@playwright/test';
import { axeAnalyze } from '@/utilities/axeBuilder';
import { PAGES } from '../constants';

test.describe('Home page accessibility test', () => {
  test('should render without detected accessibility issues', async ({
    page,
  }) => {
    await page.goto(PAGES.HOME, { waitUntil: 'load' });
    const { violations } = await axeAnalyze(page);

    if (violations.length) {
      await test.info().attach('violations.json', {
        body: JSON.stringify(violations, null, 2),
        contentType: 'application/json',
      });
    }

    expect(violations).toHaveLength(0);
  });
});
