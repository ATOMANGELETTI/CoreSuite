# CoreSuite

Windows-first Tauri 2 monorepo: three desktop programs that share Rust crates and TS/React packages.

**Read [`.cursor/rules/coresuite.mdc`](.cursor/rules/coresuite.mdc) first.** Stack rules, skills, and review agents live under `.cursor/`.

## Map

| Path | Owns |
| --- | --- |
| `crates/{core,shell,cli}` | Shared Rust |
| `packages/{shell-ui,shell-bridge,tsconfig}` | Shared TS/React |
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
