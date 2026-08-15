## Summary

<!-- What and why. -->

## Programs / layers

- [ ] `editor`
- [ ] `explorer`
- [ ] `terminal`
- [ ] shared crate (`crates/`)
- [ ] shared package (`packages/`)

Shared behavior lives in `crates/` or `packages/`. Do not copy the same feature into all three programs.

## Checklist

- [ ] Capabilities allowlists were not widened just to unblock the task
- [ ] Tests (when they exist) live in the program that owns the behavior, or in `tests/` / `packages/` for shared helpers
- [ ] Windows-first: no Linux installer / WebView2 path invented
