# Project Working Agreement

This file is the cross-tool source of truth for working in this repository.

## Commands

- Full validation: `node scripts/check-all.cjs`.
- Blueprint validator fixtures: `node scripts/check-blueprint-fixtures.cjs`.
- Forward-scenario contracts: `node scripts/check-scenario-contracts.cjs`.
- Self-contained package build check: `node scripts/build-skills.cjs --check`.
- Validate one generated blueprint: `node scripts/validate-blueprint.cjs <blueprint-directory>`.
- Validate a skill while editing it: `python3 /Users/shrekwang/.codex/skills/.system/skill-creator/scripts/quick_validate.py <skill-directory>` when that tool is available.
- Placeholder check: `rg -n '\{\{TODO|\[TODO|TODO:' docs/actions docs/reviewers docs/methodology entries`.

## Project Structure

- Canonical action contracts: `docs/actions/`.
- Canonical support-role contracts: `docs/reviewers/`.
- Shared planning method: `docs/methodology/`.
- Portable skill entry points: `entries/`.
- Deterministic tooling: `scripts/`.
- Validator fixtures: `tests/fixtures/`.
- Persistent product truth: `docs/specs/`.
- Durable architecture decisions: `docs/adr/`.

## Change Workflow

- Work directly from current product truth and the canonical method.
- Maintain action and reviewer logic once in their canonical contracts.
- Update action/reviewer/methodology first, then the affected skill entries and checks when the public behavior changes.
- Add or update deterministic fixtures for schema, reference, state, and packaging changes.
- Use `release: vX.Y.Z ...` only for an intentional release; update `VERSION` in the same commit. CI publishes generated packages to `skills-dist`.
- Use normal implementation and review flow in this repository; do not create `feature-init` artifacts unless the user explicitly asks for them.

## Working Rules

- Read this file and any nearer nested `AGENTS.md` before editing.
- Preserve unrelated user changes.
- Prefer existing commands and conventions over invented defaults.
- Keep entries thin and canonical references resolvable in each installed skill.
- Do not turn conditional roles or diagrams into mandatory checklists.
- Follow KISS; avoid renderers, services, databases, or new DSLs without demonstrated need.
- Update tests and documentation, then run the narrowest relevant checks before claiming completion.
- Do not add secrets, credentials, private data, or unsupported factual claims.
- Do not claim a check ran when it did not.
- Do not use destructive version-control commands without explicit approval.
