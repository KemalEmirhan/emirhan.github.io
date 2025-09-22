import { test, expect } from '@playwright/test';
import { axeAnalyze } from '@/utilities/axeBuilder';
import { PAGES } from '../constants';

test.describe('Socials page accessibility test', () => {
  test('should render without detected accessibility issues', async ({
    page,
  }) => {
    await page.goto(PAGES.SOCIALS, { waitUntil: 'load' });
    const { violations } = await axeAnalyze(page);

    if (violations.length) {
      await test.info().attach('violations.json', {
        body: JSON.stringify(violations, null, 2),
        contentType: 'application/json',
      });
    }

    expect(violations).toHaveLength(0);
  });

  test('should have proper table accessibility', async ({ page }) => {
    await page.goto(PAGES.SOCIALS, { waitUntil: 'load' });

    // Check table has proper role
    const table = page.getByRole('table');
    await expect(table).toBeVisible();

    // Check table headers are properly associated
    const platformHeader = page.getByRole('columnheader', { name: 'PLATFORM' });
    const accountHeader = page.getByRole('columnheader', { name: 'ACCOUNT' });

    await expect(platformHeader).toBeVisible();
    await expect(accountHeader).toBeVisible();
  });

  test('should have proper link accessibility in table', async ({ page }) => {
    await page.goto(PAGES.SOCIALS, { waitUntil: 'load' });

    // Check that all links in the table have proper attributes
    const tableLinks = page.locator('table a');
    const firstLink = tableLinks.first();

    await expect(firstLink).toHaveAttribute('target', '_blank');
    await expect(firstLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('should be accessible on mobile devices', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(PAGES.SOCIALS, { waitUntil: 'load' });

    const { violations } = await axeAnalyze(page);

    if (violations.length) {
      await test.info().attach('mobile-violations.json', {
        body: JSON.stringify(violations, null, 2),
        contentType: 'application/json',
      });
    }

    expect(violations).toHaveLength(0);
  });

  test('should have proper navigation accessibility', async ({ page }) => {
    await page.goto(PAGES.SOCIALS, { waitUntil: 'load' });

    // Check navigation has proper role and label
    const sidebarNav = page.getByRole('navigation', {
      name: 'main navigation',
    });
    await expect(sidebarNav).toBeVisible();

    // Check navigation links have proper attributes
    const aboutLink = page.getByRole('link', { name: 'About' });
    const socialsLink = page.getByRole('link', { name: 'Socials' });

    await expect(aboutLink).toBeVisible();
    await expect(socialsLink).toBeVisible();
  });
});
