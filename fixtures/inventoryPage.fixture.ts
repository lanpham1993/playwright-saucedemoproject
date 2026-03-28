import { test as base} from '@playwright/test';
import { LoginPage } from '../pages/Login.page';

export const test = base.extend({
    page: async ({ page }, use) => {
        await page.goto('https://www.saucedemo.com');
        const loginPage = new LoginPage(page);
        await loginPage.login(process.env.STANDARD_USERNAME!, process.env.PASSWORD!);
        await page.waitForURL('https://www.saucedemo.com/inventory.html');
        await use(page);
    }
});