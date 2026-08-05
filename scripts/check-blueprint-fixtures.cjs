#!/usr/bin/env node
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
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log("Blueprint validator fixtures OK: 1 valid + 3 invalid.");
