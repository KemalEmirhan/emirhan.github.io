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
    reporters: ['default', 'verbose'],
    include: [
      'src/**/__tests__/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
    ],
    exclude: ['tests/e2e/**/*', 'src/test/**/*'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'json-summary', 'html'],
      reportOnFailure: true,
      skipFull: false,
      enabled: true,
      thresholds: {
        lines: 80,
        branches: 80,
        functions: 80,
        statements: 80,
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
        'styles/',
        'html/',
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
