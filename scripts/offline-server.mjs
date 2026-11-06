import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {dirname,resolve,extname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'../dist');
const port=4317;
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.pdf':'application/pdf','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.woff':'font/woff','.woff2':'font/woff2','.json':'application/json'};
const server=http.createServer(async(req,res)=>{
 if(req.headers.host!==`127.0.0.1:${port}`){res.writeHead(403);res.end();return}
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);res.end();return}
 try{
  const pathname=decodeURIComponent(new URL(req.url,`http://127.0.0.1:${port}`).pathname);
  if(pathname==='/__barista_local_status'){res.writeHead(200,{'Content-Type':'text/plain','Cache-Control':'no-store'});res.end('cafe-de-la-rue-private');return}
  const path=resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
  if(!path.startsWith(root+sep)){res.writeHead(403);res.end();return}
  if(!(await stat(path)).isFile()){res.writeHead(404);res.end();return}
  const data=await readFile(path);
  res.writeHead(200,{'Content-Type':types[extname(path)]||'application/octet-stream','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer'});
  res.end(req.method==='HEAD'?undefined:data);
 }catch{res.writeHead(404);res.end('Not found')}
});
server.on('error',e=>{console.error(e.message);process.exit(1)});
server.listen(port,'127.0.0.1',()=>console.log(`Private offline academy: http://127.0.0.1:${port}/`));
