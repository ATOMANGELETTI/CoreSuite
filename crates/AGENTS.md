# crates

Shared Rust only.

- `core` — types, IPC payloads, FFI
- `shell` — window/shell **library** (not an app)
- `cli` — standalone binary over `core`

Do not add a fourth crate. GUIs reach this code through Tauri + `packages/shell-bridge`. See `.cursor/context/architecture.md`.
