# Project Blueprint — Current Product Truth

## Purpose

Project Blueprint is the pre-development companion to `project-workflow`. It produces an evidence-backed, AI-readable planning contract before feature delivery begins.

## Current scope: v0.1

- One Codex skill: `$plan-project`.
- Inputs: a project idea, requirements, research, or an existing proposal needing re-baselining.
- Canonical outputs: versioned Markdown, YAML, and Mermaid files defined by the blueprint contract.
- Core stages: feasibility, scenarios and journeys, scope and capabilities, domain boundaries, architecture, data model, quality risks, MVP slices, and development handoff.
- Development begins only after explicit user confirmation.

## Product invariants

1. Evidence, assumptions, deferred decisions, and exclusions remain distinguishable.
2. Cross-document concepts use stable identifiers.
3. Diagrams never exist without an AI-readable textual definition.
4. Architecture and data details are proportional to validated risks and the first delivery slice.
5. Rendered HTML is a view over canonical source, never an independent source of truth.
6. The plugin may recommend `project-workflow` but may not mutate an implementation project without user confirmation.

## Deferred

- Interactive HTML blueprint renderer.
- Automated schema and cross-reference linter.
- Importers for existing requirements and architecture artifacts.
- Templates tailored to regulated, data-platform, AI/RAG, or integration-heavy projects.
