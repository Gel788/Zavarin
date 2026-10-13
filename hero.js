/* ZAVARIN home hero «Галерея»: photo through letters + scroll split (transform/opacity, clip-path at exit) */
(()=>{const S=document.querySelector('.qh');if(!S)return;
const st=S.querySelector('.qh-st'),L=[...S.querySelectorAll('.qh-w span')],n=L.length,mob=()=>innerWidth<=768;
const al=()=>{const r=st.getBoundingClientRect();L.forEach(s=>{const t=s.style.transform;s.style.transform='none';const b=s.getBoundingClientRect();s.style.transform=t;s.style.backgroundSize=r.width+'px '+r.height+'px';s.style.backgroundPosition=(r.left-b.left)+'px '+(r.top-b.top)+'px'})};
al();addEventListener('resize',()=>{clearTimeout(al.t);al.t=setTimeout(al,120)});document.fonts&&document.fonts.ready.then(al);
const run=()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches||!window.gsap||!window.ScrollTrigger)return;gsap.registerPlugin(ScrollTrigger);
 const tl=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{trigger:S,start:'top top',end:'bottom bottom',scrub:.5,invalidateOnRefresh:true}});
 tl.to(L,{xPercent:i=>(i-(n-1)/2)*(mob()?40:55),opacity:.2,duration:1},0).to('.qh-w',{scale:1.1,duration:1},0).to('.qh-bg',{scale:1.08,duration:1},0)
  .to('.qh-bot,.qh-top',{opacity:0,y:-30,duration:.5},.15).to(st,{clipPath:'inset(6% 5% 12% 5% round 4px)',duration:.8},.7)};
document.readyState==='complete'?run():addEventListener('load',run,{once:true});
// pause Ken Burns + float when offscreen
if('IntersectionObserver' in window)new IntersectionObserver(e=>S.classList.toggle('off',!e[0].isIntersecting)).observe(S);
})();
