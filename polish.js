/* ZAVARIN polish v10: ornaments, numbering, footer wordmark, back-to-top, page curtain. */
(()=>{const H=document.documentElement,RM=matchMedia('(prefers-reduced-motion: reduce)').matches,$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const FL='<svg viewBox="0 0 150 28" aria-hidden="true" focusable="false" fill="none" stroke="currentColor"><path d="M0 14H50M100 14H150" stroke-width=".6"/><path d="M50 14c5-6 10-6 13 0-3 6-8 6-13 0zM100 14c-5-6-10-6-13 0 3 6 8 6 13 0z" stroke-width=".7"/><circle cx="75" cy="14" r="11.5" stroke-width=".45"/><path d="M75 4.5v19M71.6 8.2h6.8M69.4 12.4h11.2M71.8 19.2l6.4-2.2" stroke-width=".9"/><circle cx="44" cy="14" r="1.1" fill="currentColor" stroke="none"/><circle cx="106" cy="14" r="1.1" fill="currentColor" stroke="none"/></svg>';
const R=['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'];
/* dividers + numbering */
let n=0;$$('main>section').forEach(s=>{if(s.matches('.hero,.pgh,.cbn,#banner'))return;const p=s.previousElementSibling;
 if(p&&!p.matches('.hero,.pgh,.cbn,.cv-h-sec,.pmac')&&!s.matches('.cv-q,.cv-h-sec,.cv-mq,.pmac,.rel')&&s.matches('.sec,.band'))s.insertAdjacentHTML('afterbegin',`<div class="orn" aria-hidden="true">${FL}</div>`);
 const l=s.querySelector('.lbl');if(l&&!l.querySelector('.sn')&&!l.closest('.cv-p,.mg,.cv-top,.box,form,fieldset,legend'))l.insertAdjacentHTML('afterbegin',`<i class="sn" aria-hidden="true">${R[n++]||''}</i>`)});
/* jewel corners */
$$('.box,.opt2,.edt').forEach(e=>e.classList.add('cn'));
/* footer */
const bt=$('.ft .bt');if(bt&&!$('.ft-wm'))bt.insertAdjacentHTML('beforebegin',`<div class="ft-orn" aria-hidden="true">${FL}</div><p class="ft-wm" aria-hidden="true">ЗАВАРИН</p>`);
const mm=$('.mm');if(mm&&!$('.mm-orn'))mm.insertAdjacentHTML('beforeend',`<div class="mm-orn" aria-hidden="true">${FL}</div>`);
const cdo=()=>{const h=$('.cd .pn h2');if(h&&!$('.cd-orn'))h.insertAdjacentHTML('afterend',`<div class="cd-orn" aria-hidden="true">${FL}</div>`)};cdo();new MutationObserver(cdo).observe(document.body,{childList:true});
/* back to top with scroll progress ring */
const b=document.createElement('button');b.className='btt';b.type='button';b.setAttribute('aria-label','Наверх');b.innerHTML='<svg viewBox="0 0 52 52" aria-hidden="true"><circle class="bg" cx="26" cy="26" r="24"/><circle class="fg" cx="26" cy="26" r="24"/></svg><i aria-hidden="true">↑</i>';document.body.appendChild(b);
const fg=b.querySelector('.fg');let tk=0;const up=()=>{tk=0;const m=document.documentElement.scrollHeight-innerHeight,y=scrollY;b.classList.toggle('on',y>innerHeight*1.2);fg.style.strokeDashoffset=150.8*(1-(m>0?y/m:0))};
addEventListener('scroll',()=>{if(!tk){tk=1;requestAnimationFrame(up)}},{passive:true});up();
b.onclick=()=>{const l=window.__lenis;if(l&&!RM)l.scrollTo(0,{duration:1.6});else scrollTo({top:0,behavior:RM?'auto':'smooth'});(document.querySelector('.skip')||document.body).focus({preventScroll:true})};
/* curtain + monogram preloader */
if(RM){H.classList.remove('zv-cov');return}
const c=document.createElement('div');c.className='cur';c.setAttribute('aria-hidden','true');c.innerHTML='<div class="sp"><svg class="sp-x" viewBox="0 0 60 96" fill="none" stroke="currentColor"><path d="M30 3v90M21 15h18M10 33h40M18 70l24-9"/></svg><p class="sp-w">ЗАВАРИН</p><svg class="sp-l" viewBox="0 0 400 2" preserveAspectRatio="none"><path d="M0 1H400" stroke="currentColor"/></svg><p class="sp-s">Ювелирный дом · Кострома · с 2013</p></div><button type="button" class="sp-k">Пропустить</button>';document.body.appendChild(c);
let first=false,nav=false;try{first=!sessionStorage.getItem('zv');nav=!!sessionStorage.getItem('zvn');sessionStorage.setItem('zv','1');sessionStorage.removeItem('zvn')}catch(e){}
const replay=()=>{if(H.classList.contains('cv-in')){H.classList.remove('cv-in');requestAnimationFrame(()=>requestAnimationFrame(()=>H.classList.add('cv-in')))}};
if(first||nav||H.classList.contains('zv-cov')){c.classList.add('on');if(first)c.classList.add('pre');H.classList.remove('zv-cov');let done=0;const t0=performance.now(),min=first?1500:200;
 const lift=()=>{if(done)return;done=1;c.classList.add('out');replay();setTimeout(()=>c.classList.remove('on','out','pre'),950)};
 c.addEventListener('click',lift);addEventListener('keydown',function k(){lift();removeEventListener('keydown',k)});const go=()=>setTimeout(lift,Math.max(0,min-(performance.now()-t0)));document.readyState==='complete'?go():addEventListener('load',go,{once:true});setTimeout(lift,first?2600:1500)}
document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a||e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||a.target||a.hasAttribute('download'))return;
 let u;try{u=new URL(a.getAttribute('href'),location.href)}catch(_){return}if(u.origin!==location.origin||!/(\.html|\/)$/.test(u.pathname))return;if(u.pathname===location.pathname&&u.search===location.search&&u.hash)return;
 e.preventDefault();try{sessionStorage.setItem('zvn','1')}catch(_){}c.classList.remove('out','pre');c.classList.add('on','in');setTimeout(()=>{location.href=u.href},480)});
addEventListener('pageshow',e=>{if(e.persisted)c.classList.remove('on','in','pre','out')});
})();
