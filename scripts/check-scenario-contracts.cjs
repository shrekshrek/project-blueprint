#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const inputRoot = path.join(root, "tests/scenarios/inputs");
const oracleRoot = path.join(root, "tests/scenarios/oracles");
const expected = Array.from({ length: 8 }, (_, index) => `EVAL-${String(index + 1).padStart(2, "0")}`);
const actions = new Set(fs.readdirSync(path.join(root, "docs/actions")).filter((name) => name.endsWith(".md") && name !== "README.md").map((name) => name.slice(0, -3)));
const roles = new Set(fs.readdirSync(path.join(root, "docs/reviewers")).filter((name) => name.endsWith(".md") && name !== "README.md").map((name) => name.slice(0, -3)));
const errors = [];

function requireMarkers(relative, markers) {
  const content = fs.readFileSync(path.join(root, relative), "utf8");
  for (const marker of markers) {
    if (!content.includes(marker)) errors.push(`${relative}: missing ${JSON.stringify(marker)}`);
  }
}

for (const id of expected) {
  const input = path.join(inputRoot, `${id}.md`);
  const oracle = path.join(oracleRoot, `${id}.json`);
  if (!fs.existsSync(input) || fs.readFileSync(input, "utf8").trim().length < 60) errors.push(`${id}: missing or trivial input`);
  if (!fs.existsSync(oracle)) {
    errors.push(`${id}: missing oracle`);
    continue;
  }
  let value;
  try { value = JSON.parse(fs.readFileSync(oracle, "utf8")); } catch (error) {
    errors.push(`${id}: invalid JSON: ${error.message}`);
    continue;
  }
  if (value.id !== id) errors.push(`${id}: oracle id mismatch`);
  for (const key of ["archetype", "expected_actions", "conditional_roles", "required_concerns", "forbidden_outputs"]) {
    if (value[key] === undefined || (Array.isArray(value[key]) && value[key].length === 0)) errors.push(`${id}: missing ${key}`);
  }
  for (const action of value.expected_actions || []) if (!actions.has(action)) errors.push(`${id}: unknown action ${action}`);
  if ((value.expected_actions || []).includes("plan-project")) errors.push(`${id}: expected_actions must omit the implied plan-project manager`);
  for (const role of value.conditional_roles || []) if (!roles.has(role)) errors.push(`${id}: unknown role ${role}`);
}
const extraInputs = fs.readdirSync(inputRoot).filter((name) => name.endsWith(".md") && !expected.includes(name.slice(0, -3)));
const extraOracles = fs.readdirSync(oracleRoot).filter((name) => name.endsWith(".json") && !expected.includes(name.slice(0, -5)));
if (extraInputs.length || extraOracles.length) errors.push("unexpected scenario files");
requireMarkers("tests/scenarios/README.md", [
  "## Release model smoke",
  "`EVAL-01` plus one risk-relevant complex scenario",
  "fresh Claude and Codex conversations",
  "Documentation-only changes",
  "planning depth",
  "speculative completeness",
]);
requireMarkers("docs/methodology/interaction-and-routing.md", [
  "## Planning economy",
  "deliberate diverge-then-converge loop",
  "complex project may need broad coverage before it can safely converge",
  "Stop only when the remaining unknowns are either immaterial",
]);
if (errors.length) {
  console.error("Scenario contract check failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log("Forward scenario contracts OK: 8 isolated inputs + 8 scoring oracles.");
