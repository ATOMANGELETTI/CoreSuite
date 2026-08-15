---
name: verify-change
description: Verifies a change against CoreSuite layering and existing tooling without inventing scripts. Use only when explicitly invoked via /verify-change or /verify.
disable-model-invocation: true
---

# Verify change

Do not improvise structure. Do not fill empty manifests just to have a script.

## Checks

1. **Layering** — shared Rust in `crates/{core,shell,cli}`; shared TS/React in `packages/{shell-ui,shell-bridge,tsconfig}`; app-only in `programs/<name>/`. No copies across editor/explorer/terminal.
2. **IPC / capabilities** — no ad-hoc `invoke` strings; no widened allowlists.
3. **Tooling that exists** — run only scripts already defined in the relevant `package.json` / `Cargo.toml` / `turbo.json`. If they are empty, skip execution and report that.
4. **Tests** — use the program's `vitest.config.ts` / `playwright.config.ts` only if configured. Prefer `node` on PowerShell.
5. **Scope** — only the files the task changed.

## Report

- What was run (or why nothing was runnable)
- Layering / duplication issues
- Pass / fail / blocked-on-empty-scaffold
