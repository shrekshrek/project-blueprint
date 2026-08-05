# review-blueprint

Run independent, risk-routed review over a stable blueprint snapshot and aggregate actionable findings.

## Use when

A blueprint is approaching handoff, a material module/subsystem was revised, or an existing blueprint needs readiness review. Final handoff review cannot be replaced by the generating action's self-summary.

## Inputs

Stable blueprint snapshot, requested scope, concern/risk register, source evidence, current blockers, and review depth.

## Mechanical prerequisites

Check required artifacts for the selected depth, valid assertion/view statuses, unique IDs, resolvable references, parent/child links, omission rationale, and handoff approval boundary. Mechanical failure remains visible; it does not justify inventing missing content.

## Role routing

- `evidence-researcher`: volatile/external facts, repository claims, or conflicting sources.
- `product-challenger`: value, evidence, MVP, or scope risk.
- `domain-data-reviewer`: domain/data complexity, ownership, persistence, or contracts.
- `architecture-reviewer`: Standard/Enterprise or material system/quality boundaries.
- `consistency-auditor`: every final handoff and every major revision.

Run domain-data and architecture review independently on the same stable snapshot when both apply. Give roles only the evidence required by their contract; do not include the expected verdict.

## Aggregation

Deduplicate by root cause without merging distinct professional disagreements. Present severity, evidence, affected decisions/artifacts, proposed options, and unverified items. The manager explains conflicts and asks the user to decide tradeoffs.

## Verdicts

- `READY`: no unresolved blocking finding; remaining risk is explicit and actionable.
- `NEEDS_REVISION`: material content or consistency issue can be repaired within the blueprint.
- `BLOCKED`: required evidence, decision authority, or environment is unavailable.

## Outputs

Applicability record, execution/fallback record, findings, unresolved disagreements, verdict, and next action.

## Invariants

No role takes over user dialogue; unavailable dispatch is disclosed; no required review is silently skipped; review never marks unsupported content confirmed.
