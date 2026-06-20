# Architecture — mini-graph-card

A minimalistic, customizable graph **Lovelace card** for Home Assistant. Pure
frontend: it renders an SVG graph from Home Assistant entity history. There is
**no Python / custom integration** side — it ships as a single JavaScript bundle
loaded as a Lovelace resource.

- **Framework**: `lit-element` 2.x (web components)
- **Build**: Rollup (bundle) → Babel + `babel-preset-minify` (minify), output to `dist/`
- **Lint**: ESLint (airbnb-base) over all of `src/`
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
| `main.js` | `MiniGraphCard` web component: lifecycle, reactive state, `render()`, data orchestration (`updateData`/`updateEntity`), tooltip, card size. Delegates pure logic to the modules below. |
| `graph.js` | `Graph` class: history bucketing, aggregation functions, and path/points/bars/fill/gradient geometry. One instance per entity. |
| `buildConfig.js` | Normalizes the raw user config into a complete internal config (defaults, entity/state_map normalization, threshold interpolation). |
| `compute.js` | Pure presentation helpers: `color`, `name`, `icon`, `uom`, `state`, `numberFormat`. |
| `boundaries.js` | Pure Y-axis boundary math: `getBoundary`, `getBoundaries` (fixed / dynamic / `~soft` bounds, `min_bound_range`). |
| `dataSource.js` | Data access: `fetchRecent` (HA history API) and `getCache`/`setCache` (localForage, injectable store for tests). |
| `renderSvg.js` | SVG rendering fragments (fill, line, points, bars, gradient). Takes the card instance; entry point `renderSvg(card)`. |
| `handleClick.js` | Tap-action dispatcher (`more-info`, `navigate`, `call-service`, `url`, `fire-dom-event`). |
| `const.js` | Constants (icons, default colors, default `show`, axis index constants). |
| `localize.js` | i18n: `resolveLang`, `localize(key, hass, params)`. |
| `utils.js` | Small pure helpers (min/avg/max, time, compress/decompress, array compare). |
| `initialize.js` | Module side-effects: purge stale cache entries + version banner. |
| `style.js` | Card CSS (`lit` `css`). |
| `editor/editor.js` | `MiniGraphCardEditor` visual editor component: config getters, change handlers, and one `render*Section()` method per collapsible section. |
| `editor/styles.js` | Visual editor CSS. |
| `editor/helpers.js` | Pure entity-metadata helpers (`getEntityInfo`, `getDefaultIcon`). |
| `translations/{en,fr}.json` | Translation dictionaries (hierarchical keys). |

The card and its editor ship in a **single bundle**: `main.js` imports
`./editor/editor`, so `dist/mini-graph-card-bundle.js` registers both
`mini-graph-card` and `mini-graph-card-editor`.

## How to extend

- **Add an aggregate function**: add a method on `Graph` and register it in the
  `aggregateFuncMap` in the constructor; expose the option in `editor/editor.js`
  (`renderDataSection`) and add its translations.
- **Add a config option**: give it a default in `buildConfig.js`, read it where
  needed, and (if user-facing) add an input in the relevant `render*Section()` of
  the editor plus `en.json`/`fr.json` strings. Simple editor getters are
  generated from `SIMPLE_GETTERS` at the bottom of `editor/editor.js`.
- **Add an SVG visual**: add a fragment function in `renderSvg.js` and call it
  from `renderSvg(card)`.
- **Add a language**: drop `src/translations/<lang>.json` and register it in the
  `LANGUAGES` map in `localize.js`.

## Build, test, lint

```bash
npm run build          # lint → rollup → babel-minify → dist/
npm run rollup         # bundle only (fast, un-minified)
npm run lint           # eslint over src/
npm test               # vitest run
npm run test:coverage  # vitest + coverage
```
