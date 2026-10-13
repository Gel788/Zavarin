/* product v11: vitrine stage + thumbnail rail, luxury info column, accordions, story, macro, related */
(()=>{const C=window.CV||{rm:true},$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];const H=document.documentElement;H.classList.add('cine-prod');
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const id=new URLSearchParams(location.search).get('id');
const go=(P)=>{const sl=$$('.sl');if(!sl.length||!$('#info .price')||!$$('#tps .tp').length)return setTimeout(()=>go(P),60);
 const p=P.find(x=>x.id===id)||{};const name=($('#info h1')||{}).textContent||'';
 /* ---- stage + rail ---- */
 const gal=$('.gal'),st=$('#slides');gal.classList.add('v11');let k=0;
 st.insertAdjacentHTML('beforebegin',`<div class="rail" role="group" aria-label="Фотографии изделия">${sl.map((s,i)=>`<button type="button" class="${i?'':'d'}" aria-label="Фото ${i+1} из ${sl.length}" aria-current="${!i}"><img src="${s.querySelector('img').getAttribute('src')}" alt="" loading="lazy"></button>`).join('')}</div>`);
 st.insertAdjacentHTML('afterend',`<p class="stc" aria-hidden="true"><b>01</b> / ${String(sl.length).padStart(2,'0')}</p><p class="stz" aria-hidden="true">Нажмите, чтобы увеличить</p>`);
 const rail=$$('.rail button');
 const show=n=>{k=(n+sl.length)%sl.length;sl.forEach((s,i)=>{s.classList.toggle('on',i===k);s.setAttribute('aria-hidden',i!==k);s.tabIndex=i===k?0:-1});rail.forEach((b,i)=>b.setAttribute('aria-current',i===k));$('.stc b').textContent=String(k+1).padStart(2,'0');gal.classList.toggle('lt',k>0)};
 show(0);$('.rail').addEventListener('click',e=>{const b=e.target.closest('button');if(b)show(rail.indexOf(b))});
 const ap=$('.gal .arr.p'),an=$('.gal .arr.n');if(ap)ap.onclick=()=>show(k-1);if(an)an.onclick=()=>show(k+1);
 let tx=null;st.addEventListener('touchstart',e=>{tx=e.touches[0].clientX},{passive:true});st.addEventListener('touchend',e=>{if(tx==null)return;const d=e.changedTouches[0].clientX-tx;tx=null;if(Math.abs(d)>40){show(k+(d<0?1:-1))}},{passive:true});
 /* ---- info column ---- */
 const info=$('#info');const chg=info.querySelector('.chg');if(chg)chg.remove();
 const SP=(p.specs||[]).filter(([a])=>/Металл|Проба|Покрытие|Основа|Цвет вставки|Коллекция/.test(a));
 const meta=info.querySelector('.ttl');meta.insertAdjacentHTML('beforebegin',`<p class="lbl i-cat">${esc(p.catName||'')} · Арт. ${esc(p.art||'')}</p>`);
 info.querySelector('.btns').insertAdjacentHTML('afterend',`<div class="i-cta"><a class="i-c" href="tel:88006008533"><small>Консультация ювелира</small><b>8 800 600-85-33</b><span>Бесплатно по России · пн–пт 09:00–18:00</span></a><a class="i-c" href="contacts.html"><small>Ювелирная галерея</small><b>Москва, Большой Ордынский</b><span>Ежедневно 9:00–21:00 · посмотреть вживую</span></a></div>`);
 const T=$$('#tabs button').map(b=>b.textContent),TP=$$('#tps .tp').map(t=>t.innerHTML);
 const acc=[['Материал и параметры',`<dl class="i-dl">${SP.map(([a,b])=>`<dt>${esc(a)}</dt><dd>${esc(b)}</dd>`).join('')}${(p.options||[]).map(o=>`<dt>${esc(o.label)}</dt><dd>${esc(o.v.join(', '))}</dd>`).join('')}</dl>`],...(p.custom?[['Гравировка и персонализация',`<p>${esc(p.custom)}</p>`]]:[]),...T.slice(1).map((t,i)=>[t,TP[i+1]]),[T[0]||'Описание',TP[0]||'']];
 info.insertAdjacentHTML('beforeend',`<div class="i-acc">${acc.map(([t,c],i)=>`<details${i?'':' open'}><summary><span>${esc(t)}</span><i aria-hidden="true"></i></summary><div class="i-ac">${c}</div></details>`).join('')}</div>`);
 const tb=$('#tabs');if(tb)tb.closest('section').classList.add('v11-hide');
 /* ---- story block ---- */
 const rel=$('.rel');if(rel&&!$('.pstory'))rel.insertAdjacentHTML('beforebegin',`<section class="band pstory" aria-labelledby="hst"><div class="wrap ps-g"><div class="ps-im"><img src="img/lux/craft.webp" alt="Мастер ЗАВАРИН за ручной обработкой изделия" loading="lazy" width="1000" height="667"></div><div class="ps-t"><p class="lbl">Мастерская · Кострома</p><h2 class="h2" id="hst">Рука мастера</h2><p>Художник рисует эскиз, 3D-моделлер создаёт модель, из которой отливают серебряную мастер-модель. Гравировщик-модельер вручную выводит плоскости и&nbsp;под микроскопом доводит лики святых и&nbsp;узоры.</p><p>Каждое изделие проходит финальную ручную доводку мастером, апробирование и&nbsp;клеймение.</p><a class="lk" href="brand.html">История дома →</a></div></div></section>`);
 /* ---- macro ---- */
 const ch=$('section.band.dark'),cutS=sl[0].querySelector('img').getAttribute('src');
 if(ch&&!$('.pmac'))ch.insertAdjacentHTML('afterend',`<section class="pmac" aria-label="Деталь изделия"><div class="pmac-st"><div class="pmac-im"><img src="${cutS}" alt="${esc(name)} — деталь крупным планом" loading="lazy"></div><div class="wrap pmac-t"><p class="lbl">В деталях</p><p class="pmac-q">Под микроскопом мастер доводит лики святых и&nbsp;узоры</p></div></div></section>`);
 if(rel)rel.classList.add('cv-rel');
 if(C.rm)return;const mob=matchMedia('(max-width:1024px)').matches;
 gsap.from('#info>*',{y:30,opacity:0,duration:1.1,stagger:.05,ease:'expo.out',delay:.15,clearProps:'all'});
 gsap.from('.gal .slides',{clipPath:'inset(8% 8% 8% 8%)',duration:1.5,ease:'expo.out',clearProps:'clipPath'});
 gsap.from('.rail button',{y:16,opacity:0,stagger:.05,duration:.9,ease:'expo.out',delay:.3,clearProps:'all'});
 const later=()=>{gsap.from('.ps-im',{clipPath:'inset(0 0 100% 0)',duration:1.4,ease:'expo.out',scrollTrigger:{trigger:'.pstory',start:'top 75%',once:true}});
 gsap.from('.ps-t>*',{y:30,opacity:0,stagger:.08,duration:1.1,ease:'expo.out',scrollTrigger:{trigger:'.pstory',start:'top 70%',once:true}});
 const mi=$('.pmac-im'),mimg=$('.pmac-im img');
 gsap.timeline({scrollTrigger:{trigger:'.pmac',start:'top top',end:'bottom bottom',scrub:.6}})
  .fromTo(mi,{clipPath:'circle(9% at 50% 46%)'},{clipPath:'circle(75% at 50% 50%)',ease:'power2.inOut',duration:1},0)
  .fromTo(mimg,{scale:2.2,yPercent:6},{scale:1,yPercent:0,ease:'power2.inOut',duration:1.4},0)
  .fromTo('.pmac-q',{opacity:0,y:30},{opacity:1,y:0,duration:.4},.7);

 window.ZR&&ZR()};requestAnimationFrame(()=>setTimeout(later,0));};
fetch('products.json').then(r=>r.json()).then(d=>go(d.products)).catch(()=>go([]));})();
