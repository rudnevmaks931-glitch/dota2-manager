function nearestEnemyTower(p,team,line){var arr=[],i;for(i=0;i<G.M.towers.length;i++){var t=G.M.towers[i];if(t.alive&&t.team!==team)arr.push(t);}var same=[];for(i=0;i<arr.length;i++)if(arr[i].line===line)same.push(arr[i]);var pool=same.length?same:arr;var best=null,bd=1e9;for(i=0;i<pool.length;i++){var d=dist(p.pos,pool[i].pos);if(d<bd){bd=d;best=pool[i];}}return best;}
function allT3Dead(team){var arr=G.M.towers;for(var i=0;i<arr.length;i++)if(arr[i].team===team&&arr[i].tier===3&&arr[i].alive)return false;return true;}
function barsOf(team,line){var res=[],arr=G.M.bars;for(var i=0;i<arr.length;i++)if(arr[i].team===team&&arr[i].line===line)res.push(arr[i]);return res;}
function canAfford(p){var plan=BUILD[p.role];if(p.buildIdx>=plan.length)return false;return p.gold>=(ITEM_GOLD[plan[p.buildIdx]]||2000);}
function tryBuy(p){if(!canAfford(p))return;var atBase=dist(p.pos,POI[p.team+'Fount'])<10||dist(p.pos,POI[p.team+'Base'])<10;if(!(atBase||p.target==='buy'))return;var plan=BUILD[p.role];var nxt=plan[p.buildIdx];var cost=ITEM_GOLD[nxt]||2000;p.gold-=cost;p.inv.push(nxt);p.buildIdx++;p.st.teamfight+=2;p.st.sense+=1;ev('🛒 '+p.name+' купил '+nxt+' (-'+cost+'g) [слот '+p.inv.length+'/6]','go');}
function moveToward(p,tx,ty,sp){var dx=tx-p.pos[0],dy=ty-p.pos[1];var d=Math.sqrt(dx*dx+dy*dy);if(d<sp){p.pos[0]=tx;p.pos[1]=ty;return;}p.pos[0]+=dx/d*sp;p.pos[1]+=dy/d*sp;}
function nearestRune(p,M){var best=null,bd=1e9;var pts=[['t',POI.runeTop],['b',POI.runeBot]];for(var i=0;i<pts.length;i++){if(!M.runes[pts[i][0]].alive)continue;var d=dist(p.pos,pts[i][1]);if(d<bd){bd=d;best={pos:pts[i][1],d:d};}}return best;}
function chooseTarget(p,mn,M){
 var team=p.team;
 if(M.fight)return {pos:M.fight.pos.slice(),kind:'fight',speed:2.2};
 if(M.gank&&M.gank.by===p)return {pos:M.gank.on.pos.slice(),kind:'gank',speed:2.2};
 if(M.push&&M.push.side===team){var tgt=nearestEnemyTower(p,team,M.push.line);if(tgt)return {pos:tgt.pos.slice(),kind:'push',speed:2.0};return {pos:POI[mirror(team)+'Base'].slice(),kind:'push',speed:2.0};}
 if(M.roshanCall===team&&!M.roshan.alive&&M.roshan.timer>0&&M.roshan.timer<40)return {pos:POI.roshan.slice(),kind:'roshan',speed:1.8};
 if(p.target==='buy'||canAfford(p)){var f=POI[team+'Fount'];if(dist(p.pos,f)>8)return {pos:f.slice(),kind:'buy',speed:1.5};p.target=null;}
 if(M.push&&M.push.side!==team&&M.push.line===laneKey(p.role,team)&&(p.role==='carry'||p.role==='offlane'))return {pos:laneHome(p.role,team),kind:'defend',speed:1.6};
 if((p.role==='mid'||p.role==='support4')&&M.runes){var nr=nearestRune(p,M);if(nr&&nr.d<22)return {pos:nr.pos.slice(),kind:'rune',speed:1.4};}
 if(mn>=7&&(p.role==='carry'||p.role==='offlane')&&Math.random()<0.35){var camps=POI.camps[team];var c=camps[Math.floor(Math.random()*camps.length)];return {pos:[c[0],c[1]],kind:'jungle',speed:1.6};}
 return {pos:jit(laneHome(p.role,team),6),kind:'lane',speed:1.0};
}
function startMatch(mode){
 if(G.players.length<5){alert('Нужно 5 игроков!');return;}
 try{
  var roles=['carry','mid','offlane','support4','support5'];var dn=uniq(DN,5);var dire=[];
  for(var i=0;i<5;i++)dire.push(mkHero(100+i,dn[i],roles[i],'d'));
  var objs=[],lines=['top','bot','mid'];
  for(var L=0;L<lines.length;L++){var ln=lines[L];var rt=POI.towers.r[ln];for(var t=0;t<rt.length;t++)objs.push({team:'r',line:ln,tier:t+1,pos:rt[t].slice(),hp:100,alive:true});var dt=POI.towers.d[ln];for(var t2=0;t2<dt.length;t2++)objs.push({team:'d',line:ln,tier:t2+1,pos:dt[t2].slice(),hp:100,alive:true});}
  var bars=[],rb=POI.rBarMelee.concat(POI.rBarRange);for(var a=0;a<rb.length;a++)bars.push({team:'r',kind:a<2?'melee':'range',line:a<2?'bot':'top',pos:rb[a].slice(),hp:100,alive:true});
  var db=POI.dBarMelee.concat(POI.dBarRange);for(var b2=0;b2<db.length;b2++)bars.push({team:'d',kind:b2<2?'melee':'range',line:b2<2?'top':'bot',pos:db[b2].slice(),hp:100,alive:true});
  for(var q=0;q<G.players.length;q++){var pp=G.players[q];pp.kda={k:0,d:0,a:0};pp.gold=625;pp.lh=0;pp.dn=0;pp.alive=true;pp.respawn=0;pp.streak=0;pp.buildIdx=0;pp.inv=[];pp.pos=laneHome(pp.role,'r');pp.target=null;pp._kind='lane';pp.aegis=false;}
  G.M={mode:mode,time:0,phase:'Драфт',rk:0,dk:0,rg:3125,dg:3125,ev:[],dire:dire,towers:objs,bars:bars,
   roshan:{alive:true,timer:0},runes:{t:{alive:true,timer:TIMING.runeFirst},b:{alive:true,timer:TIMING.runeFirst}},
   outposts:{r:[false,false],d:[false,false]},mega:{top:false,bot:false,mid:false},
   fight:null,gank:null,push:null,roshanCall:0,runeTimer:TIMING.runeFirst};
  go('match');
  setTimeout(function(){initMap();render();},120);
  if(G.iv)clearInterval(G.iv);G.iv=setInterval(tick,1000/G.speed);
 }catch(e){var d=document.getElementById('dbg');if(d){d.style.display='block';d.textContent='START ERR: '+e.message;}}
}
function tick(){
 var M=G.M;if(!M)return;
 try{
  M.time+=5;var mn=M.time/60,i;
  M.phase=mn<1?'Драфт':mn<8?'Лайнинг':mn<22?'Мидгейм':mn<35?'Лейтгейм':'Судден';
  M.rg+=6;M.dg+=6;
  for(i=0;i<G.players.length;i++)G.players[i].gold+=1;for(i=0;i<M.dire.length;i++)M.dire[i].gold+=1;
  M.runeTimer-=5;if(M.runeTimer<=0){M.runeTimer=TIMING.runeInterval;M.runes.t.alive=true;if(mn*60>=TIMING.runeDoubleAt)M.runes.b.alive=true;}
  if(!M.roshan.alive){M.roshan.timer-=5;if(M.roshan.timer<=0){M.roshan.alive=true;M.roshanCall=0;ev('🐉 Рошан возродился!','ob');}}
  if(!M.fight&&mn>4){var tfCh=mn<8?0.02:mn<22?0.05:0.09;if(Math.random()<tfCh){var spots=[[60,40],[40,60],[POI.lane.rmid[0],POI.lane.rmid[1]],[38,38],[62,62],[26,66],[70,80],[POI.roshan[0],POI.roshan[1]]];var sp=spots[Math.floor(Math.random()*spots.length)];M.fight={pos:sp,t:6,side:Math.random()<0.5?'r':'d'};ev('⚔️ ТИМФАЙТ в '+(dist(sp,POI.roshan)<10?'Roshan pit':dist(sp,[50,50])<16?'Mid':'на линии')+'!','in');}}
  if(!M.gank&&!M.fight&&mn>3&&Math.random()<0.06){var gangers=[];for(i=0;i<G.players.length;i++)if(G.players[i].role==='support4'||G.players[i].role==='support5'||G.players[i].role==='mid')gangers.push(G.players[i]);for(i=0;i<M.dire.length;i++)if(M.dire[i].role==='support4'||M.dire[i].role==='support5'||M.dire[i].role==='mid')gangers.push(M.dire[i]);if(gangers.length){var g=gangers[Math.floor(Math.random()*gangers.length)];var isD=false;for(i=0;i<M.dire.length;i++)if(M.dire[i]===g)isD=true;var enemy=isD?G.players:M.dire;var victim=enemy[Math.floor(Math.random()*5)];M.gank={by:g,on:victim,pos:victim.pos.slice(),t:5,side:isD?'d':'r'};}}
  if(M.fight){M.fight.t--;if(M.fight.t<=0){var wf=M.fight.side;resolveFight(M.fight);M.fight=null;if(Math.random()<0.75)M.push={line:['top','bot','mid'][Math.floor(Math.random()*3)],side:wf,t:8};}}
  if(M.push){M.push.t--;if(M.push.t<=0)M.push=null;}
  if(M.gank){M.gank.t--;if(M.gank.t<=0){resolveGank(M.gank);M.gank=null;}}
  if(!M.roshan.alive&&M.roshan.timer>0&&M.roshan.timer<30&&M.roshanCall===0){M.roshanCall=Math.random()<0.5?'r':'d';ev(' '+(M.roshanCall==='r'?'RADIANT':'DIRE')+' стягивается к Рошану!','ob');}
  var all=[];for(i=0;i<G.players.length;i++)all.push(G.players[i]);for(i=0;i<M.dire.length;i++)all.push(M.dire[i]);
  for(i=0;i<all.length;i++){var p=all[i];
   if(!p.alive){p.respawn-=5;if(p.respawn<=0){p.alive=true;p.pos=POI[p.team+'Fount'].slice();p.target='buy';p._kind='buy';ev('↩️ '+p.name+' вернулся из фонтана','dc');}continue;}
   tryBuy(p);
   var tg=chooseTarget(p,mn,M);p._kind=tg.kind;moveToward(p,tg.pos[0],tg.pos[1],tg.speed);
   if(tg.kind==='lane'&&Math.random()<0.5){p.lh++;var g2=40+Math.floor(Math.random()*20);p.gold+=g2;if(p.team==='r')M.rg+=g2;else M.dg+=g2;if(Math.random()<0.12)ev('🌾 '+p.name+' last-hit (+'+g2+'g) [LH:'+p.lh+']','go');}
   if(tg.kind==='lane'&&Math.random()<0.12){p.dn++;if(Math.random()<0.1)ev('️ '+p.name+' denied a creep','dc');}
   if(tg.kind==='jungle'&&Math.random()<0.4){var g3=60+Math.floor(Math.random()*80);p.gold+=g3;if(p.team==='r')M.rg+=g3;else M.dg+=g3;if(Math.random()<0.1)ev(' '+p.name+' фармит кемп (+'+g3+'g)','go');}
   if(tg.kind==='rune'){var nr=nearestRune(p,M);if(nr&&nr.d<5){var rk=null;if(dist(p.pos,POI.runeTop)<6)rk='t';else if(dist(p.pos,POI.runeBot)<6)rk='b';if(rk&&M.runes[rk].alive){M.runes[rk].alive=false;p.gold+=100;if(p.team==='r')M.rg+=100;else M.dg+=100;ev('💧 '+p.name+' забрал руну ('+(rk==='t'?'top':'bottom')+')','ob');}}}
   if(tg.kind==='roshan'&&dist(p.pos,POI.roshan)<7&&M.roshan.alive&&Math.random()<0.3){M.roshan.alive=false;M.roshan.timer=TIMING.roshanMin+Math.floor(Math.random()*(TIMING.roshanMax-TIMING.roshanMin));M.roshanCall=0;var aegis=p.team==='r'?G.players:M.dire;var carrier=aegis[Math.floor(Math.random()*5)];carrier.gold+=400;carrier.aegis=true;if(p.team==='r')M.rg+=2000;else M.dg+=2000;ev(' '+(p.team==='r'?'RADIANT':'DIRE')+' убил РОШАНА! Aegis -> '+carrier.name,'ob');}
   if(tg.kind==='push'){var tgt=nearestEnemyTower(p,p.team,M.push?M.push.line:laneKey(p.role,p.team));if(tgt&&dist(p.pos,tgt.pos)<6){tgt.hp-=8+Math.floor(p.st.teamfight/10);if(tgt.hp<=0&&tgt.alive){tgt.alive=false;var gain=p.team==='r'?G.players:M.dire;for(var z=0;z<gain.length;z++)gain[z].gold+=250;if(p.team==='r')M.rg+=1250;else M.dg+=1250;ev('🏰 '+(p.team==='r'?'RADIANT':'DIRE')+' сломал башню T'+tgt.tier+' '+tgt.line+' (+250g каждому)','ob');if(tgt.tier===3)breakBars(p.team,tgt.line);}}}
  }
  if(allT3Dead('d')){endMatch('r');return;}
  if(allT3Dead('r')){endMatch('d');return;}
  if(mn>=45){endMatch(M.rk>=M.dk?'r':'d');return;}
  render();
 }catch(e){var d=document.getElementById('dbg');if(d){d.style.display='block';d.textContent='TICK ERR: '+e.message;}if(G.iv){clearInterval(G.iv);G.iv=null;}}
}
function breakBars(attTeam,line){var def=mirror(attTeam);var bs=barsOf(def,line);var allDead=true;for(var i=0;i<bs.length;i++)if(bs[i].alive)allDead=false;if(!allDead)return;for(var j=0;j<bs.length;j++)bs[j].alive=false;G.M.mega[line]=true;ev('💥 MEGA-крипы на '+line+' линии! Давление на трон '+def,'ob');}
function resolveFight(f){var M=G.M;var rP=0,dP=0,i;for(i=0;i<G.players.length;i++)if(G.players[i].alive)rP+=G.players[i].st.teamfight+G.players[i].st.shotcall+G.players[i].inv.length*4;for(i=0;i<M.dire.length;i++)if(M.dire[i].alive)dP+=M.dire[i].st.teamfight+M.dire[i].st.shotcall+M.dire[i].inv.length*4;rP+=Math.random()*40;dP+=Math.random()*40;
 var win=rP>dP?'r':'d';var lose=win==='r'?M.dire:G.players;var winArr=win==='r'?G.players:M.dire;var kills=1+Math.floor(Math.random()*3);
 for(var k=0;k<kills;k++){var v=lose[Math.floor(Math.random()*lose.length)];if(!v||!v.alive)continue;if(v.aegis){v.aegis=false;ev('🛡️ '+v.name+' потерял Aegis (воскрес)','ob');continue;}v.alive=false;v.respawn=20+(v.lvl||12)*2;v.kda.d++;v.streak=0;var kk=winArr[Math.floor(Math.random()*winArr.length)];kk.kda.k++;kk.kda.a+=Math.floor(Math.random()*3);kk.streak++;var b=250+kk.streak*40+Math.floor(Math.random()*120);kk.gold+=b;if(win==='r')M.rg+=b;else M.dg+=b;if(win==='r')M.rk++;else M.dk++;ev((win==='r'?'⚔️ ':'💀 ')+kk.name+' убил '+v.name+' в тимфайте (+'+b+'g)',win==='r'?'kr':'kd');streakMsg(kk);
  if(M.time/60>22&&Math.random()<0.4){var bb=Math.floor(v.gold*0.34);if(bb>0){v.gold-=bb;v.alive=true;v.respawn=0;v.pos=f.pos.slice();ev('💸 '+v.name+' ВЫКУПИЛСЯ (buyback -'+bb+'g)!','ob');}}
 }
 ev('— ТИМФАЙТ: '+(win==='r'?'RADIANT':'DIRE')+' побеждает —',win==='r'?'kr':'kd');
}
function resolveGank(g){var M=G.M;var by=g.by,on=g.on;if(!by.alive||!on.alive)return;var succ=on.vision?0.35:0.62;var ap=by.st.sense+by.st.teamfight+by.st.support+Math.random()*20;var dp=on.st.sense+Math.random()*20+(on.vision?30:0);
 if(ap>dp&&Math.random()<succ+0.2){if(on.aegis){on.aegis=false;ev('🛡️ '+on.name+' потерял Aegis при ганке','ob');}else{on.alive=false;on.respawn=18+(on.lvl||12)*2;on.kda.d++;on.streak=0;}by.kda.k++;by.kda.a++;by.streak++;var b=250+by.streak*40+Math.floor(Math.random()*120);by.gold+=b;if(g.side==='r')M.rg+=b;else M.dg+=b;if(g.side==='r')M.rk++;else M.dk++;ev((g.side==='r'?'⚔️ ':'💀 ')+by.name+' ганкнул и убил '+on.name+' (+'+b+'g)',g.side==='r'?'kr':'kd');streakMsg(by);}
 else{by.alive=false;by.respawn=18+(by.lvl||12)*2;by.kda.d++;by.streak=0;on.kda.k++;var b2=200;on.gold+=b2;if(g.side==='r')M.dg+=b2;else M.rg+=b2;if(g.side==='r')M.dk++;else M.rk++;ev(' '+on.name+' наказал ганкера '+by.name+'!',g.side==='r'?'kd':'kr');}
}
function streakMsg(p){if(p.streak===3)ev(' '+p.name+' — Killing Spree!','sk');if(p.streak===5)ev('💥 '+p.name+' — MEGA KILL!','sk');if(p.streak===8)ev('👑 '+p.name+' — GODLIKE!','sk');if(p.streak===10)ev('⚡ '+p.name+' — BEYOND GODLIKE!','sk');}
function ev(t,ty){var M=G.M;var mn=Math.floor(M.time/60),sc=M.time%60;M.ev.unshift({t:t,ty:ty,s:mn+':'+(sc<10?'0':'')+sc});if(M.ev.length>60)M.ev.pop();}
function spd(){G.speed=G.speed===2?4:(G.speed===4?8:2);el('m-spb','⏩ x'+G.speed);if(G.iv)clearInterval(G.iv);G.iv=setInterval(tick,1000/G.speed);}
function sur(){if(confirm('Сдаться?'))endMatch('d');}
function endMatch(winner){
 clearInterval(G.iv);G.iv=null;var M=G.M;var won=winner==='r';
 if(won){G.wins++;G.rank+=25;G.money+=1000;G.xp+=50;}else{G.losses++;G.rank=Math.max(0,G.rank-25);G.money+=200;G.xp+=20;}
 if(G.xp>=G.xpm){G.lvl++;G.xp=0;G.xpm=Math.floor(G.xpm*1.5);}
 for(var i=0;i<G.players.length;i++){var p=G.players[i];p.xp+=30;if(p.xp>=p.xpm){p.lvl++;p.xp=0;p.xpm=Math.floor(p.xpm*1.5);p.drm+=2;p.dr=p.drm;}}
 el('r-ic',won?'🏆':'😔');el('r-ti',won?'ПОБЕДА!':'ПОРАЖЕНИЕ');el('r-ti').style.color=won?'#4caf50':'#f44336';el('r-sc',M.rk+' - '+M.dk);
 el('r-mo','+$'+(won?1000:200));el('r-rk',(won?'+':'-')+'25 RANK');el('r-rk').style.color=won?'#4caf50':'#f44336';el('r-rcard').style.borderColor=won?'#4caf50':'#f44336';el('r-rv',G.rank);
 var allh=G.players.concat(M.dire);var mvp=allh[0];for(var j=1;j<allh.length;j++)if((allh[j].kda.k+allh[j].kda.a)>(mvp.kda.k+mvp.kda.a))mvp=allh[j];
 el('r-mvp',mvp.name+' — '+mvp.kda.k+'K/'+mvp.kda.d+'D/'+mvp.kda.a+'A');
 var rx='';for(var q=0;q<G.players.length;q++)rx+='<div style="display:flex;justify-content:space-between;padding:3px 0;font-size:10px"><span style="color:#888">Новобранец '+G.players[q].name+'</span><span style="color:#c9a84c">+69 XP</span></div>';
 rx+='<div style="display:flex;justify-content:space-between;padding:4px 0;border-top:1px solid #333;margin-top:5px;font-size:10px"><span style="color:#c9a84c;font-weight:bold">MANAGER</span><span style="color:#c9a84c;font-weight:bold">+149 XP</span></div>';
 el('r-xp').innerHTML=rx;go('result');
}
