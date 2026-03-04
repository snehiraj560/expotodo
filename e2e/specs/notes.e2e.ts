import { browser, $, expect } from '@wdio/globals';
import { Locators } from '../helpers/locators';

const TEST_EMAIL =
  process.env.E2E_TEST_EMAIL || 'test@example.com';
const TEST_PASSWORD = process.env.E2E_TEST_PASSWORD || '123456';

const WAIT_OPTS = { timeout: 20000, interval: 2000 };

describe('Notes Flow', () => {
  before(async () => {
    await browser.activateApp('com.snehi_raj.expotodo');
    await browser.pause(3000);

    const emailInput = await $(Locators.loginEmailInput);
    const onLogin = await emailInput.waitForDisplayed(WAIT_OPTS).catch(() => false);
    if (onLogin !== false) {
      await emailInput.setValue(TEST_EMAIL);
      const passwordInput = await $(Locators.loginPasswordInput);
      await passwordInput.setValue(TEST_PASSWORD);
      const loginButton = await $(Locators.loginButton);
      await loginButton.click();
      await browser.pause(3000);
    }
  });

  beforeEach(async () => {
    await browser.activateApp('com.snehi_raj.expotodo');
    await browser.pause(1500);
  });

  it('should display home screen with add note button', async () => {
    const addButton = await $(Locators.addNoteButton);
    await addButton.waitForDisplayed(WAIT_OPTS);
    await expect(addButton).toBeDisplayed();
  });

  it('should open add note modal and add a note', async () => {
    const addButton = await $(Locators.addNoteButton);
    await addButton.waitForDisplayed(WAIT_OPTS);
    await addButton.click();

    const nameInput = await $(Locators.addNoteNameInput);
    await nameInput.waitForDisplayed({ timeout: 10000, interval: 2000 });
    await nameInput.setValue('E2E Test Note');

    const descInput = await $(Locators.addNoteDescriptionInput);
    await descInput.setValue('Created by Appium E2E test');

    const saveButton = await $(Locators.addNoteSaveButton);
    await saveButton.click();

    await browser.pause(4000);

    const notesList = await $(Locators.notesList);
    const notesEmpty = await $(Locators.notesEmptyText);
    const hasNotes = await notesList.isDisplayed().catch(() => false);
    const isEmpty = await notesEmpty.isDisplayed().catch(() => false);
    expect(hasNotes || !isEmpty).toBe(true);
  });

  it('should display sign out button', async () => {
    const signoutButton = await $(Locators.signoutButton);
    const exists = await signoutButton.isExisting();
    await expect(exists).toBe(true);
  });
});
