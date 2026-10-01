/* Classic script: shared global bindings. Load order is defined in index.html. */

// Original index.html:2570
const SPECIES_ORDER=['인간','엘프','그린 오크','고블린','드워프'];

// Original index.html:2571
const SPECIES_FLAVOR={
 '인간':'서부대륙의 도시와 농촌에서 가장 흔한 종족. 신분과 출신에 따른 차이가 크다.',
 '엘프':'오래된 노래와 약속을 기억하는 종족. 인간 사회에서 자란 엘프와 북방 공동체의 엘프는 서로도 낯설 수 있다.',
 '그린 오크':'서부 인간권에서도 노동자와 용병으로 살아간다. 힘으로 먼저 평가받는 일이 잦다.',
 '고블린':'대상로와 시장, 수선업에서 흔히 만난다. 여러 언어와 도시 규칙 사이를 빠르게 익히는 이들이 많다.',
 '드워프':'광산과 장인 길드의 기억이 강하다. 돌과 금속, 오래된 구조를 보는 눈이 다른 종족과 조금 다르다.'
};

// Original index.html:3335
const REGION_NAMES_10={
 west_border:'서부 변경권', west_city:'서부 인간 도시권', west_rural:'서부 농촌권', north_elf:'북방 엘프권',
 east_empire:'동부 제국권', east_kingdoms:'동부 14왕국권', gray_river:'회색강 전선권', caravan:'다종족 대상로',
 orc_settlement:'서부 오크 정착권', dwarf_guild:'서부 드워프 장인권'
};

// Original index.html:3340
const ORIGIN_REGION_10={
 human_farmer:'west_rural',human_noble:'west_city',human_merchant:'west_city',human_church:'west_city',human_soldier:'west_border',human_street:'west_city',human_healer:'west_city',human_hunter:'west_border',
 elf_adopted:'west_city',elf_north:'north_elf',elf_church:'west_city',elf_crafter:'west_city',
 orc_dock:'west_city',orc_merc:'west_border',orc_farmer:'orc_settlement',orc_caravan:'caravan',
 goblin_tinker:'west_city',goblin_caravan:'caravan',goblin_church:'west_city',dwarf_smith:'dwarf_guild',dwarf_road:'dwarf_guild',
 human_east_scribe:'east_empire',human_east_jiangshi:'east_kingdoms',human_east_martial:'east_kingdoms',human_grayriver:'gray_river'
};

// Original index.html:3347
const REGION_ACCEPT_10={
 '인간':{west_border:'토착',west_city:'토착',west_rural:'토착',north_elf:'희귀',east_empire:'토착',east_kingdoms:'토착',gray_river:'토착',caravan:'흔함',orc_settlement:'소수',dwarf_guild:'소수'},
 '엘프':{west_border:'소수',west_city:'소수',west_rural:'희귀',north_elf:'토착',east_empire:'희귀',east_kingdoms:'희귀',gray_river:'매우 희귀',caravan:'흔함',orc_settlement:'희귀',dwarf_guild:'소수'},
 '그린 오크':{west_border:'소수',west_city:'소수',west_rural:'소수',north_elf:'희귀',east_empire:'희귀',east_kingdoms:'희귀',gray_river:'소수',caravan:'흔함',orc_settlement:'토착',dwarf_guild:'소수'},
 '고블린':{west_border:'소수',west_city:'소수',west_rural:'희귀',north_elf:'소수',east_empire:'소수',east_kingdoms:'소수',gray_river:'희귀',caravan:'흔함',orc_settlement:'소수',dwarf_guild:'소수'},
 '드워프':{west_border:'소수',west_city:'소수',west_rural:'희귀',north_elf:'소수',east_empire:'소수',east_kingdoms:'소수',gray_river:'희귀',caravan:'흔함',orc_settlement:'소수',dwarf_guild:'토착'}
};
