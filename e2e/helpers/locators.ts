/**
 * Centralized locators for E2E tests.
 * Android: testID maps to resource-id; use UiSelector for reliable lookup.
 * ~accessibilityId fails for RN views; resourceIdMatches catches any id format.
 */
const byResourceId = (id: string) =>
  `android=new UiSelector().resourceIdMatches(".*${id}")`;

export const Locators = {
  // Auth - Login
  loginEmailInput: byResourceId('login-email-input'),
  loginPasswordInput: byResourceId('login-password-input'),
  loginButton: byResourceId('login-button'),
  signupNavButton: byResourceId('signup-nav-button'),

  // Auth - Sign Up
  signupEmailInput: byResourceId('signup-email-input'),
  signupPasswordInput: byResourceId('signup-password-input'),
  signupConfirmPasswordInput: byResourceId('signup-confirm-password-input'),
  signupButton: byResourceId('signup-button'),
  loginNavButton: byResourceId('login-nav-button'),

  // Home
  homeTitle: byResourceId('home-title'),
  addNoteButton: byResourceId('add-note-button'),
  homeUserEmail: byResourceId('home-user-email'),
  signoutButton: byResourceId('signout-button'),

  // Add Note Modal
  addNoteNameInput: byResourceId('add-note-name-input'),
  addNoteDescriptionInput: byResourceId('add-note-description-input'),
  addNoteSaveButton: byResourceId('add-note-save-button'),

  // Notes List
  notesEmptyText: byResourceId('notes-empty-text'),
  notesList: byResourceId('notes-list'),
  noteItem: (id: string) => byResourceId(`note-item-${id}`),
} as const;
