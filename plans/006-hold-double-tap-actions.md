# Plan 006: Add `hold_action` and `double_tap_action` (HA interaction parity)

> **Executor instructions**: Follow step by step, verifying each step. Step 0 is a
> hard gate — if it fails, STOP. Update this plan's row in `plans/README.md` when done.
>
> **Drift check (run first)**: `git diff --stat 53aff84..HEAD -- src/main.ts src/handleClick.ts src/buildConfig.ts src/types.ts src/editor/editor.ts`
> If changed, reconcile excerpts before editing.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: LOW-MED
- **Depends on**: 005 (coverage safety net) recommended
- **Category**: feature / HA conformance
- **Planned at**: commit `53aff84`, 2026-06-21

## Why this matters

Stock HA cards support three interactions — tap, hold, double-tap — each with its
own action config. This card only supports `tap_action`; there is no hold or
double-tap, and no use of HA's `actionHandler` gesture directive. Adding them is
the single most "HA-native" interaction-parity upgrade and is low risk because the
dispatch logic (`handleClick.ts`) already exists — only gesture detection and two
new config fields are missing.

## Current state

- `src/main.ts:254-275` — `render()` wires only tap via plain listeners:
  ```ts
  const interactive = config.tap_action.action !== 'none';
  ...
  @click=${(e: Event) => this.handlePopup(e, cardTarget)}
  @keydown=${(e: KeyboardEvent) => this._handleKeydown(e, cardTarget)}
  ```
- `src/main.ts:556-560` — `handlePopup` calls the dispatcher with `tap_action`:
  ```ts
  handlePopup(e, entity) {
    handleClick(this, this._hass, this.config, this.config.tap_action, entityId);
  }
  ```
- `src/handleClick.ts` — dispatcher already handles `more-info | navigate |
  call-service | url | fire-dom-event` for ANY `ActionConfig`. Reuse it as-is.
- `src/buildConfig.ts:123-125` — only `tap_action` has a default:
  ```ts
  tap_action: { action: 'more-info' },
  ```
- `src/types.ts:178-179` — config has `tap_action: ActionConfig;` only.
- `src/editor/editor.ts:494-547` — the Tap Action editor section (action-type
  select + conditional navigation_path / url / service fields) and
  `_tapActionChanged` (819-827).
- Legend items (`src/main.ts:456-463`) also wire tap via `@click`/`@keydown`.

## Step 0 — Capability gate (run before anything)

Verify `custom-card-helpers` (v2, already a dependency) exports the gesture
helpers. Run:

```bash
node -e "const h=require('custom-card-helpers'); console.log(['actionHandler','handleAction','hasAction'].map(k=>k+':'+(typeof h[k])).join(' '))"
```

- If all three are functions → proceed.
- If `actionHandler` is missing but `handleAction`/`hasAction` exist → proceed
  using a vendored directive (see Step 2 note).
- If `handleAction`/`hasAction` are missing → **STOP and report**; this plan needs
  the maintainer to choose a gesture library before continuing.

## Commands you will need

| Purpose   | Command                       | Expected          |
|-----------|-------------------------------|-------------------|
| Typecheck | `npm run typecheck`           | exit 0            |
| Tests     | `npm test`                    | all pass          |
| Suite     | `npm test -- handleClick`     | passes            |
| Lint      | `npm run lint`                | exit 0            |
| Build     | `npm run build`               | bundle written    |

## Scope

**In scope**:
- `src/types.ts` (add `hold_action?`, `double_tap_action?`)
- `src/buildConfig.ts` (no behavioral default needed; only ensure they pass through)
- `src/main.ts` (gesture wiring + routing)
- `src/editor/editor.ts` (expose the two new actions)
- `src/translations/en.json`, `fr.json` (+ `es.json` if it exists by the time this runs)
- `tests/main-coverage.test.js` or `tests/handleClick.test.js` (routing tests)
- `tests/editor.test.js` (editor renders the new sections)

**Out of scope**:
- `src/handleClick.ts` dispatch logic — reuse unchanged.
- Touch/pointer detection internals — delegate to the directive; don't hand-roll timers.

## Git workflow

- Branch: `feat/006-hold-double-tap`. Commit:
  `feat(actions): add hold_action and double_tap_action via actionHandler`.
- No co-author trailer. Do not push/PR unless told.

## Steps

### Step 1: Add the config fields

`src/types.ts` — in `MiniGraphCardConfig`, beside `tap_action`:
```ts
tap_action: ActionConfig;
hold_action?: ActionConfig;
double_tap_action?: ActionConfig;
```
`buildConfig.ts` already spreads the raw config, so these pass through; no default
needed (absent = no action). Confirm `npm run typecheck` exit 0.

### Step 2: Wire gesture detection on the card and route by action type

In `src/main.ts`:
- Import `actionHandler`, `handleAction`, `hasAction` from `custom-card-helpers`
  (or, per Step 0, a vendored `actionHandler` directive placed in
  `src/action-handler-directive.ts` and imported here).
- On the `<ha-card>`, replace the bare `@click`/`@keydown` wiring with the
  directive plus a single `@action` handler. Bind the directive with the card's
  configured actions:
  ```ts
  .actionHandler=${actionHandler({
    hasHold: hasAction(config.hold_action),
    hasDoubleClick: hasAction(config.double_tap_action),
  })}
  @action=${(ev: CustomEvent) => this._routeAction(ev, cardTarget)}
  ```
- Add `_routeAction(ev, target)`: read `ev.detail.action` (`'tap' | 'hold' |
  'double_tap'`), pick the matching config
  (`tap_action`/`hold_action`/`double_tap_action`), and if it `hasAction(...)`,
  call the existing `handleClick(this, this._hass, this.config, chosen, entityId)`.
  Keep `_handleKeydown` (Enter/Space) mapped to the tap action for keyboard users.
- Keep `interactive` true when ANY of the three actions is set (so role/tabindex
  still apply): `const interactive = [config.tap_action, config.hold_action,
  config.double_tap_action].some((a) => a && a.action !== 'none');`

**Verify**: `npm run typecheck` → 0; `npm run build` → bundle written.

### Step 3: Expose the two actions in the editor

In `src/editor/editor.ts`, generalize the existing Tap Action section into a
reusable method `renderActionSection(key: 'tap_action'|'hold_action'|'double_tap_action', titleKey: string)`
that renders the action-type select + the conditional `navigation_path`/`url`/
`service` fields for that key, and a generalized handler `_actionChanged(ev, key, field)`
(refactor `_tapActionChanged` to take the key). Call it three times in
`renderAdvancedSection()`:
```ts
${this.renderActionSection('tap_action', 'editor.tap_action.tap_action')}
${this.renderActionSection('hold_action', 'editor.tap_action.hold_action')}
${this.renderActionSection('double_tap_action', 'editor.tap_action.double_tap_action')}
```
Add the simple getters for `_hold_action` / `_double_tap_action` in the
`SIMPLE_GETTERS` map (default `{ action: 'none' }` so absent = no action shown).

**Verify**: `npm test -- editor` → passes.

### Step 4: i18n keys

Add to `editor.tap_action` in `en.json`: `"hold_action": "Hold Action"`,
`"double_tap_action": "Double Tap Action"`; in `fr.json`:
`"hold_action": "Action lors d’un appui long"`, `"double_tap_action": "Action lors d’un double appui"`.
(Use curly apostrophe `’`.) If `es.json` exists, add Spanish too:
`"hold_action": "Acción al mantener pulsado"`, `"double_tap_action": "Acción al doble toque"`.

**Verify** key parity:
`node -e "['en','fr'].forEach(l=>{const t=require('./src/translations/'+l+'.json').editor.tap_action;['hold_action','double_tap_action'].forEach(k=>{if(!t[k])throw new Error(l+' '+k)})})"` → exit 0.

### Step 5: Tests

- Routing: in `tests/main-coverage.test.js`, build a card with distinct
  `tap_action`/`hold_action`/`double_tap_action`, dispatch a synthetic `action`
  event with each `detail.action`, and assert the right action is dispatched
  (spy on `handleClick` behavior, e.g. listen for `hass-more-info` vs a
  `location-changed` event — mirror how `tests/handleClick.test.js` asserts).
- Editor: in `tests/editor.test.js`, assert all three action sections render.

**Verify**: `npm test` → all pass.

## Test plan

- New routing tests: tap/hold/double_tap each dispatch their configured action;
  an unset hold/double_tap dispatches nothing. Pattern: `tests/handleClick.test.js`.
- New editor test: three action sections present. Pattern: `tests/editor.test.js`.

## Done criteria

- [ ] `npm run typecheck` exits 0
- [ ] `npm test` exits 0 with new routing + editor tests
- [ ] `npm run lint` exits 0; `npm run build` writes the bundle
- [ ] `hold_action`/`double_tap_action` present in types, editor, and i18n (parity check passes)
- [ ] `plans/README.md` status row updated

## STOP conditions

- Step 0 gate fails (no gesture helpers) → STOP.
- Wiring the directive breaks existing tap behavior (a `tap` no longer fires
  more-info) → STOP and report; do not ship a regression.
- The editor refactor would touch more than the action section → STOP; keep the
  generalization local.

## Maintenance notes

- If `handleClick.ts` gains a new action type, it works for all three triggers automatically (shared dispatcher).
- A reviewer should confirm: keyboard activation still works (Enter/Space → tap),
  and `hasAction` correctly treats `{action:'none'}`/absent as "no action".
- The `actionHandler` directive choice (helper vs vendored) is recorded in the PR;
  if vendored, keep `src/action-handler-directive.ts` minimal and tested.
