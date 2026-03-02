import { browser, $, expect } from '@wdio/globals';
import { Locators } from '../helpers/locators';

const TEST_EMAIL =
  process.env.E2E_TEST_EMAIL || 'test@example.com';
const TEST_PASSWORD = process.env.E2E_TEST_PASSWORD || '123456';

/** Reduces retry spam - poll every 2s instead of ~100ms */
const WAIT_OPTS = { timeout: 20000, interval: 2000 };

describe('Auth Flow', () => {
  beforeEach(async () => {
    await browser.activateApp('com.snehi_raj.expotodo');
    await browser.pause(3000);
  });

  it('should display login screen on app launch', async () => {
    const emailInput = await $(Locators.loginEmailInput);
    await emailInput.waitForDisplayed(WAIT_OPTS);
    await expect(emailInput).toBeDisplayed();

    const loginButton = await $(Locators.loginButton);
    await expect(loginButton).toBeDisplayed();
  });

  it('should navigate to Sign Up and back', async () => {
    const signupNav = await $(Locators.signupNavButton);
    await signupNav.waitForDisplayed(WAIT_OPTS);
    await signupNav.click();

    const signupButton = await $(Locators.signupButton);
    await signupButton.waitForDisplayed({ timeout: 10000, interval: 2000 });

    const loginNav = await $(Locators.loginNavButton);
    await loginNav.click();

    const emailInput = await $(Locators.loginEmailInput);
    await emailInput.waitForDisplayed({ timeout: 10000, interval: 2000 });
  });

  it('should login with valid credentials', async () => {
    const emailInput = await $(Locators.loginEmailInput);
    await emailInput.waitForDisplayed(WAIT_OPTS);
    await emailInput.setValue(TEST_EMAIL);

    const passwordInput = await $(Locators.loginPasswordInput);
    await passwordInput.setValue(TEST_PASSWORD);

    const loginButton = await $(Locators.loginButton);
    await loginButton.click();

    const homeTitle = await $(Locators.homeTitle);
    await homeTitle.waitForDisplayed(WAIT_OPTS);
    await expect(homeTitle).toBeDisplayed();
  });
});
