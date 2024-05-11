/* eslint-disable consistent-return */
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import react from '@vitejs/plugin-react';
import removeAttr from 'remove-attr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint({
      failOnWarning: false,
      failOnError: false,
    }),
    removeAttr({
      extensions: ['jsx'],
      attributes: ['data-testid'],
    }),
  ],
  resolve: {
    alias: {
      '@/src': '/src',
      '@/components': '/src/components',
    },
  },
  server: {
    fs: {
      cachedChecks: false,
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      jsx: 'automatic',
    },
  },
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: '[name]-[hash].js',
        manualChunks: {
          react: ['react', 'react-dom'],
        },
      },
    },
  },
});
