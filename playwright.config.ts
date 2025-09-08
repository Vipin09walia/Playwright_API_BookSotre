import { defineConfig, devices } from '@playwright/test';

const API_BASE_URL = process.env.API_BASE_URL || 'http://127.0.0.1:8000';

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  retries: 1,
  use: {
    baseURL: API_BASE_URL,
    extraHTTPHeaders: {
      'Content-Type': 'application/json'
    }
  },
reporter: [
    ['list'], // shows results in terminal
    ['html', { outputFolder: 'playwright-report', open: 'never' }], // saves report
  ],
});