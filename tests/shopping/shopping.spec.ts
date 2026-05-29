import { test, expect } from '@playwright/test';
import { InventoryPage } from '../../pages/InventoryPage';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login Page', () => {

  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('/inventory.html');
    inventoryPage = new InventoryPage(page);
  });

  test('add backpack to cart', async ({ page }) => {
    await inventoryPage.addProduct();
    await expect(inventoryPage.removeBackpackButton).toBeVisible();
  });

  test('count the cart', async ({ page }) => {
    await inventoryPage.addProduct();
    await expect(inventoryPage.cart).toHaveText('1');
  });
 
});