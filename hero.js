(()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
const hero=document.getElementById('hero'),art=document.getElementById('art'),img=document.getElementById('heroimg');if(!hero||!art||!img)return;
hero.querySelectorAll('.h1').forEach(h=>h.dataset.base=600);
const go=()=>requestAnimationFrame(()=>hero.classList.add('go'));
const cv=document.createElement('canvas');cv.setAttribute('aria-hidden','true');const ctx=cv.getContext('2d');
const off=document.createElement('canvas'),ox=off.getContext('2d');
let W=0,H=0,dpr=1,ready=false;
const size=()=>{const r=img.getBoundingClientRect();dpr=Math.min(2,devicePixelRatio||1);W=Math.round(r.width*dpr);H=Math.round(r.height*dpr);cv.width=off.width=W;cv.height=off.height=H;draw()};
// light state: sweep phase s (-1..2), pointer light lx/ly (0..1)
let s=-1,lx=.62,ly=.28,tx=.62,ty=.28,t0=0,raf=0;
function draw(){if(!ready||!W)return;ctx.clearRect(0,0,W,H);ctx.globalCompositeOperation='source-over';ctx.drawImage(img,0,0,W,H);
 // directional shading: darker away from light
 ctx.globalCompositeOperation='source-atop';const ang=Math.atan2(ly-.5,lx-.5);const cx=W/2,cy=H/2,R=Math.hypot(W,H)/2;
 let g=ctx.createLinearGradient(cx+Math.cos(ang)*R,cy+Math.sin(ang)*R,cx-Math.cos(ang)*R,cy-Math.sin(ang)*R);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(.5,'rgba(0,0,0,.04)');g.addColorStop(1,'rgba(0,0,0,.3)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
 // specular band, masked by alpha, screen-blended
 ox.globalCompositeOperation='source-over';ox.clearRect(0,0,W,H);ox.drawImage(img,0,0,W,H);ox.globalCompositeOperation='source-in';
 const p=s<1.6?s:(lx*1.4-.2);const a2=-0.95+(ly-.3)*.6;const bx=W*p,by=H*p;const nx=Math.cos(a2),ny=Math.sin(a2);const L=Math.max(W,H)*.2;
 g=ox.createLinearGradient(bx-nx*L,by-ny*L,bx+nx*L,by+ny*L);g.addColorStop(0,'rgba(255,248,232,0)');g.addColorStop(.35,'rgba(255,248,232,.06)');g.addColorStop(.5,'rgba(255,252,244,.9)');g.addColorStop(.65,'rgba(255,248,232,.06)');g.addColorStop(1,'rgba(255,248,232,0)');
 ox.fillStyle=g;ox.fillRect(0,0,W,H);
 // keep highlight only on bright metal/gems: multiply by luminance of image
 ox.globalCompositeOperation='multiply';ox.drawImage(img,0,0,W,H);ox.drawImage(img,0,0,W,H);ox.drawImage(img,0,0,W,H);ox.globalCompositeOperation='destination-in';ox.drawImage(img,0,0,W,H);
 ctx.globalCompositeOperation='screen';ctx.globalAlpha=.85;ctx.drawImage(off,0,0);ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over'}
function loop(t){raf=0;let more=false;if(s<1.6){if(!t0)t0=t;s=-.6+(t-t0)/1600;more=true}
 const k=.06;lx+=(tx-lx)*k;ly+=(ty-ly)*k;if(Math.abs(tx-lx)+Math.abs(ty-ly)>.001)more=true;
 hero.style.setProperty('--lx',(lx*100).toFixed(1)+'%');hero.style.setProperty('--ly',(ly*100).toFixed(1)+'%');draw();if(more)raf=requestAnimationFrame(loop)}
const kick=()=>{if(!raf)raf=requestAnimationFrame(loop)};
const start=()=>{ready=true;art.appendChild(cv);hero.classList.add('cv');size();go();setTimeout(()=>{t0=0;kick()},900)};
(img.complete&&img.naturalWidth?Promise.resolve():new Promise(r=>img.onload=r)).then(()=>img.decode?img.decode().catch(()=>{}):0).then(start);
addEventListener('resize',size);
if(matchMedia('(hover:hover)').matches)hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect();tx=.15+.7*(e.clientX-r.left)/r.width;ty=.1+.5*(e.clientY-r.top)/r.height;kick()});
addEventListener('deviceorientation',e=>{if(e.gamma==null)return;tx=.5+Math.max(-.35,Math.min(.35,e.gamma/60));ty=.3+Math.max(-.2,Math.min(.2,(e.beta-45)/90));kick()},{passive:true});
setTimeout(go,2500);
})();
