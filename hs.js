(()=>{const S=document.querySelector('.hs');if(!S)return;const st=S.querySelector('.hs-st'),art=S.querySelector('#hsart'),P=[...S.querySelectorAll('.pc')],F=[...S.querySelectorAll('.fi')],B=[...S.querySelectorAll('.bars button')],FL=[...S.querySelectorAll('.fl')],N=S.querySelector('#hsn');
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches,H=document.documentElement;let cur=0;
const pad=n=>String(n+1).padStart(2,'0');
const show=k=>{if(k===cur&&P[k].classList.contains('on'))return;cur=k;P.forEach((p,i)=>p.classList.toggle('on',i===k));F.forEach((f,i)=>f.classList.toggle('on',i===k));B.forEach((b,i)=>b.toggleAttribute('aria-current',i===k));N.textContent=pad(k);sweep()};
let sw=0;const sweep=()=>{sw=performance.now()};
if(RM){H.classList.add('no-mo');B.forEach((b,i)=>{b.onclick=()=>show(i);b.querySelector('i').style.width=i===0?'100%':'0'});B.forEach(b=>b.addEventListener('click',()=>B.forEach((x,j)=>x.querySelector('i').style.width=j===cur?'100%':'0')));P[0].classList.add('on');return}
const range=()=>S.offsetHeight-st.offsetHeight;
B.forEach((b,i)=>b.onclick=()=>{const y=S.offsetTop+range()*((i+.5)/4);scrollTo({top:y,behavior:'smooth'})});
let mx=0,my=0,tx=0,ty=0,vis=true,raf=0,t0=performance.now();
addEventListener('pointermove',e=>{if(e.pointerType==='mouse'){tx=e.clientX/innerWidth*2-1;ty=e.clientY/innerHeight*2-1}},{passive:true});
addEventListener('deviceorientation',e=>{if(e.gamma==null)return;tx=Math.max(-1,Math.min(1,e.gamma/30));ty=Math.max(-1,Math.min(1,(e.beta-40)/30))},{passive:true});
new IntersectionObserver(es=>{vis=es[0].isIntersecting;if(vis&&!raf)raf=requestAnimationFrame(loop)}).observe(S);
const ease=x=>x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2;
function loop(now){raf=0;if(!vis)return;mx+=(tx-mx)*.06;my+=(ty-my)*.06;
 const r=range(),y=-S.getBoundingClientRect().top,p=Math.max(0,Math.min(1,y/r)),m=innerWidth<768;
 const t=p*4-.5;const k=Math.max(0,Math.min(3,Math.round(t)));show(k);
 P.forEach((el,i)=>{const d=t-i,a=Math.max(0,1-Math.abs(d)*1.9),e=ease(Math.min(1,a));el.style.opacity=i===0&&t<0?1:i===3&&t>3?1:e;
  const yy=(i===0&&t<0)||(i===3&&t>3)?0:d*-(m?40:90);el.style.transform=`translate3d(${mx*(m?6:14)}px,${yy+my*(m?4:10)}px,0) scale(${.92+.08*(i===0&&t<0||i===3&&t>3?1:e)}) rotate(${d*-3}deg)`;
  const gl=el.querySelector('.gl');if(gl&&i===k){const img=el.querySelector('img');if(img.complete&&img.naturalWidth){gl.style.left=img.offsetLeft+'px';gl.style.top=img.offsetTop+'px';gl.style.width=img.offsetWidth+'px';gl.style.height=img.offsetHeight+'px'}
   const s=Math.min(1,(now-sw)/3400),sw1=s<1;const gx=sw1?(105-ease(s)*110):(50+mx*-34+my*-6);gl.style.setProperty('--gx',gx+'%');gl.style.opacity=sw1?1:.45;gl.style.setProperty('--ga',(108+mx*14+my*6)+'deg')}});
 B.forEach((b,i)=>b.querySelector('i').style.width=Math.max(0,Math.min(1,p*4-i))*100+'%');
 FL.forEach((f,i)=>{const d=+f.dataset.d;f.style.transform=`translate3d(${mx*d*-34}px,${my*d*-24+(p*-260*d)}px,0) rotate(${(i%2?1:-1)*(6+p*10*d)}deg)`});
 const hc=S.querySelector('.hc');hc.style.transform=`translate3d(${mx*-6}px,${p*-30}px,0)`;
 if(now-sw>8000)sweep();
 raf=requestAnimationFrame(loop)}
sweep();raf=requestAnimationFrame(loop);
})();
