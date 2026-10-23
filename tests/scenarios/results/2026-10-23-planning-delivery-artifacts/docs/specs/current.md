# Existing system facts

This is an isolated SYN-only fixture with an established Node.js working agreement. The directory is the authority for employee identity, department hierarchy and reporting facts. Imported manager names are source evidence resolved only by the directory; the application consumes stable IDs.

The accepted [Blueprint](../blueprint/plan.md) v0.2.0 defines the full two-module scope. The local first slice in [001](changes/001-directory-scope-first-slice/spec.md) now provides directory import/preview, manual reporting overrides and explicit removal, restore-following-import, latest complete snapshots, superadmin-only maintenance, audit, and application read-only self/direct-report scope. A local HTTP page exposes that synthetic flow. This is a first-slice feedback handoff, not a final feature-done receipt.

State is memory-only and resets on restart. The fixture file remains unchanged. Account authentication, real data and production services are outside this local fixture. Department grants including descendant departments remain accepted planned behavior for SLC-002, not implemented here. User feedback is required before starting that slice.
