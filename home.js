(async()=>{
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;if(RM)document.documentElement.classList.add('rm');
const D=await Z.load();const P=D.products;const by=id=>P.find(p=>p.id===id);const $=s=>document.querySelector(s);
/* hero */
const S=[
 {img:'women',eb:'Женская коллекция',t:'Подлинная красота',p:'Вся красота православной веры – в женской коллекции ЗАВАРИН.',cat:'crosses',pk:'krest-07-23-07630-00-5'},
 {img:'icons-family',eb:'Иконы',t:'Ваша семейная ценность',p:'Иконы, которые будут передаваться из поколения в поколение.',cat:'icons',pk:'ikona-06-25-01460-00-1'},
 {img:'rings',eb:'Кольца',t:'То самое кольцо',p:'Выбирайте то, что вам по душе, в галерее православных колец бренда.',cat:'rings',pk:'koltso-02-22-00034-7-1'},
 {img:'bracelets-men',eb:'Мужские браслеты',t:'Браслеты с характером',p:'Изделия, в которых читается стиль, характер, а главное – любовь к Богу.',cat:'bracelets',pk:'krest-07-21-07550-00-1'}];
$('#slides').innerHTML=S.map((s,k)=>{const p=by(s.pk);return `<div class="hs${k?'':' on'}" role="group" aria-label="${k+1} из ${S.length}"><picture><source media="(max-width:600px)" srcset="img/ed/${s.img}-m.jpg"><img class="bg" src="img/ed/${s.img}.jpg" alt="" ${k?'loading="lazy"':'fetchpriority="high"'}></picture>
 <div class="tx"><span class="eb">${s.eb}</span>${k?'<h2>':'<h1>'}${s.t}${k?'</h2>':'</h1>'}<p>${s.p}</p><div class="row"><a class="btn solid" href="catalog.html?cat=${s.cat}">Перейти к покупкам</a><a class="btn" href="product.html?id=${p.id}">Изделие в кадре</a></div></div>
 <a class="pk" href="product.html?id=${p.id}"><div class="im"><img src="${p.cut}" alt="${p.name}"></div><small>Рекомендуем</small><b>${p.name}</b><span>${Z.fmt(p.price)}</span></a></div>`}).join('');
$('#bars').innerHTML=S.map((s,k)=>`<button class="${k?'':'on'}" aria-label="Слайд ${k+1}">${String(k+1).padStart(2,'0')} · ${s.eb}<i></i></button>`).join('');
const hs=[...document.querySelectorAll('.hs')],bars=[...document.querySelectorAll('#bars button')];let cur=0,tm;
const show=k=>{cur=(k+S.length)%S.length;hs.forEach((h,i)=>h.classList.toggle('on',i===cur));bars.forEach((b,i)=>{b.classList.remove('on');void b.offsetWidth;b.classList.toggle('on',i===cur);});plan();};
const plan=()=>{clearTimeout(tm);if(!RM&&!Z.CAPTURE)tm=setTimeout(()=>{if(!$('#hero').classList.contains('paused'))show(cur+1);else plan();},7000);};
bars.forEach((b,i)=>b.onclick=()=>show(i));$('#hp').onclick=()=>show(cur-1);$('#hn').onclick=()=>show(cur+1);
$('#hero').addEventListener('mouseenter',()=>$('#hero').classList.add('paused'));$('#hero').addEventListener('mouseleave',()=>$('#hero').classList.remove('paused'));
let sx=0;$('#hero').addEventListener('touchstart',e=>sx=e.touches[0].clientX,{passive:true});$('#hero').addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>50)show(cur+(d<0?1:-1));});
addEventListener('keydown',e=>{const r=$('#hero').getBoundingClientRect();if(r.bottom<0)return;if(e.key==='ArrowRight')show(cur+1);if(e.key==='ArrowLeft')show(cur-1);});
plan();
/* categories */
const C=[['crosses','Кресты','t','cut',by('krest-07-21-07550-00-1').cut,'Золото · серебро · агат · финифть · эбен'],['rings','Кольца','w','img','img/ed/rings.jpg','Выбирайте то, что вам по душе, в галерее православных колец бренда.'],['icons','Иконы','','img','img/ed/icons-family.jpg','Нательные, автомобильные и настольные иконы.'],
 ['bracelets','Браслеты','','img','img/ed/bracelets.jpg','В каждом плетёном браслете ЗАВАРИН – ваша история встречи с Богом.'],['chetki','Чётки','','img','img/ed/chetki.jpg','Созданы талантливыми ювелирами для вашей сердечной молитвы.'],['chains','Цепи','','cut',(P.find(p=>p.cat==='chains')||{}).cut,'Золото 585 · серебро 925 · агат'],
 ['cords','Шнуры','w','cut',(P.find(p=>p.cat==='cords')||{}).cut,'Шнуры со вставками из серебра и агата'],['aksessuary','Аксессуары','w','cut',(P.find(p=>p.cat==='aksessuary')||{}).cut,'Запонки и зажимы для галстука из серебра и агата']];
$('#catgrid').innerHTML=C.map(([k,n,cl,t,src,tx],i)=>`<a class="cat ${cl} ${t==='cut'?'pr':''} rv" href="catalog.html?cat=${k}"><img class="${t==='cut'?'c':'a'}" src="${src}" alt="" loading="lazy"><span class="n">0${i+1}</span><div class="lb"><h3>${n}</h3><div class="rv2 rv"></div></div></a>`).join('');
document.querySelectorAll('.cat').forEach((a,i)=>{const r=a.querySelector('.rv2');r.className='rv';r.style.opacity='';r.innerHTML=`${C[i][5]}<br><u>Смотреть →</u>`;});
/* arrivals */
const NEW=P.filter(p=>p.home===2),REST=P.filter(p=>p.home!==2&&p.images[1]).slice(0,8);
$('#trk').innerHTML=[...NEW.map(p=>[p,1]),...REST.map(p=>[p,0])].map(([p,n])=>`<a class="pc" href="product.html?id=${p.id}" draggable="false"><div class="ph">${n?'<span class="tag">Новинка</span>':''}<img class="a" src="${p.images[0]}" alt="${p.name}" loading="lazy"><img class="b" src="${p.images[1]||p.images[0]}" alt="" loading="lazy"></div><h3>${p.name}</h3><div class="pr">${Z.fmt(p.price)}${p.old?`<s>${Z.fmt(p.old)}</s>`:''}</div></a>`).join('');
const trk=$('#trk');const prog=()=>{const m=trk.scrollWidth-trk.clientWidth;const w=trk.clientWidth/trk.scrollWidth*100;$('#cprog').style.width=w+'%';$('#cprog').style.transform=`translateX(${m?trk.scrollLeft/m*(100/w*100-100):0}%)`;};trk.addEventListener('scroll',prog,{passive:true});addEventListener('resize',prog);prog();
document.querySelectorAll('.cnav button').forEach(b=>b.onclick=()=>trk.scrollBy({left:+b.dataset.d*trk.clientWidth*.8,behavior:RM?'auto':'smooth'}));
(()=>{let d=0,sx=0,sl=0,mv=0,v=0,lx=0,raf;trk.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')return;d=1;mv=0;sx=lx=e.clientX;sl=trk.scrollLeft;trk.style.scrollSnapType='none';cancelAnimationFrame(raf);e.preventDefault();});
 addEventListener('pointermove',e=>{if(!d)return;v=e.clientX-lx;lx=e.clientX;mv=Math.abs(e.clientX-sx);trk.scrollLeft=sl-(e.clientX-sx);});
 addEventListener('pointerup',()=>{if(!d)return;d=0;const g=()=>{v*=.92;trk.scrollLeft-=v;if(Math.abs(v)>.5&&!RM)raf=requestAnimationFrame(g);else trk.style.scrollSnapType='';};raf=requestAnimationFrame(g);});
 trk.addEventListener('click',e=>{if(mv>6){e.preventDefault();mv=0;}},true);})();
/* collections */
const K=[['Финифть','Синтез уникального дизайна изделий ЗАВАРИН и традиций ростовской финифти, известной во всём мире.','img/ed/icon-home.jpg',by('ikona-06-25-01460-00-1').cut,'icons'],
 ['Агат','Творческая работа ювелирного дома, вдохновлённая природной красотой натурального агата.','img/ed/agate-craft.jpg',by('krest-07-23-07630-00-5').cut,'crosses'],
 ['Ковчег','Мужская коллекция авторских нательных крестов на шнурах-гайтанах с ликами, молитвами и символами православной веры.','img/ed/bracelets-men.jpg',by('krest-na-shnure-01-21-00155-02-8').cut,'crosses']];
$('#cvis').innerHTML=K.map((k,i)=>`<div class="s${i?'':' on'}"><img class="bg" src="${k[2]}" alt="" loading="lazy"><img class="c" src="${k[3]}" alt="Коллекция «${k[0]}»" loading="lazy"></div>`).join('');
const ctx=$('#ctx');let ck=0,ctm;
const col=i=>{ck=i;document.querySelectorAll('.cvis .s').forEach((s,j)=>s.classList.toggle('on',j===i));
 ctx.innerHTML=`<div class="eb">Авторские коллекции</div><div class="num">${['I','II','III'][i]}</div><h3>«${K[i][0]}»</h3><p>${K[i][1]}</p><a class="lnk" href="catalog.html?cat=${K[i][4]}" style="margin-top:26px">Смотреть изделия →</a><div class="tabs">${K.map((k,j)=>`<button class="${j===i?'on':''}" data-i="${j}">${k[0]}</button>`).join('')}</div>`;
 clearTimeout(ctm);if(!RM&&!Z.CAPTURE)ctm=setTimeout(()=>col((ck+1)%K.length),8000);};
ctx.addEventListener('click',e=>{const b=e.target.closest('.tabs button');if(b)col(+b.dataset.i);});col(0);
/* motion */
Z.bind();
if(window.gsap&&window.ScrollTrigger&&!RM&&!Z.CAPTURE){gsap.registerPlugin(ScrollTrigger);if(Z.lenis)Z.lenis.on('scroll',ScrollTrigger.update);
 document.querySelectorAll('.rv').forEach(el=>{if(el.closest('.cat .lb'))return;gsap.to(el,{opacity:1,y:0,duration:1.1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 90%'}});});
 document.querySelectorAll('.par img').forEach(im=>gsap.fromTo(im,{yPercent:-9},{yPercent:0,ease:'none',scrollTrigger:{trigger:im.parentElement,start:'top bottom',end:'bottom top',scrub:true}}));
 gsap.to('.hs .tx',{yPercent:-25,opacity:.2,ease:'none',scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom top',scrub:true}});
}else document.documentElement.classList.add('rm');
window.__ready=true;
})();
