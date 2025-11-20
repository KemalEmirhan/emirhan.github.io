import { test, expect } from '@playwright/test';

test.describe('Links page', () => {
  test('should load the links page successfully', async ({ page }) => {
    await page.goto('/links', { waitUntil: 'load' });
    await expect(page).toHaveTitle(/Links | Emirhan Kemal Kosem/);

    // Check for main heading
    await expect(
      page.getByRole('heading', { name: 'Links', level: 2 })
    ).toBeVisible();
  });

  test('should be responsive on mobile devices', async ({ page }) => {
    await page.goto('/links', { waitUntil: 'load' });
    await page.setViewportSize({ width: 375, height: 667 });

    await expect(
      page.getByRole('heading', { name: 'Links', level: 2 })
    ).toBeVisible();
  });
});
