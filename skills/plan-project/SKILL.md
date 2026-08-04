---
name: plan-project
description: Plan a new software project before implementation by validating feasibility, users and scenarios, journeys, scope, domain boundaries, architecture, data concepts, quality risks, and MVP slices, then producing an AI-ready blueprint handoff. Use when a user has an idea or broad requirements but implementation has not started, when an existing proposal needs a development-readiness review, or when repeated feature and schema churn suggests the project needs to be re-baselined. Do not use for ordinary feature planning inside an already established project.
---

# Plan an AI-Ready Project Blueprint

## Overview

Turn an uncertain project idea into a compact, traceable contract that another AI agent can implement. Treat Markdown, YAML, and Mermaid source as canonical; treat rendered HTML or diagrams as optional views over that source.

Read [references/blueprint-contract.md](references/blueprint-contract.md) before creating or revising a blueprint.

## Operating Rules

- Separate evidence from inference. Mark material statements as `confirmed`, `assumption`, `deferred`, or `out_of_scope`.
- Keep identifiers stable across documents. Do not silently rename or renumber referenced items.
- Ask one high-impact question at a time. Continue with clearly labeled assumptions when an answer is useful but not blocking.
- Prefer the smallest artifact set that resolves the project's actual risks. Do not create diagrams merely to complete a checklist.
- Model concepts before tables. Produce a physical schema only for the first implementation slice.
- Every diagram must have a textual definition of its nodes, relationships, ownership, and unresolved questions.
- Record conflicting evidence explicitly. Never turn uncertainty into invented precision.
- Stop at a validated development handoff. Do not initialize or mutate the implementation repository, invoke `project-workflow`, or begin coding without user confirmation.

## Workflow

### 1. Establish the decision context

Capture the problem, expected outcome, sponsor, users, constraints, deadline drivers, existing systems, evidence sources, and success measures. Identify the decision the blueprint must enable.

Assess feasibility across four dimensions:

- product value and adoption;
- operational and process fit;
- technical and data feasibility;
- delivery, compliance, and economic constraints.

Gate: do not deepen the design until the problem is worth solving, the critical unknowns are visible, and no unresolved blocker makes the project non-viable.

### 2. Model scenarios and journeys

Identify primary and secondary actors. Define scenario cards and end-to-end user journeys, including trigger, goal, steps, touchpoints, information needed, failure paths, and desired outcome. Add a service blueprint only when backstage processes, human operations, or multiple systems materially affect the journey.

Gate: each proposed capability must trace to at least one validated scenario or explicit enabling constraint.

### 3. Bound the product

Create a capability map, define MVP versus later scope, and state non-goals. Resolve terminology into a shared glossary. Slice by demonstrable user outcome rather than technical layer.

Gate: the MVP has a coherent end-to-end outcome, explicit exclusions, and measurable acceptance signals.

### 4. Define domain boundaries

Use domain-driven design strategically: identify subdomains, bounded contexts, responsibilities, invariants, aggregate candidates, ownership, and context relationships. Use DDD only to clarify business boundaries; do not force tactical patterns onto CRUD-only areas.

Gate: every core business rule and authoritative data concept has one clear owner.

### 5. Describe the architecture

Create only views that answer real decisions. The default set is:

- system context: actors, external systems, and the product boundary;
- container/runtime view: deployable units, data stores, and major communications;
- component or module view: only for complex or high-risk containers;
- deployment/infrastructure view: only when topology, security, scale, or operations matter;
- key sequence views: only for critical, asynchronous, or failure-prone flows.

Record quality attributes, trust boundaries, integrations, failure behavior, observability, and rationale. Prefer a modular monolith unless evidence justifies distributed deployment.

Gate: the architecture supports the MVP journeys and the highest-ranked quality risks without speculative infrastructure.

### 6. Model information and data

Start with a conceptual model and business definitions. Add a logical ER model showing cardinality, lifecycle, ownership, identifiers, retention, and sensitive-data classification. Define a physical schema only for the first vertical slice and label it provisional until validated by implementation feedback.

Gate: entities trace to scenarios and domain owners; no table exists solely because a framework usually has one.

### 7. Review risk and slice delivery

Run a lightweight architecture tradeoff review against the top quality attributes. Rank assumptions and risks by impact and uncertainty. Convert the design into vertical MVP slices with dependencies, acceptance evidence, and learning goals.

Gate: high-impact blockers are resolved or explicitly accepted by the user; remaining assumptions have validation actions and owners.

### 8. Produce the handoff

Write the output pack defined in the reference contract. Validate cross-document IDs, scope, ownership, and links. Summarize:

- what is confirmed;
- what remains assumed or deferred;
- why the first slice is the right learning step;
- which decisions need ADRs during development;
- the exact inputs an implementation agent should read first.

Ask for confirmation before handing the project to `project-workflow` or beginning implementation.

## Adapt the Depth

- Small, low-risk project: charter, scenarios, capability and MVP scope, one context/container view, conceptual data model, slices, and handoff.
- Medium project: use the full default pack.
- Large, regulated, integration-heavy, or data-sensitive project: add deployment, trust-boundary, sequence, retention, migration, and operational views where evidence demands them.

The blueprint is complete when it is sufficient to make the next development decision safely, not when every possible document exists.
