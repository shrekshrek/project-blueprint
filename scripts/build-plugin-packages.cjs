#!/usr/bin/env node
const fs = require("node:fs");
const os = require("node:os");
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

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
}
function copyDirectory(source, target, transform = (value) => value) {
  for (const file of walk(source)) {
    const relative = path.relative(source, file);
    const destination = path.join(target, relative);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    const content = fs.readFileSync(file);
    if (/\.(?:md|json|yaml|cjs)$/.test(file)) {
      fs.writeFileSync(destination, transform(content.toString("utf8")));
    } else {
      fs.writeFileSync(destination, content);
    }
  }
}
function copyFile(source, target) {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
}
function skillNames(directory) {
  return fs.readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && fs.existsSync(path.join(directory, entry.name, "SKILL.md")))
    .map((entry) => entry.name).sort();
}
function same(left, right) {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}
function requirePath(packageRoot, relative) {
  if (!fs.existsSync(path.join(packageRoot, relative))) {
    throw new Error(`${path.basename(path.dirname(packageRoot))} package missing ${relative}`);
  }
}
function validatePackage(packageRoot, host) {
  const manifestRelative = host === "claude"
    ? ".claude-plugin/plugin.json"
    : ".codex-plugin/plugin.json";
  requirePath(packageRoot, manifestRelative);
  const manifest = JSON.parse(fs.readFileSync(path.join(packageRoot, manifestRelative), "utf8"));
  if (manifest.name !== "project-blueprint") throw new Error(`${host} manifest name changed`);
  if (host === "codex" && manifest.skills !== "./skills/") {
    throw new Error("Codex manifest skills path must be ./skills/");
  }

  const names = skillNames(path.join(packageRoot, "skills"));
  if (!same(names, actions)) throw new Error(`${host} package action set differs: ${names.join(", ")}`);
  for (const action of actions) requirePath(packageRoot, `docs/actions/${action}.md`);
  for (const role of roles) requirePath(packageRoot, `docs/reviewers/${role}.md`);
  for (const relative of [
    "docs/methodology/artifact-contract.md",
    "docs/methodology/view-selection.md",
    "scripts/validate-blueprint.cjs",
    "LICENSE",
  ]) requirePath(packageRoot, relative);

  if (host === "claude") {
    const agentNames = fs.readdirSync(path.join(packageRoot, "agents"))
      .filter((name) => name.endsWith(".md"))
      .map((name) => name.replace(/\.md$/, ""))
      .sort();
    if (!same(agentNames, roles)) throw new Error(`Claude package agent set differs: ${agentNames.join(", ")}`);
  } else if (fs.existsSync(path.join(packageRoot, "agents"))) {
    throw new Error("Codex package must use reviewer specs through native subagents");
  }
  return manifest.version;
}
function build(host, output) {
  const packageRoot = path.join(output, host, "project-blueprint");
  const transform = host === "codex"
    ? (content) => content.replaceAll("../../../../docs/", "../../docs/")
    : (content) => content;
  copyDirectory(path.join(root, "adapters", host), packageRoot, transform);
  for (const directory of ["actions", "reviewers", "methodology"]) {
    copyDirectory(path.join(root, "docs", directory), path.join(packageRoot, "docs", directory));
  }
  copyFile(path.join(root, "scripts/validate-blueprint.cjs"), path.join(packageRoot, "scripts/validate-blueprint.cjs"));
  copyFile(path.join(root, "LICENSE"), path.join(packageRoot, "LICENSE"));
  return packageRoot;
}
function writeJson(target, value) {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, `${JSON.stringify(value, null, 2)}\n`);
}
function writeGeneratedMarketplaces(outputRoot) {
  writeJson(path.join(outputRoot, ".claude-plugin/marketplace.json"), {
    name: "project-blueprint",
    owner: { name: "shrek.wang" },
    metadata: { description: "Evidence-backed project inception for AI-ready development blueprints" },
    plugins: [{ name: "project-blueprint", source: "./claude/project-blueprint" }],
  });
  writeJson(path.join(outputRoot, ".agents/plugins/marketplace.json"), {
    name: "project-blueprint",
    interface: { displayName: "Project Blueprint" },
    plugins: [{
      name: "project-blueprint",
      source: { source: "local", path: "./codex/project-blueprint" },
      policy: { installation: "AVAILABLE", authentication: "ON_INSTALL" },
      category: "Productivity",
    }],
  });
}
function validateGeneratedMarketplaces(outputRoot) {
  const claude = JSON.parse(fs.readFileSync(path.join(outputRoot, ".claude-plugin/marketplace.json"), "utf8"));
  const codex = JSON.parse(fs.readFileSync(path.join(outputRoot, ".agents/plugins/marketplace.json"), "utf8"));
  if (claude.plugins?.[0]?.name !== "project-blueprint" || claude.plugins?.[0]?.source !== "./claude/project-blueprint") {
    throw new Error("Generated Claude marketplace source is invalid");
  }
  const plugin = codex.plugins?.[0];
  if (plugin?.name !== "project-blueprint" || plugin?.source?.source !== "local" || plugin?.source?.path !== "./codex/project-blueprint") {
    throw new Error("Generated Codex marketplace source is invalid");
  }
  if (plugin.policy?.installation !== "AVAILABLE" || plugin.policy?.authentication !== "ON_INSTALL") {
    throw new Error("Generated Codex marketplace policy is invalid");
  }
}
function parse() {
  if (process.argv.length === 3 && process.argv[2] === "--check") {
    const temp = fs.mkdtempSync(path.join(fs.realpathSync(os.tmpdir()), "project-blueprint-packages-"));
    return { output: path.join(temp, "dist"), temporary: temp };
  }
  if (process.argv.length === 4 && process.argv[2] === "--out") return { output: path.resolve(process.argv[3]) };
  throw new Error("Usage: node scripts/build-plugin-packages.cjs --check | --out <empty-directory>");
}

let options;
try {
  options = parse();
  if (fs.existsSync(options.output) && fs.readdirSync(options.output).length) throw new Error("output must be empty");
  fs.mkdirSync(options.output, { recursive: true });
  const claude = build("claude", options.output);
  const codex = build("codex", options.output);
  writeGeneratedMarketplaces(options.output);
  const cv = validatePackage(claude, "claude");
  const xv = validatePackage(codex, "codex");
  if (cv !== xv) throw new Error("packaged manifest versions differ");
  validateGeneratedMarketplaces(options.output);
  console.log(`Plugin packages built: v${cv} (Claude + Codex + marketplaces)`);
} finally {
  if (options?.temporary) fs.rmSync(options.temporary, { recursive: true, force: true });
}
