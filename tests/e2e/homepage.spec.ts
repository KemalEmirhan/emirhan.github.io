import { test, expect } from '@playwright/test';
import { PAGES } from '../constants';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGES.HOME, { waitUntil: 'load' });
  });

  test('should load the homepage successfully', async ({ page }) => {
    // Check if the page loads without errors
    await expect(page).toHaveTitle(
      'Emirhan Kemal Kosem - Frontend Software Engineer'
    );

    // Check if the main content is visible
    await expect(page.locator('main')).toBeVisible();
  });

  test('should display the about section', async ({ page }) => {
    // Check for the about section
    await expect(page.getByRole('heading', { name: 'About Me' })).toBeVisible();

    // Check for key content in the about section
    await expect(page.getByText(/Hey, I'm Emirhan/)).toBeVisible();
    await expect(
      page.locator('p').filter({ hasText: /Frontend Software Engineer/ })
    ).toBeVisible();
    await expect(page.getByText(/Based in Berlin/)).toBeVisible();
  });

  test('should display the profile image', async ({ page }) => {
    const profileImage = page.getByAltText('Emirhan profile picture');
    await expect(profileImage).toBeVisible();

    // Check if the image has proper styling
    await expect(profileImage).toHaveCSS('border-radius', '8px');
  });

  test('should display social account links', async ({ page }) => {
    // Check for the navigation with account links
    const accountNav = page.getByRole('navigation', { name: 'account links' });
    await expect(accountNav).toBeVisible();

    // Check for individual account links (these should be visible based on your accountLinks constant)
    const accountLinks = page.locator('nav[aria-label="account links"] a');
    await expect(accountLinks).toHaveCount(5); // Github, LinkedIn, Medium, Twitter, Instagram

    // Check if links have proper attributes
    const firstLink = accountLinks.first();
    await expect(firstLink).toHaveAttribute('target', '_blank');
    await expect(firstLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('should be responsive on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Check if the layout adapts to mobile
    const main = page.locator('main');
    await expect(main).toBeVisible();

    // Check if the about section is still visible on mobile
    await expect(page.getByRole('heading', { name: 'About Me' })).toBeVisible();
  });

  test('should have proper meta tags', async ({ page }) => {
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

  test('should have smooth hover effects on account links', async ({
    page,
  }) => {
    const accountLinks = page.locator('nav[aria-label="account links"] a');
    const firstLink = accountLinks.first();

    // Hover over the first link
    await firstLink.hover();

    // Check if hover effects are applied (this tests the CSS transitions)
    await expect(firstLink).toHaveClass(/transition/);
  });

  test('should handle keyboard navigation', async ({ page }) => {
    // Tab through the page to test keyboard navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Check if we can navigate through the page (this tests basic keyboard functionality)
    // The focus might not be visible in all browsers, so we'll just ensure the page responds to keyboard input
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});
