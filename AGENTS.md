# AGENTS.md

Operational guide for AI agents and new contributors. Read `ARCHITECTURE.md`
first for the design; this file is the working contract.

## Commands

- Build:     `npm run build`      (Rollup → `dist/mini-graph-card-bundle.js`)
- Typecheck: `npm run typecheck`  (`tsc --noEmit`, strict)
- Lint:      `npm run lint`       (ESLint flat config, `src/**`)
- Test:      `npm test`           (Vitest)
- Coverage:  `npm run test:coverage`

All four (typecheck, lint, test, build) must pass before any change ships.

## Conventions

- TypeScript strict. Keep pure logic in its module (`compute`, `graph`,
  `boundaries`, `buildConfig`) and DOM/lifecycle in `main.ts` / `editor/`.
- Conventional Commits (`feat:`, `fix:`, `chore:`, `test:`, `docs:`, `refactor:`).
  Never add a `Co-Authored-By` or any AI-signature trailer.
- i18n: every user-facing string goes through `localize(key, hass)` and lives in
  `src/translations/<lang>.json`. All language files must stay at key parity.
  French/Spanish typography: curly apostrophe `’` (U+2019); French uses a
  non-breaking space before `: ; ! ?` and inside `« »` (Spanish does not).
- The built bundle `dist/mini-graph-card-bundle.js` is committed; rebuild it
  (`npm run build`) when source changes are released.

## Don'ts

- Don't commit a `dist/` that doesn't match current source.
- Don't break EN ↔ FR ↔ ES translation key parity.
- Don't push or open PRs unless explicitly asked — the maintainer controls git
  (no auto-commit, no auto-push, no auto-release).

See `ARCHITECTURE.md` for the data flow, file roles, and how to extend the card.
