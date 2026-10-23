
/* ====================== GEOMETRİ ====================== */
function shopRect(l){const L=SHOP_LV[l];return{x0:SX0,x1:SX0+L.w,y0:SY1-L.d,y1:SY1,ex:DOOR_X};}
function SHOP(){return shopRect(G?G.shopLv:0);}
function HOUSE(){const L=HOUSE_LV[G?G.houseLv:0];return{x0:HX0,y0:SY1-L.d,x1:HX0+L.w,y1:SY1,dx:Math.round(HX0+L.w/2)};}
function syncBed(){const H=HOUSE();BED.x=H.x0+64;BED.y=H.y0+68;}
function arsaSign(){const S=SHOP();return{x:S.x0+130,y:S.y0-190};}
function fpOf(o){const f=o.k==='deco'?DECO[o.d].fp:o.k==='st'?ST[o.type].fp:FP[o.k];return[o.x+f[0],o.y+f[1],o.x+f[2],o.y+f[3]];}
function ip(o){const f=fpOf(o);return{x:o.x,y:f[3]+16};}
function trayP(o){const f=fpOf(o);return{x:o.x+ST[o.type].tray,y:f[3]+16};}
function craftP(o){const f=fpOf(o);return{x:o.x-6,y:f[3]+16};}
function objs(k,f){return G.objs.filter(o=>o.k===k&&(!f||f(o)));}
function findObj(k,f){return G.objs.find(o=>o.k===k&&(!f||f(o)));}
function byUid(u){return G.objs.find(o=>o.uid===u);}
function isFlat(o){return o.k==='deco'&&DECO[o.d].flat;}
function inRect(x,y,r,p){p=p||0;return x>r[0]-p&&x<r[2]+p&&y>r[1]-p&&y<r[3]+p;}
function rectHit(a,b){return a[0]<b[2]&&a[2]>b[0]&&a[1]<b[3]&&a[3]>b[1];}
let WALLC=null;
function wallRects(){if(WALLC)return WALLC;const S=SHOP(),Hh=HOUSE(),r=[];
  r.push([S.x0-18,S.y0-160,S.x1+18,S.y0]);r.push([S.x0-18,S.y0,S.x0,S.y1+26]);r.push([S.x1,S.y0,S.x1+18,S.y1+26]);
  r.push([S.x0-18,S.y1,S.ex-30,S.y1+26]);r.push([S.ex+30,S.y1,S.x1+18,S.y1+26]);
  r.push([Hh.x0-14,Hh.y0-150,Hh.x1+14,Hh.y0]);r.push([Hh.x0-14,Hh.y0,Hh.x0,Hh.y1+22]);r.push([Hh.x1,Hh.y0,Hh.x1+14,Hh.y1+22]);
  r.push([Hh.x0-14,Hh.y1,Hh.dx-26,Hh.y1+22]);r.push([Hh.dx+26,Hh.y1,Hh.x1+14,Hh.y1+22]);
  r.push([BED.x+BED.fp[0],BED.y+BED.fp[1],BED.x+BED.fp[2],BED.y+BED.fp[3]]);
  r.push([FIELD[0]-6,FIELD[1]-22,FIELD[2]+6,FIELD[1]]);r.push([(FIELD[0]+FIELD[2])/2-46,FIELD[3]+6,(FIELD[0]+FIELD[2])/2+46,FIELD[3]+40]);
  if(G.shopLv<SHOP_LV.length-1){const a=arsaSign();r.push([a.x-52,a.y-32,a.x+52,a.y+26]);}r.push([50,WH-108,170,WH-50]);
  WALLC=r;return r;}
function inShop(x,y){const S=SHOP();return x>S.x0&&x<S.x1&&y>S.y0&&y<S.y1;}
function inHouse(x,y){const Hh=HOUSE();return x>Hh.x0&&x<Hh.x1&&y>Hh.y0&&y<Hh.y1;}
function freeP(x,y){if(x<10||x>WW-10||y<150||y>WH-8)return false;
  for(const r of wallRects())if(inRect(x,y,r,6))return false;
  for(const o of G.objs){if(isFlat(o))continue;const f=fpOf(o);if(x>f[0]-6&&x<f[2]+6&&y>f[1]-2&&y<f[3]+4)return false;}
  return true;}
function walkC(x,y){if(y>WH-12){const S=SHOP();return Math.abs(x-S.ex)<70||x>1100;}
  if(x<10||x>WW-10||y<150)return false;
  for(const r of wallRects())if(inRect(x,y,r,7))return false;
  for(const o of G.objs){if(isFlat(o))continue;if(inRect(x,y,fpOf(o),8))return false;}
  return true;}
const CELL=20,GC=Math.ceil(WW/CELL),GR=Math.ceil((WH+60)/CELL);let GRID=null;
function buildGrid(){GRID=new Uint8Array(GC*GR);for(let r=0;r<GR;r++)for(let c=0;c<GC;c++)GRID[r*GC+c]=walkC(c*CELL+10,r*CELL+10)?0:1;}
function cellFree(c,r){return c>=0&&r>=0&&c<GC&&r<GR&&GRID[r*GC+c]===0;}
function nearFree(c,r){if(cellFree(c,r))return[c,r];for(let d=1;d<9;d++)for(let dy=-d;dy<=d;dy++)for(let dx=-d;dx<=d;dx++){if(Math.max(Math.abs(dx),Math.abs(dy))!==d)continue;if(cellFree(c+dx,r+dy))return[c+dx,r+dy];}return null;}
function lineFree(x0,y0,x1,y1){const d=Math.hypot(x1-x0,y1-y0),n=Math.ceil(d/8);for(let i=1;i<n;i++){const x=x0+(x1-x0)*i/n,y=y0+(y1-y0)*i/n;if(!cellFree(Math.floor(x/CELL),Math.floor(y/CELL)))return false;}return true;}
const PATHN={gs:null,from:null,closed:null};
function findPath(x0,y0,x1,y1){
  if(!GRID)buildGrid();
  const s=nearFree(clamp(Math.floor(x0/CELL),0,GC-1),clamp(Math.floor(y0/CELL),0,GR-1)),e=nearFree(clamp(Math.floor(x1/CELL),0,GC-1),clamp(Math.floor(y1/CELL),0,GR-1));
  if(!s||!e)return[[x1,y1]];
  const N=GC*GR;if(!PATHN.gs){PATHN.gs=new Float32Array(N);PATHN.from=new Int32Array(N);PATHN.closed=new Uint8Array(N);}
  const gs=PATHN.gs,from=PATHN.from,closed=PATHN.closed;gs.fill(1e9);from.fill(-1);closed.fill(0);
  const si=s[1]*GC+s[0],ei=e[1]*GC+e[0];gs[si]=0;const open=[si];const h=i=>Math.hypot(i%GC-e[0],Math.floor(i/GC)-e[1]);
  let it=0;
  while(open.length&&it++<14000){let bi=0,bf=1e9;for(let k=0;k<open.length;k++){const f=gs[open[k]]+h(open[k]);if(f<bf){bf=f;bi=k;}}
    const cur=open[bi];open[bi]=open[open.length-1];open.pop();if(cur===ei)break;if(closed[cur])continue;closed[cur]=1;
    const cc=cur%GC,cr=Math.floor(cur/GC);
    for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){if(!dx&&!dy)continue;const nc=cc+dx,nr=cr+dy;if(!cellFree(nc,nr))continue;if(dx&&dy&&(!cellFree(cc+dx,cr)||!cellFree(cc,cr+dy)))continue;
      const ni=nr*GC+nc,ng=gs[cur]+(dx&&dy?1.414:1);if(ng<gs[ni]){gs[ni]=ng;from[ni]=cur;open.push(ni);}}}
  if(from[ei]===-1&&ei!==si)return[[x1,y1]];
  const pts=[];let c=ei;while(c!==-1&&c!==si){pts.push([(c%GC)*CELL+10,Math.floor(c/GC)*CELL+10]);c=from[c];}pts.reverse();pts.push([x1,y1]);
  const out=[];let px=x0,py=y0,i=0;
  while(i<pts.length){let j=pts.length-1;while(j>i&&!lineFree(px,py,pts[j][0],pts[j][1]))j--;out.push(pts[j]);px=pts[j][0];py=pts[j][1];i=j+1;}
  return out;}
function moveTo(o,tx,ty,sp,dt){const dx=tx-o.x,dy=ty-o.y,d=Math.hypot(dx,dy);if(d<.8){o.x=tx;o.y=ty;o.moving=false;return true;}
  const s=Math.min(d,sp*dt);o.x+=dx/d*s;o.y+=dy/d*s;if(Math.abs(dx)>.3)o.dir=dx>0?1:-1;o.walk=(o.walk||0)+dt;o.moving=true;return false;}
function follow(c,sp,dt){if(!c.path||!c.path.length){c.moving=false;return true;}const q=c.path[0];if(moveTo(c,q[0],q[1],sp,dt))c.path.shift();return !c.path.length;}
function goTo(c,x,y){c.path=findPath(c.x,c.y,x,y);}

/* ====================== ZEMİN ====================== */
const TILE=40;
const TILES=[{ad:'Tahta',c1:'#c9925a',c2:'#a8743e'},{ad:'Taş',c1:'#cfc7ba',c2:'#a89f92'},{ad:'Çini',c1:'#4f86c4',c2:'#f2ead8'},{ad:'Kiremit',c1:'#cf7046',c2:'#a8502e'},{ad:'Hasır',c1:'#e6c680',c2:'#c8a45c'},{ad:'Yosun',c1:'#86b462',c2:'#6a9a4a'},{ad:'Mermer',c1:'#f2ead8',c2:'#cfc0a8'},{ad:'Kum Taşı',c1:'#e0b97c',c2:'#c49a5a'}];
const TILE_COST=4;
function drawTile(t,x,y){const T0=TILES[t];g.fillStyle=T0.c1;g.fillRect(x,y,TILE,TILE);g.lineWidth=1.2;g.strokeStyle=T0.c2;
  if(t===0){for(let i=1;i<4;i++){g.beginPath();g.moveTo(x,y+i*10);g.lineTo(x+TILE,y+i*10);g.stroke();}g.beginPath();g.moveTo(x+14,y);g.lineTo(x+14,y+10);g.moveTo(x+30,y+10);g.lineTo(x+30,y+20);g.moveTo(x+8,y+20);g.lineTo(x+8,y+30);g.moveTo(x+24,y+30);g.lineTo(x+24,y+40);g.stroke();}
  else if(t===1||t===7){[[2,2,17,17],[21,2,17,10],[21,14,17,24],[2,21,17,17]].forEach(([a,b,w,h])=>{rr(x+a,y+b,w,h,4);g.fillStyle=mix(T0.c1,'#ffffff',.15);g.fill();g.stroke();});}
  else if(t===2){g.fillStyle=T0.c2;g.beginPath();g.moveTo(x+20,y+3);g.lineTo(x+37,y+20);g.lineTo(x+20,y+37);g.lineTo(x+3,y+20);g.closePath();g.fill();g.stroke();g.fillStyle='#f0b43c';g.beginPath();g.arc(x+20,y+20,4,0,7);g.fill();}
  else if(t===3){for(let i=0;i<4;i++){g.beginPath();g.moveTo(x,y+i*10);g.lineTo(x+TILE,y+i*10);g.stroke();const o=(i%2)*10;for(let j=0;j<3;j++){g.beginPath();g.moveTo(x+o+j*20,y+i*10);g.lineTo(x+o+j*20,y+i*10+10);g.stroke();}}}
  else if(t===4){for(let i=0;i<5;i++){g.beginPath();g.moveTo(x+i*8,y);g.lineTo(x+i*8+8,y+TILE);g.stroke();}}
  else if(t===6){g.beginPath();g.moveTo(x+4,y+30);g.quadraticCurveTo(x+16,y+18,x+36,y+12);S(1,'#cfc0a8');g.beginPath();g.moveTo(x+10,y+6);g.quadraticCurveTo(x+18,y+14,x+20,y+26);S(.8,'#d8ccb8');}
  else{g.fillStyle=T0.c2;[[8,10,5],[26,8,6],[16,26,7],[32,30,4]].forEach(([a,b,r])=>{g.beginPath();g.arc(x+a,y+b,r,0,7);g.fill();});}
  g.strokeStyle='rgba(74,50,38,.18)';g.strokeRect(x+.5,y+.5,TILE-1,TILE-1);}
function cellZone(c,r){const x=c*TILE,y=r*TILE,S=SHOP(),Hh=HOUSE();
  if(x>=S.x0-8&&x+TILE<=S.x1+8&&y>=S.y0-20&&y+TILE<=S.y1+4)return true;if(x>=Hh.x0-8&&x+TILE<=Hh.x1+8&&y>=Hh.y0-20&&y+TILE<=Hh.y1+4)return true;
  if(G.yardTiles&&y>=S.y1+40&&y+TILE<=WH-50&&x>=0&&x+TILE<=WW&&!(x+TILE>FIELD[0]-10&&y<FIELD[3]+10))return true;return false;}
function paintAt(wx,wy){const c=Math.floor(wx/TILE),r=Math.floor(wy/TILE);if(!cellZone(c,r))return;const k=c+','+r,cur=G.tiles[k];
  if(PAINT===-1){if(cur!=null){delete G.tiles[k];G.nud+=2;BG=null;sfx('drop',.3);}return;}
  if(cur===PAINT)return;if(G.nud<TILE_COST){if(!G._pw){G._pw=1;toast('Kese dar!','Döşeme için nüd yetmiyor.');}return;}G.nud-=TILE_COST;G.tiles[k]=PAINT;BG=null;sfx('tick',.6);}

/* ====================== YERLEŞİM ====================== */

function whereOf(o){if(o.k==='deco')return DECO[o.d].where;if(o.k==='kiosk'||o.k==='depo')return 'out';return 'in';}
function zoneOf(f){const S=SHOP(),Hh=HOUSE();
  if(f[0]>S.x0+2&&f[2]<S.x1-2&&f[1]>S.y0+6&&f[3]<S.y1-4)return 'in';
  if(f[0]>Hh.x0+2&&f[2]<Hh.x1-2&&f[1]>Hh.y0+6&&f[3]<Hh.y1-4)return 'home';
  if(f[0]>10&&f[2]<WW-10&&f[1]>200&&f[3]<WH-56&&!rectHit(f,[S.x0-24,0,S.x1+24,S.y1+34])&&!rectHit(f,[Hh.x0-20,0,Hh.x1+20,Hh.y1+30])&&!rectHit(f,[FIELD[0]-14,0,FIELD[2]+14,FIELD[3]+14]))return 'out';
  return null;}
function validPos(o){const f=fpOf(o),z=zoneOf(f);if(!z||!whereOf(o).split(' ').includes(z))return false;
  const S=SHOP(),Hh=HOUSE();
  if(!isFlat(o)){if(rectHit(f,[S.ex-34,S.y1-56,S.ex+34,WH]))return false;if(rectHit(f,[Hh.dx-30,Hh.y1-40,Hh.dx+30,Hh.y1+60]))return false;
    if(rectHit(f,[BED.x-44,BED.y-36,BED.x+44,BED.y+30]))return false;
    for(const q of G.objs){if(q===o||isFlat(q))continue;const h=fpOf(q);if(f[0]<h[2]+4&&f[2]>h[0]-4&&f[1]<h[3]+4&&f[3]>h[1]-4)return false;}
    if(G.p&&!EDIT){const p=G.p;if(p.x>f[0]-4&&p.x<f[2]+4&&p.y>f[1]-2&&p.y<f[3]+4)return false;}}
  return true;}
function placeNear(o,x,y){for(let r=0;r<26;r++){for(let a=0;a<Math.max(1,r*8);a++){const an=a/Math.max(1,r*8)*Math.PI*2;o.x=Math.round((x+Math.cos(an)*r*20)/10)*10;o.y=Math.round((y+Math.sin(an)*r*20)/10)*10;if(validPos(o))return true;}}o.x=x;o.y=y;return false;}
function fixObjs(){const S=SHOP(),Hh=HOUSE();for(const o of G.objs){if(validPos(o))continue;const z=whereOf(o).split(' ')[0];
  const t=z==='home'?[Hh.dx,Hh.y1-60]:z==='out'?[1300,S.y1+160]:[S.ex,S.y1-120];
  if(!placeNear(o,o.x,o.y))placeNear(o,t[0],t[1]);}GRID=null;}

/* ====================== DURUM ====================== */
const KEYP='idiz_v7_';let SLOT=1;
let G,MODE='splash',paused=true,shake=0,hudPop=0,fade=0,EDIT=false,PAINT=null,sel=null,drag=null,pan=null,catTab='siparis',ZOOM=1;
function mkObj(spec,x,y){const o=Object.assign({uid:G.uid++},spec);
  if(o.k==='st'){o.inp=o.inp||[];o.out=o.out||[];o.fin=o.fin||[];o.craft=0;o.heat=0;if(ST[o.type].combo&&!o.rec)o.rec=ST[o.type].in.find(b=>b!==ST[o.type].combo&&recOK(o.type,b))||null;}
  if(o.k==='rack'||o.k==='depo')o.stock=o.stock||{};if(o.k==='kasa')o.cash=o.cash||0;if(o.k==='askazan')o.pile=o.pile==null?3:o.pile;if(o.k==='kiosk'){o.sold=0;o.t=0;}
  if(x!=null)placeNear(o,x,y);G.objs.push(o);GRID=null;if(G.plan&&o.k!=='deco'&&o.k!=='kiosk'&&o.k!=='depo')G._dirty=true;return o;}
function specOf(key){const [a,b]=key.split('_');
  if(a==='sup')return{k:'sup',item:b};if(a==='rack')return{k:'rack',item:b};if(a==='kiosk')return{k:'kiosk',kind:b};
  if(ST[key])return{k:'st',type:key};return{k:key};}
function addDef(key){const sp=specOf(key);if(sp.k==='kiosk'||sp.k==='depo'){const d=DEF[key]||[1300,1900];return mkObj(sp,d[0],d[1]);}const tmp=Object.assign({},sp);G.objs.push(tmp);const d=placeAnchor(tmp);G.objs.pop();return mkObj(sp,d[0],d[1]);}
function newRun(){
  G={v:8,toasts:[],seen:{},nud:150,day:0,phase:'night',dayT:0,story:0,step:0,shopLv:0,houseLv:0,tiles:{},yardTiles:false,
    upg:{kucak:0,carik:0,eller:0,saat:0},qual:{yatagan:0,zirh:0,parsomen:0,carik:0,iksir:0,billur:0},stLv:{},supLv:{},rackLv:0,
    skill:{hamal:{guc:0,hiz:0,istah:0},katip:{hiz:0,yuz:0},usta:{hiz:0,titiz:0},bekci:{goz:0,kos:0}},
    on:{yatagan:true},lonca:false,bahce:false,kioskLv:{dondurma:0,kahve:0,tuz:0,asci:0,nalbant:0},dip:{s:50,h:50},mods:[],meclis:false,meclisNext:0,lore:{agreguk:1,yavsuk:1,azman:1},burk:false,camels:null,delivery:null,endStage:0,endDay:0,dOff:0,ended:false,perm:{raw:0},depoLv:0,autoFill:false,man:{g:0,next:5,met:false,today:false,talked:false,wife:false,gifts:{}},contract:null,offer:null,reisMuhur:0,berat:0,sched:null,earnHist:[],ucBanUntil:0,splash:null,kervan:0,kom:0,sec:{},sup:{},order:{},orderSpent:0,lastSold:{},
    objs:[],uid:1,workers:[],wid:1,ach:{},dream:false,family:null,tellal:false,tellalNext:false,tellalRace:null,tellalRaceNext:null,
    cust:[],stack:[],auto:null,thief:null,thiefPlan:null,nightT:0,stolenLog:null,
    p:{x:BED.x+10,y:BED.y+44,dir:1,walk:0,moving:false,bub:null,seed:0,look:0,lookT:0,tool:null,toolA:0,skin:YAV.skin,stepT:0},
    spawnT:3,passT:6,t:0,parts:[],lastLines:[],actT:0,saveT:5,bf:null,bfT:0,
    tut:{ore:false,fed:false,forged:false,picked:false,racked:false,sold:false,cashed:false},today:null,totalEarn:0,famT:0};
  ST_IDS.forEach(t=>G.stLv[t]=0);RAWS.forEach(r=>{G.supLv[r]=0;G.sup[r]=0;G.order[r]=0;});
  syncBed();G.p.x=BED.x+10;G.p.y=BED.y+44;
  ['sup_kulce','ocak','ors','rack_yatagan','kasa','cop'].forEach(addDef);
  findObj('rack',o=>o.item==='yatagan').stock.yatagan=2;
  G.today=freshToday();GRID=null;WALLC=null;BG=null;
}
function freshToday(){return{sold:0,earn:0,tips:0,lost:0,races:{},goods:0,soldBy:{},kira:0,favs:0,mani:0,kontrat:0,ozel:0};}
function avgEarn(){const h=G.earnHist||[];return h.length?h.reduce((a,b)=>a+b,0)/h.length:200;}
function kervanPay(){let s=0;for(let i=0;i<G.kervan;i++)s+=KERVAN[i].pay;return s;}
function slotKey(n){return KEYP+'s'+n;}
function save(){if(!G)return;try{const s={};
  ['v','seen','nud','day','story','step','shopLv','houseLv','tiles','yardTiles','upg','qual','stLv','supLv','rackLv','skill','on','lonca','bahce','kioskLv','dip','mods','meclis','meclisNext','lore','burk','shiftOn','plan','planPaid','preplan','designOff','wed','fest','lastFest','toptanNext','depoLv','autoFill','man','delivery','lastTopic','endStage','endDay','dOff','ended','perm','contract','reisMuhur','berat','sched','earnHist','ucBanUntil','kervan','kom','sec','sup','order','orderSpent','lastSold','uid','ach','dream','tellalNext','tellalRaceNext','ev','noThiefUntil','thiefForce','tut','totalEarn','sarDone'].forEach(k=>s[k]=G[k]);
  s.objs=G.objs.map(o=>{const c={uid:o.uid,k:o.k,x:o.x,y:o.y};['type','item','kind','d','stock','cash','pile','rec','got'].forEach(k=>{if(o[k]!=null)c[k]=o[k];});
    if(o.k==='st'){c.inp=o.inp.slice();c.out=o.out.concat(o.fin.map(f=>f.id));}return c;});
  s.workers=G.workers.map(w=>({role:w.role,a:w.a||null,off:!!w.off,duty:w.duty||'auto'}));s.savedAt=Date.now();
  localStorage.setItem(slotKey(SLOT),JSON.stringify(s));localStorage.setItem(KEYP+'last',String(SLOT));}catch(e){}}
function readSlot(n){try{return JSON.parse(localStorage.getItem(slotKey(n)));}catch(e){return null;}}
function deleteSlot(n){try{localStorage.removeItem(slotKey(n));}catch(e){}}
function loadSlot(n){SLOT=n;const s=readSlot(n);newRun();if(!s)return false;
  G.objs=[];for(const k in s){if(k==='objs'||k==='workers'||k==='savedAt')continue;G[k]=s[k];}
  let refund=0;for(const c of s.objs||[]){if(c.k==='deco'&&!DECO[c.d]){refund+=OLD_DECO[c.d]||50;continue;}const o=Object.assign({},c);if(o.k==='st'){o.inp=c.inp||[];o.out=c.out||[];o.fin=[];o.craft=0;o.heat=0;}if(o.k==='rack'||o.k==='depo')o.stock=o.stock||{};if(o.k==='kasa')o.cash=o.cash||0;if(o.k==='kiosk'){o.sold=0;o.t=0;}G.objs.push(o);}
  G.workers=[];for(const w of s.workers||[]){const x=hireWorker(w.role,true,w.a);if(x){x.off=w.off;x.duty=w.duty||'auto';}}
  if(refund){G.nud+=refund;G.toasts.push({title:'Süs dükkânı yenilendi',sub:'Kaldırılan süslerin parası iade edildi: '+refund+' nüd.',t:5,max:5});}
  {const F=newRun.__fresh||{};ST_IDS.forEach(t=>{if(G.stLv[t]==null)G.stLv[t]=0;});RAWS.forEach(r=>{if(G.supLv[r]==null)G.supLv[r]=0;if(G.sup[r]==null)G.sup[r]=0;if(G.order[r]==null)G.order[r]=0;});BASES.forEach(b=>{if(G.qual[b]==null)G.qual[b]=0;});
   for(const k in KIOSK)if(G.kioskLv[k]==null)G.kioskLv[k]=0;for(const k of ['kucak','carik','eller','saat'])if(G.upg[k]==null)G.upg[k]=0;
   for(const sk of ['hamal','katip','usta','bekci'])G.skill[sk]=Object.assign({},{hamal:{guc:0,hiz:0,istah:0},katip:{hiz:0,yuz:0},usta:{hiz:0,titiz:0},bekci:{goz:0,kos:0}}[sk],G.skill[sk]||{});
   for(const o of G.objs){if(o.stock&&o.stock.ebedi){delete o.stock.ebedi;}if(o.k==='st'){o.inp=o.inp.filter(x=>x!=='dondurma'&&IT[x]);o.out=o.out.filter(x=>x!=='ebedi'&&IT[x]);if(o.rec==='dondurma')o.rec=null;}}
   for(const o of G.objs)if(o.k==='st'&&ST[o.type].combo&&!o.rec)o.rec=ST[o.type].in.find(b=>b!==ST[o.type].combo&&recOK(o.type,b))||null;}
  for(const k of ['dip','mods','lore','perm','man'])if(!G[k])G[k]=newDefaults()[k];
  if(G.delivery){for(const r in G.delivery)G.sup[r]=Math.min(supCap(r),(G.sup[r]||0)+G.delivery[r]);G.delivery=null;}G.camels=null;
  if((s.v||7)<8)migrate7();G.v=9;
  syncBed();if(G.dream)makeFamily(true);
  G.phase='night';G.p.x=BED.x+10;G.p.y=BED.y+44;G.today=freshToday();GRID=null;WALLC=null;BG=null;return true;}
/* v7 kaydı: eski yerleşim (dükkân sol üstte, ev sağ üstte, aşağı büyüyordu) → yeni yerleşim */
function migrate7(){const OS=[760,920,1080,1240,1420,1600,1780],OH=[430,490,550,620];
  const sy=OS[Math.min(G.shopLv,6)],hy=OH[Math.min(G.houseLv,3)];
  const OX=[520,700,860,1000,1000,1000,1000],HX=[1310,1370,1430,1480],sx=OX[Math.min(G.shopLv,6)],hx=HX[Math.min(G.houseLv,3)];
  for(const o of G.objs){
    if(o.k==='kiosk'){const d=DEF['kiosk_'+o.kind];if(d){o.x=d[0];o.y=d[1];}continue;}
    if(o.x>=46&&o.x<=sx&&o.y>=206&&o.y<=sy){o.x=o.x-46+SX0;o.y=SY1-(sy-o.y);}
    else if(o.x>=1130&&o.x<=hx&&o.y>=250&&o.y<=hy){o.x=o.x-1130+HX0;o.y=SY1-(hy-o.y);}
    else{o.x=-999;o.y=-999;}}
  GRID=null;WALLC=null;fixObjs();}
const OLD_DECO={mani:90,kemer:90,paravan:45,sancak:900,cit:20,cicek:35,hali:1500,bank:200,kuyu:600,sedir:1200};
function newDefaults(){return{dip:{s:50,h:50},mods:[],lore:{agreguk:1,yavsuk:1,azman:1},perm:{raw:0},man:{g:0,next:G.day+3,met:false,today:false,talked:false,wife:false,gifts:{}}};}
function slotInfo(n){const s=readSlot(n);if(!s)return null;return{day:s.day,nud:s.nud,dream:s.dream,at:s.savedAt};}

/* ====================== HESAPLAR ====================== */
function cap(){return 4+2*G.upg.kucak;}
function calcBuffs(){const b={pat:0,tip:0,qty:0,wspd:0,hspd:0,kiosk:0,thief:0,rest:0,cust:0,d20:0,kasa:0,price:0,raw:0};
  for(const o of G.objs){if(o.k!=='deco')continue;const D=DECO[o.d];if(!D.buff)continue;for(const k in D.buff)b[k]+=D.buff[k];}
  if(G.dream){b.tip+=.05;}const M=G.man;if(M){const gi=M.gifts||{};if(gi.kulah)b.tip+=.05;if(gi.atki)b.d20+=1;if(gi.kaftan)b.price+=.03;if(M.wife){b.wspd+=.2;b.hspd+=.2;b.kasa+=.15;b.pat+=.15;}}return b;}
function BF(){if(!G.bf)G.bf=calcBuffs();return G.bf;}
function rest(){let n=0;for(const o of G.objs)if(o.k==='deco'&&zoneOf(fpOf(o))==='home')n++;return Math.min(1.45,1+.02*n+.03*G.houseLv+BF().rest);}
function spd(){return (1+.12*G.upg.carik)*(G.restB||1)*(G.man&&G.man.gifts&&G.man.gifts.yelek?1.08:1);}
function craftMul(){return 1-.15*G.upg.eller;}
function dayLen(){return Math.max(30,60+15*G.upg.saat+((G.ev&&G.ev.day)||0));}
function evC(){return (G.ev&&G.ev.craft)||1;}
function EV(k,d){return G.ev&&G.ev[k]!=null?G.ev[k]:d;}
function rackCap(o){const c=RACK_CAPS[G.rackLv];return o&&o.item==='vitrin'?Math.round(c*1.5):c;}
function inCap(t){return ST_IN[G.stLv[t]||0];}
function outCap(t){return ST_OUT[G.stLv[t]||0];}
function supCap(r){return SUP_CAPS[G.supLv[r]||0];}
function beratMul(){return 1+.05*(G.berat||0);}
function price(id){const I=IT[id];let p=0;if(I.base)p=I.base*QM[G.qual[id]||0];else if(I.ench){const b=price(I.ench)/beratMul();p=(b+price('parsomen')/beratMul())*2;}else if(I.simb){p=(price(I.simb)/beratMul()+price('iksir')/beratMul())*2.1;}return Math.round(p*beratMul());}
function qOf(id){const I=IT[id];if(!I||!G)return 0;if(I.base)return G.qual[id]||0;if(I.ench)return Math.max(G.qual[I.ench]||0,G.qual.parsomen||0);if(I.simb)return Math.max(G.qual[I.simb]||0,G.qual.iksir||0);return 0;}
function rawPrice(r){return Math.max(1,Math.round(IT[r].cost*(1+.4*(G.qual[IT[r].for]||0))*(1-BF().raw-(G.perm?G.perm.raw:0))*MOD('raw')*(dipEff().rawMul||1)));}
function rackAccepts(o,id){return o.item==='vitrin'?ENCH.includes(id):o.item==='simya'?SIMYA.includes(id):o.item===id;}
function rackN(o){let n=0;for(const k in o.stock)n+=o.stock[k];return n;}
function comboOut(o){const S0=ST[o.type];return S0.combo==='parsomen'?ENCH_OF[o.rec]:SIMYA_OF[o.rec];}
function recOK(type,b){return !!G.on[b];}
function stAccepts(o,id){const S0=ST[o.type];if(!S0.in.includes(id))return false;if(o.inp.length>=inCap(o.type))return false;
  if(S0.combo){if(!o.rec)return false;if(id!==S0.combo&&id!==o.rec)return false;const nc=o.inp.filter(x=>x===S0.combo).length,nb=o.inp.length-nc;const half=Math.ceil(inCap(o.type)/2);if(id===S0.combo?nc>=half:nb>=half)return false;}
  return true;}
function displayed(id){const I=IT[id];if(!G.objs.some(o=>o.k==='rack'&&rackAccepts(o,id)))return false;if(I.ench||I.simb){if(!(I.ench?G.on.efsun&&recOK('efsun',I.ench):G.on.simya&&G.on[I.simb]))return false;return G.objs.some(o=>(o.k==='st'&&ST[o.type].combo&&comboOut(o)===id)||(o.k==='rack'&&(o.stock[id]||0)>0));}return !!G.on[id];}
function wage(role){const sk=G.skill[USTA_ROLES.includes(role)?'usta':role]||{};let s=0;for(const x in sk)s+=sk[x];return ROLES[role].wage+4*s;}
function roleCount(r){return G.workers.filter(w=>w.role===r).length;}
function fame(){let f=0;for(const o of G.objs)if(o.k==='deco'&&zoneOf(fpOf(o))!=='home')f+=DECO[o.d].fame;return f+2*G.shopLv+(G.dream?5:0);}
function attraction(){const a={};for(const r of RACE_IDS){const P=PREF[r];let ok=0;for(const id in P.w)if(displayed(id))ok+=P.w[id];if(!ok)continue;a[r]=BASE_ATT[r]*(.6+Math.min(1.6,ok/6));if(displayed(P.fav))a[r]*=1.3;}
  for(const o of G.objs)if(o.k==='deco'&&zoneOf(fpOf(o))!=='home'){const L=DECO[o.d].like;for(const r in L)if(a[r]!=null)a[r]+=L[r];}
  if(G.dream&&a.yasruk!=null)a.yasruk+=4;if(G.tellalRace&&a[G.tellalRace]!=null)a[G.tellalRace]+=6;if((G.ucBanUntil||0)>=G.day&&a.ucmakan!=null)a.ucmakan*=.2;const er=EV('race',null);if(er)for(const r in er)if(a[r]!=null)a[r]*=er[r];
  const de=dipEff();for(const r in a){a[r]*=(de.race&&de.race[r]||1)*MOD('r_'+r);}return a;}
function spawnInterval(){return Math.max(.55,3.8/(1+.08*fame()+(G.tellal?.6:0))/EV('cust',1)/(1+BF().cust)/MOD('cust'));}
function custCap(){return Math.min(CUST_MAX,5+Math.min(5,SELLS.filter(displayed).length)+3*G.shopLv);}
function prestige(){return fame()+3*G.shopLv+G.day/8+(G.berat||0)*4+(G.reisMuhur||0)*2+(G.meclis?8:0);}
function pickTier(){const P=prestige();const ps=clamp((P-30)/90,0,.25),pz=clamp((P-10)/55,0,.45),pf=clamp(.6-P/45,.05,.6);const r=Math.random();return r<ps?3:r<ps+pz?2:r<ps+pz+pf?0:1;}

/* ====================== YARDIMCILAR ====================== */
function say(o,txt,dur){o.bub={txt,t:dur||2.8};if(o!==G.p&&!/^[~*.]/.test(txt))G.lastLines.push(txt);if(G.lastLines.length>8)G.lastLines.shift();}
function fx(k,x,y,o){const p=Object.assign({k,x,y,vx:0,vy:0,t:1,max:1},o||{});p.max=p.t;if(G.parts.length>180)G.parts.splice(0,G.parts.length-180);G.parts.push(p);return p;}
function floatTxt(x,y,s,col,size){fx('text',x,y,{s,col:col||'#ffd34c',vy:-26,t:1.3,size:size||15});}
function sparks(x,y,n){for(let i=0;i<n;i++){const a=-Math.PI/2+(Math.random()-.5)*2.6,v=60+Math.random()*90;fx('spark',x,y,{vx:Math.cos(a)*v,vy:Math.sin(a)*v,t:.35+Math.random()*.3});}}
function puff(k,x,y,n,spread){for(let i=0;i<n;i++)fx(k,x+(Math.random()-.5)*(spread||10),y,{vx:(Math.random()-.5)*14,vy:-14-Math.random()*16,t:.8+Math.random()*.6,r:3+Math.random()*3});}
function toast(title,sub,o){G.toasts.push(Object.assign({title,sub,t:3.6,max:3.6},o||{}));}
function achieve(id){if(G.ach[id])return;G.ach[id]=1;const A=ACH[id];toast('🏆 '+A[0],A[1],{item:'yatagan'});sfx('unlock',.7);}
function stackHas(id){return G.stack.indexOf(id)>=0;}
function stackTake(id){const i=G.stack.lastIndexOf(id);if(i<0)return false;G.stack.splice(i,1);return true;}

/* ====================== ÇALIŞANLAR ====================== */
function hireWorker(role,silent,assign){const base={id:G.wid++,role,x:0,y:0,dir:1,walk:0,moving:false,stack:[],st:'idle',t:0,bub:null,seed:Math.random()*9,look:0,path:null,hunger:100,off:false};
  const R=ROLES[role],sp=SPEC[role];base.skin=sp.skin;
  if(R.st){const st=assign?byUid(assign):objs('st',o=>o.type===R.st&&!G.workers.some(w=>w.a===o.uid))[0];if(!st)return null;base.a=st.uid;const c=craftP(st);base.x=c.x;base.y=c.y;}
  else if(role==='katip'){const k=assign?byUid(assign):objs('kasa',o=>!G.workers.some(w=>w.role==='katip'&&w.a===o.uid))[0];if(!k)return null;base.a=k.uid;base.x=k.x;base.y=k.y-30;}
  else{const S=SHOP();base.x=S.ex+(Math.random()-.5)*60;base.y=S.y1-80;}
  if(role==='hamal'&&!findObj('askazan'))addDef('askazan');
  G.workers.push(base);return base;}
function makeFamily(instant){const Hh=HOUSE(),S=SHOP();const base=[{ad:'Annesi',cloth:'#b8507a',skin:'#7cae58',k:1,job:'kasa'},{ad:'Babası',cloth:'#7a5a3a',skin:'#6f9a52',k:1,job:'tarla'},{ad:'Kız kardeşi',cloth:'#4f8ac2',skin:'#88b862',k:.72,job:'tarla'}];
  G.family=base.map((b,i)=>Object.assign({x:instant?Hh.x0+60+i*40:S.ex+(i-1)*24,y:instant?Hh.y1-40:WH+20+i*30,dir:-1,walk:0,moving:false,seed:11+i,look:0,bub:null,path:null,talkT:4+i*3,hoe:0},b));}
