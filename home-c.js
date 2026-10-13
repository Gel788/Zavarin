(()=>{const C=window.CV||{rm:true},$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])),fmt=n=>'<span class="nm">'+Math.round(n).toLocaleString('ru-RU').replace(/[\u00a0\u202f ,]/g,'\u202f')+'<span class="rb">\u00a0₽</span></span>';
$$('.cv-word .lt>span').forEach((s,i,a)=>s.style.setProperty('--k',Math.abs(i-(a.length-1)/2)));
/* marquee of real products */
const card=(p,d)=>`<a href="product.html?id=${p.id}"${d?' aria-hidden="true" tabindex="-1"':''}><div class="im"><img src="img/cine/m/${p.cut.split('/').pop().replace('.png','.webp')}"${p.hd&&window.Z?Z.ss(p.hd.c.filter(w=>w<=960),'cut',p.cut):''} sizes="240px" alt="${d?'':esc(p.name)}" loading="lazy" width="400" height="380"></div><h3>${esc(p.name)}</h3><p>${fmt(p.price)}${p.old?`<s>${fmt(p.old)}</s>`:''}</p></a>`;
fetch('products.json').then(r=>r.json()).then(d=>{const P=d.products.filter(p=>p.cut&&p.cat!=='aksessuary');const A=P.filter((_,i)=>i%2==0).slice(0,12),B=P.filter((_,i)=>i%2==1).slice(0,12);
 [[$('#mq1'),A],[$('#mq2'),B]].forEach(([el,L])=>{if(!el)return;el.innerHTML=L.map(p=>card(p)).join('')+(C.rm?'':L.map(p=>card(p,1)).join(''))});
 if(!C.rm)marq()}).catch(()=>{});
function marq(){const tw=[gsap.fromTo('#mq1',{xPercent:0},{xPercent:-50,duration:70,ease:'none',repeat:-1}),gsap.fromTo('#mq2',{xPercent:-50},{xPercent:0,duration:80,ease:'none',repeat:-1})];
 ScrollTrigger.create({trigger:'.cv-mq',start:'top bottom',end:'bottom top',onUpdate:s=>{const v=Math.min(6,Math.abs(s.getVelocity())/400);tw.forEach(t=>{t.timeScale(1+v);gsap.to(t,{timeScale:1,duration:1.2,overwrite:true})})},onToggle:s=>tw.forEach(t=>s.isActive?t.resume():t.pause())});}
/* quote words */
const q=$('.cv-quote');const W=[];if(q){const wrap=(node)=>{[...node.childNodes].forEach(n=>{if(n.nodeType===3){const f=document.createDocumentFragment();n.textContent.split(/( )/).forEach(t=>{if(t===' ')f.appendChild(document.createTextNode(' '));else if(t){const s=document.createElement('span');s.className='w';s.textContent=t;f.appendChild(s);W.push(s)}});n.replaceWith(f)}else if(n.nodeType===1)wrap(n)})};wrap(q)}
if(C.rm)return;
requestAnimationFrame(()=>requestAnimationFrame(()=>document.documentElement.classList.add('cv-in')));
const mob=matchMedia('(max-width:760px)').matches,hm=matchMedia('(max-width:768px),(max-height:520px) and (orientation:landscape) and (max-width:1024px)').matches;
/* HERO cinematography */
const F=$$('.cv-f'),obj=$('#cvobj'),L=$$('.cv-word .lt'),caps=$$('.cv-cap'),n=$('#cvn'),st=$('.cv-st');
if(!hm){st.insertAdjacentHTML('beforeend','<span class="cv-fade" aria-hidden="true" style="position:absolute;inset:0;background:#f3eee4;opacity:0;pointer-events:none"></span>');
gsap.set(obj,{xPercent:-50,yPercent:-50,left:'50%',top:mob?'40%':'50%',transform:'none'});gsap.set(obj,{xPercent:-50,yPercent:-50});
let lk=-1;const tl=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{trigger:'.cv',start:'top top',end:'bottom bottom',scrub:.7,onUpdate:s=>{const p=s.progress,k=p<.31?0:p<.5?1:2;if(k!==lk){lk=k;caps.forEach((c,i)=>c.classList.toggle('on',i===k));n.textContent='0'+(k+1)}}}});
tl.to(L,{xPercent:i=>(i-3)*(mob?22:34),opacity:.06,duration:2.6},0)
 .to(obj,{scale:mob?1.25:1.4,rotate:-3,duration:2.6},0)
 .to('.cv-l,.cv-sc',{y:-30,opacity:0,duration:1.2},.5)
 .to(F[0],{scaleX:0,duration:.8,ease:'power2.in'},2.7)
 .set(F[0],{opacity:0},3.5).set(F[1],{opacity:1,scaleX:0},3.5)
 .to(F[1],{scaleX:1,duration:.8,ease:'power2.out'},3.5)
 .to(obj,{rotate:2,scale:mob?1.35:1.55,duration:1.6},2.7)
 .to(F[1],{opacity:0,scale:.88,duration:1},5)
 .fromTo(F[2],{opacity:0,scale:1.25,rotate:-10},{opacity:1,scale:1,rotate:0,duration:1.2},5)
 .to(obj,{rotate:0,scale:1.1,duration:1.2},5)
 .to(obj,{scale:mob?2.6:3.2,x:mob?'4vw':'16vw',y:mob?'-4vh':'-2vh',duration:2,ease:'power1.inOut'},6.6)
 .to('.cv-r',{opacity:0,duration:.6},6.6)
 .fromTo('.cv-macro',{opacity:0,y:30},{opacity:1,y:0,duration:.8},7.3)
 .to('.cv-macro',{opacity:0,duration:.5},8.8)
 .to(obj,{scale:mob?8:10,opacity:0,duration:1.6,ease:'power2.in'},8.8)
 .to('.cv-top',{opacity:0,duration:.6},8.8)
 .to('.cv-fade',{opacity:1,duration:.7},9.7);
}
/* quote scrub */
if(W.length)gsap.to(W,{opacity:1,stagger:.1,ease:'none',scrollTrigger:{trigger:q,start:'top 82%',end:'bottom 42%',scrub:.5}});
gsap.to('.cv-q',{backgroundColor:'#0b0b0c',color:'#ece7dd',ease:'none',scrollTrigger:{trigger:'.cv-q',start:'bottom 75%',end:'bottom 15%',scrub:true}});
/* giant numbers */
$$('.cv-nums b').forEach((b,i)=>{const v=+b.dataset.n,o={v:v<1000?0:v-120};gsap.from(b,{yPercent:105,duration:1.4,ease:'expo.out',delay:i*.08,scrollTrigger:{trigger:'.cv-nums',start:'top 88%',once:true}});gsap.to(o,{v,duration:2,ease:'expo.out',delay:i*.08,scrollTrigger:{trigger:'.cv-nums',start:'top 88%',once:true},onUpdate:()=>b.textContent=Math.round(o.v)})});
/* horizontal collections */
const tr=$('.cv-track'),hs=$('.cv-hs'),bar=$('.cv-hb i'),hp=$('.cv-hp b'),P=$$('.cv-p');const dist=()=>Math.max(0,tr.scrollWidth-innerWidth);
const ht=gsap.to(tr,{x:()=>-dist(),ease:'none',scrollTrigger:{trigger:hs,pin:true,start:'top top',end:()=>'+='+dist()*1.1,scrub:.7,invalidateOnRefresh:true,anticipatePin:1,onUpdate:s=>{bar.style.transform=`scaleX(${s.progress})`;hp.textContent='0'+Math.min(P.length,1+Math.round(s.progress*(P.length-1)))}}});
P.forEach((p,i)=>{const im=p.querySelector('.im'),img=p.querySelector('img');
 if(i>0)gsap.fromTo(im,{clipPath:'inset(0 0 0 100%)'},{clipPath:'inset(0 0 0 0%)',ease:'power2.out',scrollTrigger:{trigger:p,containerAnimation:ht,start:'left 100%',end:'left 55%',scrub:true}});
 gsap.fromTo(img,{scale:1.18,xPercent:-5},{xPercent:5,ease:'none',scrollTrigger:{trigger:p,containerAnimation:ht,start:'left right',end:'right left',scrub:true}});
 gsap.from(p.querySelector('h3'),{yPercent:60,opacity:0,ease:'power2.out',scrollTrigger:{trigger:p,containerAnimation:ht,start:'left 85%',end:'left 50%',scrub:true}})});
gsap.fromTo(P[0].querySelector('.im'),{clipPath:'inset(100% 0 0 0)'},{clipPath:'inset(0% 0 0 0)',duration:1.4,ease:'expo.out',scrollTrigger:{trigger:hs,start:'top 70%',once:true}});
gsap.from('.cv-ht .h2',{yPercent:40,opacity:0,duration:1.2,ease:'expo.out',scrollTrigger:{trigger:hs,start:'top 70%',once:true}});
})();
