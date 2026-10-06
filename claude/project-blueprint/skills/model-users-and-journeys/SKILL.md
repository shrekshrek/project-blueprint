---
name: model-users-and-journeys
description: Model actors, jobs, scenarios, journeys, failure paths, and conditional service-blueprint lanes when user or operational workflows shape product decisions.
---

# model-users-and-journeys

Match the user's language. Read `${CLAUDE_PLUGIN_ROOT}/docs/actions/README.md` and `${CLAUDE_PLUGIN_ROOT}/docs/actions/model-users-and-journeys.md` completely. Follow the shared conventions and the action-specific canonical method.

Claude execution details:

- Read any methodology files required by the canonical action from `${CLAUDE_PLUGIN_ROOT}/docs/methodology/`.
- Treat invocation content as input already supplied; do not re-ask it.
- Use repository and web tools only when the action's evidence boundary requires them.
- Keep canonical Markdown, YAML, and Mermaid source readable and cite changed artifact paths.
- Do not start implementation or invoke another workflow without explicit user approval.
