import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  use: {
    headless: false,// Run in non-headless mode for visual debugging
    viewport: { width: 1280, height: 920 }, // Example viewport size
    userAgent: 'MyUserAgentString', // Example user agent
  },
    // Configure the browser to be used (chromium, firefox, webkit)

  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' },
     },
    // {
    //   name: 'Firefox',
    //   use: { browserName: 'firefox' },
    // },
    // {
    //   name: 'WebKit',
    //   use: { browserName: 'webkit' },
    // }
  ],
  // Point to test directory and files
  testDir: './tests',
  // Setup retries for flaky tests
  retries: 0,
  // Timeout settings for each test
  timeout: 30000,
};

export default config;
