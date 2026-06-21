# Spike 011 — Live history via WebSocket subscription — findings

Status: **desk analysis complete; live-HA confirmation PENDING.**
Author pass: written against commit after Plan 007 (WS history) landed.

> This spike was executed without a live Home Assistant. Sections marked
> **[VERIFY ON HA]** must be confirmed against a running instance before a build
> plan (013) is written. Nothing here changes shipping code.

## 1. API contract  [VERIFY ON HA]

Home Assistant streams history over a WebSocket **subscription** (not a one-shot
call): command `history/stream`, sent via `hass.connection.subscribeMessage`.

Documented/expected message shape (confirm field names + casing on your HA):

```js
const unsub = await hass.connection.subscribeMessage(
  (msg) => { /* msg.states / msg.change_type / ... */ },
  {
    type: 'history/stream',
    entity_ids: [entityId],
    start_time: startISO,
    end_time: endISO,            // omit for an open-ended live stream
    minimal_response: true,
    no_attributes: !withAttributes,
    significant_changes_only: !withAttributes,
  },
);
```

- **First message**: the initial history window, same compact row shape as
  `history/history_during_period` (`{ s, lu, lc?, a? }` per entity) — Plan 007's
  remap can be reused verbatim.
- **Subsequent messages**: incremental updates as new states arrive.
  **[VERIFY ON HA]** the exact incremental envelope (e.g. `change_type`, whether
  it sends full rows or deltas, how end-of-backfill is signalled).
- `subscribeMessage` resolves to an **unsubscribe function** — must be called on
  teardown or the connection leaks subscriptions.

## 2. Design sketch

Lifecycle, mapped onto the current card (`src/main.ts`):

- **Subscribe**: in `connectedCallback`, when `config.update_interval` is unset
  (or a new `config.stream`/`live` opt-in), open one `history/stream` per entity
  (or one multi-entity stream) covering `hours_to_show`.
- **Initial fill**: feed the first message through the existing path
  (`Graph.history = …` → `Graph.update()` → re-render), reusing Plan 007's
  remap helper.
- **Incremental**: append new rows to the entity's `Graph` history, drop rows
  older than the window, re-run `Graph.update()` + `updateBounds()` and request a
  render. Reuse `setCache` so the cache stays warm.
- **Unsubscribe**: in `disconnectedCallback`, call every stored unsub fn and
  clear them. Also re-subscribe on a config change that alters
  entities/hours/aggregation.
- **Polling interaction**: when streaming is active, do **not** also run the
  `setNextUpdate` / `update_interval` timers (they'd double-fetch). Streaming
  replaces them; keep the timer path as the fallback when streaming is off or
  the subscription errors.

## 3. Blast radius & effort

Methods that change: `connectedCallback`, `disconnectedCallback`, `setConfig`
(re-subscribe on change), `updateData`/`updateEntity` (initial fill reuse), plus
new subscribe/merge/unsub helpers; `dataSource.ts` gains a `subscribeRecent`
alongside `fetchRecent`. Estimated effort: **M–L**.

Risks:
- **Subscription leaks** if unsub isn't airtight across reconnects/config changes
  (HA reconnects re-fire subscriptions).
- **Multi-entity** coordination (N streams vs one multi-entity stream).
- **Cache coherence** between streamed rows and `setCache` snapshots.
- **Window trimming** correctness (dropping old rows as time advances).

## 4. Recommendation

**Conditional GO.** It's a genuine "live pro dashboard" upgrade and Plan 007 already
laid the WS groundwork (reuse the remap). But it must be (a) opt-in via config to
start (don't change default behavior), and (b) gated on **[VERIFY ON HA]** of the
`history/stream` incremental envelope. Turn this into build plan **013** only after
the two verifications below pass.

## 5. Open questions for the maintainer

1. Opt-in (`live: true` / reuse `update_interval: 0`) or default-on once proven?
2. One multi-entity `history/stream` or one per entity?
3. Behavior when the socket drops mid-stream — silent re-subscribe or fall back to polling?
4. Is sub-minute live refresh actually wanted for this card's use cases, or is the
   current polling cadence sufficient (i.e. is the complexity worth it)?

## Verification checklist before writing Plan 013

- [ ] [VERIFY ON HA] `history/stream` initial message shape matches Plan 007's remap.
- [ ] [VERIFY ON HA] incremental message envelope (change_type / row shape / batching).
- [ ] [VERIFY ON HA] unsubscribe fn returned and effective (no leak across reconnect).
