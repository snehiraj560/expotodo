import type { ExpoConfig } from 'expo/config';

const EAS_PROJECT_ID = '829dfb33-c5a4-4b92-bc6c-73b77848c4ba';

const config: ExpoConfig = {
  name: 'expo-app',
  slug: 'expotodo',
  owner: 'pocpractice',
  extra: {
    eas: {
      projectId: EAS_PROJECT_ID,
    },
  },
  version: '1.0.2',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  runtimeVersion: {
    policy: 'fingerprint',
  },
  updates: {
    url: `https://u.expo.dev/${EAS_PROJECT_ID}`,
  },
  ios: {
    bundleIdentifier: 'com.snehi-raj.expotodo',
    supportsTablet: true,
  },
  android: {
    package: 'com.snehi_raj.expotodo',
    adaptiveIcon: {
      backgroundColor: '#E6F4FE',
      foregroundImage: './assets/android-icon-foreground.png',
      backgroundImage: './assets/android-icon-background.png',
      monochromeImage: './assets/android-icon-monochrome.png',
    },
    predictiveBackGestureEnabled: false,
  },
  web: {
    favicon: './assets/favicon.png',
  },
};

export default { expo: config };
