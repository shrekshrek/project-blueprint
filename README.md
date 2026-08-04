# Project Blueprint

Project Blueprint is a Codex plugin for the work that should happen **before implementation starts**. It turns an uncertain project idea into a compact, evidence-backed blueprint that an AI development agent can follow without inventing product, domain, architecture, or data decisions.

```text
project idea
    ↓
project-blueprint   feasibility → scenarios → scope → domain → architecture → data → slices
    ↓               AI-ready development handoff
project-workflow    spec → plan → tasks → implementation → verification → archive
```

## Why

Large AI-assisted projects often accumulate features faster than their boundaries and data ownership can stabilize. The result is repeated implementation, schema churn, and contradictory specifications. Project Blueprint moves the expensive questions forward while keeping the planning depth proportional to risk.

The canonical output is Markdown, YAML, and Mermaid with stable IDs and explicit evidence status. Interactive HTML can be added as a renderer later; it is deliberately not the source of truth.

## Included in v0.1

- `$plan-project`, an end-to-end project-inception skill;
- feasibility review across product, operational, technical/data, and delivery constraints;
- scenario, user-journey, capability, DDD boundary, architecture, ER/data, quality-risk, and MVP-slice guidance;
- a defined eleven-file blueprint contract;
- a handoff boundary for [project-workflow](https://github.com/shrekshrek/project-workflow).

This first version defines and validates the planning method. Automated HTML rendering and blueprint linting are planned follow-up features, not v0.1 claims.

## Repository layout

```text
.codex-plugin/plugin.json                 plugin manifest
skills/plan-project/SKILL.md              planning workflow
skills/plan-project/references/           output contract
docs/specs/                                current product truth
docs/adr/                                  durable architecture decisions
```

## Development validation

Use the validators bundled with Codex's `plugin-creator` and `skill-creator` skills when available. At minimum, validate JSON syntax and ensure no scaffold placeholders remain:

```bash
python3 -m json.tool .codex-plugin/plugin.json
rg -n '\[TODO|TODO:' .codex-plugin skills
```

## Status

`0.1.0` — initial public method and plugin scaffold. The contract may evolve while preserving stable IDs and explicit versioning.

## License

[MIT](LICENSE)
