# Stack

Empty `App.tsx` hosts **convert when filled**. Do not add more React.

## Frontend (when filling UI)

- **Svelte 5** + **SvelteKit SPA** + **Tailwind CSS v4** + **shadcn-svelte (New York)**
- Shared UI in `packages/shell-ui`; program `src/` stays a thin host
- Nested folders and modular filenames (`tsconfig.build.json` style)

## Backend / desktop

- Tauri 2, Rust crates as in [architecture.md](architecture.md)
- Windows: WebView2, NSIS, `tauri.conf.json` + `tauri.windows.conf.json`

## Tooling

- **pnpm only.** Do not `npm install`. Ignore the empty root `package-lock.json`.
- Shared JS versions belong in `catalog:` of `pnpm-workspace.yaml`.
- Turbo at the repo root. Cargo workspace at the repo root.
- Run a program from the repo root: `pnpm --filter … tauri:dev` or `pnpm tauri:dev:<program>` — not `npm run`.

## Docs

Re-query **Context7** at implement time for Tauri, Svelte, Tailwind, pnpm, and Turbo. Do not copy APIs or versions from memory. See [versions.md](versions.md).
