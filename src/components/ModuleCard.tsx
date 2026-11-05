import {ArrowUpRight,Check} from 'lucide-react';
import type {Module} from '../types/course';
import {Icon} from './Icon';
export function ModuleCard({module:m,visited,open}:{module:Module;visited:boolean;open:()=>void}){return <article className="module-card"><div className="card-top"><span className="module-icon"><Icon name={m.icon} size={29}/></span><span className="module-number">MODULE {m.number}</span>{visited&&<span className="visited"><Check size={14}/>Visited</span>}</div><h3>{m.title}</h3><p>{m.description}</p><div className="card-bottom"><span>{m.slides.length} slides</span><button onClick={open}>Explore Lesson <ArrowUpRight size={17}/></button></div></article>}
