(async()=>{
const D=await Z.load();const P=D.products;const id=new URLSearchParams(location.search).get('id');
const p=P.find(x=>x.id===id)||P.find(x=>x.home)||P[0];document.title=p.name+' — ЗАВАРИН';
const $=s=>document.querySelector(s);
// gallery
const imgs=p.images;const view=$('#view');
$('#thumbs').innerHTML=`<button class="v on" data-k="-1" aria-label="Витрина"><img src="${p.cut}" alt=""><span>витрина</span></button>`+imgs.map((s,k)=>`<button data-k="${k}"><img src="${s}" alt=""></button>`).join('');
const cut=$('#cut');cut.src=p.cut;cut.onload=()=>view.querySelector('.cutw').style.setProperty('--ar',cut.naturalWidth/cut.naturalHeight);
view.querySelector('.sw').style.setProperty('--m',`url("${p.cut}")`);
const show=k=>{document.querySelectorAll('#thumbs button').forEach(b=>b.classList.toggle('on',+b.dataset.k===k));
 if(k<0){view.classList.remove('ph');$('#hint').textContent='Витрина';$('#vcnt').textContent='';}
 else{view.classList.add('ph');$('#photo').src=imgs[k];$('#hint').textContent='Наведите для увеличения';$('#vcnt').textContent=String(k+1).padStart(2,'0')+' / '+String(imgs.length).padStart(2,'0');}
 view._k=k;};
$('#thumbs').addEventListener('click',e=>{const b=e.target.closest('button');if(b)show(+b.dataset.k);});
show(-1);
const lens=$('#lens');const Zm=2.6;
view.addEventListener('mousemove',e=>{if(view._k<0){const r=view.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
  if(window.gsap)gsap.to('.cutw',{rotationY:x*14,rotationX:-y*10,x:x*20,y:y*14,duration:1,ease:'power3.out',transformPerspective:900});return;}
 const r=view.getBoundingClientRect(),im=$('#photo');const x=e.clientX-r.left,y=e.clientY-r.top;
 lens.style.left=(x-110)+'px';lens.style.top=(y-110)+'px';lens.style.backgroundImage=`url("${im.src}")`;
 lens.style.backgroundSize=(r.width*Zm)+'px '+(r.height*Zm)+'px';lens.style.backgroundPosition=`${-(x*Zm-110)}px ${-(y*Zm-110)}px`;});
// swipe on touch
let sx=0;view.addEventListener('touchstart',e=>sx=e.touches[0].clientX,{passive:true});view.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>40){let k=(view._k??-1)+(d<0?1:-1);k=Math.max(-1,Math.min(imgs.length-1,k));show(k);}});
// info
const disc=p.old?Math.round((1-p.price/p.old)*100):0;
const mcls=p.material==='Серебро'?'s':p.material==='Золото и серебро'?'gs':'';
const ringRange=(o)=>{if(p.cat==='rings'&&o.label==='Размер изделия'&&o.v.length===2){const a=parseFloat(o.v[0].replace(',','.')),b=parseFloat(o.v[1].replace(',','.'));const r=[];for(let x=a;x<=b+1e-6;x+=.5)r.push(String(x).replace('.',','));return r;}return o.v;};
const opts=p.options.map((o,i)=>{const v=ringRange(o);return `<div class="opt"><h4>${o.label}<span data-o="${i}">${v[0]}</span></h4><div class="vals" data-g="${i}">${v.map((x,k)=>`<button class="${k?'':'on'}">${x}</button>`).join('')}</div></div>`;}).join('');
const para=a=>a.map(x=>`<p>${x}</p>`).join('');
const I=D.info;
$('#info').innerHTML=`<div class="crumbs reveal"><a href="index.html">Главная</a><span>/</span><a href="catalog.html">Каталог</a><span>/</span><a href="catalog.html?cat=${p.cat}">${p.catName}</a></div>
<div class="art reveal" data-d=".05">Артикул: ${p.art}</div><h1 class="reveal" data-d=".1">${p.name}</h1>
<div class="pr reveal" data-d=".15"><b>${Z.fmt(p.price)}</b>${p.old?`<s>${Z.fmt(p.old)}</s><em>−${disc}%</em>`:''}</div>
<div class="note reveal" data-d=".18">Стоимость изделия может быть скорректирована с учётом стоимости металла по курсу ЦБ РФ.</div>
${p.metal?`<div class="metal reveal" data-d=".2"><i class="${mcls}"></i>Металл: ${p.metal}</div>`:''}
<div class="reveal" data-d=".22">${opts}</div>
<div class="buy reveal" data-d=".26"><button class="btn solid b1" id="add" data-magnetic>Добавить в корзину</button><button class="btn" id="buy1" data-magnetic>Купить в 1 клик</button><button class="heart${Z.favs.has(p.id)?' on':''}" id="fav" aria-label="В избранное">${Z.heart}</button></div>
<div class="acc reveal" data-d=".3">
 <details open><summary>Параметры</summary><div class="bd"><dl>${p.specs.map(([a,b])=>`<dt>${a}</dt><dd>${b}</dd>`).join('')}</dl></div></details>
 ${p.custom?`<details><summary>Хотите изменить изделие?</summary><div class="bd"><p>${p.custom}</p></div></details>`:''}
 <details><summary>Доставка и оплата</summary><div class="bd">${para(I.delivery.slice(0,9))}<a class="src" href="https://zavarin.art/delivery/" target="_blank" rel="noopener">Подробнее на zavarin.art →</a></div></details>
 <details><summary>Уход за изделием</summary><div class="bd">${para(I.care)}</div></details>
 <details><summary>Гарантии</summary><div class="bd">${para(I.guarantee.slice(0,8))}<a class="src" href="https://zavarin.art/guarantee/" target="_blank" rel="noopener">Подробнее на zavarin.art →</a></div></details>
 <details><summary>Страница изделия на сайте</summary><div class="bd"><a class="src" href="${p.url}" target="_blank" rel="noopener">${p.url.replace('https://','')}</a></div></details>
</div>`;
$('#info').addEventListener('click',e=>{const b=e.target.closest('.vals button');if(!b)return;const g=b.parentElement;g.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));$(`[data-o="${g.dataset.g}"]`).textContent=b.textContent;});
const sel=()=>[...document.querySelectorAll('.opt')].map(o=>o.querySelector('h4').firstChild.textContent+': '+o.querySelector('.on').textContent).join(', ');
$('#add').onclick=e=>{Z.cart.push(p.id);Z.save();const b=e.currentTarget;b.textContent='Добавлено ✓';b.classList.add('added');setTimeout(()=>{b.textContent='Добавить в корзину';b.classList.remove('added')},2200);Z.toast('Добавлено в корзину',(sel()||p.art)+' · макет');};
$('#buy1').onclick=()=>Z.toast('Покупка в 1 клик','макет · заказ не оформляется');
$('#fav').onclick=e=>Z.toggleFav(p.id,e.currentTarget);
// related
let R=P.filter(x=>x.cat===p.cat&&x.id!==p.id);R=R.concat(P.filter(x=>x.cat!==p.cat&&x.id!==p.id)).slice(0,10);
$('#track').innerHTML=R.map(x=>`<a class="card reveal" href="product.html?id=${x.id}"><div class="ph"><img src="${x.images[0]}" alt="${x.name}" loading="lazy"></div><div class="meta"><small>${x.catName} · ${x.material}</small><h3>${x.name}</h3><div class="pr"><b>${Z.fmt(x.price)}</b>${x.old?`<s>${Z.fmt(x.old)}</s>`:''}</div></div></a>`).join('');
document.querySelectorAll('.arr button').forEach(b=>b.onclick=()=>{const t=$('#track');t.scrollBy({left:+b.dataset.d*t.clientWidth*.75});});
Z.bind();window.__ready=true;
})();
