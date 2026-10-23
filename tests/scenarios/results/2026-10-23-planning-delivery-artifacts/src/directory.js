export class DomainError extends Error { constructor(message, status=400) { super(message); this.status=status; } }
const fail=(condition,message,status=400)=>{if(condition)throw new DomainError(message,status)};
const copy=value=>structuredClone(value);
const syn=id=>typeof id==='string'&&/^SYN-[A-Z0-9-]+$/.test(id);
export function assertAdmin(actor){fail(!actor?.isSuper,'仅超管可维护',403)}
export function validateSnapshot(s){
 fail(!s||!Number.isInteger(s.revision)||s.revision<1||!Array.isArray(s.employees)||!Array.isArray(s.departments)||!Array.isArray(s.reporting),'无有效完整快照',503);
 const people=new Map(),depts=new Map(),edges=new Map();
 for(const d of s.departments){fail(!syn(d.id)||depts.has(d.id),'部门ID无效或重复',503);depts.set(d.id,d)}
 for(const d of depts.values()){fail(d.parentId!==null&&!depts.has(d.parentId),'部门父级未知',503);let p=d.id,seen=new Set();while(p){fail(seen.has(p),'部门循环',503);seen.add(p);p=depts.get(p)?.parentId}}
 for(const e of s.employees){fail(!syn(e.id)||people.has(e.id)||typeof e.active!=='boolean'||!depts.has(e.departmentId),'员工无效或重复',503);people.set(e.id,e)}
 for(const r of s.reporting){fail(!people.has(r.employeeId)||!people.has(r.managerId)||edges.has(r.employeeId),'关系ID无效或重复',503);fail(!people.get(r.employeeId).active||!people.get(r.managerId).active,'关系包含停用员工',503);edges.set(r.employeeId,r.managerId)}
 for(const id of edges.keys()){let p=id,seen=new Set();while(p){fail(seen.has(p),'汇报关系循环或自管',503);seen.add(p);p=edges.get(p)}}
 return s;
}
export class Directory {
 #state; #audit=[]; #batches=new Map();
 constructor(fixture){this.#state=this.#candidate(fixture,[],null);this.#state.revision=1;validateSnapshot(this.#snapshot(this.#state))}
 #snapshot(state){return {revision:state.revision,employees:copy(state.people),departments:copy(state.departments),reporting:state.people.filter(e=>e.active).flatMap(e=>{const m=Object.hasOwn(state.overrides,e.id)?state.overrides[e.id]:state.imported[e.id];return m&&state.people.some(p=>p.id===m&&p.active)?[{employeeId:e.id,managerId:m}]:[]})}}
 snapshot(){return copy(validateSnapshot(this.#snapshot(this.#state)))}
 #candidate(data,confirmedMissing,previous=this.#state){
 fail(!data||!Array.isArray(data.people)||!Array.isArray(data.departments),'名单格式错误');
 const ids=new Set();const people=data.people.map(p=>{fail(!syn(p.id)||ids.has(p.id)||typeof p.name!=='string'||!p.name.startsWith('SYN '),'员工必须有唯一SYN ID和合成姓名');ids.add(p.id);return {id:p.id,name:p.name,departmentId:p.departmentId,active:p.active!==false}});
 const missing=(previous?.people||[]).filter(p=>p.active&&!ids.has(p.id));
 fail(missing.some(p=>!confirmedMissing.includes(p.id)),'名单缺失须显式确认停用：'+missing.map(p=>p.id).join(','));
 for(const p of previous?.people||[])if(!ids.has(p.id))people.push({...p,active:false});
 const imported={};for(const row of data.people){if(row.managerName){const matches=people.filter(p=>p.active&&p.name===row.managerName);fail(matches.length!==1,'上级姓名未知或不唯一：'+row.managerName);imported[row.id]=matches[0].id}}
 const next={revision:previous?previous.revision+1:1,people,departments:copy(data.departments),imported,overrides:copy(previous?.overrides||{})};
 // Validate raw imported facts too; an override must not conceal an invalid batch.
 validateSnapshot(this.#snapshot({...next,overrides:{}}));validateSnapshot(this.#snapshot(next));return next;
 }
 preview(actor,data,confirmedMissing=[]){assertAdmin(actor);const next=this.#candidate(data,confirmedMissing);return {revision:this.#state.revision,before:this.snapshot(),after:this.#snapshot(next)}}
 #revision(expected){fail(expected!==this.#state.revision,'版本冲突，请刷新后重试',409)}
 #publish(actor,next,kind,batchId=null){const before=this.snapshot();this.#state=next;const after=this.snapshot();this.#audit.push({actorId:actor.id,time:new Date().toISOString(),kind,batchId,before,after});return after}
 import(actor,{data,expectedRevision,batchId,confirmedMissing=[]}){assertAdmin(actor);fail(!syn(batchId),'需要SYN批次ID');const fingerprint=JSON.stringify({data,confirmedMissing});if(this.#batches.has(batchId)){fail(this.#batches.get(batchId)!==fingerprint,'同批次ID内容不同',409);return this.snapshot()}this.#revision(expectedRevision);const next=this.#candidate(data,confirmedMissing);if(JSON.stringify({...next,revision:0})===JSON.stringify({...this.#state,revision:0})){this.#batches.set(batchId,fingerprint);return this.snapshot()}const result=this.#publish(actor,next,'import',batchId);this.#batches.set(batchId,fingerprint);return result}
 relation(actor,{employeeId,managerId=null,followImport=false,expectedRevision}){assertAdmin(actor);this.#revision(expectedRevision);fail(!this.#state.people.some(p=>p.id===employeeId&&p.active),'员工无效');fail(managerId!==null&&!this.#state.people.some(p=>p.id===managerId&&p.active),'上级无效');const next=copy(this.#state);next.revision++;if(followImport)delete next.overrides[employeeId];else next.overrides[employeeId]=managerId;validateSnapshot(this.#snapshot(next));return this.#publish(actor,next,followImport?'follow-import':'manual-relation')}
 audit(actor){assertAdmin(actor);return copy(this.#audit)}
}
