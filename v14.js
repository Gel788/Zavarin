/* ZAVARIN v14: hero pause offscreen, collection stories. No pointer effects. */
(()=>{const H=document.documentElement,RM=matchMedia('(prefers-reduced-motion: reduce)').matches,IO=window.IntersectionObserver;
const hero=document.getElementById('hero');if(hero&&IO)new IO(e=>H.classList.toggle('hero-off',!e[0].isIntersecting)).observe(hero);
const sec=document.getElementById('stories');if(!sec)return;const S=[...sec.querySelectorAll('.stz-s')];
if(RM||!IO){return}
H.classList.add('js-v14');
const io=new IO(es=>es.forEach(e=>{if(e.isIntersecting){const t=e.target.querySelector('.stz-t');t&&t.classList.add('in')}}),{rootMargin:'0px 0px -20% 0px'});S.forEach(s=>io.observe(s));
const tone=new IO(es=>es.forEach(e=>{if(e.isIntersecting)sec.style.backgroundColor=e.target.dataset.tone}),{rootMargin:'-45% 0px -45% 0px'});S.forEach(s=>tone.observe(s));
const go=()=>{if(!window.gsap||!window.ScrollTrigger)return;S.forEach(s=>{const im=s.querySelector('.stz-v img');if(!im)return;
 gsap.fromTo(im,{yPercent:7,scale:.95},{yPercent:-5,scale:1,ease:'none',scrollTrigger:{trigger:s,start:'top bottom',end:'bottom top',scrub:.6}})});window.ZR&&ZR()};
(window.requestIdleCallback||setTimeout)(go,{timeout:1200});
})();
