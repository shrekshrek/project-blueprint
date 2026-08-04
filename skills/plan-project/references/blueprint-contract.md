# Project Blueprint Contract

This contract defines the canonical, AI-readable output of `plan-project`. A renderer may generate HTML, images, or dashboards from these files, but rendered output is never the source of truth.

## Output Pack

Create a `project-blueprint/` directory in the user's chosen planning workspace:

```text
project-blueprint/
├── manifest.yaml
├── 00-project-charter.md
├── 01-users-and-scenarios.md
├── 02-journeys-and-service-blueprint.md
├── 03-capability-map.md
├── 04-domain-model.md
├── 05-system-architecture.md
├── 06-data-model.md
├── 07-quality-and-risks.md
├── 08-mvp-slices.md
└── 09-development-handoff.yaml
```

Omit an optional view only when its omission is recorded in `manifest.yaml` with a reason. Do not create empty placeholder documents.

## Shared Conventions

### Status

Use exactly these values for material assertions:

- `confirmed`: supported by user confirmation or cited evidence;
- `assumption`: currently used to make progress and requires validation;
- `deferred`: intentionally postponed with a trigger for reconsideration;
- `out_of_scope`: explicitly excluded from the current project boundary.

### Stable identifiers

Use these prefixes and never reuse a retired ID:

| Prefix | Meaning | Example |
|---|---|---|
| `ACT` | actor | `ACT-001` |
| `SCN` | scenario | `SCN-003` |
| `JNY` | journey | `JNY-002` |
| `CAP` | capability | `CAP-014` |
| `CTX` | bounded context | `CTX-004` |
| `ENT` | entity or aggregate candidate | `ENT-011` |
| `QAR` | quality attribute requirement | `QAR-005` |
| `RSK` | risk | `RSK-009` |
| `SLC` | delivery slice | `SLC-001` |
| `DEC` | decision candidate | `DEC-006` |

Every item records `id`, `name`, `status`, `rationale`, and `source_refs` where applicable. Relationships reference IDs rather than labels.

### Evidence references

Use resolvable references: local file paths, repository paths and commits, ticket IDs, or web URLs with access dates. Mark user statements as `user-confirmed` with the date. Do not cite the model itself as evidence.

### Diagrams

Prefer Mermaid embedded beside its textual definition. Each diagram must list:

- purpose and decision answered;
- nodes with stable IDs and owners;
- relationships, direction, and protocol or information exchanged;
- trust or system boundaries where relevant;
- assumptions and unresolved questions.

## File Requirements

### `manifest.yaml`

Minimum fields:

```yaml
schema_version: "0.1"
project_name: example
blueprint_version: "0.1.0"
updated_at: YYYY-MM-DD
decision_status: draft # draft | review | approved
canonical_files: []
omitted_optional_views: []
evidence_sources: []
open_blockers: []
```

### `00-project-charter.md`

Problem, desired outcomes, success measures, stakeholders, constraints, feasibility summary, non-goals, glossary, and approval state.

### `01-users-and-scenarios.md`

Actors and scenario cards. Each scenario states trigger, goal, preconditions, happy path, important alternatives, evidence, and success signal.

### `02-journeys-and-service-blueprint.md`

End-to-end journeys. Include service-blueprint lanes only when frontstage, backstage, support processes, or multiple systems materially shape delivery.

### `03-capability-map.md`

Capabilities linked to scenarios and grouped as MVP, later, enabling, deferred, or excluded. Include dependencies and an explicit non-goal list.

### `04-domain-model.md`

Subdomains, bounded contexts, context map, ownership, business invariants, aggregate candidates, ubiquitous language, and integration contracts.

### `05-system-architecture.md`

Required context and container views. Add component, deployment, sequence, trust-boundary, or data-flow views only when they resolve a material risk. Include architecture principles, integrations, failure modes, observability, and decision candidates.

### `06-data-model.md`

Conceptual model, logical ER model, lifecycle, cardinality, ownership, identifiers, retention, sensitive-data classification, migration concerns, and the provisional first-slice physical schema when needed.

### `07-quality-and-risks.md`

Prioritized quality attribute scenarios, feasibility risks, architecture tradeoffs, assumptions, validation actions, owners, and stop/go criteria.

### `08-mvp-slices.md`

Ordered vertical slices. Each slice links scenarios, capabilities, contexts, entities, risks, acceptance evidence, dependencies, and learning goals.

### `09-development-handoff.yaml`

Minimum fields:

```yaml
blueprint_version: "0.1.0"
read_first: []
first_slice_id: SLC-001
confirmed_contracts: []
accepted_assumptions: []
open_blockers: []
decision_candidates: []
recommended_workflow:
  next_system: project-workflow
  action: project-init
  requires_user_confirmation: true
```

## Consistency Checks

Before declaring the blueprint ready:

1. Every MVP capability traces to a scenario and a delivery slice.
2. Every core rule and authoritative data concept has one owning context.
3. Every entity traces to a scenario, capability, or explicit operational need.
4. Every architecture element supports a requirement, quality attribute, or accepted constraint.
5. Every high-impact assumption has a validation action or explicit acceptance.
6. The first slice produces an end-to-end observable outcome.
7. All cross-file identifiers resolve, and no status conflicts remain unexplained.
8. The handoff does not authorize implementation; it requests the user's confirmation.
