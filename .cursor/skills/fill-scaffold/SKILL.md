---
name: fill-scaffold
description: Fills empty CoreSuite scaffold files without inventing a second architecture. Use when populating empty files, implementing the first pattern in a layer, or filling crates/packages/programs stubs.
---

# Fill scaffold

Every tracked source file starts empty. The **tree is the spec**. Before filling stack or UI, read `.cursor/context/stack.md` and `.cursor/context/architecture.md`. Resolve versions per `.cursor/context/versions.md`.

## Rules

1. Change only files the task needs. Do not "complete" the repo.
2. Establish a pattern in the shared layer first (`crates/*` or `packages/*`), then use it in **one** program.
3. Match existing paths. Examples:
   - `packages/shell-ui/src/package.json` is the shell-ui manifest (do not invent another root).
   - Theme file: `styles/modules/themes/nord-theme.css`
   - Tauri configs: `tauri.conf.json` + `tauri.windows.conf.json`
   - Middleware config: `src-tauri/configs/middleware.ts`
4. Do not add folders, crates, packages, workflows, or MCP servers that are not already in the tree.
5. Do not invent product features (no fake editor/explorer/terminal behavior).
6. Reuse workspace names from existing `package.json` / `Cargo.toml` when present.
7. Root workspace files (`package.json`, `pnpm-workspace.yaml`, `cargo.toml`, `turbo.json`) → follow `.cursor/skills/bootstrap-workspace/SKILL.md`.
8. When filling UI, convert empty `App.tsx` to Svelte 5. Run the Svelte MCP autofixer on new `.svelte` files.

## After filling

If more than one program needed the same code, you put it in the wrong layer — extract to `crates/` or `packages/`.
