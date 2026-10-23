/* ====================== ARA SAHNE: YEMİN ====================== */
let CI=0,CT=0,CSND=0;const CP=[];
const SOLD={head:'asker',k:1.65,bw:22,bh:22,R:11.5,leg:10,cloth:'#4a4f5e',skin:'#e0b48a',trim:'#c9302a',belt:'#2a1c22'};
const FAM=[{cloth:'#b8507a',skin:'#7cae58',k:1},{cloth:'#7a5a3a',skin:'#6f9a52',k:1.05},{cloth:'#4f8ac2',skin:'#88b862',k:.7}];
function famSp(i,k){return Object.assign({},HAMAL,{cloth:FAM[i].cloth,skin:FAM[i].skin,k:FAM[i].k*k});}
function guy(x,y,sp,o){return drawGuy(x,y,Object.assign({dir:1,walk:0,moving:false,seed:1,look:.3},o||{}),sp);}
function cpart(k,x,y,o){CP.push(Object.assign({k,x,y,vx:0,vy:0,t:1,max:1},o||{}));CP[CP.length-1].max=CP[CP.length-1].t;}
function sky(c0,c1,c2){const gr=g.createLinearGradient(0,-200,0,560);gr.addColorStop(0,c0);gr.addColorStop(.6,c1);gr.addColorStop(1,c2);g.fillStyle=gr;g.fillRect(-700,-400,1760,1000);}
function ground(y,c,c2){g.beginPath();g.moveTo(-700,y);for(let x=-700;x<=1060;x+=30)g.lineTo(x,y+Math.sin(x*.02)*6);g.lineTo(1060,1200);g.lineTo(-700,1200);g.closePath();F(c);if(c2){g.beginPath();g.moveTo(-700,y+60);for(let x=-700;x<=1060;x+=30)g.lineTo(x,y+60+Math.sin(x*.03+1)*5);g.lineTo(1060,1200);g.lineTo(-700,1200);g.closePath();F(c2);}}
function tree(x,y,s,c,dark){g.save();g.translate(x,y);g.scale(s,s);rr(-9,-90,18,92,6);F(dark?shade(c,-.5):'#6a4a32');if(!dark)S(2);
  [[0,-120,46],[-34,-96,34],[34,-98,36],[-14,-140,30],[20,-138,28]].forEach(([a,b,r])=>{circ(a,b,r);F(c);if(!dark)S(2);});
  if(!dark)for(let i=0;i<5;i++){const xx=-30+i*15;g.beginPath();g.moveTo(xx,-82);g.quadraticCurveTo(xx+3,-62,xx,-50-i%2*8);S(3,shade(c,.2));}
  g.restore();}
function hut(x,y,s,lit){g.save();g.translate(x,y);g.scale(s,s);shadow(0,4,60,10,.3);
  rr(-48,-56,96,60,14);F('#8a6a4a');S(2.5);for(let i=0;i<4;i++){g.beginPath();g.moveTo(-44,-44+i*12);g.lineTo(44,-44+i*12);S(1,'rgba(60,40,20,.35)');}
  g.beginPath();g.moveTo(-60,-46);g.quadraticCurveTo(-56,-104,0,-110);g.quadraticCurveTo(56,-104,60,-46);g.closePath();F('#5e9a52');S(2.5);
  [[-40,-60,14],[-10,-90,16],[24,-76,15],[44,-56,11]].forEach(([a,b,r])=>{circ(a,b,r);F('#76b462');S(1.8);});
  for(let i=0;i<6;i++){const xx=-50+i*20;g.beginPath();g.moveTo(xx,-48);g.quadraticCurveTo(xx+2,-38,xx,-30-(i%2)*6);S(3,'#86c472');}
  rr(-16,-32,20,36,9);F('#3a2a22');S(2);rr(14,-38,22,18,6);F(lit?'#ffcf6a':'#4a3a3a');S(2);g.restore();}
function moons(a,b){const mg=g.createRadialGradient(a[0],a[1],8,a[0],a[1],a[2]*3);mg.addColorStop(0,'rgba(240,235,255,.35)');mg.addColorStop(1,'rgba(240,235,255,0)');g.fillStyle=mg;g.fillRect(a[0]-a[2]*3,a[1]-a[2]*3,a[2]*6,a[2]*6);
  circ(a[0],a[1],a[2]);F('#f4f0ff');circ(a[0]-a[2]*.3,a[1]-a[2]*.2,a[2]*.2);F('#e0dcf0');circ(a[0]+a[2]*.35,a[1]+a[2]*.3,a[2]*.14);F('#e0dcf0');
  const rg=g.createRadialGradient(b[0],b[1],4,b[0],b[1],b[2]*3);rg.addColorStop(0,'rgba(255,90,90,.35)');rg.addColorStop(1,'rgba(255,90,90,0)');g.fillStyle=rg;g.fillRect(b[0]-b[2]*3,b[1]-b[2]*3,b[2]*6,b[2]*6);
  circ(b[0],b[1],b[2]);F('#e0484a');circ(b[0]-b[2]*.3,b[1]-b[2]*.25,b[2]*.22);F('#b83a3c');}
function spear(x,y,h,lean){g.save();g.translate(x,y);g.rotate(lean||0);rr(-1.8,-h,3.6,h,1.5);F('#6a4a32');S(1.4);g.beginPath();g.moveTo(-5,-h);g.lineTo(0,-h-16);g.lineTo(5,-h);g.closePath();F('#bfc6d4');S(1.6);g.restore();}
function banner(x,y,t){rr(x-2.5,y-150,5,150,2);F('#4a3a2a');S(1.6);const w=Math.sin(T*3)*4;g.beginPath();g.moveTo(x+2,y-148);g.quadraticCurveTo(x+24,y-142+w,x+46,y-148+w*.5);g.lineTo(x+44,y-104+w);g.quadraticCurveTo(x+24,y-100+w,x+2,y-106);g.closePath();F('#8a1f2a');S(2);
  g.beginPath();g.moveTo(x+24,y-138+w*.6);g.lineTo(x+32,y-126+w*.6);g.lineTo(x+24,y-114+w*.6);g.lineTo(x+16,y-126+w*.6);g.closePath();F('#1a1418');S(1.2,'#f0b43c');}
function fist(x,y,s){circ(x,y,7*s);F(YAV.skin);S(2);g.beginPath();g.moveTo(x-4*s,y-2*s);g.lineTo(x+4*s,y-2*s);g.moveTo(x-4*s,y+2*s);g.lineTo(x+4*s,y+2*s);S(1.2);}
function scnHome(t,dt){sky('#1e3a34','#6a9a62','#f0d08a');
  const sg=g.createRadialGradient(240,380,10,240,380,260);sg.addColorStop(0,'rgba(255,230,160,.6)');sg.addColorStop(1,'rgba(255,230,160,0)');g.fillStyle=sg;g.fillRect(-20,120,520,520);
  for(let i=0;i<9;i++)tree(-260+i*110+(i%2)*30-t*2,430,.9+(i%3)*.15,'#2f5a40',true);
  ground(470,'#4f8240','#5f9a4a');
  tree(-40-t*4,500,1.25,'#5a9a4a');tree(420-t*4,500,1.3,'#4f8a44');
  g.save();g.globalCompositeOperation='lighter';for(let i=0;i<4;i++){const x0=40+i*90+Math.sin(T*.5+i)*8;g.beginPath();g.moveTo(x0,-60);g.lineTo(x0+40,-60);g.lineTo(x0+140,520);g.lineTo(x0+60,520);g.closePath();g.fillStyle='rgba(255,240,180,.07)';g.fill();}g.restore();
  hut(272,500,1,true);
  for(let i=0;i<14;i++){const xx=-120+i*45,yy=520+(i%3)*14;el(xx,yy,14,5);F('#76b462');}
  const hop=Math.abs(Math.sin(t*4))*12;
  guy(78,560,famSp(1,1.9),{dir:1,seed:2,look:.6,skin:FAM[1].skin});
  guy(222,566,famSp(0,1.9),{dir:-1,seed:3,look:-.6,skin:FAM[0].skin});
  guy(290,572,famSp(2,1.9),{dir:-1,seed:4,look:-.4,skin:FAM[2].skin});
  guy(150,580-hop,Object.assign({},YAV,{k:2}),{dir:1,seed:1,look:.4,skin:YAV.skin,moving:hop>3,walk:t});
  for(let i=0;i<12;i++){const x=-260+i*80,y=-30+(i%3)*18;circ(x,y,60+(i%2)*14);F('#1c3a2c');}
  for(let i=0;i<10;i++){const x=-200+i*70+(i%2)*20,l=50+(i*37)%80,sw=Math.sin(T*1.2+i)*4;g.beginPath();g.moveTo(x,20);g.quadraticCurveTo(x+sw,20+l/2,x+sw*1.5,20+l);S(4,'#4f8a44');circ(x+sw*1.5,22+l,4);F('#76b462');}
  if(Math.random()<dt*2.5)cpart('heart',120+Math.random()*120,470,{vy:-30,vx:(Math.random()-.5)*20,t:1.4});
  if(Math.random()<dt*5)cpart('firefly',-100+Math.random()*560,200+Math.random()*300,{vx:(Math.random()-.5)*14,vy:(Math.random()-.5)*10,t:2.5});}
function scnSoldiers(t,dt){sky('#2a1e2e','#7a3a36','#c8704a');
  for(let i=0;i<4;i++){g.globalAlpha=.55;el(-100+i*170+t*6,120+(i%2)*40,110,26);F('#3a2a34');}g.globalAlpha=1;
  for(let i=0;i<9;i++)tree(-260+i*110+(i%2)*30,430,.9+(i%3)*.15,'#2a3a30',true);
  ground(470,'#3f5a36','#4a6a3e');hut(300,500,1,false);
  const mt=Math.min(t,3.6),arr=t>3.6;
  for(let i=3;i>=0;i--){const x=380+i*62-mt*62,y=560+(i%2)*10;spear(x-22,y-36,96,-.05);guy(x,y,SOLD,{dir:-1,seed:i,look:-.5,skin:SOLD.skin,moving:!arr,walk:t*.8});}
  banner(380+4*62-mt*62+20,575,t);
  CSND-=dt;if(!arr&&CSND<=0){CSND=.45;sfx('thump',.7);}
  // aile toplanmış
  guy(120,566,famSp(1,1.9),{dir:1,seed:2,look:.8,skin:FAM[1].skin});
  guy(60,560,famSp(0,1.9),{dir:1,seed:3,look:.8,skin:FAM[0].skin});
  guy(24,578,famSp(2,1.9),{dir:1,seed:4,look:.8,skin:FAM[2].skin});
  guy(84,592,Object.assign({},YAV,{k:2}),{dir:1,seed:1,look:.8,skin:YAV.skin});
  if(arr){const p=1+Math.sin(T*10)*.1;txt('!',120,388,40*p,'#ffe48a',{f:"'Lilita One'",w:400,o:'#2a1a26',ow:6});}}
function scnTaken(t,dt){sky('#141420','#3a3448','#5a4a5a');
  for(let i=0;i<9;i++)tree(-260+i*110+(i%2)*30,430,.9+(i%3)*.15,'#1e2a26',true);
  ground(470,'#2f4a2e','#38563a');hut(330,500,1,false);
  const lift=ease(clamp(t/1.2,0,1)),away=Math.max(0,t-2.6)*22;
  const sx=214+away;spear(sx+30,560,100,.12);guy(sx,560,SOLD,{dir:-1,seed:1,look:-.2,skin:SOLD.skin,moving:away>0,walk:t*.6});
  const hx=sx-40,hy=478-lift*34;g.beginPath();g.moveTo(sx-14,520);g.lineTo(hx,hy);S(9,SOLD.cloth);g.beginPath();g.moveTo(sx-14,520);g.lineTo(hx,hy);S(5.5,shade(SOLD.cloth,.15));
  guy(hx-4,hy+42,Object.assign({},YAV,{k:2}),{dir:-1,seed:1,look:-1,skin:YAV.skin,moving:true,walk:t*1.4});circ(hx,hy+2,7);F(SOLD.skin);S(2);
  // anne diz çökmüş, baba tutuyor
  g.save();g.translate(0,26);guy(110,566,famSp(0,1.9),{dir:1,seed:3,look:1,skin:FAM[0].skin});g.restore();
  g.beginPath();g.moveTo(132,486);g.quadraticCurveTo(156,476,166+lift*6,480-lift*14);S(8,FAM[0].cloth);g.beginPath();g.moveTo(132,486);g.quadraticCurveTo(156,476,166+lift*6,480-lift*14);S(5,shade(FAM[0].cloth,.15));circ(168+lift*6,478-lift*14,6);F(FAM[0].skin);S(2);
  guy(52,566,famSp(1,1.9),{dir:1,seed:2,look:1,skin:FAM[1].skin});
  guy(10,580,famSp(2,1.9),{dir:1,seed:4,look:1,skin:FAM[2].skin});
  if(Math.random()<dt*9)cpart('tear',118+Math.random()*16,470,{vy:40,vx:(Math.random()-.5)*20,t:.8});
  if(Math.random()<dt*4)cpart('tear',8+Math.random()*12,500,{vy:40,vx:(Math.random()-.5)*20,t:.7});
  for(let i=0;i<4;i++)if(Math.random()<dt*30)cpart('rain',-200+Math.random()*760,-20,{vy:520,vx:-60,t:1.6});
  CSND-=dt;if(CSND<=0){CSND=1.6;sfx('sob',.8);}}
function scnOath(t,dt){sky('#08061a','#1e1638','#3a2448');
  for(const s of STARS){g.globalAlpha=.4+Math.sin(T*2+s[3])*.35;circ(s[0],s[1]-20,s[2]);F('#fff6d8');circ(s[0]-300,s[1],s[2]*.8);F('#fff6d8');circ(s[0]+330,s[1]+10,s[2]*.8);F('#fff6d8');}g.globalAlpha=1;
  moons([258,150,34],[96,104,17]);
  // ordugâh
  for(let i=0;i<8;i++){const x=-200+i*90,y=440;g.save();g.translate(x,y);g.beginPath();g.moveTo(-34,10);g.lineTo(0,-38);g.lineTo(34,10);g.closePath();F('#1a1424');g.beginPath();g.moveTo(0,-38);g.lineTo(0,-56);S(1.6,'#1a1424');g.beginPath();g.moveTo(0,-56);g.lineTo(14,-51);g.lineTo(0,-46);F('#6a1a22');g.restore();}
  ground(468,'#1e1828','#251d30');
  // ateş
  const fxr=200,fyr=560,fl=Math.sin(T*16)*2;const fg=g.createRadialGradient(fxr,fyr-14,4,fxr,fyr-14,170);fg.addColorStop(0,'rgba(255,160,70,.55)');fg.addColorStop(1,'rgba(255,160,70,0)');g.fillStyle=fg;g.fillRect(fxr-170,fyr-184,340,340);
  [[-14,8,.3],[14,8,-.3]].forEach(([a,b,r])=>{g.save();g.translate(fxr+a,fyr+b);g.rotate(r);rr(-18,-4,36,8,4);F('#5a3a22');S(1.8);g.restore();});
  g.beginPath();g.moveTo(fxr-16,fyr+4);g.quadraticCurveTo(fxr-12,fyr-22+fl,fxr-2,fyr-34-fl);g.quadraticCurveTo(fxr+6,fyr-16,fxr+16,fyr+4);g.closePath();F('#ff8a30');S(2,'#8a2a10');
  g.beginPath();g.moveTo(fxr-8,fyr+4);g.quadraticCurveTo(fxr-4,fyr-12-fl,fxr+2,fyr-18+fl);g.quadraticCurveTo(fxr+6,fyr-8,fxr+8,fyr+4);g.closePath();F('#fff0a0');
  if(Math.random()<dt*14)cpart('ember',fxr+(Math.random()-.5)*14,fyr-20,{vy:-50-Math.random()*40,vx:(Math.random()-.5)*20,t:1.2});
  const up=ease(clamp((t-2.2)/.6,0,1));
  guy(128,572-up*4,Object.assign({},YAV,{k:2.1}),{dir:1,seed:1,look:.5,skin:YAV.skin});
  if(up>0){const fx0=150+up*20,fy0=530-up*58;g.beginPath();g.moveTo(146,540);g.lineTo(fx0,fy0+8);S(10,OL);g.beginPath();g.moveTo(146,540);g.lineTo(fx0,fy0+8);S(6.5,YAV.skin);fist(fx0,fy0,1.6);
    if(up>=1){const gl=g.createRadialGradient(fx0,fy0,2,fx0,fy0,60);gl.addColorStop(0,'rgba(255,240,180,.6)');gl.addColorStop(1,'rgba(255,240,180,0)');g.fillStyle=gl;g.fillRect(fx0-60,fy0-60,120,120);}}
  if(t>2.8&&CSND!==99){CSND=99;sfx('chime');sfx('sparkle');for(let i=0;i<30;i++)cpart('star',170,472,{vx:(Math.random()-.5)*240,vy:-60-Math.random()*160,t:1.6});}
  if(Math.random()<dt*1.5)sfx('fire',.4);}
function scnLater(t,dt){sky('#2a2050','#c8708a','#ffd8a0');
  const s=ease(clamp(t/4,0,1));const sy=470-s*90;const sg=g.createRadialGradient(270,sy,10,270,sy,160);sg.addColorStop(0,'rgba(255,230,150,.75)');sg.addColorStop(1,'rgba(255,230,150,0)');g.fillStyle=sg;g.fillRect(110,sy-160,320,320);circ(270,sy,34);F('#ffd34c');S(3,'#e0a020');
  g.beginPath();g.moveTo(-700,450);for(let x=-700;x<=1060;x+=20)g.lineTo(x,430+Math.sin(x*.013)*24);g.lineTo(1060,1200);g.lineTo(-700,1200);g.closePath();F('#c8805a');
  // Agreguk uzakta
  for(let i=0;i<6;i++){const x=250+i*42,y=438+(i%2)*6;g.save();g.translate(x,y);g.scale(.7,.7);g.beginPath();g.moveTo(-26,10);g.quadraticCurveTo(-24,-20,0,-32);g.quadraticCurveTo(24,-20,26,10);g.closePath();F(['#a8584a','#b8705a','#9a5a5a'][i%3]);g.beginPath();g.moveTo(0,-32);g.lineTo(0,-46);S(1.5,'#5a2a2a');g.beginPath();g.moveTo(0,-46);g.lineTo(12,-42);g.lineTo(0,-38);F('#f0b43c');rr(-5,-4,10,14,5);F('#ffcf6a');g.restore();}
  g.beginPath();g.moveTo(-700,500);for(let x=-700;x<=1060;x+=20)g.lineTo(x,492+Math.sin(x*.02+2)*10);g.lineTo(1060,1200);g.lineTo(-700,1200);g.closePath();F('#e0a070');
  g.beginPath();g.moveTo(-700,560);for(let x=-700;x<=1060;x+=20)g.lineTo(x,556+Math.sin(x*.025+1)*8);g.lineTo(1060,1200);g.lineTo(-700,1200);g.closePath();F('#eebc84');
  const ix=-10+t*30,iy=566;
  // el arabası
  const cx0=ix+44;shadow(cx0,iy+2,30,6);rr(cx0-26,iy-34,52,26,5);F('#a86a38');S(2);drawItem('kulce',cx0-10,iy-38,1.1);drawItem('yatagan',cx0+8,iy-40,1.1);
  [-16,16].forEach(w=>{circ(cx0+w,iy-6,8);F('#6a4a2a');S(2);g.save();g.translate(cx0+w,iy-6);g.rotate(t*5);g.beginPath();g.moveTo(-6,0);g.lineTo(6,0);g.moveTo(0,-6);g.lineTo(0,6);S(1.4,'#c48a52');g.restore();});
  guy(ix,iy,Object.assign({},YAV,{k:2}),{dir:1,seed:1,look:.6,skin:YAV.skin,moving:true,walk:t*.9,carry:true});
  if(Math.random()<dt*6)cpart('dust',ix-6,iy,{vx:-20,vy:-10,t:.8});
  if(t<2.6){g.globalAlpha=clamp(t/.4,0,1)*clamp((2.6-t)/.4,0,1);txt('Yıllar sonra...',180,250,38,'#fff2c0',{f:"'Lilita One'",w:400,o:'#4a2a1a',ow:8});g.globalAlpha=1;}}
const CUT_OATH=[
  {dur:8,cap:"Sürtünkaya'nın yosunlu ormanlarında koca yürekli bir Yaşruk ailesi yaşardı. Minicik bir Yavşuk oğulları vardı: İdiz.",draw:scnHome},
  {dur:7.5,cap:"Bir sabah Dermançöl'ün Azman Ocakları devşirmecileri çıkageldi. Haşmetşah'ın sözü kanundu; kimse karşı koyamadı.",draw:scnSoldiers},
  {dur:8,who:'Devşirmeci',cap:'"Bu ufaklık lağımcı olur! Diz boyu, tünele tam sığar."',draw:scnTaken},
  {dur:8.5,who:'İdiz',cap:'"Anne... Baba... Bir gün hepinizi yanıma alacağım. Yemin olsun!"',draw:scnOath},
  {dur:8,cap:"Yıllar sonra İdiz ordudan kaçtı ve Uçmakanların Agreguk Pazarı'nda küçücük bir tezgâh açtı. Ama o gece rüyası hiç bitmedi...",draw:scnLater}
];
let CUT=CUT_OATH,CUTEND=null;
function startCut(list,end){CUT=list||CUT_OATH;CUTEND=end||null;MODE='cut';CI=0;CT=0;CSND=0;CP.length=0;initAudio();setMusic('sad');startMusic();bar.style.display='none';menuBtn.style.display='none';document.getElementById('zoom').style.display='none';}
function capLen(){return Math.floor(Math.max(0,CT-.7)*42);}
function cutNext(e){
  if(e&&e.clientX<110&&e.clientY<70){endCut();return;}
  const sc=CUT[CI];if(capLen()<sc.cap.length){CT=.7+sc.cap.length/42+.05;sfx('tick',.4);return;}
  advCut();}
function advCut(){CI++;CT=0;CSND=0;CP.length=0;sfx('whoosh',.4);if(CI>=CUT.length)endCut();}
function endCut(){CI=CUT.length;const f=CUTEND;CUTEND=null;MODE='game';blackFade=1.6;if(f)f();else startGame();}
function wrapText(s,maxW,font){g.font=font;const ws=s.split(' '),ls=[];let line='';for(const w of ws){const t2=line?line+' '+w:w;if(g.measureText(t2).width>maxW&&line){ls.push(line);line=w;}else line=t2;}if(line)ls.push(line);return ls;}
function drawCut(dt){CT+=dt;const sc=CUT[CI];if(!sc)return;
  g=cx;g.setTransform(1,0,0,1,0,0);g.fillStyle='#000';g.fillRect(0,0,cv.width,cv.height);
  g.setTransform(ISC*DPR,0,0,ISC*DPR,IOX*DPR,IOY*DPR);
  g.save();const z=1.16+CT*.006;g.translate(180,600);g.scale(z,z);g.translate(-180,-590);sc.draw(CT,dt);
  for(const q of CP){q.t-=dt;q.x+=q.vx*dt;q.y+=q.vy*dt;if(q.k==='star')q.vy+=160*dt;}
  for(let i=CP.length-1;i>=0;i--)if(CP[i].t<=0)CP.splice(i,1);
  for(const q of CP){const a=clamp(q.t/q.max,0,1);g.globalAlpha=Math.min(1,a*1.5);
    if(q.k==='heart'){g.save();g.translate(q.x,q.y);g.scale(1.4,1.4);g.beginPath();g.moveTo(0,4);g.bezierCurveTo(-8,-3,-4,-9,0,-4);g.bezierCurveTo(4,-9,8,-3,0,4);F('#ff8aa8');S(1.5);g.restore();}
    else if(q.k==='firefly'){g.globalAlpha=a*(.5+Math.sin(T*8+q.x)*.5);const gl=g.createRadialGradient(q.x,q.y,0,q.x,q.y,8);gl.addColorStop(0,'rgba(230,255,140,.9)');gl.addColorStop(1,'rgba(230,255,140,0)');g.fillStyle=gl;g.fillRect(q.x-8,q.y-8,16,16);}
    else if(q.k==='tear'){g.beginPath();g.moveTo(q.x,q.y-5);g.quadraticCurveTo(q.x+4,q.y+2,q.x,q.y+4);g.quadraticCurveTo(q.x-4,q.y+2,q.x,q.y-5);F('#8ad0ff');S(1.2,'#2a5a8a');}
    else if(q.k==='rain'){g.beginPath();g.moveTo(q.x,q.y);g.lineTo(q.x+q.vx*.03,q.y+q.vy*.03);S(1.4,'rgba(170,190,230,.55)');}
    else if(q.k==='ember'){circ(q.x,q.y,1.8);F('#ffb340');}
    else if(q.k==='dust'){circ(q.x,q.y,4+(1-a)*6);F('rgba(230,190,140,.5)');}
    else if(q.k==='lantern'){}
    else if(q.k==='star'){g.save();g.translate(q.x,q.y);g.rotate(q.t*6);g.beginPath();for(let i=0;i<10;i++){const r=i%2?2.6:6.5,an=i*Math.PI/5;g.lineTo(Math.cos(an)*r,Math.sin(an)*r);}g.closePath();F('#ffe48a');S(1.2);g.restore();}}
  g.globalAlpha=1;g.restore();
  // vinyet
  const vg=g.createRadialGradient(180,380,160,180,380,520);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.6)');g.fillStyle=vg;g.fillRect(-700,-400,1760,1600);
  // yazı kutusu
  const font="600 15px Fredoka, sans-serif",ls=wrapText(sc.cap,296,font),n=capLen();
  const bh=ls.length*21+(sc.who?40:24),by0=708-bh;
  g.globalAlpha=clamp(CT/.5,0,1);rr(14,by0,332,bh,18);F('rgba(22,14,28,.84)');S(2.5,'#f0b43c');
  let yy=by0+18;if(sc.who){txt(sc.who,30,yy,15,'#ffcf5a',{a:'left',f:"'Lilita One'",w:400});yy+=20;}
  let left=n;for(const l of ls){if(left<=0)break;const part=l.slice(0,left);left-=l.length+1;txt(part,30,yy+2,15,'#fff3dc',{a:'left',w:600});yy+=21;}
  if(n>=sc.cap.length){g.globalAlpha=.6+Math.sin(T*5)*.4;txt('▸',332,by0+bh-14,14,'#ffcf5a');}
  g.globalAlpha=1;
  // ilerleme ve atla
  for(let i=0;i<CUT.length;i++){circ(180+(i-(CUT.length-1)/2)*14,by0-14,i===CI?4.5:3);F(i<=CI?'#ffcf5a':'rgba(255,255,255,.35)');}
  g.setTransform(DPR,0,0,DPR,0,0);rr(12,14,82,28,14);F('rgba(0,0,0,.45)');S(1.5,'rgba(255,255,255,.4)');txt('Atla ▸▸',53,28.5,12,'#fff',{w:600});
  g.setTransform(ISC*DPR,0,0,ISC*DPR,IOX*DPR,IOY*DPR);
  const fi=clamp(1-CT/.7,0,1),fo=clamp((CT-sc.dur+.6)/.6,0,1);const fa=Math.max(fi,fo);
  if(fa>0){g.setTransform(1,0,0,1,0,0);g.fillStyle=`rgba(0,0,0,${fa})`;g.fillRect(0,0,cv.width,cv.height);}
  if(CT>=sc.dur)advCut();}


/* ====================== ARA SAHNE: KAVUŞMA ====================== */
function cbub(x0,y,s){g.font="600 13px Fredoka, sans-serif";const w=g.measureText(s).width+18,h=26;const x=clamp(x0,32+w/2,328-w/2);rr(x-w/2,y-h,w,h,10);F('#fff');S(2);g.beginPath();g.moveTo(x-6,y-1);g.lineTo(x,y+8);g.lineTo(x+6,y-1);F('#fff');g.beginPath();g.moveTo(x-6,y);g.lineTo(x,y+8);g.lineTo(x+6,y);S(2);txt(s,x,y-12.5,13,OL,{w:600});}
function horse(x,y,s,t){g.save();g.translate(x,y);g.scale(s,s);const l=Math.sin(t*8)*4;
  [[-14,l],[-8,-l],[12,-l],[18,l]].forEach(([a,b])=>{rr(a-2,-14,4,16+b*.3,2);F('#8a5a32');S(1.4);});
  g.beginPath();g.moveTo(-22,-14);g.quadraticCurveTo(-22,-30,-4,-30);g.lineTo(14,-30);g.quadraticCurveTo(22,-30,24,-36);g.lineTo(30,-50);g.quadraticCurveTo(38,-52,40,-44);g.lineTo(34,-34);g.quadraticCurveTo(26,-14,16,-14);g.closePath();F('#a8642e');S(2);
  g.beginPath();g.moveTo(24,-40);g.quadraticCurveTo(26,-52,30,-50);S(4,'#4a2a1a');g.beginPath();g.moveTo(-22,-26);g.quadraticCurveTo(-34,-24,-32,-10);S(4,'#4a2a1a');circ(34,-45,1.5);F(OL);g.restore();}
function wagon(x,y,t,heads){shadow(x,y+4,60,8,.3);[-30,30].forEach(w=>{circ(x+w,y-10,12);F('#6a4a2a');S(2);g.save();g.translate(x+w,y-10);g.rotate(t*3);g.beginPath();g.moveTo(-9,0);g.lineTo(9,0);g.moveTo(0,-9);g.lineTo(0,9);S(1.6,'#c48a52');g.restore();});
  rr(x-50,y-36,100,22,4);F('#a86a38');S(2);g.beginPath();g.moveTo(x-48,y-36);g.quadraticCurveTo(x-48,y-86,x,y-88);g.quadraticCurveTo(x+48,y-86,x+48,y-36);g.closePath();F('#efdcb4');S(2.4);
  for(let i=1;i<4;i++){g.beginPath();g.moveTo(x-48+i*24,y-36);g.quadraticCurveTo(x-48+i*24,y-84,x-48+i*24,y-86+Math.abs(i-2)*4);S(1.4,'#c9a56c');}
  if(heads){g.save();g.beginPath();g.moveTo(x-48,y-36);g.quadraticCurveTo(x-48,y-86,x,y-88);g.lineTo(x,y-36);g.closePath();g.restore();
    [[-26,0],[0,1],[22,2]].forEach(([dx,i])=>{g.save();g.translate(x+dx,y-58-(i===2?-6:0));const sc=i===2?.8:1;g.scale(sc,sc);HEADS.yasruk(14,{skin:FAM[i].skin,seed:i,look:.6});g.restore();});}}
function lanterns(y0,t){g.beginPath();g.moveTo(-60,y0);g.quadraticCurveTo(180,y0+70,420,y0);S(1.5,'rgba(40,20,30,.8)');
  for(let i=0;i<11;i++){const k=(i+1)/12,x=(1-k)*(1-k)*-60+2*(1-k)*k*180+k*k*420,yy=y0+70*2*k*(1-k)*.5*2;g.beginPath();g.moveTo(x,yy);g.lineTo(x,yy+4);S(1.2,'#2a1a26');
    const gl=g.createRadialGradient(x,yy+9,1,x,yy+9,16);gl.addColorStop(0,'rgba(255,200,110,.6)');gl.addColorStop(1,'rgba(255,200,110,0)');g.fillStyle=gl;g.fillRect(x-16,yy-7,32,32);circ(x,yy+9,5);F(['#ffcf5a','#ff8a5a','#9ad06a'][i%3]);S(1.4,'#2a1a26');}}
function bazaar(y,col){for(let i=0;i<8;i++){const x=-120+i*80,yy=y+(i%2)*8;g.save();g.translate(x,yy);g.beginPath();g.moveTo(-34,10);g.quadraticCurveTo(-30,-24,0,-40);g.quadraticCurveTo(30,-24,34,10);g.closePath();F(col[i%col.length]);S(2,'rgba(40,20,30,.5)');
  g.beginPath();g.moveTo(0,-40);g.lineTo(0,-56);S(1.6,'#4a2a2a');g.beginPath();g.moveTo(0,-56);g.lineTo(14,-51);g.lineTo(0,-46);F('#c9463d');rr(-6,-6,12,16,6);F('rgba(255,210,120,.8)');g.restore();}}
function scnCaravan(t,dt){sky('#0c0a22','#2a1e48','#5a3a5a');
  for(const s of STARS){g.globalAlpha=.4+Math.sin(T*2+s[3])*.35;circ(s[0],s[1]-20,s[2]);F('#fff6d8');circ(s[0]-300,s[1],s[2]*.8);F('#fff6d8');circ(s[0]+330,s[1]+10,s[2]*.8);F('#fff6d8');}g.globalAlpha=1;
  moons([90,130,30],[280,90,15]);
  g.beginPath();g.moveTo(-700,470);for(let x=-700;x<=1060;x+=20)g.lineTo(x,450+Math.sin(x*.012)*26);g.lineTo(1060,1200);g.lineTo(-700,1200);g.closePath();F('#3a2a40');
  g.beginPath();g.moveTo(-700,540);for(let x=-700;x<=1060;x+=20)g.lineTo(x,530+Math.sin(x*.02+1)*10);g.lineTo(1060,1200);g.lineTo(-700,1200);g.closePath();F('#4a3448');
  const x=-60+t*34;horse(x+110,575,1.2,t);g.beginPath();g.moveTo(x+60,560);g.lineTo(x+92,552);S(2.5,'#6a4a2a');wagon(x,580,t,true);
  guy(x+124,532,Object.assign({},RACES.ucmakan,{k:1.4}),{dir:1,seed:4,look:.6,skin:RACES.ucmakan.skin,hair:'#2a1c22'});
  if(Math.random()<dt*5)cpart('dust',x-40,585,{vx:-20,vy:-8,t:.9});}
function scnGate(t,dt){sky('#3a2a5a','#d8806a','#ffd8a0');const s=ease(clamp(t/5,0,1));circ(290,470-s*60,30);F('#ffd34c');S(3,'#e0a020');
  bazaar(470,['#a8584a','#c9463d','#b8705a','#d79a6a']);ground(490,'#e0b97c','#e8c792');lanterns(380,t);
  g.save();g.translate(180,420);rr(-46,-16,92,26,6);F('#a86a38');S(2);txt('AGREGUK',0,-3,15,'#fff2c8',{f:"'Lilita One'",w:400,o:OL,ow:4});g.restore();
  const ix=170+Math.sin(t*1.3)*70,dir=Math.cos(t*1.3)>0?1:-1;guy(ix,590,Object.assign({},YAV,{k:2.1}),{dir,seed:1,look:dir*.5,skin:YAV.skin,moving:true,walk:t*.7});
  if(t>2.5)cbub(ix,480,rnd2(t,['Ya gelmezlerse...','Her kervan sesinde...','Annem... babam...']));}
function rnd2(t,arr){return arr[Math.floor(t/2.4)%arr.length];}
function scnRun(t,dt){sky('#5a8ac8','#f0c8a0','#ffe8c0');bazaar(470,['#a8584a','#c9463d','#b8705a','#d79a6a']);ground(490,'#e0b97c','#e8c792');
  wagon(330,560,0,false);horse(420,555,1,0);
  const k=ease(clamp(t/2.4,0,1));const mx=290-k*110,ix=60+k*60;const met=t>2.4;
  guy(mx,590,famSp(0,2),{dir:-1,seed:3,look:-.8,skin:FAM[0].skin,moving:!met,walk:t*.9});
  guy(ix,600,Object.assign({},YAV,{k:2.1}),{dir:1,seed:1,look:.8,skin:YAV.skin,moving:!met,walk:t});
  guy(350,596,famSp(1,1.9),{dir:-1,seed:2,look:-.6,skin:FAM[1].skin});guy(390,606,famSp(2,1.9),{dir:-1,seed:4,look:-.6,skin:FAM[2].skin});
  if(!met&&Math.random()<dt*8)cpart('dust',mx+10,592,{vx:20,vy:-8,t:.6});
  if(met&&CSND!==99){CSND=99;sfx('sob',1);sfx('chime',.6);for(let i=0;i<20;i++)cpart('heart',150,470,{vx:(Math.random()-.5)*160,vy:-60-Math.random()*100,t:1.6});}
  if(!met)cbub(mx,430,'İDİZ!!');}
function scnHug(t,dt){sky('#f0b890','#ffd8b0','#ffe8c8');const gl=g.createRadialGradient(180,480,20,180,480,300);gl.addColorStop(0,'rgba(255,240,200,.8)');gl.addColorStop(1,'rgba(255,240,200,0)');g.fillStyle=gl;g.fillRect(-120,180,600,600);
  ground(560,'#e8c792','#efd2a0');
  const sw=Math.sin(t*2)*2;g.save();g.translate(0,40);guy(205,600,famSp(0,2.5),{dir:-1,seed:3,look:-.4,skin:FAM[0].skin});g.restore();
  guy(150,612+sw*.3,Object.assign({},YAV,{k:2.3}),{dir:1,seed:1,look:.6,skin:YAV.skin});
  g.beginPath();g.moveTo(192,572);g.quadraticCurveTo(168,606,128,592);S(13,OL);g.beginPath();g.moveTo(192,572);g.quadraticCurveTo(168,606,128,592);S(9,FAM[0].cloth);
  circ(126,590,8);F(FAM[0].skin);S(2);
  if(Math.random()<dt*10)cpart('tear',200+Math.random()*16,486,{vy:50,vx:(Math.random()-.5)*20,t:.9});
  if(Math.random()<dt*5)cpart('tear',140+Math.random()*12,500,{vy:50,vx:(Math.random()-.5)*20,t:.8});
  if(Math.random()<dt*3)cpart('heart',120+Math.random()*120,440,{vy:-40,vx:(Math.random()-.5)*30,t:1.6});
  CSND-=dt;if(CSND<=0){CSND=2.2;sfx('sob',.9);}}
function scnFamily(t,dt){sky('#f0b890','#ffd8b0','#ffe8c8');bazaar(470,['#a8584a','#c9463d','#b8705a','#d79a6a']);ground(500,'#e8c792','#efd2a0');
  guy(110,606,famSp(0,2.2),{dir:1,seed:3,look:.6,skin:FAM[0].skin});guy(268,600,famSp(1,2.2),{dir:-1,seed:2,look:-.6,skin:FAM[1].skin});
  const hop=Math.abs(Math.sin(t*5))*16;guy(330,616-hop,famSp(2,2.2),{dir:-1,seed:4,look:-.8,skin:FAM[2].skin,moving:true,walk:t});
  guy(195,618,Object.assign({},YAV,{k:2.1}),{dir:1,seed:1,look:.4,skin:YAV.skin});
  g.beginPath();g.moveTo(248,548);g.quadraticCurveTo(232,520,206,528);S(12,OL);g.beginPath();g.moveTo(248,548);g.quadraticCurveTo(232,520,206,528);S(8,FAM[1].cloth);circ(205,528,8);F(FAM[1].skin);S(2);
  if(t>3.2)cbub(330,470-hop,'Abi! Dondurma var mı?');}
function scnSofra(t,dt){sky('#0c0a22','#2a1e48','#4a3058');for(const s of STARS){g.globalAlpha=.4+Math.sin(T*2+s[3])*.35;circ(s[0],s[1]-20,s[2]);F('#fff6d8');}g.globalAlpha=1;
  moons([280,130,28],[90,100,14]);lanterns(330,t);ground(470,'#3a2a3a','#43303f');
  const gl=g.createRadialGradient(180,560,20,180,560,240);gl.addColorStop(0,'rgba(255,190,100,.45)');gl.addColorStop(1,'rgba(255,190,100,0)');g.fillStyle=gl;g.fillRect(-60,320,480,480);
  guy(90,560,famSp(1,1.9),{dir:1,seed:2,look:.6,skin:FAM[1].skin});guy(272,560,famSp(0,1.9),{dir:-1,seed:3,look:-.6,skin:FAM[0].skin});
  el(180,600,96,24);F('#7a4a24');S(2.4);el(180,594,90,20);F('#a86a38');S(2);
  drawItem('as',140,590,1.6);drawItem('as',220,590,1.6);drawItem('dondurma',180,584,1.5);drawItem('kahve',110,596,1.2);drawItem('kahve',250,596,1.2);
  guy(130,650,famSp(2,1.9),{dir:1,seed:4,look:.6,skin:FAM[2].skin});guy(235,654,Object.assign({},YAV,{k:2.1}),{dir:-1,seed:1,look:-.5,skin:YAV.skin});
  if(Math.random()<dt*3)cpart('heart',100+Math.random()*160,520,{vy:-30,vx:(Math.random()-.5)*20,t:1.8});
  if(Math.random()<dt*4)cpart('firefly',-60+Math.random()*480,360+Math.random()*200,{vx:(Math.random()-.5)*14,vy:(Math.random()-.5)*10,t:2.5});
  if(t>4&&CSND!==99){CSND=99;setMusic('main');}}
const CUT_FAM=[
  {dur:8,cap:"Aylar süren yolculuk... Uçmakan kervanı, Dermançöl'ün gözünden saklanarak çölü aştı. Arabanın içinde üç Yaşruk, üç kalp.",draw:scnCaravan},
  {dur:8,cap:"İdiz bütün gece Agreguk'un girişinde bekledi. Her kervan sesinde kalbi ağzına geldi.",draw:scnGate},
  {dur:7,who:'Annesi',cap:'"İDİZ! YAVRUM!"',draw:scnRun},
  {dur:9,who:'Annesi',cap:'"İdiz\'im... Ne kadar da büyümüşsün! ...Hiç büyümemişsin! Gel buraya, gel!"',draw:scnHug},
  {dur:8.5,who:'Babası',cap:'"Yeminini tuttun oğlum. Sürtünkaya\'nın bütün yosunları bugün senin için ağlıyor."',draw:scnFamily},
  {dur:9.5,cap:"O gece Agreguk'ta bir sofra kuruldu. Yıllar sonra ilk kez... dört kişilik.",draw:scnSofra}
];
function startFamCut(){closeCat();startCut(CUT_FAM,()=>{MODE='game';paused=false;setMusic('main');makeFamily(true);achieve('aile');const S=SHOP();
  for(let i=0;i<40;i++)fx('star',S.ex+(Math.random()-.5)*200,S.y1+40,{vx:(Math.random()-.5)*200,vy:-120-Math.random()*160,t:1.4});
  document.getElementById('dream').classList.remove('hidden');sfx('unlock');updateBar();save();});}
