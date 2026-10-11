var cv,cx,W,H,ctxOK=false;
function initMap(){cv=document.getElementById('m-cv');var wr=document.getElementById('m-wrap');W=wr.clientWidth;H=wr.clientHeight;if(W<20||H<20){var tries=0;var rid=setInterval(function(){tries++;W=wr.clientWidth;H=wr.clientHeight;if((W>=20&&H>=20)||tries>20){clearInterval(rid);setup();}},100);return;}setup();}
function setup(){cv.width=W;cv.height=H;try{cx=cv.getContext('2d');ctxOK=!!cx;}catch(e){ctxOK=false;}if(!ctxOK){var hn=document.getElementById('m-hint');if(hn)hn.style.display='block';}}
function X(p){return p[0]/100*W;}
function Y(p){return p[1]/100*H;}
function drawMap(){
 if(!ctxOK||!cx||!G.M)return;if(W<20||H<20)return;
 var M=G.M,i;
 var gr=cx.createRadialGradient(W/2,H/2,0,W/2,H/2,W*0.7);gr.addColorStop(0,'#2e4a2e');gr.addColorStop(1,'#15241a');cx.fillStyle=gr;cx.fillRect(0,0,W,H);
 cx.strokeStyle='#1c4a78';cx.lineWidth=W*0.07;cx.lineCap='round';cx.beginPath();cx.moveTo(X([6,6]));cx.lineTo(X([94,94]));cx.stroke();
 cx.strokeStyle='#2a6aa0';cx.lineWidth=W*0.012;cx.beginPath();cx.moveTo(X([2,10]));cx.lineTo(X([90,98]));cx.stroke();cx.beginPath();cx.moveTo(X([10,2]));cx.lineTo(X([98,90]));cx.stroke();
 cx.strokeStyle='#5a4a2c';cx.lineWidth=W*0.045;cx.lineJoin='round';
 cx.beginPath();cx.moveTo(X(POI.rBase));cx.lineTo(X([8,8]));cx.lineTo(X(POI.dBase));cx.stroke();
 cx.beginPath();cx.moveTo(X(POI.rBase));cx.lineTo(X([92,92]));cx.lineTo(X(POI.dBase));cx.stroke();
 cx.beginPath();cx.moveTo(X(POI.rBase));cx.lineTo(X(POI.dBase));cx.stroke();
 cx.fillStyle='#0c1c0c';var cr=POI.camps.r,cd=POI.camps.d;for(i=0;i<cr.length;i++){cx.beginPath();cx.arc(X(cr[i]),Y(cr[i]),W*0.035,0,7);cx.fill();}for(i=0;i<cd.length;i++){cx.beginPath();cx.arc(X(cd[i]),Y(cd[i]),W*0.035,0,7);cx.fill();}
 var ts=W*0.026;for(i=0;i<M.towers.length;i++){var t=M.towers[i];if(!t.alive)continue;cx.fillStyle=t.team==='r'?'#3fae4a':'#e04338';cx.strokeStyle=t.team==='r'?'#8fd897':'#f2a09a';cx.lineWidth=2;cx.fillRect(X(t.pos)-ts/2,Y(t.pos)-ts/2,ts,ts);cx.strokeRect(X(t.pos)-ts/2,Y(t.pos)-ts/2,ts,ts);if(t.hp<100){cx.fillStyle='#000';cx.fillRect(X(t.pos)-ts/2,Y(t.pos)-ts/2-5,ts,3);cx.fillStyle='#ffd700';cx.fillRect(X(t.pos)-ts/2,Y(t.pos)-ts/2-5,ts*t.hp/100,3);}}
 var bs=W*0.02;for(i=0;i<M.bars.length;i++){var b=M.bars[i];if(!b.alive)continue;cx.fillStyle=b.team==='r'?'#2e7d32':'#c62828';cx.fillRect(X(b.pos)-bs/2,Y(b.pos)-bs/2,bs,bs);}
 var pairR=[[POI.rBase,'r'],[POI.dBase,'d']];for(i=0;i<pairR.length;i++){var c=pairR[i][0],tm=pairR[i][1];var sz=W*0.07;cx.fillStyle=tm==='r'?'#1b5e20':'#b71c1c';cx.strokeStyle=tm==='r'?'#4caf50':'#f44336';cx.lineWidth=3;cx.fillRect(X(c)-sz/2,Y(c)-sz/2,sz,sz);cx.strokeRect(X(c)-sz/2,Y(c)-sz/2,sz,sz);cx.fillStyle='#fff';cx.font=(sz*0.5)+'px Arial';cx.textAlign='center';cx.textBaseline='middle';cx.fillText('🏰',X(c),Y(c));}
 var opR=POI.outposts.r,opD=POI.outposts.d;for(i=0;i<opR.length;i++){cx.fillStyle=M.outposts.r[i]?'#4caf50':'rgba(255,255,255,.25)';cx.beginPath();cx.arc(X(opR[i]),Y(opR[i]),W*0.018,0,7);cx.fill();}for(i=0;i<opD.length;i++){cx.fillStyle=M.outposts.d[i]?'#f44336':'rgba(255,255,255,.25)';cx.beginPath();cx.arc(X(opD[i]),Y(opD[i]),W*0.018,0,7);cx.fill();}
 if(M.roshan.alive){var rs=W*0.05;cx.fillStyle='#4a1a6a';cx.strokeStyle='#9c27b0';cx.lineWidth=3;cx.beginPath();cx.arc(X(POI.roshan),Y(POI.roshan),rs,0,7);cx.fill();cx.stroke();cx.fillStyle='#fff';cx.font=(rs*0.8)+'px Arial';cx.textAlign='center';cx.textBaseline='middle';cx.fillText('🐉',X(POI.roshan),Y(POI.roshan));}
 var rpts=[['t',POI.runeTop],['b',POI.runeBot]];for(i=0;i<rpts.length;i++){if(M.runes[rpts[i][0]].alive){cx.fillStyle='#2196f3';cx.beginPath();cx.arc(X(rpts[i][1]),Y(rpts[i][1]),W*0.022,0,7);cx.fill();cx.fillStyle='#fff';cx.font=(W*0.024)+'px Arial';cx.textAlign='center';cx.textBaseline='middle';cx.fillText('💧',X(rpts[i][1]),Y(rpts[i][1]));}}
 var clines=['top','bot','mid'];for(i=0;i<clines.length;i++){var ln=clines[i];var rr=POI.lane['r'+ln],dd=POI.lane['d'+ln];cx.fillStyle='#7cb342';cx.beginPath();cx.arc(X(rr),Y(rr),W*0.012,0,7);cx.fill();cx.fillStyle='#ef5350';cx.beginPath();cx.arc(X(dd),Y(dd),W*0.012,0,7);cx.fill();}
 if(M.fight){cx.strokeStyle='rgba(255,80,80,0.6)';cx.lineWidth=3;cx.setLineDash([6,4]);cx.beginPath();cx.arc(X(M.fight.pos),Y(M.fight.pos),W*0.09,0,7);cx.stroke();cx.setLineDash([]);cx.fillStyle='#ff5252';cx.font='bold '+(W*0.03)+'px Courier New';cx.textAlign='center';cx.textBaseline='middle';cx.fillText('FIGHT',X(M.fight.pos),Y(M.fight.pos)-W*0.1);}
 if(M.push){var tg2=nearestEnemyTower({pos:M.push.side==='r'?POI.rBase:POI.dBase},M.push.side,M.push.line);if(tg2){cx.strokeStyle='rgba(255,215,0,0.6)';cx.lineWidth=2;cx.setLineDash([4,4]);cx.beginPath();cx.arc(X(tg2.pos),Y(tg2.pos),W*0.06,0,7);cx.stroke();cx.setLineDash([]);}}
 var ds=W*0.042;for(i=0;i<G.players.length;i++)drawDot(G.players[i],i+1,ds);for(i=0;i<M.dire.length;i++)drawDot(M.dire[i],i+1,ds);
 cx.fillStyle='rgba(255,255,255,0.35)';cx.font=(W*0.026)+'px Courier New';cx.textAlign='center';cx.textBaseline='alphabetic';
 cx.fillText('TOP LANE',W*0.5,H*0.05);cx.fillText('MID',W*0.5,H*0.5);cx.fillText('BOT LANE',W*0.5,H*0.97);
}
function drawDot(p,num,ds){var x=X(p.pos),y=Y(p.pos);
 if(!p.alive){cx.globalAlpha=0.25;cx.fillStyle='#555';cx.beginPath();cx.arc(x,y,ds,0,7);cx.fill();cx.strokeStyle='#999';cx.lineWidth=2;cx.stroke();cx.fillStyle='#fff';cx.font='bold '+(ds*0.6)+'px Courier New';cx.textAlign='center';cx.textBaseline='middle';cx.fillText('✝',x,y);cx.globalAlpha=1;return;}
 cx.beginPath();cx.arc(x,y,ds,0,7);cx.fillStyle=p.team==='r'?'#43a047':'#e53935';cx.fill();cx.strokeStyle=p._kind==='fight'?'#ffeb3b':'#fff';cx.lineWidth=p._kind==='fight'?3:2;cx.stroke();
 cx.fillStyle=p.team==='r'?'#000':'#fff';cx.font='bold '+(ds*0.7)+'px Courier New';cx.textAlign='center';cx.textBaseline='middle';cx.fillText(num,x,y);
 if(p.aegis){cx.strokeStyle='#ffd700';cx.lineWidth=2;cx.beginPath();cx.arc(x,y,ds+3,0,7);cx.stroke();}
 if(p._kind==='jungle'){cx.fillStyle='#8d6e63';cx.font=(ds*0.5)+'px Arial';cx.fillText('🌲',x,y-ds*1.3);}
 if(p._kind==='gank'){cx.fillStyle='#ff9800';cx.font='bold '+(ds*0.5)+'px Courier New';cx.fillText('GANK',x,y-ds*1.4);}
 if(p._kind==='buy'){cx.fillStyle='#2196f3';cx.font=(ds*0.5)+'px Arial';cx.fillText('🛒',x,y-ds*1.3);}
}
function render(){
 var M=G.M;if(!M)return;var mn=Math.floor(M.time/60),sc=M.time%60,i;
 el('m-tm',mn+':'+(sc<10?'0':'')+sc);el('m-ph',M.phase);el('m-sr',M.rk);el('m-sd',M.dk);el('m-gr',Math.floor(M.rg));el('m-gd',Math.floor(M.dg));
 var st=el('m-st');st.innerHTML='';
 for(i=0;i<G.players.length;i++){var p=G.players[i];var k=!p.alive?'dd':(p._kind==='fight'?'f':(p._kind==='gank'||p._kind==='jungle'||p._kind==='roshan'?'r':''));var lbl=!p.alive?('✝ '+Math.max(0,p.respawn)+'s'):(p._kind==='fight'?'Драка':p._kind==='gank'?'Ганк':p._kind==='jungle'?'Лес':p._kind==='roshan'?'Рошан':p._kind==='push'?'Пуш':p._kind==='buy'?'База':p._kind==='rune'?'Руна':p._kind==='defend'?'Деф':'Фарм');var d=document.createElement('div');d.className='sc2 '+k;var dot=document.createElement('div');dot.className='d';d.appendChild(dot);var sp=document.createElement('span');sp.textContent=(i+1)+' '+p.name+': '+lbl;d.appendChild(sp);st.appendChild(d);}
 var evHtml='';var lim=M.ev.length<22?M.ev.length:22;for(i=0;i<lim;i++){var e=M.ev[i];evHtml+='<div class="ev '+e.ty+'">['+e.s+'] '+e.t+'</div>';}el('m-ev').innerHTML=evHtml;
 var h='<div style="color:#4caf50;font-weight:bold;margin-bottom:5px">RADIANT · Kills '+M.rk+' · Gold '+Math.floor(M.rg)+'</div>';
 for(i=0;i<G.players.length;i++){var pp=G.players[i];h+='<div style="display:flex;justify-content:space-between;padding:2px 0;border-bottom:1px solid #161616;font-size:9px"><span style="color:#4caf50">'+pp.name+'</span><span style="color:#666">'+pp.lh+'/'+pp.dn+'</span><span style="color:#c9a84c">'+pp.kda.k+'/'+pp.kda.d+'/'+pp.kda.a+'</span><span>$'+Math.floor(pp.gold)+'</span><span style="color:#888">'+pp.inv.length+'/6</span></div>';}
 h+='<div style="color:#f44336;font-weight:bold;margin:5px 0">DIRE · Kills '+M.dk+' · Gold '+Math.floor(M.dg)+'</div>';
 for(i=0;i<M.dire.length;i++){var dd=M.dire[i];h+='<div style="display:flex;justify-content:space-between;padding:2px 0;border-bottom:1px solid #161616;font-size:9px"><span style="color:#f44336">'+dd.name+'</span><span style="color:#666">'+dd.lh+'/'+dd.dn+'</span><span style="color:#c9a84c">'+dd.kda.k+'/'+dd.kda.d+'/'+dd.kda.a+'</span><span>$'+Math.floor(dd.gold)+'</span></div>';}
 el('m-sb').innerHTML=h;
 try{drawMap();}catch(err){ctxOK=false;var hn=document.getElementById('m-hint');if(hn)hn.style.display='block';}
}
