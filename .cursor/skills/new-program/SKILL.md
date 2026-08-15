---
name: new-program
description: Starts a new CoreSuite program from the editor scaffold via slash command. Use only when explicitly invoked via /new-program.
disable-model-invocation: true
---

# New program

Follow `.cursor/skills/add-program/SKILL.md`. Do not improvise structure.

1. Confirm the folder name (`programs/<name>/`).
2. Clone the `programs/editor` tree (skip the `milddleware.ts` typo; use `middleware.ts`).
3. Wire `pnpm-workspace.yaml`, root `cargo.toml`, and `turbo.json` the same way as existing programs.
4. Import shared crates/packages; do not copy them.
5. Stop after scaffolding unless the user asked to fill behavior.
