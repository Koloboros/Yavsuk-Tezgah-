let BGS=1;
function cactus(x,y,s){g.save();g.translate(x,y);g.scale(s,s);shadow(0,0,10,3);rr(-5,-30,10,30,5);F('#6aa860');S(2);rr(-14,-20,7,12,3.5);F('#6aa860');S(2);rr(7,-24,7,14,3.5);F('#6aa860');S(2);circ(0,-30,2.5);F('#f08aa8');g.restore();}
function rock(x,y,r){el(x,y,r,r*.6);F('#c9a56c');S(1.8);el(x-r*.3,y-r*.2,r*.35,r*.18);F('#dcbd88');}
function studs(x0,x1,y,step,col){for(let x=x0;x<x1;x+=step){circ(x,y,2.3);F(col||'#f0b43c');}}
function buildBG(){
  BGS=Math.min(SC*DPR,1.5);
  const c=document.createElement('canvas');c.width=Math.ceil(WW*BGS);c.height=Math.ceil((WH+40)*BGS);
  const prev=g;g=c.getContext('2d');g.setTransform(BGS,0,0,BGS,0,0);
  const SH=SHOP(),Hh=HOUSE();
  g.fillStyle='#e6c48c';g.fillRect(0,0,WW,WH+40);
  let seed=7;const R=()=>{seed=(seed*16807)%2147483647;return seed/2147483647;};
  for(let i=0;i<1100;i++){const x=R()*WW,y=R()*WH;el(x,y,1+R()*2,.8+R()*1.2);F(R()<.5?'#d9b47a':'#f0d4a0');}
  // uzak pazar: kum tepeleri ve komşu çadırlar
  g.beginPath();g.moveTo(0,70);for(let x=0;x<=WW;x+=20)g.lineTo(x,40+Math.sin(x*.012)*16+Math.sin(x*.04)*5);g.lineTo(WW,150);g.lineTo(0,150);g.closePath();F('#e0b97c');
  for(let i=0;i<17;i++){const x=40+i*104+R()*30,y=118+R()*14,s=.8+R()*.5;g.save();g.translate(x,y);g.scale(s,s);
    g.beginPath();g.moveTo(-26,10);g.quadraticCurveTo(-24,-20,0,-32);g.quadraticCurveTo(24,-20,26,10);g.closePath();F(['#d79a6a','#c98a8a','#b9a27a','#c48a5a'][i%4]);S(2,'rgba(74,50,38,.5)');
    rr(-5,-4,10,14,5);F('rgba(74,50,38,.35)');g.beginPath();g.moveTo(0,-32);g.lineTo(0,-44);S(1.5,'rgba(74,50,38,.5)');g.beginPath();g.moveTo(0,-44);g.lineTo(10,-40);g.lineTo(0,-37);F(['#c9463d','#3f8a3a','#f0b43c'][i%3]);g.restore();}
  // çarşı yolu (alt)
  rr(-10,WH-46,WW+20,90,0);F('#d2a66a');g.beginPath();g.moveTo(0,WH-46);g.lineTo(WW,WH-46);S(2.5,'#b88a52');
  for(let i=0;i<70;i++){el(R()*WW,WH-34+R()*70,8+R()*6,4+R()*2);F(R()<.5?'#c89a5e':'#ddb57a');S(1,'rgba(150,100,55,.4)');}
  g.save();g.translate(110,WH-58);rr(-3,-30,6,32,2);F('#7a4a24');S(1.6);rr(-58,-48,116,22,6);F('#a86a38');S(2);txt('Agreguk Çarşısı →',0,-37,11,'#fff2c8',{w:700});g.restore();
  // yollar: dükkân kapısı → çarşı, dükkân → ev
  const path=(x0,y0,x1,y1,w)=>{g.lineCap='round';g.beginPath();g.moveTo(x0,y0);g.lineTo(x1,y1);g.lineWidth=w+5;g.strokeStyle='#c99a5c';g.stroke();g.lineWidth=w;g.strokeStyle='#e8cc98';g.stroke();g.lineCap='butt';};
  const py=SH.y1+64;
  // arka çöl: tepeler, kaktüsler
  for(let i=0;i<60;i++){const x=R()*WW,y=220+R()*1300;if(x>SX0-40&&x<SX0+1000&&y>SY1-1700)continue;if(x<480&&y>FIELD[1]-80)continue;el(x,y,14+R()*30,5+R()*8);F('rgba(224,185,124,.6)');}
  [[1560,420],[1640,900],[1500,1300],[300,420],[160,640],[900,330],[1250,250]].forEach(([x,y],i)=>cactus(x,y,.8+(i%3)*.12));
  path(SH.ex,SH.y1+20,SH.ex,WH-40,56);path(SH.ex,py,Hh.dx,py,40);path(Hh.dx,Hh.y1+20,Hh.dx,py,40);
  for(let y=SH.y1+40;y<WH-50;y+=22){el(SH.ex+(y%44?-9:9),y,12,5);F('#d8b47e');S(1.2,'#b88a52');}
  for(let x=Math.min(SH.ex,Hh.dx)+30;x<Math.max(SH.ex,Hh.dx)-10;x+=26){el(x,py+(x%52?-5:5),9,4);F('#d8b47e');S(1.1,'#b88a52');}
  // genişleme arsası (arkaya ve sağa)
  if(G.shopLv<SHOP_LV.length-1){const N=shopRect(G.shopLv+1);g.save();g.setLineDash([7,6]);rr(N.x0-18,N.y0-160,N.x1-N.x0+36,SH.y0-N.y0+150,12);S(2,'rgba(120,80,40,.55)');g.restore();
    [[N.x0-10,N.y0-150],[N.x1+10,N.y0-150],[N.x1+10,SH.y1]].forEach(([x,y])=>{rr(x-2.5,y-14,5,16,2);F('#9a6236');S(1.4);g.beginPath();g.moveTo(x+2,y-14);g.lineTo(x+12,y-11);g.lineTo(x+2,y-8);F('#c9463d');});
    const a=arsaSign();g.save();g.translate(a.x,a.y);rr(-3,-6,6,30,2);F('#7a4a24');S(1.6);rr(-50,-30,100,30,6);F('#f6e3bd');S(2);txt('Genişleme arsası',0,-20,9.5,'#6a4426');txt('🏗 '+fmt(SHOP_COST[G.shopLv])+' nüd',0,-8,9.5,'#c9463d');g.restore();}
  // dükkân zemini
  rr(SH.x0,SH.y0-14,SH.x1-SH.x0,SH.y1-SH.y0+14,6);F('#e8c792');
  for(let y=SH.y0;y<SH.y1;y+=26){g.beginPath();g.moveTo(SH.x0,y);g.lineTo(SH.x1,y);S(1,'rgba(160,110,60,.16)');}
  for(let i=0;i<(SH.x1-SH.x0)*(SH.y1-SH.y0)/9000;i++){const x=SH.x0+R()*(SH.x1-SH.x0-30),y=SH.y0+Math.floor(R()*(SH.y1-SH.y0)/26)*26;g.beginPath();g.moveTo(x,y);g.lineTo(x,y+26);S(1,'rgba(160,110,60,.14)');}
  // ev zemini
  rr(Hh.x0,Hh.y0-14,Hh.x1-Hh.x0,Hh.y1-Hh.y0+14,6);F(['#d8b48a','#c8a078','#d0a878','#e6dccb'][G.houseLv]);
  for(let y=Hh.y0;y<Hh.y1;y+=18){g.beginPath();g.moveTo(Hh.x0,y);g.lineTo(Hh.x1,y);S(1,'rgba(120,80,40,.14)');}
  // döşemeler
  for(const k in G.tiles){const [cc,r]=k.split(',').map(Number);if(cellZone(cc,r))drawTile(G.tiles[k],cc*TILE,r*TILE);}
  g.save();rr(SH.x0,SH.y0,SH.x1-SH.x0,24,0);g.clip();g.fillStyle='rgba(0,0,0,.1)';g.fillRect(SH.x0,SH.y0,SH.x1-SH.x0,24);g.restore();
  g.save();g.translate(0,SH.y0-206);
  // DÜKKÂN: arka duvar
  const bw0=SH.x0-18,bw1=SH.x1+18;
  rr(bw0,66,bw1-bw0,206-60,12);F('#efdcb4');S(3);
  for(let x=bw0+6;x<bw1-12;x+=28){g.fillStyle='#cc5a44';g.fillRect(x,74,14,206-74);}
  g.fillStyle='rgba(0,0,0,.08)';g.fillRect(bw0+4,206-30,bw1-bw0-8,30);rr(bw0,66,bw1-bw0,206-60,12);S(3);
  g.beginPath();g.moveTo(bw0-4,64);for(let x=bw0-4;x<=bw1+4-24;x+=24)g.quadraticCurveTo(x+12,92,x+24,64);g.lineTo(bw1+4,64);g.lineTo(bw1+4,56);g.lineTo(bw0-4,56);g.closePath();F('#b7473c');S(2.5);
  for(let x=bw0+8;x<bw1;x+=24){g.beginPath();g.moveTo(x,80);g.lineTo(x,90);S(2,'#f0b43c');circ(x,92,2.8);F('#f0b43c');S(1.3);}
  rr(bw0-8,50,bw1-bw0+16,12,6);F('#8a2f2a');S(2.5);
  [bw0+8,bw1-8].forEach(x=>{rr(x-7,52,14,206-46,5);F('#9a6236');S(2.2);});
  // tabela
  g.save();g.translate((SH.x0+SH.x1)/2,128);[-1,1].forEach(s=>{g.beginPath();g.moveTo(s*60,-52);g.lineTo(s*52,-16);S(2,'#6a4a2a');});
  rr(-96,-22,192,42,10);F('#a86a38');S(3);rr(-90,-17,180,32,7);F('#c48a52');S(1.5,'#7a4a24');
  txt("İDİZ'İN TEZGÂHI",0,0,22,'#ffd25c',{f:"'Lilita One'",w:400,o:OL,ow:5});g.restore();
  g.restore();
  // yan duvarlar
  [SH.x0-18,SH.x1].forEach(x=>{rr(x,SH.y0-56,18,SH.y1-SH.y0+82,6);F('#cc5a44');S(2.5);for(let y=SH.y0-26;y<SH.y1;y+=36){circ(x+9,y,2.4);F('#f0b43c');}});
  // ön kenar ve giriş
  rr(SH.x0-18,SH.y1,SH.ex-30-(SH.x0-18),24,8);F('#b7473c');S(2.5);rr(SH.ex+30,SH.y1,SH.x1+18-(SH.ex+30),24,8);F('#b7473c');S(2.5);
  studs(SH.x0-10,SH.ex-38,SH.y1+12,18);studs(SH.ex+40,SH.x1+12,SH.y1+12,18);
  rr(SH.ex-42,SH.y1-30,14,58,5);F('#9a6236');S(2.2);rr(SH.ex+28,SH.y1-30,14,58,5);F('#9a6236');S(2.2);
  circ(SH.ex-35,SH.y1-32,5);F('#f0b43c');S(1.6);circ(SH.ex+35,SH.y1-32,5);F('#f0b43c');S(1.6);
  el(SH.ex,SH.y1+14,26,7);F('#b7473c');S(1.8);el(SH.ex,SH.y1+14,18,4);F('#e9d2a6');
  // EV
  const hx0=Hh.x0-14,hx1=Hh.x1+14,hl=G.houseLv,wallC=['#efdcb4','#cc5a44','#d8b07a','#f2ead8'][hl],trim=['#7fa0c8','#f0b43c','#a8784a','#4f86c4'][hl];
  g.save();g.translate(0,Hh.y0-250);
  // çatı
  const cxh=(hx0+hx1)/2;
  if(hl===0){g.beginPath();g.moveTo(hx0-6,112);g.lineTo(cxh,30);g.lineTo(hx1+6,112);g.closePath();F('#efdcb4');S(3);for(let i=1;i<6;i++){g.beginPath();g.moveTo(cxh,30);g.lineTo(hx0-6+(hx1-hx0+12)*i/6,112);S(2,'#7fa0c8');}}
  else if(hl===1){g.beginPath();g.moveTo(hx0-8,116);g.quadraticCurveTo(hx0,30,cxh,26);g.quadraticCurveTo(hx1,30,hx1+8,116);g.closePath();F('#b7473c');S(3);for(let i=0;i<5;i++){circ(hx0+30+i*(hx1-hx0-60)/4,80,5);F('#f0b43c');S(1.4);}circ(cxh,26,6);F('#f0b43c');S(2);}
  else if(hl===2){rr(hx0-10,84,hx1-hx0+20,30,6);F('#b8905a');S(3);for(let x=hx0;x<hx1;x+=34){circ(x+6,104,4);F('#7a4a24');S(1.4);}rr(hx0-4,70,hx1-hx0+8,18,5);F('#c8a070');S(2.5);}
  else{g.beginPath();g.moveTo(hx0+20,112);g.quadraticCurveTo(hx0+30,24,cxh,18);g.quadraticCurveTo(hx1-30,24,hx1-20,112);g.closePath();F('#4f86c4');S(3);
    for(let i=0;i<4;i++){g.beginPath();g.moveTo(cxh,22);g.quadraticCurveTo(hx0+60+i*(hx1-hx0-120)/3,50,hx0+40+i*(hx1-hx0-80)/3,110);S(1.6,'#2a5a8a');}rr(cxh-3,0,6,22,2);F('#f0b43c');S(1.6);circ(cxh,-2,6);F('#f0b43c');S(1.6);}
  rr(hx0,104,hx1-hx0,250-98,10);F(wallC);S(3);
  if(hl===0){for(let x=hx0+10;x<hx1-10;x+=26){g.fillStyle='#7fa0c8';g.fillRect(x,108,12,250-104);}}
  else if(hl===1){for(let x=hx0+20;x<hx1-20;x+=40){g.beginPath();g.moveTo(x,140);g.lineTo(x+10,128);g.lineTo(x+20,140);g.lineTo(x+10,152);g.closePath();F('#f0b43c');S(1.4);}}
  else if(hl===2){for(let y=116;y<250;y+=16)for(let x=hx0+((y/16)%2?8:22);x<hx1-20;x+=30){rr(x,y,24,12,2);S(1,'rgba(120,80,40,.35)');}}
  else{g.fillStyle='#4f86c4';g.fillRect(hx0+4,150,hx1-hx0-8,14);for(let x=hx0+10;x<hx1-10;x+=16){g.beginPath();g.moveTo(x,157);g.lineTo(x+6,151);g.lineTo(x+12,157);g.lineTo(x+6,163);g.closePath();F('#f2ead8');}}
  g.fillStyle='rgba(0,0,0,.08)';g.fillRect(hx0+4,250-26,hx1-hx0-8,26);rr(hx0,104,hx1-hx0,250-98,10);S(3);
  // pencereler
  const nw=hl+1;for(let i=0;i<nw;i++){const wx=hx0+(hx1-hx0)*(i+1)/(nw+1);rr(wx-14,176,28,32,12);F('#3a2a4a');S(2.2);rr(wx-11,179,22,26,10);F('#ffd98a');g.beginPath();g.moveTo(wx,179);g.lineTo(wx,205);g.moveTo(wx-11,192);g.lineTo(wx+11,192);S(1.6,OL);}
  g.restore();
  // yan duvar + ön
  [Hh.x0-14,Hh.x1].forEach(x=>{rr(x,Hh.y0-100,14,Hh.y1-Hh.y0+122,5);F(shade(wallC,-.12));S(2.4);});
  rr(Hh.x0-14,Hh.y1,Hh.dx-26-(Hh.x0-14),22,7);F(shade(wallC,-.1));S(2.4);rr(Hh.dx+26,Hh.y1,Hh.x1+14-(Hh.dx+26),22,7);F(shade(wallC,-.1));S(2.4);
  studs(Hh.x0-6,Hh.dx-32,Hh.y1+11,16,trim);studs(Hh.dx+34,Hh.x1+8,Hh.y1+11,16,trim);
  rr(Hh.dx-36,Hh.y1-24,12,48,4);F('#9a6236');S(2);rr(Hh.dx+24,Hh.y1-24,12,48,4);F('#9a6236');S(2);
  g.save();g.translate(Math.round((Hh.dx+26+Hh.x1+14)/2),Hh.y1+11);rr(-30,-8,60,16,5);F('#f6e3bd');S(1.6);txt(HOUSE_LV[hl].ad,0,0,8.5,'#6a4426');g.restore();
  // döşek, sandık, lamba
  const bx=BED.x,by=BED.y;shadow(bx,by+4,40,7);rr(bx-38,by-30,76,36,8);F('#9a6236');S(2.2);rr(bx-34,by-34,68,32,8);F('#f2e6cf');S(2);
  rr(bx-30,by-34,22,16,6);F('#ffffff');S(1.8);rr(bx-6,by-30,38,26,6);F('#c9463d');S(1.8);for(let i=0;i<3;i++){g.beginPath();g.moveTo(bx-2+i*11,by-28);g.lineTo(bx+3+i*11,by-8);S(1.2,'#f0b43c');}
  rr(Hh.x1-40,Hh.y0+8,10,22,3);F('#7a4a24');S(1.6);rr(Hh.x1-44,Hh.y0-2,18,12,5);F('#ffcf5a');S(1.8);
  // avlu süsleri (hiç bina olmayacak yerler)
  cactus(1660,1800,1);cactus(1600,2080,.9);cactus(40,2060,.8);cactus(1660,1500,.85);
  rock(1560,1880,8);rock(260,2050,6);rock(1450,2090,6);rock(1650,1650,5);
  drawField();
  g=prev;BG=c;
}

