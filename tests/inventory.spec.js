import {test} from '../fixtures/inventoryPage.fixture';
import { InventoryPage } from '../pages/inventory.page';
import { expect } from '@playwright/test';

test('check total number of items', async ({ page }) => {
const inventoryPage = new InventoryPage(page);
expect(await inventoryPage.getInventoryItemCount()).toBe(6);
});

test('check inventory item details', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const [price, description] = await inventoryPage.getInventoryItem('Sauce Labs Fleece Jacket');
    expect(price).toBe('$49.99');
    expect(description).toContain('It\'s not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.');
});

test('check unique inventory item images', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    expect(await inventoryPage.checkUniqueImages()).toBe(true);
});     

test('add item to cart', async ({ page }) => {  
    const inventoryPage = new InventoryPage(page);
});