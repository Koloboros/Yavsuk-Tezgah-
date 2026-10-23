
/* ====================== TARLA ====================== */
function drawField(){const [x0,y0,x1,y1]=FIELD;rr(x0,y0,x1-x0,y1-y0,10);F(G.dream?'#8a6038':'#b08a5a');S(2.5,'#6a4a2a');
  for(let y=y0+24;y<y1-10;y+=30){g.beginPath();g.moveTo(x0+12,y);g.lineTo(x1-12,y);S(5,G.dream?'#6a4228':'#9a7448');
    if(G.dream)for(let x=x0+22;x<x1-16;x+=22){const h=8+((x*7+y)%9);g.beginPath();g.moveTo(x,y);g.quadraticCurveTo(x-6,y-h,x-2,y-h-4);g.moveTo(x,y);g.quadraticCurveTo(x+6,y-h,x+2,y-h-6);S(2.4,'#6aa860');circ(x,y-h-5,2.2);F(x%44?'#f08aa8':'#ffd34c');}}
  for(let x=x0-6;x<=x1+6;x+=24){rr(x-2,y0-22,4,24,2);F('#9a6236');S(1.2);rr(x-2,y1-4,4,20,2);F('#9a6236');S(1.2);}
  g.beginPath();g.moveTo(x0-8,y0-14);g.lineTo(x1+8,y0-14);g.moveTo(x0-8,y1+6);g.lineTo(x1+8,y1+6);S(2.4,'#a86a38');
  g.save();g.translate((x0+x1)/2,y1+34);rr(-3,-12,6,16,2);F('#7a4a24');S(1.4);rr(-44,-30,88,22,6);F('#f6e3bd');S(1.8);txt(G.dream?'Ailenin tarlası':'Boş tarla · bir gün...',0,-19,9.5,'#6a4426');g.restore();}

/* ====================== TEZGÂH ÇİZİMLERİ ====================== */
function badge(x,y,s,col){g.font="700 10px Fredoka, sans-serif";const w=Math.max(20,g.measureText(s).width+10);rr(x-w/2,y-8,w,16,8);F(col||'#fff7e6');S(1.8);txt(s,x,y+.5,10,OL);}
function sign(x,y,s){g.font="700 9px Fredoka, sans-serif";const w=g.measureText(s).width+10;rr(x-w/2,y-7,w,14,4);F('#f6e3bd');S(1.6);txt(s,x,y+.5,9,'#6a4426');}
function pileM(arr,x,y,max){let yy=y;for(let i=0;i<Math.min(arr.length,max||8);i++){drawItemQ(arr[i],x,yy,.92,i>0);yy-=(GAP[arr[i]]||5.5)*.8;}return yy;}
function trayMat(x,y){el(x,y+2,17,5);F('rgba(240,200,120,.35)');S(1.2,'rgba(160,110,60,.5)');}
function ring(x,y,k,c){g.beginPath();g.arc(x,y,7,-Math.PI/2,-Math.PI/2+k*Math.PI*2);S(3,c||'#f0b43c');}
function drawStation(o,thumb){const t=o.type,x=o.x,y=o.y,on=thumb||G.phase==='day',S0=ST[t],tx=x+S0.tray;
  if(t==='ocak'){shadow(x,y+2,30,6);
    rr(x-6,y-58,12,14,3);F('#9c7a62');S(2);rr(x-8,y-61,16,5,2.5);F('#b8957a');S(1.8);
    if(on&&!thumb&&Math.random()<.06)fx('smoke',x+(Math.random()-.5)*6,y-64,{vy:-18,vx:4,t:1.6,r:4});
    g.beginPath();g.moveTo(x-27,y);g.lineTo(x-27,y-18);g.quadraticCurveTo(x-26,y-50,x,y-50);g.quadraticCurveTo(x+26,y-50,x+27,y-18);g.lineTo(x+27,y);g.closePath();F('#c98a5e');S(2.4);
    g.beginPath();g.moveTo(x-20,y-30);g.quadraticCurveTo(x,y-46,x+20,y-30);S(1.4,'#a86a44');
    rr(x-29,y-6,58,8,4);F('#9c7a62');S(2);rr(x-12,y-26,24,22,11);F('#3a2422');S(2);
    if(on&&(thumb||o.inp.length)){const fl=Math.sin(T*18)*1.5;g.save();rr(x-11,y-23,22,18,9);g.clip();
      const gr=g.createRadialGradient(x,y-6,2,x,y-10,16);gr.addColorStop(0,'#fff0a0');gr.addColorStop(.5,'#ff9a30');gr.addColorStop(1,'#c63a1a');g.fillStyle=gr;g.fillRect(x-12,y-24,24,20);
      [[-5,0],[0,-2],[5,0]].forEach(([dx,dy],i)=>{g.beginPath();g.moveTo(x+dx-4,y-4);g.quadraticCurveTo(x+dx,y-16+dy+(i===1?fl:-fl),x+dx+4,y-4);F(i===1?'#fff2a6':'#ffb340');});g.restore();}
    else{el(x,y-8,8,3);F('#6a3a2a');}
    for(let i=0;i<Math.min(o.inp.length,4);i++)drawItem('kulce',x-17+i*11,y+6,.62);
    rr(tx-14,y-14,28,14,3);F('#8e8178');S(1.8);pileM(o.out,tx,y-18,8);
    if(!thumb){sign(x,y+3,'Ocak');badge(x-30,y-46,o.inp.length+'/'+inCap('ocak'));if(o.out.length)badge(tx+10,y-28-Math.min(8,o.out.length)*4,o.out.length+'','#ffd8a0');
      if(on&&o.inp.length)ring(x+22,y-50,o.heat/S0.t,'#f06a22');}
    return;}
  if(t==='ors'){shadow(x-6,y+2,22,6);
    rr(x-20,y-16,24,18,4);F('#8a5a32');S(2);el(x-8,y-16,12,4);F('#b07a48');S(2);
    g.beginPath();g.moveTo(x-22,y-28);g.lineTo(x+4,y-28);g.quadraticCurveTo(x+12,y-28,x+14,y-24);g.lineTo(x+2,y-22);g.lineTo(x,y-18);g.lineTo(x-16,y-18);g.lineTo(x-20,y-22);g.closePath();F('#5d6474');S(2.2);
    g.beginPath();g.moveTo(x-22,y-28);g.lineTo(x+4,y-28);g.quadraticCurveTo(x+12,y-28,x+14,y-24);S(1.5,'#9aa2b2');
    if(o.inp.length||o.craft>0)drawItem('kizgin',x-8,y-31,.8);
    shadow(tx,y+2,16,5);rr(tx-14,y-18,28,20,6);F('#9a6236');S(2);el(tx,y-18,14,5);F('#5aa8d8');S(2);
    if(o.fin.length)drawItem(o.fin[0].id,tx,y-20,.8);
    pileM(o.out,tx+2,y-30-(o.fin.length?8:0),8);}
  else if(t==='kece'){shadow(x,y+2,34,6);box(x-6,y,54,14,24,'#c48a52','#9a6236',6);
    rr(x-28,y-36,44,16,5);F('#c64a3c');S(2);for(let i=0;i<4;i++){circ(x-22+i*11,y-28,2);F('#f0b43c');}
    for(let i=0;i<Math.min(o.inp.length,4);i++)drawItem('yun',x-22+i*10,y-46,.7);
    box(tx,y,22,18,12,'#d8b48a','#a8784a',4);if(o.fin.length)drawItem('zirh',tx,y-36,.8);pileM(o.out,tx,y-36-(o.fin.length?10:0),8);}
  else if(t==='hokka'){shadow(x,y+2,34,6);box(x-4,y,58,16,24,'#a8784a','#7f5432',6);
    rr(x-24,y-38,26,16,2);F('#fbf4e2');S(1.6);for(let i=0;i<3;i++){g.beginPath();g.moveTo(x-20,y-34+i*4);g.lineTo(x-4,y-34+i*4);S(.8,'#bba67e');}
    el(x+9,y-32,5,3);F('#2a2030');S(1.6);rr(x+5,y-38,8,6,2);F('#3a3248');S(1.6);
    for(let i=0;i<Math.min(o.inp.length,4);i++)drawItem('kagit',x-18+i*4,y-46-i*2,.7);
    box(tx+4,y,20,18,12,'#d8b48a','#a8784a',4);const sy=o.fin.length?Math.abs(Math.sin(T*10))*6:6;
    rr(tx,y-40-sy,8,10,2);F('#8a5a32');S(1.5);rr(tx-2,y-31-sy,12,4,2);F('#c9302a');S(1.5);pileM(o.out,tx,y-40,8);}
  else if(t==='deri'){shadow(x,y+2,34,6);box(x-6,y,56,14,20,'#b88a5a','#8a5a32',5);
    g.save();g.translate(x-12,y-30);g.scale(1.6,1.1);ITEM.deri();g.restore();g.save();g.translate(x+8,y-32);g.rotate(.6);rr(-1.5,-10,3,14,1.5);F('#9aa2b2');S(1.2);rr(-2.5,2,5,6,2);F('#7a4a24');S(1.2);g.restore();
    for(let i=0;i<Math.min(o.inp.length,4);i++)drawItem('deri',x-22+i*9,y-42-i,.6);
    box(tx,y,22,18,12,'#d8b48a','#a8784a',4);if(o.fin.length)drawItem('carik',tx,y-34,.8);pileM(o.out,tx,y-36-(o.fin.length?8:0),8);}
  else if(t==='imbik'){shadow(x,y+2,34,6);const bub=on&&(thumb||o.inp.length);
    rr(x-24,y-10,40,12,4);F('#8e8178');S(2);if(bub){const fl=Math.sin(T*16)*2;g.beginPath();g.moveTo(x-16,y-8);g.quadraticCurveTo(x-10,y-20+fl,x-4,y-8);g.quadraticCurveTo(x+2,y-22-fl,x+8,y-8);F('#ff9a30');}
    el(x-4,y-28,20,18);F('#c87a3a');S(2.4);el(x-4,y-40,16,5);F('#5aa860');S(2);el(x-10,y-34,5,3);F('rgba(255,255,255,.35)');
    g.beginPath();g.moveTo(x+10,y-44);g.quadraticCurveTo(x+24,y-62,x+30,y-40);S(3,'#a8784a');g.beginPath();g.moveTo(x+30,y-40);g.lineTo(x+30,y-30);S(3,'#a8784a');
    for(let i=0;i<Math.min(o.inp.length,4);i++)drawItem('ot',x-20+i*9,y+8,.55);
    rr(tx-14,y-16,28,16,3);F('#a86a38');S(1.8);pileM(o.out,tx,y-24,6);
    if(!thumb&&bub)ring(x-28,y-50,o.heat/S0.t,'#6ac060');}
  else if(t==='efsun'){shadow(x,y+2,38,7);box(x-4,y,62,16,24,'#6a4a8a','#4a2a6a',6);
    const glow=thumb||o.craft>0||o.fin.length;g.save();g.translate(x-4,y-28);g.scale(1,.42);circ(0,0,20);S(2,'#c9a0ff');if(glow){g.rotate(T*2);for(let i=0;i<6;i++){g.rotate(Math.PI/3);g.beginPath();g.moveTo(14,0);g.lineTo(20,4);S(1.6,'#9ad0ff');}}g.restore();
    if(glow){const gl=g.createRadialGradient(x-4,y-34,2,x-4,y-34,40);gl.addColorStop(0,'rgba(190,140,255,.45)');gl.addColorStop(1,'rgba(190,140,255,0)');g.fillStyle=gl;g.fillRect(x-44,y-74,80,80);}
    const ps=o.inp.filter(i=>i==='parsomen'),bs=o.inp.filter(i=>i!=='parsomen');ps.slice(0,3).forEach((id,i)=>drawItem(id,x-26+i*4,y-38-i*3,.62));bs.slice(0,3).forEach((id,i)=>drawItem(id,x+10+i*5,y-38-i*3,.62));
    box(tx+4,y,22,18,12,'#d8b48a','#a8784a',4);if(o.fin.length)drawItem(o.fin[0].id,tx+4,y-36,.8);pileM(o.out,tx+4,y-38-(o.fin.length?10:0),8);}
  else if(t==='simya'){shadow(x,y+2,38,7);const bub=thumb||o.craft>0||o.fin.length;rr(x-30,y-10,48,12,4);F('#8e8178');S(2);
    el(x-6,y-26,24,18);F('#2a3a2a');S(2.4);el(x-6,y-38,20,6);F('#6ad070');S(2);if(bub)for(let i=0;i<3;i++){const k=((T*1.6+i*.33)%1);circ(x-12+i*6,y-40-k*14,2+k*2);F(`rgba(140,240,120,${.8-k*.7})`);}
    const cs=o.inp.filter(i=>i==='iksir'),bs=o.inp.filter(i=>i!=='iksir');cs.slice(0,3).forEach((id,i)=>drawItem(id,x-34+i*5,y-14-i*2,.55));bs.slice(0,3).forEach((id,i)=>drawItem(id,x+12+i*5,y-12-i*2,.55));
    box(tx+4,y,22,18,12,'#d8b48a','#a8784a',4);if(o.fin.length)drawItem(o.fin[0].id,tx+4,y-36,.8);pileM(o.out,tx+4,y-38-(o.fin.length?10:0),8);}
  else if(t==='camocak'){shadow(x,y+2,34,7);const on2=on&&(thumb||o.inp.length);
    g.beginPath();g.moveTo(x-30,y);g.lineTo(x-30,y-22);g.quadraticCurveTo(x-28,y-60,x,y-62);g.quadraticCurveTo(x+28,y-60,x+30,y-22);g.lineTo(x+30,y);g.closePath();F('#b8a08a');S(2.4);
    for(let i=0;i<4;i++){g.beginPath();g.moveTo(x-26,y-12-i*12);g.lineTo(x+26,y-12-i*12);S(1,'rgba(90,60,40,.3)');}
    rr(x-14,y-30,28,24,12);F('#2a1a1a');S(2);if(on2){const gr=g.createRadialGradient(x,y-18,2,x,y-18,16);gr.addColorStop(0,'#fff6c0');gr.addColorStop(.5,'#ffa040');gr.addColorStop(1,'#c63a1a');rr(x-12,y-28,24,20,10);g.fillStyle=gr;g.fill();
      circ(x,y-20,5+Math.sin(T*3)*1);F('rgba(170,230,255,.8)');}
    rr(x-6,y-74,12,14,3);F('#9c7a62');S(1.8);for(let i=0;i<Math.min(o.inp.length,4);i++)drawItem('kum',x-20+i*12,y+6,.55);
    rr(tx-14,y-14,28,14,3);F('#8e8178');S(1.8);pileM(o.out,tx,y-24,6);if(!thumb&&on2)ring(x+24,y-58,o.heat/S0.t,'#5ab0ff');}
  if(thumb)return;
  sign(x-4,y+3,S0.ad);if(!S0.auto||t==='imbik')badge(x-36,y-44,o.inp.length+'/'+inCap(t));
  const n=o.out.length;if(n)badge(tx+12,y-50-Math.min(n,8)*4,n+'',n>=outCap(t)?'#ffc0b0':'#d8f4c8');
  if(o.craft>0)ring(x-6,y-58,o.craft/S0.strikes);
  if(S0.combo&&o.rec){const out=comboOut(o);if(out){rr(x-50,y-74,26,24,6);F('#fff7e6');S(1.8);drawItem(out,x-37,y-62,.85);}}
  if(G.workers.some(w=>w.a===o.uid)){circ(x-38,y-14,6);F('#f0b43c');S(1.4);txt('U',x-38,y-13.5,7.5,OL);}}
function qStars(x,y,q){for(let i=0;i<q;i++){g.save();g.translate(x+(i-(q-1)/2)*10,y);g.beginPath();for(let j=0;j<10;j++){const r=j%2?2:4.6,a=j*Math.PI/5-Math.PI/2;g.lineTo(Math.cos(a)*r,Math.sin(a)*r);}g.closePath();F('#ffd34c');S(1.2);g.restore();}}
function drawSupply(o){const r=o.item,x=o.x,y=o.y,n=G.sup[r]||0;
  shadow(x,y+2,30,6);box(x,y,56,16,22,'#c99558','#a06a3a',5);
  g.beginPath();g.moveTo(x-20,y-16);g.lineTo(x-20,y-2);g.moveTo(x+20,y-16);g.lineTo(x+20,y-2);S(1.4,'#7a4a24');
  for(let i=0;i<Math.min(n,9);i++){const c=i%3,rw=Math.floor(i/3);drawItem(r,x-13+c*13,y-24-rw*5+(rw?-2:0),.85);}
  sign(x,y-3,IT[r].ad);badge(x+26,y-40,n+'/'+supCap(r),n===0?'#ffc0b0':null);}
function drawKasa(o){const x=o.x,y=o.y;
  shadow(x,y+2,40,7);box(x,y,70,22,22,'#cf9a5e','#9a6236',7);
  rr(x-28,y-36,18,12,3);F('#6a4a2a');S(1.6);for(let i=0;i<3;i++){circ(x-24+i*5,y-30,1.7);F(i%2?'#f0b43c':'#c9463d');}
  el(x+2,y-30,6,2.6);F('#f0b43c');S(1.4);rr(x,y-37,4,6,2);F('#f0b43c');S(1.3);
  rr(x-14,y-14,28,10,3);F('#fff0d0');S(1.5);txt('KASA',x,y-8.5,8,'#8a2f2a');
  const n=Math.min(12,Math.ceil(o.cash/Math.max(12,price('yatagan')/2)));for(let i=0;i<n;i++){const c=i%3,r=Math.floor(i/3);const px=x+14+c*7,py=y-30-r*4;el(px,py+2,4,1.8);F('#c88a1a');el(px,py,4,1.8);F('#ffd34c');S(1);}
  if(o.cash>0){const bo=Math.sin(T*6)*2;badge(x+22,y-56-Math.min(4,n/3)*4+bo,'+'+fmt(o.cash),'#ffe9a0');}}
function drawCop(o){const x=o.x,y=o.y;shadow(x,y+2,13,4);g.beginPath();g.moveTo(x-11,y-22);g.lineTo(x+11,y-22);g.lineTo(x+9,y+2);g.lineTo(x-9,y+2);g.closePath();F('#7a8a6a');S(2);
  for(let i=-1;i<=1;i++){g.beginPath();g.moveTo(x+i*5,y-18);g.lineTo(x+i*4,y-2);S(1.2,'#5a6a4a');}rr(x-13,y-26,26,6,3);F('#8a9a7a');S(1.8);rr(x-4,y-30,8,4,2);F('#5a6a4a');S(1.2);}
function drawAsKazan(o){const x=o.x,y=o.y-6,on=G.phase==='day';
  shadow(x,y+4,26,6);[-14,14].forEach(dx=>{g.beginPath();g.moveTo(x+dx,y+4);g.lineTo(x+dx*.6,y-10);S(3,'#5a4a3a');});
  if(on){const fl=Math.sin(T*16);g.beginPath();g.moveTo(x-10,y+4);g.quadraticCurveTo(x-5,y-8+fl*2,x,y+4);g.quadraticCurveTo(x+5,y-10-fl*2,x+10,y+4);F('#ffb340');S(1.5,'#c63a1a');}
  el(x,y-14,20,15);F('#3a3438');S(2.2);el(x,y-24,19,5);F('#f0a040');S(2);circ(x-6,y-25,2);F('#fff3c0');
  if(on&&Math.random()<.05)fx('steam',x+(Math.random()-.5)*20,y-30,{vy:-16,t:1.3,r:3});
  for(let i=0;i<o.pile;i++)drawItem('as',x+30,y-2-i*7,.8);sign(x,y+12,'Aş Kazanı');}
function drawDeco(o){DECO[o.d].draw(o.x,o.y);}
function drawObj(o){if(o.k==='st')drawStation(o);else if(o.k==='sup')drawSupply(o);else if(o.k==='rack')drawRack(o);else if(o.k==='kasa')drawKasa(o);else if(o.k==='cop')drawCop(o);else if(o.k==='askazan')drawAsKazan(o);else if(o.k==='kiosk')drawKiosk(o);else if(o.k==='teslim')drawTeslim(o);else if(o.k==='depo')drawDepo(o);else drawDeco(o);}

/* ====================== KALİTE GÖRSELLERİ ====================== */
function drawItemQ(id,x,y,k,lite){const q=qOf(id);k=k||1;
  if(lite){if(q>=3){g.globalAlpha=.3;circ(x,y,9*k);F(q>=5?'#ff9a30':q>=4?'#c9a0ff':'#ffd34c');g.globalAlpha=1;}drawItem(id,x,y,k);return;}
  if(q>=3){g.globalAlpha=.28+.12*Math.sin(T*3+x*.1);circ(x,y,9.5*k);F(q>=5?'#ff9a30':q>=4?'#c9a0ff':'#ffd34c');g.globalAlpha=1;}
  drawItem(id,x,y,k);
  if(q>=1){g.beginPath();g.moveTo(x+3*k,y-6*k);g.lineTo(x+6*k,y-3*k);S(1.3,'rgba(255,255,255,.9)');}
  if(q>=2){circ(x-6*k,y+4*k,1.6*k);F('#ffd34c');S(.8);}
  if(q>=3){const s=(1+Math.sin(T*5+x))*.5;tw(x+7*k,y-8*k,(2+s*2.5)*k,'#fff6c0');}
  if(q>=4){const a=T*2+x*.05;tw(x+Math.cos(a)*10*k,y+Math.sin(a)*8*k,2.6*k,'#e0c8ff');}
  if(q>=5){g.save();g.translate(x,y);g.rotate(T*1.2);for(let i=0;i<6;i++){g.rotate(Math.PI/3);g.beginPath();g.moveTo(9*k,0);g.lineTo(13*k,0);S(1.6,'#ffb020');}g.restore();}}
function tw(x,y,r,c){g.beginPath();for(let i=0;i<8;i++){const rr2=i%2?r*.35:r,an=i*Math.PI/4;g.lineTo(x+Math.cos(an)*rr2,y+Math.sin(an)*rr2);}g.closePath();F(c);}
function rackTier(o){if(o.item==='vitrin')return Math.max(0,...ENCH.map(qOf));if(o.item==='simya')return Math.max(0,...SIMYA.map(qOf));return qOf(o.item);}
const RACKPAL=[{t:'#cf9a5e',f:'#a06a3a',b:'#f3e2bf',l:'#7a4a24'},{t:'#c98a52',f:'#8a5a32',b:'#f6e9c8',l:'#6a3a1a'},{t:'#9a5a32',f:'#6a3a1a',b:'#fbefd6',l:'#4a2a12'},{t:'#5a2a3a',f:'#3a1a2a',b:'#3a2448',l:'#2a1220'},{t:'#f2ead8',f:'#cfc0a8',b:'#22305a',l:'#a89f92'},{t:'#2a1a12',f:'#1a0f0a',b:'#3a1a0a',l:'#f0b43c'}];
function drawRack(o){const x=o.x,y=o.y,cp=rackCap(o),vit=o.item==='vitrin',sim=o.item==='simya',tq=rackTier(o);const P=RACKPAL[tq];
  if(tq>=4){g.globalAlpha=.25+.1*Math.sin(T*2);el(x,y-24,52,34);F(tq>=5?'#ffb020':'#c9a0ff');g.globalAlpha=1;}
  shadow(x,y+2,40,7);[-1,1].forEach(s=>{rr(x+s*30-3,y-10,6,12,2);F(P.l);S(1.8);});
  if(tq>=3){[-1,1].forEach(s=>{rr(x+s*36-3,y-74,6,66,2);F(tq>=4?'#e3dccf':'#7a4a24');S(1.6);});g.beginPath();g.moveTo(x-40,y-70);g.quadraticCurveTo(x,y-96,x+40,y-70);g.lineTo(x+40,y-64);g.quadraticCurveTo(x,y-88,x-40,y-64);g.closePath();F(tq>=4?'#4f86c4':'#b7473c');S(1.8);circ(x,y-86,4);F('#ffd34c');S(1.2);}
  box(x,y-6,76,12,36,vit?(tq>=3?'#4a2a6a':'#7a5aa0'):sim?'#3f7a4a':P.t,vit?'#4a2a6a':sim?'#2a5a3a':P.f,7);rr(x-34,y-46,68,30,5);F(vit?(tq>=3?'#2a1a3a':'#e8e0ff'):sim?'#e0f4d8':P.b);S(1.5,tq>=2?'#f0b43c':'#b98a52');
  if(tq>=4&&!vit&&!sim){for(let i=0;i<6;i++){circ(x-28+i*11,y-42+(i%2)*20,.9);F('#fff');}}
  if(tq>=1&&!vit&&!sim){g.beginPath();g.moveTo(x-38,y-18);for(let i=0;i<=6;i++)g.quadraticCurveTo(x-38+i*12.7-6,y-10,x-38+i*12.7,y-18);g.lineTo(x+38,y-18);F(['#c9463d','#c9463d','#3f6aa0','#6a2a8a','#c9a0ff','#f0b43c'][tq]);S(1.2);}
  if(tq>=2){[-1,1].forEach(s=>{circ(x+s*38,y-44,3.2);F('#ffd34c');S(1.2);});g.beginPath();g.moveTo(x-34,y-47);g.lineTo(x+34,y-47);S(1.6,'#f0b43c');}
  const items=[];for(const k in o.stock)for(let i=0;i<o.stock[k];i++)items.push(k);
  const n=Math.min(items.length,10);for(let i=0;i<n;i++){const r=i<5?0:1,c=i%5;drawItemQ(items[i],x-26+c*13,y-38+r*13,.9,i%3!==0);}
  if(items.length>10)txt('+'+(items.length-10),x+28,y-22,9,'#c9463d',{o:'#fff7e6',ow:3});
  if(vit||sim){rr(x-28,y-10,56,13,4);F('#fff7e6');S(1.6);txt(vit?'Efsun Vitrini':'Simya Rafı',x,y-3,8,vit?'#6a3a8a':'#2f6a3a');}
  else{const pr=price(o.item);g.font='700 9.5px Fredoka, sans-serif';const pw=Math.max(34,g.measureText(fmt(pr)).width+22);rr(x-pw/2,y-10,pw,13,4);F(tq>=2?'#ffe9a0':'#fff7e6');S(1.6);el(x-pw/2+8,y-3.5,3.3,3.3);F('#ffd34c');S(1.1);txt(fmt(pr),x+4,y-3,9.5,OL);}
  if(tq)qStars(x,y-(tq>=3?100:52),tq);
  badge(x-36,y-50,items.length+'/'+cp,items.length===0?'#ffc0b0':null);}
/* ====================== ÜNİFORMA VE KIYAFET ====================== */
function uniTier(role){const gk=USTA_ROLES.includes(role)?'usta':role;const sk=G.skill[gk];if(!sk)return 0;let s=0;for(const k in sk)s+=sk[k];return s>=6?3:s>=3?2:s>=1?1:0;}
const UNI={hamal:'#4f7a2a',katip:'#6a2a3a',bekci:'#c9632e',demirci:'#4a2a1a',kececi:'#8a2a5a',hattat:'#2a4a7a',carikci:'#5a3a1a',efsuncu:'#3a1a5a',simyager:'#1f5a3a'};
function capeBehind(x,y,sp,col,dir){const k=sp.k||1,legH=(sp.leg||8)*k,bh=sp.bh*k,bw=sp.bw*k;g.beginPath();g.moveTo(x-bw*.42,y-legH-bh+2);g.lineTo(x+bw*.42,y-legH-bh+2);g.lineTo(x+bw*.75,y-2);g.quadraticCurveTo(x,y+4,x-bw*.75,y-2);g.closePath();F(col);S(2);}
function hatOn(x,top,k,col){rr(x-6*k,top-3*k,12*k,9*k,2.5);F(col||'#c9302a');S(1.6);g.beginPath();g.moveTo(x,top-3*k);g.quadraticCurveTo(x+6*k,top-6*k,x+7*k,top+3*k);S(1.4,'#f0b43c');}
function badgeOn(x,y,sp,dir){const k=sp.k||1;circ(x+(sp.bw*.2*k)*(dir||1),y-((sp.leg||8)+sp.bh*.6)*k,2.8*k);F('#ffd34c');S(1.2);}
const UNIC={};function uniSpec(role){const sp=SPEC[role],t=uniTier(role);if(!t)return sp;const key=role+t;if(UNIC[key])return UNIC[key];return UNIC[key]=uniSpecRaw(role,sp,t);}
function uniSpecRaw(role,sp,t){const c=UNI[role]||sp.cloth;return Object.assign({},sp,{cloth:t>=2?c:mix(sp.cloth,c,.5),belt:'#f0b43c',trim:t>=2?'#f0b43c':sp.trim});}
function drawWorker(w){const t=uniTier(w.role),sp=uniSpec(w.role);
  if(t>=3)capeBehind(w.x,w.y,sp,shade(UNI[w.role]||'#6a2a3a',-.25),w.dir);
  if(w.role==='bekci'){spear(w.x+(w.dir>0?12:-12),w.y-6,58,w.dir*.08);}
  const top=drawGuy(w.x,w.y+(w.st==='mani'||w.st==='rest'||w.st==='mola'?3:0),w,sp);w.top=top;
  if(w.role==='burkazur'){txt('Burkazur',w.x,w.y+12,8.5,'#fff7e6',{o:OL,ow:2.5,w:700});if(w.st==='mola'){for(let i=0;i<2;i++){const k=(T*.6+i*.5)%1;txt('z',w.x+10+k*8,top-6-k*14,9-k*3,'#fff',{o:OL,ow:2});}}}
  if(t>=2&&w.role!=='katip'&&w.role!=='hattat')hatOn(w.x,top+6,sp.k||1,t>=3?'#7a1a2a':'#c9302a');if(t>=1)badgeOn(w.x,w.y,sp,w.dir);
  if(w.stack&&w.stack.length){let yy=top+6;const n=w.stack.length;for(let i=0;i<n;i++){const id=w.stack[i];drawItemQ(id,w.x,yy,1,i<n-1);yy-=GAP[id]||5.5;}w.top=yy;}
  if(w.role==='hamal'){const by=w.top-4;rr(w.x-14,by-4,28,6,3);F('#4a3226');rr(w.x-13,by-3,26*clamp(w.hunger/100,0,1),4,2);F(w.hunger<25?'#ff6a4a':'#7fd06a');w.top=by-6;}
  if(w.off||(w.role==='hamal'&&G.phase!=='day')||(ROLES[w.role].st&&G.phase!=='day'))txt('z',w.x+16,w.top-6-Math.sin(T*2)*4,12,'#fff',{o:OL,ow:3});}
function drawCust(c){const R=RACES[c.race];let sp=R;const tier=c.tier==null?1:c.tier;
  if(R.pale&&(c.st==='rack'||c.st==='queue')){c.skin=mix('#62a66e','#f4f6f2',1-clamp(c.pat/c.pmax,0,1));sp=Object.assign({},R,{tail:c.skin});}
  if(sp===R){if(!c._sp){c._sp=Object.assign({},R,c.cloth?{cloth:c.cloth}:{},tier>=2?{belt:'#f0b43c',trim:'#f0b43c'}:{});}sp=c._sp;}else{if(c.cloth)sp.cloth=c.cloth;if(tier>=2){sp.belt='#f0b43c';sp.trim='#f0b43c';}}
  c.carry=c.st==='queue'||(c.st==='out'&&(c.got||c.carryK))||(c.st==='kiosk'&&c.got);
  if(tier===3)capeBehind(c.x,c.y,sp,'#5a1a6a',c.dir);
  const top=drawGuy(c.x,c.y,c,sp);
  if(tier===0){const k=sp.k||1;rr(c.x-4,c.y-((sp.leg||8)+sp.bh*.5)*k,6,5,1);F('#c9a56c');S(1);}
  if(tier>=2){const k=sp.k||1;g.beginPath();g.arc(c.x,c.y-((sp.leg||8)+sp.bh)*k+2,sp.bw*.3*k,.3,Math.PI-.3);S(1.6,'#ffd34c');}
  if(tier===3){hatOn(c.x,top+6,sp.k||1,'#5a1a6a');circ(c.x,top+3,2);F('#e0484a');}
  if(c.carry){const id=c.carryK&&c.st==='out'?c.carryK:c.want;const n=c.carryK&&c.st==='out'?1:(c.got||1);let yy=top+18;for(let i=0;i<Math.min(n,4);i++){drawItemQ(id,c.x+(c.dir<0?-2:2),yy,.9);yy-=GAP[id]||5.5;}}
  if(c.st==='rack'&&!c.sar)wantBubble(c,top);c.top=top;}
/* ====================== KÖŞKLER ====================== */
function drawKiosk(o){const K0=KIOSK[o.kind],x=o.x,y=o.y,lv=G.kioskLv[o.kind]||0;shadow(x,y+4,46+lv*4,8);
  if(lv>=4){g.globalAlpha=.2+.08*Math.sin(T*2);el(x,y-40,70,60);F('#9ad0ff');g.globalAlpha=1;}
  if(lv>=1){[-56,56].forEach(s=>{rr(x+s-8,y-12,16,10,4);F('#a86a38');S(1.6);});}
  const vs=Object.assign({},SPEC[K0.spec],lv>=2?{belt:'#f0b43c',trim:'#f0b43c'}:{});const v={dir:1,walk:0,moving:false,seed:o.uid,look:Math.sin(T*.7+o.uid),skin:vs.skin};const vt=drawGuy(x+6,y-26,v,vs);if(lv>=3)hatOn(x+6,vt+6,1,'#c9302a');
  if(lv<=1){rr(x-3,y-104,6,80,2);F('#7a4a24');S(1.6);const R0=lv?58:46;
    for(let i=0;i<8;i++){g.beginPath();g.moveTo(x,y-112);g.lineTo(x-R0+i*R0/4,y-86);g.lineTo(x-R0+(i+1)*R0/4,y-86);g.closePath();F(i%2?'#fff':K0.col);S(1.6);}}
  else{[-44,44].forEach(s=>{rr(x+s-4,y-96,8,96,2);F(lv>=4?'#e3dccf':'#8a5a32');S(1.6);});
    if(lv===2){g.beginPath();g.moveTo(x-54,y-92);g.lineTo(x+54,y-92);g.lineTo(x+46,y-110);g.lineTo(x-46,y-110);g.closePath();F(K0.col);S(2);for(let i=-40;i<=40;i+=16){g.beginPath();g.moveTo(x+i,y-110);g.lineTo(x+i*1.15,y-92);S(1.2,'#fff');}}
    else if(lv===3){g.beginPath();g.moveTo(x-58,y-92);g.quadraticCurveTo(x,y-130,x+58,y-92);g.closePath();F(K0.col);S(2);g.beginPath();g.moveTo(x-50,y-92);g.quadraticCurveTo(x,y-80,x+50,y-92);S(1.4,'#4a3226');for(let i=0;i<5;i++){const lx=x-40+i*20,ly=y-88+Math.abs(i-2)*-3;circ(lx,ly+6,4);F(i%2?'#ffcf5a':'#ff8a5a');S(1.2);}}
    else{g.beginPath();g.moveTo(x-58,y-92);g.quadraticCurveTo(x-50,y-140,x,y-146);g.quadraticCurveTo(x+50,y-140,x+58,y-92);g.closePath();F('#4f86c4');S(2.2);rr(x-2,y-160,4,16,2);F('#f0b43c');S(1.2);circ(x,y-162,5);F('#ffd34c');S(1.4);
      for(let i=0;i<3;i++){g.beginPath();g.moveTo(x,y-144);g.quadraticCurveTo(x-30+i*30,y-120,x-44+i*44,y-94);S(1.2,'#2a5a8a');}}}
  box(x,y,80+lv*8,24,14,lv>=4?'#f2ead8':'#e8c792',lv>=4?'#cfc0a8':'#c48a52',6);rr(x-32,y-22,64,14,4);F(lv>=2?'#ffe9a0':'#fff7e6');S(1.4);txt(K0.lbl||'',x,y-15,8.5,'#8a2f2a');
  drawItem(K0.item,x-28,y-34,.8);drawItem(K0.item,x+28,y-34,.8);if(lv>=2)drawItem(K0.item,x,y-36,.9);
  if(lv)qStars(x,y+16,lv);if(o.sold)badge(x+44,y-60,o.sold+' satış','#e3f3d8');}
function drawTeslim(o){const x=o.x,y=o.y,C=G.contract;shadow(x,y+2,28,5);box(x,y,52,18,16,'#b07a48','#8a5a32',5);rr(x-26,y-36,52,6,3);F('#c9463d');S(1.4);rr(x-3,y-36,6,20,2);F('#f0b43c');S(1.2);
  sign(x,y+3,'Teslim Sandığı');if(C){drawItemQ(C.item,x,y-44,1);badge(x+28,y-46,C.got+'/'+C.need,'#e3f3d8');}}
/* ====================== ÖZEL KONUKLAR ====================== */
function frog(x,y,t,dir){g.save();g.translate(x,y);g.scale(dir<0?-1:1,1);const hop=Math.abs(Math.sin(t*3))*6;shadow(0,4,46,9);
  [[-30,0],[30,0]].forEach(([a])=>{el(a,-6,16,8);F('#4f8a3a');S(2);});el(0,-28-hop,44,26);F('#6aa860');S(2.4);el(0,-20-hop,34,14);F('#c9e8a0');
  [-18,18].forEach(s=>{circ(s,-52-hop,10);F('#6aa860');S(2);circ(s,-52-hop,6);F('#fff');S(1.2);circ(s+2,-52-hop,3);F(OL);});g.beginPath();g.arc(0,-34-hop,18,.2,Math.PI-.2);S(2);g.restore();return -50-hop;}
function drawVIP(q){const sp=SPEC[q.kind];
  if(q.kind==='hasmet'){const ry=frog(q.x,q.y,q.walk||T,q.dir);const o={dir:q.dir,walk:0,moving:false,seed:3,look:q.look||0,skin:sp.skin};const top=drawGuy(q.x,q.y+ry+6,o,Object.assign({},sp,{k:.9}));
    for(let i=-2;i<=2;i++){g.beginPath();g.moveTo(q.x+i*5,top+4);g.lineTo(q.x+i*5,top-6-(i===0?4:0));S(2.4,'#f0b43c');}q.top=top-8;return;}
  if(q.kind==='sultan'){const t2=Object.assign({},sp);const top=drawGuy(q.x,q.y,q,t2);el(q.x,top+4,13,8);F('#f6f2ea');S(2);circ(q.x,top-2,3);F('#e0484a');S(1.2);g.beginPath();g.moveTo(q.x,top-4);g.quadraticCurveTo(q.x+6,top-14,q.x+2,top-18);S(2,'#f2ead8');q.top=top-14;
    rr(q.x+14*q.dir-1,q.y-80,2,62,1);F('#7a4a24');el(q.x+14*q.dir,q.y-82,20,7);F('#f0b43c');S(1.4);return;}
  if(q.kind==='muhafiz'){spear(q.x+12,q.y-6,64,.05);const top=drawGuy(q.x,q.y,q,sp);q.top=top;return;}
  if(q.kind==='reis'){rr(q.x-16*q.dir-1.5,q.y-70,3,70,1.5);F('#7a4a24');S(1.2);const top=drawGuy(q.x,q.y,q,sp);el(q.x+2*q.dir,top+26,7,8);F('#f6f2ea');S(1.4);q.top=top;}}

/* ====================== KARAKTERLER ====================== */
function bubble(x,y,s){g.font="600 10px Fredoka, sans-serif";
  const words=s.split(' '),ls=[];let line='';for(const w of words){const t2=line?line+' '+w:w;if(g.measureText(t2).width>118&&line){ls.push(line);line=w;}else line=t2;}if(line)ls.push(line);
  const w=Math.max(...ls.map(l=>g.measureText(l).width))+14,h=ls.length*12+8;
  const vl=camX-innerWidth/2/WS()+4,vr=camX+innerWidth/2/WS()-4;
  const bx=clamp(x-w/2,vl,vr-w),by=y-h-8;const tx=clamp(x,bx+10,bx+w-10);
  rr(bx,by,w,h,9);F('#ffffff');S(2);
  g.beginPath();g.moveTo(tx-5,by+h-1);g.lineTo(tx,by+h+7);g.lineTo(tx+5,by+h-1);F('#ffffff');
  g.beginPath();g.moveTo(tx-5,by+h);g.lineTo(tx,by+h+7);g.lineTo(tx+5,by+h);S(2);
  ls.forEach((l,i)=>txt(l,bx+w/2,by+10+i*12,10,OL,{w:600}));}
function wantBubble(c,top){const x=c.x,y=top-6;const fav=PREF[c.race]&&PREF[c.race].fav===c.want;
  el(x,y-12,13,12);F(fav?'#ffe0ec':'#fff');S(2);g.beginPath();g.moveTo(x-4,y-1);g.lineTo(x,y+5);g.lineTo(x+4,y-1);F(fav?'#ffe0ec':'#fff');S(2);el(x,y-12,12,11);F(fav?'#ffe0ec':'#fff');
  drawItem(c.want,x,y-12,.95);
  const k=clamp(c.pat/c.pmax,0,1);g.beginPath();g.arc(x,y-12,15,-Math.PI/2,-Math.PI/2+k*Math.PI*2);S(3,k<.3?'#e04a3a':k<.6?'#f0b43c':'#5abf5a');
  if(c.qty>1){circ(x+14,y-22,8);F('#c9463d');S(1.8);txt('×'+c.qty,x+14,y-21.5,9,'#fff');}
  if(fav){g.save();g.translate(x-14,y-24);g.beginPath();g.moveTo(0,4);g.bezierCurveTo(-7,-2,-4,-8,0,-4);g.bezierCurveTo(4,-8,7,-2,0,4);F('#ff5a8a');S(1.4);g.restore();}}
function drawPlayer(){const p=G.p;p.carry=G.stack.length>0&&!p.tool;
  if(G.phase==='night'){const gl=g.createRadialGradient(p.x,p.y-20,4,p.x,p.y-20,70);gl.addColorStop(0,'rgba(255,220,140,.18)');gl.addColorStop(1,'rgba(255,220,140,0)');g.fillStyle=gl;g.fillRect(p.x-70,p.y-90,140,140);}
  if(G.auto&&p.moving){for(let i=1;i<4;i++){g.globalAlpha=.18/i;drawGuy(p.x-p.dir*i*9,p.y,p,playerSpec());}g.globalAlpha=1;}
  const PS=playerSpec();const top=drawGuy(p.x,p.y,p,PS);p.top=top;playerAcc(p,top);
  const sway=p.moving?Math.sin(T*12)*.8:0;let yy=top+4;
  for(let i=0;i<G.stack.length;i++){const id=G.stack[i];drawItemQ(id,p.x+sway*i*.5+(p.tool?-8*p.dir:0),yy,1);yy-=GAP[id]||5.5;}
  p.stackTop=yy;
  if(G.stack.length>=cap())txt('DOLU',p.x,yy-6,10,'#ff7a5a',{o:OL,ow:3});}
function drawThief(t){const top=drawGuy(t.x,t.y,t,SPEC.hirsiz);const hy=top+8;g.beginPath();g.arc(t.x,hy+6,13,Math.PI*1.05,Math.PI*1.95);g.lineTo(t.x+(t.dir>0?-10:10),hy+16);g.closePath();F('#2a2434');S(2);
  if(t.loot){rr(t.x+(t.dir>0?-22:10),t.y-34,14,16,6);F('#8a6a4a');S(1.8);}
  if(t.st==='steal'&&Math.sin(T*10)>0)txt('!',t.x,top-12,18,'#ff5a4a',{o:OL,ow:4});t.top=top;}
function drawFam(f){drawGuy(f.x,f.y,f,Object.assign({},HAMAL,{cloth:f.cloth,skin:f.skin,k:f.k||1}));}
function drawHighlight(o){const f=fpOf(o);const a=.35+Math.sin(T*6)*.15;let x0=f[0]-6,x1=f[2]+6;
  if(o.k==='st'){const s=o.x+ST[o.type].tray-14;if(G.nearMode==='tray')x0=s-10;else x1=s+2;}
  rr(x0,f[3]-10,x1-x0,20,10);F(`rgba(255,240,140,${a})`);S(2,`rgba(240,180,60,${a+.3})`);
  if(o.k==='st'){const tx=o.x+ST[o.type].tray;txt(G.nearMode==='tray'?'AL':'ÜRET',G.nearMode==='tray'?tx:(f[0]+tx-14)/2,f[3]+20,9,'#fff',{o:OL,ow:3});}}
function drawPart(q){const a=clamp(q.t/q.max,0,1);g.globalAlpha=Math.min(1,a*1.6);
  switch(q.k){
    case'spark':g.beginPath();g.moveTo(q.x,q.y);g.lineTo(q.x-q.vx*.03,q.y-q.vy*.03);S(2.4,a>.5?'#fff2a0':'#ff9a30');break;
    case'ember':circ(q.x,q.y,1.6);F('#ffb340');break;
    case'bubble':circ(q.x,q.y,2.5);S(1.2,'#8ae08a');break;
    case'magic':g.save();g.translate(q.x,q.y);g.rotate(q.t*8);g.beginPath();for(let i=0;i<8;i++){const r=i%2?1.5:4,an=i*Math.PI/4;g.lineTo(Math.cos(an)*r,Math.sin(an)*r);}g.closePath();F('#c9a0ff');g.restore();break;
    case'steam':case'smoke':circ(q.x,q.y,q.r);F(q.k==='steam'?'rgba(255,255,255,.7)':'rgba(120,110,105,.45)');break;
    case'fluff':circ(q.x,q.y,q.r*.7);F('#fbf4e6');S(1);break;
    case'ink':circ(q.x,q.y,1.8);F('#2a2030');break;
    case'dust':circ(q.x,q.y,q.r*(1.5-a*.5));F('rgba(200,160,110,.5)');break;
    case'heart':g.save();g.translate(q.x,q.y);g.beginPath();g.moveTo(0,4);g.bezierCurveTo(-8,-3,-4,-9,0,-4);g.bezierCurveTo(4,-9,8,-3,0,4);F('#ff6a8a');S(1.5);g.restore();break;
    case'note':txt('♪',q.x,q.y,16,'#7fd06a',{o:OL,ow:3});break;
    case'star':g.save();g.translate(q.x,q.y);g.rotate(q.t*6);g.beginPath();for(let i=0;i<10;i++){const r=i%2?2.4:6,an=i*Math.PI/5;g.lineTo(Math.cos(an)*r,Math.sin(an)*r);}g.closePath();F('#ffe48a');S(1.2);g.restore();break;
    case'text':txt(q.s,q.x,q.y,q.size,q.col,{o:OL,ow:4});break;
    case'zzz':txt('z',q.x,q.y,10+(1-a)*8,'#fff',{o:OL,ow:3});break;
    case'flycoin':{const k=1-a,x=q.sx+(G.p.x-q.sx)*ease(k),y=q.sy+(G.p.y-60-q.sy)*ease(k)-Math.sin(k*Math.PI)*50;g.globalAlpha=1;coinIcon(x,y,6);break;}
  }
  g.globalAlpha=1;}

/* ====================== HUD ====================== */
function coinIcon(x,y,r){circ(x,y,r);F('#ffd34c');S(2);circ(x,y,r*.62);S(1.4,'#c88a1a');txt('N',x,y+.5,r*.9,'#c88a1a',{w:700});}
function nudStr(n){n=Math.floor(n);const neg=n<0;n=Math.abs(n);return (neg?'-':'')+n.toString().replace(/\B(?=(\d{3})+(?!\d))/g,'.');}
function objective(){const t=G.tut;
  if(G.phase==='night'){if(G.story===1)return['📦 "Sipariş"e bas, yarına demir külçe ısmarla',null];if(G.story===2)return['💤 "Uyu"ya bas: İdiz yatağına koşar, gün başlar',null];return null;}
  if(G.phase==='day'&&!G.opened)return['🚪 Dükkâna gir: kepenkler sen girince açılır, gün o an başlar',null];
  if(t.cashed||G.phase!=='day'||G.day>3)return null;
  const so=findObj('sup',o=>o.item==='kulce'),oc=findObj('st',o=>o.type==='ocak'),wo=findObj('st',o=>o.type==='ors'),ro=findObj('rack',o=>o.item==='yatagan'),ko=findObj('kasa');
  if(!t.ore)return['Demir külçe sandığından külçe kucakla',so];
  if(!t.fed)return['Külçeleri ocağa at, kızsınlar',oc];
  if(!t.forged)return['Örsün SOL yanında dur: kılıcı döv!',wo];
  if(!t.picked)return['Yatağan örsün SAĞINDAKİ tablada. Git, al!',wo];
  if(!t.racked)return['Yatağanları rafa diz',ro];
  if(!t.sold)return['Kasaya geç, müşteriye sat',ko];
  return['Kasadaki nüdleri topla',ko];}
function drawSplash(){const q=G.splash;if(!q)return;const a=Math.min(1,(q.max-q.t)/.3,q.t/.4);g.save();g.globalAlpha=clamp(a,0,1);g.translate(VW/2,VH*.32);const s2=easeBack(clamp((q.max-q.t)/.4,0,1));g.scale(s2,s2);
  rr(-140,-44,280,88,20);F('rgba(40,20,50,.92)');S(3,'#f0b43c');txt(q.title,0,-14,24,'#ffd34c',{f:"'Lilita One'",w:400,o:'#2a1a26',ow:5});txt(q.sub,0,18,13,'#fff2dc',{w:700});g.restore();g.globalAlpha=1;}
function drawToasts(Y0){const q=G.toasts[0];if(!q)return;
  const showT=q.max-q.t;const k=Math.min(1,showT/.25,q.t/.25);const x0=VW/2-144,y=Math.max(112,Y0||0)-(1-ease(k))*40;g.globalAlpha=clamp(k,0,1);
  rr(x0,y,288,52,14);F('#fff7e6');S(2.8);const hasI=q.item||q.race||q.deco||q.st||q.role;if(hasI){rr(x0+8,y+8,36,36,10);F('#f4e2bd');S(1.8);}
  if(q.item)drawItem(q.item,x0+26,y+26,1.25);
  if(q.race){g.save();g.translate(x0+26,y+28);g.scale(.85,.85);const R=RACES[q.race];HEADS[R.head](R.R,{skin:R.skin,hair:R.hair?R.hair[0]:'#5a3a22',band:'#c9463d',seed:0,look:.5});g.restore();}
  if(q.role){g.save();g.translate(x0+26,y+28);g.scale(.85,.85);const R=SPEC[q.role];HEADS[R.head](R.R,{skin:R.skin,hair:'#5a3a22',band:'#c9463d',seed:0,look:.5});g.restore();}
  if(q.deco){g.save();g.translate(x0+26,y+40);g.scale(.42,.42);DECO[q.deco].draw(0,0);g.restore();}
  if(q.st){g.save();g.translate(x0+26,y+38);g.scale(.42,.42);drawStation({k:'st',type:q.st,x:0,y:0,inp:[],out:[],fin:[],craft:0,heat:0},true);g.restore();}
  const tx0=hasI?x0+54:x0+16;txt(q.title,tx0,y+18,14,'#c9463d',{a:'left',w:700});g.font='600 10.5px Fredoka, sans-serif';const lim=hasI?222:258,sw=g.measureText(q.sub).width,fs=sw>lim?10.5*lim/sw:10.5;txt(q.sub,tx0,y+35,fs,OL,{a:'left',w:600});g.globalAlpha=1;}
function arrowAt(sx,sy,col){g.save();g.translate(sx,sy+Math.sin(T*6)*5);g.beginPath();g.moveTo(-9,-14);g.lineTo(9,-14);g.lineTo(9,-2);g.lineTo(15,-2);g.lineTo(0,12);g.lineTo(-15,-2);g.lineTo(-9,-2);g.closePath();F(col||'#ff6a4a');S(2.5);g.restore();}
function drawHUD(){
  g.setTransform(U*DPR,0,0,U*DPR,0,0);
  const s=1+hudPop*.15;const ns=nudStr(G.nud);g.font='700 16px Fredoka, sans-serif';const nw=Math.max(96,g.measureText(ns).width+48);
  g.save();g.translate(10,10);rr(0,0,nw,32,16);F('#fff7e6');S(2.5);g.save();g.translate(18,16);g.scale(s,s);coinIcon(0,0,10);g.restore();txt(ns,34,16.5,16,OL,{w:700,a:'left'});g.restore();
  const night=G.phase!=='day';const dx=nw+18;g.save();g.translate(dx,10);rr(0,0,112,32,16);F(night?'#3a3560':'#fff7e6');S(2.5);
  if(night){circ(16,16,9);F('#efe6ff');S(1.8);circ(20,13,7);F('#3a3560');circ(24,22,3);F('#ff7a6a');S(1.2);}
  else{circ(16,16,8);F('#ffd34c');S(1.8);for(let i=0;i<8;i++){const a=i*Math.PI/4+T*.5;g.beginPath();g.moveTo(16+Math.cos(a)*11,16+Math.sin(a)*11);g.lineTo(16+Math.cos(a)*14,16+Math.sin(a)*14);S(2,'#e0a020');}}
  txt(G.day?G.day+'. Gün':'Açılış Gecesi',66,11,G.day?12.5:11,night?'#fff7e6':OL,{w:700});txt(dateStr(Math.max(1,G.day)).split(',')[0],66,23,9,night?'#cfc6ef':'#8a6a50',{w:600});g.restore();
  let by=50;
  if(G.phase==='day'&&!G.opened){const w0=VW-20;rr(10,by,w0,14,7);F('rgba(74,50,38,.85)');txt('🔒 Kepenk kapalı · '+dayLen()+' sn hazır',VW/2,by+7.5,9,'#ffe48a');by=72;}
  else if(G.phase==='day'){const k=G.dayT/dayLen(),w0=VW-20;rr(10,by,w0,10,5);F('#4a3226');rr(11.5,by+1.5,(w0-3)*(1-k),7,3.5);F(k>.8?'#ff8a5a':'#ffd34c');
    const sx=10+w0*(1-k);circ(sx,by+5,6);F('#ffd34c');S(1.8);txt(Math.ceil(dayLen()-G.dayT)+' sn',VW-30,by+18,9,OL,{o:'#fff7e6',ow:3});if(k>.8)txt('Kepenk iniyor!',VW/2,by+20,10,'#c9463d',{o:'#fff7e6',ow:3});by=76;}
  else if(G.story>=3){const k=G.dream?1:clamp(G.nud/DREAM,0,1),w0=VW-20;rr(10,by,w0,14,7);F('rgba(58,53,96,.9)');S(2);if(k>0){rr(11.5,by+1.5,Math.max(10,(w0-3)*k),11,5.5);F(G.dream?'#7fd06a':'#ff8aa8');}
    txt(G.dream?'💚 Aile Agreguk\'ta!':'🏠 Aileyi getir: '+fmt(G.nud)+' / '+fmt(DREAM)+' nüd (%'+(k*100).toFixed(k<.1?2:1)+')',VW/2,by+7.5,9,'#fff',{o:OL,ow:2.5});by=72;}
  else by=58;
  if(G.thief){g.save();g.translate(VW/2,by+12);const p=1+Math.sin(T*8)*.05;g.scale(p,p);rr(-80,-12,160,24,12);F('rgba(200,50,40,.92)');S(2);txt('🕵 HIRSIZ! Yakala!',0,.5,12,'#fff');g.restore();by+=30;}
  const ob=objective();
  if(ob){g.font="700 11px Fredoka, sans-serif";const w=g.measureText(ob[0]).width+24;rr(VW/2-w/2,by,w,24,12);F('rgba(74,50,38,.9)');txt(ob[0],VW/2,by+12.5,11,'#ffe48a');}
  else if(!EDIT&&G.story>=3){const chips=[];const nm=nextMark();if(nm)chips.push([(nm.k===1?'❗ YARIN: ':'🎲 ')+nm.t+(nm.k>1?' · '+nm.k+' gün':''),nm.k<=2?'rgba(140,40,120,.92)':'rgba(74,50,38,.85)']);
    const C=G.contract;if(C)chips.push(['📜 '+C.got+'/'+C.need+' '+IT[C.item].ad+' · '+Math.max(0,C.due-G.day)+' gün',C.due-G.day<=0?'rgba(200,60,50,.92)':'rgba(40,90,60,.9)']);
    for(const [t2,col] of chips){g.font="700 10.5px Fredoka, sans-serif";const w=g.measureText(t2).width+22;const p=col.startsWith('rgba(140')?1+Math.sin(T*5)*.04:1;g.save();g.translate(VW/2,by+11);g.scale(p,p);rr(-w/2,-11,w,22,11);F(col);txt(t2,0,.5,10.5,'#ffe9b8');g.restore();by+=26;}}
  if(EDIT){g.font="700 11px Fredoka, sans-serif";const s0=PAINT!==null?(PAINT===-1?'Silmek için sürükle · karo başına +2 iade':'Boyamak için sürükle · karo '+TILE_COST+' nüd'):drag?(drag.valid?'Bırak: buraya koy':'Buraya sığmaz!'):'Bir eşyayı sürükle · Boş yeri sürükle: kamera';const w=g.measureText(s0).width+24;
    rr(VW/2-w/2,by,w,24,12);F(drag&&!drag.valid&&!drag.paint?'rgba(200,60,50,.92)':'rgba(63,138,58,.92)');txt(s0,VW/2,by+12.5,11,'#fff');by+=28;}
  drawToasts(ob?by+30:by+4);drawSplash();
  if(joy.on&&!EDIT){g.setTransform(DPR,0,0,DPR,0,0);circ(joy.bx,joy.by,40);F('rgba(255,247,230,.3)');S(3,'rgba(74,50,38,.45)');const dx2=joy.x-joy.bx,dy2=joy.y-joy.by,d=Math.hypot(dx2,dy2),k=d>40?40/d:1;circ(joy.bx+dx2*k,joy.by+dy2*k,18);F('rgba(255,247,230,.85)');S(3);
    g.save();g.translate(joy.bx+dx2*k,joy.by+dy2*k);[[-6,-4],[0,-8],[6,-4]].forEach(([a,b])=>{circ(a,b,2.6);F('#c9a56c');});circ(0,4,4.6);F('#c9a56c');g.restore();}}

/* ====================== SAHNE ====================== */
let CAMT=null,blackFade=0;
function updateCam(dt){
  if(CAMT){camX+=(CAMT.x-camX)*Math.min(1,dt*2.4);camY+=(CAMT.y-camY)*Math.min(1,dt*2.4);}
  else if(camLock){const tx=G.p.x,ty=G.p.y-30;const k=G.auto?12:6;camX+=(tx-camX)*Math.min(1,dt*k);camY+=(ty-camY)*Math.min(1,dt*k);}
  const hw=innerWidth/2/WS(),hh=innerHeight/2/WS();camX=WW<hw*2?WW/2:clamp(camX,hw,WW-hw);camY=WH<hh*2?WH/2:clamp(camY,hh-40,WH-hh+20);}
function drawWorld(dt){
  if(!BG)buildBG();updateCam(dt);const ws=WS();
  g=cx;g.setTransform(1,0,0,1,0,0);g.fillStyle='#e6c48c';g.fillRect(0,0,cv.width,cv.height);
  const sx=(Math.random()-.5)*shake,sy=(Math.random()-.5)*shake;
  const ox=innerWidth/2-(camX+sx)*ws,oy=innerHeight/2-(camY+sy)*ws;
  g.imageSmoothingEnabled=true;g.drawImage(BG,ox*DPR,oy*DPR,WW*ws*DPR,(WH+40)*ws*DPR);
  g.setTransform(ws*DPR,0,0,ws*DPR,ox*DPR,oy*DPR);
  const night=G.phase!=='day',S0=SHOP(),Hh=HOUSE();
  const vx0=camX-innerWidth/2/ws-80,vx1=camX+innerWidth/2/ws+80,vy0=camY-innerHeight/2/ws-80,vy1=camY+innerHeight/2/ws+160;
  const vis=(x,y)=>x>vx0&&x<vx1&&y>vy0&&y<vy1;
  const LAN=[];for(let x=S0.x0+100;x<S0.x1-50;x+=230)LAN.push([x,S0.y0-108]);
  LAN.forEach(([x,y],i)=>{if(!vis(x,y))return;g.beginPath();g.moveTo(x,y-32);g.lineTo(x,y-10);S(1.5);const gl=g.createRadialGradient(x,y,2,x,y,night?60:34);gl.addColorStop(0,`rgba(255,200,90,${(night?.5:.35)+Math.sin(T*3+i)*.08})`);gl.addColorStop(1,'rgba(255,200,90,0)');g.fillStyle=gl;g.fillRect(x-60,y-60,120,120);rr(x-7,y-10,14,18,5);F('#ffcf5a');S(2);rr(x-8,y-12,16,4,2);F('#8a5a32');S(1.6);});
  if(EDIT){g.save();g.globalAlpha=.22;
    if(PAINT!==null){for(let c=Math.floor(vx0/TILE);c<vx1/TILE;c++)for(let r=Math.floor(vy0/TILE);r<vy1/TILE;r++){if(!cellZone(c,r))continue;g.strokeStyle='#4a3226';g.lineWidth=1.2;g.strokeRect(c*TILE,r*TILE,TILE,TILE);}}
    else{[[S0.x0,S0.y0,S0.x1,S0.y1],[Hh.x0,Hh.y0,Hh.x1,Hh.y1]].forEach(([a,b,c,d])=>{for(let x=a;x<c;x+=20){g.beginPath();g.moveTo(x,b);g.lineTo(x,d);S(1,'#8a6a40');}for(let y=b;y<d;y+=20){g.beginPath();g.moveTo(a,y);g.lineTo(c,y);S(1,'#8a6a40');}});}
    g.restore();}
  for(const o of G.objs)if(isFlat(o)&&vis(o.x,o.y))drawDeco(o);
  if(G.near&&!EDIT)drawHighlight(G.near);
  const D=[];
  for(const o of G.objs)if(!isFlat(o)&&vis(o.x,o.y))D.push({y:o.y,f:()=>drawObj(o)});
  for(const w of G.workers)if(vis(w.x,w.y))D.push({y:w.y,f:()=>drawWorker(w)});
  if(G.family)for(const f of G.family)D.push({y:f.y,f:()=>drawFam(f)});
  for(const c of G.cust)if(vis(c.x,c.y))D.push({y:c.y,f:()=>drawCust(c)});
  if(G.thief)D.push({y:G.thief.y,f:()=>drawThief(G.thief)});
  if(G.vips)for(const q of G.vips)D.push({y:q.y,f:()=>drawVIP(q)});
  D.push({y:G.p.y,f:drawPlayer});
  if(G.camels&&vis(G.camels.x,G.camels.y))D.push({y:G.camels.y+40,f:()=>drawCaravan(G.camels)});
  if(G.toptan&&vis(G.toptan.x,G.toptan.y))D.push({y:G.toptan.y+40,f:()=>drawCaravan(G.toptan)});
  if(G.ended)D.push({y:SY1+70,f:drawSapling});
  if(G.manE&&vis(G.manE.x,G.manE.y))D.push({y:G.manE.y,f:()=>drawMan(G.manE)});
  if(G.wedRun)D.push({y:G.wedRun.C.y-12,f:drawWedArch});
  D.sort((a,b)=>a.y-b.y).forEach(d=>d.f());
  if(EDIT&&PAINT===null){for(const o of G.objs){if(!vis(o.x,o.y))continue;const f=fpOf(o);g.save();if(o===sel||(drag&&drag.o===o)){const ok=!drag||drag.valid;rr(f[0]-3,f[1]-3,f[2]-f[0]+6,f[3]-f[1]+6,6);F(ok?'rgba(120,220,100,.3)':'rgba(240,80,60,.35)');S(2.5,ok?'#3f8a3a':'#c9302a');}
      else{g.setLineDash([4,4]);rr(f[0],f[1],f[2]-f[0],f[3]-f[1],5);S(1.4,'rgba(74,50,38,.45)');}g.restore();}}
  for(const q of G.parts)drawPart(q);
  drawBunting();sporeLayer(vx0,vy0,vx1,vy1);
  if(night){g.save();g.fillStyle=EDIT?'rgba(30,26,70,.28)':'rgba(30,26,70,.5)';g.fillRect(vx0-200,vy0-200,vx1-vx0+400,vy1-vy0+400);
    g.globalCompositeOperation='lighter';const lights=LAN.map(([x,y])=>[x,y,90]);lights.push([Hh.x1-35,Hh.y0+2,90],[G.p.x,G.p.y-20,80]);
    const nwin=G.houseLv+1;for(let i=0;i<nwin;i++)lights.push([Hh.x0-14+(Hh.x1-Hh.x0+28)*(i+1)/(nwin+1),Hh.y0-58,50]);
    lights.push([S0.ex-35,S0.y1-32,50],[S0.ex+35,S0.y1-32,50]);
    for(const o of G.objs){if(o.k==='deco'&&DECO[o.d].light)lights.push([o.x+(o.d==='fener'?12:0),o.y-(o.d==='fener'?40:20),110]);if(o.k==='kiosk')lights.push([o.x,o.y-60,70]);}
    for(const w of G.workers)if(w.role==='bekci')lights.push([w.x,w.y-30,70]);
    for(const [x,y,r] of lights){if(!vis(x,y))continue;const gl=g.createRadialGradient(x,y,4,x,y,r);gl.addColorStop(0,'rgba(255,190,90,.32)');gl.addColorStop(1,'rgba(255,190,90,0)');g.fillStyle=gl;g.fillRect(x-r,y-r,r*2,r*2);}
    g.restore();
    for(let i=0;i<30;i++){const sx2=(i*97)%WW,sy2=6+(i*53)%40;g.globalAlpha=.5+Math.sin(T*2+i)*.4;circ(sx2,sy2,1.2);F('#fff6d8');}g.globalAlpha=1;}
  for(const c of G.cust)if(c.bub&&c.top)bubble(c.x,c.top-(c.st==='rack'?28:0),c.bub.txt);
  for(const w of G.workers)if(w.bub)bubble(w.x,w.top||w.y-60,w.bub.txt);
  if(G.manE&&G.manE.bub)bubble(G.manE.x,G.manE.top||G.manE.y-70,G.manE.bub.txt);
  if(G.family)for(const f of G.family)if(f.bub)bubble(f.x,f.y-74*(f.k||1),f.bub.txt);
  if(G.vips)for(const q of G.vips)if(q.bub)bubble(q.x,q.top||q.y-70,q.bub.txt);
  if(G.thief&&G.thief.bub)bubble(G.thief.x,G.thief.top||G.thief.y-50,G.thief.bub.txt);
  if(G.p.bub)bubble(G.p.x,Math.min(G.p.top||G.p.y-50,G.p.stackTop||1e9),G.p.bub.txt);
  const ob=objective();if(ob&&ob[1]){const o=ob[1];const f=fpOf(o);let ax=o.x;if(o.k==='st'&&ob[0].includes('SAĞ'))ax=o.x+ST[o.type].tray;arrowAt(ax,f[1]-56);}
  if(G.phase==='day'&&!G.opened){const dx=clamp(S0.ex,vx0+120,vx1-120),dy=clamp(S0.y1-6,vy0+160,vy1-240);arrowAt(dx,dy,'#ffb020');}
  if(G.thief){const t=G.thief;if(!vis(t.x,t.y)){const ax=clamp(t.x,vx0+120,vx1-120),ay=clamp(t.y,vy0+140,vy1-220);arrowAt(ax,ay,'#ff3a2a');}}
  drawHUD();
}
/* ====================== GÜN DOĞUMU ====================== */
function drawSleep(dt){ST2+=dt;g=cx;g.setTransform(1,0,0,1,0,0);
  const k=clamp((ST2-1.2)/1.8,0,1);
  const top=mix('#141032','#7ab8e8',k),mid=mix('#3a2458','#ffc89a',k),bot=mix('#5a3a4a','#ffe0a0',k);
  const gr=g.createLinearGradient(0,0,0,cv.height);gr.addColorStop(0,top);gr.addColorStop(.6,mid);gr.addColorStop(1,bot);g.fillStyle=gr;g.fillRect(0,0,cv.width,cv.height);
  g.setTransform(ISC*DPR,0,0,ISC*DPR,IOX*DPR,IOY*DPR);
  g.globalAlpha=1-k;for(const s of STARS){circ(s[0],s[1],s[2]);F('#fff6d8');}g.globalAlpha=1;
  const m=ease(clamp(ST2/2.2,0,1));
  const mg=g.createRadialGradient(110,140+m*400,10,110,140+m*400,70);mg.addColorStop(0,'rgba(240,235,255,.35)');mg.addColorStop(1,'rgba(240,235,255,0)');g.fillStyle=mg;g.fillRect(30,60+m*400,160,160);
  circ(110,140+m*400,24);F('#f4f0ff');circ(103,134+m*400,4);F('#e0dcf0');
  circ(250,110+m*430,15);F('#e0484a');circ(246,106+m*430,3);F('#b83a3c');
  const s=ease(clamp((ST2-1.4)/1.8,0,1));const sy=600-s*150;const sg=g.createRadialGradient(180,sy,10,180,sy,120);sg.addColorStop(0,'rgba(255,230,150,.7)');sg.addColorStop(1,'rgba(255,230,150,0)');g.fillStyle=sg;g.fillRect(40,sy-130,280,260);circ(180,sy,36);F('#ffd34c');S(3,'#e0a020');
  g.beginPath();g.moveTo(-240,520);for(let x=-240;x<=600;x+=20)g.lineTo(x,505+Math.sin(x*.015+1)*16);g.lineTo(600,900);g.lineTo(-240,900);g.closePath();F(mix('#3a2440','#d8955a',k));
  [[60,500,1],[300,496,1.1],[-60,506,.9],[420,502,1]].forEach(([x,y,sc])=>{g.save();g.translate(x,y);g.scale(sc,sc);g.beginPath();g.moveTo(-22,8);g.quadraticCurveTo(-20,-18,0,-26);g.quadraticCurveTo(20,-18,22,8);g.closePath();F(mix('#2a1830','#b0603a',k));g.restore();});
  g.beginPath();g.moveTo(-240,560);for(let x=-240;x<=600;x+=20)g.lineTo(x,552+Math.sin(x*.02+2)*8);g.lineTo(600,900);g.lineTo(-240,900);g.closePath();F(mix('#4a2c48','#e8b070',k));
  if(ST2<1.6){g.globalAlpha=1-clamp(ST2/1.6,0,1);txt('Zzz...',180,330-ST2*20,26,'#efe6ff',{f:"'Lilita One'",w:400,o:'#2a1a3a',ow:6});g.globalAlpha=1;}
  if(ST2>1.9){const b=clamp((ST2-1.9)/.4,0,1);const sc=easeBack(b);g.save();g.translate(180,220);g.scale(sc,sc);
    txt((G.day+1)+'. Gün',0,0,56,'#fff2c0',{f:"'Lilita One'",w:400,o:'#4a2a1a',ow:10});g.restore();
    g.globalAlpha=b;txt(dateStr(G.day+1),180,270,15,'#fff7e6',{o:'#4a2a1a',ow:4,w:700});txt("Sedef Ay ile Kanlı Ay battı, Agreguk uyanıyor.",180,296,12,'#fff7e6',{o:'#4a2a1a',ow:3,w:600});
    if(!G.dream){const kk=clamp(G.nud/DREAM,0,1);rr(70,330,220,12,6);F('rgba(42,26,38,.6)');S(2,'#4a2a1a');if(kk>0){rr(71.5,331.5,Math.max(9,217*kk),9,4.5);F('#ff8aa8');}txt('Yemin: %'+(kk*100).toFixed(kk<.1?2:1),180,356,11,'#fff7e6',{o:'#4a2a1a',ow:3,w:700});}
    if(G.stolenLog){const L=G.stolenLog;txt(L.caught?'🛡 Gece bekçiler bir hırsız yakaladı!':'🕵 Gece hırsız girmiş!',180,392,13,L.caught?'#c8ffb0':'#ffb0a0',{o:'#4a2a1a',ow:4,w:700});}
    g.globalAlpha=1;}
  if(ST2>2.0&&!G._dawnS){G._dawnS=true;sfx('unlock',.5);}
  if(ST2>4.4){G._dawnS=false;startDay();fade=1;}}

/* ====================== BAŞLANGIÇ ====================== */
function startGame(){MODE='game';paused=false;setMusic('main');startMusic();
  if(G.story===0){wakeUp();}
  else{fade=1;sfx('register');if(G.phase==='night')toast('Tekrar hoş geldin!','Gece devam ediyor. "Uyu" ile yeni gün başlar.');}
  updateBar();}
function wakeUp(){const p=G.p;p.x=BED.x+10;p.y=BED.y+44;p.dir=-1;camLock=true;camX=p.x;camY=p.y-30;paused=true;bar.style.display='none';
  say(p,'Zzz... anne...',3);for(let i=0;i<3;i++)fx('zzz',p.x+10+i*6,p.y-60,{vy:-14,vx:8,t:1.2+i*.5});
  setTimeout(()=>{if(G.story!==0||MODE!=='game')return;shake=4;sfx('boing',.6);say(p,'!!',1.2);
    setTimeout(()=>{if(G.story!==0||MODE!=='game')return;showDialog(["Hah...! Yine o rüya. Annemin ağlayışı hâlâ kulağımda...","Ben İdiz. Eskiden Dermançöl ordusundaydım, lağımcı Yavşuklardan... Şey, erkenden emekli oldum diyelim. Lütfen kimseye söylemeyin."],()=>{
      G.p.bub=null;const S=SHOP();camLock=false;CAMT={x:(S.x0+S.x1)/2,y:S.y0+220};paused=true;
      setTimeout(()=>showDialog(["Şuna bakın: İDİZ'İN TEZGÂHI! Küçücük ama benim. Agreguk'ta kimse geçmişini sormaz, yalnızca malını sorar.","Kervancıbaşı ailemi Dermançöl'den kaçırmak için tam 10 milyon nüd istiyor. Uçuk mu? Çok uçuk! Ama yemin yemindir."],()=>{
        CAMT=null;camLock=true;
        showDialog(["Önce iş! Kervan her sabah gelir. Bu gece sipariş defterine demir külçe yazalım. Satamayacağımız malı almayalım, kese dardır!"],()=>{G.story=1;save();updateBar();});}),1300);});},900);},2200);}

/* ====================== DÖNGÜ ====================== */
G=null;newRun();
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>{BG=null;introLetters=null;for(const k in THUMB)delete THUMB[k];});
let last=performance.now();
function frame(now){const raw=(now-last)/1000,dt=Math.min(.05,raw);last=now;T+=dt;
  if(MODE==='game'){perfWatch(raw);if(!paused){update(dt);if(SPEED>1&&!paused&&MODE==='game')update(dt);}else{for(const q of G.parts){q.t-=dt;q.x+=q.vx*dt;q.y+=q.vy*dt;}G.parts=G.parts.filter(q=>q.t>0);shake=Math.max(0,shake-dt*10);}
    drawWorld(dt);
    if(fade>0){fade=Math.max(0,fade-dt*2);g.setTransform(1,0,0,1,0,0);g.fillStyle=`rgba(255,240,200,${fade})`;g.fillRect(0,0,cv.width,cv.height);}
    if(blackFade>0){blackFade=Math.max(0,blackFade-dt*.8);g.setTransform(1,0,0,1,0,0);g.fillStyle=`rgba(8,6,20,${Math.min(1,blackFade)})`;g.fillRect(0,0,cv.width,cv.height);}}
  else if(MODE==='sleep'){drawSleep(dt);}
  else if(MODE==='cut'){drawCut(dt);}
  else{introScene(dt);if(shake>0)shake=Math.max(0,shake-dt*12);}
  requestAnimationFrame(frame);}
requestAnimationFrame(frame);
addEventListener('visibilitychange',()=>{if(document.hidden&&MODE==='game'&&G.phase==='night'&&G.story>0)save();});
window.__Y={changeOrder,buyDream,buyUpg,buyShop,buyHouse,buyQual,buyRackUpg,buySkill,buyStation,buyStUpg,buySupUpg,buyRack,buyKasa,hire,buySec,buyKiosk,buyKom,buyYardTiles,
  get G(){return G},get MODE(){return MODE},update,startGame,startCut,endCut,startFamCut,buyLadder,buyDeco,buyTellal,spawn,spawnThief,endDay,toNight,goSleep,startDay,setEdit,openCat,renderCat,validPos,findPath,autoBed,
  set cam(v){camX=v[0];camY=v[1];},get cam(){return[camX,camY,SC]},get EDIT(){return EDIT},set sel(o){sel=o;},set PAINT(v){PAINT=v;},set ZOOM(v){setZoom(v);},paintAt,fixObjs,newRun,save,loadSlot,slotInfo,openMenu,closeMenu,
  get paused(){return paused},set paused(v){paused=v;},hireWorker,price,attraction,catchChance};
