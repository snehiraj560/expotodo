import path from 'path';
import type { Options } from '@wdio/types';

// Required in CI: set by workflow after uploading APK to BrowserStack (app_url from REST API).
const BROWSERSTACK_APP_ID =
  process.env.BROWSERSTACK_APP_ID || '';

export const config: Options.Testrunner = {
  runner: 'local',
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,
  hostname: 'hub-cloud.browserstack.com',
  port: 443,
  protocol: 'https',
  path: '/wd/hub',
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
      'appium:appPackage': 'com.snehi_raj.expotodo',
      'appium:appActivity': '.MainActivity',
      'appium:automationName': 'UiAutomator2',
      'appium:noReset': false,
      'appium:fullReset': false,
      'bstack:options': {
        deviceName: 'Samsung Galaxy S23',
        platformVersion: '13.0',
        platformName: 'android',
        projectName: 'Expo Todo POC',
        buildName: process.env.GITHUB_RUN_ID
          ? `CI-${process.env.GITHUB_RUN_ID}`
          : 'local-browserstack',
        debug: true,
        networkLogs: true,
      },
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
      'browserstack',
      {
        app: BROWSERSTACK_APP_ID,
        browserstackLocal: false,
        testObservability: true,
        testObservabilityOptions: {
          projectName: 'Expo Todo POC',
          buildName: process.env.GITHUB_RUN_ID
            ? `CI-${process.env.GITHUB_RUN_ID}`
            : 'local-browserstack',
        },
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
