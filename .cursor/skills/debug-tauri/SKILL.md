---
name: debug-tauri
description: Debugs Tauri 2 on Windows using WebView2 logs, tauri.conf.json, capabilities, and src-tauri/scripts/dev.ts. Use when the app fails to start, IPC invoke fails, a capability denies a command, or WebView2/dev-script issues appear.
---

# Debug Tauri (Windows)

Scaffold is empty. Do not invent commands or allowlists. Find the mismatch in the existing files.

## Order

1. **Dev entry** — `programs/<name>/src-tauri/scripts/dev.ts` plus `tauri.conf.json` / `tauri.windows.conf.json`. Confirm the program being launched.
2. **Capabilities** — `src-tauri/capabilities/*.json`. A missing permission looks like a runtime/IPC failure. Do not widen allowlists to "make it work"; add only the specific permission that file is meant to grant.
3. **IPC** — frontend must go through `packages/shell-bridge`. Compare invoke names and payloads to `crates/core` and `src-tauri/src/main.rs`. Ad-hoc `invoke` strings in program UI are a bug.
4. **WebView2 / Windows** — check the WebView2 runtime and the Tauri/WebView2 logs for that process. Agent shell is PowerShell; prefer `node` scripts over bash.
5. **Docs** — use already-available Context7 for Tauri 2. Do not add project MCP servers.

## Report

- What failed (start, IPC, capability, installer)
- Which file is the boundary (`capabilities/`, `tauri*.json`, `shell-bridge`, `dev.ts`)
- The smallest fix that does not copy code across programs
