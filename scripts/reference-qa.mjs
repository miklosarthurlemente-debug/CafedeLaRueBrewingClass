import {chromium} from '@playwright/test';
import {preview} from 'vite';
import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
const server=await preview({preview:{host:'127.0.0.1',port:4192,strictPort:true}});
const browser=await chromium.launch({executablePath:process.env.BARISTA_CHROMIUM_PATH||'C:\\Users\\slowk\\OneDrive\\Desktop\\New folder\\reconstruction\\node_modules\\.remotion\\chrome-headless-shell\\win64\\chrome-headless-shell-win64\\chrome-headless-shell.exe'});
const errors=[];const context=await browser.newContext();const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
try{
 for(const [width,height] of [[1366,768],[390,844],[1920,1080]]){
  await page.setViewportSize({width,height});await page.goto('http://127.0.0.1:4192/#landing');await page.getByRole('heading',{name:'EXPLORE THE COFFEE.'}).waitFor();await page.waitForTimeout(400);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.screenshot({path:`source/qa/reference-landing-${width}.png`,fullPage:true});
  await page.getByRole('button',{name:'Start the presentation',exact:true}).click();await page.getByRole('heading',{name:'Miklos.'}).waitFor();await page.screenshot({path:`source/qa/miklos-${width}.png`,fullPage:true});
  if(width===1366){await page.getByRole('button',{name:'Enter fullscreen',exact:true}).click();await page.waitForFunction(()=>!!document.fullscreenElement);await page.getByRole('button',{name:'Exit fullscreen',exact:true}).click()}
  await page.getByRole('button',{name:'LET’S BEGIN',exact:true}).click();await page.locator('.slide-canvas').waitFor();assert.match(await page.locator('.slide-progress>span').innerText(),/^Slide \d+ /);await page.getByRole('button',{name:'Exit Presentation'}).click();
  await page.locator('.module-card').filter({has:page.getByRole('heading',{name:'Brewing Methods',exact:true})}).getByRole('button').click();await page.locator('.lesson-list button').filter({hasText:'Espresso extraction'}).click();await page.getByRole('heading',{name:'Miklos.'}).waitFor();await page.getByRole('button',{name:'LET’S BEGIN',exact:true}).click();await page.getByRole('heading',{name:'Espresso extraction',exact:true}).waitFor();
 }
 await page.goto('http://127.0.0.1:4192/#landing');await page.evaluate(async()=>navigator.serviceWorker.ready);await page.reload();await context.setOffline(true);await page.reload();await page.getByRole('heading',{name:'EXPLORE THE COFFEE.'}).waitFor();await page.getByRole('button',{name:'Start the presentation',exact:true}).click();await page.getByRole('heading',{name:'Miklos.'}).waitFor();await page.getByRole('button',{name:'LET’S BEGIN',exact:true}).click();await page.locator('.slide-canvas').waitFor();
 assert.deepEqual(errors,[]);const report={passed:true,viewports:[1366,390,1920],checks:['reference landing layout','no horizontal overflow','Miklos introduction before presentation','introduction fullscreen','selected lesson preserved after introduction','offline landing, introduction and presentation'],errors};await writeFile('source/qa/reference-results.json',JSON.stringify(report,null,2));console.log(report);
}finally{await browser.close();await new Promise(r=>server.httpServer.close(r))}



