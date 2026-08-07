# Project Blueprint — Current Product Truth

## Purpose

Project Blueprint is the pre-development companion to `project-workflow`. It helps a user and AI establish an evidence-backed, AI-readable planning contract before feature delivery begins.

## Current scope: v0.2.1

- Nine user-callable planning skills with `plan-project` as the adaptive conversation manager.
- Five conditional internal support roles: evidence research, product challenge, domain/data review, architecture review, and consistency audit.
- One canonical methodology core shared by native Claude Code and Codex adapters.
- Inputs may be an idea, requirements, research, an existing blueprint, or an unstable project needing re-baselining.
- Canonical outputs are composable Markdown, YAML, and Mermaid artifacts.
- Artifact density follows project risk and ownership: lean work merges outputs, while focused files or subsystem packages require a real boundary.
- Planning covers feasibility, users/scenarios, journeys, capabilities/modules, domain ownership, concern-driven architecture/data views, quality risks, subsystem depth, revision impact, vertical slices, and development handoff.
- A deterministic validator checks manifest fields, canonical file existence, view dispositions, revisit triggers, and the handoff approval boundary.
- Blueprint approval and development authorization are separate; development begins only after explicit authorization.
- GitHub marketplace indexes route Claude Code and Codex to host-specific, self-contained packages generated on the `plugin-dist` branch by versioned release CI.

## Product invariants

1. `plan-project` owns the user conversation; specialist actions and support roles return bounded results.
2. Evidence, assumptions, deferred decisions, exclusions, and source conflicts remain distinguishable.
3. Cross-artifact concepts use stable identifiers only when references or revisions require them.
4. Diagrams never exist without an AI-readable textual definition.
5. Architecture and data views answer stakeholder concerns and risks; no fixed diagram count defines completeness.
6. ER and DDD are conditional tools, not mandatory artifacts for every project.
7. Multi-subsystem planning establishes global black-box contracts before selected deep dives; child scopes cannot silently override parent contracts.
8. Confirmed revisions require impact analysis and consistency closure.
9. Claude and Codex adapters share one canonical action/reviewer/methodology core.
10. The plugin may recommend the target-appropriate `project-workflow` entry action but may not mutate an implementation project without separate development authorization.
11. Action count never determines file count; each decision has one owning artifact and other artifacts reference it instead of repeating it.
12. `main` owns canonical source; generated install packages live only on `plugin-dist` and must match both source manifest versions.

## Deferred

- Interactive HTML blueprint renderer and visual editor.
- Database-backed or long-running planning service.
- Importers for arbitrary existing requirements and architecture tools.
- Industry-specific reviewer packs.
- A richer schema and reference validator beyond evidence from real generated blueprints.
