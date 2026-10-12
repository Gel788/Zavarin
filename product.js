(async()=>{
const D=await Z.load();const P=D.products;const id=new URLSearchParams(location.search).get('id');
const p=P.find(x=>x.id===id)||P.find(x=>x.home)||P[0];document.title=p.name+' — ЗАВАРИН';
const $=s=>document.querySelector(s);const sp=Object.fromEntries(p.specs);const imgs=p.images;
const disc=p.old?Math.round((1-p.price/p.old)*100):0;
const metal=[p.metal||sp['Металл'],sp['Проба']].filter(Boolean).join(' · ');
const share='<svg viewBox="0 0 24 24"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>';
$('#bc').innerHTML=`<a href="index.html">Главная</a><i>›</i><a href="catalog.html">Каталог</a><i>›</i><a href="catalog.html?cat=${p.cat}">${p.catName}</a><i>›</i><span>${p.name}</span>`;
const metaH=`<div class="meta"><span>Арт. ${p.art}</span>${metal?`<span>${metal}</span>`:''}</div>`;
$('#mtitle').innerHTML=`<h1>${p.name}</h1>${metaH}`;
/* gallery */
const all=[p.cut,...imgs];
$('#slides').innerHTML=all.map((s,k)=>`<button class="sl${k?'':' v'}" data-k="${k}" aria-label="Открыть фото ${k+1}"><img src="${s}" alt="${p.name}${k?' — фото '+k:''}" ${k>1?'loading="lazy"':''}><span class="zi" aria-hidden="true">⤢</span></button>`).join('');
$('#dots').innerHTML=all.map((_,k)=>`<button data-k="${k}" aria-label="Фото ${k+1}" class="${k?'':'on'}"></button>`).join('');
const slides=[...document.querySelectorAll('.sl')],dots=[...document.querySelectorAll('#dots button')];
const mob=()=>innerWidth<=860;
let curS=0;const setDot=k=>{curS=k;dots.forEach((d,i)=>d.classList.toggle('on',i===k));};
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&e.intersectionRatio>.5)setDot(+e.target.dataset.k);}),{threshold:[.5,.75]});slides.forEach(s=>io.observe(s));
const goS=k=>{k=Math.max(0,Math.min(all.length-1,k));const s=slides[k];if(mob())$('#slides').scrollTo({left:s.offsetLeft,behavior:'smooth'});else{const y=s.getBoundingClientRect().top+scrollY-100;scrollTo({top:y,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}};
$('#dots').addEventListener('click',e=>{const b=e.target.closest('button');if(b)goS(+b.dataset.k);});
document.querySelector('.gal .arr.p').onclick=()=>goS(curS-1);document.querySelector('.gal .arr.n').onclick=()=>goS(curS+1);
// hide fixed dots once gallery leaves view (desktop)
const gal=document.querySelector('.gal');const dv=()=>{const r=gal.getBoundingClientRect();$('#dots').style.opacity=mob()||(r.top<innerHeight*.5&&r.bottom>innerHeight*.5)?1:0;};addEventListener('scroll',dv,{passive:true});dv();
/* info */
const ring=o=>{if(p.cat==='rings'&&o.label==='Размер изделия'&&o.v.length===2){const a=parseFloat(o.v[0].replace(',','.')),b=parseFloat(o.v[1].replace(',','.'));const r=[];for(let x=a;x<=b+1e-6;x+=.5)r.push(String(x).replace('.',','));return r;}return o.v;};
const sub={"Размер изделия":p.cat==='rings'?'Размер (мм)':'Высота изделия (мм)','Размер шнура':'Длина шнура (см)','Ширина кольца':'Ширина (мм)'};
$('#info').innerHTML=`<div class="ttl"><h1>${p.name}</h1><span class="ic2"><button id="sh" aria-label="Поделиться">${share}</button><button id="fav" class="${Z.favs.has(p.id)?'on':''}" aria-label="В избранное">${Z.heart}</button></span></div>
${metaH}
<div class="price"><b>${Z.fmt(p.price)}</b>${p.old?`<s>${Z.fmt(p.old)}</s><em>−${disc}%</em>`:''}</div>
<div class="notes">${p.cat==='rings'?'':''}Стоимость изделия может быть скорректирована с учётом стоимости металла по курсу ЦБ РФ.<br>Доставка по России: СДЭК, EMS, Почта России · <a href="#tabs" data-tab="1">подробнее</a></div>
<div class="btns"><button class="pill f" id="add">Добавить в корзину</button><button class="pill o" id="buy1">Купить в 1 клик</button></div>
${p.options.map((o,i)=>{const v=ring(o);return `<div class="opt"><div class="h">${o.label==='Размер изделия'?'Выбрать размер':o.label}<span data-o="${i}">${v[0]}</span></div><div class="sub">${sub[o.label]||''}</div><div class="circ" data-g="${i}">${v.map((x,k)=>`<button class="${k?'':'on'}">${x}</button>`).join('')}</div></div>`}).join('')}
${p.custom?`<div class="chg"><b>Хотите изменить изделие?</b><br>${p.custom}</div>`:''}`;
$('#info').addEventListener('click',e=>{const b=e.target.closest('.circ button');if(!b)return;const g=b.parentElement;g.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));$(`[data-o="${g.dataset.g}"]`).textContent=b.textContent;});
const sel=()=>[...document.querySelectorAll('.opt')].map(o=>o.querySelector('.h').firstChild.textContent+': '+o.querySelector('.on').textContent).join(', ');
$('#add').onclick=()=>{Z.cart.push(p.id);Z.save();const b=$('#add');b.textContent='Добавлено ✓';b.classList.add('done');setTimeout(()=>{b.textContent='Добавить в корзину';b.classList.remove('done')},2200);Z.toast('Добавлено в корзину',(sel()||'арт. '+p.art)+' · макет');};
$('#buy1').onclick=()=>Z.toast('Купить в 1 клик','макет · заказ не оформляется');
$('#fav').onclick=e=>{Z.toggleFav(p.id,e.currentTarget);};
$('#sh').onclick=async()=>{try{if(navigator.share)await navigator.share({title:p.name,url:location.href});else{await navigator.clipboard.writeText(location.href);Z.toast('Ссылка скопирована','');}}catch(e){}};
/* characteristics */
$('#chars').innerHTML=`<div><h2>Характеристики <em>изделия</em></h2><dl>${p.specs.map(([a,b])=>`<dt>${a}</dt><dd class="${/Металл|Проба/.test(a)?'g':''}">${b}</dd>`).join('')}${p.options.map(o=>`<dt>${o.label}</dt><dd>${ring(o).join(', ')}</dd>`).join('')}</dl><div class="dl">◇ Каждое изделие проходит апробирование и клеймение — см. «Гарантии»</div></div><div class="im"><img src="${imgs[1]||imgs[0]}" alt="" loading="lazy"></div>`;
/* sides (only real spec fields) */
const sides=[['Лицевая сторона',sp['Лицевая сторона'],imgs[0]],['Тыльная сторона',sp['Тыльная сторона'],imgs[1]||imgs[0]],['Торцевые иконы',sp['Торцевые иконы'],imgs[2]||imgs[0]]].filter(x=>x[1]);
$('#sidesw').innerHTML=sides.length?`<div class="sides">${sides.map(([t,v,im])=>`<div class="side"><div class="im"><img src="${im}" alt="${t}: ${p.name}" loading="lazy"></div><div><h3>${t}</h3><ul>${v.split(/,\s*/).map(x=>`<li>${x}</li>`).join('')}</ul></div></div>`).join('')}</div>`:'';
if(!sides.length)$('#sides').remove();
/* details carousel */
const trk=$('#trk');trk.innerHTML=imgs.map((s,k)=>`<button data-k="${k+1}" aria-label="Открыть фото ${k+1}"><img src="${s}" alt="${p.name} — деталь ${k+1}" loading="lazy" draggable="false"></button>`).join('');
document.querySelector('.det .nv.p').onclick=()=>trk.scrollBy({left:-trk.clientWidth*.7,behavior:'smooth'});document.querySelector('.det .nv.n').onclick=()=>trk.scrollBy({left:trk.clientWidth*.7,behavior:'smooth'});
(()=>{let d=false,sx=0,sl=0,mv=0,v=0,lx=0,raf;trk.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')return;d=true;mv=0;sx=lx=e.clientX;sl=trk.scrollLeft;trk.style.scrollSnapType='none';cancelAnimationFrame(raf);});
 addEventListener('pointermove',e=>{if(!d)return;const dx=e.clientX-sx;v=e.clientX-lx;lx=e.clientX;mv=Math.abs(dx);trk.scrollLeft=sl-dx;});
 addEventListener('pointerup',()=>{if(!d)return;d=false;const g=()=>{v*=.92;trk.scrollLeft-=v;if(Math.abs(v)>.5)raf=requestAnimationFrame(g);else trk.style.scrollSnapType='';};raf=requestAnimationFrame(g);});
 trk.addEventListener('click',e=>{if(mv>6){e.preventDefault();e.stopPropagation();mv=0;}},true);})();
/* tabs */
const I=D.info,para=a=>a.map(x=>`<p>${x}</p>`).join('');
const T=[['Описание и параметры',`<p>${p.name}. Артикул ${p.art}.</p>${p.specs.map(([a,b])=>`<p>${a}: ${b}</p>`).join('')}<p><a href="${p.url}" target="_blank" rel="noopener">Страница изделия на zavarin.art</a></p>`],['Доставка и оплата',para(I.delivery.slice(0,10))],['Уход за изделиями',para(I.care)],['Гарантии',para(I.guarantee.slice(0,10))]];
$('#tabs').innerHTML=T.map(([t],k)=>`<button role="tab" aria-selected="${!k}" class="${k?'':'on'}" data-k="${k}">${t}</button>`).join('');
document.querySelector('#tabs').insertAdjacentHTML('afterend','');$('#tps').innerHTML=T.map(([,c],k)=>`<div class="tp${k?'':' on'}">${c}</div>`).join('');
const tab=k=>{document.querySelectorAll('#tabs button').forEach((b,i)=>{b.classList.toggle('on',i===k);b.setAttribute('aria-selected',i===k)});document.querySelectorAll('.tp').forEach((b,i)=>b.classList.toggle('on',i===k));};
$('#tabs').addEventListener('click',e=>{const b=e.target.closest('button');if(b)tab(+b.dataset.k);});
document.querySelector('[data-tab]').addEventListener('click',e=>{e.preventDefault();tab(1);const y=$('#tabs').getBoundingClientRect().top+scrollY-110;scrollTo({top:y,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});});
/* related */
let R=P.filter(x=>x.cat===p.cat&&x.id!==p.id);R=R.concat(P.filter(x=>x.cat!==p.cat&&x.id!==p.id)).slice(0,8);
$('#rel').innerHTML=R.map(x=>`<a class="card" href="product.html?id=${x.id}"><div class="ph"><img src="${x.images[0]}" alt="${x.name}" loading="lazy" width="900" height="900"></div><h3>${x.name}</h3><div class="pr">${Z.fmt(x.price)}${x.old?`<s>${Z.fmt(x.old)}</s>`:''}</div></a>`).join('');
/* lightbox */
const lb=$('#lb'),lt=$('#lbt');lt.innerHTML=all.map(s=>`<div class="s"><img src="${s}" alt="${p.name}" draggable="false"></div>`).join('');
let cur=0,zs=1,zx=0,zy=0;const pts=new Map();let st=null;const im=()=>lt.children[cur].querySelector('img');const ap=()=>im().style.transform=`translate(${zx}px,${zy}px) scale(${zs})`;
const go=(k,a=true)=>{if(zs>1){zs=1;zx=zy=0;ap();}cur=(k+all.length)%all.length;lt.style.transition=a?'transform .5s cubic-bezier(.7,0,.2,1)':'none';lt.style.transform=`translateX(${-cur*100}vw)`;$('#lbc').innerHTML=`${cur+1} / ${all.length}<small>Перетаскивайте · колесо или щипок — увеличение · ← → Esc</small>`;};
const open=k=>{window.__lbLast=document.activeElement;lb.classList.add('on');setTimeout(()=>lb.querySelector('.x').focus(),30);document.documentElement.style.overflow='hidden';Z.lenis&&Z.lenis.stop();go(k,false);};
const close=()=>{lb.classList.remove('on');window.__lbLast&&window.__lbLast.focus();document.documentElement.style.overflow='';Z.lenis&&Z.lenis.start();};
document.addEventListener('click',e=>{const b=e.target.closest('.sl,.det .trk button');if(b)open(+b.dataset.k);});
lb.querySelector('.x').onclick=close;lb.querySelector('.nv.p').onclick=()=>go(cur-1);lb.querySelector('.nv.n').onclick=()=>go(cur+1);
addEventListener('keydown',e=>{if(!lb.classList.contains('on'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')go(cur-1);if(e.key==='ArrowRight')go(cur+1);});
lb.addEventListener('wheel',e=>{e.preventDefault();zs=Math.max(1,Math.min(4,zs*(e.deltaY<0?1.15:.87)));if(zs===1)zx=zy=0;ap();},{passive:false});
lt.addEventListener('pointerdown',e=>{pts.set(e.pointerId,{x:e.clientX,y:e.clientY});lt.setPointerCapture(e.pointerId);if(pts.size===1)st={x:e.clientX,y:e.clientY,zx,zy,t:performance.now()};if(pts.size===2){const [a,b]=[...pts.values()];st={d:Math.hypot(a.x-b.x,a.y-b.y),zs};}});
lt.addEventListener('pointermove',e=>{if(!pts.has(e.pointerId)||!st)return;pts.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pts.size===2&&st.d){const [a,b]=[...pts.values()];zs=Math.max(1,Math.min(4,st.zs*Math.hypot(a.x-b.x,a.y-b.y)/st.d));ap();return;}
 const dx=e.clientX-st.x,dy=e.clientY-st.y;if(zs>1){zx=st.zx+dx;zy=st.zy+dy;ap();}else{lt.style.transition='none';lt.style.transform=`translateX(calc(${-cur*100}vw + ${dx}px))`;}});
const up=e=>{if(!pts.has(e.pointerId))return;pts.delete(e.pointerId);if(pts.size||!st)return;const dx=e.clientX-st.x;if(zs===1&&st.x!==undefined){if(Math.abs(dx)>60)go(cur+(dx<0?1:-1));else if(Math.abs(dx)<5&&performance.now()-st.t<250&&e.target.tagName!=='IMG')close();else go(cur);}st=null;};
lt.addEventListener('pointerup',up);lt.addEventListener('pointercancel',up);lt.addEventListener('dblclick',()=>{zs=zs>1?1:2.5;zx=zy=0;ap();});
Z.bind();window.__ready=true;
})();
