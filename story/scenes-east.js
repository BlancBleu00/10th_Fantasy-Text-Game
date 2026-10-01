/* Classic script: shared global bindings. Load order is defined in index.html. */

// Original index.html:3413
function registerBirthRegionScenes(){
scenes.choose_species.choices=()=>SPECIES_ORDER.map(sp=>choice(`${sp}으로 태어난다.`,'choose_region',{do:()=>{creationDraft={species:sp,gender:null,region:null};creationRegion10=null},review:s=>`이번 삶의 종족은 <b>${sp}</b>으로 정해집니다. 이제 그 종족이 어느 권역에서 태어났는지 정합니다.`,noEncounter:true,hint:SPECIES_FLAVOR[sp]})).concat([choice('종족도 운에 맡긴다.','choose_region',{do:()=>{creationDraft={species:SPECIES_ORDER[rollInt(0,SPECIES_ORDER.length-1)],gender:null,region:null};creationRegion10=null},review:s=>`이번 삶의 종족은 <b>${creationDraft.species}</b>으로 정해집니다.`,noEncounter:true})]);

scenes.choose_region={title:'어디에서 태어났는가',location:'아직 이름 붙지 않은 삶',text:s=>`종족은 <b>${creationDraft.species||'?'}</b>로 정해졌다. 이제 태어난 권역을 정한다.

같은 종족이라도 어디에서 태어났는지에 따라 당연하게 배운 언어, 사회가 당신을 보는 방식, 선택할 수 있는 신분과 직업이 달라진다. 적대적인 조합은 기본적으로 나오지 않으며, 희귀한 조합은 그 삶을 설명할 배경이 있을 때만 열린다.`,choices:()=>availableRegions(creationDraft.species).map(r=>choice(`${REGION_NAMES_10[r]} — ${regionAccept(creationDraft.species,r)}`,null,{do:()=>{creationDraft.region=r;creationRegion10=r;state.scene='choose_gender';render();return false},review:false,noEncounter:true,hint:rareCombination(creationDraft.species,r)?'이 조합은 드물다. 가능한 배경 자체가 제한된다.':'이 권역에서 자연스럽게 성립하는 출생이다.'})).concat([choice('출생권역도 운에 맡긴다.',null,{do:()=>{const rs=availableRegions(creationDraft.species);creationDraft.region=rs[rollInt(0,rs.length-1)];creationRegion10=creationDraft.region;state.scene='choose_gender';render();return false},review:false,noEncounter:true})])};
}

// Original index.html:3419
function patchRegionBackgroundScenes(){
scenes.choose_background.text=s=>`<b>${creationDraft.species||'?'}, ${creationDraft.gender||'?'}</b>.
출생권역은 <b>${REGION_NAMES_10[creationDraft.region||creationRegion10]||'아직 정하지 않음'}</b>이다.

이제 그 사회 안에서 어떤 신분과 일을 배웠는지 정한다. 모든 직업이 모든 출생에 허용되는 것은 아니다. 이 단계는 능력치 보너스를 고르는 메뉴가 아니라, 당신이 누구를 알고 어떤 언어를 당연히 쓰며 어떤 문 앞에서 멈춰야 했는지를 정한다.`;

scenes.choose_background.choices=()=>origins.filter(o=>o.species===creationDraft.species&&(!creationDraft.region||originRegion(o)===creationDraft.region)).map(o=>choice(`${originDisplay(o,creationDraft.gender)} — ${o.status}`,null,{do:()=>selectBackground(o.key),review:false,noEncounter:true,hint:`${o.culture} / ${o.desc}`})).concat([choice('가능한 삶 가운데 하나를 무작위로 정한다.',null,{do:()=>{const pool=origins.filter(o=>o.species===creationDraft.species&&(!creationDraft.region||originRegion(o)===creationDraft.region));return selectBackground(pool[rollInt(0,pool.length-1)].key)},review:false,noEncounter:true})]);
}

// Original index.html:3455
function registerEasternScenes(){
const laenIntro10=scenes.intro;

scenes.intro_laen=laenIntro10;

scenes.intro={title:'비가 그친 뒤, 당신의 아침',location:'서부대륙 변경도시',onEnter:s=>{ensureLife10();if(!hasFlag('첫날 도시 진입')){flag('첫날 도시 진입');quest('day1life','오늘을 살아낸다','당신의 일과 사람, 소문 가운데 무엇을 먼저 붙잡을지 정한다.');note('인간력 30년. 사흘 비가 그친 뒤 변경도시의 하루가 다시 움직이기 시작했다.')}},text:s=>{const reg=REGION_NAMES_10[state.birthRegion]||state.culture;let local='';if(state.originKey==='human_hunter')local='북문 숲에서 짐승이 사라진 일이 마음에 남아 있다.';else if(state.originKey==='human_healer'||state.originKey==='goblin_church')local='북쪽에서 내려온 열병 환자가 평소보다 많다는 사실을 이미 알고 있다.';else if(state.originKey==='dwarf_road')local='도로석 아래에서 들린 빈 소리가 아직 손끝에 남아 있다.';else if(state.originKey==='orc_farmer')local='개간촌 밭고랑 아래에서 올라온 미지근한 바람이 마음에 걸린다.';else if(state.originKey?.startsWith('human_east_')||state.originKey==='human_grayriver')local='서부의 말과 표정은 아직 완전히 익숙하지 않다. 동쪽에서 당연했던 규칙이 여기서는 통하지 않는 순간이 있다.';else local='당장 해결해야 할 것은 세계의 비밀보다 오늘의 품삯과 약속에 가깝다.';return `인간력 30년. 사흘째 이어진 비가 새벽에 그쳤다.

당신은 <b>${state.species}, ${state.origin}</b>이다. 태어난 곳은 ${reg}. ${state.originDesc}

성문 안쪽에서는 젖은 천막을 걷고, 상인들은 물먹은 곡물값을 다시 적는다. 북문 쪽에서는 구휼소 수레가 평소보다 자주 오가고, 동문 장터에서는 외지 상인과 경비병이 언성을 높인다. 아무도 아직 이 하루를 하나의 사건이라고 부르지 않는다.

${local}

무엇을 먼저 볼지는 당신이 정한다.${chaosWhisper()?'\n\n'+chaosWhisper():''}`},choices:s=>[
 choice('내가 원래 하려던 일부터 한다.','day1_hub',{review:s=>`당신은 소문보다 자신의 하루를 먼저 붙잡습니다. 세상이 이상하더라도 먹고살 일은 사라지지 않습니다.`}),
 choice('북문 쪽의 열병과 잦아진 수레를 확인한다.','church_sick',{if:s=>skill('medicine')>=1||state.originKey==='human_hunter'||state.originKey==='goblin_church',review:s=>`당신은 장터의 소란보다 사람들의 얼굴과 구휼소 수레를 택합니다. 병은 말다툼보다 조용하지만, 퍼지기 시작하면 훨씬 넓은 곳을 바꿉니다.`}),
 choice('동문 장터의 외지 상인과 경비병 사이로 가본다.','intro_laen',{review:s=>`당신은 동문 장터의 소란을 그냥 지나치지 않습니다. 그곳에 있는 엘프가 누구인지도, 이 선택이 폐역참으로 이어질지도 아직 모릅니다.`}),
 choice('도시 바깥의 길과 지반 이상을 다시 확인한다.','oldroad_alone',{if:s=>hasFlag('짐승 이동 조기 파악')||hasFlag('도로 지하공간 조기')||hasFlag('남쪽 지반 금 조기')||secondary('perception')>=60,review:s=>`당신은 사람들의 말보다 땅과 길에 남은 이상을 먼저 믿어보기로 합니다. 설명은 없지만 흔적은 이미 여러 곳에서 같은 방향을 가리키고 있습니다.`}),
 choice('오늘은 어느 쪽에도 휘말리지 않고 장터를 지난다.','market_ignore',{review:s=>`당신은 아직 하나의 소문에 하루를 맡기지 않습니다. 개입하지 않는다고 해서 사건이 사라지는 것은 아니지만, 모든 삶이 첫날부터 세계의 중심으로 뛰어드는 것도 아닙니다.`})]};

scenes.oldroad_offer.text=s=>`${hasFlag('met_laen')?dlg('laen','해가 가장 높을 때 북문. 나는 기다린다. 늦으면 혼자 간다.'):'북문 밖 폐역참으로 이어지는 옛길에 대한 정보가 서로 다른 곳에서 겹친다.'}

폐역참은 한 엘프 개인의 사연만으로 움직이는 장소가 아니다. 약 3600년경 놓인 동서대로의 오래된 역참이고, 지금은 북부 구간이 쇠퇴해 사람들의 기억에서 밀려났다. 열병, 지반의 빈 소리, 오래된 청동패, 사라진 짐승의 흔적 가운데 무엇을 따라왔든 결국 같은 길을 가리킬 수 있다.`;

Object.assign(scenes,{
 prelude_east_scribe:{title:'서쪽 글씨의 첫 줄',location:'동문 외지인 숙소',text:s=>`서부에 도착한 뒤 가장 먼저 배운 것은 글자가 아니라 여백이었다. 같은 계약서라도 동부 제국의 서식에는 있어야 할 칸이 이곳 장부에는 없고, 서부 상인은 도장을 찍기 전에 상대 얼굴부터 본다.

당신이 따라온 사절단은 오늘부터 며칠 자유 시간을 줬다. 책상 위에는 동부에서 가져온 새 인쇄물 한 장과 서부 장터의 손글씨 전표가 나란히 놓여 있다.

밖에서는 비가 그치고 성문 종이 울린다.`,choices:[choice('동부 인쇄물을 접어 품에 넣고 도시로 나간다.','intro',{do:s=>{knowFact('동부에서 인쇄된 소식지가 서부 상인 손에도 들어오기 시작했다.');advance(0,10)}}),choice('서부 장부 양식부터 베껴본 뒤 나간다.','intro',{do:s=>{gainSkill('trade',1);gainSkill('language',1);advance(0,20)}})]},
 prelude_east_jiangshi:{title:'태우지 못한 부적',location:'서부 외지인 숙소',text:s=>`당신 짐 가장 아래에는 집안 문양을 지운 부적 한 장이 있다. 시신의 관절을 묶고 명령을 남기는 오래된 방식. 동부에서는 어떤 집안은 그것을 전쟁의 원흉이라 부르고, 어떤 집안은 악귀가 지상으로 올라오기 전부터 존재한 기술이라고 항변한다.

당신은 둘 다 사실의 일부라는 걸 안다. 통제를 잃은 강시가 악귀의 수하를 먼저 공격했고, 그 사건이 인간의 선제공격으로 받아들여졌다는 기록도 보았다.

서부에서는 그 이야기를 꺼낼 이유가 없다. 아직은.`,choices:[choice('부적을 그대로 숨겨두고 밖으로 나간다.','intro',{do:s=>{flag('강시술 가문 숨김');advance(0,10)}}),choice('부적의 먹선을 다시 읽어본다.','intro',{do:s=>{gainSkill('arcana',1);modChaos(1,'죽음과 생명의 경계를 억지로 잇는 옛 부적을 읽었다');advance(0,20)}})]},
 prelude_east_martial:{title:'낯선 도시에서의 기본기',location:'동문 밖 공터',text:s=>`당신은 숙소보다 먼저 발 디딜 자리를 본다. 빗물 먹은 흙에서 한 번 미끄러지고, 다시 자세를 잡는다.

동부에서 문파의 외문제자는 높은 신분이 아니다. 무림맹주의 이름은 누구나 알지만 그 아래에는 이름조차 알려지지 않은 문파와 제자가 수없이 많다. 맹주가 중앙령주이기도 하다는 사실 때문에 검을 든 사람의 말이 곧 정치가 되는 순간도 있었다.

서부에서는 그 이름이 통하지 않는다. 몸에 밴 기본기만 남는다.`,choices:[choice('기본 동작을 끝내고 성문으로 들어간다.','intro',{do:s=>{modRes({stamina:-3});gainSkill('athletics',1);advance(0,15)}}),choice('사람들이 어떻게 걷고 무기를 차는지 먼저 본다.','intro',{do:s=>{gainSkill('observation',1);advance(0,15)}})]},
 prelude_grayriver:{title:'강이 없는 아침',location:'서부 난민 숙소',text:s=>`잠에서 깨자 가장 먼저 이상한 것은 강 냄새가 없다는 사실이다.

회색강에서는 휴전 뒤에도 밤마다 맞은편 불빛을 셌다. 용살자와 악귀가 같은 날 서로를 끝냈다는 이야기는 아이도 알지만, 그날 이후 모든 적이 사라졌다고 믿는 사람은 거의 없다. 휴전은 경계의 방식이 달라진 것에 가까웠다.

서부의 아침은 지나치게 조용하다. 그래서 오히려 잠이 깨지 않는다.`,choices:[choice('습관처럼 창문과 골목 출구부터 확인한다.','intro',{do:s=>{gainSkill('observation',1);advance(0,10)}}),choice('그 습관을 버리려고 일부러 장터 한복판으로 간다.','intro',{do:s=>{modRes({spirit:2});advance(0,10)}})]}
});

Object.assign(scenes,{
 enc_east_broadside:{title:'젖은 동부 소식지',location:'장터 처마 밑',onEnter:s=>advance(0,8),text:s=>`처마 밑에 젖은 종이 한 장이 붙어 있다. 예전 필사 공고보다 글자가 지나치게 반듯하고, 같은 모양이 반복된다. 동부에서 찍혀 온 인쇄물이다.

제국 조정의 세금 공고와 열네 왕국 가운데 두 곳의 국경 분쟁 소식이 같은 면에 실려 있다. 멀리 있는 체제가 아직 살아 있다는 사실이 종이 한 장으로 서부 장터까지 온다.`,choices:[choice('읽을 수 있는 대목을 끝까지 읽는다.',s=>s.random.returnTo,{do:s=>{gainSkill('history',1);knowFact('동부의 제국과 14왕국 체제는 인간력 30년에도 유지되고 있다.');advance(0,8)},noEncounter:true}),choice('젖은 종이를 그대로 두고 간다.',s=>s.random.returnTo,{noEncounter:true})]},
 enc_jiangshi_talisman:{title:'팔지 않는 부적',location:'외지상 골목',onEnter:s=>advance(0,10),text:s=>`동부 잡화를 파는 상인이 누런 부적 몇 장을 펼쳐두었다. 손님 하나가 "강시를 만드는 종이냐"고 웃자 상인은 얼굴을 굳힌다.

“움직인다고 다 같은 술법이 아니오. 그리고 그 기술은 악귀보다 오래됐소.”

주변 사람은 농담으로 듣지만, 동부 출신이라면 그 말이 얼마나 위험한 주장인지 안다.`,choices:[choice('어떤 가문 방식인지 묻는다.',s=>s.random.returnTo,{if:s=>lang('eastcommon')>=3||skill('history')>=3,do:s=>{gainSkill('history',1);knowSuspicion('서부에도 동부 강시술의 부적과 기록이 흘러들고 있다.');advance(0,10)},noEncounter:true}),choice('괜한 일에 끼지 않는다.',s=>s.random.returnTo,{noEncounter:true})]},
 enc_martial_caravan:{title:'칼을 안 뽑는 사람',location:'대상로 쉼터',onEnter:s=>advance(0,10),text:s=>`동부식 짧은 도포를 입은 여행자가 수레바퀴를 고쳐준다. 허리에는 검이 있지만 손은 한 번도 칼자루로 가지 않는다.

아이 하나가 무림맹주를 봤냐고 묻자 그는 웃는다.

“그분은 중앙령주이기도 하니 내가 보고 싶다고 볼 수 있는 분이 아니지. 문파가 크다고 세상이 한 문파인 것도 아니고.”

영웅의 이름 아래에도 수많은 평범한 생업과 문파가 있다는 말이다.`,choices:[choice('동부 무림의 최근 분위기를 묻는다.',s=>s.random.returnTo,{do:s=>{gainSkill('history',1);knowFact('동부 무림맹은 여러 문파의 느슨한 연합이며, 맹주는 중앙령주를 겸한다.');advance(0,10)},noEncounter:true}),choice('수레바퀴 고치는 걸 돕고 지나간다.',s=>s.random.returnTo,{do:s=>{gainSkill('athletics',1);advance(0,10)},noEncounter:true})]},
 enc_current_sailor:{title:'보이는 대륙, 가지 못하는 바다',location:'주점 앞',onEnter:s=>advance(0,8),text:s=>`술 취한 선원이 중앙대륙을 봤다고 떠든다. 누군가 허풍이라 비웃자 그는 손가락으로 탁자를 긁어 해류 모양을 그린다.

“맑은 날이면 보이는 데도 있어. 보인다고 갈 수 있는 건 아니야. 물이 배를 옆으로 끌고 가버리거든.”

거리와 접근 가능성은 같은 말이 아니다.`,choices:[choice('해류 이야기를 더 듣는다.',s=>s.random.returnTo,{do:s=>{knowSuspicion('중앙대륙은 육안 거리보다 해류 때문에 접근이 어렵다는 선원들의 이야기가 있다.');gainSkill('history',1);advance(0,10)},noEncounter:true}),choice('술꾼의 허풍이라 생각하고 간다.',s=>s.random.returnTo,{noEncounter:true})]},
 enc_resonant_stone:{title:'돌이 한 박자 늦게 울릴 때',location:'오래된 포장길',onEnter:s=>advance(0,6),text:s=>`발밑 돌 하나가 밟은 순간이 아니라 발을 떼고 난 뒤 아주 작게 울린다.

드워프라면 오래된 지하 공명 구조에서 비슷한 이야기를 들었을 수 있다. 다른 사람에게는 그저 물먹은 돌의 빈 소리일 뿐이다.

${chaosWhisper()}`,choices:[choice('다시 한 번 박자를 맞춰 밟아본다.',s=>s.random.returnTo,{do:s=>{const r=check({stat:'wis',skill:'arcana',diff:62,label:'늦은 공명 듣기'});if(r.ok){modChaos(2,'돌의 울림이 아홉 공명 어느 쪽과도 완전히 맞지 않았다');knowSuspicion('일부 오래된 기반석에서 아홉 공명으로 설명하기 어려운 지연된 울림이 난다.')}advance(0,8)},noEncounter:true}),choice('돌은 돌이다. 지나간다.',s=>s.random.returnTo,{noEncounter:true})]}
});
}

// Original index.html:3535
function patchChaosScenes(){
const chamberNine10=scenes.chamber_nine?.onEnter;

if(scenes.chamber_nine)scenes.chamber_nine.onEnter=s=>{if(chamberNine10)chamberNine10(s);if(Object.values(s.resonance||{}).filter(v=>v>=15).length>=3)modChaos(2,'아홉 기둥이 동시에 서로 다른 방향으로 반응했다')};

const deepListen10=scenes.deep_listen?.onEnter;

if(scenes.deep_listen)scenes.deep_listen.onEnter=s=>{if(deepListen10)deepListen10(s);modChaos(hasFlag('심층 바다 감지')?4:7,'심층 거대문 너머의 겹친 의식과 접촉했다')};
}
