/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  root: '.',
  esbuild: {
    tsconfigRaw: {
      compilerOptions: {
        // Remove invalid types property
      }
    }
  }
}); 