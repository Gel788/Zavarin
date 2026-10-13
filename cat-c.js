(()=>{const C=window.CV||{rm:true},$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];document.documentElement.classList.add('cine-cat');
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])),fmt=n=>'<span class="nm">'+Math.round(n).toLocaleString('ru-RU').replace(/[\u00a0\u202f ,]/g,'\u202f')+'<span class="rb">\u00a0₽</span></span>';
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
 if(first)requestAnimationFrame(()=>(window.ZR?ZR():ScrollTrigger.refresh()));first=false;}
new MutationObserver(()=>{clearTimeout(prep.t);prep.t=setTimeout(prep,120)}).observe(grid,{childList:true});
fetch('products.json').then(r=>r.json()).then(d=>{P=d.products;deco()});
const fbH=()=>{const h=$('#hd'),f=$('.fb');document.documentElement.style.setProperty('--fbb',((h?h.offsetHeight:60)+(f?f.offsetHeight:0)-1)+'px')};fbH();addEventListener('resize',fbH);setTimeout(fbH,600);
if(!C.rm)setTimeout(prep,60);
})();
/* v11: category switcher previews, editorial grid, quick view */
(()=>{const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])),fmt=n=>'<span class="nm">'+Math.round(n).toLocaleString('ru-RU').replace(/[\u00a0\u202f ,]/g,'\u202f')+'<span class="rb">\u00a0₽</span></span>';
const TH={all:'krest-07-21-07550-00-1',crosses:'krest-07-23-07630-00-5',rings:'koltso-02-22-00034-7-1',icons:'ikona-06-25-01460-00-1',chains:'tsep-04-20-21208525-1',bracelets:'braslet-03-10-02103-1',cords:'shnur-05-12-03011-00-1',chetki:'chyetki-11-12-00001-40-1',aksessuary:'zaponki-20-32-00002-00-1'};
let P=[];const cut=p=>'img/cine/m/'+p.cut.split('/').pop().replace('.png','.webp'),big=p=>'img/cine/cut/'+p.cut.split('/').pop().replace('.png','.webp');
const tabs=$('#tabs');tabs.classList.add('tx');const deco=()=>{};
const grid=$('#grid');const cols=()=>{const n=getComputedStyle(grid).gridTemplateColumns.split(' ').filter(Boolean).length;grid.classList.toggle('wide',n>=3);grid.classList.toggle('one',n<2)};let cq=0;new MutationObserver(()=>{if(!cq)cq=requestAnimationFrame(()=>{cq=0;cols()})}).observe(grid,{childList:true,attributes:true,attributeFilter:['style']});addEventListener('resize',cols);cols();
fetch('products.json').then(r=>r.json()).then(d=>{P=d.products;deco()});})();
