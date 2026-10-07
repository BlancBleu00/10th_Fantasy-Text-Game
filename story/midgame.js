/* New connective scenes. Core lore stays unresolved where prior sources conflict. */
const MIDGAME_STORY={
 west:{
  gate:{chapter:2,title:'담장 안으로 갈 자격',text:'교역소에서 작성한 기록이 돌아왔다. 경계 관리인은 글의 내용보다 서명을 먼저 확인한다. 누구나 들어갈 수 없는 곳에서 문제가 생겼다고 해서 문이 저절로 열리지는 않는다.\n\n미리엘은 숲 안쪽을 조사할 사람과 바깥 물길을 살필 사람이 모두 필요하다고 말한다. 그녀의 추천도 주민 대표의 확인도 한정된 책임을 뜻한다.',choices:[
   {id:'petition',label:'기록을 제출하고 제한된 조사 허가를 구한다.',next:'mandate',support:1,summary:'당신은 조사할 범위와 책임을 문서로 남겼다. 경계 관리인이 심사를 시작한다.'},
   {id:'outside',label:'허가가 필요 없는 바깥 물길부터 걷는다.',next:'field',evidence:1,minutes:90,summary:'숲의 경계를 넘지 않고 바깥 수로를 따라갔다. 주민들이 쓰는 취수 지점을 지도에 표시했다.'}
  ]},
  mandate:{chapter:2,title:'보증인의 이름',text:'허가서에는 조사할 구역과 돌아올 시간이 적혀 있다. 미리엘이 보증인으로 나서자 한 관리인이 그녀의 혈통을 들먹인다.\n\n미리엘은 논쟁 대신 당신에게 묻는다. “제가 서명하면, 무엇을 보고 무엇을 보지 못했는지도 같이 적어 주실 건가요?” 그녀를 신탁의 증인으로 세우는 서류는 아니다.',choices:[
   {id:'miriel',label:'미리엘과 관찰 범위를 합의하고 들어간다.',next:'survey',support:2,summary:'보증인과 조사자가 함께 범위를 확인했다. 미리엘을 대신해 예언을 선언하지 않기로 했다.'},
   {id:'residents',label:'주민 대표를 공동 입회인으로 요청한다.',next:'survey',evidence:1,support:1,minutes:120,summary:'입회인을 기다리느라 늦어졌지만 관측은 한 사람의 증언에만 매이지 않게 되었다.'}
  ]},
  field:{chapter:2,title:'뿌리가 막지 않은 길',text:'바깥 수로에서는 누구도 당신에게 신탁을 묻지 않는다. 물을 언제 다시 쓸 수 있느냐고 묻는다.\n\n흙을 퍼내던 주민이 끊어진 측량줄을 보여 준다. 경계 안쪽에서 쓰는 것과 같은 매듭이다. 사람이 먼저 길을 바꾼 것인지, 바뀐 길을 사람이 재려 했는지는 모른다.',choices:[
   {id:'measure',label:'줄과 물높이를 대조해 관리인에게 가져간다.',next:'survey',evidence:2,summary:'같은 매듭과 서로 다른 물높이를 기록했다. 관리인은 수로를 확인하는 동안의 한정 출입을 허락했다.',fact:'경계 안팎의 측량줄이 같은 방식으로 묶여 있었다.'},
   {id:'help',label:'수로를 치우는 주민을 돕고 길 안내를 부탁한다.',next:'survey',support:2,minutes:120,summary:'주민이 자신의 작업 구역에 입회인으로 동행했다. 숲 깊숙한 곳까지 들어갈 권한은 생기지 않았다.'}
  ]},
  survey:{chapter:2,title:'아홉 박자 다음의 침묵',text:'미리엘의 손이 멈춘 뒤에도 뿌리의 작은 울림이 이어졌다. 다른 관측자는 그 순서를 놓쳤다고 한다.\n\n“제가 먼저 들었는지, 제 뒤에 울렸는지부터 확인해야 해요.”\n\n멀리서 작업 인원을 부르는 소리가 들린다. 오래된 관측소에는 과거의 간격 기록이 남아 있고, 물길 아래에는 고립된 일꾼들이 있다. 둘 다 지금 확인할 수는 없다.',choices:[
   {id:'workers',label:'고립된 일꾼들을 먼저 찾는다.',next:'shelter',support:1,summary:'당신은 사람의 목소리를 따라 아래 수로로 향했다.'},
   {id:'records',label:'관측소의 옛 기록부터 확보한다.',next:'archive',evidence:1,summary:'기록을 잃기 전에 관측소로 향했다. 일꾼 구조는 다른 조에 요청했다.'}
  ]},
  shelter:{chapter:2,title:'물 위에 남은 발판',text:'일꾼들은 부서진 수문 위에 모여 있다. 버려야 할 짐을 정하지 못해 출발이 늦어졌다. 장비에는 그들의 생계도 들어 있다.\n\n전부 가져오겠다고 약속할 수는 없다. 사람을 먼저 건넬지, 안전한 길을 다시 만들지 정해야 한다.',choices:[
   {id:'bridge',label:'임시 발판을 놓아 사람과 장비를 함께 옮긴다.',next:'hearing',check:{skill:'athletics',base:48},support:2,failRisk:1,summary:'발판이 버텼다. 일꾼들이 젖은 장비를 들고 건넜다.',failure:'발판이 기울어 장비를 버렸다. 사람은 모두 건넜지만 복구 비용이 남았다.'},
   {id:'evacuate',label:'장비를 두고 사람부터 건너게 한다.',next:'hearing',support:1,risk:1,summary:'사람들은 안전한 쪽으로 넘어왔다. 잃은 장비는 이후의 지원 협상에 남는다.'}
  ]},
  archive:{chapter:2,title:'예언이라 적히기 전',text:'옛 기록에는 물높이와 관측자가 서 있던 자리까지 적혀 있다. 어느 해부터인가 그런 칸이 줄고 해석을 적는 문장이 늘었다.\n\n나무 안에 남은 생명을 아이라 부른 기록도 있다. 호칭이 생명의 정체와 힘을 증명하지는 않는다.',choices:[
   {id:'copy',label:'관측값과 해석을 분리해 사본을 만든다.',next:'hearing',evidence:2,summary:'실측값과 후대의 해석을 다른 종이에 옮겼다.',fact:'세계수 관측 기록에는 나무 안의 생명을 아이라 부른 대목이 있다.'},
   {id:'timing',label:'미리엘과 과거 관측 간격을 재현한다.',next:'hearing',check:{skill:'arcana',base:48},evidence:3,failRisk:1,summary:'울림의 반복을 따로 기록하는 데 성공했다. 미리엘의 해석과 구분할 근거가 늘었다.',failure:'반복을 맞추지 못했다. 이를 공명이 없다는 증거로 삼을 수는 없었다.'}
  ]},
  hearing:{chapter:3,title:'누가 들었다고 말할 것인가',text:'미리엘은 자신의 혼돈 공명과 나무의 반응 사이에 닿는 부분이 있다고 말한다. 그러나 자신이 선택받았다고 선언하지 않는다.\n\n경계 관리인은 소문이 먼저 퍼지면 관측구를 닫겠다고 한다. 주민 대표는 닫는 동안 물은 어디서 얻느냐고 묻는다. 각자가 지키려는 것이 같은 장소에 겹쳐 있다.',choices:[
   {id:'consent',label:'미리엘의 동의를 받아 제한된 공동 관측을 제안한다.',next:'crisis',support:1,evidence:1,summary:'공개의 범위를 먼저 합의했다. 해석이 아닌 관측을 함께 확인하기로 했다.'},
   {id:'boundary',label:'개인의 공명은 빼고 수로의 위험만 보고한다.',next:'crisis',support:1,summary:'주민이 겪는 위험은 알려졌다. 미리엘의 공명에 관한 기록은 당사자에게 돌려주었다.'}
  ]},
  crisis:{chapter:3,title:'물이 돌아오는 밤',text:'관측구를 닫으려는 순간 수위가 오른다. 뿌리를 자르면 물은 빠질 수 있지만 무엇을 끊는지 알 수 없다. 수문을 조정하려면 울림 사이의 틈을 맞춰야 한다.\n\n어린 목소리 같은 소리가 들린다. 말을 걸어 온 것인지 물과 나무가 만든 소리인지 확인할 시간은 짧다.',choices:[
   {id:'adjust',label:'관측 간격에 맞춰 수문을 조정한다.',next:'pact',failureNext:'recover',check:{skill:'observation',base:38},support:1,failRisk:2,summary:'수위가 내려가기 시작했다. 목소리 같은 응답은 멎었지만 발생 시각을 남겼다.',failure:'간격을 놓쳐 아래 통로가 잠겼다. 사람들을 물리고 임시 배수로를 만들어야 한다.'},
   {id:'close',label:'관측을 멈추고 주민을 대피시킨다.',next:'recover',risk:1,summary:'위험 구역을 비웠다. 수로를 다시 열 일은 남았지만 추가로 고립된 사람은 없다.'}
  ]},
  recover:{chapter:3,title:'남은 사람들의 삽',text:'밤새 임시 배수로를 판다. 나무의 비밀을 밝히지 못해도 오늘 물을 쓸 사람은 기다리지 못한다. 당신의 판단을 비난하던 이들도 삽을 든다.\n\n미리엘은 다음 관측 전에 대피 신호를 정하자고 말한다. 실패를 없던 일로 만들지 않는 규칙이다.',choices:[
   {id:'repair',label:'복구에 참여하고 실패한 관측도 기록한다.',next:'pact',minutes:180,support:1,stamina:-8,summary:'임시 물길이 열렸다. 작업을 마친 이들이 다음 계획을 들으러 모인다.'}
  ]},
  pact:{chapter:3,title:'같은 나무 아래 다른 약속',text:'다음 관측의 책임자를 정할 때가 왔다. 세계수를 누구의 소유라고 선언할 자리는 아니다. 누가 기록을 보고, 누가 위험을 알리며, 누가 물을 쓸지를 정하는 자리다.\n\n당신이 모은 증거와 현장에서 얻은 지지는 합의의 범위를 바꾼다.',choices:[
   {id:'accord',label:'증거와 입회인을 갖춘 공동 관측 협약을 맺는다.',next:'end_accord',requires:{evidence:3,support:2},summary:'검증 가능한 기록과 입회인의 동의를 묶어 협약에 서명했다.'},
   {id:'shelter',label:'주민 보호와 물길 복구를 맡는다.',next:'end_shelter',summary:'다음 관측의 명분보다 오늘의 생활을 지키는 역할을 택했다.'},
   {id:'independent',label:'독립 조사자로 남고 기록 사본을 교환한다.',next:'end_independent',summary:'어느 쪽에도 판단을 맡기지 않고 기록을 교환할 연결만 남겼다.'}
  ]}
 },
 east:{
  gate:{chapter:2,title:'봉인보다 먼저 남은 발자국',text:'실종된 사자가 마지막으로 머문 고개의 통행증이 돌아왔다. 출발 기록의 시각과 맞지 않는다.\n\n연락관은 자신과 함께 조사하면 통제 구간에 들어갈 수 있다고 한다. 역참 사람들은 통행증 밖의 옛 우회로를 안다. 어느 길이든 그 길을 안내하는 사람의 책임이 붙는다.',choices:[
   {id:'official',label:'목격자 보호 조건을 확인하고 공식 수색에 합류한다.',next:'mandate',support:1,summary:'보호 조건을 수색 명령의 사본에 남겼다.'},
   {id:'local',label:'역참 사람의 안내로 공개된 우회로를 조사한다.',next:'field',evidence:1,minutes:90,summary:'통제선을 넘지 않고 바깥 우회로의 흔적을 찾기 시작했다.'}
  ]},
  mandate:{chapter:2,title:'왕의 이름으로 묻는 사람',text:'연락관은 용왕의 소집이 모든 용의 동의를 뜻하지 않는다고 말한다. 소집에 응답이 없다는 사실과 반역의 증거는 다르다.\n\n수색 명단에 역참장 이름이 올라 있다. 협조자 칸인지 조사 대상 칸인지 경계가 모호하다.',choices:[
   {id:'protect',label:'역참장을 협조자로 명시하도록 요구한다.',next:'survey',support:2,summary:'서류에 협조자라는 말이 남았다. 현장에서 같은 뜻으로 취급되는지 지켜봐야 한다.'},
   {id:'copy',label:'수색 명령과 연락통 번호를 대조한다.',next:'survey',evidence:2,summary:'실종된 연락통과 원정용 명령통은 번호 체계부터 다르다는 것을 확인했다.',fact:'실종 연락통은 원정 명령통과 다른 번호 체계를 쓴다.'}
  ]},
  field:{chapter:2,title:'장부에 없는 쉼터',text:'우회로 끝에서 불을 피운 자리를 찾았다. 짐꾼들이 쉬는 곳이지만 최근에는 누군가 며칠씩 머문 흔적이 있다.\n\n안내인은 용살자의 이름을 대며 통행료를 요구한 무리를 보았다고 한다. 그 이름이 실제 계보나 권한을 증명하지는 않는다.',choices:[
   {id:'trace',label:'물건과 발자국을 기록해 수색대와 교환한다.',next:'survey',evidence:2,summary:'물건의 위치와 발자국 방향을 그렸다. 공식 수색대가 확인할 좌표가 생겼다.'},
   {id:'guide',label:'안내인의 신원을 숨기고 현장에 입회한다.',next:'survey',support:2,summary:'안내인은 더 가까운 관측 지점을 알려 주었다. 실종자에게 닿는 길이 좁아졌다.'}
  ]},
  survey:{chapter:2,title:'살아 있는 사자',text:'빈 석조 쉼터 안에서 실종자를 찾는다. 그는 연락통이 없어진 뒤 돌아가면 자신이 배신자로 몰릴까 두려워 숨어 있었다고 한다.\n\n발목이 부었고 비가 다시 온다. 사자를 먼저 옮기면 연락통을 숨겼다는 옆 능선은 늦게 찾아야 한다.',choices:[
   {id:'person',label:'사자를 안전한 곳으로 옮기는 일을 먼저 한다.',next:'shelter',support:1,summary:'사자를 증거와 함께 묶어 두지 않고 구조를 먼저 시작했다.'},
   {id:'document',label:'보호 인원을 남기고 연락통의 위치를 확인한다.',next:'archive',evidence:1,summary:'사자는 입회인과 남고 당신은 연락통을 찾으러 움직였다.'}
  ]},
  shelter:{chapter:2,title:'증언이 숨 쉴 자리',text:'사자는 용살자의 시대를 이야기하는 이들이 자신의 연락통을 노렸다고 말한다. 본 얼굴과 추측한 소속을 섞어 말한다.\n\n역참의 치료실을 빌릴 수도 있고 연락관의 호위 아래 옮길 수도 있다. 어느 쪽에도 위험이 있다.',choices:[
   {id:'treat',label:'응급 처치를 하고 역참으로 옮긴다.',next:'hearing',check:{skill:'medicine',base:50},support:2,failRisk:1,summary:'부기가 가라앉아 사자가 스스로 걸었다. 그는 차분하게 본 것부터 진술했다.',failure:'처치만으로 걷게 하지는 못했다. 들것으로 옮기느라 시간이 지체되었다.'},
   {id:'escort',label:'증언 강요 금지를 적고 호위를 요청한다.',next:'hearing',support:1,evidence:1,summary:'호위와 입회인이 함께 움직였다. 진술은 심문 전에 사본으로 남았다.'}
  ]},
  archive:{chapter:2,title:'후대에 더해진 한 줄',text:'연락통 안에는 용살자 시대의 지명을 옮긴 필사본과 최근의 통행 목록이 있다. 오래된 지명 옆에 현재의 권한을 주장하는 문장이 끼어 있다.\n\n낡은 종이에 적혔다고 모든 글이 같은 시대의 것은 아니다.',choices:[
   {id:'copies',label:'다른 사본을 구해 문장이 추가된 위치를 비교한다.',next:'hearing',evidence:2,summary:'추가된 문장과 원래의 지명 기록을 분리했다.',fact:'용살자 시대 지명 필사본에 후대의 권한 주장 문장이 추가되어 있었다.'},
   {id:'date',label:'먹과 서식으로 작성 순서를 판별한다.',next:'hearing',check:{skill:'history',base:48},evidence:3,failRisk:1,summary:'최근의 서식이 옛 기록에 덧붙은 순서를 좁혔다.',failure:'먹의 번짐으로 순서를 확정하지 못했다. 원본은 손대지 않고 보존했다.'}
  ]},
  hearing:{chapter:3,title:'용왕의 질문',text:'연락소로 답이 도착한다. 용왕 측이 묻는 것은 어느 세력을 벌할지보다 누가 소집과 통행을 혼동시키고 있느냐다.\n\n실종자를 찾았다는 사실로 용왕의 모든 판단에 동의하게 되는 것은 아니다. 당신은 사자의 진술에서 직접 본 대목과 공포 속에서 추측한 대목을 나눈다.',choices:[
   {id:'testimony',label:'사자의 동의를 얻어 사실과 추측을 구분해 전달한다.',next:'crisis',evidence:1,support:1,summary:'연락관은 진술의 범위를 확인하고 왕에게 보낼 기록을 봉했다.'},
   {id:'roads',label:'신원 대신 통행 방해의 위치와 피해를 전달한다.',next:'crisis',support:1,summary:'고개에서 벌어진 일은 보고되었다. 사자의 신원은 공개 문서에서 빠졌다.'}
  ]},
  crisis:{chapter:3,title:'군대가 오기 전에',text:'용살자의 이름을 내건 무리가 고개를 막는다. 용왕의 연락망을 도우면 모두 적이라고 외친다. 상인들은 어느 쪽 이름에도 관심이 없다. 오늘 지나가지 못하면 짐이 상한다.\n\n연락관은 무장 호위를 부르려 하지만 그 전에 주민을 빼낼 시간이 필요하다.',choices:[
   {id:'negotiate',label:'기록의 모순을 제시하며 통행부터 열도록 교섭한다.',next:'pact',failureNext:'recover',check:{skill:'persuasion',base:38},support:1,failRisk:2,summary:'무리 안에서도 주장이 갈렸다. 일단 주민 통행을 허용한다는 약속을 받았다.',failure:'교섭은 결렬되었다. 싸움을 기다리지 않고 주민을 우회로로 옮겨야 한다.'},
   {id:'detour',label:'정면 충돌을 피하고 주민을 우회로로 안내한다.',next:'recover',risk:1,summary:'고개를 차지하는 싸움에서 빠져나왔다. 우회로를 넓히는 대가가 남았다.'}
  ]},
  recover:{chapter:3,title:'짐을 버릴 순서',text:'우회로는 수레가 나란히 지나갈 만큼 넓지 않다. 사람들은 누가 먼저 가느냐를 두고 다시 다툰다. 왕과 영웅의 이름이 닿지 않는 곳에서도 권력은 생긴다.\n\n사자가 먼저 짐을 내려놓는다. 이제 당신도 손을 보탤 차례다.',choices:[
   {id:'carry',label:'통행 순서를 정하고 무거운 짐을 나누어 옮긴다.',next:'pact',minutes:180,support:1,stamina:-8,summary:'주민들이 안전한 역참으로 넘어왔다. 잃은 짐의 목록도 함께 남겼다.'}
  ]},
  pact:{chapter:3,title:'따르되 어디까지 따를 것인가',text:'용왕의 연락소는 당신에게 다음 일의 범위를 묻는다. 왕의 이름에 기대면 열리는 문도 있지만, 그 이름으로 묻는 책임도 생긴다.\n\n용살자의 기록을 차지하려는 이들에게도 답을 보낼 수 있다. 당신이 누구의 후예라고 주장할 이유는 없다.',choices:[
   {id:'accord',label:'목격자 보호와 기록 검증을 조건으로 협약을 맺는다.',next:'end_accord',requires:{evidence:3,support:2},summary:'협력할 범위와 거절할 명령의 조건을 함께 적었다.'},
   {id:'shelter',label:'주민 피난로와 역참의 중립을 지킨다.',next:'end_shelter',summary:'소집의 편에 서기보다 고개를 건너는 사람들의 길을 맡았다.'},
   {id:'independent',label:'왕과 문파에서 독립해 용살자 기록을 추적한다.',next:'end_independent',summary:'당신의 다음 조사는 어느 세력의 계보 증명에도 종속되지 않는다.'}
  ]}
 },
 under:{
  gate:{chapter:2,title:'다음 수레가 오지 않는 이유',text:'하루치 배급을 정한 뒤 문제가 끝나지 않았다. 반입 수레 두 대가 통로 중간에서 멈췄다. 서로 다른 세력이 같은 구간의 통행권을 주장한다.\n\n중앙지하의 현 왕이 사라진 것은 아니다. 그러나 왕의 존재만으로 모든 작은 통로의 다툼이 해결되지는 않는다. 악귀의 이름을 빌려 힘을 모으는 자도 그 틈에 있다.',choices:[
   {id:'assembly',label:'운송인과 배급소의 공동 위임을 구한다.',next:'mandate',support:1,summary:'당신이 대표하는 범위를 한 통로의 운송 문제로 한정했다.'},
   {id:'inspect',label:'통행권 주장보다 막힌 현장을 먼저 살핀다.',next:'field',evidence:1,minutes:90,summary:'주민들이 이용하는 공개 통로를 따라 수레의 마지막 위치를 찾았다.'}
  ]},
  mandate:{chapter:2,title:'누구의 후계를 말하는가',text:'젊은 후보는 악귀의 후계를 주장하는 것과 지금의 왕위를 얻는 일은 다르다고 말한다. 혈연을 내세우는 사람도, 힘과 사람을 잇겠다는 사람도 같은 말을 쓴다.\n\n운송인들은 그 논쟁보다 오늘 지킬 약속을 요구한다. 당신은 후보와 함께 설 수도, 주민 명단으로 책임질 수도 있다.',choices:[
   {id:'shared',label:'후보와 책임을 나누되 운송인의 철회권을 남긴다.',next:'survey',support:2,summary:'대표가 약속을 어기면 위임을 거둘 수 있다는 조건을 적었다.'},
   {id:'civil',label:'주민과 운송인의 공동 위임만 받는다.',next:'survey',support:1,evidence:1,summary:'혈통을 확인하지 않고도 맡길 수 있는 일의 범위가 정해졌다.'}
  ]},
  field:{chapter:2,title:'막힌 길의 양쪽',text:'막힌 통로 양쪽에 서로 다른 통행표가 붙어 있다. 수레바퀴 자국은 어느 쪽의 표보다 오래되었다.\n\n옆길은 가까운 우회로일 뿐 서중앙 대공동으로 통하는 길이 아니다. 니그니엘에게 막힌 먼 길을 이 작은 지도 하나로 건널 수는 없다.',choices:[
   {id:'maps',label:'운송표와 바퀴 자국을 대조한다.',next:'survey',evidence:2,summary:'누가 먼저 표를 붙였는지보다 실제로 누가 물자를 옮겼는지를 확인했다.'},
   {id:'team',label:'양쪽 운송인에게 같은 시간에 현장 확인을 요청한다.',next:'survey',support:2,summary:'서로 다른 말을 하던 운송인들이 같은 수레 앞에서 만났다.'}
  ]},
  survey:{chapter:2,title:'움직이는 짐',text:'멈춘 수레의 칸막이 뒤에서 소리가 난다. 관리인은 일꾼이 다쳤다고 했지만 운송표에는 사람이 실렸다는 기록이 없다.\n\n몸이 뜻대로 움직이지 않는 운송인이 보인다. 누군가는 곧장 죽은 자를 부리는 술법이라고 부른다. 당신은 그 말을 확인된 사실로 적지 않는다. 사람을 돌보고 물품을 확인하는 일이 동시에 필요하다.',choices:[
   {id:'care',label:'운송인을 격리된 쉼터로 옮긴다.',next:'shelter',support:1,summary:'다른 주민과 접촉하지 않는 돌봄 장소를 정했다.'},
   {id:'cargo',label:'돌봄 인원을 남기고 운송표와 짐을 대조한다.',next:'archive',evidence:1,summary:'움직인 물품과 장부상 물품의 차이를 확인하러 갔다.'}
  ]},
  shelter:{chapter:2,title:'공포가 먼저 붙인 이름',text:'운송인은 물을 마시고 질문에 답한다. 아직 의식이 있다는 사실이 위험이 없다는 뜻도, 죽었다 살아났다는 뜻도 아니다.\n\n주민들은 문을 막자고 하고 동료는 치료를 구하자고 한다. 도움을 주면서도 접촉을 줄일 방법을 찾아야 한다.',choices:[
   {id:'observe',label:'증상을 기록하고 보호 조치를 갖춰 돌본다.',next:'hearing',check:{skill:'medicine',base:48},support:2,failRisk:1,summary:'안정을 찾은 운송인이 짐을 넘겨받은 장소를 말한다.',failure:'상태는 쉽게 가라앉지 않았다. 추가 돌봄 인력이 필요해 통로 재개가 늦어진다.'},
   {id:'help',label:'통로를 잠시 닫고 치료 인력을 불러온다.',next:'hearing',support:1,risk:1,summary:'도움을 구하는 동안 통행이 멈췄다. 배급 지연을 설명할 책임이 남는다.'}
  ]},
  archive:{chapter:2,title:'주인이 다른 상자',text:'상자에는 지워진 표식 위로 새 표식이 덧붙어 있다. 악귀의 계보를 잇는다는 전언이 동봉되어 있지만 이름을 증명할 인장이나 증인은 없다.\n\n위험한 물품의 이동과 후예의 존재를 한 번에 증명했다고 말할 수는 없다.',choices:[
   {id:'chain',label:'전달자별 서명을 대조해 물품의 경로를 남긴다.',next:'hearing',evidence:2,summary:'물품이 어느 손을 거쳤는지 일부 연결했다.',fact:'중앙지하 운송 물품의 표식이 전달 과정에서 덧씌워졌다.'},
   {id:'mark',label:'덧씌운 표식 아래의 글을 해독한다.',next:'hearing',check:{skill:'language',base:48},evidence:3,failRisk:1,summary:'지워진 출발지 표기를 읽었다. 전언의 혈통 주장과는 별개의 정보다.',failure:'훼손된 글은 읽지 못했다. 상자를 더 손상시키지 않고 사본만 남겼다.'}
  ]},
  hearing:{chapter:3,title:'인정받는 힘',text:'젊은 후보가 문제를 숨기면 자신의 약속도 지킬 수 없다고 말한다. 운송인들은 힘 있는 자가 통로를 지켜야 한다고 한다. 힘을 가졌다는 말은 아직 증명되지 않았다.\n\n당신은 물품의 경로를 밝힐 수도, 주민 돌봄부터 맡을 수도 있다. 어느 쪽이든 후계자의 혈통을 대신 인증할 필요는 없다.',choices:[
   {id:'evidence',label:'확인된 운송 기록을 공개하고 공동 대응을 요청한다.',next:'crisis',support:1,evidence:1,summary:'소문과 물품의 이동 기록을 다른 문서로 나누어 전달했다.'},
   {id:'care',label:'후계 논쟁을 미루고 돌봄과 배급을 먼저 묶는다.',next:'crisis',support:1,summary:'누가 왕이 될지 결정하지 않아도 함께 해야 하는 일을 정했다.'}
  ]},
  crisis:{chapter:3,title:'문을 여는 힘',text:'통행권을 주장하던 무리가 격리 구역의 문을 열려고 한다. 물품을 회수하겠다는 말과 증거를 없애려는 움직임을 구분하기 어렵다.\n\n정면에서 버티면 사람들을 지킬 시간이 생긴다. 오래 버티지 못하면 다른 통로를 포기하고 후퇴해야 한다.',choices:[
   {id:'hold',label:'운송인과 함께 방어선을 세워 시간을 번다.',next:'pact',failureNext:'recover',check:{skill:'guard',base:38},support:1,failRisk:2,summary:'문을 지키는 동안 사람들과 기록을 안전한 쪽으로 옮겼다.',failure:'방어선이 밀려났다. 옆 구역을 내주고 주민과 물품을 나누어 철수해야 한다.'},
   {id:'withdraw',label:'충돌을 피하고 주민을 안전한 통로로 옮긴다.',next:'recover',risk:1,summary:'당장의 길목은 내주었다. 사람을 옮긴 뒤 새 운송 순서를 마련해야 한다.'}
  ]},
  recover:{chapter:3,title:'다시 나누는 몫',text:'원래의 창고를 쓰지 못하게 되자 배급 명부를 다시 나눈다. 함께 움직인 후보도 당신도 오늘의 손해에서 빠져나갈 수 없다.\n\n주민들은 다음에도 지켜 주겠다는 큰 말보다 내일 어디로 가면 되는지를 묻는다.',choices:[
   {id:'rebuild',label:'대체 배급 지점을 만들고 손해를 기록한다.',next:'pact',minutes:180,support:1,stamina:-8,summary:'임시 배급 지점과 운송 시간이 정해졌다. 실패의 비용이 명부에 남았다.'}
  ]},
  pact:{chapter:3,title:'후계의 첫 경계',text:'오늘 당신이 보인 힘을 인정하는 사람도 있고, 포기한 길목을 기억하는 사람도 있다. 이제 함께 움직일 규칙을 정해야 한다.\n\n악귀의 후예라는 편지는 남아 있다. 그것을 왕좌를 넘기는 명령으로 읽을 근거는 없다. 현 왕과 당신의 관계도 이 자리에서 끝나지 않는다.',choices:[
   {id:'accord',label:'기록과 공동 위임을 근거로 통로 조정권을 맡는다.',next:'end_accord',requires:{evidence:3,support:2},summary:'인정의 범위와 책임을 한 통로로 명시했다.'},
   {id:'shelter',label:'주민과 운송인의 연합을 유지한다.',next:'end_shelter',summary:'후계 명분보다 함께 물품을 나를 규칙에 이름을 남겼다.'},
   {id:'independent',label:'동의한 사람들과 독자적인 세력의 기초를 세운다.',next:'end_independent',summary:'누군가의 계보를 빌리지 않고 자신이 책임질 사람들을 모았다.'}
  ]}
 }
};
