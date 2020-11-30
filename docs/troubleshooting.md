---
title: Troubleshooting
---

## ビルドキャッシュをリセットする

どんな言語やフレームワークで開発していてもそうですが、ドキュメントのとおりにやっているはずなのにビルドに失敗したり、うまくアプリケーションが起動できなかったりすることがあります。

たいていの場合はどこかにタイポがあったりして「あぁ、ミスってた〜」となるのですが、本当にどうにも原因がわからないこともあります。

そういった場合にビルドなどのキャッシュをクリアすると何故かうまく動いてしまうこともあるので、このテンプレートでは React Native で開発しているときに生成されるキャッシュなどをすべて削除するスクリプトを用意しています。

次のコマンドを実行することで、ビルド時に利用されているキャッシュをすべて削除することが出来ます。なお、このコマンドを実行するとすべてのキャッシュが削除されるため、次回のアプリケーションビルドにかなり時間がかかるようになります。

> **Note**: コマンドを実行する前に、Metro サーバを停止してください。また、Android Studio や Xcode なども終了しおくことをおすすめします。

```
npm run reset-cache
```

## Android アプリのビルドで OutOfMemoryError

Android アプリのビルドで OutOfMemoryError が発生したときは、Gradle が立ち上げる JVM のヒープサイズを増やして対応してください。

`android/gradle.properties` の `org.gradle.jvmargsorg.gradle.jvmargs` で設定する `Xmx` や `XX:MaxPermSize` の値を増やすことで解決できるはずです。

## createReleaseExpoManifest でエラーが発生してしまう

Android アプリのビルドの際に、 `:app:createReleaseExpoManifest` で次のようなエラーが発生することがあります。

```
> Task :app:createReleaseExpoManifest FAILED
internal/modules/cjs/loader.js:968
  throw err;
  ^

Error: Cannot find module '/scripts/createManifest.js'
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:965:15)
    at Function.Module._load (internal/modules/cjs/loader.js:841:27)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:71:12)
    at internal/main/run_main_module.js:17:47 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}
```

以下のような Issue が挙げられているのですが、2020-10-16 時点ではまだ解決方法は回答されていません。

- https://github.com/expo/expo/issues/8547
- https://github.com/expo/expo-cli/issues/2232

Issue はクローズされていないのですが、[`node_modules/expo-updates/scripts/create-manifest-android.gradle`](https://github.com/expo/expo/blob/a566b2afecac8b8d922df0046b1eacc16d5757fb/packages/expo-updates/scripts/create-manifest-android.gradle#L13)の、以下の箇所で`expoUpdatesDir`の取得に失敗している可能性があるようです。

```diff
def expoUpdatesDir = ["node", "-e", "console.log(require('path').dirname(require.resolve('expo-updates/package.json')));"].execute([], projectDir).text.trim()
```

上記の箇所を次のように修正して、どのようなエラーが出ているかを確認することで問題の解決につながるかもしれません。（`node_modules`配下のファイルを修正することで確認できますが、`npm clean-install`などを実行すると修正内容は消えてしまうのであくまで一時的な修正として利用してください。）

```groovy
def execute = ["node", "-e", "console.log(require('path').dirname(require.resolve('expo-updates/package.json')));"].execute([], projectDir)
def out = new StringBuffer()
def err = new StringBuffer()
execute.consumeProcessOutput(out, err)
execute.waitFor()
logger.error("stdout: ${out}")
logger.error("stderr: ${err}")
```

ここで、エラーに`unknown command: node. Perhaps you have to reshim?`などのように出力されているようであれば、`node` が見つかっていないと考えられます。環境変数などを確認して、Gradle のプロセスから正しく`node`が利用できるようにする必要があります。

> **Note**: Homebrew で Node.js をインストールしている場合は、`node`コマンドが`/usr/local/bin/node`に存在しているかどうかを確認してください。次のようなケースで問題になることがあります。
>
> - Node.js の LTS をインストールするために`brew install node@14`のようにして Node.js をインストールしている
> - `brew link node@14`は実行せずに、`echo 'export PATH="/usr/local/opt/node@14/bin:$PATH"' >> ~/.zshrc`のようなコマンドを実行して、zsh などから`node`コマンドを使えるようにしている。
>
> この場合、`PATH`環境変数が Gradle のプロセスに引き継がれないなどの問題が発生して、`node`コマンドが見つかっていない可能性があります。どうしてもうまく行かない場合には、 `brew link node@14` を実行して`/usr/local/bin/node`を作成してみてください。一度`brew link node@14`して正常にビルドできるようになった後に`brew unlink node@14`しても失敗しなくなるケースがあるなど、意図したとおりに動作しているのか不安なところもありますが現時点では問題は起きていません。
