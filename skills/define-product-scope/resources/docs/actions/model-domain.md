# model-domain

Clarify business language, rules, responsibility, and ownership before choosing technical structure.

## Use when

The project has meaningful business rules, multiple subdomains, terminology conflict, lifecycle invariants, cross-team ownership, or authoritative-data ambiguity. It may be not applicable for simple CRUD where language, rules, and ownership are unambiguous.

## Inputs

Charter, scenarios, capabilities/modules, glossary, current models for rebaseline work, policies, and ownership evidence.

## Method

1. Build a glossary from real scenarios and identify overloaded or conflicting terms.
2. Identify subdomains by business capability, rate of change, expertise, and ownership.
3. Propose bounded contexts only where a distinct language/model or ownership boundary exists.
4. Record responsibilities, invariants, policies, aggregate candidates only when useful, authoritative data, and context relationships.
5. Treat DDD as a boundary tool; do not force tactical patterns or microservices.
6. Invoke `domain-data-reviewer` when rules, ownership, persistent data, or cross-system contracts are material.
7. Send structural integration concerns to `design-architecture` and information-shape concerns to `model-data`.

## Outputs

Ubiquitous-language glossary, subdomain/context map when applicable, rule and invariant catalog, ownership decisions, integration contracts, and open conflicts.

## Completion

Each core business rule and authoritative concept has one owning scope; context relationships and translation needs are explicit.

## Avoid

Entity lists presented as a domain model, bounded context per module, aggregate design before rules are known, and deriving service boundaries directly from nouns.
