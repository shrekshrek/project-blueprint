#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const actions = [
  "define-product-scope", "design-architecture", "frame-project", "model-data",
  "model-domain", "model-users-and-journeys", "plan-delivery", "plan-project",
  "review-blueprint",
];
const roles = [
  "architecture-reviewer", "consistency-auditor", "domain-data-reviewer",
  "evidence-researcher", "product-challenger",
];
const requiredRoleRefs = {
  "plan-project": roles,
  "frame-project": ["evidence-researcher", "product-challenger"],
  "define-product-scope": ["product-challenger"],
  "model-domain": ["domain-data-reviewer"],
  "design-architecture": ["architecture-reviewer"],
  "model-data": ["domain-data-reviewer"],
  "review-blueprint": roles,
};
const problems = [];

function filesIn(directory, filename) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .filter((entry) => fs.existsSync(path.join(directory, entry.name, filename)))
    .map((entry) => entry.name)
    .sort();
}
function same(left, right) {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}
function read(relative) {
  const target = path.join(root, relative);
  if (!fs.existsSync(target)) {
    problems.push(`missing ${relative}`);
    return "";
  }
  return fs.readFileSync(target, "utf8");
}
function checkLinks(relative, content) {
  for (const match of content.matchAll(/\]\(([^)#]+)(?:#[^)]+)?\)/g)) {
    const ref = match[1];
    if (/^(?:https?:|mailto:)/.test(ref) || ref.includes("$")) continue;
    const target = path.resolve(path.dirname(path.join(root, relative)), ref);
    if (!fs.existsSync(target)) problems.push(`${relative}: broken link ${ref}`);
  }
}

const claudeRoot = path.join(root, "adapters/claude/skills");
const codexRoot = path.join(root, "adapters/codex/skills");
const claudeActions = filesIn(claudeRoot, "SKILL.md");
const codexActions = filesIn(codexRoot, "SKILL.md");
if (!same(actions, claudeActions)) problems.push(`Claude action set: ${claudeActions.join(", ")}`);
if (!same(actions, codexActions)) problems.push(`Codex action set: ${codexActions.join(", ")}`);

const claudeManifest = JSON.parse(read("adapters/claude/.claude-plugin/plugin.json") || "{}");
const codexManifest = JSON.parse(read("adapters/codex/.codex-plugin/plugin.json") || "{}");
if (claudeManifest.name !== "project-blueprint" || codexManifest.name !== "project-blueprint") {
  problems.push("plugin identity must be project-blueprint");
}
if (claudeManifest.version !== codexManifest.version) problems.push("manifest versions differ");
if (codexManifest.skills !== "./skills/") problems.push("Codex skills path must be ./skills/");
if ((codexManifest.interface?.defaultPrompt?.length || 0) > 3) problems.push("Codex defaultPrompt supports at most 3 entries");

for (const action of actions) {
  const canonical = read(`docs/actions/${action}.md`);
  if (!canonical.includes("## Outputs") && !canonical.includes("## Output")) {
    problems.push(`docs/actions/${action}.md: missing output contract`);
  }
  for (const host of ["claude", "codex"]) {
    const relative = `adapters/${host}/skills/${action}/SKILL.md`;
    const content = read(relative);
    const declared = content.match(/^name:\s*(.+)$/m)?.[1]?.replace(/^["']|["']$/g, "");
    if (declared !== action) problems.push(`${relative}: frontmatter name is ${declared || "missing"}`);
    if (!content.includes(`docs/actions/${action}.md`)) problems.push(`${relative}: canonical action reference missing`);
    if (content.split(/\r?\n/).length > 80) problems.push(`${relative}: adapter is not thin`);
    if (host === "codex" && /CLAUDE_PLUGIN_ROOT|named agent|Task tool/.test(content)) {
      problems.push(`${relative}: Claude-only runtime marker`);
    }
    for (const role of requiredRoleRefs[action] || []) {
      if (!content.includes(role)) problems.push(`${relative}: required role reference missing: ${role}`);
    }
    checkLinks(relative, content);
  }
}

const claudeAgentsDir = path.join(root, "adapters/claude/agents");
const claudeRoles = fs.existsSync(claudeAgentsDir)
  ? fs.readdirSync(claudeAgentsDir).filter((name) => name.endsWith(".md")).map((name) => name.slice(0, -3)).sort()
  : [];
if (!same(roles, claudeRoles)) problems.push(`Claude role adapters: ${claudeRoles.join(", ")}`);
if (fs.existsSync(path.join(root, "adapters/codex/agents"))) problems.push("Codex must use canonical role specs through native subagents");

for (const role of roles) {
  const canonical = read(`docs/reviewers/${role}.md`);
  if (!canonical.includes("## Output")) problems.push(`docs/reviewers/${role}.md: missing output contract`);
  const relative = `adapters/claude/agents/${role}.md`;
  const adapter = read(relative);
  if (!adapter.includes(`docs/reviewers/${role}.md`)) problems.push(`${relative}: canonical role reference missing`);
  if (/^model:/m.test(adapter)) problems.push(`${relative}: model selection must remain host-controlled`);
}

for (const directory of ["docs/actions", "docs/reviewers", "docs/methodology"]) {
  for (const name of fs.readdirSync(path.join(root, directory)).filter((entry) => entry.endsWith(".md"))) {
    const relative = `${directory}/${name}`;
    const content = read(relative);
    checkLinks(relative, content);
  }
}
const scanRoots = ["docs/actions", "docs/reviewers", "docs/methodology", "adapters"];
function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
}
for (const scanRoot of scanRoots) {
  for (const file of walk(path.join(root, scanRoot))) {
    if (!/\.(?:md|json|yaml)$/.test(file)) continue;
    const content = fs.readFileSync(file, "utf8");
    if (/\{\{TODO|\[TODO|TODO:/.test(content)) problems.push(`${path.relative(root, file)}: unresolved placeholder`);
  }
}

if (problems.length) {
  console.error("Adapter/core validation failed:");
  for (const problem of problems) console.error(`- ${problem}`);
  process.exit(1);
}
console.log("Adapter parity OK: 9 actions, 5 Claude role adapters, one canonical core.");
