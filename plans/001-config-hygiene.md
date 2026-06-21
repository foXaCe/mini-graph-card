# Plan 001: Remove dead config metadata (eslint ignores + HACS min version)

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving on. If a
> STOP condition occurs, stop and report — do not improvise. When done, update
> the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 53aff84..HEAD -- eslint.config.js hacs.json src/main.ts`
> If any of those changed since this plan was written, compare the "Current
> state" excerpts against the live code before proceeding; on mismatch, STOP.

## Status

- **Priority**: P3
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: tech-debt / docs
- **Planned at**: commit `53aff84`, 2026-06-21

## Why this matters

`eslint.config.js` ignores two files that no longer exist (`i18n-migrate.js`,
`i18n-patch.js`) — dead config that misleads anyone reading the lint setup.
Separately, `hacs.json` declares a minimum Home Assistant version (`2024.1.0`)
that is older than the newest frontend element the card hard-depends on
(`ha-spinner`, used unconditionally in the loading state). A user on an HA
version without `ha-spinner` would get a blank loading indicator. Aligning the
declared minimum prevents silently-broken installs.

## Current state

- `eslint.config.js:6-15` — the `ignores` array:
  ```js
  ignores: [
    'dist/**',
    'coverage/**',
    'node_modules/**',
    '**/*.config.js',
    'i18n-migrate.js',   // <-- file does not exist
    'i18n-patch.js',     // <-- file does not exist
    'scripts/**',
  ],
  ```
  Confirm absence: `ls i18n-migrate.js i18n-patch.js` → both "No such file".
- `hacs.json` (whole file):
  ```json
  {
      "name": "mini-graph-card",
      "render_readme": true,
      "homeassistant": "2024.1.0",
      "filename": "mini-graph-card-bundle.js"
  }
  ```
- `src/main.ts:423` — the hard dependency that sets the real floor:
  ```ts
  : html`<ha-spinner aria-label="${localize('card.a11y.loading', this._hass)}" size="small"></ha-spinner>`;
  ```
  `ha-spinner` replaced `ha-circular-progress` in HA frontend around **2025.3**.

## Commands you will need

| Purpose   | Command            | Expected on success |
|-----------|--------------------|---------------------|
| Lint      | `npm run lint`     | exit 0, no output   |
| Typecheck | `npm run typecheck`| exit 0              |
| JSON valid| `node -e "JSON.parse(require('fs').readFileSync('hacs.json','utf8'))"` | exit 0 |

## Scope

**In scope**:
- `eslint.config.js`
- `hacs.json`

**Out of scope** (do NOT touch):
- Any `src/**` file — this is config-only.
- `package.json` `engines` — node version is unrelated to the HA runtime floor.

## Git workflow

- Branch: `feat/001-config-hygiene` (repo workflow is main-only; create a branch anyway for a clean diff).
- Conventional-commit message, e.g. `chore: drop dead eslint ignores and fix hacs min HA version`.
- **No co-author / no AI signature trailer.** Do NOT push or open a PR unless the operator says so.

## Steps

### Step 1: Remove the two stale ignore entries

In `eslint.config.js`, delete the lines `'i18n-migrate.js',` and
`'i18n-patch.js',` from the `ignores` array. Leave every other entry intact.

**Verify**: `npm run lint` → exit 0 (no new errors), and
`grep -c "i18n-migrate\|i18n-patch" eslint.config.js` → `0`.

### Step 2: Raise the HACS minimum HA version

In `hacs.json`, change `"homeassistant": "2024.1.0"` to `"homeassistant": "2025.3.0"`.

If you cannot confirm that `ha-spinner` shipped in 2025.3 (it is the load-bearing
constraint), STOP and ask the maintainer for the intended minimum rather than
guessing a different value.

**Verify**: `node -e "console.log(JSON.parse(require('fs').readFileSync('hacs.json','utf8')).homeassistant)"` → `2025.3.0`.

## Test plan

No unit tests apply (config/metadata only). Verification is the lint + JSON-parse
commands above. Do not add tests.

## Done criteria

ALL must hold:

- [ ] `npm run lint` exits 0
- [ ] `grep -c "i18n-migrate\|i18n-patch" eslint.config.js` returns `0`
- [ ] `hacs.json` `homeassistant` is `2025.3.0` and the file still parses as JSON
- [ ] `git status` shows only `eslint.config.js` and `hacs.json` modified
- [ ] `plans/README.md` status row updated

## STOP conditions

- `i18n-migrate.js` or `i18n-patch.js` actually exists (the ignore is not stale) → STOP.
- You cannot confirm the HA version where `ha-spinner` was introduced → STOP, ask.
- `npm run lint` fails after Step 1 → STOP (the ignore removal exposed a real lint error elsewhere; report it).

## Maintenance notes

- If a future change reintroduces a root-level script that should be lint-ignored, add it back explicitly.
- The HACS minimum should be revisited whenever the card adopts a newer `ha-*` element; keep it in sync with the newest hard-required frontend dependency.
