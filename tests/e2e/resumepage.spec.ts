import { test, expect } from '@playwright/test';

test.describe('Resume page', () => {
  test('should load the resume page successfully', async ({ page }) => {
    await page.goto('/resume', { waitUntil: 'load' });
    await expect(page).toHaveTitle(/Resume | Emirhan Kemal Kosem/);

    // Check for main heading
    await expect(
      page.getByRole('heading', { name: 'Resume', level: 2 })
    ).toBeVisible();

    // Check for Resume component content
    await expect(
      page.getByRole('heading', { name: 'Emirhan Kemal KOSEM', level: 1 })
    ).toBeVisible();
    await expect(page.getByText('Frontend Software Engineer')).toBeVisible();
  });

  test('should be responsive on mobile devices', async ({ page }) => {
    await page.goto('/resume', { waitUntil: 'load' });
    await page.setViewportSize({ width: 375, height: 667 });

    await expect(
      page.getByRole('heading', { name: 'Resume', level: 2 })
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Emirhan Kemal KOSEM', level: 1 })
    ).toBeVisible();
  });
});
