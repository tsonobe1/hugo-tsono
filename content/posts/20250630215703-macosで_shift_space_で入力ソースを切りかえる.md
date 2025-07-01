+++
title = "macOSで'shift + space'で入力ソースを切りかえる"
author = ["tsonobe"]
date = 2025-06-30
draft = false
+++

## Summary {#summary}

1.  `open ~/Library/Preferences/com.apple.symbolichotkeys.plist`
2.  `Root` &gt; `AppleSymbolicHotKeys` &gt; `61` &gt; `value` &gt; `parameters`
3.  `item 2` を `131072` に設定する
4.  PCを再起動
5.  `システム設定` -&gt; `キーボード` -&gt; `キーボードショートカット` -&gt; `入力ソース` に `⇧ Space` が設定されていることを確認
6.  `shift + space` で入力ソースを切り替えられることを確認


## 経緯 {#経緯}

昨年から仕事でwindowsを使うようになり、以前から私物のM1macに接続して愛用していた `Keycron k2(英字キー)` をWindowsにもつなぐようになりました。

英字配列なのでIMEの `日本語⇔英語` 切り替えに設定が必須です。
macOSでの使用時は `control + space` で変換していました。

ところがWindowsだと（経緯は忘れましたが）同様の設定ができず、結局 `shift + space` で運用することとしました。

</Users/tsonobe/Downloads/IMG_5459.heic>

しかし仕事用PCのほうが高頻度で使用するためいつの間にか手癖が変わってしまい、macOS使用時も誤って `shift + space` を押してしまうタイプミスが頻発。かなり困っていました。


## macで `shift + space` のキーボードショートカットを設定できない {#macで-shift-plus-space-のキーボードショートカットを設定できない}

しかし、当方 `macOS 15.5` なのですが、キーボードショートカットに `shift + space` が設定できないんですよね
打ち込んでもクリアされてしまう。

そこで調べていたところ、以下を記事を発見

<https://seorenn.tistory.com/547>

`com.apple.symbolichotkeys.plist` ファイルの中にある、
`AppleSymbolicHotkeys` のうち
60番が `前の入力ソースを選択`
61番が `次の入力ソースを選択`
に該当し、Item2の値を `131072` というキーコードに書き換えることで `shift + space` を登録できるようです

実際に試してみたところ、無事 `shift + space` で入力ソースの切り替えができるようになりました。
これで、同じ使い心地で日本語と英語を切り替えられて快適です。


## 疑問 {#疑問}

なお、 `shift + space` のキーコードを[Key Codes](https://apps.apple.com/jp/app/key-codes/id414568915?mt=12)から確認してみたとこと

ここに画像

なぜ `NX_SHIFTMASK` の `131072` を指定すれば、 `shift + space` で動くんだろう...
macOSにおけるキーコードや修飾フラグの仕組みを理解する必要がありそう

また、そもそもシステム設定のショートカットにおいて `shift + space` が登録できない理由も気になります。
（ほかアプリのショートカットとバッティングする可能性が高いとか？）
