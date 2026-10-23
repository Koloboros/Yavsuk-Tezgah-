
/* ====================== KATALOG (HTML) ====================== */
const THUMB={};
function thumb(key,fn){if(THUMB[key])return THUMB[key];const c=document.createElement('canvas');c.width=c.height=116;const prev=g;g=c.getContext('2d');g.translate(58,78);g.scale(1.9,1.9);try{fn();}catch(e){}g=prev;THUMB[key]=c.toDataURL();return THUMB[key];}
function itemThumb(id){return thumb('i_'+id,()=>{g.translate(0,-6);g.scale(1.6,1.6);ITEM[id]();});}
function headThumb(key,spec,o){return thumb('h_'+key,()=>{g.translate(0,-14);g.scale(1.5,1.5);HEADS[spec.head](spec.R,Object.assign({skin:spec.skin,hair:'#5a3a22',band:'#c9463d',seed:0,look:.5},o||{}));});}
function decoThumb(id){return thumb('d_'+id,()=>{const D=DECO[id];const tall=['duvar_d','agac','gozcu','cardak','heykel','orhun','avize','arras','ahir'].includes(id);const sc=tall?.4:.62;g.scale(sc,sc);g.translate(0,id==='duvar_d'?40:tall?30:12);D.draw(0,0);});}
function stThumb(t){return thumb('s_'+t,()=>{g.scale(.55,.55);g.translate(-6,20);drawStation({k:'st',type:t,x:0,y:0,inp:[],out:[],fin:[],craft:0,heat:0},true);});}
function houseThumb(l){return thumb('house'+l,()=>{g.scale(.9,.9);const c=['#efdcb4','#cc5a44','#d8b07a','#f2ead8'][l];g.beginPath();g.moveTo(-26,10);g.lineTo(-26,-12);g.lineTo(0,-30);g.lineTo(26,-12);g.lineTo(26,10);g.closePath();F(c);S(2);rr(-7,-6,14,16,6);F('#5a3a2a');S(1.6);});}
function tileThumb(t){return thumb('t'+t,()=>{g.scale(.9,.9);g.translate(-20,-28);drawTile(t,0,0);});}
function raceThumb(r){return thumb('r_'+r,()=>{g.translate(0,-14);g.scale(1.6,1.6);const R=RACES[r];HEADS[R.head](R.R,{skin:R.skin,hair:R.hair?R.hair[0]:'#5a3a22',band:'#c9463d',seed:0,look:.5});});}
function roleThumb(role){const sp=SPEC[role];return headThumb('role_'+role,sp,role==='katip'||role==='hattat'?{glasses:true}:null);}
const BUFFN={tip:'Bahşiş',pat:'Sabır',qty:'Toplu alım',wspd:'Usta hızı',hspd:'Hamal hızı',kiosk:'Bahçe satışı',thief:'Hırsız yakalama',rest:'Dinlenme',cust:'Müşteri akışı',d20:'Zar',kasa:'Kasa hızı',price:'Fiyat',raw:'Hammadde'};
const cat=document.getElementById('cat'),catBody=document.getElementById('catBody');
document.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>{setTab(b.dataset.t);sfx('pop',.5);});
function setTab(t){catTab=t;document.querySelectorAll('.tabs button').forEach(x=>x.classList.toggle('on',x.dataset.t===t));renderCat();catBody.scrollTop=0;
  const b=document.querySelector('.tabs button[data-t="'+t+'"]'),tb=document.querySelector('.tabs');if(b&&tb)tb.scrollTo({left:b.offsetLeft-tb.clientWidth/2+b.offsetWidth/2,behavior:'smooth'});}
document.getElementById('catX').onclick=closeCat;
function openCat(t){if(G.phase!=='night')return;setEdit(false);cat.classList.remove('hidden');setTab(t||catTab);sfx('pop');updateBar();}
function closeCat(){cat.classList.add('hidden');updateBar();}
function lvBar(l,m){let s='<div class="lv">';for(let i=0;i<m;i++)s+=`<i class="${i<l?'f':''}"></i>`;return s+'</div>';}
function card(img,name,desc,chips,price,id,dis,lab){return`<div class="item"><img src="${img}"><div class="t"><div class="n">${name}</div><div class="d">${desc}</div>${chips?`<div class="chips">${chips}</div>`:''}</div>${id?`<button class="buy" data-id="${id}" ${dis?'disabled':''}>${lab||('🪙 '+fmt(price))}</button>`:''}</div>`;}
const sec=t=>`<div class="sec">${t}</div>`;
function buyCard(img,name,desc,chips,cost,id,extraDis,lab){return card(img,name,desc,chips,cost,id,G.nud<cost||extraDis,lab);}
function renderCat(){if(!G||cat.classList.contains('hidden'))return;document.getElementById('catNud').textContent='🪙 '+fmt(G.nud);let h='';const T0=catTab;
  if(T0==='siparis'){
    h+=sec('Yarın sabahki kervan')+`<div class="d" style="margin:0 2px 8px">Satamayacağın malı alma, kese dardır!</div>`;
    {const fc=fillCost();h+=`<div style="display:flex;gap:6px;flex-wrap:wrap;margin:0 0 10px"><button class="buy" data-id="FA:" ${fc<=0?'disabled':''}>🧺 Bütün sandıkları doldur · 🪙${fmt(fc)}</button><button class="buy" data-id="FT:" style="background:${G.autoFill?'#9ad07a':'#fff7e6'}">${G.autoFill?'✔ Her gece otomatik doldur: AÇIK':'Her gece otomatik doldur: KAPALI'}</button></div>`;}
    for(const r of RAWS){if(!findObj('sup',o=>o.item===r))continue;const I=IT[r];
      h+=`<div class="item"><img src="${itemThumb(r)}"><div class="t"><div class="n">${I.ad} <span style="font-weight:600;color:#8a6a50">· ${rawPrice(r)} nüd</span></div>
      <div class="d">Sandıkta ${G.sup[r]}/${supCap(r)} · Dün satılan ${IT[I.for].ad.toLowerCase()}: ${G.lastSold[I.for]||0}</div>
      <div class="step"><button data-o="${r}:-2">−</button><b>${G.order[r]}</b><button data-o="${r}:2">+</button><button data-o="${r}:6">+6</button><button data-o="${r}:20">+20</button><span>🪙 ${nudStr(G.order[r]*rawPrice(r))}</span></div>${G.supLv[r]<SUP_CAPS.length-1?`<button class="buy" style="margin-top:6px;font-size:12.5px;padding:5px 8px" data-id="Z:${r}" ${G.nud<SUP_UPC[G.supLv[r]]?'disabled':''}>📦 Sandığı büyüt ${supCap(r)} → ${SUP_CAPS[G.supLv[r]+1]} · 🪙${fmt(SUP_UPC[G.supLv[r]])}</button>`:''}</div></div>`;}
    let w=0;for(const x of G.workers)if(!x.off)w+=wage(x.role);
    h+=sec('Yarınki giderler')+`<div class="stats" style="font-size:14px"><span>Mal (ödendi)</span><span>🪙 ${nudStr(G.orderSpent)}</span><span>Ücretler (akşam)</span><span>🪙 ${nudStr(w)}</span><span>Yurt payı</span><span>gelirin %10'u</span></div>`;}
  else if(T0==='atolye'){const id=LADDER[G.step];
    if(id){const L=LADDER_INFO[id],lk=L.need&&G.shopLv<L.need;h+=sec('Sıradaki açılım')+card(itemThumb(L.ic),L.ad,L.desc+(lk?' <b style="color:#c9463d">Sığmaz: önce İnşaat\'tan dükkânı büyüt.</b>':''),'',L.cost,'L:'+id,G.nud<L.cost||lk,lk?'🏗 Dükkân dar':null);
      const nx=LADDER[G.step+1];if(nx)h+=`<div class="item" style="opacity:.5"><img src="${itemThumb(LADDER_INFO[nx].ic)}"><div class="t"><div class="n">???</div><div class="d">Önce yukarıdakini aç.</div></div></div>`;}
    else h+=sec('Bütün atölyeler açık!');
    h+=sec('Tezgâhlar: ek tezgâh ve kapasite');
    for(const t of ST_IDS){const n=objs('st',o=>o.type===t).length;if(!n)continue;const l=G.stLv[t],uc=stUpgCost(t),sc=stationCost(t);
      h+=card(stThumb(t),ST[t].ad+' ×'+n,ST[t].desc+` Giriş ${inCap(t)} · çıkış ${outCap(t)}.`,lvBar(l,ST_UPC.length),0,null);
      h+=`<div style="display:flex;flex-wrap:wrap;gap:6px;margin:-4px 0 10px 66px"><button class="buy" data-id="X:${t}" ${G.nud<sc?'disabled':''}>+1 tezgâh 🪙${fmt(sc)}</button>${n>1?`<button class="buy" data-id="SS:${t}" style="background:#fff7e6">Sat +🪙${fmt(sellRefund(t))}</button>`:''}${l<ST_UPC.length?`<button class="buy" data-id="Y:${t}" ${G.nud<uc?'disabled':''}>Büyüt 🪙${fmt(uc)}</button>`:''}</div>`;
      if(ST[t].combo)for(const o of objs('st',q=>q.type===t)){const opts=ST[t].in.filter(b=>b!==ST[t].combo&&recOK(t,b));h+=`<div class="d" style="margin:-6px 0 4px 66px">${ST[t].ad} #${o.uid} tarifi:</div><div class="recs">`+opts.map(b=>{const out=t==='efsun'?ENCH_OF[b]:SIMYA_OF[b];return `<button class="${o.rec===b?'on':''}" data-id="P:${o.uid}.${b}"><img src="${itemThumb(out)}">${IT[out].ad}</button>`;}).join('')+`</div>`;}}
    h+=sec('Sandıklar');
    for(const r of RAWS){if(!findObj('sup',o=>o.item===r))continue;const l=G.supLv[r],M=SUP_CAPS.length-1;h+=card(itemThumb(r),IT[r].ad+' sandığı',l<M?`Kapasite ${supCap(r)} → ${SUP_CAPS[l+1]}`:'En büyük sandık!',lvBar(l,M),l<M?SUP_UPC[l]:0,l<M?'Z:'+r:null,l<M&&G.nud<SUP_UPC[l]);}
    h+=sec('Raflar, kasa, çöp');const rl=G.rackLv;
    h+=card(itemThumb('yatagan'),'Bütün rafları genişlet',rl<RACK_UPC.length?`Raf kapasitesi ${rackCap()} → ${RACK_CAPS[rl+1]} (vitrin 1,5 katı)`:'En büyük raflar!',lvBar(rl,RACK_UPC.length),rl<RACK_UPC.length?RACK_UPC[rl]:0,rl<RACK_UPC.length?'K:':null,rl<RACK_UPC.length&&G.nud<RACK_UPC[rl]);
    const rc=150+60*objs('rack').length;
    for(const p of SELLS.filter(x=>!IT[x].ench&&G.on[x]))h+=card(itemThumb(p),'Ek raf: '+IT[p].ad,'Aynı mal için ikinci raf. Kalabalıkta işe yarar.','',rc,'A:'+p,G.nud<rc);
    if(G.on.efsun)h+=card(itemThumb('alevli'),'Ek efsun vitrini','Bütün efsunlu eşyaları alır.','',rc,'A:vitrin',G.nud<rc);
    {const d=depoObj(),l=G.depoLv||0;if(!d)h+=card(itemThumb('zirh'),'Depo','Avluya büyük bir ambar. Rafa sığmayan mal çöpe gitmez, depoya gider; raf boşalınca hamallar geri getirir. Sultan ve büyük siparişler depodan da alır.','',DEPO_COST,'DP:',G.nud<DEPO_COST);
      else h+=card(itemThumb('zirh'),'Depo · '+DEPO_LVN[l],'Kapasite '+depoCap()+' mal. İçinde '+depoN(d)+' mal var.'+(l<DEPO_UP.length?' Büyüt: '+DEPO_CAP[l+1]+' mal.':''),lvBar(l,DEPO_UP.length),l<DEPO_UP.length?DEPO_UP[l]:0,l<DEPO_UP.length?'DU:':null,l<DEPO_UP.length&&G.nud<DEPO_UP[l]);}
    const kc=1500*objs('kasa').length;h+=card(itemThumb('kagit'),'Ek kasa','İkinci kuyruk. Bir kâtip daha tutabilirsin.','',kc,'C:',G.nud<kc);
    h+=card(thumb('cop',()=>{g.scale(.8,.8);g.translate(0,10);drawCop({x:0,y:0});}),'Ek çöp kovası','Fazla eşyayı atmak için. Hamallar da kullanır.','',100,'O:',G.nud<100);}
  else if(T0==='urun'){h+=sec('Kalite yükselt: fiyat katlanır');
    for(const id of BASES){if(!G.on[id])continue;const q=G.qual[id],c=q<QMAX?qcost(id,q):0;
      h+=card(itemThumb(id),IT[id].ad+' · '+QN[q],q<QMAX?`Fiyat ${nudStr(price(id))} → ${nudStr(Math.round(IT[id].base*QM[q+1]))} nüd`:'En yüksek kalite!',lvBar(q,QMAX),c,q<QMAX?'Q:'+id:null,q<QMAX&&G.nud<c);}
    if(G.on.simya){h+=sec('Simya eşyaları (iksir + eşya)');for(const e of SIMYA){const b=IT[e].simb;h+=card(itemThumb(e),IT[e].ad,G.on[b]?`${IT[b].ad} + iksir · <b>${nudStr(price(e))} nüd</b>`:`${IT[b].ad} henüz yok.`,'',0,null);}}
    if(G.on.efsun){h+=sec('Efsunlu eşyalar (parşömen + eşya)');for(const e of ENCH){const b=IT[e].ench;const ok=G.on[b];
      h+=card(itemThumb(e),IT[e].ad,ok?`${IT[b].ad} + parşömen · <b>${nudStr(price(e))} nüd</b>`:`${IT[b].ad} henüz yok.`,'',0,null);}}
    else h+=`<div class="d" style="margin:8px 2px">Efsun masası açılınca parşömenle eşyaları birleştirip efsunlu mal yapabileceksin.</div>`;}
  else if(T0==='gelisim'){h+=sec('İdiz\'in gelişimi');
    for(const k in UPG){const U0=UPG[k],l=G.upg[k];h+=card(itemThumb(U0.ic),U0.ad,l<U0.max?U0.desc(l):'Tamamen gelişti!',lvBar(l,U0.max),l<U0.max?U0.cost[l]:0,l<U0.max?'U:'+k:null,l<U0.max&&G.nud<U0.cost[l]);}}
  else if(T0==='ekip'){
    const roles=['hamal','katip'].concat(G.lonca?USTA_ROLES:[]);
    if(G.man&&G.man.met){const gi=G.man.gifts||{};h+=sec('💗 '+MAN_NAME)+manBar()+`<div class="d" style="margin:0 2px 8px">${G.man.wife?'Dükkânın hanımı: ustalar ve hamallar %20, kasa %15 hızlı, müşteriler %15 sabırlı.':'Dükkâna uğradığında yanına git: mani oku, aş ikram et ya da sevdiği malı hediye et. Uğradığında konuşmazsan ağlayarak gider.'}</div>`+(Object.keys(gi).length?`<div class="att">`+MAN_GIFTS.filter(x=>gi[x.id]).map(x=>`<span style="background:#ffe0ec">${x.ic} ${x.ad}: ${x.ef}</span>`).join('')+`</div>`:'');}
    h+=sec('İşe al');
    for(const r of roles){const R=ROLES[r];if(r==='hamal'&&G.step<2)continue;if(r==='katip'&&G.step<4)continue;const n=roleCount(r);const c=Math.round(hireCost(r));
      const full=(R.max&&n>=R.max)||(R.st&&!objs('st',o=>o.type===R.st&&!G.workers.some(w=>w.a===o.uid)).length)||(r==='katip'&&!objs('kasa',o=>!G.workers.some(w=>w.role==='katip'&&w.a===o.uid)).length);
      if(R.st&&!objs('st',o=>o.type===R.st).length)continue;
      h+=card(roleThumb(r),R.ad+(n?' ×'+n:''),R.desc+` Ücret ${wage(r)} nüd/gün.`,'',c,full?null:'W:'+r,G.nud<c);
      if(full&&R.st)h+=`<div class="d" style="margin:-4px 0 10px 66px">Her tezgâha bir usta. Daha fazlası için Atölye'den ${ST[R.st].ad.toLowerCase()} al.</div>`;}
    if(!G.lonca&&G.step>=4)h+=`<div class="d" style="margin:4px 2px 8px">Ustalar Loncası açılınca içeride çalışan usta tutabileceksin.</div>`;
    {const hs=G.workers.filter(w=>w.role==='hamal');if(hs.length>=2){h+=sec('🧭 Hamal vardiyası')+`<div class="d" style="margin:0 2px 6px">Kapalıyken hamallar kendileri karar verir: pahalı malı önce taşır, aynı işe üşüşmez. Açarsan her hamala bir görev verebilirsin; o işte iş yoksa yardıma koşar.</div><button class="buy" data-id="VS:" style="margin:0 0 8px;background:${G.shiftOn?'#9ad07a':'#fff7e6'}">${G.shiftOn?'✔ Vardiya yönetimi AÇIK':'Vardiya yönetimi KAPALI (otomatik)'}</button>`;
      if(G.shiftOn){const DU=[['auto','Otomatik'],['ham','Hammadde'],['raf','Raf'],['kombo','Efsun·Simya'],['depo','Depo·Teslim']];hs.forEach((w,i)=>{h+=`<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin:4px 0"><b style="font:700 13px Fredoka,sans-serif;width:64px">Hamal ${i+1}</b>`+DU.map(([k,n])=>`<button class="buy" data-id="VD:${w.id}.${k}" style="font-size:11.5px;padding:4px 8px;${(w.duty||'auto')===k?'background:#f0b43c':'background:#fff7e6'}">${n}</button>`).join('')+`</div>`;});}}}
    if(G.workers.length){h+=sec('Ekibin (dokun: izin ver / işe çağır)');
      for(const w of G.workers){h+=card(roleThumb(w.role),ROLES[w.role].ad,w.off?'<b style="color:#c9463d">Yarın izinli, ücret almaz.</b>':'Yarın iş başında · '+wage(w.role)+' nüd','',0,'E:'+w.id,false,w.off?'💤 İzinli':'✔ Çalışıyor');}}
    const grp=[['hamal','Hamallar'],['katip','Kâtipler'],['usta','Ustalar'],['bekci','Bekçiler']];
    for(const [k,nm] of grp){const has=k==='usta'?G.workers.some(w=>USTA_ROLES.includes(w.role)):roleCount(k)>0;if(!has)continue;h+=sec(nm+': yetenekler');
      for(const s in SKILL[k]){const l=G.skill[k][s],S0=SKILL[k][s];h+=card(roleThumb(k==='usta'?'demirci':k),S0[0],S0[1]+' (seviye başına)',lvBar(l,3),l<3?SKCOST[l]:0,l<3?'S:'+k+'.'+s:null,l<3&&G.nud<SKCOST[l]);}}}
  else if(T0==='insaat'){const k=clamp(G.nud/DREAM,0,1);
    h+=sec('Büyük hayal · yemin')+card(headThumb('anne',HAMAL),G.dream?'Aile Agreguk\'ta! 💚':'Aileyi Agreguk\'a getir',G.dream?'Annesi dükkânda, babası ve kız kardeşi tarlada.':'Kervancıbaşı Dermançöl\'den kaçırmak için '+nudStr(DREAM)+' nüd istiyor. Uçuk mu? Çok uçuk!',G.dream?'':`<span class="chip f">${fmt(G.nud)} / ${fmt(DREAM)}</span><span class="chip">%${(k*100).toFixed(k<.1?2:1)}</span>`,DREAM,G.dream?null:'R:',G.nud<DREAM);
    const sl=G.shopLv,mx=SHOP_COST.length;h+=sec('Dükkân')+card(itemThumb('kulce'),'Dükkânı büyüt',sl<mx?'Daha çok tezgâh, daha çok müşteri, +2 şöhret.':'Pazarın en büyük tezgâhı!',lvBar(sl,mx),sl<mx?SHOP_COST[sl]:0,sl<mx?'B:':null,sl<mx&&G.nud<SHOP_COST[sl]);
    const hl=G.houseLv;h+=sec('Ev · '+HOUSE_LV[hl].ad)+card(houseThumb(Math.min(3,hl+1)),hl<3?'Evi yükselt: '+HOUSE_LV[hl+1].ad:'Konak!',hl<3?'Her seviye sabah hızı +%3. Evdeki süsler de dinlendirir.':'Sürtünkaya\'da böylesi yok.',lvBar(hl,3),hl<3?HOUSE_COST[hl]:0,hl<3?'H:':null,hl<3&&G.nud<HOUSE_COST[hl]);
    const kl=G.kervan;h+=sec('Kervan ortaklığı')+card(itemThumb('kulce'),kl<KERVAN.length?'Kervana ortak ol ('+(kl+1)+'. pay)':'Bütün kervanlara ortaksın!',kl<KERVAN.length?'Uçmakan kervanlarına sermaye koy. Her akşam pay gelir: günde '+nudStr(kervanPay())+' → '+nudStr(kervanPay()+KERVAN[kl].pay)+' nüd.':'Günde '+nudStr(kervanPay())+' nüd kervan payı.',lvBar(kl,KERVAN.length),kl<KERVAN.length?KERVAN[kl].cost:0,kl<KERVAN.length?'N:':null,kl<KERVAN.length&&G.nud<KERVAN[kl].cost);
    h+=`<div class="d" style="margin:2px 2px 8px">Dinlenme: sabah hızı +%${Math.round((rest()-1)*100)}. Her sabah evde uyanırsın.</div>`;
    h+=sec('Düzen')+(G.plan?`<div class="d" style="margin:0 2px 8px">Mimarın planı yürürlükte: önde kasa, ortada koridor, raflar kapıya yakın, atölye arkada. Yeni alımlar ve dükkân büyümesi plana göre yerleşir.</div><div style="display:flex;gap:6px;flex-wrap:wrap;margin:0 0 8px"><button class="buy" data-id="RP:">📐 Yeniden diz</button><button class="buy" data-id="RV:" style="background:#fff7e6">↩ Eski düzene dön</button></div>`:card(itemThumb('kalem'),'Mimar Pergelzade\'nin düzen planı','Önde kasa, ortada mermer koridor, raflar kapıya yakın, atölye arkada; zemin de boyanır. İstediğin zaman eski düzene dönebilirsin.','',G.planPaid?0:PLAN_DESIGN_COST,'PL:',!G.planPaid&&G.nud<PLAN_DESIGN_COST,G.planPaid?'📐 Yeniden uygula':null));
    h+=sec('Zemin')+(G.yardTiles?`<div class="d">Avlu döşemesi açık.</div>`:card(tileThumb(7),'Avlu döşemesi','Avluyu da karo karo döşe: taş yollar, mermer meydan.','',2000,'V:',G.nud<2000));
    h+=`<div class="d" style="margin:4px 2px 8px">Düzenle → 🧱 Zemin ile döşe. Karo başına ${TILE_COST} nüd.</div>`;}
  else if(T0==='sus'){const a=attraction();const tot=Object.values(a).reduce((x,y)=>x+y,0)||1;const b=BF();
    h+=sec('Müşteri ilgisi · Şöhret '+fame())+`<div class="att">`+Object.keys(a).map(r=>`<span>${RACE_INTRO[r][0]} %${Math.round(a[r]/tot*100)}</span>`).join('')+`</div>`;
    const bl=Object.entries(BUFFN).filter(([k])=>b[k]>0);
    if(bl.length)h+=`<div class="att">`+bl.map(([k,n])=>`<span style="background:#e3f3d8">${n} ${k==='d20'?'+'+b[k]:k==='raw'?'−%'+Math.round(b[k]*100):'+%'+Math.round(b[k]*100)}</span>`).join('')+`</div>`;
    const groups=[['Dükkân içi',id=>!DECO[id].arch&&DECO[id].where.includes('in')&&!DECO[id].buff],['Efsane süsler (çok pahalı, çok etkili)',id=>DECO[id].price>=90000],['Güçlü süsler (pahalı)',id=>DECO[id].buff&&DECO[id].where.includes('in')&&DECO[id].price>=1000],['Mimari: bölme, kemer, paravan',id=>DECO[id].arch&&DECO[id].where.includes('in')],['Avlu, bahçe, reklam',id=>!DECO[id].where.includes('in')&&DECO[id].where.includes('out')],['Ev',id=>DECO[id].where==='home'||(DECO[id].where.includes('home')&&!DECO[id].where.includes('in')&&!DECO[id].where.includes('out'))]];
    const shown={};for(const [gn,fn] of groups){let any='';for(const id of DECO_IDS){if(shown[id]||!fn(id))continue;shown[id]=1;const D=DECO[id];let ch=D.fame?`<span class="chip f">Şöhret +${D.fame}</span>`:'';for(const r in D.like)ch+=`<span class="chip">${RACE_INTRO[r][0]} +${D.like[r]}</span>`;
      if(D.buff)for(const k in D.buff){const nm=BUFFN[k];ch+=`<span class="chip" style="background:#e0e8ff;border-color:#5a7ac0">${nm} ${k==='d20'?'+'+D.buff[k]:k==='raw'?'−%'+Math.round(D.buff[k]*100):'+%'+Math.round(D.buff[k]*100)}</span>`;}
      any+=card(decoThumb(id),D.ad,D.desc,ch,D.price,'D:'+id,G.nud<D.price);}if(any)h+=sec(gn)+any;}}
  else if(T0==='bahce'){if(!G.bahce){h+=`<div class="d" style="margin:10px 2px">"Bahçe Kiracıları" açılımını Atölye'den alınca avluna esnaf getirebilirsin.</div>`;}
    else{h+=sec('Kiracılar · komisyon %'+Math.round(KOM[G.kom]*100));
      for(const k in KIOSK){const K0=KIOSK[k];const o=findObj('kiosk',x=>x.kind===k);const l=G.kioskLv[k]||0;h+=card(roleThumb(K0.spec),K0.ad+(o?' · '+KIOSK_LVN[l]:''),K0.desc+(o?` Satış başı komisyon ${Math.round(K0.price*KIOSK_MUL[l]*KOM[G.kom])} nüd, günlük kira ${nudStr(KIOSK_RENT[l])}.`:''),o?lvBar(l,KIOSK_UP.length):'',o?0:K0.cost,o?null:'J:'+k,G.nud<K0.cost);
        if(o&&l<KIOSK_UP.length)h+=`<div style="margin:-4px 0 10px 66px"><button class="buy" data-id="Ü:${k}" ${G.nud<KIOSK_UP[l]?'disabled':''}>Büyüt: ${KIOSK_LVN[l+1]} · 🪙${fmt(KIOSK_UP[l])}</button></div>`;}
      if(G.kom<2)h+=card(itemThumb('kahve'),'Kira sözleşmesini yenile','Komisyon %'+Math.round(KOM[G.kom]*100)+' → %'+Math.round(KOM[G.kom+1]*100),lvBar(G.kom,2),KOMC[G.kom],'M:',G.nud<KOMC[G.kom]);
      h+=`<div class="d" style="margin:4px 2px 8px">Bahçe satışlarını ağaç, çardak ve tabelalar artırır (Süs sekmesi). Ayın ilk günü Ayların Halveti, arada Mani Gecesi, At Yarışı, Tuz Pazarı gibi şenlikler olur; o gün bahçe katlarca kazanır.</div>`;}}
  else if(T0==='guv'){const cc=catchChance();h+=sec('Hırsız yakalama şansı: %'+Math.round(cc*100))+`<div class="d" style="margin:0 2px 8px">Hırsızlar 3. günden sonra geceleri gelir, rafları boşaltır. Uyanıksan kendin yakalayabilirsin: hırsıza dokun!</div>`;
    const n=roleCount('bekci'),c=Math.round(hireCost('bekci'));h+=card(roleThumb('bekci'),ROLES.bekci.ad+(n?' ×'+n:''),ROLES.bekci.desc+` Ücret ${wage('bekci')} nüd/gün.`,'',c,n<ROLES.bekci.max?'W:bekci':null,G.nud<c);
    for(const k in SEC)h+=card(itemThumb(k==='kilit'?'kulce':'parsomen'),SEC[k].ad,SEC[k].desc,G.sec[k]?'<span class="chip">Kuruldu</span>':'',SEC[k].cost,G.sec[k]?null:'G:'+k,G.nud<SEC[k].cost);
    h+=`<div class="d" style="margin:4px 2px 8px">Fener ve Gözcü Kulesi süsleri de yakalama şansını artırır.</div>`;}
  else if(T0==='tellal'){h+=sec('Yarın için reklam')+card(itemThumb('parsomen'),'Tellal','Bütün pazarda dükkânını bağırır: yarın müşteri %60 fazla. Ücreti kazancınla büyür.',G.tellalNext?'<span class="chip">Yarın için tutuldu</span>':'',tellalCost(),'T:',G.nud<tellalCost()||G.tellalNext);
    h+=sec('Hedefli tellal ('+fmt(tellalCost(1))+'): bir soyu çağır');
    for(const r of RACE_IDS){if(!attraction()[r])continue;h+=card(raceThumb(r),RACE_INTRO[r][0]+'lara duyur','Favorisi: '+IT[PREF[r].fav].ad,G.tellalRaceNext===r?'<span class="chip">Yarın çağrıldı</span>':'',tellalCost(1),'T:'+r,G.nud<tellalCost(1)||!!G.tellalRaceNext);}}
  else if(T0==='meclis'){const de=dipEff();
    h+=sec('Diplomasi: Pâyendegan ile Dermançöl arasında')+(dipOn()?dipBar():`<div class="d" style="margin:0 2px 8px">15. günden sonra iki büyük devlet dükkânını izlemeye başlar.</div>`);
    if(dipOn()){h+=`<div class="d" style="margin:0 2px 6px">İkisi de 45'in üstünde ve aralarındaki fark 20'den azsa <b>Arras'ın dengesi</b>: fiyatlar +%8. 70'i geçen taraf himaye verir, 25'in altına düşen küser. Değerler her gün yavaşça 50'ye döner.</div>`;
      h+=de.tags.length?`<div class="att">`+de.tags.map(t=>`<span style="background:#e3f3d8">${t[0]} ${t[1]}: ${t[2]}</span>`).join('')+`</div>`:`<div class="d" style="margin:0 2px 8px">Şu an hiçbir taraf seni ayrıca kayırmıyor.</div>`;
      h+=`<div class="d" style="margin:0 2px 8px">Onaylarını etkileyenler: büyük siparişlerin sahibi, Sultan ve Haşmetşah ziyaretlerindeki tavrın, meclis kararların.</div>`;}
    h+=sec('Uçmakan Tüccar Meclisi');
    if(G.meclis)h+=`<div class="d" style="margin:0 2px 8px">Meclistesin. 2–3 günde bir sabah ateş başında bir karar vereceksin. Sıradaki toplantı: ${G.meclisNext}. gün.</div>`;
    else{const lk=G.shopLv<3||G.day<25;h+=card(itemThumb('parsomen'),'Meclise katıl','Pazarın büyükleriyle ateş başında otur: 2–3 günde bir kervan, vergi, hırsız ve diplomasi kararı verirsin. Şöhret +8, zengin müşteri artar.'+(lk?' <b style="color:#c9463d">Önce dükkân 3. seviye ve 25. gün olmalı.</b>':''),'',MECLIS_COST,'MC:',G.nud<MECLIS_COST||lk);}
    const ml=modList();if(ml.length){h+=sec('Yürürlükteki kararlar');h+=`<div class="att">`+ml.map(m=>`<span>${m.ad} · ${m.until-G.day+1} gün</span>`).join('')+`</div>`;}
    if(G.perm&&G.perm.raw)h+=`<div class="d" style="margin:0 2px 8px">Taş kervan yolu: hammadde kalıcı %${Math.round(G.perm.raw*100)} ucuz.</div>`;}
  catBody.innerHTML=h;
  catBody.querySelectorAll('.step button').forEach(b=>b.onclick=()=>{const [id,d]=b.dataset.o.split(':');changeOrder(id,+d);});
  catBody.querySelectorAll('.recs button').forEach(b=>b.onclick=()=>{const [u,b2]=b.dataset.id.slice(2).split('.');setRec(+u,b2);});
  catBody.querySelectorAll('.buy').forEach(b=>b.onclick=()=>{const [t,id]=b.dataset.id.split(':');
    ({L:()=>buyLadder(id),D:()=>buyDeco(id),R:()=>buyDream(),U:()=>buyUpg(id),Q:()=>buyQual(id),K:()=>buyRackUpg(),B:()=>buyShop(),H:()=>buyHouse(),
      S:()=>{const [k,s]=id.split('.');buySkill(k,s);},E:()=>{const w=G.workers.find(x=>x.id===+id);if(w){w.off=!w.off;sfx('pop');save();renderCat();}},
      X:()=>{buyStation(id);closeCat();setEdit(true);sel=G.objs[G.objs.length-1];camLock=false;camX=sel.x;camY=sel.y-30;},Y:()=>buyStUpg(id),Z:()=>buySupUpg(id),
      A:()=>{buyRack(id);closeCat();setEdit(true);sel=G.objs[G.objs.length-1];camLock=false;camX=sel.x;camY=sel.y-30;},C:()=>{buyKasa();closeCat();setEdit(true);sel=G.objs[G.objs.length-1];camLock=false;camX=sel.x;camY=sel.y-30;},
      O:()=>{if(pay(100)){const tmp={k:'cop'};G.objs.push(tmp);const a=placeAnchor(tmp);G.objs.pop();mkObj({k:'cop'},a[0],a[1]);after();}},W:()=>hire(id),G:()=>buySec(id),J:()=>{buyKiosk(id);closeCat();},'Ü':()=>buyKioskUp(id),P:()=>{const [u,b]=id.split('.');setRec(+u,b);},M:()=>buyKom(),V:()=>buyYardTiles(),RV:()=>{revertPlan();after();},RP:()=>{applyPlan();toast('Dükkân yeniden dizildi','');after();},PL:()=>buyPlan(),VS:()=>{G.shiftOn=!G.shiftOn;sfx('pop');save();renderCat();},VD:()=>{const [wid,dk]=id.split('.');const w=G.workers.find(x=>x.id===+wid);if(w){w.duty=dk;w.task=null;if(w.st!=='eat'&&w.st!=='mani'&&!w.stack.length)w.st='idle';}sfx('pop');save();renderCat();},SS:()=>sellStation(id),FA:()=>{fillAll();renderCat();updateBar();},FT:()=>{G.autoFill=!G.autoFill;if(G.autoFill)fillAll(true);sfx('pop');save();renderCat();},DP:()=>{buyDepo();closeCat();},DU:()=>buyDepoUp(),MC:()=>{joinMeclis();achieve('meclis');},N:()=>buyKervan(),T:()=>buyTellal(id||null)})[t]();});}

/* ====================== DİYALOG ====================== */
const dlg=document.getElementById('dlg');let dlgQ=[],dlgCb=null;
function showDialog(lines,cb,who){dlgQ=lines.slice();dlgCb=cb||null;paused=true;bar.style.display='none';
  const w=who||'idiz';document.getElementById('dlgImg').src=w==='anne'?headThumb('anne',HAMAL):headThumb('idiz',YAV);document.getElementById('dlgWho').textContent=w==='anne'?'Annesi':'İdiz';nextDialog();}
function nextDialog(){if(!dlgQ.length){dlg.classList.add('hidden');paused=false;updateBar();const c=dlgCb;dlgCb=null;if(c)c();return;}
  document.getElementById('dlgTxt').textContent=dlgQ.shift();dlg.classList.remove('hidden');sfx('pop',.6);document.getElementById('dlgBtn').textContent=dlgQ.length?'Devam ▸':'Haydi!';}
document.getElementById('dlgBtn').onclick=nextDialog;
document.getElementById('dreamBtn').onclick=()=>{document.getElementById('dream').classList.add('hidden');};

/* ====================== MENÜ VE KAYIT SLOTLARI ====================== */
const menu=document.getElementById('menu'),menuC=document.getElementById('menuC'),menuBtn=document.getElementById('menuBtn');let menuMode=null,menuPrevPause=false;
function slotLine(n,inGame){const s=slotInfo(n);const cur=inGame&&n===SLOT;
  const desc=s?`${s.dream?'💚 Aile burada · ':''}${s.day?s.day+'. gün':'Açılış gecesi'} · 🪙 ${fmt(s.nud)}${s.at?' · '+new Date(s.at).toLocaleDateString('tr-TR'):''}`:'Boş';
  let btns='';if(!inGame){btns=s?`<button class="buy" data-m="load:${n}">Devam</button><button class="buy del" data-m="del:${n}">🗑</button>`:`<button class="buy" data-m="new:${n}">Yeni oyun</button>`;}
  else{btns=cur?`<button class="buy" data-m="save">Kaydet</button>`:(s?`<button class="buy" data-m="load:${n}">Yükle</button><button class="buy" data-m="copy:${n}">Üstüne yaz</button>`:`<button class="buy" data-m="copy:${n}">Buraya kaydet</button>`);}
  return`<div class="mslot"><div class="t"><div class="n">Slot ${n}${cur?' · şu an':''}</div><div class="d">${desc}</div></div>${btns}</div>`;}
function renderMenu(){const inGame=menuMode==='game';let h=`<h2>${inGame?'Menü':'İdiz\'in Tezgâhı'}</h2>`;
  if(inGame)h+=`<button class="mbtn" data-m="close">▶ Oyuna dön</button>`;
  h+=`<div class="sec" style="text-align:left">${inGame?'Kayıtlar (her gece otomatik kaydedilir)':'Kayıt seç'}</div>`+[1,2,3].map(n=>slotLine(n,inGame)).join('');
  if(inGame&&G.phase==='day')h+=`<div class="d">Gündüz kayıt yapılmaz; gece otomatik kaydedilir.</div>`;
  h+=`<button class="mbtn sec" data-m="snd">${['🔊 Ses: açık','🎵 Müzik kapalı','🔇 Sessiz'][sndMode]}</button><button class="mbtn sec" data-m="how">❓ Nasıl oynanır</button>`;
  if(inGame)h+=`<button class="mbtn sec" data-m="title">🏠 Ana menü</button>`;
  menuC.innerHTML=h;
  menuC.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{const [a,n]=b.dataset.m.split(':');menuAct(a,+n);});}
function openMenu(mode){menuMode=mode;if(mode==='game'){menuPrevPause=paused;paused=true;bar.style.display='none';}renderMenu();menu.classList.remove('hidden');sfx('pop',.6);}
function closeMenu(){menu.classList.add('hidden');if(menuMode==='game'){paused=menuPrevPause;updateBar();}menuMode=null;}
function menuAct(a,n){initAudio();sfx('pop',.5);
  if(a==='close')closeMenu();
  else if(a==='snd'){sndMode=(sndMode+1)%3;if(AC)musicBus.gain.setTargetAtTime(sndMode===0?.2:0,AC.currentTime,.1);renderMenu();}
  else if(a==='how'){menuC.innerHTML=`<h2>Nasıl oynanır</h2><div class="how">
    <p><b>Gündüz</b> satış zamanı. Joystick ile yürü. Sandıktan ham madde al, tezgâhın <b>sol yanında</b> durursan malzemeyi koyar ve üretirsin. Biten mal tezgâhın <b>sağ yanındaki tablada</b> birikir; oradan al, rafa diz. Kasaya geç, satış yap, nüdleri topla.</p>
    <p><b>Gece</b> sınırsızdır: 📦 Sipariş ile yarının ham maddesini ısmarla, 🛒 Defter'den yatırım yap, 🛠 Düzenle ile her şeyi taşı. 💤 Uyu'ya basınca İdiz yatağına koşar; sabah evinde uyanır.</p>
    <p><b>Çöp kovası</b>: fazla eşyayı yanına gidip at. <b>Hırsız</b> gelirse ona dokun!</p>
    <p><b>Efsun</b>: Efsun masasına bir parşömen ve bir eşya koy, efsunlu eşya çıksın. Her soyun favori malı var; Defter → Müşteriler'e bak.</p>
    <p><b>Kamera</b>: iki parmakla ya da ＋/－ ile yakınlaş, ⌂ ile eve bak. 📜 Kodeks'te müşterilerin neyi sevdiği yazar.</p><p><b>Sabah</b> evde uyanırsın; gün, sen dükkâna girince başlar. <b>7 ile biten günlerde</b> bir ilah zar attırır!</p></div><button class="mbtn" data-m="back">Geri</button>`;
    menuC.querySelector('[data-m=back]').onclick=()=>{sfx('pop',.5);renderMenu();};}
  else if(a==='new'){closeMenu();SLOT=n;newRun();save();startCut();}
  else if(a==='load'){if(menuMode==='game'&&G.phase==='night'&&G.story>0)save();loadSlot(n);closeMenu();document.getElementById('sum').classList.add('hidden');MODE='game';startGame();}
  else if(a==='del'){if(confirmDel===n){deleteSlot(n);confirmDel=0;renderMenu();}else{confirmDel=n;b2(n);}}
  else if(a==='save'){if(G.phase!=='night'){toast('Gündüz kayıt yok','Gece otomatik kaydedilir.');return;}save();toast('Kaydedildi','Slot '+SLOT);renderMenu();}
  else if(a==='copy'){if(G.phase!=='night'){toast('Gündüz kayıt yok','Gece otomatik kaydedilir.');return;}SLOT=n;save();toast('Kaydedildi','Artık Slot '+n+' üzerinde oynuyorsun.');renderMenu();}
  else if(a==='title'){if(G.phase==='night'&&G.story>0)save();menu.classList.add('hidden');menuMode=null;goTitle();}}
let confirmDel=0;function b2(n){const el2=menuC.querySelector(`[data-m="del:${n}"]`);if(el2){el2.textContent='Emin misin?';}}
menuBtn.onclick=()=>{if(MODE==='game')openMenu('game');};
function goTitle(){MODE='intro';ITT=5;paused=true;bar.style.display='none';menuBtn.style.display='none';document.getElementById('zoom').style.display='none';closeCat();document.getElementById('sum').classList.add('hidden');dlg.classList.add('hidden');setMusic('main');openMenu('start');}

/* ====================== ÇUBUK, DÜZENLE ====================== */
const bar=document.getElementById('bar'),bCat=document.getElementById('bCat'),bOrd=document.getElementById('bOrd'),bEdit=document.getElementById('bEdit'),bSleep=document.getElementById('bSleep'),bSell=document.getElementById('bSell'),bPaint=document.getElementById('bPaint'),pal=document.getElementById('pal');
bCat.onclick=()=>openCat(catTab==='siparis'?'atolye':catTab);bOrd.onclick=()=>openCat('siparis');bEdit.onclick=()=>{setEdit(!EDIT);sfx('pop',.6);};
bSleep.onclick=()=>{if(G.phase!=='night'||G.auto)return;if(G.story===1){toast('Önce sipariş!','İdiz: "Kervana külçe yazmadan uyursak yarın satacak mal yok!"');openCat('siparis');return;}autoBed();};
bSell.onclick=()=>{if(sel&&sel.k==='deco'){const D=DECO[sel.d];G.nud+=Math.round(D.price/2);G.objs=G.objs.filter(o=>o!==sel);sel=null;GRID=null;G.bf=null;sfx('coin');floatTxt(G.p.x,G.p.y-60,'+'+Math.round(D.price/2));save();updateBar();}};
bPaint.onclick=()=>{PAINT=PAINT===null?0:null;buildPal();updateBar();sfx('pop',.5);};
function buildPal(){if(PAINT===null){pal.style.display='none';return;}pal.style.display='flex';pal.style.flexWrap='wrap';
  pal.innerHTML=TILES.map((t,i)=>`<button data-t="${i}" class="${PAINT===i?'sel':''}" style="background-image:url(${tileThumb(i)})" title="${t.ad}"></button>`).join('')+`<button data-t="-1" class="${PAINT===-1?'sel':''}" style="background:#fff7e6">Sil</button>`;
  pal.querySelectorAll('button').forEach(b=>b.onclick=()=>{PAINT=+b.dataset.t;buildPal();sfx('pop',.4);});}
function setEdit(v){EDIT=v&&G.phase==='night';sel=null;drag=null;pan=null;camLock=!EDIT;if(!EDIT){PAINT=null;buildPal();GRID=null;G.bf=null;if(G.story>0)save();}updateBar();}
function updateBar(){const night=MODE==='game'&&G&&G.phase==='night'&&!paused&&cat.classList.contains('hidden')&&!G.auto&&menu.classList.contains('hidden');bar.style.display=night?'flex':'none';
  document.getElementById('zoom').style.display=MODE==='game'&&!paused?'flex':'none';menuBtn.style.display=MODE==='game'?'block':'none';
  bEdit.textContent=EDIT?'✔ Bitti':'🛠 Düzenle';bEdit.classList.toggle('done',EDIT);bCat.classList.toggle('hidden',EDIT);bOrd.classList.toggle('hidden',EDIT);bSleep.classList.toggle('hidden',EDIT);
  bPaint.classList.toggle('hidden',!EDIT);bPaint.classList.toggle('on',PAINT!==null);bSell.classList.toggle('hidden',!(EDIT&&sel&&sel.k==='deco'));
  const nb=G?LADDER[G.step]:null;bCat.classList.toggle('glow',!!(G&&((nb&&G.nud>=LADDER_INFO[nb].cost&&!(LADDER_INFO[nb].need&&G.shopLv<LADDER_INFO[nb].need))||(!G.dream&&G.nud>=DREAM))&&!EDIT));
  bOrd.classList.toggle('glow',!!(G&&G.story===1));bSleep.classList.toggle('glow',!!(G&&G.story===2));}
function autoBed(){setEdit(false);closeCat();const p=G.p;const path=findPath(p.x,p.y,BED.x,BED.y+36);G.auto={path};p.path=path;bar.style.display='none';say(p,rnd(["Haydi yatağa!","Yarın büyük gün!","Uykum geldi..."]),1.5);}

/* ====================== GİRDİ ====================== */
const joy={on:false,bx:0,by:0,x:0,y:0,id:null};const keys={};const ptrs=new Map();let pinch=null;
function WS(){return SC*ZOOM;}
function toW(cx0,cy0){return{x:(cx0-innerWidth/2)/WS()+camX,y:(cy0-innerHeight/2)/WS()+camY};}
function setZoom(z){ZOOM=clamp(z,.45,1.6);}
function hitObj(w){const L=G.objs.slice().sort((a,b)=>(isFlat(a)?0:1)-(isFlat(b)?0:1)||b.y-a.y);
  for(const o of L){const f=fpOf(o);const tall=o.k==='deco'&&o.d==='duvar_d'?50:isFlat(o)?4:46;if(w.x>f[0]-4&&w.x<f[2]+4&&w.y>f[1]-tall&&w.y<f[3]+6)return o;}return null;}
cv.addEventListener('pointerdown',e=>{
  initAudio();
  if(MODE==='splash'){MODE='intro';ITT=0;sfx('whoosh');return;}
  if(MODE==='intro'){if(ITT<4.7){ITT=4.7;skipIntro();}else if(menu.classList.contains('hidden'))openMenu('start');return;}
  if(MODE==='cut'){cutNext(e);return;}
  if(MODE==='sleep'){if(ST2>1.2)ST2=Math.max(ST2,3.9);return;}
  ptrs.set(e.pointerId,{x:e.clientX,y:e.clientY});try{cv.setPointerCapture(e.pointerId);}catch(_){}
  if(ptrs.size===2){const [a,b]=[...ptrs.values()];pinch={d:Math.hypot(a.x-b.x,a.y-b.y),z:ZOOM};joy.on=false;drag=null;pan=null;return;}
  if(paused)return;
  if(EDIT){const w=toW(e.clientX,e.clientY);
    if(PAINT!==null){drag={paint:true};paintAt(w.x,w.y);return;}
    const o=hitObj(w);
    if(o){sel=o;drag={o,ox:o.x-w.x,oy:o.y-w.y,x0:o.x,y0:o.y,valid:true};sfx('pop',.5);}
    else{sel=null;pan={sx:e.clientX,sy:e.clientY,cx:camX,cy:camY};}
    updateBar();return;}
  joy.on=true;joy.id=e.pointerId;joy.bx=joy.x=e.clientX;joy.by=joy.y=e.clientY;});
cv.addEventListener('pointermove',e=>{
  if(ptrs.has(e.pointerId))ptrs.set(e.pointerId,{x:e.clientX,y:e.clientY});
  if(pinch&&ptrs.size>=2){const [a,b]=[...ptrs.values()];setZoom(pinch.z*Math.hypot(a.x-b.x,a.y-b.y)/Math.max(10,pinch.d));return;}
  if(EDIT){const w=toW(e.clientX,e.clientY);
    if(drag&&drag.paint){paintAt(w.x,w.y);return;}
    if(drag){drag.o.x=Math.round((w.x+drag.ox)/10)*10;drag.o.y=Math.round((w.y+drag.oy)/10)*10;drag.valid=validPos(drag.o);
      const vx=innerWidth/2/WS(),vy=innerHeight/2/WS();if(w.x>camX+vx*.8)camX+=5;if(w.x<camX-vx*.8)camX-=5;if(w.y>camY+vy*.7)camY+=5;if(w.y<camY-vy*.6)camY-=5;}
    else if(pan){camX=pan.cx-(e.clientX-pan.sx)/WS();camY=pan.cy-(e.clientY-pan.sy)/WS();}return;}
  if(!joy.on||e.pointerId!==joy.id)return;joy.x=e.clientX;joy.y=e.clientY;});
const endPtr=e=>{ptrs.delete(e.pointerId);if(pinch){if(ptrs.size<2)pinch=null;return;}
  if(EDIT){if(drag&&drag.paint){drag=null;save();return;}if(drag){if(!drag.valid){drag.o.x=drag.x0;drag.o.y=drag.y0;sfx('angry',.4);}else{sfx('drop');puff('dust',drag.o.x,drag.o.y,5,30);GRID=null;G.bf=null;save();}drag=null;}pan=null;updateBar();return;}
  if(e.pointerId===joy.id)joy.on=false;};
cv.addEventListener('pointerup',endPtr);cv.addEventListener('pointercancel',endPtr);
cv.addEventListener('wheel',e=>{if(MODE!=='game')return;e.preventDefault();setZoom(ZOOM*Math.exp(-e.deltaY*.0015));},{passive:false});
document.getElementById('zIn').onclick=()=>{setZoom(ZOOM*1.25);sfx('pop',.4);};
document.getElementById('zOut').onclick=()=>{setZoom(ZOOM/1.25);sfx('pop',.4);};
document.getElementById('zHome').onclick=()=>{sfx('pop',.4);const H=HOUSE();if(CAMT&&CAMT.home){CAMT=null;camLock=!EDIT;}else{camLock=false;CAMT={x:(H.x0+H.x1)/2+60,y:(H.y0+H.y1)/2,home:true};}};
addEventListener('keydown',e=>{keys[e.key.toLowerCase()]=true;if(MODE!=='game'&&MODE!=='intro'&&(e.key===' '||e.key==='Enter'))cv.dispatchEvent(new PointerEvent('pointerdown',{clientX:innerWidth/2,clientY:innerHeight/2}));
  if(MODE==='game'&&(e.key==='+'||e.key==='='))setZoom(ZOOM*1.2);if(MODE==='game'&&e.key==='-')setZoom(ZOOM/1.2);});
addEventListener('keyup',e=>{keys[e.key.toLowerCase()]=false;});
document.getElementById('sumBtn').onclick=()=>{document.getElementById('sum').classList.add('hidden');toNight();};
