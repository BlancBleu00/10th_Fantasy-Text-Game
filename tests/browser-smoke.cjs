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
  // Legacy parity intentionally excludes the separately tested new-story feature.
  if(pathname==='/parity.html'){res.setHeader('Content-Type','text/html; charset=utf-8');res.end(fs.readFileSync(path.join(root,'index.html'),'utf8').replace(/<script[^>]+data-feature="[^"]+"[^>]*><\/script>/g,''));return;}
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
async function showMore(page){if(await page.locator('#gameMore').count()){if(await page.locator('#titleScreen').isVisible())await page.getByRole('button',{name:'시작',exact:true}).click();await page.locator('#gameMore').evaluate(el=>el.open=true)}}
async function menuClick(page,name){await showMore(page);await page.getByRole('button',{name,exact:true}).first().click()}
async function firstChoice(page){await page.locator('#choices button:not([disabled])').first().click();if(await page.locator('#review .reviewContinue').count())await page.locator('#review .reviewContinue').click()}
(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const base=`http://127.0.0.1:${server.address().port}`;
 const browser=await chromium.launch({headless:true});const report={checks:[],viewports:[],pageErrors:[]};
 try{
  for(const viewport of [{width:1280,height:900},{width:390,height:844}]){
   const name=viewport.width>680?'desktop':'mobile',errors=[];
   const a=await seededPage(browser,base+'/baseline.html',viewport,errors),b=await seededPage(browser,base+'/parity.html',viewport,errors);
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
   for(const page of [a,b]){await page.locator('#choices button:not([disabled])').first().click();await menuClick(page,'저장');await menuClick(page,'불러오기')}
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
   const live=await seededPage(browser,base+'/index.html',viewport,errors);
   await live.getByRole('button',{name:'시작',exact:true}).click();await menuClick(live,'기존 시작 방식');
   await live.getByRole('button',{name:'이번 삶의 조건을 직접 정한다.',exact:true}).click();
   for(let i=0;i<4;i++)await firstChoice(live);
   await live.locator('#playerNameInput').fill('세갈래검증');await firstChoice(live);await firstChoice(live);
   await live.getByRole('button',{name:'새 메인스토리 세 지역의 초반을 플레이한다.',exact:true}).click();
   for(const [index,key] of ['west','east','under'].entries()){
    await live.locator('#choices button').nth(index).click();
    await live.locator('#choices button').first().click();
    await menuClick(live,'저장');
    await live.reload();
    await menuClick(live,'불러오기');
    assert.equal(await live.evaluate(()=>!!state.pendingReview),true);
    await live.locator('#review .reviewContinue').click();
    await firstChoice(live);await firstChoice(live);
    assert.equal(await live.evaluate(()=>state.scene),`main_${key}_3`);
    assert.equal(await live.evaluate(k=>state.mainOpenings.routes[k].status,key),'초반 완료');
    assert.equal(await live.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
    await live.screenshot({path:path.join(output,`${name}-main-${key}.png`),fullPage:true,animations:'disabled'});
    report.checks.push(`${name}: main ${key} clicks, reload, saved review, completion`);
    await firstChoice(live);
   }
   for(const success of [true,false]){
    await live.evaluate(ok=>{state=createStateFromOrigin('human_farmer','남성');for(const k in state.stats)state.stats[k]=ok?100:1;for(const k in state.skills)state.skills[k].lv=0;recalc();state.silver=5;state.seed=7;flag('소매치기 손 포착');flag('소매치기 붙잡음');state.random.returnTo='day1_hub';go('enc_pickpocket')},success);
    await live.getByRole('button',{name:'아이를 쫓는다.',exact:true}).click();
    const review=await live.evaluate(()=>state.pendingReview.text);
    assert.equal(review.includes('은화 두 닢을 받아'),success);
    await menuClick(live,'저장');await live.reload();
    await menuClick(live,'불러오기');
    assert.equal(await live.evaluate(()=>state.pendingReview.text),review);
    await live.screenshot({path:path.join(output,`${name}-prose-pickpocket-${success?'success':'failure'}.png`),fullPage:true,animations:'disabled'});
    report.checks.push(`${name}: collision ${success?'success':'failure'} prose and saved result`);
    await live.locator('#review .reviewContinue').click();
   }
   assert.deepEqual(errors,[],`${name}: feature browser errors`);await live.context().close();
   for(const [index,key] of ['west','east','under'].entries()){
    const regional=await seededPage(browser,base+'/index.html',viewport,errors);
    assert.equal(await regional.locator('#titleScreen').isVisible(),true);
    assert.equal(await regional.locator('.topbar').isVisible(),false);
    assert.equal(await regional.locator('#choices').isVisible(),false);
    if(index===0)await regional.screenshot({path:path.join(output,`${name}-clean-start.png`),fullPage:true,animations:'disabled'});
    await regional.getByRole('button',{name:'시작',exact:true}).click();
    assert.equal(await regional.locator('#gameMore').getAttribute('open'),null);
    const beforeMenu=await regional.evaluate(()=>JSON.stringify([state.day,state.hour,state.minute,state.seed]));
    await regional.locator('#gameMore > summary').focus();await regional.keyboard.press('Enter');
    assert.equal(await regional.locator('.topbar').isVisible(),true);
    assert.equal((await regional.locator('#recordStrip').innerText()).includes('삶의 숙련'),false);
    assert.equal((await regional.locator('#v11hud').innerText()).includes('지금 이 삶이 붙잡고 있는 것'),false);
    await regional.keyboard.press('Escape');assert.equal(await regional.locator('.topbar').isVisible(),false);
    assert.equal(await regional.evaluate(()=>JSON.stringify([state.day,state.hour,state.minute,state.seed])),beforeMenu);
    report.checks.push(`${name}: ${key} clean title and keyboard more menu`);
    await regional.locator('#choices button').nth(index).click();
    // Draft is part of the save: a reload during creation must retain the region.
    await menuClick(regional,'저장');await regional.reload();
    await menuClick(regional,'불러오기');
    assert.equal(await regional.evaluate(()=>state.campaignDraft.region),key);
    await firstChoice(regional);await firstChoice(regional);await firstChoice(regional);
    await regional.locator('#playerNameInput').fill('지역검증');await firstChoice(regional);
    assert.equal(await regional.evaluate(()=>state.scene),'campaign_prologue');
    assert.equal(await regional.evaluate(()=>state.campaign.region),key);
    await firstChoice(regional);await firstChoice(regional);await firstChoice(regional);await firstChoice(regional);
    assert.equal(await regional.evaluate(()=>state.scene),`main_${key}_3`);await firstChoice(regional);
    assert.equal(await regional.evaluate(()=>state.scene),'campaign_hub');
    const cityBefore=await regional.evaluate(()=>JSON.stringify(state.city));
    await regional.locator('#choices button').nth(1).click(); // first daily work
    await menuClick(regional,'저장');await regional.reload();
    await menuClick(regional,'불러오기');await regional.locator('#review .reviewContinue').click();
    assert.equal(await regional.evaluate(()=>state.campaign.workDay),await regional.evaluate(()=>state.day));
    if(key!=='west')assert.equal(await regional.evaluate(()=>JSON.stringify(state.city)),cityBefore);
    for(const tab of ['status','skills','resonance','relations','reputation','journal']){
     await showMore(regional);await regional.locator(`.topbar button[onclick="openSheet('${tab}')"]`).click();
     assert.equal((await regional.locator('#sheetContent').innerText()).includes('undefined'),false);
     await regional.getByRole('button',{name:'닫기',exact:true}).click();
    }
    assert.equal(await regional.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
    await regional.screenshot({path:path.join(output,`${name}-regional-${key}.png`),fullPage:true,animations:'disabled'});
    report.checks.push(`${name}: regional ${key} creation, draft save, prologue, hub, daily work save, sheets`);
    if(key==='west'||key==='east'){
     await regional.locator('#gameMore').evaluate(el=>el.open=false);
     await regional.getByRole('button',{name:key==='west'?'수로 조사를 시작한다.':'사자 수색을 시작한다.',exact:true}).click();
     assert.equal(await regional.evaluate(()=>state.scene),'mid_'+key+'_gate');
     assert.equal((await regional.locator('#sceneText').innerText()).length<300,true);
     assert.equal(await regional.locator('.topbar').isVisible(),false);
     await regional.screenshot({path:path.join(output,`${name}-prose-${key}-gate.png`),fullPage:true,animations:'disabled'});
     await firstChoice(regional);await firstChoice(regional); // mandate -> survey
     await regional.locator('#choices button').nth(1).click();
     await regional.locator('#review .reviewContinue').click(); // archive
     await regional.getByRole('button',{name:'거점으로 돌아간다.',exact:true}).click();
     await menuClick(regional,'저장');await regional.reload();
     await menuClick(regional,'불러오기');
     await regional.getByRole('button',{name:key==='west'?'수로 조사를 이어간다.':'사자 수색을 이어간다.',exact:true}).click();
     assert.equal(await regional.evaluate(()=>state.scene),'mid_'+key+'_archive');
     await firstChoice(regional);await firstChoice(regional); // copy -> hearing -> crisis
     const clock=await regional.evaluate(()=>JSON.stringify([state.day,state.hour,state.minute,state.seed]));
     await showMore(regional);await regional.locator(".topbar button[onclick=\"openSheet('journal')\"]").click();
     await regional.getByRole('button',{name:'닫기',exact:true}).click();
     assert.equal(await regional.evaluate(()=>JSON.stringify([state.day,state.hour,state.minute,state.seed])),clock);
     // Force a failed probability check but still execute through the real UI.
     await regional.evaluate(k=>{state.seed=1900;state.skills[k==='east'?'persuasion':'observation'].lv=0;midgameRoute(k).risk=30;render()},key);
     await regional.locator('#choices button').first().click();
     assert.equal(await regional.evaluate(k=>midgameRoute(k).lastCheck.success,key),false);
     const savedResult=await regional.evaluate(()=>JSON.stringify(state.midgame));
     await menuClick(regional,'저장');await regional.reload();
     await menuClick(regional,'불러오기');
     assert.equal(await regional.evaluate(()=>JSON.stringify(state.midgame)),savedResult);
     await regional.locator('#review .reviewContinue').click();
     assert.equal(await regional.evaluate(()=>state.scene),'mid_'+key+'_recover');
     await firstChoice(regional);await firstChoice(regional);
     assert.equal(await regional.evaluate(()=>state.scene),'mid_'+key+'_end_accord');
     assert.equal(await regional.evaluate(()=>state.ended),false);
     assert.equal(await regional.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
     await regional.locator('#gameMore').evaluate(el=>el.open=false);
     await regional.screenshot({path:path.join(output,`${name}-midgame-${key}.png`),fullPage:true,animations:'disabled'});
     report.checks.push(`${name}: ${key} midgame pause, reload, probability failure, saved result, recovery, ending`);
     await firstChoice(regional);assert.equal(await regional.evaluate(()=>state.scene),'campaign_hub');
    }
    await regional.context().close();
   }
   assert.deepEqual(errors,[],`${name}: regional browser errors`);
  }
  fs.writeFileSync(path.join(output,'browser-validation.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({checks:report.checks.length,viewports:report.viewports,pageErrors:report.pageErrors},null,2));
 }finally{await browser.close();await new Promise(resolve=>server.close(resolve))}
})().catch(error=>{console.error(error);server.close();process.exitCode=1});
