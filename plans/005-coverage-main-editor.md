# Plan 005: Raise test coverage on `main.ts` orchestration + editor entity config

> **Executor instructions**: Follow step by step. This plan ADDS tests only — no
> source changes. STOP if a new test reveals a real bug (report it; don't fix it
> here). Update this plan's row in `plans/README.md` when done.
>
> **Drift check (run first)**: `git diff --stat 53aff84..HEAD -- src/main.ts src/editor/editor.ts tests/`
> If `main.ts`/`editor.ts` changed, re-read the relevant methods before writing tests.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: LOW
- **Depends on**: none
- **Category**: tests
- **Planned at**: commit `53aff84`, 2026-06-21
- **Note**: This is a prerequisite for the riskier refactors (006 hold/double-tap,
  007 WebSocket history). Land it first so those refactors have a safety net.

## Why this matters

Coverage is 79% statements / 66% branches overall, but the core is the weak spot:
`main.ts` is **71.8% stmts / 60% branch** and `editor.ts` is **78% / 65% func**,
with `renderEntityConfig` (the per-entity config UI) entirely untested. These are
exactly the modules the next two plans will refactor. Characterization tests here
turn those refactors from risky to safe.

## Current state

- Coverage today (`npm run test:coverage`):
  - `main.ts` 71.79% stmts, 60% branch — uncovered around data fetch branches,
    `getCardSize` measuring path, and `calculateCardSize`.
  - `editor.ts` 78.77% stmts, 65.85% funcs — `renderEntityConfig` (lines ~618-681)
    and several change handlers uncovered.
- Test harness conventions:
  - Suites live in `tests/*.test.js` (plain JS, Vitest).
  - Component suites opt into jsdom via a `// @vitest-environment jsdom` docblock
    at the top of the file (see `tests/card.test.js`, `tests/editor.test.js`).
  - Existing patterns to copy:
    - `tests/card.test.js` — constructs the card, sets `hass`/`config`, asserts on
      rendered shadow DOM and computed values.
    - `tests/editor.test.js` — constructs `mini-graph-card-editor`, sets `hass` and
      `_config`, calls render methods / handlers, asserts on emitted
      `config-changed` events.
    - `tests/main-coverage.test.js` — targeted coverage of `main.ts` helpers.
- Run a single suite: `npm test -- card` / `npm test -- editor`.

## Commands you will need

| Purpose        | Command                      | Expected             |
|----------------|------------------------------|----------------------|
| Tests          | `npm test`                   | all pass             |
| One suite      | `npm test -- main-coverage`  | passes               |
| Coverage       | `npm run test:coverage`      | main.ts/editor.ts up |
| Typecheck      | `npm run typecheck`          | exit 0               |

## Scope

**In scope** (create/extend test files only):
- `tests/main-coverage.test.js` (extend)
- `tests/editor.test.js` (extend) — or a new `tests/editor-coverage.test.js` if it exists, extend that
- `tests/editor-coverage.test.js` (extend if present)

**Out of scope**:
- Any `src/**` file. If a test exposes a bug, STOP and report — do not fix source here.
- Snapshot tests — this repo asserts on concrete values, not snapshots; match that.

## Git workflow

- Branch: `test/005-coverage-core`. Commit: `test: cover main.ts orchestration and editor entity config`.
- No co-author trailer. Do not push/PR unless told.

## Steps

### Step 1: Cover the editor's per-entity config (`renderEntityConfig`)

In `tests/editor.test.js` (or `tests/editor-coverage.test.js`), add a describe
block that:
- builds the editor with a `_config` containing one entity object,
- expands that entity (`_toggleEntityConfig(0)`),
- renders and asserts the per-entity fields appear (custom name, color, attribute,
  y_axis select, the show-* switches),
- exercises `_entityConfigChanged` / `_entitySelectChanged` and asserts a
  `config-changed` event fires with the expected `entities[0]` mutation.

Model the construction and event assertions on the existing editor tests.

**Verify**: `npm test -- editor` → passes; `npm run test:coverage` shows
`editor.ts` function coverage above 75%.

### Step 2: Cover `main.ts` card-size + render branches

In `tests/main-coverage.test.js`, add tests for:
- `calculateCardSize()` across config combinations (name/icon on/off, state on/off,
  graph on/off, legend with >1 visible entity, `abs` populated) — assert the
  integer size changes as expected.
- `getCardSize()` fallback path (no shadow DOM measurement available → returns
  `card_size || calculateCardSize()`).
- `renderWarnings()` path: a config whose entity is missing from `hass.states`
  renders the warning branch (entity undefined).

**Verify**: `npm test -- main-coverage` → passes; `npm run test:coverage` shows
`main.ts` branch coverage above 70%.

### Step 3: Confirm the overall floor moved

**Verify**: `npm run test:coverage` → `main.ts` ≥ 78% stmts and ≥ 70% branch;
`editor.ts` ≥ 82% stmts. Record the new All-files line in the PR description.

## Test plan

This plan *is* the test plan. New tests target: editor per-entity config render +
handlers; `main.ts` `calculateCardSize`/`getCardSize`/`renderWarnings`. Pattern
source: `tests/editor.test.js` and `tests/main-coverage.test.js`.

## Done criteria

- [ ] `npm test` exits 0 with new tests present
- [ ] `npm run test:coverage`: `main.ts` ≥ 78% stmts / ≥ 70% branch
- [ ] `npm run test:coverage`: `editor.ts` ≥ 82% stmts / ≥ 75% funcs
- [ ] No `src/**` file modified (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

- A new test fails because the code is actually buggy (not because the test is
  wrong) → STOP, report the bug; it may deserve its own plan.
- Reaching the coverage targets would require testing private DOM-timing behavior
  that's inherently flaky (real timers/animation) → STOP, report which lines are
  impractical rather than writing flaky tests.

## Maintenance notes

- These are characterization tests: they lock in *current* behavior so the 006/007
  refactors can prove they didn't change it. If a refactor intentionally changes
  behavior, update the test in the same PR with a note.
- Keep using concrete-value assertions, not snapshots — snapshots rot silently.
