# `.cursor/` layout

Layered Cursor workspace for CoreSuite. Always-on rules stay tiny; stack rules attach by glob; workflows live in skills; reviews run as subagents.

## What lives here

| Path | Role |
| --- | --- |
| `rules/coresuite.mdc` | Always-on architecture (every turn) |
| `rules/*.mdc` | Glob-scoped stack rules (Rust, Tauri, TS, UI, tests, CI) |
| `skills/` | On-demand workflows (`add-program`, `share-code`, `debug-tauri`, …) |
| `commands/` | Slash entry points that follow the matching skill |
| `agents/` | Readonly reviewers (`tauri-reviewer`, `monorepo-reviewer`) |
| `hooks/` | Node `before-shell` safety rail. `hooks/state/` is local-only |
| `environment.json` | Lean Ubuntu cloud bootstrap (no Linux Tauri/NSIS) |

Root files Cursor also reads: [`AGENTS.md`](../AGENTS.md), `.cursorignore`, `.cursorindexingignore`.

## Constraints

- Windows-first. Agent shell is PowerShell; prefer `node` over bash.
- Do not add `mcp.json`. Use already-available Context7.
- Do not treat `hooks/state/` as project config (gitignored).
- Do not complete the empty repo unless asked.
