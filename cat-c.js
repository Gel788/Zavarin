(()=>{const C=window.CV||{rm:true},$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];document.documentElement.classList.add('cine-cat');
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])),fmt=n=>n.toLocaleString('ru-RU').replace(/\u00a0|,/g,' ')+'\u00a0₽';
const HERO={all:'krest-07-21-07550-00-1',crosses:'krest-07-21-07550-00-1',icons:'ikona-06-25-01460-00-1',rings:'koltso-02-22-00034-7-1',chains:'tsep-04-20-21208525-1',bracelets:'braslet-03-10-02103-1',cords:'shnur-05-12-03011-00-1',chetki:'chyetki-11-12-00001-40-1',aksessuary:'zaponki-20-32-00002-00-1'};
let P=[];const cut=p=>p.id==='krest-07-21-07550-00-1'?'img/hs/p00.webp':'img/cine/cut/'+p.cut.split('/').pop().replace('.png','.webp');
const bn=$('#banner');let bTL=[];
function deco(){if(!P.length||!bn.firstElementChild||bn.querySelector('.cbn-art'))return;const cat=new URLSearchParams(location.search).get('cat')||'all',fav=new URLSearchParams(location.search).get('fav')==='1';
 const p=P.find(x=>x.id===(HERO[cat]||HERO.all))||P[0],word=fav?'Избранное':(cat==='all'?'ЗАВАРИН':($('#tabs .on')||{}).firstChild?.textContent||'');
 bn.insertAdjacentHTML('afterbegin',`<p class="cbn-big" aria-hidden="true">${esc(word)}</p><a class="cbn-art" href="product.html?id=${p.id}" aria-label="${esc(p.name)}"><img src="${cut(p)}" alt="" fetchpriority="high"></a><a class="cbn-cap" href="product.html?id=${p.id}"><small>В кадре</small><b>${esc(p.name)}</b><span>${fmt(p.price)}${p.old?`<s>${fmt(p.old)}</s>`:''}</span></a>`);
 if(C.rm)return;bTL.forEach(t=>t.kill());bTL=[];
 const a=bn.querySelector('.cbn-art img'),w=bn.querySelector('.cbn-big');
 bTL.push(gsap.timeline().from(w,{xPercent:12,opacity:0,duration:1.8,ease:'expo.out'}).from(a,{yPercent:18,scale:.82,opacity:0,duration:1.6,ease:'expo.out'},.1).from(bn.querySelectorAll('h1,.t .lbl,.wrap>.g12>p,.cbn-cap'),{y:50,opacity:0,duration:1.2,stagger:.08,ease:'expo.out'},.25));
 bTL.push(gsap.timeline({scrollTrigger:{trigger:bn,start:'top top',end:'bottom top',scrub:.6}}).to(a,{yPercent:-14,scale:1.18,rotate:-4,ease:'none'},0).to(w,{xPercent:-14,ease:'none'},0).to(bn.querySelector('.wrap'),{y:-80,opacity:.2,ease:'none'},0));}
new MutationObserver(()=>deco()).observe(bn,{childList:true});
/* grid */
const grid=$('#grid');let first=true;
function prep(){if(C.rm)return;ScrollTrigger.getAll().forEach(t=>{const tr=t.trigger;if(tr&&!tr.isConnected)t.kill()});
 const cards=$$('#grid>.card:not([data-ce]),#grid>.cg-h:not([data-ce])');if(!cards.length)return;const now=[],later=[];
 cards.forEach(c=>{c.dataset.ce=1;(c.getBoundingClientRect().top<innerHeight?now:later).push(c);
 });
 if(first&&now.length)gsap.from(now,{y:90,opacity:0,clipPath:'inset(20% 0 0 0)',duration:1.3,ease:'expo.out',stagger:.07,delay:.35,clearProps:'clipPath,transform,opacity'});
 if(first&&later.length){gsap.set(later,{y:90,opacity:0,clipPath:'inset(20% 0 0 0)'});ScrollTrigger.batch(later,{start:'top 94%',once:true,onEnter:b=>gsap.to(b,{y:0,opacity:1,clipPath:'inset(0% 0 0 0)',duration:1.2,ease:'expo.out',stagger:.08,overwrite:true,clearProps:'clipPath,transform'})})}
 first=false;requestAnimationFrame(()=>ScrollTrigger.refresh());}
new MutationObserver(()=>{clearTimeout(prep.t);prep.t=setTimeout(prep,30)}).observe(grid,{childList:true});
fetch('products.json').then(r=>r.json()).then(d=>{P=d.products;deco()});
const fbH=()=>{const h=$('#hd'),f=$('.fb');document.documentElement.style.setProperty('--fbb',((h?h.offsetHeight:60)+(f?f.offsetHeight:0)-1)+'px')};fbH();addEventListener('resize',fbH);setTimeout(fbH,600);
if(!C.rm)setTimeout(prep,60);
})();
/* v11: category switcher previews, editorial grid, quick view */
(()=>{const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])),fmt=n=>n.toLocaleString('ru-RU').replace(/\u00a0|,/g,' ')+'\u00a0₽';
const TH={all:'krest-07-21-07550-00-1',crosses:'krest-07-23-07630-00-5',rings:'koltso-02-22-00034-7-1',icons:'ikona-06-25-01460-00-1',chains:'tsep-04-20-21208525-1',bracelets:'braslet-03-10-02103-1',cords:'shnur-05-12-03011-00-1',chetki:'chyetki-11-12-00001-40-1',aksessuary:'zaponki-20-32-00002-00-1'};
let P=[];const cut=p=>'img/cine/m/'+p.cut.split('/').pop().replace('.png','.webp'),big=p=>'img/cine/cut/'+p.cut.split('/').pop().replace('.png','.webp');
const tabs=$('#tabs');const deco=()=>{if(!P.length)return;$$('#tabs button[data-c]').forEach(b=>{if(b.querySelector('.tb-im'))return;const p=P.find(x=>x.id===TH[b.dataset.c]);if(p)b.insertAdjacentHTML('afterbegin',`<span class="tb-im" aria-hidden="true"><img src="${cut(p)}" alt="" loading="lazy"></span>`)});tabs.classList.add('pv')};
new MutationObserver(deco).observe(tabs,{childList:true});
const grid=$('#grid');const cols=()=>{const n=getComputedStyle(grid).gridTemplateColumns.split(' ').filter(Boolean).length;grid.classList.toggle('wide',n>=3);grid.classList.toggle('one',n<2)};new MutationObserver(cols).observe(grid,{childList:true,attributes:true,attributeFilter:['style']});addEventListener('resize',cols);cols();
/* quick view */
document.body.insertAdjacentHTML('beforeend','<div class="qvm" id="qvm" role="dialog" aria-modal="true" aria-labelledby="qvh" hidden><div class="qv-ov" data-x></div><div class="qv-p"><button class="qv-x" data-x aria-label="Закрыть">×</button><div class="qv-g"><div class="qv-st" id="qvst"></div><div class="qv-th" id="qvth" role="group" aria-label="Фотографии"></div></div><div class="qv-i" id="qvi"></div></div></div>');
const m=$('#qvm');let last=null,cur=null;
const show=k=>{$$('#qvst img').forEach((im,i)=>im.classList.toggle('on',i===k));$$('#qvth button').forEach((b,i)=>b.setAttribute('aria-current',i===k))};
const open=id=>{const p=P.find(x=>x.id===id);if(!p)return;cur=p;last=document.activeElement;const ims=[big(p),...p.images];
 $('#qvst').innerHTML=ims.map((s,i)=>`<img src="${s}" alt="${i?esc(p.name)+' — фото '+i:esc(p.name)}" class="${i?'ph':'ct'}${i?'':' on'}">`).join('');
 $('#qvth').innerHTML=ims.map((s,i)=>`<button type="button" class="${i?'':'d'}" aria-label="Фото ${i+1}"><img src="${i?s:cut(p)}" alt=""></button>`).join('');
 const sp=p.specs.filter(([a])=>!/Лицевая|Тыльная|Торцевые|Лики|Вставки с/.test(a)).slice(0,5),o=(p.options||[])[0];
 $('#qvi').innerHTML=`<p class="lbl">${esc(p.catName)} · арт. ${esc(p.art)}</p><h2 id="qvh">${esc(p.name)}</h2><p class="pr"><b>${fmt(p.price)}</b>${p.old?`<s>${fmt(p.old)}</s>`:''}</p><dl>${sp.map(([a,b])=>`<dt>${esc(a)}</dt><dd>${esc(b)}</dd>`).join('')}</dl>${o?`<p class="qv-l">${esc(o.label)}</p><div class="qv-sz" role="group" aria-label="${esc(o.label)}">${o.v.slice(0,10).map((v,i)=>`<button type="button" aria-pressed="${!i}">${esc(v)}</button>`).join('')}</div>`:''}<div class="qv-b"><button type="button" class="btn ink" id="qvadd">В корзину</button><a class="btn ghost" href="product.html?id=${p.id}">Подробнее</a></div><p class="qv-n">Доставка по России: СДЭК, EMS, Почта России. Индивидуальные изменения — по согласованию с менеджером.</p>`;
 m.hidden=false;requestAnimationFrame(()=>m.classList.add('on'));document.documentElement.style.overflow='hidden';window.__lenis&&window.__lenis.stop();setTimeout(()=>$('.qv-x').focus(),40)};
const close=()=>{m.classList.remove('on');setTimeout(()=>{m.hidden=true},RM?0:450);document.documentElement.style.overflow='';window.__lenis&&window.__lenis.start();last&&last.focus()};
m.addEventListener('click',e=>{if(e.target.closest('[data-x]'))return close();const t=e.target.closest('#qvth button');if(t)return show([...t.parentNode.children].indexOf(t));const s=e.target.closest('.qv-sz button');if(s){s.parentNode.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',b===s))}
 if(e.target.closest('#qvadd')&&cur){Z.cart.push(cur.id);Z.save();const v=$('.qv-sz [aria-pressed=true]');Z.toast('Добавлено в корзину',v?'Размер '+v.textContent:cur.name);close()}});
addEventListener('keydown',e=>{if(m.hidden)return;if(e.key==='Escape')close();if(e.key==='Tab'){const f=[...m.querySelectorAll('button,a')].filter(x=>x.offsetParent);const a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}});
grid.addEventListener('click',e=>{const q=e.target.closest('[data-qv]');if(q){e.preventDefault();open(q.dataset.qv)}});
fetch('products.json').then(r=>r.json()).then(d=>{P=d.products;deco()});})();
