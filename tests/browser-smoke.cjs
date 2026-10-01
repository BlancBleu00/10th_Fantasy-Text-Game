// Actual Chromium verification. Run after npm install --no-save playwright@1.62.1
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const { chromium } = require('playwright');
const root = path.resolve(__dirname, '..');
const original = execFileSync('git', ['show','1eec7ae5281382c322647f2428a37fe8f6aa7374:index.html'], { cwd:root,maxBuffer:2*1024*1024,encoding:'utf8' });
const output = process.env.BROWSER_REPORT_DIR || path.join(root,'browser-results');
fs.mkdirSync(output,{recursive:true});
const server = http.createServer((req,res)=>{
  const pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  if(pathname==='/baseline.html'){res.setHeader('Content-Type','text/html; charset=utf-8');res.end(original);return;}
  const file = path.resolve(root,'.'+pathname);
  if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404);res.end();return;}
  const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json'};
  res.setHeader('Content-Type',(types[path.extname(file)]||'application/octet-stream')+'; charset=utf-8');res.end(fs.readFileSync(file));
});
async function seededPage(browser,url,viewport,errors){
 const context=await browser.newContext({viewport});
 await context.addInitScript(()=>{let seed=7;Math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};Date.now=()=>1790865425000});
 const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>d.accept());
 await page.goto(url);await page.waitForFunction(()=>typeof state!=='undefined'&&state?.scene==='life_setup');
 if(url.endsWith('/baseline.html'))await page.evaluate(()=>{window.knowSuspicion=text=>suspect(text)});
 return page;
}
async function snapshot(page){return page.evaluate(()=>({state:JSON.parse(JSON.stringify(state)),sceneTitle:document.getElementById('sceneTitle').textContent,sceneMeta:document.getElementById('sceneMeta').textContent,text:document.getElementById('sceneText').innerHTML,choices:[...document.querySelectorAll('#choices button')].map(b=>({text:b.innerHTML,disabled:b.disabled})),review:document.getElementById('review').innerHTML,hud:document.getElementById('v11hud').innerHTML,strip:document.getElementById('recordStrip').innerHTML,sheet:document.getElementById('sheetContent').innerHTML,pendingCombat:!!pendingCombat}))}
async function firstChoice(page){await page.locator('#choices button:not([disabled])').first().click();if(await page.locator('#review .reviewContinue').count())await page.locator('#review .reviewContinue').click()}
(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const base=`http://127.0.0.1:${server.address().port}`;
 const browser=await chromium.launch({headless:true});const report={checks:[],viewports:[],pageErrors:[]};
 try{
  for(const viewport of [{width:1280,height:900},{width:390,height:844}]){
   const name=viewport.width>680?'desktop':'mobile',errors=[];
   const a=await seededPage(browser,base+'/baseline.html',viewport,errors),b=await seededPage(browser,base+'/index.html',viewport,errors);
   async function compare(label){assert.deepEqual(await snapshot(b),await snapshot(a),`${name}:${label}`);report.checks.push(`${name}:${label}`)}
   await compare('startup');
   const shotA=await a.screenshot({fullPage:true,animations:'disabled'}),shotB=await b.screenshot({fullPage:true,animations:'disabled'});
   assert.equal(shotB.equals(shotA),true,`${name}: startup pixels differ`);fs.writeFileSync(path.join(output,name+'-startup.png'),shotB);
   for(const page of [a,b]){
    await firstChoice(page); // choose_species
    await firstChoice(page); // species review -> choose_region
    await firstChoice(page); // region -> choose_gender
    await firstChoice(page); // gender -> choose_background
    await firstChoice(page); // origin -> name_entry
    await page.locator('#playerNameInput').fill('브라우저검증');
    await firstChoice(page); // name -> prelude
    await firstChoice(page); // prelude -> intro
   }
   await compare('manual creation and prologue');
   // Pending-review persistence: save/load must not run destination onEnter.
   for(const page of [a,b]){await page.locator('#choices button:not([disabled])').first().click();await page.getByRole('button',{name:'저장',exact:true}).first().click();await page.getByRole('button',{name:'불러오기',exact:true}).click()}
   await compare('saved review restored');
   for(const page of [a,b])if(await page.locator('#review .reviewContinue').count())await page.locator('#review .reviewContinue').click();
   await compare('continue review');
   for(const tab of ['status','skills','resonance','relations','reputation','journal']){
    for(const page of [a,b])await page.locator(`.topbar button[onclick="openSheet('${tab}')"]`).click();
    await compare('sheet:'+tab);
    for(const page of [a,b])await page.getByRole('button',{name:'닫기',exact:true}).click();
   }
   // A formerly broken suspicion callback, exercised with actual choice buttons.
   for(const page of [a,b]){await page.evaluate(()=>go('v11_route_people'));await firstChoice(page)}
   await compare('suspicion scene');
   await b.screenshot({path:path.join(output,name+'-game.png'),fullPage:true,animations:'disabled'});
   assert.deepEqual(errors,[],`${name}: browser script errors`);
   assert.equal(await b.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),true,`${name}: horizontal overflow`);
   report.viewports.push({name,...viewport});await a.context().close();await b.context().close();
  }
  fs.writeFileSync(path.join(output,'browser-validation.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({checks:report.checks.length,viewports:report.viewports,pageErrors:report.pageErrors},null,2));
 }finally{await browser.close();await new Promise(resolve=>server.close(resolve))}
})().catch(error=>{console.error(error);server.close();process.exitCode=1});
