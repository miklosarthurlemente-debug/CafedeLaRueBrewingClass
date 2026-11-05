import {imageAssets} from './imageAssets';
import {modules} from './modules';
export { modules };
export const slides=modules.flatMap(m=>m.slides);
export const asset=(name:string)=>`${import.meta.env.BASE_URL}images/${imageAssets[name]}`;
export const moduleStart=(id:string)=>slides.findIndex(s=>s.moduleId===id);
