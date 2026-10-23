
/* ====================== DEPO ====================== */
const DEPO_CAP=[500,900,1500,2500,4000],DEPO_COST=30000,DEPO_UP=[60000,150000,350000,800000],DEPO_LVN=['Ahşap Ambar','Geniş Ambar','Taş Depo','Kervan Deposu','Büyük Bedesten'];
function depoObj(){return findObj('depo');}
function depoCap(){return DEPO_CAP[G.depoLv||0];}
function depoN(o){let n=0;for(const k in o.stock)n+=o.stock[k];return n;}
function depoFor(id){const d=depoObj();if(!d||!SELLS.includes(id)||depoN(d)>=depoCap())return null;return d;}
function buyDepo(){if(depoObj()||!pay(DEPO_COST))return;const o=mkObj({k:'depo',stock:{}},DEF.depo[0],DEF.depo[1]);o.stock={};sfx('unlock');shake=3;toast('Depo kuruldu! 📦','Rafa sığmayan mal artık çöpe değil depoya gider. Raf boşalınca hamallar geri getirir.',{item:'zirh'});after();}
function buyDepoUp(){const l=G.depoLv||0;if(!depoObj()||l>=DEPO_UP.length||!pay(DEPO_UP[l]))return;G.depoLv=l+1;sfx('unlock');toast('Depo büyüdü: '+DEPO_LVN[G.depoLv],'Kapasite '+depoCap()+' mal.',{item:'zirh'});after();}
function drawDepo(o){const x=o.x,y=o.y,l=G.depoLv||0,n=depoN(o),cp=depoCap();shadow(x,y+4,56,8);
  const wall=l>=2?'#cfc7ba':'#a86a38',roof=l>=3?'#3f6aa0':'#b7473c';
  rr(x-50,y-62,100,64,4);F(wall);S(2.2);if(l>=2){for(let i=0;i<4;i++){g.beginPath();g.moveTo(x-50,y-46+i*14);g.lineTo(x+50,y-46+i*14);S(1,'#a89c8a');}}else{for(let i=-40;i<=40;i+=14){g.beginPath();g.moveTo(x+i,y-60);g.lineTo(x+i,y);S(1,'#8a5228');}}
  g.beginPath();g.moveTo(x-58,y-60);g.lineTo(x,y-90-(l>=4?8:0));g.lineTo(x+58,y-60);g.closePath();F(roof);S(2.2);
  if(l>=4){circ(x,y-96,5);F('#ffd34c');S(1.4);}if(l>=3){g.beginPath();g.moveTo(x+40,y-70);g.lineTo(x+40,y-100);S(2,OL);g.beginPath();g.moveTo(x+40,y-100);g.lineTo(x+58,y-94);g.lineTo(x+40,y-88);F('#c9463d');S(1.4);}
  rr(x-18,y-40,36,42,3);F('#5a3a22');S(2);g.beginPath();g.moveTo(x-18,y-40);g.lineTo(x+18,y+2);g.moveTo(x+18,y-40);g.lineTo(x-18,y+2);S(1.4,'#8a6a4a');
  const k=Math.min(4,Math.ceil(n/cp*4));for(let i=0;i<k;i++){rr(x+22+(i%2)*13,y-14-Math.floor(i/2)*12,12,12,2);F('#c9a56c');S(1.4);}
  sign(x,y+6,'Depo · '+DEPO_LVN[l]);badge(x-46,y-66,n+'/'+cp,n>=cp?'#ffc0b0':'#e3f3d8');}

/* ====================== OTOMATİK SİPARİŞ ====================== */
function fillAll(silent){let spent=0,guard=0,did=true;const rs=RAWS.filter(r=>findObj('sup',o=>o.item===r));
  while(did&&guard++<400){did=false;for(const r of rs){const room=supCap(r)-G.sup[r]-G.order[r];const pr=rawPrice(r);if(room<=0||G.nud<pr)continue;const n=Math.min(2,room);if(G.nud<pr*n)continue;G.nud-=pr*n;G.order[r]+=n;G.orderSpent+=pr*n;spent+=pr*n;did=true;}}
  if(!silent){if(spent){sfx('coin',.7);toast('Sandıklar dolacak 🧺','Yarın sabahki kervana '+nudStr(spent)+' nüdlük mal yazıldı.');}else toast('Yazacak bir şey yok','Sandıklar zaten dolu ya da kese dar.');}
  return spent;}
function fillCost(){let c=0;for(const r of RAWS){if(!findObj('sup',o=>o.item===r))continue;c+=Math.max(0,supCap(r)-G.sup[r]-G.order[r])*rawPrice(r);}return c;}

/* ====================== HÜZZAM ====================== */
const MAN_NAME='Hüzzam';
const MAN_GIFTS=[
  {at:20,id:'yelek',ad:'Keçe Yelek',ic:'🧶',ef:'İdiz %8 hızlı yürür',txt:'Pembe keçeden, yün yün dövülmüş bir yelek. "Üşüme diye değil, yakışsın diye."'},
  {at:40,id:'kulah',ad:'Örme Külah',ic:'🧢',ef:'Bahşiş şansı +%5',txt:'Tepesi püsküllü bir külah. "Müşteri önce külaha bakar, sonra sana. Külah sevimli olsun."'},
  {at:60,id:'atki',ad:'Uğurlu Atkı',ic:'🧣',ef:'Bütün zarlara +1',txt:'Yedi renkli, yedi düğümlü atkı. "Her düğüm bir ilaha. Gülgezen\'inkini sıkı bağladım, o iki yüzlüdür."'},
  {at:80,id:'kaftan',ad:'Bayramlık Kaftan',ic:'👘',ef:'Bütün fiyatlar +%3',txt:'Yaldızlı, kırmızı bir kaftan. "Diz boyu ama tüccar. Tüccar gibi giyin."'}];
const MAN_MANI=[["Sürtünkaya yosunu gibi gözlerin, aş kazanı gibi sıcak sözlerin.","Hıçk... Ağlatma beni İdiz! (Göz pınarları coştu, mutluluktan.)"],
  ["Üç kulaç boyun var, diz boyu gönlüm; sana yetişmeye merdiven isterim.","Merdivene gerek yok. Ben eğilirim. Hıçk!"],
  ["Keçe dövdükçe ellerin, dükkânıma bereket gelir.","Ellerime mani yazan ilk Yavşuk sensin. Pasifolin coştu!"],
  ["Kervan gelir, kervan gider; sen gelince pazar biter.","Pazar bitmesin ama, satış lazım. Ama... çok güzeldi."],
  ["Aş kazanı kaynar, gönlüm kaynar; sen gülünce Agreguk aydınlanır.","Gülmüyorum, ağlıyorum. Bizde ikisi aynı şey."]];
const MAN_FAIL=["Kafiye biraz kaçtı ama niyet güzel.","Bu mani değil, sipariş listesi İdiz.","Hmm. Melankolin kıpırdamadı bile."];
const MAN_IDLE=["Hamallar, aşınız hazır, koşun!","Raf boş kalmasın, gönlüm boş kalır.","Kâtip, o hesabı bir daha say.","Usta, çekici biraz daha sert vur.","İdiz, bugün de diz boyu ama yürek kulaç kulaç."];
function manOn(){return G.man&&(G.man.met||G.day>=5);}
function manSpec(){return Object.assign({},RACES.yasruk,{cloth:G.man&&G.man.wife?'#8a2a5a':'#c9507a',apron:'#f6d0dc',belt:'#7a2a4a',skin:'#86b862',k:1.04});}
function manSpawn(){const S=SHOP();const e={x:S.ex,y:WH+30,dir:1,walk:0,moving:false,seed:13,look:0,skin:'#86b862',st:'in',t:0,path:null,bub:null};
  if(G.man.wife){e.x=S.ex+70;e.y=S.y1-110;e.st='work';e.t=4;}else goTo(e,S.ex+70,S.y1-110);G.manE=e;}
function manTick(dt,day){if(!G.man||!manOn())return;const S=SHOP();let e=G.manE;
  if(!e){if(day&&!G.ended&&(G.man.wife||(G.day>=G.man.next&&!G.man.today&&G.dayT>10))){G.man.today=true;manSpawn();e=G.manE;if(!G.man.wife){toast('💗 '+MAN_NAME+' geldi!','Yaşruk keçeci kız dükkâna uğradı. Yanına git, konuş.');sfx('chime',.6);}}else return;}
  if(e.bub){e.bub.t-=dt;if(e.bub.t<=0)e.bub=null;}
  if(e.st==='in'){if(follow(e,70,dt)){e.st='here';e.t=0;say(e,G.man.met?'İdiz! Yine geldim.':'Merhaba... Burası Yavşuk tüccarın dükkânı mı?',3);}}
  else if(e.st==='here'){e.t+=dt;e.dir=G.p.x<e.x?-1:1;if(Math.random()<dt*.6)fx('heart',e.x,e.y-60,{vy:-24,vx:(Math.random()-.5)*20,t:1});
    if(!G.man.talked&&!EDIT&&Math.hypot(G.p.x-e.x,G.p.y-e.y)<52&&!mqOn){G.man.talked=true;queueModal(manCard);}
    if(e.t>32||(!day)){e.st='out';goTo(e,S.ex,WH+40);if(!G.man.talked){G.man.g=Math.max(0,G.man.g-4);say(e,'Hıçk... Beni görmedi bile...',3);for(let i=0;i<6;i++)fx('bubble',e.x+(Math.random()-.5)*14,e.y-50,{vy:20,vx:(Math.random()-.5)*30,t:.8});toast('💔 '+MAN_NAME+' ağlayarak gitti','Yanına uğramadın. Gönül −4.');}
      G.man.next=G.day+2+Math.floor(Math.random()*2);}}
  else if(e.st==='out'){if(follow(e,80,dt)||e.y>WH+10)G.manE=null;}
  else if(e.st==='work'){if(!day){G.manE=null;return;}e.t-=dt;if(e.t<=0||!e.path||!e.path.length){if(e.t<=0){e.t=5+Math.random()*5;const rs=objs('rack');const r=rs.length?rnd(rs):null;if(r)goTo(e,r.x+(Math.random()-.5)*30,fpOf(r)[3]+34);if(Math.random()<.5)say(e,rnd(MAN_IDLE),3);}}follow(e,60,dt);}}
function manStage(){return MAN_GIFTS.filter(x=>G.man.g>=x.at).length;}
function manBar(){const v=Math.round(G.man.g);return `<div class="dip"><div><b>💗 Gönül</b><i><u style="width:${v}%;background:#c9507a"></u></i><span>${v}</span></div></div>`;}
function manCard(){const M=G.man;M.met=true;if(!M.fav||Math.random()<.5){const on=onSells();M.fav=on.length?rnd(on):null;}
  const fav=M.fav,haveFav=fav&&(stackHas(fav)||objs('rack',r=>(r.stock[fav]||0)>0).length||(depoObj()&&(depoObj().stock[fav]||0)>0));
  const kz=findObj('askazan'),asC=Math.round(WE()*.05/10)*10;
  const done=(d,line,who)=>{const st0=manStage(),g0=M.g;M.g=clamp(M.g+d,0,100);sfx(d>=6?'sparkle':'pop',.7);if(G.manE){say(G.manE,line,4);for(let i=0;i<8;i++)fx('heart',G.manE.x,G.manE.y-60,{vx:(Math.random()-.5)*60,vy:-40-Math.random()*30,t:1.1});}
    cardHTML('💗 '+MAN_NAME,who,'Gönül '+(d>=0?'+':'')+d,`<p class="evl">"${line}"</p>`+manBar(),[{t:'Devam ▸',f:()=>{modalDone();for(const x of MAN_GIFTS)if(M.g>=x.at&&!(M.gifts&&M.gifts[x.id])){M.gifts=M.gifts||{};M.gifts[x.id]=1;queueModal(()=>giftCard(x));}if(M.g>=100&&g0<100&&!M.wife)queueModal(wifeCard);save();}}]);};
  const btns=[{t:'🎶 Mani oku<span style="font-size:11px;display:block;font-weight:600;opacity:.85">bedava, şansına</span>',f:()=>{const m=rnd(MAN_MANI);if(Math.random()<.7)done(9,m[1],'İdiz: "'+m[0]+'"');else done(3,rnd(MAN_FAIL),'İdiz: "'+m[0]+'"');}},
    {t:'🍲 Aş ikram et'+`<span style="font-size:11px;display:block;font-weight:600;opacity:.85">${kz&&kz.pile>0?'aş kazanından':'🪙'+fmt(asC)}</span>`,f:()=>{if(kz&&kz.pile>0)kz.pile--;else{if(G.nud<asC){toast('Kese dar','');return;}G.nud-=asC;}done(11,'Doyuran ele bağlanırız biz. Bilerek mi yaptın bunu?','Yaşruk doyurana bağlanır')}}];
  if(fav)btns.push({t:`🎁 ${IT[fav].ad} hediye et<span style="font-size:11px;display:block;font-weight:600;opacity:.85">${haveFav?'raftan bir tane':'rafta yok'}</span>`,dis:!haveFav,f:()=>{if(!haveFav){toast('Rafta yok',IT[fav].ad+' üret, sonra ver.');return;}if(!stackTake(fav)){if(!takeFromRacks(fav,1)){const d=depoObj();if(d&&d.stock[fav])d.stock[fav]--;}}done(18,'Bunu benim için mi seçtin? En sevdiğim! Hıçk hıçk!','Hediye')}});
  cardHTML('💗 '+MAN_NAME.toUpperCase(),M.g<1?'Yaşruk Keçeci Kız':MAN_NAME,M.g<1?'Üç kulaç boy, pembe keçe, yosun yeşili gözler':'Bugün ne yapacaksın?',
    `<p class="evl">${M.g<1?'"Ben '+MAN_NAME+'. Pazarın arka sokağında keçe döverim. Dükkânın çok konuşuluyor, bakmaya geldim. Sen... çok kısasın. Ama gözlerin akıllı."':rnd(['"Bugün mani yazdım ama söylemem. Önce sen söyle."','"Hamalların yine aç mı? Ben olsam doyururdum."','"Dükkânın güzel kokuyor. Keçe ve aş kokusu."'])}</p>`+manBar()+(fav?`<p class="d">Bugün gözü şunda: <b>${IT[fav].ad}</b></p>`:''),btns);}
function giftCard(G0){G.man.gifts=G.man.gifts||{};G.man.gifts[G0.id]=1;G.bf=null;
  cardHTML('🧶 '+MAN_NAME+' BİR ŞEY ÖRMÜŞ',G0.ic+' '+G0.ad,G0.ef,`<p class="evl">${G0.txt}</p><p>İdiz hemen giydi. <b>${G0.ef}</b>.</p>`,[{t:'Hıçk... teşekkürler',f:()=>{sfx('unlock');modalDone();}}]);}
function wifeCard(){cardHTML('💗 '+MAN_NAME,'Evlenelim mi?','Gönül tamamen doldu',`<p class="evl">"İdiz... Üç kulaç boyum var, sende diz boyu. Ama yan yana durunca tam oluyoruz. Bu dükkânın bir hanımı lazım. Hamallar senden korkmuyor, benden korkar. Evlenelim mi?"</p><p>Evet dersen yarın sabah avluda düğün olur. Sonra ${MAN_NAME} her gün dükkânda durur: <b>ustalar ve hamallar %20 hızlı, kasa %15 hızlı, müşteriler %15 daha sabırlı.</b></p>`,
  [{t:'Evet! 💍',f:()=>{G.wed={day:G.day+1};sfx('unlock');shake=4;toast('💍 Yarın düğün var!','Bütün çalışanlar avluda toplanacak.');save();modalDone();}}]);}
function wedCard(){cardHTML('💍 DÜĞÜN GÜNÜ','İdiz ve '+MAN_NAME,'Avluda kemer kuruldu, davul hazır',`<p class="evl">Hamallar sabahtan beri ağlıyor, mutluluktan. Kâtip davetiyeleri üç nüsha yazdı. Burkazur keçe kemeri taşıdı; söylediğine göre tek başına.</p>`,[{t:'Avluya çık ▸',f:()=>{modalDone();startWedding();}}]);}
function startWedding(){const S=SHOP();const C={x:S.ex,y:SY1+230};G.wedRun={t:0,C};const p=G.p;p.path=null;
  if(!G.manE){G.manE={x:S.ex+40,y:WH+20,dir:-1,walk:0,moving:false,seed:13,look:0,skin:'#86b862',st:'wed',t:0,path:null,bub:null};}G.manE.st='wed';G.manE.path=findPath(G.manE.x,G.manE.y,C.x+22,C.y);
  p.path=findPath(p.x,p.y,C.x-22,C.y);
  const ws=G.workers;const n=ws.length;ws.forEach((w,i)=>{const a=Math.PI*(1.08+.84*(n<2?.5:i/(n-1)));const r=118+(i%2)*26;w.st='wed';w.task=null;w.tool=null;w.wpos=[C.x+Math.cos(a)*r*1.35,C.y+Math.sin(a)*r*.55+46];w.path=findPath(w.x,w.y,w.wpos[0],w.wpos[1]);});
  camLock=false;CAMT={x:C.x,y:C.y-40};sfx('chime',.8);}
const WED_L={hamal:['Hıçk! Çok güzel!','Ağlıyorum ama mutluyum!','Pasifolin coştu!'],burkazur:['Ben ağlamıyorum, gözüme keçe kaçtı.','Kemeri ben taşıdım. Tek başıma.'],katip:['Kayda geçtim: evlendiler.','Üç nüsha nikâh.'],bekci:['Agreguk\'ta düğün güvende!']};
function wedTick(dt){const W0=G.wedRun,C=W0.C;W0.t+=dt;const p=G.p;
  if(p.path&&p.path.length){follow(p,120,dt);p.walk+=dt;}else{p.moving=false;p.dir=1;}
  const e=G.manE;if(e){if(e.path&&e.path.length)follow(e,90,dt);else{e.moving=false;e.dir=-1;}if(e.bub){e.bub.t-=dt;if(e.bub.t<=0)e.bub=null;}}
  for(const w of G.workers){if(w.path&&w.path.length){follow(w,110,dt);w.walk=(w.walk||0)+dt;}else{w.moving=false;w.dir=w.x<C.x?1:-1;}if(w.bub){w.bub.t-=dt;if(w.bub.t<=0)w.bub=null;}}
  if(p.bub){p.bub.t-=dt;if(p.bub.t<=0)p.bub=null;}
  if(W0.t>6){if(!W0.k1){W0.k1=1;sfx('unlock');say(p,'Evet! Evet! Bin kere evet!',3);if(e)say(e,'Diz boyu ama yüreği kulaç kulaç! Hıçk!',3.4);shake=3;}
    if(Math.random()<dt*14){const c=['heart','star'][Math.random()<.5?0:1];fx(c,C.x+(Math.random()-.5)*160,C.y-90,{vx:(Math.random()-.5)*120,vy:-60-Math.random()*90,t:1.2});}
    if(Math.random()<dt*2.2){const w=rnd(G.workers);if(w&&!w.bub){const L=WED_L[w.role]||['Bereketli olsun!','Mutluluklar!'];say(w,rnd(L),2.6);}}}
  if(W0.t>4&&!W0.k0){W0.k0=1;sfx('chime',.7);}
  for(const q of G.parts){q.t-=dt;q.x+=q.vx*dt;q.y+=q.vy*dt;if(q.k==='spark'||q.k==='star')q.vy+=260*dt;}G.parts=G.parts.filter(q=>q.t>0);
  for(const tq of G.toasts.slice(0,1))tq.t-=dt;if(G.toasts[0]&&G.toasts[0].t<=0)G.toasts.shift();
  if(W0.t>15&&!W0.done){W0.done=1;queueModal(()=>cardHTML('💍 DÜĞÜN','İdiz 💗 '+MAN_NAME,'Agreguk\'un en kısa damadı, en uzun gelini',`<p class="evl">Uçmakan davulu çaldı, Yaşruk hamallar mani okudu, kâtip nikâhı üç nüsha yazdı. ${MAN_NAME} artık dükkânın hanımı.</p><p><b>Ustalar ve hamallar %20 hızlı, kasa %15 hızlı, müşteriler %15 daha sabırlı.</b></p>`,[{t:'Yaşasın! ▸',f:()=>{endWedding();modalDone();}}]));}}
function endWedding(){G.wedRun=null;G.wed=null;G.man.wife=true;G.bf=null;achieve('hanim');for(const w of G.workers){w.st='idle';w.path=null;w.wpos=null;if(ROLES[w.role].st){const o=byUid(w.a);if(o){const c=craftP(o);w.x=c.x;w.y=c.y;}}}G.p.path=null;if(G.manE){G.manE.st='work';G.manE.t=2;G.manE.path=null;}CAMT=null;camLock=true;save();}
function drawWedArch(){const W0=G.wedRun;if(!W0)return;const C=W0.C;rr(C.x-60,C.y-6,120,22,4);F('#c9463d');S(1.6);
  [-58,58].forEach(s=>{rr(C.x+s-4,C.y-110,8,112,3);F('#c9a56c');S(1.6);});g.beginPath();g.arc(C.x,C.y-108,58,Math.PI,0);S(9,'#f6d0dc');g.beginPath();g.arc(C.x,C.y-108,58,Math.PI,0);S(2,OL);
  for(let i=0;i<9;i++){const a=Math.PI+i/8*Math.PI;circ(C.x+Math.cos(a)*58,C.y-108+Math.sin(a)*58,5);F(['#ff9ac0','#fff','#f0b43c'][i%3]);S(1);}
  if(W0.t>5){rr(C.x-70,C.y-196,140,26,10);F('#fff7e6');S(2);txt('İdiz 💗 '+MAN_NAME,C.x,C.y-182,13,'#c9463d',{w:700});}}
function drawMan(e){const sp=manSpec();const top=drawGuy(e.x,e.y,e,sp);e.top=top;
  [[-5,0],[5,0],[0,-5],[0,5]].forEach(([a,b])=>{circ(e.x+8+a*.7,top+12+b*.7,3);F('#ffd0e0');S(1);});circ(e.x+8,top+12,2.4);F('#f0b43c');S(1);
  txt(MAN_NAME,e.x,e.y+13,8.5,'#ffe0ec',{o:OL,ow:2.5,w:700});if(G.man.wife&&e.st==='work'){g.globalAlpha=.18+.08*Math.sin(T*3);circ(e.x,e.y-20,46);F('#ff9ac0');g.globalAlpha=1;}}
function playerSpec(){const gi=(G.man&&G.man.gifts)||{};if(!gi.yelek&&!gi.kaftan)return YAV;const s=Object.assign({},YAV);if(gi.yelek){s.apron='#e07aa8';}if(gi.kaftan){s.cloth='#8a2a4a';s.trim='#f0b43c';s.belt='#f0b43c';}return s;}
function playerAcc(p,top){const gi=(G.man&&G.man.gifts)||{};const d=p.dir||1;
  if(gi.atki){const ny=p.y-7-13+1;rr(p.x-8,ny-3,16,5,2.5);F('#c9507a');S(1.3);g.save();g.translate(p.x-d*5,ny+1);g.rotate(d*(.25+Math.sin(T*4)*.1));rr(-2,0,4,9,1.5);F('#f0b43c');S(1.1);g.restore();}
  if(gi.kulah){const hy=top+7;g.beginPath();g.ellipse(p.x,hy,9.5,6.5,0,Math.PI,0);F('#e07aa8');S(1.6);rr(p.x-10,hy-1.5,20,4,2);F('#f6d0dc');S(1.2);circ(p.x,hy-8,2.8);F('#f0b43c');S(1.1);}}

/* ====================== TOPTANCI KERVANI ====================== */
function charisma(){let c=0;const parts=[];const add=(v,n)=>{if(v){c+=v;parts.push(n+' +'+v);}};add(G.berat||0,'Berat');add(G.reisMuhur?1:0,'Reis Mührü');add(G.meclis?1:0,'Meclis');const gi=(G.man&&G.man.gifts)||{};add(gi.kaftan?2:0,'Kaftan');add(G.man&&G.man.wife?2:0,'Hüzzam');return{c,parts};}
function depoValue(){const d=depoObj();if(!d)return 0;let v=0;for(const k in d.stock)v+=price(k)*(d.stock[k]||0);return v;}
function toptanCard(){const d=depoObj();if(!d||depoN(d)<1){modalDone();return;}const V=depoValue();let pct=G.toptanPct;const list=Object.keys(d.stock).filter(k=>d.stock[k]>0).sort((a,b)=>d.stock[b]-d.stock[a]).slice(0,6).map(k=>[k,d.stock[k]]);
  const offer=()=>Math.round(V*pct/10)*10;const ch=charisma();
  const sell=()=>{const v=offer();for(const k in d.stock)d.stock[k]=0;G.nud+=v;G.today.ozel+=v;hudPop=1;sfx('register');shake=3;toast('Depo boşaldı! 🐪','Toptancı '+nudStr(v)+' nüd saydı.',{item:'kulce'});if(G.toptan)G.toptan.st='out';G.toptanNext=G.day+4+Math.floor(Math.random()*3);save();modalDone();};
  const later=()=>{if(G.toptan)G.toptan.st='out';G.toptanNext=G.day+3;modalDone();};
  const body=extra=>`<p class="evl">"Deponda mal çürümesin, Yavşuk. Hepsini alırım. Ama pazar fiyatı veremem, kervanım yol yer."</p>`+itemsHTML(list)+`<p class="d">Depodaki malın pazar değeri: 🪙 ${nudStr(V)}</p><p>Teklif: <b>🪙 ${nudStr(offer())}</b> <span class="d">(%${Math.round(pct*100)})</span></p>`+(extra||'');
  const first=()=>cardHTML('🐪 TOPTANCI KERVANI','Depona teklif var','Küfkent tuz yolundan gelen bir kervan',body(dcHTML(12,'Pazarlık · karizma')+(ch.parts.length?`<div class="d">Karizma: ${ch.parts.join(', ')}</div>`:'')),
    [{t:'🤝 Sat',f:sell},{t:'🎲 Pazarlık et',f:haggle},{t:'Sonra',sec:1,f:later}]);
  const haggle=()=>{const raw=1+Math.floor(Math.random()*20),fin=raw===1?1:raw===20?20:clamp(raw+ch.c,1,20);const t=tierOf(fin,12);
    const res=[()=>{pct=0;},()=>{pct=Math.max(.35,pct-.1);},null,()=>{pct=Math.min(1.05,pct+.15);},()=>{pct=Math.min(1.25,pct+.3);}][t];res();G.toptanPct=pct;
    const txt2=['Toptancı kızdı: "Bana hırsız mı diyorsun?!" Kervanı çevirip gitti.','"Pazarlık bilmeyen esnaf..." Teklifini düşürdü.','','"Peki peki, sen kazandın." Teklifini yükseltti!','"Bu Yavşuk bana pazarlık öğretti!" Neredeyse pazar fiyatı veriyor.'][t];
    const show=()=>{if(t===0){cardHTML('🐪 TOPTANCI KERVANI','Pazarlık bozuldu','',`<div class="tier t0">${TIERN[0]} · ${fin}</div><p>${txt2}</p>`,[{t:'Eyvah ▸',f:later}]);return;}
      cardHTML('🐪 TOPTANCI KERVANI','Yeni teklif','',`<div class="tier t${t}">${TIERN[t]} · ${fin}${ch.c&&raw>1&&raw<20?` <span style="font-size:12px">(${raw}+${ch.c} karizma)</span>`:''}</div><p>${txt2}</p>`+body(),[{t:'🤝 Sat',f:sell},{t:'Vazgeç',sec:1,f:later}]);};
    if(AUTOPLAY){show();return;}
    evCard.innerHTML=`<div class="evh">🐪 PAZARLIK</div><h2>Karizma zarı</h2><div id="evDie">${d20svg(20)}</div>${dcHTML(12,'Pazarlık')}`;evc.classList.remove('hidden');const die=document.getElementById('evDie');let k=0;
    const iv=setInterval(()=>{k++;die.innerHTML=d20svg(k<14?1+Math.floor(Math.random()*20):fin,k<14?'spin':'land');sfx('tick',.5);if(k<14)return;clearInterval(iv);sfx(t>=3?'unlock':'angry',.8);setTimeout(show,700);},85+k*6);};
  first();}
function toptanMorning(){const d=depoObj();if(!d||G.ended||depoN(d)<40||G.day<(G.toptanNext||0))return false;G.toptanPct=.58+Math.random()*.12;
  G.toptan={x:d.x-120,y:WH+70,st:'in',t:0,items:['tuz','kulce','yun'],walk:0,n:4};queueModal(toptanCard);return true;}
function toptanTick(dt){const C=G.toptan;if(!C)return;const d=depoObj();C.walk+=dt;const stopY=(d?d.y:SY1)+90;
  if(C.st==='in'){C.y-=150*dt;if(C.y<=stopY){C.y=stopY;C.st='wait';}}else if(C.st==='wait'){}else if(C.st==='out'){C.y+=150*dt;if(C.y>WH+90)G.toptan=null;}}

/* ====================== BAHÇE ŞENLİKLERİ ====================== */
const FESTS={
  halvet:{ad:'Ayların Halveti',d:'Sedef Ay ile Kanlı Ay buluştu, incilerin akışı coştu. Efsunlu mallar %30 pahalı, bahçe iki kat kazanır.',f:()=>{addMod('cat_ench',1.3,0,'Ayların Halveti');addMod('kiosk',2,0,'Ayların Halveti');}},
  mani:{ad:'Mani Gecesi',d:'Yaşruklar bahçede mani yarışı yapıyor. Bahçe 2,5 kat kazanır, Yaşruk akını var.',f:()=>{addMod('kiosk',2.5,0,'Mani Gecesi');addMod('r_yasruk',1.6,0,'Mani Gecesi');addMod('k_asci',2,0,'Mani Gecesi');}},
  at:{ad:'At Yarışı',d:'Uçmakanlar avlunun önünden at koşturuyor. Nalbant dört kat, bahçe iki kat kazanır.',f:()=>{addMod('kiosk',2,0,'At Yarışı');addMod('k_nalbant',4,0,'At Yarışı');addMod('r_ucmakan',1.5,0,'At Yarışı');}},
  tuz:{ad:'Tuz Pazarı',d:'Küfkent tuz tüccarları bahçede tezgâh açtı. Tuzcu dört kat, bahçe iki kat kazanır.',f:()=>{addMod('kiosk',2,0,'Tuz Pazarı');addMod('k_tuz',4,0,'Tuz Pazarı');}},
  taklit:{ad:'Gaksoy Taklit Gösterisi',d:'Gaksoylar duydukları her sesi taklit ediyor, kalabalık gülüyor. Bahçe 2,5 kat, Gaksoy akını.',f:()=>{addMod('kiosk',2.5,0,'Taklit Gösterisi');addMod('r_gaksoy',1.8,0,'Taklit Gösterisi');addMod('k_kahve',2,0,'Taklit Gösterisi');}},
  yobdabot:{ad:'Yıl Sonu Şenliği',d:'Yobdabot\'un son günü: Uçmakanlar yılı şenlikle kapatıyor. Bahçe dört kat, herkes dışarıda.',f:()=>{addMod('kiosk',4,0,'Yıl Sonu Şenliği');addMod('cust',1.3,0,'Yıl Sonu Şenliği');}}};
function dayOfMonth(d){const ix=START_DOY-1+d-1+(G.dOff||0);const doy=((ix%385)+385)%385;return{m:Math.floor(doy/77),d:doy%77+1};}
function festMorning(){G.fest=null;if(!G.bahce||objs('kiosk').length<1||G.ended)return;const dm=dayOfMonth(G.day);let k=null;
  if(dm.m===4&&dm.d===77)k='yobdabot';else if(dm.d===1)k='halvet';else if(objs('kiosk').length>=2&&G.day%10!==7&&Math.random()<.18&&(G.day-(G.lastFest||0))>=4){const opts=['mani','taklit'];if(findObj('kiosk',o=>o.kind==='nalbant'))opts.push('at');if(findObj('kiosk',o=>o.kind==='tuz'))opts.push('tuz');k=rnd(opts);}
  if(!k)return;G.fest={day:G.day,kind:k};G.lastFest=G.day;FESTS[k].f();G.splash={title:'🎪 '+FESTS[k].ad.toUpperCase(),sub:'Bugün bahçede!',t:4.5,max:4.5};toast('🎪 '+FESTS[k].ad,FESTS[k].d);}
function drawBunting(){if(!G.fest||G.fest.day!==G.day)return;const ks=objs('kiosk');if(!ks.length)return;let x0=1e9,x1=-1e9,yy=0;for(const k of ks){x0=Math.min(x0,k.x);x1=Math.max(x1,k.x);yy=Math.max(yy,k.y);}x0-=70;x1+=70;const y=Math.min(...ks.map(k=>k.y))-130;
  const cols=['#c9463d','#f0b43c','#3f8a3a','#4f7ec2','#c9507a'];g.beginPath();g.moveTo(x0,y);g.quadraticCurveTo((x0+x1)/2,y+30,x1,y);S(1.6,OL);
  const n=Math.max(6,Math.round((x1-x0)/26));for(let i=1;i<n;i++){const t=i/n,x=x0+(x1-x0)*t,yq=y+60*t*(1-t)+Math.sin(T*3+i)*1.2;g.beginPath();g.moveTo(x-6,yq);g.lineTo(x+6,yq);g.lineTo(x,yq+12);g.closePath();F(cols[i%5]);S(1.2);}
  [x0,x1].forEach(x=>{rr(x-3,y-4,6,yy-y+8,2);F('#8a5a32');S(1.4);});}

/* ====================== MİMAR: DÜZEN PLANI ====================== */
const LANES=[{p:'yatagan',sup:'kulce',st:['ocak','ors']},{p:'zirh',sup:'yun',st:['kece']},{p:'parsomen',sup:'kagit',st:['hokka']},{p:'carik',sup:'deri',st:['deri']},{p:'iksir',sup:'ot',st:['imbik']},{p:'billur',sup:'kum',st:['camocak']},{p:'vitrin',sup:null,st:['efsun']},{p:'simya',sup:null,st:['simya']}];
const PLAN_DESIGN_COST=2500,AISLE=46;
function placeAnchor(o){const S=SHOP();const key=o.k==='st'?o.type:o.k==='rack'?'rack_'+o.item:o.k==='sup'?'sup_'+o.item:o.k;const d=DEF[key];
  if(d&&d[0]>S.x0+20&&d[0]<S.x1-20&&d[1]>S.y0+40&&d[1]<S.y1)return d;return[(S.x0+S.x1)/2,S.y1-200];}
function fpW(o){const f=o.k==='deco'?DECO[o.d].fp:o.k==='st'?ST[o.type].fp:FP[o.k];return f;}
/* Akış yerleşimi: soldan sağa, kapı koridorunu atlayarak, satır satır geriye */
function flowRows(groups,yStart,rowH,gap,S){const out=[];let y=yStart,cx=S.x0+16;const L=DOOR_X-AISLE,Rr=DOOR_X+AISLE;
  const fit=(o)=>{const f=fpW(o);let x=cx-f[0];if(x+f[0]<Rr&&x+f[2]>L){cx=Rr;x=cx-f[0];}if(x+f[2]>S.x1-14)return null;return x;};
  for(const grp of groups){let w=0;for(const o of grp){const f=fpW(o);w+=f[2]-f[0]+gap;}
    const room=(S.x1-14)-cx-(cx<L&&cx+w>L?2*AISLE:0);if(w>room&&cx>S.x0+16){y-=rowH;cx=S.x0+16;}
    for(const o of grp){let x=fit(o);if(x==null){y-=rowH;cx=S.x0+16;x=fit(o);}if(x==null)x=cx;out.push([o,x,y]);cx=x+fpW(o)[2]+gap;}}
  return{pl:out,y};}
function layoutPlan(){const S=SHOP();const objsIn=G.objs.filter(o=>o.k!=='deco'&&o.k!=='kiosk'&&o.k!=='depo');const pos=[];
  const kas=objsIn.filter(o=>o.k==='kasa');kas.forEach((o,k)=>pos.push([o,DOOR_X+AISLE+52+150*k,S.y1-108]));
  const az=objsIn.find(o=>o.k==='askazan');if(az)pos.push([az,S.x0+56,S.y1-104]);const ts=objsIn.find(o=>o.k==='teslim');if(ts)pos.push([ts,S.x0+150,S.y1-104]);
  objsIn.filter(o=>o.k==='cop').forEach((o,k)=>pos.push([o,S.x1-30-34*k,S.y1-34]));
  const racks=[];for(const L0 of LANES)for(const r of objsIn.filter(o=>o.k==='rack'&&o.item===L0.p))racks.push([r]);
  const rk=flowRows(racks,S.y1-236,118,30,S);pos.push(...rk.pl);
  const groups=[];for(const L0 of LANES){const g=[];const sp=L0.sup&&objsIn.find(o=>o.k==='sup'&&o.item===L0.sup);if(sp)g.push(sp);
    if(L0.st.length===2){const oc=objsIn.filter(o=>o.k==='st'&&o.type==='ocak'),or=objsIn.filter(o=>o.k==='st'&&o.type==='ors');for(let i=0;i<Math.max(oc.length,or.length);i++){if(oc[i])g.push(oc[i]);if(or[i])g.push(or[i]);}}
    else g.push(...objsIn.filter(o=>o.k==='st'&&o.type===L0.st[0]));if(g.length)groups.push(g);}
  const pr=flowRows(groups,rk.y-158,128,22,S);pos.push(...pr.pl);
  return{pos,rackBack:rk.y-60,prodBack:pr.y};}
function paintPlan(L){const S=SHOP();const c0=Math.ceil((S.x0-8)/TILE),c1=Math.floor((S.x1+8)/TILE)-1,r0=Math.ceil((S.y0-20)/TILE),r1=Math.floor((S.y1+4)/TILE)-1;
  for(let c=c0;c<=c1;c++)for(let r=r0;r<=r1;r++){if(!cellZone(c,r))continue;const x=c*TILE+TILE/2,y=r*TILE+TILE/2;let t;
    if(Math.abs(x-DOOR_X)<AISLE+4&&y>L.prodBack-60)t=(r%2?6:2);else if(y>S.y1-150)t=3;else if(y>L.rackBack)t=((c+r)%2?0:4);else t=1;G.tiles[c+','+r]=t;}BG=null;}
function snapPlan(){const pos={};for(const o of G.objs)pos[o.uid]=[o.x,o.y];G.preplan={pos,tiles:Object.assign({},G.tiles)};}
function applyPlan(){if(!G.preplan)snapPlan();const L=layoutPlan();const moved=new Set();
  for(const [o] of L.pos){o.x=-999;o.y=-999;}const decoIn=G.objs.filter(o=>o.k==='deco'&&whereOf(o).includes('in')&&zoneOf(fpOf(o))==='in');for(const o of decoIn){o.x=-999;o.y=-999;}
  for(const [o,x,y] of L.pos){o.x=Math.round(x/2)*2;o.y=Math.round(y/2)*2;if(!validPos(o))placeNear(o,o.x,o.y);moved.add(o);}
  const S=SHOP();const flats=decoIn.filter(isFlat),solid=decoIn.filter(o=>!isFlat(o));let fy=S.y1-180;
  for(const o of flats){placeNear(o,DOOR_X,fy);fy-=110;}
  let k=0;for(const o of solid){const side=k%2,row=Math.floor(k/2);const x=side?S.x1-30:S.x0+24,y=S.y1-170-row*60;if(!placeNear(o,x,y))placeNear(o,(S.x0+S.x1)/2,S.y1-200);k++;}
  paintPlan(L);
  for(const w of G.workers){if(ROLES[w.role].st){const o=byUid(w.a);if(o){const c=craftP(o);w.x=c.x;w.y=c.y;}}else if(w.role==='hamal'||w.role==='burkazur'){w.path=null;w.task=null;if(!w.stack.length)w.st='idle';}}
  GRID=null;WALLC=null;fixObjs();G._dirty=false;}
function revertPlan(){const P=G.preplan;if(!P)return;G.plan=false;for(const o of G.objs){const q=P.pos[o.uid];if(q){o.x=q[0];o.y=q[1];}}G.tiles=Object.assign({},P.tiles);G.preplan=null;BG=null;GRID=null;WALLC=null;
  for(const o of G.objs){if(!P.pos[o.uid]||!validPos(o)){const a=placeAnchor(o);placeNear(o,a[0],a[1]);}}
  for(const w of G.workers){if(ROLES[w.role].st){const o=byUid(w.a);if(o){const c=craftP(o);w.x=c.x;w.y=c.y;}}else{w.path=null;w.task=null;}}fixObjs();sfx('pop');toast('Eski düzene dönüldü','Mimarın planı kaldırıldı. İstersen İnşaat\'tan yeniden uygulatabilirsin.');}
function planDirty(){if(G.plan)G._dirty=true;}
function designerCard(){cardHTML('📐 MİMAR GELDİ','Puhusoy Mimar Pergelzade','Pergeli kanadının altında, cetveli gagasında',`<p class="evl">"Dükkânın dağınık, Yavşuk efendi. Önde kasa ve teslim, kapıdan arkaya mermer koridor. Raflar kapıya yakın, müşterinin gözü önünde. Atölye arkada, her zanaat kendi sırasında: sandık, ocak, örs. Zeminini de boyarım. Beğenmezsen eski hâline dönersin."</p><p>Bedeli: <b>🪙 ${fmt(PLAN_DESIGN_COST)}</b>. Bundan sonra aldığın her şey plana göre yerleşir; dükkân büyüyünce plan da büyür.</p>`,
  [{t:'📐 Çiz bakalım',f:()=>{if(!pay(PLAN_DESIGN_COST)){modalDone();return;}G.plan=true;G.planPaid=true;applyPlan();sfx('unlock');shake=3;toast('Dükkân yeniden dizildi 📐','Beğenmezsen İnşaat sekmesinden eski düzene dönebilirsin.');save();modalDone();}},
   {t:'Sağ ol, gerek yok',sec:1,f:()=>{G.designOff=true;toast('Mimar kartını bıraktı','İstersen İnşaat sekmesinden çağırabilirsin.');modalDone();}}]);}
function buyPlan(){if(G.plan)return;if(!G.planPaid&&!pay(PLAN_DESIGN_COST))return;G.plan=true;G.planPaid=true;applyPlan();sfx('unlock');toast('Dükkân yeniden dizildi 📐','Beğenmezsen İnşaat sekmesinden eski düzene dönebilirsin.');after();}
