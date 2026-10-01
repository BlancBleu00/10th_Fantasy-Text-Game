/* Classic script: shared global bindings. Load order is defined in index.html. */

// Original index.html:2590
function extendNpcValues(){
Object.assign(NPC.laen,{values:{promise:3,dignity:2,curiosity:1,order:-1},address:'이름을 일찍 부르는 편'});

Object.assign(NPC.mark,{values:{order:3,responsibility:3,honesty:1,deception:-2},address:'친해져도 퉁명스럽다'});

Object.assign(NPC.adel,{values:{mercy:2,order:2,faith:3,knowledge:1},address:'공적인 자리에서는 호칭을 지킨다'});

Object.assign(NPC.nadia,{values:{trade:3,reciprocity:3,practical:2,heroics:-1},address:'친분보다 거래 관계를 먼저 기억한다'});

Object.assign(NPC.mara,{values:{labor:3,reciprocity:2,practical:3,status:-1},address:'신분보다 손을 얼마나 보탰는지 본다'});

Object.assign(NPC.iren,{values:{knowledge:3,mercy:2,risk:2,faith:-1},address:'관심이 생기면 질문이 많아진다'});

Object.assign(NPC.orban,{values:{order:3,survival:3,responsibility:2,mercy:-1},address:'유용성과 책임을 먼저 본다'});

Object.assign(NPC.toma,{values:{knowledge:3,faith:2,curiosity:3},address:'긴장하면 이름을 자주 부른다'});
}

// Original index.html:2688
function extendCityEncounterPool(){
MORE_ENCOUNTERS.forEach(x=>{if(!ENCOUNTER_POOL.includes(x))ENCOUNTER_POOL.push(x)});
}

// Original index.html:2753
function extendItemNames(){
if(typeof ITEM_NAMES!=='undefined')ITEM_NAMES.charred_root='검게 탄 뿌리 부적';
}

// Original index.html:2926
function extendLifeOrigins(){
origins.push(
 {key:'human_healer',species:'인간',name:'약초상 견습',status:'도시 평민',culture:'변경도시 약초상 거리',desc:'약 냄새와 흥정 소리 속에서 자랐다. 병명을 몰라도 열이 오르는 얼굴과 상한 약초 냄새는 구분한다.',stats:{vit:45,str:38,int:63,wis:62,dex:52},secondary:{perception:5,socialSense:2},skills:{medicine:3,trade:2,observation:2,cooking:1},languages:{common:10,elven:1,orcish:1,goblin:2,dwarven:1,oldcommon:1},silver:6,items:{bread:1,bandage:2,herb:1},res:{life:6,water:2},baseRel:{nadia:5,iren:2},opening:'prelude_healer'},
 {key:'human_hunter',species:'인간',name:'북문 사냥꾼의 자식',status:'변경 평민',culture:'북문 사냥촌',desc:'짐승 발자국과 바람 방향을 글보다 먼저 배웠다. 도시 안에서는 말수가 적지만 북쪽 숲의 냄새는 남들보다 빨리 읽는다.',stats:{vit:57,str:52,int:43,wis:63,dex:61},secondary:{perception:10,socialSense:-3},skills:{survival:3,bow:2,observation:3,athletics:1},languages:{common:10,elven:2,orcish:2,goblin:0,dwarven:0,oldcommon:0},silver:4,items:{bread:2,knife:1},res:{wind:5,earth:3},baseRel:{mark:3,mara:3},opening:'prelude_hunter'},
 {key:'elf_church',species:'엘프',name:'빛의 성당에서 자란 엘프 필경생',status:'교단 부속 평민',culture:'서부 빛의 교단',desc:'어릴 적부터 인간 성당에서 살았다. 경전 문장은 유창하지만 엘프 노래는 조각조각만 기억한다. 교단 안에서는 익숙한 얼굴이고, 바깥에서는 여전히 엘프다.',stats:{vit:42,str:35,int:65,wis:68,dex:54},secondary:{perception:4,socialSense:6},skills:{theology:3,history:3,language:2,medicine:1},languages:{common:10,elven:4,orcish:0,goblin:1,dwarven:1,oldcommon:4},silver:4,items:{bread:1,bandage:1},res:{light:7,life:4},baseRel:{adel:14,toma:8,laen:0},opening:'prelude_elf_church'},
 {key:'elf_crafter',species:'엘프',name:'인간 도시 은세공방의 엘프 견습',status:'장인 견습',culture:'서부 장인 길드',desc:'엘프식 세공법을 기억하는 스승 밑에서 인간 귀족의 장신구를 만들었다. 손은 섬세하고 공용어도 익숙하지만 어느 쪽에서도 완전히 자기 사람 취급을 받지는 못한다.',stats:{vit:43,str:39,int:58,wis:59,dex:73},secondary:{perception:8,socialSense:4},skills:{trade:2,observation:3,lockpick:1,history:2,language:2},languages:{common:9,elven:7,orcish:0,goblin:2,dwarven:3,oldcommon:1},silver:8,items:{bread:1,knife:1},res:{wind:4,life:4},baseRel:{nadia:5,laen:5},opening:'prelude_elf_crafter'},
 {key:'orc_farmer',species:'그린 오크',name:'남쪽 개간촌의 그린 오크 농가',status:'소작농 가족',culture:'서부 변경 개간촌',desc:'전쟁 이야기는 어른들에게 들었지만 당신이 아는 삶은 밭과 품삯, 장마와 세금이다. 인간 농민과 함께 일하고 오크어로 집안싸움을 한다.',stats:{vit:72,str:71,int:36,wis:54,dex:42},secondary:{perception:5,socialSense:0},skills:{farming:3,athletics:2,survival:2,cooking:1},languages:{common:6,elven:0,orcish:9,goblin:2,dwarven:0,oldcommon:0},silver:3,items:{bread:2,knife:1},res:{earth:8,life:3},baseRel:{mara:12,mark:-4},opening:'prelude_orc_farm'},
 {key:'orc_caravan',species:'그린 오크',name:'대상단 호위 겸 통역',status:'외지 상단원',culture:'다종족 대상로',desc:'칼을 드는 일과 말이 안 통하는 상인을 떼어놓는 일을 함께 배웠다. 어느 도시에서도 완전히 현지인은 아니지만 길 위에서는 쓸모가 분명하다.',stats:{vit:65,str:66,int:48,wis:54,dex:51},secondary:{perception:5,socialSense:7},skills:{guard:2,athletics:2,language:3,trade:2,persuasion:1},languages:{common:7,elven:3,orcish:9,goblin:5,dwarven:3,oldcommon:0},silver:9,items:{bread:2,knife:1},res:{fire:4,wind:4},baseRel:{nadia:4,laen:3,mark:-2},opening:'prelude_orc_caravan'},
 {key:'goblin_church',species:'고블린',name:'교단 구휼소의 고블린 서기',status:'교단 부속 평민',culture:'북문 구휼소',desc:'배급 명부와 환자 이름을 적으며 자랐다. 교단 사람은 당신 글씨를 먼저 알고, 장터 사람은 종족을 먼저 본다.',stats:{vit:39,str:31,int:68,wis:64,dex:66},secondary:{perception:6,socialSense:8},skills:{theology:2,medicine:2,language:2,observation:2,persuasion:1},languages:{common:9,elven:1,orcish:2,goblin:9,dwarven:2,oldcommon:3},silver:3,items:{bread:1,bandage:2},res:{light:5,life:5},baseRel:{adel:9,toma:6,mark:-3},opening:'prelude_goblin_church'},
 {key:'dwarf_road',species:'드워프',name:'도로보수대 측량 견습',status:'공공노역 장인',culture:'서부 도로보수대',desc:'망치보다 측량줄을 더 오래 잡았다. 길이 왜 꺼지고 돌이 어디서 갈라지는지 보는 일이 직업이다. 오래된 기반석을 보면 드워프식 숫자가 먼저 눈에 들어온다.',stats:{vit:62,str:58,int:60,wis:57,dex:45},secondary:{perception:9,socialSense:-1},skills:{observation:3,history:2,athletics:2,trade:1},languages:{common:8,elven:1,orcish:1,goblin:2,dwarven:10,oldcommon:3},silver:6,items:{bread:1,knife:1},res:{earth:9,fire:2},baseRel:{mark:3,nadia:2},opening:'prelude_dwarf_road'}
);
}

// Original index.html:3103
function initializeNpcBaseRoles(){
for(const n of Object.values(NPC))if(!n.baseRole)n.baseRole=n.role;
}

// Original index.html:3182
function extendLaenDialogue(){
Object.assign(LAEN_NATIVE,{
 '이 도시 사람들은 물건을 찾으면 값부터 말한다고 들었다. 너는 다르네. 아니면 아직 값을 모르는 건가?':'이 도시 사람들은 물건을 찾으면 값부터 말한다고 들었어. 넌 다르네. 아니면 아직 값을 모르는 건가?',
 '내가 찾아온 길이다. 이 사람에게 책임 묻지 마라.':'내가 찾아온 길이야. 이 사람에게 책임을 묻지 마.',
 '살아서 나오면 그때 따져보자. 네가 읽은 인간 기록이 틀렸는지, 우리 노래가 틀렸는지.':'살아서 나오면 그때 따져보자. 네가 읽은 인간 기록이 틀렸는지, 우리 노래가 틀렸는지.'
});
}

// Original index.html:3360
function extendEasternData(){
LANG_NAMES.eastcommon='동부 제국 공용어';

origins.push(
 {key:'human_east_scribe',species:'인간',name:'동부 제국 지방서리 출신 여행자',status:'서리 출신 평민',culture:'동부 제국 행정문화',desc:'동부의 제국과 열네 왕국 사이를 오가는 문서 형식을 배웠다. 인쇄물이 막 널리 퍼지기 시작한 시대라 손으로 베낀 문서와 새 활자가 한 책상 위에 놓인다. 서부에는 사절단의 장부를 따라 왔다.',stats:{vit:43,str:35,int:70,wis:61,dex:49},secondary:{perception:5,socialSense:7},skills:{history:3,language:3,trade:1,observation:2,persuasion:1},languages:{common:5,eastcommon:10,elven:0,orcish:1,goblin:1,dwarven:0,oldcommon:3},silver:10,items:{bread:1,ledger:1},res:{light:3,wind:2},baseRel:{seln:4,nadia:2},opening:'prelude_east_scribe'},
 {key:'human_east_jiangshi',species:'인간',name:'강시술 귀족가의 방계',status:'몰락 귀족가 방계',culture:'동부 14왕국 귀족사회',desc:'당신의 집안은 악귀가 동쪽으로 올라오기 전부터 시신을 움직이는 술법을 연구했다. 통제에서 벗어난 강시가 지하 악귀의 수하를 먼저 공격했고, 그 사건은 훗날 동진의 불씨 가운데 하나로 기록되었다. 서부에서는 그 성을 숨기는 편이 편하다.',stats:{vit:47,str:39,int:68,wis:66,dex:50},secondary:{perception:7,socialSense:8},skills:{medicine:2,history:3,arcana:3,deception:1,theology:1},languages:{common:4,eastcommon:10,elven:0,orcish:1,goblin:0,dwarven:0,oldcommon:4},silver:13,items:{bread:1,bandage:1},res:{death:7,life:2,dark:2},baseRel:{iren:2,adel:-3},opening:'prelude_east_jiangshi',traits:['강시술 가문']},
 {key:'human_east_martial',species:'인간',name:'동부 문파의 외문제자',status:'문파 외문제자',culture:'동부 무림',desc:'용살자의 제자가 이끄는 무림맹의 이름 아래 수많은 문파가 느슨하게 묶여 있다. 당신은 그중 작은 문파의 외문에서 기본기를 익혔다. 맹주가 중앙령주이기도 하다는 사실은 동부에서 정치와 무림이 얼마나 가까운지를 보여준다.',stats:{vit:60,str:58,int:45,wis:57,dex:70},secondary:{perception:7,socialSense:1},skills:{unarmed:3,sword:2,athletics:3,guard:2,survival:1},languages:{common:4,eastcommon:10,elven:0,orcish:1,goblin:0,dwarven:0,oldcommon:1},silver:6,items:{bread:2,knife:1},res:{wind:6,lightning:3},baseRel:{mark:2,orban:2},opening:'prelude_east_martial'},
 {key:'human_grayriver',species:'인간',name:'회색강 전선 이주민',status:'전선 이주민',culture:'회색강 변경문화',desc:'동쪽 악귀와 지상의 사람들이 맞부딪힌 회색강 주변에서 태어났다. 휴전은 전쟁이 끝났다는 뜻이 아니라, 오늘 밤 성벽 밖에서 누가 움직이는지 서로 확인하는 방식이 바뀌었다는 뜻에 가까웠다. 가족 일부가 서부로 옮겨오며 당신도 길을 건넜다.',stats:{vit:62,str:55,int:44,wis:59,dex:59},secondary:{perception:10,socialSense:-1},skills:{survival:3,guard:2,spear:2,observation:3,medicine:1},languages:{common:5,eastcommon:9,elven:0,orcish:2,goblin:1,dwarven:0,oldcommon:0},silver:5,items:{bread:2,knife:1},res:{earth:4,fire:3,death:2},baseRel:{mark:1,orban:3},opening:'prelude_grayriver'}
);

REP_NAMES.realms.easternEmpire='동부 제국권';

REP_NAMES.realms.easternKingdoms='동부 14왕국권';

REP_NAMES.realms.martialAlliance='동부 무림맹권';

REP_NAMES.realms.grayRiver='회색강 전선권';

REP_NAMES.realms.centralDepths='중앙 지하권';
}

// Original index.html:3529
function extendEasternEncounterPool(){
const ENCOUNTER_POOL_10=ENCOUNTER_POOL;

if(Array.isArray(ENCOUNTER_POOL_10)){
 for(const id of ['enc_east_broadside','enc_jiangshi_talisman','enc_martial_caravan','enc_current_sailor','enc_resonant_stone'])if(!ENCOUNTER_POOL_10.includes(id))ENCOUNTER_POOL_10.push(id);
}
}

// Original index.html:3651
function extendMajorEncounterPool(){
for(const id of ['enc_jiangshi_scarecrow','enc_golem_tax','enc_resonance_debt','enc_mithril_knock'])if(!ENCOUNTER_POOL.includes(id))ENCOUNTER_POOL.push(id);
}
