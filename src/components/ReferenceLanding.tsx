import {ArrowRight,ArrowUpRight,Asterisk,Bean,Sparkles} from 'lucide-react';
import {asset,modules} from '../data/course';
import {Brand} from './Header';
export function LandingPage({enter,present}:{enter:()=>void;present:()=>void}){
 return <main className="poster-page"><section className="coffee-poster" aria-labelledby="poster-title">
 <header className="poster-nav"><a href="#landing" className="poster-brand" aria-label="Cafe de la Rue home"><Brand/></a><nav aria-label="Landing page navigation"><button onClick={enter}>THE COURSE</button><button onClick={present}>MEET YOUR INSTRUCTOR <ArrowUpRight size={12}/></button></nav></header>
 <div className="poster-blob blob-top" aria-hidden="true"><Sparkles className="blob-spark" size={24}/></div><div className="poster-blob blob-left" aria-hidden="true"/><div className="poster-blob blob-right" aria-hidden="true"/>
 <img className="poster-object poster-bean" src={asset('image8')} alt="" aria-hidden="true"/><img className="poster-object poster-press" src={asset('image14')} alt="" aria-hidden="true"/><img className="poster-object poster-pour" src={asset('image15')} alt="" aria-hidden="true"/><img className="poster-object poster-machine" src={asset('image13')} alt="" aria-hidden="true"/><img className="poster-object poster-cup" src={asset('image19')} alt="" aria-hidden="true"/>
 <Asterisk className="poster-star star-one" aria-hidden="true"/><Asterisk className="poster-star star-two" aria-hidden="true"/><Bean className="poster-tiny-bean" aria-hidden="true"/>
 <div className="poster-center"><span className="poster-kicker">THE ART & SCIENCE OF COFFEE</span><h1 id="poster-title">EXPLORE<br/>THE COFFEE<span className="poster-title-dot">.</span></h1><p>A little curiosity. A whole world of coffee.<br/>Your journey from bean to cup starts here.</p><div className="poster-actions"><button className="poster-primary" onClick={enter}>Start Course <ArrowRight size={17}/></button><button className="poster-present" onClick={present}>Start the presentation <ArrowUpRight size={15}/></button></div><div className="poster-signature"><span>YOUR INSTRUCTOR</span><button onClick={present}>Miklos <ArrowUpRight size={15}/></button></div></div>
 <footer className="poster-footer"><span>BASIC BARISTA TRAINING COURSE</span><span>{modules.length} MODULES <span className="footer-star">✳</span> FROM BEAN TO CUP</span><span>CAFE DE LA RUE</span></footer>
 </section><div className="poster-outside-note"><span>GOOD COFFEE STARTS WITH CURIOSITY.</span><button onClick={enter}>Let’s get brewing <ArrowRight size={13}/></button></div></main>
}

