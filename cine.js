/* ZAVARIN cine core: Lenis + GSAP ScrollTrigger. No pointer-reactive effects. */
(()=>{const H=document.documentElement,RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const CV=window.CV={rm:RM,lenis:null,wipe:()=>{}};
if(RM||!window.gsap||!window.ScrollTrigger){H.classList.remove('js-cv');if(RM)H.classList.add('rm');CV.rm=true;return}
gsap.registerPlugin(ScrollTrigger);if(window.Flip)gsap.registerPlugin(Flip);
if(window.Lenis&&!/product\.html/.test(location.pathname)&&!matchMedia('(hover:none)').matches){const l=new Lenis({lerp:.11,smoothWheel:true,anchors:{offset:-70}});l.on('scroll',ScrollTrigger.update);gsap.ticker.add(t=>l.raf(t*1000));gsap.ticker.lagSmoothing(0);CV.lenis=l;if(window.Z)Z.lenis=l;window.__lenis=l}
CV.wipe=els=>els.forEach(el=>{if(el.dataset.wp)return;el.dataset.wp=1;const r=el.getBoundingClientRect();if(r.top<innerHeight*.9)return;el.classList.add('cv-wipe');const im=el.querySelector('img');
 const st={trigger:el,start:'top 90%',once:true};gsap.to(el,{clipPath:'inset(0 0 0% 0)',duration:1.3,ease:'expo.out',scrollTrigger:st,onComplete:()=>{el.classList.remove('cv-wipe');el.style.clipPath=''}});
 if(im)gsap.fromTo(im,{scale:1.22},{scale:1,duration:1.8,ease:'expo.out',scrollTrigger:{...st},clearProps:'transform'})});
addEventListener('load',()=>ScrollTrigger.refresh());document.fonts&&document.fonts.ready.then(()=>ScrollTrigger.refresh());
})();
