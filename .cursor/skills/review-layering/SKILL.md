---
name: review-layering
description: Reviews placement and duplication across crates, packages, and the three programs. Use only when explicitly invoked via /review-layering.
disable-model-invocation: true
---

# Review layering

Read-only review. Do not improvise a new architecture. Do not edit files unless the user asked for fixes after the review.

## Look for

- The same feature in more than one of `programs/editor`, `programs/explorer`, `programs/terminal`
- App-only code that belongs in `crates/{core,shell,cli}` or `packages/{shell-ui,shell-bridge,tsconfig}`
- Shared types defined outside `crates/core`
- Ad-hoc `invoke` strings instead of `packages/shell-bridge`
- A new crate/package that duplicates `core` / `shell` / `cli` / `shell-ui` / `shell-bridge` / `tsconfig`
- Widened capabilities used as a substitute for sharing code

## Output

- Violations with paths
- Where the code should live
- What to extract vs delete
