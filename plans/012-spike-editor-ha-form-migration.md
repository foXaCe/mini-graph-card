# Plan 012 (SPIKE): Evaluate migrating the editor to `ha-form` + ha-selectors

> **Executor instructions**: This is a SPIKE / design plan — the deliverable is a
> written recommendation and a mapping table, NOT a rewritten editor. Do not delete
> or rewrite `editor.ts`. Update this plan's row in `plans/README.md` when the
> writeup exists.

## Status

- **Priority**: P3
- **Effort**: M (timebox: ~1 day for the evaluation)
- **Risk**: LOW (spike) — the eventual migration would be HIGH risk, which is
  exactly why it's a spike first
- **Depends on**: none
- **Category**: direction / tech-debt
- **Planned at**: commit `53aff84`, 2026-06-21

## Why this matters

The visual editor is a ~906-line hand-rolled component (`src/editor/editor.ts`)
that manually builds `ha-textfield`/`ha-select`/`ha-switch` controls, manual change
handlers, and has already needed bug fixes (the `ha-select` mount re-fire guard).
The modern HA approach is `getConfigForm()` returning an `ha-form` schema driven by
ha-selectors (entity/icon/color/select/boolean/number), which would cut a large
amount of code and inherit HA-native widgets and validation. But a full custom
editor is a legitimate choice for a card this configurable (threshold rows, the
entity-management list, collapsible sections), so this needs evaluation before a
costly rewrite. Output: a recommendation + a field→selector mapping, not a rewrite.

## Current state (context)

- `src/main.ts:905-907` — `getConfigElement()` returns the custom
  `mini-graph-card-editor` element. There is NO `getConfigForm()`.
- `src/editor/editor.ts` — the custom editor: `render*Section()` per collapsible
  section (display/graph/data/bounds/colors/advanced/entities), `SIMPLE_GETTERS`
  (867-896), and many change handlers.
- Hard-to-selector parts (the crux of the evaluation):
  - the **entity management list** (add/remove/expand per-entity config),
  - the **color thresholds** repeating rows with a native color input,
  - the **collapsible sections** UX,
  - the **tap/hold/double-tap** action sub-forms (after Plan 006).
- i18n: all editor labels already flow through `localize` (`t(...)`); an `ha-form`
  schema would need a `computeLabel`/`computeHelper` that maps schema names to the
  same translation keys.

## Deliverable

A markdown writeup at `plans/notes/012-editor-haform-findings.md` with:

1. **Field inventory → selector mapping**: a table of every current editor field →
   the `ha-form` selector that would replace it (`selector: { entity: {} }`,
   `{ icon: {} }`, `{ color_rgb: {} }`, `{ select: {...} }`, `{ boolean: {} }`,
   `{ number: {...} }`, `{ text: {} }`), with a "no clean selector" column for the
   parts that can't map (entity list, threshold rows, sections).
2. **Hybrid assessment**: can `getConfigForm()` cover the simple fields while a
   small custom element handles the irreducible parts (entity list, thresholds)?
   Or is it all-or-nothing? Recommend one of: (a) full `ha-form` migration,
   (b) hybrid (`ha-form` for scalar options + custom for lists), (c) keep custom.
3. **Effort + risk** for the recommended option (files touched, test impact, the
   i18n `computeLabel` wiring, loss/retention of the premium editor styling).
4. **`computeLabel` strategy**: how schema field names map back to existing
   `editor.*` translation keys so no strings are lost.
5. **Open questions** for the maintainer (e.g. is the custom collapsible-section UX
   a requirement, or acceptable to drop for HA-native expansion panels?).

Optionally: a throwaway branch `spike/012-haform` migrating ONE section
(e.g. Display Options) to `getConfigForm`/`ha-form` to measure real code delta and
UX, referenced from the writeup — NOT merged.

## Commands you will need

| Purpose           | Command                | Expected          |
|-------------------|------------------------|-------------------|
| Typecheck (proto) | `npm run typecheck`    | exit 0 (if prototyping) |
| Tests             | `npm test`             | unchanged, all pass |

## Scope

**In scope**:
- `plans/notes/012-editor-haform-findings.md` (create)
- Optional throwaway branch `spike/012-haform` (ONE section, NOT merged)

**Out of scope**:
- Any mergeable change to `src/editor/**` or `src/main.ts`. The custom editor keeps
  shipping until a migration is approved.

## Steps

1. Inventory every editor field and map it to an ha-form selector (or mark "no clean selector").
2. Prototype one section via `getConfigForm`/`ha-form` on a throwaway branch; measure code delta + UX + i18n wiring.
3. Decide full / hybrid / keep-custom; estimate effort + risk for the choice.
4. Write `plans/notes/012-editor-haform-findings.md` with the mapping table, recommendation, and open questions.

## Done criteria

- [ ] `plans/notes/012-editor-haform-findings.md` exists with the mapping table + a clear recommendation (full / hybrid / keep)
- [ ] The irreducible parts (entity list, thresholds, sections) are explicitly addressed
- [ ] `computeLabel`→translation-key strategy is described (no strings lost)
- [ ] No mergeable `src/editor/**` change landed
- [ ] `plans/README.md` status row updated

## STOP conditions

- The prototype shows ha-form cannot host the entity-management list or threshold
  rows acceptably → record "keep custom (or hybrid)" as the finding and stop; do
  not force a worse UX for less code.
- Timebox exceeded → write up the mapping done so far + a provisional recommendation.

## Maintenance notes

- If the recommendation is "migrate", it becomes one or more build plans (per
  section) so the editor is never broken mid-migration.
- Whatever the outcome, the field→selector mapping table is reusable documentation.
