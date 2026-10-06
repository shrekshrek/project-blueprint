# Forward scenarios

These scenarios test whether Project Blueprint routes and scopes planning appropriately. Evaluation inputs and scoring oracles are deliberately separated.

All scenarios enter through `plan-project`. Oracle `expected_actions` lists only specialist actions selected by the manager, so it never repeats `plan-project`.

## Integrity

- Give the planning agent only one file from `inputs/`, the installed plugin, and explicitly allowed project evidence.
- Do not give it `oracles/`, known defects, expected action order, or a previous run.
- Use a fresh conversation for each host and scenario.
- Store raw transcripts and generated artifacts outside the oracle directory.
- Score only after the run is complete.

## What to record

Action recommendations and actual order, question count, skipped/returned steps, artifact and view dispositions, role dispatch/fallbacks, findings, blockers, validator result, handoff, and user-control observations.

Score 1–5 for routing fit, question information gain, professional recommendation quality, suppression of irrelevant artifacts, information density without repeated decisions, domain/data/architecture sufficiency, global consistency, handoff executability, and user control.

Also score planning depth: the run should cover applicable material concerns before convergence, then stop at the next safe development decision and avoid speculative completeness.

A run fails if it invents confirmed facts, silently skips a high-risk concern, creates enterprise ceremony for a lean project, loses parent consistency after a child revision, hides a blocker, or produces a handoff that a fresh implementation agent cannot execute.

## Release model smoke

The deterministic checks validate scenario and oracle structure; they do not execute a model. When canonical routing or multi-role review behavior changes, run `EVAL-01` plus one risk-relevant complex scenario in fresh Claude and Codex conversations. When only one host adapter changes, run those two cases on that host and rely on adapter parity for the unchanged host. Documentation-only changes with no runtime behavior change do not require a model smoke.

For multi-role review changes, record that every applicable role used the same bounded snapshot, returned a terminal report before aggregation, and cited existing IDs or `artifact#section` references without forcing new identifiers. Mutate one selected input before aggregation and confirm the run is invalidated and every applicable role is dispatched again on one new boundary; no old terminal report is reused across snapshots.
