/* Implemented starting backgrounds, not an exhaustive list of permitted races. */
const CAMPAIGN_STARTS={
 west:{name:'서부 · 베스페리아',home:'숲 바깥 교역소',hint:'인간·엘프·그린 오크·고블린·드워프의 기존 서부 배경',job:'교역소 짐과 물품을 정리한다.'},
 east:{name:'동부 · 천관',home:'산길 역참',hint:'제국 서기·강시술 가문·문파 외문제자·회색강 출신 인간',job:'역참의 짐과 도착 명부를 정리한다.'},
 under:{name:'중앙지하 · 파탈라',home:'중앙지하 배급소',hint:'중앙지하에서 자란 악마의 배급소·운송대 배경',job:'배급 물품을 옮기고 수량을 맞춘다.'}
};
const CAMPAIGN_EAST_ORIGINS=['human_east_scribe','human_east_jiangshi','human_east_martial','human_grayriver'];
const CAMPAIGN_EAST_BACKGROUNDS={
 human_east_scribe:{desc:'동부의 제국과 열네 왕국 사이를 오가는 문서 형식을 배웠다. 손으로 베낀 문서와 새 활자가 한 책상 위에 놓이는 시대, 산길 역참의 장부를 정리하는 일을 맡았다.'},
 human_east_jiangshi:{desc:'악귀의 동진 이전부터 시신을 움직이는 술법을 연구한 가문의 방계다. 집안의 이름은 오래된 전쟁의 기억과 함께 따라다닌다. 오늘은 가문의 심부름으로 산길 역참에 들렀다.'},
 human_grayriver:{name:'회색강 전선 출신 이주민',desc:'회색강 주변에서 태어나 휴전 뒤에도 경계를 늦추지 않는 법을 배웠다. 지금은 천관 안쪽에서 일자리를 찾으며 산길 역참에 머문다.'}
};
const CAMPAIGN_UNDER_ORIGINS=[
 {key:'demon_quartermaster',species:'악마',name:'배급소 기록원의 자식',status:'배급소 실무자',culture:'파탈라 중앙지하 생활권',desc:'창고 문을 여는 명령과 실제로 나갈 물량을 구분하며 자랐다. 누구의 명령인지보다 누구 몫이 빠졌는지를 먼저 살핀다.',stats:{vit:50,str:43,int:61,wis:58,dex:48},skills:{trade:2,observation:2,history:1,persuasion:1},languages:{undercommon:10,common:1,eastcommon:2},silver:5,items:{bread:2,knife:1},res:{dark:5,earth:3},baseRel:{},opening:'campaign_prologue',campaignOnly:true},
 {key:'demon_courier',species:'악마',name:'지하 운송대의 길잡이 견습',status:'운송대 견습',culture:'파탈라 중앙지하 통로권',desc:'운송대와 중앙지하의 통로를 오가며 길을 배웠다. 통행 허가의 표식과 실제로 길을 지키는 사람을 함께 기억한다.',stats:{vit:59,str:54,int:43,wis:54,dex:60},skills:{survival:2,athletics:2,observation:2,language:1},languages:{undercommon:10,common:2,eastcommon:2},silver:4,items:{bread:2,knife:1},res:{dark:4,wind:4},baseRel:{},opening:'campaign_prologue',campaignOnly:true}
];
origins.push(...CAMPAIGN_UNDER_ORIGINS);
REGION_NAMES_10.under_central='중앙지하 생활권';
for(const o of CAMPAIGN_UNDER_ORIGINS)ORIGIN_REGION_10[o.key]='under_central';
REGION_ACCEPT_10['악마']={under_central:'토착'};
LANG_NAMES.undercommon='중앙지하 공용어';
REP_NAMES.peoples.demon='악마 사회';
