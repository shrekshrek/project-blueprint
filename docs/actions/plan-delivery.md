# plan-delivery

Convert a confirmed planning baseline into learning-oriented vertical slices and an AI-ready development handoff.

## Use when

The user wants to move from blueprint decisions toward implementation planning. It may be skipped for review-only work that does not request delivery planning.

## Inputs

Confirmed charter and scope, scenarios, domain/data ownership, selected architecture views, quality risks, assumptions, blockers, dependencies, and revision state.

## Method

1. Rank delivery risks and unknowns by impact and uncertainty.
2. Define vertical slices that produce observable user or operational outcomes.
3. Link each slice to scenarios, capabilities, contexts, data, contracts, quality risks, dependencies, acceptance evidence, and learning goals.
4. Choose the first slice for maximum useful learning with acceptable risk, not merely easiest technical setup.
5. Identify decisions that may need ADRs during implementation; do not create them preemptively.
6. Build a read-first list and confirmed-contract/accepted-assumption set.
7. Keep unresolved blockers visible and attach validation actions and owners.
8. Set `development_authorization: not_granted` and `requires_development_authorization: true`; recommend but do not invoke `project-workflow`.

## Outputs

Ordered slices, first-slice rationale, validation plan, dependency/learning map, decision candidates, and development handoff.

## Completion

A fresh implementation agent can identify what to read, what to build first, how to verify it, what remains uncertain, and what it must not silently change.

## Avoid

Horizontal layer plans, “set up everything” as the first slice, hiding blockers in prose, and treating handoff generation as authorization to code.
