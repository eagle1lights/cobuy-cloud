'use client';
import { createContext, useContext, useEffect, useState } from 'react';
export type Role='Owner'|'Member'|'Attorney';
const C=createContext<{role:Role,setRole:(r:Role)=>void}|null>(null);
export function RoleSwitcher(){const c=useRoleCtx();return(<label className="flex items-center gap-2"><span className="text-sm">Role</span><select className="input" value={c.role} onChange={e=>c.setRole(e.target.value as Role)}><option>Owner</option><option>Member</option><option>Attorney</option></select></label>)}
export function RoleProvider({children}:{children:React.ReactNode}){const [role,setRole]=useState<Role>('Owner');useEffect(()=>{const r=localStorage.getItem('role');if(r)setRole(r as Role)},[]);useEffect(()=>{localStorage.setItem('role',role)},[role]);return <C.Provider value={{role,setRole}}>{children}</C.Provider>}
export function useRoleCtx(){const v=useContext(C); if(!v) throw new Error('Role ctx'); return v;} export function useRole(){return useRoleCtx().role;}
export function RoleGate({allowed,children}:{allowed:Role[],children:React.ReactNode}){const role=useRole();return allowed.includes(role)?<>{children}</>:<div className='badge'>Hidden for {role}</div>;}
