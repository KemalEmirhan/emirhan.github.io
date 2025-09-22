import { test, expect } from '@playwright/test';
import { PAGES } from '../constants';

test.describe('Homepage', () => {
  test('should load the homepage successfully', async ({ page }) => {
    await page.goto(PAGES.HOME, { waitUntil: 'load' });
    // Check if the page loads without errors
    await expect(page).toHaveTitle(
      'Emirhan Kemal Kosem - Frontend Software Engineer'
    );

    // Check if the main content is visible
    await expect(page.locator('main')).toBeVisible();
  });

  test('should be responsive on mobile devices', async ({ page }) => {
    await page.goto(PAGES.HOME, { waitUntil: 'load' });
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Check if the layout adapts to mobile
    const main = page.locator('main');
    await expect(main).toBeVisible();
  });

  test('should have proper meta tags and SEO', async ({ page }) => {
    await page.goto(PAGES.HOME, { waitUntil: 'load' });
    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute(
      'content',
      'Frontend Software Engineer with 8+ years of experience in React, Next.js, TypeScript, and GraphQL. Based in Berlin, specializing in high-performance web applications, accessibility, and modern web standards.'
    );

    // Check favicon
    const favicon = page.locator('link[rel="icon"][sizes="any"]');
    await expect(favicon).toHaveAttribute('href', '/favicon.ico');
  });
});
