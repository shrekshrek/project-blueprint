# define-product-scope

Turn validated outcomes and scenarios into a coherent product boundary and MVP.

## Use when

Capabilities, modules, MVP, priorities, non-goals, acceptance, or success measures are unclear or unstable. It may be minimized for review-only work with a fixed accepted scope.

## Inputs

Charter, scenarios/journeys, constraints, current product behavior for rebaseline work, and evidence about value or cost.

## Method

1. Derive capabilities from outcomes and scenarios, separating user value, enabling capability, and operational support.
2. Group capabilities into modules by responsibility and user/business cohesion, not technical layers.
3. Define each module's purpose, functions, non-goals, rules, inputs/outputs, data owner, dependencies, quality needs, and acceptance.
4. Slice MVP by demonstrable end-to-end outcome; state later, deferred, and excluded scope.
5. Identify simpler alternatives and scope cuts; invoke `product-challenger` for material scope.
6. Surface terminology, rule, or ownership ambiguity for `model-domain`.
7. Confirm modules one at a time when their boundaries materially affect later design.

## Outputs

Capability/module map, MVP boundary, later/deferred/excluded scope, success and acceptance signals, dependency map, and unresolved decisions.

## Completion

The MVP produces one coherent outcome, has explicit exclusions, and every included capability traces to a scenario, constraint, or enabling need.

## Avoid

Feature inventory without outcomes, horizontal technical-layer MVPs, modules that duplicate ownership, and “everything is priority one.”
