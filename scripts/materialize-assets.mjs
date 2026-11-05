import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {dirname} from 'node:path';
let manifest=[];
try{manifest=JSON.parse(await readFile('asset-parts/manifest.json','utf8'))}catch(e){if(e.code!=='ENOENT')throw e}
for(const asset of manifest){
 const parts=await Promise.all(asset.parts.map(path=>readFile(path,'utf8')));
 const bytes=Buffer.from(parts.join(''),'base64');
 if(createHash('sha256').update(bytes).digest('hex')!==asset.sha256)throw new Error(`Original image verification failed: ${asset.path}`);
 await mkdir(dirname(asset.path),{recursive:true});await writeFile(asset.path,bytes);
 console.log(`Restored original image: ${asset.path}`);
}
