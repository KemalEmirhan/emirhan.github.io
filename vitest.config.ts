import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    reporters: ['html'],
    include: [
      'src/**/__tests__/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
    ],
    exclude: ['tests/e2e/**/*', 'src/test/**/*'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'json-summary', 'html'],
      thresholds: {
        lines: 60,
        branches: 60,
        functions: 60,
        statements: 60,
      },
      exclude: [
        'node_modules/',
        'src/test/',
        'tests/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/coverage/**',
        '**/dist/**',
        '**/.next/**',
        '**/build/**',
        '**/.next/**',
        'app/',
        'schemas/',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
      '@/constants': path.resolve(__dirname, './src/constants'),
      '@/schemas': path.resolve(__dirname, './src/schemas'),
      '@style': path.resolve(__dirname, './styles'),
    },
  },
});
