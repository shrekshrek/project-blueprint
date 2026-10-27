# Composable blueprint contract

## Principles

Canonical artifacts are Markdown, YAML, and Mermaid. Optional decision aids may use HTML, images or PDF; they support communication, while accepted behavior remains in the canonical source. They are not production deliverables or proof of implementation.

Use one conceptual contract at all depths. Lean projects may merge Markdown sections; standard projects may use separate files; enterprise and subsystem work may add focused packages. Do not maintain three divergent template sets.

## Storage convention

When the blueprint belongs to an implementation repository, place its canonical root at
`<project-root>/docs/blueprint/`. Keep `manifest.yaml`, canonical planning artifacts, and the development
handoff in that directory; subsystem packages may live below it. A standalone blueprint may use its own
directory with the same root layout. Existing projects may retain another location when `manifest.yaml` and
its `canonical_files` make the root unambiguous; do not migrate files only to satisfy this convention.

Organize content by purpose, ownership and reading needs. Merge related material when it remains clear; split it for independent review, lifecycle, complexity or a material concern. File and view counts are outcomes, not planning targets.

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

Record a merged, deferred or not-applicable disposition only when the omission affects a material decision or future work; keep its reason and any useful revisit trigger.

## Assertion states

For material planning choices use:

- `confirmed`: accepted by the user or inherited from an applicable accepted contract;
- `assumption`: used provisionally with a validation action;
- `deferred`: intentionally postponed with a revisit trigger;
- `out_of_scope`: excluded from this scope.

Cited evidence establishes facts and constraints, not acceptance of a proposed solution. Describe facts with
their sources and verification limits; reserve `confirmed` for accepted choices. Derived retention, retry,
ownership or failure behavior needs acceptance
when it materially changes outcomes, risk or cost. Ordinary detail within accepted boundaries may be resolved directly.

## Stable identity

Assign stable IDs only to concepts referenced across artifacts or revisions. Useful prefixes include actors, scenarios, capabilities, contexts, contracts, entities, quality requirements, risks, decisions, subsystems, and slices. Do not number every paragraph or every diagram node.

Give referenced items one clear definition, with status, rationale, source and ownership where relevant. Use the document’s existing layout. The validator checks that handoff IDs appear in canonical material outside the handoff; review determines whether their meaning and authority are clear. Relationships use IDs rather than mutable labels.

## View decision record

For a material concern whose disposition affects a decision or later work, record:

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

Omit `view_decisions` or use an empty list when there is no material view decision to record. Additional action, artifact, subsystem, source, revision, and validation state may be added without changing these meanings. A deferred view always has a concrete revisit trigger. A not-applicable view has a rationale and should also have a trigger when applicability can change.

## Handoff

Use the following minimum handoff shape. Its blueprint version matches the manifest, which owns the schema version. State validation commands or evidence, exact read-first artifacts and the referenced slice/decision/contract IDs; status and authorization constraints follow below.

```yaml
project_name: example
blueprint_version: "0.1.0"
blueprint_status: approved
handoff_status: ready # draft | ready | stale
read_first:
  - 00-project-charter.md
  - 03-product-scope.md
  - 05-solution.md
first_slice_id: SLC-001
slice_refs:
  - SLC-001
decision_refs: []
contract_refs: []
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

Choose `recommended_workflow.action` from both the intended target's working baseline and the task:

- `project-init`: no baseline or project evidence exists.
- `project-personalize`: the working baseline needs repair or adaptation because its destinations are partial, custom or otherwise occupied, even without other project evidence; also use it when project evidence exists but the baseline is missing or needs project-specific adaptation. A maintained, applicable baseline does not need personalization merely because it is customized.
- `feature-init`: an applicable working baseline exists and implementation can start or resume within accepted scope; reuse a compatible active record.
- `spec-revise`: an accepted active feature contract must change to incorporate the approved revision.

Read available target evidence before asking; ask one focused question only if missing state changes the route. Do not reinitialize or personalize a maintained project just because it has code or a blueprint. The selected action remains a recommendation and is never invoked by Project Blueprint.

Use `draft` while planning is incomplete, `ready` for an approved handoff without blockers, and `stale` when a later revision invalidates it. Keep handoff project, version, approval and authorization aligned with its owning manifest. Read-first paths are relative to the owning blueprint root and must resolve there. Its slice, decision and contract IDs refer to canonical content; the first slice belongs to `slice_refs`. A ready handoff requires approved content and no open blockers in either record. A stale handoff retains its historical version and is context only, never current implementation authority.

Set `blueprint_status: approved` only after the user accepts the content. Development authorization is a separate decision, but may be explicit in the same request. Default to `not_granted` when no valid grant exists. Preserve an existing grant while its scope remains valid; revise it only for a user decision or a change that invalidates that scope. Planning writes authorized blueprint artifacts, not application code; the handoff records authorization without starting implementation.
