//https://vitest.dev/config/
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    css: false,
    setupFiles: 'setupTest.js',
    coverage: {
      provider: 'v8',
      enabled: true,
      reporter: ['html'],
    },
  },
});
