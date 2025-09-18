import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testMatch: '*.axe.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  workers: 8,
  reporter: [['json', { outputFile: 'accessibility-results.json' }]],
  outputDir: './test-results/output',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'yarn dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
