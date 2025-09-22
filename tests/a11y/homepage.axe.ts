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

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto(PAGES.HOME, { waitUntil: 'load' });

    // Check for main heading
    const mainHeading = page.getByRole('heading', { name: 'About Me' });
    await expect(mainHeading).toBeVisible();

    // Check if it's an h1
    await expect(mainHeading).toHaveAttribute('tagName', 'H1');
  });

  test('should have proper alt text for images', async ({ page }) => {
    await page.goto(PAGES.HOME, { waitUntil: 'load' });

    // Check profile image has alt text
    const profileImage = page.getByAltText('Emirhan profile picture');
    await expect(profileImage).toBeVisible();
  });

  test('should have proper link accessibility', async ({ page }) => {
    await page.goto(PAGES.HOME, { waitUntil: 'load' });

    // Check social links have proper attributes
    const socialLinks = page.locator('nav[aria-label="account links"] a');
    const firstLink = socialLinks.first();

    await expect(firstLink).toHaveAttribute('target', '_blank');
    await expect(firstLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('should be accessible on mobile devices', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(PAGES.HOME, { waitUntil: 'load' });

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
