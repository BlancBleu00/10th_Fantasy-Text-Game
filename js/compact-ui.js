/* Browser presentation only. Saves, scene IDs and the legacy creation flow remain intact. */
(function(){
 if(typeof document.querySelector!=='function')return;
 const wrap=document.querySelector('.wrap'),panel=document.querySelector('.wrap > .panel');
 const style=document.createElement('style');
 style.textContent=`
 .wrap{max-width:820px}.wrap>.sub{display:none}
 .compactMore{margin:0 0 20px}.compactMore>summary{cursor:pointer;width:max-content;margin-left:auto;padding:12px 16px;border:1px solid #514d3e;border-radius:9px;color:#ded7c4;list-style:none}
 .compactMore>summary::-webkit-details-marker{display:none}.compactMore>summary:focus-visible,button:focus-visible{outline:2px solid #ddc688;outline-offset:4px}
 .compactMore[open]>summary{margin-bottom:14px}.compactMore .topbar{position:static;display:flex;flex-wrap:wrap;gap:8px;padding:0;background:none}.compactMore .topbar button{flex:1 0 105px}
 .compactMore .recordStrip,.compactMore .v11hud{margin-top:12px}.compactMore .footer{margin-top:12px}.compactMore .footer>button:first-child{display:none}
 .compactMore .logPanel{margin-top:12px}.compactMore .v11card.secondary{display:block}
 .compactGame>.title{font-size:22px;margin-bottom:12px}.compactGame #sceneTitle{display:none}.compactGame #sceneMeta{font-size:13px;margin:0 0 22px}
 .compactGame .panel{padding:24px}.compactGame .sceneText{font-size:17px;line-height:1.9}.compactGame .encBadge{display:none}
 #titleScreen{min-height:75vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:44px}#titleScreen h1{font-size:clamp(30px,7vw,48px);font-weight:600;letter-spacing:.06em;margin:0}#titleScreen button{min-width:200px;padding:17px 30px}
 .compactLanding>.title,.compactLanding>.sub,.compactLanding>.compactMore,.compactLanding>.panel{display:none!important}
 #titleScreen[hidden]{display:none}.compactGame .choices button{min-height:54px}.compactGame .sceneText:empty{display:none}
 @media(max-width:600px){.wrap{padding:20px 16px}.compactGame .panel{padding:20px}.compactMore .topbar{display:grid;grid-template-columns:1fr 1fr}.compactGame .sceneText{font-size:16px}}
 `;
 document.head.appendChild(style);
 const more=document.createElement('details');more.id='gameMore';more.className='compactMore';
 const summary=document.createElement('summary');summary.textContent='더보기';more.appendChild(summary);
 wrap.insertBefore(more,panel);
 for(const selector of ['.topbar','#recordStrip','#v11hud','.footer','.logPanel'])more.appendChild(document.querySelector(selector));
 const legacy=document.createElement('button');legacy.textContent='기존 시작 방식';
 legacy.onclick=()=>{if(state.creationComplete&&!confirm('현재 진행을 버리고 새로 시작하시겠습니까?'))return;state=freshState();pendingCombat=null;legacyStart=true;more.open=false;render();};
 more.querySelector('.topbar').appendChild(legacy);
 const landing=document.createElement('section');landing.id='titleScreen';
 const heading=document.createElement('h1');heading.textContent='인간력 30년';
 const start=document.createElement('button');start.id='startGame';start.textContent='시작';
 start.onclick=()=>{legacyStart=false;go('campaign_start');document.querySelector('#choices button')?.focus();};
 landing.appendChild(heading);landing.appendChild(start);wrap.appendChild(landing);
 let legacyStart=false;
 const baseRestart=restartConfirm;
 restartConfirm=function(){const before=state;baseRestart();if(state!==before){legacyStart=false;render();}};
 const baseRender=render;
 render=function(){
  baseRender();
  const first=state.scene==='life_setup'&&!legacyStart;
  wrap.classList.toggle('compactLanding',first);wrap.classList.toggle('compactGame',!first);landing.hidden=!first;
  if(first){more.open=false;closeSheet();}
  const creation=['life_setup','campaign_start','campaign_species','campaign_gender','campaign_background','name_entry','choose_species','choose_region','choose_gender','choose_background','origin_roll'].includes(state.scene);
  const labels={campaign_start:['시작 지역','시작할 지역을 고르세요.'],campaign_species:['종족','종족을 고르세요.'],campaign_gender:['성별','성별을 고르세요.'],campaign_background:['출신','출신을 고르세요.']};
  document.getElementById('sceneMeta').textContent=creation?(labels[state.scene]?.[0]||'캐릭터 만들기'):state.location;
  if(labels[state.scene])document.getElementById('sceneText').textContent=labels[state.scene][1];
  const strip=document.getElementById('recordStrip');strip.innerHTML=strip.innerHTML.replace(/ \/ 삶의 숙련 \d+/g,'');
  const hud=document.getElementById('v11hud');hud.innerHTML=hud.innerHTML.replace('지금 이 삶이 붙잡고 있는 것','진행 중인 사건').replace('아직 중심 사건 없음','진행 중인 사건 없음');
  legacy.hidden=!creation;
 };
 document.addEventListener('keydown',event=>{if(event.key==='Escape'){closeSheet();more.open=false;summary.focus();}});
})();
