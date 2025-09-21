import { test, expect } from '@playwright/test';
import { PAGES } from '../constants';

test.describe('Socials page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGES.SOCIALS, { waitUntil: 'load' });
  });

  test('should render', async ({ page }) => {
    await expect(page).toHaveTitle('Socials');
  });

  test('should display the socials table', async ({ page }) => {
    await expect(page.getByRole('table')).toBeVisible();
  });

  test('should click on the socials table', async ({ page }) => {
    await page
      .getByRole('link', { name: 'https://github.com/KemalEmirhan' })
      .click();
    await expect(page).toHaveURL('https://github.com/KemalEmirhan');
  });
});
