#!/usr/bin/env node
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const root = path.resolve(__dirname, "..");
const checks = [
  ["check-adapter-parity.cjs"],
  ["check-blueprint-fixtures.cjs"],
  ["check-scenario-contracts.cjs"],
  ["build-plugin-packages.cjs", "--check"],
];

for (const [script, ...args] of checks) {
  const result = spawnSync(process.execPath, [path.join(root, "scripts", script), ...args], {
    cwd: root,
    encoding: "utf8",
  });
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  if (result.status !== 0) process.exit(result.status || 1);
}

console.log("All Project Blueprint checks passed.");
