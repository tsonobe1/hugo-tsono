---
title: How to Preserve Console and Network Logs After Page Reload in Chrome
author: [“tsonobe”]
date: 2025-08-07T00:00:00+09:00
lastmod: 2025-08-07T20:26:05+09:00
description: A solution for when console and network logs disappear after a page reload in Chrome.
tags: [Chrome, debug]
categories: [tips]
draft: false
translated_by: "ChatGPT 4o"
---

When debugging in Google Chrome using the Developer Tools, console and network logs are normally cleared upon page reload or navigation. Here’s how to retain those logs.

# Console
1. Open Developer Tools
2. Click the gear icon (⚙️)
3. Under the Console section, check `Preserve log upon navigation`

{{< figure src="/コンソールログ/image.png" >}}

# Network
1. Open Developer Tools
2. Click the gear icon (⚙️)
3. Under the Network section, check `Preserve log`

{{< figure src="/ネットワーク/image.png" >}}
