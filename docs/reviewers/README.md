# Blueprint support roles

These are canonical researcher, reviewer, and auditor specifications. They are not five mandatory always-on agents.

The owning action decides applicability. A host with subagent capability should use a fresh invocation with the smallest sufficient evidence set. When dispatch is unavailable, the main agent may apply the same role contract sequentially, must disclose the fallback, and must not silently omit a required review.

Roles return findings to the owning action; they do not take over the user conversation or make unconfirmed product decisions.

| Role | Purpose |
|---|---|
| [`evidence-researcher`](evidence-researcher.md) | Verify external or repository facts and expose conflicts |
| [`product-challenger`](product-challenger.md) | Challenge value, evidence, scope, and simpler alternatives |
| [`domain-data-reviewer`](domain-data-reviewer.md) | Review domain semantics, ownership, rules, and data contracts |
| [`architecture-reviewer`](architecture-reviewer.md) | Review system boundaries, quality attributes, runtime, and complexity |
| [`consistency-auditor`](consistency-auditor.md) | Verify traceability and revision impact closure across the blueprint |
