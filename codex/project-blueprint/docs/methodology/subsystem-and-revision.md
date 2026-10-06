# Subsystem planning and revision

## Global-first planning

For multiple subsystems:

1. Establish global outcomes, capability map, system landscape, shared principles, identity/security boundaries, cross-system contracts, and quality goals.
2. Treat each subsystem as a black box with responsibility, owner, inputs, outputs, authoritative data, dependencies, and acceptance.
3. Deepen only subsystems that are in the MVP, complex, risky, independently owned/deployed, data-authoritative, or contractually disputed.
4. Plan one explicit scope at a time; discovering a subsystem does not authorize expanding the whole tree.

## Parent and child authority

The root blueprint owns global boundaries and cross-system contracts. A child blueprint may refine internal modules, local domain/data models, runtime, and delivery slices.

A child must reference inherited parent contract IDs. If it needs to change a parent-owned decision, create an impact proposal; do not silently override the parent.

## Module refinement

For a selected module, consider:

- purpose and user/business outcome;
- scenarios, functions, and non-goals;
- rules, invariants, lifecycle, and failure behavior;
- inputs, outputs, permissions, and data ownership;
- dependencies and cross-boundary contracts;
- quality requirements and acceptance;
- evidence, assumptions, and unknowns.

The AI proposes a reasoned draft and asks only for gaps that can change a material decision.

## Revision protocol

Before changing confirmed content:

1. Identify the requested change and owning scope.
2. Produce an impact list across scenarios, capabilities, modules, domain, data, architecture, quality risks, slices, and handoff.
3. Include parent/child contracts and downstream consumers.
4. Ask the user to approve the change boundary.
5. Apply the revision consistently and record reason, affected IDs, and confirmation status.
6. Re-run only relevant specialist reviews, then the consistency auditor and structural validator.

Do not build an event-sourcing system for documentation. Keep the current blueprint, concise revision history, and Git history.

## Required impact closure

A major subsystem change is incomplete until it covers:

- parent capability and system landscape;
- upstream and downstream contracts;
- authoritative data or event ownership;
- security and quality assumptions;
- affected journeys;
- delivery slices and development handoff.
