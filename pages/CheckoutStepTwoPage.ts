import { Page, Locator } from '@playwright/test'; 

export class CheckoutStepTwoPage { 
  readonly page: Page; 
  readonly finishButton: Locator; 

  constructor(page: Page) {
    this.page = page; 
    this.finishButton = page.locator('[data-test="finish"]');
  }

  async completeCheckout() { 
    await this.finishButton.click(); 
  }
  
}