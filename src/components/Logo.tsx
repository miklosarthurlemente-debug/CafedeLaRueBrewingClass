import logoPng from '../assets/Logo.png';
import {useId} from 'react';

export function Logo({className=''}:{className?:string}){
 const id=useId();
 return <><svg width="0" height="0" aria-hidden="true" style={{position:'absolute',pointerEvents:'none'}}><defs><filter id={id} colorInterpolationFilters="sRGB"><feFlood floodColor="#7a6a54"/><feComposite in2="SourceAlpha" operator="in"/></filter></defs></svg><img className={`course-logo ${className}`} src={logoPng} alt="Cafe de la Rue logo" style={{filter:`url("#${id}")`}}/></>
}
