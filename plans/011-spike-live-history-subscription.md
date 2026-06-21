# Plan 011 (SPIKE): Investigate live history via WebSocket subscription

> **Executor instructions**: This is a SPIKE — the deliverable is a written
> recommendation + a throwaway prototype, NOT production code merged to the card.
> Do not change the shipping data path. Update this plan's row in `plans/README.md`
> when the writeup exists.

## Status

- **Priority**: P3 (do after 007)
- **Effort**: M (timebox: ~1 day)
- **Risk**: LOW (spike — no production change)
- **Depends on**: 007 (WebSocket history) — build on the same API
- **Category**: direction
- **Planned at**: commit `53aff84`, 2026-06-21

## Why this matters

The card refreshes by polling: a `setInterval` (`config.update_interval`) or a
points-per-hour timer (`src/main.ts:846-854 setNextUpdate`) re-fetches history.
Once history comes over WebSocket (Plan 007), HA can instead *stream* updates, so
the graph moves in real time with less load. This is a clear "live pro dashboard"
upgrade, but it touches the update lifecycle, so it deserves a spike before a build
commitment. The output is a go/no-go with a concrete design, not a merged feature.

## Current state (context for the spike)

- Polling lives in `src/main.ts`:
  - `connectedCallback` (193-205) sets a `setInterval` when `update_interval` is set.
  - `setNextUpdate` (846-854) schedules the points-per-hour refresh otherwise.
  - `updateData`/`updateEntity` (622-800) do the fetch + cache + Graph update.
- After Plan 007, fetching uses `history/history_during_period` via `callWS`.
- HA exposes streaming history: `history/stream` (a `connection.subscribeMessage`
  command that sends an initial window then incremental updates). Exact message
  shape must be confirmed against the running HA version during the spike.

## Deliverable

A markdown writeup at `plans/notes/011-live-history-findings.md` containing:

1. **API confirmation**: the exact `history/stream` subscribe message and the shape
   of initial vs incremental payloads (captured from a real HA, e.g. Developer
   Tools → Services / WS, or `hass.connection.subscribeMessage` in a scratch
   console). Note the HA version it was verified on.
2. **Design**: how a subscription would replace/augment polling — lifecycle
   (subscribe in `connectedCallback`, unsubscribe in `disconnectedCallback`),
   how incremental rows merge into the existing `Graph` history + cache, and how
   `update_interval` interacts (fallback vs disabled).
3. **Blast radius**: which methods change (`connectedCallback`,
   `disconnectedCallback`, `updateData`, the `Graph` update path), estimated
   effort (S/M/L) for the real implementation, and risks (memory/leak on
   unsubscribe, multiple entities, cache coherence).
4. **Recommendation**: go / no-go, and if go, a one-paragraph plan outline to turn
   into a build plan (`013-...`).
5. **Open questions** for the maintainer.

Optionally: a throwaway prototype on a branch `spike/011-live-history` (not for
merge) demonstrating a single-entity live subscription, referenced from the writeup.

## Commands you will need

| Purpose            | Command                       | Expected            |
|--------------------|-------------------------------|---------------------|
| Typecheck (proto)  | `npm run typecheck`           | exit 0 (if prototyping) |
| Run card locally   | (the repo's dev/serve flow)   | card loads in HA    |

## Scope

**In scope**:
- `plans/notes/011-live-history-findings.md` (create)
- Optional throwaway branch `spike/011-live-history` (NOT merged)

**Out of scope**:
- Any change to `src/**` on a mergeable branch. The shipping data path stays as-is
  until a follow-up build plan is approved.

## Steps

1. Confirm the `history/stream` (or current equivalent) subscribe contract against
   a live HA; record the payload shapes.
2. Sketch the subscribe/merge/unsubscribe design against the current lifecycle.
3. Estimate blast radius + risks; write the recommendation + open questions.
4. (Optional) prototype one entity on a throwaway branch to de-risk the merge logic.
5. Write `plans/notes/011-live-history-findings.md`.

## Done criteria

- [ ] `plans/notes/011-live-history-findings.md` exists with all five sections
- [ ] The WS streaming contract is documented from a REAL HA (version noted), not assumed
- [ ] A clear go/no-go recommendation is stated
- [ ] No `src/**` change landed on a mergeable branch
- [ ] `plans/README.md` status row updated

## STOP conditions

- The running HA version doesn't expose a streaming history command → record that
  as the finding (no-go for now) and stop; polling stays.
- The spike balloons past its timebox → stop, write up what's known + remaining
  unknowns, and recommend a decision rather than over-investing.

## Maintenance notes

- This spike's writeup is the input to a future build plan; keep it concrete enough
  that the build plan can be written from it without re-investigating.
