# model-users-and-journeys

Model who acts, what they are trying to achieve, and how value is experienced end to end.

## Use when

Human or system actors, jobs, scenarios, workflow, touchpoints, failure paths, or operational participation affect product scope. It may be not applicable for a purely technical library with no user or operator workflow.

## Inputs

Charter, user evidence, roles, current process, tasks/JTBD, constraints, and relevant existing interfaces.

## Method

1. Identify primary, secondary, operational, administrative, and external-system actors.
2. Write scenario cards with trigger, goal, preconditions, happy path, alternatives/failures, information needs, evidence, and success signal.
3. Trace high-value or high-risk scenarios as journeys.
4. Add service-blueprint lanes only when frontstage, backstage, support processes, handoffs, or multiple systems materially shape delivery.
5. Mark unsupported personas or journey steps as assumptions; ask for decisions rather than demographic decoration.
6. Feed terminology and ownership conflicts to `model-domain`; feed module needs to `define-product-scope`.

## Outputs

Actor model, scenario set, selected journeys, conditional service blueprint, evidence gaps, and traceability seeds.

## Completion

Every proposed user-facing capability can trace to a scenario or explicit enabling constraint; critical failures and operational actors are visible.

## Avoid

Invented personas, one universal happy path, journey maps with no design decision, and a mandatory service blueprint for simple products.
