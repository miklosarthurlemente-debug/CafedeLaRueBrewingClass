import {useCallback,useState} from 'react';
const key='cafe-academy-progress-v1';
export function useLocalProgress(){
 const [visited,setVisited]=useState<string[]>(()=>{try{const v=JSON.parse(localStorage.getItem(key)||'[]');return Array.isArray(v)?v.filter(x=>typeof x==='string'):[]}catch{return[]}});
 const visit=useCallback((id:string)=>setVisited(old=>{if(old.includes(id))return old;const next=[...old,id];try{localStorage.setItem(key,JSON.stringify(next))}catch{/* Browsing remains available without storage. */}return next}),[]);
 return {visited,visit};
}
