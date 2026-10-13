(async()=>{
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;if(RM||Z.CAPTURE)document.documentElement.classList.add('rm');
if(window.gsap&&window.Flip)gsap.registerPlugin(Flip);
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const grid=$('#grid');
const nav=document.querySelector('header.nav');const sn=()=>document.documentElement.style.setProperty('--navh',(nav?nav.offsetHeight:72)+'px');sn();addEventListener('resize',sn);
grid.innerHTML=Array.from({length:8},()=>'<div class="card sk"><div class="ph"></div><i></i><i></i></div>').join('');
const D=await Z.load();const P=D.products;

const CN={all:'Все изделия',crosses:'Кресты',rings:'Кольца',icons:'Иконы',chains:'Цепи',bracelets:'Браслеты',cords:'Шнуры',chetki:'Чётки',aksessuary:'Аксессуары'};
const BN={all:['women','Каталог','Изделия <em>во Славу Божию</em>','Авторские православные изделия из драгоценных металлов, натуральных камней и ценных пород дерева.'],
 crosses:['women','Нательные кресты','Подлинная <em>красота</em>','Вся красота православной веры – в женской коллекции ЗАВАРИН.'],
 rings:['rings','Кольца','То самое <em>кольцо</em>','Выбирайте то, что вам по душе, в галерее православных колец бренда.'],
 icons:['icons-family','Иконы','Ваша семейная <em>ценность</em>','Иконы, которые будут передаваться из поколения в поколение.'],
 chains:['bracelets-men','Цепи','Цепи <em>с характером</em>','Литые цепи из серебра с агатом и фианитами, золотые цепи.'],
 bracelets:['bracelets','Браслеты','Связаны <em>со смыслом</em>','В каждом плетёном браслете ЗАВАРИН – ваша история встречи с Богом.'],
 cords:['bracelets-men','Шнуры','Шнуры <em>и гайтаны</em>','Шнуры со вставками из серебра и натурального агата.'],
 chetki:['chetki','Чётки','Уникальные <em>чётки</em>','Созданы талантливыми ювелирами для вашей сердечной молитвы.'],
 aksessuary:['individual-2','Аксессуары','Мужские <em>аксессуары</em>','Запонки и зажимы для галстука из серебра и агата.']};
const hasM=new Set(['women','rings','icons-family','bracelets-men','bracelets','chetki']);
const metal=p=>p.material==='Золото и серебро'?'Золото и серебро':p.material;
const ST={'Агат':/агат/i,'Эбен и дерево':/эбен|дерев|дуб/i,'Фианиты':/фианит/i,'Бриллианты':/бриллиант/i,'Финифть':/финифт/i,'Изумруды':/изумруд/i,'Топаз':/топаз/i,'Шунгит':/шунгит/i,'Соколиный глаз':/соколин/i};
const PR={'до 20 000 ₽':[0,2e4],'20–100 тыс. ₽':[2e4,1e5],'100–300 тыс. ₽':[1e5,3e5],'от 300 тыс. ₽':[3e5,1e9]};
const q=new URLSearchParams(location.search);
const S={fav:q.get('fav')==='1',cat:CN[q.get('cat')]?q.get('cat'):'all',m:new Set(),s:new Set(),p:new Set(),sort:'pop',cols:+(localStorage.getItem('zcols')||4),mcols:+(localStorage.getItem('zmcols')||2)};
const fit=(p,ex)=>(!S.fav||Z.favs.has(p.id))&&(S.cat==='all'||p.cat===S.cat)&&(ex==='m'||!S.m.size||S.m.has(metal(p)))&&(ex==='s'||!S.s.size||[...S.s].some(k=>ST[k].test(p.name)))&&(ex==='p'||!S.p.size||[...S.p].some(k=>p.price>=PR[k][0]&&p.price<PR[k][1]));
function banner(){const b=BN[S.cat],el=$('#banner'),f=S.fav;
 el.innerHTML=`<div class="wrap"><nav class="crumbs" aria-label="Хлебные крошки"><a href="index.html">Главная</a> / <a href="catalog.html">Каталог</a>${S.cat!=='all'?' / '+CN[S.cat]:''}</nav><div class="g12"><div class="t"><p class="lbl">${f?'Избранное':b[1]}</p><h1>${f?'Ваше <em>избранное</em>':b[2]}</h1></div><p>${f?'Изделия, отмеченные сердцем, хранятся в этом браузере.':b[3]}</p></div></div>`;
 document.title=(f?'Избранное':S.cat==='all'?'Каталог':CN[S.cat])+' — ЗАВАРИН';}
function tabs(){$('#tabs').innerHTML=Object.keys(CN).map(k=>`<button type="button" aria-pressed="${k===S.cat}" class="${k===S.cat?'on':''}" data-c="${k}">${CN[k]}<sup>${k==='all'?P.length:P.filter(p=>p.cat===k).length}</sup></button>`).join('');}
function fbody(){const g=(t,key,opts)=>`<div class="fg"><h4>${t}</h4><div class="op">${opts.map(o=>{const n=P.filter(p=>fit(p,key)&&(key==='m'?metal(p)===o:key==='s'?ST[o].test(p.name):p.price>=PR[o][0]&&p.price<PR[o][1])).length;return `<button data-k="${key}" data-v="${o}" class="${S[key].has(o)?'on':''}" ${!n&&!S[key].has(o)?'disabled':''}>${o}<sup>${n}</sup></button>`}).join('')}</div></div>`;
 $('#fbody').innerHTML=g('Металл','m',['Золото','Серебро','Золото и серебро'])+g('Вставки и материалы','s',Object.keys(ST))+g('Цена','p',Object.keys(PR));
 const n=S.m.size+S.s.size+S.p.size;$('#fn').textContent=n||'';$('#fgo').textContent='Показать '+list().length;}
const tag=p=>p.home===2?'Новинка':p.old&&p.old>p.price*1.15?'Выгодно':'';
const cutS=p=>p.cut?'img/cine/cut/'+p.cut.split('/').pop().replace('.png','.webp'):p.images[0];
function card(p,xl){const o=(p.options||[])[0];const qa=o?`<small>${o.label}</small><div class="sz">${o.v.slice(0,8).map(v=>`<button data-add="${p.id}" data-v="${v}">${v}</button>`).join('')}</div>`:`<button class="one" data-add="${p.id}">В корзину</button>`;
 return `<article class="card${xl?' xl':''}" data-flip-id="${p.id}"><div class="pw"><a class="ph" href="product.html?id=${p.id}" aria-label="${p.name}">${tag(p)?`<span class="tag">${tag(p)}</span>`:''}<img class="a" src="${cutS(p)}" alt="${p.name}" loading="lazy" decoding="async"><img class="b" src="${p.images[1]||p.images[0]}" alt="" aria-hidden="true" loading="lazy" decoding="async"></a>
 <button class="fav ${Z.favs.has(p.id)?'on':''}" data-fav="${p.id}" aria-label="В избранное">${Z.heart}</button><div class="qa">${qa}</div><button type="button" class="qv" data-qv="${p.id}" aria-label="Быстрый просмотр: ${p.name}">Быстрый просмотр</button></div>
 <div class="meta">${p.catName}${p.material?' · '+p.material:''}</div><h3><a href="product.html?id=${p.id}">${p.name}</a></h3><div class="pr">${Z.fmt(p.price)}${p.old?`<s>${Z.fmt(p.old)}</s>`:''}</div></article>`;}
const ED=[['Индивидуальные работы','Ваша история в драгоценной форме','Размер, материал, вставки, молитвы и лики святых — по вашему пожеланию.','img/ed/agate-craft.jpg','index.html#story'],
 ['Галерея в Москве','Ждём вас в Москве','Большой Ордынский пер., 4, стр. 4 · ежедневно 9:00–21:00','img/ed/gallery-moscow.jpg','index.html#gallery'],
 ['Создание работ','Рука мастера','Моделирование, ручная гравировка, фрезеровка и ручная обработка.','img/craft-hands.jpg','index.html#craft']];
const edt=e=>`<a class="edt" data-flip-id="ed-${e[1]}" href="${e[4]}"><img src="${e[3]}" alt="" loading="lazy" width="1000" height="667"><div><small>${e[0]}</small><h3>${e[1]}</h3><p>${e[2]}</p><u>Подробнее →</u></div></a>`;
function list(){let L=P.filter(p=>fit(p));if(S.sort==='asc')L.sort((a,b)=>a.price-b.price);if(S.sort==='desc')L.sort((a,b)=>b.price-a.price);if(S.sort==='new')L.sort((a,b)=>b.home-a.home);return L;}
function chips(){const c=[];S.cat!=='all'&&c.push(['cat',S.cat,CN[S.cat]]);['m','s','p'].forEach(k=>S[k].forEach(v=>c.push([k,v,v])));
 $('#chips').innerHTML=c.map(x=>`<button class="chip" data-ck="${x[0]}" data-cv="${x[1]}" aria-label="Убрать фильтр ${x[2]}">${x[2]}</button>`).join('')+(c.length>1?'<button class="chip clr" data-clr>Сбросить всё</button>':'');}
const plural=n=>n%10===1&&n%100!==11?'изделие':[2,3,4].includes(n%10)&&![12,13,14].includes(n%100)?'изделия':'изделий';
function render(flip=true){const st=flip&&window.Flip&&!RM&&!Z.CAPTURE?Flip.getState('#grid > .card, #grid > .edt, #grid > .cg-h'):null;let L=list();
 const grp=S.cat==='all'&&S.sort==='pop'&&!S.fav,ko=Object.keys(CN);if(grp)L=L.map((p,i)=>[p,i]).sort((a,b)=>ko.indexOf(a[0].cat)-ko.indexOf(b[0].cat)||a[1]-b[1]).map(x=>x[0]);
 let H=[],pc='',gi=0;L.forEach((p,i)=>{let h='';if(grp&&p.cat!==pc){pc=p.cat;gi=0;h+=`<h2 class="cg-h" data-flip-id="h-${p.cat}"><span>${CN[p.cat]}</span><sup>${L.filter(x=>x.cat===p.cat).length}</sup></h2>`}h+=card(p,L.length>4&&(grp?gi%7===0:i%9===0));gi++;if(!grp&&i===5&&L.length>9)h+=edt(ED[0]);H.push(h)});
 const tk=render.tk=(render.tk||0)+1,N=Z.CAPTURE?1e9:6;grid.innerHTML=L.length?H.slice(0,N).join(''):`<div class="empty"><h3>Ничего не найдено</h3><p>Попробуйте изменить параметры или сбросить фильтры.</p><button class="btn solid" data-clr>Сбросить фильтры</button></div>`;
 {let k=N;const step=()=>{if(tk!==render.tk||k>=H.length)return;grid.insertAdjacentHTML('beforeend',H.slice(k,k+=6).join(''));requestAnimationFrame(step)};if(L.length>N)requestAnimationFrame(step)}
 $('#cnt').innerHTML=`<b>${L.length}</b> ${plural(L.length)}`;chips();fbody();
 grid.style.setProperty('--cols',S.cols);grid.style.setProperty('--mcols',S.mcols);$$('.dens button').forEach(b=>b.classList.toggle('on',+b.dataset.c===(innerWidth<=700?S.mcols:S.cols)));
 grid.classList.remove('fade');if(flip&&!RM)requestAnimationFrame(()=>grid.classList.add('fade'));if(st)Flip.from(st,{duration:.6,ease:'power3.inOut',absolute:true,scale:true,nested:false,onEnter:e=>gsap.fromTo(e,{opacity:0,y:30},{opacity:1,y:0,duration:.6,stagger:.02}),onLeave:e=>gsap.to(e,{opacity:0,duration:.3})});
 Z.bind(grid);}
const set=(fn,bn)=>{fn();if(bn)banner();tabs();history.replaceState(0,'','?cat='+S.cat+(S.fav?'&fav=1':''));render();};
if(window.LUX)LUX.watch(document);$('#tabs').onclick=e=>{const b=e.target.closest('button');if(b&&b.dataset.c!==S.cat)set(()=>S.cat=b.dataset.c,1);};
$('#sort').onchange=e=>set(()=>S.sort=e.target.value);
$$('.dens button').forEach(b=>b.onclick=()=>{const c=+b.dataset.c;if(innerWidth<=700){S.mcols=c;localStorage.setItem('zmcols',c);}else{S.cols=c;localStorage.setItem('zcols',c);}render();});
$('#chips').onclick=e=>{const b=e.target.closest('.chip');if(!b)return;if(b.dataset.clr!==undefined)return clr();const k=b.dataset.ck;if(k==='cat')set(()=>S.cat='all',1);else set(()=>S[k].delete(b.dataset.cv));};
const clr=()=>set(()=>{S.m.clear();S.s.clear();S.p.clear();S.cat='all';},1);
grid.addEventListener('click',e=>{const f=e.target.closest('[data-fav]'),a=e.target.closest('[data-add]'),c=e.target.closest('[data-clr]');
 if(f){Z.toggleFav(f.dataset.fav,f);}if(a){Z.cart.push(a.dataset.add);Z.save();Z.toast('Добавлено в корзину',a.dataset.v?'Размер '+a.dataset.v:'макет');}if(c)clr();});
const dr=$('#dr');let last;const open=()=>{last=document.activeElement;dr.classList.add('on');Z.lenis&&Z.lenis.stop();document.body.style.overflow='hidden';setTimeout(()=>$('#fbody button:not(:disabled)')?.focus(),50);};
const close=()=>{dr.classList.remove('on');Z.lenis&&Z.lenis.start();document.body.style.overflow='';last&&last.focus();};
$('#fopen').onclick=open;dr.addEventListener('click',e=>{if(e.target.closest('[data-close]'))close();});$('#fgo').onclick=close;
$('#freset').onclick=()=>{S.m.clear();S.s.clear();S.p.clear();render(false);};
addEventListener('keydown',e=>{if(e.key==='Escape'&&dr.classList.contains('on'))close();});
$('#fbody').onclick=e=>{const b=e.target.closest('button[data-k]');if(!b)return;const s=S[b.dataset.k];s.has(b.dataset.v)?s.delete(b.dataset.v):s.add(b.dataset.v);render();};
let y0=0;const pn=dr.querySelector('.pn');pn.addEventListener('touchstart',e=>{y0=e.touches[0].clientY},{passive:true});pn.addEventListener('touchend',e=>{if(innerWidth<=700&&e.changedTouches[0].clientY-y0>90&&$('#fbody').scrollTop<=0)close();});
let rw=innerWidth;addEventListener('resize',()=>{if((rw<=700)!==(innerWidth<=700)){rw=innerWidth;render(false);}});
if(Z.CAPTURE&&q.get('open')==='1')setTimeout(open,100);
banner();tabs();render(false);window.__ready=true;
})();
