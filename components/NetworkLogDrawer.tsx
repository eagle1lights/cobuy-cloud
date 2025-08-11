'use client';
import { useEffect, useState } from 'react'; import { db } from '@/lib/db';
type Log={ts:number,method:string,url:string};
export function NetworkLogDrawer(){const [open,setOpen]=useState(false); const [logs,setLogs]=useState<Log[]>([]);
 useEffect(()=>{(async()=>setLogs((await db.getAll('networkLogs')).sort((a,b)=>a.ts-b.ts)))(); (window as any).__patch||patch(); (window as any).__patch=true;},[]);
 function patch(){const of=window.fetch; window.fetch=async(i:any,init?:RequestInit)=>{const m=(init?.method||'GET').toUpperCase(); const u=typeof i==='string'?i:i.url; await db.add('networkLogs',{ts:Date.now(),method:m,url:u}); return of(i,init)};
 const oo=XMLHttpRequest.prototype.open; XMLHttpRequest.prototype.open=function(m:string,u:string,...r:any[]){db.add('networkLogs',{ts:Date.now(),method:(m||'GET').toUpperCase(),url:u}); // @ts-ignore
 return oo.call(this,m,u,...r)};}
 return(<div><button className='btn' onClick={()=>setOpen(!open)}>Network Log</button>{open&&(<div className='card max-h-[50vh] overflow-auto mt-2'><table className='w-full text-sm'><thead><tr><th>Time</th><th>Method</th><th>URL</th></tr></thead><tbody>{logs.map((l,i)=>(<tr key={i}><td>{new Date(l.ts).toLocaleTimeString()}</td><td>{l.method}</td><td className='truncate'>{l.url}</td></tr>))}</tbody></table></div>)}</div>);}
