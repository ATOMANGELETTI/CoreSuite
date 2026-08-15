# programs

App shells only (`editor`, `explorer`, `terminal`). Clone `programs/editor` — do not invent a second layout.

Shared UI/Rust stays in `packages/` and `crates/`. Never copy a feature into all three apps.

Windows: `tauri.conf.json` + `tauri.windows.conf.json`, NSIS, capabilities as the allowlist.

When filling UI, convert empty `App.tsx` to Svelte 5 per `.cursor/context/stack.md`.
