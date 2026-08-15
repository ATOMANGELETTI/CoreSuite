# Cache (local only)

Generated agent artifacts. **Not** project config. Gitignores everything in this folder except this README, `.gitignore`, and `versions.example.json`.

## `versions.json`

Written by the agent when filling manifests. Schema matches `versions.example.json`.

- Key: package / crate name
- `version`: latest stable at resolve time
- `source`: `pnpm-view` or `crates-io`
- `resolvedAt`: ISO date (`YYYY-MM-DD`) — reuse only if it is **today**

## `docs/`

Optional Context7 snapshots for the current task. Delete freely. Never commit.

## Do not

- Store secrets, tokens, or `.env` values here
- Treat cached versions as forever pins in git
- Use this folder as a second `node_modules` or `target`
