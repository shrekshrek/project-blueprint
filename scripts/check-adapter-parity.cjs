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

const ciWorkflow = read(".github/workflows/ci.yml");
for (const marker of [
  "  validate:",
  "  publish:",
  "    needs: validate",
  "needs.validate.outputs.release",
  "needs.validate.outputs.commit_ver",
  "      contents: write",
  "actions/checkout@v7",
  "actions/setup-node@v7",
  "node-version: 20",
  "node scripts/check-all.cjs",
  "node scripts/build-plugin-packages.cjs --out",
  "git push --force origin plugin-dist",
]) {
  if (!ciWorkflow.includes(marker)) problems.push(`CI workflow: missing ${JSON.stringify(marker)}`);
}
if ((ciWorkflow.match(/branches: \[main\]/g) || []).length !== 2) {
  problems.push("CI workflow: push and pull_request must both target main");
}
if ((ciWorkflow.match(/actions\/checkout@v7/g) || []).length !== 2) {
  problems.push("CI workflow: validate and publish must both use actions/checkout@v7");
}
if ((ciWorkflow.match(/actions\/setup-node@v7/g) || []).length !== 2) {
  problems.push("CI workflow: validate and publish must both use actions/setup-node@v7");
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

const claudeMarketplace = JSON.parse(read(".claude-plugin/marketplace.json") || "{}");
const codexMarketplace = JSON.parse(read(".agents/plugins/marketplace.json") || "{}");
const claudeListing = claudeMarketplace.plugins?.[0];
const codexListing = codexMarketplace.plugins?.[0];
if (claudeMarketplace.name !== "project-blueprint" || claudeListing?.name !== "project-blueprint") {
  problems.push("Claude marketplace identity must be project-blueprint");
}
if (claudeListing?.source?.source !== "git-subdir"
  || claudeListing?.source?.path !== "claude/project-blueprint"
  || claudeListing?.source?.ref !== "plugin-dist") {
  problems.push("Claude marketplace must target claude/project-blueprint on plugin-dist");
}
if (codexMarketplace.name !== "project-blueprint" || codexListing?.name !== "project-blueprint") {
  problems.push("Codex marketplace identity must be project-blueprint");
}
if (codexListing?.source?.source !== "git-subdir"
  || codexListing?.source?.path !== "./codex/project-blueprint"
  || codexListing?.source?.ref !== "plugin-dist") {
  problems.push("Codex marketplace must target codex/project-blueprint on plugin-dist");
}
if (codexListing?.policy?.installation !== "AVAILABLE"
  || codexListing?.policy?.authentication !== "ON_INSTALL") {
  problems.push("Codex marketplace policy must be AVAILABLE/ON_INSTALL");
}
if (codexListing?.category !== "Productivity") problems.push("Codex marketplace category must be Productivity");

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
