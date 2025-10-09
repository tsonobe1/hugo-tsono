---
title: "target='_blank'なリンクが開かない"
author: ["tsonobe"]
description: "このブログでは、外部リンクに `target=\"_blank\"` を付けることで、デフォルトで新しいタブを開くようにしています。ところが、本番環境に記事を公開して閲覧していたところ、外部リンクが正しく開かない現象に遭遇しました。"
date: 2025-08-24T00:00:00+09:00
lastmod: 2025-09-15T20:24:23+09:00
tags: ["Disqus", "target_blank", "noopener", "noreferrer", "アフィリエイトリンク", "外部リンク", "Chrome", "Safari", "Hugo"]
categories: ["トラブルシューティング"]
draft: false
mermaid: false
---

## 結論 {#結論}

-   Disqusの ****Affiliate link**** のチェックを外す
-   外部リンクを新規タブで開きたい場合、aタグに **noreferrer** や **noopener**  属性を付ける必要はない


## 経緯: target="_blank" のリンクが開かない {#経緯-target-blank-のリンクが開かない}

このブログでは、外部リンクに `target="_blank"` を付けることで、デフォルトで新しいタブを開くようにしています。

ところが、本番環境に記事を公開して閲覧していたところ、外部リンクが正しく開かない現象に遭遇しました。具体的には、Google Chrome ではアドレスバーに `about:blank` と表示され、新規タブで真っ白なページが開いてしまします。Safari では、アドレスバーに遷移元のURLが表示され、新規タブで真っ白なページが表示されます。

さらに奇妙なのは、この挙動が一定ではない点です。例えば「1回目は正しくリンク先が開くのに、2回目以降は真っ白なタブになってしまう」場合もあれば、「最初のクリックから真っ白なタブが開く」場合もあります。

さらにさらに、新規タブを開くを押下 or Command + クリックすると正常に開きます。

まとめると👇️

-   `target="_blank"` なリンクをクリックすると、真っ白なページが開く
-   新規タブのアドレスバーの値がブラウザによって異なる
-   真っ白なタブが開くタイミングにばらつきがある
-   `新しいタブで開く` は問題ない

です。
なんだこれ...原因が知りたい...


## 原因 {#原因}

クリックイベントを補足しているJavaScriptを調べていたところ、Disqusの一部スクリプトが関係していることがわかりました。Disqus はウェブサイトやブログにコメントを追加できるサービスです。2007年頃の立ち上げから2013年頃に向けてバズった模様。それ移行も「Disqus導入してみた」系の記事は散見され、私も Hugo で作成している本ブログに導入しました。それが 2024年8月初旬頃です。

Disqus には、外部リンクを自動的にアフィリエイトリンクに差し替える ****Affiliate Links**** 機能があります。これにより収益を得ているようです。

{{< linkcard "https://tuhrig.de/the-disqus-affiliated-links-program/?utm_source=chatgpt.com" >}}
Disqusで新しいサイトを作成するとデフォルトで有効化されています。

これが有効だと、記事内リンクのクリックをスクリプトで捕捉してアフィリエイトリンク先にリダイレクトします。この機能を無効化することでスクリプトが読み込まれなくなり、正常に新規タブで外部リンクを開けるようになりました。

おそらく新規タブを開いた後に非同期で取得したリンクにリダイレクトをさせる処理が何らかの理由で、うまくいってなかったのだと思います。

openerで新規タブのlocationをアフィリエイトリンクに変更しているが、nopener属性のせいでうまくいかない...というストーリーかとも思いましたが、それだとすべての `target="_blank"` なリンクが開けなくなる致命的なバグになるし、そもそも元タブから新規タブのURLを変更するのはlocationじゃない気がするし...

うーん、よくわからない


## 解決方法 {#解決方法}

-   とりあえずDisqusのアフィリエイトリンク設定を無効にすることです。

    1.  `https://<disqusの自サイト>.disqus.com/admin/settings/advanced/` にアクセス
    2.  `affiliate links` のチェックを外す

    {{< figure src="/結論/2025-09-14_20-06-36_スクリーンショット 2025-09-14 20.06.30.png" title="Disqusのアフィリエイトリンクを無効にする" width="720" >}}


### 追記 2025-09-14 {#追記-2025-09-14}

今動作を確認したところ、

-   アフィリエイトリンク機能が有効
-   `target="_blank"` なリンク

でも問題なく遷移できました

テスト用ページ

{{< linkcard "https://tsonobe1.github.io/gisqus_link_test/" >}}
執筆時は確かに記事冒頭の動作だったのですが...


## 新規タブで開きたい `<a>タグ` の属性はどうすべきか {#新規タブで開きたい-a-タグ-の属性はどうすべきか}

良い機会なので調べ直してみました。

-   `noreferrer`
    -   ページA → ページB の遷移時に、 `HTTP Referer` ヘッダの送信を省略する
-   `noopener`
    -   ページA → ページB の遷移時に、 `window.opener` を `null` に設定する
    -   `HTTP Referer` ヘッダは送信される
-   `noreferrer` を設定すると、 `noopener` の設定が自動付与される
-   `window.opener.location = "<URL>"` のように書き換えると、ページAのタブを任意のページCに遷移できる
    -   この仕様を用いた攻撃を [Tabnabbing](https://owasp.org/www-community/attacks/Reverse_Tabnabbing?utm_source=chatgpt.com) という
-   今のモダンなブラウザでは `target="_blank"` なタグには暗黙的に `noopener` 相当の処理が自動付与される
    -   {{< linkcard "https://www.stefanjudis.com/today-i-learned/target-blank-implies-rel-noopener/?utm_source=chatgpt.com" >}}
    -   つまり、 `window.opener` が null となる
-   `noreferrer` はリファラを一切渡さないため、アクセス解析に支障をもたらす
    -   {{< linkcard "https://cinci.jp/blog/20240723-review-target-blank-noopener-noreferrer-practices" >}}
-   Referer情報をどのくらい含めるかは `Referrer-Policy` で設定する
    -   デフォは `strict-origin-when-cross-origin`


### よって {#よって}

-   単なる技術ブログでは外部リンクに
    -   `noreferrer属性` は不要
    -   `noopener属性` も明示しなくていい

ということがわかりました。


## まとめ {#まとめ}

-   アフィリエイトリンク機能は無効化にしておいたほうがよさそう
-   新規タブで開きたい `<a>タグ` に `noreffere属性` と `noopener属性` を付ける必要はない

Disqusが埋め込むスクリプトの詳細な仕組みや、1回目は正しくリンク先が開くのに2回目以降は真っ白なタブになってしまう理由は不明ですが、もう `noreferrer` は不要であることがわかってよかったです。

というか、Disqusのコメント欄に広告が出るようになってしまったので消そうかな...
