# アイコン

## アプリで使用しているパッケージ

React Native Elementsのテーマに合わせてアイコンを表示してくれる[React Native Elements の Icon](https://reactnativeelements.com/docs/icon/)（[使用可能アイコン一覧](https://oblador.github.io/react-native-vector-icons/)）を使用します。Expoに含まれる[@expo/vector-icons](https://docs.expo.io/guides/icons/)を内部的に利用しています。

## React Native Elements の依存パッケージ

`npm install`などを実行すると次のような警告が表示されます。が、[React Native Elements の Getting Started](https://reactnativeelements.com/docs/)にあるとおり、依存パッケージに`@expo/vector-icons`が含まれているので無視して問題ありません。

> npm WARN react-native-elements@2.3.2 requires a peer of react-native-vector-icons@>6.6.0 but none is installed. You must install peer dependencies yourself.
