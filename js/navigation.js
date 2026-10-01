/* Classic script: shared global bindings. Load order is defined in index.html. */

// Original index.html:343
function scheduleConsequence(scene,days=1,data={}){state.consequences.push({scene,dueDay:state.day+days,data,resolved:false});addLog('어떤 선택이 훗날의 결과로 남았다.')}

// Original index.html:344
function dueConsequence(){return state.consequences.find(c=>!c.resolved&&c.dueDay<=state.day&&scenes[c.scene])||null}

// Original index.html:345
function encounterEligible(id){if(state.random.seen.includes(id))return false;if(id==='enc_checkpoint'&&(state.species==='인간'||rep('factions','guard')>=18))return false;if(id==='enc_foreign_words'&&Math.max(lang('orcish'),lang('goblin'),lang('elven'),lang('dwarven'))<2)return false;if(id==='enc_wandering_scribe'&&skill('language')<1&&Math.max(...Object.values(state.languages||{}))<5)return false;return true}

// Original index.html:346
function maybeRandomEncounter(nextId){
 if(!nextId||state.ended||pendingCombat||!hasFlag('랜덤인카운터 해금')||state.scene.startsWith('enc_')||String(nextId).startsWith('ending_')||nextId==='death'||nextId==='origin_roll')return false;
 if(state.random.day!==state.day){state.random.day=state.day;state.random.count=0}
 if(state.random.count>=2)return false;const target=scenes[nextId];if(!target)return false;let loc=target.location;if(typeof loc!=='string'||loc===state.location)return false;
 const due=dueConsequence();if(due&&rng()<.72){state.random.returnTo=nextId;due.resolved=true;state.random.data.activeConsequence=due;state.random.count++;go(due.scene);return true}
 let chance=.22;if(state.turn<4)chance=.12;if(state.city.panic>20)chance+=.05;if(rng()>chance)return false;
 const valid=ENCOUNTER_POOL.filter(encounterEligible);if(!valid.length)return false;const id=valid[rollInt(0,valid.length-1)];state.random.returnTo=nextId;state.random.seen.push(id);state.random.count++;go(id);return true
}

// Original index.html:354
function go(id){pendingCombat=null;clearSystem();state.pendingReview=null;state.scene=id;const sc=scenes[id];if(!sc){console.error('Missing scene',id);return}if(sc.location)state.location=typeof sc.location==='function'?sc.location(state):sc.location;if(sc.onEnter)sc.onEnter(state);render();window.scrollTo({top:0,behavior:'smooth'})}

// Original index.html:355
function snapshotVisible(){return {day:state.day,hour:state.hour,minute:state.minute,silver:state.silver,food:state.food,res:{...state.res},items:{...state.items},relations:{...state.relations},reputation:JSON.parse(JSON.stringify(state.reputation||{})),reputationAwareness:JSON.parse(JSON.stringify(state.reputationAwareness||{})),socialEcho:state.lastSocialEcho||''}}

// Original index.html:356
function cleanChoiceLabel(t){return String(t).replace(/<[^>]*>/g,' ').replace(/&nbsp;/g,' ').replace(/\s+/g,' ').trim().replace(/[.。]$/,'')}

// Original index.html:357
function choiceDecisionSentence(label){
 const t=label.replace(/[.!?]+$/,'').trim();if(!t)return '당신은 잠시 생각한 끝에 행동합니다.';
 const special={
  '돈은 됐다. 대신 돌아오면 청동패의 이야기를 전부 들려달라.':'당신은 돈 대신, 돌아온 뒤 청동패에 얽힌 이야기를 전부 들려달라고 합니다.',
  '지금은 돌아가자.':'당신은 지금은 돌아가는 편이 낫다고 판단합니다.',
  '위험하면 바로 돌아가자고 선을 긋는다.':'당신은 위험해지는 순간 바로 돌아가자고 선을 긋습니다.',
  '도시를 포기하기엔 아직 이르다.':'당신은 도시를 포기하기에는 아직 이르다고 판단합니다.',
  '그래도 성당의 긴급 종소리는 무시하기 어렵다.':'당신은 결국 긴급 종소리의 정체를 확인하러 가기로 합니다.',
  '뜻을 모르겠다. 신경 쓰지 않는다.':'당신은 뜻을 알아내려 애쓰지 않고 그대로 지나치기로 합니다.',
  '길잡이 겸 통역을 맡는다. 은화 2닢이면 된다.':'당신은 은화 두 닢을 받는 조건으로 길잡이와 통역을 맡기로 합니다.',
  '위험하니 납골당을 봉쇄하고 경비대에 맡긴다.':'당신은 납골당을 더 건드리지 않고 봉쇄한 뒤 경비대에 넘기기로 합니다.',
  '몸을 쉬게 한다. 내일이 더 위험할 수 있다.':'당신은 내일을 대비해 몸부터 쉬게 하기로 합니다.',
  '지금 일부를 비싸게 판다.':'당신은 가격이 오른 지금 물건 일부를 되팔기로 합니다.',
  '라엔에게 판단을 맡긴다.':'당신은 섣불리 끼어들지 않고 라엔의 판단을 따르기로 합니다.',
  '원판을 회수한다. 임시 효과만 확인했다.':'당신은 더 깊이 건드리지 않고 원판을 회수하기로 합니다.',
  '뒤처진 사람을 확인하며 달린다.':'당신은 속도를 조금 늦추더라도 뒤처지는 사람이 없는지 확인하며 달리기로 합니다.',
  '몸으로 수레를 받아낸다.':'당신은 굴러오는 수레를 몸으로 받아 세우기로 합니다.',
  '경비병이 시선을 돌린 순간 골목으로 빠진다.':'당신은 경비병의 시선이 돌아간 틈을 타 골목으로 빠져나가기로 합니다.',
  '약초상에 맡긴다.':'당신은 주운 물건을 약초상에게 맡겨 주인을 찾게 하기로 합니다.',
  '은화 두 닢을 사례라고 생각하고 나머지는 맡긴다.':'당신은 은화 두 닢만 사례로 받고 나머지는 돌려맡기기로 합니다.'
 };if(special[t])return special[t];
 const forms=[
  [/지 않는다$/,'지 않기로 합니다'],[/하지 않는다$/,'하지 않기로 합니다'],
  [/한다$/,'하기로 합니다'],[/간다$/,'가기로 합니다'],[/온다$/,'오기로 합니다'],
  [/돕는다$/,'돕기로 합니다'],[/막는다$/,'막기로 합니다'],[/찾는다$/,'찾기로 합니다'],[/묻는다$/,'묻기로 합니다'],[/듣는다$/,'듣기로 합니다'],[/읽는다$/,'읽기로 합니다'],[/본다$/,'보기로 합니다'],[/살핀다$/,'살피기로 합니다'],
  [/뽑는다$/,'뽑기로 합니다'],[/올린다$/,'올리기로 합니다'],[/나눈다$/,'나누기로 합니다'],[/감춘다$/,'감추기로 합니다'],[/넘긴다$/,'넘기기로 합니다'],[/지어낸다$/,'지어내기로 합니다'],[/둘러댄다$/,'둘러대기로 합니다'],[/놓는다$/,'놓기로 합니다'],[/준다$/,'주기로 합니다'],[/맡는다$/,'맡기로 합니다'],[/헤어진다$/,'헤어지기로 합니다'],[/따른다$/,'따르기로 합니다'],[/뚫는다$/,'뚫기로 합니다'],[/지킨다$/,'지키기로 합니다'],[/댄다$/,'대기로 합니다'],[/긋는다$/,'긋기로 합니다'],[/물러난다$/,'물러나기로 합니다'],[/잔다$/,'자기로 합니다'],[/배운다$/,'배우기로 합니다'],[/옮긴다$/,'옮기기로 합니다'],[/사둔다$/,'사두기로 합니다'],[/맞는다$/,'맞기로 합니다'],[/만든다$/,'만들기로 합니다'],[/둔다$/,'두기로 합니다'],[/건다$/,'걸기로 합니다'],[/벌린다$/,'벌리기로 합니다'],[/선다$/,'서기로 합니다'],[/맞춘다$/,'맞추기로 합니다'],[/밀어붙인다$/,'밀어붙이기로 합니다'],[/넣는다$/,'넣기로 합니다'],[/끝낸다$/,'끝내기로 합니다'],[/도망친다$/,'도망치기로 합니다'],[/보낸다$/,'보내기로 합니다'],[/던져준다$/,'던져주기로 합니다'],[/따진다$/,'따지기로 합니다'],[/붙잡는다$/,'붙잡기로 합니다'],[/챙긴다$/,'챙기기로 합니다'],[/쉬게 한다$/,'쉬게 하기로 합니다'],
  [/확인한다$/,'확인하기로 합니다'],[/조사한다$/,'조사하기로 합니다'],[/기다린다$/,'기다리기로 합니다'],[/숨긴다$/,'숨기기로 합니다'],[/건넨다$/,'건네기로 합니다'],[/보여준다$/,'보여주기로 합니다'],[/내민다$/,'내밀기로 합니다'],[/거절한다$/,'거절하기로 합니다'],[/받는다$/,'받기로 합니다'],[/버린다$/,'버리기로 합니다'],[/남는다$/,'남기로 합니다'],[/떠난다$/,'떠나기로 합니다'],[/공격한다$/,'공격하기로 합니다'],[/말한다$/,'말하기로 합니다'],[/알린다$/,'알리기로 합니다'],[/부른다$/,'부르기로 합니다'],[/끊는다$/,'끊기로 합니다'],[/연다$/,'열기로 합니다'],[/닫는다$/,'닫기로 합니다'],[/꺼낸다$/,'꺼내기로 합니다'],[/쓴다$/,'쓰기로 합니다'],[/먹는다$/,'먹기로 합니다'],[/쉰다$/,'쉬기로 합니다']
 ];for(const [re,end] of forms)if(re.test(t))return `당신은 ${t.replace(re,end)}.`;
 return `당신은 잠시 생각한 끝에 그 선택을 행동으로 옮깁니다.`
}

// Original index.html:387
function visibleDelta(before){const out=[];const dr=(k)=>state.res[k]-(before.res[k]||0);if(state.silver!==before.silver)out.push(state.silver<before.silver?'주머니의 은화가 그만큼 가벼워집니다.':'주머니에 은화가 조금 늘어납니다.');if(state.food!==before.food)out.push(state.food<before.food?'가지고 있던 식량 일부가 사라집니다.':'먹을 것이 조금 늘어납니다.');if(dr('hp')<0)out.push('몸에는 그 선택의 대가가 상처로 남습니다.');else if(dr('hp')>0)out.push('몸 상태가 조금 나아집니다.');if(dr('stamina')<=-8)out.push('기력이 눈에 띄게 빠집니다.');else if(dr('stamina')>=8)out.push('숨을 돌리며 기력을 되찾습니다.');if(dr('spirit')<=-6)out.push('마음 한구석에 불안과 피로가 남습니다.');else if(dr('spirit')>=4)out.push('마음이 조금 가벼워집니다.');const changed=[];for(const[id,v]of Object.entries(state.relations)){const d=v-(before.relations[id]||0);if(Math.abs(d)>=4&&NPC[id])changed.push({id,d})}if(changed.length){const x=changed[0];out.push(`${NPC[x.id].name}의 태도에는 ${x.d>0?'조금의 호의가':'분명한 거리감이'} 남습니다.`)}const bm=before.day*1440+before.hour*60+before.minute,am=state.day*1440+state.hour*60+state.minute;if(am-bm>=30)out.push('그 일을 처리하는 사이 적지 않은 시간이 흐릅니다.');return out.join(' ')}

// Original index.html:388
function buildReview(ch,before){const label=cleanChoiceLabel(ch.t);let main=typeof ch.review==='function'?ch.review(state,before):(ch.review||choiceDecisionSentence(label));main=nameLine(main);const delta=ch.reviewOnly?'':visibleDelta(before);const echo=state.lastSocialEcho&&state.lastSocialEcho!==before.socialEcho?state.lastSocialEcho:'';state.lastSocialEcho='';return `${main}${delta?'\n\n'+delta:''}${echo?'\n\n'+echo:''}`}

// Original index.html:389
function choose(ch){if(ch.req&&!meets(ch.req))return;if(ch.if&&!ch.if(state))return;const before=snapshotVisible();if(ch.do){const r=ch.do(state);if(r===false){render();return}}state.turn=(state.turn||0)+1;const target=ch.go?(typeof ch.go==='function'?ch.go(state):ch.go):null;if(ch.review===false){if(target){if(!ch.noEncounter&&maybeRandomEncounter(target))return;go(target)}else render();return}state.pendingReview={text:buildReview(ch,before),target,noEncounter:!!ch.noEncounter};render()}

// Original index.html:390
function continueReview(){if(!state.pendingReview)return;const p={...state.pendingReview};state.pendingReview=null;if(p.target){if(!p.noEncounter&&maybeRandomEncounter(p.target))return;go(p.target)}else render()}

// Original index.html:391
function choice(t,goId,opts={}){return {t,go:goId,...opts}}

// Original index.html:392
function renderReview(){const el=document.getElementById('review');if(!state.pendingReview){el.className='reviewBox';el.innerHTML='';return}el.className='reviewBox open';el.innerHTML=`<div class="reviewKicker">당신의 선택</div><div class="reviewText">${state.pendingReview.text}</div><button class="reviewContinue" onclick="continueReview()">계속</button>`}
