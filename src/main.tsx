import React from 'react';
import {createRoot} from 'react-dom/client';
import '@fontsource/dm-serif-display/latin-400.css';
import '@fontsource/dm-serif-display/latin-400-italic.css';
import '@fontsource/lato/latin-400.css';
import '@fontsource/lato/latin-700.css';
import './index.css';
import './reference-landing.css';
import App from './App';
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
if(import.meta.env.PROD&&'serviceWorker' in navigator){let refreshing=false;const hadController=!!navigator.serviceWorker.controller;navigator.serviceWorker.addEventListener('controllerchange',()=>{if(hadController&&!refreshing){refreshing=true;window.location.reload()}});window.addEventListener('load',()=>{navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(()=>{/* Local assets also work from a local static server. */})})}
