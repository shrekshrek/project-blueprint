#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(process.argv[2] || ".");
const errors = [];
const manifestPath = path.join(root, "manifest.yaml");
let manifestDevelopmentAuthorization = null;

function error(message) { errors.push(message); }
function scalar(content, key) {
  return content.match(new RegExp(`^${key}:\\s*["']?([^"'#\\n]+)["']?\\s*(?:#.*)?$`, "m"))?.[1]?.trim();
}
function sectionItems(content, section) {
  const lines = content.split(/\r?\n/);
  const start = lines.findIndex((line) => new RegExp(`^${section}:\\s*$`).test(line));
  if (start < 0) return null;
  const items = [];
  for (let i = start + 1; i < lines.length; i += 1) {
    if (/^[A-Za-z0-9_-]+:\s*/.test(lines[i])) break;
    const match = lines[i].match(/^\s{2}-\s*(?:path:\s*)?["']?([^"'#]+?)["']?\s*(?:#.*)?$/);
    if (match) items.push(match[1].trim());
  }
  return items;
}
function records(content, section) {
  const lines = content.split(/\r?\n/);
  const start = lines.findIndex((line) => new RegExp(`^${section}:\\s*$`).test(line));
  if (start < 0) return null;
  const result = [];
  let current = null;
  for (let i = start + 1; i < lines.length; i += 1) {
    const line = lines[i];
    if (/^[A-Za-z0-9_-]+:\s*/.test(line)) break;
    const first = line.match(/^\s{2}-\s*([A-Za-z0-9_-]+):\s*(.*?)\s*$/);
    const next = line.match(/^\s{4}([A-Za-z0-9_-]+):\s*(.*?)\s*$/);
    if (first) {
      current = { [first[1]]: first[2].replace(/^["']|["']$/g, "") };
      result.push(current);
    } else if (next && current) {
      current[next[1]] = next[2].replace(/^["']|["']$/g, "");
    }
  }
  return result;
}

if (!fs.existsSync(manifestPath)) {
  error("missing manifest.yaml");
} else {
  const manifest = fs.readFileSync(manifestPath, "utf8");
  for (const key of ["schema_version", "project_name", "blueprint_version", "blueprint_status", "development_authorization"]) {
    if (!scalar(manifest, key)) error(`manifest.yaml: missing ${key}`);
  }
  const status = scalar(manifest, "blueprint_status");
  if (status && !["draft", "review", "approved"].includes(status)) error(`manifest.yaml: invalid blueprint_status ${status}`);
  manifestDevelopmentAuthorization = scalar(manifest, "development_authorization");
  if (manifestDevelopmentAuthorization && !["not_granted", "granted"].includes(manifestDevelopmentAuthorization)) {
    error(`manifest.yaml: invalid development_authorization ${manifestDevelopmentAuthorization}`);
  }
  if (manifestDevelopmentAuthorization === "granted" && status !== "approved") {
    error("manifest.yaml: development authorization requires an approved blueprint");
  }

  const canonicalFiles = sectionItems(manifest, "canonical_files");
  if (!canonicalFiles || !canonicalFiles.length) {
    error("manifest.yaml: canonical_files must list at least one file");
  } else {
    for (const relative of canonicalFiles) {
      const target = path.resolve(root, relative);
      if (path.isAbsolute(relative) || (target !== root && !target.startsWith(`${root}${path.sep}`))) {
        error(`manifest.yaml: canonical file escapes blueprint root: ${relative}`);
      } else if (!fs.existsSync(target)) {
        error(`manifest.yaml: canonical file does not exist: ${relative}`);
      }
    }
  }

  const decisions = records(manifest, "view_decisions");
  if (decisions === null) {
    error("manifest.yaml: missing view_decisions");
  } else if (decisions.length === 0) {
    error("manifest.yaml: view_decisions must record at least one evaluated concern");
  } else {
    const allowed = ["selected", "merged", "deferred", "not_applicable"];
    const seenConcerns = new Set();
    for (const [index, decision] of decisions.entries()) {
      const label = decision.concern_id || `item ${index + 1}`;
      if (!decision.concern_id) error(`view_decisions ${label}: missing concern_id`);
      if (decision.concern_id && seenConcerns.has(decision.concern_id)) error(`view_decisions ${label}: duplicate concern_id`);
      if (decision.concern_id) seenConcerns.add(decision.concern_id);
      if (!allowed.includes(decision.disposition)) error(`view_decisions ${label}: invalid disposition`);
      if (!decision.rationale || ["", "null", "~"].includes(decision.rationale)) error(`view_decisions ${label}: missing rationale`);
      if (decision.disposition === "deferred" && (!decision.revisit_trigger || ["", "null", "~"].includes(decision.revisit_trigger))) {
        error(`view_decisions ${label}: deferred item needs revisit_trigger`);
      }
    }
  }
}

function walk(directory, prefix = "") {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const relative = path.join(prefix, entry.name);
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target, relative) : [relative];
  });
}
const files = walk(root);
for (const relative of files.filter((entry) => /handoff.*\.ya?ml$/i.test(entry))) {
  const content = fs.readFileSync(path.join(root, relative), "utf8");
  if (!/^requires_development_authorization:\s*true\s*$/m.test(content)) {
    error(`${relative}: requires_development_authorization must be true`);
  }
  const handoffAuthorization = scalar(content, "development_authorization");
  if (!["not_granted", "granted"].includes(handoffAuthorization)) error(`${relative}: invalid development_authorization`);
  if (manifestDevelopmentAuthorization && handoffAuthorization && handoffAuthorization !== manifestDevelopmentAuthorization) {
    error(`${relative}: development_authorization differs from manifest.yaml`);
  }
  if (!/^read_first:\s*$/m.test(content)) error(`${relative}: missing read_first`);
  if (!/^first_slice_id:\s*\S+/m.test(content)) error(`${relative}: missing first_slice_id`);
}

if (errors.length) {
  console.error(`Blueprint validation failed (${errors.length}):`);
  for (const item of errors) console.error(`- ${item}`);
  process.exit(1);
}
console.log(`Blueprint validation OK: ${root}`);
