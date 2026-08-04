# Project Working Agreement

This file is the cross-tool source of truth for working in this repository. Keep it short and replace deferred entries when repository evidence exists.

## Commands

- Build: none; the current repository is a content-only Codex plugin.
- Plugin validation: run the `plugin-creator` validator available in the active Codex installation against the repository root.
- Skill validation: run the `skill-creator` validator available in the active Codex installation against `skills/plan-project/`.
- Metadata syntax: `python3 -m json.tool .codex-plugin/plugin.json`.
- Placeholder check: `rg -n '\[TODO|TODO:' .codex-plugin skills` must return no matches before release.

## Project Structure

- Plugin metadata: `.codex-plugin/plugin.json`.
- Skill source: `skills/plan-project/`.
- Skill contract references: `skills/plan-project/references/`.
- No automated test suite exists yet.
- Persistent product truth: `docs/specs/`.
- Active tracked changes: `docs/specs/changes/`.
- Durable architecture decisions: `docs/adr/`.

## Change Workflow

- Make tiny, local, low-risk fixes directly, including reversible behavior work not declared in current truth, and report the checks run.
- When a new feature or durable behavior change may need tracked acceptance, cross-session handoff, current-truth synchronization, or contract/risk protection, use the host's `feature-init` action to choose no-artifact/direct work, a light tracked change, or a full spec/plan/tasks change.
- Resolve current behavior from `docs/specs/` and the selected active feature; exclude `docs/specs/changes/archive/` unless tracing history.
- If direct or light work grows into contract-shaped, cross-module, architecture, data, security, or other high-risk scope, stop and upgrade the lane before continuing.

## Working Rules

- Read this file and any nearer nested `AGENTS.md` before editing.
- Preserve unrelated user changes.
- Prefer existing project commands and conventions over invented defaults.
- Keep generated files and historical artifacts unchanged unless the task explicitly targets them.
- Follow KISS: make the smallest sufficient, coherent change that solves the task and preserves relevant contracts; avoid speculative abstraction, unrelated refactors, and scope expansion.
- For domain-rich code, prefer domain-oriented modules and consistent language across specs, code, APIs, and tests.
- Respect established module boundaries: keep behavior and invariants with their owner, and use public interfaces instead of another module's internals.
- Update necessary tests and documentation, then run the narrowest relevant checks before claiming completion.
- Cite concrete evidence when a required check cannot run.

## Boundaries

- Do not add secrets, credentials, or private data.
- Do not claim a check ran when it did not.
- Do not use destructive version-control commands without explicit approval.
