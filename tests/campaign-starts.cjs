const assert=require('node:assert/strict');
const {createRuntime}=require('./refactor-regression.cjs');
let checks=0,characters=0;
function eq(a,b){assert.deepEqual(a,b);checks++;}
function snap(r){return r.run('JSON.stringify({campaign:state.campaign,draft:state.campaignDraft,main:state.mainOpenings,res:state.res,city:state.city,world:state.world,day:state.day,hour:state.hour,minute:state.minute,silver:state.silver,origin:state.originKey,scene:state.scene,review:state.pendingReview})');}
function choose(r,i){r.run(`choose((typeof scenes[state.scene].choices==='function'?scenes[state.scene].choices(state):scenes[state.scene].choices)[${i}]);if(state.pendingReview)continueReview();`);}
function saveCheck(r){const before=snap(r);r.run('saveGame();state=freshState();loadGame();render();render()');eq(snap(r),before);}
function create(r,region,origin,gender){
 r.run('restartConfirm()');choose(r,0);eq(r.run('state.scene'),'campaign_start');
 choose(r,['west','east','under'].indexOf(region));saveCheck(r);
 const species=r.run(`origins.find(o=>o.key==='${origin}').species`);
 const speciesIndex=r.run(`[...new Set(campaignOrigins('${region}').map(o=>o.species))].indexOf('${species}')`);
 choose(r,speciesIndex);saveCheck(r);choose(r,gender==='남성'?0:1);saveCheck(r);
 const originIndex=r.run(`campaignOrigins('${region}').filter(o=>o.species==='${species}').findIndex(o=>o.key==='${origin}')`);
 choose(r,originIndex);eq(r.run('state.scene'),'name_entry');saveCheck(r);
 r.get('playerNameInput').value='지역검증';choose(r,0);
 eq(r.run('state.scene'),'campaign_prologue');eq(r.run('state.campaign.region'),region);
 eq(r.run('state.originKey'),origin);eq(r.run('state.gender'),gender);saveCheck(r);
}
const r=createRuntime(true,true);
eq(r.run('campaignOrigins("west").length'),21);eq(r.run('campaignOrigins("east").length'),4);eq(r.run('campaignOrigins("under").length'),2);
eq(r.run('campaignOrigins("east").every(o=>o.species==="인간")'),true);
eq(r.run('campaignOrigins("under").every(o=>o.species==="악마")'),true);
eq(r.run('campaignOrigins("west").some(o=>o.species==="악마")'),false);
for(const region of ['west','east','under']){
 const keys=JSON.parse(r.run(`JSON.stringify(campaignOrigins('${region}').map(o=>o.key))`));
 for(const origin of keys)for(const gender of ['남성','여성']){
  create(r,region,origin,gender);characters++;
  const birth=r.run('state.birthRegion'),city=r.run('JSON.stringify(state.city)'),world=r.run('JSON.stringify(state.world)');
  if(region==='east')eq(r.run('/서부에는|서부에서는|서부로 옮겨/.test(state.originDesc)'),false);
  choose(r,0);eq(r.run('state.scene'),`main_${region}_0`);
  choose(r,0);choose(r,0);choose(r,0);saveCheck(r);
  choose(r,0);eq(r.run('state.scene'),'campaign_hub');eq(r.run('state.birthRegion'),birth);
  const money=r.run('state.silver');
  r.run('globalThis.work=scenes.campaign_hub.choices(state)[1];choose(work);');const worked=snap(r);
  r.run('choose(work)');eq(snap(r),worked);saveCheck(r);r.run('continueReview()');
  eq(r.run('state.silver'),money+2);r.run('choose(work)');eq(r.run('state.silver'),money+2);
  for(const tab of ['status','skills','resonance','relations','reputation','journal']){
   r.run(`openSheet('${tab}');closeSheet()`);eq(r.get('sheetContent').innerHTML.includes('undefined'),false);
  }
  r.run('campaignRest();campaignRest();campaignRest();');eq(r.run('state.day'),2);
  r.run('campaignWork()');eq(r.run('state.silver'),money+4);
  if(region!=='west'){eq(r.run('JSON.stringify(state.city)'),city);eq(r.run('JSON.stringify(state.world)'),world);r.run('go("v11_arrival")');eq(r.run('state.scene'),'campaign_hub');}
  r.run(`go('main_${region==='west'?'east':'west'}_0')`);eq(r.run('state.scene'),'campaign_hub');
  r.run('go("main_openings")');eq(r.run('state.scene'),'campaign_hub');
  if(region==='west'){
   const t=r.run('state.day*1440+state.hour*60+state.minute');choose(r,3);eq(r.run('state.scene'),'v11_arrival');
   r.run('go("day1_hub");choose(scenes.day1_hub.choices(state).at(-1));continueReview()');
   eq(r.run('state.scene'),'campaign_hub');eq(r.run('state.day*1440+state.hour*60+state.minute')-t,240);
  }
 }
 // Opt out of the prologue, then join later; decline the first event and remain local.
 create(r,region,keys[0],'여성');choose(r,1);eq(r.run('state.scene'),'campaign_hub');
 choose(r,0);choose(r,2);choose(r,0);eq(r.run('state.scene'),'campaign_hub');
 eq(r.run(`mainOpeningState('${region}').status`),'불참');saveCheck(r);
}
// Invalid region/origin combinations cannot be selected even with a stale callback.
r.run('restartConfirm();beginCampaignCreation("west")');const before=snap(r);
r.run('createCampaignCharacter("demon_courier","남성")');eq(snap(r),before);
// Legacy pilot and PR #2 saves are never converted to regional campaigns on load.
for(const scene of ['intro','main_east_1','main_under_3']){
 r.run(`state=createStateFromOrigin('human_east_scribe','여성');state.scene='${scene}';mainOpeningState('east');saveGame();state=freshState();loadGame();`);
 eq(r.run('state.campaign'),undefined);eq(r.run('state.scene'),scene);
}
// Random legacy lives must never acquire campaign-only origins.
for(let i=0;i<60;i++){r.run('randomLife()');eq(r.run('!!origins.find(o=>o.key===state.originKey).campaignOnly'),false);}
for(const region of ['west','east','under'])for(let i=0;i<10;i++){
 r.run(`state=freshState();beginCampaignCreation('${region}');campaignRandomCharacter()`);
 eq(r.run('state.campaign.region'),region);eq(r.run(`campaignOrigins('${region}').some(o=>o.key===state.originKey)`),true);
}
eq(r.messages.filter(m=>m.startsWith('Missing scene')),[]);
console.log(JSON.stringify({characters,regions:3,checks,failures:0}));
