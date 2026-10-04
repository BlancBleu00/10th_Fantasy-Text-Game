const assert=require('node:assert/strict');
const {createRuntime}=require('./refactor-regression.cjs');
let paths=0,checks=0;
const snapshot=r=>r.run('JSON.stringify({routes:state.mainOpenings,quests:state.quests,knowledge:state.knowledge,vectors:state.vectors,day:state.day,hour:state.hour,minute:state.minute})');
function check(value,expected){assert.deepEqual(value,expected);checks++;}
function pick(r,index){
 const before=r.run('JSON.stringify(state.mainOpenings)');
 r.run(`globalThis.picked=scenes[state.scene].choices(state)[${index}];choose(picked)`);
 const after=snapshot(r);
 // Double click, repeated render and save/load must not repeat effects.
 r.run('choose(picked);render();render();saveGame();loadGame();');
 check(snapshot(r),after);
 if(r.run('!!state.pendingReview'))r.run('continueReview()');
 check(r.run('!!scenes[state.scene]'),true);
 return before;
}
for(const key of ['west','east','under']){
 for(const first of [0,1,2])for(const evidence of first===2?[0]:[0,1])for(const stance of first===2?[0]:[0,1,2]){
  const r=createRuntime(true,true);
  r.run("state=createStateFromOrigin('human_farmer','여성',{creationComplete:true});go('intro');");
  pick(r,4);check(r.run('state.scene'),'main_openings');
  pick(r,['west','east','under'].indexOf(key));
  pick(r,first);
  if(first!==2){pick(r,evidence);pick(r,stance);}
  check(r.run('state.scene'),`main_${key}_3`);
  check(r.run(`mainOpeningState('${key}').status`),first===2?'불참':'초반 완료');
  check(r.run(`Object.keys(mainOpeningState('${key}').choices).length`),first===2?1:3);
  const end=snapshot(r);r.run('render();saveGame();loadGame();');check(snapshot(r),end);
  pick(r,0);pick(r,['west','east','under'].indexOf(key));check(snapshot(r),end);
  check(r.messages.filter(s=>s.includes('Missing scene')),[]);paths++;
 }
}
// Every origin can enter all three slices without modifying its birth identity.
const r=createRuntime(true,true);
const origins=JSON.parse(r.run('JSON.stringify(origins.map(o=>o.key))'));
for(const origin of origins)for(const key of ['west','east','under']){
 r.run(`state=createStateFromOrigin('${origin}','남성',{creationComplete:true});go('intro');`);
 const birth=r.run('state.birthRegion');r.run(`go('main_${key}_0')`);pick(r,0);pick(r,0);pick(r,0);
 check(r.run('state.originKey'),origin);check(r.run('state.birthRegion'),birth);
}
// Pre-feature save works without eagerly injecting fields or resetting the character.
r.run("state=createStateFromOrigin('human_farmer','남성');state.scene='intro';localStorage.setItem('fantasyFullPilot',JSON.stringify(state));loadGame()");
check(r.run('state.mainOpenings'),undefined);
pick(r,4);pick(r,0);check(r.run('mainOpeningState("west").step'),0);
// Ordinary legacy route stays available; restart clears all new progress.
r.run("go('intro')");pick(r,0);check(r.run('state.scene'),'v11_route_livelihood');
r.run('restartConfirm()');check(r.run('state.mainOpenings'),undefined);
console.log(JSON.stringify({paths,origins:origins.length,checks,scenes:13,failures:0}));
