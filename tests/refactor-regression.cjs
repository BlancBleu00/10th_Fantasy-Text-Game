/* Run with Node.js; no third-party dependencies. Compares with the pre-refactor commit. */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const baseline = process.argv[2]
  ? fs.readFileSync(process.argv[2], 'utf8')
  : execFileSync('git', ['show', '1eec7ae5281382c322647f2428a37fe8f6aa7374:index.html'], { cwd: root, maxBuffer: 2 * 1024 * 1024, encoding: 'utf8' });
const current = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const scripts = [...current.matchAll(/<script src="\.\/([^"<>]+)"><\/script>/g)].map(m => m[1]);
const map = JSON.parse(fs.readFileSync(path.join(root, 'docs/refactor-map.json'), 'utf8'));
assert.deepEqual(scripts, map.loadOrder, 'HTML and documented load order differ');
assert.equal(/<script>([\s\S]*?)<\/script>/.test(current), false, 'Inline game script remains');
assert.equal(fs.readFileSync(path.join(root, 'css/game.css'), 'utf8'), baseline.match(/<style>([\s\S]*?)<\/style>/)[1].trimStart(), 'Styles changed');
for (const file of scripts) new vm.Script(fs.readFileSync(path.join(root, file), 'utf8'), { filename: file });

function createRuntime(split) {
  const elements = new Map(), storage = new Map(), events = [], messages = [];
  let randomSeed = 7;
  const math = Object.create(Math);
  math.random = () => { randomSeed = (Math.imul(randomSeed, 1664525) + 1013904223) >>> 0; return randomSeed / 4294967296; };
  class Clock extends Date { static now() { return 1790865425000; } }
  function element(id = '') {
    const classes = new Set();
    let html = '';
    return {
      id, value: '', textContent: '', className: '', style: {}, dataset: {}, children: [],
      get innerHTML() { return html; },
      set innerHTML(v) { html = String(v); this.children = []; },
      classList: { contains: c => classes.has(c), add: c => classes.add(c), remove: c => classes.delete(c), toggle: (c, on) => { if (on) classes.add(c); else classes.delete(c); } },
      appendChild(child) { this.children.push(child); },
      insertAdjacentHTML(where, v) { html = where === 'afterbegin' ? v + html : html + v; },
      querySelector(selector) { return selector === '.encBadge' && html.includes('class="encBadge ') ? {} : null; },
      focus() {}, scrollIntoView() {}
    };
  }
  const get = id => { if (!elements.has(id)) elements.set(id, element(id)); return elements.get(id); };
  const tabs = ['status', 'skills', 'resonance', 'relations', 'reputation', 'journal'].map(tab => { const e = element(); e.dataset.tab = tab; return e; });
  const sandbox = {
    Math: math, Date: Clock,
    console: { log() {}, warn() {}, error: (...a) => messages.push(a.join(' ')) },
    document: { getElementById: get, querySelectorAll: s => s === '.tabs button' ? tabs : [], createElement: () => element(), addEventListener: (name, handler) => events.push({ name, handler }), activeElement: null },
    window: { scrollTo() {} },
    localStorage: { setItem: (k, v) => storage.set(k, String(v)), getItem: k => storage.get(k) ?? null },
    alert: text => messages.push(text), confirm: () => true,
    setTimeout() { return 0; }
  };
  const context = vm.createContext(sandbox);
  const run = source => vm.runInContext(source, context, { timeout: 1500 });
  if (split) for (const file of scripts) run(fs.readFileSync(path.join(root, file), 'utf8'));
  else run(baseline.match(/<script>([\s\S]*?)<\/script>/)[1]);
  return { run, get, elements, storage, events, messages, setRandomSeed: n => { randomSeed = n; } };
}
const original = createRuntime(false), refactored = createRuntime(true);
// The original commit calls an undefined helper. Compare the intentional fix with
// the existing suspect() implementation, separately from the raw parity report.
original.run('function knowSuspicion(text){return suspect(text)}');
assert.equal(refactored.run('typeof knowSuspicion'), 'function');
const json = (runtime, expression) => runtime.run(`JSON.stringify(${expression}, (key, value) => typeof value === 'function' ? value.toString() : value)`);
const failures = [], existingErrors = []; let checks = 0, sceneChoiceChecks = 0;
function compare(label, expression = '({state,pendingCombat,creationDraft,creationRegion10,currentSheet})') {
  checks++;
  try {
    assert.equal(json(refactored, expression), json(original, expression), label + ': runtime snapshot differs');
    const view = r => [...r.elements].map(([id, e]) => [id, e.innerHTML, e.textContent, e.className, e.style, e.children.map(c => [c.innerHTML, c.disabled])]);
    assert.deepEqual(view(refactored), view(original), label + ': rendered output differs');
    assert.deepEqual([...refactored.storage], [...original.storage], label + ': saved JSON differs');
  } catch (e) { failures.push({ label, message: e.message.slice(0, 220) }); }
}
function both(label, source) {
  const outcomes = [original, refactored].map(r => { try { r.run(source); return null; } catch (e) { return `${e.name}: ${e.message}`; } });
  if (outcomes[0] !== outcomes[1]) failures.push({ label, message: `Execution differs: ${JSON.stringify(outcomes)}` });
  else if (outcomes[0]) existingErrors.push({ label, message: outcomes[0] });
  compare(label); return !outcomes[0] && !outcomes[1];
}
compare('startup', '({state,scenes,origins,NPC,REP_NAMES,NPC_SOCIAL,REP_LINKS,REP_LENSES,ENCOUNTER_POOL,ENCOUNTER_META_11,LAEN_NATIVE})');
assert.equal(original.run('Object.keys(scenes).length'), 284);
assert.equal(refactored.run('origins.length'), 25);
assert.equal(refactored.run('ENCOUNTER_POOL.length'), 32);
assert.equal(refactored.run('ENCOUNTER_POOL.filter(id=>!scenes[id]||!ENCOUNTER_META_11[id]).length'), 0);
assert.deepEqual(refactored.events.map(e => e.name), original.events.map(e => e.name));
const origins = JSON.parse(original.run('JSON.stringify(origins.map(o=>o.key))'));
for (const origin of origins) for (const gender of ['남성', '여성']) {
  both(`origin:${origin}:${gender}`, `state=createStateFromOrigin(${JSON.stringify(origin)},${JSON.stringify(gender)},{scene:'name_entry',creationComplete:true});render();`);
  for (const tab of ['status','skills','resonance','relations','reputation','journal']) both(`sheet:${origin}:${gender}:${tab}`, `openSheet(${JSON.stringify(tab)});closeSheet();`);
}
// Real creation functions and the deferred-review navigation path.
both('manual creation reset', 'restartConfirm();');
both('manual species', "selectSpecies('인간');");
both('manual region', "creationDraft.region='east_empire';state.scene='choose_gender';render();");
both('manual gender', "selectGender('여성');");
both('manual background', "selectBackground('human_east_scribe');");
for (const r of [original,refactored]) r.get('playerNameInput').value = '테스트 여행자';
both('confirm name choice', 'choose(scenes.name_entry.choices[0]);');
both('confirm name continue', 'continueReview();');
both('prologue continue', "choose((typeof scenes[state.scene].choices==='function'?scenes[state.scene].choices(state):scenes[state.scene].choices)[0]);continueReview();");
both('departure choice', "go('intro');choose(scenes.intro.choices(state)[0]);");
both('save pending review', 'saveGame();');
both('load pending review', 'loadGame();');
both('continue after load', 'continueReview();');
both('random life', 'randomLife();');
both('restart', 'restartConfirm();');

// Exercise every scene and all choices in two substantially different player states.
const ids = JSON.parse(original.run('JSON.stringify(Object.keys(scenes))'));
function prepare(id, strong) {
  return `state=createStateFromOrigin('human_farmer','남성',{scene:'life_setup',creationComplete:true});pendingCombat=null;state.name='검증자';state.random.returnTo='day1_hub';state.day=${strong?5:1};state.hour=${strong?22:9};state.random.day=state.day;${strong ? "state.silver=999;state.food=99;for(const k of Object.keys(ITEM_NAMES))state.items[k]=9;for(const k of Object.keys(state.stats))state.stats[k]=95;for(const k of Object.keys(state.skills))state.skills[k]={lv:10,xp:0};for(const k of Object.keys(state.languages))state.languages[k]=10;for(const k of Object.keys(state.resonance))state.resonance[k]=70;state.resonanceAwareness=3;" : ''}recalc(true);go(${JSON.stringify(id)});`;
}
for (const strong of [false,true]) for (const id of ids) {
  const source = prepare(id,strong);
  if (!both(`scene:${id}:${strong}`,source)) continue;
  const count = original.run("((typeof scenes[state.scene].choices==='function'?scenes[state.scene].choices(state):scenes[state.scene].choices)||[]).length");
  for (let i=0;i<count;i++) {
    const action = source + `const testChoices=(typeof scenes[state.scene].choices==='function'?scenes[state.scene].choices(state):scenes[state.scene].choices)||[];choose(testChoices[${i}]);if(state.pendingReview)continueReview();`;
    // Use a function scope for repeatable local test declarations.
    both(`choice:${id}:${strong}:${i}`,`(()=>{${action}})()`);sceneChoiceChecks++;
  }
}
// Explicit encounter weights/picks, scheduled consequences, combat, migrations, and missing storage.
both('encounter rules', "state=createStateFromOrigin('human_farmer','남성');state.seed=123456;ensureV11();state.day=5;state.city.panic=70;state.world.rumorHeat=60;state.mainThreads.under=40;state.chaosResonance=50;globalThis.testWeights=ENCOUNTER_POOL.map(id=>[id,encounterWeight11(id)]);globalThis.testPicks=Array.from({length:40},()=>weightedPick(ENCOUNTER_POOL));");
compare('encounter results','({testWeights,testPicks,state})');
both('encounter ignore', "ignoreEncounter11('enc_mithril_knock',8);ignoreEncounter11('enc_golem_tax',4);ignoreEncounter11('enc_refugee_cart',4);render();");
both('consequence due', "scheduleConsequence('enc_jiangshi_scarecrow_echo',1);advance(24);globalThis.testDue=dueConsequence();");
compare('consequence result','({state,testDue})');
both('combat start', "state=createStateFromOrigin('human_farmer','남성');go('day1_hub');startCombat({name:'검증 적',hp:50,atk:8,def:2,accuracy:45,winTo:'day1_hub',fleeTo:'day1_hub',speed:30});");
for(const action of ['guard','observe','recover','attack','heavy','resonance','flee']) both('combat:'+action,`combatAction(${JSON.stringify(action)});`);
both('legacy save', "state=createStateFromOrigin('human_farmer','남성');delete state.world;delete state.knowledge;delete state.birthRegion;delete state.chaosResonance;delete state.mainThreads;delete state.departure;delete state.encounterPressure;delete state.ignoredEncounters;delete state.resistances;delete state.personalHistory;state.scene='intro';localStorage.setItem('fantasyFullPilot',JSON.stringify(state));loadGame();");
both('suspicion alias dedup', "state=createStateFromOrigin('human_farmer','남성');knowSuspicion('검증용 의심');knowSuspicion('검증용 의심');");
assert.equal(refactored.run("state.knowledge.suspicions.filter(t=>t==='검증용 의심').length"), 1);
assert.equal(refactored.run("state.knowledge.facts.includes('검증용 의심')"), false);
both('missing save', "localStorage.setItem('fantasyFullPilot','');loadGame();");
both('invalid JSON (existing behavior)', "localStorage.setItem('fantasyFullPilot','{bad');loadGame();");
const report = { baseCommit: map.baseCommit, checks, sceneCount: ids.length, originCount: origins.length, sceneChoiceChecks, failures, existingErrors, method:'Node VM, deterministic clock/random, DOM stub. Does not verify real browser layout.' };
if (process.env.REFACTOR_REPORT) fs.writeFileSync(process.env.REFACTOR_REPORT, JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({ checks, sceneCount: ids.length, originCount: origins.length, sceneChoiceChecks, failures, existingErrorCount: existingErrors.length },null,2));
if(failures.length) process.exitCode=1;
