import {useEffect,useRef,useState} from 'react';
import {ArrowLeft,ArrowRight,Coffee,Fullscreen,Minimize} from 'lucide-react';
import {asset} from '../data/course';
export function InstructorIntroduction({begin,back}:{begin:()=>void;back:()=>void}){
 const root=useRef<HTMLElement>(null);const [full,setFull]=useState(false);const [error,setError]=useState('');
 useEffect(()=>{const sync=()=>setFull(!!document.fullscreenElement);document.addEventListener('fullscreenchange',sync);return()=>document.removeEventListener('fullscreenchange',sync)},[]);
 async function leave(action:()=>void){if(document.fullscreenElement)await document.exitFullscreen().catch(()=>{});action()}
 useEffect(()=>{const key=(e:KeyboardEvent)=>{if(e.target instanceof HTMLElement&&e.target.closest('button,input,select,a'))return;if(e.key==='ArrowRight'||e.key===' '){e.preventDefault();void leave(begin)}};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key)},[begin]);
 async function fullscreen(){try{if(document.fullscreenElement)await document.exitFullscreen();else await root.current?.requestFullscreen()}catch{setError('Use your browser’s fullscreen control to present this introduction.')}}
 return <main ref={root} className="instructor-intro"><header><button className="text-button" onClick={()=>void leave(back)}><ArrowLeft size={17}/>Back</button><span>CAFE DE LA RUE / BASIC BARISTA TRAINING COURSE</span><button className="icon-button" aria-label={full?'Exit fullscreen':'Enter fullscreen'} onClick={fullscreen}>{full?<Minimize size={20}/>:<Fullscreen size={20}/>}</button></header><section className="instructor-stage"><div className="intro-orbit" aria-hidden="true"/><img className="intro-bean" src={asset('image8')} alt="" aria-hidden="true"/><div className="intro-copy"><span className="eyebrow">BEFORE WE GET BREWING</span><p className="intro-greeting">Hi, I’m</p><h1>Miklos<span>.</span></h1><p className="intro-role">Your instructor for today’s<br/>Basic Barista Training Course.</p><button className="poster-primary" onClick={()=>void leave(begin)}>LET’S BEGIN <ArrowRight size={19}/></button></div><Coffee className="intro-coffee" strokeWidth={.7} aria-hidden="true"/></section><footer><span>LET’S TALK COFFEE.</span><span>INTRODUCTION / CAFE DE LA RUE</span></footer>{error&&<p role="status">{error}</p>}</main>
}

