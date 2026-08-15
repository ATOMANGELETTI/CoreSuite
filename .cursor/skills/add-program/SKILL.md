---
name: add-program
description: Adds a new Tauri program by cloning programs/editor, wiring pnpm/Cargo/Turbo, and skipping scaffold typos. Use when adding a program, cloning editor/explorer/terminal, or creating a new app under programs/.
---

# Add a program

Clone the **tree** of `programs/editor`. Do not invent a second layout. Do not invent product features.

## Steps

1. Ask for the program folder name (kebab-case). Create `programs/<name>/` matching editor:
   - `index.html`, `package.json`
   - `src/App.tsx`, `src/main.tsx`, `src/styles/**`, `src/types/vite-env.d.ts`
   - `src-tauri/` — `Cargo.toml`, `build.rs`, `src/main.rs`, `tauri.conf.json`, `tauri.windows.conf.json`
   - `src-tauri/capabilities/` — `default.json`, `desktop.json`, `splashscreen.json`, `tray-menu.json`, `context-menus.json`
   - `src-tauri/configs/` — `vite.config.ts`, `vitest.config.ts`, `playwright.config.ts`, `typescript/tsconfig.*.json`
   - `src-tauri/scripts/dev.ts`, `src-tauri/scripts/package.ts`
   - `src-tauri/NSIS/installer.nsh`
2. **Do not copy typos.** Editor has `src-tauri/configs/milddleware.ts`. New programs use `middleware.ts`.
3. Register the program in existing workspace files only (do not add a second tool):
   - `pnpm-workspace.yaml` — `programs/<name>`
   - root `cargo.toml` — `programs/<name>/src-tauri` if other programs are members
   - `turbo.json` — same pipeline shape as editor, if any
4. Reuse `packages/shell-ui`, `packages/shell-bridge`, `crates/{core,shell,cli}`. Do not copy them into the program.
5. Leave files as empty as editor if you are only scaffolding. Fill only what the task needs.
6. Do not add MCP servers, extra crates, or a fourth program layout.
