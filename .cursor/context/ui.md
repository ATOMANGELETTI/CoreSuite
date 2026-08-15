# UI

Shared chrome lives in `packages/shell-ui`. Program hosts stay thin: convert empty `App.tsx` to Svelte 5 when filling.

## Nord (official palettes only)

Use Polar Night, Snow Storm, Frost, and Aurora. Define tokens **once** in `packages/shell-ui` at `styles/modules/themes/nord-theme.css` and import. Do not fork a second palette per program.

| Palette | Role |
| --- | --- |
| Polar Night | Surfaces, chrome, borders |
| Snow Storm | Text on dark surfaces |
| Frost | Accents, focus, links |
| Aurora | Semantic status (error, warn, ok, …) |

## Chrome

macOS-inspired **modern flat** UI: little ornament, clear hierarchy, no skeuomorphism, no extra theme engine.

## Do not

- Hard-code a parallel color system
- Copy widgets into `editor`, `explorer`, and `terminal`
- Invent product screens unless the task asks
