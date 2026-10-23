
/* ====================== SÜSLER ====================== */
function wallSeg(x,y,w,h,top,front){rr(x-w/2,y-h,w,h+4,3);F(front);S(2);rr(x-w/2,y-h-8,w,12,3);F(top);S(2);}
const DECO={
  fener:{ad:'Fener Direği',price:40,fame:1,like:{},buff:{thief:.04},fp:[-8,-8,8,4],light:true,where:'in out home',desc:'Geceyi ısıtır, tezgâhı tanıtır.',
    draw(x,y){shadow(x,y+2,10,3);rr(x-2.5,y-56,5,58,2);F('#7a4a24');S(1.8);g.beginPath();g.moveTo(x,y-54);g.lineTo(x+14,y-54);S(2.4,'#7a4a24');g.beginPath();g.moveTo(x+12,y-54);g.lineTo(x+12,y-48);S(1.4);
      rr(x+5,y-48,14,17,5);F('#ffcf5a');S(2);rr(x+4,y-50,16,4,2);F('#8a5a32');S(1.6);rr(x-7,y-3,14,6,3);F('#8a5a32');S(1.8);}},
  saksi:{ad:'Yosun Saksısı',price:50,fame:1,like:{yasruk:3},fp:[-11,-10,11,4],where:'in out home',desc:'Sürtünkaya yosunu. Yaşruklar memleketi hatırlar.',
    draw(x,y){shadow(x,y+2,12,3);g.beginPath();g.moveTo(x-11,y-18);g.lineTo(x+11,y-18);g.lineTo(x+8,y+2);g.lineTo(x-8,y+2);g.closePath();F('#c8693e');S(2);rr(x-13,y-21,26,6,3);F('#de8a5a');S(1.8);
      [[-6,-26,8],[5,-28,9],[0,-35,8],[-9,-33,6],[9,-36,6]].forEach(([a,b,r])=>{circ(x+a,y+b,r);F('#6aa860');S(1.8);});circ(x+2,y-37,2);F('#f08aa8');}},
  yalak:{ad:'At Yalağı',price:120,fame:2,like:{ucmakan:5},fp:[-28,-14,28,4],where:'in out',desc:'Uçmakan atı insandan aziz tutar. Atına su veren dükkânı unutmaz.',
    draw(x,y){shadow(x,y+3,30,5);[-24,24].forEach(s=>{rr(x+s-3,y-40,6,42,2);F('#8a5a32');S(1.8);});rr(x-28,y-42,56,6,3);F('#a86a38');S(1.8);
      rr(x-20,y-14,40,14,4);F('#9a6236');S(2);el(x,y-14,20,4);F('#5aa8d8');S(1.6);}},
  havuz:{ad:'Nem Havuzu',price:140,fame:2,like:{pullukul:5},fp:[-24,-14,24,4],where:'in out home',desc:'Taş kurna, serin buğu. Pullukul ömrü neme bağlıdır.',
    draw(x,y){shadow(x,y+3,26,5);el(x,y-6,24,10);F('#a9a39a');S(2);el(x,y-9,19,7);F('#6ac0e8');S(1.6);el(x-5,y-10,6,2);F('#bfe8fa');
      for(let i=0;i<3;i++){const k=((T*2+i*.7)%2)/2;circ(x-8+i*8,y-14-k*16,2+k*3);F(`rgba(255,255,255,${.5*(1-k)})`);}}},
  tunek:{ad:'Kuzgun Tüneği',price:100,fame:1,like:{gaksoy:5},fp:[-12,-8,12,4],where:'in out',desc:'Gaksoylar konar, duyduklarını taklit eder. Bedava reklam!',
    draw(x,y){shadow(x,y+2,12,3);rr(x-2.5,y-50,5,52,2);F('#7a4a24');S(1.8);rr(x-20,y-52,40,5,2.5);F('#9a6236');S(1.8);rr(x-10,y-3,20,5,2.5);F('#7a4a24');S(1.6);
      g.beginPath();g.moveTo(x+14,y-47);g.lineTo(x+14,y-40);S(1.2);circ(x+14,y-37,3.5);F('#f0b43c');S(1.4);}},
  tasnif:{ad:'Tasnif Dolabı',price:150,fame:2,like:{puhusoy:6},fp:[-22,-14,22,4],where:'in home',desc:'Raf raf, harf harf. Puhusoyların cenneti.',
    draw(x,y){shadow(x,y+3,24,5);rr(x-22,y-62,44,64,4);F('#8a5a32');S(2.2);
      for(let r=0;r<3;r++){rr(x-18,y-58+r*19,36,16,2);F('#5a3a22');const cols=['#c9463d','#3f6aa0','#f0b43c','#3f8a3a','#9a4a8a'];for(let i=0;i<6;i++){rr(x-17+i*6,y-56+r*19+(i%3),5,13-(i%3),1);F(cols[(i+r)%5]);S(.8);}}}},
  mangal:{ad:'Isı Mangalı',price:130,fame:1,like:{zerksoy:5},fp:[-14,-10,14,4],light:true,where:'in out home',desc:'Zerksoy ısıyı görür. Sıcak dükkân, doğru dükkân.',
    draw(x,y){shadow(x,y+2,14,3);[-9,9].forEach(s=>{g.beginPath();g.moveTo(x+s,y);g.lineTo(x+s*.6,y-12);S(2.4,'#8a6a2a');});
      g.beginPath();g.moveTo(x-15,y-22);g.quadraticCurveTo(x,y-6,x+15,y-22);g.closePath();F('#d8a040');S(2);el(x,y-22,15,4);F('#3a2422');S(1.6);
      for(let i=0;i<5;i++){circ(x-9+i*4.5,y-23+(i%2),2.6);F(Math.sin(T*6+i)>0?'#ff8a30':'#ffcf5a');}}},
  minder:{ad:'Kedi Minderi',price:60,fame:1,like:{tirmik:5},fp:[-16,-8,16,4],where:'in home',desc:'Yün minder ve yumak. Tırmıksoylar sessizce mırlar.',
    draw(x,y){shadow(x,y+2,17,4);el(x,y-5,17,8);F('#c9463d');S(2);el(x,y-7,12,5);F('#e06a5a');circ(x+15,y-4,5);F('#7fb0e0');S(1.6);}},
  ilan:{ad:'Maceracı İlan Panosu',price:700,fame:3,like:{insan:3,ucmakan:1},fp:[-22,-10,22,4],where:'in out',desc:'"Aranıyor: Gulbeyaban!" Maceracılar ilana bakarken alışveriş yapar.',
    draw(x,y){shadow(x,y+2,22,4);[-17,17].forEach(s=>{rr(x+s-2.5,y-40,5,42,2);F('#7a4a24');S(1.6);});rr(x-24,y-56,48,32,4);F('#a86a38');S(2);
      rr(x-19,y-52,16,22,1);F('#f6e9c8');S(1.2);circ(x-11,y-45,4);F('#7a8a5a');S(1);rr(x+1,y-51,18,13,1);F('#fff');S(1.2);rr(x+3,y-36,14,9,1);F('#ffe0c0');S(1.2);}},
  kilim:{ad:'Büyük Kilim',price:80,fame:2,like:{},fp:[-46,-30,46,4],flat:true,where:'in home',desc:'Ayak basılır, göz doyar. Herkese iyi gelir.',
    draw(x,y){rr(x-46,y-30,92,34,6);F('#b7473c');S(2);rr(x-41,y-26,82,26,4);F('#e9d2a6');S(1.2,'#8a2f2a');
      for(let i=0;i<4;i++){const cx0=x-30+i*20,cy0=y-13;g.beginPath();g.moveTo(cx0,cy0-9);g.lineTo(cx0+9,cy0);g.lineTo(cx0,cy0+9);g.lineTo(cx0-9,cy0);g.closePath();F(i%2?'#3f6aa0':'#c9463d');S(1.2,'#8a2f2a');}}},
  // mimari
  duvar_y:{ad:'Ahşap Bölme (yatay)',price:30,fame:0,like:{},fp:[-40,-10,40,4],where:'in home',arch:1,desc:'Reyonları ayırır. Müşteriler etrafından dolaşır.',
    draw(x,y){shadow(x,y+3,42,4);wallSeg(x,y,80,40,'#c48a52','#9a6236');for(let i=-30;i<=30;i+=20){g.beginPath();g.moveTo(x+i,y-38);g.lineTo(x+i,y);S(1.2,'#7a4a24');}}},
  duvar_d:{ad:'Ahşap Bölme (dikey)',price:30,fame:0,like:{},fp:[-7,-74,7,4],where:'in home',arch:1,desc:'Uzun dikey bölme. Koridor açmak için ideal.',
    draw(x,y){shadow(x,y+3,10,3);rr(x-7,y-74-40,14,118,3);F('#9a6236');S(2);rr(x-7,y-74-46,14,80,3);F('#c48a52');S(2);for(let i=0;i<4;i++){circ(x,y-100+i*24,1.6);F('#7a4a24');}}},
  tabela:{ad:'Reklam Tabelası',price:1200,fame:4,buff:{kiosk:.05},like:{},fp:[-24,-8,24,4],where:'out',desc:'"İDİZ\'İN TEZGÂHI → Kılıç, zırh, efsun!" Yoldan geçen herkes görür.',
    draw(x,y){shadow(x,y+2,24,4);[-18,18].forEach(s=>{rr(x+s-3,y-46,6,48,2);F('#7a4a24');S(1.8);});rr(x-30,y-64,60,30,5);F('#f0b43c');S(2.2);rr(x-26,y-60,52,22,3);F('#fff2c8');S(1.2);
      txt('İDİZ',x,y-54,9,'#c9463d',{w:700});txt('→ kılıç · zırh',x,y-44,6.5,OL,{w:700});}},
  portre:{ad:'Aile Portresi',price:60,fame:0,like:{},buff:{rest:.03},fp:[-14,-6,14,4],where:'home',desc:'Annesi, babası, kız kardeşi. İdiz her gece bakar.',
    draw(x,y){shadow(x,y+2,14,3);rr(x-2,y-30,4,32,2);F('#7a4a24');S(1.4);rr(x-16,y-52,32,26,3);F('#c48a52');S(2);rr(x-12,y-48,24,18,2);F('#e9d2a6');
      [[-6,'#7cae58',4.5],[2,'#6f9a52',5],[8,'#88b862',3.5]].forEach(([a,c,r])=>{circ(x+a,y-40,r);F(c);S(1);});}},
  sofra:{ad:'Yer Sofrası',price:70,fame:0,like:{},buff:{rest:.03},fp:[-24,-12,24,4],where:'home',desc:'Bir gün ailece oturulacak sofra.',
    draw(x,y){shadow(x,y+3,26,5);el(x,y-6,24,10);F('#a86a38');S(2);el(x,y-9,22,8);F('#c48a52');S(1.4);drawItem('as',x-8,y-10,.7);drawItem('as',x+8,y-8,.7);}}
  ,
  // pahalı ve güçlü süsler
  terazi:{ad:'Altın Terazi',price:3500,fame:2,like:{puhusoy:3},buff:{tip:.1},fp:[-18,-10,18,4],where:'in',desc:'Müşteri hakkını aldığını görür, bahşişi bol bırakır. Bahşiş şansı +%10.',
    draw(x,y){shadow(x,y+2,18,4);rr(x-14,y-6,28,8,3);F('#a86a38');S(1.8);rr(x-2,y-44,4,40,2);F('#f0b43c');S(1.6);g.beginPath();g.moveTo(x-20,y-40);g.lineTo(x+20,y-40);S(2.2,'#c88a1a');
      [-18,18].forEach(s=>{g.beginPath();g.moveTo(x+s,y-40);g.lineTo(x+s-6,y-26);g.moveTo(x+s,y-40);g.lineTo(x+s+6,y-26);S(1,'#c88a1a');el(x+s,y-25,8,3);F('#ffd34c');S(1.6);});circ(x,y-46,3.5);F('#ffd34c');S(1.4);}},
  cesme:{ad:'Bereket Çeşmesi',price:6000,fame:3,like:{pullukul:4},buff:{pat:.25},fp:[-26,-14,26,4],where:'in out',desc:'Su sesi sabır verir. Müşteriler %25 daha uzun bekler.',
    draw(x,y){shadow(x,y+3,28,5);el(x,y-6,26,10);F('#cfc7ba');S(2);el(x,y-9,21,7);F('#6ac0e8');S(1.6);rr(x-5,y-46,10,38,3);F('#e3dccf');S(1.8);el(x,y-46,12,4);F('#cfc7ba');S(1.8);
      for(let i=0;i<4;i++){const k=((T*1.4+i*.25)%1);g.beginPath();g.moveTo(x,y-48);g.quadraticCurveTo(x+(i<2?-1:1)*(8+k*6),y-56,x+(i<2?-1:1)*(10+k*8),y-14);S(1.6,`rgba(120,200,240,${.8-k*.5})`);}}},
  davul:{ad:'Tellal Davulu',price:9000,fame:3,like:{ucmakan:3,insan:2},buff:{qty:.12},fp:[-18,-12,18,4],where:'in out',desc:'Gümbür gümbür! Müşteriler coşar, toplu alım şansı +%12.',
    draw(x,y){shadow(x,y+2,18,4);el(x,y-6,16,6);F('#8a2f2a');S(1.8);rr(x-16,y-30,32,24,4);F('#c9463d');S(2);for(let i=0;i<4;i++){g.beginPath();g.moveTo(x-16+i*10.6,y-30);g.lineTo(x-10+i*10.6,y-6);S(1.2,'#f0b43c');}
      el(x,y-30,16,6);F('#f6e9c8');S(1.8);const b=Math.abs(Math.sin(T*5))*4;g.beginPath();g.moveTo(x+8,y-36-b);g.lineTo(x+20,y-48-b);S(2.4,'#7a4a24');circ(x+20,y-48-b,3);F('#f0b43c');S(1.2);}},
  kose:{ad:'Usta Kahvesi Köşesi',price:5000,fame:0,like:{},buff:{wspd:.2},fp:[-20,-12,20,4],where:'in',desc:'Ustalar arada bir yudum alır. Bütün ustalar %20 hızlı.',
    draw(x,y){shadow(x,y+2,20,4);el(x,y-14,18,6);F('#a86a38');S(1.8);rr(x-2,y-14,4,16,2);F('#7a4a24');S(1.4);drawItem('kahve',x-7,y-20,.7);drawItem('kahve',x+7,y-19,.7);}},
  seki:{ad:'Hamal Sekisi',price:3000,fame:0,like:{yasruk:2},buff:{hspd:.2},fp:[-30,-12,30,4],where:'in',desc:'Hamallar yarım dakika uzanır, sonra iki kat koşar. Hamal hızı +%20.',
    draw(x,y){shadow(x,y+3,30,5);rr(x-30,y-16,60,18,5);F('#a86a38');S(2);rr(x-28,y-22,26,10,5);F('#c9463d');S(1.6);rr(x+2,y-22,26,10,5);F('#4f86c4');S(1.6);}},
  fanus:{ad:'Efsun Fanusu',price:12000,fame:4,like:{zerksoy:6,puhusoy:3},buff:{tip:.05,qty:.05},fp:[-16,-10,16,4],light:true,where:'in',desc:'Üflenmiş camda dönen ışık. Göz alır, kese açtırır.',
    draw(x,y){shadow(x,y+2,16,4);rr(x-12,y-10,24,10,3);F('#7a4a24');S(1.8);const gl=g.createRadialGradient(x,y-26,2,x,y-26,22);gl.addColorStop(0,'rgba(180,140,255,.9)');gl.addColorStop(1,'rgba(120,200,255,.15)');circ(x,y-26,16);g.fillStyle=gl;g.fill();S(2);
      for(let i=0;i<3;i++){const a=T*2+i*2.1;circ(x+Math.cos(a)*8,y-26+Math.sin(a)*6,2);F('#fff');}el(x-5,y-32,4,2.5,-.6);F('rgba(255,255,255,.7)');}},
  heykel:{ad:'İdiz Heykeli',price:25000,fame:8,like:{yasruk:3,insan:2,ucmakan:2},buff:{tip:.05},fp:[-20,-14,20,4],where:'in out',desc:'Diz boyu İdiz, üç kulaç kaide. Pazarın en çok konuşulan heykeli.',
    draw(x,y){shadow(x,y+3,22,5);rr(x-18,y-30,36,32,4);F('#cfc7ba');S(2);rr(x-21,y-34,42,8,3);F('#e3dccf');S(1.8);txt('İDİZ',x,y-14,8,'#8a6a40');
      g.save();g.translate(x,y-34);g.scale(.85,.85);const o={dir:1,walk:0,moving:false,seed:3,look:.3,skin:'#f0c84a'};drawGuy(0,0,o,Object.assign({},YAV,{cloth:'#e0a820',apron:'#ffd34c',skin:'#f0c84a'}));g.restore();}},
  agac:{ad:'Hurma Ağacı',price:120,fame:1,like:{},buff:{kiosk:.08},fp:[-10,-8,10,4],where:'out home',desc:'Gölge her şeydir. Bahçe satışları +%8.',
    draw(x,y){shadow(x,y+3,22,5);g.beginPath();g.moveTo(x-4,y);g.quadraticCurveTo(x-8,y-40,x,y-74);g.lineTo(x+5,y-74);g.quadraticCurveTo(x-2,y-40,x+5,y);g.closePath();F('#9a6236');S(2);
      for(let i=0;i<7;i++){const a=-Math.PI/2+(i-3)*.5+Math.sin(T+i)*.04;g.beginPath();g.moveTo(x+2,y-74);g.quadraticCurveTo(x+2+Math.cos(a)*22,y-74+Math.sin(a)*22-10,x+2+Math.cos(a)*40,y-74+Math.sin(a)*40+8);S(6,'#4f8a44');g.beginPath();g.moveTo(x+2,y-74);g.quadraticCurveTo(x+2+Math.cos(a)*22,y-74+Math.sin(a)*22-10,x+2+Math.cos(a)*40,y-74+Math.sin(a)*40+8);S(3,'#76b462');}
      circ(x-2,y-70,3);F('#8a4a2a');circ(x+6,y-70,3);F('#8a4a2a');}},
  cardak:{ad:'Çardak',price:900,fame:2,like:{yasruk:1},buff:{kiosk:.2},fp:[-40,-10,40,4],where:'out home',desc:'Asmalı gölgelik ve oturak. Bahçe satışları +%20.',
    draw(x,y){shadow(x,y+3,42,6);[-34,34].forEach(s=>{rr(x+s-3,y-62,6,64,2);F('#8a5a32');S(1.8);});rr(x-44,y-70,88,10,4);F('#a86a38');S(2);
      for(let i=0;i<9;i++){circ(x-38+i*9.5,y-70+(i%2)*4,6);F(i%3?'#6aa860':'#86c472');S(1.2);}circ(x-20,y-60,3);F('#8a3a8a');circ(x+16,y-58,3);F('#8a3a8a');rr(x-26,y-14,52,8,3);F('#c48a52');S(1.6);}},
  atheykel:{ad:'Uçmakan At Heykeli',price:15000,fame:6,like:{ucmakan:10},fp:[-30,-12,30,4],where:'out',desc:'Uçmakan atı insandan azizdir. Bu heykeli gören Uçmakan selam vermeden geçmez.',
    draw(x,y){shadow(x,y+3,32,5);rr(x-28,y-14,56,16,3);F('#cfc7ba');S(2);g.save();g.translate(x,y-14);g.fillStyle='#b8905a';
      g.beginPath();g.moveTo(-20,0);g.lineTo(-18,-16);g.quadraticCurveTo(-10,-26,8,-24);g.lineTo(14,-38);g.quadraticCurveTo(22,-40,24,-30);g.lineTo(18,-22);g.lineTo(18,-14);g.lineTo(16,0);g.lineTo(10,0);g.lineTo(10,-12);g.lineTo(-12,-12);g.lineTo(-12,0);g.closePath();F('#c9a56c');S(2);
      g.beginPath();g.moveTo(-18,-16);g.quadraticCurveTo(-28,-18,-26,-6);S(3,'#a8784a');circ(18,-32,1.4);F(OL);g.restore();}},
  gozcu:{ad:'Gözcü Kulesi',price:7000,fame:1,like:{},buff:{thief:.25},fp:[-16,-10,16,4],where:'out',desc:'Geceleri avluyu tepeden görür. Hırsız yakalama şansı +%25.',
    draw(x,y){shadow(x,y+3,18,5);[-12,12].forEach(s=>{g.beginPath();g.moveTo(x+s,y);g.lineTo(x+s*.6,y-80);S(4,'#7a4a24');});for(let i=0;i<3;i++){g.beginPath();g.moveTo(x-11+i*2,y-20-i*22);g.lineTo(x+11-i*2,y-20-i*22);S(2.4,'#9a6236');}
      rr(x-16,y-96,32,18,3);F('#a86a38');S(2);g.beginPath();g.moveTo(x-20,y-96);g.lineTo(x,y-112);g.lineTo(x+20,y-96);g.closePath();F('#b7473c');S(2);circ(x,y-88,3);F(G&&G.phase!=='day'?'#ffd34c':'#5a4a3a');}},
  yorgan:{ad:'Kuştüyü Yorgan',price:2500,fame:0,like:{},buff:{rest:.06},fp:[-14,-8,14,4],where:'home',desc:'Sürtünkaya kuşlarının tüyü. Sabah hızı +%6.',
    draw(x,y){shadow(x,y+2,16,4);rr(x-14,y-14,28,16,6);F('#f6e9c8');S(1.8);for(let i=0;i<3;i++){g.beginPath();g.moveTo(x-10+i*10,y-12);g.lineTo(x-10+i*10,y);S(1,'#d9c49a');}}},
  ocakev:{ad:'Ev Ocağı',price:4000,fame:0,like:{},buff:{rest:.08},fp:[-20,-14,20,4],light:true,where:'home',desc:'Çıtır çıtır yanan ocak. Annem gibi ısıtır. Sabah hızı +%8.',
    draw(x,y){shadow(x,y+3,20,5);rr(x-20,y-40,40,42,6);F('#cfc7ba');S(2);rr(x-12,y-26,24,22,10);F('#3a2422');S(1.8);const f=Math.sin(T*14)*2;g.beginPath();g.moveTo(x-8,y-6);g.quadraticCurveTo(x-3,y-18+f,x,y-22);g.quadraticCurveTo(x+4,y-16-f,x+8,y-6);g.closePath();F('#ff9a30');}}
  ,
  levha:{ad:'Yankı Levhası',price:90000,fame:3,like:{puhusoy:3},buff:{kasa:.35},fp:[-16,-10,16,4],where:'in',desc:'Titreşimi büyüten bakır plaka. Kâtip müşterinin niyetini kapıda duyar: kasa %35 hızlı.',
    draw(x,y){shadow(x,y+3,16,4);rr(x-3,y-30,6,32,2);F('#7a4a24');S(1.6);g.save();g.translate(x,y-44);const k=1+Math.sin(T*9)*.03;g.scale(k,k);rr(-15,-14,30,26,4);F('#c9783a');S(2);
      for(let i=1;i<4;i++){g.beginPath();g.arc(0,-1,i*3.4,0,Math.PI*2);S(1,'rgba(255,220,160,'+(.8-i*.18)+')');}g.restore();}},
  adak:{ad:'Şehilah Adak Taşı',price:120000,fame:3,like:{insan:2,ucmakan:2},buff:{d20:2},fp:[-18,-10,18,4],where:'out',desc:'Cenk ilahının yol kenarı taşı. Adağını bırakan zarını sağlam atar: 7\'nin Günü zarlarına +2.',
    draw(x,y){shadow(x,y+3,20,5);g.beginPath();g.moveTo(x-16,y+2);g.lineTo(x-12,y-26);g.quadraticCurveTo(x,y-36,x+12,y-26);g.lineTo(x+16,y+2);g.closePath();F('#9a9488');S(2);
      g.beginPath();g.moveTo(x-5,y-22);g.lineTo(x+5,y-8);g.moveTo(x+5,y-22);g.lineTo(x-5,y-8);g.moveTo(x,y-26);g.lineTo(x,y-4);S(2.2,'#a8302a');
      [-9,9].forEach(s=>{circ(x+s,y+1,2.6);F('#f0b43c');S(1);});const f=Math.sin(T*12)*1.2;rr(x+12,y-6,4,8,1);F('#f2ead8');S(1);g.beginPath();g.moveTo(x+12.5,y-6);g.quadraticCurveTo(x+14,y-13+f,x+15.5,y-6);F('#ff9a30');}},
  ahir:{ad:'Deve Ahırı',price:150000,fame:2,like:{ucmakan:3},buff:{raw:.12},fp:[-40,-14,40,4],where:'out',desc:'Kervan develeri burada dinlenir, kervancıbaşı da sana ucuz mal bırakır. Hammadde %12 ucuz.',
    draw(x,y){shadow(x,y+3,42,6);[-36,36].forEach(s=>{rr(x+s-3,y-46,6,48,2);F('#7a4a24');S(1.6);});g.beginPath();g.moveTo(x-44,y-44);g.lineTo(x,y-60);g.lineTo(x+44,y-44);g.closePath();F('#c9a56c');S(2);
      rr(x-30,y-14,22,14,3);F('#e8cc68');S(1.6);rr(x-6,y-12,18,12,3);F('#e0c060');S(1.6);g.beginPath();g.moveTo(x-28,y-10);g.lineTo(x-10,y-10);g.moveTo(x-4,y-8);g.lineTo(x+10,y-8);S(1,'#a8883a');
      g.save();g.translate(x+24,y-20);el(0,0,6,9,.3);F('#c9955a');S(1.6);el(4,-8,4,3);F('#c9955a');S(1.4);circ(5,-9,.9);F(OL);g.restore();}},
  orhun:{ad:'Orhun Taşı',price:180000,fame:6,like:{ucmakan:6},buff:{cust:.15},fp:[-16,-10,16,4],where:'out',desc:'Uçmakanların dikili taşı. Gölgesi doğru açıya düşünce pazarın yolu buraya döner: müşteri akışı +%15.',
    draw(x,y){shadow(x,y+3,18,5);rr(x-13,y-78,26,80,5);F('#b8b0a2');S(2.2);rr(x-13,y-78,26,10,5);F('#cfc7ba');S(2);
      for(let i=0;i<6;i++){const yy=y-62+i*10;g.beginPath();g.moveTo(x-7,yy);g.lineTo(x-2,yy+4);g.lineTo(x+3,yy);g.lineTo(x+7,yy+4);S(1.4,'#6a5a4a');}
      g.globalAlpha=.25+Math.sin(T*2)*.15;circ(x,y-40,16);F('#fff2c0');g.globalAlpha=1;}},
  avize:{ad:'Billur Avize',price:350000,fame:10,like:{puhusoy:2,zerksoy:3},buff:{tip:.1,qty:.08},fp:[-18,-10,18,4],light:true,where:'in',desc:'Cam ocağının şaheseri. Soylu müşteri ışığa gelir: bahşiş +%10, toplu alım +%8.',
    draw(x,y){shadow(x,y+3,18,5);rr(x-12,y-6,24,8,3);F('#c99a3a');S(1.6);rr(x-2.5,y-80,5,76,2);F('#d8aa4a');S(1.4);
      g.save();g.translate(x,y-84);el(0,0,22,6);F('#e8c060');S(1.6);for(let i=0;i<7;i++){const a=i/7*Math.PI*2+T*.5,dx=Math.cos(a)*18,dy=Math.sin(a)*4;g.beginPath();g.moveTo(dx,dy);g.lineTo(dx,dy+12);S(1,'#bfe4ff');
        g.beginPath();g.moveTo(dx,dy+10);g.lineTo(dx-3,dy+15);g.lineTo(dx,dy+21);g.lineTo(dx+3,dy+15);g.closePath();F('rgba(200,235,255,.9)');S(1);}
      circ(0,-6,6);F('#fff6c8');S(1.4);g.globalAlpha=.3+Math.sin(T*3)*.1;circ(0,4,26);F('#fff2b0');g.globalAlpha=1;g.restore();}},
  arras:{ad:'Arras Mihrabı',price:600000,fame:8,like:{insan:3,puhusoy:3},buff:{price:.06},fp:[-22,-12,22,4],where:'in',desc:'Denge ilahının küçük mihrabı. Ölçülü olan kazanır: bütün satış fiyatları %6 yüksek.',
    draw(x,y){shadow(x,y+3,24,5);rr(x-22,y-12,44,14,3);F('#e8e2d6');S(2);g.beginPath();g.moveTo(x-18,y-12);g.lineTo(x-18,y-50);g.quadraticCurveTo(x,y-74,x+18,y-50);g.lineTo(x+18,y-12);F('#f6f2ea');S(2);
      g.beginPath();g.moveTo(x-11,y-14);g.lineTo(x-11,y-46);g.quadraticCurveTo(x,y-62,x+11,y-46);g.lineTo(x+11,y-14);F('#4a6a8a');S(1.6);
      const a=Math.sin(T*1.3)*.12;g.save();g.translate(x,y-42);g.rotate(a);g.beginPath();g.moveTo(-9,0);g.lineTo(9,0);S(1.6,'#f0b43c');[-9,9].forEach(s=>{g.beginPath();g.moveTo(s,0);g.lineTo(s-3,7);g.lineTo(s+3,7);g.closePath();F('#f0b43c');S(1);});g.restore();rr(x-1,y-42,2,26,1);F('#f0b43c');}}
};
const DECO_IDS=Object.keys(DECO);
