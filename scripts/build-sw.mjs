import {readdir,readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
async function walk(dir){const out=[];for(const e of await readdir(dir,{withFileTypes:true})){if(e.isDirectory())out.push(...await walk(`${dir}/${e.name}`));else if(e.name!=='sw.js')out.push(`${dir}/${e.name}`)}return out}
const files=await walk('dist');const hash=createHash('sha256');for(const f of files)hash.update(await readFile(f));const version=hash.digest('hex').slice(0,12);const urls=['./',...files.map(f=>'./'+f.slice(5))];
await writeFile('dist/sw.js',`const CACHE='cafe-academy-${version}';const PREFIX='cafe-academy-';const FILES=${JSON.stringify(urls)};
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith(PREFIX)&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;e.respondWith(caches.match(e.request,{ignoreVary:true}).then(hit=>hit||fetch(e.request).catch(()=>e.request.mode==='navigate'?caches.match(new URL('./index.html',self.registration.scope)):Response.error())));});
`);console.log(`Offline cache generated: ${files.length} assets, version ${version}`);


