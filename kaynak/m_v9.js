
/* ====================== ÖLÇEK, DEĞİŞTİRİCİLER ====================== */
let AUTOPLAY=false,SPEED=1;const CUST_MAX=26;
function WE(){return Math.max(600,avgEarn()+kervanPay());}
function MOD(k){let v=1;if(!G||!G.mods)return 1;for(const m of G.mods)if(m.k===k&&m.until>=G.day)v*=m.v;return v;}
function addMod(k,v,days,ad){G.mods.push({k,v,until:G.day+days,ad});}
function pruneMods(){G.mods=(G.mods||[]).filter(m=>m.until>=G.day);}
function modList(){const seen={};return (G.mods||[]).filter(m=>m.until>=G.day&&m.ad).filter(m=>{const key=m.ad+m.until;if(seen[key])return false;seen[key]=1;return true;});}
function payW(k){const v=Math.round(WE()*k/10)*10;G.nud-=v;return v;}
function gainW(k){const v=Math.round(WE()*k/10)*10;G.nud+=v;return v;}

/* ====================== DİPLOMASİ ====================== */
function dipOn(){return G.day>=15&&!G.ended;}
function dipEff(){const e={race:{},tags:[]};if(!G||!G.dip||!dipOn())return e;const d=G.dip;
  if(d.s>=70){e.race.insan=1.35;e.race.puhusoy=1.35;e.race.gaksoy=1.35;e.tags.push(['♛','Pâyendegan himayesi','İnsan, Puhusoy, Gaksoy müşteri +%35']);}
  else if(d.s<=25){e.race.insan=.55;e.race.puhusoy=.55;e.race.gaksoy=.55;e.tags.push(['♛','Pâyendegan ambargosu','İnsan, Puhusoy, Gaksoy müşteri −%45']);}
  if(d.h>=70){e.race.yasruk=1.35;e.race.tirmik=1.35;e.rawMul=.85;e.tags.push(['🐸','Dermançöl dostluğu','Yaşruk, Tırmıksoy +%35 · hammadde −%15']);}
  else if(d.h<=25){e.thief=1.7;e.tags.push(['🐸','Dermançöl şüphesi','Geceleri casus ve hırsız çok']);}
  if(d.s>=45&&d.h>=45&&Math.abs(d.s-d.h)<=20){e.priceMul=1.08;e.tags.push(['⚖','Arras\'ın dengesi','Bütün fiyatlar +%8']);}
  return e;}
function dipShift(ds,dh,why){if(!G.dip)G.dip={s:50,h:50};G.dip.s=clamp(G.dip.s+ds,0,100);G.dip.h=clamp(G.dip.h+dh,0,100);
  if(dipOn()&&(ds||dh))toast('Diplomasi: '+(why||''),(ds?'♛ Sultan '+(ds>0?'+':'')+ds+'  ':'')+(dh?'🐸 Haşmetşah '+(dh>0?'+':'')+dh:''));}
function dipBadge(ds,dh){const f=(ic,v)=>v?`<span style="color:${v>0?'#3f8a3a':'#c9463d'}">${ic}${v>0?'+':''}${v}</span>`:'';return (ds||dh)?`<span style="font-size:11px;display:block;margin-top:2px">${f('♛',ds)} ${f('🐸',dh)}</span>`:'';}
function dipBar(){const d=G.dip;return `<div class="dip"><div><b>♛ Pâyendegan Sultanı</b><i><u style="width:${d.s}%;background:#3f6aa0"></u></i><span>${Math.round(d.s)}</span></div><div><b>🐸 Dermançöl Haşmetşahı</b><i><u style="width:${d.h}%;background:#8a2a3a"></u></i><span>${Math.round(d.h)}</span></div></div>`;}

/* ====================== KODEKS: LORE ====================== */
const LORE={
  agreguk:['🐎','Agreguk ve Uçmakanlar',"Uçmakanlar bin yıl önce kendi âlemlerinin kıyametinden kaçıp Vefat Dağı'ndaki Menfez-i Gayb'dan geçtiler; bu yüzden onlara Alemgezer denir. Yazılı kanunları, sultanları, seraskerleri yoktur: adaleti herkes kendiliğinden bilir. Kazanç Burkan oluklarından Yurt'a, ortak hazineye akar. At insandan azizdir. Pazarın parası Nüd ve Kopur'dur."],
  yavsuk:['👂','Yaşruk ve Yavşuk',"Yaşruk üç kulaç boyunda, yosun yeşili derili bir soydur; kemik kırılınca değil, kalp kırılınca acı çeker. Mani ve şiir sever, doyurana bağlanır, defter tutmaz. Yavşuk ise Yaşruk soyunun hilkat piyangosudur: diz boyu, kepçe kulaklı, zehir gibi zeki. Yaşruklar onu dışlamaz; sadece biraz aşağıdan bakarlar."],
  azman:['⚔','Azman Ocakları',"Dermançöl, Yaşruk ve Yavşukları Azman Ocakları'nda orduya katar: Tıraş-ı Vahşet, Cebr-i Kuşam, Mide Terbiyesi. Ortaları Zırh-Şiken, Barut-Hâr, Can-Feda Yavşukları ve Lağımcı Yavşuklar'dır. İdiz lağımcıydı. Erken emekli oldu. Kimseye söylemeyin."],
  takvim:['🌙','Zamanın Hendesesi',"Takvimin sıfır noktası Solucan Savaşı'dır: sonrası S.S.S. diye sayılır. Oro'nun iki ayı vardır, Sedef Ay ile Kanlı Ay. Her 77 günde bir buluşurlar; bir ay budur. Yıl beş aydır: Malkut, Kültendar, Gevran, Lilavar, Yobdabot. Yobdabot'un son günü Uçmakanlar şenlik yapar. Kültendar ateşin ve yolun ayıdır, kervan ayıdır."],
  haarbova:['🌳','Haarbova ve Uykusuzluk',"Rivayete göre ilk Durut Çürükhan Haarbova'da öldürülüp Küfkent'e gömüldü; yetmiş yedi gün sonra kabrinden kapkara gövdeli Karakura ağacı bitti ve uykusuzluk laneti başladı. Beylerin tutamadığı düzeni, Karakura dallarındaki pirinç kafeslerde uyumadan nöbet tutan Uykusuzlar Tarikatı sağlar. Dermançöl halkı nedense bu illetten etkilenmez."],
  yedi:['✦','Tırn Divanı: Yedi İlah',"Tırnavüll, Tırnadoruk çukurunda evlatlarını doğurdu ve onlara zamanı, tatlı bir zehri emzirdi. Akrebgan anasının memesini kopardı, Şehilah'ınkini de kopardı; Verruhail kanlı sütten mesrur oldu. Bu üçüne Âlude-i Şirûhun, sütüne kan bulaşanlar denir. Haarbova halkı onlara \"yedi ilah\" der; her yedinin gününde biri pazara bakar."],
  inci:['💎','Anlam İncisi',"Büyünün tek yakıtı Anlam İncisi'dir; Ateş Engereği'nin küllerinden, derin bir anlam anında doğar. Her inci ya bir canın bedeliyle ya da bir anlamın fedasıyla var olur. Bedelsiz büyü yoktur. Beş Büyük Umde vardır: Tebeddül, Zuhurat-ı Tabiat, Görüçelen, Yürekburkan ve Kabirbazlık. Parşömene efsun yazan hattat da bu hesabı bilir."],
  simya:['⚗','Dokuz Yol ve Simya',"Âlim Portalaçan büyüyü dokuz yola ayırır; Simya bunlardan biridir. En meşhur simyager ise zındık Zolkar'dır: Malathar'ın Ro'daki generali, suni ejderânların ve Gulbeyabanların yaratıcısı. Simyahanesinin derinliği altı fersah denir. İdiz'in kazanı o kadar derin değil. Henüz."],
  payendegan:['♛','Pâyendegan Sultanlığı',"On üç asrı aşkın bir devlet; sekiz asırdır tek karış genişlememiş. Payitahtı beyaz mermer sütunlu liman şehri Deryamihrap'tır. Değerleri feragat, riayet ve ölçüdür; duygu bir zaaftır. Büyü devletin mührüdür: kayıt, ruhsat, sınır. Denge ilahı Arras, devlet ahlakının dayanağıdır."],
  mirzinkul:['👑','Sultan Mirzinkul Bellini',"Kan bağıyla değil, Heyet-i İrfan'ın seçimiyle tahta çıktı. Ona \"hesap adamı\" derler. Saray koridorlarında başka şeyler de fısıldanır; fısıldayanların dili kesilir. Pâyendegan'da sır dinlemenin cezası Dilsiz Gemi'dir: kesilen dilin yerine ağza konan bir parça ahşap."],
  dermancol:['🐸','Dermançöl Haşmetşahlığı',"Ro'ya yayılan Gulbeyabanlara karşı birleşen paralı askerlerden doğdu; iki asır bile olmadı. Kurucusu Druzlak kendine Haşmetşah unvanını verdi, ardından Davo, sonra Tospar Han geldi. Söz neticesiyle ölçülür, güç ve haz kutsaldır. Kabirbazlık dahil her büyü serbesttir; kanlı inci karaborsada satılır."],
  tospar:['🐸','Tospar Han ve Mahir',"Dermansur'u Sürtünkaya vergileriyle ördürdü, kapıların anahtarını yalnız kendisi taşır. Melfova'yı ve Ceranimü'yü aldı; Zerksoyların Tıskent'ini alamadı. Bineği dev kurbağa Mahir'in etine çelik mıhlanmıştır. Haşmetşahın sözü kanun, gazabı ölümdür."],
  gokmizrak:['🦉','Gökmızrak Alayı',"Pâyendegan ordusunun havadaki gözü. Neferleri Kanatsoydur, bilhassa Puhusoy. Alay, Solucan Savaşı'nın Gaksoy kahramanı Tahrul-Ben'in hatırasına kuruldu. Sipariş defterleri üç nüsha tutulur."],
  uykusuzlar:['🔒','Uykusuzlar Tarikatı',"Karakura dallarındaki pirinç kafeslerde uyumadan nöbet tutar, diyarın kefaretini öder. Haarbova'nın fiilî düzeni onlardadır. Bir rapora göre Karguşa ile Dermançöl arasındaki paktın asıl vasıtası da onlardır: Yaşruk alayının tuzu ve iaşesi onlara bağlıdır."],
  solucan:['🪱','Solucan Savaşı',"Paluzi solucanları Kavurova çölünü terk edince Pullukul ile Gaksoy kırk gün kırk gece savaştı. Kırkıncı gün Karlin ile Semuanya indi, şampiyon dövüşü buyurdu. Gaksoy Tahrul-Ben kazandı, kalbini söküp göğe kaldırdı. Ne galip kaldı ne mağlup; asıl kazanan Tuzbatak Taşı'nı satan Zerksoylardı. Takvim bu savaşla sıfırlanır."],
  sar:['🖋','Hain Kâtip',"Pâyendegan'ın serasker sarayında sır kâtibiydi; kütüphaneyi yakıp kaçtı, \"hain kâtip\" ilan edildi. Şimdi Uçmakanlarla yaşıyor, boş defter ve hokka arıyor. Adı Nebrukaddesar'dır; Yaşruk olup olmadığını kimse bilmez. İdiz'in dükkânına bir kere uğradı. Bir şey almadı."],
  meclis:['🏛','Agreguk Tüccar Meclisi',"Agreguk'ta kanun yazılmaz; ama pazarın büyükleri akşamları ateş başında oturur, Yurt'un ve pazarın işini konuşur. Kimse oy saymaz, herkes ne olduğunu bilir. İdiz artık o ateşin başında oturuyor. Diz boyu olduğu için biraz da yakından."],
  gecekoynu:['⚔','Gecekoynu Muharebesi',"S.S.S. 575, Lilavar'ın on ikisi. Gecekoynu tepelerinde otuz bin can toprağa düştü. Sultan Mirzinkul Nebrukaddesar'ın elinde öldü; Haşmetşahın ordusu Gecekoynu'nun balçığında eridi. Galibi kim oldu bilinmez."],
  asmarel:['🐍','Aşmarel',"Âlemlere sızan sürgün bir iblis; fare, engerek ve beyaz yılan suretlerinde görüldü. Yıllarca Nebrukaddesar'ın gölgesinde yaşadı. Küfkent'in dehlizlerinde Çürükhan'ın kabrine indi, Karakura ağacını içinden yiyerek ağacın kendisi oldu. Beyaz küf bütün Haarbova'ya yayıldı. Gülgezen onu yedi ilahın arasına böyle buyur etti: sekizinci olarak."]
};
const LORE_ORDER=['agreguk','yavsuk','azman','takvim','haarbova','yedi','solucan','sar','inci','simya','payendegan','mirzinkul','dermancol','tospar','gokmizrak','uykusuzlar','meclis','gecekoynu','asmarel'];
function unlockLore(id){if(!G.lore)G.lore={};if(G.lore[id]||!LORE[id])return;G.lore[id]=1;toast('📜 Kodeks\'e yeni sayfa',LORE[id][1]);}

/* ====================== TÜCCAR MECLİSİ ====================== */
const MECLIS_COST=50000;
const TOPICS=[
  {t:'Dermançöl kervanları',q:'Dermançöl\'den bir kervan kapıda: ucuz yün, ucuz deri, bol demir. Ama yükünü Azman Ocakları\'nın mührü taşıyor.',o:[
    {t:'Pazara alalım',ds:-6,dh:8,d:'Hammadde 5 gün %25 ucuz',f:()=>addMod('raw',.75,5,'Dermançöl malı ucuz')},
    {t:'Geri çevirelim',ds:6,dh:-8,d:'Pâyendegan memnun',f:()=>{}}]},
  {t:'Ruhsat memurları',q:'Pâyendegan ruhsat memurları efsunlu mallara devlet mührü basmak istiyor. "Kayıtlı efsun, güvenli efsun."',o:[
    {t:'Mühür basılsın',ds:8,dh:-5,d:'Efsunlu ve simya malları 6 gün %15 pahalı',f:()=>{addMod('cat_ench',1.15,6,'Mühürlü efsun');}},
    {t:'Pazar hür kalsın',ds:-8,dh:5,d:'Zerksoy müşteri 5 gün +%60',f:()=>addMod('r_zerksoy',1.6,5,'Kayıtsız efsun')}]},
  {t:'Burkan oluğu payı',q:'Yurt\'un ortak hazinesi dolsun mu, tüccarın kesesi mi? Burkan oluklarına akan payı konuşuyoruz.',o:[
    {t:'Pay %15 olsun',d:'7 gün Yurt payı %15, müşteri +%20, Uçmakan +%40',f:()=>{addMod('yurt',1.5,7,'Cömert Yurt payı');addMod('cust',1.2,7,'Yurt bereketi');addMod('r_ucmakan',1.4,7,'Yurt bereketi');}},
    {t:'Pay %5 olsun',d:'7 gün Yurt payı %5, Uçmakan müşteri −%40',f:()=>{addMod('yurt',.5,7,'Cimri Yurt payı');addMod('r_ucmakan',.6,7,'Uçmakan küskün');}}]},
  {t:'Gökmızrak gözcü kulesi',q:'Gökmızrak Alayı pazarın ortasına bir gözcü kulesi dikmek istiyor. Puhusoy gözleri geceyi görür.',o:[
    {t:'İzin verelim',ds:7,dh:-6,d:'10 gün hırsız %70 az',f:()=>addMod('thief',.3,10,'Gökmızrak gözcüleri')},
    {t:'Gök bizim gökümüz',ds:-6,dh:5,d:'Dermançöl memnun',f:()=>{}}]},
  {t:'Uykusuzların tuzu',q:'Uykusuzlar Tarikatı nöbet kafesleri için tuz iaşesi istiyor. Vermeyenin gecesi uzun olur derler.',o:[
    {t:'Tuz verelim',dh:5,cost:.6,d:'Bedeli günlük kazancın %60\'ı · 7 gün hırsız yarı yarıya',f:()=>addMod('thief',.5,7,'Uykusuz nöbeti')},
    {t:'Vermeyelim',dh:-5,d:'5 gün geceler huzursuz: hırsız +%60',f:()=>addMod('thief',1.6,5,'Nöbetsiz geceler')}]},
  {t:'Fiyat tavanı',q:'Fakir Uçmakanlar şikâyetçi: "Agreguk\'ta fahiş fiyata yer yok!" Tavan konsun mu?',o:[
    {t:'Tavan konsun',d:'5 gün fiyat −%10, müşteri +%35',f:()=>{addMod('price',.9,5,'Fiyat tavanı');addMod('cust',1.35,5,'Ucuz pazar kalabalığı');}},
    {t:'Pazar serbest',d:'5 gün fiyat +%12, müşteri −%15',f:()=>{addMod('price',1.12,5,'Serbest fiyat');addMod('cust',.85,5,'Pahalı pazar');}}]},
  {t:'Pazar şenliği',q:'Tüccarlar ortak bir şenlik düzenleyecek: davul, zurna, kebap. Masraf paylaşılacak.',o:[
    {t:'Katılalım',cost:1,d:'Bedeli bir günlük kazanç · 3 gün müşteri +%60, toplu alım bol',f:()=>{addMod('cust',1.6,3,'Pazar şenliği');addMod('qty',1.4,3,'Şenlik keyfi');}},
    {t:'Kesemiz dar',d:'Bir şey olmaz; Reis not alır',f:()=>{}}]},
  {t:'Tuğcuların bağışı',q:'Obada atlar hasta. Tuğcular şifa için bağış topluyor; ölü atın yelesinden örülen tuğ inci istemez ama aş ister.',o:[
    {t:'Bağış yapalım',cost:.8,d:'Bedeli günlük kazancın %80\'i · 10 gün Uçmakan +%60',f:()=>addMod('r_ucmakan',1.6,10,'Tuğcuların duası')},
    {t:'Bu sefer olmaz',d:'5 gün Uçmakan −%30',f:()=>addMod('r_ucmakan',.7,5,'Uçmakan kırgın')}]},
  {t:'Firari listesi',q:'Azman Ocakları devşirmecileri meclisten Agreguk\'taki firari Yaşruk ve Yavşukların listesini istiyor. İdiz terliyor.',o:[
    {t:'Liste verilsin',ds:-3,dh:10,d:'Haşmetşah çok memnun · Yaşruklar 6 gün −%40',f:()=>addMod('r_yasruk',.6,6,'Yaşruklar küskün')},
    {t:'Kimse teslim edilmez',ds:2,dh:-9,d:'Yaşruk ve Uçmakan 6 gün +%35',f:()=>{addMod('r_yasruk',1.35,6,'Uçmakan adabı');addMod('r_ucmakan',1.35,6,'Uçmakan adabı');}}]},
  {t:'Sürtünkaya kaçakçıları',q:'Sürtünkaya kaçakçıları vergisiz deri ve yün getiriyor. O vergilerle Dermansur örülüyordu.',o:[
    {t:'Göz yumalım',ds:-3,dh:-7,d:'Hammadde 4 gün %35 ucuz',f:()=>addMod('raw',.65,4,'Kaçak mal')},
    {t:'Yasaklayalım',ds:3,dh:5,d:'İki taraf da memnun, kese değil',f:()=>{}}]},
  {t:'Sihir Enderunu',q:'Pâyendegan Sihir Enderunu, talebeleri için Agreguk\'tan toplu parşömen alacak. Dermançöl casusları da aynı parşömenin peşinde.',o:[
    {t:'Enderun\'a satalım',ds:7,dh:-4,d:'Parşömen 5 gün %60 pahalı',f:()=>addMod('cat_parsomen',1.6,5,'Enderun alımı')},
    {t:'Casuslara satalım',ds:-7,dh:6,d:'Bugün bir günlük kazanç peşin',f:()=>{const v=gainW(1);G.today.ozel+=v;}}]},
  {t:'Kanlı inci',q:'Pazara kanlı inci sızmış. Dermançöl\'de serbest, Pâyendegan\'da ölüm sebebi. Meclis ne diyecek?',o:[
    {t:'Görmezden gelelim',ds:-10,dh:7,d:'Efsunlu mallar 5 gün %25 pahalı',f:()=>addMod('cat_ench',1.25,5,'Kanlı inci parıltısı')},
    {t:'Pazardan kovalım',ds:8,dh:-6,d:'7 gün hırsız %30 az',f:()=>addMod('thief',.7,7,'Temiz pazar')}]},
  {t:'Taş kervan yolu',q:'Agreguk\'a gelen kervan yolu taşla döşenecek. Tüccarlar sermaye koyarsa develer daha çok taşır.',o:[
    {t:'Ortak olalım',cost:1.5,d:'Bedeli 1,5 günlük kazanç · hammadde kalıcı %5 ucuz',f:()=>{G.perm.raw=Math.min(.25,(G.perm.raw||0)+.05);}},
    {t:'Kum yol yeter',d:'Bir şey olmaz',f:()=>{}}]}
];
function meclisCard(){const pool=TOPICS.filter((t,i)=>!(G.lastTopic||[]).includes(i));const tp=rnd(pool.length?pool:TOPICS);const ti=TOPICS.indexOf(tp);G.lastTopic=((G.lastTopic||[]).concat([ti])).slice(-5);
  unlockLore('meclis');
  cardHTML('🏛 TÜCCAR MECLİSİ',tp.t,'Ateş başında karar vakti',`<p class="evl">${tp.q}</p>`+dipBar(),tp.o.map(o=>{const c=o.cost?Math.round(WE()*o.cost/10)*10:0;
    return{t:o.t+(c?` · 🪙${fmt(c)}`:'')+`<span style="font-size:11px;display:block;font-weight:600;opacity:.85">${o.d}</span>`+dipBadge(o.ds||0,o.dh||0),dis:c>G.nud,f:()=>{if(c>G.nud){toast('Kese yetmedi','Bu karara ortak olamazsın.');return;}if(c){G.nud-=c;G.today.ozel-=c;}o.f();dipShift(o.ds||0,o.dh||0,tp.t);save();modalDone();}};}));}
function joinMeclis(){if(G.meclis||G.shopLv<3||G.day<25||!pay(MECLIS_COST))return;G.meclis=true;G.meclisNext=G.day+2;unlockLore('meclis');sfx('unlock');shake=3;toast('🏛 Tüccar Meclisi\'ndesin!','Birkaç günde bir ateş başında karar vereceksin. Şöhretin arttı.');after();}

/* ====================== DEVE KERVANI ====================== */
function caravanX(){return SHOP().x0+62;}
function startCaravan(items,burk){const x=caravanX();G.camels={x,y:WH+70,st:'in',t:0,items,burk:!!burk,walk:0,n:Math.min(4,1+Math.ceil(items.length/2))};}
function caravanTick(dt){const C=G.camels;if(!C)return;const stopY=SY1+92;C.walk+=dt;
  if(C.st==='in'){C.y-=150*dt;if(C.y<=stopY){C.y=stopY;C.st='unload';C.t=0;sfx('thump',.5);}}
  else if(C.st==='unload'){C.t+=dt;if(Math.random()<dt*10)fx('star',C.x+(Math.random()-.5)*30,C.y-50,{vx:(Math.random()-.5)*60+50,vy:-120,t:.6});
    if(C.t>1.4){C.st='out';deliverCaravan();}}
  else if(C.st==='out'){C.y+=150*dt;if(C.y>WH+90)G.camels=null;}}
function deliverCaravan(){const C=G.camels;const D=G.delivery||{};const got=[];
  for(const r in D){const n=D[r];if(!n)continue;G.sup[r]=Math.min(supCap(r),(G.sup[r]||0)+n);got.push(n+' '+IT[r].ad.toLowerCase());}
  G.delivery=null;sfx('register',.5);
  toast('Kervan geldi! 🐪',got.length?got.join(', ')+' sandıklarda.':'Develer yükünü indirdi.',{item:'kulce'});
  if(C&&C.burk&&!G.workers.some(w=>w.role==='burkazur')){const w=hireWorker('burkazur',true);if(w){w.x=C.x+20;w.y=C.y-10;w.molaT=20;say(w,'Selam! Ben Burkazur. Dayım kervancıbaşı. Sandık taşıyacakmışım. Rafa koymam ama, söyleyeyim.',4.5);}
    queueModal(()=>cardHTML('🐪 KERVANDAN BİR HEDİYE','Burkazur','Kervancıbaşının yeğeni, Yaşruk hamal',`<p class="evl">"Dayım dedi ki: 'Git şu diz boyu Yavşuğa yardım et, belki adam olursun.' Ben zaten adamım. Yaşruğum hatta, adamdan büyüğüm."</p><p>Burkazur bedava çalışır ama yavaştır; yalnız sandıktan tezgâha hammadde taşır. Bir de çok konuşur. Çok.</p>`,[{t:'Hoş geldin... galiba',f:modalDone}]));}}
function camel(x,y,dir,walk,bag,k){g.save();g.translate(x,y);g.scale((k||1)*dir,k||1);shadow(0,2,28,6);const ph=walk*7,C='#d8a868',D='#c08a4e';
  [[-15,0,D],[11,Math.PI*.5,D],[-9,Math.PI,C],[17,Math.PI*1.5,C]].forEach(([lx,o,c])=>{const a=Math.sin(ph+o)*.32;g.save();g.translate(lx,-26);g.rotate(a);rr(-2.4,0,4.8,14,2);F(c);S(1.4);g.translate(0,13);g.rotate(-a*.6);rr(-2.2,0,4.4,13,2);F(c);S(1.4);rr(-3,11,6,3,1.5);F('#8a6a4a');g.restore();});
  g.beginPath();g.moveTo(-22,-34);g.quadraticCurveTo(-29,-28,-26,-20);S(2,D);
  g.beginPath();g.ellipse(0,-33,23,11,0,0,Math.PI*2);F(C);S(2);
  g.beginPath();g.moveTo(-14,-38);g.quadraticCurveTo(-4,-58,8,-38);F(C);S(2);
  if(bag){rr(-16,-42,11,15,3);F(bag[0]);S(1.4);rr(5,-42,11,15,3);F(bag[1]||bag[0]);S(1.4);g.beginPath();g.moveTo(-12,-44);g.quadraticCurveTo(-3,-54,6,-44);S(4,'#c9463d');}
  g.beginPath();g.moveTo(15,-40);g.quadraticCurveTo(25,-41,26,-58);g.lineTo(34,-58);g.quadraticCurveTo(34,-34,20,-25);g.closePath();F(C);S(2);
  g.save();g.translate(31,-61+Math.sin(ph*.5)*1);g.beginPath();g.ellipse(2,0,10,6,.1,0,Math.PI*2);F(C);S(1.8);circ(0,-2,1.3);F(OL);g.beginPath();g.moveTo(9,1);g.lineTo(11,2);S(1.2);
  g.beginPath();g.ellipse(-6,-5,2.2,3.4,-.5,0,Math.PI*2);F(D);S(1.2);g.restore();
  g.restore();}
const BAGC={tuz:'#f2ead8',kulce:'#6a6f78',yun:'#f2ead8',kagit:'#e8dcc0',deri:'#b0703e',ot:'#6aa860',kum:'#e0c890'};
function drawCaravan(C){const n=C.n,dir=-1;const bags=C.items.length?C.items:['kulce'];const mv=C.st!=='unload';
  for(let i=n-1;i>=0;i--){const y=C.y+18+i*58,x=C.x+(i%2?6:-4);const b=bags[i%bags.length];camel(x,y,1,mv?C.walk+i*.7:0,[BAGC[b]||'#c9a56c',BAGC[bags[(i+1)%bags.length]]||'#c9a56c'],.85);}
  const sp=SPEC.deveci;const d={x:C.x+40,y:C.y-14,dir:1,walk:mv?C.walk:0,moving:mv,seed:2,look:.3,skin:sp.skin,hair:'#2a1c14'};drawGuy(d.x,d.y,d,sp);}

/* ====================== BURKAZUR ====================== */
const BURK_L=["Ağam, bu külçe dünkünden ağır. Kesin ağır.","Dayım kervancıbaşı, biliyon mu? Ben aslında müdür olacaktım.","Mola! Hakkım. Ne demekse.","Yavşuk patron mu olurmuş... neyse, sustum.","Bu sandığı kim bu kadar uzağa koydu? Sen mi? Hmm.","Mani dinle: \"Külçe ağır, gönül ağır, İdiz'in boyu kısa...\"","Sırtım. Sırtım! Ha, geçti.","Ben taşırım ama rafa koymam. O iş başka iş.","Dün gece rüyamda sandık gördüm. Boştu. Çok güzeldi.","Kaç tane taşıdım? Defter tutmam ben, Yaşruğum.","Bana 'Burki' deme. Kimse demiyor zaten ama deme.","Ocak sıcak, ben hassasım.","Patron, bir zam? Yok mu? Peki."];
function burkTick(w,dt,day){w.hunger=100;
  if(!day||w.off){if(w.st!=='rest'){w.st='rest';w.task=null;}if(!w.bub&&Math.random()<dt*.04)say(w,day?'İzinliyim. Dayıma yazıyorum.':'Zzz... sandık... boş sandık... zzz',2.6);if(w.stack.length)w.stack=[];return;}
  if(w.st==='rest')w.st='idle';
  w.molaT=(w.molaT==null?25:w.molaT)-dt;
  if(w.st==='mola'){w.t-=dt;w.moving=false;if(w.t<=0){w.st='idle';w.molaT=22+Math.random()*14;}return;}
  if(w.molaT<=0&&w.st==='idle'&&!w.stack.length){w.st='mola';w.t=5;say(w,rnd(['Mola! Hakkım.','Beş dakka. Yaşruk dakkası.','Oturuyorum. Kimse bir şey demesin.']),3);return;}
  if(!w.bub&&Math.random()<dt*.07)say(w,rnd(BURK_L),3.4);
  hamalAI(w,dt);}

/* ====================== SON: GECEKOYNU VE AŞMAREL ====================== */
function endNewsCard(){const tgt=8*385+3*77+12;G.dOff=tgt-(START_DOY-1+G.day-1);G.endStage=2;G.endDay=G.day+5;G.sched=null;
  unlockLore('gecekoynu');
  cardHTML('📯 HABER · '+dateStr(G.day).toUpperCase(),'Nebrukaddesar Geliyor!','Aile geldikten sonra yıllar Agreguk\'ta sakin aktı. Bu sabaha kadar.',
    `<p class="evl" style="font-size:16px"><b>"Gecekoynu savaşının kazananı yok! Haşmetşah kaçmış, Sultan ise ölmüş. Nebrukaddesar Küfkent'e yürüyor!"</b></p>`+
    `<p>İdiz: "Hain Kâtip... ${G.sarDone?'Bir zamanlar dükkânıma boş defter sormaya gelen o adam mı?':'Uçmakanların arasında yaşayan o kâtip mi?'}"</p><p>Babası: "Dermançöl'den tam vaktinde çıkmışız oğlum."</p><p>Annesi: "Rüyamda beyaz yapraklar gördüm, İdiz. Küfkent'te bir şey uyanıyor."</p>`,
    [{t:'...',f:modalDone}]);}
function asmarelCards(){G.endStage=3;G.ended=true;unlockLore('asmarel');G.mods=[];
  const pages=[
    ['🐍 KÜFKENT\'İN DEHLİZLERİ','Vuslat','Yukarıda zafer naraları atılırken aşağıda asıl iş görülüyordu.',`<p class="evl">Beyaz yılan Aşmarel, Çürükhan'ın kabrine indi. Nöbet tutacak Uykusuzlar yoktu; hepsi Mühredarların kılıcıyla can vermişti. Aşmarel Karakura ağacına bir âşık gibi sarıldı, sıktı, gövdesini yarıp ağacı içinden yedi. Pembe yapraklar bembeyaz oldu.</p>`],
    ['🌫 AGREGUK','Beyaz Küf','',`<p class="evl">Beyaz yapraklar yeraltı rüzgârıyla Haarbova'nın dört bir yanına savruldu, küf sporları her ciğere sızdı. Agreguk pazarında herkes aynı anda, aynı ritimle nefes almaya başladı. Kimse fark etmedi. Kimse uyumadı.</p><p>Gülgezen, Aşmarel'i yedi ilahın arasına böyle buyur etti.</p>`],
    ['🏠 İDİZ\'İN EVİ','Bir Tas Fazla','',`<p class="evl">O gece annesi sofraya bir tas fazladan koydu. Kimse kimin için olduğunu sormadı. Babası tarladan beyaz yapraklı bir fidan getirdi; kız kardeşi onu mani söyleyerek suladı.</p>${G.man&&G.man.wife?'<p>'+MAN_NAME+' tasın kenarına bir parça keçe ördü, "üşümesin" diye. Kimin üşüyeceğini kimse sormadı.</p>':''}<p>İdiz tasın dibindeki beyaz küfe baktı ve gülümsedi:</p><p><b>"Uyku mu? Hiç bu kadar uyanık olmamıştım. Kimseye söylemeyin."</b></p>`],
    ['✦ SON ✦','','',`<p class="evl" style="font-size:16px">"Hepimiz, uyumadan duranlar tarafından anlatılan birer rüyayız. Sen okurken ben yazıyorum; ben yazarken Aşmarel hâlâ besleniyor."</p><p style="text-align:right">— İsimur</p><p class="d">İdiz'in Tezgâhı bitti. Pazar açık kalıyor; istersen oynamaya devam et.</p>`]];
  let i=0;const show=()=>{const p=pages[i];cardHTML(p[0],p[1],p[2],p[3],[{t:i<pages.length-1?'Devam ▸':'Pazara dön',f:()=>{i++;if(i<pages.length){sfx('chime',.4);show();}else{achieve('sekiz');save();modalDone();}}}]);};show();}
function sporeLayer(vx0,vy0,vx1,vy1){if(!G.ended)return;g.save();for(let i=0;i<46;i++){const sx=vx0+((i*137.5+T*(12+i%5*4))%(vx1-vx0)),sy=vy0+((i*89.3+T*(18+i%7*3))%(vy1-vy0));g.globalAlpha=.35+.3*Math.sin(T*2+i);
  if(i%4===0){g.save();g.translate(sx,sy);g.rotate(T+i);el(0,0,4,2);F('#f4f6f2');g.restore();}else{circ(sx,sy,1.4+i%3*.6);F('#ffffff');}}g.globalAlpha=1;g.restore();}
function drawSapling(){if(!G.ended)return;const Hh=HOUSE();const x=Hh.x1+40,y=SY1+70;shadow(x,y+2,16,4);rr(x-2,y-34,4,36,2);F('#2a2226');S(1.2);
  for(let i=0;i<7;i++){const a=-Math.PI/2+(i-3)*.5,r=18+(i%2)*5;g.save();g.translate(x+Math.cos(a)*r*.6,y-34+Math.sin(a)*r*.5);g.rotate(a+Math.sin(T*1.5+i)*.15);el(0,0,6,3);F('#f6f8f4');S(1);g.restore();}
  rr(x+14,y-6,14,7,3);F('#c9a56c');S(1.2);el(x+21,y-6,6,2);F('#f4f6f2');}

/* ====================== HIZ VE KALİTE ====================== */
function setSpeed(v){SPEED=v;const b=document.getElementById('zSpd');if(b){b.textContent=v>1?'⏩':'▶';b.classList.toggle('on',v>1);}try{localStorage.setItem('idiz_speed',String(v));}catch(e){}}
document.getElementById('zSpd').onclick=()=>{setSpeed(SPEED>1?1:2);sfx('pop',.5);toast(SPEED>1?'Hızlı mod ⏩':'Normal hız ▶',SPEED>1?'Her şey iki kat hızlı akıyor.':'Zaman kendi hızında.');};
try{const v=+localStorage.getItem('idiz_speed');if(v===2)setSpeed(2);}catch(e){}
let FEMA=.016,FBAD=0;
function perfWatch(raw){if(MODE!=='game'||paused)return;FEMA=FEMA*.94+Math.min(.2,raw)*.06;
  if(FEMA>.026){FBAD+=raw;if(FBAD>1.6&&DPR>1){DPR=Math.max(1,DPR-.25);DPRMAX=DPR;cv.width=Math.round(innerWidth*DPR);cv.height=Math.round(innerHeight*DPR);BG=null;FBAD=0;FEMA=.016;}}else FBAD=Math.max(0,FBAD-raw*.5);}
