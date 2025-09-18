import { test, expect } from '@playwright/test';
import { axeAnalyze } from '@/utilities/axeBuilder';
import { PAGES } from '../constants';

test.describe('Home page accessibility test', () => {
  test('should render without detected accessibility issues', async ({
    page,
  }) => {
    await page.goto(PAGES.HOME);
    const { violations } = await axeAnalyze(page);

    expect(violations).toEqual([]);
  });
});
