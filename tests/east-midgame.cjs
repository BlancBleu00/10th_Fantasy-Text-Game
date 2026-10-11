const assert=require('node:assert/strict');
const {createRuntime}=require('./refactor-regression.cjs');
let checks=0,edges=0,ends=0;const endings=new Set(),nodes=new Set();
function eq(a,b,message){assert.deepEqual(a,b,message);checks++;}
const r=createRuntime(true,true);
function choose(index){r.run(`choose((typeof scenes[state.scene].choices==='function'?scenes[state.scene].choices(state):scenes[state.scene].choices)[${index}]);if(state.pendingReview)continueReview()`);}
function setup(origin='human_east_scribe',stance=0,gender='남성'){
 r.run(`restartConfirm();beginCampaignCreation('east');createCampaignCharacter('${origin}','${gender}');`);
 r.get('playerNameInput').value='중간부검증';choose(0);choose(0);
 if(stance===3){choose(2);}else{choose(0);choose(0);choose(stance);}
 eq(r.run('state.scene'),'main_east_3');
 choose(1);eq(r.run('state.scene'),'mid_east_gate');
}
const origin=r.run("campaignOrigins('east')[0].key");
const snapshot=()=>r.run('JSON.stringify({mid:state.midgame,seed:state.seed,res:state.res,skills:state.skills,day:state.day,hour:state.hour,minute:state.minute,scene:state.scene,review:state.pendingReview,flags:state.flags,vectors:state.vectors})');
function saveReload(){const before=snapshot();r.run('saveGame();state=freshState();loadGame()');eq(snapshot(),before,'save/load preserves outcome, seed and clock');}
for(let stance=0;stance<4;stance++){
 setup(origin,stance);
 const start=r.run('JSON.stringify(state)');
 function visit(saved){
  r.run(`state=JSON.parse(${JSON.stringify(saved)});render()`);
  const node=r.run("midgameRoute('east').node");nodes.add(node);
  const frozen=snapshot();r.run('render();render();openSheet("journal");closeSheet()');eq(snapshot(),frozen,'reading is side-effect free');
  if(node.startsWith('end_')){
   ends++;endings.add(node);eq(r.run('state.ended'),false);eq(r.run("midgameRoute('east').status"),'중간부 완료');
   eq(r.run("state.flags.filter(f=>f===MIDGAME_ENDINGS.east[midgameRoute('east').ending].flag).length"),1);
   saveReload();const old=r.run('JSON.stringify(state.vectors)');
   choose(0);eq(r.run('state.scene'),'campaign_hub');
   r.run("choose(scenes.campaign_hub.choices(state).at(-1))");eq(r.run('JSON.stringify(state.vectors)'),old);
   eq(r.run('state.scene'),'mid_east_'+node);return;
  }
  const options=JSON.parse(r.run(`JSON.stringify(MIDGAME_STORY.east['${node}'].choices)`));
  for(const [i,o]of options.entries())for(const success of o.check?[true,false]:[true]){
   r.run(`state=JSON.parse(${JSON.stringify(saved)});render()`);
   const allowed=r.run(`midgameMeets('east',MIDGAME_STORY.east['${node}'].choices[${i}].requires)`);
   if(!allowed){const before=snapshot();r.run(`choose(scenes[state.scene].choices(state)[${i}])`);eq(snapshot(),before,'locked outcome cannot be selected');continue;}
   // Explicit extremes exercise every success/failure branch, independent of stats.
   r.run(`rng=()=>${success?0:0.999999};globalThis.stale=scenes[state.scene].choices(state)[${i}];choose(stale)`);
   edges++;const before=snapshot();r.run('choose(stale)');eq(snapshot(),before,'double click must not roll/pay twice');
   eq(r.run('!!state.pendingReview'),true);saveReload();
   const expected=!success&&o.failureNext?o.failureNext:o.next;
   eq(r.run('state.pendingReview.target'),'mid_east_'+expected);
   r.run('continueReview()');eq(r.run('state.scene'),'mid_east_'+expected);
   const after=snapshot();r.run('choose(stale)');eq(snapshot(),after,'stale callback cannot replay');
   visit(r.run('JSON.stringify(state)'));
  }
 }
 visit(start);
}
eq([...endings].sort(),['end_accord','end_independent','end_shelter']);eq(nodes.size,13);
// All eastern origins/genders can use the shared route; their starting skills apply.
const origins=JSON.parse(r.run("JSON.stringify(campaignOrigins('east').map(o=>o.key))"));
for(const key of origins)for(const gender of ['남성','여성']){
 setup(key,0,gender);choose(1);choose(0);choose(1);choose(0);choose(0);choose(1);choose(0);choose(0);
 eq(r.run('state.scene'),'mid_east_end_accord');eq(r.run('state.originKey'),key);
}
setup(origin,0);const ally=r.run("midgameRoute('east').support");
setup(origin,2);eq(r.run("midgameRoute('east').support<"+ally),true);
setup(origin,3);eq(r.run("midgameRoute('east').openingStance"),'초반 불참');
eq(r.run("midgameRoute('east').evidence"),0);
// Pause every intermediate node; resuming cannot reset investigation or rewards.
setup(origin,1);
for(const index of [0,0,1,0,0,1,0]){
 const node=r.run("midgameRoute('east').node"),before=r.run('JSON.stringify(state.midgame)');
 r.run('choose(scenes[state.scene].choices(state).at(-1))');eq(r.run('state.scene'),'campaign_hub');
 saveReload();r.run('choose(scenes.campaign_hub.choices(state).at(-1))');
 eq(r.run('JSON.stringify(state.midgame)'),before);eq(r.run('state.scene'),'mid_east_'+node);choose(index);
}
eq(r.run('state.scene'),'mid_east_pact');
// Real seeded RNG: reload a pending failed check without rerolling or changing its XP.
setup(origin,3);choose(1);choose(0);choose(1);choose(0);choose(0);
r.run('rng=function(){state.seed=(state.seed*1664525+1013904223)>>>0;return state.seed/4294967296};state.seed=1900;state.skills.persuasion.lv=0;midgameRoute("east").risk=30;choose(scenes[state.scene].choices(state)[0])');
eq(r.run('midgameRoute("east").lastCheck.success'),false);saveReload();
r.run('continueReview()');eq(r.run('state.scene'),'mid_east_recover');
// No forward/backward teleport, region mixing, implicit upgrade, or demo conversion.
r.run("go('mid_east_end_accord')");eq(r.run('state.scene'),'mid_east_recover');
r.run("go('mid_west_gate')");eq(r.run('state.scene'),'campaign_hub');
for(const region of ['under']){
 r.run(`restartConfirm();beginCampaignCreation('${region}');createCampaignCharacter(campaignOrigins('${region}')[0].key,'여성');`);
 r.get('playerNameInput').value='격리검증';choose(0);choose(0);choose(0);choose(0);choose(0);
 eq(r.run(`midgameBegin('${region}')`),false);eq(r.run('state.midgame'),undefined);
 r.run("go('mid_east_gate')");eq(r.run('state.scene'),'campaign_hub');
}
r.run(`state=createStateFromOrigin('${origin}','남성');state.scene='intro';saveGame();loadGame();render()`);
eq(r.run('state.midgame'),undefined);eq(r.run("midgameBegin('east')"),false);
eq(r.run("Object.keys(scenes).filter(k=>k.startsWith('mid_')).length"),26);
console.log(JSON.stringify({checks,edges,ends,scenes:nodes.size,endings:[...endings],origins:origins.length,failures:0}));
