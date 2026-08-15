---
name: bootstrap-workspace
description: Fills root workspace manifests once (pnpm catalog, Cargo workspace, Turbo, tauri:dev scripts). Use when bootstrapping the monorepo, filling package.json, pnpm-workspace.yaml, cargo.toml, turbo.json, or adding tauri:dev scripts.
---

# Bootstrap workspace

Fill **root workspace wiring only**. Do not invent product UI. Do not complete every empty file in the repo.

Read `.cursor/context/stack.md`, `.cursor/context/architecture.md`, and `.cursor/context/versions.md` first.

## Do

1. Resolve latest **stable** JS/Rust versions (`pnpm view` / crates.io). Write them to `.cursor/cache/versions.json` for today. Never pin from memory.
2. Re-query Context7 for current pnpm workspace `catalog:`, Turbo, and Cargo workspace syntax.
3. Fill only what already exists at the repo root (do not add a second tool):
   - `pnpm-workspace.yaml` — `packages/*`, `programs/*`, and `catalog:` for shared JS deps
   - `package.json` — `"packageManager": "pnpm@…"`; scripts `tauri:dev:editor|explorer|terminal` (and matching `--filter` form). Not `npm run`.
   - `cargo.toml` — workspace members: `crates/{core,shell,cli}` and `programs/{editor,explorer,terminal}/src-tauri`
   - `turbo.json` — same pipeline shape for the three programs
   - `packages/tsconfig` / `tsconfig.base.json` — extend, do not fork a third base
4. Ignore empty root `package-lock.json`. Do not run `npm install`.
5. Leave `tauri.conf.json`, capabilities, and program UI empty unless the user asked to fill those next.

## Do not

- Add npm/yarn/bun, extra crates, extra packages, or a third GitHub workflow
- Add `.cursor/mcp.json`
- Widen Tauri capabilities
- Copy the same feature into all three programs
