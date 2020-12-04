# アイコン

## アプリで使用しているパッケージ

Expo には[@expo/vector-icons](https://docs.expo.io/guides/icons/)がデフォルトで入っていますが、 React Native Elements のテーマに合わせてアイコンを表示してくれる[React Native Elements の Icon](https://reactnativeelements.com/docs/icon/)（（[使用可能アイコン一覧](https://oblador.github.io/react-native-vector-icons/)））を使用します。

## React Native Elements の依存パッケージ

`npm clean-install`などを実行すると、次のような警告が表示されますが、[React Native Elements の Getting Started](https://reactnativeelements.com/docs)にあるとおり、依存パッケージに`@expo/vector-icons`が含まれているので無視して問題ありません。

> npm WARN react-native-elements@2.3.2 requires a peer of react-native-vector-icons@>6.6.0 but none is installed. You must install peer dependencies yourself.
