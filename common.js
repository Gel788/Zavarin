(function(){
const CAPTURE=location.search.includes('capture');const H=document.documentElement;
if(CAPTURE)H.classList.add('capture');if(matchMedia('(hover:none)').matches)H.classList.add('touch');
window.Z={CAPTURE,
 fmt:n=>n.toLocaleString('ru-RU').replace(/\u00a0/g,' ')+' ₽',
 favs:new Set(JSON.parse(localStorage.getItem('zfav')||'[]')),
 cart:JSON.parse(localStorage.getItem('zcart')||'[]'),
 save(){localStorage.setItem('zfav',JSON.stringify([...this.favs]));localStorage.setItem('zcart',JSON.stringify(this.cart));this.counts();},
 counts(){document.querySelectorAll('[data-fav-count]').forEach(e=>e.textContent=this.favs.size);document.querySelectorAll('[data-cart-count]').forEach(e=>e.textContent=this.cart.length);},
 toggleFav(id,el){this.favs.has(id)?this.favs.delete(id):this.favs.add(id);this.save();if(el){el.classList.toggle('on',this.favs.has(id));el.classList.remove('pop');void el.offsetWidth;el.classList.add('pop');}
  this.toast(this.favs.has(id)?'Добавлено в избранное':'Удалено из избранного','');},
 toast(msg,sub){let t=document.querySelector('.toast');if(!t){t=document.createElement('div');t.className='toast';document.body.appendChild(t);}
  t.innerHTML=`<b>${msg}</b><span>${sub||''}</span>`;t.classList.add('on');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('on'),2600);},
 heart:'<svg viewBox="0 0 24 24"><path d="M12 20.5s-7.5-4.6-9.3-9.2C1.4 8 3.4 4.5 7 4.5c2.1 0 3.6 1.2 5 3 1.4-1.8 2.9-3 5-3 3.6 0 5.6 3.5 4.3 6.8-1.8 4.6-9.3 9.2-9.3 9.2z"/></svg>',
 data:null,async load(){if(!this.data)this.data=await (await fetch('products.json?v=5')).json();return this.data;},
 bind(root=document){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){io.unobserve(e.target);const d=+(e.target.dataset.d||0);if(window.gsap&&!CAPTURE)gsap.to(e.target,{opacity:1,y:0,duration:1.1,delay:d,ease:'power3.out'});else{e.target.style.opacity=1;e.target.style.transform='none';}}}),{rootMargin:'0px 0px -6% 0px'});
  root.querySelectorAll('.reveal').forEach(el=>io.observe(el));}
};
Z.hdN=u=>u.split('/').pop().replace(/\.(png|jpe?g|webp)$/,'');
Z.ss=(ws,pre,u)=>ws&&ws.length?' srcset="'+ws.map(w=>'img/hd/'+pre+'-'+Z.hdN(u)+'-'+w+'.webp '+w+'w').join(', ')+'"':'';
document.addEventListener('DOMContentLoaded',()=>{
 const nav=document.querySelector('header.nav');const sn=()=>nav&&nav.classList.toggle('solid',scrollY>40);addEventListener('scroll',sn);sn();
 Z.counts();
});
})();
