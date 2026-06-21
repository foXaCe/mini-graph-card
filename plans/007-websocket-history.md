# Plan 007: Migrate history fetching from REST to the WebSocket API

> **Executor instructions**: Follow step by step, verifying each step. STOP on any
> shape mismatch. Update this plan's row in `plans/README.md` when done.
>
> **Drift check (run first)**: `git diff --stat 53aff84..HEAD -- src/dataSource.ts src/main.ts tests/dataSource.test.js`
> If changed, reconcile excerpts before editing.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: MED
- **Depends on**: 005 (coverage safety net) — land that first
- **Category**: perf / modernization
- **Planned at**: commit `53aff84`, 2026-06-21

## Why this matters

The card fetches entity history over the legacy REST endpoint
(`hass.callApi('GET', 'history/period/...')`). Modern HA serves history over the
WebSocket command `history/history_during_period`, which is faster, lighter, and
the path HA core itself uses; the REST endpoint is the old route. For a card whose
whole job is history graphs, this is the highest-value modernization. Isolating
the change inside `dataSource.fetchRecent` (keeping its `HistoryItem[][]` return
shape) means `main.ts` is unaffected and the blast radius is one module + its test.

## Current state

- `src/dataSource.ts:9-25` — the function to migrate:
  ```ts
  export async function fetchRecent(hass, entityId, start, end, skipInitialState, withAttributes): Promise<HistoryItem[][]> {
    let url = 'history/period';
    if (start) url += `/${start.toISOString()}`;
    url += `?filter_entity_id=${entityId}`;
    if (end) url += `&end_time=${end.toISOString()}`;
    if (skipInitialState) url += '&skip_initial_state';
    if (!withAttributes) url += '&minimal_response&no_attributes';
    if (withAttributes) url += '&significant_changes_only=0';
    return hass.callApi('GET', url);
  }
  ```
- Consumer `src/main.ts:738-770` expects `HistoryItem[][]` where each inner item
  has `.state`, `.last_changed` / `.last_updated`, and (when `withAttributes`)
  `.attributes`. The return shape MUST stay identical.
- `HistoryItem` (src/types.ts:25-31): `{ state, last_changed, last_updated?, attributes? }`.
- `tests/dataSource.test.js` currently mocks `hass.callApi` and asserts URL
  construction + return passthrough.

### WS response shape (verify against your HA before trusting)

`hass.callWS({ type: 'history/history_during_period', start_time, end_time,
entity_ids: [id], minimal_response, no_attributes, significant_changes_only })`
returns an object keyed by entity_id whose values are arrays of **compact** rows:
`{ s: state, lu: last_updated (unix seconds, float), lc?: last_changed, a?: attributes }`.
This differs from the REST array-of-objects-with-ISO-timestamps — the remap is the
core of this plan.

## Commands you will need

| Purpose   | Command                    | Expected         |
|-----------|----------------------------|------------------|
| Typecheck | `npm run typecheck`        | exit 0           |
| Tests     | `npm test`                 | all pass         |
| Suite     | `npm test -- dataSource`   | passes           |
| Build     | `npm run build`            | bundle written   |

## Scope

**In scope**:
- `src/dataSource.ts` (`fetchRecent` body + a private remap helper)
- `tests/dataSource.test.js` (rewrite the fetch tests to mock `callWS`)

**Out of scope**:
- `src/main.ts` — must NOT change. If you find yourself editing it, the return
  shape drifted; STOP.
- The cache layer (`getCache`/`setCache`) — unchanged.

## Git workflow

- Branch: `feat/007-ws-history`. Commit:
  `perf(data): fetch history via WebSocket history_during_period`.
- No co-author trailer. Do not push/PR unless told.

## Steps

### Step 1: Implement the WS fetch + remap inside `fetchRecent`

Rewrite `fetchRecent` to call `hass.callWS` and remap to `HistoryItem[][]`:

```ts
export async function fetchRecent(hass, entityId, start, end, skipInitialState, withAttributes): Promise<HistoryItem[][]> {
  const result = await hass.callWS<Record<string, RawWsRow[]>>({
    type: 'history/history_during_period',
    start_time: (start ?? new Date(0)).toISOString(),
    end_time: end?.toISOString(),
    entity_ids: [entityId],
    minimal_response: !withAttributes,
    no_attributes: !withAttributes,
    significant_changes_only: withAttributes ? false : !!skipInitialState ? true : false,
  });
  const rows = result[entityId] ?? [];
  return [rows.map((r) => ({
    state: r.s,
    last_changed: new Date((r.lc ?? r.lu) * 1000).toISOString(),
    last_updated: new Date(r.lu * 1000).toISOString(),
    ...(r.a ? { attributes: r.a } : {}),
  }))];
}
```
Define `RawWsRow` locally (`{ s: string|number; lu: number; lc?: number; a?: Record<string, unknown> }`).
Preserve the existing semantics of `skipInitialState`/`withAttributes` as closely
as the WS API allows; if a flag has no clean WS equivalent, replicate the prior
behavior in the remap (e.g. dropping the first row) and note it in a comment.

**Verify**: `npm run typecheck` → exit 0.

### Step 2: Rewrite the dataSource fetch tests against `callWS`

In `tests/dataSource.test.js`, replace the `callApi` mock with a `callWS` mock
returning a sample `{ [entityId]: [{ s:'23.4', lu: 1700000000 }, ...] }`, and
assert:
- the returned shape is `HistoryItem[][]` with ISO `last_changed`/`last_updated`,
- `state` maps from `s`,
- `entity_ids`/`start_time`/`end_time`/flags are passed correctly,
- empty/absent entity key → `[[]]` (no throw).

**Verify**: `npm test -- dataSource` → passes.

### Step 3: Full suite + build (main.ts must be untouched)

**Verify**: `npm test` → all pass; `git status` shows NO change to `src/main.ts`;
`npm run build` → bundle written.

## Test plan

- Rewritten `tests/dataSource.test.js`: WS call args, remap correctness (state +
  timestamps), attributes pass-through when `withAttributes`, empty-result safety.
- The existing `tests/card.test.js`/`main-coverage` must still pass unchanged
  (proof the return shape is identical).

## Done criteria

- [ ] `npm run typecheck` exits 0
- [ ] `npm test` exits 0; dataSource tests rewritten for `callWS`
- [ ] `src/main.ts` NOT modified (`git diff --stat` shows only dataSource + its test)
- [ ] `npm run build` writes the bundle
- [ ] `plans/README.md` status row updated

## STOP conditions

- The live WS response shape differs from the `{ s, lu, lc?, a? }` assumption
  (verify against a real HA: in the HA Developer Tools or by logging) → STOP and
  report the actual shape; the remap must match reality, not this doc.
- Making tests pass requires changing `main.ts` → STOP (return shape drifted).
- `significant_changes_only`/`minimal_response` semantics can't be reproduced and
  the graph visibly changes (e.g. missing the initial state) → STOP and report;
  correctness beats modernization.

## Maintenance notes

- This unlocks Plan 010 (live history subscription) — both use `history_during_period`.
- A reviewer should diff a real graph before/after on the same entity/timespan to
  confirm identical points (not just green tests).
- Keep the remap helper small and exported-for-test if that makes the test cleaner.
