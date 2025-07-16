import { Page, Locator } from '@playwright/test';

export function createProductLocators(page: Page, productName: 'backpack' | 'bike-light' | 'fleece-jacket' | 'onesie' = 'backpack') {
    const addToCartButton = page.locator(`#add-to-cart-sauce-labs-${productName}`);
    const verifyAdded = page.locator(`#remove-sauce-labs-${productName}`);
    return { addToCartButton, verifyAdded };
}