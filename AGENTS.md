# Project Working Agreement

This file is the cross-tool source of truth for working in this repository.

## Commands

- Full validation: `node scripts/check-all.cjs`.
- Adapter parity: `node scripts/check-adapter-parity.cjs`.
- Blueprint validator fixtures: `node scripts/check-blueprint-fixtures.cjs`.
- Forward-scenario contracts: `node scripts/check-scenario-contracts.cjs`.
- Self-contained package build check: `node scripts/build-plugin-packages.cjs --check`.
- Validate one generated blueprint: `node scripts/validate-blueprint.cjs <blueprint-directory>`.
- Validate a skill while editing it: `python3 /Users/shrekwang/.codex/skills/.system/skill-creator/scripts/quick_validate.py <skill-directory>` when that tool is available.
- Placeholder check: `rg -n '\{\{TODO|\[TODO|TODO:' docs/actions docs/reviewers docs/methodology adapters`.

## Project Structure

- Canonical action contracts: `docs/actions/`.
- Canonical support-role contracts: `docs/reviewers/`.
- Shared planning method: `docs/methodology/`.
- Claude Code runtime adapter: `adapters/claude/`.
- Codex runtime adapter: `adapters/codex/`.
- Deterministic tooling: `scripts/`.
- Validator fixtures: `tests/fixtures/`.
- Persistent product truth: `docs/specs/`.
- Durable architecture decisions: `docs/adr/`.

## Change Workflow

- Work directly from current product truth and the canonical method.
- Keep one method source; adapters may add host execution detail but must not copy action or reviewer logic.
- Update action/reviewer/methodology first, then both adapters and parity checks when the public behavior changes.
- Add or update deterministic fixtures for schema, reference, state, and packaging changes.
- Use normal implementation and review flow in this repository; do not create `feature-init` artifacts unless the user explicitly asks for them.

## Working Rules

- Read this file and any nearer nested `AGENTS.md` before editing.
- Preserve unrelated user changes.
- Prefer existing commands and conventions over invented defaults.
- Keep adapters thin, canonical references resolvable, and Claude/Codex semantics equivalent.
- Do not turn conditional roles or diagrams into mandatory checklists.
- Follow KISS; avoid renderers, services, databases, or new DSLs without demonstrated need.
- Update tests and documentation, then run the narrowest relevant checks before claiming completion.
- Do not add secrets, credentials, private data, or unsupported factual claims.
- Do not claim a check ran when it did not.
- Do not use destructive version-control commands without explicit approval.
