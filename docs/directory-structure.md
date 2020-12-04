# ディレクトリ構成

> **Note**: 整理・お試し期間中

## ディレクトリ構成の方針

画面を構成する要素（Reactのコンポーネント）についてはAtomic Designの用語を借りて分類します。また、画面遷移を含むアプリケーションアーキテクチャとしては [VIPER](https://cheesecakelabs.com/blog/ios-project-architecture-using-viper/) をまねた構成としてディレクトリを設計しています。

ユーザインタフェースを構成するこれらの要素にClean Architectureで定義されるレイヤを加えた、以下のディレクトリを`src`直下のディレクトリとして定義しています。Clean Architectureについても、依存性のルールなどを厳密に守っているわけではありませんが、用語を借りています。

### `adapter`

REST APIやWebSocketなどのバックエンドと通信する処理やストレージに格納する処理を格納します。Clean ArchitectureでいうInterface Adaptersレイヤに対応します。

### `component`

複数のスクリーンで利用されるような画面要素を格納します。このディレクトリの下は [`component`内の構成](#component内の構成) にしたがってさらに細分化されます。

### `context`

グローバルに利用するコンテキスト（コンポーネントをまたいで使用する値）を格納します。Reactのコンテキストがどのようなものかについては [コンテクスト - React](https://ja.reactjs.org/docs/context.html) を参照してください。コンテキストを提供するために必要な初期化処理を含むコンポーネントもこのディレクトリに格納します。

コンテキストに関わるカスタムフックもここに格納します。Reactのフックがどのようなものかについては [フックの導入 - React](https://ja.reactjs.org/docs/hooks-intro.html) を参照してください。

なお、ウィザード内で利用するコンテキストなど、1つのタブやスタックでのみ使うコンテキストと対応するカスタムフックは`screen`配下に格納してください。

### `helper`

ロガーやフォーマッタ、バリデータなど、汎用的に利用できるヘルパーを格納します。

### `screen`

Reactのコンポーネント（VIPERのView）とPresenter, Routerを格納します。このディレクトリの下は [`screen`内の構成](#screen内の構成) にしたがってさらに細分化されます。

### `usecase`

アプリケーション内で扱うInteractorとエンティティを格納します。ここでinteractorはClean ArchitectureでいうUse Casesレイヤと同様と考えています。また、エンティティという用語は、コンポーネント間でのPropsを利用したデータの受け渡しやコンテキストを利用したデータの共有に利用するデータ構造を指しています。

### ディレクトリ構造

> Note: `App.tsx`以外のすべての JSX を含むファイル（拡張子が`.jsx`または`.tsx`のファイル）は、`component`もしくは`context`配下に格納されることに注意してください。

<!-- markdownlint-disable fenced-code-language -->
```
src/
  ├─ adapter/
  │  ├─ api/
  │  ├─ storage/
  │  ├─ third-party-api/
  │  └─ ...
  ├─ component/
  │  ├─ atom/
  │  ├─ molecule/
  │  ├─ organism/
  │  ├─ template/
  │  └─ theme/
  ├─ context/
  │  ├─ account/
  │  └─ ...
  ├─ helper/
  │  ├─ formatter/
  │  ├─ logger/
  │  ├─ validator/
  │  └─ ...
  │─ screen/
  │  ├─ home/
  │  │  ├─ index.ts
  │  │  ├─ presenter.ts
  │  │  └─ View.tsx
  │  ├─ wizard1/
  │  │  ├─ input/
  │  │  ├─ confirm/
  │  │  ├─ complete/
  │  │  ├─ InputForm.tsx
  │  │  └─ Navigator.tsx
  │  ├─ ...
  │  └─ MainNavigator.tsx
  ├─ usecase/
  │  ├─ _entity/
  │  ├─ login/
  │  └─ ...
  └─ App.tsx
```
<!-- markdownlint-restore -->

## `component`内の構成

React (React Native)ではコンポーネントとは、Reactを利用して作られる画面全体あるいは画面を構成する部品のことを指します。

コンポーネントは以下のように分類します。Atomic Designの用語を利用していますが、そのルールに厳密に従うものではありません。

- `atom`
  - PowerPointなどで1つの図形として表現できる要素と、フォーム部品を格納します
- `molecule`
  - スタイルガイドで定義される要素など、`atom`の組み合わせになる要素を格納します
  - 複数の`organism`にあらわれる要素のうち、明確な役割を持つものもここに格納します
- `organism`
  - ページを構成する要素のうち、ある程度大きさの塊を格納します
  - 1つのページでしか利用されないものは、ページのディレクトリに格納します
  - 複数のページで共有するとき、このディレクトリに移します
- `template`
  - 画面構成のテンプレートを格納します

これらの要素は、例えば色違いを使いたいなどのパターンが想定されるので、`style`としてPropを受け取るように実装して、外部からスタイルの詳細を指定できるようにします。また、スタイルガイドに複数のパターンが定義されている要素については `variant`属性などを用意してスタイルガイドに合わせて色などを切り替えることができるようにします。その場合は、`style`としてすべての属性を受け付けるのではなく、`margin`や`padding`, `fontSize`のみ受け取るようにします。

コンポーネント以外に、スタイルガイドに従った定数などを `_styleguide` に格納しています。

- `_styleguide`
  - スタイルガイドに合わせた色などの定義を格納します
  - `colors.ts`: 色定義
  - `typography.ts`: フォントやフォントサイズ、太字、斜体などの定義
  - `spacing.ts`: `margin`や`padding`の大きさの定義
  - `iconography.ts`: 利用するアイコンの定義
  - `attributes.ts`: 影やグラデーション、ボーダー、角丸などの定義

<!-- markdownlint-disable fenced-code-language -->
```
component/
  ├─ _styleguide/
  │   ├─ attributes.ts
  │   ├─ colors.ts
  │   ├─ iconography.ts
  │   ├─ spacing.ts
  │   └─ typography.ts
  ├─ _theme/
  ├─ atom/
  ├─ molecule/
  ├─ organism/
  └─ template/
```
<!-- markdownlint-restore -->

## `screen`内の構成

`screen`内には、アプリで表示するスクリーンに対応するViewとPresenter, Routerを格納します。スクリーンにはURIのパスに相当する一意の識別子を割り当てるものとし、対応するパスにファイルを配置します。

画面ごとに、次のファイルを作ります。ページ内で使われる構成要素のある程度の塊を切り出して実装するときには、`organism`ディレクトリに格納します。

- `index.ts`: `name` や `component` など、 React NavigationのScreenとして利用するPropsを定義します
- `presenter.ts`, `Navigator.tsx`, `View.tsx`: それぞれVIPERのPresenterとRouter, Viewを実装します

RouterはReact NavigationのNavigatorに対応するものとして扱います。

<!-- markdownlint-disable fenced-code-language -->
```
screen/
  ├─ screen1/
  │  ├─ organism/
  │  ├─ index.ts
  │  ├─ presenter.ts
  │  └─ View.tsx
  ├─ wizard1/
  │  ├─ input1/
  │  ├─ input2/
  │  ├─ confirm/
  │  ├─ complete/
  │  ├─ InputContext.tsx
  │  │  ├─ WithInputContext
  │  │  └─ useInputContext
  │  └─ Navigator.tsx
  └─ MainNavigator.tsx
```
<!-- markdownlint-restore -->

## VIPER について

VIPERは、もともと [iOS Project Architecture: Using VIPER](https://cheesecakelabs.com/blog/ios-project-architecture-using-viper/) という記事でiOSアプリ向けのアプリケーションアーキテクチャとして提唱されたものです。VIPERは次にあげる5つのステレオタイプの頭文字をとった名前になっています。

- View
- Interactor
- Presenter
- エンティティ
- Router

基本的な処理の流れは次のようになります。

1. Routerが、ある画面を表示したいというリクエストを受け取ります
2. Routerは、リクエストに応じて適切な画面を表示するためにPresenterのプロトコルを呼び出します
3. Presenterは、 Interactorを利用して画面の表示などに必要なエンティティを用意し、 Viewをレンダリングします
4. Viewは、ユーザインタラクションを検出したらその処理をPresenterに委譲して応答を待ちます
5. Presenterは、 Viewから受け取ったユーザインタラクションに応じて適切な処理を行います。必要であれば、処理結果をViewに通知します。
   - Interactorでのデータの更新
   - 別画面への遷移をRouterに依頼
   - etc.

それぞれの責務は次のように定義されています。

View
: Viewの唯一の責任は、Presenterが指示したものを表示し、画面とユーザのインタラクションを処理することです。ユーザが処理を必要とするイベントをトリガーすると、Viewはそれを単にPresenterに委譲し、次に何を表示すべきかを伝える応答を待ちます。

Interactor
: 特定のモジュール内のユースケースの集合体と考えることができます。Interactorはエンティティに関連するすべてのビジネスロジックを含み、ユーザーインタフェース (UI) から完全に独立していなければなりません。例えば、APIリクエストを行い、レスポンスを処理し、それらをエンティティに変換するのはInteractorの責任になります。Interactorが何らかのタスクの実行を終えると、それは得られた結果をPresenterに通知します。心に留めておくべき重要なことの1つは、Presenterに送られるデータはビジネスロジックを実装してはならないということです。

Presenter
: VIPERモジュールの主要な部分の間の橋渡しのように動作します。一方では、Viewからの入力イベントを受信し、Interactorにデータを要求することでそれに対応します。逆に、Interactorから送られてくるデータ構造を受け取り、このデータに表示用のロジックなどを適用して表示内容を準備して最終的に何を表示すべきかをViewに指示します。

エンティティ
: 異なるタイプのデータをカプセル化し、通常は他のVIPERコンポーネントの中でペイロードとして扱われます。注意すべき重要なことは、エンティティはデータアクセス層とは異なり、Interactorによって処理されるべきであるということです。

Router
: モジュール間のナビゲーションロジックと、それらがどのように行われるべきか（例：画面を提示するためのアニメーションの定義や、2つの画面間の遷移がどのように行われるべきか）を担当します。どの画面にルーティングすべきかという、Presenterからの入力コマンドを受け取る一方で、画面から他方の画面へのデータの受け渡しも担当します。
