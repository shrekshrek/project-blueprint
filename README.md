# Project Blueprint

Project Blueprint is a cross-tool planning plugin for the work that should happen **before implementation starts**. It guides a user from an uncertain idea or unstable existing project to an evidence-backed, AI-readable blueprint without forcing every project through the same questionnaire or diagram checklist.

```text
project idea or unstable project
            ↓
project-blueprint
  feasibility → users/journeys → scope → domain → architecture/data → slices
            ↓
  reviewed AI-ready development handoff
            ↓
project-workflow or another implementation process (only after user approval)
```

## What changed in v0.2

The original single `$plan-project` prototype is now a manager over nine focused planning skills:

| Skill | Responsibility |
|---|---|
| `$plan-project` | Adaptively route, resume, revise, and complete the planning conversation |
| `$frame-project` | Establish value, feasibility, constraints, and success |
| `$model-users-and-journeys` | Model actors, scenarios, journeys, and operational touchpoints |
| `$define-product-scope` | Define capabilities, modules, MVP, acceptance, and non-goals |
| `$model-domain` | Clarify language, rules, ownership, and bounded contexts |
| `$design-architecture` | Select the minimum sufficient structural and runtime views |
| `$model-data` | Select data models according to relational, graph, RAG, event, or pipeline shape |
| `$plan-delivery` | Create vertical learning slices and the development handoff |
| `$review-blueprint` | Run independent risk-routed review |

Five internal support roles provide evidence research, product challenge, domain/data review, architecture review, and consistency audit. They are invoked only when applicable; they are not a fixed five-agent ceremony.

## Method

- `plan-project` keeps the user conversation and recommends the next highest-value decision.
- Inputs already supplied are not asked again.
- Material statements remain `confirmed`, `assumption`, `deferred`, or `out_of_scope`.
- Architecture and data views are selected from stakeholder concerns and risk, not a required count.
- Small, single-owner projects default to merged, decision-dense artifacts; action count never determines file count.
- Multi-subsystem projects establish global black-box responsibilities first, then deepen selected scopes without losing parent contracts.
- Revisions produce an impact list before changing confirmed content.
- Multi-role readiness review freezes one bounded blueprint input, waits for terminal role reports, and never aggregates results from different snapshot states.
- Markdown, YAML, and Mermaid are canonical. HTML or images may be added later as renderers.
- Blueprint-content approval and development authorization are separate decisions. The plugin stops at a reviewed handoff and never starts development automatically.

## Repository layout

```text
docs/actions/                 canonical contracts for 9 user skills
docs/reviewers/               canonical contracts for 5 internal roles
docs/methodology/             routing, artifacts, view selection, subsystem revision
adapters/claude/              Claude Code skills, agents, and manifest
adapters/codex/               Codex skills and manifest
scripts/                      parity, packaging, and blueprint validation
tests/fixtures/               deterministic validator fixtures
tests/scenarios/              isolated forward-test inputs and scoring oracles
docs/specs/                   current product truth
docs/adr/                     durable cross-feature architecture decisions
```

The canonical method is maintained once. Claude and Codex adapters contain only host-specific loading and subagent instructions.

## Install

Install from this GitHub repository through the native marketplace commands.

Claude Code:

```text
/plugin marketplace add shrekshrek/project-blueprint
/plugin install project-blueprint@project-blueprint
```

Codex:

```bash
codex plugin marketplace add shrekshrek/project-blueprint
codex plugin add project-blueprint@project-blueprint
```

To update later, refresh the marketplace and plugin, then start a new task so the refreshed skills are loaded:

```bash
claude plugin marketplace update project-blueprint
claude plugin update project-blueprint@project-blueprint
codex plugin marketplace upgrade project-blueprint
codex plugin add project-blueprint@project-blueprint
```

The primary entry point is `$plan-project`; `$review-blueprint` performs a focused readiness review.

For local development, build an isolated marketplace and add its generated directory instead of the GitHub repository:

```bash
BLUEPRINT_DIST_ROOT="$(mktemp -d)"
node scripts/build-plugin-packages.cjs --out "$BLUEPRINT_DIST_ROOT"
claude plugin marketplace add "$BLUEPRINT_DIST_ROOT"
claude plugin install project-blueprint@project-blueprint
codex plugin marketplace add "$BLUEPRINT_DIST_ROOT"
codex plugin add project-blueprint@project-blueprint
```

The local and GitHub sources intentionally use the same marketplace name. Do not configure both at once; remove the existing `project-blueprint` marketplace before switching sources.

## Development

Requires Node.js 18 or later. The repository has no npm dependencies or `package.json`; Node scripts are invoked directly, matching `project-workflow`.

```bash
node scripts/check-all.cjs
node scripts/validate-blueprint.cjs /path/to/project-blueprint
node scripts/build-plugin-packages.cjs --out /empty/output-directory
```

`check-all.cjs` verifies:

- the same nine actions exist in both adapters;
- all five canonical roles are reachable;
- adapter links and manifests are valid;
- adapters remain thin and host-specific markers do not leak;
- valid and invalid blueprint fixtures behave deterministically;
- all eight forward-test inputs and hidden scoring oracles remain complete and reference real actions/roles;
- self-contained Claude and Codex packages can be built.

## Packaging

Source adapters reference the shared root method. The build script produces self-contained packages containing the appropriate adapter plus `docs/actions`, `docs/reviewers`, `docs/methodology`, the validator, and the license.

- Claude source manifest: `adapters/claude/.claude-plugin/plugin.json`
- Codex source manifest: `adapters/codex/.codex-plugin/plugin.json`
- Claude repository marketplace: `.claude-plugin/marketplace.json`
- Codex repository marketplace: `.agents/plugins/marketplace.json`

The source adapters remain on `main`; generated packages are not committed there. A commit whose subject starts with `release: vX.Y.Z` must carry the same new version in both manifests. After validation on `main`, CI builds both self-contained packages and force-publishes them, together with local marketplace indexes, to `plugin-dist`. The repository marketplace files resolve installations to the appropriate package on that branch.

## Scope

v0.2 intentionally does not include a web UI, HTML renderer, database service, visual editor, long-running agent service, or industry-specific reviewer packs. Those require evidence from real blueprint use.

## License

[MIT](LICENSE)
