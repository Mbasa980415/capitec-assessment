import { defineConfig, devices } from '@playwright/test';

import dotenv from 'dotenv';
dotenv.config({ path: 'environment/.env'});


export default defineConfig({
  testMatch: ['**/*.test.ts'],
  testIgnore: ['**/*.js', '**/dist/**', '**/build/**'],

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 1,
  workers: 4,

  reporter: [
    ['list', { printSteps: true }],
    ['html', { outputFolder: 'playwright-report', open: 'on-failure' }],
  ],
  use: {
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    actionTimeout: 15000,
    //headless: false, //Remove comment lines to enable this
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

});
