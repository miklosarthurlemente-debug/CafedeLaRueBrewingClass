import {asset} from '../data/course';
import {recipes} from '../data/recipes';
import type {Slide} from '../types/course';
import {BeverageRecipeCard} from './BeverageRecipeCard';
import {BrewingCalculator} from './BrewingCalculator';
import {ManualLinks} from './ManualLinks';
export function SlideRenderer({slide:s}:{slide:Slide}){return <><div className="slide-title"><h2>{s.title}</h2>{s.lead&&<p>{s.lead}</p>}</div>
 {s.type==='manual'?<ManualLinks/>:s.type==='calculator'?<BrewingCalculator/>:s.type==='recipe'?<BeverageRecipeCard recipe={recipes.find(r=>r.id===s.recipeId)!}/>:s.type==='table'&&s.table?<div className="table-scroll" tabIndex={0} aria-label={s.title+' reference table'}><table><thead><tr>{s.table.headers.map(h=><th key={h} scope="col">{h}</th>)}</tr></thead><tbody>{s.table.rows.map((r,i)=><tr key={i}>{r.map((c,j)=><td key={j}>{c}</td>)}</tr>)}</tbody></table></div>:s.type==='editorial'?<div className={'editorial-layout '+(s.image?'':'no-image')}><div>{s.facts?.map(f=><article key={f.label}><h3>{f.label}</h3><p>{f.text}</p></article>)}</div>{s.image&&<img src={asset(s.image)} alt={'Classroom illustration: '+s.title}/>}</div>:<div className="fact-grid">{s.facts?.map((f,i)=><article key={f.label}><span className="fact-number">0{i+1}</span><h3>{f.label}</h3><p>{f.text}</p></article>)}</div>}
 <div className="slide-source"><span>PDF manual: {s.source.length===1?'page':'pages'} {s.source.join(', ')}</span><span>Training guidance · Validate recipes with your equipment</span></div></>}
