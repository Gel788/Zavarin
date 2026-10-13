/* ZAVARIN features: search, favorites, compare, gift finder, 404. No pointer-reactive effects. */
(()=>{const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)],H=document.documentElement;
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const fmt=n=>'<span class="nm">'+Math.round(n).toLocaleString('ru-RU').replace(/[\u00a0\u202f ,]/g,'\u202f')+'<span class="rb">\u00a0₽</span></span>';
const get=k=>{try{return JSON.parse(localStorage.getItem(k)||'[]')}catch(e){return[]}},put=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
const toast=(a,b)=>{if(window.Z&&Z.toast)return Z.toast(a,b||'');let t=$('#fx-t');if(!t){document.body.insertAdjacentHTML('beforeend','<div id="fx-t" class="fx-t" role="status" aria-live="polite"></div>');t=$('#fx-t')}t.textContent=a;t.classList.add('on');clearTimeout(t._);t._=setTimeout(()=>t.classList.remove('on'),2200)};
const I={h:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-9.3-9.2C1.4 8 3.4 4.5 7 4.5c2.1 0 3.6 1.2 5 3 1.4-1.8 2.9-3 5-3 3.6 0 5.6 3.5 4.3 6.8-1.8 4.6-9.3 9.2-9.3 9.2z"/></svg>',c:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4v16M17 4v16M3 8h8M13 16h8"/></svg>'};
/* counters */
const counts=()=>{const f=get('zfav').length,c=get('zcmp').length;$$('[data-fav-count]').forEach(e=>e.textContent=f||'');$$('[data-cmp-count]').forEach(e=>e.textContent=c||'');
 $$('[data-cmp]').forEach(b=>{const on=get('zcmp').includes(b.dataset.cmp);b.classList.toggle('on',on);b.setAttribute('aria-pressed',on)});
 $$('[data-ffav]').forEach(b=>{const on=get('zfav').includes(b.dataset.ffav);b.classList.toggle('on',on);b.setAttribute('aria-pressed',on)})};
addEventListener('storage',counts);
const togCmp=id=>{let L=get('zcmp');if(L.includes(id)){L=L.filter(x=>x!==id);toast('Убрано из сравнения')}else{if(L.length>=4){toast('В сравнении уже 4 изделия','Уберите одно, чтобы добавить новое');return}L.push(id);toast('Добавлено к сравнению',L.length+' из 4')}put('zcmp',L);counts();if(page==='compare')renderCompare()};
const togFav=id=>{if(window.Z&&Z.favs){Z.toggleFav(id)}else{let L=get('zfav');L=L.includes(id)?L.filter(x=>x!==id):L.concat(id);put('zfav',L);toast(L.includes(id)?'Добавлено в избранное':'Удалено из избранного')}counts();if(page==='favorites')renderFav()};
document.addEventListener('click',e=>{const c=e.target.closest('[data-cmp]');if(c){e.preventDefault();e.stopPropagation();togCmp(c.dataset.cmp);return}
 const f=e.target.closest('[data-ffav]');if(f){e.preventDefault();togFav(f.dataset.ffav);return}
 const s=e.target.closest('[data-search-open]');if(s){e.preventDefault();openS(s)}});
/* data */
let P=null,PP=null;const load=()=>PP||(PP=fetch('products.json').then(r=>r.json()).then(d=>{P=d.products;index();return P}));
const N=s=>String(s||'').toLowerCase().replace(/ё/g,'е').replace(/[^a-zа-я0-9]+/g,' ').trim();
const COL={'krest-na-shnure-01-21-00155-02-8':'ковчег'};
const thumb=p=>p.cut?'img/cine/m/'+p.cut.split('/').pop().replace('.png','.webp'):p.images[0];
function index(){P.forEach(p=>{const parts=[[p.name,3],[p.catName,2],[p.material+' '+p.metal,1],[(p.specs||[]).map(x=>x[1]).join(' '),1],[(COL[p.id]||'')+' '+p.art,2]];
 p._w=parts.map(([t,w])=>[N(t).split(' ').filter(Boolean),w])})}
const lev=(a,b)=>{const m=a.length,n=b.length;if(!m)return n;if(!n)return m;const d=[];for(let i=0;i<=m;i++){d[i]=[i];for(let j=1;j<=n;j++)d[i][j]=i?0:j}for(let i=1;i<=m;i++)for(let j=1;j<=n;j++){const c=a[i-1]===b[j-1]?0:1;let v=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+c);if(i>1&&j>1&&a[i-1]===b[j-2]&&a[i-2]===b[j-1])v=Math.min(v,d[i-2][j-2]+1);d[i][j]=v}return d[m][n]};
const tm=(q,w)=>{if(w.startsWith(q))return 1;if(q.length<3)return 0;const k=q.length>=7?2:q.length>=4?1:0;if(!k)return 0;return lev(q,w.slice(0,q.length))<=k||(q.length>w.length&&lev(q.slice(0,w.length+1),w)<=k)?.7:0};
function search(q){const T=N(q).split(' ').filter(Boolean);if(!T.length||!P)return[];const R=[];
 for(const p of P){let sc=0,ok=true;for(const t of T){let best=0;for(const [ws,w] of p._w)for(const x of ws){const m=tm(t,x);if(m*w>best)best=m*w}if(!best){ok=false;break}sc+=best}if(ok)R.push([sc,p])}
 return R.sort((a,b)=>b[0]-a[0]||a[1].price-b[1].price).map(x=>x[1])}
const POP=['Крест','Кольцо','Агат','Икона','Серебро','Эбен','Ковчег','Чётки'];
/* search overlay */
let so,last;
function build(){document.body.insertAdjacentHTML('beforeend',`<div class="so" id="so" role="dialog" aria-modal="true" aria-label="Поиск по каталогу" hidden><div class="so-in wrap"><div class="so-top"><label class="vh" for="soq">Поиск по каталогу</label><input id="soq" type="search" placeholder="Крест, кольцо с агатом, серебро…" autocomplete="off" spellcheck="false" role="combobox" aria-expanded="false" aria-controls="sor" aria-autocomplete="list" enterkeyhint="search"><button type="button" class="so-x" aria-label="Закрыть поиск">×</button></div><div class="so-pop"><span>Популярное</span>${POP.map(x=>`<button type="button" data-q="${x}">${x}</button>`).join('')}</div><p class="so-n" id="son" aria-live="polite"></p><ul class="so-r" id="sor" role="listbox" aria-label="Результаты"></ul><a class="lk so-all" id="soall" href="search.html" hidden>Все результаты →</a></div></div>`);
 so=$('#so');const q=$('#soq');let act=-1;
 const draw=()=>{const v=q.value.trim(),L=v?search(v):[];act=-1;q.removeAttribute('aria-activedescendant');q.setAttribute('aria-expanded',!!L.length);
  $('#sor').innerHTML=L.slice(0,8).map((p,i)=>`<li role="option" id="so-${i}" aria-selected="false"><a href="product.html?id=${esc(p.id)}" tabindex="-1"><span class="so-im"><img src="${esc(thumb(p))}" alt="" loading="lazy" width="80" height="80"></span><span class="so-t"><small>${esc(p.catName)} · ${esc(p.material||p.metal||'')}</small><b>${esc(p.name)}</b></span><span class="so-p">${fmt(p.price)}</span></a></li>`).join('');
  $('#son').textContent=v?(L.length?`Найдено: ${L.length}`:'Ничего не найдено — попробуйте другое слово'):'';const a=$('#soall');a.hidden=L.length<=8;a.href='search.html?q='+encodeURIComponent(v)};
 let tq;q.addEventListener('input',()=>{clearTimeout(tq);tq=setTimeout(()=>load().then(draw),60)});
 q.addEventListener('keydown',e=>{const o=$$('#sor [role=option]');if(e.key==='ArrowDown'||e.key==='ArrowUp'){if(!o.length)return;e.preventDefault();act=(act+(e.key==='ArrowDown'?1:-1)+o.length)%o.length;o.forEach((x,i)=>x.setAttribute('aria-selected',i===act));q.setAttribute('aria-activedescendant','so-'+act);o[act].scrollIntoView({block:'nearest'})}
  else if(e.key==='Enter'){e.preventDefault();if(act>=0&&o[act])location.href=o[act].querySelector('a').href;else if(q.value.trim())location.href='search.html?q='+encodeURIComponent(q.value.trim())}});
 so.addEventListener('click',e=>{const b=e.target.closest('[data-q]');if(b){q.value=b.dataset.q;load().then(draw);q.focus()}if(e.target.closest('.so-x')||e.target===so)closeS()});
 so.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();closeS()}if(e.key==='Tab'){const f=$$('input,button,a[href]:not([tabindex="-1"])',so).filter(x=>!x.hidden&&x.offsetParent);if(!f.length)return;const a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}})}
function openS(btn){if(!so)build();last=btn||document.activeElement;so.hidden=false;H.classList.add('so-open');requestAnimationFrame(()=>so.classList.add('on'));window.__lenis&&__lenis.stop();setTimeout(()=>$('#soq').focus(),30);load()}
function closeS(){so.classList.remove('on');H.classList.remove('so-open');window.__lenis&&__lenis.start();setTimeout(()=>{so.hidden=true},matchMedia('(prefers-reduced-motion: reduce)').matches?0:300);last&&last.focus&&last.focus()}
addEventListener('keydown',e=>{if(e.key==='/'&&!/input|textarea|select/i.test(document.activeElement.tagName)&&!(so&&!so.hidden)){e.preventDefault();openS()}});
/* tile markup */
const tile=(p,x='')=>`<article class="ft-c"><a class="ft-im vit" href="product.html?id=${esc(p.id)}" aria-label="${esc(p.name)}"><img src="${esc(thumb(p))}" alt="${esc(p.name)}" loading="lazy" decoding="async"></a><div class="ft-b"><button type="button" class="ftb" data-ffav="${esc(p.id)}" aria-label="В избранное: ${esc(p.name)}">${I.h}</button><button type="button" class="ftb" data-cmp="${esc(p.id)}" aria-label="К сравнению: ${esc(p.name)}">${I.c}</button></div><p class="ft-m">${esc(p.catName)}${p.material?' · '+esc(p.material):''}</p><h3><a href="product.html?id=${esc(p.id)}">${esc(p.name)}</a></h3><p class="ft-p">${fmt(p.price)}${p.old?`<s>${fmt(p.old)}</s>`:''}</p>${x}</article>`;
/* catalog tiles + product: compare buttons */
const addTileBtns=()=>{$$('#grid article.card').forEach(a=>{if(a.querySelector('.cmpb'))return;const id=a.dataset.flipId,pw=a.querySelector('.pw');if(!id||!pw)return;pw.insertAdjacentHTML('beforeend',`<button type="button" class="cmpb" data-cmp="${esc(id)}" aria-label="К сравнению">${I.c}</button>`)});counts()};
const g=$('#grid');if(g){let t;new MutationObserver(()=>{clearTimeout(t);t=setTimeout(addTileBtns,80)}).observe(g,{childList:true});addTileBtns()}
const info=$('#info');if(info){const id=new URLSearchParams(location.search).get('id');const add=()=>{const ic=$('.ic2',info);if(!ic||$('.cmpb',ic))return;load().then(L=>{const p=L.find(x=>x.id===id)||L[0];if(!p||$('.cmpb',ic))return;ic.insertAdjacentHTML('beforeend',`<button type="button" class="cmpb pc" data-cmp="${esc(p.id)}" aria-label="К сравнению">${I.c}</button>`);counts()})};new MutationObserver(add).observe(info,{childList:true});add()}
/* pages */
const M=$('main[data-fx]'),page=M&&M.dataset.fx,fx=$('#fx');
function renderSearch(){const u=new URLSearchParams(location.search),q=u.get('q')||'';fx.innerHTML=`<form class="sp-f" action="search.html" role="search"><label class="vh" for="spq">Поиск</label><input id="spq" name="q" type="search" value="${esc(q)}" placeholder="Крест, кольцо с агатом, серебро…" autocomplete="off"><button class="btn" type="submit">Найти</button></form><div class="so-pop sp-pop"><span>Популярное</span>${POP.map(x=>`<a href="search.html?q=${encodeURIComponent(x)}">${x}</a>`).join('')}</div><p class="sp-n" id="spn" aria-live="polite"></p><div class="ft-g" id="spg"></div>`;
 load().then(()=>{const L=q?search(q):[];$('#spn').innerHTML=q?(L.length?`По запросу «${esc(q)}» найдено: <b>${L.length}</b>`:`По запросу «${esc(q)}» ничего не найдено. Попробуйте другое слово или посмотрите <a href="catalog.html">весь каталог</a>.`):'Введите запрос';$('#spg').innerHTML=L.map(p=>tile(p)).join('');counts();document.title=(q?`«${q}» — `:'')+'Поиск — ЗАВАРИН'})}
function renderFav(){load().then(L=>{const F=get('zfav'),A=L.filter(p=>F.includes(p.id));fx.innerHTML=A.length?`<p class="sp-n"><b>${A.length}</b> в избранном · <a href="compare.html">сравнить</a></p><div class="ft-g">${A.map(p=>tile(p)).join('')}</div>`:`<div class="fx-e"><h2>Пока пусто</h2><p>Отмечайте изделия сердцем в каталоге — они появятся здесь.</p><a class="btn" href="catalog.html">Перейти в каталог</a></div>`;counts()})}
let cxDiff=false,cxI=0;
function renderCompare(){load().then(L=>{const C=get('zcmp'),A=C.map(id=>L.find(p=>p.id===id)).filter(Boolean);
 if(!A.length){fx.innerHTML=`<div class="fx-e"><h2>Нечего сравнивать</h2><p>Добавьте до четырёх изделий значком сравнения в каталоге или на странице изделия.</p><a class="btn" href="catalog.html">Перейти в каталог</a></div>`;counts();return}
 const keys=[];A.forEach(p=>(p.specs||[]).forEach(([k])=>{if(!keys.includes(k))keys.push(k)}));
 const sp=(p,k)=>{const s=(p.specs||[]).find(x=>x[0]===k);return s?s[1]:''};
 const R=[['Цена',p=>fmt(p.price)+(p.old?`<s>${fmt(p.old)}</s>`:''),p=>String(p.price)],['Категория',p=>esc(p.catName),p=>p.catName],['Артикул',p=>esc(p.art),p=>p.art],['Материал',p=>esc(p.material||'—'),p=>p.material||'']]
  .concat(keys.map(k=>[esc(k),p=>sp(p,k)?esc(sp(p,k)):'<span class="cx-d">—</span>',p=>sp(p,k)]))
  .concat([['Размеры',p=>{const o=(p.options||[])[0];return o?esc(o.v.join(', ')):'<span class="cx-d">—</span>'},p=>{const o=(p.options||[])[0];return o?o.v.join(','):''}]]);
 const same=(r,S)=>S.length>1&&S.every(p=>r[2](p)===r[2](S[0]));
 const rows=R.filter(r=>!cxDiff||!same(r,A));
 const row=r=>`<tr><th scope="row">${r[0]}</th>${A.map(p=>`<td>${r[1](p)}</td>`).join('')}${'<td class="cx-e"></td>'.repeat(4-A.length)}</tr>`;
 if(cxI>A.length-2)cxI=Math.max(0,A.length-2);
 fx.innerHTML=`<div class="cx-bar"><p class="sp-n"><b>${A.length}</b> из 4 · <button type="button" class="lk" id="cxclr">Очистить</button></p><label class="cx-tg"><input type="checkbox" id="cxdf"${cxDiff?' checked':''}><span>Только различия</span></label></div>
 <div class="cx-w" tabindex="0" role="region" aria-label="Таблица сравнения"><table class="cx"><thead><tr><td></td>${A.map(p=>`<th scope="col"><a class="cx-im vit" href="product.html?id=${esc(p.id)}"><img src="${esc(thumb(p))}" alt="" loading="lazy"></a><a class="cx-n" href="product.html?id=${esc(p.id)}">${esc(p.name)}</a><button type="button" class="cx-x" data-cmp="${esc(p.id)}" aria-label="Убрать из сравнения: ${esc(p.name)}">Убрать</button></th>`).join('')}${A.length<4?`<td class="cx-e" colspan="${4-A.length}"><a class="lk" href="catalog.html">Добавить изделие →</a></td>`:''}</tr></thead><tbody>${rows.map(row).join('')}</tbody></table></div>
 <div class="cxm"><div class="cxm-st"><div class="cxm-s" id="cxms">${A.map((p,i)=>`<div class="cxm-c" data-i="${i}"><a class="cxm-im vit" href="product.html?id=${esc(p.id)}"><img src="${esc(thumb(p))}" alt="" loading="lazy"></a><a class="cxm-n" href="product.html?id=${esc(p.id)}">${esc(p.name)}</a><p class="cxm-p">${fmt(p.price)}</p><button type="button" class="cx-x" data-cmp="${esc(p.id)}" aria-label="Убрать из сравнения: ${esc(p.name)}">Убрать</button></div>`).join('')}${A.length<2?'<div class="cxm-c cxm-add"><a class="lk" href="catalog.html">Добавить изделие →</a></div>':''}</div>${A.length>2?`<p class="cxm-dots" aria-hidden="true">${A.map((_,i)=>`<i data-d="${i}"></i>`).join('')}</p>`:''}</div><dl class="cxm-r" id="cxmr"></dl></div>`;
 const mr=()=>{const S=A.slice(cxI,cxI+2),rr=R.filter(r=>!cxDiff||!same(r,S));$('#cxmr').innerHTML=rr.map(r=>`<div class="cxm-row"><dt>${r[0]}</dt>${S.map(p=>`<dd>${r[1](p)}</dd>`).join('')}${S.length<2?'<dd></dd>':''}</div>`).join('')||'<p class="sp-n">Различий нет.</p>';$$('.cxm-dots i').forEach((d,i)=>d.classList.toggle('on',i===cxI||i===cxI+1))};
 const sc=$('#cxms');sc.scrollLeft=cxI*(sc.firstElementChild?sc.firstElementChild.offsetWidth:0);let t;sc.addEventListener('scroll',()=>{clearTimeout(t);t=setTimeout(()=>{const w=sc.firstElementChild.offsetWidth||1,i=Math.min(Math.max(0,A.length-2),Math.round(sc.scrollLeft/w));if(i!==cxI){cxI=i;mr()}},90)},{passive:true});mr();
 $('#cxdf').onchange=e=>{cxDiff=e.target.checked;renderCompare()};$('#cxclr').onclick=()=>{put('zcmp',[]);renderCompare()};counts()})}
const GW=[['Мужчине',['crosses','chains','cords','bracelets','aksessuary']],['Женщине',['rings','icons','crosses','bracelets','chetki']],['Ребёнку / крестнику',['crosses','icons']],['Себе',null]];
const GO=[['Крестины',['crosses','icons']],['Венчание и свадьба',['rings','icons']],['День рождения или именины',null],['Без повода',null]];
const GB=[['до 20 000',0,20000],['20 000 – 60 000',20000,60000],['60 000 – 200 000',60000,200000],['от 200 000',200000,1e9]];
function renderGift(){const st={w:null,o:null,b:null};let step=0;
 const opts=(arr,k)=>arr.map((x,i)=>`<button type="button" class="gf-o" data-k="${k}" data-i="${i}" aria-pressed="${st[k]===i}">${x[0].replace(/(\d{2,3}) (\d{3})/g,'$1\u202f$2')}</button>`).join('');
 const Q=[['Кому подарок?',GW,'w'],['Какой повод?',GO,'o'],['Бюджет, ₽',GB,'b']];
 const draw=()=>{if(step<3){const [h,a,k]=Q[step];fx.innerHTML=`<div class="gf"><ol class="gf-s" aria-label="Шаги">${Q.map((x,i)=>`<li class="${i===step?'on':i<step?'ok':''}"${i===step?' aria-current="step"':''}><span>${i+1}</span>${x[0].replace('?','').replace(', ₽','')}</li>`).join('')}</ol><h2 class="gf-h" tabindex="-1">${h}</h2><div class="gf-g">${opts(a,k)}</div>${step?'<button type="button" class="lk gf-bk">← Назад</button>':''}</div>`;$('.gf-h').focus({preventScroll:true});return}
  load().then(L=>{const cw=GW[st.w][1],co=GO[st.o][1];let cats=cw&&co?cw.filter(c=>co.includes(c)):(cw||co);if(cw&&co&&!cats.length)cats=co;const [,lo,hi]=GB[st.b];
   let A=L.filter(p=>(!cats||cats.includes(p.cat))&&p.price>=lo&&p.price<hi).sort((a,b)=>a.price-b.price),near=false;
   if(!A.length){near=true;const mid=hi>1e8?lo:(lo+hi)/2;A=L.filter(p=>!cats||cats.includes(p.cat)).sort((a,b)=>Math.abs(a.price-mid)-Math.abs(b.price-mid)).slice(0,4)}
   fx.innerHTML=`<div class="gf"><p class="lbl">Подборка</p><h2 class="gf-h" tabindex="-1">${esc(GW[st.w][0])} · ${esc(GO[st.o][0])} · ${GB[st.b][0].replace(/(\d{2,3}) (\d{3})/g,'$1\u202f$2')}\u00a0₽</h2><p class="sp-n">${near?'В этом бюджете изделий нет — показываем ближайшие по цене.':`Изделий по категории и бюджету: <b>${A.length}</b>.`} <button type="button" class="lk gf-rs">Начать заново</button></p><div class="ft-g">${A.slice(0,12).map(p=>tile(p)).join('')}</div></div>`;$('.gf-h').focus({preventScroll:true});counts()})};
 fx.addEventListener('click',e=>{const o=e.target.closest('.gf-o');if(o){st[o.dataset.k]=+o.dataset.i;step++;draw();fx.scrollIntoView({block:'start'});return}if(e.target.closest('.gf-bk')){step--;draw()}if(e.target.closest('.gf-rs')){st.w=st.o=st.b=null;step=0;draw()}});draw()}
if(page==='search')renderSearch();if(page==='favorites')renderFav();if(page==='compare')renderCompare();if(page==='gift')renderGift();
counts();
})();
