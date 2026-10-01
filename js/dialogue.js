/* Classic script: shared global bindings. Load order is defined in index.html. */

// Original index.html:310
function heardSpeech(text,language='common'){const p=lang(language);if(p>=5)return text;if(p<=0)return '…무슨 말인지 전혀 알아들을 수 없다.';const words=String(text).split(/\s+/);return words.map((w,i)=>{if(p===1)return i%5===0?w.slice(0,1)+'…':'…';if(p===2)return i%4===0?w:'…';if(p===3)return i%3===1?'…':w;if(p===4)return i%5===2?'…':w;return w}).join(' ')}

// Original index.html:338
function naturalNpcSpeech(id,raw){if(id==='laen'&&isSpecies('엘프')&&lang('elven')>=7)return LAEN_NATIVE[raw]||raw;return raw}

// Original index.html:339
function dlg(id,line,place=state.location,language=null){const n=NPC[id];let raw=nameLine(typeof line==='function'?line(state):line);raw=naturalNpcSpeech(id,raw);const speechLang=language||(id==='laen'&&isSpecies('엘프')?'elven':'common');const shown=heardSpeech(raw,speechLang);return `<div class="dialogue"><div class="speaker">${n.name}<small>${n.role} / ${place} / ${relLabel(effectiveRel(id))}</small></div><div class="line">“${shown}”</div></div>`}

// Original index.html:340
function reqText(r){if(!r)return '';const parts=[];if(r.stat)parts.push(`${STAT_NAMES[r.stat]} ${r.min}+`);if(r.skill)parts.push(`${SKILL_NAMES[r.skill]} Lv.${r.skillLv||1}+`);if(r.language)parts.push(`${LANG_NAMES[r.language]} ${r.langLv||1}+`);if(r.secondary)parts.push(`${SECONDARY_NAMES[r.secondary]} ${r.secMin||40}+`);if(r.item)parts.push(`${ITEM_NAMES[r.item]} 필요`);if(r.silver)parts.push(`은화 ${r.silver}+`);if(r.species)parts.push(`${r.species}`);return parts.join(' / ')}

// Original index.html:341
function meets(r){if(!r)return true;if(r.stat&&stat(r.stat)<r.min)return false;if(r.skill&&skill(r.skill)<(r.skillLv||1))return false;if(r.language&&lang(r.language)<(r.langLv||1))return false;if(r.secondary&&secondary(r.secondary)<(r.secMin||40))return false;if(r.item&&!hasItem(r.item))return false;if(r.silver&&state.silver<r.silver)return false;if(r.flag&&!hasFlag(r.flag))return false;if(r.notFlag&&hasFlag(r.notFlag))return false;if(r.species&&!isSpecies(r.species))return false;if(r.originKey&&state.originKey!==r.originKey)return false;return true}
