import {useCallback,useEffect,useState} from 'react';
import {slides} from '../data/course';
const previousSlideIds=[4,3,3,3,2,4,3,3,10,3].flatMap((count,module)=>Array.from({length:count},(_,slide)=>`${String(module+1).padStart(2,'0')}-${slide+1}`));
export function usePresentation(){
 const [index,setIndex]=useState(()=>{try{const savedId=localStorage.getItem('cafe-slide-id');const legacy=Number(localStorage.getItem('cafe-slide'));const id=savedId||(Number.isInteger(legacy)?previousSlideIds[legacy]:undefined);const found=slides.findIndex(s=>s.id===id);return found>=0?found:0}catch{return 0}});
 const [complete,setComplete]=useState(false);
 const go=useCallback((i:number)=>{setComplete(false);setIndex(Math.max(0,Math.min(slides.length-1,i)))},[]);
 const next=useCallback(()=>{if(index===slides.length-1)setComplete(true);else go(index+1)},[index,go]);
 const previous=useCallback(()=>{if(complete)setComplete(false);else go(index-1)},[complete,index,go]);
 useEffect(()=>{try{localStorage.setItem('cafe-slide-id',slides[index].id);localStorage.setItem('cafe-slide',String(index))}catch{}},[index]);
 return {index,complete,go,next,previous};
}
