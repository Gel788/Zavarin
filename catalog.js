(async()=>{
if(window.gsap&&window.Flip)gsap.registerPlugin(Flip);
const D=await Z.load();const P=D.products;const q=new URLSearchParams(location.search);
const CATS=[['all','Все изделия'],['crosses','Кресты'],['rings','Кольца'],['icons','Иконы'],['chains','Цепи'],['bracelets','Браслеты'],['cords','Шнуры'],['chetki','Чётки'],['aksessuary','Аксессуары']];
const MATS=['Все','Золото','Серебро','Золото и серебро'];
const prices=P.map(p=>p.price),PMIN=Math.floor(Math.min(...prices)/1000)*1000,PMAX=Math.ceil(Math.max(...prices)/10000)*10000;
const S={cat:q.get('cat')||'all',mat:'Все',min:PMIN,max:PMAX,sort:'pop',shown:12,fav:q.has('fav')};
const $=s=>document.querySelector(s);
$('#tabs').innerHTML=(S.fav?'<button class="tab on" data-c="fav">Избранное</button>':'')+CATS.map(([k,n])=>`<button class="tab${!S.fav&&k===S.cat?' on':''}" data-c="${k}">${n}<sup>${k==='all'?P.length:P.filter(p=>p.cat===k).length}</sup></button>`).join('');
$('#mats').innerHTML=MATS.map(m=>`<button class="chip${m===S.mat?' on':''}" data-m="${m}">${m}</button>`).join('');
const mn=$('#pmin'),mx=$('#pmax');[mn,mx].forEach(i=>{i.min=PMIN;i.max=PMAX;i.step=1000;});mn.value=PMIN;mx.value=PMAX;
function pr(){let a=+mn.value,b=+mx.value;if(a>b-5000){if(this===mn)a=b-5000;else b=a+5000;}S.min=Math.min(a,b);S.max=Math.max(a,b);$('#pout').textContent=Z.fmt(S.min)+' — '+Z.fmt(S.max);
 const f=$('.rng .fill');f.style.left=((S.min-PMIN)/(PMAX-PMIN)*100)+'%';f.style.right=(100-(S.max-PMIN)/(PMAX-PMIN)*100)+"%";}
pr();
// hero floating cutouts (real products)
const fl=$('.chero .flo');[['04',0,40,150,-7],['00',190,0,140,4],['06',350,120,170,-6]].forEach(([i,x,y,w,r])=>{const im=new Image();im.src='img/cut/p'+i+'.png';im.style.cssText=`left:${x}px;top:${y}px;width:${w}px;transform:rotate(${r}deg)`;fl.appendChild(im);});
if(window.gsap&&!Z.CAPTURE)gsap.utils.toArray('.chero .flo img').forEach((e,k)=>gsap.to(e,{y:'+=14',rotation:'+=2',duration:3+k,yoyo:true,repeat:-1,ease:'sine.inOut'}));
const card=p=>{const disc=p.old?Math.round((1-p.price/p.old)*100):0;return `<a class="card${p.images[1]?' has2':''}" href="product.html?id=${p.id}" data-id="${p.id}" data-flip-id="${p.id}">
 <div class="ph"><img class="a" src="${p.images[0]}" alt="${p.name}" loading="lazy">${p.images[1]?`<img class="b" src="${p.images[1]}" alt="" loading="lazy">`:''}
 ${disc?`<span class="tag">−${disc}%</span>`:''}<button class="heart${Z.favs.has(p.id)?' on':''}" data-fav aria-label="В избранное">${Z.heart}</button><button class="qv" data-qv>Быстрый просмотр</button></div>
 <div class="meta"><small>${p.catName} · ${p.material}</small><h3>${p.name}</h3><div class="pr"><b>${Z.fmt(p.price)}</b>${p.old?`<s>${Z.fmt(p.old)}</s>`:''}</div></div></a>`;};
const list=()=>{let L=P.filter(p=>(S.fav?Z.favs.has(p.id):(S.cat==='all'||p.cat===S.cat))&&(S.mat==='Все'||p.material===S.mat)&&p.price>=S.min&&p.price<=S.max);
 if(S.sort==='asc')L.sort((a,b)=>a.price-b.price);if(S.sort==='desc')L.sort((a,b)=>b.price-a.price);if(S.sort==='sale')L.sort((a,b)=>(b.old?1-b.price/b.old:0)-(a.old?1-a.price/a.old:0));return L;};
const grid=$('#grid');
function render(anim=true){const L=list();const V=L.slice(0,S.shown);
 const state=window.Flip&&anim&&!Z.CAPTURE?Flip.getState('.card'):null;
 const keep=new Map([...grid.querySelectorAll('.card')].map(e=>[e.dataset.id,e]));grid.innerHTML='';
 V.forEach(p=>{let el=keep.get(p.id);if(!el){const t=document.createElement('div');t.innerHTML=card(p);el=t.firstElementChild;}grid.appendChild(el);});
 if(!V.length)grid.innerHTML='<div class="empty">'+(S.fav?'В избранном пока пусто':'По выбранным параметрам изделий нет')+'</div>';
 $('#total').textContent=L.length;$('#pinfo').textContent=`Показано ${V.length} из ${L.length}`;$('#pbar').style.width=(L.length?V.length/L.length*100:0)+'%';$('#loadmore').style.display=V.length<L.length?'':'none';
 if(state)Flip.from(state,{duration:.8,ease:'power3.inOut',absolute:true,stagger:.015,onEnter:e=>gsap.fromTo(e,{opacity:0,y:40,scale:.96},{opacity:1,y:0,scale:1,duration:.8,ease:'power3.out',stagger:.04}),onLeave:e=>gsap.to(e,{opacity:0,scale:.94,duration:.4})});
 Z.bind(grid);}
render(false);
$('#tabs').addEventListener('click',e=>{const t=e.target.closest('.tab');if(!t)return;document.querySelectorAll('.tab').forEach(x=>x.classList.toggle('on',x===t));S.fav=t.dataset.c==='fav';if(!S.fav)S.cat=t.dataset.c;S.shown=12;history.replaceState(0,'','?cat='+S.cat);render();});
$('#mats').addEventListener('click',e=>{const t=e.target.closest('.chip');if(!t)return;document.querySelectorAll('.chip').forEach(x=>x.classList.toggle('on',x===t));S.mat=t.dataset.m;S.shown=12;render();});
[mn,mx].forEach(i=>{i.addEventListener('input',function(){pr.call(this)});i.addEventListener('change',()=>render());});
$('#sort').addEventListener('change',e=>{S.sort=e.target.value;render();});
$('#loadmore').addEventListener('click',()=>{S.shown+=12;render();});
grid.addEventListener('click',e=>{const c=e.target.closest('.card');if(!c)return;if(!e.target.closest('[data-fav],[data-qv]')){const im=c.querySelector('img.a');if(im)im.style.viewTransitionName='pimg';}const p=P.find(x=>x.id===c.dataset.id);
 if(e.target.closest('[data-fav]')){e.preventDefault();Z.toggleFav(p.id,e.target.closest('[data-fav]'));if(S.fav)render();}
 else if(e.target.closest('[data-qv]')){e.preventDefault();qv(p);}});
// quick view
const M=$('#qvm');
function qv(p){const im=M.querySelector('.im>img');im.src=p.images[0];
 M.querySelector('.th').innerHTML=p.images.slice(0,5).map((s,k)=>`<button class="${k?'':'on'}" data-s="${s}"><img src="${s}" alt=""></button>`).join('');
 const sp=p.specs.slice(0,5).map(([a,b])=>`<dt>${a}</dt><dd>${b}</dd>`).join('');
 M.querySelector('.tx').innerHTML=`<small class="sc" style="font-size:13px;letter-spacing:.24em;color:var(--gold3)">${p.catName} · арт. ${p.art}</small><h3>${p.name}</h3><div class="pr"><b>${Z.fmt(p.price)}</b>${p.old?`<s>${Z.fmt(p.old)}</s>`:''}</div><dl>${sp}</dl>
 <div class="act"><a class="btn solid" href="product.html?id=${p.id}">Подробнее</a><button class="btn" data-cart>В корзину</button></div>`;
 M.querySelector('[data-cart]').onclick=()=>{Z.cart.push(p.id);Z.save();Z.toast('Добавлено в корзину','макет · без оформления заказа');};
 M.classList.add('on');Z.bind(M);}
M.addEventListener('click',e=>{const b=e.target.closest('.th button');if(b){M.querySelectorAll('.th button').forEach(x=>x.classList.toggle('on',x===b));M.querySelector('.im>img').src=b.dataset.s;}
 if(e.target.classList.contains('sh')||e.target.classList.contains('x'))M.classList.remove('on');});
addEventListener('keydown',e=>{if(e.key==='Escape')M.classList.remove('on');});
Z.bind();window.__ready=true;
})();
