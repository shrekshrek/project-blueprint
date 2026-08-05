---
name: model-domain
description: "Clarify domain language, business rules, ownership, subdomains, bounded contexts, and cross-context contracts when domain complexity warrants it."
---

# model-domain (Codex)

Match the user's language. Read [the shared action conventions](../../../../docs/actions/README.md) and [the canonical action](../../../../docs/actions/model-domain.md) completely, then follow both.

- Read any methodology files required by the action from [the shared methodology directory](../../../../docs/methodology/).
- Treat invocation content as input already supplied; do not re-ask it.
- Use repository and web tools only when the action's evidence boundary requires them.
- When a support role is applicable and subagent capacity exists, use a fresh general subagent with the matching canonical spec: [`domain-data-reviewer`](../../../../docs/reviewers/domain-data-reviewer.md). Provide only bounded evidence and do not reveal an expected conclusion.
- If dispatch is unavailable, apply the same role spec in the main session and disclose the fallback; never silently skip a required role.
- Keep canonical Markdown, YAML, and Mermaid source readable and cite changed artifact paths.
- Do not start implementation or invoke another workflow without explicit user approval.
