#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const roles = ["architecture-reviewer", "consistency-auditor", "domain-data-reviewer", "evidence-researcher", "product-challenger"];
const rolesByAction = {
  "plan-project": roles,
  "frame-project": ["evidence-researcher", "product-challenger"],
  "define-product-scope": ["product-challenger"],
  "model-domain": ["domain-data-reviewer"],
  "design-architecture": ["architecture-reviewer"],
  "model-data": ["domain-data-reviewer"],
  "review-blueprint": roles,
};
const problems = [];
const read = file => fs.readFileSync(path.join(root, file), "utf8");

for (const directory of ["entries", "docs/actions", "docs/reviewers", "docs/methodology"]) {
  for (const name of fs.readdirSync(path.join(root, directory)).filter(file => file.endsWith(".md"))) {
    const file = path.posix.join(directory, name);
    const content = read(file);
    if (/\{\{TODO|\[TODO|TODO:/.test(content)) problems.push(`${file}: unresolved placeholder`);
    const targets = new Set();
    for (const match of content.matchAll(/\]\(([^)#]+)(?:#[^)]*)?\)/g)) {
      if (/^[a-z]+:/i.test(match[1])) continue;
      const target = path.posix.join(directory, match[1]);
      targets.add(target);
      if (!fs.existsSync(path.join(root, target))) problems.push(`${file}: broken link ${match[1]}`);
    }
    if (name === "README.md") continue;
    if (directory === "docs/actions" || directory === "docs/reviewers") {
      if (!/^## Outputs?\b/m.test(content)) problems.push(`${file}: missing output contract`);
    }
    if (directory !== "entries") continue;
    const action = path.basename(name, ".md");
    const required = ["docs/actions/README.md", `docs/actions/${name}`];
    for (const role of rolesByAction[action] || []) required.push(`docs/reviewers/${role}.md`);
    for (const target of required) {
      if (!targets.has(target)) problems.push(`${file}: missing direct reference to ${target}`);
    }
    if (!content.includes("Match the user's language") || content.trimEnd().split("\n").length > 80) {
      problems.push(`${file}: check entry length and user-language instruction`);
    }
    if (/CLAUDE_PLUGIN_ROOT|\.codex-plugin\/plugin\.json|\/project-blueprint:/.test(content)) {
      problems.push(`${file}: requires legacy plugin discovery or invocation`);
    }
  }
}
if (problems.length) {
  console.error(problems.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Blueprint action, reviewer and reference contracts OK.");
}
