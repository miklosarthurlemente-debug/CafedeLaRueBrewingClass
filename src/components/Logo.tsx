import logoPng from '../assets/Logo.png';

export function Logo({className=''}:{className?:string}){
 return <img className={`course-logo ${className}`} src={logoPng} alt="Cafe de la Rue logo"/>;
}
