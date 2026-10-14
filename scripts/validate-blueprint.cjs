#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(process.argv[2] || ".");
const errors = [];
const manifestPath = path.join(root, "manifest.yaml");
let manifestDevelopmentAuthorization = null;
let manifest = "";
let canonicalFiles = [];
const canonicalText = new Map();

function error(message) { errors.push(message); }
function scalar(content, key) {
  const value = content.match(new RegExp(`^${key}:[ \t]*["']?([^"'#\\n]+)["']?[ \t]*(?:#.*)?$`, "m"))?.[1]?.trim();
  return ["null", "~", ""].includes(value) ? undefined : value;
}
function sectionItems(content, section) {
  const inline = content.match(new RegExp(`^${section}:\\s*\\[([^\\]\\n]*)\\]\\s*(?:#.*)?$`, "m"));
  if (inline) return inline[1].trim() ? inline[1].split(",").map((item) => item.trim().replace(/^["']|["']$/g, "")) : [];
  const lines = content.split(/\r?\n/);
  const start = lines.findIndex((line) => new RegExp(`^${section}:\\s*$`).test(line));
  if (start < 0) return null;
  const items = [];
  for (let i = start + 1; i < lines.length; i += 1) {
    if (/^[A-Za-z0-9_-]+:\s*/.test(lines[i])) break;
    const match = lines[i].match(/^\s{2}-\s*(?:path:\s*)?["']?([^"'#]+?)["']?\s*(?:#.*)?$/);
    if (match) items.push(match[1].trim());
    else if (lines[i].trim() && !lines[i].trim().startsWith("#")) return null;
  }
  return items.length ? items : null;
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

function checkDuplicateKeys(content, label) {
  const seen = new Set();
  for (const match of content.matchAll(/^([A-Za-z0-9_-]+):/gm)) {
    if (seen.has(match[1])) error(`${label}: duplicate key ${match[1]}`);
    seen.add(match[1]);
  }
}
function safeFile(relative, label) {
  const target = path.resolve(root, relative);
  if (path.isAbsolute(relative) || !target.startsWith(`${root}${path.sep}`)) {
    error(`${label}: file escapes blueprint root: ${relative}`); return null;
  }
  if (!fs.existsSync(target) || !fs.statSync(target).isFile()) {
    error(`${label}: file does not exist or is not a file: ${relative}`); return null;
  }
  if (!fs.realpathSync(target).startsWith(`${fs.realpathSync(root)}${path.sep}`)) {
    error(`${label}: file escapes blueprint root through symlink: ${relative}`); return null;
  }
  return target;
}

if (!fs.existsSync(manifestPath)) {
  error("missing manifest.yaml");
} else {
  manifest = fs.readFileSync(manifestPath, "utf8");
  checkDuplicateKeys(manifest, "manifest.yaml");
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

  canonicalFiles = sectionItems(manifest, "canonical_files") || [];
  if (!canonicalFiles || !canonicalFiles.length) {
    error("manifest.yaml: canonical_files must list at least one file");
  } else {
    for (const relative of canonicalFiles) {
      const target = safeFile(relative, "canonical_files");
      if (target) canonicalText.set(relative, fs.readFileSync(target, "utf8"));
    }
  }

  const decisions = records(manifest, "view_decisions");
  if (decisions?.length) {
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

// Check presence, not document layout or semantic authority; those belong to review.
const referencedIds = new Set();
for (const [relative, content] of canonicalText) {
  if (/^handoff_status:|^first_slice_id:/m.test(content) || /handoff.*\.ya?ml$/i.test(relative)) continue;
  for (const match of content.matchAll(/\b[A-Z][A-Z0-9]*-[A-Za-z0-9_-]+\b/g)) referencedIds.add(match[0]);
}
for (const [relative, content] of canonicalText) {
  if (!/^handoff_status:|^first_slice_id:/m.test(content) && !/handoff.*\.ya?ml$/i.test(relative)) continue;
  checkDuplicateKeys(content, relative);
  const handoffStatus = scalar(content, "handoff_status");
  const handoffBlueprintStatus = scalar(content, "blueprint_status");
  if (!["draft", "review", "approved"].includes(handoffBlueprintStatus)) error(`${relative}: invalid blueprint_status`);
  if (!["draft", "ready", "stale"].includes(handoffStatus)) error(`${relative}: invalid handoff_status`);
  for (const key of ["project_name", "blueprint_version", "development_authorization"]) {
    const value = scalar(content, key);
    if (!value) error(`${relative}: missing ${key}`);
    if ((handoffStatus !== "stale" || key === "project_name") && value !== scalar(manifest, key)) {
      error(`${relative}: ${key} differs from manifest.yaml`);
    }
  }
  if (handoffStatus !== "stale" && handoffBlueprintStatus !== scalar(manifest, "blueprint_status")) {
    error(`${relative}: blueprint_status differs from manifest.yaml`);
  }
  if (!/^requires_development_authorization:\s*true\s*$/m.test(content)) error(`${relative}: requires_development_authorization must be true`);
  if (!["not_granted", "granted"].includes(scalar(content, "development_authorization"))) error(`${relative}: invalid development_authorization`);
  if (scalar(content, "development_authorization") === "granted" && handoffBlueprintStatus !== "approved") {
    error(`${relative}: development authorization requires approved content`);
  }
  if (handoffStatus === "ready") {
    if (handoffBlueprintStatus !== "approved" || scalar(manifest, "blueprint_status") !== "approved") {
      error(`${relative}: ready handoff requires an approved blueprint`);
    }
    for (const [owner, text] of [["manifest.yaml", manifest], [relative, content]]) {
      const blockers = sectionItems(text, "open_blockers");
      if (blockers === null || blockers.length) error(`${owner}: ready handoff requires an explicit empty open_blockers list`);
    }
  }
  const readFirst = sectionItems(content, "read_first");
  if (!readFirst?.length) error(`${relative}: read_first must be nonempty`);
  for (const entry of readFirst || []) safeFile(entry, `${relative}: read_first`);
  const slices = sectionItems(content, "slice_refs");
  const first = scalar(content, "first_slice_id");
  if (!first || !slices?.includes(first)) error(`${relative}: first_slice_id must belong to slice_refs`);
  for (const key of ["slice_refs", "decision_refs", "contract_refs"]) {
    const refs = sectionItems(content, key);
    if (refs === null) { error(`${relative}: missing or invalid ${key}`); continue; }
    for (const id of refs) {
      if (handoffStatus !== "stale" && !referencedIds.has(id)) error(`${relative}: unresolved ${key} ID ${id}`);
    }
  }
}

if (errors.length) {
  console.error(`Blueprint validation failed (${errors.length}):`);
  for (const item of errors) console.error(`- ${item}`);
  process.exit(1);
}
console.log(`Blueprint validation OK: ${root}`);
