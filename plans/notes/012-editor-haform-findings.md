# Spike 012 — Editor migration to `ha-form` + ha-selectors — findings

Status: **desk analysis complete; prototype measurement PENDING (needs a running HA).**

> Executed without a live HA. The field→selector mapping and recommendation are
> from reading `src/editor/editor.ts`; the code-delta/UX measurement of a real
> `ha-form` prototype is **[PROTOTYPE ON HA]**. Nothing here changes shipping code.

## 1. Field inventory → `ha-form` selector mapping

The current editor (`src/editor/editor.ts`, ~960 lines after Plan 006) builds
controls by hand. Mapping of each option to the `ha-form` selector that would
replace it:

| Editor field(s) | Current control | `ha-form` selector |
|---|---|---|
| name, unit, icon_image | ha-textfield | `{ text: {} }` |
| icon | renderIconPicker | `{ icon: {} }` |
| entity (primary) | renderEntityPicker | `{ entity: {} }` |
| font_size, font_size_header, height, line_width, bar_spacing, decimals, hours_to_show, points_per_hour, update_interval, min_bound_range | ha-textfield type=number | `{ number: { mode: 'box' } }` |
| line_color | ha-textfield (comma list) | `{ text: {} }` (kept; it's a CSV) |
| lower_bound / upper_bound | ha-textfield (`~N` syntax) | `{ text: {} }` (the `~` soft-bound syntax has no selector) |
| align_header / align_icon / align_state | ha-select | `{ select: { options, mode: 'dropdown' } }` |
| aggregate_func, group_by, color_thresholds_transition, appearance | ha-select | `{ select: { … } }` |
| animate, smoothing, logarithmic, hour24, cache, compress, group | ha-switch | `{ boolean: {} }` |
| show.* (11 toggles) | ha-switch grid | `{ boolean: {} }` ×N (or a multi-select) |
| custom_color, threshold color | `<input type=color>` | `{ color_rgb: {} }` (note: rgb array vs hex string — needs conversion) |
| tap/hold/double_tap action | renderActionSection | `{ ui_action: {} }` (HA's action selector — covers all three!) |

### No clean selector (the irreducible custom parts)

- **Entity management list** (add / remove / expand-per-entity with per-entity
  name/color/attribute/y_axis/show-flags): `ha-form` has no repeating-object-list
  selector. Needs a custom sub-element OR an `entities` selector that only yields
  bare ids (losing per-entity config).
- **Color thresholds** (repeating `{ value, color }` rows): same — no
  repeating-row selector.
- **Collapsible sections UX**: `ha-form` renders flat or via `expandable` schema
  nodes; the current custom accordion would change look/feel.
- **`~N` soft-bound text syntax**: stays free-text.

## 2. Hybrid assessment

`ha-form` cleanly covers the **scalar options** (~30 fields: display, graph, data,
bounds-scalars, advanced toggles, and — nicely — all three actions via
`ui_action`). It cannot host the **two repeating lists** (entities, thresholds)
without custom elements.

**Recommendation: HYBRID.**
- Migrate the scalar sections to `getConfigForm()` + `ha-form` with an
  `expandable` schema mirroring today's sections → deletes a large chunk of
  hand-rolled control code and inherits HA-native widgets/validation/RTL.
- Keep **custom sub-elements** for the entity-management list and the threshold
  rows (the parts that make this card special), embedded around the `ha-form`.

This captures most of the code-deletion and native-widget win while preserving the
card's distinctive entity/threshold UX. A full all-`ha-form` migration is **not**
recommended (would degrade the entity/threshold editing experience).

## 3. Effort & risk (for the recommended hybrid)

- Effort: **L** (multi-PR; migrate one section at a time so the editor is never broken).
- Risk: **MED–HIGH** — it's the whole config surface; needs the full editor test
  suite green after each section and visual parity checks.
- Test impact: the existing handler-level editor tests (`_valueChanged`, etc.)
  would be replaced by `ha-form` schema + `computeLabel` tests; the entity/threshold
  custom-element tests stay.

## 4. `computeLabel` → translation-key strategy (no strings lost)

`ha-form` calls `computeLabel(schema)` per field. Map `schema.name` → the existing
`editor.*` key, e.g. a small lookup: `computeLabel = (s) => t(LABELS[s.name])`,
where `LABELS` maps each schema field name to its current `editor.labels.*` /
`editor.tap_action.*` key. This reuses all existing EN/FR/ES strings unchanged —
no new translation work, parity preserved.

## 5. Open questions for the maintainer

1. Is the custom **collapsible-section** look a requirement, or is HA's native
   `expandable` form layout acceptable (simpler, less code)?
2. Color inputs: migrate to `color_rgb` selector (rgb array) and convert to the
   stored hex string, or keep the native `<input type=color>`?
3. Appetite for a multi-PR migration vs. keeping the (now well-tested) custom editor?

## Decision

Recommend **HYBRID**, scheduled as a multi-PR effort *only if* the maintainer wants
to cut editor code / gain native selectors. The current custom editor is a valid
choice and is now covered by tests (Plan 005), so this is an optimization, not a fix.
**[PROTOTYPE ON HA]** one section (e.g. Display Options) to measure real code delta
and UX before committing to the full migration.
