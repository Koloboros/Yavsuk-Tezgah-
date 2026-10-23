
/* ====================== ÜRETİM ====================== */
function stOutN(o){return o.out.length+o.fin.length;}
function ocakNear(o,r){return objs('st',q=>q.type==='ocak'&&Math.hypot(q.x-o.x,q.y-o.y)<(r||190));}
function canCraft(o){const S0=ST[o.type];if(S0.auto||stOutN(o)>=outCap(o.type))return false;
  if(S0.combo){return o.inp.indexOf(S0.combo)>=0&&o.inp.indexOf(o.rec)>=0&&!!comboOut(o);}
  if(o.inp.length)return true;
  if(o.type==='ors'){for(const oc of ocakNear(o)){const i=oc.out.indexOf('kizgin');if(i>=0){oc.out.splice(i,1);o.inp.push('kizgin');return true;}}}
  return false;}
function craftStep(o,who){const S0=ST[o.type];if(!canCraft(o))return;
  o.craft++;const wx=o.x,wy=o.y;
  if(S0.tool==='hammer'){sfxAt('clang',wx,wy,.9);sparks(wx-6,wy-30,10);if(who===G.p)shake=Math.max(shake,1.6);}
  else if(S0.tool==='mallet'){sfxAt('thump',wx,wy);puff('fluff',wx-6,wy-30,3,30);if(who===G.p)shake=Math.max(shake,1);}
  else{sfxAt('scratch',wx,wy);fx(S0.combo?'magic':'ink',wx-10+Math.random()*12,wy-34,{vx:(Math.random()-.5)*30,vy:-26,t:.6});}
  if(o.craft>=S0.strikes){o.craft=0;let out;
    if(S0.combo){o.inp.splice(o.inp.indexOf(S0.combo),1);o.inp.splice(o.inp.indexOf(o.rec),1);out=comboOut(o);achieve('efsun');sfx('sparkle',.8);}
    else{o.inp.shift();out=S0.out;}
    o.fin.push({id:out,t:S0.finish});if(who===G.p)G.tut.forged=true;
    if(who!==G.p&&G.skill.usta.titiz&&Math.random()<.15*G.skill.usta.titiz/3*3&&stOutN(o)<outCap(o.type)){o.fin.push({id:out,t:S0.finish+.4});}}}
function stationTick(o,dt,day){const S0=ST[o.type];
  if(S0.auto){if(day&&o.inp.length&&o.out.length<outCap(o.type)){o.heat+=dt;
      if(o.type==='ocak'&&Math.random()<dt*2)fx('ember',o.x+(Math.random()-.5)*16,o.y-24,{vy:-30,vx:(Math.random()-.5)*10,t:.7});
      if(o.type==='imbik'&&Math.random()<dt*3)fx('bubble',o.x-4+(Math.random()-.5)*20,o.y-40,{vy:-20,t:.8});
      if(o.heat>=S0.t*evC()){o.heat=0;o.inp.shift();o.out.push(S0.out);sfxAt(o.type==='ocak'?'fire':'pop',o.x,o.y,.45);}}
    else o.heat=0;}
  for(let i=o.fin.length-1;i>=0;i--){o.fin[i].t-=dt;if(o.fin[i].t<=0){const id=o.fin[i].id;o.fin.splice(i,1);o.out.push(id);
    if(o.type==='ors'){sfxAt('hiss',o.x,o.y,.8);puff('steam',o.x+30,o.y-26,6,14);}else if(o.type==='kece'||o.type==='deri')sfxAt('snip',o.x,o.y);else{sfxAt('stamp',o.x,o.y);}}}}

/* ====================== HAMAL GÖREVLERİ ====================== */
function fillK(r){return rackN(r)/rackCap(r);}
function bestDest(id,from){
  if(id==='kizgin'){let best=null,bd=1e9;for(const o of objs('st',q=>q.type==='ors'&&stAccepts(q,'kizgin'))){if(ocakNear(o).some(q=>q.out.length||q.inp.length))continue;const d=Math.hypot(o.x-from.x,o.y-from.y);if(d<bd){bd=d;best=o;}}return best;}
  const racks=objs('rack',r=>rackAccepts(r,id)&&rackN(r)<rackCap(r));racks.sort((a,b)=>fillK(a)-fillK(b));
  const C=G.contract;if(C&&C.item===id&&C.got<C.need){const t=findObj('teslim');if(t&&(!racks.length||fillK(racks[0])>=.4||G.day>=C.due))return t;}
  const ef=objs('st',q=>ST[q.type].combo&&stAccepts(q,id)).sort((a,b)=>a.inp.length-b.inp.length);
  if(ef.length&&(!racks.length||fillK(racks[0])>=.5))return ef[0];
  return racks[0]||depoFor(id);}
function taskKind(t){if(t.src.k==='sup')return 'ham';if((t.dst.k==='st'&&ST[t.dst.type].combo)||(t.src.k==='st'&&ST[t.src.type].combo))return 'kombo';if(t.dst.k==='depo'||t.src.k==='depo'||t.dst.k==='teslim')return 'depo';return 'raf';}
function stVal(o){const S0=ST[o.type];const out=S0.combo?comboOut(o):S0.out==='kizgin'?'yatagan':S0.out;return out&&IT[out]?price(out):10;}
function demandMap(){if(G._demT>G.t)return G._dem;G._demT=G.t+.8;const D={};const add=(id,v)=>{if(id)D[id]=(D[id]||0)+v;};
  for(const c of G.cust){if(c.pass||!c.want)continue;if(c.st==='in')add(c.want,1.5);else if(c.st==='rack'){const rk=byUid(c.rack);add(c.want,rk&&(rk.stock[c.want]||0)>0?1:4);}}
  for(const id of onSells()){add(id,Math.min(3,(G.lastSold[id]||0)/4));const rs=objs('rack',r=>rackAccepts(r,id));let n=0,cp=0;for(const r of rs){n+=r.stock[id]||0;cp+=rackCap(r);}if(cp&&n/cp<.25)add(id,2);if(cp&&n===0)add(id,2);}
  if(G.contract&&G.contract.got<G.contract.need)add(G.contract.item,2.5);G._dem=D;return D;}
function stockFill(id){let n=0,cp=0;for(const r of objs('rack',r=>rackAccepts(r,id))){n+=r.stock[id]||0;cp+=rackCap(r);}return cp?n/cp:1;}
function hamalTasks(h){const T=[];const bz=h.role==='burkazur';const D=demandMap();const dm=id=>D[id]||0;const lv=id=>Math.log10((IT[id]&&IT[id].sell?price(id):10)+10);
  if(!bz)for(const o of G.objs){if(o.k!=='st'||!o.out.length)continue;const id=o.out[o.out.length-1];const d=bestDest(id,o);if(!d)continue;
    let pri=id==='kizgin'?6:d.k==='rack'?6+2.2*dm(id)+(1-fillK(d))*3:d.k==='depo'?2:5;pri+=lv(id)+(o.out.length>=outCap(o.type)-1?4:0);if(d.k==='st'&&ST[d.type].combo)pri+=1.5*dm(comboOut(d));
    T.push({src:o,item:id,dst:d,n:o.out.length,pri});}
  const dp=depoObj();if(dp&&!bz){const C=G.contract;for(const id in dp.stock){if(!(dp.stock[id]>0))continue;
      if(C&&C.item===id&&C.got<C.need){const t=findObj('teslim');if(t)T.push({src:dp,item:id,dst:t,n:dp.stock[id],pri:8+lv(id)});continue;}
      const rk=objs('rack',r=>rackAccepts(r,id)&&fillK(r)<.6).sort((a,b)=>fillK(a)-fillK(b))[0];if(rk)T.push({src:dp,item:id,dst:rk,n:dp.stock[id],pri:4+2.5*dm(id)+(1-fillK(rk))*3+lv(id)});}}
  for(const s of objs('sup')){if(G.sup[s.item]<=0)continue;for(const st of objs('st',o=>ST[o.type].in.includes(s.item))){const room=inCap(st.type)-st.inp.length;if(room<2)continue;
      const S0=ST[st.type];const out=S0.combo?comboOut(st):S0.out==='kizgin'?'yatagan':S0.out;const f=out?stockFill(out):1;
      let pri=3+Math.min(4,room*.5)+(st.inp.length===0?2.5:0)+2.4*dm(out)+(1-f)*4+lv(out||'kulce');if(f>=.9&&stOutN(st)>=outCap(st.type)/2)pri-=9;
      T.push({src:s,item:s.item,dst:st,n:room,pri});}}
  const hc=bz?2:3+2*G.skill.hamal.guc,duty=G.shiftOn&&h.duty&&h.duty!=='auto'?h.duty:null;
  for(const t of T){const busy=G.workers.filter(w=>w!==h&&w.task&&w.task.src===t.src&&w.task.item===t.item&&w.task.dst===t.dst).length;const allow=Math.max(1,Math.ceil((t.n||1)/hc));if(busy>=allow)t.pri-=40;else t.pri-=busy*3;
    const same=G.workers.filter(w=>w!==h&&w.task&&w.task.item===t.item).length;t.pri-=same*1.2;
    const sx=t.src.x-h.x,sy=t.src.y-h.y;t.pri-=Math.sqrt(sx*sx+sy*sy)/380;
    if(duty){t.pri+=taskKind(t)===duty?30:-12;}}
  return T.sort((a,b)=>b.pri-a.pri);}
function hamalAI(h,dt){
  const sk=G.skill.hamal,bz=h.role==='burkazur',hs=(h.hunger<25?46:76)*(1+.2*sk.hiz)*(1+BF().hspd)*(bz?.7:1),hcap=bz?2:3+2*sk.guc;
  if(h.st==='idle'){if(h.stack.length){const top=h.stack[h.stack.length-1];const d=bestDest(top,h);if(d){h.task={src:null,item:top,dst:d};h.st='carry';const q=d.k==='st'?craftP(d):ip(d);goTo(h,q.x,q.y);}else if(SELLS.includes(top)){h.holdT=(h.holdT||0)+dt;follow(h,hs*.5,dt);}else{h.st='dump';h.t=0;const c=nearestK('cop',h);if(c){const q=ip(c);goTo(h,q.x,q.y);}}return;}
    const t=hamalTasks(h)[0];
    if(t){h.task=t;h.st='go';const q=t.src.k==='st'?trayP(t.src):ip(t.src);goTo(h,q.x+(Math.random()-.5)*10,q.y);}
    else{const kz=findObj('askazan');if(kz&&(!h.path||!h.path.length)&&Math.hypot(h.x-kz.x,h.y-kz.y)>60){const q=ip(kz);goTo(h,q.x-30+Math.random()*60,q.y+10);}follow(h,hs*.6,dt);}
    return;}
  const tk=h.task;
  if(h.st==='go'){if(follow(h,hs,dt)){h.st='load';h.t=0;}}
  else if(h.st==='load'){h.t+=dt;if(h.t>.2){h.t=0;const s=tk.src;
    if(h.stack.length<hcap){if(s.k==='sup'&&G.sup[s.item]>0&&(tk.dst.k!=='st'||h.stack.length<inCap(tk.dst.type)-tk.dst.inp.length)){G.sup[s.item]--;h.stack.push(s.item);sfx('pop',.25);return;}
      if(s.k==='depo'){const room=tk.dst.k==='rack'?rackCap(tk.dst)-rackN(tk.dst):tk.dst.k==='teslim'&&G.contract?G.contract.need-G.contract.got:0;if((s.stock[tk.item]||0)>0&&h.stack.length<room){s.stock[tk.item]--;h.stack.push(tk.item);sfx('pop',.25);return;}}
      if(s.k==='st'){const i=s.out.lastIndexOf(tk.item);if(i>=0){s.out.splice(i,1);h.stack.push(tk.item);sfx('pop',.25);return;}}}
    if(h.stack.length){h.st='carry';const q=tk.dst.k==='st'?craftP(tk.dst):ip(tk.dst);goTo(h,q.x+(Math.random()-.5)*10,q.y);}else{h.st='idle';h.task=null;}}}
  else if(h.st==='carry'){if(follow(h,hs,dt)){h.st='unload';h.t=0;h.stuck=0;}}
  else if(h.st==='unload'){h.t+=dt;if(h.t>.2){h.t=0;const d=tk.dst;if(!h.stack.length){h.st='idle';h.task=null;return;}
    const id=h.stack[h.stack.length-1];
    if(d.k==='st'&&stAccepts(d,id)){h.stack.pop();d.inp.push(id);sfx('drop',.25);return;}
    if(d.k==='teslim'&&G.contract&&G.contract.item===id&&G.contract.got<G.contract.need){h.stack.pop();deliver(id);sfx('drop',.25);return;}
    if(d.k==='rack'&&rackAccepts(d,id)&&rackN(d)<rackCap(d)){h.stack.pop();d.stock[id]=(d.stock[id]||0)+1;sfx('drop',.25);return;}
    if(d.k==='depo'&&SELLS.includes(id)&&depoN(d)<depoCap()){h.stack.pop();d.stock[id]=(d.stock[id]||0)+1;sfx('drop',.25);return;}
    const alt=bestDest(id,h);if(alt&&alt!==d){h.task={src:null,item:id,dst:alt};h.st='carry';const q=alt.k==='st'?craftP(alt):ip(alt);goTo(h,q.x,q.y);return;}
    h.stuck+=.2;if(h.stuck>1.4&&SELLS.includes(id)){h.st='idle';h.task=null;h.stuck=0;if(!h.bub)say(h,rnd(['Raf dolu, bekliyorum ağam.','Depo olsa koyardım...','Elimde kaldı, yer açılsın.']),2.4);return;}
    if(h.stuck>1.4){const c=nearestK('cop',h);if(c){h.st='dump';const q=ip(c);goTo(h,q.x,q.y);say(h,rnd(["Koyacak yer yok, çöpe gidiyor...","Raf dolu ağam, atıyorum!"]),2);}else h.st='idle';}}}
  else if(h.st==='dump'){if(follow(h,hs,dt)){h.t+=dt;if(h.t>.15){h.t=0;if(h.stack.length){h.stack.pop();sfx('drop',.25);puff('dust',h.x,h.y-10,2,10);}else{h.st='idle';h.task=null;}}}}
  h.hunger-=dt*.8*(1-.25*sk.istah)*(h.moving?1:.3);}
function nearestK(k,from){let b=null,bd=1e9;for(const o of objs(k)){const d=Math.hypot(o.x-from.x,o.y-from.y);if(d<bd){bd=d;b=o;}}return b;}

/* ====================== MÜŞTERİ ====================== */
function onSells(){return SELLS.filter(displayed);}
function leave(c){c.st='out';goTo(c,c.exitX||SHOP().ex,WH+30);}
function kasaStaffed(k){if(G.family&&G.dream&&objs('kasa')[0]===k)return true;return G.workers.some(w=>w.role==='katip'&&w.a===k.uid&&!w.off);}
function pickKasa(){const ks=objs('kasa');let best=null,bs=1e9;for(const k of ks){const n=G.cust.filter(c=>c.st==='queue'&&c.kasa===k.uid).length;const s=n*2+(kasaStaffed(k)?0:1.5);if(s<bs){bs=s;best=k;}}return best;}
function qpos(k,i){const y0=fpOf(k)[3]+24;return{x:k.x+(i>=4?-28*Math.floor(i/4):0),y:y0+22*(i%4)};}
function rackFor(id,c){const rs=objs('rack',r=>rackAccepts(r,id));if(!rs.length)return null;rs.sort((a,b)=>((b.stock[id]||0)>0)-((a.stock[id]||0)>0)||Math.hypot(a.x-c.x,a.y-c.y)-Math.hypot(b.x-c.x,b.y-c.y));return rs[0];}
function spawn(){const S=SHOP();
  if(!G.sarDone&&G.day>=3&&Math.random()<.05){G.sarDone=true;unlockLore('sar');const r=objs('rack')[0];
    const c={race:'sar',x:S.ex,y:WH+30,dir:1,walk:0,moving:false,st:'in',sar:true,pat:7,pmax:7,bub:null,seed:Math.random()*9,look:0,skin:RACES.sar.skin};goTo(c,r.x,r.y+40);G.cust.push(c);return;}
  const a=attraction();const ids=Object.keys(a);if(!ids.length)return;let tot=0;ids.forEach(r=>tot+=a[r]);let x=Math.random()*tot,rid=ids[0];for(const r of ids){x-=a[r];if(x<=0){rid=r;break;}}
  const tier=pickTier();const aff=id=>{const I=IT[id],pr=price(id);if(tier===0)return pr<=80?1.6:pr>400?.1:.5;if(tier===1)return pr>1500?.4:1;if(tier===2)return I.base?.6:1.8;return I.base?.25:3;};
  const P=PREF[rid],on=onSells().filter(id=>P.w[id]);if(!on.length)return;const wt=id=>P.w[id]*aff(id);let t2=0;on.forEach(id=>t2+=wt(id));let y=Math.random()*t2,want=on[0];for(const id of on){y-=wt(id);if(y<=0){want=id;break;}}
  const R=RACES[rid];const c={race:rid,x:S.ex+(Math.random()-.5)*20,y:WH+30,dir:1,walk:0,moving:false,st:'in',want,pat:50,pmax:50,bub:null,seed:Math.random()*9,look:0,
    skin:R.skin,hair:R.hair?rnd(R.hair):null,band:rnd(['#c9463d','#3f8a3a','#f0b43c','#4f7ec2']),tier};
  let qty=1;const bq=BF().qty+EV('qty',0)+(MOD('qty')-1);if(Math.random()<.12+.08*G.shopLv+bq+(tier>=2?.3:0))qty++;if(Math.random()<.05*G.shopLv+bq/2+(tier===3?.4:0))qty++;if(tier===3&&Math.random()<.5)qty++;c.qty=qty;
  if(rid==='insan')c.cloth=rnd(['#4f7ec2','#3f8a3a','#9a4a8a','#c96b3c']);
  if(tier===0)c.cloth=mix(c.cloth||R.cloth,'#8a7a6a',.55);else if(tier===2)c.cloth=rnd(['#2f5a9a','#7a2a4a','#2f6a4a']);else if(tier===3)c.cloth=rnd(['#5a2a7a','#7a1a2a','#1f4a6a']);
  const rk=rackFor(want,c);c.rack=rk.uid;const slot=rnd([-22,0,22]);goTo(c,rk.x+slot,fpOf(rk)[3]+28);
  G.cust.push(c);G.today.races[rid]=(G.today.races[rid]||0)+1;
  if(!G.seen[rid]){G.seen[rid]=1;if(G.seen.gaksoy&&G.seen.pullukul)setTimeout(()=>unlockLore('solucan'),4000);const I=RACE_INTRO[rid];toast('Yeni müşteri: '+I[0],I[1]+' En sevdiği: '+IT[P.fav].ad+'.',{race:rid});sfx('chime',.6);}
  if(Math.random()<.45){let t=rnd(R.gir);if(t==='ECHO')t=G.lastLines.length?'"'+rnd(G.lastLines)+'"':'*selam sesi taklidi*';say(c,want===P.fav?'Aaa! '+IT[want].ad+' var mı?!':qty>1&&Math.random()<.5?'Bölük için '+qty+' tane lazım!':t);}}
function spawnPasser(){const ks=objs('kiosk');if(!ks.length)return;const k=rnd(ks);const rid=rnd(RACE_IDS);const R=RACES[rid];
  const sx=rnd([SHOP().ex,1150+Math.random()*450]);const c={race:rid,x:sx,y:WH+30,dir:1,walk:0,moving:false,st:'kiosk',pass:true,kiosk:k.uid,pat:30,pmax:30,bub:null,seed:Math.random()*9,look:0,skin:R.skin,hair:R.hair?rnd(R.hair):null,band:'#f0b43c',exitX:sx};
  const q=ip(k);goTo(c,q.x+(Math.random()-.5)*30,q.y+6);G.cust.push(c);}
function payCust(c,K){const P=PREF[c.race];const fav=c.want===P.fav?1.25:c.want===P.fav2?1.1:1;const I0=IT[c.want];const cm=((G.ev&&G.ev.cat&&G.ev.cat[c.want])||1)*MOD('cat_'+c.want)*(I0.ench||I0.simb?MOD('cat_ench'):1);const pr=Math.round(price(c.want)*c.got*fav*EV('price',1)*cm*(1+BF().price)*MOD('price')*(dipEff().priceMul||1));
  K.cash+=pr;G.today.sold++;G.today.earn+=pr;G.today.soldBy[c.want]=(G.today.soldBy[c.want]||0)+c.got;G.tut.sold=true;achieve('ilk');
  say(c,G.ended&&Math.random()<.3?rnd(['Uyumadım, iyiyim.','Nefesim... tatlı.','Beyaz yapraklar ne güzel, değil mi?','Hepimiz aynı anda nefes alıyoruz.']):fav>1.2?rnd(['En sevdiğim! Al şu nüdleri!','Bunu yıllardır arıyordum!','Kalbim pır pır!']):rnd(RACES[c.race].ode));sfx('coin');
  if(RACES[c.race].snd)sfx(RACES[c.race].snd,.7);else sfx('happy',.6);floatTxt(K.x+20,K.y-40,'+'+fmt(pr),'#ffd34c',14);
  if(fav>1.2){G.today.favs++;for(let i=0;i<3;i++)fx('heart',c.x,c.y-50,{vx:(Math.random()-.5)*30,vy:-30,t:1});}
  const TM=[.4,1,1.6,2.4][c.tier||1];const tipP=(.3+.1*G.skill.katip.yuz+BF().tip+EV('tip',0)+(fav>1.2?.2:0))*Math.min(1.6,TM);
  if(c.pat/c.pmax>.5&&Math.random()<tipP){const tip=Math.max(5,Math.round(pr*.3*TM));K.cash+=tip;G.today.tips+=tip;G.today.earn+=tip;
    floatTxt(K.x+30,K.y-62,'BAHŞİŞ +'+fmt(tip),'#9df07a',13);setTimeout(()=>sfx('sparkle',.7),120);}
  const ks=objs('kiosk');if(ks.length&&Math.random()<.25+BF().kiosk){const k=rnd(ks);c.st='kiosk';c.kiosk=k.uid;c.pat=20;const q=ip(k);goTo(c,q.x+(Math.random()-.5)*30,q.y+6);}else leave(c);}
function kioskSale(c){const k=byUid(c.kiosk);if(!k){leave(c);return;}const K0=KIOSK[k.kind];const lv=G.kioskLv[k.kind]||0;const kom=Math.round(K0.price*KIOSK_MUL[lv]*KOM[G.kom]*MOD('kiosk')*MOD('k_'+k.kind));
  k.sold++;G.today.kira+=kom;floatTxt(k.x,k.y-70,'+'+kom,'#9df07a',12);sfx('coin',.4);c.carryK=K0.item;
  if(Math.random()<.3)say(c,rnd(KLINES[k.kind]||['Bereketli olsun!']),2);leave(c);}
const KLINES={dondurma:['Agreguk sıcağında dondurma!','Pullarım serinledi.'],kahve:['Kahve kayda geçti.','Uyandım!'],tuz:['Rüya görmeden önce tuz!','Bu gece uyurum belki.'],asci:['Şefin kazanı kaynıyor!','Doydum, bağlandım!'],nalbant:['Atımın nalı parlıyor!','At insandan azizdir.']};

/* ====================== HIRSIZ ====================== */
function catchChance(){const b=G.workers.filter(w=>w.role==='bekci'&&!w.off).length;let miss=1;for(let i=0;i<b;i++)miss*=1-.4*(1+.2*G.skill.bekci.goz);return clamp(1-miss+BF().thief+(G.sec.kapan?.15:0),0,.95);}
function stealLoot(n){const loot={};const rs=objs('rack',r=>rackN(r)>0).sort((a,b)=>rackN(b)-rackN(a));
  for(const r of rs){for(const id in r.stock){while(r.stock[id]>0&&n>0){r.stock[id]--;loot[id]=(loot[id]||0)+1;n--;}}if(n<=0)break;}return loot;}
function lootVal(l){let v=0;for(const k in l)v+=price(k)*l[k];return v;}
function lootStr(l){return Object.keys(l).map(k=>l[k]+' '+IT[k].ad.toLowerCase()).join(', ');}
function thiefCap(){return Math.round((5+G.day/3)*(G.sec.kilit?.5:1));}
function spawnThief(){const S=SHOP();const r=objs('rack',r=>rackN(r)>0).sort((a,b)=>rackN(b)-rackN(a))[0];if(!r){G.thiefPlan=null;return;}
  G.thief={x:S.ex,y:WH+30,dir:1,walk:0,moving:false,st:'in',rack:r.uid,t:0,loot:null,seed:3,look:0,skin:SPEC.hirsiz.skin,bub:null};goTo(G.thief,r.x,fpOf(r)[3]+24);
  const pl=G.thiefPlan;G.thiefPlan=pl&&pl.n>1?{at:G.nightT+18,n:pl.n-1}:null;sfx('angry',.4);toast('🕵 Hırsız!','Biri dükkâna sızıyor! Yakala onu, ya da bekçiler yakalasın.');}
function thiefTick(dt){const t=G.thief;if(!t)return;
  if(t.st==='in'){if(follow(t,80,dt)){t.st='steal';t.t=0;}}
  else if(t.st==='steal'){t.t+=dt;if(t.t>1.8){const r=byUid(t.rack);t.loot=stealLoot(thiefCap());t.st='run';goTo(t,SHOP().ex,WH+40);say(t,'Hehe...',1.5);sfx('whoosh',.6);}}
  else if(t.st==='run'){if(follow(t,122,dt)){G.stolenLog={loot:t.loot,caught:false};toast('Hırsız kaçtı!',lootStr(t.loot||{})+' çalındı.');G.thief=null;return;}}
  if(t.bub){t.bub.t-=dt;if(t.bub.t<=0)t.bub=null;}
  const p=G.p;if(!EDIT&&Math.hypot(p.x-t.x,p.y-t.y)<32){caught(true);return;}
  for(const w of G.workers){if(w.role!=='bekci'||w.off)continue;if(Math.hypot(w.x-t.x,w.y-t.y)<24){caught(false,w);return;}}}
function caught(byPlayer,w){const t=G.thief;const loot=t.loot||{};
  for(const id in loot){const r=rackFor(id,t);if(r)r.stock[id]=(r.stock[id]||0)+loot[id];}
  const bounty=Math.round((60+lootVal(loot)*.25+WE()*.12)/10)*10;G.nud+=bounty;floatTxt(t.x,t.y-60,'ÖDÜL +'+bounty,'#9df07a',15);sfx('unlock',.6);shake=4;
  toast(byPlayer?'Yakaladın! 💪':'Bekçi yakaladı!',(byPlayer?'İdiz hırsızın paçasına yapıştı.':'Uçmakan bekçi hırsızı yere serdi.')+' Uçmakan Yurdu '+bounty+' nüd ödül verdi.');
  if(byPlayer)achieve('hirsiz');if(w)say(w,'Agreguk\'ta hırsızlık yok!',2);
  for(let i=0;i<14;i++)fx('star',t.x,t.y-30,{vx:(Math.random()-.5)*160,vy:-80-Math.random()*90,t:1});G.thief=null;G.stolenLog={caught:true,bounty};}

/* ====================== GÜNCELLEME ====================== */
function nearestObj(p){let best=null,bd=1e9;for(const o of G.objs){if(o.k==='deco')continue;if(o.k==='kiosk')continue;const f=fpOf(o);if(!inRect(p.x,p.y,f,28))continue;
  const cx0=clamp(p.x,f[0],f[2]),cy0=clamp(p.y,f[1],f[3]),d=Math.hypot(p.x-cx0,p.y-cy0);if(d<bd){bd=d;best=o;}}return best;}
function update(dt){
  G.t+=dt;if(G.wedRun){wedTick(dt);return;}const p=G.p,day=G.phase==='day'&&G.opened;
  if(G.phase==='day'&&!G.opened&&inShop(p.x,p.y)){G.opened=true;sfx('register');shake=2;toast('Kepenkler açıldı! 🔔','Gün şimdi başladı. Müşteriler yolda!');}
  if(day){G.dayT+=dt;if(G.dayT>=dayLen()){endDay();return;}}
  if(!GRID)buildGrid();
  G.bfT-=dt;if(G.bfT<=0){G.bfT=1;G.bf=calcBuffs();}
  for(const o of G.objs)if(o.k==='st')stationTick(o,dt,day);
  const kz=findObj('askazan');if(kz&&day&&kz.pile<6){kz.t=(kz.t||0)+dt;if(kz.t>=4){kz.t=0;kz.pile++;}}
  /* oyuncu */
  if(G.auto){const ok=follow(p,560,dt);p.walk+=dt;if(ok){G.auto=null;goSleep();return;}}
  else{let vx=0,vy=0;
    if(joy.on&&!EDIT){const dx=joy.x-joy.bx,dy=joy.y-joy.by,d=Math.hypot(dx,dy);if(d>4){const m=Math.min(1,d/40);vx=dx/d*m;vy=dy/d*m;}}
    if(keys.a||keys.arrowleft)vx=-1;if(keys.d||keys.arrowright)vx=1;if(keys.w||keys.arrowup)vy=-1;if(keys.s||keys.arrowdown)vy=1;
    if(EDIT){vx=vy=0;}
    const ps=165*spd()*(inShop(p.x,p.y)||inHouse(p.x,p.y)?1:1.9);p.moving=(vx||vy)!==0;
    if(p.moving){if(CAMT){CAMT=null;camLock=true;}const m=Math.hypot(vx,vy);if(m>1){vx/=m;vy/=m;}const nx=p.x+vx*ps*dt,ny=p.y+vy*ps*dt;
      if(freeP(nx,p.y))p.x=nx;if(freeP(p.x,ny))p.y=ny;p.walk+=dt;if(Math.abs(vx)>.05)p.dir=vx>0?1:-1;
      p.stepT-=dt;if(p.stepT<=0){p.stepT=.24;sfx('step');if(Math.random()<.5)fx('dust',p.x,p.y,{vx:-vx*10,vy:-6,t:.45,r:3});}}}
  p.lookT-=dt;if(p.lookT<=0){p.lookT=.4+Math.random()*.8;p.look=(Math.random()-.5)*2;}
  /* etkileşim */
  p.tool=null;G.actT-=dt;const ready=G.actT<=0;let acted=false;
  const o=(EDIT||G.auto)?null:nearestObj(p);G.near=o;G.nearMode=null;const room=G.stack.length<cap();
  if(o){
    if(o.k==='sup'){if(ready&&G.sup[o.item]>0&&room){G.sup[o.item]--;G.stack.push(o.item);sfx('pop');acted=true;if(o.item==='kulce')G.tut.ore=true;}}
    else if(o.k==='st'){const tray=p.x>=o.x+ST[o.type].tray-14;G.nearMode=tray?'tray':'craft';
      if(tray){if(ready&&o.out.length&&room){G.stack.push(o.out.pop());sfx('pop');acted=true;G.tut.picked=true;}}
      else{if(ready){for(let i=G.stack.length-1;i>=0;i--){const id=G.stack[i];if(stAccepts(o,id)){G.stack.splice(i,1);o.inp.push(id);sfx('drop');acted=true;if(o.type==='ocak'){G.tut.fed=true;sfx('whoosh',.5);puff('smoke',o.x,o.y-44,2,8);}break;}}}
        const S0=ST[o.type];
        if(!S0.auto){const can=day&&canCraft(o);
          if(can){const si=S0.sint*craftMul()*evC();p.tool=S0.tool;p.craftT=(p.craftT||0)+dt;const ph=p.craftT/si;p.toolA=S0.tool==='quill'?Math.sin(ph*Math.PI*2)*.4:-1.4+Math.max(0,Math.sin(ph*Math.PI))*1.7;
            if(p.craftT>=si){p.craftT=0;craftStep(o,p);}p.dir=p.x<o.x?1:-1;}
          else if(G.phase!=='day'&&o.inp.length&&!p.bub)say(p,"Gece zanaat olmaz, ocak söndü. Sabahı bekle.");}}}
    else if(o.k==='rack'){if(ready){for(let i=G.stack.length-1;i>=0;i--){const id=G.stack[i];if(rackAccepts(o,id)&&rackN(o)<rackCap(o)){G.stack.splice(i,1);o.stock[id]=(o.stock[id]||0)+1;sfx('drop');acted=true;G.tut.racked=true;break;}}}}
    else if(o.k==='kasa'&&o.cash>0){const n=o.cash;G.nud+=n;o.cash=0;sfx('register');hudPop=1;G.tut.cashed=true;
      for(let i=0;i<Math.min(12,3+n/20);i++)fx('flycoin',o.x+20,o.y-30,{t:.55+i*.04,sx:o.x+20,sy:o.y-30});floatTxt(p.x,p.y-60,'+'+fmt(n)+' nüd');updateBar();}
    else if(o.k==='depo'){if(ready){for(let i=G.stack.length-1;i>=0;i--){const id=G.stack[i];if(SELLS.includes(id)&&depoN(o)<depoCap()){G.stack.splice(i,1);o.stock[id]=(o.stock[id]||0)+1;sfx('drop');acted=true;break;}}}}
    else if(o.k==='teslim'){if(ready&&G.contract&&stackHas(G.contract.item)&&G.contract.got<G.contract.need){stackTake(G.contract.item);deliver(G.contract.item);sfx('drop');acted=true;}}
    else if(o.k==='cop'){if(ready&&G.stack.length){G.stack.pop();sfx('drop',.5);puff('dust',o.x,o.y-14,2,8);acted=true;}}
  }
  if(acted)G.actT=.1;if(!p.tool)p.craftT=0;
  /* kasalar */
  for(const K of objs('kasa')){const q=G.cust.filter(c=>c.st==='queue'&&c.kasa===K.uid);const front=q[0];
    if(day&&front){const q0=qpos(K,0);const atK=G.near===K;const mom=G.family&&G.dream&&objs('kasa')[0]===K;const kat=G.workers.some(w=>w.role==='katip'&&w.a===K.uid&&!w.off);
      if((atK||kat||mom)&&Math.hypot(front.x-q0.x,front.y-q0.y)<3){K.t=(K.t||0)+dt;const need=(atK?.35:mom?.5:1.0*(1-.2*G.skill.katip.hiz))/(1+BF().kasa);
        if(K.t>=need){K.t=0;payCust(front,K);}}else K.t=0;}}
  /* müşteriler */
  if(day&&G.todaySp&&!G.vipSpawned&&G.dayT>(G.todaySp.type==='sultan'?14:G.todaySp.type==='reis'?3:10)){G.vipSpawned=true;
    if(G.todaySp.type==='sultan'&&dipOn()&&G.dip.s<=25){toast('👑 Sultan uğramadı!','Alay dükkânının önünden geçti, başını bile çevirmedi. Pâyendegan sana küs.');sfx('angry',.5);dipShift(-4,0,'Sultanın soğukluğu');}
    else if(!(G.todaySp.type==='hasmet'&&EV('closed',false)))spawnVIP(G.todaySp.type);}
  vipTick(dt);caravanTick(dt);toptanTick(dt);manTick(dt,day);
  if(day&&G.dayT<dayLen()-8&&!EV('closed',false)){G.spawnT-=dt;if(G.spawnT<=0){G.spawnT=spawnInterval()*(.7+Math.random()*.6);if(G.cust.filter(c=>!c.pass).length<custCap())spawn();}
    if(objs('kiosk').length){G.passT-=dt;if(G.passT<=0){let kl=0;for(const k in G.kioskLv)kl+=G.kioskLv[k]||0;G.passT=6/(1+2*BF().kiosk+.03*fame()+.4*kl+.5*objs('kiosk').length)/MOD('kiosk')*(.6+Math.random()*.8);spawnPasser();}}}
  for(const c of G.cust){const R=RACES[c.race],sp=78*R.sp;
    c.lookT=(c.lookT||0)-dt;if(c.lookT<=0){c.lookT=.6+Math.random();c.look=(Math.random()-.5)*2;}
    if(c.sar){if(c.st==='in'){if(follow(c,sp,dt)){c.st='look';say(c,"Boş defter var mı? Hokka?",3);}}
      else if(c.st==='look'){c.pat-=dt;if(c.pat<3.4&&!c.said){c.said=true;say(c,"Yok mu... Başka tezgâha bakayım.",3.2);}if(c.pat<=0)leave(c);}}
    else if(c.st==='in'){if(follow(c,sp,dt)){c.st='rack';c.pat=c.pmax=50*(1+BF().pat);}}
    else if(c.st==='rack'){const rk=byUid(c.rack);const have=rk?(rk.stock[c.want]||0):0;
      if(have>0){c.got=Math.min(c.qty,have);rk.stock[c.want]-=c.got;const K=pickKasa();c.kasa=K.uid;c.st='queue';c.pat=c.pmax=45*(1+BF().pat);sfx('pop',.4);
        const i=G.cust.filter(x=>x.st==='queue'&&x.kasa===K.uid).length-1;const q=qpos(K,i);goTo(c,q.x,q.y);}
      else{const alt=rackFor(c.want,c);if(alt&&alt!==rk&&(alt.stock[c.want]||0)>0&&!c.moved){c.moved=1;c.rack=alt.uid;c.st='in';goTo(c,alt.x,fpOf(alt)[3]+28);}
        c.pat-=dt;if(c.pat<=0){leave(c);G.today.lost++;say(c,rnd(R.kiz));sfx('angry',.7);}}}
    else if(c.st==='queue'){const K=byUid(c.kasa);const q=G.cust.filter(x=>x.st==='queue'&&x.kasa===c.kasa);const i=q.indexOf(c),qp=qpos(K,i);if(follow(c,sp,dt))moveTo(c,qp.x,qp.y,sp,dt);
      c.pat-=dt;if(c.pat<=0){leave(c);G.today.lost++;say(c,rnd(R.kiz));sfx('angry',.7);}}
    else if(c.st==='kiosk'){if(follow(c,sp,dt)){c.kt=(c.kt||0)+dt;if(c.kt>.8)kioskSale(c);}}
    if(c.st==='out')follow(c,sp*1.15,dt);
    if(c.bub){c.bub.t-=dt;if(c.bub.t<=0)c.bub=null;}}
  G.cust=G.cust.filter(c=>!(c.st==='out'&&c.y>=WH+20));
  /* çalışanlar */
  for(const w of G.workers){if(w.bub){w.bub.t-=dt;if(w.bub.t<=0)w.bub=null;}w.lookT=(w.lookT||0)-dt;if(w.lookT<=0){w.lookT=1;w.look=(Math.random()-.5)*2;}workerTick(w,dt,day);}
  /* aile */
  if(G.family)familyTick(dt,day);
  /* hırsız */
  if(!day&&G.phase==='night'){G.nightT+=dt;if(G.thiefPlan&&G.nightT>=G.thiefPlan.at&&!G.thief&&!paused)spawnThief();}
  thiefTick(dt);
  if(p.bub){p.bub.t-=dt;if(p.bub.t<=0)p.bub=null;}
  for(const q of G.parts){q.t-=dt;q.x+=q.vx*dt;q.y+=q.vy*dt;if(q.k==='spark'||q.k==='star')q.vy+=260*dt;if(q.k==='steam'||q.k==='smoke')q.r+=dt*6;}
  G.parts=G.parts.filter(q=>q.t>0);
  for(const tq of G.toasts.slice(0,1)){tq.t-=dt*(G.toasts.length>2?2.2:G.toasts.length>1?1.4:1);}if(G.toasts[0]&&G.toasts[0].t<=0)G.toasts.shift();
  if(G.splash){G.splash.t-=dt;if(G.splash.t<=0)G.splash=null;}
  shake=Math.max(0,shake-dt*10);hudPop=Math.max(0,hudPop-dt*3);
  G.saveT-=dt;if(G.saveT<=0){G.saveT=5;if(G.phase==='night'&&G.story>0)save();}
  if(Math.random()<dt*2)updateBar();
}
function workerTick(w,dt,day){const R=ROLES[w.role];if(w.role==='burkazur'){burkTick(w,dt,day);return;}
  if(w.role==='hamal'){
    if(w.off||!day){const kz=findObj('askazan');if(kz&&w.st!=='rest'){const q=ip(kz);goTo(w,q.x-40+Math.random()*30,q.y+20);w.st='rest';w.task=null;}follow(w,60,dt);if(!w.bub&&Math.random()<dt*.05)say(w,day?"İzinliyim ağam, mani yazıyorum.":"Zzz... aş... mani... zzz");return;}
    if(w.st==='rest')w.st='idle';
    if(w.hunger<28&&w.st!=='eat'&&w.st!=='mani'){const kz=findObj('askazan');if(kz){w.st='eat';const q=ip(kz);goTo(w,q.x+(Math.random()-.5)*20,q.y);}}
    if(w.st==='eat'){if(follow(w,60,dt)){const kz=findObj('askazan');if(kz&&kz.pile>0){kz.pile--;w.hunger=100;w.st='idle';say(w,rnd(["Doydum! Sana bağlandım ağam.","Pasifolin coştu!","Bu aşa mani yazarım!"]),2.2);sfx('munch',.5);fx('heart',w.x,w.y-50,{vy:-30,t:1});}
      else{w.st='mani';w.t=0;G.today.mani++;}}return;}
    if(w.st==='mani'){w.t-=dt;if(w.t<=0){w.t=4.6;say(w,rnd(["Kazan soğuk, kalbim soğuk, doyuran el nerde?","Çuval ağır, gönül ağır, bir kepçe aş isterim.","Melankolin coştu... aş yoksa iş yok."]),3.8);fx('note',w.x+10,w.y-56,{vy:-20,t:1.3});sfx('sob',.3);}
      const kz=findObj('askazan');if(kz&&kz.pile>0)w.st='eat';return;}
    hamalAI(w,dt);return;}
  if(R.st){const o=byUid(w.a);if(!o){w.tool=null;return;}const c=craftP(o);if(Math.hypot(w.x-c.x,w.y-c.y)>2){moveTo(w,c.x,c.y,90,dt);w.tool=null;return;}
    w.dir=1;w.tool=null;if(!day||w.off){if(!w.bub&&Math.random()<dt*.04)say(w,day?'İzindeyim, aletleri yağlıyorum.':'Zzz... ocak da uyur...');return;}
    if(canCraft(o)){const S0=ST[o.type];const si=S0.sint*evC()/(.6*(1+.2*G.skill.usta.hiz)*(1+BF().wspd));w.tool=S0.tool;w.ct=(w.ct||0)+dt;const ph=w.ct/si;w.toolA=S0.tool==='quill'?Math.sin(ph*Math.PI*2)*.4:-1.4+Math.max(0,Math.sin(ph*Math.PI))*1.7;
      if(w.ct>=si){w.ct=0;craftStep(o,w);}}
    else if(!w.bub&&Math.random()<dt*.06)say(w,o.out.length>=outCap(o.type)?'Tezgâh doldu! Alan yok mu?':'Malzeme bitti ağam!',2.4);
    return;}
  if(w.role==='katip'){const k=byUid(w.a);if(k){w.x=k.x-4;w.y=k.y-30;}if(!w.bub&&Math.random()<dt*.05)say(w,day?rnd(["Kayda geçtim.","Hesap kuruşu kuruşuna.","Tasnif ettim."]):"Gece muhasebesi...",2.4);return;}
  if(w.role==='bekci'){const S=SHOP();const t=G.thief;const sight=150*(1+.25*G.skill.bekci.goz)*(G.sec.kapan?2:1);
    if(t&&!w.off&&Math.hypot(w.x-t.x,w.y-t.y)<sight){w.st='chase';if(!w.bub)say(w,'DUR! Hırsız!',1.5);moveTo(w,t.x,t.y,112*(1+.2*G.skill.bekci.kos),dt);return;}
    if(!w.path||!w.path.length){if(day){goTo(w,S.ex+(Math.random()-.5)*120,S.y1+30+Math.random()*40);}else{const rs=objs('rack');const r=rs.length?rnd(rs):null;if(r)goTo(w,r.x+(Math.random()-.5)*40,fpOf(r)[3]+30);}}
    follow(w,day?40:60,dt);return;}}
function familyTick(dt,day){const Hh=HOUSE();
  for(const f of G.family){if(f.bub){f.bub.t-=dt;if(f.bub.t<=0)f.bub=null;}
    if(f.path&&f.path.length){follow(f,70,dt);continue;}
    if(f.job==='kasa'&&day){const k=objs('kasa')[0];if(k){const tx=k.x+30,ty=k.y-28;if(Math.hypot(f.x-tx,f.y-ty)>3)moveTo(f,tx,ty,90,dt);else{f.dir=-1;f.moving=false;}}}
    else if(f.job==='tarla'){const tx=FIELD[0]+40+(f.ad==='Babası'?0:80),ty=FIELD[1]+120+(f.ad==='Babası'?0:120);if(Math.hypot(f.x-tx,f.y-ty)>3){if(!f.path||!f.path.length)f.path=[[tx,ty]];}else{f.hoe+=dt;f.tool=day?'mallet':null;f.toolA=-1.4+Math.max(0,Math.sin(f.hoe*4))*1.6;f.moving=false;}}
    else{if(Math.random()<dt*.2)f.path=[[Hh.x0+40+Math.random()*(Hh.x1-Hh.x0-80),Hh.y0+90+Math.random()*(Hh.y1-Hh.y0-120)]];}
    f.talkT-=dt;if(f.talkT<=0){f.talkT=10+Math.random()*10;
      const L2={Annesi:["Hoş geldin evladım! Ne alırsın?","İdiz'im, müşteriye mani okudum, bahşiş bıraktı!","Aç mısın yavrum? Aş koydum."],Babası:["Bu toprak Sürtünkaya'dan cömert!","Otlar boy verdi oğlum.","Dermançöl'de bunu görseler..."],'Kız kardeşi':["Abi! Ot topladım!","Dondurmacı Pullukul bana bedava verdi!","Agreguk çok güzel, hiç gitmeyelim!"]}[f.ad];
      say(f,rnd(L2),3.4);if(f.ad==='Annesi'&&Math.random()<.4)sfx('sob',.25);}}}

/* ====================== GÜN DÖNGÜSÜ ====================== */
function endDay(){G.phase='dusk';paused=true;
  for(const c of G.cust)if(c.st==='rack'||c.st==='queue')G.today.lost++;
  let cash=0;for(const K of objs('kasa')){cash+=K.cash;K.cash=0;}G.nud+=cash;
  const t=G.today;const top=Object.entries(t.races).sort((a,b)=>b[1]-a[1])[0];
  const ws={};for(const w of G.workers){if(w.off)continue;ws[w.role]=(ws[w.role]||0)+Math.round(wage(w.role)*EV('wage',1));}
  const wsum=Object.values(ws).reduce((a,b)=>a+b,0),yurt=EV('yurt',1)===0?0:Math.round(t.earn*.1*MOD('yurt')),kp=kervanPay();
  let rent=0;for(const k of objs('kiosk'))rent+=KIOSK_RENT[G.kioskLv[k.kind]||0];t.kira+=rent;
  contractDayEnd();const rr0=G.todaySp&&G.todaySp.type==='reis'?reisReport():null;const net=t.earn+t.kira+kp+t.kontrat+t.ozel-t.goods-wsum-yurt;
  G.nud+=t.kira+kp;G.nud-=wsum+yurt;G.lastSold=t.soldBy;G.totalEarn+=t.earn;G.earnHist.push(t.earn);if(G.earnHist.length>5)G.earnHist.shift();if(G.sched&&G.sched.day<=G.day)G.sched=null;G.todaySp=null;G.vips=null;
  document.getElementById('sumH').textContent=G.day+'. Gün kapandı';
  const r=(a,b,c)=>`<span${c?` style="color:${c}"`:''}>${a}</span><span${c?` style="color:${c}"`:''}>${b}</span>`;
  let s=`<span class="hd">GELİR</span><span></span>`+r(`Satış (${t.sold} müşteri)`,'🪙 '+nudStr(t.earn-t.tips))+r('Bahşiş','🪙 '+nudStr(t.tips))+(t.kira?r('Bahçe kirası (komisyon)','🪙 '+nudStr(t.kira)):'')+(kp?r('Kervan ortaklığı payı','🪙 '+nudStr(kp)):'')+(t.kontrat?r('Büyük sipariş','🪙 '+nudStr(t.kontrat)):'')+(t.ozel?r('Özel ziyaret',(t.ozel<0?'− ':'🪙 ')+nudStr(Math.abs(t.ozel)),t.ozel<0?'#c9463d':null):'')+
    `<span class="hd">GİDER</span><span></span>`+r('Mal (sabah kervanı)','− '+nudStr(t.goods))+Object.keys(ws).map(k=>r(ROLES[k].ad+(roleCount(k)>1?' ×'+G.workers.filter(w=>w.role===k&&!w.off).length:''),'− '+nudStr(ws[k]))).join('')+r('Yurt payı (Burkan oluğu %'+Math.round(10*MOD('yurt'))+')','− '+nudStr(yurt))+
    `<span class="tot">NET KÂR</span><span class="tot" style="color:${net>=0?'#3f8a3a':'#c9463d'}">${net>=0?'+':''}${nudStr(net)}</span>`+r('Kese','🪙 '+nudStr(G.nud))+(G.dream?'':r('Aile hayali','%'+(G.nud/DREAM*100).toFixed(G.nud<DREAM/10?2:1)))+(t.favs?r('Favorisini bulan',t.favs+' müşteri','#c94a8a'):'')+(t.lost?r('Kaçan müşteri',t.lost,'#c9463d'):'')+(top?r('En çok gelen',RACE_INTRO[top[0]][0]):'');
  document.getElementById('sumS').innerHTML=s;
  const quips=net<0?"İdiz: \"Zarar ettik... Yarın daha az mal alalım, raflar boş kalmasın ama!\"":t.lost>3?"İdiz: \"Kaçanlar dedikodu yapar. Raflar dolu olsun!\"":t.sold===0?"İdiz: \"Sinekler bile almadı. Süs ve tellal düşünelim.\"":net>50000?"İdiz: \"Bu gidişle kervancıbaşı yolu ezberler!\"":net>1500?"İdiz: \"Annem bunu duysa yine ağlardı, bu sefer sevinçten!\"":"İdiz: \"Az da olsa kâr kârdır. Yemine bir adım daha!\"";
  document.getElementById('sumP').textContent=quips;
  if(rr0)s+=`<span class="hd">REİS'İN DENETİMİ</span><span></span>`+rr0.crit.map(([a,b])=>r(a,b?'✔':'✘',b?'#3f8a3a':'#c9463d')).join('')+`<span style="grid-column:1/3;text-align:center">${rr0.res}${rr0.val?' ('+(rr0.val>0?'+':'')+nudStr(rr0.val)+')':''}</span>`;
  document.getElementById('sumS').innerHTML=s;
  document.getElementById('sum').classList.remove('hidden');sfx('chime');
  if(net>=100)achieve('karli');if(net>=10000)achieve('usta');if(net>=100000)achieve('zengin');if(G.day>=7)achieve('hafta');}
function toNight(){G.phase='night';paused=false;G.cust=[];G.nightT=0;G.thief=null;
  for(const w of G.workers){w.st='idle';w.path=null;w.task=null;if(w.stack.length){const d=null;}}
  G.tellal=false;G.tellalRace=null;
  G.thiefPlan=(G.noThiefUntil||0)>=G.day?null:G.thiefForce?{at:10+Math.random()*12,n:G.thiefForce}:(G.day>=3&&Math.random()<Math.min(.75,(.18+.01*G.day)*MOD('thief')*(dipEff().thief||1)))?{at:14+Math.random()*30,n:1}:null;G.thiefForce=0;
  if(G.day===1)toast('Gece: hesap kitap vakti 🌙','Sipariş ver, Defter\'den alışveriş yap, düzenle. "Uyu" ile günü kapat.');
  G.manE=null;if(G.autoFill&&G.story>=3){const sp=fillAll(true);if(sp)toast('Kâtip sandıkları doldurdu 🧺',nudStr(sp)+' nüdlük mal yarın gelecek.');}
  sfx('whoosh',.4);save();updateBar();}
let ST2=0;
function goSleep(){setEdit(false);closeCat();
  if(G.thief||G.thiefPlan){const ok=Math.random()<catchChance();let rep;
    if(G.thief&&G.thief.loot&&!ok){rep={loot:G.thief.loot,caught:false};}
    else if(ok){if(G.thief&&G.thief.loot)for(const id in G.thief.loot){const r=rackFor(id,G.thief);if(r)r.stock[id]=(r.stock[id]||0)+G.thief.loot[id];}const b=Math.round((40+WE()*.08)/10)*10;G.nud+=b;rep={caught:true,bounty:b};}
    else rep={loot:stealLoot(thiefCap()*((G.thiefPlan&&G.thiefPlan.n)||1)),caught:false};
    G.stolenLog=rep;G.thief=null;G.thiefPlan=null;}
  MODE='sleep';ST2=0;paused=true;bar.style.display='none';sfx('chime',.6);if(G.story===2)G.story=3;G.auto=null;}
function startDay(){G.day++;G.phase='day';G.dayT=0;G.opened=false;G.ev=null;G.today=freshToday();paused=false;MODE='game';if(G.man){G.man.today=false;G.man.talked=false;}G.manE=null;G.restB=rest();G.bf=calcBuffs();
  pruneMods();const got=[];const DL={};RAWS.forEach(r=>{const n=G.order[r];if(n>0){DL[r]=(DL[r]||0)+n;got.push(n+' '+IT[r].ad.toLowerCase());}G.order[r]=0;});
  G.today.goods=G.orderSpent;G.orderSpent=0;
  if(G.sup.kulce<4&&G.nud<rawPrice('kulce')*6){DL.kulce=(DL.kulce||0)+8;got.push('8 demir külçe (Uçmakan Yurdu\'ndan yardım)');}
  G.tellal=G.tellalNext;G.tellalNext=false;G.tellalRace=G.tellalRaceNext;G.tellalRaceNext=null;
  const p=G.p;p.x=BED.x+10;p.y=BED.y+44;p.dir=1;camX=p.x;camY=p.y-30;camLock=true;CAMT=null;
  say(p,rnd(["Günaydın! Haydi dükkâna!","Kepenkleri açma vakti!","Bugün kimler gelecek acaba?"]));
  for(const w of G.workers){if(w.role==='hamal'){w.hunger=100;w.st='idle';}}
  if(G.family){const H=HOUSE();G.family.forEach(f=>{f.path=null;f.x=H.dx+(Math.random()-.5)*60;f.y=H.y1+40;});
    if(G.on.iksir){DL.ot=(DL.ot||0)+8;got.push('8 şifalı ot (babamın tarlasından)');}else{G.nud+=300;got.push('tarladan 300 nüdlük ürün');}}
  const burkNow=G.day>=2&&!G.burk;if(burkNow)G.burk=true;
  if(Object.keys(DL).length||burkNow){G.delivery=DL;startCaravan(Object.keys(DL),burkNow);if(AUTOPLAY){G.camels.st='out';deliverCaravan();G.camels=null;}else toast('Kervan yolda 🐪',got.length?got.join(', ')+' geliyor.':'Develer geliyor...',{item:'kulce'});}
  else toast('Kervan boş geçti...','Dün gece sipariş vermedin. Sandıkta ne varsa o.',{item:'kulce'});
  if(G.dip&&dipOn())for(const k of ['s','h'])G.dip[k]+=Math.sign(50-G.dip[k]);
  if(G.day===2)unlockLore('takvim');if(G.day===4)unlockLore('haarbova');
  if(G.stolenLog){const L=G.stolenLog;if(L.caught)toast('Gece bekçiler hırsız yakaladı!','Ödül: '+L.bounty+' nüd.');else if(L.loot&&Object.keys(L.loot).length)toast('Gece hırsız girdi! 😱',lootStr(L.loot)+' çalınmış. Bekçi tutmayı düşün.');G.stolenLog=null;}
  if(G.restB>1.01)toast('İyi uyudun!','Bugün %'+Math.round((G.restB-1)*100)+' daha hızlısın.',{item:'as'});
  if(G.tellal)toast('Tellal bağırıyor!','Bugün pazar senin dükkânını konuşuyor.');
  if(G.tellalRace)toast('Çağrı yapıldı!',RACE_INTRO[G.tellalRace][0]+'lar bugün akın akın gelecek.',{race:G.tellalRace});
  const endNow=G.endStage===2&&G.day>=G.endDay,newsNow=G.dream&&G.endStage===1;
  if(newsNow)queueModal(endNewsCard);else if(endNow)queueModal(asmarelCards);
  if(G.day%10===7&&!endNow&&!newsNow)queueModal(showEvent);
  const sp=G.sched&&G.sched.day===G.day?G.sched:null;G.todaySp=sp;G.vips=null;G.vipLeave=false;G.vipSpawned=false;
  if(sp&&sp.type==='hasmet')queueModal(hasmetChoice);
  if(sp&&sp.type==='sultan')toast('👑 Sultan bugün geliyor!','İstediklerini raflara diz: '+sp.wish.map(([id,n])=>n+' '+IT[id].ad.toLowerCase()).join(', '));
  if(sp&&sp.type==='reis')toast('🏅 Reis denetimde!','Müşteri, raf, hamal: hepsine bakacak.');
  if(!G.sched||G.sched.day<G.day){const t5=specialFor(G.day+5);if(t5){G.sched={day:G.day+5,type:t5,wish:t5==='sultan'?sultanWish():null};queueModal(announceCard);}}
  festMorning();if(!G.plan&&!G.designOff&&G.nud>=10000&&G.story>=3)queueModal(designerCard);if(G.wed&&G.wed.day<=G.day&&G.man&&!G.man.wife)queueModal(wedCard);const tp=toptanMorning();
  if(!tp&&!G.contract&&!G.offer&&G.day>=4&&Math.random()<.45){G.offer=makeOffer();if(G.offer)queueModal(offerCard);}
  if(G.meclis&&!G.ended&&G.day>=G.meclisNext&&G.day%10!==7&&!sp){G.meclisNext=G.day+2+(Math.random()<.5?1:0);queueModal(meclisCard);}
  if(G.endStage===2&&G.day<G.endDay)G.splash={title:'🐍 '+(G.endDay-G.day)+' GÜN',sub:'Küfkent\'te bir şey uyanıyor...',t:4,max:4};
  const nm=nextMark();if(nm&&!G.ended&&(nm.k===3||nm.k===1))G.splash={title:'⏳ '+nm.k+' GÜN KALDI',sub:nm.t+' yaklaşıyor!',t:4.5,max:4.5};
  updateBar();save();}
