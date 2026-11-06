export interface Fact { label:string; text:string }
export interface Slide { id:string; moduleId:string; title:string; type:'manual'|'calculator'|'editorial'|'cards'|'beans'|'equipment'|'brew'|'yields'|'sensory'|'recipe'|'table'|'steps'|'recap'; lead?:string; facts?:Fact[]; image?:string; table?:{headers:string[];rows:string[][]}; source:number[]; instructorNotes?:string; added?:boolean; recipeId?:string; methodId?:string }
export interface Module { id:string; number:string; title:string; description:string; icon:string; image:string; slides:Slide[] }
export interface Recipe { id:string; name:string; cup:string; espresso:string; liquid:string; extra:string; notes:string; difference:string; image?:string; source:number; temperature?:string; ingredients?:Fact[]; serving?:string; quality?:string; mistakes?:string }

