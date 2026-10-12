(()=>{const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const hd=$('#hd');if(hd){const on=()=>hd.classList.toggle('s',scrollY>40||hd.dataset.solid==='1');on();addEventListener('scroll',on,{passive:true})}
const mm=$('#mm'),b=$('#burg');if(mm&&b){const set=v=>{mm.classList.toggle('on',v);b.setAttribute('aria-expanded',v);document.body.style.overflow=v?'hidden':'';if(v)$('#mmx').focus();else b.focus()};
b.onclick=()=>set(true);$('#mmx').onclick=()=>set(false);mm.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>set(false)));addEventListener('keydown',e=>{if(e.key==='Escape'&&mm.classList.contains('on'))set(false)})}
const get=k=>{try{return JSON.parse(localStorage.getItem(k)||'[]')}catch(e){return[]}};
const counts=()=>{const f=get('zfav').length,c=get('zcart').length;$$('[data-fav-count]').forEach(e=>e.textContent=f||'');$$('[data-cart-count]').forEach(e=>e.textContent=c||'')};counts();addEventListener('storage',counts);
if(window.Z){const s=Z.save.bind(Z);Z.save=function(){s();counts();if(cd&&cd.classList.contains('on'))renderCart()};Z.counts=counts}
const fmt=n=>n.toLocaleString('ru-RU').replace(/\u00a0|,/g,' ')+' ₽',esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let DATA=null;const load=()=>DATA?Promise.resolve(DATA):fetch('products.json').then(r=>r.json()).then(d=>DATA=d);
/* cart drawer */
document.body.insertAdjacentHTML('beforeend','<div class="cd" id="cd" role="dialog" aria-modal="true" aria-labelledby="cdh"><div class="sc" data-cd-close></div><div class="pn"><h2 id="cdh">Корзина</h2><button class="x" data-cd-close aria-label="Закрыть корзину">×</button><div id="cdb"></div></div></div>');
const cd=$('#cd');let last;
function renderCart(){load().then(d=>{const ids=get('zcart'),L=ids.map((id,i)=>[i,d.products.find(p=>p.id===id)]).filter(x=>x[1]);
 $('#cdb').innerHTML=L.length?`<ul>${L.map(([i,p])=>`<li><img src="${p.images[0]}" alt=""><div><b>${esc(p.name)}</b><span>${fmt(p.price)}</span></div><button data-rm="${i}" aria-label="Удалить ${esc(p.name)}">Удалить</button></li>`).join('')}</ul><div class="tot"><span>Итого</span><span>${fmt(L.reduce((a,x)=>a+x[1].price,0))}</span></div><a class="btn ink" style="width:100%" href="tel:88006008533">Оформить по телефону</a><p class="nt">Макет: заказ оформляется через клиентский сервис 8 800 600-85-33 или на zavarin.art.</p>`:'<p class="em">В корзине пока нет изделий.</p><a class="btn ink" href="catalog.html">Перейти в каталог</a>';
})}
const openCart=()=>{last=document.activeElement;cd.classList.add('on');document.body.style.overflow='hidden';renderCart();setTimeout(()=>cd.querySelector('.x').focus(),30)};
const closeCart=()=>{cd.classList.remove('on');document.body.style.overflow='';last&&last.focus()};
document.addEventListener('click',e=>{if(e.target.closest('[data-cart-open]')){e.preventDefault();openCart()}if(e.target.closest('[data-cd-close]'))closeCart();const r=e.target.closest('[data-rm]');if(r){const c=get('zcart');c.splice(+r.dataset.rm,1);localStorage.setItem('zcart',JSON.stringify(c));if(window.Z)Z.cart=c;counts();renderCart()}});
addEventListener('keydown',e=>{if(e.key==='Escape'&&cd.classList.contains('on'))closeCart();if(e.key==='Tab'&&cd.classList.contains('on')){const f=[...cd.querySelectorAll('a,button')];if(!f.length)return;const a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}});
if(new URLSearchParams(location.search).get('open')==='cart')openCart();
/* reveal */
const io='IntersectionObserver'in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{rootMargin:'0px 0px -8% 0px'}):null;
const watch=r=>r.querySelectorAll('.rv').forEach(el=>io?io.observe(el):el.classList.add('in'));watch(document);window.LUX={watch,fmt,esc,load,counts};
/* home featured */
const el=$('#cards');if(el){const ids=['krest-na-shnure-01-21-00155-02-8','koltso-02-22-00034-7-1','ikona-06-25-01460-00-1','krest-07-21-07550-00-1'];
load().then(d=>{el.innerHTML=ids.map(i=>d.products.find(p=>p.id===i)).filter(Boolean).map(p=>`<a class="card rv" href="product.html?id=${p.id}"><div class="ph"><img src="${p.images[0]}" width="900" height="900" loading="lazy" alt="${esc(p.name)}">${p.images[1]?`<img src="${p.images[1]}" width="900" height="900" loading="lazy" alt="" aria-hidden="true">`:''}</div><h3>${esc(p.name)}</h3><p>${fmt(p.price)}${p.old?`<s>${fmt(p.old)}</s>`:''}</p></a>`).join('');el.style.display='';watch(el)}).catch(()=>{})}
})();
(()=>{const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;if(RM)return;
const H=document.documentElement;H.classList.add('mo');const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const mob=()=>innerWidth<768;const pinOK=()=>innerWidth>=1100&&innerHeight>=640;
/* line-by-line mask headings */
const split=el=>{if(el.dataset.sp)return;el.dataset.sp=1;const words=[];const walk=(n,wrap)=>{[...n.childNodes].forEach(c=>{if(c.nodeType===3){c.textContent.split(/(\s+)/).forEach(t=>{if(!t)return;if(/^\s+$/.test(t)){words.push(document.createTextNode(' '));return}const s=document.createElement('span');s.className='w';if(wrap){const e=wrap.cloneNode(false);e.textContent=t;s.appendChild(e)}else s.textContent=t;words.push(s)})}else if(c.nodeType===1){if(c.tagName==='BR'){words.push(c.cloneNode());return}walk(c,c)}})};walk(el,null);
 el.innerHTML='';words.forEach(w=>el.appendChild(w));const lines=[];let top=null,cur=null;[...el.childNodes].forEach(n=>{if(n.nodeType===1&&n.className==='w'){const t=n.offsetTop;if(t!==top){top=t;cur=[];lines.push(cur)}cur.push(n)}else if(cur)cur.push(n)});
 el.innerHTML='';lines.forEach((L,i)=>{const ln=document.createElement('span');ln.className='ln';const s=document.createElement('span');s.style.transitionDelay=i*110+'ms';L.forEach(n=>s.appendChild(n));ln.appendChild(s);el.appendChild(ln)});el.classList.add('split')};
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{rootMargin:'0px 0px -10% 0px'});
const prep=root=>{root.querySelectorAll('.h1,.h2,.cbn h1,.info h1,.mtitle h1').forEach(h=>{if(h.dataset.sp)return;h.classList.remove('rv');split(h);io.observe(h)});
 root.querySelectorAll('.col .ph,.ws .ph,.cust .ph,.gal .ph,.edt').forEach(p=>{if(p.dataset.cl)return;p.dataset.cl=1;p.classList.add('clip');io.observe(p)});
 root.querySelectorAll('.cards .card,.cols .col,.grid>.card').forEach((c,i)=>c.style.setProperty('--i',i%4))};
document.fonts?document.fonts.ready.then(()=>prep(document)):prep(document);
new MutationObserver(ms=>ms.forEach(m=>m.addedNodes.forEach(n=>{if(n.nodeType===1)requestAnimationFrame(()=>prep(n.parentNode||document))}))).observe(document.body,{childList:true,subtree:true});
/* section tint */
const tint=$$('main>section');const BG={dark:'#0b0b0c',graph:'#17181a',cust:'#e9e2d4'};
const bgOf=s=>s.classList.contains('hero')?'#0b0b0c':s.classList.contains('dark')?BG.dark:s.classList.contains('graph')?BG.graph:s.classList.contains('cust')?BG.cust:'#f3eee4';
if(document.body.dataset.tint!=='0')tint.forEach(s=>{s.dataset.bg=bgOf(s);if(!s.classList.contains('hero'))s.classList.add('tint')});
/* elements */
const hero=$('.hero'),cross=$('.hero .obj img'),htx=$('.hero .tx');if(hero){hero.insertAdjacentHTML('beforeend','<span class="lit" aria-hidden="true"></span><span class="shade" aria-hidden="true"></span>')}
const lit=$('.hero .lit'),shade=$('.hero .shade');
$$('.ws .ph,.cust .ph,.gal .ph').forEach(p=>p.classList.add('par'));
const hist=$('.hist'),tl=hist?[...hist.querySelectorAll('.tl div')]:[],yr=hist&&hist.querySelector('.yr');const yrs=['2013','2018','Сегодня'];
if(hist&&tl.length)hist.classList.add('pin');
const steps=$$('.steps li');const sl=$('.steps');if(sl){sl.insertAdjacentHTML('afterbegin','<span class="rail" aria-hidden="true"><i class="prog"></i></span>')}const prog=$('.steps .prog');
let tick=false;const vh=()=>innerHeight;
function frame(){tick=false;const y=scrollY,h=vh(),m=mob();
 if(hero){const p=Math.min(1,Math.max(0,y/hero.offsetHeight));if(cross)cross.style.transform=`translate3d(0,${p*(m?40:110)}px,0) scale(${1-p*.12}) rotate(${p*-2}deg)`;
  if(htx)htx.style.transform=`translate3d(0,${p*-60}px,0)`,htx.style.opacity=1-p*1.2;if(shade)shade.style.opacity=p*.9;if(lit)lit.style.backgroundPosition=`${100-p*100}% 0`}
 if(!m)$$('.par').forEach(p=>{const r=p.getBoundingClientRect();if(r.bottom<0||r.top>h)return;const k=(r.top+r.height/2-h/2)/h;const im=p.querySelector('img');if(im&&p.classList.contains('in'))im.style.transform=`translate3d(0,${k*-36}px,0) scale(1.08)`});
 if(hist&&hist.classList.contains('pin')){const r=hist.getBoundingClientRect();const p=Math.min(.999,Math.max(0,-r.top/(r.height-h)));const k=Math.floor(p*tl.length);tl.forEach((d,i)=>d.classList.toggle('on',i<=k));if(yr&&yr.dataset.k!=k){yr.dataset.k=k;yr.style.opacity=0;setTimeout(()=>{yr.textContent=yrs[k]||yrs[0];yr.style.fontSize=k===2?'clamp(72px,9vw,150px)':'';yr.style.opacity=1},220)}}
 if(sl){const r=sl.getBoundingClientRect();const p=Math.min(1,Math.max(0,(h*.65-r.top)/r.height));if(prog)prog.style.height=p*100+'%';steps.forEach(li=>{const b=li.getBoundingClientRect();li.classList.toggle('on',b.top<h*.65)})}
 if(tint.length&&document.body.dataset.tint!=='0'){let c='#f3eee4';for(const s of tint){const r=s.getBoundingClientRect();if(r.top<=h*.5&&r.bottom>h*.5){c=s.dataset.bg;break}}if(document.body.style.backgroundColor!==c)document.body.style.backgroundColor=c}}
const req=()=>{if(!tick){tick=true;requestAnimationFrame(frame)}};addEventListener('scroll',req,{passive:true});const pinSet=()=>{if(hist)hist.classList.toggle('pin',pinOK()&&tl.length>0)};addEventListener('resize',()=>{pinSet();req()});pinSet();frame();
})();
