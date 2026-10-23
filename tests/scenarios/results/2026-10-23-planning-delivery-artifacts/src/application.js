import {DomainError,validateSnapshot} from './directory.js';
export function visibleScope(directory,actor){
 if(!actor?.id)throw new DomainError('主体未知',403);
 const snapshot=validateSnapshot(directory.snapshot());
 const active=snapshot.employees.filter(p=>p.active);
 if(!actor.isSuper&&!active.some(p=>p.id===actor.id))throw new DomainError('主体无效或停用',403);
 return {revision:snapshot.revision,people:active.flatMap(p=>{const reasons=[];if(actor.isSuper)reasons.push('超管全部');else{if(p.id===actor.id)reasons.push('本人');if(snapshot.reporting.some(r=>r.employeeId===p.id&&r.managerId===actor.id))reasons.push('直属下属')}return reasons.length?[{...p,reasons}]:[]})};
}
