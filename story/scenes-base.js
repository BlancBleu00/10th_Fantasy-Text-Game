/* Classic script: shared global bindings. Load order is defined in index.html. */

// Original index.html:414
function registerBaseScenes(){
Object.assign(scenes,{
origin_roll:{title:'당신이 태어난 자리',location:'아직 정해지지 않은 길',text:s=>`이번 삶의 시작은 무작위로 정해졌다.

<b>${s.species} / ${s.origin}</b>
${s.originDesc}

신분은 <b>${s.status}</b>, 익숙한 문화권은 <b>${s.culture}</b>이다.

당신이 잘하는 것과 못하는 것은 이미 조금 다르다. 같은 장터에 서더라도 어떤 말은 처음부터 들리고, 어떤 말은 평생 한 번도 배운 적 없는 소음에 가깝다. 누구는 당신의 옷을 보고 태도를 바꾸고, 누구는 종족을 먼저 본다.

<span class="narrationEm">이번 삶의 눈썰미는 ${secondary('perception')}, 눈치는 ${secondary('socialSense')}로 정해졌다. 같은 출신이라도 이 두 감각은 삶마다 조금씩 달라진다.</span>`,choices:[
 choice('이 삶을 받아들이고 이름을 정한다.','name_entry',{noEncounter:true,review:false}),
 choice('다른 삶을 다시 뽑는다.',null,{do:s=>{state=freshState()},noEncounter:true,review:false})]},
name_entry:{title:'이름을 가진 사람',location:'아직 정해지지 않은 길',text:s=>`종족은 <b>${s.species}</b>, 성별은 <b>${s.gender}</b>, 살아온 배경은 <b>${s.origin}</b>이다.

이제 다른 사람들이 기억하고, 장부에 적고, 때로는 마지막 순간에 부르게 될 이름을 정한다.

<div class="nameSetup"><label for="playerNameInput">주인공의 이름</label><div class="nameRow"><input id="playerNameInput" maxlength="18" autocomplete="off" placeholder="이름을 입력하세요" value="${s.name?escapeHtml(s.name):''}" onkeydown="if(event.key==='Enter')document.getElementById('nameConfirmBtn')?.click()"><button type="button" onclick="suggestName()">이름 추천</button></div></div>
<span class="narrationEm">이름은 세이브 데이터에 저장됩니다. 이후 인물들은 관계와 상황에 따라 이 이름을 직접 부를 수 있습니다.</span>`,choices:[choice('이 이름으로 삶을 시작한다.',s=>s.opening,{do:s=>confirmPlayerName(),noEncounter:true,review:s=>`당신은 자신의 이름을 <b>${playerName()}</b>이라고 정합니다. 이제 이 세계의 사람들은 그 이름으로 당신을 기억하기 시작합니다.`})]},
prelude_farm:{title:'젖은 수레바퀴' ,location:'남문 밖 농로',onEnter:s=>{meet('mara')},text:s=>`마레나의 수레 한쪽 바퀴가 진흙에 깊이 빠져 있다. 오늘 장터에 내다 팔 채소가 젖은 포대 안에서 눌린다.

${dlg('mara','{name}, 도시 들어가기 전부터 이 꼴이네. 비는 그쳤는데 땅이 사람 발목을 잡아.')}

당신에게 장터는 모험의 시작이 아니라 오늘 물건값을 제대로 받을 수 있느냐의 문제다.`,choices:[
 choice('수레를 함께 밀어 올린다.','intro',{do:s=>{const r=check({stat:'str',skill:'athletics',diff:54,label:'수레 끌어올리기'});if(r.ok){modRel('mara',6,'장터 가는 길에 수레를 함께 밀었다');publicDeed({'factions.farmers':2,'places.southFarms':1},'장터로 가는 농가의 수레를 함께 끌어냈다','농로의 이웃 농민들이');gainSkill('athletics',1)}else modRes({stamina:-6});advance(0,20)}}),
 choice('젖은 채소를 먼저 골라 상품과 버릴 것을 나눈다.','intro',{do:s=>{gainSkill('farming',2);modRel('mara',5,'젖은 작물을 함께 골랐다');modRep('factions','farmers',1,'젖은 작물을 함께 골랐다');advance(0,15)}}),
 choice('늦기 전에 혼자 장터로 간다.','intro',{do:s=>advance(0,10)})]},
prelude_noble:{title:'가문 인장이 보이는 거리',location:'동문 외곽 마차길',text:s=>`마차 창밖으로 진흙 묻은 성벽이 다가온다. 당신의 옷은 장터 사람들보다 깨끗하고, 허리춤에는 작은 가문 인장이 있다.

도시 안에서는 그 인장이 문을 열어줄 수도 있고, 당신이 한 말을 소문으로 만들 수도 있다.`,choices:[
 choice('가문 인장을 그대로 드러낸 채 들어간다.','intro',{do:s=>{flag('신분 공개');modRel('mark',3,'가문 인장을 확인했다');advance(0,10)}}),
 choice('오늘만큼은 인장을 안주머니에 감춘다.','intro',{do:s=>{flag('신분 감춤');state.traits.push('신분 은폐');advance(0,10)}})]},
prelude_market:{title:'가격표가 먼저 보이는 아침',location:'중앙 장터 뒷골목',onEnter:s=>meet('nadia'),text:s=>`${dlg('nadia','{name}, 소금 세 자루 가격 보고 와. 비 그친 날은 다들 세상이 끝난 줄 알고 값을 올리거든.')}

당신은 장터로 향한다. 오늘 사람들 얼굴에는 비 때문만은 아닌 긴장이 어려 있다.`,choices:[
 choice('세 군데 가격을 비교하고 기록한다.','intro',{do:s=>{gainSkill('trade',2);modRel('nadia',3,'시세를 꼼꼼히 확인했다');modRep('factions','merchants',1,'시세를 꼼꼼히 확인했다');advance(0,20)}}),
 choice('사람들 표정과 소문을 먼저 읽는다.','intro',{do:s=>{if(passive('socialSense',55)){flag('아침 장터 불안 포착');note('비가 그친 것과 별개로 북문 쪽 소문 때문에 장터 상인들이 평소보다 예민하다.')}advance(0,15)}})]},
prelude_church:{title:'촛농 냄새가 밴 손',location:'북문 성당',onEnter:s=>{meet('adel');modRel('adel',3,'아침 심부름을 맡겼다')},text:s=>`${dlg('adel','{name}, 장터에서 붕대와 소금을 조금 더 구해오세요. 북쪽 농가에서 열병 환자가 들어올 수도 있다는 연락이 왔습니다.')}

아직 아무도 이 말을 재앙이라고 부르지 않는다. 지금은 그저 준비가 필요한 환자 몇 명일 뿐이다.`,choices:[
 choice('필요한 물품 목록을 다시 확인한다.','intro',{do:s=>{gainSkill('medicine',1);flag('열병 소식 선취');modRep('factions','church',1,'성당의 아침 심부름을 맡았다');advance(0,15)}}),
 choice('왜 북쪽 농가에서만 열병이 생기는지 묻는다.','intro',{do:s=>{modRel('adel',2,'열병의 출처를 먼저 물었다');flag('북쪽 열병 의문');advance(0,15)}})]},
prelude_guard:{title:'성문 가까이에서 자란 사람',location:'동문 경비초소',onEnter:s=>{meet('mark')},text:s=>`${dlg('mark',isSpecies('그린 오크')?'{name}, 네가 오늘 근무는 아니지? 그 덩치 세워두면 상인들이 세금이 두 배인 줄 안다.':'{name}, 아침부터 사람 많다. 비 그쳤다고 다들 한꺼번에 기어나왔어.')}

경비병의 말은 친절하지 않지만 당신에게 완전히 낯선 말투도 아니다.`,choices:[
 choice('초소 앞 짐수레 정리를 잠깐 돕는다.','intro',{do:s=>{gainSkill('guard',1);modRel('mark',3,'아침 초소 정리를 도왔다');modRep('factions','guard',1,'초소 일을 거들었다');advance(0,15)}}),
 choice('근무는 네 일이라며 장터로 간다.','intro',{do:s=>advance(0,10)})]},
prelude_street:{title:'사람보다 먼저 움직이는 그림자',location:'동문 뒷골목',text:s=>`장터가 열리기 전부터 골목은 깨어 있다. 빵집 심부름꾼, 술이 덜 깬 경비병, 외지 상인의 짐꾼.

누가 돈을 가졌고 누가 화가 났는지 알아보는 것은 글을 읽는 것만큼이나 유용하다.`,choices:[
 choice('사람들 주머니보다 표정을 본다.','intro',{do:s=>{if(passive('socialSense',52)){flag('아침 군중 긴장 포착');gainSkill('observation',1)}advance(0,15)}}),
 choice('오늘 벌이가 될 만한 일을 찾으며 장터로 간다.','intro',{do:s=>{state.silver+=1;advance(0,20)}})]},
prelude_elf_city:{title:'거울과 다른 얼굴들',location:'동문 외곽',text:s=>`인간들과 함께 자랐지만 성문 앞에서는 가끔 자신의 귀를 먼저 의식한다. 공용어로 생각하고 공용어로 꿈꾸는데도 모르는 사람은 당신에게 엘프어로 말을 걸곤 한다.

오늘도 북쪽에서 온 엘프 상단이 들어왔다는 소문이 있다.`,choices:[
 choice('가문 인장을 보이면서 평소처럼 들어간다.','intro',{do:s=>{flag('신분 공개');advance(0,10)}}),
 choice('오늘은 같은 엘프가 있는 쪽을 일부러 지나가 본다.','intro',{do:s=>{flag('엘프에게 호기심');vec('elf',1);advance(0,15)}})]},
prelude_elf_north:{title:'인간 성벽의 안쪽',location:'동문 밖 외지상인 대기줄',text:s=>`성벽 위 인간 경비병의 말은 너무 빠르다. 숫자와 세금, 멈추라는 말은 알아듣지만 농담이 섞이면 문장이 흩어진다.

당신보다 앞줄에 선 엘프 행상인 하나가 경비병과 언성을 높이고 있다.`,choices:[
 choice('같은 엘프가 무슨 말을 하는지 먼저 듣는다.','intro',{do:s=>{modRel('laen',3,'성문 밖에서부터 그의 말을 들었다');advance(0,10)}}),
 choice('괜히 엮이지 않고 줄이 줄어들기를 기다린다.','intro',{do:s=>advance(0,15)})]},
prelude_outsider:{title:'검문대의 시선',location:'동문 외곽 검문대',text:s=>`성문 앞 경비병은 당신 차례가 되자 앞사람보다 질문을 하나 더 한다.

“어디서 왔지? 도시에 얼마나 있었고?”

익숙한 일일 수도, 오늘따라 유난한 일일 수도 있다.`,choices:[
 choice('필요한 말만 하고 통행표를 받는다.','intro',{do:s=>{advance(0,15)}}),
 choice('앞사람에게는 안 물은 질문이라고 지적한다.','intro',{do:s=>{const r=check({stat:'wis',skill:'persuasion',diff:60,label:'검문 항의'});modRel('mark',r.ok?2:-2);advance(0,20)}}),
 choice('웃으며 농담으로 넘긴다.','intro',{if:s=>secondary('socialSense')>=35,do:s=>{gainSkill('persuasion',1);advance(0,15)}})]},
prelude_smith:{title:'쇳가루 묻은 소매',location:'동문 대장간 거리',text:s=>`아침부터 대장간에서는 젖은 장작 때문에 연기가 제대로 빠지지 않는다. 스승은 당신에게 부러진 농기구 하나를 장터 손님에게 돌려주라고 한다.

금속은 사람보다 솔직하다는 생각이 들 때가 있다. 두드린 만큼 휘고, 식힌 만큼 굳는다.`,choices:[
 choice('수리 부위를 한 번 더 확인하고 나간다.','intro',{do:s=>{gainSkill('observation',1);advance(0,15)}}),
 choice('바로 장터로 향한다.','intro',{do:s=>advance(0,10)})]},
intro:{title:'비가 그친 뒤의 장터',location:'서부대륙 변경도시, 동문 장터',onEnter:s=>{meet('mark');meet('laen');if(!hasFlag('첫 장터 수동판정')){flag('첫 장터 수동판정');if(passive('perception',62))flag('동문 몸짓 포착');if(passive('socialSense',66))flag('경비병 체면 포착')}quest('market','장터의 소란','동문에서 벌어진 충돌을 어떻게든 지나가거나 해결하자.');note('서부대륙과 엘프의 왕래는 드물지만 완전히 끊긴 것은 아니다.')},text:s=>{let heard='';if(lang('elven')>=8)heard=`라엔의 말은 또렷하게 들린다. “나는 북쪽 옛길의 이름을 물었을 뿐이다. 왜 저 인간이 욕을 들었다고 생각하지?”`;else if(lang('elven')>=5)heard=`엘프의 말은 대부분 알아들을 수 있다. <span class="narrationEm">북쪽, 오래된 길, 묻다, 왜 화내나.</span> 몇 단어의 어미만 낯설다.`;else if(lang('elven')>=3)heard=`엘프 쪽 말에서는 몇 단어만 걸린다. <span class="narrationEm">북쪽… 길… 묻다… 아니다.</span> 정확한 문장은 잡히지 않는다.`;else heard=`엘프가 빠르게 무언가를 말하지만 당신에게는 자음과 긴 모음이 이어지는 낯선 소리에 가깝다. 표정과 손짓 외에는 뜻을 붙잡기 어렵다.`;let race='';if(isSpecies('엘프'))race=`사람들의 시선 몇 개가 싸우는 엘프와 당신 사이를 번갈아 오간다. 같은 종족이라는 이유만으로 당신이 그의 편일 거라고 생각하는 눈도 있다.`;else if(isSpecies('그린 오크')||isSpecies('고블린'))race=`사람들 몇은 당신이 가까워지자 반원을 조금 더 넓힌다. 이 도시에서는 사람을 설명하는 데 말보다 종족이 앞서는 순간이 있다.`;return `인간력 30년. 사흘째 퍼붓던 비가 겨우 멎은 아침이다.

당신은 <b>${s.species}, ${s.origin}</b>이다. ${s.originDesc}

동문 장터의 진흙탕 한가운데서 사람들이 반원을 만들고 서 있다. 중심에는 젖은 망토를 두른 엘프 하나와 경비병 둘. 엘프의 수레에서는 푸른 천과 말린 열매, 얇은 은세공품이 비에 젖은 채 흘러내린다.

${heard}

${race}`},choices:s=>[
 choice(isSpecies('엘프')?'엘프어로 직접 끼어든다.':'엘프어로 그에게 직접 묻는다.','market_elven_native',{if:s=>lang('elven')>=7,hint:'그가 무슨 말을 했는지 거의 그대로 이해했다.'}),
 choice('두 사람 사이로 들어가 아는 단어를 맞춰본다.','market_translate',{if:s=>lang('elven')>=3||skill('language')>=3,hint:`엘프어 ${lang('elven')}/10, 언어 감각 Lv.${skill('language')}`}),
 choice('말은 모르지만 손짓과 시선부터 읽어본다.','market_gesture',{if:s=>hasFlag('동문 몸짓 포착'),hint:'숨은 눈썰미 판정으로 상황의 이상한 점을 포착했다.'}),
 choice('경비병의 체면을 살리는 설명을 즉석에서 지어낸다.','market_bluff',{if:s=>hasFlag('경비병 체면 포착')&&(skill('deception')>=1||secondary('socialSense')>=45),hint:'사실을 아는 것은 아니지만 싸움을 멈출 말은 떠오른다.'}),
 choice('가문 이름을 대고 칼부터 집어넣게 한다.','market_noble',{if:s=>s.status.includes('귀족')||s.traits.includes('가문 인장'),hint:'진실보다 신분이 먼저 작동할 수도 있다.'}),
 choice('경비병에게 먼저 무슨 일이 있었는지 설명하라고 한다.','market_guard',{hint:'도시의 질서를 따르되, 칼부터 뽑는 것은 막는다.'}),
 choice('엘프의 짐에서 떨어진 청동 조각을 먼저 살핀다.','market_token',{if:s=>secondary('perception')>=35||stat('wis')>=45}),
 choice('상관없는 일이다. 장터 안쪽으로 빠져나간다.','market_ignore') ]},
market_elven_native:{title:'말이 통한다는 것',location:'동문 장터',onEnter:s=>{modRel('laen',isSpecies('엘프')?12:9,'첫 만남에서 엘프어로 말을 걸었다');modRel('mark',2,'싸움이 번지는 것을 막았다');publicDeed({'peoples.elf':4,'factions.merchants':2,'places.borderCity':1},'동문 장터에서 언어 오해로 번질 싸움을 통역으로 막았다','장터 상인과 행인들이');flag('엘프어 직접 통역');vec('elf',2);gainSkill('language',2);advance(0,15)},text:s=>`${dlg('laen',s=>isSpecies('엘프')?(lang('elven')>=8?'마침 잘 왔다. 저 인간은 내가 길 이름을 말할 때마다 칼자루를 잡는다.':'…같은 얼굴인데 억양은 인간 쪽이군. 그래도 알아듣는구나.'):'인간이 내 말을 이렇게 잘하는 건 드물다. 그러면 설명해줘. 나는 욕한 적 없다.')}

라엔이 찾는 것은 북문 밖 폐역참으로 이어지는 오래된 길, ‘타르 벨라’다. 엘프어에서는 오래된 길의 별칭에 가깝지만 인간 변경 방언에서는 상대의 혈통을 모욕하는 소리와 묘하게 겹친다.

당신에게는 오해가 어디서 생겼는지 처음부터 보인다. 이제 남은 건 마르크가 자기 귀를 의심할 수 있느냐는 문제다.`,choices:[
 choice('두 언어에서 왜 뜻이 갈렸는지 마르크에게 설명한다.','token_examine',{do:s=>{modRel('mark',4,'언어 차이를 구체적으로 설명했다')}}),
 choice('라엔에게 인간식으로 사과 한마디만 하라고 권한다.','token_examine',{do:s=>{modRel('mark',3);modRel('laen',-1,'옳고 그름보다 상황을 정리하자고 했다')}}),
 choice('마르크에게 네가 잘못 들은 거라고 단정한다.','token_examine',{do:s=>{modRel('mark',-4);modRel('laen',3)}})]},
market_gesture:{title:'말 없는 통역',location:'동문 장터',onEnter:s=>{const r=check({stat:'wis',skill:'observation',diff:58,label:'몸짓과 시선 읽기',bonus:Math.round((secondary('perception')-40)/3)});if(r.ok){flag('몸짓으로 길 추론');modRel('laen',6,'말을 모르면서도 상황을 읽었다');publicDeed({'peoples.elf':2,'places.borderCity':1},'말이 통하지 않는 엘프와 경비병 사이의 오해를 몸짓으로 풀었다','동문 장터 사람들이');gainSkill('observation',2)}else flag('몸짓 오판');advance(0,15)},text:s=>hasFlag('몸짓으로 길 추론')?`라엔은 계속 북쪽을 가리킨다. 경비병을 가리키는 손에는 공격성이 없고, 수레에서 낡은 청동패를 꺼내 길 표식처럼 들어 보인다.

말을 하나도 몰라도 이것만은 보인다. 그는 사람을 욕하는 게 아니라 장소를 설명하고 있다.

${dlg('mark','…뭐야. 네 말은 저게 사람한테 한 말이 아니라 길 이름이라는 거냐?')}`:`손짓만으로 뜻을 붙잡으려 하지만 확신이 생기지 않는다. 라엔이 북쪽을 가리키는 건 분명하지만, 도망가겠다는 건지 길을 묻는 건지 알 수 없다.

${dlg('mark','그 표정 보니 너도 모르잖아. 괜히 아는 척하지 마.')}`,choices:[
 choice('북쪽 지도를 펼쳐 장소 이름부터 확인한다.','token_examine',{if:s=>hasFlag('몸짓으로 길 추론'),do:s=>modRel('mark',3)}),
 choice('모르는 건 모른다고 하고 칼만 거두게 한다.','token_examine',{do:s=>{modRel('mark',1);modRel('laen',2)}}),
 choice('아는 척한 김에 “사과한다는 뜻”이라고 둘러댄다.','market_bluff',{do:s=>flag('몸짓 오판에서 거짓말')})]},
market_bluff:{title:'사실이 아니어도 싸움은 멈춘다',location:'동문 장터',onEnter:s=>{const r=check({stat:'wis',skill:'deception',diff:58,label:'즉석 중재 거짓말',bonus:Math.round((secondary('socialSense')-40)/3)});if(r.ok){flag('거짓 통역 성공');modRel('mark',5,'체면을 살려 싸움을 끝냈다');publicDeed({'places.borderCity':1,'factions.guard':1},'장터의 충돌을 말로 무마했다','장터 사람들이');state.city.panic=Math.max(0,state.city.panic-1)}else{flag('거짓 통역 들통');modRel('mark',-5,'근거 없는 말을 지어냈다')}advance(0,15)},text:s=>hasFlag('거짓 통역 성공')?`당신은 태연하게 말한다.

“북쪽 상인들이 쓰는 길 이름입니다. 발음이 여기 욕하고 비슷해서 그렇지, 저 사람은 지금 경비병을 욕한 게 아닙니다.”

사실 절반 이상은 지어낸 말이다. 하지만 마르크에게는 칼을 넣을 명분이 생긴다. 주변 사람들도 “아, 그런 거였어?” 하고 한발 물러난다.

라엔은 당신이 무슨 말을 했는지 완전히 이해하지 못한 얼굴로 쳐다본다.`:`당신이 설명을 지어내는 동안 마르크의 눈이 가늘어진다.

${dlg('mark','북쪽 상인 말? 너 북쪽 가본 적 있냐? 방금 그건 네가 만든 얘기 같은데.')}

주변 사람들이 다시 웅성거린다. 싸움을 줄이려던 말이 오히려 당신까지 사건 안으로 끌어들였다.`,choices:[
 choice('끝까지 밀어붙여 일단 둘을 떼어놓는다.','token_examine',{do:s=>{flag('거짓 통역 소문');modRel('laen',hasFlag('거짓 통역 성공')?1:-2)}}),
 choice('거짓말이었다고 인정하고 다시 처음부터 묻는다.','market_guard',{do:s=>{modRel('mark',2);gainSkill('persuasion',1)}})]},
market_noble:{title:'진실보다 먼저 작동하는 것',location:'동문 장터',onEnter:s=>{flag('장터 신분 개입');modRel('mark',hasFlag('신분 공개')?2:-1,'가문 이름으로 소란을 멈추게 했다');modRel('laen',1);publicDeed({'places.borderCity':1,'factions.guard':-1,'realms.westernHumans':1},'가문 이름을 내세워 장터의 무장을 거두게 했다','경비병과 장터 사람들이');advance(0,10)},text:s=>`가문 이름을 듣자 경비병 하나가 먼저 자세를 고친다. 마르크는 못마땅한 얼굴이지만 칼자루에서 손을 뗀다.

${dlg('mark','…알겠습니다. 일단 무기는 안 뽑죠. 하지만 통행세 확인은 해야 합니다.')}

엘프는 상황을 이해하지 못했지만, 방금 전까지 자신에게 향하던 칼이 사라진 것은 알아차린다.

권위는 문제를 해결하지 않았다. 다만 문제를 말로 다룰 시간을 샀다.`,choices:[
 choice('이제 차분히 양쪽 말을 들어본다.','market_guard'),
 choice('통행세만 확인하고 엘프를 보내라고 지시한다.','token_examine',{do:s=>{modRel('mark',-2);modRel('laen',3)}})]},
market_translate:{title:'비슷한 말, 다른 뜻',location:'동문 장터',onEnter:s=>{const r=check({stat:'int',skill:'language',diff:62,label:'공용어와 엘프 방언 대조',bonus:(lang('elven')-3)*7});if(r.ok){modRel('laen',10,'첫 만남에서 통역을 도왔다');modRel('mark',4,'칼을 뽑지 않게 했다');publicDeed({'peoples.elf':4,'factions.merchants':2,'factions.guard':1,'places.borderCity':1},'동문 장터의 언어 오해를 통역으로 풀었다','상인과 경비병들이');vec('elf',1);flag('통역 성공')}else{modRel('laen',4,'뜻은 못 풀었지만 끼어들었다');modRel('mark',-2,'괜한 참견이라고 여긴다');flag('통역 실패')}advance(0,20)},text:s=>`당신은 둘 사이로 한 걸음 들어가 손바닥을 내보인다. 경비병이 먼저 인상을 찌푸린다.

${dlg('mark',s=>hasFlag('통역 성공')?'그래. 네 말대로라면 저놈이 말한 건 모욕이 아니라… 길 이름이라고?':'못 알아듣겠으면 빠져. 괜히 더 꼬이게 하지 말고.')}
${dlg('laen',s=>hasFlag('통역 성공')?'길. 오래된 길. 나는 그 길을 찾는다. 너는… 내 말을 조금 듣는다.':'나는 싸움 아니다. 길 묻는다. 저 사람, 화낸다. 이유 모른다.')}

문제의 단어는 ‘타르 벨라’. 경비병은 그것을 ‘더러운 문’에 가까운 욕설로 들었고, 엘프는 북쪽에 있는 오래된 길목의 이름이라고 주장한다. 억양 하나 때문에 뜻이 갈라진 것이다.

소란은 잦아든다. 엘프는 젖은 짐 사이에서 부러진 청동패 하나를 꺼낸다.`,choices:[
choice('청동패를 건네받아 자세히 본다.','token_examine'),
choice('경비병이 왜 그 말을 욕설로 들었는지 더 묻는다.','guard_reason'),
choice('여기까지만 하고 장터 일을 보러 간다.','day1_hub',{do:s=>{questDone('market');advance(0,20)}})]},
market_guard:{title:'도시의 말',location:'동문 장터',onEnter:s=>{modRel('mark',5,'절차부터 확인했다');meet('mark');advance(0,15)},text:s=>`${dlg('mark','세금표를 보여달랬더니 웃더군. 그리고 북문 쪽을 가리키며 이상한 말을 했어. 우리말로 들으면 좋은 뜻은 아니야.')}

마르크는 자신이 화를 낸 이유를 꽤 조리 있게 설명한다. 적어도 취해 있거나 싸움을 만들려고 한 것은 아니다. 다만 그는 엘프가 말을 잘못했다는 가능성보다, 자신이 잘못 알아들었을 가능성을 훨씬 작게 본다.

당신이 엘프 쪽을 보면 그는 손바닥을 위로 펼친다.

${dlg('laen','세금. 안다. 냈다. 나는 길 묻는다. ‘타르 벨라’. 그 사람 얼굴 바뀐다. 왜인지 모른다.')}`,choices:[
choice('두 표현을 비교해서 뜻을 맞춰본다.','market_translate',{if:s=>lang('elven')>=3||skill('language')>=3,hint:'엘프어의 일부를 알거나 언어 감각이 높아야 한다.'}),
choice('경비병에게 세금 확인이 끝났다면 보내주자고 한다.','token_examine',{do:s=>{modRel('mark',2);modRel('laen',3)}}),
choice('엘프에게 북문 길은 위험하니 돌아가라고 충고한다.','day1_hub',{do:s=>{modRel('laen',-2);questDone('market');advance(0,20)}})]},
market_token:{title:'진흙 속의 청동',location:'동문 장터',onEnter:s=>{const r=check({stat:'wis',skill:'observation',diff:52,label:'청동 조각 관찰'});if(r.ok){flag('청동패 먼저 발견');note('청동패에는 인간 문자, 엘프 문자, 그리고 둘과 다른 긁힌 흔적이 겹쳐 있다.');item('bronze',1);modRel('laen',5,'잃어버린 청동패를 주웠다')}advance(0,10)},text:s=>`수레 바퀴 옆 진흙 속에 반달 모양의 금속이 박혀 있다. 닦아내니 청동이다. 한쪽에는 인간식 숫자와 도로 표식이, 다른 쪽에는 나뭇가지처럼 뻗은 엘프 문자가 새겨져 있다.

더 이상한 것은 그 사이를 억지로 긁어낸 듯한 세 번째 흔적이다. 글자라기엔 거칠고 흠집이라기엔 일정하다.

${dlg('laen',s=>hasItem('bronze')?'그것. 내 것 아니다. 내 할아버지의 것. 나는 돌려받으러 왔다.':'…없다. 분명 여기 떨어졌다.')}`,choices:[
choice('패를 돌려주기 전에 어디서 났는지 묻는다.','token_examine'),
choice('바로 엘프에게 돌려준다.','token_return',{do:s=>{if(hasItem('bronze'))item('bronze',-1);modRel('laen',10,'청동패를 망설임 없이 돌려줬다');vec('elf',1)}}),
choice('경비병에게 유실물로 신고한다.','token_confiscate',{do:s=>{modRel('mark',7,'유물을 신고했다');modRel('laen',-12,'가문의 물건을 빼앗겼다');publicDeed({'factions.guard':4,'peoples.elf':-6},'엘프 가문의 청동패를 경비대 유실물로 넘겼다','경비병과 엘프 상인들이');vec('guard',1);if(hasItem('bronze'))item('bronze',-1);flag('청동패 경비대 보관')}})]},
market_ignore:{title:'장터 안쪽',location:'중앙 장터',onEnter:s=>{meet('nadia');questDone('market','외면함');advance(0,20);flag('장터 방관')},text:s=>`사람이 많은 곳에서 벌어지는 싸움은 대개 누군가의 일이 된다. 당신은 그 ‘누군가’가 되지 않기로 한다.

장터 안쪽으로 들어가자 젖은 마대 냄새와 말똥 냄새가 더 진해진다. 뒤에서는 고성이 몇 차례 더 들리지만 칼이 부딪히는 소리는 나지 않는다.

${dlg('nadia','봤지? 저런 건 끼어들면 하루를 통째로 잃어. 세상일은 대부분 안 보면 지나가.')}

나디아는 그렇게 말하면서도 동문 쪽을 두 번이나 흘끗 본다.`,choices:[choice('오늘 벌이를 알아본다.','day1_hub'),choice('그래도 마음에 걸린다. 다시 동문 쪽으로 돌아간다.','token_examine',{do:s=>{modRes({spirit:-2})}})]},
token_examine:{title:'세 겹의 기록',location:'동문 장터, 경비초소 옆',onEnter:s=>{questDone('market');flag('청동패를 봄');advance(0,15)},text:s=>`엘프는 청동패를 두 손가락으로 집어 보이며 세 번 천천히 읽는다.

“라드.”

첫 번째는 인간 공용어의 ‘뿌리’와 비슷하다. 두 번째는 엘프 방언으로 ‘빚’ 혹은 ‘갚아야 할 것’에 가깝다. 세 번째 억양에서는 뜻을 짐작하기 어렵다.

${dlg('laen','우리 집에서는 ‘약속’이라고 배웠다. 여기 사람은 ‘왕의 길’이라고 한다. 같은 돌, 다른 이야기.')}

마르크는 팔짱을 낀 채 한숨을 쉰다.

${dlg('mark','북문 밖 폐역참이면 해 지기 전에 돌아와. 지난달부터 짐승이 사라지고 있어. 경비대도 밤에는 안 들어가.')}

라엔은 당신을 본다. 부탁이라기보다 값을 묻는 상인의 눈이다.`,choices:[
choice('길잡이 겸 통역을 맡는다. 은화 2닢이면 된다.','oldroad_offer',{do:s=>{state.silver+=2;modRel('laen',6,'돈을 받고 길잡이를 맡았다');vec('merchant',1);flag('라엔과 옛길 약속')}}),
choice('돈은 됐다. 대신 돌아오면 청동패의 이야기를 전부 들려달라.','oldroad_offer',{do:s=>{modRel('laen',10,'돈 대신 이야기를 요구했다');vec('scholar',1);flag('라엔과 옛길 약속')}}),
choice('오늘은 안 된다. 여관을 알려주고 헤어진다.','day1_hub',{do:s=>{modRel('laen',2);flag('라엔과 재회 가능')}})]},
guard_reason:{title:'한 단어의 역사',location:'동문 장터',onEnter:s=>{gainSkill('language',1);advance(0,15)},text:s=>`${dlg('mark','내 고향에선 그 소리를 사람한테 쓰면 싸움 난다. ‘네 뿌리가 썩었다’는 뜻이거든. 군대에서도 그걸로 칼부림 난 적 있어.')}

라엔은 한참 듣다가 고개를 기울인다.

${dlg('laen','우리 말은… ‘뿌리’가 오래된 약속. 썩은 뿌리, 나쁜 말 아니다. 끊어진 약속, 슬픈 말.')}

둘 다 거짓말을 하는 것 같지는 않다. 같은 소리에서 서로 다른 역사가 튀어나온다. 당신은 문득 언어가 단어가 아니라 기억일 수 있다는 생각을 한다.`,choices:[choice('청동패 이야기를 듣는다.','token_examine'),choice('이 정도면 충분하다. 장터로 간다.','day1_hub')]},
token_return:{title:'돌려준 것',location:'동문 장터',onEnter:s=>{questDone('market');advance(0,15)},text:s=>`라엔은 패를 받은 뒤 바로 주머니에 넣지 않는다. 손바닥 위에 올려놓고 한동안 내려다본다.

${dlg('laen','이 도시 사람들은 물건을 찾으면 값부터 말한다고 들었다. 너는 다르네. 아니면 아직 값을 모르는 건가?')}

농담인지 떠보는 말인지 알기 어렵다. 그래도 굳어 있던 입가가 아주 조금 풀린다.

그는 북문 밖의 폐역참을 가리킨다. 패가 발견된 곳이 그 근처라는 것이다.`,choices:[choice('함께 가겠다고 한다.','oldroad_offer',{do:s=>flag('라엔과 옛길 약속')}),choice('다음에 보자고 하고 오늘 일을 보러 간다.','day1_hub')]},
token_confiscate:{title:'도시의 보관물',location:'동문 경비초소',onEnter:s=>{questDone('market');advance(0,25);flag('라엔 분노')},text:s=>`마르크는 절차대로 유실물 장부를 꺼내고, 청동패를 천에 싸서 상자에 넣는다.

라엔의 얼굴이 굳는다.

${dlg('laen','그건 네 도시 물건 아니다. 내 가족 죽은 사람의 물건이다.')}
${dlg('mark','그럼 내일 신분 확인하고 찾아가. 오늘은 소란 피웠으니 절차대로 한다.')}

라엔은 더 말하지 않는다. 당신을 한 번 보고, 그 시선을 그대로 거둔다.`,choices:[choice('경비대 판단을 따른다.','day1_hub'),choice('마르크에게 최소한 오늘 안에 돌려줄 방법을 물어본다.','token_recover')]},
token_recover:{title:'장부와 사람 사이',location:'동문 경비초소',onEnter:s=>{const r=check({stat:'wis',skill:'persuasion',diff:61,label:'경비병 설득'});if(r.ok){flag('청동패 반환');modRel('mark',3,'절차 안에서 타협했다');modRel('laen',8,'뒤늦게라도 패를 돌려줬다');vec('elf',1)}else{modRel('mark',-4,'절차를 흔들려 했다')}advance(0,20)},text:s=>hasFlag('청동패 반환')?`${dlg('mark','좋아. 내가 임시 반환으로 적는다. 대신 내일 아침까지 신분 확인 안 되면 네 이름도 장부에 들어간다.')}

라엔은 말없이 패를 받아 품 안에 넣는다. 이번에는 당신을 보는 눈이 조금 다르다.`:`${dlg('mark','안 돼. 이런 걸 한 번 봐주면 다음엔 왜 저 사람은 되고 나는 안 되냐고 묻는다. 규칙은 귀찮아도 누구한테나 똑같아야 해.')}

당신은 장부의 규정과 라엔의 사정을 번갈아 설명해보지만, 경비초소에서 책임질 수 있는 선을 넘지는 못한다. 마르크는 패를 돌려주는 대신 정식 신분 확인 절차를 다시 가리킨다. 오늘 당장 되찾게 하지는 못했지만, 적어도 물건이 압수품 창고 어디에 들어가는지는 확인했다.`,choices:[choice('장터로 간다.','day1_hub')]},
oldroad_offer:{title:'약속된 오후',location:'동문 장터',onEnter:s=>{quest('oldroad','북문 밖의 오래된 길','라엔과 함께 청동패가 가리키는 폐역참을 조사한다.');note('북문 밖의 폐역참은 지금 도시보다 오래된 도로망의 일부다.');advance(0,10)},text:s=>`${dlg('laen','해가 가장 높을 때 북문. 나는 기다린다. 늦으면 혼자 간다.')}

약속은 단순하다. 오후에 북문에서 만나 폐역참까지 다녀오는 것.

그런데 장터 사람들에게 그 말을 하자 반응이 묘하다. 누군가는 오래된 길에 돈 될 만한 금속이 많다고 하고, 누군가는 비 오는 밤이면 길 아래에서 사람이 걷는 소리가 난다고 한다.`,choices:[choice('약속 시간 전까지 장터에서 일을 한다.','day1_hub'),choice('바로 북문으로 향한다.','oldroad_gate',{do:s=>advance(1,10)})]},
day1_hub:{title:'첫날의 벌이',location:'중앙 장터',onEnter:s=>{meet('nadia');meet('mara');flag('랜덤인카운터 해금')},text:s=>`정오까지는 아직 시간이 있다. 도시에서는 거대한 역사의 단서보다 오늘 저녁 한 끼가 더 비싸다.

장터 게시판에는 젖은 종이가 세 장 붙어 있다.

첫째, 남쪽 밭의 배수로를 뚫을 일꾼을 구한다. 둘째, 상점 창고의 재고를 옮길 사람이 필요하다. 셋째, 북문 성당에서 비 피해를 본 사람들에게 죽을 나눠주고 있다.

${dlg('nadia','돈 벌 거면 오늘 벌어. 비 멎은 다음 날은 손이 부족해서 품삯이 올라.')}
${dlg('mara','밭일은 두 시간. 허리 멀쩡하면 은화 세 닢. 말만 번지르르한 놈은 한 시간도 못 버틴다.')}`,choices:s=>[
choice('남쪽 밭에서 배수로를 뚫는다.','work_farm',{hint:'힘, 운동, 농사 경험이 도움이 된다.'}),
choice('나디아의 창고 일을 돕는다.','work_market',{hint:'상업과 관찰이 있으면 단순 노동 이상의 것을 배울 수 있다.'}),
choice('성당 배식 일을 돕는다.','work_church'),
choice('북문 경비초소에서 일용 경비를 구하는지 물어본다.','work_guard'),
...(hasFlag('라엔과 옛길 약속')&&state.hour<15?[choice('라엔과의 약속을 지키러 북문으로 간다.','oldroad_gate',{do:s=>advance(1,0)})]:[])
]},
work_farm:{title:'흙은 거짓말을 덜 한다',location:'도시 남쪽 밭',onEnter:s=>{const r=check({stat:'str',skill:'farming',diff:55,label:'배수로 정비'});advance(2,0);modRes({stamina:r.ok?-18:-28,spirit:r.ok?3:-2});state.silver+=r.ok?3:2;gainSkill('farming',2);modRel('mara',r.ok?8:2,'함께 밭일을 했다');publicDeed({'factions.farmers':r.ok?5:2,'places.southFarms':r.ok?3:1},r.ok?'비에 잠긴 배수로를 제대로 열었다':'남쪽 밭의 배수 작업을 끝까지 거들었다','함께 일한 농민들이');vec('farmer',2);flag('첫날 밭일')},text:s=>`비에 불어난 물이 고랑을 가득 채우고 있다. 마레나는 삽을 당신에게 던지듯 건넨다.

${dlg('mara',s=>skill('farming')>=2?'손 보니까 해본 놈이네. 물길은 가운데부터 파는 거 아냐. 끝을 먼저 열어.':'삽 잡는 손이 영 불안한데. 허리 말고 다리로 밀어.')}

두 시간 뒤, 물은 천천히 낮은 쪽으로 빠져나간다. 별것 아닌 일인데도 흙냄새를 맡고 있으면 세상이 조금 단순해진다.

마레나는 품삯을 세어주며 말한다.

${dlg('mara','북쪽 숲이 시끄럽든 교황이 뭘 하든, 사람은 먹어야 살아. 세상이 끝나도 밭 갈 놈 하나는 필요해.')}`,choices:s=>state.hour>=14&&hasFlag('라엔과 옛길 약속')?[choice('늦기 전에 북문으로 달려간다.','oldroad_gate')]:[choice('장터로 돌아간다.','day1_afterwork')]},
work_market:{title:'가격표 뒤의 사정',location:'나디아의 잡화점 창고',onEnter:s=>{const r=check({stat:'int',skill:'trade',diff:57,label:'재고 정리'});advance(2,0);modRes({stamina:-15});state.silver+=2;gainSkill('trade',2);if(r.ok){state.silver+=1;flag('북문 물가 이상');note('최근 북문을 통과하는 곡물 수레가 줄었고, 실종된 마부가 둘 있다.');vec('merchant',2)}modRel('nadia',6,'창고 일을 도왔다');modRep('factions','merchants',3,'나디아의 창고와 장부 정리를 도왔다')},text:s=>`젖은 자루를 옮기는 일은 단순하지만 장부는 그렇지 않다. 지난 열흘 동안 밀가루와 소금 가격이 조금씩 올라 있다.

${dlg('nadia',s=>hasFlag('북문 물가 이상')?'봐. 비 때문만이면 남문 가격도 같이 올라야 해. 북문에서만 물건이 끊겨. 누가 길을 막거나, 사람들이 그 길을 피한다는 뜻이지.':'거기 자루는 왼쪽. 숫자 읽을 줄 알면 장부랑 맞춰보고.')}

당신은 품삯을 받는다. 장터는 소문을 돈으로 바꾸는 곳이고, 가격표는 때로 경비대 보고서보다 정직하다.`,choices:s=>state.hour>=14&&hasFlag('라엔과 옛길 약속')?[choice('북문 약속 장소로 간다.','oldroad_gate')]:[choice('장터로 돌아간다.','day1_afterwork')]},
work_church:{title:'따뜻한 죽과 차가운 명단',location:'북문 성당 배식소',onEnter:s=>{meet('adel');meet('toma');advance(2,0);modRes({stamina:-9,spirit:5});state.food+=1;gainSkill('medicine',1);modRel('adel',5,'배식 일을 도왔다');modRel('toma',5,'함께 배식했다');publicDeed({'factions.church':3,'factions.poor':2,'places.northQuarter':1},'성당의 배식과 환자 안내를 도왔다','배식 줄에 선 사람들과 성당 사람들이');vec('church',1);flag('첫날 성당 봉사')},text:s=>`성당 마당에는 비를 맞은 사람들이 줄을 서 있다. 따뜻한 곡물죽 냄새가 난다.

${dlg('adel','그릇은 한 사람에 하나씩. 어린아이와 열이 있는 사람은 안쪽으로 보내주십시오. 이름은 묻지 않아도 됩니다.')}

부사제 아델은 생각보다 실무적이다. 기도를 시키기 전에 마른 담요 수부터 센다. 옆에서는 견습서기 토마가 명단을 적다가 계속 잉크를 번진다.

${dlg('toma','이상하지 않아요? 북문 쪽에서 온 사람만 열이 있어요. 그냥 비 맞아서 그런가… 신부님은 괜한 말 하지 말랬지만.')}`,choices:s=>[
choice('열이 있는 사람들의 공통점을 토마와 확인한다.','church_sick'),
choice('배식만 마치고 나온다.','day1_afterwork'),
...(hasFlag('라엔과 옛길 약속')?[choice('시간을 보고 서둘러 북문으로 간다.','oldroad_gate')]:[])]},
work_guard:{title:'문을 지키는 사람들',location:'북문 경비초소',onEnter:s=>{meet('orban');advance(1,30);modRes({stamina:-8});const r=check({stat:'wis',skill:'observation',diff:58,label:'출입 인원 확인'});state.silver+=2;gainSkill('guard',1);modRel('mark',5,'같은 초소에서 일했다');modRep('factions','guard',3,'북문 초소의 출입 기록을 도왔다');if(r.ok){flag('실종 마부 기록');note('북문 장부에는 들어온 수레보다 나간 수레가 세 대 많다. 돌아오지 않은 마부도 둘 있다.');vec('guard',2)}},text:s=>`마르크는 당신을 보고 피식 웃는다.

${dlg('mark','아침엔 참견꾼이더니 오후엔 돈 벌러 왔나. 좋아. 이름이랑 짐 수만 맞춰. 이상하면 나 불러.')}

초소 안쪽에서 회색 수염의 남자가 장부를 넘긴다. 경비대 부대장 오르반이다.

${dlg('orban','눈으로 본 것만 적어라. 추측은 보고서가 아니다. 다만 숫자가 안 맞으면 그건 추측이 아니라 문제다.')}

문을 드나드는 사람을 세다 보면 도시가 거대한 생물처럼 느껴진다. 곡물과 사람을 먹고, 세금과 쓰레기를 내보내는 생물.`,choices:s=>hasFlag('라엔과 옛길 약속')?[choice('근무를 마치고 라엔을 찾는다.','oldroad_gate')]:[choice('장터로 돌아간다.','day1_afterwork')]},
church_sick:{title:'같은 기침',location:'북문 성당 진료실',onEnter:s=>{const r=check({stat:'int',skill:'medicine',diff:60,label:'발열자 상태 확인'});advance(0,30);if(r.ok){flag('검은 실핏줄');note('북문 쪽에서 온 발열자 셋 모두 손톱 아래에 검은 실핏줄이 퍼져 있다.');modRel('adel',5,'환자의 이상 징후를 발견했다');vec('doctor',1)}else modRes({spirit:-2})},text:s=>`환자 셋은 서로 모르는 사람이다. 한 명은 숯장수, 한 명은 나무꾼, 한 명은 북쪽 농가의 노인.

기침과 열은 흔하다. 하지만 자세히 보면 손톱 아래로 먹물 같은 실핏줄이 얇게 번져 있다.

${dlg('adel',s=>hasFlag('검은 실핏줄')?'…이건 비 때문이 아니군요. 오늘 본 것을 밖에서 떠들지는 말아주십시오. 아직 이유를 모릅니다.':'열병은 계절마다 옵니다. 공포는 병보다 빨리 퍼지니, 모르는 것을 먼저 이름 붙이지 맙시다.')}

토마는 뒤에서 입술을 깨문다.`,choices:s=>[
choice('아델에게 북문 실종 사건과 관계가 있는지 묻는다.','church_question'),
choice('환자에게 직접 북쪽에서 무엇을 했는지 묻는다.','patient_talk'),
choice('시간이 없다. 성당을 나온다.','day1_afterwork') ]},
church_question:{title:'성당도 모르는 것',location:'북문 성당',onEnter:s=>{modRel('adel',2);advance(0,10)},text:s=>`${dlg('adel','경비대에서 실종자 두 명에 대한 협조 요청이 왔습니다. 아직 시신은 없습니다. 그리고… 지난주부터 북문 공동묘지의 흙이 두 번 꺼졌습니다.')}

그는 말을 멈추고 당신의 반응을 본다.

${dlg('adel','연결되어 있다고 말하기엔 증거가 부족합니다. 하지만 연결되어 있지 않다고 말하기에도 이상한 일이 많습니다.')}

신앙심이 아니라 판단을 요구하는 말투다.`,choices:[choice('성당이 조사한다면 돕겠다고 한다.','day1_afterwork',{do:s=>{modRel('adel',5,'조사 협력을 약속했다');vec('church',1);flag('성당 조사 약속')}}),choice('공동묘지 이야기는 너무 멀리 갔다고 말한다.','day1_afterwork',{do:s=>modRel('adel',-2)})]},
patient_talk:{title:'숲의 냄새',location:'북문 성당 진료실',onEnter:s=>{const r=check({stat:'wis',skill:'persuasion',diff:55,label:'환자에게 기억을 끌어내기'});advance(0,20);if(r.ok){flag('회색 단내');note('북쪽 숲 깊은 곳에서 썩은 꽃 같은 단내가 나고, 땅에 검은 뿌리 같은 것이 드러났다는 증언을 들었다.');vec('worldtree',1)}},text:s=>hasFlag('회색 단내')?`노인은 처음엔 아무것도 기억나지 않는다고 한다. 당신이 급하게 묻지 않고 기다리자, 마침내 입을 연다.

“냄새가 났어. 꽃 썩은 냄새. 그런데 달았어. 이상하게 달았지. 나무 뿌리가 땅 위로 올라왔는데… 검었어. 불탄 건 아니었어.”

말을 마친 뒤 그는 자신이 왜 그런 말을 했는지 후회하는 얼굴이 된다.`:`당신은 냄새와 길, 쓰러지기 직전의 광경을 하나씩 나눠 묻는다. 노인은 몇 번 입을 열었다 닫지만 끝내 고개만 젓는다. 열 때문에 기억이 흐릿한 것인지, 떠올리고 싶지 않은 것인지 판단하기 어렵다. 곁의 수녀가 더 묻지 말라는 듯 젖은 수건을 갈아준다. 지금 억지로 캐묻는다면 증언보다 환자의 기력부터 먼저 바닥날 것 같다.`,choices:[choice('성당을 나온다.','day1_afterwork')]},
day1_afterwork:{title:'오후의 갈림길',location:'중앙 장터',text:s=>`해가 조금 기울었다. 비가 그친 뒤의 도시는 종일 저마다 다른 조각을 흘리고 있었다. 아직 그 조각들을 한 문장으로 이어 붙인 사람은 없다.

주머니 사정이 조금 나아졌을 수도 있고, 그렇지 않더라도 하루치 기력은 분명 줄어 있다. 그 사이 북쪽 길에 관한 소문은 전보다 더 자주 들려오기 시작했다.

장터 한쪽에서는 아이가 “밤에 숲에서 사람이 걸어왔다”는 이야기를 하고, 어른들은 웃어넘긴다.`,choices:s=>[
...(hasFlag('라엔과 옛길 약속')?[choice('라엔과의 약속을 지킨다.','oldroad_gate')]:[choice('북문 밖 폐역참이 마음에 걸린다. 혼자 가본다.','oldroad_alone')]),
choice('오늘은 더 움직이지 않고 여관으로 간다.','night_inn'),
choice('성당에서 본 환자들이 마음에 걸린다. 다시 성당으로 간다.','night_church',{if:s=>hasFlag('첫날 성당 봉사')||hasFlag('검은 실핏줄')})]},
oldroad_gate:{title:'북문 바깥',location:'북문 밖 옛길 입구',onEnter:s=>{meet('laen');advance(0,20);flag('라엔 동행');quest('oldroad','북문 밖의 오래된 길','라엔과 함께 폐역참 아래의 흔적을 확인한다.')},text:s=>`북문을 벗어나자 도시 소리가 갑자기 멀어진다. 젖은 돌길이 숲 사이로 길게 이어진다.

라엔은 이미 와 있다. 그는 늦었는지 묻지 않고 당신의 신발부터 본다.

${dlg('laen',s=>effectiveRel('laen')>=15?(isSpecies('엘프')?'약속을 지켰네. 왔군.':'왔다. 약속, 지켰다. 좋다.'):'왔다. 좋다. 해 지기 전에 움직인다.')}

길가 표지석에는 지금 도시에서 쓰지 않는 오래된 왕실 문양이 새겨져 있다. 라엔은 그 위에 손을 얹고, 아주 작게 엘프어 노래 한 소절을 흥얼거린다.`,choices:[
choice('표지석에 손을 대본다.','oldroad_stone'),
choice('표지석의 글자를 베껴본다.','oldroad_copy',{req:{skill:'language',skillLv:1}}),
choice('라엔에게 그의 가족이 왜 이 길을 기억하는지 묻는다.','laen_family') ]},
oldroad_alone:{title:'혼자 걷는 옛길',location:'북문 밖 옛길',onEnter:s=>{advance(0,25);modRes({stamina:-6,spirit:-2});quest('oldroad','북문 밖의 오래된 길','혼자 폐역참의 흔적을 확인한다.');flag('옛길 혼자 진입')},text:s=>`혼자 나오니 숲은 생각보다 조용하다. 사람과 함께 있을 때는 듣지 못했던 물방울 소리와 가지 긁히는 소리가 지나치게 또렷하다.

반쯤 기울어진 표지석 하나가 길 옆에 서 있다. 표면에는 인간 왕실 문양이 있고, 그 아래에 누군가 나중에 덧새긴 엘프 문자가 있다.

손을 대지 않았는데도 손끝이 아주 약하게 저린다.`,choices:[choice('표지석에 손을 댄다.','oldroad_stone'),choice('글자만 확인하고 폐역참으로 간다.','oldroad_station'),choice('느낌이 좋지 않다. 도시로 돌아간다.','night_inn',{do:s=>{questDone('oldroad','중단');flag('옛길에서 후퇴')}})]},
oldroad_stone:{title:'돌이 기억하는 것',location:'옛길 표지석',onEnter:s=>{const top=Object.entries(s.resonance).sort((a,b)=>b[1]-a[1])[0][0];modResonance(top,4,-2);s.resonanceAwareness=Math.max(1,s.resonanceAwareness);modRes({mana:5,spirit:-6,stamina:-4});flag('옛길 첫 공명');note('오래된 표지석은 특정한 공명에 반응한다.');vec('underworld',1);vec('worldtree',1);advance(0,10)},text:s=>`손바닥이 돌에 닿는 순간, 차가움보다 먼저 ‘방향’이 느껴진다.

북쪽. 아래쪽. 아주 멀리.

소리는 없다. 대신 오래전 누군가 이 길에 남긴 방향감 같은 것이 손바닥을 타고 희미하게 올라온다. 길은 도시에서 북쪽으로 이어지는 동시에, 어딘가 땅속으로도 이어져 있다.

당신은 반사적으로 손을 뗀다.

${hasFlag('라엔 동행')?dlg('laen','느꼈다. 네가 느낀 얼굴이다. 우리 집 사람도 이 돌을 만지면 같은 얼굴을 했다.'):'숲은 조금도 달라지지 않았다. 그런데도 방금 전과 같은 자리에 서 있다는 감각이 흐려진다.'}`,choices:[choice('폐역참까지 계속 간다.','oldroad_station'),choice('이 감각의 정체를 더 확인한다.','oldroad_stone_deep',{req:{stat:'wis',min:55}})]},
oldroad_copy:{title:'겹쳐 쓴 길',location:'옛길 표지석',onEnter:s=>{gainSkill('language',2);item('rubbing',1);flag('옛길 탁본');vec('scholar',2);advance(0,20)},text:s=>`젖은 종이를 돌 위에 대고 숯가루를 문지르자 글자가 떠오른다.

인간 문자: “제7왕의 명으로 북방로를 닦다.”

엘프 문자: “두 번째 약속 뒤, 길을 다시 열다.”

연대는 거의 같다. 하지만 한쪽 기록에는 왕이 있고 다른 기록에는 왕이 없다.

${hasFlag('라엔 동행')?dlg('laen','봐. 우리 노래와 같다. 너희는 길을 만든 사람을 기억하고, 우리는 길을 열기로 한 약속을 기억한다.'):'두 문장이 같은 사건을 가리키는지조차 단정하기 어렵다.'}`,choices:[choice('폐역참으로 간다.','oldroad_station')]},
laen_family:{title:'라엔의 빚',location:'옛길 입구',onEnter:s=>{modRel('laen',6,'가족 이야기를 들었다');advance(0,15);flag('라엔 가족사');note('라엔의 조부는 인간력 이전 이 길을 찾아왔다가 돌아가지 못했다.')},text:s=>`${dlg('laen','할아버지는 인간력 전에 여기 왔다. 우리 마을에는 돌아오지 않았다. 죽었다고 배웠다. 그런데 스무 해 뒤, 인간 상인이 할아버지 물건을 가져왔다.')}

그 상인이 가져온 것이 청동패였다.

${dlg('laen','상인은 길 아래에서 주웠다고 했다. 우리 집은 오래 기다렸다. 나는 기다리는 것 싫다. 그래서 왔다.')}

그 말에는 모험가의 호기심보다 장례를 끝내려는 사람의 피로가 묻어 있다.`,choices:[choice('함께 끝까지 확인하겠다고 한다.','oldroad_station',{do:s=>{modRel('laen',5,'끝까지 동행하겠다고 했다');vec('elf',1)}}),choice('위험하면 바로 돌아가자고 선을 긋는다.','oldroad_station',{do:s=>modRel('laen',1)})]},
oldroad_stone_deep:{title:'한 번 더 듣는다',location:'옛길 표지석',onEnter:s=>{const r=check({stat:'wis',skill:'arcana',diff:67,label:'공명에 의식적으로 접촉'});modRes({mana:-8,spirit:-10});state.stability=clamp(state.stability-5,0,100);advance(0,10);if(r.ok){modResonance('earth',5,-2);modResonance('death',2,0);state.resonanceAwareness=Math.max(2,state.resonanceAwareness);flag('지하 맥동 감지');note('표지석 아래에서 대지의 공명과 아주 희미한 죽음의 공명이 함께 느껴진다.');vec('underworld',2)}},text:s=>hasFlag('지하 맥동 감지')?`이번에는 손을 떼지 않는다.

돌 아래에서 느껴지는 것은 길이 아니라 맥박이다. 매우 느리다. 사람의 심장이라면 한 번 뛰는 사이 계절이 바뀔 만큼 느린 맥박.

그 위에 다른 감각이 얹혀 있다. 오래된 죽음. 그러나 완전히 죽지 않은 것.

당신은 숨을 몰아쉬며 손을 뗀다.`:`당신은 한 번 더 그 감각을 붙잡으려 한다. 조금 전의 맥박을 떠올리며 호흡까지 맞춰보지만, 돌은 끝내 아무 대답도 돌려주지 않는다. 손끝에 남아 있던 방향감은 금세 흩어지고 관자놀이를 찌르는 두통만 남는다. 실패했지만 한 가지는 분명하다. 이 감각은 힘으로 오래 붙든다고 선명해지는 종류가 아니다.`,choices:[choice('폐역참으로 향한다.','oldroad_station')]},
oldroad_station:{title:'폐역참',location:'북쪽 폐역참',onEnter:s=>{advance(0,25);modRes({stamina:-5});flag('폐역참 도착')},text:s=>`폐역참은 지붕 절반이 무너져 있다. 말 매던 기둥에는 오래된 밧줄이 썩은 채 매달려 있고, 바닥에는 최근 발자국이 있다.

사람 발자국 둘. 짐승 발자국 하나. 그리고 끌려간 듯한 긴 자국.

${hasFlag('라엔 동행')?dlg('laen','새 발자국이다. 비 그친 뒤 생겼다. 우리보다 먼저 누가 왔다.'):'비가 멎은 지 몇 시간 되지 않았다. 발자국은 오늘 생긴 것이다.'}

방 안쪽 썩은 판자 틈으로 찬 바람이 올라온다.`,choices:[
choice('발자국을 자세히 살핀다.','station_tracks',{req:{stat:'wis',min:45}}),
choice('바람이 올라오는 바닥을 뜯어본다.','station_cellar'),
choice('먼저 주변에서 쓸 만한 물건을 찾는다.','station_search',{req:{skill:'observation',skillLv:1}})]},
station_tracks:{title:'들어간 사람, 나온 사람',location:'폐역참',onEnter:s=>{const r=check({stat:'wis',skill:'survival',diff:58,label:'발자국 추적'});advance(0,15);if(r.ok){flag('역참 발자국 해독');note('성인 둘이 지하로 내려갔지만, 밖으로 나온 발자국은 하나뿐이다. 나온 사람은 왼발을 끌었다.');vec('guard',1)}},text:s=>hasFlag('역참 발자국 해독')?`발자국은 단순하지 않다. 성인 둘이 함께 역참으로 들어왔다. 둘 다 신발 밑창에 도시에서 파는 못이 박혀 있다.

하지만 밖으로 나간 발자국은 하나뿐이다. 그마저도 왼발을 끌었다. 끌린 자국은 사람 몸이 아니라 자루나 짐에서 난 것 같다.

마르크가 말했던 실종 마부 둘이 떠오른다.`:`흙이 너무 젖어 발자국 가장자리가 전부 무너져 있다. 발뒤꿈치 깊이와 보폭을 비교해 몇 사람인지 갈라내 보지만, 들어온 자국과 나간 자국이 진창에서 뒤엉킨다. 다만 적어도 한 사람이 왼쪽으로 무게를 심하게 실었다는 흔적만 어렴풋이 남아 있다. 그 이상을 확신하면 추적이 아니라 추측이 된다.`,choices:[choice('바닥 아래로 내려간다.','station_cellar')]},
station_search:{title:'버려진 것',location:'폐역참',onEnter:s=>{item('torch',1);state.silver+=1;gainSkill('observation',1);advance(0,15);flag('역참 수색')},text:s=>`무너진 선반 아래에서 마른 기름천과 짧은 횃불 하나를 찾는다. 구석에는 은화 한 닢이 떨어져 있다.

그리고 벽 틈에 눌린 종이 조각. 글씨는 번졌지만 날짜만은 읽힌다. 사흘 전.

“…북쪽에서 돌아오는 길, 말이 자꾸 땅을 보고 멈춘다. 밤에는 역참을 쓰지 말 것…”

마지막 줄은 찢겨 있다.`,choices:[choice('지하로 내려간다.','station_cellar')]},
station_cellar:{title:'계단 아래',location:'폐역참 지하 계단',onEnter:s=>{advance(0,10);modRes({spirit:-3});if(!hasItem('torch'))modRes({spirit:-2})},text:s=>`썩은 널빤지를 걷어내자 돌계단이 드러난다. 계단은 역참의 저장고보다 훨씬 깊다.

다섯 칸, 열 칸, 스무 칸.

벽돌 양식이 중간부터 달라진다. 위쪽은 인간식 회반죽, 아래쪽은 틈이 거의 없는 회색 석재다.

${hasFlag('라엔 동행')?dlg('laen','이 아래는 역참 아니다. 역참이 나중에 위에 지어진 것.'):'바람에는 흙냄새보다 금속과 썩은 꽃 같은 단내가 섞여 있다.'}

끝에는 작은 석실과 검게 변색된 문이 있다.`,choices:[choice('벽의 기록부터 읽는다.','station_record'),choice('검은 문에 가까이 간다.','station_blackdoor'),choice('여기까지다. 표시만 해두고 돌아간다.','station_retreat')]},
station_record:{title:'같은 길을 다르게 부른 사람들',location:'폐역참 지하 기록벽',onEnter:s=>{const r=check({stat:'int',skill:'language',diff:60,label:'혼합문자 해독'});advance(0,25);if(r.ok){flag('혼합문자 해독');gainSkill('history',2);note('인간 기록은 왕명으로 길을 닦았다고 하고, 엘프 기록은 약속으로 길을 열었다고 한다. 더 오래된 제3의 문자는 양쪽 기록 아래에 이미 존재했다.');vec('scholar',3);item('rubbing',1)}},text:s=>hasFlag('혼합문자 해독')?`벽의 두 기록은 거의 같은 위치를 가리키면서 전혀 다른 이야기를 한다.

인간식 표기: “제7왕의 명 아래 길을 열고, 북방의 문을 봉한다.”

엘프식 표기: “두 번째 약속으로 길을 열고, 아래에서 올라오는 숨을 잠재운다.”

그리고 그 아래. 두 기록보다 먼저 새겨진 제3의 문자가 있다. 인간도 엘프도 그것을 덮어쓰듯 자기 글자를 새겼다.

${hasFlag('라엔 동행')?dlg('laen','우리가 먼저도 아니고, 너희가 먼저도 아니다. 그럼 누가 길을 만들었지?'):'기록의 주인은 둘이 아니라 셋이었다.'}`:`먼저 인간 문자와 엘프 문자를 따로 떼어 읽어보지만, 훼손된 부분과 서로 덮어쓴 획 때문에 문장이 자꾸 끊긴다. ‘왕’, ‘약속’, ‘아래’, ‘숨’ 같은 단어는 분명히 보인다. 문제는 그것들이 같은 문장에 있었는지, 서로 다른 시대의 기록인지 확신할 수 없다는 점이다. 당신은 읽을 수 있는 글자만 탁본에 표시하고 해석은 빈칸으로 남긴다. 적어도 인간과 엘프가 같은 벽에 각자의 기록을 겹쳐 남겼다는 사실만은 틀리지 않는다.`,choices:[choice('검은 문을 조사한다.','station_blackdoor'),choice('기록만 가지고 돌아간다.','station_retreat')]},
station_blackdoor:{title:'문 너머의 의미',location:'폐역참 지하 검은 문',onEnter:s=>{modRes({spirit:-8,mana:3});state.stability=clamp(state.stability-3,0,100);flag('검은 문 조우');vec('underworld',2);advance(0,10)},text:s=>`검은 문에는 손잡이가 없다. 돌도 금속도 아닌 표면에 아주 얕은 홈이 아홉 개 있다.

가까이 서자 말이 아니라 의미가 먼저 머릿속으로 스며든다.

빛.
어둠.
불.
물.
대지.
생명.
죽음.
전기.
바람.

아홉 개의 감각이 차례로 지나간 뒤, 마지막에 아무 이름도 붙지 않은 빈자리가 남는다.

${hasFlag('라엔 동행')?dlg('laen','네 얼굴이 변했다. 문에서 떨어져. 이건 우리 약속에 없었다.'):'당신의 손바닥이 뜨거워진다.'}`,choices:[
choice('문에 손을 댄다.','blackdoor_touch'),
choice('아홉 개의 홈만 기록하고 물러난다.','station_retreat',{do:s=>{flag('아홉 홈 기록');vec('scholar',1)}}),
choice('라엔이 있다면 먼저 그의 반응을 묻는다.','blackdoor_laen',{if:s=>hasFlag('라엔 동행')})]},
blackdoor_laen:{title:'엘프가 모르는 것',location:'검은 문 앞',onEnter:s=>{modRel('laen',4,'문 앞에서 그의 판단을 물었다');advance(0,10)},text:s=>`${dlg('laen','우리 노래에는 아홉 목소리가 나온다. 신이라고 부르는 것은 너희 방식. 우리는 오래된 힘이라고 배웠다.')}

그는 문에 가까이 가지 않는다.

${dlg('laen','하지만 노래 끝에는 항상 한 박자가 빈다. 아이 때는 숨 쉬는 자리라고 생각했다. 지금은… 모르겠다.')}

아홉 다음의 빈자리. 당신이 방금 느낀 것과 같다.`,choices:[choice('그래도 문에 손을 댄다.','blackdoor_touch'),choice('지금은 돌아가자.','station_retreat')]},
blackdoor_touch:{title:'열 번째 빈자리',location:'검은 문 앞',onEnter:s=>{const r=check({stat:'wis',skill:'arcana',diff:70,label:'이름 없는 공명 견디기'});modRes({mana:-10,spirit:-14});state.stability=clamp(state.stability-(r.ok?7:13),0,100);advance(0,5);state.resonanceAwareness=Math.max(2,state.resonanceAwareness);if(r.ok){flag('열번째 빈자리 감지');modResonance('dark',2);modResonance('life',2);modResonance('death',2);note('아홉 공명 뒤에는 이름이 없는 빈자리가 있다. 그것은 단순한 부재가 아니라 무엇인가 들어갈 자리처럼 느껴졌다.');vec('demigod',2);vec('creator',1)}else{flag('검은 문 화상');modRes({hp:-12});vec('underworld',2)}},text:s=>hasFlag('열번째 빈자리 감지')?`손이 닿는 순간 아홉 감각이 한꺼번에 밀려온다. 서로 싸우는 힘이 아니라, 거대한 원의 아홉 점처럼 느껴진다.

그리고 원의 중심이 비어 있다.

비어 있는데도 완전히 비어 있지 않다. 아직 이름을 얻지 못한 무언가가 그 자리를 향해 아주 느리게 모이고 있다.

당신은 그것을 ‘본’ 것이 아니라, 태어나기 전의 심장 박동을 잘못 들은 것처럼 느낀다.

문은 열리지 않는다.`:`손바닥에서 통증이 폭발한다. 검은 표면이 뜨거운 것도 아닌데 살이 데인 것처럼 붉어진다.

아홉 개의 감각이 뒤엉켜 지나가고, 마지막에는 무엇도 남지 않는다.`,choices:[choice('즉시 손을 떼고 지상으로 올라간다.','station_retreat')]},
station_retreat:{title:'해 지기 전의 귀환',location:'북문으로 돌아가는 옛길',onEnter:s=>{questDone('oldroad');advance(1,10);modRes({stamina:-8});flag('옛길 귀환')},text:s=>`지상으로 올라오니 해가 나무 사이에 걸려 있다. 짧게 다녀온 것 같은데 도시까지 돌아갈 시간을 계산하면 마음이 급해진다.

${hasFlag('라엔 동행')?dlg('laen',s=>effectiveRel('laen')>=25?'오늘 본 것, 나는 아무한테나 말하지 않는다. 너도 누구에게 말할지 고르는 게 좋다.':'도시 사람들에게 말하면 문을 열까, 막을까? 어느 쪽일지 모르겠군.'):'혼자였다는 사실이 이제야 무겁게 느껴진다.'}

북문이 보일 즈음, 성당 종이 세 번 울린다. 평소 시각을 알리는 방식이 아니다.`,choices:[choice('북문으로 곧장 간다.','northgate_return'),choice('라엔과 헤어지고 여관으로 우회한다.','night_inn',{if:s=>hasFlag('라엔 동행'),do:s=>modRel('laen',1)})]},
northgate_return:{title:'북문의 검문',location:'북문 검문소',onEnter:s=>{meet('adel');meet('orban');advance(0,20);quest('report','무엇을 말할 것인가','경비대와 성당이 북쪽의 이상 현상을 조사하고 있다. 옛길에서 본 것을 어디까지 말할지 결정하자.')},text:s=>`북문 안쪽에 평소보다 많은 경비병이 서 있다. 마르크 옆에는 부사제 아델과 오르반 부대장이 있다.

${dlg('mark','{name}. 아침엔 장터, 오후엔 폐역참. 오늘 네 이름이 장부에 너무 많이 보인다.')}
${dlg('orban','해 질 무렵 북쪽에서 빛이 올라왔다. 네가 그쪽에서 돌아왔다는 증언이 있다. 본 것을 순서대로 말해라.')}
${dlg('adel','모르는 것은 모른다고 하셔도 됩니다. 다만 지금은 숨긴 사실 하나가 다른 사람의 목숨이 될 수 있습니다.')}`,choices:[
choice('벽의 기록과 검은 문까지 사실대로 말한다.','report_truth'),
choice('기록은 말하지만 공명과 문에 손댄 일은 숨긴다.','report_partial'),
choice('폐역참에 갔지만 아무것도 없었다고 한다.','report_lie',{req:{skill:'deception',skillLv:1}}),
choice('라엔의 물건을 찾으러 갔을 뿐이라며 그를 보호한다.','report_protect',{if:s=>hasFlag('라엔 동행')})]},
report_truth:{title:'사실의 값',location:'북문 검문소',onEnter:s=>{questDone('report');modRel('adel',10,'옛길의 사실을 숨기지 않았다');modRel('orban',7,'조사에 협조했다');modRel('mark',4);vec('church',2);vec('guard',1);flag('옛길 공식 보고');advance(0,30);if(hasFlag('열번째 빈자리 감지')){state.resonanceAwareness=Math.max(2,state.resonanceAwareness);modRel('adel',4,'이름 없는 공명까지 고백했다')}},text:s=>`당신은 순서대로 말한다. 표지석, 겹쳐진 기록, 지하 계단, 검은 문, 아홉 개의 홈. 그리고 자신이 느낀 것까지.

아델은 중간에 끊지 않는다. 오르반은 두 번 확인 질문을 한다.

${dlg('orban','좋다. 내일부터 폐역참은 출입 금지다. 사실이면 병력을 보내고, 사실이 아니어도 위험한 곳이란 뜻은 같다.')}
${dlg('adel',s=>hasFlag('열번째 빈자리 감지')?'아홉 다음에 빈자리가 있었다고 하셨지요. 그 표현은… 경전 어디에도 없습니다. 내일 아침 성당으로 와주십시오.':'아홉 개의 홈이라. 신들의 상징과 수가 맞습니다. 우연이라고 보기엔 불편하군요.')}`,choices:[choice('여관으로 돌아간다.','night_inn')]},
report_partial:{title:'말하지 않은 한 부분',location:'북문 검문소',onEnter:s=>{questDone('report');modRel('adel',3,'기록을 보고했다');modRel('orban',5,'폐역참 위치를 알렸다');if(hasFlag('검은 문 조우'))flag('공명 은폐');vec('guard',1);advance(0,25)},text:s=>`당신은 기록과 지하 석실까지 말한다. 검은 문은 오래된 봉인처럼 보였다고만 한다. 손을 댄 일과 머릿속을 스친 아홉 감각은 빼놓는다.

${dlg('orban','내일 사람을 보내겠다. 오늘 밤은 북문 밖 출입 금지다.')}

아델은 당신의 손을 잠깐 본다. 만약 문에 닿았던 손이 아직 붉다면, 그가 보지 못했기를 바랄 뿐이다.`,choices:[choice('여관으로 간다.','night_inn')]},
report_lie:{title:'없는 일이 된 오후',location:'북문 검문소',onEnter:s=>{const r=check({stat:'wis',skill:'deception',diff:64,label:'조사관 앞에서 거짓말'});questDone('report');advance(0,25);if(r.ok){flag('옛길 거짓보고');modRel('orban',-2);modRel('adel',-2);vec('underworld',1)}else{flag('거짓말 들킴');modRel('orban',-15,'공식 조사에서 거짓말했다');modRel('adel',-8,'중요한 사실을 숨겼다');state.city.guard-=5}},text:s=>hasFlag('거짓말 들킴')?`${dlg('orban','거짓말은 좀 더 잘하는 사람한테 맡겨. 네 신발에 지하 석회가 묻어 있다. 내일부터 북문 근처 얼씬하지 마라.')}

아델은 아무 말도 하지 않는다. 그 침묵이 꾸지람보다 불편하다.`:`당신은 무너진 역참만 보고 돌아왔다고 말한다. 오르반은 오래 쳐다보다가 더 묻지 않는다.

아델은 믿은 것 같지 않지만, 증거도 없다.`,choices:[choice('여관으로 간다.','night_inn')]},
report_protect:{title:'누구의 비밀인가',location:'북문 검문소',onEnter:s=>{questDone('report');modRel('laen',8,'공식 조사에서 라엔을 보호했다');modRel('orban',-5);modRel('adel',-3);vec('elf',2);flag('라엔 보호 진술');advance(0,25)},text:s=>`당신은 청동패와 라엔의 가족사까지만 말한다. 폐역참 아래의 기록은 오래된 묘지 비슷한 것이었고 위험한 것은 없었다고 덧붙인다.

오르반은 라엔을 길게 본다.

${dlg('orban','외지인 때문에 도시 사람이 다치면 네가 책임질 수 있나?')}
${dlg('laen',s=>effectiveRel('laen')>=30?'그 책임, 내가 진다. 이 사람 아니다.':'내가 찾아온 길이다. 이 사람에게 책임 묻지 마라.')}

그 말이 상황을 낫게 만들었는지는 모르겠다.`,choices:[choice('라엔과 함께 여관으로 간다.','night_inn',{do:s=>flag('라엔 여관 동행')})]},
night_inn:{title:'첫날 밤',location:'북문 여관',onEnter:s=>{meet('bram');advance(0,20);questDone('market');},text:s=>`북문 여관은 평소보다 일찍 문을 닫을 준비를 한다. 젖은 망토들이 난롯가에 널려 있고, 사람들은 목소리를 낮춘 채 북쪽 이야기를 한다.

${dlg('bram','나갈 거면 지금 나가. 빗장 걸고 나면 새벽까지 안 열어.')}

구석 테이블에서는 상인 둘이 실종된 마부 이야기를 하고, 다른 쪽에서는 누군가 “숲에서 죽은 사슴이 걸어다녔다”고 우긴다.

당신도 피곤하다. 몸이 피곤한지, 오늘 본 것 때문에 머리가 피곤한지 구분하기 어렵다.`,choices:s=>[
choice('따뜻한 식사를 하고 일찍 잔다.','day2_morning',{do:s=>{if(state.silver>=1){state.silver--;state.food++;}rest(8)}}),
choice('여관 손님들의 소문을 더 듣는다.','inn_rumors'),
choice('성당 종이 왜 세 번 울렸는지 확인하러 간다.','night_church'),
...(hasFlag('라엔 여관 동행')?[choice('라엔과 늦게까지 이야기를 나눈다.','laen_night')]:[])]},
inn_rumors:{title:'술잔 사이의 사실',location:'북문 여관 1층',onEnter:s=>{const r=check({stat:'wis',skill:'observation',diff:55,label:'소문에서 공통점 찾기'});advance(1,0);state.silver=Math.max(0,state.silver-1);if(r.ok){flag('북문 세 사건 연결');note('실종 마부, 검은 실핏줄 발열, 숲의 동물 이상이 모두 북문에서 반나절 거리 안에서 벌어졌다.');vec('scholar',1)}meet('varik')},text:s=>`술 한 잔 값을 내고 세 테이블을 옮겨다니며 듣는다.

실종된 마부 둘. 병든 나무꾼 셋. 사라진 사냥개. 공동묘지의 꺼진 흙. 서로 다른 소문인데 지도 위에 놓으면 전부 북문에서 반나절 거리 안이다.

그때 맞은편 자리에 처음 보는 남자가 앉는다.

${dlg('varik','사람들은 이상한 일이 생기면 전부 하나의 원인을 찾더군. 편해서 그래. 실제 세상은 보통 여러 나쁜 일이 한꺼번에 일어나지.')}

그는 자기 술잔을 들지 않는다.`,choices:[choice('당신은 누구냐고 묻는다.','varik_intro'),choice('상대하지 않고 방으로 올라간다.','day2_morning',{do:s=>rest(7)})]},
varik_intro:{title:'바릭이라는 사람',location:'북문 여관 1층',onEnter:s=>{meet('varik');advance(0,20)},text:s=>`${dlg('varik','바릭. 일은… 필요할 때마다 다르게 하지. 어제는 짐꾼, 오늘은 여행자, 내일은 시체 닦는 사람이 될 수도 있고.')}

웃는데 농담처럼 들리지 않는다.

${dlg('varik','북쪽 가봤나? 얼굴에 그쪽 냄새가 묻어 있어. 조언 하나 하지. 문은 닫혀 있을 때보다 열고 싶은 사람이 생겼을 때 위험해.')}

당신이 되묻기 전에 그는 자리에서 일어난다.`,choices:[choice('브람에게 저 사람이 누구인지 묻는다.','varik_check'),choice('방으로 올라가 잔다.','day2_morning',{do:s=>rest(7)})]},
varik_check:{title:'기억에 없는 손님',location:'북문 여관',onEnter:s=>{modRel('bram',2);advance(0,10);flag('바릭 미등록')},text:s=>`${dlg('bram','바릭? 그런 이름으로 방 준 적 없는데.')}

방금 앉아 있던 자리에는 빈 의자만 있다. 출입문은 이미 안에서 빗장이 걸려 있다.

브람은 당신 표정을 보고 욕을 작게 삼킨다.

${dlg('bram','오늘은 그냥 자. 세상에 설명 안 되는 일이 생겼다고 밤새 설명하려 들면 사람 먼저 미쳐.')}`,choices:[choice('방으로 올라가 잔다.','day2_morning',{do:s=>rest(7)})]},
night_church:{title:'밤의 성당',location:'북문 성당',onEnter:s=>{meet('adel');meet('iren');advance(0,25);flag('밤 성당 방문')},text:s=>`성당 문은 닫혀 있지 않다. 안쪽 회랑에 들것 세 개가 놓여 있고, 낮에 보지 못한 사람이 환자의 팔을 씻고 있다.

회색 머리를 뒤로 묶은 젊은 의사. 손놀림이 놀라울 만큼 빠르고 부드럽다.

${dlg('iren','{name} 씨, 잡아주실래요? 이 사람 깨면 자기 혀부터 깨물 겁니다.')}

환자의 팔에는 검은 실핏줄이 손목을 넘어 올라와 있다.

${dlg('adel','이렌 선생입니다. 오늘 오후 도시에 들어왔습니다. 운이 좋았다고 해야겠지요.')}`,choices:[choice('환자를 붙잡고 치료를 돕는다.','doctor_help'),choice('이렌에게 이 병을 아는지 묻는다.','doctor_question'),choice('오늘은 너무 많은 일을 봤다. 돌아가 쉰다.','day2_morning',{do:s=>rest(7)})]},
doctor_help:{title:'사람을 살리는 손',location:'북문 성당 진료실',onEnter:s=>{const r=check({stat:'dex',skill:'medicine',diff:60,label:'치료 보조'});advance(1,0);modRes({stamina:-7,spirit:-4});gainSkill('medicine',2);modRel('iren',r.ok?9:4,'첫 치료를 함께했다');vec('doctor',2);flag('이렌 치료 보조');if(r.ok)item('tonic',1)},text:s=>`환자가 경련할 때마다 팔에서 검은 선이 더 짙어진다. 이렌은 칼끝으로 상처를 넓히고 피를 조금 빼낸 뒤, 뜨거운 물과 냄새 강한 약초를 붓는다.

잔인해 보이지만 손은 망설이지 않는다.

${dlg('iren',s=>skill('medicine')>=2?'손 좋네요. 사람 살릴 때 필요한 건 마음보다 손인 순간이 많습니다.':'겁나면 환자 얼굴 말고 제 손을 보세요. 따라 하면 됩니다.')}

치료가 끝나자 검은 선이 아주 조금 옅어진다.

${dlg('iren','완치 아닙니다. 시간을 산 거예요. 그게 의사가 하는 일의 절반이죠.')}`,choices:[choice('병의 정체를 묻는다.','doctor_question'),choice('여관으로 돌아가 잔다.','day2_morning',{do:s=>rest(6)})]},
doctor_question:{title:'이렌의 가설',location:'북문 성당 진료실',onEnter:s=>{modRel('iren',4,'병에 관심을 보였다');advance(0,20);note('이렌은 검은 실핏줄이 전염병보다는 외부 물질이나 기생성 반응에 가깝다고 본다.')},text:s=>`${dlg('iren','병이라고 부르기엔 이상합니다. 열은 결과고, 원인은 몸 안에서 뭔가가 자라는 쪽에 가까워요.')}

그는 환자 손톱에서 긁어낸 검은 가루를 유리병에 넣는다.

${dlg('iren','전염되는지는 아직 몰라요. 물로 옮는지, 상처로 옮는지, 아예 전염이 아닌지도. 그래서 지금 제일 위험한 건 모르는 걸 아는 척하는 겁니다.')}

아델이 옆에서 낮게 말한다.

${dlg('adel','내일 아침 경비대와 성당이 북쪽 지역을 함께 확인할 예정입니다. 원하신다면 동행을 요청하겠습니다.')}`,choices:[choice('조사에 참여하겠다고 한다.','day2_morning',{do:s=>{flag('합동조사 참여');modRel('adel',4);rest(6)}}),choice('아직 결정하지 않겠다고 한다.','day2_morning',{do:s=>rest(6)})]},
laen_night:{title:'엘프의 노래에는 왕이 없다',location:'북문 여관 다락방',onEnter:s=>{modRel('laen',8,'가문의 노래를 들었다');advance(1,0);vec('elf',2);note('엘프의 오래된 노래에서는 인간 기록의 제7왕이 등장하지 않고, 이름 없는 두 존재의 약속만 남아 있다.')},text:s=>`라엔은 사람들 눈을 피해 다락방 창가에 앉는다. 청동패를 손가락으로 돌리다가 아주 낮게 노래한다.

가사는 절반도 알아듣지 못한다. 그러나 반복되는 단어는 들린다. 길, 약속, 뿌리, 귀환.

${dlg('laen','너희 기록의 왕은 우리 노래에 없다. 왕 대신 둘이 나온다. 하나는 서쪽에서, 하나는 나무에서 왔다고 한다.')}

“나무에서?”

${dlg('laen','큰 나무. 아주 큰 나무. 지금은 노래로만 안다. 우리 어른은 그 이름을 함부로 말하지 않는다.')}

세계수라는 단어는 아직 나오지 않는다. 그러나 당신은 이상하게 그 의미를 짐작한다.`,choices:[choice('노래의 문장을 더 배운다.','day2_morning',{do:s=>{gainSkill('language',3);rest(6)}}),choice('더 묻지 않고 잔다.','day2_morning',{do:s=>rest(6)})]},
day2_morning:{title:'둘째 날, 종이 울리기 전',location:'북문 여관 앞',onEnter:s=>{if(state.day<2){state.day=2;state.hour=7;state.minute=10}state.city.infection=Math.max(state.city.infection,8);quest('day2','북쪽의 이상','실종, 발열, 폐역참의 흔적이 하나의 사건인지 확인한다.')},text:s=>`새벽부터 북문이 시끄럽다. 경비대가 외출 인원을 통제하고, 성당 사람들은 물통과 들것을 나른다.

밤사이 북쪽 농가 한 곳에서 사람이 사라졌다. 대신 마당에서 죽은 염소 두 마리가 발견됐는데, 둘 다 목이 부러진 채 집 문 앞까지 기어온 흔적이 있다고 한다.

${dlg('mark',s=>effectiveRel('mark')>=10?'{name}, 잘 잤냐. 나는 못 잤다. 오늘 북쪽 가면 어제보다 재미없을 거야.':'{name}, 밖에 나갈 거면 이름부터 적어. 오늘부터 북문 출입 통제다.')}

도시는 아직 평소처럼 장사를 시작하지만, 사람들의 눈은 자꾸 북문을 향한다.`,choices:s=>[
...(hasFlag('합동조사 참여')||effectiveRel('adel')>=8?[choice('경비대와 성당의 합동조사에 참여한다.','day2_expedition')]:[choice('합동조사대에 자원한다.','day2_join')]),
choice('북쪽은 위험하다. 남쪽 밭에서 일을 구한다.','day2_farm'),
choice('장터 가격이 어떻게 변하는지 확인한다.','day2_market'),
choice('이렌을 찾아 환자 상태를 확인한다.','day2_clinic') ]}
});

Object.assign(scenes,{
day2_join:{title:'자원자',location:'북문 경비초소',onEnter:s=>{const r=check({stat:'wis',skill:'persuasion',diff:54,label:'조사대 합류 요청',bonus:Math.round(rep('factions','guard')/4)+Math.round(rep('factions','church')/8)});advance(0,20);if(r.ok){flag('합동조사 참여');modRel('mark',3,'합동조사에 자원했다');modRel('orban',2,'합동조사에 자원했다');modRep('factions','guard',2,'북쪽 합동조사에 자원했다');vec('guard',1)}},text:s=>hasFlag('합동조사 참여')?`${dlg('orban','좋다. 인원이 모자라는 건 사실이다. 대신 지시를 어기면 바로 돌려보낸다.')}

마르크가 짧은 창 하나를 건네며 끈을 확인한다.

${dlg('mark','영웅 놀이 하려는 거면 지금 빠져. 오늘은 잃어버린 사람 찾으러 가는 거다.')}`:`${dlg('orban','민간인을 위험 지역에 데려갈 이유가 없다. 북문 안에서 도울 일이 생기면 부르겠다.')}

당신은 어제 본 일과 자신이 할 수 있는 일을 더 설명하지만 오르반의 표정은 바뀌지 않는다. 사람이 모자란 것과 준비되지 않은 민간인을 위험지에 데려가는 것은 다른 문제라는 판단이다. 대신 북문 안쪽에서 필요한 일이 생기면 이름을 올려두겠다고 한다. 합류에는 실패했지만 경비대가 당신을 완전히 무시하는 단계에서는 벗어났다.`,choices:s=>hasFlag('합동조사 참여')?[choice('조사대와 함께 출발한다.','day2_expedition')]:[choice('이렌의 진료실로 간다.','day2_clinic'),choice('장터로 간다.','day2_market')]},
day2_expedition:{title:'북쪽 농가로',location:'북문 밖 북쪽 농로',onEnter:s=>{meet('orban');meet('adel');meet('iren');advance(1,10);modRes({stamina:-9});quest('expedition','사라진 농가 사람','북쪽 농가에서 사라진 사람과 죽은 가축의 원인을 조사한다.')},text:s=>`조사대는 크지 않다. 오르반과 마르크를 포함한 경비병 넷, 아델과 토마, 의사 이렌, 그리고 당신.

길가의 나무에는 비가 말라가는데, 북쪽으로 갈수록 새소리가 줄어든다.

${dlg('orban','두 명씩 짝을 맞춘다. 뭔가 보여도 혼자 따라가지 마라.')}
${dlg('iren','시체가 있으면 먼저 만지지 말아주세요. 살아 있는 사람도요. 제가 보기 전까지는.')}
${dlg('toma','살아 있는 사람도 만지지 말라고요? 그럼 넘어지면 어떻게… 아, 네. 알겠습니다.')}

긴장 속에서도 토마의 말에 마르크가 코웃음을 친다.`,choices:[
choice('마르크와 농가 외곽을 살핀다.','farmstead_guard'),
choice('이렌과 죽은 염소를 조사한다.','farmstead_goat'),
choice('아델과 집 안을 확인한다.','farmstead_house') ]},
farmstead_guard:{title:'울타리 너머의 발자국',location:'북쪽 농가 외곽',onEnter:s=>{const r=check({stat:'wis',skill:'survival',diff:58,label:'외곽 흔적 추적'});advance(0,30);modRel('mark',4,'농가 외곽을 함께 수색했다');if(r.ok){flag('맨발 흔적');note('농가에서 숲으로 향한 맨발 자국은 성인 하나이며, 발바닥 상처가 있는데도 보폭이 일정하다.');vec('guard',1)}},text:s=>`울타리 바깥 진흙에는 신발 자국과 맨발 자국이 뒤섞여 있다.

${dlg('mark',s=>skill('survival')>=2?'너도 보이냐? 발바닥이 찢어졌는데 보폭이 안 흐트러져. 아픈 사람 걸음이 아니다.':'난 추적 전문은 아니야. 그래도 이건 이상하지. 맨발로 저 숲까지 갔다고?')}

흔적은 북쪽 숲으로 곧게 이어진다. 중간에 멈춘 흔적도, 돌아본 흔적도 없다.

마르크는 창을 고쳐 쥔다.`,choices:[choice('흔적을 따라 숲 가장자리까지 간다.','forest_edge'),choice('먼저 본 것을 오르반에게 보고한다.','farmstead_converge')]},
farmstead_goat:{title:'죽었는데 움직인 흔적',location:'북쪽 농가 마당',onEnter:s=>{const r=check({stat:'int',skill:'medicine',diff:61,label:'가축 사체 검사'});advance(0,35);modRel('iren',5,'가축 사체를 함께 조사했다');gainSkill('medicine',2);if(r.ok){flag('사후 근육 반응');note('염소는 목이 부러진 뒤에도 상당 시간 움직였다. 신경계가 죽은 뒤에도 외부 자극에 반응한 흔적이 있다.');vec('doctor',2)}},text:s=>`이렌은 염소 털을 밀어내고 목뼈를 손가락으로 누른다.

${dlg('iren','여기서 이미 죽었어요. 문제는 그 다음입니다.')}

마당의 진흙에는 앞다리로 몸을 끌고 온 자국이 길게 남아 있다.

${dlg('iren',s=>hasFlag('사후 근육 반응')?'신경이 끊긴 뒤에도 근육이 자극을 받았어요. 전염병이라는 말은 잠깐 접어두죠. 몸을 움직이는 다른 원인이 있을 수 있습니다.':'죽은 뒤 움직였다는 말은 조심해야 해요. 사람이 본 순서를 잘못 기억했을 수도 있으니까.')}

그는 검은 가루를 염소 잇몸에서도 긁어낸다.`,choices:[choice('검은 가루의 출처를 추적해보자고 한다.','forest_edge'),choice('오르반에게 즉시 격리를 제안한다.','farmstead_quarantine')]},
farmstead_house:{title:'식탁 위의 네 번째 그릇',location:'북쪽 농가 내부',onEnter:s=>{const r=check({stat:'wis',skill:'observation',diff:56,label:'집 안의 생활 흔적'});advance(0,30);modRel('adel',4,'집 안을 함께 조사했다');if(r.ok){flag('농가 네번째 사람');note('실종 신고는 세 명이지만 식탁에는 네 사람 몫이 있었고, 네 번째 침상은 최근까지 사용됐다.');vec('scholar',1)}},text:s=>`집 안은 싸운 흔적이 없다. 의자가 넘어지지도 않았고 돈도 그대로다.

아델은 식탁 앞에서 멈춘다.

${dlg('adel',s=>hasFlag('농가 네번째 사람')?'신고서에는 세 식구라고 되어 있습니다. 그런데 그릇은 넷이군요. 침상도 하나 더 있습니다.':'가져간 물건이 거의 없습니다. 스스로 나갔다면 왜 외투를 두고 갔을까요.')}

벽에는 빛의 상징이 조그맣게 걸려 있다. 그 아래에 누군가 숯으로 원 하나를 그리고 아홉 점을 찍었다가 급하게 지운 흔적이 있다.`,choices:[choice('지워진 그림을 아델에게 보여준다.','house_symbol'),choice('침상을 더 조사한다.','house_bed')]},
house_symbol:{title:'경전에 없는 원',location:'북쪽 농가 내부',onEnter:s=>{gainSkill('theology',2);modRel('adel',4,'이상한 상징을 함께 확인했다');advance(0,15);flag('아홉점 원');note('아홉 점을 둥글게 배치한 원은 공식 빛의 교단 상징이 아니다. 폐역참의 검은 문과 수가 일치한다.');vec('church',1)},text:s=>`${dlg('adel','교단 문양이 아닙니다. 적어도 제가 배운 어떤 전례에도 없습니다.')}

그는 손가락으로 점을 세다가 아홉에서 멈춘다.

당신이 폐역참의 아홉 홈을 봤다면 숫자가 즉시 겹친다.

${hasFlag('검은 문 조우')?dlg('adel',s=>hasFlag('옛길 공식 보고')?'어제 말씀하신 문과 같은 수군요. 우연이라고 하기는 점점 어렵습니다.':'…당신, 이 숫자를 전에 본 적 있습니까? 표정이 그렇게 말하는군요.'):'아델은 종이에 문양을 옮겨 그린다.'}`,choices:[choice('아델에게 폐역참과 연결되는 것 같다고 말한다.','farmstead_converge',{do:s=>{if(!hasFlag('옛길 공식 보고')){modRel('adel',5,'뒤늦게 폐역참 사실을 공유했다');flag('아델에게 공명 일부 고백')}}}),choice('아직은 추측이라고 말하고 넘어간다.','farmstead_converge')]},
house_bed:{title:'감춰둔 편지',location:'북쪽 농가 작은 방',onEnter:s=>{const r=check({stat:'dex',skill:'observation',diff:57,label:'침상 수색'});advance(0,15);if(r.ok){flag('네번째 사람 편지');note('농가의 숨겨진 네 번째 사람은 북쪽 도로 공사에 참여했던 인부이며, 며칠 전부터 "땅 아래에서 이름을 부른다"고 적었다.');vec('underworld',2)}},text:s=>hasFlag('네번째 사람 편지')?`침상 밑 판자 한 장이 다른 것보다 미세하게 떠 있다. 손톱을 걸어 들어 올리자 접힌 편지 두 장이 나온다.

“…폐역참 쪽에서 돌을 옮긴 뒤부터 꿈이 같다. 아래에서 누가 내 이름을 안다. 아홉 목소리가 아니라 그 사이의 조용한 것이…”

두 번째 편지는 보내지 못한 채 끝난다.

“오늘 밤에는 확인하러 간다.”`:`침상과 벽 틈, 바닥까지 훑어보지만 쓸 만한 단서는 나오지 않는다. 다만 이 침상이 며칠 전까지 사용됐다는 흔적만은 분명하다.`,choices:s=>hasFlag('네번째 사람 편지')?[choice('편지를 챙겨 오르반과 아델에게 보여준다.','farmstead_converge')]:[choice('찾은 것은 없다고 알리고 마당으로 돌아간다.','farmstead_converge')]},
farmstead_quarantine:{title:'선을 긋는 일',location:'북쪽 농가 마당',onEnter:s=>{const r=check({stat:'wis',skill:'medicine',diff:57,label:'격리 필요성 설명'});advance(0,15);if(r.ok){flag('초기 격리');state.city.infection=Math.max(0,state.city.infection-4);state.city.panic+=2;modRel('orban',4,'초기 격리를 제안했다');vec('doctor',1);vec('guard',1)}else state.city.panic+=1},text:s=>hasFlag('초기 격리')?`${dlg('orban','좋다. 이 집과 우물은 막는다. 대신 근거 없는 소문은 통제한다. 격리는 병을 막기도 하지만 폭동을 만들기도 하니까.')}

이렌은 고개를 끄덕인다.`:`${dlg('orban','증거가 부족하다. 농가 하나 때문에 북쪽 물길을 막으면 도시가 먼저 굶는다. 더 확인한다.')}

틀린 말은 아니다. 그래서 더 답답하다. 격리를 서두르면 북쪽 농가 전체가 병의 근원으로 찍힐 수 있고, 늦추면 실제 감염이 도시로 들어갈 수 있다. 증거가 부족한 지금 어느 쪽을 택해도 누군가에게 비용이 생긴다는 사실만 남는다.`,choices:[choice('다른 조사 결과를 모으러 간다.','farmstead_converge')]},
forest_edge:{title:'숲 가장자리',location:'북쪽 숲 가장자리',onEnter:s=>{advance(0,20);modRes({stamina:-5,spirit:-3});flag('숲 진입')},text:s=>`숲 가장자리부터 냄새가 달라진다. 젖은 낙엽 냄새 사이에 썩은 꽃 같은 단내가 섞여 있다.

나무 하나의 뿌리가 땅 위로 드러나 있는데, 보통 나무 뿌리와 달리 검고 매끈하다. 손가락 두께의 가느다란 줄기가 흙 속을 따라 북쪽과 남쪽으로 뻗는다.

조금 더 안쪽에서 사람 신음 같은 소리가 난다.

${dlg('mark','들었지? 혼자 움직이지 마.')}`,choices:[choice('소리가 난 쪽으로 접근한다.','forest_first_undead'),choice('검은 뿌리를 먼저 조사한다.','forest_root'),choice('위치를 표시하고 조사대에 돌아간다.','farmstead_converge')]},
forest_root:{title:'나무가 아닌 뿌리',location:'북쪽 숲 가장자리',onEnter:s=>{const r=check({stat:'int',skill:'survival',diff:62,label:'검은 뿌리 판별'});advance(0,15);if(r.ok){item('rootShard',1);flag('검은뿌리 채취');note('검은 뿌리는 주변 나무 조직과 다르고, 자르면 내부에서 피가 아닌 투명한 수액이 흐른다.');vec('worldtree',2);gainSkill('survival',2)}},text:s=>`칼끝으로 표면을 긁으면 검은 껍질 아래가 은빛으로 번뜩인다. 식물이라면 있어야 할 섬유 방향이 이상하다. 마치 아주 가는 관 여러 개가 꼬여 있는 듯하다.

${hasFlag('검은뿌리 채취')?`조각을 자르는 순간 뿌리가 아주 약하게 꿈틀한다. 잘린 단면에서 투명한 수액 한 방울이 맺힌다.`:`당신은 섣불리 손대지 않고 형태와 자란 방향만 눈에 담는다. 표면은 나무껍질처럼 보이지만 마디가 일정하지 않고, 땅에서 나온 자리 주변에는 흙이 바깥으로 밀린 흔적이 있다. 지금 만져서 얻을 정보보다 건드렸을 때 생길 위험이 더 커 보인다.`}

멀리서 다시 신음 소리가 난다. 이번에는 분명 사람 목소리다.`,choices:[choice('소리 쪽으로 간다.','forest_first_undead'),choice('표본을 가지고 조사대로 돌아간다.','farmstead_converge')]},
forest_first_undead:{title:'살아 있는지 묻기 전에',location:'북쪽 숲',onEnter:s=>{advance(0,10);meet('mark');flag('첫 감염자 조우');modRes({spirit:-8})},text:s=>`나무 뒤에서 남자가 비틀거리며 나온다.

농부 옷. 맨발. 발바닥이 찢어져 피가 굳었는데 걷는 속도는 일정하다. 눈은 뜨여 있지만 초점이 없다. 목 옆으로 검은 실핏줄이 귀까지 올라와 있다.

마르크가 이름을 부른다.

${dlg('mark','헤른! 들리면 멈춰! 네 동생이 찾고 있어!')}

남자는 반응하지 않는다. 대신 마르크의 목소리가 끝난 뒤 정확히 같은 음절을 한 박자 늦게 흉내 낸다.

“……헤른. 멈춰.”

그리고 달려든다.`,choices:[choice('전투 준비를 한다.',null,{do:s=>startCombat({name:'감염된 농부 헤른',hp:48,atk:14,def:4,accuracy:54,speed:54,fear:1,winTo:'forest_afterfight',fleeTo:'farmstead_converge',onWin:s=>flag('헤른 제압')})})]},
forest_afterfight:{title:'쓰러진 뒤에도',location:'북쪽 숲',onEnter:s=>{advance(0,15);modRel('mark',4,'감염자와 함께 싸웠다');gainSkill('medicine',1)},text:s=>`헤른은 흙 위에 쓰러진다. 죽었는지 기절했는지 바로 알기 어렵다.

마르크가 창끝을 겨누며 숨을 고른다.

${dlg('mark','사람이었어. 아직 사람인가?')}

가까이 보니 목 아래 검은 실핏줄이 박동과 상관없이 천천히 움직인다. 마치 피부 아래를 무언가 기어가는 것 같다.`,choices:[
choice('죽이지 말고 묶어 데려가자고 한다.','forest_capture'),
choice('위험하다. 확실히 숨을 끊는다.','forest_kill'),
choice('이렌이 볼 때까지 손대지 않는다.','farmstead_converge',{do:s=>{flag('헤른 현장 보존');vec('doctor',1)}})]},
forest_capture:{title:'살려서 데려간다',location:'북쪽 숲',onEnter:s=>{const r=check({stat:'str',skill:'athletics',diff:58,label:'감염자 결박'});advance(0,20);modRes({stamina:-9});if(r.ok){flag('헤른 생포');modRel('mark',5,'감염자를 살려 데려가자고 했다');vec('doctor',2);state.city.infection+=1}else{modRes({hp:-6});flag('결박 중 부상');state.city.infection+=2}},text:s=>hasFlag('헤른 생포')?`두 겹으로 손목과 발목을 묶고 입에는 천을 문다. 헤른은 이상할 만큼 힘이 세지만 결국 움직임이 제한된다.

${dlg('mark','좋아. 살아 있으면 이렌이 뭔가 알아낼 거다. 대신 이놈 풀리면 네가 먼저 잡아.')}`:`결박하는 순간 헤른이 갑자기 몸을 뒤틀어 당신 팔을 긁는다. 깊지는 않지만 피가 난다.

마르크가 겨우 눌러 묶는다.`,choices:[choice('조사대가 있는 농가로 돌아간다.','farmstead_converge')]},
forest_kill:{title:'사람이었던 것',location:'북쪽 숲',onEnter:s=>{state.kills++;modRes({spirit:-12});flag('헤른 사살');modRel('mark',-1,'감염자를 직접 끝냈다');vec('guard',1);advance(0,10)},text:s=>`확실히 끝내려면 망설이면 안 된다.

몸이 한 번 크게 떨리고 움직임이 멎는다. 검은 실핏줄도 잠시 뒤 멈춘다.

마르크는 아무 말 없이 시선을 돌린다.

${dlg('mark','도시 돌아가면 이름은 내가 적을게. 괴물 하나 잡았다고 쓰진 않을 거다. 헤른이라고 쓸 거야.')}

그 말 때문에 방금 한 일이 더 무겁게 느껴진다.`,choices:[choice('시신을 표시해두고 농가로 돌아간다.','farmstead_converge')]},
farmstead_converge:{title:'한곳에 모인 단서',location:'북쪽 농가 마당',onEnter:s=>{advance(0,15);flag('농가 조사 합류')},text:s=>`조사대가 다시 마당에 모인다. 각자 본 것이 조금씩 다르다.

이렌은 검은 물질이 살아 있는 조직에 붙는다고 본다. 오르반은 실종자와 도로를 먼저 생각한다. 아델은 집 안의 아홉 점 문양을 문제 삼는다.

${dlg('iren',s=>hasFlag('헤른 생포')?'생포한 사람부터 도시로 옮겨야 해요. 살아 있을 때만 알 수 있는 게 있습니다.':'시신이 있다면 상태를 유지해서 옮겨야 해요. 태우기 전에요.')}
${dlg('orban','오늘부터 북문 야간 통행을 막는다. 문제는 길을 막으면 식량도 같이 막힌다는 거다.')}
${dlg('adel','그리고 폐역참. 이 일의 시작이 그 아래와 관계있다면, 지금 다시 확인해야 합니다.')}

그때 멀리 숲 쪽에서 종소리 같은 금속음이 한 번 난다.`,choices:[choice('오늘 안에 폐역참을 다시 확인하자고 한다.','expedition_station'),choice('먼저 생존자와 표본을 도시로 옮기자고 한다.','expedition_return'),choice('숲 안쪽 금속음을 확인하자고 한다.','forest_bell')]},
forest_bell:{title:'숲속의 쇠고리',location:'북쪽 숲 깊은 길',onEnter:s=>{advance(0,35);modRes({stamina:-9,spirit:-4});const r=check({stat:'wis',skill:'survival',diff:63,label:'숲 안쪽 접근'});if(r.ok){flag('실종 수레 발견');note('실종된 곡물 수레가 숲 깊은 곳에서 발견됐고, 바닥에는 검은 뿌리가 바퀴와 말뼈를 감고 있었다.');vec('merchant',1);vec('worldtree',2)}},text:s=>hasFlag('실종 수레 발견')?`소리를 따라가자 나무 사이에 수레가 옆으로 쓰러져 있다. 바퀴의 쇠고리가 바람에 흔들리며 나무뿌리에 부딪혀 소리를 냈다.

말은 뼈만 남았다. 이상할 만큼 깨끗하다. 바닥에서는 검은 뿌리가 말뼈 사이와 수레바퀴를 감고 있다.

곡물 자루 몇 개는 그대로다.

${dlg('orban','먹을 수 있을지 확인하기 전엔 손대지 마라. 이 수레 하나 때문에 도시 사람들이 서로 목을 조를 수도 있다.')}`:`소리를 따라 몇 번이나 방향을 바꾸지만 숲은 생각보다 깊고, 젖은 낙엽 위에서는 지나온 길조차 금세 흐려진다. 한 번 더 쇳소리가 난 듯해 걸음을 재촉했을 때는 이미 바람 소리뿐이다. 오르반이 손을 들어 대열을 멈춘다. 해가 더 기울기 전에 돌아가지 않으면 수레가 아니라 사람까지 잃을 수 있다는 판단이다.`,choices:[choice('수레 위치를 표시하고 돌아간다.','expedition_return'),choice('검은 뿌리가 수레를 끌어당겼는지 확인한다.','wagon_root',{if:s=>hasFlag('실종 수레 발견')})]},
wagon_root:{title:'움직인 흔적',location:'실종 수레 주변',onEnter:s=>{const r=check({stat:'int',skill:'observation',diff:64,label:'수레와 뿌리의 흔적 분석'});advance(0,20);if(r.ok){flag('뿌리 이동 확인');note('검은 뿌리는 단순히 자란 것이 아니라 수레 방향으로 여러 차례 뻗었다가 말라붙은 흔적이 있다.');vec('worldtree',3);modRel('iren',3,'검은 뿌리 움직임을 함께 확인했다')}},text:s=>hasFlag('뿌리 이동 확인')?`뿌리 끝을 자세히 보면 한 번에 자란 모양이 아니다. 가느다란 가지가 수레 쪽으로 뻗었다가 마른 흔적이 겹겹이 남아 있다.

이렌이 장갑 낀 손으로 한 조각을 들어 올린다.

${dlg('iren','먹이를 찾은 것처럼 움직였네요. 식물이라고 부르면 편하지만… 식물의 행동은 아닙니다.')}`:`당신은 바퀴자국과 뿌리가 흙을 밀어낸 방향을 비교한다. 하지만 비가 여러 번 흔적을 씻어내, 수레가 먼저 쓰러졌는지 뿌리가 먼저 뻗었는지 순서를 세울 수가 없다. 가느다란 끝 몇 개가 바퀴 쪽을 향한 것은 보이지만 우연한 성장 방향일 수도 있다. 이렌도 표본을 들여다보다가 ‘움직였다’는 표현은 아직 기록하지 말자고 한다.`,choices:[choice('도시로 돌아간다.','expedition_return')]},
expedition_station:{title:'두 번째 폐역참',location:'북쪽 폐역참',onEnter:s=>{advance(0,40);modRes({stamina:-10});flag('공식 폐역참 조사');quest('station2','폐역참 공식 조사','경비대와 성당이 지하 석실을 공식 확인한다.')},text:s=>`여럿과 함께 오니 폐역참은 어제와 다른 장소처럼 보인다. 경비병들은 지상부터 확인하고, 토마는 기록을 베낄 준비를 한다.

지하로 내려가자 아델이 검은 문 앞에서 멈춘다.

${dlg('adel','아홉 개. 정말이군요.')}

그가 빛의 기도문을 낮게 읊는다. 홈 하나가 아주 희미하게 밝아진다.

모두가 숨을 멈춘다.

${dlg('orban','멈춰. 더 건드리지 마.')}
${dlg('adel','제가 한 것이 아닙니다. 적어도 의도한 것은 아닙니다.')}`,choices:[choice('아델에게 다시 기도해보라고 한다.','station_prayer'),choice('문보다 벽의 제3문자를 확인한다.','station_thirdscript'),choice('오르반 말대로 아무것도 건드리지 않고 봉쇄한다.','station_seal')]},
station_prayer:{title:'빛 하나가 켜진다',location:'폐역참 지하',onEnter:s=>{modResonance('light',6,-4);modRes({mana:6,spirit:-7});state.resonanceAwareness=Math.max(2,state.resonanceAwareness);flag('빛 홈 점등');vec('church',2);vec('demigod',1);advance(0,10)},text:s=>`아델이 같은 구절을 다시 읽는다.

이번에는 분명하다. 아홉 홈 중 하나가 흰 금속처럼 빛난다. 동시에 당신의 가슴 안쪽에서 아주 약한 울림이 생긴다.

${dlg('adel','…이 반응은 성물과 비슷합니다. 하지만 교단이 만든 성물은 아닙니다.')}

토마가 숨을 들이킨다.

${dlg('toma','그러면 신전보다 오래된 물건이 신의 힘에 반응한다는 뜻인가요?')}

아델은 대답하지 않는다.`,choices:[choice('다른 공명에도 반응하는지 시험해본다.','station_multi_res'),choice('더 이상 건드리지 말자고 한다.','station_seal')]},
station_multi_res:{title:'아홉은 서로 다른 문이 아니다',location:'폐역참 지하 검은 문',onEnter:s=>{const top=Object.entries(s.resonance).sort((a,b)=>b[1]-a[1])[0][0];modResonance(top,3,-5);modRes({mana:-10,spirit:-9});flag('복수 홈 반응');vec('demigod',2);advance(0,10)},text:s=>`당신이 의식적으로 자신의 가장 강한 공명을 끌어올리자 다른 홈 하나가 반응한다.

두 빛은 서로 밀어내지 않는다. 오히려 얇은 선으로 이어진다.

문 전체에 원형 무늬가 잠깐 나타났다가 사라진다.

${dlg('adel','각각의 신을 따로 모신 문이 아닐 수도 있겠습니다. 아홉을 한 구조로 본 흔적이라면… 지금 교리와는 꽤 다른 이야기군요.')}

오르반이 차갑게 끼어든다.

${dlg('orban','교리 토론은 도시 돌아가서 해. 지금 필요한 건 이게 사람을 죽이는지 아닌지다.')}`,choices:[choice('문을 봉쇄하고 돌아간다.','station_seal')]},
station_thirdscript:{title:'둘보다 오래된 글',location:'폐역참 지하 기록벽',onEnter:s=>{const r=check({stat:'int',skill:'history',diff:66,label:'제3문자 구조 추정'});advance(0,25);if(r.ok){flag('제3문자 구조');note('제3문자는 문장이 아니라 방향과 수를 기록한 표식에 가깝고, 반복되는 표식은 "위", "아래", "순환"으로 추정된다.');vec('scholar',3);gainSkill('history',2)}},text:s=>hasFlag('제3문자 구조')?`셀 수 있는 반복을 찾고 나니 글자가 아니라 표식처럼 보인다. 하나는 위를, 하나는 아래를, 하나는 되돌아오는 순환을 뜻하는 듯하다.

토마가 종이를 들고 다가온다.

${dlg('toma','그러면 이건 누가 누구에게 쓴 글이 아니라… 길을 쓰는 방식인가요? 지도처럼?')}

당신은 확신할 수 없지만 그 가설이 가장 자연스럽다.`:`인간 문자와 엘프 문자의 획을 하나씩 구분해 종이에 옮겨보지만, 그 아래 남은 흔적은 지나치게 짧고 닳아 있다. 같은 모양처럼 보이는 기호도 위치에 따라 방향이 달라서 글자인지 표식인지조차 확신하기 어렵다. 토마가 몇 차례 종이를 돌려보다가 결국 원래 방향까지 함께 표시하자고 한다. 지금 의미를 붙이는 대신 형태를 남겨두는 편이 다음 해석을 망치지 않는다.`,choices:[choice('문을 봉쇄하고 돌아간다.','station_seal')]},
station_seal:{title:'닫힌 문을 지키는 방법',location:'폐역참',onEnter:s=>{questDone('station2');flag('폐역참 봉쇄');state.city.guard-=4;vec('guard',2);advance(0,25)},text:s=>`오르반은 지하 계단 입구에 경비 둘을 남기고, 폐역참 자체를 출입 금지 구역으로 지정한다.

${dlg('orban','문을 못 열게 하는 건 쉽다. 문제는 열고 싶은 사람이 생기는 거다. 소문이 퍼지면 보물 찾는 놈부터 신의 계시 찾는 놈까지 다 온다.')}

아델은 검은 문을 마지막으로 돌아본다.

${dlg('adel','그리고 정말 위험한 건, 저 문이 밖에서 열리는 문이 아닐 가능성이지요.')}

도시로 돌아가는 길에 누구도 말을 많이 하지 않는다.`,choices:[choice('도시로 돌아간다.','expedition_return')]},
expedition_return:{title:'돌아온 조사대',location:'북문 안쪽',onEnter:s=>{questDone('expedition');questDone('day2');advance(1,0);state.city.infection+=hasFlag('초기 격리')?1:3;state.city.panic+=2;flag('둘째날 조사 귀환')},text:s=>`해가 기울 무렵 조사대가 도시로 돌아온다. 북문 앞에는 소문을 들은 사람들이 이미 모여 있다.

“사람 잡아먹는 짐승이 있다더라.”
“성당에서 병자를 숨긴다더라.”
“엘프가 옛 무덤을 열었다더라.”

사실보다 빠르게 이야기가 변한다.

${dlg('orban','오늘 본 걸 함부로 떠들지 마라. 하지만 가족에게 북문 밖에 나가지 말라고 하는 건 막지 않겠다.')}
${dlg('iren','저는 진료실로 갈게요. 오늘 밤 환자가 늘 가능성이 큽니다.')}

당신에게도 선택할 일이 생긴다.`,choices:[choice('이렌을 따라 진료실로 간다.','day2_evening_clinic'),choice('경비대의 야간 통제 일을 돕는다.','day2_evening_guard'),choice('라엔을 찾아 오늘 본 것을 전한다.','day2_evening_laen',{if:s=>hasFlag('met_laen')}),choice('오늘은 여관에서 쉬며 생각을 정리한다.','day3_morning',{do:s=>rest(8)})]},
day2_farm:{title:'북쪽이 시끄러워도 씨앗은 마른다',location:'남쪽 밭',onEnter:s=>{meet('mara');advance(3,0);modRes({stamina:-24,spirit:5});state.silver+=4;state.food+=1;gainSkill('farming',3);modRel('mara',8,'둘째 날도 밭일을 선택했다');vec('farmer',3);flag('둘째날 밭일')},text:s=>`당신은 북문 대신 남쪽으로 걷는다.

마레나는 아무 말 없이 씨앗 자루를 내민다. 북쪽 일에 관심이 없는 것 같지만, 오전 내내 지나가는 수레 숫자를 센다.

${dlg('mara','사람들은 위험하면 밭일이 하찮아지는 줄 알아. 반대야. 길 하나 막히면 이 밭이 도시 목숨줄이 되는 거다.')}

점심 무렵, 북문에서 온 사람이 밭 가장자리에 쓰러진다. 열이 높고 손톱 아래가 검다.

마레나가 욕설을 삼킨다.

${dlg('mara','젠장. 이젠 저쪽 일도 우리 일이네.')}`,choices:[choice('쓰러진 사람을 성당으로 옮긴다.','day2_clinic',{do:s=>{modRel('mara',3);modRes({stamina:-7});vec('doctor',1)}}),choice('접촉을 피하고 경비대를 부른다.','day2_evening_guard',{do:s=>{state.city.panic+=1;vec('guard',1)}})]},
day2_market:{title:'소문은 가격이 된다',location:'중앙 장터',onEnter:s=>{meet('nadia');advance(2,0);const r=check({stat:'int',skill:'trade',diff:59,label:'급변하는 시세 읽기'});if(r.ok){flag('사재기 조짐');note('소금과 곡물 가격이 하루 만에 오르기 시작했다. 일부 상인이 북문 봉쇄 소문을 이용해 재고를 숨기고 있다.');vec('merchant',3);gainSkill('trade',2)}},text:s=>`북문이 시끄러울수록 중앙 장터는 붐빈다. 사람들은 위험을 들으면 먼저 먹을 것을 산다.

밀가루는 어제보다 한 푼 비싸고 소금은 두 푼 비싸다. 나디아는 가게 앞에 ‘한 사람 한 자루’라고 써 붙인다.

${dlg('nadia',s=>hasFlag('사재기 조짐')?'동쪽 창고 세 군데가 문을 닫았어. 재고 없어서가 아니라 값 더 오를 때 팔려고. 지금 사두면 돈은 벌겠지. 대신 사흘 뒤 굶는 사람이 누군지도 알게 될 거고.':'살 거면 오늘 사. 내일은 장담 못 해.')}

같은 가격표 한 장에 누군가의 이익과 도시의 굶주림이 함께 매달려 있다.`,choices:[choice('여유 은화로 식량을 미리 사둔다.','market_buy',{req:{silver:3}}),choice('나디아와 함께 재고를 정상가에 풀 방법을 찾는다.','market_fair'),choice('가격이 더 오르기 전에 되팔 물건을 사둔다.','market_speculate',{req:{silver:4}}),choice('장터보다 북쪽 상황이 더 중요하다. 진료실로 간다.','day2_clinic')]},
market_buy:{title:'개인의 비축',location:'중앙 장터',onEnter:s=>{state.silver-=3;state.food+=4;advance(0,20);vec('merchant',1);flag('개인 식량 비축')},text:s=>`당신은 검은빵, 말린 콩, 소금을 산다. 가격이 더 오르면 이 정도 식량도 큰 자산이 된다.

나디아는 물건을 건네며 말한다.

${dlg('nadia','비축하는 건 죄 아냐. 사람은 자기 배부터 챙겨. 다만 네가 열 자루를 사서 아홉 자루를 숨기기 시작하면 이야기가 달라지지.')}

선을 어디에 그을지는 아직 당신 몫이다.`,choices:[choice('진료실로 간다.','day2_clinic'),choice('저녁까지 장터 상황을 더 본다.','day2_evening_market')]},
market_fair:{title:'돈을 덜 버는 선택',location:'중앙 장터',onEnter:s=>{const r=check({stat:'wis',skill:'trade',diff:61,label:'상인들 설득',bonus:Math.round(rep('factions','merchants')/6+rep('places','borderCity')/10)});advance(1,0);if(r.ok){state.city.food+=8;state.city.panic=Math.max(0,state.city.panic-3);modRel('nadia',10,'사재기를 막는 데 힘을 보탰다');publicDeed({'factions.merchants':6,'places.borderCity':4,'factions.poor':3},'장터 상인들을 설득해 사재기와 급격한 가격 상승을 막았다','장터 상인과 손님들이');vec('merchant',2);vec('hero',1);flag('장터 가격 방어')}else{state.city.panic+=2;modRel('nadia',3);publicDeed({'factions.merchants':-1,'places.borderCity':-1},'사재기를 막으려 했지만 상인들의 합의를 이끌어내지 못했다','장터 상인들이')}},text:s=>hasFlag('장터 가격 방어')?`나디아와 몇몇 상인이 공동으로 가격표를 붙인다. 경비대가 통제한다는 보장은 없지만, 적어도 오늘은 장터 전체가 폭등하지 않는다.

${dlg('nadia','손해 봤다고 생각하지 마. 도시가 굶으면 돈 들고 도망갈 사람도 없어. 장사는 내일 손님이 살아 있어야 하는 거야.')}

오늘 나디아와 상인들이 포기한 이익은 장부에는 손실로 남는다. 대신 내일도 장터가 열릴 가능성은 조금 높아졌다.`:`처음 두 상인은 고개를 끄덕이지만 세 번째가 창고 문을 닫으면서 분위기가 깨진다. “나만 싸게 팔면 내 가게만 털린다”는 말이 퍼지고, 서로 재고를 숨기기 시작한다.

나디아가 당신 옆에서 혀를 찬다.

${dlg('nadia','착한 마음만으로 가격은 안 묶여. 다 같이 지킬 규칙이 없으면 먼저 손해 보는 사람이 바보가 되거든.')}

설득은 실패했고, 몇몇 품목은 아침보다도 비싸졌다. 소문은 이미 돈 냄새를 맡았다.`,choices:[choice('진료실 상황을 확인한다.','day2_clinic'),choice('저녁 장터를 지킨다.','day2_evening_market')]},
market_speculate:{title:'위험은 돈이 된다',location:'중앙 장터',onEnter:s=>{state.silver-=4;flag('투기 물건');vec('merchant',4);state.city.food-=3;state.city.panic+=1;publicDeed({'factions.merchants':1,'factions.poor':-3,'places.borderCity':-2},'식량값이 오르는 틈을 타 되팔 물건을 사들였다','장터의 몇몇 상인과 손님들이');advance(0,30)},text:s=>`당신은 말린 곡물과 소금을 묶음으로 산다. 지금 당장 먹기 위한 양보다 많다.

가격이 오르면 몇 배로 팔 수 있다.

나디아는 계산을 마치고 돈을 받지만 표정은 밝지 않다.

${dlg('nadia','틀렸다고 하진 않을게. 장사는 싸게 사서 비싸게 파는 거니까. 다만 비싸지는 이유가 사람 목숨이면, 그 돈은 오래 기억에 남아.')}`,choices:[choice('물건을 숨겨두고 저녁 상황을 본다.','day2_evening_market')]},
day2_clinic:{title:'진료실이 좁아진다',location:'북문 성당 임시 진료실',onEnter:s=>{meet('iren');meet('adel');advance(0,30);state.city.infection+=2;quest('clinic','늘어나는 환자','검은 실핏줄 증상을 가진 환자가 늘고 있다. 이렌의 치료와 원인 조사에 협력한다.')},text:s=>`어제 들것은 세 개였다. 오늘은 일곱 개다.

증상은 완전히 같지 않다. 어떤 사람은 열이 높고, 어떤 사람은 멀쩡히 말하다가 갑자기 같은 문장을 반복한다. 공통점은 손톱과 목 주변의 검은 실핏줄.

${dlg('iren','좋은 소식은 아직 사람 사이 전염 증거가 없다는 겁니다. 나쁜 소식은 북쪽에 다녀온 사람에게만 생긴다는 거고요.')}
${dlg('adel','더 나쁜 소식도 있습니다. 공동묘지 관리인이 오늘 아침부터 보이지 않습니다.')}`,choices:[choice('이렌의 치료를 돕는다.','clinic_work'),choice('공동묘지 관리인을 찾으러 간다.','cemetery_search'),choice('환자들에게 북쪽에서 본 것을 하나씩 묻는다.','clinic_interview')]},
clinic_work:{title:'일곱 사람의 호흡',location:'임시 진료실',onEnter:s=>{const r=check({stat:'dex',skill:'medicine',diff:59,label:'다수 환자 치료 보조',bonus:Math.round(rep('factions','healers')/8)});advance(2,0);modRes({stamina:-13,spirit:-7});gainSkill('medicine',3);modRel('iren',r.ok?10:5,'환자가 몰린 날 함께 치료했다');if(r.ok){state.city.infection=Math.max(0,state.city.infection-2);item('tonic',1);publicDeed({'factions.healers':5,'factions.church':2,'places.northQuarter':2},'환자가 몰린 임시 진료실에서 치료와 간호를 도왔다','환자와 성당 봉사자들이');vec('doctor',3)}else modRep('factions','healers',1,'임시 진료실에서 끝까지 치료를 거들었다')},text:s=>`시간이 흐르면 사람 얼굴이 아니라 증상부터 보이기 시작한다. 열, 맥박, 호흡, 검은 선이 올라온 위치.

그게 무서워질 즈음 이렌이 한 환자의 손을 꼭 잡는다.

${dlg('iren','이름이 뭐예요?')}

환자가 겨우 이름을 말한다.

${dlg('iren','좋아요. 계속 이름 말해요. 제가 숫자만 보기 시작하면 저도 불러주세요.')}

그는 사람을 사물처럼 보는 눈을 가졌지만, 스스로 그 위험을 아는 사람이다.`,choices:[choice('치료가 끝난 뒤 이렌에게 왜 이 도시로 왔는지 묻는다.','iren_past'),choice('공동묘지 수색에 합류한다.','cemetery_search')]},
clinic_interview:{title:'환자들이 들은 목소리',location:'임시 진료실',onEnter:s=>{const r=check({stat:'wis',skill:'persuasion',diff:60,label:'환자 증언 정리'});advance(1,10);if(r.ok){flag('환자 공통 꿈');note('증상이 심해진 환자 다섯 중 네 명이 "아홉 목소리 뒤의 침묵" 혹은 누군가 이름을 부르는 꿈을 꾸었다.');vec('underworld',2);vec('scholar',2)}},text:s=>hasFlag('환자 공통 꿈')?`증언은 표현이 다르지만 구조가 같다.

“여러 사람이 동시에 말했어요.”
“아홉 번 불렀는데 마지막에는 아무 소리도 없었어요.”
“그 조용한 게 제 이름을 알았어요.”

당신이 폐역참에서 느낀 빈자리와 너무 닮았다.

이렌은 기록을 읽고 입술을 깨문다.

${dlg('iren','몸 안에 들어온 물질이 꿈까지 만든다면 신경계와 연결된 겁니다. 반대로 꿈이 먼저고 몸이 따라오는 거라면… 제가 아는 의학이 아닙니다.')}`:`환자 한 사람씩 시간을 달리해 묻지만 증언은 쉽게 맞물리지 않는다. 누군가는 북쪽 숲의 단내를 말하고, 다른 사람은 물소리를 들었다고 하며, 또 다른 사람은 꿈을 전혀 기억하지 못한다. 열이 오를 때의 기억과 쓰러지기 전 실제 경험도 서로 섞여 있다. 이렌은 같은 질문을 반복하지 말라고 손짓한다. 억지로 공통점을 만들면 환자들이 한 말을 기록하는 게 아니라 당신이 듣고 싶은 이야기를 쓰게 된다.`,choices:[choice('공동묘지 관리인을 찾는다.','cemetery_search'),choice('이렌과 치료를 계속한다.','clinic_work')]},
iren_past:{title:'의사는 왜 떠도는가',location:'성당 뒤편 우물가',onEnter:s=>{modRel('iren',7,'과거를 조금 들었다');advance(0,20);flag('이렌 과거 일부');vec('doctor',1)},text:s=>`${dlg('iren','한 도시에서 오래 있으면 환자가 사람이 아니라 익숙한 실패 목록이 되더라고요. 그래서 떠났습니다.')}

그는 우물물로 손을 씻는다. 손등에 오래된 화상 자국이 있다.

${dlg('iren','그리고 새로운 병을 보면… 궁금해집니다. 사람을 살리고 싶어서인지, 모르는 걸 알고 싶어서인지 저도 가끔 구분이 안 돼요.')}

부드러운 말투인데 마지막 문장만은 묘하게 차갑다.

그가 다시 웃는다.

${dlg('iren','그래서 옆에 다른 사람이 있는 게 낫죠. 제가 선을 넘으면 말려줄 사람이.')}`,choices:[choice('그 역할을 해줄 수 있다고 말한다.','cemetery_search',{do:s=>{modRel('iren',5,'선을 넘으면 말리겠다고 했다');vec('doctor',1)}}),choice('의사는 선을 스스로 알아야 한다고 말한다.','cemetery_search',{do:s=>{modRel('iren',1,'의사의 책임을 지적했다')}})]},
cemetery_search:{title:'북문 공동묘지',location:'북문 공동묘지',onEnter:s=>{meet('mark');advance(0,30);modRes({spirit:-4});quest('cemetery','사라진 묘지 관리인','꺼진 무덤과 사라진 관리인을 조사한다.')},text:s=>`공동묘지는 도시 성벽 안쪽인데도 숲 냄새가 난다.

무덤 세 기의 흙이 안에서 밖으로 밀려 올라와 있다. 도굴이라면 밖에서 파야 하는데 반대다.

마르크가 관리인 오두막 문을 발로 밀어 연다.

${dlg('mark','아무도 없어. 침대는 안 썼고, 램프는 어젯밤 기름이 다 탔다.')}

오두막 바닥에는 검은 흙자국이 지하 납골당 쪽으로 이어진다.`,choices:[choice('납골당으로 내려간다.','ossuary'),choice('무덤부터 파본다.','grave_open'),choice('관리인 오두막을 더 조사한다.','keeper_hut')]},
grave_open:{title:'비어 있는 관',location:'공동묘지',onEnter:s=>{advance(0,25);modRes({stamina:-9,spirit:-5});flag('빈 관');state.city.panic+=2;note('최근 묻힌 시신 두 구가 관에서 사라졌다. 관 뚜껑은 안쪽에서 긁힌 흔적이 있다.');vec('guard',2)},text:s=>`경비 둘과 함께 흙을 걷어내고 관을 연다.

비어 있다.

관 안쪽에는 손톱으로 긁은 흔적이 촘촘하다. 하지만 묻힐 당시 시신은 이미 죽은 것이 확인됐다고 마르크가 말한다.

${dlg('mark','이거 장터에 퍼지면 오늘 밤 성문부터 막아야 한다.')}

두 번째 관도 비어 있다.`,choices:[choice('납골당으로 내려간다.','ossuary')]},
keeper_hut:{title:'관리인의 마지막 기록',location:'묘지 관리인 오두막',onEnter:s=>{const r=check({stat:'int',skill:'observation',diff:56,label:'오두막 기록 수색'});advance(0,20);if(r.ok){flag('관리인 기록');note('관리인은 사흘 전부터 무덤 아래에서 "뿌리가 돌을 두드리는 소리"를 들었다고 기록했다.');vec('scholar',1)}},text:s=>hasFlag('관리인 기록')?`장부 마지막 페이지에 떨리는 글씨가 남아 있다.

“첫째 날, 북쪽 무덤에서 두드림.
둘째 날, 납골당 벽에 검은 실 같은 것.
셋째 날, 죽은 자 이름을 누가 부름.
오늘 밤 확인한다.”

그 아래에는 아무 기록도 없다.`:`오두막은 한 사람이 겨우 누울 만큼 작다. 램프, 삽, 젖은 외투, 날짜별로 정리된 묘지 장부. 서랍과 침상 밑까지 뒤져보지만 관리인이 어디로 갔는지 알려줄 만한 쪽지는 나오지 않는다.

다만 램프 심지가 끝까지 타 있고, 문 옆에 세워둔 삽에는 아직 마르지 않은 검은 흙이 묻어 있다. 단서는 아니라고 넘기기엔 찜찜하지만, 이것만으로 방향을 정할 수는 없다.`,choices:[choice('납골당으로 내려간다.','ossuary')]},
ossuary:{title:'돌 아래의 뿌리',location:'공동묘지 지하 납골당',onEnter:s=>{advance(0,15);modRes({spirit:-5});flag('납골당 진입')},text:s=>`납골당 계단 끝에서 검은 뿌리가 처음 보인다.

손가락 굵기의 줄기가 벽돌 틈을 뚫고 들어와 오래된 뼈 사이를 지나간다. 뿌리는 관 안쪽으로 이어져 있고, 몇몇 뼈에는 검은 실핏줄 같은 흔적이 남아 있다.

안쪽 어둠에서 삽 끌리는 소리가 난다.

${dlg('mark','관리인! 살아 있으면 대답해!')}

“살아… 있으면.”

똑같은 말이 어둠에서 돌아온다.`,choices:[choice('횃불을 높이 들고 접근한다.','ossuary_keeper'),choice('소리 방향을 피해서 뿌리부터 끊는다.','ossuary_root',{req:{item:'knife'}}),choice('지원이 필요하다. 지상으로 후퇴한다.','day2_evening_guard')]},
ossuary_root:{title:'끊긴 뿌리의 반응',location:'납골당',onEnter:s=>{const r=check({stat:'str',skill:'survival',diff:60,label:'검은 뿌리 절단'});advance(0,10);modRes({stamina:-7});if(r.ok){flag('납골당 뿌리 절단');modResonance('earth',2,-1);state.city.infection=Math.max(0,state.city.infection-2);vec('worldtree',2)}else modRes({hp:-4})},text:s=>hasFlag('납골당 뿌리 절단')?`칼이 들어가는 순간 뿌리 전체가 움찔한다.

소리 없는 비명이 아니라, 귀 안쪽의 압력처럼 느껴진다. 잘린 끝에서는 투명한 액체가 흐르고, 주변의 가느다란 실뿌리들이 동시에 뒤로 수축한다.

어둠 속 삽 소리도 멈춘다.`:`뿌리는 보기보다 질기다. 칼날이 겉껍질을 몇 번 긁어낼 뿐 깊이 들어가지 않는다. 힘을 더 주는 순간 뿌리가 손목을 휘감아 벽 쪽으로 잡아당기고, 손바닥이 거친 돌에 긁힌다. 어둠 속 삽 끄는 소리는 그 사이 더 가까워진다. 지금은 뿌리를 끊는 일보다 등 뒤에서 오는 것을 먼저 확인해야 한다.`,choices:[choice('관리인을 찾는다.','ossuary_keeper')]},
ossuary_keeper:{title:'묘지 관리인',location:'납골당 안쪽',onEnter:s=>{advance(0,5);flag('관리인 감염체 조우');modRes({spirit:-6})},text:s=>`관리인은 삽을 양손으로 들고 서 있다. 얼굴 절반이 검은 실핏줄로 덮여 있다.

그런데 헤른과 달리 눈동자가 당신을 따라온다.

“마르크….”

마르크가 한 걸음 앞으로 나간다.

“도망… 가.”

그 다음 순간 관리인의 팔이 비정상적으로 꺾이며 삽이 휘둘러진다.`,choices:[choice('관리인을 제압한다.',null,{do:s=>startCombat({name:'감염된 묘지 관리인',hp:62,atk:17,def:6,accuracy:59,speed:50,fear:2,winTo:'ossuary_after',fleeTo:'day2_evening_guard',onWin:s=>flag('관리인 제압')})})]},
ossuary_after:{title:'말할 수 있었던 감염자',location:'납골당',onEnter:s=>{questDone('cemetery');advance(0,20);modRel('mark',5,'납골당에서 함께 살아나왔다');note('묘지 관리인은 심하게 감염된 상태에서도 잠깐 자신의 의지로 말을 할 수 있었다.');vec('doctor',2);vec('hero',1)},text:s=>`관리인은 쓰러진 뒤에도 손가락을 움직인다.

이렌이 함께 왔다면 당장 달려들어 맥을 확인했을 것이다. 지금은 마르크가 거리를 유지한 채 숨을 확인한다.

${dlg('mark','아까 내 이름 불렀어. 안에 사람이 남아 있었다는 거잖아.')}

그 사실은 위로가 되지 않는다. 괴물이 된 사람을 베는 일과, 아직 사람이 남아 있는 몸을 베는 일은 같은 칼질이어도 전혀 다른 선택이다.`,choices:[choice('관리인을 살아서 진료실로 옮긴다.','day2_evening_clinic',{do:s=>{flag('관리인 생포');vec('doctor',2);modRes({stamina:-8})}}),choice('위험하니 납골당을 봉쇄하고 경비대에 맡긴다.','day2_evening_guard')]},
day2_evening_clinic:{title:'둘째 날 저녁, 진료실',location:'북문 성당 임시 진료실',onEnter:s=>{advance(1,0);meet('iren');state.city.infection+=2},text:s=>`해가 진 뒤에도 진료실 불은 꺼지지 않는다.

이렌은 검은 뿌리 조각과 환자 혈액을 번갈아 본다. 아델은 성당 창고를 비워 병상을 늘린다.

${dlg('iren','연결은 있습니다. 뿌리 표본과 환자 몸에서 나온 물질이 비슷해요. 문제는 이게 어디서 오는지죠.')}
${dlg('adel','공동묘지 아래까지 뻗었다면 이미 성벽 안입니다.')}

도시 전체가 갑자기 좁아진 느낌이 든다.`,choices:[choice('이렌과 밤샘 연구를 한다.','clinic_nightstudy'),choice('아델에게 성당의 오래된 기록을 보자고 한다.','archive_night'),choice('몸을 쉬게 한다. 내일이 더 위험할 수 있다.','day3_morning',{do:s=>rest(7)})]},
day2_evening_guard:{title:'둘째 날 저녁, 북문',location:'북문 경비초소',onEnter:s=>{advance(1,0);meet('orban');state.city.guard-=2;state.city.panic+=1},text:s=>`북문은 해가 지기 전에 닫힌다. 성벽 밖에는 돌아오지 못한 나무꾼과 농부가 있을지 모르지만, 오르반은 문을 열지 않는다.

${dlg('orban','문 밖 한 명 때문에 안의 천 명을 위험하게 할 수는 없다.')}

마르크는 대꾸하지 않는다. 그도 이 판단이 틀렸다고 말할 수 없는 얼굴이다.

성벽 위에서 북쪽을 보면 숲 사이로 작은 불빛 하나가 움직인다. 사람 횃불처럼 보이지만 너무 느리다.`,choices:[choice('성벽 위 야간 경계를 돕는다.','guard_nightwatch'),choice('오르반에게 내일 계획을 묻는다.','orban_plan'),choice('여관으로 돌아가 쉰다.','day3_morning',{do:s=>rest(7)})]},
day2_evening_laen:{title:'둘째 날 저녁, 엘프의 해석',location:'북문 여관 뒤뜰',onEnter:s=>{meet('laen');advance(0,40);modRel('laen',4,'조사 결과를 공유했다')},text:s=>`${dlg('laen',s=>hasFlag('검은뿌리 채취')?'보여줘. …이건 나무 아니다. 적어도 우리가 아는 나무는 아니다.':'검은 뿌리? 우리 오래된 노래에 비슷한 말 있다. ‘죽은 뿌리가 길을 따라 걷는다.’')}

라엔은 한참 생각하다 청동패를 꺼낸다. 패 가장자리의 가지 문양이 검은 뿌리의 갈라지는 형태와 묘하게 닮았다.

${dlg('laen','우리 어른들은 서쪽의 큰 나무가 죽었다고 말하지 않는다. 잠들었다고도 안 한다. “남겨졌다”고 한다.')}

무엇이 남겨졌는지는 그도 모른다.`,choices:[choice('그 큰 나무 이야기를 더 듣는다.','laen_worldtree'),choice('청동패가 뿌리를 막는 물건인지 묻는다.','laen_token_use')]},
laen_worldtree:{title:'이름을 아끼는 나무',location:'북문 여관 뒤뜰',onEnter:s=>{modRel('laen',5,'세계수 전승을 공유했다');advance(0,25);flag('세계수 전승');note('엘프 전승에서 서쪽의 거대한 나무는 죽었다고 표현되지 않고 "남겨졌다"고 표현된다. 그 내부의 힘을 함부로 부르는 것을 꺼린다.');vec('worldtree',4)},text:s=>`${dlg('laen','우리 말로는 이름이 길다. 인간이 옮기면 그냥 ‘세계를 잇는 나무’쯤 된다.')}

세계수.

당신이 그렇게 부르자 라엔은 썩 좋아하지 않는 표정이다.

${dlg('laen','너희는 큰 것에 바로 이름 붙인다. 이름 붙이면 가진 것처럼 느끼나?')}

그 말 뒤에 그는 설명을 덧붙인다. 나무는 오래전에 사라졌지만, 엘프들은 뿌리까지 사라졌다고 믿지 않는다고.`,choices:[choice('검은 뿌리가 세계수의 일부인지 묻는다.','laen_token_use')]},
laen_token_use:{title:'청동패의 홈',location:'북문 여관 뒤뜰',onEnter:s=>{const r=check({stat:'int',skill:'observation',diff:60,label:'청동패 구조 비교'});advance(0,20);if(r.ok){flag('청동패 열쇠 가능성');note('청동패의 부러진 부분에는 검은 문 홈과 비슷한 곡률이 있어 열쇠나 표식의 일부일 가능성이 있다.');vec('elf',1);vec('underworld',1)}},text:s=>hasFlag('청동패 열쇠 가능성')?`패의 부러진 단면을 떠올리면 검은 문의 홈 하나와 곡률이 비슷하다. 완전한 원의 일부였을지도 모른다.

라엔도 그 생각에 도달한다.

${dlg('laen','그러면 할아버지는 문을 찾으러 온 게 아니라… 열쇠를 가져온 것일 수도 있다.')}`:`청동패를 뿌리 가까이 가져가도 눈에 띄는 빛이나 진동은 생기지 않는다. 방향을 바꾸고 거리를 좁혀보지만 결과는 같다. 그래도 패 가장자리의 반복무늬와 뿌리 주변 석벽에 새겨진 홈은 닮아 있다. 직접 반응을 확인하지 못했다고 해서 관계가 없다고 단정하기도 어렵다. 지금은 ‘같은 계통으로 보임’ 이상을 기록하지 않는 편이 낫다.`,choices:[choice('라엔에게 패를 숨겨두라고 한다.','day3_morning',{do:s=>{modRel('laen',2);rest(7)}}),choice('내일 성당 기록과 비교해보자고 한다.','day3_morning',{do:s=>{flag('청동패 기록 대조');rest(7)}})]},
day2_evening_market:{title:'둘째 날 저녁, 닫히는 가게들',location:'중앙 장터',onEnter:s=>{advance(1,0);state.city.panic+=2},text:s=>`해가 지기도 전에 절반의 가게가 문을 닫는다. 가격표가 지워지고, 사람들은 물건을 품에 안고 집으로 서두른다.

${dlg('nadia',s=>hasFlag('투기 물건')?'내일 아침이면 네가 산 거 두 배로 팔 수 있을지도 몰라. 축하해야 하나?':'오늘 밤 무슨 일이 생겨도 내일 장터는 열 거야. 안 열면 그때부터 진짜 난리니까.')}

북문 쪽에서 종이 울린다. 한 번, 두 번, 세 번.`,choices:s=>[
...(hasFlag('투기 물건')?[choice('지금 일부를 비싸게 판다.','speculate_sell')]:[]),
choice('나디아 가게의 문단속을 돕는다.','day3_morning',{do:s=>{modRel('nadia',5);modRes({stamina:-5});rest(6)}}),
choice('종소리가 난 북문으로 간다.','day2_evening_guard')]},
speculate_sell:{title:'첫 번째 이익',location:'중앙 장터',onEnter:s=>{state.silver+=8;flag('투기 이익');state.city.food-=6;state.city.panic+=3;vec('merchant',3);advance(0,30)},text:s=>`당신이 산 물건 일부가 금세 팔린다. 은화 네 닢이 여덟 닢이 되어 돌아온다.

돈을 건넨 여자는 아이 둘을 데리고 있다. 비싸다는 말을 한 번도 하지 않는다. 살 수 있을 때 사야 한다는 얼굴이다.

나디아는 계산을 도와주지 않는다.

${dlg('nadia','돈은 진짜야. 네가 번 것도 맞아. 그러니까 나중에 핑계 대진 마.')}

주머니가 무거워졌는데 기분은 그렇지 않다.`,choices:[choice('여관으로 돌아간다.','day3_morning',{do:s=>rest(7)})]},
clinic_nightstudy:{title:'잠들지 않는 표본',location:'성당 지하 작은 방',onEnter:s=>{const r=check({stat:'int',skill:'medicine',diff:65,label:'검은 물질 반응 관찰'});advance(3,0);modRes({stamina:-14,spirit:-8});gainSkill('medicine',3);gainSkill('arcana',1);modRel('iren',8,'밤샘 연구를 함께했다');if(r.ok){flag('검은물질 공명반응');note('검은 물질은 피 자체보다 공명 자극에 더 크게 반응한다. 특히 생명과 죽음 계열 자극에서 움직임이 뚜렷하다.');vec('doctor',3);vec('demigod',1)}rest(4)},text:s=>hasFlag('검은물질 공명반응')?`이렌이 촛불, 소금물, 약초즙을 차례로 대보지만 큰 반응이 없다.

당신이 가까이 손을 가져간 순간 유리병 안의 검은 실이 미세하게 움직인다.

둘 다 말을 멈춘다.

${dlg('iren','다시 해보세요. 천천히.')}

당신이 공명을 의식하면 실이 더 분명하게 움직인다.

${dlg('iren','이건 감염체이면서… 어떤 힘에 반응하는 기관 같아요. 질병만으로 설명하면 틀리겠습니다.')}`:`몇 시간을 들여 온도와 물, 소금, 빛에 대한 반응을 기록하지만 결정적인 규칙은 나오지 않는다. 같은 조건에서도 표본이 서로 다르게 움직인다. 이렌은 실험 순서를 다시 적고, 오늘 결과를 실패라고 표시한다. 그래도 한 가지는 남는다. 이 조직은 그가 알고 있는 일반적인 균이나 기생충처럼 일정한 생리 반응만으로 설명되지 않는다.`,choices:[choice('잠깐 눈을 붙이고 아침을 맞는다.','day3_morning')]},
archive_night:{title:'성당 기록고',location:'북문 성당 기록고',onEnter:s=>{meet('toma');advance(2,0);const r=check({stat:'int',skill:'theology',diff:62,label:'오래된 교단 기록 대조'});gainSkill('theology',2);if(r.ok){flag('옛 교황 기록');note('초기 교단 기록에는 빛을 "아홉 중 첫째"라 부른 표현이 있으나, 후대 필사본에서는 "유일한 길잡이"로 바뀌어 있다.');vec('church',2);vec('scholar',3)}rest(5)},text:s=>hasFlag('옛 교황 기록')?`토마가 사다리 위에서 먼지 쌓인 장부를 내려준다. 인간력 이전의 오래된 사본이다.

한 문장이 눈에 걸린다.

“빛은 아홉 중 첫째로 길을 비추었고…”

후대 필사본에는 같은 문장이 “빛은 유일한 길잡이로 길을 비추었고…”로 바뀌어 있다.

${dlg('toma','필사 실수일까요? 그런데 왜 더 오래된 게 더 구체적이죠?')}

아델에게 보여주기 전, 당신은 교리가 역사 속에서 바뀌었을 가능성을 처음으로 실감한다.`:`수많은 기록 속에서 검은 문과 직접 이어지는 문장을 찾지 못한다. 다만 인간력 이전 기록 상당수가 후대에 다시 필사됐다는 사실을 확인한다.`,choices:[choice('기록을 표시해두고 잠깐 쉰다.','day3_morning')]},
guard_nightwatch:{title:'성벽 위의 한밤',location:'북문 성벽',onEnter:s=>{const r=check({stat:'wis',skill:'observation',diff:62,label:'야간 경계'});advance(3,0);modRes({stamina:-14,spirit:-5});gainSkill('guard',2);modRel('mark',6,'밤 경계를 함께 섰다');if(r.ok){flag('성벽 아래 뿌리');note('검은 뿌리가 이미 북문 성벽 아래 배수로를 따라 도시 안쪽으로 들어오고 있다.');state.city.infection+=1;vec('guard',2)}rest(4)},text:s=>hasFlag('성벽 아래 뿌리')?`한밤중, 달빛이 배수로 쇠창살에 걸린다. 그 틈으로 검은 실 같은 것이 움직인다.

당신이 마르크를 부르자 둘은 횃불을 낮춘다.

검은 뿌리다. 이미 성벽 아래를 통과했다.

${dlg('mark','…문 닫는다고 끝나는 일이 아니었네.')}

그는 즉시 교대병을 깨운다.`:`세 시간 동안 별일은 없다. 멀리 숲의 불빛도 사라진다. 별일이 없다는 것이 이렇게 다행스러운 밤은 드물다.`,choices:[choice('새벽에 잠깐 쉰다.','day3_morning')]},
orban_plan:{title:'부대장의 계산',location:'북문 경비초소',onEnter:s=>{modRel('orban',5,'도시 방어 계획을 들었다');advance(0,25);flag('오르반 계획')},text:s=>`${dlg('orban','첫째, 북문 밖 출입을 줄인다. 둘째, 물과 식량을 확보한다. 셋째, 괴담을 막는다. 넷째, 원인을 찾는다. 순서는 이거다.')}

당신이 원인을 먼저 찾아야 하지 않느냐고 묻자 그는 고개를 젓는다.

${dlg('orban','원인 찾다가 사흘 걸리면 사람은 그 전에 굶고 싸운다. 영웅은 원인을 찾고, 행정은 그동안 사람들이 죽지 않게 한다.')}

듣기 좋은 말은 아니다. 그래도 지금 가진 정보만 놓고 보면 틀렸다고 잘라 말하기도 어렵다.`,choices:[choice('경비대 일을 계속 돕겠다고 한다.','day3_morning',{do:s=>{flag('경비대 협력');vec('guard',2);rest(7)}}),choice('다른 방식으로 원인을 찾겠다고 한다.','day3_morning',{do:s=>rest(7)})]},
day3_morning:{title:'셋째 날, 도시 안의 뿌리',location:'북문 거리',onEnter:s=>{if(state.day<3){state.day=3;state.hour=7;state.minute=30}state.city.infection=Math.max(state.city.infection,18);state.city.panic=Math.max(state.city.panic,12);quest('day3','도시 안으로 들어온 것','검은 뿌리와 감염 증상이 성벽 안에서도 나타나기 시작했다. 누가 무엇을 알고 있는지 확인하고 대응책을 정한다.');flag('셋째날 시작')},text:s=>`셋째 날 아침, 북문 거리의 우물 하나가 폐쇄된다.

우물 벽 안쪽에서 검은 실뿌리가 발견됐기 때문이다.

장터에는 이미 “물을 마시면 죽는다”는 소문이 돌고, 성당 앞에는 치료를 받으려는 사람과 기도하려는 사람이 같은 줄에 섞여 있다. 경비대는 밤새 배수로를 뜯었다.

도시는 이제 북쪽의 사건을 구경하지 않는다. 사건 안에 들어와 있다.

그리고 당신을 찾는 사람이 셋 있다.`,choices:s=>[
choice('오르반과 마르크를 만나 도시 방어를 돕는다.','day3_guardroute'),
choice('이렌의 호출에 응해 감염자 연구를 돕는다.','day3_doctorroute'),
choice('아델과 토마가 찾았다는 오래된 기록을 본다.','day3_churchroute'),
...(hasFlag('met_laen')?[choice('라엔이 급히 찾는다는 전갈을 따라간다.','day3_elfroute')]:[]),
choice('이 혼란 속에서도 식량과 생계를 먼저 챙긴다.','day3_civilian') ]}
});

Object.assign(scenes,{
day3_guardroute:{title:'선을 지키는 사람들',location:'경비대 임시 상황실',onEnter:s=>{meet('orban');meet('mark');state.faction=state.faction||'guard';vec('guard',2);advance(0,20);quest('guard3','도시 배수로 차단','검은 뿌리가 들어온 배수로와 북문 하수 통로를 차단한다.')},text:s=>`${dlg('orban','도시는 지금 세 개가 부족하다. 사람, 시간, 그리고 믿을 만한 정보.')}

상황실 벽에는 도시 지도가 걸려 있다. 북문에서 중앙 우물까지 검은 선이 그어져 있다.

${dlg('mark','밤새 배수로 세 군데서 뿌리 잘랐어. 자르면 줄어들긴 하는데, 한 시간 뒤 다른 틈에서 또 나오더라.')}

오르반은 세 구역을 가리킨다. 북문 배수로, 공동묘지 아래, 중앙 우물. 병력으로 셋을 동시에 지키기 어렵다.`,choices:[choice('북문 배수로를 직접 막는다.','guard_sewer'),choice('공동묘지 아래를 다시 확인한다.','guard_cemetery'),choice('중앙 우물 주변 군중을 통제한다.','guard_well')]},
guard_sewer:{title:'성벽 아래',location:'북문 배수로',onEnter:s=>{const r=check({stat:'str',skill:'athletics',diff:62,label:'배수로 봉쇄 작업'});advance(2,0);modRes({stamina:r.ok?-18:-28});gainSkill('athletics',2);if(r.ok){state.city.infection=Math.max(0,state.city.infection-6);state.city.guard+=4;flag('북문 배수로 봉쇄');vec('guard',3);modRel('mark',6,'배수로 봉쇄를 함께했다')}else state.city.infection+=2},text:s=>hasFlag('북문 배수로 봉쇄')?`돌과 모래주머니로 통로를 막고, 드러난 뿌리는 기름을 부어 태운다. 뿌리가 타면서 검은 연기 대신 푸른빛이 아주 잠깐 피어오른다.

${dlg('mark','이게 나무면 내가 교황이다. 나무가 타면서 저런 빛을 내냐?')}

일단 흐름은 줄어든다. 그러나 벽 반대쪽에서 아주 약한 두드림이 계속된다.`:`막기 시작한 지 얼마 지나지 않아 상류에서 물이 한꺼번에 밀려온다. 젖은 흙벽이 모래주머니 무게를 버티지 못하고 무너지면서, 경비병 둘이 다시 통로 안으로 들어가 받침목부터 세워야 한다. 그 사이 검은 뿌리는 새로 벌어진 틈으로 더 깊이 파고든다. 사람을 다치게 하지 않고 작업을 끝내려면 여기서 물러날 수밖에 없다. 봉쇄는 실패했고, 문제는 오히려 도시 안쪽으로 한 걸음 들어왔다.`,choices:[choice('상황실로 돌아간다.','day3_guard_converge')]},
guard_cemetery:{title:'두 번째 납골당',location:'공동묘지 지하',onEnter:s=>{advance(1,20);modRes({stamina:-9,spirit:-6});const r=check({stat:'wis',skill:'observation',diff:63,label:'뿌리 흐름 추적'});if(r.ok){flag('지하 연결선');note('공동묘지의 뿌리는 북문 숲이 아니라 도시 아래 더 오래된 석조 통로에서 올라오고 있다.');vec('underworld',3);state.city.infection=Math.max(0,state.city.infection-2)}},text:s=>hasFlag('지하 연결선')?`지난밤 잘라낸 뿌리 끝을 따라가면 방향이 이상하다. 북쪽에서 도시로 들어온 것이 아니라, 납골당 더 아래에서 위로 올라왔다.

벽돌 하나를 빼자 뒤편에 훨씬 오래된 회색 석재가 드러난다. 폐역참 지하와 같은 양식이다.

${dlg('mark','그럼 저 숲에서 들어온 게 아니라… 원래 도시 밑에도 있었다는 거냐?')}

도시는 자신도 모르는 오래된 구조 위에 세워져 있다.`:`잘라낸 뿌리 끝은 납골당 바닥의 여러 틈으로 갈라져 들어간다. 한 갈래를 따라가면 다른 갈래와 다시 만나고, 벽을 뜯을수록 오래된 매장실만 드러난다.

${dlg('mark','젠장. 이 정도면 뿌리를 쫓는 게 아니라 미로를 파는 거네. 여기서 더 부수면 무덤부터 무너지겠다.')}

근원이 어디인지는 찾지 못했다. 다만 뿌리 끝의 굵기와 흙이 밀린 방향이 제각각이라, 한 줄기가 곧게 뻗어 들어왔다고 보기는 어렵다. 여러 갈래가 서로 다른 시기에 이곳에 닿았다는 정도만 기록해둘 수 있다.`,choices:[choice('발견을 오르반에게 보고한다.','day3_guard_converge')]},
guard_well:{title:'목마른 군중',location:'중앙 우물 광장',onEnter:s=>{const r=check({stat:'wis',skill:'persuasion',diff:62,label:'군중 진정',bonus:Math.round(rep('places','borderCity')/6+rep('factions','guard')/10)});advance(1,30);if(r.ok){state.city.panic=Math.max(0,state.city.panic-7);publicDeed({'places.borderCity':5,'factions.guard':3,'factions.poor':2},'우물가의 공포와 유언비어를 가라앉혀 충돌을 막았다','우물가에 모인 주민과 경비병들이');flag('우물 군중 진정');vec('guard',2);vec('hero',1)}else{state.city.panic+=5;publicDeed({'places.borderCity':-2},'우물가 군중을 진정시키려 했지만 소란이 더 커졌다','광장에 모인 주민들이');modRes({spirit:-6})}},text:s=>hasFlag('우물 군중 진정')?`당신은 “물에 독이 들었다”는 말을 부정하지 않는다. 대신 확인된 우물과 확인되지 않은 우물을 나눠 설명하고, 경비대가 남쪽 수로에서 물을 실어오고 있다는 사실을 반복한다.

사람들은 완전히 안심하지 않지만 줄을 선다.

${dlg('nadia','공포는 없어지진 않아. 줄만 세울 수 있어도 절반은 성공이야.')}`:`당신이 확인된 사실과 소문을 나눠 말하려는 순간, 군중 뒤에서 누군가 ‘성당이 병을 숨겼다’고 외친다. 설명은 끝까지 전달되지 못하고 앞줄의 말이 뒷줄에 닿을 때마다 다른 내용으로 바뀐다. 물통 하나가 넘어지고 그것을 새치기로 오해한 사람이 경비병을 밀친다. 마르크가 칼집째 검을 들어 사람 사이를 벌리지만, 이미 몇몇은 물을 포기하고 달아난다. 공포를 설득으로 멈추려 했지만 지금 광장에는 말을 들을 여유부터 부족하다.`,choices:[choice('상황실로 돌아간다.','day3_guard_converge')]},
day3_guard_converge:{title:'도시를 살리는 계산',location:'경비대 상황실',onEnter:s=>{questDone('guard3');advance(0,25);modRel('orban',5,'셋째 날 도시 방어를 도왔다');vec('guard',2)},text:s=>`오르반은 보고를 듣고 지도에 새 선을 긋는다.

${dlg('orban',s=>hasFlag('지하 연결선')?'좋지 않군. 도시 아래 오래된 통로가 있다면 성문 봉쇄만으론 의미가 없다.':'오늘 밤까지 버틴다. 그 사이 원인을 찾을 사람이 찾아야 한다.')}

그는 잠시 당신을 본다.

${dlg('orban','처음엔 민간인 하나라고 생각했다. 지금은 아니야. 네가 뭘 봤든, 사람을 움직일 수 있는 위치에 서기 시작했다. 그건 권한이 아니라 책임이다.')}

밖에서 종이 울린다. 성당 쪽 긴급 신호다.`,choices:[choice('성당으로 간다.','day3_crisis'),choice('경비대에 남아 지도를 더 본다.','guard_map',{req:{skill:'history',skillLv:1}})]},
guard_map:{title:'도시 아래의 옛 도시',location:'경비대 상황실',onEnter:s=>{const r=check({stat:'int',skill:'history',diff:64,label:'구도시 지도 대조'});advance(0,30);if(r.ok){flag('구도시 지하도');note('현재 도시의 북부는 더 오래된 정착지 위에 세워졌으며, 폐역참과 공동묘지 아래 구조가 하나의 지하 교통망으로 이어질 가능성이 있다.');vec('scholar',3);vec('underworld',2)}},text:s=>hasFlag('구도시 지하도')?`오래된 세금 지도를 겹쳐놓자 현재 도로와 맞지 않는 선들이 보인다. 지금은 사라진 우물과 창고, 북쪽으로 이어지는 직선 통로.

폐역참, 공동묘지, 중앙 우물까지 거의 한 축에 놓인다.

오르반이 지도 가장자리를 손가락으로 두드린다.

${dlg('orban','원래 길이었다면 출구가 더 있을 거다. 찾으면 막을 수도 있고, 반대로 안으로 들어갈 수도 있겠지.')}`:`지도를 세 장이나 겹쳐보지만 선이 좀처럼 맞지 않는다. 오래된 지도는 성벽 위치부터 지금과 다르고, 우물 이름도 두 번이나 바뀌었다.

오르반은 잠시 지도를 내려다보다가 손가락으로 한 귀퉁이를 접는다.

${dlg('orban','억지로 선을 잇지 마라. 틀린 지도 하나가 병력 스무 명을 잘못된 골목으로 보낼 수 있다. 못 찾았으면 못 찾았다고 적는 것도 일이다.')}

당신은 연결선을 긋는 대신 서로 맞지 않는 지점들을 표시해 둔다. 실패한 대조도 다음 사람이 같은 실수를 반복하지 않게 하는 기록은 된다.`,choices:[choice('긴급 신호가 난 성당으로 간다.','day3_crisis')]},
day3_doctorroute:{title:'병을 이름 붙이는 일',location:'성당 임시 진료실',onEnter:s=>{meet('iren');state.faction=state.faction||'doctor';vec('doctor',2);advance(0,20);quest('doctor3','감염 진행을 늦춰라','이렌과 함께 감염체의 반응과 환자 악화를 늦출 방법을 찾는다.')},text:s=>`진료실은 더 이상 조용하지 않다. 환자 열둘, 가족 스무 명, 성당 봉사자들까지 좁은 공간을 채운다.

이렌은 밤새 잔 흔적이 없다.

${dlg('iren','세 가지를 확인했습니다. 첫째, 북쪽에 안 간 사람도 생겼어요. 둘째, 물로 옮는 건 아닙니다. 셋째, 검은 뿌리에 가까이 있었던 사람이 훨씬 빨리 나빠져요.')}

그는 작은 유리병을 내민다. 검은 실 같은 조직이 안에서 천천히 꿈틀거린다.

${dlg('iren','그리고 이건 죽은 뒤에도 반응합니다.')}`,choices:[choice('환자 증상과 공명 반응을 비교한다.','doctor_resonance'),choice('검은 뿌리를 태우거나 약품에 담가본다.','doctor_experiment'),choice('감염자 격리 기준부터 만든다.','doctor_triage')]},
doctor_resonance:{title:'몸과 공명의 경계',location:'성당 지하 실험실',onEnter:s=>{const r=check({stat:'wis',skill:'arcana',diff:63,label:'환자와 공명 비교'});advance(1,20);modRes({mana:-8,spirit:-6});gainSkill('arcana',3);if(r.ok){flag('공명 억제 가설');note('감염체는 공명에 반응하지만 모든 공명을 같은 방식으로 흡수하지 않는다. 생명 공명은 증식을 자극하고, 빛 공명은 표면 활동을 일시 억제한다.');vec('doctor',3);vec('church',1)}},text:s=>hasFlag('공명 억제 가설')?`빛의 기도문을 가까이 읽으면 검은 실의 움직임이 느려진다. 반대로 생명 계열 치유 의식을 쓰자 순간적으로 실이 굵어진다.

이렌의 표정이 굳는다.

${dlg('iren','치유가 악화시킬 수도 있다는 뜻이네요. 살리려고 한 행동이 먹이가 될 수도 있고.')}

그는 곧바로 아델에게 기존 치유 의식 중단을 요청한다.`:`빛의 기도문, 손끝의 미약한 공명, 따뜻한 물과 차가운 금속을 차례로 가까이 대본다. 검은 실은 매번 조금씩 움직이지만 어느 반응도 두 번 똑같이 되풀이되지 않는다.

이렌이 세 번째 기록표에 선을 긋다가 펜을 내려놓는다.

${dlg('iren','여기서 더 하면 우리가 보고 싶은 반응만 보게 돼요. 지금은 모른다고 적는 게 맞습니다.')}

답은 얻지 못했지만, 적어도 성급하게 특정 공명을 치료법이라고 부를 근거도 없다는 사실은 분명해진다.`,choices:[choice('다른 실험을 이어간다.','doctor_experiment'),choice('이 결과를 바탕으로 격리와 치료 기준을 만든다.','doctor_triage')]},
doctor_experiment:{title:'살리기 위해 망가뜨리는 일',location:'성당 지하 실험실',onEnter:s=>{const r=check({stat:'int',skill:'medicine',diff:64,label:'감염체 억제 실험'});advance(1,30);gainSkill('medicine',3);if(r.ok){flag('쓴잎 억제제');item('tonic',2);note('쓴잎 약초와 소금을 고온에서 달인 용액이 감염체의 움직임을 몇 시간 억제한다. 치료제는 아니지만 진행을 늦출 수 있다.');state.city.infection=Math.max(0,state.city.infection-4);vec('doctor',4)}else state.city.infection+=2},text:s=>hasFlag('쓴잎 억제제')?`여러 약초 중 쓴잎과 소금을 진하게 달인 용액에서 검은 조직이 가장 오래 움직임을 멈춘다.

${dlg('iren','치료제 아닙니다. 절대 그렇게 말하면 안 돼요. 하지만 몇 시간을 살 수 있어요. 몇 시간이면 사람을 옮길 수도 있고, 원인을 찾을 수도 있습니다.')}

그는 기뻐하기보다 즉시 양을 계산한다. 성당 창고에 있는 약초로는 환자 서른 명에게 하루 정도.`:`불에 달인 약초, 소금물, 알코올, 성당에서 쓰는 향유까지 차례로 대보지만 반응이 일정하지 않다. 한 표본에서 멎었던 움직임이 다른 표본에서는 오히려 빨라진다. 유리병 세 개가 깨지고 귀한 약초만 줄어든다. 이렌은 짜증을 숨기지 못하다가, 마지막 기록에는 ‘효과 없음’이 아니라 ‘재현 실패’라고 적는다. 아무것도 못 찾았다는 사실보다 우연을 치료법으로 착각하지 않는 편이 중요하다는 판단이다.`,choices:[choice('환자 우선순위를 정한다.','doctor_triage')]},
doctor_triage:{title:'누구에게 먼저 약을 줄 것인가',location:'임시 진료실',onEnter:s=>{advance(1,0);flag('분류 치료');vec('doctor',2)},text:s=>`약도 침상도 부족하다. 결국 순서를 정해야 한다.

이렌이 명단을 당신에게 건넨다.

어린아이 둘. 경비병 셋. 증상이 심한 노인 넷. 아직 걸을 수 있는 환자 다섯.

${dlg('iren','의학적으로만 보면 회복 가능성이 높은 사람부터입니다. 하지만 도시 전체를 보면 경비병을 먼저 살리는 게 맞을 수도 있어요. 가족은 아이부터라고 할 거고요.')}

정답이 없는 선택이 아니라, 정답이 여러 개라 잔인한 선택이다.`,choices:[
choice('회복 가능성이 높은 환자부터 치료한다.','doctor_triage_result',{do:s=>{flag('분류 생존율');state.city.infection-=3;modRel('iren',6,'생존율 기준을 선택했다');vec('doctor',2)}}),
choice('아이와 노약자부터 치료한다.','doctor_triage_result',{do:s=>{flag('분류 약자우선');state.city.panic-=3;modRel('adel',4,'약자를 우선했다');vec('hero',1)}}),
choice('경비병과 필수 인력을 먼저 치료한다.','doctor_triage_result',{do:s=>{flag('분류 기능우선');state.city.guard+=6;modRel('orban',4,'도시 기능을 우선했다');vec('guard',1)}})]},
doctor_triage_result:{title:'치료의 기준',location:'임시 진료실',onEnter:s=>{questDone('doctor3');advance(0,30)},text:s=>`${dlg('iren',s=>hasFlag('분류 생존율')?'잔인해 보여도 많은 사람을 살리는 방식이에요. 오늘은 그 기준으로 갑시다.':hasFlag('분류 약자우선')?'알겠습니다. 그 선택도 의학 밖에서는 충분히 이유가 있어요.':'좋아요. 도시가 무너지면 환자도 못 살립니다. 대신 이 선택은 기록에 남겨야 해요.')}

이렌은 당신 선택을 그대로 받아들이지만 책임까지 대신 가져가지는 않는다.

잠시 뒤 성당 종이 급하게 울린다. 지하 창고 쪽에서 비명이 들린다.`,choices:[choice('비명 쪽으로 달려간다.','day3_crisis')]},
day3_churchroute:{title:'빛의 기록과 지워진 문장',location:'북문 성당 기록고',onEnter:s=>{meet('adel');meet('toma');state.faction=state.faction||'church';vec('church',2);advance(0,20);quest('church3','지워진 기록','인간력 이전의 교단 기록에서 아홉 공명과 오래된 길에 관한 문장을 찾는다.')},text:s=>`토마는 밤새 찾아낸 두 권의 사본을 펼친다. 같은 경전인데 문장이 다르다.

오래된 사본: “빛은 아홉 중 첫째로 길을 비추었다.”

새 사본: “빛은 유일한 길잡이로 길을 비추었다.”

${dlg('toma','한 글자 차이가 아니에요. 뜻을 바꾼 겁니다.')}
${dlg('adel','후대 교리 정리 과정에서 수정됐을 가능성이 있습니다. 문제는 왜였는지지요.')}

더 오래된 장부에는 세계수에 대한 단어가 두 번 등장하지만, 두 곳 모두 칼로 긁어 지워져 있다.`,choices:[choice('교황청 계통의 검열 흔적을 찾는다.','church_censorship'),choice('세계수 관련 기록부터 복원한다.','church_worldtree'),choice('폐역참의 아홉 홈과 경전 표현을 대조한다.','church_nine')]},
church_censorship:{title:'누가 문장을 바꿨는가',location:'성당 기록고',onEnter:s=>{const r=check({stat:'int',skill:'history',diff:64,label:'필사 계통 추적'});advance(1,0);gainSkill('history',2);if(r.ok){flag('교리 개정 흔적');note('인간력 초기, 여러 지역 교회가 통합되면서 빛을 9공명 중 하나로 묘사한 구절들이 체계적으로 수정되었다. 현재 교황청 이전 세대의 결정으로 보인다.');vec('church',3);vec('scholar',3)}},text:s=>hasFlag('교리 개정 흔적')?`필사자의 이름과 연대를 따라가자 수정 시기가 거의 한 세대 안에 몰려 있다.

빛을 ‘아홉 중 하나’로 묘사한 표현이 여러 지역에서 동시에 사라진다. 우연한 필사 오류가 아니다.

${dlg('adel','교리를 통일하려 했겠지요. 혼란을 막기 위해서였을 수도 있습니다.')}
${dlg('toma','아니면 사람들이 몰라도 된다고 생각했거나요.')}

아델은 토마를 꾸짖지 않는다. 그 점이 더 의미심장하다.`:`사본마다 필사자의 이름과 연대가 달라 어느 한 줄에서 시작됐는지 따라잡을 수가 없다. 어떤 책은 문장을 통째로 바꿨고, 어떤 책은 여백에 다른 표현을 덧붙였다.

토마가 세 권째 책을 덮으며 눈을 비빈다.

${dlg('toma','누가 처음 바꿨는지는 모르겠어요. 그런데 다들 조금씩 바꿨다는 건 더 무섭지 않나요?')}

아델은 대답하지 않는다. 최초의 검열자를 찾지는 못했지만, 교리가 한 번의 명령보다 오랜 편집 끝에 지금 모습이 되었을 가능성은 남는다.`,choices:[choice('세계수 기록을 확인한다.','church_worldtree'),choice('아홉 홈과 경전을 대조한다.','church_nine')]},
church_worldtree:{title:'세계수라는 금지어',location:'성당 기록고',onEnter:s=>{const r=check({stat:'int',skill:'theology',diff:65,label:'지워진 문장 복원'});advance(0,50);gainSkill('theology',2);if(r.ok){flag('세계수 에너지 기록');note('오래된 교단 기록은 세계수를 단순한 엘프 성목이 아니라 "여왕의 죽음 이후 거대한 생명 공명이 머문 그릇"으로 묘사한다.');vec('worldtree',4);vec('church',2)}},text:s=>hasFlag('세계수 에너지 기록')?`긁힌 글자를 옆 페이지의 인용문과 맞추자 한 문장이 복원된다.

“서쪽의 큰 나무에는 여왕이 남긴 생명의 파동이 머무르니, 누구도 그것을 제 것이라 부르지 말라.”

아델의 얼굴이 굳는다.

${dlg('adel','현재 교단에는 이런 가르침이 없습니다. 오히려 세계수는 엘프의 옛 신앙 대상으로만 배웁니다.')}

교단이 세계수를 모르는 것이 아니라, 다르게 기억하고 있을 가능성이 생긴다.`:`칼끝으로 긁어낸 자국을 빛에 비춰보고, 앞뒤 장부의 필체와도 맞춰보지만 지워진 획이 너무 많다. 건질 수 있는 것은 ‘여왕’, ‘생명’, ‘머무름’ 같은 몇 단어뿐이다. 셋을 한 문장으로 묶는 순간부터는 복원이 아니라 추측이 된다. 아델도 그 선을 넘지 말자는 듯 빈칸을 그대로 남겨둔다.`,choices:[choice('아홉 홈 기록과 대조한다.','church_nine')]},
church_nine:{title:'아홉과 하나',location:'성당 기록고',onEnter:s=>{const r=check({stat:'wis',skill:'theology',diff:63,label:'교리 구조 해석'});advance(0,45);if(r.ok){flag('아홉 하나 구조');note('초기 교단은 아홉 공명을 서로 독립된 신적 힘으로 보면서도, 그 힘들이 한 질서 안에 놓인다고 보았다. 열 번째 존재에 대한 직접 기록은 없다.');vec('demigod',2);vec('scholar',2)}questDone('church3')},text:s=>hasFlag('아홉 하나 구조')?`문장들을 이어보면 초기 교단은 빛만을 말하지 않았다. 아홉 힘을 모두 인정하면서 그중 빛을 길잡이로 섬겼다.

하지만 ‘아홉을 묶는 것’에 대해서는 표현이 모호하다. 질서, 원, 창조의 흔적.

열 번째라는 단어는 없다.

${dlg('adel','없는 것을 기록하지 않은 건지, 기록에서 없앤 건지 구분하기 어렵군요.')}

그때 아래층에서 비명이 터진다.`:`몇 줄의 교리를 대조했지만 구조를 확신하기 어렵다. 그래도 오래된 기록이 아홉 공명을 지금보다 훨씬 직접적으로 다뤘다는 사실만은 분명하다.\n\n${dlg('adel','오늘은 여기까지 결론 내립시다. 모르는 것을 아는 척하는 순간 기록은 다시 교리가 됩니다.')}\n\n그때 아래층에서 비명이 터진다.`,choices:[choice('진료실 쪽으로 내려간다.','day3_crisis')]},
day3_elfroute:{title:'라엔이 숨긴 두 번째 조각',location:'북문 여관 다락',onEnter:s=>{meet('laen');state.faction=state.faction||'elf';vec('elf',3);advance(0,20);quest('elf3','두 번째 청동조각','라엔이 숨겨온 두 번째 청동 조각과 옛길의 관계를 확인한다.')},text:s=>`라엔은 방문을 잠근 뒤 청동패를 탁자에 놓는다.

그리고 목걸이 안쪽에서 아주 작은 금속 조각 하나를 더 꺼낸다.

${dlg('laen','미안. 처음부터 다 보여주지 않았다. 우리 집에서 내려온 것은 둘이다.')}

두 조각을 맞추면 반원에 가까운 모양이 된다. 중앙에는 나무뿌리 같은 문양과 아홉 개의 점.

${dlg('laen','할아버지가 남긴 편지에 하나만 적혀 있다. “완성하지 마라.”')}`,choices:[choice('왜 이제 보여주는지 묻는다.','laen_reason'),choice('두 조각을 맞춰 문양을 확인한다.','laen_join_token'),choice('위험하다. 두 조각을 따로 보관하라고 한다.','laen_separate')]},
laen_reason:{title:'신뢰와 두려움',location:'여관 다락',onEnter:s=>{modRel('laen',5,'숨긴 이유를 들었다');advance(0,15)},text:s=>`${dlg('laen',s=>effectiveRel('laen')>=30?'네가 문을 봤고도 나를 경비대에 팔지 않았다. 그리고 도시가 아픈데도 도망가지 않았다. 이제 숨기면 더 위험하다.':'어제는 너를 몰랐다. 오늘은 조금 안다. 그 정도 차이다.')}

라엔은 조각을 손바닥에 올려둔다.

${dlg('laen','우리 집은 이걸 열쇠라고 부르지 않았다. “빚의 증표”라고 했다. 누가 누구에게 진 빚인지는 아무도 모른다.')}`,choices:[choice('두 조각을 맞춰본다.','laen_join_token'),choice('그래도 완성하지 말자고 한다.','laen_separate')]},
laen_join_token:{title:'맞닿는 순간',location:'여관 다락',onEnter:s=>{modRes({mana:-8,spirit:-7});state.stability-=4;state.resonanceAwareness=Math.max(2,state.resonanceAwareness);flag('청동패 반원 완성');vec('elf',2);vec('underworld',2);vec('worldtree',2);advance(0,10)},text:s=>`두 조각이 닿는 순간 금속끼리 부딪히는 소리가 나지 않는다.

대신 아주 낮은 울림이 방 안을 돈다. 아홉 점 중 대지와 생명에 해당한다고 느껴지는 두 점이 희미하게 빛난다.

창밖, 도시 어딘가에서 개들이 동시에 짖기 시작한다.

라엔이 즉시 조각을 떼어낸다.

${dlg('laen','할아버지가 맞았다. 완성하면 안 된다.')}

바닥 아래에서 아주 약한 진동이 한 번 지나간다.`,choices:[choice('조각 하나를 자신이 맡아 서로 떨어뜨려 둔다.','laen_splitcarry'),choice('둘 다 라엔이 숨기게 한다.','laen_separate')]},
laen_splitcarry:{title:'나눠 든 빚',location:'여관 다락',onEnter:s=>{item('bronze',1);modRel('laen',10,'가문의 위험한 유물을 나눠 맡았다');flag('청동조각 보관');vec('elf',3);advance(0,10)},text:s=>`당신은 작은 조각 하나를 맡는다.

라엔은 주기 전에 세 번이나 손을 놓지 않는다.

${dlg('laen','잃어버리면 화낼 거다. 팔면 쫓아갈 거다. 죽으면… 내가 다시 가져간다.')}

마지막 말은 농담처럼 했지만 눈은 웃지 않는다.`,choices:[choice('도시에서 울린 진동의 원인을 확인하러 간다.','day3_crisis')]},
laen_separate:{title:'완성하지 않는 선택',location:'여관 다락',onEnter:s=>{modRel('laen',6,'유물을 완성하지 않기로 했다');flag('청동패 분리 유지');vec('elf',2);advance(0,10)},text:s=>`두 조각은 다시 서로 다른 천에 싸인다.

${dlg('laen','좋다. 어떤 물건은 완성하는 게 회복이 아니다. 부서진 채로 있는 것이 안전할 수 있다.')}

그 순간 성당 쪽에서 다급한 종소리가 울린다. 라엔이 창가로 간다.`,choices:[choice('성당으로 달려간다.','day3_crisis')]},
day3_civilian:{title:'살아가는 쪽의 선택',location:'중앙 장터와 남쪽 밭',onEnter:s=>{meet('nadia');meet('mara');advance(2,0);vec('farmer',2);vec('merchant',1);state.silver+=2;state.food+=1},text:s=>`세상이 이상해져도 누군가는 빵을 굽고, 물을 긷고, 밭을 갈아야 한다.

당신은 장터와 남쪽 밭 사이를 오가며 물건을 나르고 배수로를 고친다. 사람들은 북쪽 소문을 말하면서도 결국 오늘 먹을 것을 묻는다.

${dlg('mara','저 사람들 원인 찾는 동안 우린 밥 만들면 돼. 세상 구하는 데 꼭 칼 들 필요 없어.')}
${dlg('nadia','그리고 도시 망하면 영웅도 외상값 못 갚아.')}

그 말은 농담이지만, 실제로 도시의 하루는 이런 일들로 버틴다.`,choices:[choice('식량 배급을 돕는다.','civilian_food'),choice('개인 몫을 챙기고 위험해지기 전에 도시를 떠날 준비를 한다.','civilian_leaveprep'),choice('그래도 성당의 긴급 종소리는 무시하기 어렵다.','day3_crisis')]},
civilian_food:{title:'배급표',location:'중앙 장터',onEnter:s=>{const r=check({stat:'int',skill:'trade',diff:56,label:'배급 정리',bonus:Math.round(rep('factions','merchants')/7+rep('factions','farmers')/8+rep('factions','poor')/10)});advance(2,0);modRes({stamina:-9});if(r.ok){state.city.food+=6;state.city.panic-=4;modRel('nadia',7,'식량 배급을 함께 정리했다');publicDeed({'factions.merchants':4,'factions.farmers':4,'factions.poor':6,'places.borderCity':4},'상인과 농가를 묶어 민간 식량 배급망을 만들었다','배급 줄의 주민과 상인, 농민들이');vec('farmer',1);vec('merchant',1);vec('hero',1);flag('민간 배급망')}else publicDeed({'places.borderCity':-2,'factions.merchants':-1},'배급 질서를 세우려 했지만 장부와 줄의 혼란을 바로잡지 못했다','배급을 기다리던 주민들이')},text:s=>hasFlag('민간 배급망')?`상인과 농가를 묶어 하루치 배급량을 정한다. 돈이 있는 사람에게 더 많이 파는 대신, 한 집에 살 수 있는 양을 제한한다.

욕하는 사람도 있지만 줄은 유지된다.

${dlg('nadia','장사보다 귀찮고 돈도 안 돼. 그런데 내일도 장터 열려면 이게 맞겠지.')}
${dlg('mara','남쪽 밭에서 더 가져올 수 있어. 대신 경비 붙여. 수레 털리면 끝이야.')}`:`첫 장부터 숫자가 맞지 않는다. 가족이 다섯이라고 한 사람이 다른 줄에서는 일곱이라고 하고, 창고에 없다고 한 밀가루가 뒷문으로 빠져나가는 모습도 보인다.

목소리가 커질수록 줄은 앞으로 가지 않고 옆으로 퍼진다. 나디아가 장부를 덮으며 이를 악문다.

${dlg('nadia','지금 필요한 건 계산 잘하는 사람이 아니라, 거짓말해도 손해라는 걸 모두가 믿게 만드는 거야. 오늘은 그걸 못 만들었네.')}

배급은 계속되지만 누구도 공정하다고 느끼지 못한 채 시간이 흘러간다.`,choices:[choice('긴급 종소리가 난 성당으로 간다.','day3_crisis')]},
civilian_leaveprep:{title:'떠날 수 있을 때 떠난다',location:'남문 거리',onEnter:s=>{flag('도시 탈출 준비');vec('farmer',1);vec('merchant',1);advance(1,0);state.silver=Math.max(0,state.silver-2);state.food+=2},text:s=>`남문은 아직 열려 있다. 북문과 달리 검문도 느슨하다.

은화 두 닢이면 남쪽으로 가는 짐수레 자리를 하나 살 수 있다. 내일 아침 출발한다는 약속을 받아둔다.

도시를 버리는 것은 비겁할 수도 있고, 합리적일 수도 있다. 당신은 아직 어느 쪽인지 결정하지 않는다.

그때 북쪽에서 긴급 종이 연달아 울린다. 남문 쪽 사람들까지 고개를 든다.`,choices:[choice('그래도 무슨 일인지 확인하러 간다.','day3_crisis'),choice('약속한 수레 근처에서 밤을 보낸다.','day4_escapechance',{do:s=>rest(6)})]},
day3_crisis:{title:'성당 지하에서 나온 것',location:'북문 성당 지하 창고',onEnter:s=>{advance(0,10);state.city.panic+=4;flag('셋째날 위기');quest('crisis3','성당 지하의 감염체','지하 창고 벽을 뚫고 나온 검은 뿌리와 감염체를 막는다.')},text:s=>`성당 지하 창고 벽이 안쪽에서 갈라져 있다.

검은 뿌리가 벽 틈을 벌리며 들어왔고, 그 사이에서 사람 팔 하나가 튀어나온다. 묻힌 지 오래된 시신이다. 말라붙은 피부 아래 검은 실이 근육처럼 움직인다.

뒤이어 두 번째 시신이 벽을 밀고 나온다.

토마가 얼어붙는다.

${dlg('adel','토마! 위층 사람들부터 내보내!')}
${dlg('iren','머리보다 뿌리 연결을 끊어야 할 수도 있어요!')}

아델은 기도문을 외우고, 경비병은 계단을 막는다.`,choices:[choice('감염된 시신을 막는다.',null,{do:s=>startCombat({name:'뿌리에 움직이는 시신',hp:76,atk:18,def:7,accuracy:57,speed:43,fear:3,winTo:'crisis3_after',fleeTo:'crisis3_flee',onWin:s=>flag('성당 시신 격퇴')})}),choice('시신보다 벽의 뿌리를 먼저 끊는다.','crisis3_root',{req:{stat:'wis',min:50}}),choice('위층 환자 대피를 돕는다.','crisis3_evacuate')]},
crisis3_root:{title:'몸이 아니라 줄을 끊는다',location:'성당 지하 창고',onEnter:s=>{const r=check({stat:'str',skill:'survival',diff:66,label:'움직이는 뿌리 절단'});advance(0,10);modRes({stamina:-13,spirit:-5});if(r.ok){flag('성당 뿌리 핵 절단');state.city.infection-=5;vec('worldtree',3);vec('hero',1)}else modRes({hp:-8})},text:s=>hasFlag('성당 뿌리 핵 절단')?`시신의 움직임보다 벽에서 이어지는 굵은 줄기를 노린다.

칼과 도끼가 들어갈 때마다 시신들이 동시에 경련한다. 마지막 굵은 뿌리가 끊어지자 두 몸이 실이 잘린 인형처럼 무너진다.

${dlg('iren','맞았어요. 몸이 아니라 바깥 연결이 움직이고 있었어요.')}

아델은 쓰러진 시신 앞에서 짧게 기도한다.`:`굵은 줄기를 노리고 들어가지만 뿌리는 시신보다 빠르게 반응한다. 칼을 내리치는 순간 가느다란 가지가 손목을 휘감아 벽 쪽으로 잡아당긴다. 균형을 잃은 사이 움직이는 시신 하나가 바로 옆까지 다가오고, 경비병이 당신 팔을 감은 뿌리를 겨우 베어낸다. 줄기의 위치는 확인했지만 한 번에 끊을 각도는 만들지 못했다. 다음에는 몸과 뿌리를 동시에 막아야 한다.`,choices:[choice('벽 너머를 확인한다.','crisis3_after')]},
crisis3_evacuate:{title:'싸우지 않는 전투',location:'성당 1층',onEnter:s=>{const r=check({stat:'wis',skill:'persuasion',diff:58,label:'환자 대피'});advance(0,20);modRes({stamina:-10,spirit:-4});if(r.ok){state.city.panic-=4;flag('환자 대피 성공');vec('hero',2);modRel('adel',5,'환자 대피를 도왔다');modRel('iren',4)}else state.city.panic+=2},text:s=>hasFlag('환자 대피 성공')?`당신은 계단에서 올라오는 소리를 설명하지 않는다. 대신 “남쪽 회랑으로 이동한다”고 반복한다. 사람들이 이유를 묻기 전에 침상 순서부터 정한다.

공포는 설명보다 명령에 잠시 멈춘다.

마지막 환자를 옮길 때 아래에서 큰 충격음이 나고, 잠시 뒤 조용해진다.`:`환자보다 보호자가 먼저 움직이지 못한다. 가족을 두고 가라는 말로 들렸는지 침상 하나를 두고 세 사람이 서로 붙잡으면서 복도가 막힌다. 그때 누군가 지하에서 ‘죽은 사람이 올라온다’고 외치자 줄 전체가 뒤로 밀린다. 당신은 아이 하나를 벽 쪽으로 끌어내고 넘어진 침상을 세우지만, 정해둔 대피 순서는 이미 무너졌다. 무기를 들지 않은 싸움에서도 사람을 움직이는 데 실패하면 누군가는 제자리에 남는다.`,choices:[choice('지하 상황을 확인한다.','crisis3_after')]},
crisis3_flee:{title:'계단 위',location:'성당 1층',onEnter:s=>{advance(0,15);state.city.panic+=6;flag('성당 지하 후퇴')},text:s=>`당신은 계단 위로 물러난다. 뒤에서 경비병과 아델이 간신히 지하문을 닫는다.

무거운 것이 아래에서 문을 몇 번 친다.

${dlg('adel','비겁하다고 생각하지 마십시오. 살아 있는 사람이 있어야 문도 막습니다.')}

하지만 지하를 포기한 대가는 분명하다.`,choices:[choice('위층 환자 대피를 돕는다.','crisis3_evacuate')]},
crisis3_after:{title:'성당 아래의 길',location:'성당 지하 창고',onEnter:s=>{questDone('crisis3');advance(0,25);flag('성당 지하 균열');note('성당 지하 벽 뒤에도 폐역참과 같은 회색 석조 통로가 있으며, 검은 뿌리는 그 통로를 따라 올라왔다.');vec('underworld',3)},text:s=>`시신이 멈춘 뒤 벽의 갈라진 틈을 넓힌다.

뒤편은 흙이 아니다.

회색 석재로 만든 오래된 통로. 폐역참 지하와 같은 구조다. 도시는 훨씬 오래된 무엇 위에 세워져 있었다.

토마가 횃불을 들고 틈을 들여다본다.

${dlg('toma','저 길… 어디까지 가요?')}
${dlg('adel','지금은 들어가지 않습니다.')}
${dlg('orban','아니. 이제는 들어가야 할 수도 있다. 뿌리를 밖에서 자르는 건 끝이 없어.')}

처음으로 모두의 시선이 같은 방향을 향한다. 아래.`,choices:[choice('내일 지하 통로를 조사해야 한다고 동의한다.','day3_night'),choice('먼저 도시 사람들을 안전하게 빼낼 길을 만들어야 한다고 한다.','day3_night',{do:s=>{vec('hero',1);state.city.guard+=2}}),choice('검은 문과 이 통로가 연결된다고 말한다.','day3_night',{if:s=>hasFlag('검은 문 조우'),do:s=>{flag('지하망 연결 공개');vec('underworld',1)}})]},
day3_night:{title:'셋째 날 밤, 각자의 이유',location:'북문 성당 회의실',onEnter:s=>{advance(1,0);questDone('day3');quest('underway','도시 아래의 통로','내일 새벽, 오래된 지하 통로에 들어가 검은 뿌리의 근원을 찾는다.')},text:s=>`작은 회의실에 서로 다른 사람들이 모인다.

오르반은 도시를 살리려고 한다.
아델은 이것이 교단과 어떤 관계인지 확인하려 한다.
이렌은 감염을 멈출 원인을 찾는다.
라엔이 있다면 자기 가문의 빚과 할아버지의 죽음을 확인하고 싶어 한다.

그리고 당신은 아직 이유를 하나로 정하지 못했을 수도 있다.

${dlg('orban','내일 내려간다. 자원자만. 못 돌아올 가능성도 있다.')}
${dlg('iren','내려가기 전에 할 일 있으면 오늘 하세요. 농담이 아니라 진짜로요.')}`,choices:[choice('마르크와 술 한 잔을 한다.','night_mark'),choice('아델과 둘이 이야기한다.','night_adel'),choice('이렌을 찾아간다.','night_iren'),choice('라엔과 청동패를 확인한다.','night_laen',{if:s=>hasFlag('met_laen')}),choice('아무도 만나지 않고 혼자 쉰다.','day4_morning',{do:s=>rest(7)})]},
night_mark:{title:'문을 지키는 이유',location:'북문 경비초소 뒤',onEnter:s=>{modRel('mark',8,'위험한 밤에 술을 나눴다');advance(0,40);modRes({spirit:6});flag('마르크 가족 이야기')},text:s=>`마르크는 술을 한 모금 마시고 성벽을 본다.

${dlg('mark','나 원래 북쪽 마을 사람이야. 군대 끝나고 도시로 들어왔지. 문 안이 안전할 줄 알았거든.')}

그는 웃는다.

${dlg('mark','근데 문이 안전한 게 아니라, 누가 문 앞에 서 있느냐가 중요한 거더라. 그래서 그냥 계속 여기 서 있어.')}

거창한 신념은 없다. 그 단순함이 오히려 믿을 만하다.`,choices:[choice('내일 같이 내려가자고 한다.','day4_morning',{do:s=>{flag('마르크 동행 약속');vec('guard',1);rest(6)}}),choice('내일은 성벽을 지켜달라고 한다.','day4_morning',{do:s=>{modRel('mark',2);state.city.guard+=3;rest(6)}})]},
night_adel:{title:'신을 믿는 것과 교단을 믿는 것',location:'성당 작은 예배실',onEnter:s=>{modRel('adel',8,'신앙과 교단에 대해 솔직히 대화했다');advance(0,45);flag('아델 의심');vec('church',2)},text:s=>`${dlg('adel','신을 의심해본 적 있느냐고 묻는다면 없다고 하겠습니다. 교단을 의심해본 적 있느냐면… 오늘만 해도 여러 번입니다.')}

촛불이 작게 흔들린다.

${dlg('adel','사람은 신의 뜻을 직접 들을 수 없어서 제도를 만듭니다. 그런데 제도는 오래되면 자신이 신의 뜻이라고 착각하지요.')}

그는 당신을 본다.

${dlg('adel','내일 아래에서 무엇을 보더라도, 그것이 곧 신의 명령이라고 생각하지 마십시오. 강한 힘은 명령처럼 느껴지기 쉽습니다.')}`,choices:[choice('그 말을 기억하겠다고 한다.','day4_morning',{do:s=>{vec('godslayer',1);rest(6)}}),choice('그래도 신의 힘이라면 따라야 하지 않겠냐고 묻는다.','day4_morning',{do:s=>{vec('church',1);rest(6)}})]},
night_iren:{title:'선을 넘는 의사',location:'성당 진료실 뒤편',onEnter:s=>{modRel('iren',8,'위험한 연구에 대한 생각을 나눴다');advance(0,45);flag('이렌 실험 욕망')},text:s=>`이렌은 환자가 잠든 사이 검은 조직을 얇게 잘라본다.

${dlg('iren','이걸 이해하면 죽은 몸을 움직이는 원리도, 어쩌면 끊어진 신경을 다시 잇는 원리도 알 수 있어요.')}

목소리가 조금 빨라져 있다.

${dlg('iren','무서운 건 알아요. 그런데 사람을 살릴 수 있는 지식이 위험하다는 이유로 버려져야 할까요?')}

그는 스스로 답을 모르는 사람처럼 당신을 본다.`,choices:[choice('살릴 수 있어도 사람을 재료로 보면 안 된다고 말한다.','day4_morning',{do:s=>{modRel('iren',3,'연구의 선을 경고했다');vec('doctor',1);rest(6)}}),choice('지식을 얻을 수 있다면 위험을 감수할 가치가 있다고 한다.','day4_morning',{do:s=>{modRel('iren',6,'위험한 연구를 이해했다');flag('이렌 연구 지지');vec('doctor',2);rest(6)}})]},
night_laen:{title:'완성되지 않은 원',location:'여관 다락방',onEnter:s=>{modRel('laen',7,'지하 진입 전 마지막으로 유물을 확인했다');advance(0,40);vec('elf',2)},text:s=>`${dlg('laen','내일 아래 가면 이 조각이 반응할 거다. 좋은 일인지 나쁜 일인지 모른다.')}

그는 청동패를 탁자에 놓는다.

${dlg('laen','우리 집은 할아버지가 실패했다고 생각했다. 그런데 만약 실패한 게 아니라 일부러 완성하지 않은 거라면?')}

당신은 답하지 못한다.

라엔은 아주 잠깐 웃는다.

${dlg('laen','살아서 나오면 그때 따져보자. 네가 읽은 인간 기록이 틀렸는지, 우리 노래가 틀렸는지.')}`,choices:[choice('살아서 나오자고 약속한다.','day4_morning',{do:s=>{modRel('laen',5,'생환을 약속했다');rest(6)}})]},
day4_escapechance:{title:'남문으로 향하는 수레',location:'남문',onEnter:s=>{if(state.day<4){state.day=4;state.hour=6;state.minute=30}state.city.infection=Math.max(state.city.infection,28);state.city.panic=Math.max(state.city.panic,22)},text:s=>`약속한 짐수레가 남문 밖으로 나갈 준비를 한다.

북쪽 사건이 더 커졌다는 소문이 밤새 퍼졌다. 지금 떠나면 아직 안전하게 빠져나갈 수 있을지도 모른다.

수레 주인이 당신 짐을 본다.

“탈 거면 지금 타. 문 닫히면 난 책임 안 져.”

멀리 북문 성당에서 종이 울린다.`,choices:[choice('수레에 탄다. 도시를 떠난다.','ending_departure'),choice('마지막 순간 마음을 바꿔 북문으로 돌아간다.','day4_morning',{do:s=>{flag('탈출 포기');vec('hero',1)}})]},
day4_morning:{title:'넷째 날, 아래로 가는 사람들',location:'북문 성당 지하',onEnter:s=>{if(state.day<4){state.day=4;state.hour=6;state.minute=40}state.city.infection=Math.max(state.city.infection,26);state.city.panic=Math.max(state.city.panic,20);const party=['mark','adel','iren','toma'];if(hasFlag('met_laen')&&effectiveRel('laen')>-35)party.push('laen');setCompanions(party);if(hasCompanion('laen'))flag('라엔 지하원정 참여');quest('descent','지하 통로 탐사','성당 아래의 오래된 통로를 따라 검은 뿌리의 근원을 찾는다.');flag('지하 원정 시작')},text:s=>`새벽. 지하로 내려가는 사람은 많지 않다.

오르반은 도시 방어 때문에 남고, 마르크가 전투 인원을 이끈다. 아델, 이렌, 그리고 기록을 맡은 토마가 뒤따른다.

${hasCompanion('laen')?'라엔도 말없이 장비를 챙겨 대열 끝에 선다. 당신을 믿어서라기보다, 이 길 아래에 자기 집안의 답이 있다고 믿기 때문일 것이다.':'라엔의 모습은 보이지 않는다. 이 탐사에 끼어들 만큼 당신과 경비대를 믿지 못했거나, 이미 자기 방식으로 다른 길을 찾고 있을지도 모른다.'}

${dlg('orban','정오까지 소식 없으면 입구를 닫는다. 오후까지 없으면 너희를 실종으로 처리한다.')}
${dlg('mark','격려 한번 참 좋네.')}

누군가 웃고, 그 짧은 웃음이 모두에게 필요했다.`,choices:[choice('횃불을 들고 지하 통로로 들어간다.','under_tunnel')]},
under_tunnel:{title:'도시보다 오래된 길',location:'구도시 지하 통로',onEnter:s=>{advance(0,30);modRes({stamina:-7,spirit:-4});flag('고대 통로 진입')},text:s=>`통로는 사람이 두 명 나란히 걸을 만큼 넓다. 벽에는 일정한 간격으로 홈이 있고, 홈마다 오래전에 금속을 끼웠던 흔적이 있다.

바닥 중앙으로 검은 뿌리가 지나간다. 북쪽으로만 뻗는 것이 아니라 가지처럼 여러 방향으로 갈라진다.

${dlg('toma','이게 도로였으면… 도시 아래에 또 도시가 있는 것 같아요.')}
${hasCompanion('laen')?dlg('laen','우리 말로는 이런 길을 “뿌리길”이라고 불러. 비유인 줄 알았는데.'):'토마가 벽의 갈라진 선을 보며 뿌리와 길이 어느 쪽이 먼저였을지 중얼거린다.'}

멀리서 물 흐르는 소리와 아주 낮은 진동이 겹친다.`,choices:[choice('뿌리를 따라 가장 굵은 쪽으로 간다.','under_rootway'),choice('벽의 금속 홈을 조사한다.','under_fixture'),choice('갈림길 표식을 읽는다.','under_sign',{req:{skill:'language',skillLv:2}})]},
under_fixture:{title:'사라진 금속판',location:'구도시 지하 통로',onEnter:s=>{const r=check({stat:'int',skill:'history',diff:62,label:'벽 홈 용도 추정'});advance(0,20);if(r.ok){flag('지하 공명판');note('벽 홈은 횃불 거치대가 아니라 얇은 금속판을 꽂는 자리로 보이며, 옛길 청동패와 재질이 비슷했을 가능성이 있다.');vec('scholar',2);vec('underworld',1)}},text:s=>hasFlag('지하 공명판')?`홈 안쪽에 녹청이 남아 있다. 청동 계열 금속이 오랫동안 끼워져 있었던 흔적이다.

라엔의 청동패와 비슷한 폭.

${hasCompanion('laen')?dlg('laen','패가 하나뿐이 아니었어. 길 전체에 이런 게 있었다면… 우리 집 물건은 열쇠가 아니라 길을 표시하던 표식일 수도 있어.'):'당신은 장터에서 보았던 청동패의 모양을 떠올린다. 같은 형태의 금속이 이 홈마다 끼워져 있었다면, 하나의 열쇠보다 길 전체를 표시하는 체계에 가까웠을 것이다.'}`:`홈의 폭과 깊이를 재보지만 횃불 받침인지, 장식판 자리인지, 다른 장치의 일부인지 가려내지 못한다. 녹청처럼 보였던 얼룩도 흙과 광물 침전이 뒤섞여 있어 확신할 수 없다.

손가락으로 가장자리를 훑자 같은 간격의 홈이 통로 끝까지 이어진다는 것만은 분명하다. 무언가가 반복해서 설치돼 있었지만, 그 무언가는 이미 오래전에 모두 사라졌다.`,choices:[choice('가장 굵은 뿌리를 따라간다.','under_rootway')]},
under_sign:{title:'위, 아래, 돌아감',location:'구도시 지하 갈림길',onEnter:s=>{const r=check({stat:'int',skill:'language',diff:61,label:'제3문자 표식 해독'});advance(0,15);if(r.ok){flag('지하 표식 해독');gainSkill('language',2);note('제3문자 갈림길 표식은 "위쪽 도시", "아래쪽 맥", "되돌아가는 문" 세 방향을 구분한다.');vec('scholar',2)}},text:s=>hasFlag('지하 표식 해독')?`폐역참에서 봤던 제3문자와 같은 기호다.

하나는 위를 뜻한다. 현재 도시 방향.
하나는 아래를 뜻한다. 더 깊은 곳.
마지막 하나는 ‘되돌아감’ 혹은 ‘귀환’에 가깝다.

아델이 마지막 표식을 오래 본다.

${dlg('adel','교단 고어의 “귀환”과 형태가 닮았습니다. 우리가 그 말을 여기서 가져갔을 수도 있겠군요.')}`:`몇몇 기호는 폐역참에서 본 흔적과 닮았지만, 닮았다는 사실만으로 뜻을 정할 수는 없다. 위를 가리키는 것처럼 보이는 획이 다른 벽에서는 옆으로 누워 있고, 같은 원형 기호도 위치에 따라 모양이 조금씩 다르다.

토마가 종이를 돌려 보다가 고개를 젓는다.

${dlg('toma','읽는 방향부터 다른 걸 수도 있겠네요. 괜히 아는 글자에 맞춰 읽었다가 반대로 갈 수도 있어요.')}

당신은 의미를 억지로 붙이지 않고 표식의 모양과 위치만 베껴둔다.`,choices:[choice('아래쪽 맥 방향으로 간다.','under_rootway'),choice('귀환 표식 방향을 확인한다.','under_returnpath')]},
under_returnpath:{title:'닫힌 원형문',location:'구도시 지하 귀환로',onEnter:s=>{advance(0,25);modRes({spirit:-3});flag('귀환문 발견');vec('underworld',2)},text:s=>`짧은 통로 끝에 작은 원형문이 있다. 검은 문과 달리 회색 돌로 되어 있고, 중앙에 청동 원판이 빠진 듯한 홈이 있다.

${hasItem('bronze')?`당신이 가진 청동 조각이 아주 약하게 따뜻해진다.`:''}

문 너머에서는 바람이 분다. 막힌 공간에서 날 수 없는 바람이다.

${dlg('mark','오늘 목적은 여기 아니야. 표시만 해. 다른 데 새지 말고.')}`,choices:[choice('표시만 하고 뿌리를 따라간다.','under_rootway'),choice('청동 조각을 홈에 가까이 대본다.','returnpath_token',{if:s=>hasItem('bronze')})]},
returnpath_token:{title:'아직 완성되지 않은 문',location:'원형문 앞',onEnter:s=>{modRes({mana:-5,spirit:-5});modResonance('wind',3,-2);flag('귀환문 반응');vec('elf',1);vec('underworld',2);advance(0,10)},text:s=>`조각을 홈에 가까이 대자 문 안쪽에서 바람 소리가 커진다.

하지만 조각이 불완전해서인지 문은 열리지 않는다. 대신 벽에 아주 짧게 선 하나가 켜져 북쪽을 가리킨다.

라엔이 있다면 자기 조각을 꺼내려다 멈춘다.

${hasCompanion('laen')?dlg('laen','할 수는 있어. 하지만 지금은 안 할 거야. 할아버지가 남긴 말을 기억하니까.'):''}

당신도 억지로 완성하지 않는다.`,choices:[choice('표시를 기억하고 뿌리길로 돌아간다.','under_rootway')]},
under_rootway:{title:'검은 뿌리의 강',location:'지하 뿌리길',onEnter:s=>{advance(0,35);modRes({stamina:-8,spirit:-5});flag('뿌리강 도착');state.stability=clamp(state.stability-2,0,100)},text:s=>`통로가 넓어지면서 바닥 절반을 검은 뿌리가 덮는다.

가느다란 뿌리 수백 개가 같은 방향으로 흐르듯 이어진다. 멀리서 보면 검은 강 같다. 그 위에 흰 뼛조각이 박혀 있다. 사람 것만은 아니다. 짐승, 새, 오래된 정체불명의 뼈까지.

이렌은 표정을 잃는다.

${dlg('iren','이게 영양분을 가져가는 구조라면… 죽은 조직을 쓰는 이유도 설명될 수 있어요.')}
${dlg('adel','어디로 가져가는지가 더 중요하겠군요.')}

앞쪽에서 희미한 푸른 빛이 난다.`,choices:[choice('뿌리 흐름을 따라 푸른 빛 쪽으로 간다.','under_chamber'),choice('뼈와 뿌리의 결합을 조사한다.','under_bones',{req:{skill:'medicine',skillLv:2}}),choice('뿌리를 일부 끊어 흐름 변화를 본다.','under_cut')]},
under_bones:{title:'죽음은 재료가 된다',location:'지하 뿌리길',onEnter:s=>{const r=check({stat:'int',skill:'medicine',diff:66,label:'뼈와 뿌리 결합 조사'});advance(0,25);if(r.ok){flag('사체 재활용 구조');note('검은 뿌리는 죽은 생물의 신경과 골수를 따라 자라며, 남은 공명과 생체 물질을 흡수하는 듯하다.');vec('doctor',3);vec('worldtree',2)}},text:s=>hasFlag('사체 재활용 구조')?`뿌리는 아무 곳이나 감지 않는다. 척추, 두개골 바닥, 긴 뼈의 골수강을 따라간다.

이렌이 낮게 중얼거린다.

${dlg('iren','죽은 몸을 움직이는 게 목적이 아니에요. 이동 수단으로 쓰는 겁니다. 필요한 걸 모아 어디론가 보내기 위해서.')}

“무엇을 모으는데?”

${dlg('iren','몸에 남은 것. 열, 영양, 그리고… 당신들이 공명이라고 부르는 것도 아마.')}`:`뿌리는 뼈 사이를 파고들어 있지만 어디를 향해 자란 것인지 일정하지 않아 보인다. 몇 가닥은 갈비뼈를 감고, 몇 가닥은 두개골 안쪽에서 끊긴다.

이렌이 뼈 하나를 뒤집어 보다가 손을 멈춘다.

${dlg('iren','원래 시신을 따라 자란 건지, 자란 뒤에 뼈가 여기 모인 건지부터 모르겠어요. 순서를 모르면 원인도 못 정합니다.')}

당신은 표본만 조금 떼어두고, 죽은 것을 재료로 쓴다는 결론은 보류한다.`,choices:[choice('푸른 빛 쪽으로 간다.','under_chamber')]},
under_cut:{title:'강을 막으면 생기는 일',location:'지하 뿌리길',onEnter:s=>{const r=check({stat:'str',skill:'survival',diff:65,label:'굵은 뿌리 절단'});advance(0,15);modRes({stamina:-12});if(r.ok){flag('지하 주뿌리 절단');state.city.infection=Math.max(0,state.city.infection-5);state.stability-=2;vec('worldtree',2)}else modRes({hp:-5})},text:s=>hasFlag('지하 주뿌리 절단')?`여러 사람이 힘을 합쳐 굵은 줄기 하나를 끊는다.

즉시 주변 뿌리들이 파도처럼 수축한다. 멀리 푸른 빛이 한 번 강해졌다 약해진다.

그리고 통로 깊은 곳에서 무언가 깨어난 듯한 진동이 온다.

${dlg('mark','좋은 신호는 아닌 것 같은데.')}`:`첫 번째 칼질은 검은 껍질만 벗긴다. 두 번째에는 은빛 액체가 튀고, 잘린 자리 주변의 가느다란 가지들이 동시에 당신 쪽으로 휘어진다.

몇 사람이 함께 힘을 보태도 굵은 줄기는 절반쯤 패인 채 버틴다. 당신은 더 밀어붙이기 전에 물러난다. 상처를 입힌 것만으로도 주변 뿌리가 수축해 움직임을 바꾼다는 사실은 확인했다.

${dlg('mark','안 끊겼는데도 반응은 하네. 문제는 저게 겁먹은 건지, 화난 건지 모르겠다는 거고.')}`,choices:[choice('푸른 빛 쪽으로 서둘러 간다.','under_chamber')]},
under_chamber:{title:'맥의 방',location:'지하 고대 석실',onEnter:s=>{advance(0,30);modRes({spirit:-9,mana:6});state.resonanceAwareness=Math.max(2,state.resonanceAwareness);flag('맥의 방');vec('underworld',3);vec('worldtree',3)},text:s=>`통로 끝에서 거대한 원형 석실이 나온다.

천장은 보이지 않을 만큼 높고, 중앙에는 검은 뿌리들이 모여 사람 허리 굵기의 한 줄기가 된다. 그 줄기는 바닥 중앙 구멍을 통해 더 아래로 내려간다.

주변에는 아홉 개의 낮은 기둥. 각각 다른 광택의 광물이 박혀 있다.

그리고 열 번째 자리.

기둥은 없고 둥근 홈만 비어 있다.

${dlg('adel','…아홉과 빈자리.')}
${hasCompanion('laen')?dlg('laen','우리 노래에 있던 그 쉼표야.'):'토마는 열 번째 자리 앞에서 한동안 말을 잃는다.'}
${dlg('iren','뿌리는 전부 저 아래로 갑니다.')}`,choices:[choice('아홉 기둥의 반응을 확인한다.','chamber_nine'),choice('중앙 구멍 아래를 들여다본다.','chamber_depth'),choice('빈 열 번째 홈을 조사한다.','chamber_tenth')]},
chamber_nine:{title:'아홉 공명의 장치',location:'맥의 방',onEnter:s=>{const r=check({stat:'wis',skill:'arcana',diff:67,label:'아홉 기둥 공명 읽기'});advance(0,25);modRes({mana:-8,spirit:-5});gainSkill('arcana',3);if(r.ok){flag('아홉 기둥 네트워크');state.resonanceAwareness=Math.max(3,state.resonanceAwareness);note('아홉 기둥은 각각 9공명에 대응하며, 서로 독립된 제단이 아니라 중앙 흐름을 조절하는 하나의 장치다.');vec('demigod',3);vec('scholar',2)}},text:s=>hasFlag('아홉 기둥 네트워크')?`하나씩 가까이 가면 몸의 다른 부분이 반응한다.

빛은 눈 뒤, 불은 가슴, 대지는 발바닥. 생명과 죽음은 서로 반대가 아니라 같은 줄의 양끝처럼 느껴진다.

아홉 기둥에서 나온 미세한 선은 모두 중앙 구멍 주변으로 모인다.

${dlg('adel','신전이 아니라 조절 장치군요. 힘을 모시는 곳이 아니라 흐름을 관리하는 곳.')}

그 해석은 현재 종교관과 꽤 다르다.`:`기둥 하나에 다가설 때마다 피부와 호흡이 다르게 반응한다. 뜨거워지는 곳, 귀가 먹먹해지는 곳, 오래된 기억이 떠오르는 곳. 그러나 두 기둥 사이에 서면 감각이 겹쳐 어느 쪽에서 온 것인지 분간이 흐려진다.

몇 번 더 자리를 옮기자 머릿속에서 맥박 소리가 커진다. 당신은 더 버티기 전에 물러난다. 아홉 개가 서로 다른 힘이라는 건 느껴지지만, 그것들이 어떻게 연결되는지는 아직 읽히지 않는다.`,choices:[choice('중앙 깊이를 확인한다.','chamber_depth'),choice('열 번째 홈을 조사한다.','chamber_tenth')]},
chamber_tenth:{title:'없는 기둥의 자리',location:'맥의 방 열 번째 홈',onEnter:s=>{const r=check({stat:'wis',skill:'arcana',diff:72,label:'빈자리 공명'});advance(0,15);modRes({mana:-10,spirit:-12});state.stability=clamp(state.stability-(r.ok?5:9),0,100);if(r.ok){flag('열번째 성장감');note('열 번째 빈자리는 오래전부터 비어 있었지만 최근 들어 미세한 공명 잔향이 축적되고 있다. 누군가 설치한 기둥이 사라진 자리가 아니라, 아직 채워지지 않은 자리일 가능성이 있다.');vec('demigod',5);vec('creator',2)}},text:s=>hasFlag('열번째 성장감')?`빈 홈에 손을 가까이 대는 순간 아무것도 느껴지지 않는다.

그래서 더 이상하다.

아홉 기둥 주변에는 각기 다른 소음이 있는데, 여기만 완벽하게 조용하다. 그 조용함 속에서 아주 작은 박동이 생겼다가 사라진다.

아직 태어나지 않은 무엇이 자리를 먼저 만들고 있는 듯한 감각.

아델이 당신 손목을 잡아 뒤로 당긴다.

${dlg('adel','그만. 당신 얼굴이 하얗습니다.')}`:`당신은 호흡을 가다듬고 아홉 기둥에서 느꼈던 감각을 하나씩 떠올려 빈자리와 비교한다. 그러나 이곳에는 뜨거움도 냉기도, 생명의 맥박도 죽음의 정적도 없다. 오히려 비교하려 할수록 생각 사이가 비어가는 듯한 피로만 커진다. 무엇이 없는 것인지, 아직 생기지 않은 것인지조차 구분하지 못한 채 한 걸음 물러난다. 읽지 못했다는 사실 자체가 지금 얻을 수 있는 유일한 정보다.`,choices:[choice('중앙 구멍으로 간다.','chamber_depth')]},
chamber_depth:{title:'아래에서 올라오는 사람',location:'맥의 방 중앙',onEnter:s=>{advance(0,10);modRes({spirit:-6});flag('깊은 통로 조우')},text:s=>`중앙 구멍 아래에는 계단이 있다.

아주 오래된 계단. 검은 뿌리가 난간과 벽을 덮고 더 깊은 곳으로 내려간다.

그때 아래에서 발소리가 난다.

한 걸음.
한 걸음.

사람 하나가 올라온다.

옷은 인간식이지만 적어도 수십 년은 된 양식이다. 얼굴은 말라붙었고 눈동자는 검다. 목에는 앞서 본 청동패와 닮은 문양이 걸려 있다.

${hasCompanion('laen')?'라엔이 숨을 멈춘다.':''}
${hasCompanion('laen')?dlg('laen','…할아버지.'):'당신은 그 문양이 우연히 닮았다고 넘기기 어렵다는 생각을 한다. 하지만 이 사람이 누구인지는 아직 알 수 없다.'}`,choices:[choice('무기를 들지 않고 말을 건다.','grandfather_talk'),choice('감염체다. 먼저 제압한다.',null,{do:s=>startCombat({name:'오래된 귀환자',hp:92,atk:20,def:9,accuracy:63,speed:57,fear:3,winTo:'grandfather_down',fleeTo:'under_retreat'})}),choice('라엔에게 판단을 맡긴다.','grandfather_laen',{if:s=>hasCompanion('laen')})]},
grandfather_talk:{title:'돌아오지 못한 사람',location:'맥의 방',onEnter:s=>{const r=check({stat:'wis',skill:'language',diff:67,label:'오래된 엘프 방언 대화'});advance(0,15);if(r.ok){flag('조부 대화 성공');if(hasCompanion('laen'))modRel('laen',10,'할아버지에게 말을 걸 기회를 줬다');vec('elf',4)}else modRes({spirit:-5})},text:s=>hasFlag('조부 대화 성공')?`당신은 인간 공용어 대신 라엔에게 들은 오래된 표현을 섞어 천천히 말한다.

“약속을 갚으러 왔습니까?”

귀환자의 고개가 멈춘다.

입술이 갈라지며 한 단어가 나온다.

“아니다.”

두 번째.

“막으러.”

${hasCompanion('laen')?'라엔의 눈이 흔들린다.':'그가 당신의 말을 알아들었다는 사실만으로 방 안의 긴장이 달라진다.'}

귀환자는 자기 목의 청동 문양을 잡고 중앙 구멍을 가리킨다.

“아래… 열면… 위가 먹힌다.”`:`당신은 아는 단어와 손짓을 섞어 말을 걸어보지만, 오래된 방언의 소리와 지금의 표현이 자꾸 어긋난다. 귀환자는 당신 얼굴이 아니라 입 모양만 쫓다가 같은 단어를 반복한다.

“막아. 막아. 막아.”

무엇을, 누구에게서 막으라는 뜻인지는 붙잡지 못한다. 그 뒤 몸이 갑자기 경직되고 바닥의 뿌리가 함께 당겨진다.`,choices:[choice('무엇을 막았는지 더 묻는다.','grandfather_message'),choice('청동 문양을 달라고 손을 내민다.','grandfather_token')]},
grandfather_laen:{title:'가족의 목소리',location:'맥의 방',onEnter:s=>{const bonus=effectiveRel('laen')>=35?8:0;const r=check({stat:'wis',skill:'language',diff:68-bonus,label:'라엔의 옛 방언을 보조'});advance(0,15);if(r.ok){flag('조부 대화 성공');modRel('laen',12,'가족의 재회를 지켜줬다');vec('elf',5)}},text:s=>hasFlag('조부 대화 성공')?`${dlg('laen','아라 벨. 세른 라엔. 나는 네 아이의 아이.')}

귀환자의 검은 눈이 처음으로 흔들린다.

그가 라엔의 얼굴을 만지려다 손을 멈춘다. 손끝에서 검은 실이 움직인다.

“오지… 말랬다.”

라엔은 울지 않는다. 대신 이를 악문다.

${dlg('laen','왜 돌아오지 않았어?')}

“문… 아래. 뿌리… 살았다.”`:`라엔은 어릴 때 들었다는 오래된 노래를 낮게 부르고, 가족의 이름을 하나씩 불러본다. 귀환자의 눈동자가 잠시 움직이지만 라엔을 알아본 흔적인지는 알 수 없다. 오히려 바닥의 검은 뿌리가 노랫소리에 반응하듯 꿈틀거리며 그의 몸을 뒤로 당긴다. 라엔은 다음 소절을 잇지 못한다.`,choices:[choice('계속 듣는다.','grandfather_message'),choice('위험하다. 거리를 벌린다.','grandfather_down')]},
grandfather_message:{title:'첫 번째 경고',location:'맥의 방 중앙',onEnter:s=>{advance(0,20);flag('조부 경고');note(hasCompanion('laen')?'라엔의 조부는 오래전 이 지하에서 ‘아래의 문’이 열리는 것을 막기 위해 남았다. 검은 뿌리는 최근 갑자기 다시 살아났다고 한다.':'오래된 귀환자는 이 지하에서 ‘아래의 문’이 열리는 것을 막기 위해 남았다고 말한다. 검은 뿌리는 최근 갑자기 다시 살아났다고 한다. 그의 신원은 아직 알 수 없다.');vec('underworld',4);if(hasCompanion('laen'))vec('elf',2)},text:s=>`귀환자는 긴 문장을 만들지 못한다. 대신 단어를 이어 붙인다.

“옛길. 아래 길. 문.”

“뿌리… 죽지 않았다.”

“오래 조용.”

“최근… 부름. 위에서? 아래에서? 모른다.”

그는 열 번째 빈자리를 가리킨다.

“저기… 없었다. 지금… 생긴다.”

아델과 이렌이 동시에 그쪽을 본다.

마지막으로 귀환자는 자기 가슴을 친다.

“나는 문지기. 실패.”`,choices:[choice('청동 문양을 받아 봉인을 이어가겠다고 한다.','grandfather_token'),choice('이제 쉬어도 된다고 말한다.','grandfather_rest'),choice('더 아래로 내려가 근원을 확인해야 한다고 한다.','grandfather_depth')]},
grandfather_token:{title:'완성된 원',location:'맥의 방',onEnter:s=>{item('seal',1);flag('완전한 봉인문양');if(hasCompanion('laen')){modRel('laen',6,'조부의 유산을 함께 받았다');vec('elf',3)}vec('underworld',3);advance(0,10)},text:s=>`귀환자는 목의 청동 원판을 떼어낸다. ${hasCompanion('laen')?'라엔이 지닌 두 조각과 같은 문양이지만, 이것은 끊어진 곳 없이 완전하다.':'장터와 옛길에서 본 청동 문양과 같은 계통이지만, 이것은 끊어진 곳 없이 완전하다.'}

${hasCompanion('laen')?'그가 당신에게 주려다 라엔을 보고, 다시 당신을 본다.':'그가 원판을 내밀려다 멈추고 당신의 얼굴을 오래 바라본다.'}

결국 바닥에 내려놓는다. 선택을 강요하지 않겠다는 듯.

${hasCompanion('laen')?dlg('laen','이게 완성하지 말라고 한 원래 물건인가… 아니면 다른 하나인가.'):'원판의 나뭇가지 문양은 라엔의 청동패와 같은 계통이지만, 이것은 처음부터 하나의 원으로 만들어져 있다.'}

원판은 열 번째 자리가 비어 있는 아홉 점의 원이다.`,choices:[choice('원판을 챙기고 우선 지상으로 돌아간다.','under_retreat'),choice('원판을 이용해 더 아래 봉인을 확인한다.','grandfather_depth')]},
grandfather_rest:{title:'문지기의 끝',location:'맥의 방',onEnter:s=>{modRel('laen',8,'조부에게 끝을 허락했다');flag('조부 안식');vec('elf',3);modRes({spirit:-6});advance(0,15)},text:s=>`라엔은 오래 말하지 않는다.

당신이 “이제 쉬어도 된다”고 하자 귀환자의 어깨가 아주 조금 내려간다.

검은 실핏줄이 목에서 천천히 사라지는 것이 아니라, 힘을 잃고 마른다.

${hasCompanion('laen')?'그는 라엔 쪽으로 몸을 기울인 채 무릎을 꿇는다.':'그는 벽에 한 손을 짚은 채 천천히 무릎을 꿇는다.'}

${hasCompanion('laen')?`${dlg('laen','내가 늦은 게 아니야. 당신이 너무 오래 여기 있었던 거야.')}

그 말 뒤에야 라엔의 목소리가 처음으로 떨린다.`:'누구를 기다렸는지는 끝내 알 수 없다. 다만 마지막 순간만큼은 무엇인가를 지키려 버티던 힘을 내려놓은 듯 보인다.'}`,choices:[choice('유해와 청동 문양을 수습한다.','under_retreat',{do:s=>{item('seal',1);flag('조부 유해 수습')}}),choice('경고대로 아래 봉인을 확인한다.','grandfather_depth')]},
grandfather_down:{title:'쓰러진 귀환자',location:'맥의 방',onEnter:s=>{advance(0,10);flag('조부 제압');modRes({spirit:-7});if(hasCompanion('laen'))modRel('laen',-8,'조부가 쓰러지는 것을 보았다')},text:s=>`오래된 몸이 바닥에 쓰러진다. 검은 실이 피부 아래에서 꿈틀거리다가 천천히 멎는다.

목에는 청동 원판이 남아 있다.

라엔이 있다면 한동안 가까이 오지 않는다.

${hasCompanion('laen')?dlg('laen','이게 옳았는지는 묻지 마. 나도 모르겠어.'):'누구였는지 알 수 없지만 오래전부터 이곳에 묶여 있던 사람인 것은 분명하다.'}`,choices:[choice('청동 원판을 수습한다.','under_retreat',{do:s=>{item('seal',1);flag('완전한 봉인문양')}}),choice('더 아래를 확인한다.','grandfather_depth')]},
grandfather_depth:{title:'아래의 문을 보다',location:'맥의 방 아래 계단',onEnter:s=>{advance(0,35);modRes({stamina:-7,spirit:-10,mana:4});state.stability-=4;flag('심층 접근');vec('underworld',5)},text:s=>`계단은 맥의 방보다 훨씬 아래로 내려간다.

공기는 따뜻해지고, 검은 뿌리는 굵어진다.

마침내 길이 끊긴 곳에서 거대한 벽이 나타난다. 벽 전체가 문인지, 산의 일부인지 구분하기 어렵다. 표면에는 제3문자조차 없다.

대신 중앙에 아주 작은 균열이 있다.

균열 너머에서 바람이 아니라 숨 같은 것이 나온다.

아델은 한 발도 더 가지 않는다.

${dlg('adel','이건 우리가 오늘 열어볼 수 있는 것이 아닙니다.')}
${dlg('iren','동의합니다. 궁금하지만… 이건 실험실 크기가 아니네요.')}`,choices:[choice('균열에 완전한 봉인문양을 댄다.','deep_seal',{if:s=>hasItem('seal')}),choice('균열의 공명을 직접 느껴본다.','deep_listen',{req:{stat:'wis',min:60}}),choice('위치를 기억하고 즉시 돌아간다.','under_retreat')]},
deep_seal:{title:'잠깐의 침묵',location:'심층 거대문',onEnter:s=>{modRes({mana:-12,spirit:-10});state.stability-=3;flag('심층 임시봉인');state.city.infection=Math.max(0,state.city.infection-12);vec('underworld',4);vec('hero',2);advance(0,10)},text:s=>`청동 원판을 균열 앞에 대는 순간 아홉 점이 차례로 빛난다.

완전히 닫히지는 않는다.

하지만 숨 같은 바람이 멈추고, 주변 검은 뿌리가 동시에 축 늘어진다.

멀리 도시 쪽에서 이어지던 진동도 약해진다.

원판 중앙의 빈자리에는 아무 빛도 없다.

그 빈자리가 오히려 가장 눈에 띈다.`,choices:[choice('원판을 그대로 고정해두고 돌아간다.','under_retreat',{do:s=>{item('seal',-1);flag('봉인문양 심층 고정')}}),choice('원판을 회수한다. 임시 효과만 확인했다.','under_retreat')]},
deep_listen:{title:'문 너머의 바다',location:'심층 거대문',onEnter:s=>{const r=check({stat:'wis',skill:'arcana',diff:76,label:'심층 공명 접촉'});advance(0,5);modRes({mana:-18,spirit:-18});state.stability=clamp(state.stability-(r.ok?8:16),0,100);if(r.ok){flag('심층 바다 감지');state.resonanceAwareness=3;note('거대문 너머에는 하나의 존재가 아니라 셀 수 없이 많은 공명과 의식의 흔적이 겹쳐 있다. 지하세계의 더 큰 구조가 있음을 처음 감지했다.');vec('underworld',7);vec('demigod',3)}else modRes({hp:-9})},text:s=>hasFlag('심층 바다 감지')?`당신은 균열 가까이 귀를 대지 않는다. 의식만 가까이 가져간다.

그리고 즉시 후회한다.

너머에는 한 목소리가 없다.

수백, 수천 개의 잔향. 오래전에 죽은 것, 아직 움직이는 것, 인간과 닮지 않은 것. 그 모든 것이 거대한 어둠 속에서 서로 겹쳐 있다.

문은 무언가 하나를 가둔 문이 아니다.

세계 하나를 막은 문처럼 느껴진다.`:`균열 가까이 의식을 가져가는 순간 머릿속이 하얗게 비어버린다. 소리라기보다 한꺼번에 밀려드는 압력에 가깝다. 무언가를 분명 들었는데, 그것이 말이었는지 비명이었는지조차 기억이 형태를 갖기 전에 부서진다. 정신을 떼어냈을 때는 코피가 입술까지 흘러 있다. 문 너머에 무엇이 있는지는 모르지만, 지금의 당신이 오래 들여다볼 곳이 아니라는 사실만은 몸이 먼저 알아차린다.`,choices:[choice('더 버티지 못한다. 지상으로 돌아간다.','under_retreat')]},
under_retreat:{title:'지상으로',location:'구도시 지하 통로',onEnter:s=>{questDone('descent');advance(1,20);modRes({stamina:-10});flag('첫 심층탐사 귀환')},text:s=>`돌아오는 길은 내려올 때보다 길다.

이제 통로를 볼 때마다 위에 있는 집과 거리, 우물과 성당이 떠오른다. 사람들이 평생 모르고 살았던 길이 발밑에 있었다.

${dlg('toma','위로 나가면… 뭐라고 설명하죠?')}
${dlg('mark','전부 설명하지 마. 먼저 문부터 열고 살아 있는 얼굴 보여줘.')}

마침내 성당 지하 틈에서 햇빛이 보인다.`,choices:[choice('지상으로 올라간다.','day4_return')]},
day4_return:{title:'넷째 날 오후, 잠깐의 안정',location:'북문 성당',onEnter:s=>{setCompanions([]);advance(0,30);state.city.infection=Math.max(0,state.city.infection-(hasFlag('심층 임시봉인')||hasFlag('봉인문양 심층 고정')?8:2));quest('return4','탐사 보고','지하에서 본 것을 누구에게 어떻게 공개할지 결정한다.');flag('넷째날 귀환')},text:s=>`지상은 놀랄 만큼 밝다.

도시는 여전히 살아 있다. 장터에서 고함이 들리고, 누군가는 빨래를 널고, 아이가 골목을 뛴다.

지하에서 본 것과 같은 세계라고 믿기 어렵다.

오르반이 보고를 기다리고 있다. 나디아와 마레나 같은 민간인들도 이미 성당 밖에 모였다. 소문을 막을 단계는 지났다.

무엇을 공개할지 결정해야 한다.`,choices:[choice('지하 통로와 감염 원인을 가능한 한 사실대로 공개하자고 한다.','report_public'),choice('핵심만 공개하고 심층 문과 열 번째 빈자리는 숨긴다.','report_controlled'),choice('공포가 더 위험하다. 공식 발표를 최소화한다.','report_secret')]},
report_public:{title:'진실을 공개하는 위험',location:'성당 앞 광장',onEnter:s=>{const r=check({stat:'wis',skill:'persuasion',diff:65,label:'공개 설명'});advance(1,0);flag('전면 공개');if(r.ok){state.city.panic=Math.max(0,state.city.panic-5);state.city.guard+=3;vec('hero',2);vec('scholar',1)}else state.city.panic+=9;modRel('orban',-4,'과도한 공개로 혼란을 키웠다');questDone('return4')},text:s=>hasFlag('전면 공개')&&state.lastSystemType==='good'?`당신은 괴물과 신의 저주 같은 단어를 피하고, 확인된 사실과 모르는 사실을 나눈다.

도시 아래 오래된 통로가 있다. 검은 뿌리가 감염과 연결돼 있다. 지하 봉인을 강화하면 증상이 줄어든다. 아직 완전히 해결된 것은 아니다.

사람들은 두려워하지만 적어도 무엇을 해야 하는지는 안다.`:`말이 끝나기도 전에 “도시 아래 죽은 자의 나라가 있다”는 식으로 소문이 변한다. 누군가 남문으로 달리고, 상점 셔터가 닫힌다.

진실이 항상 공포를 줄여주는 것은 아니다.`,choices:[choice('혼란을 수습하며 다음 날을 준비한다.','day5_morning')]},
report_controlled:{title:'말할 것과 숨길 것',location:'성당 회의실',onEnter:s=>{flag('통제 공개');state.city.panic=Math.max(0,state.city.panic-2);modRel('orban',5,'정보 공개 수위를 함께 조절했다');vec('guard',1);vec('church',1);questDone('return4');advance(0,40)},text:s=>`${dlg('orban','좋다. 지하 통로와 감염 원인은 공개한다. 거대한 문, 열 번째 자리 같은 건 지금 말해도 아무도 할 수 있는 게 없어.')}

아델도 동의한다.

${dlg('adel','숨기는 것과 거짓말하는 것은 다릅니다. 지금은 필요한 만큼만 말하되 기록은 남겨야 합니다.')}

토마가 모든 내용을 별도 장부에 적는다. 언젠가 누군가 읽게 될 기록이다.`,choices:[choice('오늘은 사람들을 돕고 쉰다.','day5_morning')]},
report_secret:{title:'소문보다 단단한 침묵',location:'성당 회의실',onEnter:s=>{flag('비밀 유지');state.city.panic+=1;modRel('orban',3);modRel('adel',-2);vec('underworld',2);questDone('return4');advance(0,30)},text:s=>`${dlg('orban','공식 발표는 “북문 지하 시설에서 오염원 발견, 통제 중”으로 간다. 그 이상은 말하지 않는다.')}

아델이 불편한 표정으로 묻는다.

${dlg('adel','사람들이 나중에 우리가 알고도 숨겼다는 걸 알면요?')}
${dlg('orban','나중에 화낼 사람이 살아 있어야지.')}

둘 다 틀렸다고 하기 어렵다.`,choices:[choice('밤을 보내고 다음 날을 준비한다.','day5_morning')]},
day5_morning:{title:'다섯째 날, 도시가 선택을 요구한다',location:'서부 변경도시',onEnter:s=>{if(state.day<5){state.day=5;state.hour=8;state.minute=0}rest(6);state.day=5;state.hour=8;state.minute=0;state.city.panic=clamp(state.city.panic,0,100);state.city.infection=clamp(state.city.infection,0,100);quest('day5','도시의 방향','근원을 완전히 봉쇄할지, 파괴할지, 연구할지, 도시를 포기할지 결정해야 한다.')},text:s=>`하룻밤 사이 상황이 조금 나아졌다.

검은 실핏줄 환자의 악화 속도가 느려졌고, 북문 우물의 뿌리도 움직임이 줄었다. 하지만 완전히 멈춘 것은 아니다.

오늘 밤을 넘기는 데는 성공했다. 이제 사람들은 처음으로 그다음을 묻기 시작한다.

각자가 다른 답을 들고 당신을 찾아온다.

오르반은 심층 통로를 무너뜨리자고 한다.
아델은 아홉 기둥을 이용해 봉인을 강화할 방법을 찾자고 한다.
이렌은 뿌리와 감염체를 연구하면 치료뿐 아니라 새로운 의학을 얻을 수 있다고 한다.
라엔은 청동 문양을 이용해 오래된 약속의 방식으로 문을 닫아야 한다고 본다.

마레나는 간단히 말한다.`,choices:[choice('오르반의 파괴 계획을 듣는다.','plan_guard'),choice('아델의 봉인 의식을 듣는다.','plan_church'),choice('이렌의 연구 계획을 듣는다.','plan_doctor'),choice('라엔의 오래된 약속을 듣는다.','plan_elf',{if:s=>hasFlag('met_laen')&&effectiveRel('laen')>-25}),choice('마레나와 나디아가 준비한 민간 대피안을 듣는다.','plan_civilian')]},
plan_guard:{title:'무너뜨리면 끝나는가',location:'경비대 상황실',onEnter:s=>{modRel('orban',3);vec('guard',2);advance(0,20)},text:s=>`${dlg('orban','화약은 없지만 지지벽을 무너뜨릴 수 있다. 성당 아래 통로부터 폐역참까지 연쇄로 막는다. 길이 없어지면 뿌리도 올라오기 어려워진다.')}

아델이 반론한다.

${dlg('adel','심층 문 자체가 손상되면 더 큰 문제가 생길 수도 있습니다.')}

오르반은 안다. 그래서 표정이 굳어 있다.

${dlg('orban','그렇다고 아무것도 안 하고 다음 발병 기다릴 순 없다. 도시 방어는 확실한 것부터 한다.')}`,choices:[choice('파괴 계획을 지지한다.','commit_guard',{do:s=>{state.faction='guard';flag('파괴 계획 지지');vec('guard',4)}}),choice('다른 계획도 듣고 결정한다.','day5_morning')]},
plan_church:{title:'아홉 기둥의 봉인',location:'성당 예배실',onEnter:s=>{modRel('adel',3);vec('church',2);advance(0,20)},text:s=>`${dlg('adel','맥의 방의 아홉 기둥은 흐름을 조절합니다. 우리가 각 기둥을 안정시키면 중앙 뿌리 흐름을 차단할 수 있을 겁니다.')}

토마가 여러 경전 구절을 펼쳐놓는다.

${dlg('toma','문제는 빛 말고 다른 공명 의식을 교단에서 제대로 안 배운다는 거예요.')}

즉, 지금 교단의 지식만으로는 아홉을 다 다룰 수 없다.

아델은 당신의 공명을 본다.

${dlg('adel','당신이라면 몇 개는 직접 반응시킬 수 있습니다. 위험하지만요.')}`,choices:[choice('봉인 의식을 지지한다.','commit_church',{do:s=>{state.faction='church';flag('아홉 봉인 지지');vec('church',4);vec('demigod',1)}}),choice('다른 계획도 듣는다.','day5_morning')]},
plan_doctor:{title:'위험한 지식의 값',location:'성당 지하 실험실',onEnter:s=>{modRel('iren',3);vec('doctor',2);advance(0,20)},text:s=>`${dlg('iren','완전히 태워버리면 끝날 수도 있어요. 그런데 그러면 왜 죽은 신경이 움직였는지, 왜 공명에 반응했는지도 영원히 모릅니다.')}

그는 작은 병을 보여준다. 검은 조직이 억제제 안에서 거의 움직이지 않는다.

${dlg('iren','통제할 수 있다면 이건 질병이 아니라 기술이 될 수도 있어요. 절단된 신경, 죽어가는 장기… 지금 못 살리는 사람을 살릴 수 있을지도.')}

눈빛이 밝다. 그래서 위험하다.`,choices:[choice('연구하되 도시 안전을 우선하는 조건으로 지지한다.','commit_doctor',{do:s=>{state.faction='doctor';flag('통제 연구 지지');vec('doctor',4)}}),choice('그 생각 자체가 위험하다고 반대한다.','day5_morning',{do:s=>{modRel('iren',-4,'감염체 연구에 반대했다');vec('godslayer',1)}})]},
plan_elf:{title:'약속은 봉인보다 오래간다',location:'북문 여관 다락',onEnter:s=>{modRel('laen',3);vec('elf',2);advance(0,20)},text:s=>`${dlg('laen','우리 노래에서 문은 힘으로 닫지 않는다. 두 쪽이 약속을 지켜서 닫힌다.')}

“두 쪽?”

${dlg('laen','서쪽 사람과 나무의 사람. 인간 기록은 왕과 엘프 여왕이라고 썼을 수도 있다. 정확히 모른다. 하지만 청동 원판은 계약 증표다.')}

그는 완전한 봉인문양이 있다면 그것을 사용해 ‘약속’을 다시 맺어야 한다고 말한다.

문제는 누구와 약속하는지 아무도 모른다는 것이다.`,choices:[choice('라엔의 방식으로 봉인을 복원한다.','commit_elf',{do:s=>{state.faction='elf';flag('약속 봉인 지지');vec('elf',5);vec('worldtree',2)}}),choice('상대도 모르는 약속은 위험하다고 말한다.','day5_morning',{do:s=>modRel('laen',-2)})]},
plan_civilian:{title:'도시는 사람이지 돌이 아니다',location:'중앙 장터',onEnter:s=>{meet('mara');meet('nadia');advance(0,20);vec('farmer',2);vec('merchant',1)},text:s=>`${dlg('mara','저 밑에 뭐가 있든, 사람부터 빼면 돼. 남쪽 마을들에 흩어놓고 도시 버리면 그만이야.')}
${dlg('nadia','도시는 다시 지을 수 있어. 사람과 장부와 종자만 살아 있으면.')}

오르반에게는 패배처럼 들릴 선택이다. 아델에게는 성당을 버리는 일이고, 이렌에게는 연구 기회를 잃는 일이다.

하지만 민간인에게는 가장 현실적인 답일 수 있다.`,choices:[choice('전면 대피를 준비한다.','commit_civilian',{do:s=>{state.faction='civilian';flag('대피 계획 지지');vec('farmer',3);vec('merchant',2)}}),choice('도시를 포기하기엔 아직 이르다.','day5_morning')]},
commit_guard:{title:'도시를 지키는 방식',location:'북문 성당 지하',onEnter:s=>{questDone('day5');advance(2,0);state.city.guard+=6;flag('최종작전 준비');quest('final','심층 봉쇄 작전','지하 지지벽을 무너뜨려 검은 뿌리와 통로를 차단한다.')},text:s=>`경비대가 곡괭이, 쇠지렛대, 기름통을 준비한다.

마르크는 장비를 보며 중얼거린다.

${dlg('mark','괴물 잡으러 가는 줄 알았더니 광부가 됐네.')}

오르반은 마지막으로 선을 긋는다.

${dlg('orban','목표는 괴물 사냥이 아니다. 통로 폐쇄. 위험해지면 후퇴. 영웅 짓 하지 마라.')}

당신이 어떤 사람이었든 이제 작전의 한 축이 된다.`,choices:[choice('최종 작전에 들어간다.','final_descent')]},
commit_church:{title:'아홉 개의 불완전한 기도',location:'성당 예배실',onEnter:s=>{questDone('day5');advance(2,0);modRes({mana:10,spirit:5});flag('최종작전 준비');quest('final','아홉 봉인 의식','맥의 방 아홉 기둥을 활성화해 검은 뿌리 흐름을 안정시킨다.')},text:s=>`토마와 아델이 서로 다른 시대의 기도문을 모아 아홉 기둥에 대응하는 구절을 만든다.

빛 외의 공명을 교단식 언어로 부르는 것 자체가 거의 금기다.

${dlg('adel','오늘 성공해도 이 기록은 논쟁을 만들 겁니다. 그래도 사람을 살린 기록이라면 남겨야 합니다.')}

당신은 자신의 공명 상태를 확인한다. 힘이 강한 것과 안정적으로 쓸 수 있는 것은 다른 문제다.`,choices:[choice('최종 의식을 위해 지하로 내려간다.','final_descent')]},
commit_doctor:{title:'치료와 연구 사이',location:'성당 지하 실험실',onEnter:s=>{questDone('day5');advance(2,0);item('tonic',2);flag('최종작전 준비');quest('final','근원 표본 확보','심층 뿌리 핵을 억제하고 핵심 조직을 확보한다. 도시 안전이 우선이다.')},text:s=>`이렌은 억제제 병을 천으로 싸서 가방에 넣는다.

${dlg('iren','근원 조직을 얻을 수 있으면 치료법을 만들 확률이 올라가요. 하지만 봉인이 무너지면 표본이고 뭐고 다 버립니다. 약속할게요.')}

그가 굳이 약속한다는 사실이 당신을 조금 불안하게 만든다.

아델은 이렌을 보며 말한다.

${dlg('adel','제가 선을 넘으면 누가 말리라고 하셨죠? 오늘은 서로 그렇게 합시다.')}`,choices:[choice('최종 탐사를 시작한다.','final_descent')]},
commit_elf:{title:'오래된 약속을 다시 쓰다',location:'북문 여관 다락',onEnter:s=>{questDone('day5');advance(2,0);flag('최종작전 준비');quest('final','약속 봉인','청동 원판과 엘프 전승을 이용해 오래된 봉인 계약을 복원한다.');if(!hasItem('seal'))item('seal',1)},text:s=>`라엔은 오래된 노래를 한 줄씩 다시 외운다. 이제 노래가 단순한 전승이 아니라 절차처럼 보인다.

길을 연 자.
길을 닫은 자.
뿌리를 남긴 자.
빚을 기억하는 자.

${dlg('laen','마지막 줄은 “돌아오는 자가 이름을 말한다.” 그런데 누구 이름인지 모른다.')}

당신은 불완전한 의식과 완전하지 않은 해석을 들고 다시 아래로 내려가야 한다.`,choices:[choice('라엔과 함께 지하로 내려간다.','final_descent')]},
commit_civilian:{title:'도시를 버리는 것도 작전이다',location:'남문 광장',onEnter:s=>{questDone('day5');advance(2,0);flag('최종작전 준비');quest('final','민간인 대피','남문을 통해 시민을 분산 대피시키고 마지막 수레가 나갈 때까지 길을 지킨다.');state.city.food+=3},text:s=>`마레나는 남쪽 농가들과 연락하고, 나디아는 수레와 식량을 묶는다. 오르반은 처음엔 반대하지만 결국 경비병 일부를 남문으로 돌린다.

${dlg('orban','도시를 버리는 게 아니라 사람을 보존한다고 생각하겠다. 그래야 명령 내릴 수 있으니까.')}
${dlg('mara','돌벽에 자존심 세우지 마. 사람 있으면 다시 도시 된다.')}

당신의 마지막 작전은 지하가 아니라 길 위에서 시작된다.`,choices:[choice('대피를 시작한다.','civilian_final')]},
final_descent:{title:'여섯째 날, 마지막 하강',location:'성당 지하 통로',onEnter:s=>{if(state.day<6){state.day=6;state.hour=7;state.minute=0}else{advance(8,0)}const party=['mark','adel','iren'];if(hasFlag('met_laen')&&effectiveRel('laen')>-30)party.push('laen');setCompanions(party);modRes({stamina:10,spirit:5});questDone('underway');flag('최종 하강')},text:s=>`여섯째 날 아침.

도시 위에서는 사람들이 평소보다 조용히 움직인다. 아래로 내려가는 사람들은 더 적다.

마르크, 아델, 이렌이 함께 내려간다. ${hasCompanion('laen')?'라엔도 청동패를 품에 넣고 대열에 섞여 있다.':''}

누구는 당신의 선택에 동의해서, 누구는 반대하더라도 끝을 직접 보기 위해 따라왔다.

통로의 검은 뿌리는 어제보다 굵다. 임시 봉인의 효과가 끝나가고 있다.

맥의 방 쪽에서 낮은 진동이 계속된다.

당신은 이제 길을 안다.`,choices:[choice('맥의 방으로 곧장 간다.','final_chamber')]},
final_chamber:{title:'열 번째 자리의 빛',location:'맥의 방',onEnter:s=>{advance(0,45);modRes({stamina:-8,spirit:-8});state.stability-=2;flag('열번째 발광')},text:s=>`맥의 방에 들어서는 순간 모두가 멈춘다.

어제 비어 있던 열 번째 홈이 희미하게 빛난다.

색을 말하기 어렵다. 흰색도 검은색도 아닌, 주변의 색을 조금씩 빼앗아 자기 안에 섞는 빛.

검은 뿌리들은 그 홈을 피해 중앙으로 모인다.

${dlg('adel','어제는 없었습니다.')}
${dlg('iren','생겼다는 표현이 맞겠네요.')}
${hasCompanion('laen')?dlg('laen','노래에서 비어 있던 박자가… 채워지고 있어.'):'토마가 없는 자리인데도, 당신은 오래된 기록 속 ‘빈자리’라는 표현을 떠올린다.'}

작전을 시작해야 한다.`,choices:s=>state.faction==='guard'?[choice('지지벽을 무너뜨리는 지점으로 간다.','final_guard')]:state.faction==='church'?[choice('아홉 기둥 앞에 선다.','final_church')]:state.faction==='doctor'?[choice('뿌리 핵에 억제제를 투입한다.','final_doctor')]:state.faction==='elf'?[choice('청동 원판을 중앙 홈에 둔다.','final_elf')]:[choice('상황을 보고 임시 봉인을 시도한다.','final_church')]},
final_guard:{title:'무너지는 길',location:'맥의 방 외곽 지지통로',onEnter:s=>{const r=check({stat:'str',skill:'athletics',diff:67,label:'지지벽 붕괴 작업'});advance(0,40);modRes({stamina:-20,spirit:-4});gainSkill('athletics',2);if(r.ok){flag('지하 통로 붕괴 성공');state.city.infection-=15;state.city.guard+=5;vec('guard',4)}else{flag('붕괴 실패');state.city.infection+=5}},text:s=>hasFlag('지하 통로 붕괴 성공')?`쇠지렛대로 쐐기를 빼고, 기름을 부어 목재 지지대를 태운다.

돌이 갈라지는 소리가 이어진다.

${dlg('mark','뛸 준비 해!')}

첫 번째 벽이 무너지자 검은 뿌리 흐름이 끊긴다. 그러나 충격은 중앙 거대문 쪽까지 전달된다.

맥의 방 열 번째 홈이 갑자기 밝아진다.`:`지지벽이 예상보다 단단하다. 쐐기 하나가 빠지지 않아 시간을 잡아먹고, 억지로 지렛대를 거는 순간 힘이 엉뚱한 곳으로 전달된다. 절반을 무너뜨렸을 때 천장에서 돌무더기가 쏟아져 원래 퇴로부터 막힌다.

마르크가 욕설을 삼키며 인원을 세고, 남은 경비병 둘을 옆 통로로 보낸다. 뿌리의 흐름은 끊지 못했는데 이제 돌아갈 길까지 바뀌었다. 실패를 수습하는 데도 다음 판단이 필요하다.`,choices:[choice('중앙 방으로 돌아가 열 번째 반응을 확인한다.','final_tenth_crisis')]},
final_church:{title:'아홉 개의 목소리',location:'맥의 방 아홉 기둥',onEnter:s=>{advance(0,20);modRes({mana:-10,spirit:-6});flag('아홉 봉인 시작')},text:s=>`아델이 빛의 기둥 앞에 선다. 다른 기둥에는 아무도 없다.

결국 당신이 여러 공명을 연결해야 한다.

첫째 빛. 둘째 어둠. 불. 물. 대지. 생명. 죽음. 전기. 바람.

하나를 깨우면 다른 하나가 흔들린다. 힘으로 누르는 문제가 아니라 균형을 맞추는 문제다.

${dlg('adel','당신이 전부 감당하려 하지 마십시오. 흐르게 하세요. 붙잡으면 부서집니다.')}`,choices:[choice('지혜와 공명 안정도로 균형을 맞춘다.','final_church_check'),choice('가장 강한 공명을 중심으로 억지로 밀어붙인다.','final_church_force')]},
final_church_check:{title:'균형',location:'맥의 방',onEnter:s=>{const diff=72-Math.floor(state.stability/15);const r=check({stat:'wis',skill:'arcana',diff,label:'아홉 공명 균형'});advance(0,25);modRes({mana:-18,spirit:-12});state.stability-=6;if(r.ok){flag('아홉 봉인 성공');state.city.infection-=18;vec('church',4);vec('demigod',3)}else{flag('아홉 봉인 불안정');state.stability-=8}},text:s=>hasFlag('아홉 봉인 성공')?`당신은 힘을 자기 안에 모으지 않는다.

빛은 빛으로, 죽음은 죽음으로, 서로 섞이지 않게 흐르게 한다. 아홉 기둥이 차례로 켜지고 중앙의 검은 뿌리가 수축한다.

아델이 숨을 삼킨다.

${dlg('adel','이걸… 교단은 잊었습니다. 아니, 잊은 척했을 수도 있겠군요.')}

그 순간 열 번째 홈이 스스로 켜진다.`:`한 기둥이 너무 강하게 반응하면서 흐름이 뒤틀린다. 균형을 되찾으려 손을 옮길 때마다 다른 두 기둥이 늦게 따라와, 빛과 죽음의 선이 정면으로 충돌한다. 바닥이 갈라지고 공명의 반동이 팔을 타고 가슴까지 올라온다.

아델이 즉시 빛의 선을 끊어 당신 쪽으로 몰리던 반동을 받아낸다. 완전한 봉인은 놓쳤지만, 더 밀어붙였다면 사람이 먼저 부서졌을 것이다. 그 틈을 열 번째 홈이 기다렸다는 듯 밝아진다.`,choices:[choice('열 번째 반응을 막는다.','final_tenth_crisis')]},
final_church_force:{title:'한 힘으로 아홉을 누르다',location:'맥의 방',onEnter:s=>{const top=Object.entries(s.resonance).sort((a,b)=>b[1]-a[1])[0][0];modResonance(top,8,-12);modRes({mana:-22,spirit:-16});flag('단일공명 폭주');vec('demigod',4);advance(0,20)},text:s=>`당신은 가장 강한 공명 하나를 붙잡고 나머지를 밀어붙인다.

순간은 성공처럼 보인다. 아홉 기둥이 한꺼번에 흔들리고 검은 뿌리가 움츠러든다.

하지만 균형이 아니다.

한 색의 빛이 다른 기둥까지 덮으면서 열 번째 홈이 그것을 빨아들인다.

가슴 안쪽이 비어가는 느낌이 든다.`,choices:[choice('즉시 공명을 끊는다.','final_tenth_crisis')]},
final_doctor:{title:'근원 조직',location:'맥의 방 중앙 뿌리',onEnter:s=>{const r=check({stat:'int',skill:'medicine',diff:68,label:'근원 억제제 투입'});advance(0,30);modRes({stamina:-7,spirit:-6});if(r.ok){flag('근원 억제 성공');state.city.infection-=12;vec('doctor',5)}else{flag('근원 억제 실패');state.city.infection+=4}},text:s=>hasFlag('근원 억제 성공')?`이렌이 가장 굵은 뿌리에 작은 절개를 내고 당신이 억제제를 밀어 넣는다.

검은 줄기가 순간 투명해지며 내부에서 푸른 입자들이 흐르는 것이 보인다.

${dlg('iren','지금! 이 조직만 채취하면—')}

그가 칼을 들지만 열 번째 홈이 갑자기 빛난다.

뿌리 전체가 억제제를 피하듯 중앙으로 수축한다.`:`억제제를 밀어 넣으려는 순간 뿌리 표면이 껍질처럼 굳어 바늘을 밀어낸다. 이렌이 각도를 바꾸는 사이 가느다란 줄기 하나가 손목을 감아 당긴다. 당신이 칼로 끊어내자 검은 액체가 바닥에 튀고, 준비한 약병 하나가 깨진다. 이렌은 손목을 움켜쥔 채 남은 양으로는 같은 시도를 반복할 수 없다고 판단한다. 그 짧은 혼란을 틈타 열 번째 홈이 서서히 밝아진다.`,choices:[choice('이렌보다 열 번째 반응을 먼저 막는다.','final_tenth_crisis',{do:s=>{flag('도시안전 우선')}}),choice('위험을 감수하고 근원 표본을 확보한다.','final_doctor_sample')]},
final_doctor_sample:{title:'한 조각의 미래',location:'맥의 방',onEnter:s=>{const r=check({stat:'dex',skill:'medicine',diff:72,label:'근원 조직 채취'});advance(0,10);modRes({hp:-5,spirit:-5});if(r.ok){flag('근원 표본 확보');item('rootShard',2);modRel('iren',12,'근원 표본을 함께 확보했다');vec('doctor',6);state.city.infection+=2}else modRes({hp:-9})},text:s=>hasFlag('근원 표본 확보')?`당신이 뿌리를 고정하고 이렌이 중심 조직을 얇게 잘라낸다.

병 안에 들어간 조직은 이전 표본과 다르다. 안쪽에 작은 빛점이 아홉 색으로 번갈아 흐른다.

이렌은 기쁨을 숨기지 못한다.

${dlg('iren','이거면… 정말 많은 걸 알 수 있어요.')}

그 말이 끝나자 열 번째 홈이 훨씬 강하게 빛난다.`:`당신이 뿌리를 고정하는 순간 중심 조직이 손아귀에서 살아 있는 근육처럼 비틀린다. 이렌이 칼을 넣지만 조직은 칼끝을 따라 수축하고, 얇게 떼어내려던 부분이 검은 액체로 무너져버린다.

손등에는 가느다란 상처가 두 줄 남는다. 이렌이 즉시 당신 손을 씻기며 이를 악문다.

${dlg('iren','됐어요. 표본 욕심내다 사람 하나 더 환자로 만들 순 없어요. 이번 건 버립니다.')}

근원에 손을 댈 수 있다는 사실은 확인했지만, 가지고 나갈 만한 형태로 떼어내는 데는 실패한다.`,choices:[choice('이제 열 번째 반응을 막는다.','final_tenth_crisis')]},
final_elf:{title:'약속의 원',location:'맥의 방 중앙',onEnter:s=>{advance(0,20);modRes({spirit:-7,mana:-7});flag('약속 의식 시작');vec('elf',3)},text:s=>`라엔이 완전한 청동 원판을 중앙 홈 앞에 둔다.

원판은 정확히 맞지 않는다. 기둥이 아니라 사람 손에 들기 위한 물건이다.

라엔이 오래된 노래를 부른다.

길을 연 자는 이름을 말하고.
길을 닫는 자는 빚을 기억한다.
뿌리를 남긴 자는 돌아오지 않는다.
돌아오는 자는—

마지막 줄에서 막힌다.

열 번째 홈이 희미하게 빛난다.`,choices:[choice('제3문자의 “귀환”을 마지막 말로 제안한다.','final_elf_return',{if:s=>hasFlag('지하 표식 해독')||skill('language')>=3}),choice('라엔 가문의 이름을 넣는다.','final_elf_name'),choice('인간과 엘프 모두의 이름을 말하지 않고 “기억한다”고 끝낸다.','final_elf_memory')]},
final_elf_return:{title:'귀환의 문장',location:'맥의 방',onEnter:s=>{const r=check({stat:'int',skill:'language',diff:67,label:'옛 문장 복원'});advance(0,15);if(r.ok){flag('약속 봉인 성공');state.city.infection-=16;modRel('laen',10,'오래된 약속을 함께 복원했다');vec('elf',5);vec('scholar',2)}else flag('약속 봉인 불완전')},text:s=>hasFlag('약속 봉인 성공')?`당신은 제3문자의 ‘귀환’ 표식을 소리로 옮겨본다.

라엔이 그 소리를 노래의 마지막에 붙인다.

청동 원판의 아홉 점이 켜지고, 검은 뿌리가 중앙에서 멈춘다.

마지막으로 열 번째 홈이 한 번 빛났다 꺼진다.

${dlg('laen','이건 할아버지가 못 끝낸 게 아니다. 다음 사람이 이어야 하는 약속이었던 거다.')}`:`앞부분은 맞는다. 청동 원판의 점들이 하나씩 켜지고 라엔도 숨을 죽인다. 그러나 마지막 음절에서 빛이 멈춘다. 방언이 변한 탓인지, 애초에 문장을 잘못 전승한 것인지 알 수 없다. 원판의 빛은 꺼지는데 중앙의 열 번째 홈만 반대로 밝아진다. 틀린 한 음이 장치를 멈춘 것인지, 빈자리가 그 실패를 기다렸던 것인지 판단할 시간이 없다.`,choices:[choice('열 번째 반응에 대비한다.','final_tenth_crisis')]},
final_elf_name:{title:'가문의 이름',location:'맥의 방',onEnter:s=>{modRel('laen',6,'가문의 이름을 약속에 넣었다');vec('elf',4);flag('라엔 가문 봉인');state.city.infection-=10;advance(0,10)},text:s=>`라엔은 자기 가문의 오래된 이름을 말한다.

청동 원판이 반응한다. 검은 뿌리 일부가 멈춘다.

하지만 아홉 기둥 중 엘프 전승과 연결된 듯한 몇 개만 빛나고 나머지는 어둡다.

부분적으로는 맞다. 완전하지 않다.

열 번째 홈이 그 빈틈을 파고들듯 빛난다.`,choices:[choice('열 번째 반응을 막는다.','final_tenth_crisis')]},
final_elf_memory:{title:'이름 대신 기억',location:'맥의 방',onEnter:s=>{const r=check({stat:'wis',skill:'language',diff:70,label:'약속 의미 재해석'});advance(0,10);if(r.ok){flag('기억 봉인');state.city.infection-=14;vec('elf',4);vec('unifier',2)}},text:s=>hasFlag('기억 봉인')?`당신은 마지막 줄을 이름 없이 끝낸다.

“돌아오는 자는 기억한다.”

라엔이 잠깐 당신을 보더니 같은 문장을 엘프어로 반복한다.

인간 기록과 엘프 노래, 어느 한쪽에도 없던 새 문장.

그 순간 아홉 점이 고르게 빛난다.

과거의 약속을 복원한 것이 아니라 새 약속을 만든 셈이다.`:`당신은 기억하고 있는 문장의 뜻을 따라 천천히 말한다. 라엔도 옆에서 같은 뜻을 엘프어로 반복한다. 잠시 원판 가장자리에 빛이 돌지만 아홉 점까지 이어지지는 못하고 사라진다. 말의 의미가 틀렸다고 단정할 수는 없다. 다만 이 장치는 좋은 뜻이나 진심만으로 움직이는 물건은 아닌 듯하다. 정확한 이름, 순서, 혹은 아직 빠진 누군가가 필요하다.`,choices:[choice('열 번째 홈의 반응을 확인한다.','final_tenth_crisis')]},
final_tenth_crisis:{title:'아직 태어나지 않은 것',location:'맥의 방',onEnter:s=>{advance(0,5);modRes({spirit:-10,mana:3});state.stability=clamp(state.stability-4,0,100);flag('열번째 각성 순간');vec('demigod',3)},text:s=>`열 번째 홈에서 처음으로 ‘목소리’가 난다.

아니, 목소리라고 부르기 어렵다.

당신이 지금까지 만난 사람들의 말투가 한순간씩 겹친다.

마르크의 거친 숨.
아델의 차분한 문장.
이렌의 빠른 설명.
라엔의 짧은 공용어.

그리고 당신 자신의 목소리.

“나를 무엇이라 부를 것인가?”

누구도 듣지 못한 듯하다. 모두 당신만 본다.`,choices:[choice('아무 이름도 주지 않는다.','tenth_no_name'),choice('“아직 아무것도 아니다”라고 답한다.','tenth_notyet'),choice('자신의 이름을 말한다.','tenth_self'),choice('“신”이라고 부른다.','tenth_god')]},
tenth_no_name:{title:'이름 없는 채로',location:'맥의 방',onEnter:s=>{const r=check({stat:'wis',skill:'arcana',diff:72,label:'이름 부여 거부'});advance(0,10);modRes({spirit:-10});if(r.ok){flag('열번째 이름 거부');state.stability+=5;vec('godslayer',3);vec('creator',1)}else state.stability-=6},text:s=>hasFlag('열번째 이름 거부')?`당신은 입을 열지 않는다.

질문이 반복된다.

“무엇이라.”

당신은 끝까지 이름을 붙이지 않는다.

빛이 흔들리다가 작아진다.

아델이 당신 어깨를 잡는다.

${dlg('adel','무엇을 들었습니까?')}

당신은 대답할 수 있지만, 지금은 먼저 살아 나가야 한다.`:`침묵하려 하지만 머릿속에서 단어들이 멋대로 떠오른다. 이름을 주지 않았는데도 무언가가 당신 기억을 훑고 지나간다.`,choices:[choice('남은 봉인을 마무리하고 지상으로 돌아간다.','final_escape')]},
tenth_notyet:{title:'아직',location:'맥의 방',onEnter:s=>{modResonance('life',3,-2);modResonance('death',3,0);flag('열번째 아직');vec('demigod',4);vec('creator',2);advance(0,10)},text:s=>`“아직 아무것도 아니다.”

당신이 속으로 답한다.

빛이 잠깐 멈춘다.

그리고 처음으로 감정 비슷한 것이 느껴진다. 분노도 기쁨도 아니다. 기다림.

“아직.”

그것은 당신의 말을 따라 한 뒤 스스로 빛을 줄인다.

열 번째 빈자리는 다시 빈자리처럼 보인다. 완전히 사라지지는 않았다.`,choices:[choice('이 사실을 기억하고 지상으로 돌아간다.','final_escape')]},
tenth_self:{title:'자기 이름의 무게',location:'맥의 방',onEnter:s=>{const top=Object.entries(s.resonance).sort((a,b)=>b[1]-a[1])[0][0];modResonance(top,10,-12);modRes({mana:12,spirit:-16});flag('열번째 자기이름');vec('demigod',7);advance(0,10)},text:s=>`당신은 자신의 이름을 말한다.

열 번째 홈의 빛이 한순간 당신 쪽으로 휘어진다.

가슴 안의 공명이 폭발적으로 커진다. 힘이 들어온다기보다, 원래 있던 힘의 문이 갑자기 열린 느낌이다.

무릎이 꺾일 만큼 강하다.

멀리 있는 아홉 기둥이 당신 호흡에 맞춰 흔들린다.

무언가가 당신 이름을 기억했다.`,choices:[choice('연결을 끊고 지상으로 도망친다.','final_escape')]},
tenth_god:{title:'신이라 부른 순간',location:'맥의 방',onEnter:s=>{state.stability=clamp(state.stability-15,0,100);modRes({spirit:-18,mana:15});flag('열번째 신명명');vec('demigod',6);vec('church',-1);advance(0,10)},text:s=>`“신.”

단어가 떠오르자 빛이 크게 흔들린다.

아홉 기둥이 동시에 반응하고, 열 번째 홈의 밝기가 그들을 잠깐 넘어선다.

공명이 반응하는 순간 당신은 즉시 실수를 깨닫는다. 힘을 끌어낸 것이 아니라, 안쪽에서 이미 흐르던 것에 길을 내준 셈이다. 되돌리려 할수록 손끝의 감각이 늦게 따라오고 호흡이 엉킨다. 지금 필요한 것은 더 큰 힘이 아니라 연결을 끊을 방법이다.

이름은 단순한 설명이 아니다. 무엇인지 모르는 것에 윤곽을 씌우는 틀이 되기도 한다.

아무것도 아니었던 것에 ‘신’이라는 형태를 조금이라도 준 셈이다.

머릿속에서 웃음과도 울음과도 다른 진동이 지나간다.`,choices:[choice('연결을 끊고 봉인을 끝낸다.','final_escape')]},
final_escape:{title:'무너지는 맥의 방',location:'지하 뿌리길',onEnter:s=>{advance(0,20);modRes({stamina:-12,spirit:-4});flag('최종 퇴각')},text:s=>`열 번째 반응이 사라지자 맥의 방 전체가 흔들린다.

봉인이 성공했든 불완전했든, 검은 뿌리는 급격히 수축한다. 그 과정에서 천장 일부가 무너진다.

${dlg('mark','이제 진짜 뛴다!')}

각자 들고 있던 것을 버리며 통로를 달린다.

이렌은 표본 가방을 붙들고, 아델은 토마를 끌고, 라엔은 청동 원판을 품에 넣는다. 당신 역시 무엇을 버리고 무엇을 가져갈지 이미 선택해왔다.`,choices:[choice('뒤처진 사람을 확인하며 달린다.','escape_help'),choice('살아나가는 데 집중한다.','escape_run')]},
escape_help:{title:'마지막 한 사람',location:'무너지는 지하 통로',onEnter:s=>{const r=check({stat:'str',skill:'athletics',diff:68,label:'동료 구조'});advance(0,15);modRes({stamina:-15,hp:r.ok?0:-8});if(r.ok){flag('최종 구조');vec('hero',3);Object.keys(NPC).forEach(id=>{if(hasFlag('met_'+id))modRel(id,2)})}},text:s=>hasFlag('최종 구조')?`뒤에서 돌 무너지는 소리와 함께 누군가 넘어진다.

당신은 돌아간다.

누구였는지는 순간 중요하지 않다. 팔을 잡고 일으켜 함께 달린다.

출구 빛이 보일 때쯤 폐가 찢어질 것 같다.

마지막으로 통로가 무너지며 먼지가 뒤를 덮는다.`:`뒤처진 사람을 일으키려다 돌조각이 어깨를 친다. 그래도 다른 사람이 합류해 함께 끌고 간다.

완벽한 영웅은 아니어도 아무도 홀로 남겨두진 않는다.`,choices:[choice('지상으로 나온다.','day7_result')]},
escape_run:{title:'살기 위해 달린다',location:'무너지는 지하 통로',onEnter:s=>{const r=check({stat:'dex',skill:'athletics',diff:62,label:'붕괴 통로 탈출'});advance(0,12);modRes({stamina:-12,hp:r.ok?0:-6});if(r.ok)flag('빠른 탈출');else flag('부상 탈출')},text:s=>`뒤를 보지 않는다.

돌이 떨어지는 위치를 피하고, 뿌리가 움츠러드는 틈을 넘어간다.

누군가의 손이 어깨를 밀고, 다른 누군가가 앞에서 소리친다.

마침내 성당 지하 틈으로 햇빛이 쏟아진다.`,choices:[choice('밖으로 나온다.','day7_result')]},
civilian_final:{title:'여섯째 날, 남쪽으로 가는 길',location:'남문 광장',onEnter:s=>{if(state.day<6){state.day=6;state.hour=7;state.minute=0}advance(0,20);quest('evac','도시 대피','아이, 환자, 식량 수레 순으로 남문을 통과시킨다.')},text:s=>`남문 밖 길에 수레 행렬이 길게 늘어선다.

마레나는 종자 자루부터 실으려다 나디아와 싸운다. 나디아는 물과 약이 먼저라고 한다.

${dlg('mara','씨앗 없으면 다음 달에 굶어!')}
${dlg('nadia','오늘 물 없으면 다음 달이 없어!')}

둘 다 맞다.

오르반은 북문 병력을 줄여 대피로를 지키고 있다. 도시를 지키는 방식이 벽이 아니라 행렬로 바뀐다.`,choices:[choice('물과 약, 아이와 환자를 먼저 보낸다.','evac_people'),choice('식량과 종자를 먼저 확보한다.','evac_food'),choice('재산 규모와 상관없이 가구별 한 수레만 허용한다.','evac_fair')]},
evac_people:{title:'사람부터',location:'남문',onEnter:s=>{state.city.panic-=4;state.city.food-=4;publicDeed({'places.borderCity':5,'factions.poor':5,'factions.healers':4,'factions.merchants':-1},'환자와 아이를 짐과 재산보다 먼저 대피시켰다','남문 대피 행렬의 주민들이');vec('hero',3);vec('doctor',1);advance(2,0);flag('사람 우선 대피')},text:s=>`환자와 아이가 먼저 나간다. 이동 속도는 느리다.

짐을 더 싣고 싶은 상인들이 항의하지만, 경비병이 규칙을 지킨다.

오후가 되자 북쪽 하늘에 먼지가 올라온다. 도시 지하 어딘가가 흔들린다.

대피 행렬은 아직 절반밖에 빠져나가지 못했다.`,choices:[choice('마지막까지 남아 행렬을 지킨다.','evac_laststand')]},
evac_food:{title:'내일을 실어 나른다',location:'남문',onEnter:s=>{state.city.food+=8;state.city.panic+=2;publicDeed({'factions.farmers':6,'factions.merchants':3,'places.borderCity':-1,'factions.poor':-2},'사람보다 곡물과 종자, 농기구를 먼저 대피 수레에 실었다','남문 대피 행렬의 주민들이');vec('farmer',4);vec('merchant',2);advance(2,0);flag('식량 우선 대피')},text:s=>`곡물, 종자, 농기구를 먼저 싣는다.

사람들은 왜 사람이 아니라 자루가 먼저냐고 욕한다. 마레나는 욕을 그대로 듣는다.

${dlg('mara','살아남는 건 오늘 숨 쉬는 것만이 아냐. 다음 계절까지 먹는 것도 살아남는 거야.')}

오후가 되자 도시 북쪽에서 진동이 온다.`,choices:[choice('남은 사람들을 서둘러 내보낸다.','evac_laststand')]},
evac_fair:{title:'한 집에 한 수레',location:'남문',onEnter:s=>{const r=check({stat:'wis',skill:'trade',diff:60,label:'대피 물자 공정 배분',bonus:Math.round(rep('places','borderCity')/6+rep('factions','merchants')/10+rep('factions','poor')/10)});advance(2,0);if(r.ok){state.city.panic-=5;state.city.food+=2;publicDeed({'places.borderCity':7,'factions.poor':5,'factions.merchants':4,'factions.guard':2},'재산과 신분에 상관없이 가구별 대피 수레 한 대라는 규칙을 지켜냈다','남문에 모인 주민과 상인, 경비병들이');flag('공정 대피');vec('merchant',3);vec('unifier',2)}else{state.city.panic+=4;publicDeed({'places.borderCity':-3},'공정한 대피 규칙을 세우려 했지만 예외 요구와 혼란을 막지 못했다','남문 대피 행렬의 주민들이')}},text:s=>hasFlag('공정 대피')?`부자도 가난한 사람도 한 집에 한 수레. 추가 공간은 공동 식량과 약에 배정한다.

불만은 있지만 규칙이 단순해서 줄이 유지된다.

나디아가 장부를 들고 웃는다.

${dlg('nadia','이상하네. 장사꾼인 내가 공평한 배급표 쓰고 있고, 넌 사람들한테 욕먹으면서 질서 세우고.')}`:`규칙을 세우자마자 예외를 요구하는 사람이 나온다. 돈을 더 낼 테니 수레를 두 대 쓰겠다는 상인, 병든 노모가 있다며 짐칸을 비워달라는 가족, 가문 인장을 내미는 귀족 하인까지 한꺼번에 몰린다.

한 번 예외를 허용하면 뒤의 줄 전체가 흔들린다. 그렇다고 모든 사정을 같은 말로 잘라낼 수도 없다. 실랑이 사이에 남문 앞 수레가 엉키고, 가장 귀한 시간이 빠르게 줄어든다.`,choices:[choice('끝까지 남아 대피를 마무리한다.','evac_laststand')]},
evac_laststand:{title:'마지막 수레',location:'남문 성벽',onEnter:s=>{advance(2,0);modRes({stamina:-12,spirit:-5});flag('마지막 대피');vec('hero',2)},text:s=>`해 질 무렵 마지막 수레가 문을 지난다.

그때 도시 북쪽에서 큰 굉음이 난다. 지하 통로 일부가 무너진다. 북문 쪽에서 검은 뿌리들이 거리로 솟구친다는 전령이 달려온다.

오르반은 당신에게 묻는다.

${dlg('orban','이제 문 닫고 우리도 나가면 된다. 아니면 북문에 남은 경비대 데리러 갈 수도 있다. 선택해.')}

도시는 거의 비었다. 그래서 오히려 더 쓸쓸하다.`,choices:[choice('남은 사람들과 함께 도시를 떠난다.','ending_exodus'),choice('북문에 남은 사람들을 데리러 되돌아간다.','evac_rescue')]},
evac_rescue:{title:'빈 도시를 거슬러',location:'중앙대로',onEnter:s=>{const r=check({stat:'dex',skill:'athletics',diff:65,label:'붕괴 도시 횡단'});advance(1,0);modRes({stamina:-18,hp:r.ok?0:-8});if(r.ok){flag('북문 구조');state.city.guard+=5;publicDeed({'factions.guard':8,'places.borderCity':6},'대피가 끝난 뒤 무너지는 도시로 되돌아가 북문 경비병들을 데리고 나왔다','구조된 경비병들과 남문 대피민들이');vec('hero',4)}},text:s=>hasFlag('북문 구조')?`비어 있는 장터를 가로질러 북문으로 달린다.

마르크와 경비병 여섯이 무너진 배수로를 막고 있다.

${dlg('mark','미쳤냐? 다 나갔으면 너도 나가야지!')}

“너희 데리러 왔다.”

마르크가 욕을 하면서 웃는다.

함께 남문으로 빠져나갈 때 도시 뒤에서 검은 뿌리가 성벽 위로 잠깐 올라왔다가 힘을 잃는다.`:`무너진 건물이 중앙대로를 가로막아 몇 번이나 골목을 돌아가야 한다. 북문에 닿았을 때는 배수로 쪽 벽이 이미 더 내려앉아, 남아 있던 경비병 전원을 한꺼번에 빼낼 수 없는 상태다. 당신은 가장 가까운 사람들부터 붙잡아 남문으로 되돌아간다. 몇 명은 함께 빠져나오지만, 뒤쪽에 남은 사람들의 얼굴까지 확인할 시간은 없다. 구조는 성공도 실패도 아닌 채 끊긴다. 살아 나온 사람들은 당신이 돌아왔다는 사실을 기억하고, 당신은 데려오지 못한 사람의 수를 기억한다.`,choices:[choice('도시를 떠난다.','ending_exodus_rescue')]},
day7_result:{title:'일곱째 날, 햇빛 아래',location:'북문 성당 앞',onEnter:s=>{if(state.day<7){state.day=7;state.hour=9;state.minute=0}questDone('final');state.ended=true;flag('일주일 생존')},text:s=>`일곱째 날 아침.

당신은 햇빛 아래에 있다.

도시는 상처투성이지만 서 있다. 북문 일부가 폐쇄됐고, 성당 지하는 돌로 막혔다. 환자들 중 일부는 회복하기 시작했고, 일부는 여전히 잠들어 있다.

사람들은 각자 당신이 한 일을 다르게 기억한다.

누군가에겐 경비대를 도운 민간인.
누군가에겐 엘프와 어울린 수상한 사람.
누군가에겐 환자를 살린 조수.
누군가에겐 신의 힘을 건드린 위험한 존재.

하지만 당신의 하루는 그 어느 한마디로도 전부 설명되지 않는다.`,choices:[choice('일주일의 결과를 확인한다.','ending_compute')]},
ending_compute:{title:'첫 번째 시대의 갈림길',location:'서부 변경도시',onEnter:s=>{state.ended=true;flag('장편 파일럿 완료')},text:s=>{const e=computeEnding();return `${e.html}<div class="future"><b>현재 장기 경로</b><br>${futurePaths()}</div>`},choices:[choice('상태와 관계를 확인한다.',null,{do:s=>openSheet('status')}),choice('현재 진행을 저장한다.',null,{do:s=>saveGame()}),choice('다른 삶으로 다시 시작한다.',null,{do:s=>restartConfirm()})]},
ending_departure:{title:'엔딩 - 떠나는 사람',location:'남쪽 도로',onEnter:s=>{state.ended=true;flag('도시 조기 이탈');vec('farmer',2);vec('merchant',1)},text:s=>`수레가 남문을 지나고 성벽이 작아진다.

당신은 살아남는다.

며칠 뒤 다른 마을에서 북쪽 변경도시가 한동안 봉쇄됐다는 소문을 듣는다. 어떤 이는 죽은 자가 걸었다고 하고, 어떤 이는 성당 지하에서 빛이 났다고 한다.

당신에게도 그 사건 속으로 들어갈 순간은 있었다. 당신은 그때 다른 쪽으로 걸어갔다.

그 선택이 비겁했다고 단정할 사람은, 아마 그 수레에 타지 못한 사람일 것이다.

<div class="endingCard"><div class="endingNum">CHAPTER ENDING 03</div><h3>길 위의 생존자</h3>영웅이 되지 않아도 삶은 계속된다. 당신에게 남은 것은 남쪽 길, 약간의 식량, 그리고 북쪽에 두고 온 질문이다.</div>`,choices:[choice('처음부터 다시 시작한다.',null,{do:s=>restartConfirm()})]},
ending_exodus:{title:'엔딩 - 도시보다 사람',location:'남쪽 임시야영지',onEnter:s=>{state.ended=true;flag('도시 전면 대피');vec('farmer',4);vec('merchant',2)},text:s=>`마지막으로 남문이 닫힌다.

뒤에서 무슨 일이 벌어지는지 직접 보지 않는다.

일주일 뒤, 남쪽 평야에 임시 천막촌이 생긴다. 마레나는 바로 밭을 고르고, 나디아는 천막 사이에 작은 교환대를 연다.

도시는 잃었지만 사람은 남았다.

<div class="endingCard"><div class="endingNum">CHAPTER ENDING 11</div><h3>벽 없는 도시</h3>돌벽이 무너져도 공동체는 이동한다. 이 선택은 훗날 농업 공동체, 상단 연합, 새로운 도시 건설, 통일자의 길로도 이어질 수 있다.</div>`,choices:[choice('현재 결과를 저장한다.',null,{do:s=>saveGame()}),choice('다시 시작한다.',null,{do:s=>restartConfirm()})]},
ending_exodus_rescue:{title:'엔딩 - 마지막 문지기들',location:'남쪽 임시야영지',onEnter:s=>{state.ended=true;flag('북문 경비대 구조');vec('guard',3);vec('hero',4)},text:s=>`당신은 마지막 경비병들과 함께 남문을 빠져나온다.

마르크는 야영지에 도착하자마자 바닥에 드러눕는다.

${dlg('mark','다시는 너 구하러 안 간다. 네가 나 구하러 오니까 더 귀찮아.')}

그 말과 반대로 그의 관계는 이미 달라져 있다.

<div class="endingCard"><div class="endingNum">CHAPTER ENDING 12</div><h3>문을 버리고 사람을 지킨 자</h3>도시는 잃었지만 경비대와 시민 다수가 살아남았다. 훗날 새로운 도시의 수비대, 민병대 지도자, 인간 영웅의 길이 열릴 수 있다.</div>`,choices:[choice('현재 결과를 저장한다.',null,{do:s=>saveGame()}),choice('다시 시작한다.',null,{do:s=>restartConfirm()})]},

enc_beggar:{title:'손을 내미는 사람',location:'남문과 시장 사이 골목',text:s=>`벽 아래에 마른 얼굴의 거지 하나가 앉아 있다. 옷은 젖어 있고, 무릎 위의 나무그릇에는 아무것도 없다.

${rep('factions','poor')>=15?`당신이 가까워지자 거지는 손을 내밀기 전에 얼굴부터 확인한다. “${playerName()}… 맞지? 골목에서 이름 좀 들었어.”`:`당신이 가까워지자 그는 다른 행인들에게 하던 것보다 조금 늦게 손을 내민다. “한 닢만. 아니면 먹을 것이라도.”`}

사람들은 대부분 시선을 피한 채 지나간다.`,choices:[
 choice('은화 한 닢을 적선한다.',s=>s.random.returnTo,{if:s=>s.silver>=1,do:s=>{s.silver--;flag('거지에게 적선');publicDeed({'factions.poor':4,'places.borderCity':1},'골목의 굶주린 사람에게 은화를 건넸다','골목을 지나던 몇 사람이');scheduleConsequence('enc_beggar_after_help',1,{kind:'coin'})},review:s=>`당신은 거지에게 은화 한 닢을 적선하기로 합니다. 동전이 나무그릇 바닥에 닿아 짧은 소리를 냅니다. 거지는 동전보다 먼저 당신의 얼굴을 올려다봅니다. “${playerName()}… 맞지?” 어디선가 당신 이름을 들은 모양입니다.`,noEncounter:true}),
 choice('먹을 것을 조금 나눠준다.',s=>s.random.returnTo,{if:s=>s.food>0,do:s=>{s.food--;flag('거지에게 음식');publicDeed({'factions.poor':5,'places.borderCity':1},'골목의 굶주린 사람에게 먹을 것을 나눴다','골목을 지나던 몇 사람이');scheduleConsequence('enc_beggar_after_help',1,{kind:'food'})},review:s=>`당신은 가진 식량 일부를 나눠주기로 합니다. 거지는 받아든 음식을 바로 먹지 않고 품 안에 먼저 넣습니다. 자기 혼자 먹을 생각은 아닌 듯합니다.`,noEncounter:true}),
 choice('사정은 안됐지만 적선하지 않는다.',s=>s.random.returnTo,{do:s=>{let r=rollInt(1,100);if(s.city.food<45)r-=18;if(s.city.panic>35)r+=10;s.random.data.beggarFate=r;scheduleConsequence('enc_beggar_after_ignore',1,{roll:r});flag('거지 외면')},review:s=>`당신은 주머니에 손을 넣지 않습니다. 사정이 딱하지 않은 것은 아니지만 당신 역시 가진 것이 넉넉하지 않습니다. 시선을 거두고 골목을 지나갑니다.\n\n거지는 당신을 붙잡지 않습니다. 잠깐의 원망이었는지, 오늘 밤을 넘기지 못할 절망이었는지, 혹은 다른 선택을 하게 될 계기였는지는 아직 알 수 없습니다.`,noEncounter:true})]},
enc_beggar_after_help:{title:'기억하는 사람',location:'중앙 장터 외곽',text:s=>`어제 골목에서 보았던 거지가 사람들 사이에서 당신을 발견한다. 이번에는 손을 내밀지 않는다.

“${playerName()}. 어제 그 사람 맞지.”

그는 북문 쪽을 턱으로 가리킨다.

“밤에 그쪽 하수구로 이상한 짐을 옮기는 놈들이 있었어. 돈 많은 사람은 우리 같은 사람을 안 보니까, 우리도 그런 건 잘 보지.”

적선이 세상을 바꾸지는 않았지만, 적어도 한 사람은 당신의 얼굴과 이름을 기억했다.`,choices:[choice('무슨 짐이었는지 더 묻는다.',s=>s.random.returnTo,{do:s=>{note('남루한 남자는 밤에 북문 하수구 쪽으로 검은 천에 싸인 긴 짐이 옮겨졌다고 증언했다.');gainSkill('observation',1)},review:s=>`당신은 그가 본 것을 끝까지 들어보기로 합니다. 어제의 작은 선택이 오늘은 하나의 정보로 돌아옵니다.`,noEncounter:true}),choice('정보에 고맙다고 말하고 지나간다.',s=>s.random.returnTo,{review:s=>`당신은 남자의 말을 기억해두기로 합니다. 그는 더 이상 무언가를 요구하지 않습니다.`,noEncounter:true})]},
enc_beggar_after_ignore:{title:'지나친 사람의 다음 날',location:'남문과 시장 사이 골목',text:s=>{const r=s.random.data.activeConsequence?.data?.roll??s.random.data.beggarFate??50;if(r<28)return `어제 거지가 앉아 있던 벽 아래에 오늘은 낡은 천이 덮여 있다. 사람들은 천을 피해서 걷는다.\n\n빵집 여자가 낮게 말한다. “새벽에 죽었대. 열병은 아니고… 그냥 굶고 추워서.”\n\n당신이 한 닢을 주었다면 살았을지, 하루만 더 버텼을 뿐일지는 알 수 없다. 결과는 언제나 선택 하나보다 많은 원인으로 만들어진다.`;if(r<67)return `어제의 거지가 오늘도 같은 자리에 있다. 당신을 알아보자 입꼬리가 비뚤어진다.\n\n“가진 사람들은 다 바쁘지. 어제도 그랬고.”\n\n그는 길을 막지는 않는다. 하지만 당신이 지나간 뒤에도 한동안 시선이 등에 붙어 있다.`;return `골목 입구에 어제보다 사람이 많다. 거지 셋, 일용직 노동자 둘, 얼굴이 익지 않은 청년 몇이 한데 모여 통행하는 사람들에게 먹을 것과 돈을 요구한다.\n\n어제 혼자 손을 내밀던 남자가 당신을 발견한다. “저 사람은 그냥 지나가. 어제도 그랬어.”\n\n원망은 혼자 있을 때보다 무리가 되었을 때 다른 힘을 가진다.`},onEnter:s=>{const r=s.random.data.activeConsequence?.data?.roll??s.random.data.beggarFate??50;if(r<28){modRes({spirit:-5});flag('굶어 죽은 거지')}else if(r<67){flag('거지의 원망')}else{state.city.panic=clamp(state.city.panic+2,0,100);flag('빈민 무리 형성')}},choices:s=>{const r=s.random.data.activeConsequence?.data?.roll??s.random.data.beggarFate??50;if(r<28)return [choice('천 아래 얼굴을 확인하지 않고 지나간다.',s=>s.random.returnTo,{review:s=>`당신은 죽은 사람의 얼굴을 확인하지 않기로 합니다. 어제의 결정과 오늘의 죽음 사이에 정확한 선을 그을 수는 없습니다. 그래도 기억에는 남습니다.`,noEncounter:true}),choice('성당에 시신 수습을 알려준다.',s=>s.random.returnTo,{do:s=>{vec('church',1);modRes({spirit:2})},review:s=>`당신은 적어도 죽은 뒤에는 길가에 버려두지 않기로 합니다. 성당에 사람을 보내 시신 수습을 알립니다.`,noEncounter:true})];if(r<67)return [choice('아무 말 없이 지나간다.',s=>s.random.returnTo,{review:s=>`당신은 그의 원망을 받아치지 않습니다. 서로의 삶은 다시 스쳐 지나갑니다.`,noEncounter:true}),choice('어제는 도울 형편이 아니었다고 말한다.',s=>s.random.returnTo,{do:s=>{const q=check({stat:'wis',skill:'persuasion',diff:58,label:'설명'});if(q.ok)modRes({spirit:1})},review:s=>`당신은 변명처럼 들릴 수 있다는 것을 알면서도 어제의 이유를 말합니다. 그가 납득할지는 당신이 정할 수 없습니다.`,noEncounter:true})];return [choice('길을 비켜달라고 차분히 말한다.',s=>s.random.returnTo,{do:s=>{check({stat:'wis',skill:'persuasion',diff:63,label:'군중 설득'})},review:s=>`당신은 위협으로 맞서지 않고 길을 비켜달라고 요구합니다. 이제 문제는 한 사람의 배고픔이 아니라 서로 다른 불안이 부딪히는 일이 되었습니다.`,noEncounter:true}),choice('다른 골목으로 돌아간다.',s=>s.random.returnTo,{do:s=>advance(0,12),review:s=>`당신은 충돌을 피하고 길을 바꿉니다. 오늘은 싸움을 피했지만 이 골목의 분위기 자체가 사라진 것은 아닙니다.`,noEncounter:true})]}},
enc_child_after_help:{title:'어제의 빵',location:'창고 뒷길',text:s=>`어제 먹을 것을 받은 아이가 담벼락 위에서 당신을 알아본다.

“${playerName()}!”

아이 손에는 반쯤 부서진 나무조각이 들려 있다. “저기 아래에서 주웠어요. 검은 실 같은 게 붙어 있었는데, 만지면 이상해서 안 만졌어요.”

작은 친절은 반드시 보답으로 돌아오는 법칙이 아니다. 다만 이번에는 우연히, 아이가 당신을 기억하고 있었다.`,choices:[choice('아이에게 주운 장소를 안내해달라고 한다.',s=>s.random.returnTo,{do:s=>{note('창고 배수로 근처에서도 검은 뿌리 비슷한 흔적이 발견된다.');vec('worldtree',1);gainSkill('observation',1)},review:s=>`당신은 아이가 본 장소를 확인하기로 합니다. 어제 나눈 음식이 오늘 하나의 단서로 이어집니다.`,noEncounter:true}),choice('위험할 수 있으니 가까이 가지 말라고 한다.',s=>s.random.returnTo,{do:s=>modRes({spirit:1}),review:s=>`당신은 단서보다 아이의 안전을 먼저 택합니다. 무엇을 놓쳤는지는 알 수 없지만, 아이는 고개를 크게 끄덕입니다.`,noEncounter:true})]},
enc_child_after_ignore:{title:'외면한 자리',location:'창고 뒷길',text:s=>{const r=s.random.data.activeConsequence?.data?.roll??s.random.data.childIgnoreFate??50;if(r<20)return `어제 아이가 있던 자리에는 아무도 없다. 근처 상인이 말한다. “걔? 새벽에 성당 쪽으로 실려 갔어. 열인지 굶은 건지는 모르겠고.”`;if(r<70)return `어제의 아이가 다른 아이 둘과 함께 있다. 당신을 보고 한 아이가 귓속말한다. 셋은 당신 가까이 오지 않는다.`;return `창고 뒤에서 아이들 여럿이 상자에서 떨어진 곡식을 긁어모으고 있다. 어제의 아이가 당신을 보지만 모르는 척한다. 굶주림은 하루 사이에 작은 무리를 만들었다.`},onEnter:s=>{const r=s.random.data.activeConsequence?.data?.roll??s.random.data.childIgnoreFate??50;if(r<20)modRes({spirit:-3});else if(r>=70)state.city.panic=clamp(state.city.panic+1,0,100)},choices:[choice('그 모습을 기억하고 지나간다.',s=>s.random.returnTo,{review:s=>`당신은 어제와 오늘이 완전히 무관하지 않다는 사실만 기억해둡니다. 모든 결과가 당신 책임은 아니지만, 모든 선택이 흔적 없이 사라지는 것도 아닙니다.`,noEncounter:true})]},
enc_runaway_cart:{title:'미끄러진 수레' ,location:'도시 경사로',onEnter:s=>{if(passive('perception',60))flag('수레 끈 먼저 봄')},text:s=>`비에 젖은 돌길 위에서 짐수레 하나가 갑자기 뒤로 미끄러진다. 아래쪽에는 빵 바구니를 든 노인이 있고, 수레 주인은 바퀴 옆에서 욕을 내뱉으며 손잡이를 붙잡는다.

${hasFlag('수레 끈 먼저 봄')?'<span class="narrationEm">눈에 먼저 들어온 것은 수레가 아니라 오른쪽 고정끈이다. 반쯤 풀려 있어 무게가 한쪽으로 쏠리고 있다.</span>':''}`,choices:[
 choice('몸으로 수레를 받아낸다.',s=>s.random.returnTo,{do:s=>{const r=check({stat:'str',skill:'athletics',diff:62,label:'수레 멈추기'});modRes({stamina:-10});if(r.ok){state.silver+=1;gainSkill('athletics',2)}else modRes({hp:-5})},noEncounter:true}),
 choice('고정끈을 당겨 방향을 틀어버린다.',s=>s.random.returnTo,{if:s=>hasFlag('수레 끈 먼저 봄'),do:s=>{const r=check({stat:'dex',skill:'observation',diff:57,label:'수레 방향 틀기'});if(r.ok){gainSkill('observation',2);state.silver+=1}else modRes({hp:-3})},noEncounter:true}),
 choice('소리쳐 노인부터 피하게 한다.',s=>s.random.returnTo,{do:s=>{gainSkill('persuasion',1);advance(0,10)},noEncounter:true})]},
enc_pickpocket:{title:'너무 가벼운 충돌',location:'장터 골목',onEnter:s=>{if(passive('perception',63,skill('observation')*2))flag('소매치기 손 포착')},text:s=>`좁은 골목에서 작은 체구의 아이가 당신 어깨에 부딪힌다. 아이는 사과도 없이 사람들 사이로 빠져나간다.

${hasFlag('소매치기 손 포착')?'<span class="narrationEm">부딪힌 순간, 아이의 손이 당신 주머니 입구를 스쳤다.</span>':'주머니가 조금 가벼워진 것 같은 기분이 들지만 확신은 없다.'}`,choices:[
 choice('아이를 붙잡는다.',s=>s.random.returnTo,{do:s=>{const r=check({stat:'dex',skill:'athletics',diff:60,label:'소매치기 추격'});if(r.ok){state.silver+=2;flag('소매치기 붙잡음')}else state.silver=Math.max(0,state.silver-1);advance(0,15)},noEncounter:true}),
 choice('손목을 잡지 않고 “돌려놔”라고 말한다.',s=>s.random.returnTo,{if:s=>hasFlag('소매치기 손 포착'),do:s=>{const r=check({stat:'wis',skill:'persuasion',diff:54,label:'조용한 압박'});if(r.ok){gainSkill('persuasion',2);flag('소매치기 돌려받음')}else state.silver=Math.max(0,state.silver-1)},noEncounter:true}),
 choice('확실하지 않다. 그냥 간다.',s=>s.random.returnTo,{do:s=>{if(!hasFlag('소매치기 손 포착')&&rng()<.55)state.silver=Math.max(0,state.silver-1)},noEncounter:true})]},
enc_foreign_words:{title:'알아듣는 사람만 듣는 거래',location:'길모퉁이 노점',onEnter:s=>{const opts=[['orcish','오크어'],['goblin','고블린어'],['elven','엘프어'],['dwarven','드워프어']].filter(([k])=>lang(k)>=2);const pick=opts.length?opts[rollInt(0,opts.length-1)]:['common','공용어'];s.random.data.foreign=pick[0]},text:s=>{const k=s.random.data.foreign;const l=lang(k);const line=l>=7?'“북문 쪽 창고는 오늘 밤 비워. 땅 아래 소리가 심상치 않아.”':l>=4?'“북문… 창고… 오늘 밤… 비워. 아래… 소리.”':'몇 단어가 귀에 걸리지만 뜻을 엮기 어렵다.';return `길모퉁이에서 두 외지 상인이 주변을 살피며 ${LANG_NAMES[k]}로 낮게 말한다.

<span class="narrationEm">${line}</span>

공용어였다면 누구나 들었을 말이지만, 지금 이 정보는 알아듣는 사람에게만 존재한다.`},choices:s=>[
 choice('못 들은 척 지나가며 내용을 기억한다.',s=>s.random.returnTo,{if:s=>lang(s.random.data.foreign)>=4,do:s=>{note('외지 상인들이 북문 창고를 비우라는 수상한 대화를 나눴다.');flag('외국어 북문 소문');gainSkill('language',1)},noEncounter:true}),
 choice('그 언어로 무슨 뜻인지 직접 묻는다.',s=>s.random.returnTo,{if:s=>lang(s.random.data.foreign)>=6,do:s=>{gainSkill('language',2);state.silver=Math.max(0,state.silver-1);note('북문 지하에서 밤마다 돌 두드리는 소리가 난다는 외지 상인들의 소문을 들었다.')},noEncounter:true}),
 choice('뜻을 모르겠다. 신경 쓰지 않는다.',s=>s.random.returnTo,{noEncounter:true})]},
enc_rain_shrine:{title:'이름 없는 작은 제단',location:'골목의 비가림 아래',onEnter:s=>{if(passive('perception',67))flag('제단 아홉 자국')},text:s=>`무너진 담벼락 아래 손바닥만 한 돌 제단이 있다. 누구 신의 것인지 표시가 지워져 있다. 비가 고인 홈에서 아주 약한 빛이 번진다.

${hasFlag('제단 아홉 자국')?'<span class="narrationEm">물을 닦아내니 둥근 홈이 하나가 아니라 정확히 아홉 개다.</span>':''}`,choices:[
 choice('손을 대본다.',s=>s.random.returnTo,{do:s=>{const types=Object.keys(RES_NAMES);const k=types[rollInt(0,types.length-1)];modResonance(k,rollInt(1,3),-1);modRes({mana:2,spirit:-2});if(state.resonanceAwareness<1)state.resonanceAwareness=1;flag('길가 제단 접촉')},noEncounter:true}),
 choice('형태만 기억하고 지나간다.',s=>s.random.returnTo,{if:s=>hasFlag('제단 아홉 자국'),do:s=>{note('도시 골목의 이름 없는 옛 제단에도 아홉 개의 홈이 있었다.');vec('scholar',1)},noEncounter:true}),
 choice('손대지 않는다.',s=>s.random.returnTo,{noEncounter:true})]},
enc_checkpoint:{title:'누구에게만 묻는 질문',location:'도시 임시 검문선',text:s=>`경비병 둘이 지나가는 사람을 세운다. 인간 둘은 얼굴만 보고 보내면서 당신에게는 짐을 풀어보라고 한다.

“요즘 외지인이 많아서 그렇다.”

그 말이 사실일 수도 있다. 하지만 바로 앞 인간에게는 묻지 않았다.`,choices:[
 choice('짐을 보여주고 빨리 끝낸다.',s=>s.random.returnTo,{do:s=>{advance(0,10);modRes({spirit:-1})},noEncounter:true}),
 choice('같은 규칙이면 앞사람도 검사하라고 말한다.',s=>s.random.returnTo,{do:s=>{const r=check({stat:'wis',skill:'persuasion',diff:62,label:'검문 규칙 따지기',bonus:Math.round((secondary('socialSense')-40)/4)+Math.round(rep('factions','guard')/6)});if(r.ok){gainSkill('persuasion',2);flag('검문 항의 성공');modRep('factions','guard',-1,'선별 검문에 공개적으로 항의했다');modRep('peoples',playerPeopleKey(),2,'선별 검문에 공개적으로 항의했다')}else advance(0,15)},noEncounter:true}),
 choice('경비병이 시선을 돌린 순간 골목으로 빠진다.',s=>s.random.returnTo,{do:s=>{const r=check({stat:'dex',skill:'stealth',diff:58,label:'검문 우회'});if(r.ok)gainSkill('stealth',2);else modRes({stamina:-5})},noEncounter:true})]},
enc_dead_bird:{title:'죽은 새의 발',location:'배수로 옆',onEnter:s=>{if(passive('perception',60))flag('새 발 검은 실')},text:s=>`배수로 옆에 까마귀 한 마리가 죽어 있다. 비 맞은 새 한 마리쯤은 이상할 것이 없다.

${hasFlag('새 발 검은 실')?'<span class="narrationEm">그런데 발가락 사이에 머리카락보다 가는 검은 실이 감겨 있다. 실은 배수구 안쪽으로 이어진다.</span>':''}`,choices:[
 choice('검은 실을 자세히 살핀다.',s=>s.random.returnTo,{if:s=>hasFlag('새 발 검은 실'),do:s=>{note('도시 배수로 근처 죽은 새의 발에도 검은 실 같은 조직이 감겨 있었다.');vec('worldtree',1);gainSkill('observation',1)},noEncounter:true}),
 choice('병이 옮을 수 있다. 손대지 않는다.',s=>s.random.returnTo,{do:s=>gainSkill('medicine',1),noEncounter:true}),
 choice('대수롭지 않게 지나간다.',s=>s.random.returnTo,{noEncounter:true})]},
enc_lost_purse:{title:'주인 없는 은화',location:'시장과 성당 사이 길',text:s=>`진흙 위에 작은 가죽 주머니가 떨어져 있다. 안에는 은화 여섯 닢과 낡은 영수증 하나가 들어 있다. 영수증에는 약초상 이름이 적혀 있다.

지금 주변에는 주인을 찾는 사람도, 당신을 보는 사람도 없다.`,choices:[
 choice('약초상에 맡긴다.',s=>s.random.returnTo,{do:s=>{modRes({spirit:2});flag('분실 주머니 반환');publicDeed({'factions.merchants':3,'factions.healers':2},'주운 약초상 거래 주머니를 돌려줬다','약초상과 주머니 주인이');vec('doctor',1)},noEncounter:true}),
 choice('은화만 챙기고 주머니는 버린다.',s=>s.random.returnTo,{do:s=>{state.silver+=6;flag('분실 은화 획득')},noEncounter:true}),
 choice('은화 두 닢을 사례라고 생각하고 나머지는 맡긴다.',s=>s.random.returnTo,{do:s=>{state.silver+=2;flag('분실 주머니 일부 반환');modRep('factions','merchants',-1,'주운 돈 일부를 사례로 떼고 반환했다')},noEncounter:true})]},
enc_wandering_scribe:{title:'모르는 글을 아는 척하는 사람들',location:'여관 앞 게시판',text:s=>`떠돌이 서기가 낡은 종이 한 장을 벽에 붙이고 있다. 종이에는 인간 문자 사이사이에 다른 종족 문자가 섞여 있다.

“돈 내면 읽어드립니다. 북부에서 나온 오래된 계약서래요.”

주변 사람 셋은 아무도 읽지 못하면서 고개를 끄덕인다.`,choices:[
 choice('실제로 읽을 수 있는 부분을 확인한다.',s=>s.random.returnTo,{do:s=>{const best=Math.max(lang('elven'),lang('orcish'),lang('goblin'),lang('dwarven'),lang('oldcommon'));const r=check({stat:'int',skill:'language',diff:60,label:'혼합문자 확인',bonus:best*3});if(r.ok){note('떠돌이 서기가 팔던 계약서는 서로 다른 시대의 문장을 짜깁기한 위조품이었다.');gainSkill('language',2);flag('위조 계약서 간파')}else state.silver=Math.max(0,state.silver-1)},noEncounter:true}),
 choice('사람들 앞에서 위조품 같다고 떠본다.',s=>s.random.returnTo,{do:s=>{const r=check({stat:'wis',skill:'deception',diff:61,label:'서기 반응 떠보기'});if(r.ok){gainSkill('deception',2);flag('서기 반응 간파')}},noEncounter:true}),
 choice('관심 두지 않는다.',s=>s.random.returnTo,{noEncounter:true})]},
enc_rumor_knot:{title:'같은 소문의 세 버전',location:'공동 우물',onEnter:s=>{if(passive('socialSense',61))flag('소문 중심인물 파악')},text:s=>`우물가에서 같은 사건을 세 사람이 다르게 말한다.

“북문에서 사람이 죽었대.”
“아니, 엘프가 사람을 저주했다던데?”
“성당에서 이미 문을 닫았다니까.”

셋 중 누구도 직접 본 사람은 아니다.${hasFlag('소문 중심인물 파악')?' <span class="narrationEm">하지만 두 사람이 세 번째 여자의 말을 그대로 조금씩 바꿔 반복하고 있다는 건 보인다.</span>':''}`,choices:[
 choice('소문의 최초 출처를 묻는다.',s=>s.random.returnTo,{if:s=>hasFlag('소문 중심인물 파악'),do:s=>{gainSkill('persuasion',1);note('북문 흉흉한 소문의 상당수는 한 마차꾼의 과장된 증언에서 퍼지고 있다.');state.city.panic=Math.max(0,state.city.panic-1)},noEncounter:true}),
 choice('“확인된 건 없다”고 끊어 말한다.',s=>s.random.returnTo,{do:s=>{const r=check({stat:'wis',skill:'persuasion',diff:56,label:'소문 진정'});if(r.ok){state.city.panic=Math.max(0,state.city.panic-2);publicDeed({'places.borderCity':2},'근거 없는 소문을 가라앉혔다','우물가 사람들이')}},noEncounter:true}),
 choice('오히려 소문을 더 크게 만들어본다.',s=>s.random.returnTo,{do:s=>{gainSkill('deception',1);state.city.panic+=2;flag('소문 과장');publicDeed({'places.borderCity':-3,'factions.poor':-1},'확인되지 않은 북문 소문을 더 크게 부풀렸다','우물가 사람들이')},noEncounter:true})]},
enc_hungry_child:{title:'빵 냄새를 따라온 아이',location:'창고 뒷길',text:s=>`창고 벽 아래 아이 하나가 쭈그리고 앉아 있다. 시선은 당신이 아니라 음식이 든 가방을 따라간다.

“안 훔쳤어요.”

아직 아무도 훔쳤다고 하지 않았다.`,choices:[
 choice('빵이나 식량을 조금 나눠준다.',s=>s.random.returnTo,{if:s=>s.food>0,do:s=>{s.food--;modRes({spirit:2});flag('굶주린 아이 도움');publicDeed({'factions.poor':3},'굶주린 아이에게 먹을 것을 나눴다','근처 아이들이');scheduleConsequence('enc_child_after_help',1,{kind:'child'})},review:s=>`당신은 아이에게 먹을 것을 조금 나눠주기로 합니다. 아이는 처음에는 손을 내밀지 못하고 당신 얼굴과 음식 사이를 몇 번이나 번갈아 봅니다. 결국 음식을 받아든 뒤에도 고맙다는 말보다 먼저 주변을 살핍니다.`,noEncounter:true}),
 choice('가족이 어디 있는지 묻는다.',s=>s.random.returnTo,{do:s=>{if(passive('socialSense',55)){note('굶주린 아이의 가족은 북문 봉쇄 소문 때문에 일거리를 잃었다.');vec('farmer',1)}advance(0,10)},review:s=>`당신은 먹을 것을 바로 건네는 대신 아이의 사정을 먼저 묻습니다. 아이는 경계하면서도 몇 마디씩 가족 이야기를 꺼냅니다.`,noEncounter:true}),
 choice('모든 아이를 책임질 수는 없다. 지나간다.',s=>s.random.returnTo,{do:s=>{state.random.data.childIgnoreFate=rollInt(1,100);scheduleConsequence('enc_child_after_ignore',1,{roll:state.random.data.childIgnoreFate})},review:s=>`당신은 모든 아이를 책임질 수는 없다고 생각합니다. 아이에게서 시선을 떼고 골목을 그대로 걸어갑니다. 뒤에서 발소리가 따라오지는 않습니다. 적어도 지금은 그렇습니다.`,noEncounter:true})]},
enc_old_soldier:{title:'칼집을 보는 노인',location:'성벽 아래 술집 앞',text:s=>`한쪽 다리를 저는 노인이 당신 장비와 걸음걸이를 훑어본다.

“칼을 배운 사람은 손보다 어깨가 먼저 보이지.”

그는 술에 취했지만 눈은 흐리지 않다.`,choices:[
 choice('자세를 봐달라고 한다.',s=>s.random.returnTo,{do:s=>{if(skill('sword')>=1){gainSkill('sword',2);modRes({stamina:-3})}else gainSkill('guard',1);advance(0,15)},noEncounter:true}),
 choice('북쪽에서 무슨 일이 있었는지 묻는다.',s=>s.random.returnTo,{do:s=>{note('퇴역병은 몇 년 전에도 북쪽 숲에서 짐승이 한꺼번에 사라진 적이 있었다고 기억한다.');vec('guard',1);advance(0,10)},noEncounter:true}),
 choice('취객의 말이다. 지나간다.',s=>s.random.returnTo,{noEncounter:true})]},
enc_black_dog:{title:'짖지 않는 검은 개',location:'북쪽으로 난 골목',onEnter:s=>{if(passive('perception',64))flag('검은개 발자국 역행')},text:s=>`검은 개 한 마리가 골목 가운데 서 있다. 사람을 보면서도 짖지 않는다. 당신이 한 걸음 다가가자 개는 북쪽을 보고, 다시 당신을 본다.

${hasFlag('검은개 발자국 역행')?'<span class="narrationEm">진흙의 발자국은 이상하다. 개는 북쪽에서 온 게 아니라 북쪽을 향해 여러 번 갔다가 되돌아왔다.</span>':''}`,choices:[
 choice('개를 따라가 본다.',s=>s.random.returnTo,{do:s=>{advance(0,20);if(passive('perception',58)){note('검은 개가 반복해서 향하던 골목 끝 배수구에서 검은 실 같은 뿌리 흔적을 보았다.');vec('worldtree',1);flag('검은개 배수구')}} ,noEncounter:true}),
 choice('먹을 것을 조금 던져준다.',s=>s.random.returnTo,{if:s=>s.food>0,do:s=>{s.food--;modRes({spirit:1})},noEncounter:true}),
 choice('길짐승이다. 지나간다.',s=>s.random.returnTo,{noEncounter:true})]},
death:{title:'죽음',location:s=>s.location,onEnter:s=>{state.ended=true;flag('사망')},text:s=>`몸이 더 이상 명령을 듣지 않는다.

소리는 멀어지고, 마지막으로 누군가 <b>${playerName()}</b>이라는 이름을 부른 것 같지만, 누구였는지조차 확실하지 않다.

이 세계에는 당신 없이도 수많은 일이 계속될 것이다.

<div class="endingCard"><div class="endingNum">DEATH END</div><h3>여기까지의 삶</h3>모든 삶이 세계의 중심에 닿는 것은 아니다. 그리고 모든 죽음이 실패인 것도 아니다.</div>`,choices:[choice('다른 삶으로 다시 시작한다.',null,{do:s=>restartConfirm()})]}
});
}
