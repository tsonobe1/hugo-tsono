+++
title = "macでShift+Spaceで入力ソースを切り替える"
author = ["tsonobe"]
date = 2025-02-11T10:17:00+09:00
tags = ["tool"]
draft = false
+++

true

-   Windowsで `Shift+Space` で日本語と英語を切り替えているので、macでも同じようにしたい
    -   今まで `Crtl + \` で対応していたがWinであまりにも頻繁に `Shift+Space` を使って手癖になっているので、macでの文字入力に支障が出るほど効率が下がっていた
-   しかし、システム設定 -&gt; キーボード -&gt; キーボードショートカット -&gt; 入力ソースで、
    ```nil
    Shift + Space
    ```
    を指定できない。

    -   Shift + Space を直接割り当てられない制限がある模様
-   以下の手順で無理やり指定できる


## 解決 {#解決}

1.  com.apple.symbolichotkeys.plistを開く
    ```nil
    open ~/Library/Preferences/com.apple.symbolichotkeys.plist
    ```
2.  Root &gt; AppleSymbolicHotKeys &gt; 61 &gt; value &gt; parameters
3.  item 0 = 32, Item 1 = 49 となっていることを確認
4.  item 2を `131072`&nbsp;[^fn:1]に設定する
5.  PCを再起動
6.  確認
    1.  システム設定 -&gt; キーボード -&gt; キーボードショートカット -&gt; 入力ソースで、 `⇧ Space` が設定されていることを確認
    2.  Shift+Spaceで入力ソースを切り替えられることを確認

[^fn:1]: キーコードサンプル

    | 値      | 意味                   |
    |--------|----------------------|
    | 131072  | Shift + Space          |
    | 262144  | Control + Space        |
    | 524288  | Option + Space         |
    | 1048576 | Command + Space        |
    | 655360  | Option + Shift + Space |
