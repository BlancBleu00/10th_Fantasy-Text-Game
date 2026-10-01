/* Classic script: shared global bindings. Load order is defined in index.html. */

// Original index.html:208
function indirectRep(cat,key){let total=0;for(const [c,k,w] of (REP_LENSES[`${cat}.${key}`]||[])){const known=Math.min(1,repAwareness(c,k)/30);total+=rep(c,k)*w*known}return Math.round(total)}

// Original index.html:209
function perceivedRep(cat,key){return clamp(rep(cat,key)+indirectRep(cat,key),-100,100)}

// Original index.html:210
function blankReputation(){const r={};for(const [cat,vals] of Object.entries(REP_NAMES)){r[cat]={};for(const k of Object.keys(vals))r[cat][k]=0}return r}

// Original index.html:211
function awarenessFromReputation(r){const a=blankReputation();for(const [cat,vals] of Object.entries(r||{}))for(const [k,v] of Object.entries(vals||{}))if(v)a[cat][k]=clamp(8+Math.abs(v)*2,0,45);return a}

// Original index.html:212
function repAwareness(cat,key){return state?.reputationAwareness?.[cat]?.[key]||0}

// Original index.html:213
function modRepAwareness(cat,key,delta){if(!state.reputationAwareness)state.reputationAwareness=blankReputation();state.reputationAwareness[cat]??={};state.reputationAwareness[cat][key]=clamp(Math.round((state.reputationAwareness[cat][key]||0)+delta),0,100)}

// Original index.html:214
function originReputation(o){const r=blankReputation();const add=(c,k,v)=>r[c][k]=clamp((r[c][k]||0)+v,-100,100);switch(o.key){
 case 'human_farmer':add('factions','farmers',10);add('places','southFarms',8);add('peoples','human',3);break;
 case 'human_noble':add('realms','westernHumans',8);add('factions','guard',5);add('factions','church',3);add('places','borderCity',3);add('factions','poor',-3);break;
 case 'human_merchant':add('factions','merchants',10);add('realms','caravanNetwork',5);add('places','borderCity',4);break;
 case 'human_church':add('factions','church',12);add('realms','westernHumans',4);add('places','northQuarter',4);break;
 case 'human_soldier':add('factions','guard',8);add('realms','westernHumans',4);break;
 case 'human_street':add('factions','poor',11);add('places','borderCity',2);add('factions','guard',-6);break;
 case 'elf_adopted':add('peoples','human',4);add('peoples','elf',3);add('realms','westernHumans',4);add('realms','northernElves',-2);break;
 case 'elf_north':add('peoples','elf',12);add('realms','northernElves',10);add('realms','caravanNetwork',4);add('factions','guard',-4);break;
 case 'orc_dock':add('peoples','greenOrc',8);add('factions','poor',6);add('places','borderCity',2);add('factions','guard',-5);break;
 case 'orc_merc':add('peoples','greenOrc',7);add('factions','guard',2);add('realms','orcCommunities',4);add('realms','caravanNetwork',3);break;
 case 'goblin_tinker':add('peoples','goblin',9);add('factions','craftsmen',7);add('factions','merchants',5);add('places','borderCity',3);break;
 case 'goblin_caravan':add('peoples','goblin',8);add('factions','merchants',8);add('realms','caravanNetwork',10);break;
 case 'dwarf_smith':add('peoples','dwarf',10);add('factions','craftsmen',11);add('realms','caravanNetwork',3);break;
 }return r}

// Original index.html:229
function rep(cat,key){return state?.reputation?.[cat]?.[key]||0}

// Original index.html:230
function setRep(cat,key,v){if(!state.reputation)state.reputation=blankReputation();state.reputation[cat]??={};state.reputation[cat][key]=clamp(Math.round(v),-100,100)}

// Original index.html:231
function modRep(cat,key,delta,reason='',spread=true){if(!delta)return;setRep(cat,key,rep(cat,key)+delta);modRepAwareness(cat,key,Math.max(1,Math.abs(delta)*(spread?3:1)));if(reason){state.repHistory=state.repHistory||[];state.repHistory.unshift({day:state.day,cat,key,delta,reason});state.repHistory=state.repHistory.slice(0,60)}if(spread){for(const [c,k,w] of (REP_LINKS[`${cat}.${key}`]||[])){const raw=delta*w;const d=Math.abs(raw)>=.5?Math.sign(raw)*Math.max(1,Math.round(Math.abs(raw))):0;if(d)modRep(c,k,d,reason,false)}}}

// Original index.html:232
function publicDeed(changes,reason,witness='사람들 앞에서'){for(const [path,delta] of Object.entries(changes)){const [cat,key]=path.split('.');modRep(cat,key,delta,reason,true)}state.rumors=state.rumors||[];state.rumors.unshift({id:`${state.day}-${state.turn||0}-${state.rumors.length}-${reason}`,day:state.day,reason,witness,changes:{...changes}});state.rumors=state.rumors.slice(0,40);state.lastSocialEcho=`${witness} 본 일이어서, 이 선택은 당신 개인에게만 남지 않습니다.`}

// Original index.html:233
function repLabel(v){if(v>=60)return '전설적인 명성';if(v>=35)return '크게 신뢰받음';if(v>=15)return '좋은 평판';if(v>=-14)return '평범하거나 알려지지 않음';if(v>=-34)return '좋지 않은 평판';if(v>=-59)return '심한 불신';return '악명'}

// Original index.html:234
function socialModifier(id){const cfg=NPC_SOCIAL[id];if(!cfg)return 0;return Math.round((cfg.weights||[]).reduce((a,[c,k,w])=>{const known=Math.min(1,repAwareness(c,k)/25);return a+perceivedRep(c,k)*w*known},0))}

// Original index.html:235
function effectiveRel(id){return clamp((state.relations[id]||0)+socialModifier(id),-100,100)}

// Original index.html:236
function rumorRelevance(id,rumor){const cfg=NPC_SOCIAL[id];if(!cfg||!rumor?.changes)return 0;let score=0;for(const [cat,key,w] of (cfg.weights||[])){const d=rumor.changes[`${cat}.${key}`]||0;score+=d*w}return score}

// Original index.html:237
function hearPublicRumors(id){if(!state?.rumors?.length)return;state.npcRumorSeen=state.npcRumorSeen||{};state.npcRumorSeen[id]=state.npcRumorSeen[id]||[];for(const r of state.rumors.slice(0,12)){const rid=r.id||`${r.day}:${r.reason}`;if(state.npcRumorSeen[id].includes(rid))continue;const score=rumorRelevance(id,r);if(Math.abs(score)<.45)continue;rememberNPC(id,`소문으로 들었다: ${r.reason}`,'전해 들은 소문');if(score>=1.2)modImpression(id,{respect:1});else if(score<=-1.2)modImpression(id,{trust:-1});state.npcRumorSeen[id].push(rid);if(state.npcRumorSeen[id].length>30)state.npcRumorSeen[id]=state.npcRumorSeen[id].slice(-30);break}}

// Original index.html:240
function blankImpressions(){const out={};for(const id of Object.keys(NPC))out[id]={trust:0,respect:0,fear:0,debt:0};return out}

// Original index.html:241
function modImpression(id,changes={}){state.impressions=state.impressions||blankImpressions();state.impressions[id]??={trust:0,respect:0,fear:0,debt:0};for(const [k,v] of Object.entries(changes))state.impressions[id][k]=clamp((state.impressions[id][k]||0)+v,-100,100)}

// Original index.html:242
function rememberNPC(id,text,source='직접 경험'){if(!text)return;state.npcMemory=state.npcMemory||{};state.npcMemory[id]=state.npcMemory[id]||[];if(!state.npcMemory[id].some(x=>x.text===text)){state.npcMemory[id].unshift({day:state.day,text,source});state.npcMemory[id]=state.npcMemory[id].slice(0,20)}}

// Original index.html:243
function impressionSummary(id){const im=state.impressions?.[id];if(!im)return '';const a=Object.entries(im).filter(([,v])=>Math.abs(v)>=4).sort((a,b)=>Math.abs(b[1])-Math.abs(a[1])).slice(0,2);return a.map(([k,v])=>`${IMPRESSION_NAMES[k]} ${v>0?'+':''}${v}`).join(' / ')}
