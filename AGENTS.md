# CoreSuite

Windows-first Tauri 2 monorepo: three desktop programs that share Rust crates and TS/Svelte packages.

**Read [`.cursor/rules/coresuite.mdc`](.cursor/rules/coresuite.mdc) first.** Stack rules, skills, and review agents live under `.cursor/`. On-demand packs: [`.cursor/context/`](.cursor/context/README.md). Version cache: [`.cursor/cache/`](.cursor/cache/README.md). Nested maps: [`crates/AGENTS.md`](crates/AGENTS.md), [`packages/AGENTS.md`](packages/AGENTS.md), [`programs/AGENTS.md`](programs/AGENTS.md).

## Map

| Path | Owns |
| --- | --- |
| `crates/{core,shell,cli}` | Shared Rust |
| `packages/{shell-ui,shell-bridge,tsconfig}` | Shared TS/Svelte |
| `programs/{editor,explorer,terminal}` | App shells (UI + `src-tauri`) |
| `tests/` | Cross-cutting tests |
| `.github/workflows` | `cy.yml` (CI) and `release.yml` (keep separate) |

Placement: shared code in `crates/` or `packages/`. Never copy a feature into all three programs.

## Environments

- **Local (Windows):** real target. WebView2, NSIS, `tauri.windows.conf.json`.
- **Cloud agents (Ubuntu):** no WebView2, no NSIS. Do not invent a Linux installer path. Prefer `node` over bash; cloud `environment.json` only bootstraps Rust/Node/pnpm.

## Do not

- Fill empty scaffolds, `package.json`, or `cargo.toml` unless asked.
- Add `.cursor/mcp.json` or project MCP servers.
- Widen Tauri capability allowlists to unblock a task.

## Learned User Preferences

- Prefer the latest **stable** versions of JS and Rust dependencies; resolve at implement time (`pnpm view` / crates.io), never canary, nightly, or versions copied from memory.
- Re-query Context7 when filling stack or config so Tauri, Svelte, Tailwind, pnpm, and Turbo match current official docs.
- Shared shell chrome should use official Nord palettes (Polar Night, Snow Storm, Frost, Aurora) with a macOS-inspired modern flat UI.
- Organize with nested folders and modular filenames (e.g. `tsconfig.build.json` style) rather than dumping many files in one directory.
- Run a suite app from the repo root with pnpm (`pnpm --filter … tauri:dev` or `pnpm tauri:dev:<program>`), not `npm run`.
- Workspace editor tabs: pinned tabs icon-only (`workbench.editor.pinnedTabSizing: compact`) on their own row; unpinned tabs on the second row.

## Learned Workspace Facts

- Frontend stack is Svelte 5 + SvelteKit SPA + Tailwind v4 + shadcn-svelte (New York), not React; empty `App.tsx` hosts convert when the scaffold is filled.
- `packages/shell-ui` manifest is `packages/shell-ui/src/package.json`; Nord tokens live in `styles/modules/themes/nord-theme.css` (define once in shell-ui, import elsewhere).
- `crates/cli` is a standalone binary over `crates/core`; GUIs share those core functions through Tauri + `packages/shell-bridge`. The shell is a library — run `editor`, `explorer`, or `terminal` to see it (`editor` is the chrome harness).
- pnpm-only workspace; do not run `npm install` or treat the empty root `package-lock.json` as a lockfile. Shared JS versions belong in the `catalog:` of `pnpm-workspace.yaml`.
