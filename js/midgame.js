/* Shared, action-driven chapter engine. Reading never creates or rolls state. */
function midgameRoute(key){return state.midgame?.routes?.[key]||null;}
function midgameScene(key,node){return 'mid_'+key+'_'+node;}
function midgameAvailable(key){
 return MIDGAME_ENABLED.includes(key)&&state.campaign?.region===key&&
  state.campaign.prologueDone&&state.mainOpenings?.routes?.[key]?.step===3&&!state.ended;
}
function midgameSeed(key){
 const opening=state.mainOpenings.routes[key],p=opening.choices||{};
 let evidence=0,support=0;
 if(p[0]==='rescue')support++;
 if(p[0]==='listen')evidence++;
 if(p[1]==='trace')evidence++;else if(p[1]==='testimony')support++;
 if(p[2]==='ally')support+=2;
 else if(['public','protect','neutral'].includes(p[2])){evidence++;support++;}
 else if(['independent','claim'].includes(p[2]))evidence++;
 return {node:'gate',status:'진행 중',evidence,support,risk:0,history:[],ending:null,
  openingStance:opening.stance||'초반 불참',lastResult:opening.status==='불참'?
   '초반에는 물러났지만, 수로의 문제를 듣고 뒤늦게 조사에 합류했다. 처음 조사한 사람들의 기록부터 확인해야 한다.':
   '초반의 선택을 이어받았다: '+opening.stance};
}
function midgameBegin(key){
 if(!midgameAvailable(key)||state.pendingReview||
  !['campaign_hub',mainOpeningScene(key,3)].includes(state.scene))return false;
 if(!midgameRoute(key)){
  state.midgame??={version:1,routes:{}};state.midgame.routes??={};
  state.midgame.routes[key]=midgameSeed(key);
  quest('mid_'+key,MIDGAME_META[key].title,'외곽 수로의 조사와 주민의 안전을 함께 확인한다.');
  lifeRecord('중간부 시작',MIDGAME_META[key].title+' — '+midgameRoute(key).openingStance);
 }
}
function midgameChance(key,option){
 const r=midgameRoute(key);
 return clamp(option.check.base+skill(option.check.skill)*5+(r?.support||0)*4+
  (r?.evidence||0)*3-(r?.risk||0)*3,10,95);
}
function midgameMeets(key,requirements){
 const r=midgameRoute(key);return !!r&&Object.entries(requirements||{}).every(([k,v])=>r[k]>=v);
}
function midgameAct(key,node,id){
 const r=midgameRoute(key),option=MIDGAME_STORY[key]?.[node]?.choices.find(o=>o.id===id);
 if(!midgameAvailable(key)||state.pendingReview||!r||r.status!=='진행 중'||
  state.scene!==midgameScene(key,node)||r.node!==node||!option||
  r.history.some(h=>h.node===node)||!midgameMeets(key,option.requires))return false;
 const check=option.check?{skill:option.check.skill,chance:midgameChance(key,option),roll:Math.floor(rng()*100)+1}:null;
 const success=!check||check.roll<=check.chance;
 if(success){r.evidence+=option.evidence||0;r.support+=option.support||0;if(option.fact)knowFact(option.fact);}
 r.risk+=(option.risk||0)+(success?0:option.failRisk||0);
 r.lastResult=success?option.summary:option.failure;
 r.lastCheck=check?{...check,success}:null;
 r.node=success?option.next:(option.failureNext||option.next);
 r.history.push({node,choice:id,next:r.node,success,check:r.lastCheck,result:r.lastResult});
 // A check consumes one roll. Its result and destination exist before review/save.
 if(check)gainSkill(check.skill,success?2:1);
 const minutes=option.minutes??60;
 advance(Math.floor(minutes/60),minutes%60);
 if(option.stamina)modRes({stamina:option.stamina});
 lifeRecord('중간부',r.lastResult);
 if(r.node.startsWith('end_')){
  r.ending=r.node.slice(4);r.status='중간부 완료';
  const ending=MIDGAME_ENDINGS[key][r.ending];flag(ending.flag);
  state.vectors[MAIN_OPENINGS[key].vector]+=2;
  lifeRecord('중간부 결말',ending.title);
 }
 quest('mid_'+key,MIDGAME_META[key].title,r.lastResult,r.status);
}
function midgameProgress(key){
 const r=midgameRoute(key);if(!r)return '';
 return `증거 ${r.evidence} · 지지 ${r.support} · 미해결 위험 ${r.risk}`;
}
function midgameReview(key){
 const r=midgameRoute(key),c=r.lastCheck;
 return r.lastResult+(c?`\n\n${SKILL_NAMES[c.skill]}: ${c.success?'성공':'실패'} (${c.chance}% · 주사위 ${c.roll})`:'');
}
function midgameEntry(key){
 const r=midgameRoute(key);
 return choice(r?.ending?'조사 결과를 돌아본다.':r?'수로 조사를 이어간다.':'수로 조사를 시작한다.',
  ()=>midgameScene(key,midgameRoute(key).node),{noEncounter:true,review:false,
   if:()=>midgameAvailable(key),do:()=>midgameBegin(key)});
}
function midgamePause(key,node){
 return choice('거점으로 돌아간다.','campaign_hub',{
  noEncounter:true,review:false,
  do:()=>{if(state.pendingReview||state.scene!==midgameScene(key,node)||midgameRoute(key)?.node!==node)return false;}
 });
}
// Use the existing disabled-button UI while leaving all legacy requirements intact.
const midgameLegacyMeets=meets,midgameLegacyReqText=reqText;
meets=function(req){return midgameLegacyMeets(req)&&(!req?.midgame||midgameMeets(req.midgame.region,req.midgame.values));};
reqText=function(req){return req?.midgame?Object.entries(req.midgame.values).map(([k,v])=>({evidence:'증거',support:'지지',risk:'미해결 위험'}[k]||k)+' '+v+' 이상').join(' / '):midgameLegacyReqText(req);};
for(const key of MIDGAME_ENABLED){
 for(const [node,definition] of Object.entries(MIDGAME_STORY[key])){
  scenes[midgameScene(key,node)]={title:definition.title,location:MIDGAME_META[key].place,
   text:()=>{
    const r=midgameRoute(key);
    if(!r)return '생활 거점에서 중간부를 시작해 주세요.';
    const lead=node==='gate'&&r.openingStance==='초반 불참'?'교역소에서 수로가 막혔다는 소식을 듣고 찾아왔습니다.\n\n':'';
    return lead+definition.text;
   },
   choices:()=>{
    const r=midgameRoute(key);
    if(!r||r.node!==node)return [choice('저장된 진행 지점으로 돌아간다.',r?midgameScene(key,r.node):'campaign_hub',{noEncounter:true,review:false})];
    return [...definition.choices.map(o=>choice(o.label,()=>midgameScene(key,midgameRoute(key).node),{
     noEncounter:true,do:()=>midgameAct(key,node,o.id),review:()=>midgameReview(key),reviewOnly:true,
     ...(o.requires?{req:{midgame:{region:key,values:o.requires}}}:{}),
     hint:(o.check?`${SKILL_NAMES[o.check.skill]} ${midgameChance(key,o)}% / `:'')+
      `${o.minutes??60}분`+(o.stamina?` · 기력 ${o.stamina}`:'')
    })),midgamePause(key,node)];
   }
  };
 }
 for(const [id,ending] of Object.entries(MIDGAME_ENDINGS[key])){
  const node='end_'+id;
  scenes[midgameScene(key,node)]={title:ending.title,location:MIDGAME_META[key].place,
   text:()=>ending.text+'\n\n<b>수로 조사 완료</b>\n거점에서 생활을 이어갈 수 있습니다.',
   choices:()=>[midgamePause(key,node)]};
 }
 const final=scenes[mainOpeningScene(key,3)],oldChoices=final.choices,oldText=final.text;
 final.choices=s=>[...oldChoices(s),...(s.campaign?.region===key?[midgameEntry(key)]:[])];
 final.text=(s=state)=>{
  const text=oldText(s);return s.campaign?.region===key?text.replace('[이번 구현은 첫 조사와 입장 선택까지입니다. 세계수의 정체나 미래의 결말은 아직 확정되지 않습니다.]','[이제 외곽 수로 조사로 이어지는 중간부를 시작할 수 있습니다. 세계수의 정체와 종장의 결말은 아직 확정되지 않습니다.]'):text;
 };
}
const midgameLegacyHubChoices=scenes.campaign_hub.choices,midgameLegacyHubText=scenes.campaign_hub.text;
scenes.campaign_hub.choices=(s=state)=>[...midgameLegacyHubChoices(s),...(MIDGAME_ENABLED.includes(s.campaign?.region)?[midgameEntry(s.campaign.region)]:[])];
scenes.campaign_hub.text=(s=state)=>{
 let text=midgameLegacyHubText(s);const key=s.campaign?.region,r=midgameRoute(key);
 if(MIDGAME_ENABLED.includes(key))text=text.replace('사건의 다음 장과 다른 지역으로 나가는 길은 아직 열리지 않았다.','초반 사건의 선택을 마치면 세계수 중간부를 시작할 수 있다. 다른 대륙으로 나가는 길은 아직 열리지 않았다.');
 return text+(r?'\n\n<b>'+MIDGAME_META[key].title+'</b> — '+r.status+'\n'+midgameProgress(key)+(r.ending?'\n'+MIDGAME_ENDINGS[key][r.ending].title:''): '');
};
const midgameLegacyGo=go;
go=function(id){
 if(String(id).startsWith('mid_')){
  const key=state.campaign?.region,r=midgameRoute(key);
  if(!midgameAvailable(key)||!r||!scenes[id]||!id.startsWith('mid_'+key+'_'))id=state.campaign?'campaign_hub':state.scene;
  else id=midgameScene(key,r.node);
 }
 return midgameLegacyGo(id);
};
const midgameLegacyHud=renderV11Hud;
renderV11Hud=function(){
 midgameLegacyHud();const key=state.campaign?.region,r=midgameRoute(key);
 if(r)document.getElementById('v11hud').insertAdjacentHTML('beforeend',`<div class="v11card"><b>${MIDGAME_META[key].title}</b><p>${r.status} · ${midgameProgress(key)}</p></div>`);
};
const midgameLegacySheet=renderSheet;
renderSheet=function(tab){
 midgameLegacySheet(tab);const key=state.campaign?.region,r=midgameRoute(key);
 if(r&&['status','journal'].includes(tab))document.getElementById('sheetContent').insertAdjacentHTML('beforeend',
  `<div class="box"><h3>${MIDGAME_META[key].title}</h3><p>${r.status} / ${midgameProgress(key)}</p><p>초반의 입장: ${escapeHtml(r.openingStance)}</p>${r.history.map(h=>`<p>${escapeHtml(MIDGAME_STORY[key][h.node].title)} — ${escapeHtml(h.result)}</p>`).join('')}${r.ending?`<b>${MIDGAME_ENDINGS[key][r.ending].title}</b>`:''}</div>`);
};
