// https://vitest.dev/config/
import { defineConfig } from 'vitest/config';
import eslint from 'vite-plugin-eslint';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    eslint({
      failOnWarning: false,
      failOnError: false,
    }),
  ],
  resolve: {
    alias: {
      '@/src': '/src',
      '@/components': '/src/components',
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      jsx: 'automatic',
    },
  },
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
    deps: {
      inline: ['vitest-canvas-mock'],
    },
  },
});
