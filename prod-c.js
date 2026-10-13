(()=>{const C=window.CV||{rm:true},$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];const H=document.documentElement;H.classList.add('cine-prod');
const go=()=>{const sl=$$('.sl');if(!sl.length)return setTimeout(go,60);
 const name=($('#info h1')||{}).textContent||'';const src=(sl[1]||sl[0]).querySelector('img').getAttribute('src');const cutS=sl[0].querySelector('img').getAttribute('src');
 /* macro detail section */
 const ch=$('section.band.dark');if(ch&&!$('.pmac'))ch.insertAdjacentHTML('afterend',`<section class="pmac" aria-label="Деталь изделия"><div class="pmac-st"><div class="pmac-im"><img src="${cutS}" alt="${name.replace(/"/g,'&quot;')} — деталь крупным планом" loading="lazy"></div><div class="wrap pmac-t"><p class="lbl">В деталях</p><p class="pmac-q">Гравировщик вручную выводит плоскости и&nbsp;под&nbsp;микроскопом доводит лики святых и&nbsp;узоры.</p></div></div></section>`);
 const rel=$('.rel');if(rel)rel.classList.add('cv-rel');
 /* sticky counter */
 const gal=$('.gal');if(gal&&!$('.pg-n'))gal.insertAdjacentHTML('afterbegin',`<p class="pg-n" aria-hidden="true"><b>01</b> / ${String(sl.length).padStart(2,'0')}</p>`);
 if(C.rm)return;const mob=matchMedia('(max-width:1024px)').matches;
 gsap.from('#info>*',{y:40,opacity:0,duration:1.2,stagger:.06,ease:'expo.out',delay:.2,clearProps:'all'});
 gsap.from('#mtitle,#bc',{y:30,opacity:0,duration:1,ease:'expo.out'});
 if(!mob){const pn=$('.pg-n b');
  sl.forEach((s,i)=>{const im=s.querySelector('img');
   if(i===0)gsap.from(s,{clipPath:'inset(12% 10% 12% 10%)',duration:1.6,ease:'expo.out'}),gsap.from(im,{scale:1.35,duration:2,ease:'expo.out'});
   else gsap.fromTo(s,{clipPath:'inset(14% 12% 14% 12%)'},{clipPath:'inset(0% 0% 0% 0%)',ease:'none',scrollTrigger:{trigger:s,start:'top 95%',end:'top 30%',scrub:.5}});
   gsap.fromTo(im,{scale:i?1.3:1},{scale:i?1:1.12,ease:'none',scrollTrigger:{trigger:s,start:i?'top bottom':'top top',end:i?'top 20%':'bottom top',scrub:.5}});
   ScrollTrigger.create({trigger:s,start:'top 55%',end:'bottom 55%',onToggle:t=>t.isActive&&(pn.textContent=String(i+1).padStart(2,'0'))});});}
 /* macro */
 const mi=$('.pmac-im'),mimg=$('.pmac-im img');
 gsap.timeline({scrollTrigger:{trigger:'.pmac',start:'top top',end:'bottom bottom',scrub:.6}})
  .fromTo(mi,{clipPath:'circle(9% at 50% 46%)'},{clipPath:'circle(75% at 50% 50%)',ease:'power2.inOut',duration:1},0)
  .fromTo(mimg,{scale:2.4,yPercent:6},{scale:1,yPercent:0,ease:'power2.inOut',duration:1.4},0)
  .fromTo('.pmac-q',{opacity:0,y:40},{opacity:1,y:0,duration:.4},.7).to('.pmac-q',{opacity:1,duration:.4},1.1);
 /* related: horizontal pinned */
 const g=$('#rel');const hz=()=>{if(!g.children.length)return setTimeout(hz,80);const dist=()=>Math.max(0,g.scrollWidth-g.parentElement.clientWidth);if(mob||dist()<40)return;
  gsap.to(g,{x:()=>-dist(),ease:'none',scrollTrigger:{trigger:rel,pin:true,start:'top top',end:()=>'+='+dist(),scrub:.6,invalidateOnRefresh:true}});
  gsap.from(g.children,{y:80,opacity:0,stagger:.08,duration:1.2,ease:'expo.out',scrollTrigger:{trigger:rel,start:'top 75%',once:true}});ScrollTrigger.refresh()};hz();
 ScrollTrigger.refresh();};
go();})();
