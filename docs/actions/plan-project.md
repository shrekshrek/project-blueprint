# plan-project

Adaptive manager for creating, resuming, revising, or reviewing an AI-ready project blueprint.

## Use when

- a software project starts from an idea or broad requirements;
- an existing project needs re-baselining after scope or schema churn;
- a partial blueprint needs to resume;
- the user wants readiness review without starting implementation.

Do not use for ordinary feature planning inside a stable project.

## Required references

Read all four files in `docs/methodology/` and the action spec for any specialist action before invoking it.

## Inputs

User context, optional existing blueprint, repository evidence, preferred interaction style, requested scope, and any time/risk constraints.

## Workflow

1. Detect `greenfield`, `rebaseline`, or `review`; ingest existing answers and evidence.
2. Summarize current truth, assumptions, conflicts, exclusions, blockers, and current scope.
3. Choose an artifact-density strategy from project risk and ownership, then build an applicability map for the other eight actions. An action may update a merged artifact; action count never determines file count.
4. Select the unresolved decision with the highest impact, uncertainty, irreversibility, cross-boundary reach, or blocking effect.
5. Explain the recommended next action and invoke it with bounded inputs.
6. Update blueprint state only after showing the proposed decision/status changes to the user.
7. Pause, skip, deepen a subsystem, or revisit an earlier decision when requested.
8. Before handoff, invoke `review-blueprint` at a risk-appropriate depth and run structural validation when available.
9. Remove repeated narrative and present confirmed decisions, assumptions, deferred items, blockers, first slice, and read-first list.
10. Ask the user to approve the blueprint content. After approval, offer a separate option to authorize development; record the answer but never invoke another workflow automatically.

## Outputs

Updated blueprint state, action/applicability record, artifact/view decisions, revision history when applicable, review result, and development handoff.

## Completion

The blueprint is sufficient for the next safe development decision and the user has explicitly approved its content. Development authorization may remain `not_granted`; completeness is not measured by executing every action.

## Invariants

- Keep user conversation ownership.
- Do not hide conflicting specialist findings.
- Do not mark unsupported decisions `confirmed`.
- Do not expand every subsystem automatically.
- Do not create one file per action or restate owned decisions in the handoff and review.
- Do not mutate an implementation repository.
