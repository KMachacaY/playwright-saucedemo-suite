import { Page, Locator } from '@playwright/test'; 

export class CheckoutStepOnePage { 
  readonly page: Page; 
  readonly firstNameInput: Locator; 
  readonly lastNameInput: Locator; 
  readonly postalCodeInput: Locator; 
  readonly continueButton: Locator; 

  constructor(page: Page) {
    this.page = page; 
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
  }

  async navigate() { 
    await this.page.goto('/');
  }

  async sendInformation(firstname: string, lastname: string, postalcode: string) { 
    await this.firstNameInput.fill(firstname); 
    await this.lastNameInput.fill(lastname); 
    await this.postalCodeInput.fill(postalcode); 
    await this.continueButton.click(); 
  }
}