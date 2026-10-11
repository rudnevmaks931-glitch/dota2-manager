// Логика боя: старт, тики, события, итог.
var M={on:false,t:0,dt:1,players:[],sel:null,speed:2,iv:null};

function startMatch(){
 if(M.on){alert('Бой уже идёт!');return;}
 if(G.players.length<5){alert('Нужно 5 героев!');return;}
 M.on=true;M.t=0;M.players=[];
 for(var i=0;i<G.players.length;i++){var p=G.players[i];M.players.push({id:i,name:p.name,ic:p.ic,rl:p.rl,team:p.team,
  st:{lasthit:p.st.lasthit,sense:p.st.sense,teamfight:p.st.teamfight,shotcall:p.st.shotcall,support:p.st.support},
  base:{lasthit:p.base.lasthit,sense:p.base.sense,teamfight:p.base.teamfight,shotcall:p.base.shotcall,support:p.base.support},
  eq:p.eq,inv:p.inv.slice(),lh:0,dn:0,gold:625,stam:80,stamM:p.stamM,dr:14,drm:p.drm,
  alive:true,respawn:0,pos:laneHome(p.role,p.team),target:null,kda:{k:0,d:0,a:0},streak:0,buildIdx:0,_kind:'lane',vision:Math.random()<0.45,aegis:false});}
 M.iv=setInterval(tick,1000/M.speed);
 go('match');
}
function tick(){
 M.t+=M.dt;
 for(var i=0;i<M.players.length;i++){var p=M.players[i];
  if(!p.alive){p.respawn-=M.dt;if(p.respawn<=0){p.alive=true;p.stam=p.stamM;alert(p.name+' возродился!');}continue;}
  p.stam-=0.5;if(p.stam<0)p.stam=0;
  p.gold+=2;
  if(p.gold>=ITEM_GOLD[p.inv[p.buildIdx]||'Power Treads']){if(p.buildIdx<6){p.inv[p.buildIdx]=Object.keys(ITEM_GOLD)[p.buildIdx];p.buildIdx++;}}
 }
 if(M.t%30===0)eventLane();
 if(M.t%120===0)eventRune();
 if(M.t%480===0)eventRoshan();
 if(M.t>=600){endMatch();}
}
function eventLane(){
 var r=Math.floor(Math.random()*3);
 var lanes=['top','mid','bot'];
 var ln=lanes[r];
 var team=Math.random()<0.5?'r':'d';
 var p=pickLane(ln,team);
 if(!p)return;
 p.lh+=1;p.gold+=100;
 alert(p.name+' фармит '+ln+' лейн! +100 золота');
}
function eventRune(){
 var p=pickLane('mid',Math.random()<0.5?'r':'d');
 if(!p)return;
 p.stam=p.stamM;
 alert(p.name+' подобрал руну! Стамина восстановлена');
}
function eventRoshan(){
 var team=Math.random()<0.5?'r':'d';
 var p=pickLane('mid',team);
 if(!p)return;
 p.aegis=true;p.gold+=500;
 alert(p.name+' убил Рошана! +500 золота и Аегис');
}
function endMatch(){
 clearInterval(M.iv);M.on=false;
 var win=M.players[Math.floor(Math.random()*M.players.length)];
 alert('Бой окончен! Победитель: '+win.name);
 go('hub');
}
function pickLane(ln,team){
 var cands=[];
 for(var i=0;i<M.players.length;i++){var p=M.players[i];if(p.team===team&&p.alive)cands.push(p);}
 if(!cands.length)return null;
 return cands[Math.floor(Math.random()*cands.length)];
}
