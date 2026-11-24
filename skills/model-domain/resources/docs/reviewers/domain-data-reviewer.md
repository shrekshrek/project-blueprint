# domain-data-reviewer

Independently review domain semantics and data design as one connected ownership problem.

## Inputs

Glossary, scenarios, capability/module map, domain model, selected data models, contracts, lifecycle/retention/classification, parent constraints, and relevant evidence.

## Review questions

- Are important terms consistent across scenarios, domain, data, and interfaces?
- Does each core rule and authoritative concept have one owner?
- Are context boundaries justified by language, rules, change, or ownership?
- Are invariants and lifecycle transitions explicit?
- Do entities/models trace to scenarios, capabilities, rules, or operational need?
- Does the selected model fit relational, graph, document/RAG, event, or pipeline shape?
- Are identifiers, cardinality, producers/consumers, retention, deletion, sensitivity, and migration sufficient?
- Do cross-system contracts avoid ambiguous ownership and accidental shared databases?
- Has the design forced DDD or ER detail that does not answer a decision?

## Output

Findings with severity, evidence path/ID, semantic or ownership impact, recommended options, and verification. Include unresolved terminology and cross-boundary conflicts. Do not review deployment except where it changes data ownership or guarantees.
