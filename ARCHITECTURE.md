# Architecture — mini-graph-card

A minimalistic, customizable graph **Lovelace card** for Home Assistant. Pure
frontend: it renders an SVG graph from Home Assistant entity history. There is
**no Python / custom integration** side — it ships as a single JavaScript bundle
loaded as a Lovelace resource.

- **Language**: TypeScript 5 (strict) — types in `src/types.ts`
- **Framework**: `lit` 3.x (web components)
- **Build**: Rollup 4 + `@rollup/plugin-typescript` → terser (ES2022), single bundle in `dist/`
- **Lint**: ESLint 9 (flat config) + typescript-eslint over `src/`
- **Tests**: Vitest (+ jsdom for component suites)
- **i18n**: in-house — `src/translations/<lang>.json` + `localize(key, hass)`

## Data flow

```
Home Assistant (hass)
   │  set hass  ──► queues changed entities
   ▼
MiniGraphCard.updateData()            (src/main.js — orchestration)
   │
   ├─ dataSource.fetchRecent(hass, …) ─► HA history/period API
   ├─ dataSource.getCache/setCache     ─► localForage (optional, config.cache)
   │
   ▼
Graph (src/graph.js)                  one instance per entity
   │  history → bucketed → aggregated (avg/min/max/median/…) → coords
   ▼
boundaries.getBoundaries()            Y-axis min/max per axis
   │
   ▼
render()  ──► renderSvg(card)         (src/renderSvg.js — SVG fragments)
   │     ──► compute.* for colors/labels/units/state formatting
   ▼
<ha-card> shadow DOM
```

## Files (`src/`)

| File | Role |
|------|------|
| `main.ts` | `MiniGraphCard` web component: lifecycle, reactive state, `render()`, data orchestration (`updateData`/`updateEntity`), tooltip, card size. Delegates pure logic to the modules below. |
| `graph.ts` | `Graph` class: history bucketing, aggregation functions, and path/points/bars/fill/gradient geometry. One instance per entity. |
| `buildConfig.ts` | Normalizes the raw user config into a complete internal config (defaults, entity/state_map normalization, threshold interpolation). |
| `compute.ts` | Pure presentation helpers: `color`, `name`, `icon`, `uom`, `state`, `numberFormat`. |
| `boundaries.ts` | Pure Y-axis boundary math: `getBoundary`, `getBoundaries` (fixed / dynamic / `~soft` bounds, `min_bound_range`). |
| `dataSource.ts` | Data access: `fetchRecent` (HA history API) and `getCache`/`setCache` (localForage, injectable store for tests). |
| `renderSvg.ts` | SVG rendering fragments (fill, line, points, bars, gradient). Takes the card instance; entry point `renderSvg(card)`. |
| `handleClick.ts` | Tap-action dispatcher (`more-info`, `navigate`, `call-service`, `url`, `fire-dom-event`). |
| `const.ts` | Constants (icons, default colors, default `show`, axis index constants). |
| `localize.ts` | i18n: `resolveLang`, `localize(key, hass, params)`. |
| `utils.ts` | Small pure helpers (min/avg/max, time, compress/decompress, array compare). |
| `initialize.ts` | Module side-effects: purge stale cache entries + version banner. |
| `style.ts` | Card CSS (`lit` `css`). |
| `editor/editor.ts` | `MiniGraphCardEditor` visual editor component: config getters, change handlers, and one `render*Section()` method per collapsible section. |
| `editor/styles.ts` | Visual editor CSS. |
| `editor/helpers.ts` | Pure entity-metadata helpers (`getEntityInfo`, `getDefaultIcon`). |
| `translations/{en,fr}.json` | Translation dictionaries (hierarchical keys). |

The card and its editor ship in a **single bundle**: `main.ts` imports
`./editor/editor`, so `dist/mini-graph-card-bundle.js` registers both
`mini-graph-card` and `mini-graph-card-editor`.

## How to extend

- **Add an aggregate function**: add a method on `Graph` and register it in the
  `aggregateFuncMap` in the constructor; expose the option in `editor/editor.ts`
  (`renderDataSection`) and add its translations.
- **Add a config option**: give it a default in `buildConfig.ts`, read it where
  needed, and (if user-facing) add an input in the relevant `render*Section()` of
  the editor plus `en.json`/`fr.json` strings. Simple editor getters are
  generated from `SIMPLE_GETTERS` at the bottom of `editor/editor.ts`.
- **Add an SVG visual**: add a fragment function in `renderSvg.ts` and call it
  from `renderSvg(card)`.
- **Add a language**: drop `src/translations/<lang>.json` and register it in the
  `LANGUAGES` map in `localize.ts`.

## Build, test, lint

```bash
npm run build          # rollup 4 + typescript + terser → dist/ (ES2022)
npm run typecheck      # tsc --noEmit (strict type-check, no output)
npm run lint           # eslint (flat config) over src/
npm test               # vitest run
npm run test:coverage  # vitest + coverage
```
