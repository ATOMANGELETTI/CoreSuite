# Versions

Never pin JS or Rust versions from memory, canary, or nightly. Latest **stable** only.

## Protocol

1. If `.cursor/cache/versions.json` has an entry for this package **from today**, reuse it.
2. Otherwise resolve now:
   - JS: `pnpm view <pkg> version`
   - Rust: crates.io (or `cargo search`) for the crate’s current stable
3. Write the result into `.cursor/cache/versions.json` (see [../cache/README.md](../cache/README.md)).
4. Re-query Context7 for the API that matches that version.

Do not commit `.cursor/cache/versions.json`. Example shape: [../cache/versions.example.json](../cache/versions.example.json).
