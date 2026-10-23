# SYN directory scope — first slice

Isolated synthetic trial only. No production authentication, deployment or persistent database.

Run `node src/server.js`, then open http://127.0.0.1:54123. Optional `SYN_PORT` changes the loopback port. Stop with Ctrl-C. State and audit are in memory and reset on restart; the original fixture is never overwritten.

Run `node --test` for the 13 focused checks including a temporary loopback HTTP server.

## Inspect the result
1. Default SYN Alex sees Alex and Bo.
2. Select SYN 超管; choose employee SYN Bo and 无上级, then 保存人工关系.
3. Click 预览导入差异 and 发布已预览名单; the default JSON is the original fixture.
4. Select SYN Alex again: only Alex remains visible. The manual removal survives reimport.
5. Switch back to SYN 超管, choose Bo and 恢复跟随导入. Alex sees two again.
6. The superadmin section shows complete before/after audit records. Ordinary subjects cannot call maintenance endpoints successfully; request-body `isSuper` is ignored.

The subject selector and `x-syn-actor` header are intentionally public synthetic scenario controls, not login or production security. Server-side role mapping is fixed for SYN subjects. Department grants belong to SLC-002 and are not implemented. First-slice feedback is pending; no continuous execution authorized.

Planning: [Blueprint](docs/blueprint/plan.md). Current work: [001 spec](docs/specs/changes/001-directory-scope-first-slice/spec.md).
