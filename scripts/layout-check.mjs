import {chromium} from '@playwright/test';
import {preview} from 'vite';
import {existsSync} from 'node:fs';
import {writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const fallback='C:\\Users\\slowk\\OneDrive\\Desktop\\New folder\\reconstruction\\node_modules\\.remotion\\chrome-headless-shell\\win64\\chrome-headless-shell-win64\\chrome-headless-shell.exe';
const server=await preview({preview:{host:'127.0.0.1',port:4182,strictPort:true}});
const browser=await chromium.launch({executablePath:process.env.BARISTA_CHROMIUM_PATH||(existsSync(fallback)?fallback:undefined)});
const page=await browser.newPage();const result=[];
try{
for(const [name,width,height] of [['projector',1920,1080],['tablet',820,1180],['mobile',390,844]]){
 await page.setViewportSize({width,height});await page.goto('http://127.0.0.1:4182/#dashboard');await page.getByRole('button',{name:'Start Course',exact:true}).click();await page.getByRole('heading',{name:'Become a Better Barista.'}).waitFor();
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 if(name==='mobile'){await page.getByRole('button',{name:'Quick reference',exact:true}).click();await page.getByRole('heading',{name:'The barista’s reference'}).waitFor();await page.getByRole('button',{name:'Back to dashboard'}).click()}
 await page.getByRole('button',{name:'Launch Presentation',exact:true}).click();await page.getByRole('button',{name:'LET’S BEGIN',exact:true}).click();await page.locator('.slide-canvas').waitFor();
 await page.getByRole('button',{name:'Slide overview',exact:true}).click();await page.getByRole('dialog').getByRole('button',{name:'Espresso extraction',exact:true}).click();await page.locator('.brew-layout').waitFor();
 assert.ok(await page.getByRole('button',{name:'Next',exact:true}).evaluate(e=>e.getBoundingClientRect().bottom<=innerHeight));
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await page.screenshot({path:`source/qa/brewing-${name}.png`});
 if(name==='projector'){const overflow=await page.locator('.slide-canvas').evaluate(e=>e.scrollHeight-e.clientHeight);assert.ok(overflow<=1,`Projector slide overflows by ${overflow}px`)}
 result.push({name,width,height,passed:true});
}
await writeFile('source/qa/layout-results.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
}finally{await browser.close();await new Promise(r=>server.httpServer.close(r))}


