import { Page, Locator } from '@playwright/test'; 

export class CheckoutCompletePage { 
  readonly page: Page; 
  readonly successMessage: Locator; 

  constructor(page: Page) {
    this.page = page; 
    this.successMessage = page.locator('[data-test="complete-header"]');
  }
  
}