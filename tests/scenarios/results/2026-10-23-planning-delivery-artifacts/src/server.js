import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {Directory,DomainError,assertAdmin} from './directory.js';
import {visibleScope} from './application.js';
const fixture=JSON.parse(await readFile(new URL('../fixtures/people.json',import.meta.url),'utf8'));
const actors=new Map([...fixture.people.map(p=>[p.id,{id:p.id,isSuper:false}]),['SYN-ADMIN',{id:'SYN-ADMIN',isSuper:true}]]);
export function createServer(){const directory=new Directory(fixture);return http.createServer(async(req,res)=>{try{
 const send=(status,value,type='application/json')=>{res.writeHead(status,{'Content-Type':type,'Cache-Control':'no-store'});res.end(type==='application/json'?JSON.stringify(value):value)};
 const url=new URL(req.url,'http://localhost');
 if(req.method==='GET'&&url.pathname==='/')return send(200,await readFile(new URL('./page.html',import.meta.url),'utf8'),'text/html; charset=utf-8');
 const actor=actors.get(req.headers['x-syn-actor']);if(!actor)throw new DomainError('请使用本地合成主体',403);
 if(req.method==='GET'&&url.pathname==='/api/scope')return send(200,visibleScope(directory,actor));
 if(req.method==='GET'&&url.pathname==='/api/directory'){assertAdmin(actor);return send(200,{...directory.snapshot(),audit:directory.audit(actor),fixture})}
 if(req.method!=='POST')throw new DomainError('未知入口',404);
 let text='';for await(const chunk of req){text+=chunk; if(text.length>100000)throw new DomainError('输入过大',413)}let body;try{body=JSON.parse(text)}catch{throw new DomainError('JSON无效')}
 if(url.pathname==='/api/relation')return send(200,directory.relation(actor,body));
 if(url.pathname==='/api/import/preview')return send(200,directory.preview(actor,body.data,body.confirmedMissing));
 if(url.pathname==='/api/import')return send(200,directory.import(actor,body));
 throw new DomainError('未知入口',404);
 }catch(error){res.writeHead(error.status||503,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify({error:error.message}))}})}
if(process.argv[1]===fileURLToPath(import.meta.url)){const server=createServer();server.listen(Number(process.env.SYN_PORT||54123),'127.0.0.1',()=>console.log(`SYN local demo http://127.0.0.1:${server.address().port} — memory resets on restart`))}
