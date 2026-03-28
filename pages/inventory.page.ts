import { Page, Locator } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly inventoryItems: Locator;
    readonly shoppingCartLink: Locator;
    readonly menuButton: Locator;
    readonly logoutLink: Locator;
    readonly inventoryImages: Locator;
    readonly addToCartButtons: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryItems = page.locator('.inventory_item');
        this.shoppingCartLink = page.locator('.shopping_cart_link');
        this.menuButton = page.locator('#react-burger-menu-btn');
        this.logoutLink = page.locator('#logout_sidebar_link');
        this.inventoryItems = page.locator('.inventory_item');
        this.inventoryImages = page.locator('.inventory_item_img');
        this.addToCartButtons = page.locator('.btn_inventory');

    }

    // -------- ACTIONS --------
    async checkUniqueImages(): Promise<boolean> {
        const imageSrcs = await this.inventoryImages.evaluateAll(
            images => images
                .map(img => img.getAttribute('src'))
                .filter(src => src !== null) as string[]
        );
        const uniqueSrcs = new Set(imageSrcs);
        return uniqueSrcs.size === imageSrcs.length;
    }

    async checkUniqueInventoryItemNames(): Promise<boolean> {
        const itemNames = await this.inventoryItems.evaluateAll(items => items.map(item => item.textContent?.trim() || ''));
        const uniqueNames = new Set(itemNames);
        return uniqueNames.size === itemNames.length;
    }

    async getInventoryItemCount(): Promise<number> {
        return await this.inventoryItems.count();
    }

    // get name, price, description of a specific inventory item
    async getInventoryItem(name: string): Promise<string[]> {
        const itemLocator = this.inventoryItems.filter({ hasText: name });
        const price = itemLocator.locator('.inventory_item_price').innerText();
        const description = itemLocator.locator('.inventory_item_desc').innerText();
        return await Promise.all([
            price,
            description
        ]);
    }

    async addItemToCart(name: string): Promise<void> {
        const itemLocator = this.inventoryItems.filter({ hasText: name });
        const addToCartButton = itemLocator.locator('.btn_inventory');
        await addToCartButton.click();
    }

    
}