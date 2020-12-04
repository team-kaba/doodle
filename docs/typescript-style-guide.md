# TypeScript スタイルガイド

TypeScriptで記述するReact (React Native) などのソースコードのスタイルガイドです。

詳細に定義されたコーディング規約を意識しながらコードを書くのではなく、自動的にコードのスタイルなどをチェックしてくれるツールを活用してください。
このプロジェクトでは、そういった支援をしてくれるツールを導入しています。

## ツールでソースコードのスタイルなどをチェックする

次のコマンドを実行すると、すべてのツールでのチェックが実行されます。

```bash
npm run -s lint
```

また、次のコマンドを実行すると、ツールに定型的な指摘を修正させることができます。なお、自動修正が適用できない違反は通常通りエラーが報告されます。

```bash
npm run -s fix
```

### ESLint

- [ESLint](https://eslint.org/)
  - 設定を変更したい場合は、ESLintやeslint-config-universeのドキュメントを確認して、`.eslintrc.js`を変更してください。
  - 標準的な規約 ([eslint-config-universeの`universe/native`](https://github.com/expo/expo/tree/master/packages/eslint-config-universe))
  - 関数は[アロー関数](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions/Arrow_functions)を使う ([`func-style`](https://eslint.org/docs/rules/func-style), [`react/function-component-definition`](https://github.com/yannickcr/eslint-plugin-react/blob/HEAD/docs/rules/function-component-definition.md))
  - 循環参照を禁止 ([`import/no-cycle`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-cycle.md))
  - 内部モジュールのインポートを禁止（バレルは許可）([`import/no-internal-modules`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-internal-modules.md))
  - `import`の順番を定義 ([`import/order`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md))
  - TypeScriptの型に関する規約([eslint-config-universeの`universe/shared/typescript-analysis`](https://github.com/expo/expo/tree/master/packages/eslint-config-universe), [`@typescript-eslint/recommended-requiring-type-checking`](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#supported-rules))
    <!-- textlint-disable ja-technical-writing/ja-no-weak-phrase -->
    - TypeScriptに慣れていないと、この規約が厳しく感じるかもしれません。実際にコードを書いてみて、対応するのが難しい指摘や効果の薄い指摘は個別にルールを無効化してみてください。
    <!-- textlint-enable ja-technical-writing/ja-no-weak-phrase -->
  - InterfaceとTypeの使い分けに悩むことが多いので、Interfaceを利用できる場合はInterfaceを強制 ([`@typescript-eslint/consistent-type-definitions`](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-definitions.md))
  - 命名規約 ([`@typescript-eslint/naming-convention`](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md))
    - React Component, Enum, Type like: `StrictPascalCase`
    - その他: `strictCamelCase`
  - 型のみを読み込むときは`import type`を強制 ([`@typescript-eslint/consistent-type-imports`](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-imports.md))
  - Reactの[フックのルール](https://ja.reactjs.org/docs/hooks-rules.html) ([`plugin:react-hooks/recommended`](https://github.com/facebook/react/tree/master/packages/eslint-plugin-react-hooks))
  - ReactのFunction Componentの定義にはアロー関数を強制 ([`react/function-component-definition`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/function-component-definition.md))
- [EditorConfig](https://editorconfig.org/)
  - 一般的と考えている設定をしています。内容については`.eslintconfig`内のコメントを確認してください。
- [Prettier](https://prettier.io/)
  - `npx react-native init`で生成されるものと同じ設定をしています。内容については`.prettierrc.js`内のコメントを確認してください。
  - EditorConfigの設定も読み込むので、重複する内容を設定する必要はありません。[読み込まれる EditorConfig の設定値](https://prettier.io/docs/en/api.html#prettierresolveconfigfilepath--options)は次のものです。
    - `end_of_line`
    - `indent_style`
    - `indent_size`, `tab_width`
    - `max_line_length`

ESLintでのチェックを実行するには、次のコマンドを実行してください。

```bash
npm run -s lint:es
```

定型的な修正はツールが自動的に変更を加えてくれます。自動的に修正したい場合は、次のコマンドを実行してください。すべての違反を修正してくれるわけではありませんが、非常に便利なのでぜひ活用してください。

```bash
npm run -s fix:es
```

### TypeScript コンパイラ

[TypeScript](https://www.typescriptlang.org/)のコンパイラには、コーディング規約をチェックする機能があります。たとえば、型情報が適切に設定されているかどうかや、import/exportの構文が規約どおりになっているかなどをチェックできます。

テンプレートでは、React Native (Expo) での標準的な内容を設定してあります。設定値の詳細については、`tsconfig.json`と[TSConfig Reference](https://www.typescriptlang.org/tsconfig/)を参照してください。

TypeScriptコンパイラでの規約チェックを実行するには、次のコマンドを実行してください。

```bash
npm run -s lint:tsc
```

### IDE と連携する

Visual Studio Codeなど大体のIDEには、エディタ上にESLintの実行結果を表示するプラグインがあるので、是非活用してください。インストール方法などは、プラグインのページを参照してください。

- Visual Studio Code: [ESLint - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- IntelliJ IDEA, AppCode: [ESLint - 公式ヘルプ | IntelliJ IDEA](https://pleiades.io/help/idea/eslint.html)（デフォルトで利用可能）

## 基本的なルール

ツールではチェックできていないルールや、ツールでの指摘だけではどう修正すればよいのか分かりづらいルールについて説明しておきます。

### モジュールとバレル

関数や定数、クラスなどをまとめるためにTypeScriptのモジュールという仕組みを利用します（名前空間は利用しません）。

モジュールはファイル単位で定義され、モジュール名はファイル名となります。ただし `index.ts` は例外的に扱われ、ディレクトリ名がモジュール名になります。

`index.ts` で定義される、ディレクトリ名がモジュール名となるモジュールを特別に「[バレル](https://typescript-jp.gitbook.io/deep-dive/main-1/barrel)」と呼ぶようです。

モジュールを参照するときは、`import` を利用します。参照元モジュール同じバレルに含まれる（同じディレクトリにある）モジュールを参照するときは、 `./Text` のように相対パスでモジュール自体を参照します。別のバレルにあるモジュールを参照するときは、 `@app/component/atom` のように絶対パスでバレルを参照します。配下のディレクトリに含まれる `index.ts` は別のバレルとして扱うことに注意してください。([`import/no-internal-modules`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-internal-modules.md), [`import/no-cycle`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-cycle.md))

| 参照先モジュール | 参照パス | 参照先         |
| ---------------- | -------- | -------------- |
| 同じバレル       | 相対パス | 個別モジュール |
| 別のバレル       | 絶対パス | バレル         |

### モジュールのファイル名

Reactのコンポーネントは、基本的に1モジュールから1コンポーネントをエクスポートします。そのため、ファイル名は `<ExportedComponentName>.tsx` としてください。

それ以外のモジュールについては、1つのモジュールからエクスポートする関数やクラスは1つにします。それに付随する型定義は複数エクスポートしても問題ありません。ファイル名は`<functionName>.ts`もしくは`<ClassName>.ts`としてください。

### キャメルケースの定義

[Google JavaScript Style Guide のキャメルケースの定義](https://google.github.io/styleguide/jsguide.html#naming-camel-case-defined)と同じように、次のルールに従って単語を結合してキャメルケースの識別子を作ります。

1. 単語をASCII文字に変換して、アポストロフィなどを除去します。例えば、"Müller’s algorithm" は “Muellers algorithm”になります。
2. スペースや句読点などの記号で分割します。慣習的にキャメルケースで利用される単語も分割します（例："AdWords" → "Ad Words"）。ただし、大文字と小文字が混在していても、一単語として扱うべきものついては分割しません（例："iOS" は分割しません）。
3. 頭文字を含めてすべてを一度小文字にします。その後、単語の最初の文字を大文字にします。
   - camelCase: 最初の単語を除いたすべての単語の最初の文字を大文字にします。
   - PascalCase: すべての単語の最初の文字を大文字にします。
4. すべての単語を一個の識別子として結合して出来上がりです。

| 原型                  | 正しい変換例      | 誤った変換例      |
| --------------------- | ----------------- | ----------------- |
| XML HTTP request      | XmlHttpRequest    | XMLHTTPRequest    |
| new customer ID       | newCustomerId     | newCustomerID     |
| inner stopwatch       | innerStopwatch    | innerStopWatch    |
| supports IPv6 on iOS  | supportsIpv6OnIos | supportsIPv6OnIOS |
| YouTube importer      | YouTubeImporter   | YoutubeImporter   |

### 関数

関数は、関数宣言ではなくアロー関数を利用して定数として定義します。([`func-style`](https://eslint.org/docs/rules/func-style))

ただし、Reactのドキュメントの「[レンダー内でアロー関数を使用する](https://ja.reactjs.org/docs/faq-functions.html#arrow-function-in-render)」では、不用意にアロー関数を利用した場合のパフォーマンス影響について記載されています。

パフォーマンス影響を避けるために、アロー関数はReactコンポーネント内ではなく、外で定義するようにしてください。

```typescript jsx
// ダメな例
const BadExample = () => {
  const onPress = (e: GestureResponderEvent) => {};
  return <Button onPress={onPress} />;
};

// よい例
const onPress = (e: GestureResponderEvent) => {};
const GoodExample = () => {
  return <Button onPress={onPress} />;
};
```

### `null` と `undefined`

`undefined`もしくは`null`のどちらでも利用できる場合は、**undefinedを利用してください。**
