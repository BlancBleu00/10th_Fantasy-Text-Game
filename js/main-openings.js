/* Optional vertical slices. Register after legacy runtime layers, before bootstrap. */
function mainOpeningState(key) {
 if (!MAIN_OPENINGS[key]) throw new Error('Unknown main opening: '+key);
 if (!state.mainOpenings) state.mainOpenings={version:1,routes:{}};
 if (!state.mainOpenings.routes) state.mainOpenings.routes={};
 return state.mainOpenings.routes[key]||(state.mainOpenings.routes[key]={step:0,choices:{},status:'진행 중',stance:null,leadStatus:'아직 접촉하지 않음'});
}
function mainOpeningScene(key,step) {return 'main_'+key+'_'+step;}
function mainOpeningChoice(key,step,option) {
 const route=mainOpeningState(key);
 // The engine executes effects before review. Reject double/stale clicks.
 if(state.pendingReview||state.scene!==mainOpeningScene(key,step)||route.step!==step||route.choices[step])return false;
 route.choices[step]=option.id;
 route.lastResult=option.text;
 if(option.fact)knowFact(option.fact);
 if(option.suspicion)knowSuspicion(option.suspicion);
 if(option.stance){route.stance=option.stance;route.leadStatus=option.leadStatus;state.vectors[MAIN_OPENINGS[key].vector]+=2;}
 if(option.decline){route.status='불참';route.leadStatus='다른 협력자를 찾아 사건을 진행 중';route.step=3;}
 else {route.step=step+1;if(route.step===3)route.status='초반 완료';}
 // Reading/rendering/loading never advances time or re-applies effects.
 advance(0,option.decline?5:20);
 quest('main_'+key,MAIN_OPENINGS[key].title,route.stance||route.lastResult,route.status);
 lifeRecord('메인 초반',MAIN_OPENINGS[key].title+': '+option.label);
}
for(const [key,meta] of Object.entries(MAIN_OPENINGS)){
 MAIN_OPENING_STORY[key].forEach((node,step)=>{
  scenes[mainOpeningScene(key,step)]={title:node.title,location:meta.region,
   text:()=>{const r=mainOpeningState(key);return (step===3&&r.status==='불참'?'당신은 이번 사건에 참여하지 않기로 했다. 이 결정은 패배나 엔딩이 아니다.':node.text)+(step>0&&r.lastResult?'\n\n<b>당신이 남긴 결과</b>\n'+r.lastResult:'')+(step===3?'\n\n<b>입장:</b> '+(r.stance||'불참')+'\n<b>'+meta.lead+':</b> '+r.leadStatus:'');},
   choices:()=>{const r=mainOpeningState(key);if(step===3)return [choice('초반 선택 화면으로 돌아간다. (시범 장면 전환)','main_openings',{noEncounter:true,review:false})];
    if(r.step!==step)return [choice('저장된 진행 지점으로 돌아간다.',mainOpeningScene(key,r.step),{noEncounter:true,review:false})];
    return node.choices.map(o=>choice(o.label,mainOpeningScene(key,o.decline?3:step+1),{noEncounter:true,do:()=>mainOpeningChoice(key,step,o),review:o.text}));}
  };
 });
}
scenes.main_openings={title:'세 갈래의 시작 · 초반 플레이',location:'시범 장면 선택',
 text:()=> '서부의 세계수, 동부의 용왕, 중앙지하의 악귀 후계. 세 라인의 첫 사건을 현재 캐릭터로 플레이합니다.\n\n출신 이력은 유지됩니다. 이 화면의 지역 전환은 대륙 간 여행이 아닌 초반 시범 장면 선택이며, 각 라인의 선택과 기록은 따로 저장됩니다. 메인에 불참해도 다른 생활을 이어갈 수 있습니다.\n\n각 라인은 첫 조사와 입장 선택까지 구현되어 있습니다. NPC의 다음 행동은 기록으로 남으며, 장기 성장 시뮬레이션은 아직 연결되지 않았습니다.',
 choices:()=>[...Object.entries(MAIN_OPENINGS).map(([key,meta])=>{
  const r=state.mainOpenings?.routes?.[key];return choice(meta.title+(r?' — '+r.status:''),mainOpeningScene(key,r?.step||0),{noEncounter:true,review:false});
 }),choice('기존 서부 도입부로 돌아간다.','intro',{noEncounter:true,review:false})]
};
const originalOpeningChoices=scenes.intro.choices;
scenes.intro.choices=s=>[...(typeof originalOpeningChoices==='function'?originalOpeningChoices(s):originalOpeningChoices),choice('새 메인스토리 세 지역의 초반을 플레이한다.','main_openings',{noEncounter:true,review:false})];
