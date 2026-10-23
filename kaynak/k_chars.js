/* ====================== SES ====================== */
let AC=null,master,musicBus,sfxBus,NB,sndMode=0; // 0 hepsi,1 müzik kapalı,2 sessiz
const CENTS=[0,113,385,498,702,906,996];
function hz(d,b){const o=Math.floor(d/7),i=((d%7)+7)%7;return b*Math.pow(2,(CENTS[i]+1200*o)/1200);}
function initAudio(){
  if(AC){if(AC.state==='suspended')AC.resume();return;}
  try{AC=new (window.AudioContext||window.webkitAudioContext)();}catch(e){return;}
  master=AC.createGain();master.gain.value=0.8;
  const comp=AC.createDynamicsCompressor();comp.threshold.value=-16;comp.ratio.value=4;
  master.connect(comp);comp.connect(AC.destination);
  musicBus=AC.createGain();musicBus.gain.value=0;musicBus.connect(master);
  sfxBus=AC.createGain();sfxBus.gain.value=0.9;sfxBus.connect(master);
  NB=AC.createBuffer(1,AC.sampleRate,AC.sampleRate);const d=NB.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;
  setInterval(sched,25);
}
function env(gn,t,a,p,dc){gn.gain.setValueAtTime(0.0001,t);gn.gain.exponentialRampToValueAtTime(Math.max(p,0.0002),t+a);gn.gain.exponentialRampToValueAtTime(0.0001,t+a+dc);}
function osc(type,f,t,a,p,dc,dest,fEnd){const o=AC.createOscillator(),gn=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,t);if(fEnd)o.frequency.exponentialRampToValueAtTime(fEnd,t+a+dc);env(gn,t,a,p,dc);o.connect(gn);gn.connect(dest);o.start(t);o.stop(t+a+dc+0.05);}
function nz(t,dur,p,ft,fr,q,dest,fEnd){const s=AC.createBufferSource();s.buffer=NB;s.loop=true;const f=AC.createBiquadFilter();f.type=ft;f.frequency.setValueAtTime(fr,t);if(fEnd)f.frequency.exponentialRampToValueAtTime(fEnd,t+dur);f.Q.value=q||1;const gn=AC.createGain();env(gn,t,0.004,p,dur);s.connect(f);f.connect(gn);gn.connect(dest);s.start(t,Math.random()*0.5);s.stop(t+dur+0.05);}
const SFX={
  clang(t,d){const f=640+Math.random()*160;[[1,.45,.9],[2.76,.22,.55],[5.4,.12,.32],[8.93,.07,.2]].forEach(([r,p,dc])=>osc('sine',f*r,t,.002,p,dc,d));nz(t,.05,.5,'bandpass',4200,1.2,d);osc('sine',150,t,.002,.55,.13,d,55);},
  whoosh(t,d){nz(t,.55,.28,'lowpass',260,.7,d,1500);},
  fire(t,d){nz(t,.35,.12,'lowpass',500,.6,d,900);for(let i=0;i<4;i++)nz(t+Math.random()*.3,.018,.14,'highpass',3200,1,d);},
  hiss(t,d){nz(t,1.1,.32,'highpass',5200,.8,d,1600);for(let i=0;i<6;i++)osc('sine',260+Math.random()*420,t+.12+i*.1,.005,.07,.06,d,900);},
  thump(t,d){osc('sine',115,t,.003,.7,.16,d,52);nz(t,.1,.32,'lowpass',650,1,d);nz(t+.01,.05,.08,'bandpass',2200,2,d);},
  snip(t,d){nz(t,.03,.32,'highpass',5000,2,d);nz(t+.08,.03,.3,'highpass',6200,2,d);osc('triangle',2400,t+.08,.002,.05,.05,d);},
  scratch(t,d){nz(t,.075,.2,'bandpass',2400+Math.random()*2200,3.5,d);},
  stamp(t,d){osc('sine',95,t,.002,.6,.13,d,48);osc('triangle',430,t,.002,.25,.06,d);nz(t,.045,.3,'lowpass',1500,1,d);},
  pop(t,d){osc('sine',380,t,.003,.32,.08,d,950);},
  drop(t,d){osc('sine',760,t,.003,.28,.09,d,300);},
  register(t,d){osc('triangle',hz(14,440),t,.002,.22,.35,d);osc('triangle',hz(18,440),t+.06,.002,.2,.45,d);nz(t,.06,.18,'bandpass',3200,2,d);osc('sine',hz(21,440),t+.12,.002,.12,.5,d);},
  coin(t,d){osc('square',hz(11,440),t,.002,.08,.07,d);osc('square',hz(14,440),t+.06,.002,.08,.16,d);},
  unlock(t,d){[0,2,4,7,9,11,14].forEach((k,i)=>{osc('square',hz(k,440),t+i*.07,.004,.09,.16,d);osc('sine',hz(k+7,440),t+i*.07,.004,.08,.22,d);});for(let i=0;i<8;i++)osc('sine',2200+Math.random()*2200,t+.5+i*.05,.002,.05,.16,d);},
  tick(t,d){osc('sine',1150,t,.002,.07,.03,d);},
  happy(t,d){osc('sine',hz(7,440),t,.004,.11,.08,d,hz(9,440));osc('sine',hz(9,440),t+.09,.004,.1,.1,d,hz(11,440));},
  angry(t,d){osc('sawtooth',170,t,.01,.1,.42,d,100);osc('square',120,t+.05,.01,.05,.3,d,80);},
  sob(t,d){osc('sine',560,t,.02,.12,.32,d,320);osc('sine',500,t+.28,.02,.11,.42,d,270);},
  munch(t,d){for(let i=0;i<3;i++)nz(t+i*.11,.05,.25,'bandpass',850,1.5,d);},
  step(t,d){nz(t,.025,.04,'lowpass',420,1,d);},
  chime(t,d){osc('sine',hz(14,440),t,.002,.13,.6,d);osc('sine',hz(18,440),t+.08,.002,.1,.6,d);},
  sparkle(t,d){for(let i=0;i<5;i++)osc('sine',1800+Math.random()*2400,t+i*.04,.002,.05,.12,d);},
  boing(t,d){osc('sine',220,t,.005,.25,.25,d,440);}
};
const lastS={};
function sfx(n,vol){if(!AC||sndMode===2)return;const now=performance.now();if(lastS[n]&&now-lastS[n]<30)return;lastS[n]=now;const d=AC.createGain();d.gain.value=vol==null?1:vol;d.connect(sfxBus);SFX[n](AC.currentTime+.005,d);}
function sfxAt(n,x,y,vol){const dd=Math.hypot(x-(G?G.p.x:180),y-(G?G.p.y:400));sfx(n,(vol||1)*Math.max(.12,1-dd/320));}
/* --- Hicaz chiptune: süpermarket raks havası --- */
const MEL=[4,-2,3,4,2,3,1,-2, 0,-2,2,3,4,-2,-1,-1, 5,4,5,6,7,-2,6,5, 4,-2,3,-2,2,1,2,-2, 7,-2,6,7,5,6,4,5, 3,4,2,3,1,2,0,-2, 4,3,2,1,2,3,4,5, 4,-2,1,-2,0,-2,-1,-1];
const ROOTS=[0,0,0,0,3,3,0,0,3,3,1,1,0,0,1,0];
const BP=[0,-1,7,-1,4,-1,7,7];
const DR=['D',0,'T','k','D','D','T',0];
const BPM=132,STEP=60/BPM/2;let nextT=0,stepI=0,musicStarted=false,MUS='main';
const SAD=[7,-2,-2,6,5,-2,4,-2,3,-2,-2,4,2,-2,1,-2,0,-2,-2,-2,1,-2,2,-2,3,-2,2,1,0,-2,-2,-2];
function setMusic(m){MUS=m;stepI=0;if(AC)nextT=AC.currentTime+.1;}
function startMusic(){if(!AC||musicStarted)return;musicStarted=true;nextT=AC.currentTime+.08;stepI=0;musicBus.gain.setValueAtTime(0,AC.currentTime);musicBus.gain.linearRampToValueAtTime(sndMode===0?.2:0,AC.currentTime+1.5);}
function sched(){
  if(!AC||!musicStarted)return;
  if(sndMode!==0){nextT=AC.currentTime+.05;return;}
  while(nextT<AC.currentTime+.12){if(MUS==='sad'){playSad(stepI%32,nextT);nextT+=.42;stepI=(stepI+1)%32;}else{playStep(stepI,nextT);nextT+=STEP;stepI=(stepI+1)%64;}}
}
function playSad(i,t){const n=SAD[i],b=musicBus;if(n>=0){let len=1,j=i+1;while(SAD[j%32]===-2){len++;j++;}osc('triangle',hz(n,440),t,.04,.16,.42*len*.95,b);osc('sine',hz(n,880),t,.05,.04,.42*len*.6,b);}
  if(i%8===0){osc('sine',110,t,.2,.18,3.2,b);osc('sine',hz(4,110),t,.2,.07,3.2,b);}}
function playStep(i,t){
  const n=MEL[i],b=musicBus;
  if(n>=0){let len=1,j=i+1;while(MEL[j%64]===-2){len++;j++;}
    osc('square',hz(n,440),t,.006,.07,STEP*len*.92,b);osc('triangle',hz(n,880),t,.004,.035,STEP*len*.5,b);}
  const bp=BP[i%8];if(bp>=0)osc('triangle',hz(ROOTS[Math.floor(i/4)]+bp,110),t,.004,.28,STEP*.85,b);
  if(i%2===0)osc('sawtooth',hz(ROOTS[Math.floor(i/4)]+(i%4===0?7:11),220),t,.004,.025,STEP*.6,b);
  const d=DR[i%8];
  if(d==='D'){osc('sine',150,t,.002,.5,.16,b,48);}
  else if(d==='T'){nz(t,.07,.18,'highpass',2400,1,b);osc('triangle',900,t,.002,.06,.04,b);}
  else if(d==='k'){nz(t,.03,.09,'highpass',3500,1,b);}
  if(i%16===8)osc('sine',hz(21,440),t,.002,.03,.5,b);
}

/* ====================== ÇİZİM YARDIMCILARI ====================== */
function rr(x,y,w,h,r){g.beginPath();r=Math.max(0,Math.min(r,w/2,h/2));g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath();}
function F(c){g.fillStyle=c;g.fill();}
function S(w,c){g.lineWidth=w==null?2:w;g.strokeStyle=c||OL;g.lineJoin='round';g.lineCap='round';g.stroke();}
function el(x,y,rx,ry,rot){g.beginPath();g.ellipse(x,y,Math.max(.1,rx),Math.max(.1,ry),rot||0,0,Math.PI*2);}
function circ(x,y,r){el(x,y,r,r);}
function shadow(x,y,rx,ry,a){el(x,y,rx,ry||rx*.32);F(`rgba(90,55,30,${a==null?.2:a})`);}
function shade(hex,k){const n=parseInt(hex.slice(1),16);let r=n>>16,gg=(n>>8)&255,b=n&255;const f=k<0?0:255,p=Math.abs(k);r=Math.round(r+(f-r)*p);gg=Math.round(gg+(f-gg)*p);b=Math.round(b+(f-b)*p);return '#'+((1<<24)+(r<<16)+(gg<<8)+b).toString(16).slice(1);}
function mix(a,b,t){const A=parseInt(a.slice(1),16),B=parseInt(b.slice(1),16);const c=[16,8,0].map(s=>Math.round(((A>>s)&255)+(((B>>s)&255)-((A>>s)&255))*t));return '#'+((1<<24)+(c[0]<<16)+(c[1]<<8)+c[2]).toString(16).slice(1);}
function box(x,by,w,fh,td,top,front,r){r=r==null?6:r;const L=x-w/2;rr(L,by-fh-2,w,fh+2,r);F(front);S(2.2);rr(L,by-fh-td,w,td,r);F(top);S(2.2);}
function txt(s,x,y,size,col,opt){opt=opt||{};g.font=`${opt.w||700} ${size}px ${opt.f||'Fredoka'}, system-ui, sans-serif`;g.textAlign=opt.a||'center';g.textBaseline='middle';if(opt.o){g.lineWidth=opt.ow||3;g.strokeStyle=opt.o;g.lineJoin='round';g.strokeText(s,x,y);}g.fillStyle=col;g.fillText(s,x,y);}
function ease(t){return 1-Math.pow(1-t,3);}
function easeBack(t){const c1=1.70158,c3=c1+1;return 1+c3*Math.pow(t-1,3)+c1*Math.pow(t-1,2);}
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const rnd=a=>a[Math.floor(Math.random()*a.length)];
const fmt=n=>{n=Math.floor(n);return n>=1e6?(n/1e6).toFixed(1)+'M':n>=1e4?(n/1e3).toFixed(1)+'k':String(n);};

/* ====================== EŞYALAR ====================== */
const ITEM={
  kulce(){g.beginPath();g.moveTo(-8,3);g.lineTo(8,3);g.lineTo(6,-2.5);g.lineTo(-6,-2.5);g.closePath();F('#7f8899');S(1.8);
    g.beginPath();g.moveTo(-6,-2.5);g.lineTo(6,-2.5);g.lineTo(4.5,-5.5);g.lineTo(-4.5,-5.5);g.closePath();F('#c6cdd8');S(1.8);},
  kizgin(){const gr=g.createRadialGradient(0,0,1,0,0,13);gr.addColorStop(0,'rgba(255,170,60,.55)');gr.addColorStop(1,'rgba(255,120,40,0)');g.fillStyle=gr;g.fillRect(-14,-14,28,28);
    g.beginPath();g.moveTo(-8,3);g.lineTo(8,3);g.lineTo(6,-2.5);g.lineTo(-6,-2.5);g.closePath();F('#f06a22');S(1.8);
    g.beginPath();g.moveTo(-6,-2.5);g.lineTo(6,-2.5);g.lineTo(4.5,-5.5);g.lineTo(-4.5,-5.5);g.closePath();F('#ffd35c');S(1.8);},
  yatagan(){g.save();g.rotate(-.35);
    g.beginPath();g.moveTo(-3,-1.8);g.quadraticCurveTo(7,-2.5,14,-7);g.quadraticCurveTo(10,1.5,-3,2.2);g.closePath();F('#e8edf5');S(1.7);
    g.beginPath();g.moveTo(-1,-.4);g.quadraticCurveTo(7,-1,12,-5);S(1,'#aeb8c8');
    rr(-5,-4.2,3,8.4,1.2);F('#f0b43c');S(1.5);rr(-11,-1.7,6.5,3.4,1.4);F('#7a4423');S(1.5);circ(-11.5,0,2);F('#f0b43c');S(1.3);g.restore();},
  yun(){[[-4,1.5,4.6],[3.5,1,5],[0,-3.5,4.8]].forEach(c=>{circ(c[0],c[1],c[2]);F('#fbf4e6');S(1.6);});
    g.beginPath();g.arc(0,-3.5,2,0,4);S(1,'#d9cbb0');g.beginPath();g.arc(3.5,1,2,1,5);S(1,'#d9cbb0');},
  zirh(){g.beginPath();g.moveTo(-8,-5);g.lineTo(-3,-7);g.quadraticCurveTo(0,-3,3,-7);g.lineTo(8,-5);g.lineTo(7,6);g.lineTo(-7,6);g.closePath();F('#c64a3c');S(1.7);
    g.beginPath();g.moveTo(0,-4);g.lineTo(0,6);S(1.4,'#f0b43c');g.beginPath();g.moveTo(-7,3);g.lineTo(7,3);S(1.4,'#f0b43c');
    circ(-2.5,0,1);F('#f0b43c');circ(2.5,0,1);F('#f0b43c');},
  kagit(){g.save();g.rotate(.12);rr(-7,-4,14,9,1.5);F('#efe3c6');S(1.5);g.restore();rr(-7,-5,14,9,1.5);F('#fbf4e2');S(1.5);
    for(let i=0;i<3;i++){g.beginPath();g.moveTo(-4,-2.5+i*2.4);g.lineTo(4-(i==2?3:0),-2.5+i*2.4);S(.9,'#c9b48a');}},
  parsomen(){rr(-6,-6,12,12,2);F('#f6e9c8');S(1.6);rr(-8.5,-8.5,17,4.2,2.1);F('#e3cfa0');S(1.6);rr(-8.5,4.5,17,4.2,2.1);F('#e3cfa0');S(1.6);
    g.beginPath();g.moveTo(-3.5,-2);g.lineTo(3.5,-2);g.moveTo(-3.5,.5);g.lineTo(2,.5);S(.9,'#9a7e55');circ(3,3,2.6);F('#c9302a');S(1.2);},
  as(){g.beginPath();g.moveTo(-8,-1);g.quadraticCurveTo(-7,7,0,7);g.quadraticCurveTo(7,7,8,-1);g.closePath();F('#9a5a30');S(1.7);
    el(0,-1,8,2.6);F('#f0a040');S(1.5);circ(-2,-1.4,1);F('#fff3c0');
    g.beginPath();g.moveTo(-2,-5);g.quadraticCurveTo(-4,-8,-2,-11);g.moveTo(2.5,-5);g.quadraticCurveTo(.5,-8,2.5,-11);S(1.3,'rgba(255,255,255,.85)');}
};
const ISPR={},ISS=3.2,IBX=46;
function itemSprite(id){let c=ISPR[id];if(c)return c;c=document.createElement('canvas');c.width=c.height=Math.round(IBX*ISS);const prev=g,pT=T;g=c.getContext('2d');g.setTransform(ISS,0,0,ISS,IBX/2*ISS,IBX/2*ISS);T=.4;try{ITEM[id]();}catch(e){}g=prev;T=pT;ISPR[id]=c;return c;}
function drawItem(id,x,y,k){k=k||1;if(!ITEM[id])return;g.drawImage(itemSprite(id),x-IBX/2*k,y-IBX/2*k,IBX*k,IBX*k);}
function stackGap(id){return GAP[id]||5.5;}

/* ====================== KARAKTERLER ====================== */
function eye(x,y,r,o,pup){
  const blink=((T*1.1+(o.seed||0))%4.2)<.13;
  if(blink){g.beginPath();g.moveTo(x-r,y);g.quadraticCurveTo(x,y+r*.5,x+r,y);S(1.6);return;}
  el(x,y,r,r*1.1);F('#ffffff');S(1.6);
  const lx=(o.look||0)*r*.35;circ(x+lx+r*.12,y+r*.1,r*(pup||.55));F('#2a1c22');circ(x+lx+r*.3,y-r*.15,r*.18);F('#ffffff');
}
function blush(x,y){el(x,y,3.2,2);F('rgba(240,120,120,.35)');}
const HEADS={
  yavsuk(R,o){const sk=o.skin||'#a9d46e';
    [-1,1].forEach(s=>{g.save();g.translate(s*R*.95,-R*.25);g.rotate(s*.38);el(s*R*.45,0,R*.8,R*.38);F(sk);S(2);el(s*R*.5,0,R*.5,R*.2);F('#d9efa6');g.restore();});
    circ(0,0,R);F(sk);S(2.2);
    g.beginPath();g.moveTo(-3,-R+1);g.quadraticCurveTo(-2,-R-6,1,-R-4);g.moveTo(1,-R+.5);g.quadraticCurveTo(3,-R-7,6,-R-3);S(2);
    eye(-R*.36,-R*.05,R*.3,o,.5);eye(R*.42,-R*.05,R*.3,o,.5);
    blush(-R*.55,R*.38);blush(R*.62,R*.38);
    g.beginPath();g.moveTo(-R*.15,R*.42);g.quadraticCurveTo(R*.18,R*.7,R*.45,R*.38);S(1.8);
    g.beginPath();g.moveTo(R*.02,R*.5);g.lineTo(R*.08,R*.68);g.lineTo(R*.16,R*.53);F('#fffbe8');S(1.1);},
  insan(R,o){circ(0,0,R);F(o.skin);S(2.2);
    g.beginPath();g.arc(0,-1,R+.5,Math.PI*1.03,Math.PI*1.97);g.quadraticCurveTo(R*.3,-R*.35,-R*.95,-R*.2);g.closePath();F(o.hair);S(2);
    rr(-R,-R*.48,R*2,R*.28,2);F(o.band||'#c9463d');S(1.6);
    eye(-R*.32,R*.1,R*.2,o,.6);eye(R*.42,R*.1,R*.2,o,.6);blush(-R*.55,R*.45);blush(R*.62,R*.45);
    g.beginPath();g.moveTo(R*.02,R*.55);g.quadraticCurveTo(R*.18,R*.68,R*.34,R*.55);S(1.5);},
  ucmakan(R,o){HEADS.insan(R,Object.assign({},o,{band:'#f0b43c'}));
    g.beginPath();g.moveTo(-R*.85,-R*.45);g.quadraticCurveTo(-R*.9,-R*1.9,0,-R*2.1);g.quadraticCurveTo(R*.9,-R*1.9,R*.85,-R*.45);g.closePath();F('#c9463d');S(2);
    rr(-R*.95,-R*.62,R*1.9,R*.3,3);F('#f0b43c');S(1.6);circ(0,-R*2.05,2.2);F('#f0b43c');S(1.3);},
  asker(R,o){HEADS.insan(R,Object.assign({},o,{hair:'#2a1c22',band:'#2a1c22'}));g.beginPath();g.arc(0,-R*.15,R*1.08,Math.PI,0);g.lineTo(R*1.15,-R*.05);g.lineTo(-R*1.15,-R*.05);g.closePath();F('#7a7f8c');S(2);rr(-2,-R*1.55,4,R*.5,2);F('#7a7f8c');S(1.5);g.beginPath();g.moveTo(0,-R*1.5);g.quadraticCurveTo(-R*.9,-R*2.1,-R*1.3,-R*1.4);S(3,'#c9302a');},
  sar(R,o){circ(0,R*.05,R*1.18);F('#3d3b4c');S(2.2);el(R*.12,R*.18,R*.72,R*.78);F(o.skin);S(1.8);
    g.beginPath();g.moveTo(-R*.2,R*.02);g.lineTo(R*.04,R*.06);g.moveTo(R*.3,R*.06);g.lineTo(R*.55,R*.02);S(1.6);
    circ(-R*.08,R*.16,1.5);F('#2a1c22');circ(R*.43,R*.16,1.5);F('#2a1c22');
    g.beginPath();g.moveTo(R*.05,R*.58);g.lineTo(R*.32,R*.56);S(1.4);
    g.beginPath();g.moveTo(-R*.2,-R*1.1);g.quadraticCurveTo(-R*.9,-R*2.3,-R*.3,-R*2.6);g.quadraticCurveTo(-R*.1,-R*1.8,R*.05,-R*1.15);F('#fbf6ee');S(1.6);
    circ(-R*.05,-R*1.08,3.2);F('#f0b43c');S(1.5);circ(-R*.05,-R*1.08,1.2);F('#c9302a');},
  yasruk(R,o){[-1,1].forEach(s=>{g.beginPath();g.moveTo(s*R*.9,-R*.25);g.lineTo(s*R*1.35,-R*.6);g.lineTo(s*R*.95,R*.05);g.closePath();F(o.skin);S(2);});
    rr(-R,-R*.88,R*2,R*1.78,R*.72);F(o.skin);S(2.3);
    g.beginPath();g.moveTo(-R*.7,-R*.36);g.quadraticCurveTo(-R*.3,-R*.55,-R*.05,-R*.3);g.moveTo(R*.15,-R*.3);g.quadraticCurveTo(R*.45,-R*.55,R*.82,-R*.36);S(2.2,shade(o.skin,-.45));
    eye(-R*.38,-R*.04,R*.2,o,.62);eye(R*.46,-R*.04,R*.2,o,.62);
    const tear=((T*.6+(o.seed||0))%3)/3;el(R*.66,R*.12+tear*R*.55,1.6,2.4);F('rgba(120,190,255,.9)');
    g.beginPath();g.moveTo(-R*.42,R*.42);g.quadraticCurveTo(R*.04,R*.62,R*.5,R*.42);S(2);
    [-1,1].forEach(s=>{g.beginPath();g.moveTo(s*R*.36-2,R*.46);g.lineTo(s*R*.36,R*.12);g.lineTo(s*R*.36+2.2,R*.46);g.closePath();F('#f2e3a8');S(1.4);});},
  gaksoy(R,o){circ(0,0,R);F('#3a3448');S(2.2);
    for(let i=-1;i<=1;i++){g.beginPath();g.moveTo(i*3-2,-R+1);g.lineTo(i*4,-R-6-Math.abs(i)*-2);g.lineTo(i*3+2,-R+1);F('#3a3448');S(1.6);}
    g.beginPath();g.moveTo(R*.55,-R*.15);g.lineTo(R*1.75,R*.12);g.lineTo(R*.55,R*.42);g.closePath();F('#eab048');S(1.8);
    g.beginPath();g.moveTo(R*.6,R*.14);g.lineTo(R*1.5,R*.14);S(1.2);
    eye(R*.18,-R*.22,R*.26,o,.6);},
  puhusoy(R,o){[-1,1].forEach(s=>{g.beginPath();g.moveTo(s*R*.35,-R*.8);g.lineTo(s*R*.95,-R*1.45);g.lineTo(s*R*.9,-R*.4);g.closePath();F(o.skin);S(1.8);});
    circ(0,0,R);F(o.skin);S(2.2);
    el(-R*.38,R*.02,R*.5,R*.55);F('#f4e6c8');el(R*.38,R*.02,R*.5,R*.55);F('#f4e6c8');
    [-1,1].forEach(s=>{circ(s*R*.38,0,R*.34);F('#f2a838');S(1.6);circ(s*R*.38+(o.look||0)*1.5,0,R*.18);F('#2a1c22');circ(s*R*.38+1.5,-2,1.2);F('#fff');});
    if(o.glasses){[-1,1].forEach(s=>{circ(s*R*.38,0,R*.44);S(1.6,'#6a4a2a');});g.beginPath();g.moveTo(-R*.06,0);g.lineTo(R*.06,0);S(1.6,'#6a4a2a');}
    g.beginPath();g.moveTo(-2.5,R*.35);g.lineTo(2.5,R*.35);g.lineTo(0,R*.68);g.closePath();F('#e8a848');S(1.3);},
  pullukul(R,o){for(let i=0;i<4;i++){g.beginPath();g.moveTo(-R*.6+i*R*.42,-R*.85);g.lineTo(-R*.42+i*R*.42,-R*1.3);g.lineTo(-R*.2+i*R*.42,-R*.82);g.closePath();F(shade(o.skin,-.2));S(1.4);}
    el(R*.2,0,R*1.2,R*.86);F(o.skin);S(2.2);
    [[-.4,-.35],[.1,-.5],[-.6,.2],[.6,.4],[-.1,.45]].forEach(p=>{circ(p[0]*R,p[1]*R,1.6);F(shade(o.skin,-.22));});
    el(R*.28,-R*.2,R*.3,R*.3);F('#f2e04c');S(1.6);el(R*.3,-R*.2,R*.06,R*.24);F('#2a1c22');
    circ(R*1.15,-R*.05,1);F('#2a1c22');
    g.beginPath();g.moveTo(R*.4,R*.42);g.quadraticCurveTo(R*.85,R*.55,R*1.2,R*.3);S(1.6);},
  zerksoy(R,o){g.beginPath();g.moveTo(0,-R*1.05);g.quadraticCurveTo(R*1.4,-R*.6,R*1.15,R*.35);g.quadraticCurveTo(R*.4,R*1.05,-R*.6,R*.7);g.quadraticCurveTo(-R*1.2,0,0,-R*1.05);g.closePath();F(o.skin);S(2.2);
    for(let i=0;i<3;i++){g.beginPath();g.moveTo(-R*.5+i*R*.4,-R*.7);g.lineTo(-R*.3+i*R*.4,-R*.45);g.lineTo(-R*.5+i*R*.4,-R*.2);g.lineTo(-R*.7+i*R*.4,-R*.45);g.closePath();F(shade(o.skin,-.25));}
    el(R*.4,-R*.08,R*.34,R*.27);F('#f4e44c');S(1.6);circ(R*.3,-R*.08,R*.09);F('#2a1c22');circ(R*.52,-R*.08,R*.09);F('#2a1c22');
    if(((T*.8+(o.seed||0))%2.2)<.45){g.beginPath();g.moveTo(R*.9,R*.45);g.lineTo(R*1.55,R*.5);g.moveTo(R*1.55,R*.5);g.lineTo(R*1.8,R*.38);g.moveTo(R*1.55,R*.5);g.lineTo(R*1.8,R*.62);S(1.6,'#d8343a');}},
  tirmik(R,o){[-1,1].forEach(s=>{g.beginPath();g.moveTo(s*R*.25,-R*.75);g.lineTo(s*R*.85,-R*1.35);g.lineTo(s*R*.95,-R*.3);g.closePath();F(o.skin);S(2);g.beginPath();g.moveTo(s*R*.42,-R*.72);g.lineTo(s*R*.8,-R*1.08);g.lineTo(s*R*.82,-R*.48);g.closePath();F('#f4b0a8');});
    circ(0,0,R);F(o.skin);S(2.2);
    for(let i=-1;i<=1;i++){g.beginPath();g.moveTo(i*R*.25,-R*.98);g.lineTo(i*R*.2,-R*.6);S(2,shade(o.skin,-.3));}
    [-1,1].forEach(s=>{el(s*R*.4,R*.05,R*.2,R*.24);F('#8ad06a');S(1.4);el(s*R*.4,R*.05,R*.05,R*.18);F('#2a1c22');});
    g.beginPath();g.moveTo(-2,R*.32);g.lineTo(2,R*.32);g.lineTo(0,R*.48);g.closePath();F('#f08a8a');
    [-1,1].forEach(s=>{g.beginPath();g.moveTo(s*R*.35,R*.45);g.lineTo(s*R*1.25,R*.32);g.moveTo(s*R*.35,R*.55);g.lineTo(s*R*1.25,R*.62);S(1,'#4a3226');});}
};
// genel insansı: (x,y)= ayak ortası
function drawGuy(x,y,o,sp){
  g.save();g.translate(x,y);
  shadow(0,0,sp.bw*.62,3.6);
  const mv=o.moving,ph=(o.walk||0)*13,bob=mv?Math.abs(Math.sin(ph))*2.4:Math.sin(T*2.4+(o.seed||0))*.6;
  if(o.dir<0)g.scale(-1,1);
  const k=sp.k||1;g.scale(k,k);
  const bw=sp.bw,bh=sp.bh,R=sp.R,legH=sp.leg||8;
  const sw=mv?Math.sin(ph)*3.2:0;
  if(sp.tail){g.save();g.translate(-bw*.4,-legH-bh*.25-bob);g.rotate(Math.sin(T*3+(o.seed||0))*.25);g.beginPath();g.moveTo(0,0);g.quadraticCurveTo(-14,-2,-16,-14);S(5.5);g.beginPath();g.moveTo(0,0);g.quadraticCurveTo(-14,-2,-16,-14);S(3.2,sp.tail);g.restore();}
  [-1,1].forEach((s,i)=>{rr(s*bw*.22-3+(i?sw:-sw)*.5,-legH-1,6,legH+1,2.5);F(sp.leg2||shade(sp.cloth,-.35));S(1.8);});
  const by=-legH-bh-bob;
  if(sp.wing){[-1,1].forEach(s=>{el(s*bw*.5,by+bh*.45,4.5,bh*.42,s*(.25+(mv?Math.sin(ph)*.15:0)));F(sp.wing);S(1.8);});}
  rr(-bw/2,by,bw,bh,Math.min(8,bw*.4));F(sp.cloth);S(2.2);
  if(sp.apron){rr(-bw*.32,by+bh*.28,bw*.64,bh*.68,4);F(sp.apron);S(1.6);g.beginPath();g.moveTo(-bw*.2,by+bh*.55);g.lineTo(bw*.2,by+bh*.55);S(1.1,shade(sp.apron,-.25));}
  if(sp.belt){rr(-bw/2+1,by+bh*.55,bw-2,3.5,1.5);F(sp.belt);S(1.3);}
  if(sp.trim){g.beginPath();g.moveTo(0,by+2);g.lineTo(0,by+bh-1);S(1.6,sp.trim);}
  let handY=by+bh*.5;
  if(!sp.wing){
    if(o.carry){[-1,1].forEach(s=>{circ(s*bw*.45,by+3,3.6);F(sp.skin2||o.skin);S(1.7);});}
    else if(o.tool){/* alet eli aşağıda çizilir */circ(-bw*.52,handY+(mv?-sw*.5:0),3.6);F(sp.skin2||o.skin);S(1.7);}
    else [-1,1].forEach(s=>{circ(s*bw*.55,handY+(mv?s*sw*.6:0),3.6);F(sp.skin2||o.skin);S(1.7);});
  }
  const hy=by-R*.78;
  g.save();g.translate(0,hy);HEADS[sp.head](R,o);g.restore();
  if(o.tool&&!sp.wing)drawTool(o.tool,bw*.5,handY,o.toolA||0,sp.skin2||o.skin);
  g.restore();
  return y-(legH+bh+R*1.75+bob)*k;
}
function drawTool(tool,x,y,a,skin){
  g.save();g.translate(x,y);g.rotate(a);
  if(tool==='hammer'){rr(-1.6,-16,3.2,17,1.5);F('#8a5a32');S(1.6);rr(-6,-21,12,7,2);F('#6d7484');S(1.8);rr(-6,-21,12,2.5,1.2);F('#a4abb9');}
  else if(tool==='mallet'){rr(-1.6,-15,3.2,16,1.5);F('#8a5a32');S(1.6);rr(-5.5,-22,11,8,3);F('#c48a52');S(1.8);}
  else if(tool==='quill'){g.beginPath();g.moveTo(0,0);g.quadraticCurveTo(-3,-10,2,-20);g.quadraticCurveTo(5,-10,0,0);F('#fbf6ee');S(1.4);g.beginPath();g.moveTo(0,0);g.lineTo(1,-17);S(.9,'#b8a888');}
  circ(0,0,3.6);F(skin);S(1.7);
  g.restore();
}
/* soy tarifleri */
const RACES={
  insan:{at:'silah',head:'insan',bw:18,bh:16,R:11,cloth:'#4f7ec2',skin:'#f0c39a',hair:['#5a3a22','#2a1c22','#b8622f'],belt:'#7a4a2a',w:{silah:5,zirh:2,parsomen:1},sp:1,
    gir:["Bir yatağan. Keskin olsun.","Ejderha için ne önerirsin?","Maceraya çıkıyoruz, indirim var mı?","Bu yatağan hâlâ sıcak mı?"],
    ode:["Al şu nüdleri.","Bereketli olsun!","Tam bir sanat eseri!"],kiz:["Bu kuyruk ejderhadan beter!","Başka pazara gidiyorum!"]},
  yasruk:{at:'zirh',head:'yasruk',bw:30,bh:24,R:14,leg:10,cloth:'#8a6a45',skin:'#7cae58',belt:'#5a3a22',w:{silah:3,zirh:3},sp:.8,
    gir:["Topuz. Büyüğünden.","Bu zırh bana olur mu? Olmaz mı...","Kılıcın kabzası çiçekli mi?"],
    ode:["Bu fiyat kalbimi kırdı... *hıçkırık*","Teşekkür ederim... *gözyaşı*","Bu zırhı ninem dikmiş gibi..."],kiz:["*kırgın bir mani okuyarak çıktı*","Bekletildim... kalbim kırıldı."],snd:'sob'},
  gaksoy:{at:'parsomen',head:'gaksoy',bw:16,bh:15,R:10.5,cloth:'#4a3a5a',skin:'#3a3448',wing:'#2e2838',w:{parsomen:2,silah:2},sp:1.1,
    gir:['ECHO'],ode:['*kasa zili taklidi*','*para şıngırtısı taklidi*','*örs sesi taklidi*'],kiz:['*kapı gıcırtısı taklidi*']},
  puhusoy:{at:'parsomen',head:'puhusoy',bw:20,bh:16,R:12,cloth:'#6a5a8a',skin:'#9a6c45',wing:'#8a5e3a',w:{parsomen:6},sp:.9,
    gir:["Fiyatları kaydettim. İki kere.","Bu parşömen tasnif edilmiş mi?","Mürekkebi kurumuş mu?"],
    ode:["Fişini dosyaladım.","Kayda geçti."],kiz:["Bu gecikmeyi kayda geçiyorum!","Şikâyetimi üç nüsha yazacağım."]},
  pullukul:{at:'zirh',head:'pullukul',bw:18,bh:16,R:11,cloth:'#2f6a5a',skin:'#62a66e',tail:'#62a66e',pale:true,w:{zirh:5,silah:1},sp:1,
    gir:["Pulumu çizmeyen bir zırh.","Peçe takmam. Zırh alırım."],
    ode:["Pullarım yine yeşerdi.","Torunlarım bu alışverişi hatırlayacak."],kiz:["Açlıktan bembeyaz oldum!","Pullarım ağardı, gidiyorum!"]},
  zerksoy:{at:'parsomen',head:'zerksoy',bw:17,bh:17,R:11,cloth:'#2c2c52',skin:'#8a62b5',trim:'#f0b43c',w:{zirh:2,parsomen:3},sp:.9,
    gir:["~kararsız bir koku~","~zırh kokan bir titreşim~"],ode:["~memnun bir koku~","~tatlı bir titreşim~"],kiz:["~çok kırgın bir koku~","~öfkeli titreşim~"]},
  tirmik:{at:'silah',head:'tirmik',bw:16,bh:15,R:10.5,cloth:'#5a7a3a',skin:'#e39a4c',tail:'#e39a4c',w:{silah:3,zirh:1},sp:1.3,
    gir:["...","...!"],ode:["...","*mırr*"],kiz:["... ...!"]},
  ucmakan:{at:'silah',head:'ucmakan',bw:19,bh:17,R:11,cloth:'#a8642e',skin:'#d8a476',hair:['#2a1c22','#5a3a22'],belt:'#f0b43c',w:{silah:2,zirh:2,parsomen:1},sp:1,
    gir:["Atım için de bir şey var mı?","Mahluk avına çıkıyoruz.","Kervanı korumaya gidiyoruz."],ode:["Kalanı Yurt'a.","Atıma selam söylerim."],kiz:["Atım beklemekten sıkıldı!","Atımı bekletemem!"]},
  sar:{head:'sar',bw:18,bh:18,R:11,cloth:'#3d3b4c',skin:'#efe0cf',sp:.8,w:{}}
};
const RACE_INTRO={insan:['İnsan','Maceracı, yolcu, paralı asker. Yatağana bayılır.'],ucmakan:['Uçmakan','Atı insandan aziz tutar, kazancı Yurt\'a atar.'],tirmik:['Tırmıksoy','Kedi çehreli ve sessiz. Konuşmaz, mırlar.'],yasruk:['Yaşruk','Kalbi kırılınca ağlar. Fiyat da kalp kırar.'],pullukul:['Pullukul','Bekledikçe pulları ağarır. Acele et!'],puhusoy:['Puhusoy','Her şeyi kayda geçer. İki kere.'],gaksoy:['Gaksoy','Kendi sesi yok, duyduğunu taklit eder.'],zerksoy:['Zerksoy','Koku ve titreşimle konuşur.']};
const RACE_IDS=['insan','yasruk','gaksoy','puhusoy','pullukul','zerksoy','tirmik','ucmakan'];
const YAV={head:'yavsuk',bw:15,bh:13,R:12,leg:7,cloth:'#5f86c4',apron:'#f6ead2',skin:'#a9d46e'};
const HAMAL={head:'yasruk',bw:30,bh:24,R:14,leg:10,cloth:'#6f8a3e',skin:'#7cae58',belt:'#5a3a22'};
const KATIP={head:'puhusoy',bw:20,bh:16,R:12,cloth:'#8a3a4a',skin:'#9a6c45',wing:'#8a5e3a'};
const USTA={head:'ucmakan',bw:22,bh:18,R:11.5,cloth:'#5a3a2a',skin:'#d8a476',apron:'#6a5040',leg:8};


