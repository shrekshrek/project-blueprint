# Dual-plugin natural-entry smoke — 2026-10-27

## Scope and method

Tested local changes over Blueprint v0.3.2 and Workflow v3.23.4, without publishing or replacing the user's installed plugins.
Codex CLI 0.164.0-alpha.11.1 used an isolated temporary CODEX_HOME with both generated plugins installed through their local marketplaces, existing login access and inherited gpt-6-astra / medium settings. Claude Code 2.1.144 loaded both generated packages through --plugin-dir; init events confirmed both paths. Its configured provider reported glm-5.3 and glm-5.3-flash, so this is not Claude-model evidence.

Each case used a fresh conversation and a read-only synthetic directory. Requests named no skill, command, plugin or expected route. No oracle was supplied. Existing global skills remained discoverable: this tests coexistence in the current environment, not an exclusive two-plugin installation. Inspect actual Skill calls or SKILL.md reads separately from a plausible answer. No implementation, pause/resume, production-data or end-to-end handoff claims follow from these discussion turns.

Except for new-project, fixtures included: a minimal AGENTS.md, two identical date-formatting functions, current behavior with one-day reminders, an accepted active reminder spec, and an approved architecture note making the employee directory authoritative for personnel relations. The feature-schema request therefore also encountered a real accepted-contract conflict.

## Observed routes

| Request | Codex | Claude Code |
|---|---|---|
| new-project | Read plan-project and its canonical references; asked about the actual repair journey. | Initially invoked frame-project instead of the manager and presented too many question clusters. After narrowing frame-project to specialist use, one fresh retest invoked the pre-existing brainstorming skill instead. Manager selection is not established on this host. |
| feature-schema | Read feature-init, then spec-revise after finding the accepted one-day contract; kept the change out of Blueprint. Also read the existing brainstorming skill. | Read project files and recommended revising the existing spec without Blueprint escalation, but invoked no plugin skill. Behavioral alignment is not invocation evidence. |
| local-refactor | Failed before answering with workspace routing discovery failed after transport retries; no routing verdict. | Read the small source module directly; invoked neither plugin. Appropriate non-trigger, although its claim about null throwing RangeError was incorrect and is not endorsed. |
| feature-revision | Same infrastructure failure; no routing verdict. | Invoked project-workflow:spec-revise; identified a feature-local revision and preserved the upstream boundary. |
| upstream-change | Same infrastructure failure; no routing verdict. | Read the architecture note and recognized reversal of an approved ownership boundary, but invoked no Blueprint skill. Some migration/SLA suggestions remained unconfirmed; it also mentioned unavailable memory writes despite the read-only request. Not a full behavior PASS. |

All ten original fixture directories remained byte-for-byte unchanged. The new-project retest also retained only its unchanged AGENTS.md. The final frame-project description was applied after the original runs; only the affected Claude new-project case was rerun. Do not treat original runs as a full final-revision retest.

Conclusion: several cases selected the intended route with the revised descriptions, but stable automatic entry selection is not established. No before/after improvement claim follows from this sample. Other globally available skills can take precedence, and plausible direct answers do not prove the intended plugin was loaded. Do not add forced dispatch, new routers or universal approval gates based on this bounded sample. Raw events and the disposable runner remain temporary debugging material; this record preserves inputs and results without depending on a temporary path.

## Raw requests

### new-project

我想给小型维修团队做一个工单系统，目前只有这个想法，用户怎么用、做哪些功能、系统怎么分工都没想清楚。请先帮我梳理，从最值得确认的问题开始。本轮只讨论，不创建文件或写代码。

### feature-schema

这是一个稳定运行的工单系统，系统边界和工单数据归属不变。请规划增加到期提醒，管理员可以在工单上保存提前几天提醒；需要调整表结构和接口，之后要跨会话继续。先结合现有约定讨论方案，不写文件、不开始实现。

### local-refactor

现有工单系统只想把两个重复的日期格式化函数合成一个，输入输出、API、存储和权限都不变。先看看代码说明该怎么改，不写文件。

### feature-revision

当前活动规格规定到期提醒固定提前一天。我决定改为管理员为每张工单配置提前几天，默认仍是一天。项目目标、工单归属、系统边界和权限都不变。请说明已有规格该如何处理，本轮先讨论，不写文件。

### upstream-change

目前确认的规划规定人员关系由员工目录系统维护，工单系统只消费关系。现在业务提出把权威维护入口和数据归属移到工单系统，员工目录改为消费方。我担心影响初始化、后续导入和撤权，先帮我重新梳理这项跨系统调整，不改代码或真实数据，只讨论。

## Mechanical validation

Both repositories passed their full check-all.cjs suites. All twelve changed specialist SKILL.md files passed quick_validate.py; frame-project was checked again after its final narrowing. These checks establish structure and packaging, not natural-selection reliability.

## Follow-up: previously uncovered upstream decisions

Workflow's optional Blueprint context was narrowed further: stop affected work for either a conflict with an accepted upstream decision or a previously uncovered project-level responsibility, authoritative-data or trust-boundary decision required before safe implementation. Revise the affected Blueprint when present; otherwise clarify the decision and recommend a bounded rebaseline only when needed. Missing feature detail alone does not qualify.

Two fresh Claude Code runs loaded the final Blueprint package and rebuilt Workflow package together, with the same read-only fixtures, available global skills and GLM provider as above. The natural-language requests supplied no skill names or expected answers:

- Uncovered boundary: “现有工单系统用于单个维修企业。现在要让多个互不信任的企业共用，分别邀请自己的管理员和员工，每个企业只能访问自己的数据。已有规划没有说明租户归属、跨企业访问和管理员权限。请结合已有约定梳理这项需求，指出开始实现前必须确定的事情；本轮只讨论，不创建文件或写代码。”
- Ordinary field: “现有工单系统增加一个可选的工单备注字段，管理员填写，员工仍只查看分配给自己的工单。系统职责、数据归属和权限保持不变。已有规划没有写过备注字段。请结合已有约定说明该如何推进，之后需要跨会话继续；本轮只讨论，不创建文件或写代码。”

Both completed successfully (142 and 185 seconds), with fixture files unchanged. Neither invoked a plugin skill or read the revised canonical action, so these results do not establish execution of the changed rule or reliable automatic routing. The uncovered-boundary answer identified tenant ownership and isolation decisions and proposed updating the affected architecture. It also proposed unconfirmed defaults and treated some existing constraints too rigidly; it is only partial behavioral alignment. Because the fixture also contained an accepted personnel-authority boundary, this was not an isolated proof of handling an entirely conflict-free planning gap.

The ordinary-field answer kept the change in feature work, recommended a new feature record for the cross-session addition, and did not escalate to Blueprint merely because the field was undocumented. Its claim that current truth changes only at archive is not endorsed; it also announced memory persistence before correcting that no write was available. These unrelated answer defects prevent an overall behavior PASS.

Workflow's eight mechanical checks passed after updating the existing structural matcher to the replacement Blueprint-revision wording. Codex was not rerun in this follow-up; the earlier infrastructure failures remain unresolved. No new routing mechanism, release, or installed-plugin replacement was made.
