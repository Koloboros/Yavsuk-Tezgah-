
/* ====================== KODEKS ====================== */
const KODEKS={
  insan:"Ejderhayı da kızartsın, akşam yemeğini de. İnsan iki işi tek kılıçla görmek ister.",
  ucmakan:"Atına giydirmeye kıyamaz, kendine alır. Sonra atının yüzüne bakamaz.",
  yasruk:"Göz pınarları taşar, iksir içer. İksir de acıdır, yine ağlar. Bir iksir daha alır.",
  puhusoy:"Okumaz, tasnif eder. Üç nüsha alır: biri dosyaya, biri kayda, biri kaydın kaydına.",
  gaksoy:"Kendi sesi yok ama ayağının sesi olsun istiyor: vıııın!",
  pullukul:"Pulları ağarmadan içerse ömür, ağardıktan sonra içerse moral.",
  zerksoy:"Isıyı görür, alevi koklar. Bu kılıç onun için hem silah hem şömine.",
  tirmik:"Zaten sessiz yürür. Daha da sessiz yürümek ister. Nedenini kimse sormaz; sorsa da cevap gelmez."
};
const kod=document.getElementById('kodeks'),kodC=document.getElementById('kodC');let kodPrev=false;
let kodTab='mus';
function openKodeks(){if(MODE!=='game')return;if(kod.classList.contains('hidden')){kodPrev=paused;}paused=true;bar.style.display='none';
  const nl=LORE_ORDER.filter(k=>G.lore&&G.lore[k]).length;
  let h=`<h2>📜 Kodeks</h2><div class="ktab"><button data-k="mus" class="${kodTab==='mus'?'on':''}">Müşteriler</button><button data-k="lore" class="${kodTab==='lore'?'on':''}">Oro Bilgisi ${nl}/${LORE_ORDER.length}</button></div>`;
  if(kodTab==='lore'){h+=`<div class="d" style="margin-bottom:6px">Pazarda olup biten her şey bir sayfa açar.</div>`;
    for(const k of LORE_ORDER){const L=LORE[k];h+=G.lore&&G.lore[k]?`<div class="lore"><div class="n">${L[0]} ${L[1]}</div><p>${L[2]}</p></div>`:`<div class="lore" style="opacity:.5"><div class="n">? ? ?</div><p>Bu sayfa henüz açılmadı.</p></div>`;}}
  else{h+=`<div class="d" style="margin-bottom:8px">İdiz'in müşteri defteri. Favorisini bulan %25 fazla öder.</div>`;
  for(const r of RACE_IDS){const P=PREF[r],seen=G.seen[r];
    h+=seen?`<div class="kod"><img src="${raceThumb(r)}"><div><div class="n">${RACE_INTRO[r][0]} <span class="fav"><img src="${itemThumb(P.fav)}">${IT[P.fav].ad}</span></div><div class="q">“${KODEKS[r]}”</div></div></div>`
      :`<div class="kod" style="opacity:.55"><div class="unk">?</div><div><div class="n">???</div><div class="q">Henüz dükkânına uğramadı.</div></div></div>`;}}
  kodC.innerHTML=h+`<button class="btn" id="kodX">Kapat</button>`;document.getElementById('kodX').onclick=closeKodeks;kodC.querySelectorAll('.ktab button').forEach(b=>b.onclick=()=>{kodTab=b.dataset.k;openKodeks();kodC.scrollTop=0;});kod.classList.remove('hidden');sfx('pop',.6);}
function closeKodeks(){kod.classList.add('hidden');paused=kodPrev;updateBar();}
document.getElementById('zKod').onclick=openKodeks;

/* ====================== 7'NİN GÜNÜ: D20 ====================== */
const TIERN=['KRİTİK FELAKET','Başarısız','Olağan','Başarılı','KRİTİK BAŞARI!'];const GOD_DC={'Tırnavüll':10,'Akrebgan':12,'Arras':11,'Gülgezen':13,'Komaytar':11,'Şehilah':12,'Verruhail':12};
const EVENTS=[
  {god:'Tırnavüll',gen:"Tırnavüll'ün",alan:'Zamanın Anası',lore:'Gövdesi zaman aktıkça şişen ulu ana bugün pazara bakıyor. Zehri tatlı mı akacak, acı mı?',
    r:['Ana gözünü kırptı, kum saati devrildi! Bugün gün 25 saniye kısa.','Zehir acı aktı. Bugün gün 15 saniye kısa.','Zaman bildiği gibi akıyor. Yaşlı ana esnedi, o kadar.','Ana gülümsedi: bugün gün 30 saniye uzun!','Tırnavüll emzirdi! Gün 60 saniye uzun, tezgâhlar %25 hızlı.'],
    f:[{day:-25},{day:-15},{},{day:30},{day:60,craft:.75}]},
  {god:'Akrebgan',gen:"Akrebgan'ın",alan:'Açlığın Piri',lore:'İlk uyanan, doymak bilmeyen. Altı bacaklı açlık bugün kimin ambarına girecek?',
    r:['Altı bacaklı bir gölge ambara girdi: sandıklardaki malın yarısı kemirildi!','Ambarda tıkırtı... Sandıklardan %20 eksildi.','Akrebgan Yaşrukları rakip görür ama bugün başka yere baktı.','Hırs müşterilere bulaştı: bugün herkes fazladan alır!','Doymak bilmez kalabalık! Müşteri iki kat, toplu alım bol.'],
    f:[{raw:.5},{raw:.2},{},{qty:.4},{cust:2,qty:.6}]},
  {god:'Arras',gen:"Arras'ın",alan:'Dengeyi Kuran',lore:'Mabetlerine bir şey istemek için değil, istememeyi öğrenmek için tırmanılır.',
    r:['Arras dengeyi kurdu: kesenin fazlası dağlara adandı. Neredeyse bir günlük kazanç gitti.','Müşteriler istememeyi öğrendi. Bugün %35 daha az müşteri.','Terazi dengede. Arras memnun, sen kararsız.','Çalışanların da istememeyi öğrendi: ücretler yarı yarıya, üstüne Arras mabedinden bir kese!','Kusursuz denge: bugün ne ücret var ne Yurt payı, üstüne bir günlük kazanç kadar adak geri döndü!'],
    f:[{tax:.9},{cust:.65},{},{wage:.5,gift:.4},{wage:0,yurt:0,gift:1}]},
  {god:'Gülgezen',gen:"Gülgezen'in",alan:'İki Yüzlülüğün İlahı',lore:'Her duayı iki manada birden kabul eder. Ne istediğini değil, ne istemediğini say.',
    r:['İki yüzlü bir tellal dedikodu yaydı: "İdiz\'in yatağanları tahta!" Bugün fiyatlar %30 düşük.','Duan ters manada kabul edildi. Bugün fiyatlar %15 düşük.','Gülgezen hem evet dedi hem hayır. Ne anladıysan o.','Müşteriler malını olduğundan şahane gördü: fiyatlar %30 yüksek!','Gülgezen\'in sanatı dükkâna sindi: fiyatlar %60 yüksek, bahşiş bol!'],
    f:[{price:.7},{price:.85},{},{price:1.3},{price:1.6,tip:.2}]},
  {god:'Komaytar',gen:"Komaytar'ın",alan:'Anlamın Özü',lore:'Divanın tek kızı, inciye manasını veren kaynak. Şairler adını hep unutur.',
    r:['Anlam sızdı. Ustalar "bu çekiç neydi?" diye bakıyor: üretim %40 yavaş.','Bir parça anlam kayboldu: üretim %20 yavaş.','Komaytar adını duydu ama gelmedi. Şairler yine unuttu.','Anlam yağdı: bugün bütün üretim %35 hızlı!','Komaytar dokundu! Bir ürünün kalitesi bedavaya bir kademe arttı.'],
    f:[{craft:1.4},{craft:1.2},{},{craft:.65},{qual:1,craft:.8}]},
  {god:'Şehilah',gen:"Şehilah'ın",alan:'Kılıcın ve Cengin Hâkimi',lore:'Yol kenarlarındaki adak taşları onundur. Bugün taşın önünden geçerken ne bırakacaksın?',
    r:['Adak taşı devrildi! Şehilah raflardaki silahların yarısını adak aldı.','Taşa adak bırakmak gerekti: keseden biraz eksildi.','Uzaktan cenk davulları duyuldu, sonra sustu.','Sefer var! İnsan ve Uçmakan maceracılar akın akın geliyor.','Büyük sefer ilanı! Silah ve zırhlar %80 pahalı, maceracılar kapıda.'],
    f:[{swords:.5},{tax:.35},{},{race:{insan:3,ucmakan:3}},{race:{insan:3,ucmakan:3},cat:{yatagan:1.8,alevli:1.8,zirh:1.8,tilsim:1.8}}]},
  {god:'Verruhail',gen:"Verruhail'in",alan:'Gölgelerde Gülen',lore:'Kavgadan azade, dört boynuzlu ejderân suretinde dolaşır. Gölgeler bugün kimin dükkânına bakıyor?',
    r:['Gölgelerden biri uyandı: bu gece iki hırsız birden gelecek!','Bu gece bir hırsızın gelmesi kesin.','Gölgeler kıpırdadı, sonra uykuya döndü.','Verruhail kardeş kavgasıyla meşgul: 7 gün hırsız yok!','Ejderânın gölgesi pazarın üstünden geçti: 17 gün hırsız yok!'],
    f:[{thief:2},{thief:1},{},{safe:7},{safe:17}]}
];
const evc=document.getElementById('event'),evCard=document.getElementById("evC");
function tierOf(n,dc){dc=dc||11;return n===1?0:n===20?4:n>=dc?3:1;}
function dcHTML(dc,lbl){return `<div class="dc">${lbl||'Zorluk Sınıfı'} <b>ZS ${dc}</b><span>${dc}+ başarı · 1 felaket · 20 kritik</span></div>`;}
function d20svg(n,cls){return `<svg class="d20 ${cls||''}" viewBox="0 0 100 100"><polygon points="50,4 92,28 92,72 50,96 8,72 8,28" fill="#c9463d" stroke="#4a3226" stroke-width="4" stroke-linejoin="round"/><polygon points="50,24 76,66 24,66" fill="#e0604f" stroke="#4a3226" stroke-width="3" stroke-linejoin="round"/><path d="M50 24L50 4M50 24L8 28M50 24L92 28M24 66L8 28M24 66L8 72M24 66L50 96M76 66L92 28M76 66L92 72M76 66L50 96" stroke="#4a3226" stroke-width="2.5" fill="none"/><text x="50" y="58" text-anchor="middle" font-family="Lilita One,Fredoka,sans-serif" font-size="${n>=10?20:23}" fill="#fff7e6" stroke="#4a3226" stroke-width="1.2">${n}</text></svg>`;}
function showEvent(){const E=EVENTS[Math.floor(G.day/10)%7];unlockLore('yedi');
  if(AUTOPLAY){const fin=clamp(1+Math.floor(Math.random()*20)+BF().d20,1,20);applyEvent(E.f[tierOf(fin,GOD_DC[E.god])]);modalDone();return;}
  evCard.innerHTML=`<div class="evh">✦ ${G.day}. GÜN · YEDİNİN GÜNÜ ✦</div><h2>${E.god}</h2><div class="evs">${E.alan}</div><p class="evl">${E.lore}</p><div id="evDie">${d20svg(20)}</div>${dcHTML(GOD_DC[E.god],E.gen+' sınavı')}<div id="evR"></div><button class="btn" id="evB">🎲 Zarı At</button>`;
  evc.classList.remove('hidden');sfx('chime',.7);
  document.getElementById('evB').onclick=()=>rollEvent(E);}
function rollEvent(E){const b=document.getElementById('evB');b.disabled=true;b.style.opacity=.5;const die=document.getElementById('evDie');let k=0;const raw=1+Math.floor(Math.random()*20),bon=BF().d20||0,fin=raw===1?1:clamp(raw+bon,1,20);
  const iv=setInterval(()=>{k++;const n=k<14?1+Math.floor(Math.random()*20):fin;die.innerHTML=d20svg(n,'spin');sfx('tick',.5);
    if(k>=14){clearInterval(iv);die.innerHTML=d20svg(fin,'land');const t=tierOf(fin,GOD_DC[E.god]);applyEvent(E.f[t]);
      document.getElementById('evR').innerHTML=`<div class="tier t${t}">${TIERN[t]} · ${fin}${bon&&raw>1?` <span style="font-size:12px">(${raw}+${bon} adak)</span>`:''}</div><p>${E.r[t]}</p>`;
      sfx(t>=3?'unlock':t===2?'pop':'angry',.8);if(t===4||t===0)shake=5;
      b.disabled=false;b.style.opacity=1;b.textContent='Devam ▸';b.onclick=()=>{save();modalDone();};}},85+k*6);}
function applyEvent(f){const ev=G.ev={};if(!f)return;
  if(f.day)ev.day=f.day;if(f.craft)ev.craft=f.craft;if(f.qty)ev.qty=f.qty;if(f.cust)ev.cust=f.cust;if(f.price)ev.price=f.price;if(f.tip)ev.tip=f.tip;if(f.wage!=null)ev.wage=f.wage;if(f.yurt!=null)ev.yurt=f.yurt;if(f.race)ev.race=f.race;if(f.cat)ev.cat=f.cat;
  if(f.raw){for(const r of RAWS)G.sup[r]=Math.floor(G.sup[r]*(1-f.raw));}
  if(f.tax){const v=Math.min(Math.round(G.nud*.5),Math.round(WE()*f.tax/10)*10);G.nud-=v;G.today.ozel-=v;toast('Adak','Keseden '+nudStr(v)+' nüd gitti.');}
  if(f.gift){const v=gainW(f.gift);G.today.ozel+=v;toast('İlahi bereket','Keseye '+nudStr(v)+' nüd girdi.');}
  if(f.swords){for(const r of objs('rack'))for(const id of ['yatagan','alevli'])if(r.stock[id])r.stock[id]=Math.floor(r.stock[id]*(1-f.swords));}
  if(f.qual){const c=BASES.filter(b=>G.on[b]&&G.qual[b]<QMAX);if(c.length){const b=rnd(c);G.qual[b]++;toast('Komaytar dokundu!',IT[b].ad+': '+QN[G.qual[b]]+'!',{item:b});if(G.qual[b]>=4)achieve('efsane');}else ev.craft=.65;}
  if(f.thief)G.thiefForce=f.thief;if(f.safe)G.noThiefUntil=G.day+f.safe-1;}

/* ====================== MODAL KUYRUĞU ====================== */
const MQ=[];let mqOn=false;
function queueModal(fn){MQ.push(fn);if(!mqOn)nextModal();}
function nextModal(){const f=MQ.shift();if(!f){mqOn=false;evc.classList.add('hidden');paused=false;updateBar();return;}mqOn=true;paused=true;bar.style.display='none';f();}
function modalDone(){evc.classList.add('hidden');if(AUTOPLAY)nextModal();else setTimeout(nextModal,60);}
function cardHTML(head,title,sub,body,btns){if(AUTOPLAY){const ok=btns.filter(b=>!b.dis);const b=(ok.length?ok:btns)[Math.floor(Math.random()*(ok.length||btns.length))];b.f();return;}
  evCard.innerHTML=`<div class="evh">${head}</div><h2>${title}</h2>${sub?`<div class="evs">${sub}</div>`:''}${body}<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">${btns.map((b,i)=>`<button class="btn ${b.sec?'sec':''}" data-b="${i}" style="${b.sec?'background:#fff7e6':''}">${b.t}</button>`).join('')}</div>`;
  evc.classList.remove('hidden');sfx('chime',.6);evCard.querySelectorAll('[data-b]').forEach(el2=>el2.onclick=()=>{sfx('pop',.6);btns[+el2.dataset.b].f();});}
function itemsHTML(list){return `<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin:8px 0">${list.map(([id,n,ok])=>`<div style="background:#fffdf6;border:2px solid #4a3226;border-radius:12px;padding:4px 8px;display:flex;align-items:center;gap:4px;font:700 13px Fredoka,sans-serif${ok===false?';opacity:.5':''}"><img src="${itemThumb(id)}" style="width:28px;height:28px">${n!=null?'×'+n:''} ${ok===true?'✔':ok===false?'✘':''}</div>`).join('')}</div>`;}

/* ====================== BÜYÜK SİPARİŞLER ====================== */
const FACTIONS=[['Uçmakan Kervanı',0,0],['Pâyendegan Elçiliği',6,-4],['Gökmızrak Alayı',6,-4,'gokmizrak'],['Azman Ocakları Levazımı',-4,7,'azman'],['Uykusuzlar Tarikatı',-2,5,'uykusuzlar'],['Küfkent Tuz Tüccarları',0,0],['Sürtünkaya Kaçakçıları',-3,-3]];
function facOf(n){return FACTIONS.find(f=>f[0]===n)||[n,0,0];}
function makeOffer(){const on=onSells();if(!on.length)return null;const w=on.map(id=>Math.sqrt(price(id)));let t=w.reduce((a,b)=>a+b,0),r=Math.random()*t,item=on[0];for(let i=0;i<on.length;i++){r-=w[i];if(r<=0){item=on[i];break;}}
  const need=clamp(Math.round(5+G.day/4+G.shopLv*2),5,40);const due=G.day+(need>20?3:2);const fac=rnd(G.day<15?FACTIONS.filter(f=>!f[1]&&!f[2]):FACTIONS);return{from:fac[0],item,need,got:0,due,reward:Math.round(price(item)*need*2.4/10)*10};}
function offerCard(){const O=G.offer;const F0=facOf(O.from);if(F0[3])unlockLore(F0[3]);const dd=dipOn()&&(F0[1]||F0[2]);
  cardHTML('📜 BÜYÜK SİPARİŞ',O.from,'Teslim: '+(O.due-G.day)+' gün içinde',`<p class="evl">"${IT[O.item].ad} lazım, hem de çok. Teslim sandığına bırak, parası peşin."</p>`+itemsHTML([[O.item,O.need]])+`<p>Ödül: <b>🪙 ${nudStr(O.reward)}</b> <span class="d">(rafta satışın 2,4 katı)</span></p>`+(dd?`<p class="d">Bu siparişi kabul edersen: ${F0[1]>0?'♛ Sultan onaylar':F0[1]<0?'♛ Sultan hoşlanmaz':''} ${F0[2]>0?'· 🐸 Haşmetşah onaylar':F0[2]<0?'· 🐸 Haşmetşah hoşlanmaz':''}</p>`:''),
  [{t:'Kabul ✔'+(dd?dipBadge(F0[1],F0[2]):''),f:()=>{if(dd)dipShift(F0[1],F0[2],O.from);G.contract=G.offer;G.offer=null;if(!findObj('teslim'))addDef('teslim');toast('Sipariş kabul edildi!','Teslim sandığına '+G.contract.need+' '+IT[G.contract.item].ad.toLowerCase()+' bırak. Hamallar da taşır.',{item:G.contract.item});save();modalDone();}},
   {t:'Geç',sec:1,f:()=>{G.offer=null;modalDone();}}]);}
function deliver(id){const C=G.contract;if(!C||C.item!==id||C.got>=C.need)return false;C.got++;const t=findObj('teslim');if(t)floatTxt(t.x,t.y-40,C.got+'/'+C.need,'#9df07a',12);
  if(C.got>=C.need){G.nud+=C.reward;G.today.kontrat+=C.reward;hudPop=1;sfx('unlock');shake=3;toast('Sipariş tamam! 📜',C.from+' '+nudStr(C.reward)+' nüd ödedi.',{item:C.item});if(t)for(let i=0;i<20;i++)fx('star',t.x,t.y-30,{vx:(Math.random()-.5)*160,vy:-80-Math.random()*90,t:1.1});G.contract=null;G.rep=(G.rep||0)+1;}
  return true;}
function contractDayEnd(){const C=G.contract;if(!C||G.day<C.due)return;const part=Math.round(C.reward*.3*C.got/C.need);G.nud+=part;G.today.kontrat+=part;toast('Sipariş süresi doldu',C.from+' teslim edileni yarı fiyata aldı: '+nudStr(part)+' nüd.');G.contract=null;}

/* ====================== ÖZEL ZİYARETLER ====================== */
function specialFor(d){if(d%10===7)return null;if(G&&G.endStage>=1&&!(d>=12&&(d-12)%23===0))return null;if(G&&G.endStage>=1)return 'reis';if(d>=44&&(d-44)%50===0)return 'hasmet';if(d>=24&&(d-24)%40===0)return 'sultan';if(d>=12&&(d-12)%23===0)return 'reis';return null;}
const SP_NAME={reis:'Uçmakan Reisi\'nin Denetimi',sultan:'Pâyendegan Sultanı\'nın Ziyareti',hasmet:'Dermançöl Haşmetşahı Geliyor!'};
function nextMark(){let best=null;for(let k=0;k<=12;k++){const d=G.day+k;if(d%10===7&&k>0){best={k,t:EVENTS[Math.floor(d/10)%7].gen+' Günü'};break;}const sp=specialFor(d);if(sp&&k>0){best={k,t:SP_NAME[sp]};break;}}return best;}
function sultanWish(){const on=onSells().slice().sort((a,b)=>price(b)-price(a));const pick=[];const pool=on.slice(0,Math.max(3,Math.ceil(on.length*.6)));while(pick.length<Math.min(3,pool.length)){const x=rnd(pool);if(!pick.includes(x))pick.push(x);}
  const q=clamp(2+Math.floor(G.day/12),2,14);return pick.map(id=>[id,q]);}
function announceCard(){const S0=G.sched;let body='';
  if(S0.type==='sultan')unlockLore('payendegan');if(S0.type==='hasmet')unlockLore('dermancol');
  if(S0.type==='reis')body=`<p class="evl">"Agreguk'ta kanun yazılmaz, adalet kendiliğinden bilinir. Reis dükkânları gezecek: müşterin mutlu mu, rafların dolu mu, çalışanın tok mu?"</p><p class="d">Denetim günü: ✔ az kaçan müşteri · ✔ boş raf yok · ✔ mani okuyan aç hamal yok · ✔ favorisini bulan müşteriler</p>`;
  else if(S0.type==='sultan')body=`<p class="evl">"Hesap adamı Sultan Mirzinkul Bellini, alayıyla Agreguk'a uğrayacak. Ölçüsüz olanı sevmez; istediği tam olsun."</p><p>Sultanın istekleri:</p>${itemsHTML(S0.wish)}<p class="d">O gün raflarında bunlar hazır olsun. Tamamı varsa üç kat öder, üstüne hil'at (bir buçuk günlük kazanç) ve Sultan Beratı verir.${dipOn()&&G.dip.s<=25?' <b style="color:#c9463d">Pâyendegan sana küs: Sultan bu gidişle dükkânına uğramayabilir!</b>':''}</p>`;
  else body=`<p class="evl">"Haşmetşah Tospar Han, dev kurbağası Mahir'in sırtında Agreguk'a geliyor! Haşmetşahın sözü kanun, gazabı ölüm..."</p><p>İdiz: <b>"Ben... firariyim. Ya beni tanırsa?!"</b></p><p class="d">O sabah ne yapacağına karar vereceksin.</p>`;
  cardHTML('📯 HABER · '+(S0.day-G.day)+' GÜN SONRA',SP_NAME[S0.type],'',body,[{t:'Hazırlanalım!',f:modalDone}]);}
function spawnVIP(type){const S=SHOP();const v=[];const base={x:S.ex,y:WH+30,dir:1,walk:0,moving:false,seed:5,look:0,path:null,st:'in',t:0};
  if(type==='sultan'){v.push(Object.assign({},base,{kind:'sultan',skin:SPEC.sultan.skin}));v.push(Object.assign({},base,{kind:'muhafiz',x:S.ex-30,y:WH+60,skin:SPEC.muhafiz.skin,seed:6}));v.push(Object.assign({},base,{kind:'muhafiz',x:S.ex+30,y:WH+60,skin:SPEC.muhafiz.skin,seed:7}));
    v.forEach((q,i)=>{q.path=findPath(q.x,q.y,S.ex+(i-1)*40*(i?1:0)+(i===2?40:i===1?-40:0),S.y1-180-(i?0:20));});}
  else if(type==='reis'){const q=Object.assign({},base,{kind:'reis',skin:SPEC.reis.skin,hair:'#f2ead8',stops:4});q.path=findPath(q.x,q.y,S.ex,S.y1-140);v.push(q);}
  else if(type==='hasmet'){const q=Object.assign({},base,{kind:'hasmet',skin:SPEC.hasmet.skin});q.path=[[S.ex+120,S.y1+120]];v.push(q);}
  G.vips=v;}
function vipTick(dt){if(!G.vips)return;const S=SHOP();
  for(const q of G.vips){if(q.bub){q.bub.t-=dt;if(q.bub.t<=0)q.bub=null;}
    if(q.st==='in'){if(follow(q,q.kind==='hasmet'?55:62,dt)){q.st='here';q.t=0;
        if(q.kind==='sultan'){queueModal(sultanVisit);}
        if(q.kind==='hasmet'){say(q,rnd(['Bu dükkân... tanıdık kokuyor.','Mahir, yala bakalım şu tezgâhı!','Kim bu diz boyu esnaf?']),3);sfx('angry',.3);}
        if(q.kind==='reis')say(q,'Hmm. Bakalım...',2);}}
    else if(q.st==='here'){q.t+=dt;
      if(q.kind==='reis'){if(q.t>3&&q.stops>0){q.stops--;q.t=0;const rs=objs('rack');const r=rs.length?rnd(rs):null;if(r){q.path=findPath(q.x,q.y,r.x,fpOf(r)[3]+30);q.st='in';say(q,rnd(['Raf dolu mu?','Fiyat adil mi?','Hamalın karnı tok mu?','Müşteri güler yüz görüyor mu?']),2.4);}}
        else if(q.t>3&&q.stops<=0){q.st='out';q.path=findPath(q.x,q.y,S.ex,WH+40);}}
      else if(q.kind==='hasmet'&&q.t>9){q.st='out';q.path=[[S.ex+200,WH+40]];}
      else if(q.kind==='sultan'||q.kind==='muhafiz'){if(G.vipLeave){q.st='out';q.path=findPath(q.x,q.y,S.ex,WH+40);}}}
    else if(q.st==='out'){follow(q,70,dt);}}
  G.vips=G.vips.filter(q=>!(q.st==='out'&&q.y>=WH+20));if(!G.vips.length)G.vips=null;}
function takeFromRacks(id,n){let got=0;for(const r of objs('rack',r=>rackAccepts(r,id)).concat(objs('depo'))){const k=Math.min(n-got,r.stock[id]||0);r.stock[id]=(r.stock[id]||0)-k;got+=k;if(got>=n)break;}return got;}
function sultanVisit(){unlockLore('mirzinkul');const WL=G.sched.wish;const res=WL.map(([id,n])=>[id,n,takeFromRacks(id,n)]);let pay=0,full=true,gotN=0,needN=0;for(const [id,n,g] of res){pay+=price(id)*g*3;gotN+=g;needN+=n;if(g<n)full=false;}
  let extra='';const fav=dipOn()&&G.dip.s>=70;
  if(full){const hil=Math.round(WE()*1.5*(fav?1.5:1)/10)*10;pay+=hil;G.berat=Math.min(3,(G.berat||0)+1);dipShift(8,0,'Sultanın memnuniyeti');extra=`<p>Hil'at: <b>🪙 ${nudStr(hil)}</b>${fav?' (Pâyendegan himayesi ×1,5)':''}</p><p><b>📜 Sultan Beratı!</b> Bütün fiyatların kalıcı olarak %5 arttı (toplam %${G.berat*5}). Şöhretin yükseldi.</p>`;sfx('unlock');shake=4;}
  else if(gotN<needN/2){const fine=Math.round(WE()*.5/10)*10;pay-=fine;dipShift(-8,0,'Ölçüsüz dükkân');extra=`<p style="color:#c9463d">"Ölçüsüz, eksik! Bu Pâyendegan'a hakarettir." Ölçüsüzlük cezası: <b>−🪙 ${nudStr(fine)}</b></p>`;}
  pay=Math.round(pay);G.nud+=pay;G.today.ozel+=pay;
  cardHTML('👑 SULTANIN ZİYARETİ','Sultan Mirzinkul Bellini',full?'"Ölçülü, eksiksiz. Hesabım tuttu."':'"Hesap tutmadı... Yine de alalım."',itemsHTML(res.map(([id,n,g])=>[id,g+'/'+n,g>=n]))+`<p>Sultan malın üç katını saydı. Toplam: <b>${pay<0?'−':''}🪙 ${nudStr(Math.abs(pay))}</b></p>`+extra,[{t:'Devam ▸',f:()=>{G.vipLeave=true;modalDone();}}]);}
function hasmetChoice(){const hasK=roleCount('katip')>0;unlockLore('tospar');
  if(dipOn()&&G.dip.h>=70){const v=gainW(1.5);G.today.ozel+=v;dipShift(0,3,'Haşmetşahın keyfi');cardHTML('🐸 HAŞMETŞAH BUGÜN PAZARDA','Tospar Han ve Mahir','Dermançöl dostluğu işe yaradı',`<p class="evl">Tospar Han dükkânın önünde durdu, İdiz'e uzun uzun baktı. "Bu Yavşuk... bizim mallarımızı pazara sokan dükkân bu mu? Aferin." Mahir tezgâhı yaladı. Kimse firariyi sormadı.</p><p>Haşmetşah bir sandık mal aldı: <b>🪙 ${nudStr(v)}</b></p>`,[{t:'Oh be ▸',f:modalDone}]);return;}
  const btns=[{t:'🙈 Kepenkleri kapat, saklan'+dipBadge(0,-6),f:()=>{G.ev=Object.assign(G.ev||{},{closed:true,day:-30});dipShift(0,-6,'Kapalı kepenk');toast('Kepenkler kapalı','İdiz bütün gün çuvalın içinde saklandı. Bugün satış yok.');modalDone();}},
    {t:'🧔 Takma sakal, tezgâhta kal (D20)',f:()=>hasmetRoll()}];
  if(hasK)btns.push({t:'🦉 Kâtibi öne sür',f:()=>{const ok=Math.random()<.8;const v=Math.round(WE()*(ok?.8:-.4));if(ok)dipShift(0,3,'Kâtibin üç nüshası');G.nud+=v;G.today.ozel+=v;cardHTML('🐸 HAŞMETŞAH',ok?'Kâtip kurtardı!':'Kâtip kekeledi...','',`<p>${ok?'Puhusoy kâtip Haşmetşahın bütün sorularını üç nüsha cevapladı. Tospar Han sıkılıp bir sandık mal aldı: <b>🪙 '+nudStr(v)+'</b>':'Kâtip "efendim, burada Yavşuk yok, olsa kayda geçerdim" deyince işler karıştı. Susma payı: <b>🪙 '+nudStr(-v)+'</b>'}</p>`,[{t:'Devam ▸',f:modalDone}]);}});
  cardHTML('🐸 HAŞMETŞAH BUGÜN PAZARDA','Tospar Han ve Mahir','Dermançöl Haşmetşahı, dev kurbağasının sırtında',`<p class="evl">İdiz: "Azman Ocakları'ndan kaçtığım ortaya çıkarsa beni tekrar lağıma tıkarlar! Ne yapayım?"</p>`,btns);}
function hasmetRoll(){evCard.innerHTML=`<div class="evh">🐸 TAKMA SAKAL</div><h2>Zar at!</h2><div id="evDie">${d20svg(20)}</div>${dcHTML(11,'Kılık değiştirme')}${dipOn()&&G.dip.h<=25?'<div class="d">Dermançöl şüphesi: zara −4</div>':''}${BF().d20?'<div class="d">Uğurlu eşyalar: zara +'+BF().d20+'</div>':''}<div id="evR"></div><button class="btn" id="evB">🎲 Zarı At</button>`;
  if(AUTOPLAY){const A=WE();const r=1+Math.floor(Math.random()*20);const v=r>=11?Math.round(A*1.2):-Math.min(Math.round(G.nud*.5),Math.round(A*1.2));G.nud+=v;G.today.ozel+=v;modalDone();return;}
  document.getElementById('evB').onclick=()=>{const b=document.getElementById('evB');b.disabled=true;const die=document.getElementById('evDie');let k=0;const pen=dipOn()&&G.dip.h<=25?4:0;const raw=1+Math.floor(Math.random()*20);const fin=raw===20?20:raw===1?1:clamp(raw-pen+(BF().d20||0),1,20);
    const iv=setInterval(()=>{k++;die.innerHTML=d20svg(k<14?1+Math.floor(Math.random()*20):fin,k<14?'spin':'land');sfx('tick',.5);if(k<14)return;clearInterval(iv);
      let txt2;const A=WE();
      if(fin>=11)dipShift(0,fin===20?8:4,'Haşmetşahın keyfi');
      if(fin===20){const v=Math.round(A*3);G.nud+=v;G.today.ozel+=v;txt2=`Mahir tezgâhı yaladı, Tospar Han kahkahayı bastı: "Bu Yavşuk bizim ordudan olsa general yapardım!" Bütün malı peşin aldı: <b>🪙 ${nudStr(v)}</b>`;}
      else if(fin>=11){const v=Math.round(A*1.2);G.nud+=v;G.today.ozel+=v;txt2=`Sakal tuttu! Haşmetşah tanımadı, keyfi yerinde: <b>🪙 ${nudStr(v)}</b> harcadı.`;}
      else{const v=Math.min(Math.round(G.nud*.5),Math.round(A*(fin===1?2:1.2)/10)*10);G.nud-=v;G.today.ozel-=v;dipShift(0,-5,'Firari şüphesi');txt2=`Sakal düştü! "Sen Azman Ocakları firarisi değil misin?!" Susma payı: <b>🪙 ${nudStr(v)}</b>${pen?' (Dermançöl şüphesi zarına −4 yazdı)':''}`;
        if(fin===1){const h=G.workers.find(w=>w.role==='hamal');if(h){G.workers=G.workers.filter(w=>w!==h);txt2+=' Üstüne devşirmeci bir hamalını da orduya götürdü!';}}}
      document.getElementById('evR').innerHTML=`<div class="tier t${tierOf(fin,11)}">${TIERN[tierOf(fin,11)]} · ${fin}</div><p>${txt2}</p>`;sfx(fin>=11?'unlock':'angry',.8);
      b.disabled=false;b.textContent='Devam ▸';b.onclick=modalDone;},85+k*6);};}
function reisReport(){const t=G.today;const vis=t.sold+t.lost;const empty=objs('rack').filter(r=>rackN(r)===0).length;
  const crit=[['Müşteri memnun',vis>0&&t.lost/vis<=.15],['Raflar dolu',empty<=1],['Çalışanlar tok',t.mani===0],['Favorisini bulan müşteri',t.favs>=2]];
  const n=crit.filter(c=>c[1]).length;let res,val=0;
  const A=WE();if(n===4){val=Math.round(Math.max(3000,A*1.5));G.reisMuhur=Math.min(3,(G.reisMuhur||0)+1);res='🏅 Reis\'in Övgüsü! Reis Mührü kazandın (şöhret +).';}
  else if(n===3){val=Math.round(Math.max(1500,A*.6));res='👍 Reis memnun.';}
  else if(n===2){res='😐 Reis bir şey demedi. Uçmakan suskunluğu övgü değildir.';}
  else{val=-Math.round(Math.min(G.nud*.5,Math.max(300,A*.8)));G.ucBanUntil=G.day+3;res='👎 Reis kızdı! Ceza kesildi, Uçmakanlar 3 gün dükkânına uğramayacak.';}
  G.nud+=val;t.ozel+=val;return{crit,res,val};}
