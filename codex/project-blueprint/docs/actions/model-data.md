# model-data

Choose data representations that match the project's information shape, ownership, lifecycle, and risk.

## Use when

The system persists, exchanges, governs, migrates, retrieves, or derives material information. It may be not applicable for a stateless utility with no exchanged state.

## Required reference

Read `docs/methodology/view-selection.md`.

## Inputs

Scenarios, domain concepts and owners, system responsibilities, data uses, lifecycle, integrations, quality/compliance concerns, current schemas, and migration constraints.

## Method

1. Define business information concepts and meanings before storage structures.
2. Record authoritative owner, producers/consumers, identifiers, lifecycle, classification, retention, deletion, and migration concerns.
3. Select models by shape:
   - conceptual information model for shared meaning;
   - logical ER for relational cardinality and constraints;
   - ontology/graph for knowledge relationships or inference;
   - document/chunk/embedding/index for RAG;
   - event schemas and state models for event-driven lifecycle;
   - data flow/lineage for pipelines and governance.
4. Model a physical schema only for the first implementation slice and mark it provisional.
5. Invoke `domain-data-reviewer` for important persistence, semantic complexity, sensitive data, or cross-system contracts.
6. Reconcile ownership changes with domain, architecture, and subsystem contracts.

## Outputs

Selected data model set, definitions, ownership/lifecycle controls, contracts, classification/retention, migration concerns, and provisional first-slice schema when needed.

## Completion

Every material data concept has meaning, owner, lifecycle, and traceability; selected models answer real development or governance decisions.

## Avoid

ER as the universal model, tables before concepts, framework-generated entities without need, and permanent schema claims before implementation feedback.
