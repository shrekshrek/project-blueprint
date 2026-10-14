# Blueprint actions

This directory is the canonical action layer for Project Blueprint. Each action owns one planning decision boundary: applicability, inputs, interaction, outputs, completion conditions, and review boundaries.

Runtime skills must read the corresponding action completely and may add only host-specific execution details. If an adapter conflicts with an action, the action wins.

## Shared conventions

- `plan-project` owns the user conversation, state transitions, conflict explanation, and final approval.
- Other actions may also be invoked directly. When invoked directly, they update only their own scope and return a next-action recommendation.
- Track material choices using the [assertion states](../methodology/artifact-contract.md#assertion-states); cite facts separately with their verification limits.
- Do not re-ask information already present in the invocation or blueprint.
- Ask only questions that can change a material decision; normally ask one high-impact question at a time.
- Keep planning economical, not artificially small: explore all applicable material concerns before converging, use one decision cluster per loop, and stop only after remaining unknowns are explicitly deferred or immaterial.
- Record omissions when their rationale or revisit trigger matters to a decision, risk or handoff.
- Write each decision once in its owning artifact and reference its stable ID elsewhere. Do not repeat the same background, scope, or rationale to make every file self-contained.
- Match artifact density to project risk. Merge related action outputs when that improves clarity; separate files are justified by independent ownership, review, lifecycle, or material complexity, not by action count.
- Planning stops at an approved AI-ready blueprint and handoff. Starting implementation requires explicit development authorization distinct from content approval; preserve it when already supplied.

| Action | Decision boundary |
|---|---|
| [`plan-project`](plan-project.md) | Route and resume the whole planning conversation |
| [`frame-project`](frame-project.md) | Establish value, feasibility, constraints, and decision context |
| [`model-users-and-journeys`](model-users-and-journeys.md) | Model actors, jobs, scenarios, journeys, and operational touchpoints |
| [`define-product-scope`](define-product-scope.md) | Define capabilities, modules, MVP, success, and non-goals |
| [`model-domain`](model-domain.md) | Clarify language, rules, ownership, subdomains, and bounded contexts |
| [`design-architecture`](design-architecture.md) | Select structural and runtime views that resolve material concerns |
| [`model-data`](model-data.md) | Select and define data models, ownership, lifecycle, and controls |
| [`plan-delivery`](plan-delivery.md) | Convert confirmed decisions into vertical slices and a development handoff |
| [`review-blueprint`](review-blueprint.md) | Run independent, risk-routed review and aggregate findings |
