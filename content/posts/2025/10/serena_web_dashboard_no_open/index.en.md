---
title: "How to prevent the web dashboard from opening in serena"
author: ["tsonobe"]
description: "When setting up serena on the mcp server for a CLI-based AI agent, the dashboard automatically starts and opens in the browser. I want to prevent this."
date: 2025-10-09T00:00:00+09:00
lastmod: 2025-10-09T23:18:09+09:00
tags: ["mcp", "serena", "codex", "gemini"]
categories: ["tips", "tech"]
draft: false
mermaid: false
---

When setting up serena on the mcp server for a CLI-based AI agent, the dashboard automatically starts and opens in the browser. I want to prevent this.


## Solution {#solution}

Set `--enable-web-dashboard` to `false`.


### `~/.codex` {#dot-codex}

```nil
[mcp_servers.serena]
command = "uvx"
args = ["--from", "git+https://github.com/oraios/serena", "serena", "start-mcp-server", "--context", "codex", "--enable-web-dashboard", "false"]
```


### `~/.gemini` {#dot-gemini}

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
