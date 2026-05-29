import { test, expect } from '@playwright/test';
import { InventoryPage } from '../../pages/InventoryPage';
import { LoginPage } from '../../pages/LoginPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutStepOnePage } from '../../pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../../pages/CheckoutStepTwoPage';
import { CheckoutCompletePage } from '../../pages/CheckoutCompletePage';

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
    await expect(inventoryPage.removeBackpackButton).toBeVisible();
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });

  test('complete end-to-end purchase flow', async ({ page }) => {
    await inventoryPage.addProduct();
    await expect(inventoryPage.removeBackpackButton).toBeVisible();
    await expect(inventoryPage.cartBadge).toHaveText('1');
    await expect(inventoryPage.cart).toBeVisible();
    await inventoryPage.navigateToCartPage();
    await expect(page).toHaveURL('/cart.html');
    const cartPage = new CartPage(page);
    await cartPage.getCheckout();
    await expect(page).toHaveURL('/checkout-step-one.html');
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    await checkoutStepOnePage.sendInformation('firstname', 'lastname', 'postalcode');
    await expect(page).toHaveURL('/checkout-step-two.html');
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    await checkoutStepTwoPage.completeCheckout();
    await expect(page).toHaveURL('/checkout-complete.html');
    const checkoutCompletePage = new CheckoutCompletePage(page);
    await expect(checkoutCompletePage.successMessage).toHaveText('Thank you for your order!');
  });
 
});