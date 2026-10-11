function initMap(){
 var wrap=document.getElementById('m-wrap');
 src="https://raw.githubusercontent.com/rudnevmaks931-glitch/dota2-manager/refs/heads/main/2d38ff45418b1acb8e06c72f9c8a9b67.jpg"
 wrap.innerHTML='<img src="ВСТАВЬ_СЮДА_СВОЮ_ССЫЛКУ" style="width:100%;height:100%;object-fit:contain;background:#16241a" id="game-map"><div id="hero-layer" style="position:absolute;top:0;left:0;width:100%;height:100%"></div>';
 var hint=document.getElementById('m-hint');if(hint)hint.style.display='none';
}
function drawMap(){}
function drawDot(p,num,ds){
 var layer=document.getElementById('hero-layer');
 if(!layer)return;
 var x=p.pos[0]+'%',y=p.pos[1]+'%';
 var dot=document.createElement('div');
 dot.style.cssText='position:absolute;left:'+x+';top:'+y+';transform:translate(-50%,-50%);width:24px;height:24px;border-radius:50%;background:'+(p.team==='r'?'#43a047':'#e53935')+';border:2px solid '+(p._kind==='fight'?'#ffeb3b':'#fff')+';display:flex;align-items:center;justify-content:center;color:'+(p.team==='r'?'#000':'#fff')+';font-weight:bold;font-size:12px;z-index:'+(p.alive?10:1);
 dot.textContent=p.alive?num:'✝';
 if(!p.alive)dot.style.opacity='0.4';
 if(p.aegis){dot.style.boxShadow='0 0 0 2px #ffd700';}
 layer.appendChild(dot);
}
function render(){
 var M=G.M;if(!M)return;var mn=Math.floor(M.time/60),sc=M.time%60;
 el('m-tm',mn+':'+(sc<10?'0':'')+sc);el('m-ph',M.phase);el('m-sr',M.rk);el('m-sd',M.dk);el('m-gr',Math.floor(M.rg));el('m-gd',Math.floor(M.dg));
 var layer=document.getElementById('hero-layer');if(layer)layer.innerHTML='';
 for(var i=0;i<G.players.length;i++)drawDot(G.players[i],i+1,24);
 for(var i=0;i<M.dire.length;i++)drawDot(M.dire[i],i+1,24);
 var st=el('m-st');st.innerHTML='';
 for(var i=0;i<G.players.length;i++){var p=G.players[i];var k=!p.alive?'dd':(p._kind==='fight'?'f':(p._kind==='gank'||p._kind==='jungle'||p._kind==='roshan'?'r':''));var lbl=!p.alive?('✝ '+Math.max(0,p.respawn)+'s'):(p._kind==='fight'?'Драка':p._kind==='gank'?'Ганк':p._kind==='jungle'?'Лес':p._kind==='roshan'?'Рошан':p._kind==='push'?'Пуш':p._kind==='buy'?'База':p._kind==='rune'?'Руна':p._kind==='defend'?'Деф':'Фарм');var d=document.createElement('div');d.className='sc2 '+k;var dot2=document.createElement('div');dot2.className='d';d.appendChild(dot2);var sp=document.createElement('span');sp.textContent=(i+1)+' '+p.name+': '+lbl;d.appendChild(sp);st.appendChild(d);}
 var evHtml='';var lim=M.ev.length<22?M.ev.length:22;for(var i=0;i<lim;i++){var e=M.ev[i];evHtml+='<div class="ev '+e.ty+'">['+e.s+'] '+e.t+'</div>';}el('m-ev').innerHTML=evHtml;
 var h='<div style="color:#4caf50;font-weight:bold;margin-bottom:5px">RADIANT · Kills '+M.rk+' · Gold '+Math.floor(M.rg)+'</div>';
 for(var i=0;i<G.players.length;i++){var pp=G.players[i];h+='<div style="display:flex;justify-content:space-between;padding:2px 0;border-bottom:1px solid #161616;font-size:9px"><span style="color:#4caf50">'+pp.name+'</span><span style="color:#666">'+pp.lh+'/'+pp.dn+'</span><span style="color:#c9a84c">'+pp.kda.k+'/'+pp.kda.d+'/'+pp.kda.a+'</span><span>$'+Math.floor(pp.gold)+'</span><span style="color:#888">'+pp.inv.length+'/6</span></div>';}
 h+='<div style="color:#f44336;font-weight:bold;margin:5px 0">DIRE · Kills '+M.dk+' · Gold '+Math.floor(M.dg)+'</div>';
 for(var i=0;i<M.dire.length;i++){var dd=M.dire[i];h+='<div style="display:flex;justify-content:space-between;padding:2px 0;border-bottom:1px solid #161616;font-size:9px"><span style="color:#f44336">'+dd.name+'</span><span style="color:#666">'+dd.lh+'/'+dd.dn+'</span><span style="color:#c9a84c">'+dd.kda.k+'/'+dd.kda.d+'/'+dd.kda.a+'</span><span>$'+Math.floor(dd.gold)+'</span></div>';}
 el('m-sb').innerHTML=h;
}
