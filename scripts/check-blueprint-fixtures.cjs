#!/usr/bin/env node
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const root = path.resolve(__dirname, "..");
const validator = path.join(root, "scripts/validate-blueprint.cjs");
const cases = [
  ["valid-minimal", 0],
  ["invalid-missing-reason", 1],
  ["invalid-root-escape", 1],
  ["invalid-approval-mismatch", 1],
];
const failures = [];
for (const [name, expected] of cases) {
  const result = spawnSync(process.execPath, [validator, path.join(root, "tests/fixtures", name)], { encoding: "utf8" });
  const actual = result.status ?? 1;
  if (actual !== expected) failures.push(`${name}: expected ${expected}, got ${actual}\n${result.stdout}${result.stderr}`);
}
let mutationCount = 0;
function probe(name, mutate, expected, message) {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), "blueprint-fixture-"));
  try {
    fs.cpSync(path.join(root, "tests/fixtures/valid-minimal"), temp, { recursive: true });
    const edit = (file, from, to) => {
      const target = path.join(temp, file);
      const text = fs.readFileSync(target, "utf8");
      if (!text.includes(from)) throw new Error(`${name}: missing mutation target ${from}`);
      fs.writeFileSync(target, text.replace(from, to));
    };
    mutate(edit, temp);
    const result = spawnSync(process.execPath, [validator, temp], { encoding: "utf8" });
    if (result.status !== expected || (message && !`${result.stdout}${result.stderr}`.includes(message))) {
      failures.push(`${name}: unexpected verdict\n${result.stdout}${result.stderr}`);
    }
    mutationCount += 1;
  } finally { fs.rmSync(temp, { recursive: true, force: true }); }
}
const handoff = "development-handoff.yaml";
function approve(edit) {
  edit("manifest.yaml", "blueprint_status: review", "blueprint_status: approved");
  edit("manifest.yaml", "open_blockers:", "open_blockers: []");
  edit(handoff, "blueprint_status: review", "blueprint_status: approved");
  edit(handoff, "handoff_status: draft", "handoff_status: ready");
}
probe("ready without development grant", approve, 0);
probe("preserved grant", (e) => {
  approve(e);
  for (const file of ["manifest.yaml", handoff]) e(file, "development_authorization: not_granted", "development_authorization: granted");
}, 0);
probe("missing read-first", (e) => e(handoff, "  - charter.md", "  - missing.md"), 1, "read_first: file does not exist");
probe("empty read-first", (e) => e(handoff, "read_first:\n  - charter.md", "read_first: []"), 1, "read_first must be nonempty");
probe("approval mismatch", (e) => e(handoff, "blueprint_status: review", "blueprint_status: approved"), 1, "blueprint_status differs");
probe("version mismatch", (e) => e(handoff, 'blueprint_version: "0.1.0"', 'blueprint_version: "0.2.0"'), 1, "blueprint_version differs");
probe("project mismatch", (e) => e(handoff, "project_name: habit-tracker", "project_name: other"), 1, "project_name differs");
probe("authorization mismatch", (e) => e(handoff, "development_authorization: not_granted", "development_authorization: granted"), 1, "development_authorization differs");
probe("undefined slice", (e) => e("charter.md", "SLC-001", "SLC-002"), 1, "unresolved slice_refs ID SLC-001");
probe("first slice absent from references", (e) => e(handoff, "first_slice_id: SLC-001", "first_slice_id: SLC-002"), 1, "must belong to slice_refs");
for (const kind of ["decision", "contract"]) {
  probe(`undefined ${kind}`, (e) => e(handoff, `${kind}_refs: []`, `${kind}_refs:\n  - REF-404`), 1, `unresolved ${kind}_refs`);
}
probe("repeated ID mention", (e, dir) => fs.appendFileSync(path.join(dir, "charter.md"), "\n## SLC-001 Duplicate\n"), 0);
probe("prose layout", (e) => e("charter.md", "## SLC-001", "Slice SLC-001"), 0);
probe("table definition", (e) => e("charter.md", "## SLC-001 Record and review a daily habit", "| SLC-001 | Record and review a daily habit |"), 0);
probe("heading punctuation", (e) => e("charter.md", "## SLC-001 Record", "## SLC-001: Record"), 0);
probe("YAML definition", (e, dir) => {
  e("charter.md", "## SLC-001", "See SLC-001");
  fs.writeFileSync(path.join(dir, "slices.yaml"), "slices:\n  - id: SLC-001\n    name: Record habit\n");
  e("manifest.yaml", "  - charter.md", "  - charter.md\n  - slices.yaml");
}, 0);
probe("list layout", (e) => e("charter.md", "## SLC-001", "- **SLC-001**"), 0);
for (const replacement of ["", "view_decisions: []\n"]) {
  probe(`optional view decisions: ${replacement.trim() || "omitted"}`, (e, dir) => {
    const file = path.join(dir, "manifest.yaml");
    fs.writeFileSync(file, fs.readFileSync(file, "utf8").replace(/view_decisions:[\s\S]*?(?=open_blockers:)/, replacement));
  }, 0);
}
probe("handoff with a purpose-based filename", (e, dir) => {
  fs.renameSync(path.join(dir, handoff), path.join(dir, "next-step.yaml"));
  e("manifest.yaml", handoff, "next-step.yaml");
}, 0);
probe("inline reference lists", (e) => e(handoff, "slice_refs:\n  - SLC-001", "slice_refs: [SLC-001]"), 0);
probe("ready with blockers", (e) => { approve(e); e(handoff, "open_blockers: []", "open_blockers:\n  - Owner unresolved"); }, 1, "empty open_blockers");
probe("ready with manifest blockers", (e) => { approve(e); e("manifest.yaml", "open_blockers: []", "open_blockers:\n  - Owner unresolved"); }, 1, "empty open_blockers");
probe("empty scalar", (e) => e(handoff, "project_name: habit-tracker", "project_name:"), 1, "missing project_name");
probe("null blockers are not an empty list", (e) => { approve(e); e(handoff, "open_blockers: []", "open_blockers:"); }, 1, "empty open_blockers");
probe("duplicate status", (e, dir) => fs.appendFileSync(path.join(dir, handoff), "\nhandoff_status: ready\n"), 1, "duplicate key");
probe("read-first escape", (e) => e(handoff, "  - charter.md", "  - ../outside.md"), 1, "escapes blueprint root");
probe("read-first directory", (e) => e(handoff, "  - charter.md", "  - ."), 1);
probe("symlink escape", (e, dir) => {
  fs.symlinkSync(path.join(root, "README.md"), path.join(dir, "outside.md"));
  e(handoff, "  - charter.md", "  - outside.md");
}, 1, "through symlink");
probe("historical stale handoff", (e) => {
  e("manifest.yaml", 'blueprint_version: "0.1.0"', 'blueprint_version: "0.2.0"');
  e(handoff, "handoff_status: draft", "handoff_status: stale");
  e("charter.md", "SLC-001", "SLC-002");
}, 0);
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`Blueprint validator fixtures OK: ${cases.length} baselines + ${mutationCount} mutation cases.`);
