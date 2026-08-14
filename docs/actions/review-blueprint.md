# review-blueprint

Run independent, risk-routed review over a stable blueprint snapshot and aggregate actionable findings.

## Use when

A blueprint is approaching handoff, a material module/subsystem was revised, or an existing blueprint needs readiness review. Final handoff review cannot be replaced by the generating action's self-summary.

## Inputs

Stable blueprint snapshot, requested scope, concern/risk register, source evidence, current blockers, and review depth. Bound the snapshot with the current scope, selected canonical artifacts, and `blueprint_version` when present. Refer to reviewed concerns and decisions by an existing stable ID or by `artifact#section`; review does not create IDs merely to describe coverage.

## Mechanical prerequisites

Check required artifacts for the selected depth, valid assertion/view statuses, unique IDs, resolvable references, parent/child links, omission rationale, and handoff approval boundary. Mechanical failure remains visible; it does not justify inventing missing content.

## Role routing

- `evidence-researcher`: volatile/external facts, repository claims, or conflicting sources.
- `product-challenger`: value, evidence, MVP, or scope risk.
- `domain-data-reviewer`: domain/data complexity, ownership, persistence, or contracts.
- `architecture-reviewer`: Standard/Enterprise or material system/quality boundaries.
- `consistency-auditor`: every final handoff and every major revision.

Run domain-data and architecture review independently on the same stable snapshot when both apply. Give roles only the evidence required by their contract; do not include the expected verdict.

## Review execution

Before dispatch, finish planned blueprint edits, freeze the selected inputs for this review run, and record applicability across all five roles with a reason for each omitted role. Give every applicable role the same snapshot boundary plus only its bounded evidence. If any selected input changes before aggregation, invalidate the review run and dispatch every applicable role again on one new snapshot boundary. Do not retain an old terminal report merely because its role-specific evidence appears unchanged; this action has no cross-snapshot result-reuse mode.

Only inside this multi-role review boundary, progress messages are status-only and non-authoritative. Each role returns one terminal report after completing its bounded scope, citing the reviewed existing IDs or `artifact#section` references and every unverified area. The manager waits for every required terminal report before aggregating findings or mutating the blueprint. This terminal-report rule does not restrict a specialist role invoked by another planning action to support the normal user decision loop.

## Aggregation

Deduplicate by root cause without merging distinct professional disagreements. Present severity, evidence, affected decisions/artifacts, proposed options, and unverified items. The manager explains conflicts and asks the user to decide tradeoffs.

## Verdicts

- `READY`: no unresolved blocking finding; remaining risk is explicit and actionable.
- `NEEDS_REVISION`: material content or consistency issue can be repaired within the blueprint.
- `BLOCKED`: required evidence, decision authority, or environment is unavailable.

## Outputs

Snapshot boundary, applicability record, execution/fallback record, reviewed scope references, unverified areas, findings, unresolved disagreements, verdict, and next action.

## Invariants

No role takes over user dialogue; unavailable dispatch is disclosed; no required review is silently skipped; results from different snapshot states are never aggregated; review never marks unsupported content confirmed.
