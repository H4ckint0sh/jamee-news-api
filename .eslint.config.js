import eslint from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  // Base ESLint configuration
  {
    files: ['**/*.{js,cjs,ts,tsx}'], // Apply to js, cjs, ts, and tsx files
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 'latest',
    },
    linterOptions: {
      reportUnusedDisableDirectives: true, // Enable reporting of unused eslint-disable comments
    },
    rules: {
      ...eslint.configs.recommended.rules, // Use the recommended rules from eslint
      'no-console': 'warn',
      'no-debugger': 'warn',
      'no-empty-pattern': 'off',
    },
  },

  // TypeScript specific configuration
  {
    files: ['**/*.{ts,tsx}'],
    parser: tsParser,
    parserOptions: {
      project: ['./tsconfig.json'],
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    extends: ['plugin:@typescript-eslint/recommended'],
    rules: {
      ...tsPlugin.configs.recommended.rules, // Use the recommended rules from @typescript-eslint
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/ban-types': [
        'error',
        {
          types: {
            '{}': {
              message:
                'Use a specific type instead of an empty object, or FindOptions<T> from Sequelize',
              fixWith: 'FindOptions<any>',
            },
            object: {
              message: "Use a specific type instead of 'object'.",
              fixWith: 'Record<string, any>',
            },
          },
        },
      ],
    },
  },

  // Prettier configuration
  {
    files: ['**/*.{js,cjs,ts,tsx,json}'], // Apply to js, ts, and json
    plugins: {
      prettier: prettierPlugin,
    },
    extends: ['plugin:prettier/recommended'], // Use the recommended config
    rules: {
      'prettier/prettier': 'warn', // Use prettier as a rule
    },
    settings: {
      // Add settings
      prettier: {
        endOfLine: 'auto', // Example prettier option
      },
    },
  },
  // Environment settings (Node, ES, Jest) - applied to all files.
  {
    languageOptions: {
      globals: {
        node: true,
        es6: true,
        jest: true,
      },
    },
  },
];
