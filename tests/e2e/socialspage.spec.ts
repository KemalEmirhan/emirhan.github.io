import { test, expect } from '@playwright/test';
import { PAGES } from '../constants';

test.describe('Socials page', () => {
  test('should load the socials page successfully', async ({ page }) => {
    await page.goto(PAGES.SOCIALS, { waitUntil: 'load' });
    await expect(page).toHaveTitle(
      'Emirhan Kemal Kosem - Frontend Software Engineer'
    );

    // Check if the main content is visible
    await expect(page.locator('main')).toBeVisible();
  });

  test('should display the socials table with correct structure', async ({
    page,
  }) => {
    await page.goto(PAGES.SOCIALS, { waitUntil: 'load' });
    // Check if table is visible
    await expect(page.getByRole('table')).toBeVisible();

    // Check table headers
    await expect(page.getByText('PLATFORM')).toBeVisible();
    await expect(page.getByText('ACCOUNT')).toBeVisible();
  });

  test('should have clickable links with correct URLs', async ({ page }) => {
    await page.goto(PAGES.SOCIALS, { waitUntil: 'load' });
    // Test GitHub link
    const githubLink = page.getByRole('link', {
      name: 'https://github.com/KemalEmirhan',
    });
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/KemalEmirhan'
    );

    // Test LinkedIn link
    const linkedinLink = page.getByRole('link', {
      name: 'https://www.linkedin.com/in/emirhan-kemal-kosem-259569b3/',
    });
    await expect(linkedinLink).toBeVisible();
    await expect(linkedinLink).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/emirhan-kemal-kosem-259569b3/'
    );
  });

  test('should be responsive on mobile devices', async ({ page }) => {
    await page.goto(PAGES.SOCIALS, { waitUntil: 'load' });
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Check if the table is still visible on mobile
    await expect(page.getByRole('table')).toBeVisible();

    // Check if all platform rows are still visible
    await expect(page.getByText('Github', { exact: true })).toBeVisible();
    await expect(page.getByText('Linkedin', { exact: true })).toBeVisible();
    await expect(page.getByText('Medium', { exact: true })).toBeVisible();
    await expect(page.getByText('Twitter', { exact: true })).toBeVisible();
    await expect(page.getByText('Instagram', { exact: true })).toBeVisible();
    await expect(page.getByText('Bluesky', { exact: true })).toBeVisible();
  });
});
