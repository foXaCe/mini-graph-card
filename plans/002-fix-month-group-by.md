# Plan 002: Finish (or gate) the `group_by: month` option

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving on. If a
> STOP condition occurs, stop and report. When done, update this plan's row in
> `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 53aff84..HEAD -- src/buildConfig.ts src/graph.ts src/types.ts src/editor/editor.ts`
> If any changed, reconcile the "Current state" excerpts before proceeding.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: bug
- **Planned at**: commit `53aff84`, 2026-06-21

## Why this matters

`group_by: 'month'` is half-wired. The type allows it and `graph.ts` handles it
in `_updateEndTime()`, but `buildConfig.ts` never sets `points_per_hour` for
`month` (it only special-cases `date` and `hour`), so a month-grouped graph
inherits the default `points_per_hour` (0.5) and computes a wrong number of
buckets — the graph silently renders incorrect bucketing. The editor also never
offers `month`, so it is YAML-only and undiscoverable. Either finish it (give it
a correct point density + an editor option) or remove the dead branch; this plan
finishes it.

## Current state

- `src/types.ts:151` — `month` is a valid value:
  ```ts
  group_by: 'interval' | 'date' | 'hour' | 'month';
  ```
- `src/graph.ts:307-324` — `_updateEndTime()` already handles `month`:
  ```ts
  case 'month':
    this._endTime.setMonth(this._endTime.getMonth() + 1);
    this._endTime.setDate(1);
    break;
  ```
- `src/buildConfig.ts:155-165` — the gap: no `month` case, so `points_per_hour`
  is left at its default for month grouping:
  ```ts
  switch (conf.group_by) {
    case 'date':
      conf.points_per_hour = 1 / 24;
      break;
    case 'hour':
      conf.points_per_hour = 1;
      break;
    default:
      break;
  }
  ```
- `src/editor/editor.ts:422-426` — the editor's Group By select omits `month`:
  ```ts
  ${this._select(t('editor.labels.group_by'), this._group_by, 'group_by', [
    { value: 'interval', label: t('editor.options.interval') },
    { value: 'date', label: t('editor.options.date') },
    { value: 'hour', label: t('editor.options.hour') },
  ])}
  ```
- i18n: `editor.options.date/hour/interval` exist in `src/translations/en.json`
  and `fr.json` under `editor.options`; there is **no** `month` key yet.

Convention to follow for `points_per_hour`: `date` → `1/24` (1 point/day),
`hour` → `1` (1 point/hour). For `month`, one point per day is the sensible
density → `1/24` as well (a month axis groups by day-of-month), OR one point per
month. **Decision for this plan: one bucket per day → `points_per_hour = 1/24`**,
matching `date`. If a reviewer disagrees, that is a one-line change.

## Commands you will need

| Purpose   | Command                          | Expected on success |
|-----------|----------------------------------|---------------------|
| Typecheck | `npm run typecheck`              | exit 0              |
| Tests     | `npm test`                       | all pass            |
| One suite | `npm test -- buildConfig`        | buildConfig suite passes |
| Lint      | `npm run lint`                   | exit 0              |

## Scope

**In scope**:
- `src/buildConfig.ts` (add the `month` case)
- `src/editor/editor.ts` (add the `month` option)
- `src/translations/en.json`, `src/translations/fr.json` (add `editor.options.month`)
- `tests/buildConfig.test.js` (add a case)

**Out of scope**:
- `src/graph.ts` — already correct for `month`; do not touch.
- `src/translations/es.json` if it exists (handled by the Spanish plan); if it does not exist, ignore.

## Git workflow

- Branch: `feat/002-month-group-by`. Conventional commit, e.g.
  `fix(graph): correct points_per_hour for group_by month and expose it in the editor`.
- No co-author trailer. Do not push/PR unless told.

## Steps

### Step 1: Set the correct point density for `month` in buildConfig

In `src/buildConfig.ts`, add a `month` case to the `switch (conf.group_by)`:

```ts
case 'month':
  conf.points_per_hour = 1 / 24;
  break;
case 'date':
  conf.points_per_hour = 1 / 24;
  break;
```

**Verify**: `npm test -- buildConfig` → passes.

### Step 2: Add `month` to the editor Group By select

In `src/editor/editor.ts` `renderDataSection()`, add to the `group_by` options
array: `{ value: 'month', label: t('editor.options.month') }`.

**Verify**: `npm run typecheck` → exit 0.

### Step 3: Add the `month` translation

Add `"month": "Month"` to `editor.options` in `src/translations/en.json` and
`"month": "Mois"` in `src/translations/fr.json`. Keep the key ordering tidy
(place it next to `date`/`hour`). Use the file's existing typography (curly
apostrophe `’`, non-breaking spaces) — but `Mois`/`Month` need neither.

**Verify**:
`node -e "['en','fr'].forEach(l=>{const o=require('./src/translations/'+l+'.json');if(!o.editor.options.month)throw new Error(l+' missing month');})"` → exit 0.

### Step 4: Add a buildConfig regression test

In `tests/buildConfig.test.js`, in the `group_by overrides points_per_hour`
describe block (model after the existing `group_by=hour` test at lines 46-48),
add:

```js
it('group_by=month forces points_per_hour=1/24', () => {
  expect(buildConfig({ ...base, group_by: 'month' }).points_per_hour).toBe(1 / 24);
});
```

**Verify**: `npm test -- buildConfig` → passes including the new test.

## Test plan

- New test: `group_by=month` sets `points_per_hour` to `1/24` (in
  `tests/buildConfig.test.js`, mirroring the `group_by=hour`/`date` tests).
- Full run: `npm test` → all pass.

## Done criteria

ALL must hold:

- [ ] `npm run typecheck` exits 0
- [ ] `npm test` exits 0, new month test present and passing
- [ ] `npm run lint` exits 0
- [ ] `editor.options.month` exists in both `en.json` and `fr.json`
- [ ] Editor `group_by` select includes a `month` option
- [ ] `plans/README.md` status row updated

## STOP conditions

- `graph.ts` no longer has a `month` case in `_updateEndTime()` (drift) → STOP.
- The maintainer wants `month` removed entirely instead of finished → STOP and switch to the removal approach (delete `month` from the type union and the `graph.ts` case) instead.

## Maintenance notes

- If a Spanish (or any other) translation file is added later, it must also get
  `editor.options.month` to keep i18n parity (the i18n sync tooling enforces this).
- The `1/24` density choice for `month` assumes a day-resolution month axis; if a
  literal per-month aggregation is ever wanted, this is the single line to change.
