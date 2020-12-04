# ディレクトリ構成

> **Note**: 整理・お試し期間中

## ディレクトリ構成の方針

画面を構成する要素（React のコンポーネント）については Atomic Design の用語を借りて分類します。また、画面遷移を含むアプリケーションアーキテクチャとしては [VIPER](https://cheesecakelabs.com/blog/ios-project-architecture-using-viper/) をまねた構成としてディレクトリを設計しています。

ユーザインターフェースを構成するこれらの要素に Clean Architecture で定義されるレイヤを加えた、以下のディレクトリを`src`直下のディレクトリとして定義しています。（Clean Architecture についても、依存性のルールなどを厳密に守っているわけではありませんが、用語を借りています）

### `adapter`

REST API や WebSocket などのバックエンドと通信する処理やストレージに格納する処理を格納します。Clean Architecture でいう Interface Adapters レイヤに対応します。

### `component`

複数のスクリーンで利用されるような画面要素を格納します。このディレクトリの下は [`component`内の構成](#component内の構成) にしたがってさらに細分化されます。

### `context`

グローバルに利用するコンテクスト（コンポーネントをまたいで使用する値）を格納します。React のコンテクストがどのようなものかについては [コンテクスト - React](https://ja.reactjs.org/docs/context.html) を参照してください。コンテキストを提供するために必要な初期化処理を含むコンポーネントもこのディレクトリに格納します。

グローバルに利用するコンテクストに関わるカスタムフックもここに格納します。React のフックがどのようなものかについては [フックの導入 - React](https://ja.reactjs.org/docs/hooks-intro.html) を参照してください。

なお、ウィザード内で利用するコンテクストなど、1 つのタブやスタックでのみ使うコンテクストと対応するカスタムフックは`screen`配下に格納してください。

### `helper`

ロガーやフォーマッタ、バリデータなど、汎用的に利用できるヘルパーを格納します。

### `screen`

React のコンポーネント（VIPER の View）と Presenter, Router を格納します。このディレクトリの下は [`screen`内の構成](#screen内の構成) にしたがってさらに細分化されます。

### `usecase`

アプリケーション内で扱う Interactor と Entity を格納します。ここで interactor は Clean Architecture でいう Use Cases レイヤと同様と考えています。また、Entity という用語は、コンポーネント間での Props を利用したデータの受け渡しやコンテクストを利用したデータの共有に利用するデータ構造を指しています。

### ディレクトリ構造

> Note: `App.tsx`以外のすべての JSX を含むファイル（拡張子が`.jsx`または`.tsx`のファイル）は、`component`もしくは`context`配下に格納されることに注意してください。

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

## `component`内の構成

React (React Native)ではコンポーネントとは、React を利用して作られる画面全体あるいは画面を構成する部品のことを指します。

コンポーネントは以下のように分類します。Atomic Design の用語を利用していますが、そのルールに厳密に従うものではありません。

- `atom`
  - PowerPoint などで一つの図形として表現できる要素と、フォーム部品を格納します
- `molecule`
  - スタイルガイドで定義される要素など、`atom`の組み合わせになる要素を格納します
  - 複数の`organism`にあらわれる要素のうち、明確な役割を持つものもここに格納します
- `organism`
  - ページを構成する要素のうち、ある程度大きさの塊を格納します
  - 1 つのページでしか利用されないものは、ページのディレクトリに格納します
  - 複数のページで共有するとき、このディレクトリに移します
- `template`
  - 画面構成のテンプレートを格納します

これらの要素は、例えば色違いを使いたいなどのパターンがあることが想定されるので、`style`として Prop を受け取るように実装して、外部からスタイルの詳細を指定できるようにします。また、スタイルガイドに複数のパターンが定義されている要素については `variant`属性などを用意してスタイルガイドに合わせて色などを切り替えることができるようにします。その場合は、`style`としてすべての属性を受け付けるのではなく、`margin`や`padding`, `fontSize`のみ受け取るようにします。

コンポーネント以外に、スタイルガイドに従った定数などを `_styleguide` に格納しています。

- `_styleguide`
  - スタイルガイドに合わせた色などの定義を格納します
  - `colors.ts`: 色定義
  - `typography.ts`: フォントやフォントサイズ、太字、斜体などの定義
  - `spacing.ts`: `margin`や`padding`の大きさの定義
  - `iconography.ts`: 利用するアイコンの定義
  - `attributes.ts`: 影やグラデーション、ボーダー、角丸などの定義

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

## `screen`内の構成

`screen`内には、アプリで表示するスクリーンに対応する View と Presenter, Router を格納します。スクリーンには URI のパスに相当する一意の識別子を割り当てるものとし、それに対応するパスにファイルを配置します。

画面ごとに、次のファイルを作ります。ページ内で使われる構成要素のある程度の塊を切り出して実装するときには、`organism`ディレクトリに格納します

- `index.ts`: `name` や `component` など、 React Navigation の Screen として利用する Props を定義します
- `presenter.ts`, `Navigator.tsx`, `View.tsx`: それぞれ VIPER の Presenter と Router, View を実装します

Router は React Navigation の Navigator に対応するものとして扱います。

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

## VIPER について

VIPER は、もともと [iOS Project Architecture: Using VIPER](https://cheesecakelabs.com/blog/ios-project-architecture-using-viper/) という記事で iOS アプリ向けのアプリケーションアーキテクチャとして提唱されたものです。VIPER は次にあげる 5 つのステレオタイプの頭文字をとった名前になっています。

- View
- Interactor
- Presenter
- Entity
- Router

基本的な処理の流れは次のようになります。

1. Router が、ある画面を表示したいというリクエストを受け取ります
2. Router は、リクエストに応じて適切な画面を表示するために Presenter のプロトコルを呼び出します
3. Presenter は、 Interactor を利用して画面の表示などに必要な Entity を用意し、 View をレンダリングします
4. View は、ユーザインタラクションを検出したらその処理を Presenter に委譲して応答を待ちます
5. Presenter は、 View から受け取ったユーザインタラクションに応じて適切な処理を行います。必要であれば、処理結果を View に通知します。
   - Interactor でのデータの更新
   - 別画面への遷移を Router に依頼
   - etc.

それぞれの責務は次のように定義されています。

View
: View の唯一の責任は、Presenter が指示したものを表示し、画面とユーザのインタラクションを処理することです。ユーザが処理を必要とするイベントをトリガーすると、View はそれを単に Presenter に委譲し、次に何を表示すべきかを伝える応答を待ちます。

Interactor
: 特定のモジュール内のユースケースの集合体と考えることができます。Interactor は Entity に関連するすべてのビジネスロジックを含み、ユーザーインターフェイス (UI) から完全に独立していなければなりません。例えば、API リクエストを行い、レスポンスを処理し、それらを Entity に変換するのは Interactor の責任になります。Interactor が何らかのタスクの実行を終えると、それは得られた結果を Presenter に通知します。心に留めておくべき重要なことの一つは、Presenter に送られるデータはビジネスロジックを実装してはならないということです。

Presenter
: VIPER モジュールの主要な部分の間の橋渡しのように動作します。一方では、View からの入力イベントを受信し、Interactor にデータを要求することでそれに対応します。もう一方の方法では、Interactor から送られてくるデータ構造を受け取り、このデータに表示用のロジックなどを適用して表示内容を準備し、最終的に何を表示すべきかを View に指示します。

Entity
: 異なるタイプのデータをカプセル化し、通常は他の VIPER コンポーネントの中でペイロードとして扱われます。注意すべき重要なことは、Entity はデータアクセス層とは異なり、Interactor によって処理されるべきであるということです。

Router
: モジュール間のナビゲーションロジックと、それらがどのように行われるべきか（例：画面を提示するためのアニメーションの定義や、2 つの画面間の遷移がどのように行われるべきか）を担当します。どの画面にルーティングすべきかという、Presenter からの入力コマンドを受け取る一方で、画面から他方の画面へのデータの受け渡しも担当します。
