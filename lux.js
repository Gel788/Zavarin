(()=>{const $=s=>document.querySelector(s);
const hd=$('#hd'),on=()=>hd.classList.toggle('s',scrollY>40);on();addEventListener('scroll',on,{passive:true});
const mm=$('#mm'),b=$('#burg');const set=v=>{mm.classList.toggle('on',v);b.setAttribute('aria-expanded',v);document.body.style.overflow=v?'hidden':'';if(v)$('#mmx').focus();else b.focus()};
b.onclick=()=>set(true);$('#mmx').onclick=()=>set(false);mm.querySelectorAll('a').forEach(a=>a.onclick=()=>set(false));addEventListener('keydown',e=>{if(e.key==='Escape'&&mm.classList.contains('on'))set(false)});
try{const f=JSON.parse(localStorage.getItem('zfav')||'[]').length,c=JSON.parse(localStorage.getItem('zcart')||'[]').length;if(f)$('#fc').textContent=f;if(c)$('#cc').textContent=c}catch(e){}
const io='IntersectionObserver'in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{rootMargin:'0px 0px -8% 0px'}):null;
const watch=r=>r.querySelectorAll('.rv').forEach(el=>io?io.observe(el):el.classList.add('in'));watch(document);
const ids=['krest-na-shnure-01-21-00155-02-8','koltso-02-22-00034-7-1','ikona-06-25-01460-00-1','krest-07-21-07550-00-1'];
const fmt=n=>n.toLocaleString('ru-RU').replace(/,/g,' ')+' ₽',esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
fetch('products.json').then(r=>r.json()).then(d=>{const el=$('#cards');el.innerHTML=ids.map(i=>d.products.find(p=>p.id===i)).filter(Boolean).map(p=>`<a class="card rv" href="product.html?id=${p.id}"><div class="ph"><img src="${p.images[0]}" width="900" height="900" loading="lazy" alt="${esc(p.name)}">${p.images[1]?`<img src="${p.images[1]}" width="900" height="900" loading="lazy" alt="" aria-hidden="true">`:''}</div><h3>${esc(p.name)}</h3><p>${fmt(p.price)}${p.old?`<s>${fmt(p.old)}</s>`:''}</p></a>`).join('');el.style.display='';watch(el)}).catch(()=>{});
})();
