# Architecture

Windows-first Tauri 2 suite: `editor`, `explorer`, `terminal`. Shared code is extracted; never copied into all three programs.

## Layers

| Path | Owns |
| --- | --- |
| `crates/core` | Shared Rust types, IPC payloads, FFI. GUIs reach this through Tauri + `packages/shell-bridge`. |
| `crates/shell` | Shared window/shell **library** — not an app. Run `editor` (chrome harness), `explorer`, or `terminal` to see it. |
| `crates/cli` | Standalone binary over `crates/core`. |
| `packages/shell-bridge` | TS IPC client. |
| `packages/shell-ui` | Shared UI. Manifest: `packages/shell-ui/src/package.json`. |
| `packages/tsconfig` | Shared TS compiler defaults. |
| `programs/<name>/` | App-only UI + `src-tauri`. |

## Rules

- Pattern goes in the shared layer first, then one program imports it.
- Do not add a fourth crate/package that duplicates `core` / `shell` / `cli` / `shell-ui` / `shell-bridge` / `tsconfig`.
- Capabilities JSON is the security boundary. Do not widen allowlists to unblock a task.
- Empty tracked files are intentional. Do not “complete” the repo unless asked.
