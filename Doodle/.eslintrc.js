module.exports = {
  // https://github.com/expo/expo/tree/master/packages/eslint-config-universe
  extends: ['universe/native', 'plugin:react-hooks/recommended'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      // TypeScriptのpathsを使ってimportしているモジュールを解決するために設定しています。
      // eslint-import-resolver-typescript を利用しています。
      // https://github.com/alexgorbatchev/eslint-import-resolver-typescript
      typescript: {},
    },
  },
  rules: {
    'func-style': ['error', 'expression'],
    'import/no-cycle': 'error',
    'import/no-internal-modules': [
      'error',
      {
        // no-internal-modulesは参照先の階層数だけで判断しているので、自分たちで作成したモジュールについて正しく判断できません。
        // 例えば、':component/atom' は正しい参照方法ですが、エラーとして報告されてしまいます。
        // これを避けるために、任意のBarrelからのimportを許可しています。
        allow: ['**/index.{js,jsx,ts,tsx}'],
      },
    ],
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
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface'], // Prefer interface if both of interface and type are available
        '@typescript-eslint/consistent-type-imports': ['error', {prefer: 'type-imports'}],
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'default',
            format: ['strictCamelCase'],
          },
          {
            selector: 'variable',
            types: ['function'],
            // 通常の関数もReact Componentもtypeはfunctionとなるので、strictCamelCaseとStrictPascalCaseの両方を許可しています
            format: ['strictCamelCase', 'StrictPascalCase'],
          },
          {
            // Allow 'Nominal Typing'
            // https://typescript-jp.gitbook.io/deep-dive/main-1/nominaltyping
            selector: 'memberLike',
            filter: {
              regex: '^_(brand|.*Brand)$',
              match: true,
            },
            format: ['strictCamelCase'],
            leadingUnderscore: 'allow',
          },
          {
            selector: 'enumMember',
            format: ['StrictPascalCase'],
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
