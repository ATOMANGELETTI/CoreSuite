# CoreSuite

Windows-first Tauri 2 suite: **editor**, **explorer**, and **terminal**. Shared Rust lives in `crates/`, shared UI in `packages/`.

## Run

```powershell
pnpm install
pnpm tauri:dev:editor
```

Same as `pnpm --filter @coresuite/editor tauri:dev`. Explorer and terminal use `pnpm tauri:dev:explorer` and `pnpm tauri:dev:terminal`.

Browser-only chrome: `pnpm --filter @coresuite/editor dev` (port 5173).

CLI:

```powershell
cargo run -p coresuite-cli -- ping hello
pnpm cli -- ping hello
```

Do not run `npm install` or unfiltered `turbo run tauri:dev`.
