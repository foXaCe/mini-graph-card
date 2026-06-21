# Plan 010: Add Spanish (`es`) translation

> **Executor instructions**: Follow step by step, verifying each step. Parity with
> `en.json` is the hard requirement. Update this plan's row in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 53aff84..HEAD -- src/translations src/localize.ts`
> If `en.json` changed, your `es.json` must match its CURRENT keys, not the excerpt below.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none (but if 002/006/008 land first, `en.json` gains keys that
  `es.json` must also include — do this LAST, or re-sync parity after)
- **Category**: feature / i18n
- **Planned at**: commit `53aff84`, 2026-06-21

## Why this matters

The i18n infrastructure is built and language-agnostic, but only English and
French ship. Spanish is one of the largest HA user bases. Adding it is pure upside:
create one JSON file at key-parity with `en.json` and register it — no code logic
changes. The maintainer has asked specifically for **EN + FR + ES**.

## Current state

- `src/localize.ts:6-12` — the language registry:
  ```ts
  import en from './translations/en.json';
  import fr from './translations/fr.json';
  ...
  const LANGUAGES: Record<string, TranslationDict> = { en, fr };
  const DEFAULT_LANG = 'en';
  ```
- `resolveLang` (localize.ts:16-23) normalizes `es-ES` → `es` and falls back to
  `en` for unknown languages — so once `es` is registered, Spanish HA installs
  resolve automatically.
- `src/translations/en.json` is the source of truth: a nested object,
  **131–134 leaf keys** under `editor.*` and `card.*` (the exact count depends on
  which of plans 002/006/008 have landed). `fr.json` mirrors it exactly.
- Typography rules (from `fr.json`): curly apostrophe `’` is fine for Spanish too,
  but Spanish does **not** use a non-breaking space before `:`/`?`/`!` and uses
  opening marks `¿`/`¡` for questions/exclamations. Match Spanish norms, not French.
- A parity/lint helper already exists in the project's i18n tooling (the EN↔FR
  parity check used elsewhere); reuse the same approach for ES.

## Commands you will need

| Purpose      | Command                  | Expected         |
|--------------|--------------------------|------------------|
| Typecheck    | `npm run typecheck`      | exit 0           |
| Tests        | `npm test`               | all pass         |
| Build        | `npm run build`          | bundle written   |
| Parity check | (script in Step 2)       | EN==ES, 0 diffs  |

## Scope

**In scope**:
- `src/translations/es.json` (create)
- `src/localize.ts` (register `es`)
- `tests/localize.test.js` (add an `es` resolution/lookup case)

**Out of scope**:
- `en.json` / `fr.json` content — do not edit (only read `en.json` as the template).
- The README language list (optional doc follow-up, not required here).

## Git workflow

- Branch: `feat/010-spanish`. Commit: `feat(i18n): add Spanish (es) translation`.
- No co-author trailer. Do not push/PR unless told.

## Steps

### Step 1: Create `es.json` mirroring `en.json`'s structure

Copy the full nested structure of `src/translations/en.json` into
`src/translations/es.json` and translate every leaf value to Spanish. Keep:
- the exact same keys and nesting (parity is enforced in Step 2),
- placeholders intact (`{url}`, `{name}`, `{current}`, `{min}`, `{max}`, `{hours}`),
- technical config keys in English where the FR file keeps them in `« »` (e.g.
  `entities`, `color_thresholds`, `value`) — use Spanish angle quotes or plain
  quotes consistently with how you render them.

Reference translations (sections): `editor.sections` → e.g. "Entities"→"Entidades",
"Display Options"→"Opciones de visualización", "Graph Settings"→"Ajustes del
gráfico"; common buttons "Add Entity"→"Añadir entidad", "Remove"→"Eliminar";
`card.error.invalid_config`→"Configuración no válida.". Keep brand terms
("Mini Graph Card", "Home Assistant") untranslated. Use natural, formal-neutral
Spanish (usted-neutral, consistent register).

**Verify**: `node -e "JSON.parse(require('fs').readFileSync('src/translations/es.json','utf8'))"` → exit 0 (valid JSON).

### Step 2: Enforce EN↔ES key parity

Run a parity check (leaf-key diff) — model it on the project's existing EN↔FR
check:
```bash
node -e "
const flat=(o,p='')=>Object.entries(o).reduce((a,[k,v])=>{const n=p?p+'.'+k:k;return Object.assign(a,typeof v==='object'?flat(v,n):{[n]:1})},{});
const en=Object.keys(flat(require('./src/translations/en.json')));
const es=Object.keys(flat(require('./src/translations/es.json')));
const miss=en.filter(k=>!es.includes(k)), extra=es.filter(k=>!en.includes(k));
if(miss.length||extra.length){console.error('missing',miss,'extra',extra);process.exit(1)}
console.log('parity OK',en.length);
"
```
Fix `es.json` until this prints `parity OK`.

**Verify**: the command above exits 0 with `parity OK`.

### Step 3: Register `es` in localize.ts

In `src/localize.ts`, add `import es from './translations/es.json';` and include
`es` in the `LANGUAGES` map: `{ en, fr, es }`.

**Verify**: `npm run typecheck` → exit 0.

### Step 4: Test Spanish resolution

In `tests/localize.test.js`, add cases mirroring the French ones:
`resolveLang({ locale: { language: 'es' } })` → `'es'`;
`resolveLang({ locale: { language: 'es-ES' } })` → `'es'`;
`typeof localize('editor.buttons.add_entity', { locale:{language:'es'} })` is a
non-empty string and differs from the English value.

**Verify**: `npm test -- localize` → passes; `npm run build` → bundle written.

## Test plan

- `tests/localize.test.js`: `es` and `es-ES` resolution + a Spanish lookup.
- Parity check (Step 2) is part of done criteria.

## Done criteria

- [ ] `src/translations/es.json` exists and is valid JSON
- [ ] EN↔ES parity check passes (`parity OK`, same key count as EN)
- [ ] `es` registered in `localize.ts` LANGUAGES map
- [ ] `npm run typecheck` / `npm test` / `npm run build` all pass; new `es` tests present
- [ ] `plans/README.md` status row updated

## STOP conditions

- `en.json` has keys you cannot confidently translate (domain ambiguity) → STOP and
  ask, rather than shipping a wrong Spanish string.
- Parity cannot be reached because `en.json` changed mid-flight → re-pull and match
  the current `en.json`, do not hand-pick keys.

## Maintenance notes

- Any future user-facing string added to `en.json` must also be added to `fr.json`
  AND `es.json` — the parity check should run in CI (consider wiring it if not already).
- If a fourth language is added later, this plan is the template.
