const assert=require('node:assert/strict');
const {createRuntime}=require('./refactor-regression.cjs');
let checks=0;
const eq=(a,b)=>{assert.deepEqual(a,b);checks++;};
const old=createRuntime(true,true,['story/prose-refresh.js']),fresh=createRuntime(true,true);
const json=(r,code)=>JSON.parse(r.run(`JSON.stringify(${code})`));
function mechanics(r){return json(r,`({scene:state.scene,seed:state.seed,day:state.day,hour:state.hour,minute:state.minute,
 silver:state.silver,food:state.food,res:state.res,skills:state.skills,flags:state.flags,vectors:state.vectors,
 knowledge:state.knowledge,originKey:state.originKey,quests:Object.fromEntries(Object.entries(state.quests).map(([k,v])=>[k,v.status])),
 main:Object.fromEntries(Object.entries(state.mainOpenings?.routes||{}).map(([k,v])=>[k,{step:v.step,choices:v.choices,status:v.status,stance:v.stance}])),
 mid:Object.fromEntries(Object.entries(state.midgame?.routes||{}).map(([k,v])=>[k,{node:v.node,status:v.status,evidence:v.evidence,support:v.support,risk:v.risk,ending:v.ending,history:v.history.map(h=>({node:h.node,choice:h.choice,next:h.next,success:h.success,check:h.check}))}])),
 target:state.pendingReview?.target})`);}
// Every opening and western midgame option keeps its non-prose fields.
for(const expression of ['MAIN_OPENING_STORY','MIDGAME_STORY.west']){
 const clean=value=>Array.isArray(value)?value.map(clean):value&&typeof value==='object'?
  Object.fromEntries(Object.entries(value).filter(([k])=>!['text','label','summary','failure'].includes(k)).map(([k,v])=>[k,clean(v)])):value;
 eq(clean(json(fresh,expression)),clean(json(old,expression)));
}
const targetTexts=json(fresh,`[...Object.values(MAIN_OPENING_STORY).flat().map(n=>n.text),...Object.values(MIDGAME_STORY.west).map(n=>n.text),...Object.values(MIDGAME_ENDINGS.west).map(n=>n.text)]`);
for(const t of targetTexts){eq(t.length<=260,true);eq(/시간.*(?:정지|멈추|흐르지)|이번 구현|은화만의 문제가/.test(t),false);}
const labels=json(fresh,`[...Object.values(MAIN_OPENING_STORY).flat().flatMap(n=>(n.choices||[]).map(o=>o.label)),...Object.values(MIDGAME_STORY.west).flatMap(n=>n.choices.map(o=>o.label))]`);
for(const label of labels)eq(label.length<=26,true);
// Check each collision choice with high/low skills, no cash, and stale success flags.
for(const index of [0,1,2])for(const success of [true,false])for(const silver of [0,5]){
 for(const r of [old,fresh]){
  r.run(`state=createStateFromOrigin('human_farmer','남성');for(const k in state.stats)state.stats[k]=${success?100:1};for(const k in state.skills)state.skills[k].lv=0;recalc();state.silver=${silver};state.seed=7;flag('소매치기 손 포착');flag('소매치기 붙잡음');flag('소매치기 돌려받음');state.random.returnTo='day1_hub';go('enc_pickpocket');choose(scenes.enc_pickpocket.choices[${index}]);`);
 }
 eq(mechanics(fresh),mechanics(old));
 const review=fresh.run('state.pendingReview.text');
 if(index<2){eq(fresh.run(`proseCheckSucceeded('${index===0?'소매치기 추격':'조용한 압박'}')`),success);eq(review.includes(index===0?'은화 두 닢을 받아':'멈칫하더니'),success);}
 eq(review.includes('은화만의 문제가'),false);
 fresh.run('saveGame();state=freshState();loadGame()');eq(fresh.run('state.pendingReview.text'),review);
 for(const r of [old,fresh])r.run('continueReview()');eq(mechanics(fresh),mechanics(old));
}
// Real west route through probability check and result screen; data mechanics agree.
function pick(r,index){r.run(`choose((typeof scenes[state.scene].choices==='function'?scenes[state.scene].choices(state):scenes[state.scene].choices)[${index}]);if(state.pendingReview)continueReview()`);}
for(const r of [old,fresh]){r.setRandomSeed(7);r.run("restartConfirm();beginCampaignCreation('west');createCampaignCharacter('human_farmer','남성')");r.get('playerNameInput').value='문장검증';}
for(const i of [0,0,0,0,0,1,0,0,1,0,0,0]){for(const r of [old,fresh])pick(r,i);eq(mechanics(fresh),mechanics(old));}
if(fresh.run('state.scene')==='mid_west_recover'){for(const r of [old,fresh])pick(r,0);eq(mechanics(fresh),mechanics(old));}
for(const r of [old,fresh])pick(r,0);eq(mechanics(fresh),mechanics(old));eq(fresh.run('state.scene'),'mid_west_end_accord');
const oldCount=json(old,'Object.keys(scenes).length');eq(json(fresh,'Object.keys(scenes).length'),oldCount);
console.log(JSON.stringify({checks,openingAndMidgameChoices:labels.length,scenes:targetTexts.length,failures:0}));
