module.exports = {
  // https://github.com/expo/expo/tree/master/packages/eslint-config-universe
  extends: ['universe/native'],
  rules: {
    'func-style': ['error', 'expression'],
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
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies
  },
  overrides: [
    {
      // TypeScript向けに型情報を利用したチェックを設定しています。
      extends: ['universe/shared/typescript-analysis', 'plugin:@typescript-eslint/recommended-requiring-type-checking'],
      files: ['*.ts', '*.tsx', '*.d.ts'],
      parserOptions: {
        project: './tsconfig.json',
      },
      rules: {
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'default',
            format: ['strictCamelCase'],
          },
          {
            selector: 'variable',
            types: ['function'], // 通常の関数とReact Components
            format: ['strictCamelCase', 'StrictPascalCase'],
          },
          {
            selector: 'variable',
            types: ['boolean', 'string', 'number', 'array'],
            format: ['strictCamelCase'],
          },
          {
            selector: 'variable',
            format: ['strictCamelCase', 'StrictPascalCase'],
          },
          {
            selector: 'enumMember',
            format: ['StrictPascalCase'],
          },
          {
            selector: 'memberLike',
            format: ['strictCamelCase'],
          },
          {
            selector: 'typeLike',
            format: ['StrictPascalCase'],
          },
        ],
      },
    },
  ],
};
