---
title: "serenaでwebダッシュボードを開かないようにする"
author: ["tsonobe"]
description: "CLI系のaiエージェントのmcpサーバにserenaを設定しているとき、ダッシュボードが自動で立ち上がりブラウザ自走遷移してしまう。これを止めたい。"
date: 2025-10-09T00:00:00+09:00
lastmod: 2025-10-09T23:18:09+09:00
tags: ["mcp", "serena", "codex", "gemini"]
categories: ["tips", "tech"]
draft: false
mermaid: false
---

CLI系のaiエージェントのmcpサーバにserenaを設定しているとき、ダッシュボードが自動で立ち上がりブラウザ自走遷移してしまう。これを止めたい。


## 結論 {#結論}

`--enabled-web-dashboard` を false にする


### `~/.codex` {#dot-codex}

```nil
[mcp_servers.serena]
command = "uvx"
args = ["--from", "git+https://github.com/oraios/serena", "serena", "start-mcp-server", "--context", "codex", "--enable-web-dashboard", "false"]
```


### `~./gemini` {#dot-gemini}

```nil
"mcpServers": {
  "serena": {
    "command": "uvx",
    "args": [
      "--from", "git+https://github.com/oraios/serena",
      "serena-mcp-server",
      "--context", "ide-assistant",
      "--enable-web-dashboard", "false"
    ]
  }
}
```
