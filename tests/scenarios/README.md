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

A run fails if it invents confirmed facts, silently skips a high-risk concern, creates enterprise ceremony for a lean project, loses parent consistency after a child revision, hides a blocker, or produces a handoff that a fresh implementation agent cannot execute.
