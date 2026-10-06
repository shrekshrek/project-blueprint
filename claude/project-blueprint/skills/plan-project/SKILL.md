---
name: plan-project
description: Adaptively create, resume, revise, or review an AI-ready project blueprint before implementation. Use for new project inception, re-baselining a chaotic project, multi-subsystem planning, or development-readiness review; do not use for ordinary feature work in a stable project.
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
