import { test } from '../fixtures/saucedemoPage.fixture';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/Login.page';

test('should login successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(process.env.STANDARD_USERNAME, process.env.PASSWORD);
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
await expect(page).toHaveTitle('Swag Labs');
}
);

test('should show locked out error message with invalid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(process.env.LOCKED_USERNAME, process.env.PASSWORD);
 expect(await loginPage.getErrorMessage()).toBe('Epic sadface: Sorry, this user has been locked out.');
});