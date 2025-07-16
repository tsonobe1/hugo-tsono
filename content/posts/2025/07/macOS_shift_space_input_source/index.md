---
title: "macOSでshift + spaceで入力ソースを切りかえる"
image: "./macOS_shift_space_input_source/macで_~shift_+_space~_のキーボードショートカットを設定できない/2025-07-03_07-07-13_plist.png"
author: "tsonobe"
description: 'macOSでショートカットに"shift + space"を割り当てる方法。'
summary: 'macOSでショートカットに"shift + space"を割り当てる方法。'
date: 2025-07-02T00:00:00+09:00
lastmod: 2025-07-03T08:27:56+09:00
tags: ["ショートカット", "macOS", "入力ソース"]
categories: ["tips"]
draft: false
---

## Summary {#summary}

1.  `open ~/Library/Preferences/com.apple.symbolichotkeys.plist`
2.  `Root` &gt; `AppleSymbolicHotKeys` &gt; `61` &gt; `value` &gt; `parameters`
3.  `item 2` を `131072` に設定する
4.  PCを再起動
5.  `システム設定` -&gt; `キーボード` -&gt; `キーボードショートカット` -&gt; `入力ソース` に `shift + space` が設定されていることを確認
6.  `shift + space` で入力ソースを切り替えられることを確認


## 経緯 {#経緯}

昨年から仕事でWindowsを使うようになり、以前から私物のM1macに接続して愛用していた `Keycron k2(英字キー)` をWindowsにもつなぐようになりました。

英字配列なのでIMEの `日本語⇔英語` 切り替えに設定が必須です。
macOSでの使用時は `control + space` で変換していました（厳密には、 `caps lock` を `control` に置き換えていた）

{{< figure src="/経緯/2025-07-02_22-49-14_mac_key.png" alt="macOSでの切り替え方法" caption="<span class=\"figure-number\">Figure 1: </span>Macでの切り替え方法" title="macOSでの切り替え方法" width="600px" >}}

ところがWindowsだと（経緯は忘れましたが）同様の設定ができず、結局 `shift + space` で運用することとしました。

{{< figure src="/経緯/2025-07-02_22-48-44_win_key.png" alt="Windowsでの切り替え方法" caption="<span class=\"figure-number\">Figure 2: </span>Windowsでの切り替え方法" title="Windowsでの切り替え方法" width="600px" >}}

仕事用PCのほうが高頻度で使用するのでいつの間にか手癖が変わってしまい、macOS使用時に誤って `shift + space` を押してしまうタイプミスが頻発。
作業にならないので、入力ソースを切り替えるためのショートカットを変更しようとしたのですが...


## macで `shift + space` のキーボードショートカットを設定できない {#macで-shift-plus-space-のキーボードショートカットを設定できない}

当方 `macOS 15.5` なのですが、システム設定 → キーボード → キーボードショートカットで `shift + space` が設定できないんですよね
打ち込んでも反応しない。

{{< figure src="/macで_~shift_+_space~_のキーボードショートカットを設定できない/2025-07-03_07-06-30_setting1.png" caption="<span class=\"figure-number\">Figure 3: </span>システム設定 &gt; キーボード &gt; キーボードショートカット" width="600px" >}}

そこで調べていたところ、以下を記事を発見

[macOS 한영전환키를 Shift+Space로 설정하기 (feat. Sonoma)](https://seorenn.tistory.com/547)

やはり `shift + space` は設定できないようですが、解決策が書いてありました。
`com.apple.symbolichotkeys.plist` ファイルの中にある、 `AppleSymbolicHotkeys` のうち

-   60番が `前の入力ソースを選択`
-   61番が `次の入力ソースを選択`

に該当し、Item2の値を `131072` というキーコードに書き換えることで `shift + space` を登録できるようです

{{< figure src="/macで_~shift_+_space~_のキーボードショートカットを設定できない/2025-07-03_07-07-13_plist.png" alt="設定ファイル変更後" caption="<span class=\"figure-number\">Figure 4: </span>com.apple.symbolichotkeys.plist変更後" title="com.apple.symbolichotkeys.plist変更後" width="600px" >}}

試してみたところ、PCを再起動することで入力ソース切り替えのショートカットに `shift + space` が反映されました。

{{< figure src="/疑問/2025-07-03_06-52-27_スクリーンショット 2025-07-03 6.52.13.png" caption="<span class=\"figure-number\">Figure 5: </span>システム設定 &gt; キーボード &gt; キーボードショートカット" title="システム設定 > キーボード > キーボードショートカット" width="600px" >}}

これで、同じ使い心地で日本語と英語を切り替えられて快適です。

元記事でも言及されていますが、なぜショートカットに `shift + space` が登録できないのんでしょうか。
（ほかアプリのショートカットとバッティングする可能性が高いとか？）
今のところ、常駐させているアプリケーション（Emacs, iTerm, Aqua Voice）とは衝突しておらず、問題なく使えています。
