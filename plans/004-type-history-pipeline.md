# Plan 004: Type the history pipeline in `main.ts` (remove the `any` cluster)

> **Executor instructions**: Follow step by step, verifying each step. STOP on
> any STOP condition. Update this plan's row in `plans/README.md` when done.
>
> **Drift check (run first)**: `git diff --stat 53aff84..HEAD -- src/main.ts src/dataSource.ts src/types.ts`
> If changed, reconcile the excerpts below before editing.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none (but easier to review after 005's tests exist)
- **Category**: tech-debt
- **Planned at**: commit `53aff84`, 2026-06-21

## Why this matters

`main.ts` is the only module with an `any` cluster (~10 occurrences), all in the
history fetch/cache pipeline (`updateEntity`/`updateData`). `dataSource.fetchRecent`
already returns `HistoryItem[][]` and `types.ts` already defines `HistoryItem`,
so these `any`s are unnecessary — they disable the compiler exactly where the
data is shaped and cached, the most bug-prone code in the card. Typing them keeps
strict mode honest on the core path without inventing new types.

## Current state

- `src/types.ts:25-31` — the type to use:
  ```ts
  export interface HistoryItem {
    state: string | number;
    last_changed: string;
    last_updated?: string;
    attributes?: Record<string, unknown>;
  }
  ```
- `src/dataSource.ts:9-25` — `fetchRecent(...) : Promise<HistoryItem[][]>` (already typed).
- `src/main.ts:695-800` — `updateEntity`, the cluster. Key lines:
  - `702`: `let stateHistory: any[] = [];`
  - `706-708`: `let history = null;` … `history = await getCache(...) as any;`
  - `738`: `let newStateHistory: any[] = await fetchRecent(...)`
  - plus `.forEach((item: any) => …)` and `.map((item: any) => …)` inside.
- `src/main.ts:348` — `getObjectAttr(obj: Record<string, any>, path: string): any`
  (leave the `attributes` access loose, but the history items can be typed).
- ESLint allows `any` (`@typescript-eslint/no-explicit-any: 'off'` in
  `eslint.config.js`), so this is a voluntary tightening, not a lint requirement.

## Commands you will need

| Purpose   | Command             | Expected           |
|-----------|---------------------|--------------------|
| Typecheck | `npm run typecheck` | exit 0, no errors  |
| Tests     | `npm test`          | all pass           |
| Lint      | `npm run lint`      | exit 0             |
| Count any | `grep -cE ":\s*any\|as any\|: any\[\]" src/main.ts` | should drop |

## Scope

**In scope**:
- `src/main.ts` (type the pipeline locals/params)

**Out of scope**:
- `src/dataSource.ts`, `src/types.ts` — already correct; do not change their signatures.
- The intentional looseness around `hass.states` / `attributes` (the `getObjectAttr`
  return can stay `unknown`/`any` — it reads arbitrary attribute paths). Don't
  over-engineer a type for dynamic attribute access.

## Git workflow

- Branch: `refactor/004-type-history-pipeline`. Commit:
  `refactor(main): type the history fetch/cache pipeline (drop any cluster)`.
- No co-author trailer. Do not push/PR unless told.

## Steps

### Step 1: Import `HistoryItem` and type the locals

In `src/main.ts`, ensure `HistoryItem` is imported from `./types` (the file
already imports several types from `./types` near the top — add `HistoryItem` to
that import list). Then:

- `let stateHistory: HistoryItem[] = [];`
- `let newStateHistory: HistoryItem[][] = await fetchRecent(...)` then after the
  `[0]` extraction and `.map(...)`, the resulting array is `HistoryItem[]`.
- For the cache read, define a small local shape instead of `as any`:
  ```ts
  interface CachedHistory { hours_to_show: number; last_fetched: string; data: HistoryItem[]; }
  let history: CachedHistory | null = null;
  history = (await getCache(this._md5Config!, `${entity.entity_id}_${index}`, this.config.compress)) as CachedHistory | null;
  ```
- Replace `(item: any)` callbacks with `(item: HistoryItem)`.

Keep behavior identical — this is types only. If a genuine type conflict appears
(e.g. an attribute access that doesn't fit `HistoryItem`), prefer a narrow local
cast at that one spot over widening the whole pipeline back to `any`.

**Verify**: `npm run typecheck` → exit 0.

### Step 2: Re-run the full suite (behavior must be unchanged)

**Verify**: `npm test` → all pass (no test should need changing; if one does, you
changed behavior — STOP and review).

## Test plan

No new tests — this is a type-only refactor and the existing `tests/card.test.js`
/ `tests/main-coverage.test.js` already exercise `updateData`/`updateEntity`. The
guarantee is "typecheck passes AND no existing test changed."

## Done criteria

- [ ] `npm run typecheck` exits 0
- [ ] `npm test` exits 0, **no test file modified**
- [ ] `npm run lint` exits 0
- [ ] `grep -cE "any\[\]|as any" src/main.ts` is lower than before (record before/after in the PR description)
- [ ] `git status` shows only `src/main.ts` modified
- [ ] `plans/README.md` status row updated

## STOP conditions

- Typing forces a change to `dataSource.ts` or `types.ts` signatures → STOP (out of scope; report the mismatch).
- An existing test starts failing → STOP (you changed runtime behavior, not just types).
- A spot genuinely needs `any` to compile → leave that single spot, comment why, and continue; do not revert the whole step.

## Maintenance notes

- If `fetchRecent`'s return shape changes, this pipeline's types are the first
  place that breaks — that's the intended early-warning.
- `getObjectAttr` staying loose is deliberate (arbitrary attribute paths); don't
  let a future change tighten it into a maintenance burden.
