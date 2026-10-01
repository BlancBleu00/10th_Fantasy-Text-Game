/* Classic script: shared global bindings. Load order is defined in index.html. */

// Original index.html:2618
function registerCreationScenes(){
scenes.life_setup={title:'한 사람의 시작',location:'아직 이름 붙지 않은 삶',text:s=>`<div class="creationLead">이번에는 누구로 살아갈 것인가.</div>
이 세계에서 출생은 첫 번째 선택이 아니라 첫 번째 조건이다. 종족, 성별, 집안, 자라온 문화권에 따라 처음부터 알아듣는 말도, 아는 사람도, 몸에 밴 기술도 다르다.

누군가는 장터의 소란에서 욕설보다 가격을 먼저 보고, 누군가는 경비병의 칼보다 엘프의 억양을 먼저 듣는다. 어떤 사람에게는 열리는 문이 다른 사람에게는 검문대가 된다.

<div class="creationGrid"><div class="lifeCard"><b>직접 정하기</b><p>종족, 출생권역, 성별, 허용된 신분과 배경을 차례로 고른다. 언어와 관계망도 그 삶에서 따라온다.</p></div><div class="lifeCard"><b>운에 맡기기</b><p>누구로 태어날지 전부 무작위로 정한다. 같은 배경이라도 눈썰미와 눈치, 나이에는 작은 편차가 있다.</p></div></div>`,choices:[choice('이번 삶의 조건을 직접 정한다.','choose_species',{review:false,noEncounter:true}),choice('어디에 태어날지 운에 맡긴다.',null,{do:()=>randomLife(),review:false,noEncounter:true})]};

scenes.choose_species={title:'종족',location:'아직 이름 붙지 않은 삶',text:s=>`종족은 단순한 외형이 아니다. 어떤 언어를 모어로 배우는지, 어느 공동체가 당신을 자기 사람으로 보는지, 타인이 무엇을 먼저 기대하거나 경계하는지에 영향을 준다.

<span class="narrationEm">종족이 운명을 정하지는 않는다. 다만 세상이 당신을 처음 바라보는 각도를 바꾼다.</span>`,choices:()=>SPECIES_ORDER.map(sp=>choice(`${sp}으로 태어난다.`,'choose_gender',{do:()=>{creationDraft={species:sp,gender:null}},review:`당신은 이번 삶을 <b>${sp}</b>으로 시작합니다. 아직 이름도 직업도 없지만, 몸과 언어의 첫 조건은 정해졌습니다.`,noEncounter:true,hint:SPECIES_FLAVOR[sp]})).concat([choice('종족도 다시 운에 맡긴다.','choose_gender',{do:()=>{creationDraft.species=SPECIES_ORDER[rollInt(0,SPECIES_ORDER.length-1)]},review:s=>`이번 삶의 종족은 <b>${creationDraft.species}</b>으로 정해집니다.`,noEncounter:true})])};

scenes.choose_gender={title:'성별',location:'아직 이름 붙지 않은 삶',text:s=>`같은 집안에서 태어나도 성별에 따라 기대받는 역할과 불리는 호칭이 조금씩 달라질 수 있다. 다만 능력치 자체를 성별이 결정하지는 않는다.

현재 선택한 종족은 <b>${creationDraft.species||'아직 정하지 않음'}</b>이다.`,choices:[choice('남성으로 살아간다.','choose_background',{do:()=>{creationDraft.gender='남성'},review:false,noEncounter:true}),choice('여성으로 살아간다.','choose_background',{do:()=>{creationDraft.gender='여성'},review:false,noEncounter:true}),choice('성별도 운에 맡긴다.','choose_background',{do:()=>{creationDraft.gender=rng()<.5?'남성':'여성'},review:false,noEncounter:true})]};

scenes.choose_background={title:'어디에서 배운 사람인가',location:'아직 이름 붙지 않은 삶',text:s=>`<b>${creationDraft.species||'?'}, ${creationDraft.gender||'?'}</b>.

이제 중요한 것은 어디에서 자랐느냐다. 같은 종족도 인간 도시에서 자란 사람과 자기 종족 공동체에서 자란 사람은 전혀 다른 언어와 관계망을 가진다.

<span class="narrationEm">배경은 시작 능력치와 스킬, 언어, 신분, 초기 평판, 처음부터 아는 인물을 함께 결정한다.</span>`,choices:()=>origins.filter(o=>o.species===creationDraft.species).map(o=>choice(`${originDisplay(o,creationDraft.gender)} — ${o.culture}`,null,{do:()=>selectBackground(o.key),review:false,noEncounter:true,hint:o.desc})).concat([choice('이 종족 안에서 배경만 무작위로 정한다.',null,{do:()=>{const pool=origins.filter(o=>o.species===creationDraft.species);return selectBackground(pool[rollInt(0,pool.length-1)].key)},review:false,noEncounter:true})])};

scenes.origin_roll={title:'우연히 주어진 삶',location:'아직 이름 붙지 않은 삶',text:s=>`이번 삶의 시작은 우연이 정했다.

<b>${s.species} / ${s.gender} / ${s.origin}</b>
${s.originDesc}

신분은 <b>${s.status}</b>, 가장 익숙한 문화권은 <b>${s.culture}</b>이다. 처음부터 능숙한 언어와 낯선 언어가 갈리고, 몸에 밴 기술과 전혀 해보지 않은 일이 갈린다.

이번 삶의 눈썰미는 <b>${secondary('perception')}</b>, 눈치는 <b>${secondary('socialSense')}</b>다. 같은 집안에서 태어났더라도 사람은 조금씩 다르다.`,choices:[choice('이 삶을 받아들이고 이름을 정한다.','name_entry',{review:false,noEncounter:true}),choice('다시 한 번 운에 맡긴다.',null,{do:()=>rerollLife(),review:false,noEncounter:true}),choice('직접 정하겠다.','life_setup',{review:false,noEncounter:true})]};
}

// Original index.html:2653
function patchNameEntryScene(){
scenes.name_entry.text=s=>`종족은 <b>${s.species}</b>, 성별은 <b>${s.gender}</b>, 살아온 배경은 <b>${s.origin}</b>이다.

이제 이름을 정한다. 장부에는 그 이름이 적히고, 누군가는 친근하게 부르고, 누군가는 조롱하며 부르고, 누군가는 죽기 직전에 그 이름을 찾을지도 모른다.

<div class="nameSetup"><label for="playerNameInput">주인공의 이름</label><div class="nameRow"><input id="playerNameInput" maxlength="18" autocomplete="off" placeholder="이름을 입력하세요" value="${s.name?escapeHtml(s.name):''}" onkeydown="if(event.key==='Enter')document.getElementById('nameConfirmBtn')?.click()"><button type="button" onclick="suggestName()">이름 추천</button></div></div>
<span class="narrationEm">이름은 세이브 데이터에 남는다. 이후 인물들은 관계와 상황, 신분에 따라 이름이나 호칭으로 당신을 부른다.</span>`;

scenes.name_entry.choices=[choice('이 이름으로 살아간다.',s=>s.opening,{do:s=>confirmPlayerName(),noEncounter:true,review:s=>`당신의 이름은 <b>${playerName()}</b>. 이제부터 선택의 결과와 다른 사람의 기억은 그 이름을 따라다닙니다.`})];
}

// Original index.html:2693
function registerCityEncounters(){
Object.assign(scenes,{
enc_injured_orc:{title:'길가에 앉은 그린 오크',location:'남문과 장터 사이',onEnter:s=>{},text:s=>`성벽 그늘에 그린 오크 하나가 등을 기대고 앉아 있다. 셔츠 옆구리가 검붉게 젖었지만 사람들은 두세 걸음씩 거리를 두고 지나간다.

그가 공용어로 짧게 말한다.

“싸움 아니다. 짐 내리다 쇠가 찔렀다.”

${lang('orcish')>=5?'<span class="narrationEm">오크어로 중얼거린 욕설까지 들린다. 두려워서라기보다 도움을 청해야 하는 처지가 자존심 상한 모양이다.</span>':''}`,choices:[choice('상처를 확인하고 응급처치를 한다.',s=>s.random.returnTo,{do:s=>{const r=check({stat:'int',skill:'medicine',diff:55,label:'응급처치'});if(r.ok){publicDeed({'peoples.greenOrc':4,'factions.healers':2},'다친 그린 오크 노동자를 치료했다','부두 노동자 몇 명이');scheduleConsequence('enc_orc_after_help',1);vec('doctor',1)}else modRes({spirit:-2});advance(0,20)},noEncounter:true}),choice('오크어로 동료가 있는지 묻는다.',s=>s.random.returnTo,{if:s=>lang('orcish')>=4,do:s=>{gainSkill('language',1);modRep('peoples','greenOrc',2,'다친 오크가 동료에게 돌아가도록 도왔다');advance(0,15)},noEncounter:true}),choice('경비대 초소 위치만 알려주고 지나간다.',s=>s.random.returnTo,{do:s=>advance(0,5),noEncounter:true})]},
enc_orc_after_help:{title:'부두에서 온 인사',location:'중앙 장터',onEnter:s=>{},text:s=>`어제 다친 그린 오크와 비슷한 작업복을 입은 사람들이 장터 입구에서 당신을 알아본다.

“당신이었지. 우리 사람 꿰맨 사람.”

말은 투박하지만 적어도 이쪽에서는 당신 이름이 얼굴과 함께 기억된 모양이다.`,choices:[choice('별일 아니었다고 하고 지나간다.',s=>s.random.returnTo,{do:s=>{modRep('peoples','greenOrc',2,'부두 노동자 사이에서 치료해준 사람으로 기억됐다');modRepAwareness('peoples','greenOrc',8)},noEncounter:true}),choice('북문에 관한 소문을 묻는다.',s=>s.random.returnTo,{do:s=>{knowFact('부두 노동자들도 북쪽 창고 아래에서 밤마다 울리는 소리를 들었다.');modRep('peoples','greenOrc',1,'부두 노동자들과 정보를 나눴다')},noEncounter:true})]},
enc_lost_elf_child:{title:'말이 통하지 않는 아이',location:'중앙 장터 천막 사이',text:s=>`푸른 머리끈을 맨 어린 엘프가 천막 사이에 서 있다. 울고 있지는 않지만 어느 방향으로도 움직이지 못한다.

누군가 공용어로 부모 이름을 묻지만 아이는 대답하지 않는다.

${lang('elven')>=5?'<span class="narrationEm">엘프어로는 아주 작게 “상단의 종소리를 놓쳤어”라고 중얼거린다.</span>':secondary('perception')>=55?'<span class="narrationEm">아이의 시선이 사람 얼굴이 아니라 상단 깃발과 수레의 표식을 계속 따라간다.</span>':''}`,choices:[choice('엘프어로 아이에게 말을 건다.',s=>s.random.returnTo,{if:s=>lang('elven')>=4,do:s=>{gainSkill('language',1);publicDeed({'peoples.elf':4,'factions.merchants':2},'길을 잃은 엘프 아이를 상단에 돌려보냈다','엘프 상단 사람들이');modRel('laen',2,'엘프 아이를 상단으로 돌려보냈다는 소문을 들었다');advance(0,20)},noEncounter:true}),choice('깃발과 수레 표식을 따라 상단을 찾아본다.',s=>s.random.returnTo,{if:s=>secondary('perception')>=45,do:s=>{const r=check({stat:'wis',skill:'observation',diff:53,label:'상단 표식 추적'});if(r.ok)publicDeed({'peoples.elf':3,'factions.merchants':2},'말이 통하지 않는 엘프 아이를 상단에 돌려보냈다','장터 상인들이');advance(0,25)},noEncounter:true}),choice('경비대에 맡긴다.',s=>s.random.returnTo,{do:s=>{modRep('factions','guard',1,'길 잃은 아이를 경비대에 인계했다');advance(0,10)},noEncounter:true})]},
enc_price_panic:{title:'소금값이 두 배가 된 날',location:'중앙 장터',text:s=>`어제까지 세 닢이던 소금 자루에 오늘은 여섯 닢짜리 패가 붙어 있다. 상인은 “북문 길이 막힐 거라는 소문” 때문이라고 말한다.

사람들이 줄을 서기 시작하자 가격표를 보는 눈이 더 조급해진다. 아직 물건이 부족한지, 부족해질 거라고 모두가 믿는 건지는 분명하지 않다.`,choices:[choice('장부와 다른 가게 가격을 대조한다.',s=>s.random.returnTo,{do:s=>{const r=check({stat:'int',skill:'trade',diff:56,label:'가격 급등 원인 확인'});if(r.ok){knowFact('소금 자체가 부족한 것은 아니다. 북문 봉쇄 소문을 이용해 몇몇 상인이 가격을 먼저 올렸다.');modRep('factions','merchants',r.crit?2:0,'가격 급등의 원인을 정확히 짚었다')}advance(0,20)},noEncounter:true}),choice('오르기 전에 식량과 소금을 사둔다.',s=>s.random.returnTo,{if:s=>s.silver>=3,do:s=>{s.silver-=3;s.food+=2;vec('merchant',1);advance(0,10)},noEncounter:true}),choice('사재기를 부추기지 않고 지나간다.',s=>s.random.returnTo,{do:s=>{modRes({spirit:1});advance(0,5)},noEncounter:true})]},
enc_guard_bribe:{title:'검문표 아래의 손',location:'북문 안쪽 골목',text:s=>`짐수레 하나가 검문선 앞에 멈춘다. 상인은 서류를 내미는 척하며 접힌 은화 한 닢을 경비병 손바닥 아래로 밀어 넣는다.

경비병은 주위를 살핀다. 당신과 눈이 마주친다.

그 표정에는 “못 본 걸로 하자”는 말이 이미 절반쯤 적혀 있다.`,choices:[choice('못 본 척 지나간다.',s=>s.random.returnTo,{do:s=>{flag('경비 뇌물 묵인');rememberNPC('mark','누군가가 북문 검문 뇌물을 묵인했다는 소문을 들을 수 있다','잠재적 소문',30,'경계');scheduleConsequence('enc_bribe_echo',1);advance(0,5)},noEncounter:true}),choice('경비병 이름을 확인하고 기록해둔다.',s=>s.random.returnTo,{do:s=>{gainSkill('observation',1);flag('뇌물 경비 이름 기록');modRep('factions','guard',-1,'검문대 부패를 캐묻기 시작했다');advance(0,10)},noEncounter:true}),choice('그 자리에서 왜 돈을 받았는지 묻는다.',s=>s.random.returnTo,{do:s=>{const r=check({stat:'wis',skill:'persuasion',diff:62,label:'경비병 압박'});if(r.ok){publicDeed({'factions.guard':2,'places.borderCity':1},'북문 검문대의 뇌물 거래를 막았다','검문을 기다리던 상인들이');flag('검문 뇌물 저지')}else{modRep('factions','guard',-3,'검문대 경비병과 공개적으로 충돌했다');modRes({spirit:-2})}advance(0,15)},noEncounter:true})]},
enc_bribe_echo:{title:'누가 고발했는가',location:'경비초소 인근',text:s=>hasFlag('검문 뇌물 저지')?`검문대 경비 하나가 교대됐다. 누가 보고했는지는 사람마다 다르게 말하지만, 적어도 그 자리에서 돈을 받는 손은 사라졌다.`:`어제 봤던 검문대 경비가 오늘도 같은 자리에 있다. 다만 장터에서는 “요즘 북문은 은화 한 닢이면 짐검사를 건너뛴다”는 말이 조금 더 자연스럽게 오간다.

당신은 그 말이 어디서 시작됐는지 안다.`,choices:[choice('지나간다.',s=>s.random.returnTo,{do:s=>{if(!hasFlag('검문 뇌물 저지'))state.city.guard=clamp(state.city.guard-3,0,100)},noEncounter:true})]},
enc_false_relic:{title:'재앙을 막는 뿌리 조각',location:'성당 앞 노점',text:s=>`노점상이 검게 마른 나뭇조각을 작은 천에 싸서 판다.

“북쪽 땅에서 캔 겁니다. 문에 걸어두면 열병도, 죽은 것도 못 들어와요.”

불안한 사람 몇은 이미 은화를 꺼냈다. 조각에서는 평범한 탄 나무 냄새가 난다.`,choices:[choice('공명이나 식물 흔적을 확인한다.',s=>s.random.returnTo,{do:s=>{const r=check({stat:'int',skill:'arcana',diff:58,label:'부적 감정',bonus:skill('observation')*2});if(r.ok){knowFact('성당 앞에서 팔리는 검은 뿌리 부적은 대부분 평범한 탄 나무다.');publicDeed({'places.borderCity':2,'factions.church':1},'가짜 재앙 부적을 밝혀냈다','성당 앞 사람들이')}else suspect('노점의 검은 나뭇조각이 진짜 뿌리와 관련 있을 수도 있다.');advance(0,15)},noEncounter:true}),choice('사람들이 믿고 싶어한다. 그냥 둔다.',s=>s.random.returnTo,{do:s=>{state.city.panic=clamp(state.city.panic+1,0,100);advance(0,5)},noEncounter:true}),choice('하나 사서 나중에 비교한다.',s=>s.random.returnTo,{if:s=>s.silver>=1,do:s=>{s.silver--;item('charred_root',1);advance(0,5)},noEncounter:true})]},
enc_refugee_cart:{title:'남쪽으로 가는 짐',location:'남문 큰길',text:s=>`가구와 이불을 실은 수레 세 대가 남문을 향한다. 한 가족이 도시를 떠나는 게 아니라 서로 모르는 집들이 급히 한 줄이 된 모습이다.

“북문이 뚫린다잖아. 성당도 사람 받는다 하고.”

아직 공식 대피령은 없다.`,choices:[choice('어디서 그 말을 들었는지 하나씩 묻는다.',s=>s.random.returnTo,{do:s=>{const r=check({stat:'wis',skill:'persuasion',diff:55,label:'피난 소문의 출처 정리'});if(r.ok){knowFact('남문으로 빠지는 피난민 대부분은 서로 다른 소문을 듣고 움직였고, 공식 대피령을 본 사람은 없다.');state.city.panic=clamp(state.city.panic-1,0,100)}advance(0,20)},noEncounter:true}),choice('떠날 사람을 막지는 않는다. 길을 비켜준다.',s=>s.random.returnTo,{do:s=>advance(0,10),noEncounter:true}),choice('수레 한 대가 진흙에 빠진 것을 돕는다.',s=>s.random.returnTo,{do:s=>{modRes({stamina:-7});modRep('factions','poor',2,'피난 가는 가족의 수레를 밀어줬다');modRep('places','borderCity',1,'피난 가는 가족을 도왔다');advance(0,20)},noEncounter:true})]},
enc_funeral:{title:'이름을 모르는 장례',location:'북문 성당 옆길',text:s=>`작은 장례 행렬이 골목을 막는다. 관은 하나인데 뒤따르는 사람은 다섯뿐이다. 누가 죽었는지 묻는 사람도 없다.

토마가 행렬 끝에서 향을 들고 걷는다. 당신을 발견하지만 먼저 말을 걸지는 않는다.`,choices:[choice('잠시 길가에 서서 행렬이 지나가기를 기다린다.',s=>s.random.returnTo,{do:s=>{modRes({spirit:-1});modRep('factions','church',1,'이름 모를 장례에 예를 갖췄다');advance(0,10)},noEncounter:true}),choice('토마에게 누가 죽었는지 조용히 묻는다.',s=>s.random.returnTo,{do:s=>{meet('toma');knowFact('열병 환자 가운데 첫 공식 사망자가 나왔고, 성당은 아직 원인을 발표하지 않았다.');modRel('toma',2,'장례 뒤에서 조용히 사정을 물었다');advance(0,10)},noEncounter:true}),choice('바쁜 길이다. 옆 골목으로 돌아간다.',s=>s.random.returnTo,{do:s=>advance(0,5),noEncounter:true})]},
enc_night_hum:{title:'돌 아래에서 나는 낮은 소리',location:'북문 돌길',text:s=>`사람이 뜸한 시간, 발밑 돌 사이에서 아주 낮은 진동이 올라온다. 귀로 듣는 소리라기보다 어금니 안쪽이 울리는 느낌에 가깝다.

지나가던 사람 둘은 아무 반응이 없다.

${highestRes()>=10?'<span class="narrationEm">당신 안의 어떤 공명이 진동에 아주 늦게 대답한다.</span>':''}`,choices:[choice('돌바닥에 손을 대고 진동을 따라간다.',s=>s.random.returnTo,{do:s=>{const r=check({stat:'wis',skill:'arcana',diff:60,label:'지하 진동 감지',bonus:highestRes()*.4});if(r.ok){modResonance(Object.entries(state.resonance).sort((a,b)=>b[1]-a[1])[0][0],1,-1);knowFact('북문 돌길 아래의 진동은 일정한 간격으로 반복되며 지하 깊은 곳에서 올라온다.');vec('underworld',1)}else modRes({spirit:-3});advance(0,15)},noEncounter:true}),choice('발걸음을 멈추지 않는다.',s=>s.random.returnTo,{do:s=>advance(0,5),noEncounter:true})]},
enc_guild_invite:{title:'당신 이름을 아는 낯선 사람',location:'중앙 장터 회랑',text:s=>`회랑 기둥에 기대 있던 사람이 당신을 보자 몸을 일으킨다.

“${playerName()} 맞지요?”

초면이다. 그런데 상대는 당신이 최근 장터에서 무엇을 했는지 대강 알고 있다. 좋은 소문이든 나쁜 소문이든, 이름이 얼굴보다 먼저 도착한 셈이다.

“길드에서 사람을 찾습니다. 대단한 자리는 아니고, 이번 사태 끝날 때까지 눈과 귀가 필요한 일입니다.”`,choices:[choice('무슨 길드인지부터 묻는다.',s=>s.random.returnTo,{do:s=>{const craft=rep('factions','craftsmen')>rep('factions','merchants');note(`${craft?'장인 길드':'상인 조합'}가 이번 사태 동안 정보를 모을 사람을 찾고 있다.`);vec(craft?'scholar':'merchant',1);advance(0,10)},noEncounter:true}),choice('내 이름을 어디서 들었는지 묻는다.',s=>s.random.returnTo,{do:s=>{state.world.rumorHeat=clamp(state.world.rumorHeat+1,0,100);gainSkill('persuasion',1);advance(0,10)},noEncounter:true}),choice('지금은 다른 일이 있다며 거절한다.',s=>s.random.returnTo,{do:s=>advance(0,5),noEncounter:true})]},
enc_well_quarrel:{title:'우물 앞의 순서',location:'공동 우물',text:s=>`우물 앞 줄이 길어져 있다. 인간 여자 하나와 고블린 노인이 누가 먼저 왔는지를 두고 목소리를 높인다.

문제는 물 한 양동이지만 주변 사람들의 말에는 이미 종족 이야기가 섞이기 시작했다.`,choices:[choice('주변 사람에게 누가 먼저 왔는지 확인한다.',s=>s.random.returnTo,{do:s=>{const r=check({stat:'wis',skill:'observation',diff:54,label:'우물 순서 확인'});if(r.ok){publicDeed({'places.borderCity':2,'peoples.goblin':1,'peoples.human':1},'우물 순서 다툼을 목격자 확인으로 정리했다','우물가 사람들이');state.world.humanElfTension=Math.max(0,state.world.humanElfTension-1)}advance(0,10)},noEncounter:true}),choice('둘 다 한 양동이씩 먼저 긷게 하고 줄을 다시 세운다.',s=>s.random.returnTo,{do:s=>{const r=check({stat:'wis',skill:'persuasion',diff:58,label:'우물 중재'});if(r.ok){modRep('places','borderCity',2,'우물가 다툼을 중재했다');state.city.panic=Math.max(0,state.city.panic-1)}advance(0,10)},noEncounter:true}),choice('줄 하나 때문에 끼어들 일은 아니다.',s=>s.random.returnTo,{do:s=>advance(0,5),noEncounter:true})]}
});
}

// Original index.html:2760
function patchDialogueAndDeathScenes(){
scenes.market_elven_native.text=s=>`${dlg('laen',s=>isSpecies('엘프')?(lang('elven')>=8?'마침 잘 왔네. 저 인간은 내가 길 이름을 말할 때마다 칼자루를 잡아.':'…얼굴은 같은데 억양은 인간 쪽에 가깝군. 그래도 내 말은 알아듣는구나.'):'내 말을 알아듣는 인간은 드문데. 잘됐군. 설명 좀 해줘. 나는 욕한 적 없어.')}

라엔이 찾는 곳은 북문 밖 폐역참으로 이어지는 옛길, ‘타르 벨라’다. 엘프어에서는 오래된 길을 부르는 이름에 가깝지만, 이 지방 인간 방언으로는 혈통을 깎아내리는 욕과 소리가 묘하게 겹친다.

당신에게는 어디서 오해가 생겼는지 보인다. 이제 필요한 건 번역보다 설득이다. 마르크가 자기 귀가 틀릴 수도 있다는 가능성을 받아들여야 한다.`;

scenes.market_gesture.text=s=>hasFlag('몸짓으로 길 추론')?`라엔은 사람을 가리키지 않는다. 계속 북쪽과 수레, 손에 든 청동패를 번갈아 가리킨다. 팔과 어깨에도 싸우려는 힘이 들어가 있지 않다.

말은 알아듣지 못해도 한 가지는 짐작할 수 있다. 그는 누군가를 모욕하는 게 아니라 장소를 설명하려고 한다.

${dlg('mark','…그러니까 네 말은, 저게 사람한테 한 소리가 아니라 길 이름일 수도 있다는 거냐?')}`:`라엔의 손은 계속 북쪽을 향한다. 하지만 그것만으로는 부족하다. 도망가겠다는 건지, 길을 묻는 건지, 누군가를 부르는 건지까지는 읽히지 않는다.

${dlg('mark','네 표정 보니까 너도 모르잖아. 모르면 모른다고 해. 괜히 더 꼬이게 하지 말고.')}

당신은 지금, 모르는 것을 인정할지 아니면 불완전한 짐작으로 한 걸음 더 나아갈지 결정해야 한다.`;

scenes.death.text=s=>`몸이 더 이상 명령을 듣지 않는다.

소리는 점점 멀어진다. 마지막 순간 누군가 <b>${playerName()}</b>${hasFinalConsonant(state.name)?'을':'를'} 부른 것 같지만, 누구였는지도 확실하지 않다.

이 세계에는 당신 없이도 장터가 열리고, 누군가는 싸우고, 누군가는 밭을 갈며, 오래된 문 아래에서는 여전히 무언가가 움직일 것이다.

<div class="endingCard"><div class="endingNum">DEATH END</div><h3>여기까지의 삶</h3>모든 삶이 세계의 중심에 닿는 것은 아니다. 그렇다고 중심에 닿지 못한 삶이 존재하지 않았던 것도 아니다.</div>`;
}

// Original index.html:2791
function patchGuardRumorScene(){
scenes.choose_species.choices=()=>SPECIES_ORDER.map(sp=>choice(`${attachRo(sp)} 태어난다.`,'choose_gender',{do:()=>{creationDraft={species:sp,gender:null}},review:`이번 삶은 <b>${attachRo(sp)}</b> 시작합니다. 아직 이름도 직업도 없지만, 몸과 언어의 첫 조건은 정해졌습니다.`,noEncounter:true,hint:SPECIES_FLAVOR[sp]})).concat([choice('종족도 운에 맡긴다.','choose_gender',{do:()=>{creationDraft.species=SPECIES_ORDER[rollInt(0,SPECIES_ORDER.length-1)]},review:s=>`이번 삶의 종족은 <b>${creationDraft.species}</b>으로 정해집니다.`,noEncounter:true})]);
}

// Original index.html:2796
function registerCityActivities(){
scenes.enc_dead_bird.text=s=>`배수로 옆에 까마귀 한 마리가 죽어 있다. 사흘 동안 비가 쏟아졌으니 새 한 마리 죽어 있는 것만으로는 이상할 게 없다.

그런데 가까이 지나치는 순간 발목에 가느다란 검은 것이 감긴 게 보인다. 처음에는 젖은 실밥처럼 보이지만, 물살이 건드려도 풀리지 않는다. 피부 아래로 파고든 뿌리인지, 누군가 묶어놓은 끈인지는 아직 알 수 없다.

주변 사람들은 발걸음을 멈추지 않는다. 이상한 것을 발견한 사람이 당신뿐인지, 다들 보고도 모른 척하는 건지조차 분명하지 않다.`;

scenes.guard_nightwatch.text=s=>`성벽 위에서 세 시간이 흐른다.

처음 한 시간은 북쪽 숲에서 간간이 불빛이 보인다. 두 번째 시간에는 그것마저 사라진다. 마르크는 두 번 하품하고도 졸지 않으려고 창자루를 바닥에 두드리고, 아래 초소에서는 교대병들이 작은 목소리로 카드패를 섞는다.

아무 일도 일어나지 않는다.

평소라면 지루했을 시간이다. 오늘은 그 사실이 이상할 만큼 안심이 된다. 북쪽에서 짐승이 사라지고, 환자가 들어오고, 땅 아래에서 소리가 난다는 말을 하루 종일 들은 뒤라서다.

새벽 가까이 되자 마르크가 성벽 난간에서 몸을 떼며 말한다.

${dlg('mark','오늘 밤은 조용하네. 이럴 때 자두는 게 낫다. 진짜 일이 생기면 그때는 잘 시간도 없을 테니까.')}`;

scenes.enc_child_after_ignore.text=s=>`어제 창고 뒤에서 보았던 아이가 오늘은 다른 아이 둘과 함께 있다.

당신이 골목으로 들어서자 가장 작은 아이가 먼저 당신을 알아본다. 뭐라고 귓속말하자 셋의 시선이 잠깐 동시에 올라왔다가 다시 내려간다. 누구도 다가오지 않고, 누구도 손을 내밀지 않는다.

어제 당신이 지나간 일을 원망하는지, 단지 먹을 것을 주지 않는 사람으로 분류했을 뿐인지는 알 수 없다. 다만 아이들에게도 사람을 기억하는 방식이 있고, 당신은 그 기억 하나에 이미 들어가 있다.`;

scenes.tenth_no_name.text=s=>`당신은 입을 다문다. 아무 이름도 주지 않기로 한다.

그런데 침묵은 빈칸이 되지 않는다. 머릿속에서 오래전에 들은 사람들의 이름, 경전의 단어, 라엔이 말한 엘프어, 어린 시절 누군가 불러주던 호칭이 순서 없이 떠오른다. 마치 검은 문 너머의 무언가가 ‘이름’이라는 개념을 당신 기억에서 배우는 것 같다.

순간적으로 소름이 돋는다.

이름을 주지 않았다고 해서 접촉까지 없었던 일이 되지는 않는다. 당신은 오히려 빈자리를 빈자리로 남겨두는 일이 얼마나 적극적인 선택인지 깨닫는다.`;

scenes.forest_capture.text=s=>`헤른의 팔을 뒤로 돌려 결박하려는 순간, 축 늘어져 있던 몸이 갑자기 튄다.

손톱이 당신 팔을 길게 긁고 지나간다. 깊은 상처는 아니지만 금세 붉은 피가 맺힌다. 헤른은 사람처럼 욕하지도, 짐승처럼 으르렁거리지도 않는다. 대신 이 사이로 짧은 숨을 몇 번 밀어낸다.

${dlg('mark','손 조심해. 힘이 빠진 척한 거야. 아니면… 자기도 언제 움직일지 모르는 걸 수도 있고.')}

마르크가 무릎으로 어깨를 눌러 겨우 매듭을 끝낸다. 살아서 데려간다는 선택은 죽이는 것보다 자비로울 수 있다. 그만큼 더 많은 위험도 함께 데려가는 선택이다.`;

scenes.house_bed.text=s=>`침상부터 살핀다. 짚은 눅눅하지만 완전히 썩지는 않았고, 모포 한쪽에는 사람이 반복해서 몸을 돌린 흔적이 남아 있다.

벽 틈과 바닥판까지 손을 넣어보지만 편지나 돈주머니 같은 건 나오지 않는다. 실패라고 부르기에는 애매한 흔적만 남는다. 이 집은 버려진 지 오래되지 않았다. 누군가는 며칠 전까지 여기서 자고, 일어나고, 다시 이불을 덮었다.

당신이 마당으로 나가자 바깥 공기가 오히려 덜 답답하게 느껴진다. 찾던 단서는 없지만, 사람이 사라진 시점만큼은 조금 좁혀졌다.`;

scenes.enc_rain_shrine.text=s=>`무너진 담벼락 아래 손바닥만 한 돌 제단이 있다. 비를 피하려고 처마 밑에 몸을 붙이지 않았다면 지나쳤을 크기다.

신의 문장도, 교단의 색도 남아 있지 않다. 누군가 오래전에 표면을 긁어 지운 흔적만 있다. 빗물이 고인 둥근 홈에서는 주변보다 한 박자 늦게 물결이 번진다.

${hasFlag('제단 아홉 자국')?'<span class="narrationEm">물을 손끝으로 밀어내자 홈이 하나가 아니라 정확히 아홉 개라는 사실이 드러난다. 크기도 깊이도 조금씩 다르다.</span>':'낡은 제단 하나를 이상하게 느끼는 게 과민한 건지, 그냥 지나치는 게 둔한 건지는 아직 판단하기 어렵다.'}`;

scenes.report_lie.text=s=>`당신은 폐역참이 무너져 있었고 눈에 띄는 것은 없었다고 보고한다.

오르반은 곧바로 반박하지 않는다. 팔짱을 낀 채 당신 얼굴을 오래 본다. 질문을 하나 더 던지면 거짓말이 드러날 거라고 생각하는 사람의 침묵인지, 이미 다른 보고와 대조하고 있는 침묵인지 알기 어렵다.

${dlg('orban','그래. 아무것도 없었다는 것도 보고는 보고지.')}

아델은 서류에서 눈을 들었다가 다시 내린다. 믿은 얼굴은 아니다. 하지만 증거 없이 당신을 몰아세우지는 않는다.

그렇게 폐역참에서 본 일은 공식 기록에서 빠진다. 적어도 오늘 오후까지는.`;

scenes.enc_black_dog.text=s=>`검은 개 한 마리가 골목 한가운데 서 있다. 갈비뼈가 드러날 만큼 마른 것도 아니고, 목에 끈 자국도 없어 주인이 있는지조차 알기 어렵다.

사람이 가까이 가도 짖지 않는다. 당신이 한 걸음 다가가자 개는 북쪽을 한 번 보고, 다시 당신 얼굴을 본다. 우연이라고 넘기기에는 같은 행동을 두 번 반복한다.

${hasFlag('검은개 발자국 역행')?'<span class="narrationEm">진흙을 보니 더 이상하다. 발자국은 북쪽에서 온 것이 아니라, 이 골목에서 북쪽으로 갔다가 돌아오기를 여러 번 반복했다.</span>':'길짐승에게 의미를 부여하는 건 쉽다. 특히 도시 전체가 불안할 때는 더 그렇다.'}`;

scenes.archive_night.text=s=>`기록고의 밤은 바깥보다 시간이 느리다. 양초 하나가 절반 가까이 줄어드는 동안 당신은 서로 다른 필체의 문서 수십 장을 넘긴다.

검은 문을 직접 가리키는 문장은 끝내 나오지 않는다. 대신 다른 종류의 이상함이 반복된다. 인간력 이전이라고 분류된 기록의 상당수가 원본이 아니라 후대 필사본이고, 몇몇 문서는 같은 사건을 옮겨 적으면서 숫자와 고유명사만 미묘하게 바꿨다.

${dlg('toma','원본이 없다는 건… 그냥 오래돼서 없어진 걸 수도 있죠? 누가 일부러 없앤 게 아니라.')}

그럴 수도 있다. 아직은 어느 쪽도 증명할 수 없다.

찾던 답은 없지만, 기록 그 자체를 믿어도 되는지라는 더 성가신 질문이 남는다.`;

scenes.escape_help.text=s=>`계단 중간에서 누군가 발을 헛디딘다.

앞사람들은 이미 위쪽 빛을 보고 달리고 있다. 멈추면 천장에서 떨어지는 돌을 더 오래 맞아야 한다. 당신은 두 걸음을 더 올라갔다가 욕을 내뱉고 다시 몸을 돌린다.

뒤처진 사람의 팔을 잡아 일으키는 순간 돌조각 하나가 어깨를 친다. 팔이 저릿해지지만 손을 놓을 정도는 아니다. 곧 다른 사람이 돌아와 반대쪽 팔을 잡는다.

누군가를 구했다고 해서 갑자기 영웅이 되는 건 아니다. 다만 지상에 도착했을 때 인원수를 세는 사람이 한 명을 덜 잃는다. 오늘의 차이는 그 정도로 구체적이다.`;

scenes.enc_old_soldier.text=s=>`성벽 아래 술집 앞에서 한쪽 다리를 저는 노인이 당신 걸음을 오래 바라본다. 술잔은 이미 비었는데 자리를 뜨지는 않는다.

“칼을 배운 사람은 손보다 어깨가 먼저 보여. 사람 죽여본 놈은 발이 다르고.”

그는 당신 장비보다 자세를 본다. 취객이 아는 척하는 것처럼 들리다가도, 시선이 무기 끝과 골반, 발 간격을 차례로 훑는 걸 보면 완전히 허풍만은 아닌 듯하다.

노인은 술 냄새가 나지만 눈은 흐리지 않다. 북쪽 성벽을 바라볼 때만 표정에서 취기가 조금 사라진다.`;

scenes.blackdoor_touch.text=s=>`손바닥이 검은 표면에 닿는 순간 통증이 한꺼번에 터진다.

돌은 차갑다. 그런데 피부는 불에 덴 것처럼 붉어지고 손가락 관절이 제멋대로 굽는다. 빛, 어둠, 불, 물, 대지, 생명, 죽음, 전기, 바람. 이름을 알고 있든 모르든 서로 다른 아홉 감각이 한순간에 몸을 통과한다.

마지막에는 아무것도 없다.

그 ‘아무것도 없음’이 오히려 가장 오래 남는다. 아홉이 지나간 다음 정확히 한 자리만 비어 있는 것 같은 감각. 당신은 본능적으로 손을 떼지만, 이미 기억 속에는 빈칸의 모양이 남아 있다.`;

scenes.report_public.text=s=>`당신은 숨기지 않기로 한다. 폐역참 아래에서 본 문과 검은 뿌리, 움직이던 시체, 오래된 기록까지 가능한 한 정확하게 설명한다.

문제는 정확한 말이 그대로 남지 않는다는 데 있다.

당신이 “지하에 오래된 구조가 있다”고 말한 지 몇 분도 지나지 않아 누군가는 “도시 아래 죽은 자의 나라가 있다”고 전한다. 검은 뿌리는 저주가 되고, 엘프의 옛길은 침공로가 된다. 상점 하나가 문을 닫자 옆 가게도 따라 셔터를 내린다.

아직 남문은 열려 있는데 벌써 짐을 싸는 사람이 보인다.

진실을 공개하는 일과 사람들이 진실을 이해하게 만드는 일은 전혀 다른 문제다.`;

scenes.ending_compute.text=s=>{const e=computeEnding().html;const known=(state.deedLedger||[]).slice(0,3).map(d=>`<div class="item">${d.reason}<div class="dim" style="margin-top:3px">${d.witness} 보거나 전해 들었다.</div></div>`).join('');return `${e}

일주일 전에는 당신 이름을 아는 사람이 몇 명뿐이었을 수도 있다. 지금은 누군가는 직접 겪은 일로, 누군가는 소문으로, 누군가는 잘못 전해진 이야기로 <b>${playerName()}</b>${hasFinalConsonant(state.name)?'을':'를'} 기억한다.

<div class="future"><b>현재 장기 경로</b><br>${futurePaths()||'아직 뚜렷한 장기 경로가 없다.'}</div>
${known?`<div class="divider"></div><b>세상에 남은 최근 흔적</b>${known}`:''}`};

scenes.prelude_outsider.text=s=>{const extra=isSpecies('그린 오크')?'경비병은 당신 팔과 어깨를 한 번 훑은 뒤에야 얼굴을 본다. 짐꾼인지 용병인지부터 분류하려는 시선에 가깝다.':isSpecies('고블린')?'경비병의 시선은 당신 얼굴보다 가방의 자물쇠와 주머니를 먼저 훑는다. 장터에서 익숙하게 받아온 종류의 의심이다.':'';return `성문 앞 경비병은 당신 차례가 되자 앞사람보다 질문을 하나 더 한다.

“어디서 왔지? 도시에 얼마나 있었고?”

${extra}

익숙한 일이라고 넘길 수도 있다. 오늘따라 유난하다고 받아들일 수도 있다. 중요한 건 경비병이 같은 질문을 모두에게 하고 있지는 않다는 사실이다.`};
}
