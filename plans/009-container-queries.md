# Plan 009: Use the declared container context with `@container` queries

> **Executor instructions**: Follow step by step, verifying each step. Update this
> plan's row in `plans/README.md` when done.
>
> **Drift check (run first)**: `git diff --stat 53aff84..HEAD -- src/style.ts`
> If changed, reconcile excerpts before editing.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: ui
- **Planned at**: commit `53aff84`, 2026-06-21

## Why this matters

`src/style.ts:53` already sets `container-type: inline-size` on `:host`, declaring
the card as a container — but there are zero `@container` rules consuming it, so
the responsive context is dead weight. In HA's Sections view the same card renders
at very different widths; adding container queries makes the typography and spacing
adapt (a genuinely "premium responsive" touch) at no layout-thrash cost, since the
context already exists.

## Current state

- `src/style.ts:49-55` — `:host` declares the container:
  ```css
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  container-type: inline-size;
  font-family: var(--p-font);
  ```
- Size-sensitive rules with fixed values that should adapt at narrow widths:
  - `.state__value { font-size: 2.4em; }` (style.ts:288)
  - `.state__uom { font-size: 1.4em; }` (style.ts:296)
  - `.name > span { font-size: 1.2em; }` (style.ts:177-179)
  - `ha-card > div { padding: 0 16px; }` (style.ts:75-94)
- `grep -n "@container" src/style.ts` → no matches (confirmed dead context).

## Commands you will need

| Purpose | Command           | Expected        |
|---------|-------------------|-----------------|
| Build   | `npm run build`   | bundle written  |
| Tests   | `npm test`        | all pass        |
| Lint    | `npm run lint`    | exit 0          |

## Scope

**In scope**:
- `src/style.ts` (add `@container` rules)

**Out of scope**:
- Any `.ts` logic file, `editor/styles.ts`, or `main.ts`. CSS-only change.
- Changing the existing fixed values directly — override them inside `@container`
  blocks so default (wide) rendering is unchanged.

## Git workflow

- Branch: `feat/009-container-queries`. Commit:
  `feat(ui): adapt typography and padding via container queries`.
- No co-author trailer. Do not push/PR unless told.

## Steps

### Step 1: Add narrow-width container rules

At the end of the `css\`...\`` template in `src/style.ts` (before the closing
backtick, near the keyframes), add two breakpoints keyed on the container's inline
size. Keep them conservative — shrink the headline numbers and tighten padding on
small cards only:

```css
@container (max-width: 240px) {
  .state__value { font-size: 2em; }
  .state__uom { font-size: 1.2em; }
  .name > span { font-size: 1.1em; }
  ha-card > div { padding: 0 12px; }
  ha-card > div:first-child { padding-top: 12px; }
}
@container (max-width: 160px) {
  .state__value { font-size: 1.6em; }
  .state__uom { font-size: 1em; }
  .graph__legend { display: none; } /* too cramped to be useful */
}
```
Tune the thresholds/values if obviously wrong, but the principle stands: defaults
unchanged at normal width, graceful shrink when the container is narrow.

**Verify**: `npm run build` → bundle written; `grep -c "@container" src/style.ts`
→ ≥ 2.

### Step 2: Confirm nothing else broke

**Verify**: `npm test` → all pass (CSS change shouldn't affect logic tests);
`npm run lint` → exit 0.

## Test plan

No unit test (pure CSS; jsdom doesn't evaluate container queries). Verification is
build + lint + a manual note in the PR: resize the card narrow in a Sections-view
dashboard and confirm the value text shrinks and the legend hides under ~160px.

## Done criteria

- [ ] `grep -c "@container" src/style.ts` ≥ 2
- [ ] `npm run build` writes the bundle; `npm run lint` exits 0; `npm test` passes
- [ ] Default (wide) rendering visually unchanged (values only differ at narrow widths)
- [ ] `git status` shows only `src/style.ts` modified
- [ ] `plans/README.md` status row updated

## STOP conditions

- `container-type` was removed from `:host` (drift) → STOP; re-add it or report.
- The chosen breakpoints make normal-width cards change → STOP; your media/container
  logic is wrong (defaults must be untouched above the max-width thresholds).

## Maintenance notes

- These thresholds are the place to tune if users report cramped layouts at
  specific widths.
- If a future change adds new size-sensitive elements, give them container-query
  overrides here too rather than reintroducing fixed-only sizing.
