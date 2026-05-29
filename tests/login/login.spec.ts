import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login Page', () => {

  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('user can log in with valid credentials', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('/inventory.html');
  });

  test('authentication fails with invalid credentials', async ({ page }) => {
    await loginPage.login('wronguser', 'wrongpass');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(page).toHaveURL('/');
  });
 
});
