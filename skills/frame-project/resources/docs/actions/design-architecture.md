# design-architecture

Design coherent system structure and runtime behavior for the selected concerns and quality constraints.

## Use when

Within the shared Blueprint applicability boundary, evaluate the project’s boundary and primary responsibilities. Depth increases for integrations, security, availability, scale, multiple runtimes, or high-risk internals.

## Required reference

Read `docs/methodology/view-selection.md`; for multiple subsystems also read `subsystem-and-revision.md`.

## Inputs

Confirmed scenarios, scope/modules, domain ownership, quality goals, constraints, external systems, data needs, existing architecture, and concern register.

## Method

1. Create a concern register: stakeholder, concern, quality goal, blocked decision, risk, and source.
2. Evaluate System Context and Container/Building Block L1; merge them only when one view remains clear.
3. Select conditional views solely when they resolve a listed concern.
4. Define responsibilities, owners, interfaces, trust boundaries, failure behavior, observability, and rationale in text before or beside diagrams.
5. Compare structures against existing systems, deployment, scale, resilience, data, security and team constraints. Choose by total delivery and maintenance cost rather than component count.
6. For multiple subsystems, establish global landscape and black-box contracts before selected deep dives.
7. Invoke `architecture-reviewer` for material system/quality risks or disputed architecture boundaries.
8. Record consequential omissions under the shared artifact contract; focus on their rationale and revisit conditions.

## Outputs

Concern register, selected view set, architecture principles, system responsibilities, integration contracts, quality tradeoffs, decision candidates, and view-decision records.

## Completion

Selected views answer the material decisions and support MVP journeys and quality risks without speculative infrastructure.

## Avoid

Fixed diagram quotas, technology selection without constraints, component detail for every module, default microservices, and diagrams without textual semantics.
