import path from 'path';
import type { Options } from '@wdio/types';

const APK_PATH =
  process.env.APK_PATH ||
  process.env.E2E_APK_PATH ||
  path.resolve(
    process.cwd(),
    'android/app/build/outputs/apk/debug/app-debug.apk'
  );

export const config: Options.Testrunner = {
  runner: 'local',
  hostname: '127.0.0.1',
  port: 4723,
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      project: './e2e/tsconfig.json',
    },
  },
  specs: [
    path.resolve(process.cwd(), 'e2e/specs/auth.e2e.ts'),
    path.resolve(process.cwd(), 'e2e/specs/notes.e2e.ts'),
  ],
  exclude: [],
  maxInstances: 1,
  capabilities: [
    {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:deviceName': 'Android Emulator',
      'appium:app': APK_PATH,
      'appium:appPackage': 'com.snehi_raj.expotodo',
      'appium:appActivity': '.MainActivity',
      'appium:noReset': false,
      'appium:fullReset': false,
    },
  ],
  logLevel: 'info',
  bail: 0,
  baseUrl: '',
  waitforTimeout: 15000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: [
    [
      'appium',
      {
        args: {
          address: '127.0.0.1',
          port: 4723,
        },
        logPath: './e2e/logs/',
      },
    ],
  ],
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 90000,
  },
};
