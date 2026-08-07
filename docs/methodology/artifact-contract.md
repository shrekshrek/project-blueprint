# Composable blueprint contract

## Principles

Canonical artifacts are Markdown, YAML, and Mermaid. Renderers may create HTML or images, but rendered output is never the only source of truth.

Use one conceptual contract at all depths. Lean projects may merge Markdown sections; standard projects may use separate files; enterprise and subsystem work may add focused packages. Do not maintain three divergent template sets.

For a small, single-owner application with few rules and no material cross-system boundary, the normal shape is at most three canonical Markdown files plus `manifest.yaml` and the YAML handoff: charter, merged product/solution truth, and concise review. The merged solution may contain one boundary/responsibility view and one fit-for-shape data model. Add another file or view only when it has a distinct owner, review audience, lifecycle, or unresolved risk. This is a default, not a completeness target.

Keep the source compact by ownership: define a decision in one place, refer to its stable ID elsewhere, and let the handoff point to read-first material instead of reproducing it. Reviews contain findings and disposition changes, not a second summary of the blueprint. Applicability and omission records should be brief unless their rationale affects a decision.

## Minimum blueprint

A blueprint needs these concepts, whether merged or separate:

- `manifest.yaml`: state, sources, artifact decisions, blockers, blueprint approval, development authorization, and version;
- project charter: problem, outcomes, feasibility, constraints, success, and non-goals;
- product truth: actors/scenarios when applicable, capabilities, modules, MVP, and acceptance;
- solution truth: domain ownership when applicable, selected architecture/data views, quality risks, and decisions;
- development handoff: first slice, read-first, confirmed contracts, assumptions, blockers, and user-approval boundary.

## Conditional artifacts

Create only when they resolve a material concern:

- users, scenarios, journeys, or service blueprint;
- capability and module map;
- domain model or DDD context map;
- architecture view set;
- data model set;
- quality/risk register;
- subsystem package;
- MVP slice plan.

For each omitted conditional artifact, record `merged`, `deferred`, or `not_applicable`, with rationale and a revisit trigger where conditions can change.

## Assertion states

Use exactly:

- `confirmed`: user-confirmed or supported by cited evidence;
- `assumption`: used provisionally with a validation action;
- `deferred`: intentionally postponed with a revisit trigger;
- `out_of_scope`: excluded from this scope.

## Stable identity

Assign stable IDs only to concepts referenced across artifacts or revisions. Useful prefixes include actors, scenarios, capabilities, contexts, contracts, entities, quality requirements, risks, decisions, subsystems, and slices. Do not number every paragraph or every diagram node.

Every stable item records name, status, rationale, source references where applicable, and owning scope. Relationships use IDs rather than mutable labels.

## View decision record

Each candidate concern records:

- concern and stakeholder;
- disposition: `selected`, `merged`, `deferred`, or `not_applicable`;
- selected representation or target artifact;
- rationale and source;
- revisit trigger for deferred or condition-sensitive omissions.

## Minimum manifest schema

The file layout may vary, but the root `manifest.yaml` uses this minimum machine-readable shape so the Validator and a fresh AI agent can orient reliably. `blueprint_status` records acceptance of the planning content; `development_authorization` is a separate permission to start implementation.

```yaml
schema_version: "0.2"
project_name: example
blueprint_version: "0.1.0"
blueprint_status: draft # draft | review | approved
development_authorization: not_granted # not_granted | granted
planning_mode: greenfield # greenfield | rebaseline | review
interaction_mode: guided # guided | context_dump | best_guess
current_scope: root
canonical_files:
  - 00-project-charter.md
  - 09-development-handoff.yaml
view_decisions:
  - concern_id: CON-001
    disposition: selected # selected | merged | deferred | not_applicable
    representation: system-context
    rationale: Defines the product boundary and external responsibilities
    revisit_trigger: Product boundary or external systems change
open_blockers: []
```

Additional action, artifact, subsystem, source, revision, and validation state may be added without changing these meanings. A deferred view always has a concrete revisit trigger. A not-applicable view has a rationale and should also have a trigger when applicability can change.

## Handoff

The handoff must state:

- blueprint and schema versions;
- exact read-first artifacts;
- first slice ID and observable outcome;
- confirmed contracts and accepted assumptions;
- open blockers and decision candidates;
- validation commands or evidence;
- current `development_authorization`;
- `requires_development_authorization: true`;
- recommended next system may be `project-workflow`, but never auto-invoke it; choose its action from the intended implementation target rather than treating `project-init` as a universal next step.

Minimum shape:

```yaml
blueprint_version: "0.1.0"
read_first:
  - 00-project-charter.md
  - 03-product-scope.md
  - 05-solution.md
first_slice_id: SLC-001
confirmed_contracts: []
accepted_assumptions: []
open_blockers: []
decision_candidates: []
validation:
  - node /path/to/validate-blueprint.cjs .
recommended_workflow:
  next_system: project-workflow
  action: project-personalize
development_authorization: not_granted
requires_development_authorization: true
```

Set `recommended_workflow.action` to `project-init` only when the intended implementation target is empty or contains no project evidence. Use `project-personalize` when blueprint artifacts, a scaffold, code, configuration, or other project-specific truth already exists there. If the target state is unavailable, ask one focused routing question instead of guessing. The selected action remains a recommendation and is never invoked by Project Blueprint.

Set `blueprint_status: approved` only after the user accepts the blueprint content. Set `development_authorization: granted` only after a separate explicit request to begin or hand off implementation; granting it never causes Project Blueprint to invoke another workflow automatically.
