/* Classic script: shared global bindings. Load order is defined in index.html. */

// Original index.html:2940
function registerLifePrologues(){
Object.assign(scenes,{
prelude_healer:{title:'아침 첫 손님',location:'약초상 거리',onEnter:s=>{meet('nadia')},text:s=>`가게 문을 완전히 열기도 전에 여자가 하나 들어온다. 아이를 업고 있다. 아이 이마는 뜨겁고 입술은 말라 있다.

“북쪽 친정에 다녀온 뒤부터 이래요. 약초라도 뭐든 주세요.”

스승은 아직 나오지 않았다. 선반에는 해열에 쓰는 쓴잎과, 배탈에 쓰는 말린 뿌리와, 이름표가 떨어진 병 하나가 놓여 있다.

당신에게 오늘의 첫 문제는 재앙의 정체가 아니라, 지금 눈앞의 아이에게 무엇을 건넬 것인가다.`,choices:[choice('맥과 호흡부터 보고 쓴잎을 아주 조금 쓴다.','intro',{do:s=>{const r=check({stat:'int',skill:'medicine',diff:50,label:'아침 환자 살피기'});if(r.ok){modRep('factions','healers',2,'열병 아이에게 무리한 약을 쓰지 않았다');flag('열병 환자 조기 관찰');knowFact('북쪽을 다녀온 아이에게 고열과 갈증이 나타났다.')}advance(0,20)}}),choice('스승이 올 때까지 물과 젖은 천으로 열만 낮춘다.','intro',{do:s=>{gainSkill('medicine',1);modRep('factions','healers',1,'약을 함부로 쓰지 않고 환자를 안정시켰다');advance(0,15)}}),choice('북쪽에서 무엇을 먹고 마셨는지 보호자에게 먼저 묻는다.','intro',{do:s=>{gainSkill('observation',1);flag('북쪽 물 의심');advance(0,15)}})]},
prelude_hunter:{title:'비 뒤의 빈 덫',location:'북문 밖 사냥길',text:s=>`도시로 들어가기 전에 어젯밤 덫을 하나 확인한다. 덫은 작동하지 않았고 미끼도 그대로다.

문제는 한 개가 아니다. 사흘 비가 오기 전부터 이 길에서 새 발자국도, 토끼 똥도 눈에 띄게 줄었다. 비가 모든 흔적을 씻었다고 하기에는 숲이 너무 조용하다.

멀리 성문이 보인다. 오늘 장터에 갈지, 숲을 한 번 더 볼지 결정해야 한다.`,choices:[choice('덫 주변의 발자국과 흙부터 더 살핀다.','intro',{do:s=>{const r=check({stat:'wis',skill:'survival',diff:53,label:'사라진 짐승 흔적'});if(r.ok){knowFact('북문 숲의 짐승들은 비가 오기 전부터 이 일대를 피하기 시작했다.');flag('짐승 이동 조기 파악');vec('underworld',1)}advance(0,20)}}),choice('장터에 들어가 다른 사냥꾼에게도 같은 일이 있었는지 묻는다.','intro',{do:s=>{modRep('places','northQuarter',1,'짐승이 사라진 일을 사냥꾼들과 확인했다');advance(0,15)}})]},
prelude_elf_church:{title:'경전과 귀',location:'북문 성당 필사실',onEnter:s=>{meet('adel');meet('toma')},text:s=>`토마가 당신 책상 위에 낡은 문서 한 장을 올려놓는다.

${dlg('toma','이 글자, 엘프 글자 맞죠? 아델 부사제님은 그냥 장식이라고 하셨는데… 전 아무래도 글자처럼 보여서요.')}

문서 가장자리에는 오래된 엘프 문자와 비슷한 선이 있다. 당신이 배운 엘프어에는 없는 철자지만 완전히 낯설지도 않다.

성당 밖에서는 장터 종이 울린다. 오늘 물품 심부름을 나가야 할 시간이다.`,choices:[choice('문자 모양을 짧게 베껴둔다.','intro',{do:s=>{gainSkill('history',1);gainSkill('language',1);flag('성당 엘프문자 선취');vec('scholar',1);advance(0,15)}}),choice('아델에게 왜 장식이라고 판단했는지 묻는다.','intro',{do:s=>{modRel('adel',2,'경전 가장자리의 엘프 문자에 의문을 제기했다');flag('교단 기록 의문 조기');advance(0,15)}})]},
prelude_elf_crafter:{title:'은실과 오래된 문양',location:'동문 은세공방',text:s=>`스승이 어제 맡은 브로치 하나를 당신 앞에 밀어놓는다. 인간 귀족이 가져온 물건인데 뒷면 문양은 북방 엘프의 오래된 길 표식과 닮아 있다.

“고칠 수 있겠어?”

금이 간 은실 사이에 청동 가루가 끼어 있다. 재료가 섞인 방식도 요즘 물건 같지 않다.

장터에는 북방 엘프 상단이 들어왔다는 소문이 돈다.`,choices:[choice('문양을 종이에 베껴두고 장터의 엘프에게 물어본다.','intro',{do:s=>{flag('은세공 옛문양');gainSkill('observation',1);vec('elf',1);advance(0,15)}}),choice('의뢰품은 의뢰품이다. 수리 상태만 확인하고 장터로 나간다.','intro',{do:s=>{gainSkill('trade',1);modRep('factions','craftsmen',1,'의뢰품을 함부로 캐묻지 않았다');advance(0,10)}})]},
prelude_orc_farm:{title:'밭고랑의 깊은 금',location:'남문 밖 개간촌',onEnter:s=>meet('mara'),text:s=>`비가 멎자 밭 가장자리 흙이 길게 갈라져 있다. 단순히 물이 빠지며 생긴 금이라기에는 한쪽이 지나치게 깊다.

마레나가 장화를 진흙에서 빼내며 투덜거린다.

${dlg('mara','{name}, 이쪽 좀 봐. 어제까진 없던 금이야. 또 배수로 터진 거면 오늘 장터고 뭐고 끝장이네.')}

당신은 손가락 두 마디를 흙 틈에 넣어본다. 아래에서 미지근한 바람이 올라오는 듯하다.`,choices:[choice('삽으로 주변을 조금 걷어 배수 문제인지 확인한다.','intro',{do:s=>{modRes({stamina:-5});gainSkill('farming',1);flag('남쪽 지반 금 조기');vec('underworld',1);advance(0,20)}}),choice('오늘은 장터가 먼저다. 위치만 표시해둔다.','intro',{do:s=>{note('남쪽 개간촌 밭 가장자리에 비 뒤 깊은 지반 균열이 생겼다.');advance(0,10)}})]},
prelude_orc_caravan:{title:'통역값과 칼값',location:'동문 외지상단 대기장',text:s=>`같은 대상단의 고블린 상인이 인간 세금표를 들고 욕을 한다. 숫자는 맞는데 짐 분류가 다르다며 추가 은화를 내라고 한다는 것이다.

당신 뒤에는 낯선 인간 경비병이 서 있고, 앞에는 오크어와 고블린어가 한꺼번에 튄다.

길 위에서 이런 일은 싸움보다 흔하다. 그리고 때로는 싸움보다 오래 간다.`,choices:[choice('세금표와 짐표를 대조해 누가 맞는지 확인한다.','intro',{do:s=>{const r=check({stat:'int',skill:'trade',diff:52,label:'상단 세금표 대조'});if(r.ok){modRep('factions','merchants',2,'상단의 잘못 매겨진 통행세를 바로잡았다');gainSkill('language',1)}advance(0,15)}}),choice('돈 몇 닢보다 시간이 아깝다. 상단을 먼저 들여보낸다.','intro',{do:s=>{state.silver=Math.max(0,state.silver-1);advance(0,10)}})]},
prelude_goblin_church:{title:'배급 명부의 빈칸',location:'북문 구휼소',onEnter:s=>{meet('adel');meet('toma')},text:s=>`아침 배급 명부에 같은 집 주소가 세 번 적혀 있다. 필체는 서로 다르고 이름도 다르지만 모두 북쪽 농가에서 왔다고 되어 있다.

토마가 빵 바구니를 들고 고개를 내민다.

${dlg('toma','어제도 북쪽에서 사람들이 왔어요. 다들 열 때문이라고는 하는데… 이 정도면 그냥 감기철은 아닌 것 같죠?')}

당신은 명부를 덮기 전에 세 주소 옆에 작은 표시를 남긴다.`,choices:[choice('세 사람의 증상을 따로 적어둔다.','intro',{do:s=>{gainSkill('medicine',1);gainSkill('observation',1);flag('구휼소 열병 명부');knowFact('북쪽 여러 농가에서 비슷한 고열 환자가 같은 시기에 구휼소로 들어왔다.');advance(0,15)}}),choice('아델에게 배급량을 늘릴지 먼저 묻는다.','intro',{do:s=>{modRel('adel',2,'환자 증가 전에 배급량을 걱정했다');vec('church',1);advance(0,10)}})]},
prelude_dwarf_road:{title:'도로석 아래의 빈 소리',location:'동문 진입로',text:s=>`보수대가 어제 갈아 끼운 도로석 하나가 다시 내려앉았다.

망치 자루로 가장자리를 두드리자 세 군데는 묵직한데 한 군데만 속 빈 소리가 난다. 밑에 배수관이 있는 위치도 아니다. 더 이상한 건 기반석 옆면에 드워프식 측량 숫자와 인간 왕실 도로 표식이 함께 새겨져 있다는 점이다.

도시 사람에게는 그냥 오래된 돌이다. 당신에게는 누가, 언제, 어떤 기준으로 이 길을 놓았는지가 먼저 보인다.`,choices:[choice('측량줄로 침하 방향을 재본다.','intro',{do:s=>{const r=check({stat:'int',skill:'observation',diff:50,label:'도로 침하 측량'});if(r.ok){knowFact('동문 도로석 일부가 자연 침하가 아니라 지하의 빈 공간 방향으로 기울고 있다.');flag('도로 지하공간 조기');vec('underworld',1)}advance(0,20)}}),choice('보수대에 표시만 남기고 장터로 간다.','intro',{do:s=>{modRep('factions','craftsmen',1,'이상 침하 도로석을 표시해뒀다');advance(0,10)}})]}
});

const oldSceneTokenExamine=scenes.token_examine;

if(scenes.market_token){/* 유지 */}

Object.assign(scenes,{
prelude_orc_merc:{title:'칼집보다 먼저 보는 것',location:'동문 밖 용병 숙영지',onEnter:s=>{meet('mark')},text:s=>`동문 밖 빈터에 밤새 머문 용병단이 천막을 걷는다. 젖은 밧줄 냄새와 말똥 냄새 사이로 쇠 부딪히는 소리가 이어진다.

당신은 어릴 때부터 싸움이 시작되기 직전의 정적을 안다. 누가 칼을 잘 쓰는지보다, 누가 먼저 겁을 먹고 누가 겁먹은 사람을 밀어붙이는지를 보는 편이 빠르다.

오늘은 용병단의 일이 없다. 도시 안에서 품삯을 알아볼 생각으로 허리띠를 조이는데, 성문 쪽에서 언성이 높아진다. 오크 상단 짐꾼 하나가 통행패를 들고 있고 인간 경비병 둘이 그를 둘러싸고 있다.

말은 반쯤 통한다. 그래서 오히려 싸움이 나기 좋은 상황이다.`,choices:[
 choice('오크어와 공용어를 오가며 양쪽 말을 정확히 맞춰본다.','intro',{do:s=>{const r=check({stat:'int',skill:'language',diff:51,label:'성문 통역',bonus:lang('orcish')+lang('common')/2});if(r.ok){modRep('factions','guard',2,'성문에서 오크 짐꾼과 경비의 오해를 풀었다');modRep('peoples','greenOrc',2,'성문에서 오크 짐꾼의 말을 대신 전했다');gainSkill('language',2);flag('성문 오크 통역')}advance(0,15)},review:s=>`당신은 어느 한쪽 편을 먼저 들기보다 두 사람이 실제로 무슨 말을 했는지부터 맞춥니다. 오크어의 거친 어미가 공용어의 모욕처럼 들린 부분과, 경비병이 생략한 규칙 설명을 하나씩 풀어놓습니다.`}),
 choice('싸움이 날 기색부터 보고 둘 사이에 선다.','intro',{do:s=>{const r=check({stat:'wis',skill:'guard',diff:54,label:'충돌 막기'});if(r.ok){modRep('factions','guard',1,'성문 충돌을 몸으로 막았다');modRep('peoples','greenOrc',1,'오크 짐꾼이 맞기 전에 싸움을 막았다')}modRes({stamina:-4});advance(0,10)},review:s=>`당신은 말보다 어깨와 손을 봅니다. 칼자루로 내려가는 손이 보이자 두 사람 사이에 몸을 넣습니다. 용병단에서 익힌 일은 싸움을 잘하는 것만이 아니라, 언제 싸움이 시작되는지 알아채는 일이기도 했습니다.`}),
 choice('오늘은 용병단 일도 아니다. 도시 안으로 들어간다.','intro',{do:s=>advance(0,5),review:s=>`당신은 남의 다툼을 일일이 떠맡지 않기로 합니다. 뒤에서 목소리는 한 번 더 높아지지만, 오늘 당신에게도 먹고살 일이 있습니다.`})
]},

// 짧았던 생활 인카운터를 '사건이 끝나도 장면이 남는' 방식으로 확장한다.
enc_hungry_child:{title:'빵 냄새를 따라온 아이',location:'창고 뒷길',text:s=>`창고 벽 아래 아이 하나가 웅크리고 앉아 있다. 얼굴보다 먼저 눈에 들어오는 건 시선이다. 아이는 당신을 보지 않고, 당신이 든 가방과 허리춤의 식량만 본다.

옷자락에는 말라붙은 진흙이 있고 신발 한쪽은 끈 대신 헝겊으로 묶여 있다. 이 도시에서 가난한 아이가 특별한 광경은 아니다. 다만 며칠 사이 북문 쪽 일용직이 줄었다는 이야기를 들었다면, 이 아이의 허기가 오늘 하루만의 일은 아닐 수도 있다.

당신이 멈춰 서자 아이가 몸을 조금 굳힌다. 달라고 먼저 말하지는 않는다. 거절당하는 일에도 품이 든다는 걸 이미 배운 얼굴이다.`,choices:scenes.enc_hungry_child.choices},
enc_runaway_cart:{title:'미끄러진 수레',location:'도시 경사로',onEnter:scenes.enc_runaway_cart.onEnter,text:s=>`비에 젖은 돌길에서 쇠테 두른 바퀴가 날카로운 소리를 낸다. 짐수레 하나가 경사를 거슬러 뒤로 밀리기 시작한다.

수레 아래쪽에는 빵 바구니를 든 노인이 있고, 수레 주인은 바퀴 옆에서 손잡이를 붙든 채 욕을 내뱉는다. 짐이 한쪽으로 쏠릴 때마다 수레가 반 뼘씩 방향을 튼다. 누구든 늦게 움직이면 사람 하나쯤 깔릴 거리다.

${hasFlag('수레 끈 먼저 봄')?'<span class="narrationEm">당신의 눈에는 사람들보다 먼저 오른쪽 고정끈이 들어온다. 젖은 매듭이 반쯤 풀려 있어 짐의 무게가 한쪽으로 쏠리고 있다. 힘으로 밀어받지 않아도 방향을 바꿀 방법이 있을지 모른다.</span>':'주변 사람들은 수레에만 시선이 꽂혀 있다. 누가 먼저 움직일지를 서로 기다리는 짧은 순간이 길게 늘어진다.'}`,choices:scenes.enc_runaway_cart.choices},
enc_pickpocket:{title:'너무 가벼운 충돌',location:'장터 골목',onEnter:scenes.enc_pickpocket.onEnter,text:s=>`장터 안쪽 골목은 두 사람이 어깨를 나란히 하고 걷기에도 좁다. 생선 비린내와 젖은 천 냄새 사이를 빠져나가던 순간, 작은 체구의 아이가 당신 어깨에 가볍게 부딪힌다.

“미안.”

말은 들렸는지조차 모르게 짧다. 아이는 고개도 들지 않고 사람들 사이로 미끄러져 들어간다.

${hasFlag('소매치기 손 포착')?'<span class="narrationEm">부딪힌 순간 아이의 손등이 주머니 입구를 훑는 것을 분명히 봤다. 실수로 닿은 손이 아니다.</span>':'몇 걸음 뒤에야 허리춤이 묘하게 가볍다는 느낌이 든다. 정말 무언가 없어졌는지, 단지 의심이 먼저 생긴 건지는 아직 확신할 수 없다.'}`,choices:scenes.enc_pickpocket.choices},
enc_lost_purse:{title:'주인 없는 은화',location:'시장과 성당 사이 길',text:s=>`시장과 성당 사이의 진흙길에 작은 가죽 주머니 하나가 반쯤 밟혀 있다. 발로 건드리자 묵직한 소리가 난다.

안에는 은화 여섯 닢과 기름때 묻은 영수증 한 장이 들어 있다. 영수증에는 약초상 이름과 해열 약재 몇 가지가 적혀 있다. 날짜는 오늘 아침이다.

고개를 들면 사람들은 제 갈 길을 간다. 주머니를 찾는 사람도, 당신 손을 유심히 보는 사람도 없다. 그래서 선택은 더 사소해 보이고, 어쩌면 더 온전히 당신 것이 된다.`,choices:scenes.enc_lost_purse.choices},
enc_rumor_knot:{title:'같은 소문의 세 버전',location:'공동 우물',onEnter:scenes.enc_rumor_knot.onEnter,text:s=>`공동 우물가에서는 물보다 이야기가 빨리 돈다. 오늘은 세 사람이 같은 일을 말하면서도 서로 다른 사건을 설명하고 있다.

한 사람은 북문 밖에서 죽은 사람이 걸어 다녔다고 하고, 다른 사람은 술 취한 사냥꾼 하나가 쓰러졌을 뿐이라고 한다. 세 번째 사람은 경비대가 무언가를 숨기려고 시체를 치웠다고 덧붙인다.

사람들은 사실을 확인하려고 모인 게 아니다. 불안에 이름을 붙이려고 모였다.

${hasFlag('소문 중심인물 파악')?'<span class="narrationEm">가만히 듣다 보니 두 사람이 자꾸 같은 빵집 여자의 말을 출처로 댄다. 세 갈래처럼 보였던 소문 중 적어도 둘은 같은 입에서 시작됐다.</span>':''}`,choices:scenes.enc_rumor_knot.choices},
enc_foreign_words:{title:'알아듣는 사람만 듣는 거래',location:'길모퉁이 노점',onEnter:scenes.enc_foreign_words.onEnter,text:s=>{const k=s.random.data.foreign,l=lang(k);const line=l>=7?'“북문 쪽 창고는 오늘 밤 비워. 땅 아래 소리가 심상치 않아.”':l>=4?'“북문… 창고… 오늘 밤… 비워. 아래… 소리.”':'익숙한 단어 몇 개가 귀에 걸리지만 문장의 뼈대는 흩어진다.';return `길모퉁이 천막 아래에서 외지 상인 둘이 서로 몸을 가까이 기울이고 ${LANG_NAMES[k]}로 낮게 말한다. 거래 이야기라기에는 가격이나 수량을 나타내는 손짓이 없다. 둘 다 자꾸 북문 쪽을 흘겨본다.

<span class="narrationEm">${line}</span>

모르는 사람에게는 그저 낯선 말소리다. 조금 아는 사람에게는 불길한 단어 몇 개고, 능숙한 사람에게는 남들이 아직 듣지 못한 정보다. 같은 거리에 서 있어도 언어에 따라 존재하는 세계가 달라진다.`},choices:scenes.enc_foreign_words.choices},
enc_lost_elf_child:{title:'말이 통하지 않는 아이',location:'중앙 장터 천막 사이',text:s=>`푸른 머리끈을 맨 어린 엘프가 천막과 천막 사이에 서 있다. 울고 있지는 않지만 발끝이 어느 방향으로도 움직이지 못한다.

지나가는 인간 상인이 공용어로 부모 이름을 묻자 아이는 입을 다문다. 못 알아듣는 건지, 알아듣고도 겁이 나서 대답하지 않는 건지 주변 사람들은 구분하지 못한다.

당신이 가까이 가자 아이는 먼저 당신 얼굴과 귀, 옷차림을 차례로 본다. ${lang('elven')>=5?'엘프어로 조심스럽게 “상단을 놓쳤어요.”라고 말한다.':lang('elven')>=2?'“상단… 없어… 엄마…” 정도의 말만 알아들을 수 있다.':'말은 거의 알아들을 수 없다. 다만 아이가 같은 문양이 그려진 수레 깃발을 자꾸 찾는다는 건 보인다.'}

도움이 필요한 건 분명하지만, 무엇을 해야 하는지는 당신이 가진 언어와 눈에 따라 다르게 보인다.`,choices:scenes.enc_lost_elf_child.choices},
enc_funeral:{title:'이름을 모르는 장례',location:'북문 성당 옆길',text:s=>`종이 세 번 울리고 작은 장례 행렬이 골목을 막는다. 관은 하나, 뒤따르는 사람은 다섯뿐이다. 비에 젖은 관 뚜껑에는 이름패도 달려 있지 않다.

주변 가게들은 잠깐 목소리를 낮추지만 문을 닫지는 않는다. 며칠 전까지라면 누가 죽었는지부터 물었을 사람들이 오늘은 묻지 않는다. 모르는 편이 마음 편한 소식이 늘어났기 때문이다.

토마가 행렬 끝에서 향을 들고 걷는다. 당신을 알아보고 눈을 마주치지만, 먼저 말을 걸지는 않는다.`,choices:scenes.enc_funeral.choices},
enc_night_hum:{title:'돌 아래에서 나는 낮은 소리',location:'북문 돌길',text:s=>`밤의 북문 돌길은 낮과 다른 장소처럼 보인다. 상점 덧문은 닫혀 있고 멀리 초소의 횃불만 바람에 흔들린다.

몇 걸음 걷던 중 발바닥을 통해 아주 낮은 진동이 올라온다. 귀로 듣는 소리라기보다 어금니 안쪽이 한 번씩 울리는 느낌이다. 멈추면 사라지고, 다시 걸으면 일정한 간격을 두고 되돌아온다.

지나가던 사람 둘은 아무 반응 없이 당신을 스쳐 간다.

${highestRes()>=10?'<span class="narrationEm">그때 당신 안의 어떤 공명이 진동보다 한 박자 늦게, 아주 희미하게 대답한다. 몸 밖의 소리를 들은 것인지 몸 안의 소리를 들은 것인지 구분하기 어렵다.</span>':'돌 틈에 손을 가까이 대도 바람은 느껴지지 않는다. 소리의 근원은 길 위가 아니라 아래에 있는 듯하다.'}`,choices:scenes.enc_night_hum.choices},
enc_well_quarrel:{title:'우물 앞의 순서',location:'공동 우물',text:s=>`공동 우물 앞 줄이 평소보다 두 배는 길다. 물 자체가 부족한 건 아닌데, 북문 쪽 우물이 오염됐다는 소문 때문에 사람들이 이곳으로 몰렸다.

인간 여자 하나와 고블린 노인이 양동이 손잡이를 사이에 두고 언성을 높인다. 누가 먼저 왔는지에서 시작한 싸움은 금세 “너희 같은 것들”과 “인간들은 늘” 같은 말로 바뀐다.

주변 사람 몇은 말릴 생각보다 어느 쪽이 이기는지를 보는 표정이다. 물 한 양동이의 순서가 오래된 불만을 꺼내는 핑계가 되고 있다.`,choices:scenes.enc_well_quarrel.choices}
});
}

// Original index.html:3121
function registerDailyLifeScenes(){
scenes.prelude_noble.text=s=>`마차 바퀴가 진흙을 튀길 때마다 창문 아래쪽이 갈색으로 흐려진다. 멀리서 보면 변경도시 성벽은 단단해 보이지만 가까이 오면 빗물 자국과 급히 덧댄 돌이 먼저 보인다.

당신의 옷은 장터를 오가는 사람들보다 깨끗하고, 허리춤 안쪽에는 작은 가문 인장이 있다. 대단한 권력을 보장하는 물건은 아니다. 하지만 성문에서 시비가 붙었을 때 상대가 한 번 더 생각하게 만들기에는 충분하다.

가문 이름은 문을 열어준다. 동시에 당신의 실수에 성을 붙여 소문내기도 한다.

오늘만큼은 어느 쪽의 사람이 되어 도시 안으로 들어갈지 결정해야 한다.`;

scenes.prelude_market.text=s=>`${dlg('nadia','{name}, 소금 세 자루 가격 좀 보고 와. 비 그친 다음 날엔 다들 세상이 끝난 줄 알고 값을 올리거든.')}

나디아는 동전 세 닢을 손바닥 위에서 튕긴 뒤 다시 서랍에 넣는다. 실제로 사오라는 뜻이 아니라 시세만 확인하라는 뜻이다.

장터로 나가 보니 평소보다 덧문을 반쯤만 연 가게가 많다. 비 때문인지 북문 쪽 소문 때문인지는 아직 모른다. 사람들은 물건값을 묻다가도 누가 ‘북쪽’이라는 말을 꺼내면 한 번씩 고개를 든다.

당신에게 그런 얼굴 변화도 가격표의 일부다.`;

scenes.prelude_church.text=s=>`새벽 기도가 끝난 뒤에도 북문 성당에는 촛불 냄새가 남아 있다. 당신 손톱 밑에는 어제 긁어낸 촛농이 아직 조금 끼어 있다.

${dlg('adel','{name}, 장터에서 붕대와 소금을 조금 더 구해오세요. 북쪽 농가에서 열병 환자가 들어올 수도 있다는 연락이 왔습니다.')}

아델은 ‘열병’이라는 단어를 특별히 낮추지도 높이지도 않는다. 제단 뒤에서는 토마가 빈 침상 수를 세고 있고, 창고지기는 물통을 하나 더 씻는다.

아직 아무도 이 일을 재앙이라고 부르지 않는다. 지금은 그저 오늘 안에 환자가 몇 명 더 올지도 모른다는 준비다. 큰 사건은 대개 이렇게 하찮은 수량부터 늘어난다.`;

scenes.prelude_guard.text=s=>`${dlg('mark','{name}, 아침부터 사람 많다. 비 그쳤다고 다들 한꺼번에 기어나왔어.')}

동문 초소 앞에는 젖은 짐수레가 두 줄로 서 있다. 경비병들은 통행패를 확인하고, 상인들은 세금이 어제와 같은지부터 묻는다. 어린 시절부터 이 근처를 드나든 당신에게는 욕설 섞인 말투도, 갑자기 조용해지는 순간도 낯설지 않다.

마르크가 턱으로 쓰러진 표지판을 가리킨다. 도와달라는 말은 하지 않는다. 서로 아는 사이에서는 부탁도 종종 명령처럼 짧아진다.

오늘 당신은 경비병이 아니다. 그렇다고 이들의 세계와 완전히 무관한 사람도 아니다.`;

scenes.prelude_street.text=s=>`장터가 열리기 전부터 골목은 이미 하루를 시작한다. 빵집 심부름꾼은 어제 남은 빵을 뒤문으로 옮기고, 술이 덜 깬 경비병은 순찰길을 짧게 잡으며, 외지 상인의 짐꾼은 사람 없는 곳에서 허리띠를 다시 맨다.

당신은 간판보다 사람을 먼저 본다. 누가 돈을 가졌는지, 누가 화가 났는지, 누가 누구를 보고 길을 바꾸는지. 그런 걸 알아채는 일은 글을 읽는 것만큼이나 먹고사는 데 쓸모가 있었다.

오늘은 조금 다르다. 북문 쪽에서 내려온 사람들이 평소보다 자주 뒤를 돌아본다. 아직 무슨 일이 있다는 말은 없지만, 골목은 공식 발표보다 먼저 분위기를 바꾸는 법이다.`;

scenes.prelude_elf_city.text=s=>`당신은 공용어로 생각하고 공용어로 꿈꾼다. 어릴 적 식탁에서 들은 농담도, 화가 났을 때 가장 먼저 떠오르는 욕도 인간의 말이다.

그래도 성문 앞처럼 낯선 사람이 많은 곳에 서면 가끔 자신의 귀를 먼저 의식한다. 처음 보는 사람은 당신에게 엘프어로 말을 걸고, 당신이 잠깐 대답을 고르면 이상하다는 표정을 짓는다. 반대로 북방 엘프와 마주치면 그들은 당신의 옷과 억양을 먼저 본다.

오늘 장터에는 북방 엘프 상단이 들어왔다는 소문이 있다. 같은 얼굴을 한 낯선 사람을 일부러 찾아가 볼지, 평소처럼 인간 도시의 하루를 살지는 당신 몫이다.`;

scenes.prelude_elf_north.text=s=>`인간 성벽은 북방의 나무 울타리보다 높고, 입구는 생각보다 좁다. 외지 상인들이 한 줄로 세워져 통행세를 내는 동안 성벽 위에서는 젖은 깃발이 무겁게 늘어진다.

경비병의 공용어는 너무 빠르다. 숫자, 세금, 멈추라는 말은 놓치지 않지만 농담과 욕설이 섞이면 문장의 끝이 흐려진다. 알아들은 척 고개를 끄덕이는 일도 여행 기술 중 하나다.

당신보다 몇 사람 앞에 선 엘프 행상인 하나가 경비병과 언성을 높이고 있다. 그의 엘프어는 또렷하다. 문제는 그 말을 인간 경비병이 전혀 다르게 받아들이고 있다는 데 있다.

같은 종족이라고 해서 반드시 끼어들 의무가 생기는 것은 아니다. 하지만 무엇이 잘못 번역되고 있는지는 당신에게만 선명하게 들린다.`;

scenes.prelude_smith.text=s=>`대장간은 해가 뜨기 전부터 뜨겁다. 오늘은 젖은 장작 때문에 불이 자꾸 죽어 연기가 천장 아래에 낮게 깔린다. 소매에는 쇳가루가 붙고 입안에는 금속 맛이 돈다.

스승은 밤새 수리한 농기구 하나를 당신 손에 쥐여준다. 날이 아니라 자루와 날을 잇는 목 부분이 부러졌던 물건이다.

“장터 농부에게 돌려줘. 그리고 다시 헐거우면 돈 받지 말고 가져오라 해.”

금속은 사람보다 솔직하다는 생각이 들 때가 있다. 두드린 자리와 금 간 자리를 숨기지 않는다. 그런데 도시의 오래된 금속은 가끔 누가 만들었는지보다 더 오래된 이야기를 품고 있다.`;

scenes.prelude_farm.text=s=>`사흘 비가 그친 뒤 농로는 길이라기보다 얕은 진흙탕에 가깝다. 마레나의 수레 한쪽 바퀴가 축 가까이까지 빠졌고, 오늘 장터에 내놓을 채소 포대는 비닐도 없는 천 아래에서 축축하게 눌린다.

${dlg('mara','{name}, 도시 들어가기 전부터 이 꼴이네. 비는 그쳤는데 땅이 사람 발목을 잡아.')}

마레나는 허리춤을 걷어 올리고 바퀴 옆 흙을 발로 밀어낸다. 욕을 하면서도 젖은 채소가 얼마나 상했는지부터 눈으로 센다.

당신에게 도시는 모험이 시작되는 장소가 아니다. 오늘 물건을 얼마에 팔 수 있는지, 돌아오는 길에 소금을 살 수 있는지, 다음 비가 오기 전에 밭고랑을 손볼 돈이 남는지가 먼저다. 세계의 큰일도 그런 하루 안으로 들어와야 비로소 당신 일이 된다.`;
}

// Original index.html:3252
function patchLifeConsequences(){
const oldNightHumEnter=scenes.enc_night_hum.onEnter;

scenes.enc_night_hum.choices[0].do=((old)=>s=>{old(s);if(hasFlag('랜덤인카운터 해금')&&state.res.spirit>0&&rng()<.35)gainResistance('mental',1,'지하 진동의 정신적 압박을 견뎠다',false);lifeRecord('공명','북문 돌길 아래의 진동을 직접 확인했다.')})(scenes.enc_night_hum.choices[0].do);

if(scenes.blackdoor_touch){const old=scenes.blackdoor_touch.onEnter;scenes.blackdoor_touch.onEnter=s=>{if(old)old(s);ensureLifeSystems();gainResistance('mental',1,'검은 문의 공명을 직접 견뎠다',false);lifeRecord('공명','검은 문에 손을 대고 아홉 갈래의 반응을 느꼈다.')}}

if(scenes.day7_result){const old=scenes.day7_result.onEnter;scenes.day7_result.onEnter=s=>{if(old)old(s);ensureLifeSystems();lifeRecord('생존','변경도시의 일주일을 살아서 넘겼다.')}}
}

// Original index.html:3312
function registerChapterAftermath(){
scenes.ending_compute.text=s=>{const e=computeEnding().html;return `${e}
<div class="endingCard"><div class="endingNum">AFTERMATH</div><h3>일주일 뒤, 도시는</h3><div style="line-height:1.85">${chapterCityAftermath()}</div></div>
<div class="grid2"><div class="box"><h3>사람들이 기억하는 ${playerName()}</h3>${chapterPeopleAftermath()}</div><div class="box"><h3>사회에 남은 이름</h3><div style="line-height:1.75">${chapterReputationAftermath()}</div><h3 style="margin-top:16px">아직 끝나지 않은 일</h3><div class="dim" style="line-height:1.75">${chapterLooseEnds()}</div></div></div>
<div class="future"><b>현재 장기 경로</b><br>${futurePaths()}</div>
<div class="notice" style="margin-top:14px">이번 장의 결과는 정답표가 아닙니다. 같은 선택도 누가 보았는지, 어떤 소문으로 퍼졌는지, 누구와 함께 있었는지에 따라 다음 삶에서 다른 의미를 가질 수 있습니다.</div>`};

setReview('enc_runaway_cart',0,s=>`당신은 생각할 틈을 줄이고 수레 앞으로 뛰어듭니다. 어깨와 팔에 무게가 한꺼번에 실리고 젖은 신발이 돌 위에서 밀립니다. 성공하든 다치든, 주변 사람들은 적어도 누가 먼저 움직였는지는 보게 됩니다.`);

setReview('enc_runaway_cart',2,s=>`당신은 수레보다 아래쪽의 노인을 향해 목소리를 던집니다. 직접 수레를 멈추지는 못해도, 사람을 위험에서 빼내는 것 역시 하나의 해결입니다.`);

setReview('enc_pickpocket',0,s=>`당신은 사람들 사이로 사라지는 작은 등을 쫓습니다. 장터의 시선이 잠깐 당신과 아이에게 모입니다. 붙잡는 순간부터 이 일은 잃어버린 은화만의 문제가 아니게 됩니다.`);

setReview('enc_lost_purse',0,s=>`당신은 주머니를 약초상에게 맡깁니다. 아무도 보지 않았다고 생각했지만, 가게 주인은 당신 얼굴을 한 번 더 오래 봅니다. 돈을 돌려준 사실보다 '돌려줄 수 있었는데도 돌려줬다'는 판단이 기억에 남습니다.`);

setReview('enc_funeral',0,s=>`당신은 서두르지 않고 길 가장자리로 물러섭니다. 관이 지나가는 몇 분 동안 아무것도 해결되지 않습니다. 그래도 죽은 사람의 마지막 길을 방해하지 않는다는 작은 규칙을 지킵니다.`);

setReview('enc_well_quarrel',2,s=>`당신은 우물 한 양동이 때문에 벌어진 싸움에 끼어들지 않습니다. 뒤에서 언성이 계속 높아집니다. 모든 갈등에 개입하지 않는 것도 선택이지만, 개입하지 않은 갈등 역시 스스로 사라진다고 보장되지는 않습니다.`);
}
