import {readFile,writeFile,readdir,mkdir} from 'node:fs/promises';
import {resolve,basename,extname} from 'node:path';
const mime={'.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.woff':'font/woff','.woff2':'font/woff2','.pdf':'application/pdf'};
const data=async path=>`data:${mime[extname(path)]||'application/octet-stream'};base64,${(await readFile(path)).toString('base64')}`;
const modules=JSON.parse(await readFile('src/data/manualModules.json','utf8'));
const recipes=JSON.parse(await readFile('src/data/manualRecipes.json','utf8'));
const imageMap=JSON.parse((await readFile('src/data/imageAssets.ts','utf8')).match(/=\s*({[\s\S]*});/)[1]);
const images=new Set(['image8','image14','image15','image13','image19','image9','image28']);
for(const m of modules){if(m.image)images.add(m.image);for(const s of m.slides)if(s.image)images.add(s.image)}
for(const r of recipes)if(r.image)images.add(r.image);
const assets={};for(const id of images)assets['images/'+imageMap[id]]=await data('public/images/'+imageMap[id]);
const pdf='Cafe_de_La_Rue_Basic_Barista_Training_Manual_36_pages.pdf';assets['manuals/'+pdf]=await data('public/manuals/'+pdf);
let html=await readFile('dist/index.html','utf8');
const jsPath=html.match(/<script[^>]+src="([^"]+)"[^>]*><\/script>/)[1];
const cssPath=html.match(/<link[^>]+href="([^"]+\.css)"[^>]*>/)[1];
let js=await readFile(resolve('dist',jsPath),'utf8');let css=await readFile(resolve('dist',cssPath),'utf8');
for(const item of await readdir('dist/assets')){
 if(!mime[extname(item)])continue;
 const embedded=await data('dist/assets/'+item);
 css=css.replaceAll(`url(./${item})`,`url("${embedded}")`).replaceAll(`url(${item})`,`url("${embedded}")`);
 const literal=JSON.stringify(item);js=js.replaceAll(`new URL(${literal},import.meta.url).href`,JSON.stringify(embedded));
}
html=html.replace(/<script[^>]+src="[^"]+"[^>]*><\/script>/,()=>`<script>window.__CAFE_OFFLINE_ASSETS__=${JSON.stringify(assets)};</script><script type="module">${js.replaceAll('</script','<\\/script')}</script>`);
html=html.replace(/<link[^>]+href="[^"]+\.css"[^>]*>/,()=>`<style>${css}</style>`);
await mkdir('offline',{recursive:true});
const output='offline/Cafe de la Rue - Offline Course.html';await writeFile(output,html);
await writeFile('offline/READ ME.txt','CAFE DE LA RUE - OFFLINE COURSE\r\n\r\nDouble-click Cafe de la Rue - Offline Course.html.\r\nChoose Chrome, Edge or Brave if Windows asks which app to use.\r\nNo Node.js, installation, server or internet connection is required.\r\nThe file includes all lessons, original-color images, fonts, logo and the PDF manual.\r\nView Manual and Download PDF work from the final course section.\r\nKeep this HTML file on your computer or copy it to a USB drive.\r\n');
console.log(`Created ${output} (${(Buffer.byteLength(html)/1024/1024).toFixed(1)} MB).`);
