# Blueprint → Workflow 本地链路验收

日期：2026-10-23。安装版本：Blueprint 0.3.2、Workflow 3.23.4。

## 范围与结论
本轮隔离 SYN 案例通过规划、可点击原型、模拟确认回写、开发交接、首个纵向功能实现和阶段反馈等待的链路验证。模拟确认是测试输入，不是 PMO 产品决定。没有实施第二片；这证明反馈停点，不代表整个合成产品已交付或归档。

## 观察证据
- Blueprint 草稿明确目录与应用职责、存量姓名到稳定 ID、人工覆盖、显式撤销、重导入及失败处理。独立复核修正了契约表述与原型循环关系缺口。
- 原型浏览器实际操作：默认本人+直属2人，部门授权后5人，撤销授权后2人，撤销直属关系并重导入后1人。原型不作为真实服务端验收证据。
- 模拟用户确认已记录于 trial-transcript/turn-2.md；plan/manifest/handoff 更新为批准与已授权，保留首片反馈边界。已有基线直接交给 feature-init，没有重新初始化项目。
- 实现包含目录模块、应用范围、实际本地 HTTP 页面；子代理执行 node --test：13/13通过。首次回环监听因沙箱 EPERM 失败，获准执行后通过，未降低期望。测试覆盖撤销重导入、人工恢复、循环关系、版本冲突、幂等、普通主体维护拒绝及 HTTP 链路。
- 父代理浏览器实际验收：Alex默认2人；超管撤销Bo上级，预览并发布原名单；切回Alex并刷新仍1人。相同有效状态的重导入保持版本2，未恢复旧权限。截图 implementation-revocation.png。
- 首片完成主动停下。随后只询问进度，执行者仅回答状态；src/test/docs共13个文件SHA256前后一致，status-check.json记录结果，第二片未开始。
- PMO仅同步AGENTS.md的阶段反馈措辞，1行替换；git diff --check和CLAUDE别名检查通过。

## 限制与后续判断
这是一次Codex本地合成链路，不证明所有模型或真实项目必然遵循。没有验证Claude执行、运行中途状态消息注入、生产认证、持久化、部署或feature-done归档链路。之前的跨阶段连续授权测试与本次默认停点测试是不同证据。

独立权限/契约评审增加了实际交接等待，当前不据一次案例继续扩展规则；后续在真实任务观察评审是否重复、切片是否足够用户可判断。两项目本轮调整与代表性验证可收尾，不应宣称全平台全面验收。

原试验结束时临时服务已关闭，未提交、推送或部署，未改 PMO 业务代码及真实数据。本记录及原始样例随后入库留存；它们是合成试验材料，不是插件运行时实现，也不是 PMO 产品需求。


## 留存材料

原始目录已保存为 [合成样例](2026-10-23-planning-delivery-artifacts/README.md)，不依赖临时目录继续存在。

- [规划](2026-10-23-planning-delivery-artifacts/docs/blueprint/plan.md)、[评审](2026-10-23-planning-delivery-artifacts/docs/blueprint/review.md)及同目录 manifest/handoff。
- [可点击原型](2026-10-23-planning-delivery-artifacts/docs/blueprint/prototype/index.html)。
- 模拟沟通：[规划](2026-10-23-planning-delivery-artifacts/trial-transcript/turn-1.md)、[确认及实施](2026-10-23-planning-delivery-artifacts/trial-transcript/turn-2.md)、[仅询问进度](2026-10-23-planning-delivery-artifacts/trial-transcript/turn-3.md)。
- [实际实现与检查说明](2026-10-23-planning-delivery-artifacts/docs/specs/changes/001-directory-scope-first-slice/spec.md)、样例 src/test/fixtures，以及原型和实现截图。
- before-status-hashes.json 与 status-check.json 保留状态追问前后的文件指纹及核对结果。

原始记录中的个人工作区、插件安装路径、临时目录和进程编号是当时环境的历史信息，不是可移植的执行指令。复验实现请进入留存样例目录运行 `node --test`，页面入口为 `node src/server.js`；规划校验应使用当前检出的 Blueprint `scripts/validate-blueprint.cjs`。原始文件保持原样，以便核对已有指纹。

本次未验证整份 Blueprint 如何分配为多个 feature；只验证首个切片的接入与反馈停点，不推导“一切片必须对应一个 feature”。
