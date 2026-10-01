/* Classic script: shared global bindings. Load order is defined in index.html. */

// Original index.html:151
const REP_NAMES={
 places:{borderCity:'변경도시',southFarms:'남쪽 농촌',northQuarter:'북문 일대'},
 peoples:{human:'인간 사회',elf:'엘프 사회',greenOrc:'그린 오크 사회',goblin:'고블린 사회',dwarf:'드워프 사회'},
 factions:{guard:'도시 경비대',church:'빛의 교단',merchants:'상인과 상단',farmers:'농민과 소작인',poor:'빈민과 뒷골목',healers:'의사와 치료사',scholars:'서기와 학자',craftsmen:'장인과 길드'},
 realms:{westernHumans:'서부 인간권',northernElves:'북방 엘프권',orcCommunities:'오크 공동체권',caravanNetwork:'다종족 대상로'}
};

// Original index.html:157
const NPC_SOCIAL={
 laen:{species:'elf',weights:[['peoples','elf',.23],['factions','merchants',.08],['realms','northernElves',.12]]},
 mark:{species:'human',weights:[['factions','guard',.22],['places','borderCity',.08],['peoples','human',.04]]},
 adel:{species:'human',weights:[['factions','church',.24],['places','borderCity',.05],['peoples','human',.03]]},
 nadia:{species:'human',weights:[['factions','merchants',.22],['places','borderCity',.07],['realms','caravanNetwork',.04]]},
 bram:{species:'human',weights:[['places','northQuarter',.14],['places','borderCity',.08],['factions','merchants',.05]]},
 mara:{species:'human',weights:[['factions','farmers',.24],['places','southFarms',.16],['peoples','human',.03]]},
 iren:{species:'human',weights:[['factions','healers',.20],['factions','scholars',.08],['places','borderCity',.03]]},
 orban:{species:'human',weights:[['factions','guard',.30],['places','borderCity',.08],['realms','westernHumans',.05]]},
 toma:{species:'human',weights:[['factions','church',.18],['factions','scholars',.06],['places','northQuarter',.05]]},
 seln:{species:'human',weights:[['factions','scholars',.25],['places','borderCity',.05]]},
 elia:{species:'human',weights:[['factions','poor',.15],['places','borderCity',.08]]},
 varik:{species:'human',weights:[['places','borderCity',.02]]}
};

// Original index.html:171
const REP_LINKS={
 'factions.guard':[['places','borderCity',.18],['realms','westernHumans',.08]],
 'factions.church':[['realms','westernHumans',.10],['places','borderCity',.08]],
 'factions.merchants':[['places','borderCity',.10],['realms','caravanNetwork',.13]],
 'factions.farmers':[['places','southFarms',.25],['places','borderCity',.04]],
 'factions.poor':[['places','borderCity',.06]],
 'factions.healers':[['places','borderCity',.07],['factions','scholars',.05]],
 'factions.scholars':[['places','borderCity',.04]],
 'factions.craftsmen':[['places','borderCity',.07]],
 'peoples.human':[['realms','westernHumans',.18]],
 'peoples.elf':[['realms','northernElves',.22],['realms','caravanNetwork',.05]],
 'peoples.greenOrc':[['realms','orcCommunities',.22]],
 'peoples.goblin':[['realms','caravanNetwork',.10]],
 'peoples.dwarf':[['factions','craftsmen',.12],['realms','caravanNetwork',.04]]
};

// Original index.html:188
const REP_LENSES={
 'places.borderCity':[['factions','merchants',.08],['factions','guard',.08],['factions','poor',.05]],
 'factions.guard':[['places','borderCity',.12],['realms','westernHumans',.06],['factions','poor',-.04]],
 'factions.church':[['realms','westernHumans',.10],['places','borderCity',.04]],
 'factions.merchants':[['realms','caravanNetwork',.15],['peoples','goblin',.05],['peoples','dwarf',.04]],
 'factions.farmers':[['places','southFarms',.18],['places','borderCity',.04]],
 'factions.poor':[['places','borderCity',.08],['factions','guard',-.06]],
 'factions.healers':[['factions','scholars',.10],['places','borderCity',.05]],
 'factions.scholars':[['factions','healers',.06],['realms','westernHumans',.03]],
 'factions.craftsmen':[['peoples','dwarf',.12],['peoples','goblin',.05],['realms','caravanNetwork',.05]],
 'peoples.human':[['realms','westernHumans',.14],['peoples','elf',.05]],
 'peoples.elf':[['realms','northernElves',.15],['peoples','human',.04]],
 'peoples.greenOrc':[['realms','orcCommunities',.15],['realms','caravanNetwork',.04]],
 'peoples.goblin':[['realms','caravanNetwork',.12],['factions','merchants',.06]],
 'peoples.dwarf':[['factions','craftsmen',.14],['realms','caravanNetwork',.06]],
 'realms.westernHumans':[['peoples','human',.12],['factions','church',.07],['factions','guard',.07],['peoples','elf',.03]],
 'realms.northernElves':[['peoples','elf',.16],['peoples','human',.03]],
 'realms.orcCommunities':[['peoples','greenOrc',.17]],
 'realms.caravanNetwork':[['factions','merchants',.12],['peoples','goblin',.08],['peoples','dwarf',.05],['peoples','greenOrc',.03]]
};
