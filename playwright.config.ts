import { defineConfig, devices } from '@playwright/test';

import dotenv from 'dotenv';
dotenv.config({ path: 'environment/.env'});


export default defineConfig({
  testMatch: ['**/*.test.ts'],

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 1,
  workers: 4,

  reporter: [["list", { printSteps: true }], ["html"], ["blob"]],
  use: {
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    actionTimeout: 15000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
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
