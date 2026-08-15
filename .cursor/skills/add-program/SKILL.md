---
name: add-program
description: Adds a new Tauri program by cloning programs/editor and wiring pnpm/Cargo/Turbo. Use when adding a program, cloning editor/explorer/terminal, or creating a new app under programs/.
---

# Add a program

Clone the **tree** of `programs/editor`. Do not invent a second layout. Do not invent product features.

## Steps

1. Ask for the program folder name (kebab-case). Create `programs/<name>/` matching editor:
   - `index.html`, `package.json`
   - `src/` host files as they exist on editor today (`App.tsx` / `main.tsx` until converted)
   - `src/styles/**`, `src/types/vite-env.d.ts`
   - `src-tauri/` — `Cargo.toml`, `build.rs`, `src/main.rs`, `tauri.conf.json`, `tauri.windows.conf.json`
   - `src-tauri/capabilities/` — `default.json`, `desktop.json`, `splashscreen.json`, `tray-menu.json`, `context-menus.json`
   - `src-tauri/configs/` — `vite.config.ts`, `vitest.config.ts`, `playwright.config.ts`, `middleware.ts`, `typescript/tsconfig.*.json`
   - `src-tauri/scripts/dev.ts`, `src-tauri/scripts/package.ts`
   - `src-tauri/NSIS/installer.nsh`
2. Register the program in existing workspace files only (do not add a second tool):
   - `pnpm-workspace.yaml` — `programs/<name>`
   - root `cargo.toml` — `programs/<name>/src-tauri` if other programs are members
   - `turbo.json` — same pipeline shape as editor, if any
3. Reuse `packages/shell-ui`, `packages/shell-bridge`, `crates/{core,shell,cli}`. Do not copy them into the program.
4. Leave files as empty as editor if you are only scaffolding. Fill only what the task needs.
5. When filling UI, convert empty `App.tsx` to Svelte 5 per `.cursor/context/stack.md`. Do not add more React.
6. Do not add MCP servers, extra crates, or a fourth program layout.
