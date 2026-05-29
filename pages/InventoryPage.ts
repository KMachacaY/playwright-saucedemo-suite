import { Page, Locator } from '@playwright/test'; 

export class InventoryPage { 
  readonly page: Page; 
  readonly addBackpackButton: Locator; 
  readonly removeBackpackButton: Locator; 
  readonly cart: Locator; 
  readonly cartBadge: Locator; 

  constructor(page: Page) {
    this.page = page; 
    this.addBackpackButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.removeBackpackButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cart = page.locator('[data-test="shopping-cart-link"]')
  }

  async addProduct() { 
    await this.addBackpackButton.click(); 
  }

  async navigateToCartPage() { 
    await this.cart.click();
  }
  
}