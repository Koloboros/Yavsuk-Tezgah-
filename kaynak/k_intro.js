/* ====================== INTRO ====================== */
let ITT=0,introLetters=null;const STARS=[];for(let i=0;i<70;i++)STARS.push([Math.random()*W,Math.random()*380,Math.random()*1.6+.4,Math.random()*6]);
const INTRO_P=[];let lastStrike=-1,bannerSnd=false,coinSnd=false;
function skipIntro(){lastStrike=5;bannerSnd=true;coinSnd=true;startMusic();}
function introScene(dt){
  g=cx;g.setTransform(1,0,0,1,0,0);
  const gr=g.createLinearGradient(0,0,0,cv.height);gr.addColorStop(0,'#1c1235');gr.addColorStop(.45,'#5a2c55');gr.addColorStop(.62,'#d8704a');gr.addColorStop(.63,'#5a3a4a');gr.addColorStop(1,'#3a2438');
  g.fillStyle=gr;g.fillRect(0,0,cv.width,cv.height);
  g.setTransform(ISC*DPR,0,0,ISC*DPR,IOX*DPR,IOY*DPR);
  for(const s of STARS){g.globalAlpha=.4+Math.sin(T*2+s[3])*.35;circ(s[0],s[1],s[2]);F('#fff6d8');}g.globalAlpha=1;
  const mg=g.createRadialGradient(286,118,10,286,118,80);mg.addColorStop(0,'rgba(255,240,200,.35)');mg.addColorStop(1,'rgba(255,240,200,0)');g.fillStyle=mg;g.fillRect(200,30,170,170);
  circ(286,118,26);F('#fff1c8');circ(278,112,4);F('#efdca8');circ(294,126,6);F('#efdca8');
  // tepeler
  g.beginPath();g.moveTo(-40,450);for(let x=-40;x<=400;x+=20)g.lineTo(x,430+Math.sin(x*.02)*22);g.lineTo(400,760);g.lineTo(-40,760);g.closePath();F('#4a2a4a');
  // uzak çadırlar
  [[40,428,.9],[95,420,1.2],[260,418,1.1],[322,430,.85]].forEach(([x,y,s],i)=>{g.save();g.translate(x,y);g.scale(s,s);g.beginPath();g.moveTo(-22,8);g.quadraticCurveTo(-20,-18,0,-26);g.quadraticCurveTo(20,-18,22,8);g.closePath();F('#2e1a34');rr(-5,-6,10,14,5);F(`rgba(255,200,110,${.7+Math.sin(T*3+i)*.2})`);g.restore();});
  g.beginPath();g.moveTo(-40,520);for(let x=-40;x<=400;x+=20)g.lineTo(x,505+Math.sin(x*.015+1)*16);g.lineTo(400,760);g.lineTo(-40,760);g.closePath();F('#6a3a4a');
  g.beginPath();g.moveTo(-40,560);for(let x=-40;x<=400;x+=20)g.lineTo(x,552+Math.sin(x*.02+2)*8);g.lineTo(400,760);g.lineTo(-40,760);g.closePath();F('#8a4a4a');
  // ip fenerler
  g.beginPath();g.moveTo(-10,120);g.quadraticCurveTo(180,190,370,120);S(1.5,'rgba(40,20,30,.8)');
  for(let i=0;i<9;i++){const t=(i+1)/10,x=(1-t)*(1-t)*-10+2*(1-t)*t*180+t*t*370,yy=120+140*t*(1-t);g.beginPath();g.moveTo(x,yy);g.lineTo(x,yy+3);S(1.2,'#2a1a26');circ(x,yy+7,4.5);F(['#ffcf5a','#ff8a5a','#9ad06a'][i%3]);S(1.4,'#2a1a26');}
  if(MODE==='splash'){
    const p=Math.sin(T*4)*.06+1;g.save();g.translate(180,330);g.scale(p,p);circ(0,0,44);F('#f0b43c');S(4,'#2a1a26');g.beginPath();g.moveTo(-12,-18);g.lineTo(20,0);g.lineTo(-12,18);g.closePath();F('#2a1a26');g.restore();
    txt('Dokun, ocağı yak',180,410,20,'#ffe9b8',{o:'#2a1a26',ow:5});txt('🔊 sesi aç',180,438,13,'#ffe9b8',{w:600});
    return;}
  ITT+=dt;
  // örs + yavşuk
  const ax=180,ay=560;shadow(ax,ay+2,40,8,.35);
  rr(ax-22,ay-24,44,26,5);F('#7a4a2a');S(2.5);el(ax,ay-24,22,6);F('#a06a3a');S(2.5);
  g.beginPath();g.moveTo(ax-34,ay-42);g.lineTo(ax+12,ay-42);g.quadraticCurveTo(ax+30,ay-42,ax+34,ay-34);g.lineTo(ax+12,ay-32);g.lineTo(ax+10,ay-26);g.lineTo(ax-20,ay-26);g.lineTo(ax-28,ay-32);g.closePath();F('#5d6474');S(2.5);
  drawItem('kizgin',ax-6,ay-46,1.3);
  // vuruş zamanlaması
  const LET=['Y','A','V','Ş','U','K'];
  const strikeAt=i=>.9+i*.42;let since=99;
  for(let i=0;i<6;i++){const st=strikeAt(i);if(ITT>=st&&lastStrike<i){lastStrike=i;sfx('clang');shake=5;for(let k=0;k<22;k++){const a=-Math.PI/2+(Math.random()-.5)*2.8,v=90+Math.random()*160;INTRO_P.push({x:ax-6,y:ay-50,vx:Math.cos(a)*v,vy:Math.sin(a)*v,t:.6+Math.random()*.4,k:'spark'});}}
    if(ITT>=st)since=Math.min(since,ITT-st);}
  const yo={seed:1,look:.6,dir:1,walk:ITT*0,moving:false,skin:YAV.skin,tool:'hammer',toolA:since<.12?.5:since<.3?.5-((since-.12)/.18)*2:-1.5};
  const hop=ITT<.7?(1-ease(ITT/.7))*-80:0;
  drawGuy(ax-58,ay+6+hop,yo,Object.assign({},YAV,{k:2}));
  // harfler
  g.font="400 64px 'Lilita One', Fredoka, sans-serif";
  if(!introLetters){const ws=LET.map(c=>g.measureText(c).width);const tot=ws.reduce((a,b)=>a+b,0)+5*4;let x=180-tot/2;introLetters=LET.map((c,i)=>{const o={c,x:x+ws[i]/2};x+=ws[i]+4;return o;});}
  introLetters.forEach((L,i)=>{const st=strikeAt(i);if(ITT<st)return;const k=clamp((ITT-st)/.32,0,1);
    const tx=L.x,ty=236,sx=ax-6,sy=ay-50;const x=sx+(tx-sx)*ease(k),y=sy+(ty-sy)*ease(k)-Math.sin(k*Math.PI)*120;
    let scx=1,scy=1;if(k>=1){const b=ITT-st-.32;scy=1-Math.sin(clamp(b/.25,0,1)*Math.PI)*.28*Math.exp(-b*3);scx=2-scy;}else{scx=.4+.6*k;scy=scx;}
    g.save();g.translate(x,y+(1-scy)*20);g.rotate((1-k)*(i%2?.9:-.9));g.scale(scx,scy);
    g.font="400 64px 'Lilita One', Fredoka, sans-serif";g.textAlign='center';g.textBaseline='middle';
    g.lineJoin='round';g.lineWidth=12;g.strokeStyle='#2a1a26';g.strokeText(L.c,0,4);
    const lg=g.createLinearGradient(0,-30,0,30);lg.addColorStop(0,'#fff3a8');lg.addColorStop(.55,'#ffc23c');lg.addColorStop(1,'#e07a1a');
    g.lineWidth=7;g.strokeStyle='#5a2a1a';g.strokeText(L.c,0,0);g.fillStyle=lg;g.fillText(L.c,0,0);
    g.globalAlpha=.55;g.fillStyle='#fff';g.fillText(L.c,-1.5,-2.5);g.globalAlpha=1;g.fillStyle=lg;g.fillText(L.c,0,0);
    g.restore();});
  // TEZGÂHI afişi
  const bt=3.55;if(ITT>=bt){if(!bannerSnd){bannerSnd=true;sfx('whoosh');sfx('boing',.6);startMusic();}
    const k=easeBack(clamp((ITT-bt)/.55,0,1));const bw=280*k;
    if(bw>4){g.save();g.translate(180,312);
      [-1,1].forEach(s=>{g.beginPath();g.moveTo(s*bw/2,-20);g.lineTo(s*(bw/2+18),-26);g.lineTo(s*(bw/2+10),0);g.lineTo(s*(bw/2+18),26);g.lineTo(s*bw/2,20);g.closePath();F('#8a2f2a');S(3,'#2a1a26');});
      rr(-bw/2,-28,bw,56,10);F('#c9463d');S(3.5,'#2a1a26');rr(-bw/2+6,-22,bw-12,44,7);S(2,'#f0b43c');
      for(let x=-bw/2+14;x<bw/2-10;x+=18){circ(x,30,3);F('#f0b43c');S(1.2,'#2a1a26');}
      g.save();rr(-bw/2,-28,bw,56,10);g.clip();txt('TEZGÂHI',0,2,42,'#fff2d0',{f:"'Lilita One'",w:400,o:'#2a1a26',ow:8});g.restore();g.restore();}}
  if(ITT>=4.15){const a=clamp((ITT-4.15)/.5,0,1);g.globalAlpha=a;txt("Agreguk Pazarı'nın en kurnaz tezgâhı",180,372,15,'#ffe9b8',{o:'#2a1a26',ow:4,w:600});g.globalAlpha=1;
    if(!coinSnd){coinSnd=true;sfx('sparkle');for(let i=0;i<26;i++)INTRO_P.push({x:Math.random()*W,y:-20-Math.random()*200,vx:(Math.random()-.5)*20,vy:60+Math.random()*80,t:3,k:'coin'});}}
  if(ITT>=4.7){const p=1+Math.sin(T*5)*.05;g.save();g.translate(180,660);g.scale(p,p);rr(-92,-26,184,52,18);F('#f0b43c');S(4,'#2a1a26');      txt('TEZGÂHI AÇ',0,1,24,'#4a3226',{f:"'Lilita One'",w:400});g.restore();
    txt('Oro Kıtaları',180,702,11,'rgba(255,233,184,.7)',{w:600});}
  // parçacıklar
  for(const q of INTRO_P){q.t-=dt;q.x+=q.vx*dt;q.y+=q.vy*dt;if(q.k==='spark')q.vy+=300*dt;}
  for(let i=INTRO_P.length-1;i>=0;i--)if(INTRO_P[i].t<=0)INTRO_P.splice(i,1);
  for(const q of INTRO_P){if(q.k==='spark'){g.beginPath();g.moveTo(q.x,q.y);g.lineTo(q.x-q.vx*.035,q.y-q.vy*.035);S(2.8,'#ffe08a');}else{g.save();g.translate(q.x,q.y);g.scale(Math.abs(Math.sin(T*6+q.x)),1);coinIcon(0,0,7);g.restore();}}
}

