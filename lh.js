/* v21 light hero: skip + scroll illumination (GSAP optional) */
(()=>{const H=document.documentElement,S=document.getElementById('hero');if(!S||!S.classList.contains('lh'))return;
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const done=()=>{H.classList.add('lh-done');['wheel','touchstart','keydown','scroll'].forEach(e=>removeEventListener(e,done))};
if(H.classList.contains('lh-run')||H.classList.contains('lh-q')){['wheel','touchstart','keydown','scroll'].forEach(e=>addEventListener(e,done,{passive:true}));setTimeout(()=>H.classList.add('lh-done'),H.classList.contains('lh-run')?5200:1800)}
/* beam angles to real piece positions */
const sg=S.querySelector('.lh-sg'),ang=()=>{const r=sg.getBoundingClientRect(),cy=r.height*parseFloat(getComputedStyle(sg).getPropertyValue('--cy'))/100+8*r.height/100;
 [['a','aA'],['b','aB'],['c','aC']].forEach(([k,v])=>{const p=S.querySelector('.lh-p.'+k);if(!p||!p.offsetWidth)return;const b=p.getBoundingClientRect(),dx=b.left+b.width/2-(r.left+r.width/2),dy=b.top+b.height/2-r.top+r.height*.08;sg.style.setProperty('--'+v,(-Math.atan2(dx,dy)*180/Math.PI).toFixed(1)+'deg')})};
ang();addEventListener('resize',()=>{clearTimeout(ang.t);ang.t=setTimeout(ang,150)});
if(RM||!window.gsap||!window.ScrollTrigger)return;gsap.registerPlugin(ScrollTrigger);
const tl=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{trigger:S,start:'top top',end:'bottom bottom',scrub:.5}});
tl.to('.lh-dw',{scale:3.2,duration:1},0).to('.lh-bm,.lh-src',{opacity:0,duration:.6},0).to('.lh-p.m',{scale:1.18,duration:1},0)
 .to('.lh-p.a,.lh-p.b',{xPercent:-30,opacity:.6,duration:1},0).to('.lh-p.c,.lh-p.d',{xPercent:30,opacity:.6,duration:1},0)
 .to('.lh-w',{scale:1.12,opacity:.8,duration:1},0).to('.lh-top,.lh-bot',{opacity:0,y:-20,duration:.5},.2)
 .to('.lh-p.m',{scale:2.4,opacity:0,duration:.9,ease:'power2.in'},1).to('.lh-p:not(.m),.lh-w,.lh-fl',{opacity:0,duration:.6},1)
 .to('.lh-st',{backgroundColor:'#0b0b0c',duration:.6},1.2);
})();
