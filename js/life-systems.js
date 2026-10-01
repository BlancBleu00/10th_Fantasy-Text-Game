/* Classic script: shared global bindings. Load order is defined in index.html. */

// Original index.html:2545
function computeEnding(){
 const scores=state.vectors;const ranked=Object.entries(scores).sort((a,b)=>b[1]-a[1]);const top=(ranked[0]&&ranked[0][1]>0)?ranked[0]:['none',0];let num='01',title='뿌리 아래에서 돌아온 자',body='도시는 살아남았고, 당신은 도시 아래에 다른 세계가 있다는 사실을 아는 몇 안 되는 사람이 되었다.';
 if(hasFlag('열번째 자기이름')){num='19';title='이름을 기억한 빈자리';body='열 번째 공명이 당신의 이름을 기억했다. 아직 신도 인간도 아닌 어떤 가능성이 당신과 연결되었다. 훗날 데미갓의 길은 여기서 시작될 수 있다.'}
 else if(hasFlag('열번째 신명명')){num='18';title='신이라는 이름을 준 사람';body='당신은 아직 태어나지 않은 힘에 신이라는 틀을 주었다. 교단도, 데미갓도 모르는 결과가 언젠가 돌아올 것이다.'}
 else if(hasFlag('열번째 이름 거부')){num='17';title='이름 붙이지 않은 자';body='강한 힘을 보았지만 숭배하지도, 소유하지도, 이름 붙이지도 않았다. 훗날 신을 넘어서는 시대를 선택할 가능성이 처음 생겼다.'}
 else if(state.faction==='elf'&&hasFlag('약속 봉인 성공')){num='14';title='두 기록 사이의 약속';body='인간 기록과 엘프 노래를 이어 오래된 봉인을 복원했다. 라엔의 가문과 당신의 이름은 같은 사건에 처음으로 함께 기록된다.'}
 else if(state.faction==='church'&&hasFlag('아홉 봉인 성공')){num='15';title='아홉을 다시 읽은 신앙';body='교단이 잊은 오래된 구조를 되살렸다. 아델과 토마에게 당신은 신앙을 무너뜨린 사람이 아니라 더 오래된 신앙을 보여준 사람이 되었다.'}
 else if(state.faction==='doctor'&&hasFlag('근원 표본 확보')){num='16';title='살리는 지식, 위험한 지식';body='도시는 살아남았고 근원 표본도 남았다. 이렌과 함께 만든 지식은 훗날 수많은 사람을 살리거나, 새로운 재앙을 만들 수도 있다.'}
 else if(state.faction==='guard'&&hasFlag('지하 통로 붕괴 성공')){num='13';title='돌로 닫은 밤';body='당신은 가장 현실적인 방식으로 길을 막았다. 완전한 해답은 아니지만 도시는 오늘 살아남았다. 오르반은 그런 승리를 높이 평가한다.'}
 else if(top[0]==='farmer'){num='05';title='다시 밭으로';body='거대한 비밀을 본 뒤에도 당신은 먹고사는 일을 하찮게 여기지 않았다. 마레나와 남쪽 밭은 이후 이 도시가 살아남는 기반이 된다.'}
 else if(top[0]==='merchant'){num='06';title='가격을 읽는 사람';body='위기 속에서 물류와 사람의 욕망을 읽었다. 당신은 장터에서 시작했지만 언젠가 대륙을 잇는 상단을 만들 수도 있다.'}
 else if(top[0]==='doctor'){num='08';title='첫 번째 조수';body='이렌은 당신을 단순한 환자 운반꾼으로 보지 않는다. 사람을 살리는 기술과 그 선을 어디에 그을지 함께 고민할 동료가 생겼다.'}
 else if(top[0]==='guard'){num='07';title='북문의 이름';body='경비대는 당신을 민간인으로만 보지 않는다. 문과 질서를 지키는 일이 훗날 더 큰 전쟁과 인간 영웅의 길로 이어질 수도 있다.'}
 else if(top[0]==='church'){num='09';title='경전의 여백';body='당신은 빛의 교단 안에 숨겨진 오래된 기억을 보았다. 언젠가 교황과 교단 전체를 흔드는 질문으로 자랄 가능성이 있다.'}
 else if(top[0]==='worldtree'){num='10';title='검은 뿌리의 증언자';body='검은 뿌리와 세계수의 오래된 관계를 가장 가까이서 본 사람 중 하나가 되었다. 세계수를 살릴지, 차지할지, 자를지는 아직 먼 선택이다.'}
 else if(top[0]==='underworld'){num='04';title='아래를 본 사람';body='도시 아래의 문 너머에 더 큰 지하세계가 있음을 감지했다. 언젠가 악귀의 통치자와 지하 질서까지 닿을 길의 첫 좌표가 생겼다.'}
 else if(top[0]==='elf'){num='02';title='약속을 나눈 사람';body='라엔과의 관계는 개인적인 신뢰를 넘어 서로 다른 공동체의 오래된 기록을 잇는 작은 연결이 되었다.'}
 return {html:`<div class="endingCard"><div class="endingNum">CHAPTER ENDING ${num}</div><h3>${title}</h3>${body}</div>`};
}

// Original index.html:2564
function futurePaths(){const names={farmer:'농부와 정착',merchant:'상인과 상단',church:'빛의 교단과 교황',elf:'엘프와 세계수',guard:'인간 영웅과 도시 수호',doctor:'의술과 금지된 연구',scholar:'고대 기록과 언어',underworld:'지하세계',worldtree:'세계수의 부활/파괴',hero:'인간 영웅',unifier:'통일자',dragonslayer:'제2의 용살자',demigod:'데미갓',godslayer:'신 이후의 시대',creator:'창조신의 흔적'};return Object.entries(state.vectors).filter(([,v])=>v>0).sort((a,b)=>b[1]-a[1]).slice(0,7).map(([k,v])=>`${names[k]||k}: ${v>=8?'매우 강한 징후':v>=5?'강한 징후':v>=3?'가능성 있음':'희미한 가능성'}`).join('<br>')}

// Original index.html:2673
function mutateRumorText(text){const swaps=[['싸움을 통역으로 막았다','엘프 편을 들어 경비병과 맞섰다'],['근거 없는 소문을 가라앉혔다','사람들에게 입조심하라고 윽박질렀다'],['굶주린 아이에게 먹을 것을 나눴다','골목 아이들에게 음식을 뿌렸다'],['주운 약초상 거래 주머니를 돌려줬다','돈주머니를 주워 사례를 받았다'],['초소 일을 거들었다','경비대 일을 대신해줬다']];for(const [a,b] of swaps)if(text.includes(a))return text.replace(a,b);return text}

// Original index.html:2674
function advanceRumors(days=1){if(!state.rumors)return;for(const r of state.rumors){r.spread=clamp((r.spread||5)+rollInt(2,7)*days,0,100);if(r.spread>28&&r.distortion<2&&rng()<.28*days){const old=r.reason;r.reason=mutateRumorText(r.reason);if(old!==r.reason)r.distortion=(r.distortion||0)+1;r.credibility=clamp((r.credibility||70)-8,10,100)}state.world.rumorHeat=clamp((state.world.rumorHeat||0)+Math.max(0,(r.spread||0)-40)*.01,0,100)}}

// Original index.html:2678
function knowFact(text){state.knowledge=state.knowledge||{facts:[],suspicions:[],falseBeliefs:[]};if(!state.knowledge.facts.includes(text))state.knowledge.facts.push(text);note(text)}

// Original index.html:2679
function suspect(text){state.knowledge=state.knowledge||{facts:[],suspicions:[],falseBeliefs:[]};if(!state.knowledge.suspicions.includes(text))state.knowledge.suspicions.push(text)}

// Original index.html:2680
function believeFalse(text){state.knowledge=state.knowledge||{facts:[],suspicions:[],falseBeliefs:[]};if(!state.knowledge.falseBeliefs.includes(text))state.knowledge.falseBeliefs.push(text)}

// Original index.html:2689
function encounterWeight(id){let w=10;if(id==='enc_checkpoint')w+=state.species==='인간'?-8:12;if(id==='enc_injured_orc')w+=state.species==='그린 오크'?9:0;if(id==='enc_lost_elf_child')w+=state.species==='엘프'?8:0;if(id==='enc_price_panic')w+=Math.max(0,55-state.city.food)*.5+state.city.panic*.2;if(id==='enc_guard_bribe')w+=Math.max(0,35-rep('factions','guard'))*.15;if(id==='enc_refugee_cart')w+=state.day*2+state.city.infection*.2;if(id==='enc_night_hum')w+=(state.hour>=20||state.hour<=5)?18:-8;if(id==='enc_guild_invite')w+=Math.max(rep('factions','merchants'),rep('factions','craftsmen'))*.25;if(id==='enc_well_quarrel')w+=state.city.panic*.25;return Math.max(1,w)}

// Original index.html:2690
function weightedPick(ids){let total=ids.reduce((a,id)=>a+encounterWeight(id),0),r=rng()*total;for(const id of ids){r-=encounterWeight(id);if(r<=0)return id}return ids[ids.length-1]}

// Original index.html:2790
function attachRo(text){const a=Array.from(String(text||''));if(!a.length)return text+'로';const ch=a[a.length-1],c=ch.charCodeAt(0);if(c>=0xAC00&&c<=0xD7A3){const jong=(c-0xAC00)%28;return text+(jong!==0&&jong!==8?'으로':'로')}return text+'로'}

// Original index.html:3082
function addressPlayerInSpeech(id,raw){
 if(!state?.name||state.name==='여행자'||String(raw).includes(state.name))return raw;
 const rel=effectiveRel(id);if(rel<18)return raw;
 const cadence=id==='toma'?4:id==='mara'?5:id==='laen'?5:6;
 let hash=state.day*31+(state.turn||0)*17+id.length*11+String(raw).length;
 if(hash%cadence!==0)return raw;
 let call=state.name;
 if(state.status==='하급 귀족'&&rel<30&&['adel','orban','mark'].includes(id))call=playerTitle();
 return `${call}, ${raw}`;
}

// Original index.html:3097
function resistance(k){return state?.resistances?.[k]||0}

// Original index.html:3098
function gainResistance(k,amount=1,reason='',announce=true){state.resistances=state.resistances||{};const before=resistance(k);state.resistances[k]=clamp(before+amount,0,80);if(reason){state.resistanceHistory=state.resistanceHistory||[];state.resistanceHistory.unshift({day:state.day,key:k,delta:amount,reason});state.resistanceHistory=state.resistanceHistory.slice(0,20)}if(announce&&state.resistances[k]>before)system(`${RESIST_NAMES[k]||k} 내성이 ${state.resistances[k]}%로 상승했습니다.`, 'good')}

// Original index.html:3099
function ensureLifeSystems(){state.resistances=state.resistances||{};state.resistanceHistory=state.resistanceHistory||[];state.personalHistory=state.personalHistory||[]}

// Original index.html:3100
function lifeRecord(kind,text){ensureLifeSystems();if(!text)return;state.personalHistory.unshift({day:state.day,hour:state.hour,kind,text});state.personalHistory=state.personalHistory.slice(0,80)}

// Original index.html:3104
function refreshNpcRoles(){if(!state)return;for(const n of Object.values(NPC))n.role=n.baseRole;
 if(state.day>=2)NPC.iren.role=state.city.infection>=25?'떠돌이 의사 / 열병 대응':'떠돌이 의사';
 if(state.day>=3)NPC.adel.role='북문 성당 부사제 / 임시 구호 책임';
 if(state.day>=3)NPC.toma.role='성당 견습서기 / 환자 기록 담당';
 if(state.day>=4)NPC.mark.role=state.city.panic>=45?'성문 경비대 하급병 / 대피 유도':'성문 경비대 하급병 / 북문 경계조';
 if(state.day>=4)NPC.orban.role='도시 경비대 부대장 / 비상 지휘';
 if(state.city.food<50||state.city.panic>35)NPC.nadia.role='중앙 장터 잡화상 / 물자 중개';
 if(state.day>=4)NPC.mara.role='남쪽 밭 임차농 / 식량 운송 협력';
 if(state.day>=3)NPC.bram.role='북문 여관 주인 / 피난객 숙소 관리';
 if(hasFlag('라엔 가족사'))NPC.laen.role='북방 엘프 행상인 / 옛길 탐색자';
 if(hasFlag('조부 대화 성공'))NPC.laen.role='북방 엘프 / 귀환자의 후손';
 if(hasFlag('혼합문자 해독')||hasFlag('성당 엘프문자 선취'))NPC.seln.role='도시 기록관 / 고대 도로 기록 조사';
}

// Original index.html:3189
function rememberByValues(tags=[],summary='',source='직접 경험'){
 if(!summary)return;
 const seen=Object.keys(NPC).filter(id=>hasFlag('met_'+id));
 for(const id of seen){const vals=NPC[id].values||{};let score=0;for(const t of tags)score+=vals[t]||0;if(!score)continue;rememberNPC(id,summary,source,source==='직접 경험'?95:65,score>0?'호의':'경계');if(score>=4)modImpression(id,{respect:1,trust:1});else if(score>=2)modImpression(id,{respect:1});else if(score<=-4)modImpression(id,{trust:-2});else if(score<=-2)modImpression(id,{trust:-1})}
}

// Original index.html:3200
function conditionWord(v,good='안정',mid='불안정',bad='위험'){return v>=67?good:v>=36?mid:bad}

// Original index.html:3201
function chapterCityAftermath(){
 const c=state.city;
 const infection=c.infection<25?'열병은 더 번지지 않고 잦아드는 기미를 보인다.':c.infection<55?'열병은 남았다. 성당과 약초상에는 며칠 더 긴 줄이 이어질 것이다.':'열병은 끝나지 않았다. 도시가 살아남았다는 말과 사람들이 살아남았다는 말이 아직 같은 뜻은 아니다.';
 const panic=c.panic<25?'장터는 조심스럽게 제 속도를 되찾는다.':c.panic<60?'소문은 여전히 빠르고, 사람들은 북문을 지날 때 걸음을 재촉한다.':'문은 닫히지 않았지만 사람들의 마음은 이미 여러 갈래로 갈라졌다.';
 const food=c.food>=60?'곡물값은 버틸 만한 선에서 멈췄다.':c.food>=35?'식량값은 올랐고 가난한 집부터 끼니를 줄인다.':'창고 앞에 줄이 생긴다. 다음 주의 문제는 괴물이 아니라 빵일지도 모른다.';
 return `${infection} ${panic} ${food}`;
}

// Original index.html:3208
function chapterPeopleAftermath(){
 const met=Object.keys(NPC).filter(id=>hasFlag('met_'+id));
 if(!met.length)return '<div class="item">이번 일주일 동안 끝내 깊이 알게 된 사람은 없었다. 그것 또한 한 삶의 모양이다.</div>';
 return met.map(id=>({id,v:effectiveRel(id)})).sort((a,b)=>Math.abs(b.v)-Math.abs(a.v)).slice(0,4).map(({id,v})=>{const n=NPC[id];let line='';
  if(id==='laen')line=v>=35?'라엔은 떠나기 전 당신의 이름을 엘프어로 한 번 적어준다. 다음에 만났을 때도 알아보겠다는 뜻이다.':v<=-15?'라엔은 떠날 때 작별 인사를 하지 않는다. 같은 진실을 보았다고 같은 편이 되는 것은 아니었다.':'라엔과 당신 사이에는 아직 질문이 더 많이 남아 있다. 다시 만난다면 첫 만남과는 다른 대화를 하게 될 것이다.';
  else if(id==='mark')line=v>=30?'마르크는 초소 장부에 당신을 민간 협조자로 적는다. 칭찬이라기보다 다음에도 부르겠다는 뜻에 가깝다.':v<=-15?'마르크는 당신을 볼 때마다 먼저 손부터 확인한다. 경비대의 기억은 개인 감정보다 오래 갈 수 있다.':'마르크는 여전히 퉁명스럽지만 이제 당신을 완전한 외지인처럼 보지는 않는다.';
  else if(id==='adel')line=v>=30?'아델은 성당 기록의 여백에 당신의 증언을 별도로 남긴다. 정식 교리와 맞지 않는 부분도 지우지 않는다.':v<=-15?'아델은 당신과 나눈 대화를 기록하되, 신뢰할 수 없는 증언이라는 주석을 붙인다.':'아델은 판단을 보류한다. 그에게 판단 보류는 거절보다 오래 가는 관심일 수 있다.';
  else if(id==='iren')line=v>=30?'이렌은 떠나기 전 약병 하나와 짧은 편지를 남긴다. 다음에 더 위험한 것을 보게 되면 먼저 자신에게 가져오라는 내용이다.':v<=-15?'이렌은 당신이 보는 앞에서는 더 이상 표본 상자를 열지 않는다. 호기심은 남았지만 신뢰는 남지 않았다.':'이렌은 당신을 흥미로운 협력자 정도로 기억한다. 사람을 그렇게 분류하는 것이 그에게는 꽤 높은 평가다.';
  else if(id==='nadia')line=v>=25?'나디아는 다음 거래부터 값을 먼저 깎지 않는다. 장터 사람에게는 그것만으로도 제법 긴 신뢰다.':v<=-15?'나디아는 웃으며 거래하지만 외상은 절대 주지 않는다.':'나디아는 당신이 무엇을 사고팔았는지, 그리고 무엇을 돈으로 바꾸지 않았는지 기억한다.';
  else if(id==='mara')line=v>=25?'마레나는 남쪽 밭에 오면 품삯 대신 밥부터 먹으라고 한다.':'마레나는 당신을 평가할 때 여전히 말보다 손을 본다.';
  else if(id==='orban')line=v>=25?'오르반은 당신을 명령받는 민간인이 아니라 계산에 넣어야 할 사람으로 보기 시작한다.':v<=-15?'오르반의 보고서에서 당신 이름 옆에는 작은 표시가 하나 붙는다. 좋은 뜻은 아니다.':'오르반에게 당신은 아직 유용할 수도, 위험할 수도 있는 변수다.';
  else if(id==='toma')line=v>=25?'토마는 당신과 본 것을 몰래 별도 장부에 옮겨 적는다. 언젠가 정식 기록보다 그 장부가 더 중요해질 수도 있다.':'토마는 다음에 만나면 물어볼 질문을 벌써 몇 개 적어뒀을 것이다.';
  else line=`${n.name}에게 당신은 이제 이름 없는 행인이 아니다.`;
  return `<div class="item"><b>${n.name}</b> — ${relLabel(v)}<div class="dim" style="margin-top:4px;line-height:1.6">${line}</div></div>`
 }).join('');
}

// Original index.html:3224
function chapterReputationAftermath(){
 const all=[];for(const [cat,vals] of Object.entries(state.reputation||{}))for(const [k,v] of Object.entries(vals||{})){const a=repAwareness(cat,k);if(a>=8&&Math.abs(v)>=3)all.push({cat,k,v,a,score:Math.abs(v)*Math.min(1,a/30)})}
 all.sort((a,b)=>b.score-a.score);if(!all.length)return '당신 이름은 아직 어느 사회에도 크게 퍼지지 않았다. 이번 주의 대부분은 소문이 아니라 개인의 기억으로 남았다.';
 return all.slice(0,4).map(x=>`${REP_NAMES[x.cat]?.[x.k]||x.k}: ${repLabel(x.v)}${x.a<20?'(아직 일부만 앎)':''}`).join('<br>');
}

// Original index.html:3229
function chapterLooseEnds(){
 const due=(state.consequences||[]).filter(x=>!x.resolved).length;const rumors=(state.rumors||[]).filter(x=>(x.spread||0)>10).length;const unknown=[];
 if(hasFlag('검은개 배수구'))unknown.push('배수구의 검은 뿌리가 어디까지 이어졌는지');
 if(hasFlag('외국어 북문 소문'))unknown.push('북문 창고를 비우라고 한 상인들이 무엇을 알고 있었는지');
 if(hasFlag('경비 뇌물 묵인'))unknown.push('북문 검문대의 작은 부패가 어디까지 번졌는지');
 if(hasFlag('은세공 옛문양'))unknown.push('은세공 브로치의 오래된 길 문양이 누구 손을 거쳐 왔는지');
 if(hasFlag('도로 지하공간 조기'))unknown.push('도시 도로 아래의 빈 공간이 하나인지 여러 개인지');
 const parts=[];if(due)parts.push(`아직 돌아오지 않은 선택의 결과 ${due}개`);if(rumors)parts.push(`도시를 떠도는 강한 소문 ${rumors}개`);if(unknown.length)parts.push(unknown.slice(0,3).join(', '));return parts.length?parts.join('<br>'):'이번 장에서 당장 확인할 수 있는 일은 대부분 끝났다. 그러나 세계가 멈춘 것은 아니다.';
}

// Original index.html:3259
function inferActionTags(reason=''){
 const tags=[];const add=t=>{if(!tags.includes(t))tags.push(t)};
 if(/돕|구조|먹을|나눴|환자|시신|장례|아이/.test(reason)){add('mercy');add('responsibility')}
 if(/돌려|반환|약속|지켰/.test(reason)){add('honesty');add('promise');add('reciprocity')}
 if(/경비|검문|질서|통제|봉쇄|다툼을.*정리|중재/.test(reason)){add('order');add('responsibility')}
 if(/기록|해독|원인|밝혀|조사|문자|증언|관찰/.test(reason)){add('knowledge');add('curiosity')}
 if(/가격|시세|상단|거래|재고|통행세/.test(reason)){add('trade');add('practical')}
 if(/성당|기도|교단|장례/.test(reason))add('faith')
 if(/위험|대피|살아|봉쇄|구조/.test(reason)){add('survival');add('risk')}
 if(/거짓|속였|기만|둘러댔/.test(reason))add('deception')
 if(/농가|밭|수레|작물|품삯/.test(reason)){add('labor');add('practical')}
 if(/엘프|오크|고블린|차별|선별 검문/.test(reason))add('dignity')
 return tags;
}

// Original index.html:3319
function setReview(sceneId,index,review){const sc=scenes[sceneId];if(!sc||typeof sc.choices==='function'||!sc.choices?.[index])return;sc.choices[index].review=review}

// Original index.html:3386
function ensureLife10(){
 if(state.chaosResonance===undefined)state.chaosResonance=Math.max(0,Math.min(100,Math.round((state.fate||50)/18-1)));
 if(!state.birthRegion)state.birthRegion=originRegion(origins.find(o=>o.key===state.originKey)||{key:state.originKey});
 if(!state.dailySummary)state.dailySummary={};
 if(!state.worldKnowledge)state.worldKnowledge=[];
 if(!state.statusEffects)state.statusEffects=[];
 if(!state.historyLog)state.historyLog=[];
 if(!state.languages.eastcommon)state.languages.eastcommon=state.languages.eastcommon||0;
}

// Original index.html:3395
function modChaos(v,reason=''){ensureLife10();state.chaosResonance=clamp(state.chaosResonance+v,0,100);if(reason&&state.chaosResonance>=18&&skill('arcana')>=2)addLog(`설명하기 어려운 공명 불협화음: ${reason}`)}

// Original index.html:3396
function chaosWhisper(){ensureLife10();const c=state.chaosResonance;if(c<18)return '';if(c<35)return '<span class="hiddenHint">아홉 공명 가운데 어디에도 정확히 들어맞지 않는 잔향이 아주 짧게 스친다.</span>';if(c<60)return '<span class="hiddenHint">익숙한 아홉 결 사이에서 박자가 하나 어긋난다. 무엇의 힘인지는 아직 이름 붙일 수 없다.</span>';return '<span class="hiddenHint">아홉 방향을 세고도 하나가 남는다. 그것이 바깥에서 들어오는지, 당신 안에서 생기는지는 알 수 없다.</span>'}

// Original index.html:3430
function conditionWord(){if(pct('hp')<25)return '중상';if(pct('hp')<50)return '부상';if(pct('stamina')<20)return '탈진';if(pct('spirit')<25)return '정신적 한계';if(state.stability<35)return '공명 불안정';return '대체로 안정'}

// Original index.html:3431
function updateRecordStrip10(){const el=document.getElementById('recordStrip');if(!el||!state)return;ensureLife10();const nm=playerName(), lvl=Math.max(1,Math.floor(Object.values(state.skills||{}).reduce((a,x)=>a+(x.lv||0),0)/8)+1);el.innerHTML=`<div class="charLine"><b>${nm}</b> / ${state.species} / ${state.origin} / 삶의 숙련 ${lvl} / ${conditionWord()}</div><div class="worldLine">인간력 30년 / ${state.day}일차 ${String(state.hour).padStart(2,'0')}:${String(state.minute).padStart(2,'0')} / ${state.location}</div>`}

// Original index.html:3432
function recordEvent10(text,type='사건'){ensureLife10();state.historyLog.push({day:state.day,hour:state.hour,minute:state.minute,type,text});if(state.historyLog.length>180)state.historyLog=state.historyLog.slice(-180)}

// Original index.html:3435
function daySummaries10(){ensureLife10();const days={};for(const x of state.historyLog){(days[x.day]??=[]).push(x)}return Object.entries(days).sort((a,b)=>Number(b[0])-Number(a[0])).map(([d,arr])=>`<div class="recordDay">${d}일차</div>${arr.slice(-8).map(x=>`<div class="recordEvent"><b>${String(x.hour).padStart(2,'0')}:${String(x.minute).padStart(2,'0')}</b> ${x.text}</div>`).join('')}`).join('')||'<span class="dim">아직 기록이 없습니다.</span>'}

// Original index.html:3451
function visibleWorldFacts10(){const keys=['westRoad'];if(state.originKey?.startsWith('human_east_')||state.originKey==='human_grayriver'||lang('eastcommon')>=7)keys.push('eastOrder','grayRiver');if(state.originKey==='human_east_martial'||skill('history')>=4)keys.push('martial');if(state.originKey==='human_east_jiangshi'||(skill('history')>=4&&skill('arcana')>=2))keys.push('jiangshi');if(state.originKey==='human_grayriver')keys.push('grayRiver');if(skill('history')>=4)keys.push('print');if(skill('history')>=6)keys.push('mithril','central');if(hasFlag('심층 바다 감지'))keys.push('central','underEast');if(hasFlag('아홉 기둥 네트워크'))keys.push('worldTree');if(hasFlag('서쪽 감염 연구 단서'))keys.push('westDemon');return [...new Set(keys)]}

// Original index.html:3452
function worldCodex10(){return visibleWorldFacts10().map(k=>{const [t,b]=WORLD_FACTS_10[k];return `<div class="codexFact"><b>${t}</b><br>${b}</div>`}).join('')}

// Original index.html:3587
function ensureV11(){
  ensureLife10();ensureLifeSystems();
  state.version='1.1.0';
  state.mainThreads=state.mainThreads||{fever:0,oldroad:0,under:0,society:0};
  state.encounterPressure=state.encounterPressure||{daily:8,local:10,social:8,history:5,strange:3};
  state.ignoredEncounters=state.ignoredEncounters||{};
  state.departure=state.departure||{reason:null,route:null,arrived:false};
  state.chapterStart=state.chapterStart||state.originKey;
}

// Original index.html:3596
function bumpThread(k,v=1){ensureV11();state.mainThreads[k]=clamp((state.mainThreads[k]||0)+v,0,100)}

// Original index.html:3597
function threadLabel11(k){return {fever:'열병',oldroad:'옛길',under:'지하',society:'도시'}[k]||k}

// Original index.html:3598
function activeThreads11(){ensureV11();return Object.entries(state.mainThreads).filter(([,v])=>v>0).sort((a,b)=>b[1]-a[1])}

// Original index.html:3599
function worldPressure11(){ensureV11();return `<div class="worldPressure"><span>감염<b>${Math.round(state.city.infection)}</b></span><span>불안<b>${Math.round(state.city.panic)}</b></span><span>식량<b>${Math.round(state.city.food)}</b></span><span>도로<b>${Math.round(state.world?.roadSafety??60)}</b></span></div>`}

// Original index.html:3600
function renderV11Hud(){const el=document.getElementById('v11hud');if(!el||!state)return;ensureV11();const th=activeThreads11();const chips=th.length?th.slice(0,4).map(([k,v])=>`<span class="threadChip ${v>=55?'hot':'active'}">${threadLabel11(k)} ${v}</span>`).join(''):'<span class="threadChip">아직 중심 사건 없음</span>';el.innerHTML=`<div class="v11card"><b>지금 이 삶이 붙잡고 있는 것</b><div class="v11threads">${chips}</div></div><div class="v11card secondary"><b>도시와 길의 압력</b>${worldPressure11()}</div>`}

// Original index.html:3601
function encounterCategory11(id){return ENCOUNTER_META_11[id]?.cat||'daily'}

// Original index.html:3602
function encounterBadge11(id){const c=encounterCategory11(id),n={daily:'일상',local:'지역',social:'사회',history:'역사',strange:'기이'}[c];return `<span class="encBadge ${c}">랜덤 인카운터 / ${n}</span>`}

// Original index.html:3617
function departureInfo11(){const d=ORIGIN_DEPARTURE_11[state.originKey];if(d)return d;const reg=REGION_NAMES_10[state.birthRegion]||state.culture;if(['human_church','goblin_church','human_healer'].includes(state.originKey))return [reg,'북쪽에서 내려온 환자와 구휼 요청이 평소보다 빨리 늘었다. 누군가는 장터에서 약재와 붕대를 확보해야 한다.','사람을 돌보는 일이 당신을 평소 자리 밖으로 밀어낸다.'];if(['human_merchant','goblin_tinker','dwarf_smith'].includes(state.originKey))return [reg,'비가 그친 뒤 물건값과 운송표가 동시에 흔들렸다. 북문으로 들어와야 할 짐이 오지 않았고, 장부 숫자가 하루 만에 맞지 않기 시작했다.','장사는 이상을 숫자로 먼저 본다.'];if(['human_noble','elf_adopted','elf_church','elf_crafter'].includes(state.originKey))return [reg,'가문이나 공방, 성당에서 변경도시 안쪽으로 심부름을 맡긴다. 겉보기에는 평범하지만 북문과 오래된 길에 관한 이야기가 계속 겹친다.','신분과 관계가 당신의 첫 목적지를 정한다.'];if(['human_soldier','orc_merc'].includes(state.originKey))return [reg,'경비대에서 일손을 구한다는 소식이 왔다. 북문 실종자와 성문 통제가 겹치면서 경험 있는 사람을 찾고 있다.','평범한 일거리가 사건과 맞닿는다.'];return [reg,'오늘 해야 할 일은 평범했다. 하지만 장터, 북문, 오래된 도로에서 서로 무관해 보이는 이상이 같은 날 겹친다.','큰 사건은 당신의 일상 안으로 들어와야 비로소 시작된다.']}

// Original index.html:3640
function syncMainThreads11(){ensureV11();if(hasFlag('검은 실핏줄'))bumpThread('fever',Math.max(0,18-state.mainThreads.fever));if(hasFlag('옛길 첫 공명')||hasFlag('폐역참 도착'))bumpThread('oldroad',Math.max(0,22-state.mainThreads.oldroad));if(hasFlag('검은 문 조우')||hasFlag('지하 맥동 감지'))bumpThread('under',Math.max(0,25-state.mainThreads.under));if(state.city.panic>30||state.world.rumorHeat>25)bumpThread('society',2)}

// Original index.html:3648
function encounterWeight11(id){ensureV11();const m=ENCOUNTER_META_11[id]||{cat:'daily'};let w=6+(state.encounterPressure[m.cat]||0);w+=encounterWeight(id)*.45;if(m.major){w*=.32;if(state.day>=4)w*=1.8}if(m.cat==='strange')w+=state.mainThreads.under*.12+(state.chaosResonance||0)*.15;if(m.cat==='history')w+=skill('history')*.7+Math.max(0,lang('eastcommon')-3)*.6;if(m.cat==='social')w+=state.city.panic*.12+state.world.rumorHeat*.1;if(m.cat==='local')w+=(100-state.world.roadSafety)*.1+state.city.infection*.08;return Math.max(.5,w)}

// Original index.html:3650
function ignoreEncounter11(id,amount=2){ensureV11();const cat=encounterCategory11(id);state.ignoredEncounters[id]=(state.ignoredEncounters[id]||0)+1;state.encounterPressure[cat]=clamp((state.encounterPressure[cat]||0)+amount,0,100);if(cat==='social')state.city.panic=clamp(state.city.panic+1,0,100);if(cat==='local')state.world.roadSafety=clamp(state.world.roadSafety-1,0,100);if(cat==='strange')modChaos(1,'이상 현상을 확인하지 않은 채 지나쳤다')}
