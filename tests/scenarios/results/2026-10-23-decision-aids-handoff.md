# Planning decision aids and handoff smoke — 2026-10-23

## Boundary and execution

Source baseline: `c534f69be19399c26297e8ecdde3546dac3bca73` plus this working-tree change; package manifests remain 0.3.1 (not a release). No application code, real business data, deployments or installed plugins were changed.

The canonical changes add optional decision aids and target-baseline-aware handoff routing. Existing data lifecycle and vertical-slice rules were retained. A separate fresh, read-only data-planning probe using the existing model-data action identified source-to-ID conversion, ongoing maintenance, import/manual conflicts and downstream recovery; it was supporting evidence, not a two-host release test.

Packages were built with `node scripts/build-plugin-packages.cjs --out /tmp/blueprint-planning-smoke-GdlTl7/packages`. Each host/case used a fresh conversation with only the packaged skill and one raw input, no scoring oracle or prior results. The harness limited work to one discussion turn, plugin reads and no writes. Thus these runs evaluate recommendations, not a completed blueprint, actual HTML generation, browser usability or end-to-end implementation handoff.

- Codex CLI: 0.163.0-alpha.11.1, configured default model (not identified in JSONL), read-only sandbox, ephemeral session. Native role dispatch was available.
- Claude Code CLI: 2.1.144, configured provider returned `glm-5.3` and `glm-5.3-flash` in modelUsage. These are Claude Code host runs, **not Claude-model evidence**. Read-only tools; no delegation tool, disclosed inline role fallback.
- All six processes returned exit 0; that is execution success, not semantic PASS. Claude Code reported aggregate API cost approximately $1.27; no comparable Codex monetary cost was exposed.
- Raw prompts, answers, events, stderr, status and harness are retained locally at `/tmp/blueprint-planning-smoke-GdlTl7/`; temporary evidence is not a portable permanent archive.

## Observed results

| Host / case | Result | Evidence and limits |
|---|---|---|
| Codex EVAL-01 | Sufficient for this discussion turn | Lean single-user outcome, merged planning material, relational concepts, vertical first slice and one statistics decision cluster; no forced prototype. No final handoff was attempted. |
| Codex EVAL-10 | Partial coverage | Correct feature-init reuse vs spec-revise routing; no re-personalization of a maintained target; source maintenance and synthetic cross-system outcome identified. Explicit legacy initialization and revocation/old-permission failure behavior were not developed. |
| Codex EVAL-11 | Partial coverage | Simplifies six panels by user tasks, recommends optional isolated clickable aid, preserves UI conventions, distinguishes mocked behavior from real authorization and keeps width fixes in implementation. Did not explicitly describe recording confirmed outcomes in canonical material. |
| Claude Code EVAL-01 | Needs improvement | Lean structure retained, but invented a data-ownership motive and asserted low cost/no blockers without sufficient evidence; questions span several decision clusters. Existing evidence/interaction rules already prohibit these deviations. |
| Claude Code EVAL-10 | Partial; unsupported inferences | Names the correct two handoff routes and source ownership. Overstates the cause from interface-test success, assumes what the active spec covers, and does not develop manual/import precedence, initial population or revocation. Read-first advice also ignores the blueprint-root-relative path constraint; no actual handoff file was generated or validated. |
| Claude Code EVAL-11 | Partial coverage | Selects optional lightweight HTML, synthetic data and existing conventions; separates prototype from permission proof and ordinary layout repair from planning. Does not explicitly close accepted decisions into canonical material; secondary audit tab/deferred items remain proposals, not accepted scope. |

Independent read-only review found no material contradiction in the source diff. A separate output review of the first four available answers agreed with the partial-coverage findings; the remaining two answers were reviewed in the main session.

Do not label this a full behavioral or release PASS. The two changed responsibilities are observable, but one-turn omissions and existing model execution deviations remain. Do not add duplicate universal rules solely to force a particular answer. Before claiming full scenario coverage, exercise the remaining initialization/revocation and confirmation-to-canonical steps in continued user interaction; use a Claude model if making a Claude-model compatibility claim.

## Mechanical checks

`node scripts/check-all.cjs` passed: adapter parity; 4 validator baselines plus 31 mutations; 11 scenario contracts; both self-contained host packages and marketplaces. `git diff --check` passed. Scenario contract checks validate structure and never substitute for the model observations above. No schema or host adapter behavior changed, so no new validator schema or adapter-specific logic was needed.

## Local artifact fingerprints

- `codex-EVAL-01/answer.md`: `c4c33741e4eb605c29e751f89a0567add03616c19f9974c5e9693df74fdc40a6`
- `codex-EVAL-10/answer.md`: `1f8ee52cd96ac50cb5bc3fce3c6ef20d49995cbee7ce6af56427481d26e1b262`
- `codex-EVAL-11/answer.md`: `714dd34e0e7283d586cc36d52d0d0ee3eb51dd330e31dac5e4343cd128aa0df2`
- `claude-EVAL-01/answer.md`: `a65db8f95f47d65da76c8dd912dec25674472509f9ee873a226f8894d1360aa6`
- `claude-EVAL-10/answer.md`: `451f8298ccb2dbd017cf504b867fbc9d52a4802f5e6cb8315aa57e787a9e33a5`
- `claude-EVAL-11/answer.md`: `a33a8e16eebcd52bb9fe2722ae95e50bb4d9528c4631fe69739687091591bdb9`

## Subsequent routing clarification

The handoff contract now covers partial/custom/occupied baseline destinations needing repair or adaptation
even without other project evidence, while preserving already applicable customized baselines. EVAL-10 adds
an independent incomplete-baseline target and its routing oracle. The earlier EVAL-10 model observations
and fingerprints predate this extension; this new subcase has not been model-executed.
