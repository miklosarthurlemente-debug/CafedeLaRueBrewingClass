import {Bean,BookOpen,Coffee,CupSoda,Flame,Globe2,Leaf,Milk,Scale,Sparkles} from 'lucide-react';
const icons={bean:Bean,book:BookOpen,coffee:Coffee,cup:CupSoda,flame:Flame,globe:Globe2,leaf:Leaf,milk:Milk,scale:Scale,sparkles:Sparkles};
export function Icon({name,size=24}:{name:string;size?:number}){const C=icons[name as keyof typeof icons]||Coffee;return <C size={size} strokeWidth={1.5}/>}
