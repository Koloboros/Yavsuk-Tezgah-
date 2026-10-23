
/* ====================== VERİ: EŞYALAR ====================== */
function glowI(c,r){const gr=g.createRadialGradient(0,0,1,0,0,r||14);gr.addColorStop(0,c);gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(-16,-16,32,32);}
function runeRing(c){g.save();g.rotate(T*1.5);g.setLineDash([2.5,2.5]);circ(0,0,10.5);S(1.4,c);g.restore();}
Object.assign(ITEM,{
  deri(){g.beginPath();g.moveTo(-9,-3);g.quadraticCurveTo(-7,-8,-2,-6);g.quadraticCurveTo(2,-9,6,-6);g.quadraticCurveTo(10,-4,8,1);g.quadraticCurveTo(10,6,4,6);g.quadraticCurveTo(0,8,-4,6);g.quadraticCurveTo(-10,6,-8,1);g.closePath();F('#b0703e');S(1.6);
    g.beginPath();g.moveTo(-5,-1);g.quadraticCurveTo(0,1,5,-1);S(1,'#8a5228');circ(-3,3,1);F('#8a5228');circ(3,3.5,1);F('#8a5228');},
  ot(){[[-5,-1,-.5],[0,-3,0],[5,-1,.5]].forEach(([a,b,r])=>{g.save();g.translate(a*.6,4);g.rotate(r);g.beginPath();g.moveTo(0,0);g.quadraticCurveTo(-4,-8,0,-13);g.quadraticCurveTo(4,-8,0,0);F('#6aa860');S(1.4);g.beginPath();g.moveTo(0,-1);g.lineTo(0,-11);S(.8,'#3f7a3a');g.restore();});
    rr(-4,2,8,4,2);F('#c9a56c');S(1.3);circ(0,-10,1.8);F('#f08aa8');},
  iksir(){rr(-2.5,-11,5,5,1.5);F('#b0703e');S(1.3);rr(-3,-7,6,3,1);F('#dcdfe6');S(1.2);circ(0,2,7);F('#dcf0ff');S(1.6);
    g.save();circ(0,2,6);g.clip();g.fillStyle='#e0484a';g.fillRect(-7,1,14,8);g.restore();circ(-2.5,-.5,1.6);F('rgba(255,255,255,.85)');},
  carik(){g.beginPath();g.moveTo(-10,3);g.quadraticCurveTo(-10,-6,-2,-6);g.lineTo(2,-2);g.quadraticCurveTo(12,-2,11,4);g.closePath();F('#b06a3a');S(1.8);
    g.beginPath();g.moveTo(-7,3.5);g.lineTo(10,3.5);S(2.2,'#6a3a1a');g.beginPath();g.moveTo(-4,-4);g.lineTo(0,-1);S(1,'#f0b43c');},
  dondurma(){g.beginPath();g.moveTo(-5,0);g.lineTo(0,10);g.lineTo(5,0);g.closePath();F('#e0a860');S(1.5);g.beginPath();g.moveTo(-3,2);g.lineTo(2,6);g.moveTo(3,2);g.lineTo(-1,6);S(.8,'#a8723e');
    circ(-2.5,-3,4.4);F('#ffd0e0');S(1.5);circ(2.5,-4,4.4);F('#fff4d8');S(1.5);circ(0,-8,4);F('#9ad0ff');S(1.5);circ(1,-12,1.6);F('#e0484a');},
  kahve(){rr(-6,-3,12,9,3);F('#f2ead8');S(1.6);g.beginPath();g.arc(7,1.5,3,-1.3,1.3);S(1.6);el(0,-3,6,1.8);F('#5a3422');S(1.2);
    g.beginPath();g.moveTo(-2,-6);g.quadraticCurveTo(-4,-9,-2,-12);g.moveTo(2,-6);g.quadraticCurveTo(0,-9,2,-12);S(1,'rgba(150,150,150,.8)');},
  alevli(){glowI('rgba(255,140,40,.6)',15);ITEM.yatagan();const f=Math.sin(T*14)*1.2;g.save();g.rotate(-.35);
    [[2,-3],[7,-4.5],[11,-7]].forEach(([a,b],i)=>{g.beginPath();g.moveTo(a-2.5,b+1);g.quadraticCurveTo(a,b-6-(i%2?f:-f),a+2.5,b+1);g.closePath();F(i%2?'#ffd35c':'#ff7a20');});g.restore();},
  tilsim(){glowI('rgba(90,170,255,.55)',15);ITEM.zirh();runeRing('#5ab0ff');circ(0,1,2.3);F('#9ad8ff');S(1);},
  ruzgar(){glowI('rgba(160,230,255,.6)',15);ITEM.carik();g.beginPath();g.moveTo(-12,-6);g.quadraticCurveTo(-6,-10,2,-8);g.moveTo(-13,-1);g.quadraticCurveTo(-8,-4,-4,-3);S(1.5,'#fff');},
  muhur(){glowI('rgba(190,90,255,.55)',15);ITEM.iksir();circ(4,5,3.2);F('#8a1f6a');S(1.2);circ(4,5,1.3);F('#f0b43c');},
  ebedi(){glowI('rgba(120,220,255,.6)',15);ITEM.dondurma();for(let i=0;i<3;i++){const a=T*3+i*2.1;circ(Math.cos(a)*9,-4+Math.sin(a)*7,1.2);F('#fff');}},
  kum(){rr(-8,-6,16,12,4);F('#c9a56c');S(1.6);el(0,-6,8,3);F('#e8cc98');S(1.2);g.beginPath();g.moveTo(-6,-4);g.lineTo(6,-4);S(1,'#a8784a');circ(-3,1,1);F('#a8784a');circ(3,3,1);F('#a8784a');},
  billur(){g.beginPath();g.moveTo(-7,-10);g.quadraticCurveTo(-7,1,0,2);g.quadraticCurveTo(7,1,7,-10);g.closePath();F('rgba(170,220,255,.85)');S(1.6);rr(-1.2,2,2.4,6,1);F('#bfe4ff');S(1.2);el(0,9,5.5,1.8);F('#bfe4ff');S(1.2);
    g.beginPath();g.moveTo(-5,-8);g.quadraticCurveTo(-5,-2,-2,0);S(1.2,'#fff');el(0,-10,7,1.8);F('#e8f6ff');S(1.2);},
  kure(){glowI('rgba(190,140,255,.6)',15);rr(-6,4,12,5,2);F('#7a4a24');S(1.4);circ(0,-3,8);F('#c9b8ff');S(1.6);g.save();circ(0,-3,7);g.clip();for(let i=0;i<3;i++){g.beginPath();g.arc(Math.sin(T*2+i)*3,-3,4+i*1.5,T*3+i,T*3+i+2);S(1.4,['#fff','#9ad0ff','#ffd0f0'][i]);}g.restore();el(-3,-6,2.5,1.5,-.6);F('#fff');},
  zehir(){glowI('rgba(120,230,90,.5)',15);ITEM.yatagan();g.save();g.rotate(-.35);for(let i=0;i<3;i++){const k=((T*1.5+i*.33)%1);circ(4+i*3,1+k*8,1.6*(1-k*.4));F('#7fd06a');}g.restore();},
  sifa(){glowI('rgba(255,240,140,.55)',15);ITEM.zirh();rr(-1.5,-5,3,9,1);F('#7fd06a');S(1);rr(-4.5,-2,9,3,1);F('#7fd06a');S(1);},
  seyyah(){glowI('rgba(255,200,120,.5)',15);ITEM.carik();[-1,1].forEach(s=>{g.beginPath();g.moveTo(s*2-2,-4);g.quadraticCurveTo(s*10-2,-12,s*12-2,-4);g.quadraticCurveTo(s*8-2,-6,s*2-2,-2);F('#fff');S(1.2);});},
  nefes(){glowI('rgba(255,130,60,.55)',15);ITEM.billur();g.save();for(let i=0;i<3;i++){const k=((T*1.2+i*.33)%1);circ(Math.sin(k*6+i)*3,-12-k*10,2+k*2);F(`rgba(255,${140+i*30},60,${.8-k*.6})`);}g.restore();},
  tuz(){rr(-8,-6,16,14,5);F('#f2ead8');S(1.6);g.beginPath();g.moveTo(-6,-6);g.quadraticCurveTo(0,-12,6,-6);F('#e8e0d0');S(1.4);rr(-9,-7,18,3,1.5);F('#a86a38');S(1.1);for(let i=0;i<4;i++){circ(-4+i*2.6,2+(i%2)*2,1);F('#cfc7ba');}},
  nal(){g.beginPath();g.arc(0,0,8,Math.PI*.15,Math.PI*1.85,true);S(5,OL);g.beginPath();g.arc(0,0,8,Math.PI*.15,Math.PI*1.85,true);S(3,'#9aa0a8');[[-6,4],[-8,-2],[6,4],[8,-2]].forEach(([a,b])=>{circ(a,b,.9);F(OL);});},
  kalem(){g.save();g.rotate(-.6);rr(-1.5,-10,3,16,1.5);F('#f2ead8');S(1.2);g.beginPath();g.moveTo(-1.5,6);g.lineTo(0,10);g.lineTo(1.5,6);F('#2a2030');g.restore();}
});
const GAP={billur:11,kure:10,nefes:11,kum:7,sifa:6,seyyah:6,zehir:5.5,yun:8,parsomen:7,as:7,iksir:9,muhur:9,dondurma:10,ebedi:10,deri:6,ot:7,kahve:7,carik:6,ruzgar:6};
const IT={
  kulce:{ad:'Demir Külçe',raw:1,cost:8,for:'yatagan'},yun:{ad:'Yün',raw:1,cost:16,for:'zirh'},kagit:{ad:'Kâğıt',raw:1,cost:28,for:'parsomen'},
  deri:{ad:'Deri',raw:1,cost:22,for:'carik'},ot:{ad:'Şifalı Ot',raw:1,cost:45,for:'iksir'},kum:{ad:'Cam Kumu',raw:1,cost:55,for:'billur'},
  billur:{ad:'Billur Kadeh',sell:1,base:260},kure:{ad:'Kehanet Küresi',sell:1,ench:'billur'},
  zehir:{ad:'Zehirli Yatağan',sell:1,simb:'yatagan'},sifa:{ad:'Şifalı Zırh',sell:1,simb:'zirh'},seyyah:{ad:'Seyyah Çarığı',sell:1,simb:'carik'},nefes:{ad:'Ejderân Nefesi',sell:1,simb:'billur'},
  kizgin:{ad:'Kızgın Demir'},as:{ad:'Aş'},
  yatagan:{ad:'Yatağan',sell:1,base:30},zirh:{ad:'Keçe Zırh',sell:1,base:55},parsomen:{ad:'Efsun Parşömeni',sell:1,base:90},
  carik:{ad:'Çarık',sell:1,base:70},iksir:{ad:'Şifa İksiri',sell:1,base:170},
  alevli:{ad:'Alevli Yatağan',sell:1,ench:'yatagan'},tilsim:{ad:'Tılsımlı Zırh',sell:1,ench:'zirh'},ruzgar:{ad:'Rüzgâr Çarığı',sell:1,ench:'carik'},
  muhur:{ad:'Mühürlü İksir',sell:1,ench:'iksir'},
  dondurma:{ad:'Dondurma'},kahve:{ad:'Kahve'},tuz:{ad:'Tuz Kesesi'},nal:{ad:'At Nalı'}
};
const BASES=['yatagan','zirh','parsomen','carik','iksir','billur'];
const ENCH=['alevli','tilsim','ruzgar','muhur','kure'];
const ENCH_OF={yatagan:'alevli',zirh:'tilsim',carik:'ruzgar',iksir:'muhur',billur:'kure'};
const SIMYA=['zehir','sifa','seyyah','nefes'];
const SIMYA_OF={yatagan:'zehir',zirh:'sifa',carik:'seyyah',billur:'nefes'};
const SELLS=BASES.concat(ENCH,SIMYA);
const RAWS=['kulce','yun','kagit','deri','ot','kum'];
const QM=[1,2,3.6,6.5,10,14.5],QN=['Sade','Sağlam','Usta işi','Şahane','Efsanevi','Destansı'];const QMAX=5;
function qcost(id,l){return Math.round([350,1800,6500,22000,90000][l]*Math.pow(IT[id].base/25,.7)/10)*10;}

/* ====================== TEZGÂHLAR ====================== */
const ST={
  ocak:{ad:'Ocak',in:['kulce'],out:'kizgin',auto:1,t:1.3,tray:40,fp:[-30,-34,52,6],cost:400,desc:'Külçeyi kızdırır. Yanındaki örs kızgın demiri kendisi çeker.'},
  ors:{ad:'Örs',in:['kizgin'],out:'yatagan',strikes:5,sint:.24,finish:1,tool:'hammer',tray:30,fp:[-24,-24,46,4],cost:500,usta:'demirci',desc:'Kızgın demirden yatağan döver.'},
  kece:{ad:'Keçe Tezgâhı',in:['yun'],out:'zirh',strikes:6,sint:.22,finish:1.2,tool:'mallet',tray:30,fp:[-34,-30,44,4],cost:600,usta:'kececi',desc:'Yünü döver, keçe zırh diker.'},
  hokka:{ad:'Hokka Masası',in:['kagit'],out:'parsomen',strikes:7,sint:.2,finish:.9,tool:'quill',tray:30,fp:[-34,-30,46,4],cost:800,usta:'hattat',desc:'Kâğıda efsun yazar, mühürler.'},
  deri:{ad:'Çarık Tezgâhı',in:['deri'],out:'carik',strikes:6,sint:.22,finish:1,tool:'mallet',tray:30,fp:[-34,-28,44,4],cost:900,usta:'carikci',desc:'Deriyi keser, çarık diker.'},
  camocak:{ad:'Cam Ocağı',in:['kum'],out:'billur',auto:1,t:3.6,tray:42,fp:[-32,-40,54,6],cost:15000,desc:'Kumu eritir, billur kadeh üfler. Kendi kendine çalışır.'},
  simya:{ad:'Simya Kazanı',in:['iksir','yatagan','zirh','carik','billur'],combo:'iksir',strikes:8,sint:.22,finish:1.5,tool:'quill',tray:36,fp:[-36,-32,50,4],cost:20000,usta:'simyager',desc:'Bir iksir + bir eşya = simya eşyası. Tarifini sen seçersin.'},
  imbik:{ad:'İksir İmbiği',in:['ot'],out:'iksir',auto:1,t:4.2,tray:34,fp:[-30,-36,48,6],cost:2500,desc:'Şifalı otu kendi kendine kaynatır, şişeler.'},
  efsun:{ad:'Efsun Masası',in:['parsomen','yatagan','zirh','carik','iksir','billur'],combo:'parsomen',strikes:8,sint:.22,finish:1.4,tool:'quill',tray:34,fp:[-36,-30,48,4],cost:6000,usta:'efsuncu',desc:'Bir parşömen + bir eşya = efsunlu eşya. Her masaya bir tarif seçilir.'}
};
const ST_IDS=Object.keys(ST);
const ST_IN=[4,6,9,12,16,20],ST_OUT=[6,10,15,22,30,40],ST_UPC=[400,1500,5000,15000,40000];
const SUP_CAPS=[30,50,80,120,180,250],SUP_UPC=[300,1200,4000,12000,30000];
const RACK_CAPS=[10,15,22,30,40,50],RACK_UPC=[250,1200,5000,20000,60000];
const PRODUCER={billur:'camocak',kure:'efsun',zehir:'simya',sifa:'simya',seyyah:'simya',nefes:'simya',yatagan:'ors',zirh:'kece',parsomen:'hokka',carik:'deri',iksir:'imbik',alevli:'efsun',tilsim:'efsun',ruzgar:'efsun',muhur:'efsun',ebedi:'efsun'};
function outOf(type,inp){if(type!=='efsun')return ST[type].out;return null;}

/* ====================== USTALAR VE ÇALIŞANLAR ====================== */
const ROLES={
  hamal:{ad:'Yaşruk Hamal',wage:20,cost:[250,600,1500,4000,8000,14000,24000,40000,65000,100000,150000,220000],max:12,desc:'Sandıktan tezgâha, tezgâhtan rafa taşır. Acıkınca aş kazanına gider.'},
  burkazur:{ad:'Burkazur',wage:0,cost:[0],max:1,desc:'Kervancıbaşının yeğeni. Bedava ama yavaş; yalnız sandıktan tezgâha hammadde taşır, bir de çok konuşur.'},
  katip:{ad:'Puhusoy Kâtip',wage:30,cost:[520,2500,8000],max:3,desc:'Kasada durur, satışı yapar. Her kasa için bir kâtip.'},
  bekci:{ad:'Uçmakan Bekçi',wage:35,cost:[800,3000,9000],max:3,desc:'Geceleri devriye gezer, hırsızı kovalar.'},
  demirci:{ad:'Uçmakan Demirci',wage:45,cost:[900,4000,12000],st:'ors',desc:'Örsün başında kendi kendine yatağan döver.'},
  kececi:{ad:'Yaşruk Keçeci',wage:50,cost:[1100,5000,15000],st:'kece',desc:'Keçe tezgâhında zırh diker, arada mani okur.'},
  hattat:{ad:'Puhusoy Hattat',wage:60,cost:[1500,6500,20000],st:'hokka',desc:'Hokka masasında parşömen yazar. İki kere.'},
  carikci:{ad:'Tırmıksoy Çarıkçı',wage:60,cost:[2000,8000,24000],st:'deri',desc:'Sessizce çarık diker. Mırlar.'},
  efsuncu:{ad:'Zerksoy Efsuncu',wage:120,cost:[9000,30000],st:'efsun',desc:'Efsun masasında kombinasyon yapar. ~kutsal bir koku~'},
  simyager:{ad:'Pullukul Simyager',wage:180,cost:[30000,90000],st:'simya',desc:'Simya kazanını karıştırır. Pullarına bir şey olmaz, olsa da yeşerir.'}
};
const USTA_ROLES=['demirci','kececi','hattat','carikci','efsuncu','simyager'];
const SPEC={
  hamal:HAMAL,katip:KATIP,demirci:USTA,
  burkazur:Object.assign({},HAMAL,{cloth:'#8a6a3a',apron:'#d8c08a',skin:'#7aa85a',belt:'#5a3a22',k:1.08}),
  deveci:Object.assign({},RACES.ucmakan,{cloth:'#c96b3c',belt:'#5a3a22'}),
  kececi:Object.assign({},HAMAL,{cloth:'#b8507a',apron:'#f6ead2',belt:null,skin:'#86b862'}),
  hattat:Object.assign({},KATIP,{cloth:'#3f6aa0',wing:'#6a4a2a'}),
  carikci:Object.assign({},RACES.tirmik,{cloth:'#6a4a2a',apron:'#c48a52'}),
  efsuncu:Object.assign({},RACES.zerksoy,{cloth:'#4a2a6a',trim:'#9ad0ff'}),
  simyager:Object.assign({},RACES.pullukul,{cloth:'#2f6a3a',apron:'#c9e8b0'}),
  reis:Object.assign({},RACES.ucmakan,{cloth:'#7a3a2a',belt:'#f0b43c',trim:'#f0b43c'}),
  sultan:{head:'insan',bw:22,bh:22,R:12,leg:9,cloth:'#2f6a5a',skin:'#e6c0a0',trim:'#f0b43c',belt:'#f0b43c'},
  muhafiz:{head:'asker',bw:20,bh:20,R:11,leg:9,cloth:'#3f6aa0',skin:'#e0b48a',trim:'#f2ead8',belt:'#2a4a7a'},
  hasmet:{head:'asker',bw:26,bh:24,R:13,leg:9,cloth:'#5a1f2a',skin:'#d8a476',trim:'#f0b43c',belt:'#2a1c22'},
  bekci:{head:'asker',bw:20,bh:20,R:11,leg:9,cloth:'#a8642e',skin:'#d8a476',trim:'#f0b43c',belt:'#5a3a22'},
  hirsiz:{head:'insan',bw:17,bh:16,R:10.5,leg:8,cloth:'#2a2434',skin:'#c9a07a',belt:'#4a3a5a'},
  dondurmaci:Object.assign({},RACES.pullukul,{cloth:'#f08aa8',apron:'#fff'}),
  kahveci:Object.assign({},RACES.puhusoy,{cloth:'#5a3422',apron:'#f2ead8'}),
  tuzcu:Object.assign({},RACES.insan,{cloth:'#e8e2d6',belt:'#6a7a8a'}),
  asci:Object.assign({},HAMAL,{cloth:'#c96b3c',apron:'#fff',skin:'#7aa85a'}),
  nalbant:Object.assign({},RACES.ucmakan,{cloth:'#5a4a3a',apron:'#8a5a32',belt:'#2a1c14'})
};
const SKILL={
  hamal:{guc:['Kuvvet','+2 taşıma'],hiz:['Çeviklik','%20 hız'],istah:['Tok Karın','%25 az acıkır']},
  katip:{hiz:['Hızlı Hesap','%20 hızlı kasa'],yuz:['Güler Yüz','+%10 bahşiş şansı']},
  usta:{hiz:['Seri El','bütün ustalar %20 hızlı'],titiz:['Titizlik','%15 ihtimalle bedava ikinci ürün']},
  bekci:{goz:['Kartal Göz','%25 daha uzağı görür'],kos:['Uzun Bacak','%20 hızlı koşar']}
};
const SKCOST=[200,800,3000];

/* ====================== IRKLAR: ZEVK VE FAVORİ ====================== */
const PREF={
  insan:{w:{yatagan:5,zirh:2,carik:2,iksir:2,alevli:4,ruzgar:1,zehir:4,billur:1},fav:'alevli',fav2:'yatagan'},
  ucmakan:{w:{zirh:4,yatagan:2,carik:3,tilsim:4,ruzgar:2,sifa:4,seyyah:2},fav:'tilsim',fav2:'zirh'},
  yasruk:{w:{zirh:3,iksir:4,yatagan:2,muhur:2,sifa:3,billur:2},fav:'iksir',fav2:'zirh'},
  puhusoy:{w:{parsomen:6,muhur:3,iksir:1,kure:5,billur:2},fav:'parsomen',fav2:'muhur'},
  gaksoy:{w:{carik:4,parsomen:2,ruzgar:5,yatagan:1,kure:3,billur:3,seyyah:3},fav:'ruzgar',fav2:'carik'},
  pullukul:{w:{iksir:5,zirh:2,muhur:4,sifa:3,nefes:2},fav:'muhur',fav2:'iksir'},
  zerksoy:{w:{parsomen:3,alevli:5,yatagan:2,tilsim:2,zehir:5,nefes:4},fav:'alevli',fav2:'parsomen'},
  tirmik:{w:{carik:5,yatagan:3,ruzgar:4,seyyah:4,zehir:2},fav:'ruzgar',fav2:'carik'}
};
const BASE_ATT={insan:3,ucmakan:2,tirmik:1,yasruk:1.5,pullukul:1,puhusoy:1.2,gaksoy:1,zerksoy:.8};

/* ====================== MERDİVEN, GELİŞİM ====================== */
const LADDER=['zirh','hamal','parsomen','katip','usta','carik','bahce','efsun','iksir','cam','simya'];
const LADDER_INFO={
  zirh:{ad:'Keçe Zırh Atölyesi',cost:150,ic:'zirh',desc:'Yün sandığı, keçe tezgâhı, zırh rafı. Uçmakan ve Yaşruk sever.'},
  hamal:{ad:'Gerçek Bir Yaşruk Hamal',cost:250,ic:'as',desc:'Burkazur\'un aksine her şeyi taşır: sandıktan tezgâha, tezgâhtan rafa. Aş kazanı da gelir; acıkınca kendi yer.'},
  parsomen:{ad:'Parşömen Atölyesi',cost:450,need:1,ic:'parsomen',desc:'Kâğıt sandığı, hokka masası, parşömen rafı. Puhusoylar bayılır.'},
  katip:{ad:'Puhusoy Kâtip',cost:520,ic:'kagit',desc:'Kasada satış yapar. Sen zanaatla uğraşırsın.'},
  usta:{ad:'Ustalar Loncası',cost:900,ic:'yatagan',desc:'Usta tutabilirsin: örste demirci, tezgâhta keçeci... İçeride, kendi başlarına üretirler.'},
  carik:{ad:'Çarık Atölyesi',cost:1800,need:1,ic:'carik',desc:'Deri sandığı, çarık tezgâhı, çarık rafı. Tırmıksoy ve Gaksoy gelir.'},
  bahce:{ad:'Bahçe Kiracıları',cost:3000,ic:'dondurma',desc:'Avlunu esnafa kiralarsın: dondurmacı, kahveci, tuzcu, aşçı, nalbant. Satışlarından komisyon alırsın, bahçede şenlikler olur.'},
  efsun:{ad:'Efsun Masası',cost:6000,need:2,ic:'alevli',desc:'Parşömen + eşya = efsunlu eşya! Efsun vitrini de gelir. Fiyatlar uçar.'},
  iksir:{ad:'İksir İmbiği',cost:12000,need:2,ic:'iksir',desc:'Ot sandığı, imbik, iksir rafı. Pullukul ve Yaşruk koşa koşa gelir.'},
  cam:{ad:'Cam Atölyesi',cost:40000,need:3,ic:'billur',desc:'Kum sandığı, cam ocağı, billur rafı. Ateşten kadeh çıkar; efsunlanırsa kehanet küresi olur.'},
  simya:{ad:'Simya Kazanı',cost:120000,need:4,ic:'zehir',desc:'İksiri silaha, zırha, çarığa, billura kat: dört yeni pahalı ürün ve simya rafı.'}
};
const UPG={
  kucak:{ad:'Geniş Kucak',ic:'yun',max:5,cost:[150,400,900,2000,4500],desc:l=>'Taşıma: '+(4+2*l)+' → '+(6+2*l)+' eşya'},
  carik:{ad:'Çevik Çarık',ic:'carik',max:4,cost:[200,600,1500,4000],desc:l=>'Hız +%'+(12*l)+' → +%'+(12*l+12)},
  eller:{ad:'Usta Eller',ic:'yatagan',max:4,cost:[300,900,2500,6000],desc:l=>'Zanaat hızı +%'+(15*l)+' → +%'+(15*l+15)},
  saat:{ad:'Açık Saat',ic:'kulce',max:8,cost:[400,1500,4000,10000,40000,120000,300000,700000],desc:l=>'Gün süresi '+(60+15*l)+' → '+(75+15*l)+' saniye'}
};
const SEC={kilit:{ad:'Demir Kilit',cost:1200,desc:'Hırsız içeri girerse yarısını taşıyabilir.'},kapan:{ad:'Gaksoy Alarmı',cost:4000,desc:'Tüneğe eğitimli Gaksoy: hırsızı görünce bağırır, bekçiler iki kat uzağı duyar.'}};
const KIOSK={dondurma:{ad:'Pullukul Dondurmacı',lbl:'DONDURMA',cost:2500,price:45,item:'dondurma',spec:'dondurmaci',col:'#f08aa8',desc:'Pullukul serinliği sever. Avlunda dondurma satar, sana komisyon verir.'},
  kahve:{ad:'Puhusoy Kahveci',lbl:'KAHVE',cost:3500,price:55,item:'kahve',spec:'kahveci',col:'#7a4a2a',desc:'Kahveyi kayda geçerek pişirir. Komisyon öder, fişini iki kere keser.'},
  tuz:{ad:'Küfkent Tuzcusu',lbl:'TUZ',cost:9000,price:80,item:'tuz',spec:'tuzcu',col:'#9ab0c8',desc:'"Rüya görmeden önce tuzu yemelisin." Uykusuz Haarbova\'da tuz kesesi kapış kapış gider.'},
  asci:{ad:'Yaşruk Şef',lbl:'AŞ',cost:16000,price:100,item:'as',spec:'asci',col:'#c96b3c',desc:'Yaşruklarda şef hem reis hem aşçıbaşıdır. Kazanı kaynayan şefin önünde kuyruk eksik olmaz.'},
  nalbant:{ad:'Uçmakan Nalbant',lbl:'NAL',cost:30000,price:140,item:'nal',spec:'nalbant',col:'#6a7a8a',desc:'At insandan azizdir; atına nal çaktıran Uçmakan pazarlık etmez.'}};
const KOM=[.2,.3,.4],KOMC=[2000,8000];
const KIOSK_UP=[6000,25000,80000,200000],KIOSK_MUL=[1,2,3.5,5.5,8],KIOSK_RENT=[0,400,1500,4500,12000],KIOSK_LVN=['Seyyar araba','Gölgelikli tezgâh','Ahşap köşk','Fenerli köşk','Billur köşk'];
const ACH={ilk:['İlk Satış','Agreguk\'ta ilk nüd!'],karli:['Bereketli Gün','Bir günde 100 nüd net kâr.'],uc:['Üç Zanaat','Üç farklı ürün rafta.'],hafta:['Bir Hafta','Yedi gün kepenk açtın.'],
  efsun:['İlk Efsun','İlk efsunlu eşyanı ürettin.'],hirsiz:['Yakala Onu!','Bir hırsızı kendin yakaladın.'],usta:['Usta Tüccar','Bir günde 10.000 nüd net kâr.'],
  zengin:['Kese Taşıyor','Bir günde 100.000 nüd net kâr.'],buyuk:['Pazarın Devi','Dükkân en büyük hâlinde.'],konak:['Konak Sahibi','Ev konak oldu.'],
  efsane:['Efsanevi Mal','Bir ürünü Efsanevi kaliteye çıkardın.'],aile:['AİLE AGREGUK\'TA!','Yemin yerine geldi.'],sekiz:['Sekizinci İlah','Aşmarel\'i besleyenlerdensin. Kimseye söyleme.'],meclis:['Ateş Başında','Tüccar Meclisi\'ne girdin.'],hanim:['Dükkânın Hanımı','Hüzzam artık her gün dükkânda.']};
const DREAM=10000000;
const KERVAN=[{cost:40000,pay:2000},{cost:120000,pay:6500},{cost:350000,pay:19000},{cost:900000,pay:50000},{cost:2200000,pay:125000},{cost:4500000,pay:260000}];
const START_DOY=78;const MONTHS=['Malkut','Kültendar','Gevran','Lilavar','Yobdabot'];
function dateStr(day){const ix=START_DOY-1+day-1+((typeof G!=='undefined'&&G&&G.dOff)||0);const doy=((ix)%385+385)%385,y=567+Math.floor(ix/385);return MONTHS[Math.floor(doy/77)]+' '+(doy%77+1)+', S.S.S. '+y;}

/* ====================== DÜNYA ÖLÇÜLERİ ====================== */
const SX0=470,SY1=1720,DOOR_X=707;
const SHOP_LV=[{w:474,d:554},{w:654,d:714},{w:814,d:874},{w:954,d:1034},{w:954,d:1214},{w:954,d:1394},{w:954,d:1514}],SHOP_COST=[600,5000,20000,70000,180000,450000];
const HX0=50;
const HOUSE_LV=[{w:180,d:180,ad:'Çadırcık'},{w:240,d:240,ad:'Keçe Otağ'},{w:300,d:300,ad:'Kerpiç Ev'},{w:360,d:370,ad:'Konak'}],HOUSE_COST=[800,5000,20000];
const BED={x:0,y:0,fp:[-38,-30,38,6]};
const FIELD=[60,840,400,1160];
const FP={sup:[-30,-26,30,4],rack:[-40,-32,40,4],kasa:[-36,-28,36,4],askazan:[-24,-28,42,6],cop:[-13,-12,13,4],kiosk:[-42,-34,42,6],teslim:[-26,-22,26,4],depo:[-52,-44,52,6]};
const DEF={sup_kulce:[534,1232],ocak:[524,1340],ors:[654,1340],rack_yatagan:[594,1480],kasa:[764,1600],cop:[894,1680],askazan:[874,1560],teslim:[560,1640],
  sup_yun:[824,1232],kece:[824,1340],rack_zirh:[824,1480],
  sup_kagit:[1024,1232],hokka:[1024,1340],rack_parsomen:[1024,1480],
  sup_deri:[534,1080],deri:[680,1080],rack_carik:[840,1080],
  efsun:[1204,1340],rack_vitrin:[1204,1480],
  sup_ot:[534,930],imbik:[680,930],rack_iksir:[850,930],
  sup_kum:[1350,1232],camocak:[1340,1340],rack_billur:[1350,1480],
  simya:[700,760],rack_simya:[860,760],
  kiosk_dondurma:[900,1900],kiosk_kahve:[1110,1900],kiosk_tuz:[1320,1900],kiosk_asci:[1000,2070],kiosk_nalbant:[1220,2070],depo:[1560,1890]};
