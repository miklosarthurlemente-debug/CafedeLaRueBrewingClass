import { chromium } from '@playwright/test';
import {mkdir,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {preview} from 'vite';
import {existsSync} from 'node:fs';
const suppliedBrowser=process.env.BARISTA_CHROMIUM_PATH;
const workspaceBrowser='C:\\Users\\slowk\\OneDrive\\Desktop\\New folder\\reconstruction\\node_modules\\.remotion\\chrome-headless-shell\\win64\\chrome-headless-shell-win64\\chrome-headless-shell.exe';
const server=await preview({preview:{host:'127.0.0.1',port:4180,strictPort:true}});
const browser=await chromium.launch({executablePath:suppliedBrowser||(existsSync(workspaceBrowser)?workspaceBrowser:undefined),headless:true});
const context=await browser.newContext({viewport:{width:1366,height:768}});
const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
await mkdir('source/qa',{recursive:true});
await page.goto('http://127.0.0.1:4180/#dashboard');await page.getByRole('button',{name:'Start Course',exact:true}).click();await page.getByRole('heading',{name:'Become a Better Barista.'}).waitFor();await page.screenshot({path:'source/qa/dashboard-desktop.png',fullPage:true});
assert.equal(await page.locator('.module-card').count(),8);
for(let i=0;i<8;i++){
 await page.locator('.module-card').nth(i).getByRole('button').click();await page.getByRole('button',{name:'Start this lesson'}).waitFor();assert.ok(await page.locator('.lesson-list button').count()>0);await page.getByRole('button',{name:'Back to the course'}).click();await page.locator('.module-card').first().waitFor();
}
await page.getByRole('button',{name:'Launch Presentation',exact:true}).click();await page.getByRole('button',{name:'LET’S BEGIN',exact:true}).click();await page.locator('.slide-canvas').waitFor();await page.screenshot({path:'source/qa/presentation-desktop.png',fullPage:true});
assert.ok(await page.getByRole('button',{name:'Next',exact:true}).evaluate(e=>e.getBoundingClientRect().bottom<=innerHeight));
const total=Number((await page.locator('.slide-progress>span').innerText()).split('/')[1]);
await page.keyboard.press('ArrowRight');await page.waitForTimeout(250);assert.match(await page.locator('.slide-progress>span').innerText(),/^Slide 2 /);
await page.keyboard.press('ArrowLeft');await page.waitForTimeout(250);assert.match(await page.locator('.slide-progress>span').innerText(),/^Slide 1 /);
await page.keyboard.press('Space');await page.waitForTimeout(250);assert.match(await page.locator('.slide-progress>span').innerText(),/^Slide 2 /);
await page.keyboard.press('Home');await page.waitForTimeout(200);
await page.getByRole('button',{name:'Enter fullscreen',exact:true}).click();await page.waitForTimeout(250);assert.ok(await page.evaluate(()=>!!document.fullscreenElement));await page.keyboard.press('Escape');await page.waitForTimeout(250);
await page.getByRole('button',{name:'Slide overview',exact:true}).click();assert.equal(await page.locator('.overview-slide-grid section').count(),8);
await page.getByRole('dialog').getByRole('button',{name:'Coffee in, water out',exact:true}).click();await page.getByLabel('Coffee weight in grams').waitFor();
assert.match(await page.locator('.water-result').innerText(),/255/);await page.getByLabel('Coffee weight in grams').fill('20');assert.match(await page.locator('.water-result').innerText(),/340/);
const before=await page.locator('.slide-progress>span').innerText();await page.getByLabel('Coffee weight in grams').press('ArrowRight');assert.equal(await page.locator('.slide-progress>span').innerText(),before);await page.getByLabel('Coffee weight in grams').fill('-1');assert.equal(await page.getByRole('alert').count(),1);await page.getByLabel('Coffee weight in grams').fill('');assert.equal(await page.getByRole('alert').count(),1);
await page.locator('.canvas-toolbar').click();await page.keyboard.press('Home');await page.waitForTimeout(200);
const assetFailures=[];
for(let i=0;i<total;i++){
 await page.locator('.slide-canvas').waitFor();await page.waitForTimeout(170);
 await page.locator('.slide-canvas img').evaluateAll(imgs=>Promise.all(imgs.map(i=>i.decode().catch(()=>{}))));
 const broken=await page.locator('.slide-canvas img').evaluateAll(imgs=>imgs.filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src));assetFailures.push(...broken);
 if(i===total-1)break;await page.getByRole('button',{name:'Next',exact:true}).click();
}
assert.deepEqual(assetFailures,[]);await page.getByRole('button',{name:'Finish',exact:true}).click();await page.getByRole('heading',{name:'Thank You.'}).waitFor();
await page.getByRole('button',{name:'Restart Presentation',exact:true}).click();await page.locator('.slide-canvas').waitFor();assert.match(await page.locator('.slide-progress>span').innerText(),/^Slide 1 /);await page.keyboard.press('End');await page.waitForTimeout(200);assert.match(await page.locator('.slide-progress>span').innerText(),new RegExp(`^Slide ${total} /`));
await page.getByRole('button',{name:'Exit Presentation'}).click();await page.getByRole('button',{name:'Quick reference',exact:true}).click();
await page.locator('select').selectOption('3');await page.getByRole('heading',{name:'Café Latte',exact:true}).waitFor();await page.getByRole('button',{name:'Beans',exact:true}).click();await page.getByRole('button',{name:'Liberica',exact:true}).click();await page.getByRole('heading',{name:'Liberica'}).waitFor();
await page.reload();assert.equal(JSON.parse(await page.evaluate(()=>localStorage.getItem('cafe-academy-progress-v1'))).length,8);
await page.setViewportSize({width:390,height:844});await page.goto('http://127.0.0.1:4180/#dashboard');await page.getByRole('button',{name:'Start Course',exact:true}).click();await page.screenshot({path:'source/qa/dashboard-mobile.png',fullPage:true});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.getByRole('button',{name:'Launch Presentation',exact:true}).click();await page.getByRole('button',{name:'LET’S BEGIN',exact:true}).click();await page.locator('.slide-canvas').waitFor();await page.screenshot({path:'source/qa/presentation-mobile.png',fullPage:true});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
await page.getByRole('button',{name:'Lessons',exact:true}).click();const recipeModule=page.getByRole('button',{name:'08 Coffee Beverage Recipes'});if(await recipeModule.getAttribute('aria-expanded')!=='true')await recipeModule.click();await page.getByRole('button',{name:'Flat White',exact:true}).click();await page.getByRole('heading',{name:'Flat White'}).first().waitFor();assert.equal(await page.locator('.slide-sidebar').count(),0);
await page.goto('http://127.0.0.1:4180/#dashboard');await page.getByRole('button',{name:'Start Course',exact:true}).click();await page.evaluate(async()=>{await navigator.serviceWorker.ready});await page.reload();await page.waitForTimeout(300);await context.setOffline(true);await page.reload();await page.getByRole('button',{name:'Start Course',exact:true}).click();await page.getByRole('heading',{name:'Become a Better Barista.'}).waitFor();await page.getByRole('button',{name:'Launch Presentation',exact:true}).click();await page.getByRole('button',{name:'LET’S BEGIN',exact:true}).click();await page.locator('.slide-canvas').waitFor();await page.getByRole('button',{name:'Next',exact:true}).focus();await page.keyboard.press('End');await page.waitForTimeout(300);await page.getByRole('button',{name:'Finish',exact:true}).click();await page.getByRole('heading',{name:'Thank You.'}).waitFor();await context.setOffline(false);
assert.deepEqual(errors,[]);const report={slides:total,modules:8,checks:['module navigation','every slide and local image','next/previous','keyboard shortcuts','fullscreen and escape','slide overview','calculator validation and input keyboard isolation','recipe selector','bean comparisons','persisted progress','390px mobile layout','mobile sidebar','completion and restart','offline reload and presentation'],errors};await writeFile('source/qa/results.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));await browser.close(); await new Promise(r=>server.httpServer.close(r));





