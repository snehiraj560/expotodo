# Appium Test Suite — Integration Guide

Appium E2E tests are integrated into this Expo React Native (CNG, Dev Client) app. Tests run against the built Android APK using WebdriverIO + Appium.

---

## Quick Start

```bash
# 1. Create a test user in Firebase Auth (Email/Password)
# 2. Set env vars (optional; defaults: test@example.com / 123456)
export E2E_TEST_EMAIL=test@example.com
export E2E_TEST_PASSWORD=123456

# 3. Get APK (EAS build or local) and set path
export APK_PATH=/path/to/your.apk

# 4. Start Android emulator, then run tests
npm run e2e
```

---

## Project Structure

```
e2e/
├── specs/
│   ├── auth.e2e.ts       # Login, Sign Up flows
│   └── notes.e2e.ts      # Add note, Home screen
├── helpers/
│   └── locators.ts       # Centralized testID locators
├── wdio.conf.ts          # WebdriverIO + Appium config
└── tsconfig.json         # TypeScript for e2e
```

---

## Prerequisites

| Requirement | Purpose |
|-------------|---------|
| Node.js 18+ | Run WebdriverIO |
| Java JDK 17 | Appium/Android |
| Android SDK | Emulator, adb |
| Android Emulator | Run the app |
| EAS CLI (optional) | Download APK from EAS |

---

## NPM Scripts

| Script | Purpose |
|--------|---------|
| `npm run e2e` | Run all E2E specs |
| `npm run e2e:auth` | Run auth specs only |
| `npm run e2e:notes` | Run notes specs only |

---

## Getting the APK

**IMPORTANT – Dev client vs standalone:**  
The local `npx expo run:android` build is a **dev client** that loads JS from Metro. Without Metro running, the app shows the Expo dev client UI (e.g. “Connect to dev server”), not your app. **For E2E you must either run Metro or use a standalone build.**

### Option A: EAS Preview Build (recommended for E2E)

Bundles the app JS into the APK, no Metro required:

```bash
npx eas build --profile preview --platform android
```

Download APK from [expo.dev](https://expo.dev) → Project → Builds, then:

```bash
APK_PATH=/path/to/downloaded.apk npm run e2e
```

### Option B: Local build with Metro running

1. Start Metro: `npm start` (or `npx expo start`)
2. In another terminal: `npm run prebuild:clean` then `npx expo run:android`
3. Let the app load in the emulator (Metro must stay running)
4. Run tests: `npm run e2e`

APK path: `android/app/build/outputs/apk/debug/app-debug.apk`

### Option C: EAS Development Build

```bash
npm run build:android:development
```

Same as Option B: this dev client also needs Metro to load your app.

---

## Running Tests

```bash
# APK from local build (default path)
npm run e2e

# APK from custom path
APK_PATH=/path/to/app.apk npm run e2e

# With test user credentials
E2E_TEST_EMAIL=test@example.com E2E_TEST_PASSWORD=123456 APK_PATH=./app.apk npm run e2e
```

---

## Test User

1. Create an Email/Password user in Firebase Console (Authentication).
2. Set `E2E_TEST_EMAIL` and `E2E_TEST_PASSWORD` in `.env` or export them.
3. Default: `test@example.com` / `123456` (create this user if using defaults).

---

## Configuration

- **App package**: `com.snehi_raj.expotodo`
- **Config file**: `e2e/wdio.conf.ts`
- **Locators**: `e2e/helpers/locators.ts` (uses React Native `testID`)

---

## Available testIDs

| Screen | testID |
|--------|--------|
| Login | `login-email-input`, `login-password-input`, `login-button`, `signup-nav-button` |
| SignUp | `signup-email-input`, `signup-password-input`, `signup-confirm-password-input`, `signup-button`, `login-nav-button` |
| Home | `home-title`, `add-note-button`, `home-user-email`, `signout-button` |
| Add Note Modal | `add-note-name-input`, `add-note-description-input`, `add-note-save-button` |
| Notes List | `notes-empty-text`, `notes-list`, `note-item-{id}` |

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Element not found | Increase timeout; verify testID in app |
| INSTALL_FAILED_UPDATE_INCOMPATIBLE | Uninstall existing app (signing mismatch) |
| Appium driver missing | `npx appium driver install uiautomator2` |
| Wrong appActivity | Check with `aapt dump badging app.apk \| grep activity` |

---

## CI Integration

For GitHub Actions, add a workflow that:

1. Runs EAS build (Android)
2. Downloads APK artifact
3. Starts Android emulator
4. Installs APK
5. Runs `npm run e2e`

Requires `EXPO_TOKEN` in GitHub Secrets.
