# Plan 003: Add a root `AGENTS.md` for agent-assisted development

> **Executor instructions**: Follow this plan step by step. This plan creates one
> new doc file; there is no code to change. Verify with the commands listed. When
> done, update this plan's row in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 53aff84..HEAD -- ARCHITECTURE.md package.json` — if either changed, re-read it before writing so the commands/conventions you quote are current.

## Status

- **Priority**: P3
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: dx
- **Planned at**: commit `53aff84`, 2026-06-21

## Why this matters

There is no `AGENTS.md`/`CLAUDE.md` at the repo root. The excellent
`ARCHITECTURE.md` covers structure, but agents (and new contributors) also need
the operational contract in one place: exact build/test/lint commands, the
conventions to match, and the hard "don'ts" (no co-author trailers, don't commit
the stale `dist/` without rebuilding, i18n parity). A short `AGENTS.md` that
points at `ARCHITECTURE.md` is high leverage because every future automated
change reads it first.

## Current state

- `ARCHITECTURE.md` exists and documents data flow, the file table, and
  build/test/lint commands (its "Build, test, lint" section).
- No `AGENTS.md` or root `CLAUDE.md` (`ls AGENTS.md CLAUDE.md` → not found; only
  `.claude/settings.local.json` exists).
- Commands (from `package.json` scripts, verified): `npm run build`,
  `npm run typecheck`, `npm run lint`, `npm test`, `npm run test:coverage`.
- Conventions established in the repo:
  - Conventional Commits (see `git log`: `fix(i18n): ...`, `chore(deps): ...`).
  - i18n is in-house: `src/translations/{en,fr}.json` must stay at key parity;
    French typography uses curly apostrophe `’` (U+2019) and non-breaking spaces.
  - `dist/mini-graph-card-bundle.js` is committed; rebuild it (`npm run build`)
    when source changes ship.

## Commands you will need

| Purpose        | Command                      | Expected            |
|----------------|------------------------------|---------------------|
| Confirm absent | `ls AGENTS.md`               | "No such file" before you start |
| Markdown lint  | (none configured — skip)     | —                   |

## Scope

**In scope**:
- `AGENTS.md` (create, repo root)

**Out of scope**:
- `ARCHITECTURE.md` — do not duplicate its content; link to it.
- Any `src/**`, config, or CI file.

## Git workflow

- Branch: `docs/003-agents-md`. Commit: `docs: add AGENTS.md for agent-assisted development`.
- No co-author trailer. Do not push/PR unless told.

## Steps

### Step 1: Write `AGENTS.md`

Create `AGENTS.md` at the repo root with these sections (keep it under ~60 lines;
this is a pointer doc, not a duplicate of ARCHITECTURE.md):

```markdown
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
- TypeScript strict; keep pure logic in its module (`compute`, `graph`,
  `boundaries`, `buildConfig`) and DOM/lifecycle in `main.ts` / `editor/`.
- Conventional Commits (`feat:`, `fix:`, `chore:`, `test:`, `docs:`). Never add a
  `Co-Authored-By` or any AI-signature trailer.
- i18n: every user-facing string goes through `localize(key, hass)` and lives in
  `src/translations/<lang>.json`. All language files must stay at key parity.
  French/Spanish typography: curly apostrophe `’`, non-breaking space before
  `: ; ! ?` and inside `« »`.
- The built bundle `dist/mini-graph-card-bundle.js` is committed; rebuild it when
  source changes are released.

## Don'ts
- Don't commit a `dist/` that doesn't match current source.
- Don't break EN↔FR(↔ES) translation key parity.
- Don't push or open PRs unless explicitly asked — the maintainer controls git.

See `ARCHITECTURE.md` for the data flow, file roles, and how to extend.
```

Adapt the wording if `ARCHITECTURE.md` has drifted, but keep all the command,
i18n-parity, and no-co-author points.

**Verify**: `test -f AGENTS.md && grep -q "no-co-author\|Co-Authored-By" AGENTS.md && echo ok` → `ok` (the no-co-author rule is present), and the file is under 80 lines: `[ $(wc -l < AGENTS.md) -le 80 ] && echo size-ok` → `size-ok`.

## Test plan

No automated tests. Verification is the two checks above plus a human skim that
every command in the file actually runs.

## Done criteria

- [ ] `AGENTS.md` exists at repo root
- [ ] It lists the 5 npm commands, the conventions, and the no-co-author rule
- [ ] It links to `ARCHITECTURE.md` instead of duplicating it
- [ ] `git status` shows only `AGENTS.md` added
- [ ] `plans/README.md` status row updated

## STOP conditions

- A root `CLAUDE.md` or `AGENTS.md` already exists → STOP (update it instead of creating a duplicate; report which).

## Maintenance notes

- Keep the command list in sync with `package.json` scripts.
- If a third language is added, the i18n-parity rule already covers it; no edit needed.
