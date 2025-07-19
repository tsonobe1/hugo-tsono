---
title: "Changing Input Source with Shift + Space on macOS"
author: "tsonobe"
description: 'How to assign "shift + space" as a shortcut on macOS.'
summary: 'How to assign "shift + space" as a shortcut on macOS.'
date: 2025-07-02T00:00:00+09:00
lastmod: 2025-07-03T08:27:56+09:00
tags: ["shortcut", "macOS", "input source"]
categories: ["tips"]
draft: false
translated_by: "Google's Gemini 2.5 Flash model"
---

## Summary {#summary}

1.  `open ~/Library/Preferences/com.apple.symbolichotkeys.plist`
2.  `Root` > `AppleSymbolicHotKeys` > `61` > `value` > `parameters`
3.  Set `item 2` to `131072`
4.  Restart your PC
5.  Confirm that `shift + space` is set in `System Settings` -> `Keyboard` -> `Keyboard Shortcuts` -> `Input Sources`
6.  Confirm that you can switch input sources with `shift + space`

## Background {#background}

Since last year, I've been using Windows for work, and I've also connected my beloved Keychron K2 (US layout) that I've been using with my personal M1 Mac to Windows.

Since it's a US layout, settings are essential for switching between Japanese and English IME. On macOS, I used to convert with `control + space` (strictly speaking, I replaced `caps lock` with `control`).

{{< figure src="/経緯/2025-07-02_22-49-14_mac_key.png" alt="How to switch on macOS" caption="<span class=\"figure-number\">Figure 1: </span>How to switch on Mac" title="How to switch on macOS" width="600px" >}}

However, on Windows (I've forgotten the details), I couldn't set it up the same way, so I ended up operating with `shift + space`.

{{< figure src="/経緯/2025-07-02_22-48-44_win_key.png" alt="How to switch on Windows" caption="<span class=\"figure-number\">Figure 2: </span>How to switch on Windows" title="How to switch on Windows" width="600px" >}}

Since I use my work PC more frequently, my muscle memory gradually changed, and I frequently made typos by accidentally pressing `shift + space` when using macOS.
Since I couldn't work, I tried to change the shortcut for switching input sources, but...

## Cannot set `shift + space` keyboard shortcut on Mac {#cannot-set-shift-plus-space-keyboard-shortcut-on-mac}

I'm on `macOS 15.5`, but I can't set `shift + space` in System Settings -> Keyboard -> Keyboard Shortcuts.
It doesn't respond when I type it.

{{< figure src="/macで_~shift_+_space~_のキーボードショートカットを設定できない/2025-07-03_07-06-30_setting1.png" caption="<span class=\"figure-number\">Figure 3: </span>System Settings > Keyboard > Keyboard Shortcuts" width="600px" >}}

So, I did some research and found the following article:

{{< linkcard "https://seorenn.tistory.com/547" >}}

It seems that `shift + space` cannot be set, but there was a solution written.
Among `AppleSymbolicHotkeys` in the `com.apple.symbolichotkeys.plist` file,

-   No. 60 corresponds to `Select previous input source`
-   No. 61 corresponds to `Select next input source`

It seems that `shift + space` can be registered by rewriting the value of Item2 to the key code `131072`.

{{< figure src="/macで_~shift_+_space~_のキーボードショートカットを設定できない/2025-07-03_07-07-13_plist.png" alt="After changing settings file" caption="<span class=\"figure-number\">Figure 4: </span>After changing com.apple.symbolichotkeys.plist" title="After changing com.apple.symbolichotkeys.plist" width="600px" >}}

When I tried it, `shift + space` was reflected as the shortcut for switching input sources after restarting my PC.

{{< figure src="/疑問/2025-07-03_06-52-27_スクリーンショット 2025-07-03 6.52.13.png" caption="<span class=\"figure-number\">Figure 5: </span>System Settings > Keyboard > Keyboard Shortcuts" title="System Settings > Keyboard > Keyboard Shortcuts" width="600px" >}}

Now, I can comfortably switch between Japanese and English with the same feel.

As mentioned in the original article, why can't `shift + space` be registered as a shortcut?
(Is it highly likely to conflict with shortcuts of other apps?)
Currently, it does not conflict with any resident applications (Emacs, iTerm, Aqua Voice) and works without problems.

```