/* Classic script: shared global bindings. Load order is defined in index.html. */

// Original index.html:403
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeSheet()});

// Original index.html:414
registerBaseScenes();

// Original index.html:2583
const baseNameLine=nameLine;

// Original index.html:2584
nameLine=function(text){let out=String(text);out=out.replaceAll('{name:은}',escapeHtml(nameJosa('은/는'))).replaceAll('{name:이}',escapeHtml(nameJosa('이/가'))).replaceAll('{name:을}',escapeHtml(nameJosa('을/를'))).replaceAll('{name:와}',escapeHtml(nameJosa('과/와'))).replaceAll('{name:라고}',escapeHtml(quotedName()));return baseNameLine(out)};

// Original index.html:2586
const oldRememberNPC=rememberNPC;

// Original index.html:2587
rememberNPC=function(id,text,source='직접 경험',certainty=100,tone='중립'){if(!text)return;state.npcMemory=state.npcMemory||{};state.npcMemory[id]=state.npcMemory[id]||[];const prev=state.npcMemory[id].find(x=>x.text===text);if(prev){prev.certainty=Math.max(prev.certainty||0,certainty);prev.tone=tone||prev.tone;return}state.npcMemory[id].unshift({day:state.day,text,source,certainty,tone});state.npcMemory[id]=state.npcMemory[id].slice(0,28)};

// Original index.html:2590
extendNpcValues();

// Original index.html:2610
freshState=function(){const o=origins[Math.floor(Math.random()*origins.length)];const g=Math.random()<.5?'여성':'남성';return createStateFromOrigin(o.key,g,{scene:'life_setup',creationComplete:false})};

// Original index.html:2618
registerCreationScenes();

// Original index.html:2649
const oldConfirmName=confirmPlayerName;

// Original index.html:2650
confirmPlayerName=function(){const el=document.getElementById('playerNameInput');const raw=(el?.value||'').trim().replace(/\s+/g,' ');if(!raw){system('이름을 입력해주십시오.','bad');return false}if(raw.length>18){system('이름은 18자 이내로 정해주십시오.','bad');return false}state.name=raw;state.creationComplete=true;addLog(`${quotedName()} 불릴 삶을 시작한다.`);return true};

// Original index.html:2653
patchNameEntryScene();

// Original index.html:2664
visibleDelta=function(before){const out=[];const dr=k=>state.res[k]-(before.res[k]||0);if(state.silver!==before.silver)out.push(state.silver<before.silver?'주머니가 전보다 가벼워집니다.':'손에 쥔 은화가 조금 늘어납니다.');if(state.food!==before.food)out.push(state.food<before.food?'챙겨 둔 먹을거리도 그만큼 줄어듭니다.':'당분간 버틸 먹을거리가 조금 늘어납니다.');if(dr('hp')<0)out.push('행동의 대가는 몸에 남습니다. 움직일 때마다 상처가 존재감을 드러냅니다.');else if(dr('hp')>0)out.push('통증이 조금 가라앉고 몸이 전보다 가벼워집니다.');if(dr('stamina')<=-8)out.push('숨이 거칠어지고 팔다리가 묵직해집니다.');else if(dr('stamina')>=8)out.push('잠깐 숨을 돌린 덕분에 몸에 힘이 돌아옵니다.');if(dr('spirit')<=-6)out.push('겉으로는 버텨도 마음 한구석에 피로가 눌러앉습니다.');else if(dr('spirit')>=4)out.push('머릿속을 짓누르던 긴장이 조금 풀립니다.');const changed=[];for(const[id,v]of Object.entries(state.relations)){const d=v-(before.relations[id]||0);if(Math.abs(d)>=4&&NPC[id])changed.push({id,d})}if(changed.length){const x=changed.sort((a,b)=>Math.abs(b.d)-Math.abs(a.d))[0];out.push(x.d>0?(REL_ECHO_POS[x.id]||`${NPC[x.id].name}의 반응이 전보다 조금 부드러워집니다.`):(REL_ECHO_NEG[x.id]||`${NPC[x.id].name}은 방금 일을 달갑게 받아들이지 않은 듯합니다.`))}const bm=before.day*1440+before.hour*60+before.minute,am=state.day*1440+state.hour*60+state.minute;if(am-bm>=60)out.push('그 사이 해의 높이와 거리의 소리가 조금 달라져 있습니다.');else if(am-bm>=30)out.push('그 일을 마치고 나니 생각보다 시간이 흘러 있습니다.');return out.join(' ')};

// Original index.html:2667
choiceDecisionSentence=function(label){const t=cleanChoiceLabel(label);const map=[[/하지 않고 (.*)$/,'하지 않고 $1'],[/지 않는다$/,'지 않습니다'],[/하지 않는다$/,'하지 않습니다'],[/간다$/,'갑니다'],[/온다$/,'옵니다'],[/한다$/,'합니다'],[/돕는다$/,'돕습니다'],[/묻는다$/,'묻습니다'],[/듣는다$/,'듣습니다'],[/읽는다$/,'읽습니다'],[/본다$/,'봅니다'],[/살핀다$/,'살핍니다'],[/찾는다$/,'찾습니다'],[/받는다$/,'받습니다'],[/준다$/,'줍니다'],[/연다$/,'엽니다'],[/닫는다$/,'닫습니다'],[/나선다$/,'나섭니다'],[/물러난다$/,'물러납니다'],[/따른다$/,'따릅니다'],[/기다린다$/,'기다립니다'],[/숨긴다$/,'숨깁니다'],[/말한다$/,'말합니다'],[/알린다$/,'알립니다'],[/붙잡는다$/,'붙잡습니다'],[/꺼낸다$/,'꺼냅니다'],[/돌려준다$/,'돌려줍니다'],[/지나간다$/,'지나갑니다'],[/들어간다$/,'들어갑니다'],[/확인한다$/,'확인합니다'],[/조사한다$/,'조사합니다'],[/공격한다$/,'공격합니다'],[/거절한다$/,'거절합니다'],[/맡긴다$/,'맡깁니다'],[/밀어붙인다$/,'밀어붙입니다'],[/나눈다$/,'나눕니다'],[/올린다$/,'올립니다'],[/고른다$/,'고릅니다'],[/버린다$/,'버립니다'],[/남는다$/,'남습니다'],[/떠난다$/,'떠납니다']];for(const [re,r] of map){if(re.test(t))return `당신은 ${t.replace(re,r)}.`}return `당신은 ${t}${/[.!?]$/.test(t)?'':'.'}`};

// Original index.html:2670
const basePublicDeed=publicDeed;

// Original index.html:2671
publicDeed=function(changes,reason,witness='사람들 앞에서',opts={}){basePublicDeed(changes,reason,witness);state.deedLedger=state.deedLedger||[];state.deedLedger.unshift({day:state.day,hour:state.hour,reason,witness,truth:opts.truth||reason,public:opts.public!==false});state.deedLedger=state.deedLedger.slice(0,80);const r=state.rumors?.[0];if(r){r.credibility=opts.credibility??75;r.spread=opts.spread??8;r.distortion=0;r.originalReason=reason}};

// Original index.html:2675
const baseAdvance=advance;

// Original index.html:2676
advance=function(hours=0,minutes=0){const d0=state.day;baseAdvance(hours,minutes);const dd=state.day-d0;if(dd>0){advanceRumors(dd);state.world.roadSafety=clamp(state.world.roadSafety-rollInt(0,2)*dd,0,100);state.world.humanElfTension=clamp(state.world.humanElfTension+(state.city.panic>20?1:0)*dd,0,100)}};

// Original index.html:2683
const baseMigrate=migrateState;

// Original index.html:2684
migrateState=function(){baseMigrate();if(!state.world)state.world={weather:'흐림',humanElfTension:22,roadSafety:61,rumorHeat:8};if(!state.deedLedger)state.deedLedger=[];if(!state.knowledge)state.knowledge={facts:[],suspicions:[],falseBeliefs:[]};if(state.creationComplete===undefined)state.creationComplete=true};

// Original index.html:2688
extendCityEncounterPool();

// Original index.html:2691
maybeRandomEncounter=function(nextId){if(!nextId||state.ended||pendingCombat||!hasFlag('랜덤인카운터 해금')||state.scene.startsWith('enc_')||String(nextId).startsWith('ending_')||nextId==='death'||['life_setup','choose_species','choose_gender','choose_background','origin_roll','name_entry'].includes(nextId))return false;if(state.random.day!==state.day){state.random.day=state.day;state.random.count=0}if(state.random.count>=3)return false;const target=scenes[nextId];if(!target)return false;let loc=target.location;if(typeof loc!=='string'||loc===state.location)return false;const due=dueConsequence();if(due&&rng()<.78){state.random.returnTo=nextId;due.resolved=true;state.random.data.activeConsequence=due;state.random.count++;go(due.scene);return true}let chance=.24;if(state.turn<4)chance=.10;if(state.city.panic>20)chance+=.07;if(state.world.rumorHeat>25)chance+=.04;if(state.hour>=20||state.hour<=5)chance+=.03;if(rng()>chance)return false;const valid=ENCOUNTER_POOL.filter(encounterEligible);if(!valid.length)return false;const id=weightedPick(valid);state.random.returnTo=nextId;state.random.seen.push(id);state.random.count++;go(id);return true};

// Original index.html:2693
registerCityEncounters();

// Original index.html:2753
extendItemNames();

// Original index.html:2756
const baseRenderSheet=renderSheet;

// Original index.html:2757
renderSheet=function(tab){if(['life_setup','choose_species','choose_gender','choose_background'].includes(state.scene)){currentSheet=tab;document.querySelectorAll('.tabs button').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));document.getElementById('sheetTitle').textContent='아직 시작되지 않은 삶';document.getElementById('sheetContent').innerHTML='<div class="notice">종족과 성별, 배경을 정한 뒤 상태와 능력이 확정됩니다. 지금 보이는 수치는 아직 이번 삶의 것이 아닙니다.</div>';return}baseRenderSheet(tab);if(tab==='relations'){const c=document.getElementById('sheetContent');const extra=Object.entries(NPC).filter(([id])=>hasFlag('met_'+id)&&state.npcMemory?.[id]?.length).map(([id,n])=>`<div class="box"><h3>${n.name}이 기억하는 것</h3>${state.npcMemory[id].slice(0,5).map(m=>`<div class="item">${m.text}<div class="memorySource">${m.source||'기억'} / 확신 ${m.certainty??100}%</div></div>`).join('')}</div>`).join('');if(extra)c.innerHTML+=`<div class="divider"></div><div class="grid2">${extra}</div>`}if(tab==='journal'){const c=document.getElementById('sheetContent');const k=state.knowledge||{facts:[],suspicions:[],falseBeliefs:[]};c.innerHTML+=`<div class="divider"></div><div class="grid2"><div class="box"><h3>확인한 사실</h3>${k.facts.length?k.facts.slice(-15).reverse().map(x=>`<div class="item">${x}</div>`).join(''):'<span class="dim">아직 없음</span>'}</div><div class="box"><h3>아직 추측인 것</h3>${k.suspicions.length?k.suspicions.slice(-15).reverse().map(x=>`<div class="item">${x}</div>`).join(''):'<span class="dim">아직 없음</span>'}${k.falseBeliefs.length?`<h3 style="margin-top:16px">당신이 사실이라고 믿는 것</h3>${k.falseBeliefs.slice(-10).reverse().map(x=>`<div class="item">${x}</div>`).join('')}`:''}</div></div>`}if(tab==='status'){const c=document.getElementById('sheetContent');c.innerHTML+=`<div class="box" style="margin-top:12px"><h3>도시의 맥박</h3><div class="worldPulse"><div class="pulse">감염 징후<b>${Math.round(state.city.infection)}</b></div><div class="pulse">불안<b>${Math.round(state.city.panic)}</b></div><div class="pulse">식량 사정<b>${Math.round(state.city.food)}</b></div><div class="pulse">치안<b>${Math.round(state.city.guard)}</b></div></div><p class="dim" style="font-size:11px;line-height:1.6;margin-top:10px">이 수치는 주인공이 세상을 완벽히 아는 값이라기보다, 현재 장에서 도시가 실제로 움직이는 내부 상태를 보여주는 프로토타입용 정보입니다.</p></div>`}};

// Original index.html:2760
patchDialogueAndDeathScenes();

// Original index.html:2786
restartConfirm=function(){if(confirm('현재 진행을 버리고 새로운 삶을 시작하시겠습니까?')){state=freshState();creationDraft={species:null,gender:null};pendingCombat=null;render()}};

// Original index.html:2791
patchGuardRumorScene();

// Original index.html:2794
hearPublicRumors=function(id){if(!state?.rumors?.length)return;state.npcRumorSeen=state.npcRumorSeen||{};state.npcRumorSeen[id]=state.npcRumorSeen[id]||[];const candidates=state.rumors.slice(0,20).filter(r=>!state.npcRumorSeen[id].includes(r.id||`${r.day}:${r.reason}`)).map(r=>({r,score:rumorRelevance(id,r),chance:clamp((r.spread||8)+(r.credibility||70)*.25+Math.abs(rumorRelevance(id,r))*15,5,92)})).filter(x=>Math.abs(x.score)>=.3&&rng()*100<x.chance).sort((a,b)=>Math.abs(b.score)-Math.abs(a.score));if(!candidates.length)return;const {r,score}=candidates[0];const rid=r.id||`${r.day}:${r.reason}`;rememberNPC(id,`소문으로 들었다: ${r.reason}`,r.distortion?'전해 들은 왜곡된 소문':'전해 들은 소문',r.credibility||65,score>0?'호의':'경계');if(score>=1.2)modImpression(id,{respect:1});else if(score<=-1.2)modImpression(id,{trust:-1});state.npcRumorSeen[id].push(rid);state.npcRumorSeen[id]=state.npcRumorSeen[id].slice(-40)};

// Original index.html:2796
registerCityActivities();

// Original index.html:2926
extendLifeOrigins();

// Original index.html:2937
const baseOriginRep08=originReputation;

// Original index.html:2938
originReputation=function(o){const r=baseOriginRep08(o),add=(c,k,v)=>r[c][k]=clamp((r[c][k]||0)+v,-100,100);switch(o.key){case'human_healer':add('factions','healers',10);add('factions','merchants',3);add('places','borderCity',3);break;case'human_hunter':add('places','northQuarter',5);add('factions','farmers',3);add('factions','guard',3);break;case'elf_church':add('factions','church',10);add('peoples','elf',2);add('peoples','human',2);add('realms','westernHumans',3);break;case'elf_crafter':add('factions','craftsmen',9);add('peoples','elf',5);add('factions','merchants',4);break;case'orc_farmer':add('peoples','greenOrc',8);add('factions','farmers',9);add('places','southFarms',8);break;case'orc_caravan':add('peoples','greenOrc',7);add('factions','merchants',6);add('realms','caravanNetwork',8);break;case'goblin_church':add('peoples','goblin',6);add('factions','church',8);add('factions','healers',4);break;case'dwarf_road':add('peoples','dwarf',8);add('factions','craftsmen',8);add('realms','caravanNetwork',3);add('places','borderCity',3);break}return r};

// Original index.html:2940
registerLifePrologues();

// Original index.html:3093
dlg=function(id,line,place=state.location,language=null){const n=NPC[id];let raw=nameLine(typeof line==='function'?line(state):line);raw=naturalNpcSpeech(id,raw);raw=addressPlayerInSpeech(id,raw);const speechLang=language||(id==='laen'&&isSpecies('엘프')?'elven':'common');const shown=heardSpeech(raw,speechLang);return `<div class="dialogue"><div class="speaker">${n.name}<small>${n.role} / ${place} / ${relLabel(effectiveRel(id))}</small></div><div class="line">“${shown}”</div></div>`};

// Original index.html:3103
initializeNpcBaseRoles();

// Original index.html:3117
const render08life=render;

// Original index.html:3118
render=function(){ensureLifeSystems();refreshNpcRoles();return render08life()};

// Original index.html:3121
registerDailyLifeScenes();

// Original index.html:3182
extendLaenDialogue();

// Original index.html:3196
const publicDeed08=publicDeed;

// Original index.html:3197
publicDeed=function(changes,reason,witness='사람들 앞에서',tags=[]){publicDeed08(changes,reason,witness);if(tags?.length)rememberByValues(tags,reason,'전해 들은 소문')};

// Original index.html:3241
const renderSheet08life=renderSheet;

// Original index.html:3242
renderSheet=function(tab){ensureLifeSystems();refreshNpcRoles();renderSheet08life(tab);const c=document.getElementById('sheetContent');if(!c)return;
 if(tab==='skills'){
   const rs=Object.entries(state.resistances||{}).filter(([,v])=>v>0).sort((a,b)=>b[1]-a[1]);
   c.innerHTML+=`<div class="box" style="margin-top:12px"><h3>획득한 내성</h3>${rs.length?rs.map(([k,v])=>`<div class="skillRow"><span>${RESIST_NAMES[k]||k}</span><b>${v}%</b></div>`).join(''):'<span class="dim">아직 특별한 내성이 없습니다. 내성은 출생 시 자동으로 붙기보다 독, 질병, 공포, 공명 침식 같은 실제 경험을 버티면서 생길 수 있습니다.</span>'}</div>`;
 }
 if(tab==='status'&&state.traits?.length){c.innerHTML+=`<div class="box" style="margin-top:12px"><h3>특징과 표식</h3>${state.traits.map(t=>`<span class="tag">${escapeHtml(t)}</span>`).join('')}</div>`}
 if(tab==='journal'&&state.personalHistory?.length){c.innerHTML+=`<div class="box" style="margin-top:12px"><h3>삶의 연표</h3>${state.personalHistory.slice(0,12).map(h=>`<div class="item"><b>${h.day}일차</b> ${escapeHtml(h.text)}</div>`).join('')}</div>`}
};

// Original index.html:3252
patchLifeConsequences();

// Original index.html:3273
publicDeed=function(changes,reason,witness='사람들 앞에서',opts={}){
 const realOpts=Array.isArray(opts)?{}:(opts||{});publicDeed08(changes,reason,witness,realOpts);
 const tags=Array.isArray(opts)?opts:(realOpts.tags||inferActionTags(reason));
 if(tags.length)rememberByValues(tags,reason,'전해 들은 소문');
};

// Original index.html:3280
const computeEnding08=computeEnding;

// Original index.html:3281
computeEnding=function(){
 let e=computeEnding08();
 if(!/CHAPTER ENDING 01/.test(e.html))return e;
 const o=state.originKey;
 const specific={
  human_farmer:['38','밭으로 돌아가는 발','도시에서 보낸 일주일은 밭의 일을 사소하게 만들지 않았다. 오히려 누가 성문을 지키든 결국 먹을 것을 길러야 한다는 사실이 더 선명해졌다. 당신은 남쪽 흙으로 돌아갈 수도, 그 흙을 지키기 위해 도시의 일에 더 깊이 발을 들일 수도 있다.'],
  human_merchant:['39','장부 밖의 값','은화로 셀 수 없는 것이 장터를 움직였다. 공포 때문에 오르는 값, 믿음 때문에 열리는 창고, 소문 하나로 닫히는 길을 직접 봤다. 당신은 이제 물건뿐 아니라 사람 사이의 신용과 위험에도 값을 매기기 시작한다.'],
  human_church:['40','촛불 뒤의 문장','제단 뒤에서 외웠던 문장과 이번 주에 눈앞에서 본 일이 완전히 포개지지는 않았다. 그렇다고 신앙이 사라진 것도 아니다. 당신에게 남은 것은 의심을 숨기는 일이 아니라, 믿으면서도 묻는 법을 배워야 한다는 과제다.'],
  human_soldier:['41','칼을 뽑기 전의 소리','당신은 어릴 때부터 싸움이 시작되기 직전의 기척을 배웠다. 이번 주에는 그 기척이 사람의 손뿐 아니라 도시 전체에서 올라오는 순간을 보았다. 앞으로 칼을 드는 사람이 될지, 칼을 들기 전에 멈추게 하는 사람이 될지는 아직 정해지지 않았다.'],
  human_noble:['21','이름 앞에 붙은 것','이번 일주일 동안 당신은 가문 이름이 문을 여는 순간과 오히려 사람의 입을 닫게 만드는 순간을 모두 보았다. 앞으로 가문을 이용할지, 벗어날지, 더 큰 권력으로 키울지는 아직 정해지지 않았다.'],
  human_street:['22','골목은 기억한다','정식 기록보다 먼저 골목의 눈과 귀가 움직였다. 아무도 중요하게 여기지 않는 사람들에게 당신 이름이 남기 시작했다. 도시는 성벽보다 소문으로 먼저 연결될 때가 있다.'],
  elf_adopted:['23','두 집의 말','인간 사회에서 자란 엘프라는 삶은 어느 한쪽의 번역본이 아니었다. 이번 사건에서 당신은 두 문화의 틈이 약점이 아니라 남들이 보지 못하는 자리가 될 수 있음을 알았다.'],
  elf_north:['24','성벽 안의 낯선 고향','인간 도시는 끝내 완전히 익숙해지지 않았지만, 이제 이곳의 몇몇 사람은 당신 이름을 안다. 북방으로 돌아갈 때 가져갈 것은 물건만이 아니라 인간들이 기억한 사건과 당신이 직접 본 모순이다.'],
  orc_dock:['25','품삯 너머의 이름','사람들은 처음에는 당신 팔과 등을 보고 일을 맡겼다. 일주일이 지나자 몇몇은 당신이 무엇을 판단했고 누구 편에 섰는지를 기억한다. 힘보다 이름이 먼저 불리는 삶의 첫 장이 열렸다.'],
  orc_merc:['26','싸우지 않은 칼','당신이 배운 전투 기술은 누군가를 베는 데만 쓰이지 않았다. 싸움이 시작되는 순간을 읽고, 때로는 칼을 뽑지 않는 일이 더 어려운 선택이라는 걸 확인했다.'],
  goblin_tinker:['27','작은 손이 본 틈','남들이 지나친 자물쇠와 금, 장부의 틀어진 숫자와 사람 사이의 빈틈이 당신에게는 길이 되었다. 큰 영웅담이 아니어도 도시는 이런 눈을 필요로 한다.'],
  goblin_caravan:['28','여러 말 사이의 길','어느 한 언어도 세계 전부를 설명하지 못했다. 당신은 서로 다른 사람들이 같은 물건과 사건을 다르게 부르는 틈을 지나며, 길 위에서만 얻을 수 있는 자리를 만들었다.'],
  dwarf_smith:['29','두드리면 다른 소리','돌과 금속은 사람보다 오래 기억한다. 이번 사건에서 당신이 들은 것은 도시가 세워지기 전부터 남은 구조의 소리였다. 언젠가 그 아래의 설계를 끝까지 읽게 될지 모른다.'],
  human_healer:['30','열을 재는 손','세계를 구하는 이야기가 시작되기 전에 당신은 한 아이의 열을 먼저 보았다. 거대한 재앙도 결국 한 사람의 맥박에서 시작된다는 사실을 잊지 않는 길이 생겼다.'],
  human_hunter:['31','짐승이 먼저 떠난 숲','사람들이 소문을 만들기 전에 숲이 먼저 조용해졌다. 당신은 재앙의 징조가 언제나 인간의 언어로 오지 않는다는 것을 보았다.'],
  elf_church:['32','두 문자로 적힌 여백','교단의 경전과 엘프의 오래된 글자가 같은 종이 위에 있었다. 어느 쪽도 완전한 거짓은 아니었고 어느 쪽도 전부가 아니었다. 당신은 두 기록 사이의 여백을 읽는 사람이 되기 시작했다.'],
  elf_crafter:['33','은실 아래의 옛길','당신은 장신구 하나의 뒷면에서 도시보다 오래된 길의 흔적을 보았다. 물건은 소유자를 바꾸어도 만든 손과 지나온 길을 완전히 잊지는 않는다.'],
  orc_farmer:['34','새 땅에 박힌 말뚝','당신에게 세계의 균열은 먼저 밭고랑의 금으로 나타났다. 누가 왕이 되든 땅은 먹을 것을 내야 한다. 그 사실을 아는 사람이 거대한 사건에 끼어들기 시작했다.'],
  orc_caravan:['35','통역값과 칼값','길 위에서는 말이 통하는 사람이 칼 잘 쓰는 사람만큼 귀하다. 당신은 이번 사건에서 둘 다 필요했고, 어느 쪽을 먼저 쓸지는 사람마다 달라진다는 걸 보았다.'],
  goblin_church:['36','명부에 남은 이름','재앙은 영웅의 보고서보다 먼저 배급 명부와 환자 이름에 나타났다. 당신은 숫자 뒤의 사람이 사라지지 않도록 적는 일을 계속했다.'],
  dwarf_road:['37','도시 아래의 설계','사람들은 길 위로 걸었지만 당신은 길이 무엇 위에 놓였는지를 보았다. 이번 주 이후 도시의 지도에는 보이지 않는 아래쪽이 하나 더 생겼다.']
 }[o];
 if(specific){const [n,t,b]=specific;e={html:`<div class="endingCard"><div class="endingNum">CHAPTER ENDING ${n}</div><h3>${t}</h3>${b}</div>`}}
 return e;
};

// Original index.html:3312
registerChapterAftermath();

// Original index.html:3360
extendEasternData();

// Original index.html:3377
const originReputation10=originReputation;

// Original index.html:3378
originReputation=function(o){const r=originReputation10(o),add=(c,k,v)=>{r[c]??={};r[c][k]=clamp((r[c][k]||0)+v,-100,100)};switch(o.key){
 case'human_east_scribe':add('realms','easternEmpire',10);add('realms','easternKingdoms',3);add('factions','scholars',8);add('realms','westernHumans',-1);break;
 case'human_east_jiangshi':add('realms','easternKingdoms',5);add('factions','scholars',4);add('factions','church',-4);break;
 case'human_east_martial':add('realms','martialAlliance',11);add('realms','easternKingdoms',6);add('factions','guard',3);break;
 case'human_grayriver':add('realms','grayRiver',12);add('realms','easternKingdoms',3);add('factions','guard',3);break;
 }return r};

// Original index.html:3399
const recalc09=recalc;

// Original index.html:3400
recalc=function(init=false){
 recalc09(init);ensureLife10();
 const s=state.stats, exhausted=pct('stamina')<20?-8:pct('stamina')<40?-3:0, wounded=pct('hp')<25?-7:pct('hp')<50?-3:0;
 const burden=state.statusEffects?.includes('중량초과')?-8:0;
 state.derived.speed=clamp(Math.round(18+s.dex*.68+s.vit*.05+skill('athletics')*1.7+exhausted+burden),1,99);
 state.derived.accuracy=clamp(Math.round(22+s.dex*.55+s.wis*.16+skill(hasItem('sword')?'sword':'unarmed')*.9+wounded),1,99);
 state.derived.evasion=clamp(Math.round(12+s.dex*.57+s.wis*.10+skill('athletics')*1.35+exhausted+burden),1,99);
};

// Original index.html:3411
const oldSelectSpecies10=typeof selectSpecies==='function'?selectSpecies:null;

// Original index.html:3412
selectSpecies=function(species){creationDraft.species=species;creationDraft.region=null;creationRegion10=null;state.scene='choose_region';render();return false};

// Original index.html:3413
registerBirthRegionScenes();

// Original index.html:3417
const selectGender10=selectGender;

// Original index.html:3418
selectGender=function(gender){creationDraft.gender=gender;state.scene='choose_background';render();return false};

// Original index.html:3419
patchRegionBackgroundScenes();

// Original index.html:3426
const createStateFromOrigin10=createStateFromOrigin;

// Original index.html:3427
createStateFromOrigin=function(originKey,gender,opts={}){const st=createStateFromOrigin10(originKey,gender,opts);st.birthRegion=originRegion(origins.find(o=>o.key===originKey)||{key:originKey});st.chaosResonance=Math.max(0,Math.min(12,rollInt(0,6)+((st.resonance?.dark||0)>5?1:0)));st.dailySummary={};st.worldKnowledge=[];st.statusEffects=[];st.historyLog=[];return st};

// Original index.html:3433
const addLog10=addLog;

// Original index.html:3434
addLog=function(text){addLog10(text);if(state&&text&&!/저장된 진행/.test(text))recordEvent10(text,'기록')};

// Original index.html:3455
registerEasternScenes();

// Original index.html:3529
extendEasternEncounterPool();

// Original index.html:3535
patchChaosScenes();

// Original index.html:3541
const renderSheet09=renderSheet;

// Original index.html:3542
renderSheet=function(tab){ensureLife10();renderSheet09(tab);const c=document.getElementById('sheetContent');if(!c)return;
 if(tab==='status'){
   c.innerHTML=c.innerHTML.replace(`<span>행동속도</span><b>${state.derived.speed}</b><span>명중</span><b>${state.derived.accuracy}</b><span>회피</span><b>${state.derived.evasion}</b>`,`<span>행동속도</span><b class="derivedPct">${state.derived.speed}%</b><span>명중</span><b class="derivedPct">${state.derived.accuracy}%</b><span>회피</span><b class="derivedPct">${state.derived.evasion}%</b>`);
   c.innerHTML+=`<div class="box" style="margin-top:12px"><h3>출생과 사회적 자리</h3><div class="meta"><span>출생권역</span><b>${REGION_NAMES_10[state.birthRegion]||state.birthRegion}</b><span>현지 허용도</span><b>${regionAccept(state.species,state.birthRegion)}</b><span>현재 상태</span><b>${conditionWord()}</b></div></div>`;
 }
 if(tab==='resonance'&&state.chaosResonance>=18){c.innerHTML+=`<div class="box" style="margin-top:12px"><h3>설명되지 않는 잔향</h3><p class="dim" style="line-height:1.75">${chaosWhisper()}<br>수치는 표시되지 않습니다. 이것이 열 번째 신의 공명인지, 공명의 붕괴인지, 전혀 다른 현상인지는 아직 확인되지 않았습니다.</p></div>`}
 if(tab==='journal'){
   c.innerHTML=`<div class="box"><h3>세 겹의 기록</h3><div class="recordStrip"><div class="charLine"><b>${playerName()}</b> / ${state.species} / ${state.origin} / ${conditionWord()}</div><div class="worldLine">인간력 30년 / ${state.day}일차 ${String(state.hour).padStart(2,'0')}:${String(state.minute).padStart(2,'0')} / ${state.location}</div></div><p class="dim" style="font-size:11px;line-height:1.6">첫째는 지금의 당신, 둘째는 하루 단위 기억, 셋째는 실제로 지나온 사건의 시간순 기록입니다. 사실, 의심, 오해는 가능한 한 분리해 남깁니다.</p></div><div class="grid2"><div class="box"><h3>현재 목표</h3>${Object.values(state.quests||{}).map(q=>`<div class="quest"><b>${q.title}</b><div class="dim">${q.desc}</div><div style="font-size:11px;margin-top:5px">${q.status}</div></div>`).join('')||'<span class="dim">없음</span>'}<h3 style="margin-top:16px">확인한 사실</h3>${(state.knowledge?.facts||[]).slice(-12).reverse().map(x=>`<div class="item">${x}</div>`).join('')||'<span class="dim">아직 없음</span>'}<h3 style="margin-top:16px">의심과 가설</h3>${(state.knowledge?.suspicions||[]).slice(-10).reverse().map(x=>`<div class="item">${x}</div>`).join('')||'<span class="dim">아직 없음</span>'}</div><div class="box"><h3>이 삶이 알고 있는 세계</h3>${worldCodex10()||'<span class="dim">세계에 관한 지식이 아직 파편적입니다.</span>'}</div></div><div class="box" style="margin-top:12px"><h3>여정 로그</h3>${daySummaries10()}</div>`;
 }
};

// Original index.html:3554
const render09=render;

// Original index.html:3555
render=function(){ensureLife10();render09();updateRecordStrip10()};

// Original index.html:3558
const migrateState09=migrateState;

// Original index.html:3559
migrateState=function(){migrateState09();ensureLife10();for(const cat of Object.keys(REP_NAMES)){state.reputation[cat]??={};state.reputationAwareness[cat]??={};for(const k of Object.keys(REP_NAMES[cat])){if(state.reputation[cat][k]===undefined)state.reputation[cat][k]=0;if(state.reputationAwareness[cat][k]===undefined)state.reputationAwareness[cat][k]=0}}state.version='1.1.0'};

// Original index.html:3562
const freshState09=freshState;

// Original index.html:3563
freshState=function(){const st=freshState09();ensureLife10();return st};

// Original index.html:3568
(function(){
  function keepActiveVisible(){
    var el=document.activeElement;
    if(el && el.tagName==='INPUT'){setTimeout(function(){try{el.scrollIntoView({block:'center',behavior:'smooth'})}catch(e){}},250)}
  }
  document.addEventListener('focusin',keepActiveVisible);
  document.addEventListener('touchend',function(e){
    var b=e.target.closest&&e.target.closest('button');
    if(b && !b.disabled){b.style.transform='none'}
  },{passive:true});
  document.addEventListener('gesturestart',function(e){e.preventDefault&&e.preventDefault()},{passive:false});
})();

// Original index.html:3620
registerDepartureScenes();

// Original index.html:3641
const go11base=go;

// Original index.html:3641
go=function(id){syncMainThreads11();return go11base(id)};

// Original index.html:3649
weightedPick=function(ids){let total=ids.reduce((a,id)=>a+encounterWeight11(id),0),r=rng()*total;for(const id of ids){r-=encounterWeight11(id);if(r<=0)return id}return ids[ids.length-1]};

// Original index.html:3651
extendMajorEncounterPool();

// Original index.html:3653
registerMajorEncounters();

// Original index.html:3662
const render11base=render;

// Original index.html:3663
render=function(){ensureV11();render11base();renderV11Hud();const sc=state&&scenes[state.scene];if(state?.scene?.startsWith('enc_')&&sc){const text=document.getElementById('sceneText');if(text&&!text.querySelector('.encBadge'))text.insertAdjacentHTML('afterbegin',encounterBadge11(state.scene)+'<br>')}};

// Original index.html:3666
const renderSheet11base=renderSheet;

// Original index.html:3667
renderSheet=function(tab){ensureV11();renderSheet11base(tab);const c=document.getElementById('sheetContent');if(!c)return;if(tab==='journal'){const th=activeThreads11();c.insertAdjacentHTML('afterbegin',`<div class="box" style="margin-bottom:12px"><h3>현재 메인 실마리</h3>${th.length?th.map(([k,v])=>`<div class="skillRow"><span>${threadLabel11(k)}</span><b>${v}</b></div>`).join(''):'<span class="dim">아직 어느 사건도 중심이 되지 않았습니다.</span>'}<p class="dim" style="font-size:11px;line-height:1.6">수치는 진행률이라기보다 이 삶이 해당 문제와 얼마나 깊게 얽혔는지를 나타냅니다. 라엔을 만나지 않아도 옛길과 지하의 문제는 진행될 수 있습니다.</p></div>`)}if(tab==='status'){c.insertAdjacentHTML('beforeend',`<div class="box" style="margin-top:12px"><h3>이번 삶의 출발</h3><div class="meta"><span>떠난 이유</span><b>${state.departure.reason||'아직 정해지지 않음'}</b><span>첫 경로</span><b>${state.departure.route||'아직 이동 전'}</b><span>변경도시 도착</span><b>${state.departure.arrived?'도착함':'아직'}</b></div></div>`)}};

// Original index.html:3670
const migrateV11base=migrateState;

// Original index.html:3671
migrateState=function(){migrateV11base();ensureV11();state.version='1.1.0'};

// Original index.html:3672
const freshV11base=freshState;

// Original index.html:3673
freshState=function(){const st=freshV11base();ensureV11();return st};
