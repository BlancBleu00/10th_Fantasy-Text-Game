/* Classic script: shared global bindings. Load order is defined in index.html. */

// Original index.html:246
function clamp(v,a,b){return Math.max(a,Math.min(b,v))}

// Original index.html:247
function rng(){state.seed=(state.seed*1664525+1013904223)>>>0;return state.seed/4294967296}

// Original index.html:248
function rollInt(a,b){return Math.floor(rng()*(b-a+1))+a}

// Original index.html:249
function originDisplay(o,gender){return gender==='여성'?(o.nameF||o.name):gender==='남성'?(o.nameM||o.name):o.name}

// Original index.html:250
function freshState(){
 const seed=(Date.now()>>>0)^(Math.floor(Math.random()*0xffffffff)>>>0);
 const o=origins[Math.floor(Math.random()*origins.length)];
 const gender=Math.random()<.5?'여성':'남성';
 const skills={};Object.keys(SKILL_NAMES).forEach(k=>skills[k]={lv:0,xp:0});Object.entries(o.skills).forEach(([k,v])=>skills[k]={lv:v,xp:0});
 const rel={};Object.keys(NPC).forEach(k=>rel[k]=NPC[k].baseRel);Object.entries(o.baseRel||{}).forEach(([k,v])=>rel[k]=(rel[k]||0)+v);
 const resonance={light:0,dark:0,fire:0,water:0,earth:0,life:0,death:0,lightning:0,wind:0,...o.res};
 const sec={perception:clamp(Math.round(o.stats.wis*.42+o.stats.dex*.20+o.stats.int*.10+(o.secondary?.perception||0)+Math.floor(Math.random()*17)-8),1,100),socialSense:clamp(Math.round(o.stats.wis*.35+o.stats.int*.15+(o.secondary?.socialSense||0)+Math.floor(Math.random()*17)-8),1,100)};
 state={version:VERSION,seed,name:'',age:18+Math.floor(Math.random()*12),originKey:o.key,origin:originDisplay(o,gender),originDesc:o.desc,species:o.species,gender,status:o.status,culture:o.culture,traits:[...(o.traits||[])],languages:{common:0,elven:0,orcish:0,goblin:0,dwarven:0,oldcommon:0,...o.languages},secondary:sec,fate:Math.floor(Math.random()*101),stats:{...o.stats},skills,resonance,resonanceAwareness:0,stability:100,relations:rel,relTags:{},impressions:blankImpressions(),npcMemory:{},reputation:originReputation(o),reputationAwareness:awarenessFromReputation(originReputation(o)),repHistory:[],rumors:[],npcRumorSeen:{},flags:[],items:{...o.items},silver:o.silver,food:2,day:1,hour:8,minute:20,location:'서부대륙 변경도시 외곽',scene:'origin_roll',opening:o.opening,log:[],journal:[],quests:{},faction:null,city:{infection:0,panic:0,guard:70,food:65,church:60},vectors:{farmer:0,merchant:0,church:0,elf:0,guard:0,doctor:0,scholar:0,underworld:0,worldtree:0,hero:0,unifier:0,dragonslayer:0,demigod:0,godslayer:0,creator:0},kills:0,battles:0,turn:0,lastSystem:'',lastSystemType:'',ended:false,pendingReview:null,consequences:[],companions:[],random:{seen:[],day:1,count:0,returnTo:null,data:{}}};
 recalc(true);return state
}

// Original index.html:261
function migrateState(){
 if(!state.name)state.name='여행자';if(!state.species)state.species='인간';if(!state.gender)state.gender='미상';if(!state.status)state.status='평민';if(!state.culture)state.culture='서부 변경';if(!state.traits)state.traits=[];
 if(!state.languages)state.languages={common:10,elven:skill('language')>=2?2:0,orcish:0,goblin:0,dwarven:0,oldcommon:0};
 if(!state.secondary)state.secondary={perception:Math.round(stat('wis')*.45+stat('dex')*.2),socialSense:Math.round(stat('wis')*.35+stat('int')*.15)};
 if(state.age===undefined)state.age=22;if(!state.impressions)state.impressions=blankImpressions();if(!state.npcMemory)state.npcMemory={};
 if(!state.reputation)state.reputation=blankReputation();if(!state.reputationAwareness)state.reputationAwareness=awarenessFromReputation(state.reputation);if(!state.repHistory)state.repHistory=[];if(!state.rumors)state.rumors=[];if(!state.npcRumorSeen)state.npcRumorSeen={};
 if(state.fate===undefined)state.fate=50;if(!state.consequences)state.consequences=[];if(!state.companions)state.companions=[];if(state.pendingReview===undefined)state.pendingReview=null;if(!state.random)state.random={seen:[],day:state.day||1,count:0,returnTo:null,data:{}};if(!state.random.data)state.random.data={};
 Object.keys(SKILL_NAMES).forEach(k=>{if(!state.skills[k])state.skills[k]={lv:0,xp:0}});state.version=VERSION;
}

// Original index.html:270
function recalc(init=false){const s=state.stats;state.max={hp:Math.round(65+s.vit*.72+s.str*.10),mana:Math.round(24+s.int*.30+s.wis*.37+highestRes()*.08),stamina:Math.round(60+s.vit*.40+s.str*.23+s.dex*.24),spirit:Math.round(48+s.wis*.62+s.int*.15)};state.derived={def:Math.round(s.vit*.11+s.str*.05+skill('guard')*1.4),mdef:Math.round(s.wis*.12+s.int*.05+highestRes()*.04),speed:Math.round(s.dex*.78+s.vit*.10+skill('athletics')*1.5),accuracy:Math.round(s.dex*.55+s.wis*.18),evasion:Math.round(s.dex*.43+s.wis*.12+skill('athletics')*1.1)};if(init||!state.res){state.res={hp:state.max.hp,mana:Math.round(state.max.mana*.65),stamina:state.max.stamina,spirit:state.max.spirit}}else{Object.keys(state.res).forEach(k=>state.res[k]=clamp(state.res[k],0,state.max[k]))}}

// Original index.html:271
function highestRes(){return state?Math.max(...Object.values(state.resonance||{x:0})):0}

// Original index.html:272
function skill(k){return state.skills[k]?.lv||0}

// Original index.html:273
function stat(k){return state.stats[k]||0}

// Original index.html:274
function secondary(k){return state.secondary?.[k]||0}

// Original index.html:275
function lang(k){return state.languages?.[k]||0}

// Original index.html:276
function escapeHtml(v){return String(v??'').replace(/[&<>\"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[m]))}

// Original index.html:277
function playerName(){return escapeHtml(state.name||'여행자')}

// Original index.html:278
function playerTitle(){if(state.status==='하급 귀족')return state.gender==='여성'?'영애':'도련님';return state.name||'여행자'}

// Original index.html:279
function nameLine(text){return String(text).replaceAll('{name}',playerName()).replaceAll('{title}',escapeHtml(playerTitle()))}

// Original index.html:280
function suggestName(){const pools={인간:['레온','미라','에른','세라','로웬','다린','엘마','베른'],엘프:['에릴','라시에','세리안','니엘','에델','리엔','아르엔','실바'], '그린 오크':['가르크','브라카','오르그','네라크','두라','카르마','우르칸','메라'],고블린:['피크','리비','모크','제트','니브','쿠리','라그','비츠'],드워프:['도른','브린','카르드','헤라','볼든','마르나','그룸','테른']};const arr=pools[state.species]||pools.인간;const el=document.getElementById('playerNameInput');if(el){el.value=arr[rollInt(0,arr.length-1)];el.focus()}}

// Original index.html:281
function confirmPlayerName(){const el=document.getElementById('playerNameInput');const raw=(el?.value||'').trim().replace(/\s+/g,' ');if(!raw){system('이름을 입력해주십시오.','bad');return false}if(raw.length>18){system('이름은 18자 이내로 정해주십시오.','bad');return false}state.name=raw;addLog(`${state.name}이라는 이름으로 삶을 시작한다.`);return true}

// Original index.html:282
function passive(k,diff=60,bonus=0){return secondary(k)+rollInt(-22,22)+bonus>=diff}

// Original index.html:283
function languageCheck(k,diff=6,bonus=0){const v=lang(k);const total=v+skill('language')*.45+bonus+rollInt(-2,2);return {ok:total>=diff,total,v}}

// Original index.html:284
function isSpecies(x){return state.species===x}

// Original index.html:285
function playerPeopleKey(){return state.species==='인간'?'human':state.species==='엘프'?'elf':state.species==='그린 오크'?'greenOrc':state.species==='고블린'?'goblin':state.species==='드워프'?'dwarf':'human'}

// Original index.html:286
function pct(k){return Math.round(state.res[k]/state.max[k]*100)}

// Original index.html:287
function hasFlag(f){return state.flags.includes(f)}

// Original index.html:288
function flag(f){if(!hasFlag(f))state.flags.push(f)}

// Original index.html:289
function unflag(f){state.flags=state.flags.filter(x=>x!==f)}

// Original index.html:290
function setCompanions(ids=[]){state.companions=[...new Set(ids)]}

// Original index.html:291
function addCompanion(id){state.companions=state.companions||[];if(!state.companions.includes(id))state.companions.push(id)}

// Original index.html:292
function hasCompanion(id){return !!state.companions?.includes(id)}

// Original index.html:293
function modRes(obj){for(const[k,v]of Object.entries(obj)){state.res[k]=clamp((state.res[k]||0)+v,0,state.max[k])}}

// Original index.html:294
function modStat(obj){for(const[k,v]of Object.entries(obj))state.stats[k]=clamp((state.stats[k]||0)+v,1,100);recalc()}

// Original index.html:295
function modRel(id,v,tag){state.relations[id]=clamp((state.relations[id]||0)+v,-100,100);if(tag){state.relTags[id]=state.relTags[id]||[];if(!state.relTags[id].includes(tag))state.relTags[id].push(tag);rememberNPC(id,tag)}if(v>=7)modImpression(id,{trust:2,respect:1});else if(v>=4)modImpression(id,{trust:1});else if(v<=-7)modImpression(id,{trust:-3});else if(v<=-4)modImpression(id,{trust:-1})}

// Original index.html:296
function modResonance(type,v,stability=0){state.resonance[type]=clamp((state.resonance[type]||0)+v,0,100);state.stability=clamp(state.stability+stability,0,100);recalc()}

// Original index.html:297
function vec(k,v=1){state.vectors[k]=(state.vectors[k]||0)+v}

// Original index.html:298
function item(id,n=1){state.items[id]=(state.items[id]||0)+n;if(state.items[id]<=0)delete state.items[id]}

// Original index.html:299
function hasItem(id,n=1){return (state.items[id]||0)>=n}

// Original index.html:300
function addLog(t){state.log.unshift(`D${state.day} ${String(state.hour).padStart(2,'0')}:${String(state.minute).padStart(2,'0')}  ${t}`);state.log=state.log.slice(0,24)}

// Original index.html:301
function note(t){if(!state.journal.includes(t))state.journal.push(t)}

// Original index.html:302
function quest(id,title,desc,status='진행 중'){state.quests[id]={title,desc,status}}

// Original index.html:303
function questDone(id,status='완료'){if(state.quests[id])state.quests[id].status=status}

// Original index.html:304
function advance(hours=0,minutes=0){let total=state.hour*60+state.minute+hours*60+minutes;while(total>=1440){total-=1440;state.day++}state.hour=Math.floor(total/60);state.minute=total%60;state.city.infection=clamp(state.city.infection+Math.max(0,hours)*.18,0,100)}

// Original index.html:305
function gainSkill(k,xp=1){const sk=state.skills[k];sk.xp+=xp;let need=(sk.lv+1)*4;let ups=0;while(sk.lv<10&&sk.xp>=need){sk.xp-=need;sk.lv++;ups++;need=(sk.lv+1)*4}if(ups){system(`${SKILL_NAMES[k]} 숙련이 Lv.${sk.lv}로 상승했습니다.`, 'good');addLog(`${SKILL_NAMES[k]} Lv.${sk.lv}`)}return ups}

// Original index.html:306
function system(t,type=''){state.lastSystem=t;state.lastSystemType=type;renderSystem()}

// Original index.html:307
function clearSystem(){state.lastSystem='';state.lastSystemType=''}

// Original index.html:308
function check({stat:st,skill:sk,diff=55,label='',bonus=0,silent=false}){const sr=stat(st);const sl=sk?skill(sk):0;const random=rollInt(-18,18);const total=sr+sl*6+bonus+random;const ok=total>=diff;const crit=total>=diff+24;const text=`[판정] ${label||STAT_NAMES[st]} — ${STAT_NAMES[st]} ${sr}${sk?` + ${SKILL_NAMES[sk]} Lv.${sl}`:''} ${random>=0?'+':''}${random} → ${ok?(crit?'대성공':'성공'):'실패'}`;if(!silent)system(text,ok?'good':'bad');addLog(text);if(sk)gainSkill(sk,ok?2:1);return {ok,crit,total}}

// Original index.html:309
function relLabel(v){if(v>=60)return '깊은 신뢰';if(v>=35)return '신뢰';if(v>=15)return '호의';if(v>=-14)return '아직 판단 중';if(v>=-34)return '경계';if(v>=-59)return '불신';return '적대'}
