/* Region is chosen once during creation. Legacy saves retain their legacy flow. */
function campaignOrigins(region){return origins.filter(o=>region==='under'?o.campaignOnly:region==='east'?CAMPAIGN_EAST_ORIGINS.includes(o.key):region==='west'?!o.campaignOnly&&!CAMPAIGN_EAST_ORIGINS.includes(o.key):false).map(o=>region==='east'?{...o,...CAMPAIGN_EAST_BACKGROUNDS[o.key]}:o);}
function campaignDraft(){return state.campaignDraft||{};}
function beginCampaignCreation(region){
 if(!CAMPAIGN_STARTS[region])return false;
 state.campaignDraft={region};return true;
}
function createCampaignCharacter(key,gender){
 const region=campaignDraft().region;
 const origin=campaignOrigins(region).find(o=>o.key===key);
 if(!origin||!['남성','여성'].includes(gender))return false;
 state=createStateFromOrigin(key,gender,{scene:'name_entry',creationComplete:false});
 state.campaign={version:1,region,prologueDone:false,workDay:0};
 state.opening='campaign_prologue';state.creationMode='지역에서 시작';
 state.location=MAIN_OPENINGS[region].region;
 state.origin=originDisplay(origin,gender);state.originDesc=origin.desc;
 if(region==='east')state.relations=Object.fromEntries(Object.entries(NPC).map(([id,n])=>[id,n.baseRel||0]));
 if(region==='under'){
  // No inherited western NPC connections or assumed bloodline/royal title.
  state.reputation.peoples.demon=5;state.reputation.realms.centralDepths=5;
  state.reputationAwareness=awarenessFromReputation(state.reputation);
 }
 render();return false;
}
function campaignRandomCharacter(){
 const pool=campaignOrigins(campaignDraft().region);
 if(!pool.length)return false;
 return createCampaignCharacter(pool[rollInt(0,pool.length-1)].key,rng()<.5?'남성':'여성');
}
function campaignPrologueAction(follow){
 if(!state.campaign||state.campaign.prologueDone||state.pendingReview||state.scene!=='campaign_prologue')return false;
 state.campaign.prologueDone=true;
 state.departure.reason=follow?'현지 사건 조사':'현지 생활';state.departure.route=state.campaign.region;
 advance(0,10);lifeRecord('출발',CAMPAIGN_STARTS[state.campaign.region].name+'에서 첫 하루를 시작했다.');
}
function campaignWork(){
 const c=state.campaign;if(!c||state.scene!=='campaign_hub'||state.pendingReview||c.workDay===state.day)return false;
 c.workDay=state.day;state.silver+=2;advance(1,0);modRes({stamina:-6});
 lifeRecord('생계',CAMPAIGN_STARTS[c.region].home+'에서 일하고 은화 두 닢을 받았다.');
}
function campaignRest(){
 if(!state.campaign||state.scene!=='campaign_hub'||state.pendingReview)return false;
 advance(8,0);modRes({stamina:20,spirit:5});lifeRecord('휴식',CAMPAIGN_STARTS[state.campaign.region].home+'에서 여덟 시간 쉬었다.');
}
scenes.campaign_start={title:'이번 삶이 시작되는 곳',location:'아직 이름 붙지 않은 삶',
 text:()=> '서부, 동부, 중앙지하 가운데 이번 여정이 시작될 곳을 고릅니다. 각 지역에 구현된 출신 배경 안에서 종족과 삶을 정합니다.\n\n시작 지역은 출신·프롤로그·첫 사건과 생활 거점을 함께 정합니다. 다른 지역으로 이동하는 여정은 아직 열리지 않았습니다.',
 choices:()=>Object.entries(CAMPAIGN_STARTS).map(([key,m])=>choice(m.name,'campaign_species',{noEncounter:true,review:false,hint:m.hint,do:()=>beginCampaignCreation(key)})).concat([choice('시작 지역도 운에 맡긴다.','campaign_species',{noEncounter:true,review:false,do:()=>beginCampaignCreation(['west','east','under'][rollInt(0,2)])}),choice('처음 화면으로 돌아간다.','life_setup',{noEncounter:true,review:false,do:()=>{delete state.campaignDraft;}})])};
scenes.campaign_species={title:'이곳에서 살아온 종족',location:'아직 이름 붙지 않은 삶',
 text:()=>`${CAMPAIGN_STARTS[campaignDraft().region]?.name||'시작 지역을 먼저 선택하세요.'}\n\n현재 구현된 출신 배경으로 시작할 수 있는 종족입니다. 세계 전체에서 이 종족만 존재한다는 뜻은 아닙니다.`,
 choices:()=>[...new Set(campaignOrigins(campaignDraft().region).map(o=>o.species))].map(sp=>choice(sp,'campaign_gender',{noEncounter:true,review:false,do:()=>{state.campaignDraft.species=sp;}})).concat([choice('이 지역에서의 삶을 무작위로 정한다.',null,{noEncounter:true,review:false,do:campaignRandomCharacter}),choice('시작 지역을 다시 고른다.','campaign_start',{noEncounter:true,review:false})])};
scenes.campaign_gender={title:'어떤 이름으로 불릴 사람인가',location:'아직 이름 붙지 않은 삶',text:()=> `${campaignDraft().species||''}의 삶을 시작합니다. 성별 자체에 능력치 보너스는 없습니다.`,
 choices:()=>['남성','여성'].map(g=>choice(g,'campaign_background',{noEncounter:true,review:false,do:()=>{state.campaignDraft.gender=g;}})).concat([choice('종족을 다시 고른다.','campaign_species',{noEncounter:true,review:false})])};
scenes.campaign_background={title:'이곳에서 배운 일',location:'아직 이름 붙지 않은 삶',text:()=> `${CAMPAIGN_STARTS[campaignDraft().region]?.name||''} / ${campaignDraft().species||''}\n\n태어난 공동체와 배운 일이 첫 기술과 언어를 정합니다.`,
 choices:()=>campaignOrigins(campaignDraft().region).filter(o=>o.species===campaignDraft().species).map(o=>choice(`${originDisplay(o,campaignDraft().gender)} — ${REGION_NAMES_10[originRegion(o)]}`,null,{noEncounter:true,review:false,hint:o.desc,do:()=>createCampaignCharacter(o.key,campaignDraft().gender)})).concat([choice('성별을 다시 고른다.','campaign_gender',{noEncounter:true,review:false})])};
scenes.campaign_prologue={title:'먼 사건보다 먼저 온 하루',location:()=>MAIN_OPENINGS[state.campaign.region].region,
 text:()=>`당신은 <b>${escapeHtml(state.species)}, ${escapeHtml(state.origin)}</b>이다. ${escapeHtml(state.originDesc)}\n\n${CAMPAIGN_PROLOGUES[state.campaign.region]}`,
 choices:()=>state.campaign.prologueDone?[choice('생활 거점으로 간다.','campaign_hub',{noEncounter:true,review:false})]:[
 choice('사람들이 모인 곳에서 무슨 일인지 확인한다.',()=>mainOpeningScene(state.campaign.region,0),{noEncounter:true,do:()=>campaignPrologueAction(true),review:'당신은 오늘 눈앞에서 벌어진 일부터 확인하기로 한다.'}),
 choice('지금은 내 일과 쉴 곳부터 찾는다.','campaign_hub',{noEncounter:true,do:()=>campaignPrologueAction(false),review:'당신은 사건에 뛰어들기보다 생활을 먼저 정돈한다. 나중에 마음을 바꿀 수도 있다.'})]};
scenes.campaign_hub={title:'오늘 머물 자리',location:()=>MAIN_OPENINGS[state.campaign.region].region,
 text:()=>{const c=state.campaign,r=state.mainOpenings?.routes?.[c.region];return CAMPAIGN_HOME_TEXT[c.region]+'\n\n'+(r?`${MAIN_OPENINGS[c.region].title}: ${r.status}\n${r.stance||r.lastResult||'아직 첫 판단을 내리지 않았다.'}`:'메인 사건에 참여할지는 아직 정하지 않았다.')+'\n\n품삯 일은 하루에 한 번 맡을 수 있다. 사건의 다음 장과 다른 지역으로 나가는 길은 아직 열리지 않았다.';},
 choices:()=>{const c=state.campaign,r=state.mainOpenings?.routes?.[c.region];return [
 choice(r?.step===3?'이번 사건에 남긴 선택을 돌아본다.':r?'진행하던 사건으로 돌아간다.':'현지의 사건을 확인한다.',()=>mainOpeningScene(c.region,r?.step||0),{noEncounter:true,review:false}),
 choice(CAMPAIGN_STARTS[c.region].job,'campaign_hub',{noEncounter:true,if:()=>c.workDay!==state.day,do:campaignWork,review:'맡은 일을 끝내고 은화 두 닢을 받았다. 오늘 맡을 품삯 일은 여기까지다.'}),
 choice('여덟 시간 쉬며 다음 일을 기다린다.','campaign_hub',{noEncounter:true,do:campaignRest,review:'머물 자리를 정하고 몸을 쉬게 했다. 시간을 보냈지만 사건에 내린 판단이 바뀌지는 않았다.'}),
 ...(c.region==='west'?[choice('서부 변경도시로 향한다.','v11_arrival',{noEncounter:true,do:()=>{if(state.pendingReview)return false;advance(2,0);lifeRecord('이동','교역소를 떠나 서부 변경도시로 향했다.');},review:'짐을 챙겨 두 시간 동안 변경도시로 이어지는 길을 걸었다.'})]:[])
 ];}
};

// Make the regional flow the first new-game option; retain the existing pilot.
scenes.life_setup.choices=[choice('세 지역 중 시작할 곳을 고른다.','campaign_start',{noEncounter:true,review:false}),...scenes.life_setup.choices];
randomLife=function(){const pool=origins.filter(o=>!o.campaignOnly),o=pool[rollInt(0,pool.length-1)];state=createStateFromOrigin(o.key,rng()<.5?'여성':'남성',{scene:'origin_roll',creationComplete:true});state.creationMode='무작위';render();return false;};
const campaignLegacyPeopleKey=playerPeopleKey;
playerPeopleKey=function(){return state.species==='악마'?'demon':campaignLegacyPeopleKey();};
const campaignLegacyGo=go;
go=function(id){
 const c=state.campaign;
 if(c){
  if(id==='main_openings'||(/^main_(west|east|under)_/.test(id)&&!id.startsWith('main_'+c.region+'_')))id='campaign_hub';
  if(c.region!=='west'&&!['name_entry','campaign_prologue','campaign_hub','death'].includes(id)&&!id.startsWith('main_'+c.region+'_'))id='campaign_hub';
  // Non-western regions do not run western city thread synchronization.
  if(c.region!=='west')return go11base(id);
 }
 return campaignLegacyGo(id);
};
const campaignLegacyAdvance=advance;
advance=function(hours=0,minutes=0){
 if(!state.campaign||state.campaign.region==='west')return campaignLegacyAdvance(hours,minutes);
 const total=state.hour*60+state.minute+hours*60+minutes;
 state.day+=Math.floor(total/1440);state.hour=Math.floor((total%1440)/60);state.minute=total%60;
};
for(const key of Object.keys(CAMPAIGN_STARTS)){
 const last=scenes[mainOpeningScene(key,3)],old=last.choices;
 last.choices=s=>s.campaign?[choice('이곳의 생활 거점으로 돌아간다.','campaign_hub',{noEncounter:true,review:false})]:old(s);
}
const campaignLegacyIntroChoices=scenes.intro.choices;
function campaignReturnToTradepost(){return choice('세계수 사건과 교역소로 돌아간다.','campaign_hub',{noEncounter:true,do:()=>{if(state.pendingReview)return false;advance(2,0);lifeRecord('이동','변경도시에서 교역소로 돌아왔다.');},review:'두 시간 동안 길을 되짚어 숲 바깥 교역소에 도착했다.'});}
scenes.intro.choices=s=>s.campaign?[...originalOpeningChoices(s),campaignReturnToTradepost()]:campaignLegacyIntroChoices(s);
const campaignLegacyDayHubChoices=scenes.day1_hub.choices;
scenes.day1_hub.choices=s=>[...(typeof campaignLegacyDayHubChoices==='function'?campaignLegacyDayHubChoices(s):campaignLegacyDayHubChoices),...(s.campaign?.region==='west'?[campaignReturnToTradepost()]:[])];
const campaignLegacyHud=renderV11Hud;
renderV11Hud=function(){
 if(!state.campaign)return campaignLegacyHud();
 const c=state.campaign,r=state.mainOpenings?.routes?.[c.region];
 document.getElementById('v11hud').innerHTML=`<div class="v11card"><b>${CAMPAIGN_STARTS[c.region].name}</b><div class="v11threads"><span class="threadChip active">${MAIN_OPENINGS[c.region].title}</span><span class="threadChip">${r?.status||'아직 참여하지 않음'}</span></div></div>`;
};
const campaignLegacySheet=renderSheet;
renderSheet=function(tab){
 const c=state.campaign;
 if(!c){if(state.scene.startsWith('campaign_')){currentSheet=tab;document.getElementById('sheetTitle').textContent='아직 시작되지 않은 삶';document.getElementById('sheetContent').innerHTML='출신과 이름을 정하면 이번 삶의 기록이 만들어집니다.';return;}return campaignLegacySheet(tab);}
 // Core sheet retains inventory/derived stats without western-city appendices.
 if(tab==='status')baseRenderSheet(tab);else campaignLegacySheet(tab);
 if(['status','journal','relations'].includes(tab)){
  const r=state.mainOpenings?.routes?.[c.region];
  const card=`<div class="box"><h3>이번 삶의 시작</h3><p>${CAMPAIGN_STARTS[c.region].name} / 출생: ${REGION_NAMES_10[state.birthRegion]}</p><p>${MAIN_OPENINGS[c.region].title} — ${r?.status||'참여 전'}</p><p>${escapeHtml(r?.stance||'입장 미정')}</p><p>${MAIN_OPENINGS[c.region].lead}: ${escapeHtml(r?.leadStatus||'아직 접촉하지 않음')}</p></div>`;
  const el=document.getElementById('sheetContent');
  if(tab==='journal')el.innerHTML=card+`<div class="box"><h3>확인한 사실</h3>${state.knowledge.facts.map(escapeHtml).join('<br>')||'아직 없음'}<h3>의심과 가설</h3>${state.knowledge.suspicions.map(escapeHtml).join('<br>')||'아직 없음'}<h3>삶의 기록</h3>${(state.personalHistory||[]).map(h=>`${h.day}일차 ${h.hour}시 · ${escapeHtml(h.text)}`).join('<br>')}</div>`;
  else el.insertAdjacentHTML('beforeend',card);
 }
};
