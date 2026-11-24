# Blueprint actions

This directory is the canonical action layer for Project Blueprint. Each action owns one planning decision boundary: applicability, inputs, interaction, outputs, completion conditions, and review boundaries.

Each public action supplies the discovery metadata and runtime references for its generated skill entry.

## Shared conventions

Run the [shared validator](../../scripts/validate-blueprint.cjs) with the project blueprint directory as its argument. When delegating, give the reviewer the [support-role contract](../reviewers/README.md), its role file and the evidence for its scope.

Use repository and web tools only when the current evidence question requires them. Keep Markdown, YAML and Mermaid sources readable and cite changed artifact paths. Read supporting references only for the current decision. For a section link, read the heading and its subsections. Reuse unchanged material already in context and follow further links only when the current action needs them.

- `plan-project` owns the user conversation, state transitions, conflict explanation, and final approval.
- Other actions may also be invoked directly. When invoked directly, they update only their own scope and return a next-action recommendation.
- Specialist actions apply within active Blueprint planning or an explicitly requested project-level planning task. Ordinary feature design, schema changes and internal refactoring in a stable project stay in its implementation workflow; technical subject matter alone does not trigger Blueprint.
- Track material choices using the [assertion states](../methodology/artifact-contract.md#assertion-states); cite facts separately with their verification limits.
- Do not re-ask information already present in the invocation or blueprint.
- Ask only questions that can change a material decision; normally ask one high-impact question at a time.
- Keep planning economical, not artificially small: explore all applicable material concerns before converging, use one decision cluster per loop, and stop only after remaining unknowns are explicitly deferred or immaterial.
- Record omissions when their rationale or revisit trigger matters to a decision, risk or handoff.
- When organizing decisions or files, follow the [storage convention](../methodology/artifact-contract.md#storage-convention). When changing confirmed content, apply the [revision protocol](../methodology/subsystem-and-revision.md#revision-protocol) and its impact closure for major subsystem changes.
- Planning stops at an approved AI-ready blueprint and handoff. Starting implementation or invoking another workflow requires explicit authorization distinct from content approval; preserve it when already supplied.

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
