# Plan 008: Give the graph a screen-reader text alternative

> **Executor instructions**: Follow step by step, verifying each step. Update this
> plan's row in `plans/README.md` when done.
>
> **Drift check (run first)**: `git diff --stat 53aff84..HEAD -- src/main.ts src/style.ts src/translations`
> If changed, reconcile excerpts before editing.

## Status

- **Priority**: P1
- **Effort**: S-M
- **Risk**: LOW
- **Depends on**: none
- **Category**: a11y
- **Planned at**: commit `53aff84`, 2026-06-21

## Why this matters

The SVG graph is `aria-hidden="true"` with no alternative, so screen-reader users
get the name and current state but nothing about the data the card exists to show
(trend, min, max over the period). A pro-grade card provides a concise text
summary. This is additive and low-risk: keep the SVG hidden (it's decorative for
AT), add a visually-hidden, `aria-live`-free summary node next to it.

## Current state

- `src/main.ts:406-425` — `renderGraph()`; the SVG is wrapped hidden:
  ```ts
  <div class="graph__container__svg" aria-hidden="true">
    ${renderSvg(this)}
  </div>
  ```
- The card already computes the data a summary needs:
  - current state via `this.getEntityState(i)` / `this.computeState(...)`,
  - per-axis bounds in `this.bound` (`[min, max]`, primary) and
    `this.boundSecondary`,
  - `this.computeName(i)`, `this.computeUom(i)`, `this.visibleEntities`,
  - `this.config.hours_to_show`.
- Existing a11y strings live under `card.a11y` in the translations
  (`src/translations/en.json:151-153`, currently just `loading`).
- `localize(key, hass, params)` supports `{placeholder}` interpolation
  (`src/localize.ts:45-51`).
- `src/style.ts` has no `.sr-only` utility yet.

## Commands you will need

| Purpose   | Command             | Expected        |
|-----------|---------------------|-----------------|
| Typecheck | `npm run typecheck` | exit 0          |
| Tests     | `npm test`          | all pass        |
| Suite     | `npm test -- card`  | passes          |
| Build     | `npm run build`     | bundle written  |

## Scope

**In scope**:
- `src/main.ts` (render a visually-hidden summary in `renderGraph`)
- `src/style.ts` (add a `.sr-only` utility class)
- `src/translations/en.json`, `fr.json` (+ `es.json` if present): `card.a11y.graph_summary`
- `tests/card.test.js` (assert the summary renders)

**Out of scope**:
- `src/renderSvg.ts` — leave the SVG `aria-hidden`; do not add ARIA to individual
  points/bars (noisy for AT).
- `aria-live` — the summary should NOT be a live region (would spam on every poll).

## Git workflow

- Branch: `feat/008-graph-a11y`. Commit:
  `feat(a11y): add screen-reader summary for the graph`.
- No co-author trailer. Do not push/PR unless told.

## Steps

### Step 1: Add a `.sr-only` utility to the card styles

In `src/style.ts`, add:
```css
.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```
**Verify**: `npm run build` → bundle written (CSS compiles).

### Step 2: Add the summary string

Add to `card.a11y` in `en.json`:
`"graph_summary": "{name}: current {current}, range over {hours}h from {min} to {max}."`
and in `fr.json`:
`"graph_summary": "{name} : actuel {current}, plage sur {hours} h de {min} à {max}."`
(curly apostrophe, non-breaking space before `:`). If `es.json` exists:
`"graph_summary": "{name}: actual {current}, rango en {hours} h de {min} a {max}."`

**Verify** parity:
`node -e "['en','fr'].forEach(l=>{if(!require('./src/translations/'+l+'.json').card.a11y.graph_summary)throw new Error(l)})"` → exit 0.

### Step 3: Render the visually-hidden summary

In `src/main.ts` `renderGraph()`, inside the `.graph` container (sibling to the
`aria-hidden` SVG wrapper), add a `.sr-only` node built from one localized line
per visible entity. For each visible entity index `i`, compose:
```ts
localize('card.a11y.graph_summary', this._hass, {
  name: this.computeName(i),
  current: `${this.computeState(this.getEntityState(i))} ${this.computeUom(i)}`.trim(),
  hours: this.config.hours_to_show,
  min: this.computeState(this.bound[0]),
  max: this.computeState(this.bound[1]),
})
```
Render them as `<div class="sr-only">${lines}</div>`. Guard against entities not
yet loaded (the render path already returns warnings when an entity is undefined,
so within `renderGraph` the data is present, but still null-check `this.bound`).
Use the secondary bounds for entities whose `y_axis === 'secondary'`.

**Verify**: `npm run typecheck` → 0; `npm test -- card` → passes.

### Step 4: Test the summary

In `tests/card.test.js`, add a test: configure one entity with a known state and
`hours_to_show`, render, and assert the shadow DOM contains a `.sr-only` element
whose text includes the entity name and current value. Model construction on the
existing card tests.

**Verify**: `npm test` → all pass.

## Test plan

- New test: `.sr-only` summary present and contains name + current value (in
  `tests/card.test.js`).
- Manual (note in PR): with a screen reader, the card announces name + current +
  range; the SVG itself stays silent.

## Done criteria

- [ ] `npm run typecheck` exits 0; `npm test` exits 0 with the new test
- [ ] `npm run lint` exits 0; `npm run build` writes the bundle
- [ ] `card.a11y.graph_summary` present in en + fr (parity check passes)
- [ ] SVG remains `aria-hidden`; summary is `.sr-only` and NOT an `aria-live` region
- [ ] `plans/README.md` status row updated

## STOP conditions

- `this.bound` can be undefined at render time in a way that throws → STOP, report
  (guard rather than ship a crash).
- The summary would need data the card doesn't already compute (e.g. true period
  min/max distinct from axis bounds) and approximating with `this.bound` is
  misleading → STOP and ask whether to compute real extrema (would expand scope).

## Maintenance notes

- If multiple entities are common, consider capping the summary to the first N and
  appending "and X more" — note for a future iteration, not this plan.
- Keep the summary non-live; if a future "announce on change" feature is wanted,
  that's a deliberate `aria-live="polite"` opt-in, separately designed.
