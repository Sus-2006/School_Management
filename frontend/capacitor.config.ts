import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.schoolmanagement.app',
  appName: 'School Management',
  webDir: 'dist',
  android: {
    allowMixedContent: false,
  },
};

export default config;
