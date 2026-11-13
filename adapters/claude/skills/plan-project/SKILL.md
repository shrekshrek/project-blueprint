---
name: plan-project
description: Use when two or more features need one shared decision, such as who owns data or when a version is fixed. Resolve just that decision and stop. Also create, resume, revise or review project blueprints for inception, re-baselining, multi-subsystem planning or development readiness. Ordinary feature work using settled rules stays in Workflow.
---

# plan-project

Match the user's language. Read `${CLAUDE_PLUGIN_ROOT}/docs/actions/README.md` and `${CLAUDE_PLUGIN_ROOT}/docs/actions/plan-project.md` completely. Follow the shared conventions and the action-specific canonical method.

Claude execution details:

- Read any methodology files required by the canonical action from `${CLAUDE_PLUGIN_ROOT}/docs/methodology/`.
- Treat invocation content as input already supplied; do not re-ask it.
- Use repository and web tools only when the action's evidence boundary requires them.
- When the action makes a support role applicable, dispatch a fresh named agent from this plugin: `evidence-researcher`, `product-challenger`, `domain-data-reviewer`, `architecture-reviewer`, `consistency-auditor`. Give it only the bounded inputs required by its canonical role spec.
- Keep canonical Markdown, YAML, and Mermaid source readable and cite changed artifact paths.
- Do not start implementation or invoke another workflow without explicit user approval.
