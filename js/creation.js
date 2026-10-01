/* Classic script: shared global bindings. Load order is defined in index.html. */

// Original index.html:2579
function hasFinalConsonant(text){const a=Array.from(String(text||''));if(!a.length)return false;const c=a[a.length-1].charCodeAt(0);if(c>=0xAC00&&c<=0xD7A3)return (c-0xAC00)%28!==0;return /[0-9]/.test(a[a.length-1])?['0','1','3','6','7','8'].includes(a[a.length-1]):false}

// Original index.html:2580
function attachJosa(text,pair){const [a,b]=pair.split('/');return `${text}${hasFinalConsonant(text)?a:b}`}

// Original index.html:2581
function nameJosa(pair){return attachJosa(state.name||'여행자',pair)}

// Original index.html:2582
function quotedName(){return attachJosa(state.name||'여행자','이라고/라고')}

// Original index.html:2599
function createStateFromOrigin(originKey,gender='남성',opts={}){
 const o=origins.find(x=>x.key===originKey)||origins[0];
 const seed=(Date.now()>>>0)^(Math.floor(Math.random()*0xffffffff)>>>0);
 const skills={};Object.keys(SKILL_NAMES).forEach(k=>skills[k]={lv:0,xp:0});Object.entries(o.skills||{}).forEach(([k,v])=>skills[k]={lv:v,xp:0});
 const rel={};Object.keys(NPC).forEach(k=>rel[k]=NPC[k].baseRel||0);Object.entries(o.baseRel||{}).forEach(([k,v])=>rel[k]=(rel[k]||0)+v);
 const resonance={light:0,dark:0,fire:0,water:0,earth:0,life:0,death:0,lightning:0,wind:0,...(o.res||{})};
 const sec={perception:clamp(Math.round(o.stats.wis*.42+o.stats.dex*.20+o.stats.int*.10+(o.secondary?.perception||0)+Math.floor(Math.random()*17)-8),1,100),socialSense:clamp(Math.round(o.stats.wis*.35+o.stats.int*.15+(o.secondary?.socialSense||0)+Math.floor(Math.random()*17)-8),1,100)};
 state={version:VERSION,seed,name:'',age:18+Math.floor(Math.random()*12),originKey:o.key,origin:originDisplay(o,gender),originDesc:o.desc,species:o.species,gender,status:o.status,culture:o.culture,traits:[...(o.traits||[])],languages:{common:0,elven:0,orcish:0,goblin:0,dwarven:0,oldcommon:0,...o.languages},secondary:sec,fate:Math.floor(Math.random()*101),stats:{...o.stats},skills,resonance,resonanceAwareness:0,stability:100,relations:rel,relTags:{},impressions:blankImpressions(),npcMemory:{},reputation:originReputation(o),reputationAwareness:awarenessFromReputation(originReputation(o)),repHistory:[],rumors:[],npcRumorSeen:{},flags:[],items:{...o.items},silver:o.silver,food:2,day:1,hour:8,minute:20,location:'서부대륙 변경도시 외곽',scene:opts.scene||'name_entry',opening:o.opening,log:[],journal:[],quests:{},faction:null,city:{infection:0,panic:0,guard:70,food:65,church:60},world:{weather:'비가 갠 뒤의 흐림',humanElfTension:22,roadSafety:61,rumorHeat:8},deedLedger:[],knowledge:{facts:[],suspicions:[],falseBeliefs:[]},vectors:{farmer:0,merchant:0,church:0,elf:0,guard:0,doctor:0,scholar:0,underworld:0,worldtree:0,hero:0,unifier:0,dragonslayer:0,demigod:0,godslayer:0,creator:0},kills:0,battles:0,turn:0,lastSystem:'',lastSystemType:'',ended:false,pendingReview:null,consequences:[],companions:[],random:{seen:[],day:1,count:0,returnTo:null,data:{}},creationComplete:opts.creationComplete??false};
 recalc(true);return state
}

// Original index.html:2612
function selectSpecies(species){creationDraft={species,gender:null};state.scene='choose_gender';render();return false}

// Original index.html:2613
function selectGender(gender){creationDraft.gender=gender;state.scene='choose_background';render();return false}

// Original index.html:2614
function selectBackground(key){state=createStateFromOrigin(key,creationDraft.gender||'남성',{scene:'name_entry',creationComplete:true});state.creationMode='직접 설정';render();return false}

// Original index.html:2615
function randomLife(){const o=origins[Math.floor(Math.random()*origins.length)];const g=Math.random()<.5?'여성':'남성';state=createStateFromOrigin(o.key,g,{scene:'origin_roll',creationComplete:true});state.creationMode='무작위';render();return false}

// Original index.html:2616
function rerollLife(){return randomLife()}

// Original index.html:3354
function originRegion(o){return ORIGIN_REGION_10[o.key]||'west_border'}

// Original index.html:3355
function regionAccept(species,region){return REGION_ACCEPT_10[species]?.[region]||'희귀'}

// Original index.html:3356
function rareCombination(species,region){return ['희귀','매우 희귀'].includes(regionAccept(species,region))}

// Original index.html:3357
function availableRegions(species){const keys=[...new Set(origins.filter(o=>o.species===species).map(originRegion))];return keys.length?keys:['west_border']}
