# Project Blueprint

Project Blueprint is a set of cross-tool planning skills for the work that should happen **before implementation starts**. It guides a user from an uncertain idea or unstable existing project to an evidence-backed, AI-readable blueprint without forcing every project through the same questionnaire or diagram checklist.

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

## Planning skills

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
- Planning uses a risk-routed diverge-then-converge loop: it broadens when research or concern coverage can change the direction, then stops after material boundaries and unknowns are closed or explicitly deferred.
- Inputs already supplied are not asked again.
- Material choices remain `confirmed`, `assumption`, `deferred`, or `out_of_scope`; cited facts support decisions but do not constitute user acceptance.
- Architecture and data views are selected from stakeholder concerns and risk, not a required count.
- Small, single-owner projects default to merged, decision-dense artifacts; action count never determines file count.
- Multi-subsystem projects establish global black-box responsibilities first, then deepen selected scopes without losing parent contracts.
- Revisions produce an impact list before changing confirmed content.
- Multi-role readiness review freezes one bounded blueprint input, waits for terminal role reports, and reuses completed reports only after verifying validity for the current inputs and dependencies.
- Markdown, YAML, and Mermaid are canonical. HTML or images may be added later as renderers.
- Blueprint-content approval and development authorization are separate decisions. Blueprint stops at a reviewed handoff and never starts development automatically.

## Repository layout

```text
docs/actions/                 canonical contracts for 9 user skills
docs/reviewers/               canonical contracts for 5 internal roles
docs/methodology/             routing, artifacts, view selection, subsystem revision
scripts/                      packaging, scenario checks, and blueprint validation
tests/fixtures/               deterministic validator fixtures
tests/scenarios/              isolated forward-test inputs and scoring oracles
docs/specs/                   current product truth
docs/adr/                     durable cross-feature architecture decisions
```

Each skill loads its canonical action and the roles applicable to that decision.

## Blueprint location

For an implementation repository, keep the planning package under `docs/blueprint/`:

```text
docs/blueprint/
├── manifest.yaml
├── 00-project-charter.md
├── 03-product-scope.md
├── 05-solution.md
└── 09-development-handoff.yaml
```

The directory is a default convention, not a migration requirement. Existing blueprints may stay elsewhere
when `manifest.yaml` clearly identifies the canonical root. Larger projects may add subsystem packages below
the same directory.

## Install

Use Node.js 22.20 or later. Install all nine skills together in `~/.agents/skills/`. Their shared resources live under `plan-project/resources/`.

```bash
npx skills add https://github.com/shrekshrek/project-blueprint/tree/skills-dist --skill '*' --agent codex claude-code --global
```

Choose **Symlink** if prompted. Codex, local Cursor and DeepSeek Harness with default settings read the shared directory directly. Claude Code uses links in `~/.claude/skills/` to the same files. Omit `--global` for project scope. To update or migrate an earlier `--copy` install, repeat the command at its original scope. Review any same-named skills before replacing them.

If your install tracks `main`, run the branch command above once with the same scope and clients to switch the installer lock to `skills-dist`. To pin a release, use `shrekshrek/project-blueprint@vX.Y.Z` with its published version tag.

Open a fresh chat and invoke `plan-project`. Check the version under `metadata.version` in its installed `SKILL.md`. Independent reviews require a host with subagent support or the fallback allowed by the selected action.

### Migrating from the marketplace plugin

In each client where the old plugin is installed, remove its entry and dedicated marketplace, then run the install command above. Use the original installation scope for Claude Code (default: user).

```bash
# Codex
codex plugin remove project-blueprint@project-blueprint
codex plugin marketplace remove project-blueprint

# Claude Code
claude plugin uninstall project-blueprint@project-blueprint
claude plugin marketplace remove project-blueprint
```

In a new chat, check that `plan-project` resolves to the skill directory from the new installation. Project-owned documents and rules stay in their repositories.


## Development

Run all checks with `node scripts/check-all.cjs`. To test an unpublished build, generate an empty distribution directory and pass it to the same installer:

```bash
dist=$(mktemp -d)
node scripts/build-skills.cjs --out "$dist"
# From a disposable project:
npx skills add "$dist" --skill '*' --agent codex claude-code
```

Build from a Git checkout. Maintain each skill’s discovery metadata and behavior in `docs/actions/<name>.md` and its reviewer methods in `docs/reviewers/`. A release commit of the form `release: vX.Y.Z ...` with a matching new `VERSION` publishes the validated package to `skills-dist` and tags that package commit. Its `Source-Commit` trailer identifies the source on `main`.

## Scope

v0.3 intentionally does not include a web UI, HTML renderer, database service, visual editor, long-running agent service, or industry-specific reviewer packs. Those require evidence from real blueprint use.

## License

[MIT](LICENSE)
