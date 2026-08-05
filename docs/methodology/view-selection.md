# Concern-driven view selection

## Rule

Select views from stakeholder concerns, quality goals, project type, risk, and the decision currently being made. Diagram count is not a completeness measure.

Every selected view states purpose, audience/concern, scope, node responsibilities, relationship semantics, sources, assumptions, open questions, and update triggers. A diagram is a projection of the textual model, not a separate truth.

## Minimum evaluation

For software systems, evaluate:

- System Context for product boundary and external relationships;
- Container or Building Block level 1 for primary responsibilities.

A lean project may merge these if one clear view answers both concerns.

## Conditional catalog

| Concern | Preferred representation | Typical trigger |
|---|---|---|
| Multiple systems and owners | System Landscape | Several subsystems or external platforms |
| Business language and ownership | DDD Context Map | Multiple subdomains, terminology, or ownership conflict |
| Critical runtime behavior | Sequence/Runtime | Async flow, compensation, external integration, critical journey |
| Complex lifecycle | State model | Approval, concurrency, or nontrivial transitions |
| High-risk internals | Component/Building Block L2 | Complex or volatile container |
| Relational business data | Conceptual model + logical ER | Cardinality and constraints affect development |
| Knowledge semantics | Ontology/Graph | Traversal, inference, taxonomy, or knowledge governance |
| RAG information shape | Document/Chunk/Embedding/Index model | Retrieval or cited generation |
| Data movement | Data Flow/Lineage | ETL, ingestion, multiple stores, or compliance lineage |
| Security boundaries | Trust-boundary DFD / identity flow | Sensitive data, multi-tenancy, compliance, or network crossing |
| Runtime topology | Deployment | Multiple runtimes, scale, private deployment, or availability |
| Failure and recovery | Resilience/failover view | SLA, RTO/RPO, or critical dependencies |

Quality scenarios, principles, interface contracts, and evolution strategy often work better as tables or machine-readable schemas than diagrams.

## Enterprise knowledge-platform concerns

A reference blueprint with many navigation sections is a concern catalog, not a required view count. Map every relevant concern to `selected`, `merged`, `deferred`, or `not_applicable`; do not create one skill or one diagram per reference section.

Typical concern groups are: users and journeys, knowledge/domain semantics, ingestion and governance, retrieval/AI runtime, integrations, security and tenancy, operations and resilience, analytics and feedback, migration, and delivery.

## Avoid

- generating diagrams because a framework names them;
- using a logical ER model as the only data model for graphs, RAG, events, or data pipelines;
- decomposing every module into a service;
- showing components with no decision, owner, or traceable requirement;
- using deployment detail before topology affects a real choice.
