import {LandingPage} from './components/ReferenceLanding';
import {InstructorIntroduction} from './components/InstructorIntroduction';
import {useEffect,useState} from 'react';
import {Header} from './components/Header';
import {CourseDashboard} from './components/CourseDashboard';
import {ModuleOverview} from './components/ModuleOverview';
import {PresentationViewer} from './components/PresentationViewer';
import {QuickReference} from './components/QuickReference';
import {modules,slides} from './data/course';
import {useLocalProgress} from './hooks/useLocalProgress';
export default function App(){const [route,setRoute]=useState('landing');const [start,setStart]=useState<number|null>(null);const {visited,visit}=useLocalProgress();
 useEffect(()=>{history.replaceState(null,'',`${location.pathname}${location.search}#landing`)},[]);
 useEffect(()=>{const on=()=>{setRoute(location.hash.slice(1)||'landing');window.scrollTo(0,0)};window.addEventListener('hashchange',on);return()=>window.removeEventListener('hashchange',on)},[]);
 const navigate=(r:string)=>{location.hash=r;if(route===r)window.scrollTo({top:0,behavior:'smooth'})};
 const home=()=>navigate('dashboard');const open=(id:string)=>{visit(id);navigate(id)};const present=(index:number|null=null)=>{setStart(index);navigate('introduction')};
 if(route==='landing')return <LandingPage enter={home} present={()=>present()}/>;
 if(route==='introduction')return <InstructorIntroduction begin={()=>navigate('presentation')} back={()=>navigate('landing')}/>;
 if(route==='presentation')return <PresentationViewer start={start} exit={home} visit={visit} visited={visited}/>;
 const selected=modules.find(m=>m.id===route);
 return <><Header home={home} lessons={()=>{navigate('dashboard');setTimeout(()=>document.getElementById('curriculum')?.scrollIntoView({behavior:'smooth'}),50)}} present={()=>present()} reference={()=>navigate('reference')}/>{selected?<ModuleOverview module={selected} home={home} start={id=>present(slides.findIndex(s=>s.id===id))}/>:route==='reference'?<QuickReference home={home}/>:<CourseDashboard open={open} present={()=>present()} visited={visited}/>}</>
}

