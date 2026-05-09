import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';
import { globalIgnores } from 'eslint/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  // Must survive FlatCompat + next/typescript — plain `ignores` alone was linting `.next` (generated `require()`).
  globalIgnores([
    '**/.next/**',
    '**/node_modules/**',
    '**/out/**',
    '**/build/**',
    'next-env.d.ts',
    '*.tsbuildinfo',
  ]),
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    files: ['**/*.cjs'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
];

export default eslintConfig;
