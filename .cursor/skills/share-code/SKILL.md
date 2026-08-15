---
name: share-code
description: Decides whether code belongs in crates/, packages/, or programs/. Use when sharing code, extracting a duplicate, choosing crate vs package, or placing a feature used by more than one program.
---

# Share code

Never copy a feature into `editor`, `explorer`, and `terminal`. Extract, then import.

## Decision tree

1. **Used by more than one program?**
   - Rust (types, IPC payloads, FFI) → `crates/core`
   - Rust (window/shell behavior) → `crates/shell`
   - Rust (CLI only) → `crates/cli`
   - TS/IPC client → `packages/shell-bridge`
   - React/CSS → `packages/shell-ui`
   - TS compiler defaults → `packages/tsconfig`
2. **Used by one program only?** → `programs/<name>/` (`src/` or `src-tauri/`).
3. **Already exists in a shared layer?** → import it. Do not reimplement.

## Do not

- Add a crate that duplicates `core` / `shell` / `cli`.
- Add a package that duplicates `shell-ui` / `shell-bridge` / `tsconfig`.
- Widen Tauri capabilities so a program can reach into another program's code.
- Invent a new top-level folder for shared code.

If the shared file is still empty, establish the pattern there first, then use it in one program.
