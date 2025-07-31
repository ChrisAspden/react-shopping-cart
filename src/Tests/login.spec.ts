// tests/login.spec.ts
import { test, expect } from '@playwright/test';

test('user can log in successfully', async ({ page }) => {
  await page.goto('http://localhost:3000/login'); // adjust to your route

  await page.fill('input[type="email"]', 'test@example.com');
  await page.fill('input[type="password"]', '123456');
  await page.click('button[type="submit"]');

  await expect(page).toHaveURL('http://localhost:3000/dashboard'); // or wherever you redirect
  await expect(page.locator('.navbar')).toContainText('test@example.com');
});
