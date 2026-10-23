
/* ====================== SATIN ALMA ====================== */
function pay(c){if(G.nud<c){toast('Kese dar!','Bunun için '+nudStr(c)+' nüd lazım.');sfx('angry',.3);return false;}G.nud-=c;sfx('coin',.6);return true;}
function after(){if(G.plan&&G._dirty)applyPlan();G.bf=null;GRID=null;save();renderCat();updateBar();}
function addLine(prod,raw,st,rack){G.on[prod]=true;if(raw){addDef('sup_'+raw);G.sup[raw]=Math.max(G.sup[raw],4);}addDef(st);const r=addDef('rack_'+rack);if(rack!=='vitrin')r.stock[prod]=2;}
function buyLadder(id){const L=LADDER_INFO[id];if(LADDER[G.step]!==id)return;if(L.need&&G.shopLv<L.need){toast('Dükkân dar!','Önce İnşaat sekmesinden dükkânı büyüt.');return;}if(!pay(L.cost))return;
  G.step++;sfx('unlock');shake=3;
  if(id==='zirh'){addLine('zirh','yun','kece','zirh');toast('Keçe zırh atölyesi açıldı!','Yün → keçe tezgâhı → raf. Yün ısmarlamayı unutma!',{item:'zirh'});}
  else if(id==='parsomen'){addLine('parsomen','kagit','hokka','parsomen');toast('Parşömen atölyesi açıldı!','Kâğıt → hokka masası → raf.',{item:'parsomen'});}
  else if(id==='carik'){addLine('carik','deri','deri','carik');toast('Çarık atölyesi açıldı!','Deri → çarık tezgâhı → raf.',{item:'carik'});}
  else if(id==='iksir'){addLine('iksir','ot','imbik','iksir');toast('İksir imbiği kuruldu!','Otu imbiğe at, gerisini o halleder.',{item:'iksir'});}
  else if(id==='efsun'){G.on.efsun=true;addDef('efsun');addDef('rack_vitrin');toast('Efsun masası!','Bir parşömen + bir eşya koy, efsunla. Vitrine diz!',{item:'alevli'});}
  else if(id==='cam'){addLine('billur','kum','camocak','billur');toast('Cam atölyesi!','Kum → cam ocağı → billur kadeh. Efsunlarsan kehanet küresi!',{item:'billur'});for(const o of objs('st',q=>q.type==='efsun'&&!q.rec))o.rec='billur';}
  else if(id==='simya'){G.on.simya=true;addDef('simya');addDef('rack_simya');toast('Simya kazanı!','İksir + eşya = simya eşyası. Kazanın tarifini Atölye\'den seç.',{item:'zehir'});}
  else if(id==='hamal'){hireWorker('hamal');toast('Yaşruk hamal işbaşında!','Günde 20 nüd. Acıkınca aş kazanına gider.',{item:'as'});}
  else if(id==='katip'){hireWorker('katip');toast('Puhusoy kâtip kasada!','Günde 30 nüd. Satışı o yapar.',{item:'kagit'});}
  else if(id==='usta'){G.lonca=true;toast('Ustalar Loncası!','Ekip sekmesinden içeride çalışacak usta tutabilirsin.',{item:'yatagan'});}
  else if(id==='bahce'){G.bahce=true;toast('Bahçe kiracıları!','Bahçe sekmesinden avluna esnaf getirebilirsin.',{item:'dondurma'});}
  if(SELLS.filter(displayed).length>=3)achieve('uc');for(const o of objs('st',q=>ST[q.type].combo&&!q.rec))o.rec=ST[o.type].in.find(b=>b!==ST[o.type].combo&&recOK(o.type,b))||null;after();}
function hire(role){const R=ROLES[role],n=roleCount(role);
  if(R.st){if(!G.lonca)return;if(!objs('st',o=>o.type===R.st&&!G.workers.some(w=>w.a===o.uid)).length){toast('Boş tezgâh yok!','Önce Atölye\'den bir '+ST[R.st].ad.toLowerCase()+' daha al.');return;}}
  if(role==='katip'&&!objs('kasa',o=>!G.workers.some(w=>w.role==='katip'&&w.a===o.uid)).length){toast('Boş kasa yok!','Önce Atölye\'den bir kasa daha al.');return;}
  const c=Math.round(hireCost(role));if(R.max&&n>=R.max)return;if(!pay(c))return;
  hireWorker(role);sfx('unlock',.6);toast(R.ad+' işe başladı!','Günlük ücret '+wage(role)+' nüd.',{role});after();}
function hireCost(role){const R=ROLES[role],n=roleCount(role);const L=R.cost.length;return R.cost[Math.min(n,L-1)]*(R.st&&n>=L?Math.pow(2.4,n-L+1):1);}
function sellRefund(type){const n=objs('st',o=>o.type===type).length;return Math.round(ST[type].cost*(1+.7*(n-1))*.5);}
function sellStation(type){const list=objs('st',o=>o.type===type);if(list.length<=1){toast('Son tezgâh satılmaz','Bu üretim hattının tek tezgâhı. Önce bir tane daha olmalı.');return;}
  const score=o=>(G.workers.some(w=>w.a===o.uid)?100:0)+o.inp.length+o.out.length+o.fin.length;const o=list.sort((a,b)=>score(a)-score(b))[0];const ref=sellRefund(type);
  const back=o.inp.concat(o.out,o.fin.map(f=>f.id));let lost=0;for(const id of back){if(IT[id].raw){G.sup[id]=(G.sup[id]||0)+1;continue;}const r=objs('rack',r=>rackAccepts(r,id)&&rackN(r)<rackCap(r))[0];if(r){r.stock[id]=(r.stock[id]||0)+1;continue;}const d=depoFor(id);if(d){d.stock[id]=(d.stock[id]||0)+1;continue;}lost++;}
  const us=G.workers.filter(w=>w.a===o.uid);G.workers=G.workers.filter(w=>w.a!==o.uid);G.objs=G.objs.filter(x=>x!==o);G.nud+=ref;GRID=null;
  sfx('coin');toast(ST[type].ad+' satıldı','🪙 '+nudStr(ref)+' geri geldi.'+(us.length?' Ustası da işten ayrıldı.':'')+(lost?' '+lost+' mal sığmadı, gitti.':''),{st:type});after();}
function buyStation(type){const n=objs('st',o=>o.type===type).length;const c=Math.round(ST[type].cost*(1+.7*n));if(!pay(c))return;const S=SHOP();
  const tmp={k:'st',type};G.objs.push(tmp);const a=placeAnchor(tmp);G.objs.pop();const o=mkObj({k:'st',type},a[0],a[1]);if(!validPos(o))placeNear(o,S.ex,S.y1-160);toast(ST[type].ad+' eklendi!','Düzenle ile istediğin yere taşı.',{st:type});after();}
function stationCost(type){return Math.round(ST[type].cost*(1+.7*objs('st',o=>o.type===type).length));}
function buyRack(item){const n=objs('rack').length;const c=150+60*n;if(!pay(c))return;{const tmp={k:'rack',item};G.objs.push(tmp);const a=placeAnchor(tmp);G.objs.pop();mkObj({k:'rack',item},a[0],a[1]);}toast('Yeni raf!','Düzenle ile taşı.',{item:item==='vitrin'?'alevli':item});after();}
function buyKasa(){const n=objs('kasa').length;const c=1500*n;if(!pay(c))return;{const tmp={k:'kasa'};G.objs.push(tmp);const a=placeAnchor(tmp);G.objs.pop();mkObj({k:'kasa'},a[0],a[1]);}toast('Yeni kasa!','Bir kâtip daha tutabilirsin.',{item:'kagit'});after();}
function buyRackUpg(){const l=G.rackLv;if(l>=RACK_UPC.length||!pay(RACK_UPC[l]))return;G.rackLv++;toast('Raflar genişledi!','Her raf artık '+rackCap()+' alır.',{item:'yatagan'});after();}
function buyStUpg(t){const l=G.stLv[t];if(l>=ST_UPC.length||!pay(Math.round(ST_UPC[l]*(ST[t].cost/500))))return;G.stLv[t]++;toast(ST[t].ad+' büyüdü!','Giriş '+inCap(t)+', çıkış '+outCap(t)+'.',{st:t});after();}
function stUpgCost(t){const l=G.stLv[t];return l>=ST_UPC.length?0:Math.round(ST_UPC[l]*(ST[t].cost/500));}
function buySupUpg(r){const l=G.supLv[r];if(l>=SUP_CAPS.length-1||!pay(SUP_UPC[l]))return;G.supLv[r]++;toast('Sandık büyüdü!',IT[r].ad+' sandığı artık '+supCap(r)+' alır.',{item:r});after();}
function buyUpg(k){const U0=UPG[k],l=G.upg[k];if(l>=U0.max||!pay(U0.cost[l]))return;G.upg[k]++;sfx('unlock',.6);toast(U0.ad+' '+(l+1)+'. seviye!',U0.desc(l),{item:U0.ic});after();}
function buyQual(id){const l=G.qual[id];if(l>=QMAX||!pay(qcost(id,l)))return;G.qual[id]++;sfx('unlock',.6);toast(IT[id].ad+': '+QN[l+1]+'!','Fiyat '+price(id)+' nüd.',{item:id});if(G.qual[id]>=4)achieve('efsane');after();}
function buySkill(k,s){const l=G.skill[k][s];if(l>=3||!pay(SKCOST[l]))return;G.skill[k][s]++;sfx('unlock',.5);toast(SKILL[k][s][0]+' '+(l+1)+'. seviye','Ücretler günde 4 nüd arttı.',{item:'as'});after();}
function buyShop(){const l=G.shopLv;if(l>=SHOP_COST.length||!pay(SHOP_COST[l]))return;G.shopLv++;WALLC=null;GRID=null;BG=null;fixObjs();if(G.plan)G._dirty=true;sfx('unlock');shake=5;toast('Dükkân büyüdü! 🏗','Yeni alan açıldı, daha çok müşteri sığar.',{item:'kulce'});if(G.shopLv>=SHOP_COST.length)achieve('buyuk');after();}
function buyHouse(){const l=G.houseLv;if(l>=3||!pay(HOUSE_COST[l]))return;G.houseLv++;syncBed();WALLC=null;GRID=null;BG=null;fixObjs();sfx('unlock');toast('Ev yükseldi: '+HOUSE_LV[G.houseLv].ad,'Daha derin uyku, daha hızlı sabah.',{item:'as'});if(G.houseLv>=3)achieve('konak');after();}
function buySec(id){if(G.sec[id]||!pay(SEC[id].cost))return;G.sec[id]=1;toast(SEC[id].ad+' kuruldu!',SEC[id].desc);after();}
function buyKiosk(kind){if(!G.bahce||findObj('kiosk',o=>o.kind===kind)||!pay(KIOSK[kind].cost))return;const o=addDef('kiosk_'+kind);toast(KIOSK[kind].ad+' geldi!','Bahçende tezgâh açtı. Komisyonun %'+Math.round(KOM[G.kom]*100)+'.',{item:KIOSK[kind].item});camLock=false;CAMT={x:o.x,y:o.y-40};setTimeout(()=>{CAMT=null;camLock=true;},2200);after();}
function buyKioskUp(kind){const l=G.kioskLv[kind]||0;if(l>=KIOSK_UP.length||!findObj('kiosk',o=>o.kind===kind)||!pay(KIOSK_UP[l]))return;G.kioskLv[kind]=l+1;sfx('unlock');toast(KIOSK[kind].ad+': '+KIOSK_LVN[l+1]+'!','Fiyatlar ×'+KIOSK_MUL[l+1]+', günlük kira '+nudStr(KIOSK_RENT[l+1])+' nüd.',{item:KIOSK[kind].item});after();}
function setRec(uid,b){const o=byUid(uid);if(!o||!recOK(o.type,b))return;if(o.rec!==b){const S0=ST[o.type];const back=o.inp.filter(x=>x!==S0.combo);o.inp=o.inp.filter(x=>x===S0.combo);for(const x of back){const r=rackFor(x,o);if(r&&rackAccepts(r,x))r.stock[x]=(r.stock[x]||0)+1;}o.rec=b;sfx('pop');save();renderCat();}}
function buyKom(){const l=G.kom;if(l>=2||!pay(KOMC[l]))return;G.kom++;toast('Kira sözleşmesi yenilendi','Komisyon artık %'+Math.round(KOM[G.kom]*100)+'.');after();}
function buyYardTiles(){if(G.yardTiles||!pay(2000))return;G.yardTiles=true;toast('Avlu döşemesi açıldı!','Düzenle → Zemin ile avluyu da döşeyebilirsin.');after();}
function buyDream(){if(G.dream||G.nud<DREAM)return;G.nud-=DREAM;G.dream=true;G.endStage=1;closeCat();save();
  showDialog(["Kervancıbaşı söz verdi: Sürtünkaya'ya gidip Dermansur'un arka kapısından ailemi kaçıracak!","Annem, babam, kız kardeşim... Yemin yerine geliyor!"],()=>{startFamCut();});}
function buyDeco(id){const D=DECO[id];if(G.nud<D.price){toast('Kese dar!','');return;}
  const o={uid:G.uid++,k:'deco',d:id,x:G.p.x,y:G.p.y+40};
  if(!placeNear(o,G.p.x,G.p.y+50)){const S=SHOP();const z=D.where.split(' ')[0];const tx=z==='home'?HOUSE().dx:z==='out'?1300:S.ex,ty=z==='home'?HOUSE().y1-60:z==='out'?S.y1+120:S.y1-120;
    if(!placeNear(o,tx,ty)){toast('Yer kalmadı!','Önce biraz düzenle.');return;}}
  G.nud-=D.price;G.objs.push(o);GRID=null;G.bf=null;sfx('sparkle');closeCat();setEdit(true);sel=o;camLock=false;camX=o.x;camY=o.y-30;
  toast(D.ad+' alındı!','Sürükleyip yerleştir, sonra "Bitti".',{deco:id});save();updateBar();}
function tellalCost(race){return Math.round(Math.max(race?90:70,avgEarn()*(race?.16:.12))/10)*10;}
function buyTellal(race){const c=tellalCost(race);if(!pay(c))return;sfx('chime');
  if(race){G.tellalRaceNext=race;toast('Tellal yollandı!',RACE_INTRO[race][0]+' mahallesinde dükkânın bağırılacak.');}
  else{G.tellalNext=true;toast('Tellal tutuldu!','Yarın bütün pazar dükkânını konuşacak.');}save();renderCat();}
function changeOrder(r,d){const pr=rawPrice(r),cur=G.order[r];
  if(d>0){const room=supCap(r)-G.sup[r]-cur;const n=Math.min(d,room);if(n<=0){toast('Sandık dolar!','Sandığa '+supCap(r)+' taneden fazlası sığmaz.');return;}if(G.nud<pr*n){toast('Kese dar!','Bu kadarına nüdün yetmiyor.');return;}
    G.nud-=pr*n;G.order[r]+=n;G.orderSpent+=pr*n;sfx('coin',.6);}
  else{const n=Math.min(-d,cur);if(n<=0)return;G.nud+=pr*n;G.order[r]-=n;G.orderSpent-=pr*n;sfx('drop',.5);}
  if(G.story===1&&G.order.kulce>0)G.story=2;
  renderCat();updateBar();save();}

function buyKervan(){const l=G.kervan;if(l>=KERVAN.length||!pay(KERVAN[l].cost))return;G.kervan++;sfx('unlock');toast('Kervan ortaklığı!','Uçmakan kervanlarından her akşam '+nudStr(kervanPay())+' nüd pay gelecek.',{item:'yatagan'});after();}
