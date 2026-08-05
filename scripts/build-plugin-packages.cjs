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
  const names = skillNames(path.join(packageRoot, "skills"));
  if (JSON.stringify(names) !== JSON.stringify(actions)) throw new Error(`${host} package action set differs`);
  for (const action of actions) {
    if (!fs.existsSync(path.join(packageRoot, "docs/actions", `${action}.md`))) throw new Error(`${host}: missing action ${action}`);
  }
  return packageRoot;
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
  const cv = JSON.parse(fs.readFileSync(path.join(claude, ".claude-plugin/plugin.json"), "utf8")).version;
  const xv = JSON.parse(fs.readFileSync(path.join(codex, ".codex-plugin/plugin.json"), "utf8")).version;
  if (cv !== xv) throw new Error("packaged manifest versions differ");
  console.log(`Plugin packages built: v${cv} (Claude + Codex)`);
} finally {
  if (options?.temporary) fs.rmSync(options.temporary, { recursive: true, force: true });
}
