module.exports = {
  // https://github.com/expo/expo/tree/master/packages/eslint-config-universe
  // React Native向けのチェックと、TypeScriptの型情報を利用したチェックを設定しています。
  extends: ['universe/native', 'universe/shared/typescript-analysis'],
  rules: {
    'import/order': [
      'warn',
      {
        groups: [['builtin', 'external'], 'internal', ['parent', 'index', 'sibling']],
        'newlines-between': 'always',
        pathGroups: [{pattern: '@app/**', group: 'internal', position: 'after'}],
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: {
          order: 'asc',
        },
      },
    ],
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies
  },
  overrides: [
    {
      extends: ['plugin:@typescript-eslint/recommended-requiring-type-checking'],
      files: ['*.ts', '*.tsx', '*.d.ts'],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
};
