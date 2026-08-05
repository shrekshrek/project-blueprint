# design-architecture

Design the minimum sufficient system structure and runtime behavior for the selected concerns.

## Use when

Every software project needs at least a boundary and primary responsibility evaluation. Depth increases for integrations, security, availability, scale, multiple runtimes, or high-risk internals.

## Required reference

Read `docs/methodology/view-selection.md`; for multiple subsystems also read `subsystem-and-revision.md`.

## Inputs

Confirmed scenarios, scope/modules, domain ownership, quality goals, constraints, external systems, data needs, existing architecture, and concern register.

## Method

1. Create a concern register: stakeholder, concern, quality goal, blocked decision, risk, and source.
2. Evaluate System Context and Container/Building Block L1; merge them only when one view remains clear.
3. Select conditional views solely when they resolve a listed concern.
4. Define responsibilities, owners, interfaces, trust boundaries, failure behavior, observability, and rationale in text before or beside diagrams.
5. Prefer a modular monolith unless distribution is justified by independent deployment, scale, fault, data, security, or organization constraints.
6. For multiple subsystems, establish global landscape and black-box contracts before selected deep dives.
7. Invoke `architecture-reviewer` for Standard/Enterprise or any high-impact architecture boundary.
8. Record unselected concerns as merged, deferred, or not applicable with rationale and triggers.

## Outputs

Concern register, selected view set, architecture principles, system responsibilities, integration contracts, quality tradeoffs, decision candidates, and view-decision records.

## Completion

Selected views answer the material decisions and support MVP journeys and quality risks without speculative infrastructure.

## Avoid

Fixed diagram quotas, technology selection without constraints, component detail for every module, default microservices, and diagrams without textual semantics.
