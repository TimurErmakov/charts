module.exports = {
  parser: 'babel-eslint',
    extends: [
      'airbnb-typescript',
      'airbnb/hooks',
      'plugin:@typescript-eslint/recommended',
      'plugin:jest/recommended',
      'prettier',
      'prettier/react',
      'prettier/@typescript-eslint',
      'plugin:prettier/recommended'
    ],
    plugins: ['react', '@typescript-eslint', 'jest'],
    env: {
      browser: true,
      es6: true,
      jest: true,
    },
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2018,
      sourceType: 'module',
      project: './tsconfig.json',
    },
    overrides: [
      {
        files: ['**/*.ts?(x)'],
        parser: '@typescript-eslint/parser',
        plugins: ['@typescript-eslint'],
      }
    ],
    rules: {
      'linebreak-style': 'off',
      'react/prop-types': 'off',
      'react/jsx-props-no-spreading': 'off',
      'no-non-null-assertion': 'off',
      'consistent-return': 'off',
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
      'import/prefer-default-export': 'off',
    },
  };