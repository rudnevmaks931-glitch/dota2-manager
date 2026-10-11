// Навигация и все экраны вне боя.
function go(id){
 var ss=document.querySelectorAll('.screen');for(var i=0;i<ss.length;i++)ss[i].classList.remove('active');
 document.getElementById('s-'+id).classList.add('active');
 var nv=document.querySelectorAll('.nv');for(var i=0;i<nv.length;i++)nv[i].classList.remove('a');
 var m={hub:0,camp:1,modes:2,base:3,shop:4};if(m[id]!==undefined)nv[m[id]].classList.add('a');
 if(id==='hub')rHub();else if(id==='camp')rCamp();else if(id==='shop')rShop();
}
function rHub(){
 el('h-lvl',G.lvl);el('h-lvn',G.lvl+1);el('h-xp',G.xp);el('h-xpm',G.xpm);el('h-xpb',(G.xp/G.xpm*100)+'%');el('h-money',G.money);el('h-rank',G.rank);
 var ro=el('h-roster');ro.innerHTML='';
 for(var i=0;i<G.players.length;i++){(function(idx){var p=G.players[idx];var d=document.createElement('div');d.className='ps';d.onclick=function(){openP(idx);};
  var inner=document.createElement('div');inner.className='pa';inner.textContent=p.ic;d.appendChild(inner);
  var nm=document.createElement('div');nm.className='pn';nm.textContent=p.name;d.appendChild(nm);
  var rl=document.createElement('div');rl.className='pr';rl.textContent=p.rl.split(' ')[0];d.appendChild(rl);
  var lv=document.createElement('div');lv.style.cssText='font-size:8px;color:#888';lv.textContent='LVL '+p.lvl;d.appendChild(lv);
  var tr2=document.createElement('div');tr2.className='pt';tr2.textContent='T'+p.tier;d.appendChild(tr2);
  ro.appendChild(d);})(i);}
 var pairs=[['h-bench',4],['h-major',5]];
 for(var k=0;k<pairs.length;k++){var c=el(pairs[k][0]);c.innerHTML='';for(var j=0;j<pairs[k][1];j++){var d=document.createElement('div');d.className='ps e';d.textContent='+';c.appendChild(d);}}
}
function openP(i){
 G.sel=i;var p=G.players[i];
 el('p-name2',p.name);el('p-lvl2',p.lvl);el('p-av',p.ic);el('p-nm',p.name);el('p-rl',p.rl);el('p-tr','TIER '+p.tier);
 el('p-xp',p.xp);el('p-xpm',p.xpm);el('p-xpb',(p.xp/p.xpm*100)+'%');el('p-st',p.stam);el('p-stb',(p.stam/p.stamM*100)+'%');el('p-dr',p.dr);el('p-drm',p.drm);el('p-drb',(p.dr/p.drm*100)+'%');
 var sg=el('p-stats');sg.innerHTML='';var nm={lasthit:'LH',sense:'SENSE',teamfight:'CLUTCH',shotcall:'COMMS',support:'UTIL'};
 var ks=['lasthit','sense','teamfight','shotcall','support'];
 for(var a=0;a<ks.length;a++){var k=ks[a];var v=p.st[k];var d=document.createElement('div');d.className='sd';
  var sv=document.createElement('div');sv.className='sv '+(v>80?'h':v>60?'m':'l');sv.textContent=v;d.appendChild(sv);
  var sl=document.createElement('div');sl.className='sl';sl.textContent=nm[k];d.appendChild(sl);sg.appendChild(d);}
 var iv=el('p-inv');iv.innerHTML='';for(var s=0;s<6;s++){var d=document.createElement('div');d.className='iv'+(p.inv[s]?' f':'');d.textContent=p.inv[s]?(ITEM_IC[p.inv[s]]||'📦'):'';iv.appendChild(d);}
 var eq=el('p-eq');eq.innerHTML='';var sls=Object.keys(SLOT_N);
 for(var b=0;b<sls.length;b++){(function(sl){var it=p.eq[sl];var d=document.createElement('div');d.className='es';
  var ei=document.createElement('div');ei.className='ei';ei.textContent=it?it.ic:'❓';if(!it)ei.style.opacity='0.3';d.appendChild(ei);
  var box=document.createElement('div');box.style.flex='1';
  var en=document.createElement('div');en.className='en';en.textContent=it?it.n:'ПУСТО';if(!it)en.style.color='#666';box.appendChild(en);
  var et=document.createElement('div');et.className='et';et.textContent=SLOT_N[sl];box.appendChild(et);d.appendChild(box);eq.appendChild(d);})(sls[b]);}
 go('player');
}
function tr(k){var p=G.players[G.sel];if(p.dr<2){alert('Мало очков!');return;}if(G.money<200){alert('Мало денег!');return;}p.dr-=2;G.money-=200;p.st[k]+=2;p.xp+=50;lvChk(p);openP(G.sel);}
function trPerk(){var p=G.players[G.sel];if(p.dr<2){alert('Мало очков!');return;}if(G.money<1000){alert('Мало денег!');return;}p.dr-=2;G.money-=1000;var ks=['lasthit','sense','teamfight','shotcall','support'];var k=ks[Math.floor(Math.random()*5)];p.st[k]+=4;p.xp+=100;lvChk(p);alert('PERK +4 к '+k);openP(G.sel);}
function lvChk(p){if(p.xp>=p.xpm){p.lvl++;p.xp=0;p.xpm=Math.floor(p.xpm*1.5);p.drm+=2;p.dr=p.drm;alert(p.name+' -> LVL '+p.lvl);}}
function rst(){var p=G.players[G.sel];if(G.money<900){alert('Мало денег!');return;}if(!confirm('Сброс за $900?'))return;G.money-=900;p.st={lasthit:p.base.lasthit,sense:p.base.sense,teamfight:p.base.teamfight,shotcall:p.base.shotcall,support:p.base.support};p.dr=p.drm;openP(G.sel);}
function rel(){var p=G.players[G.sel];if(!confirm('Отпустить '+p.name+' за $86889?'))return;G.money+=86889;G.players.splice(G.sel,1);go('hub');}
function rCamp(){
 el('c-money',G.money);el('c-cnt',G.players.length);el('c-all',G.players.length);el('c-free',G.players.length);
 var c=el('c-list');c.innerHTML='';var sn={lasthit:'AIM',sense:'SENSE',teamfight:'CLT',shotcall:'COM',support:'UTL'};
 for(var i=0;i<G.players.length;i++){(function(idx){var p=G.players[idx];var d=document.createElement('div');d.className='card';d.style.cursor='pointer';d.onclick=function(){openP(idx);};
  var row=document.createElement('div');row.style.cssText='display:flex;gap:10px;align-items:center';
  var av=document.createElement('div');av.style.fontSize='34px';av.textContent=p.ic;row.appendChild(av);
  var col=document.createElement('div');col.style.flex='1';
  var top=document.createElement('div');top.style.cssText='display:flex;justify-content:space-between';
  var l=document.createElement('div');var n1=document.createElement('div');n1.style.cssText='color:#fff;font-weight:bold;font-size:13px';n1.textContent=p.name;l.appendChild(n1);var n2=document.createElement('div');n2.style.cssText='color:#c9a84c;font-size:9px';n2.textContent=p.rl;l.appendChild(n2);top.appendChild(l);
  var r=document.createElement('div');r.style.textAlign='right';var n3=document.createElement('div');n3.style.cssText='color:#c9a84c;font-size:11px';n3.textContent='LVL '+p.lvl;r.appendChild(n3);var n4=document.createElement('div');n4.className='pt';n4.textContent='T'+p.tier;r.appendChild(n4);top.appendChild(r);col.appendChild(top);
  var sg=document.createElement('div');sg.className='sg';sg.style.cssText='padding:0;margin-top:8px';var ks=['lasthit','sense','teamfight','shotcall','support'];
  for(var a=0;a<ks.length;a++){var k=ks[a];var sd=document.createElement('div');sd.className='sd';var sv=document.createElement('div');sv.className='sv '+(p.st[k]>80?'h':p.st[k]>60?'m':'l');sv.textContent=p.st[k];sd.appendChild(sv);var sl=document.createElement('div');sl.className='sl';sl.textContent=sn[k];sd.appendChild(sl);sg.appendChild(sd);}col.appendChild(sg);
  var dr=document.createElement('div');dr.style.cssText='display:flex;justify-content:space-between;font-size:9px;color:#888;margin-top:6px';dr.innerHTML='<span>Очки</span><span>'+p.dr+'/'+p.drm+'</span>';col.appendChild(dr);
  var pb=document.createElement('div');pb.className='pb';var pf=document.createElement('div');pf.className='pf';pf.style.width=(p.dr/p.drm*100)+'%';pb.appendChild(pf);col.appendChild(pb);
  row.appendChild(col);d.appendChild(row);c.appendChild(d);})(i);}
}
function rShop(){
 el('sh-money',G.money);var g=el('sh-items');g.innerHTML='';
 for(var i=0;i<EQ.length;i++){(function(it){var d=document.createElement('div');d.className='ic '+it.r;d.onclick=function(){buyEq(it.id);};
  var ii=document.createElement('div');ii.className='ii';ii.textContent=it.ic;d.appendChild(ii);
  var in2=document.createElement('div');in2.className='in2';in2.textContent=it.n;d.appendChild(in2);
  var ib=document.createElement('div');ib.className='ib';var bv=[];var bk=Object.keys(it.b);for(var x=0;x<bk.length;x++)bv.push(it.b[bk[x]]);ib.textContent='+'+bv.join(' +');d.appendChild(ib);
  var ip=document.createElement('div');ip.className='ip';ip.textContent='$'+it.p;d.appendChild(ip);g.appendChild(d);})(EQ[i]);}
 var b=el('sh-boost');b.innerHTML='';
 for(var j=0;j<BOOST.length;j++){var it=BOOST[j];var d=document.createElement('div');d.className='ic ep';
  var ii=document.createElement('div');ii.className='ii';ii.textContent=it.ic;d.appendChild(ii);
  var in2=document.createElement('div');in2.className='in2';in2.textContent=it.n;d.appendChild(in2);
  var ib=document.createElement('div');ib.className='ib';ib.textContent=it.e;d.appendChild(ib);
  var ip=document.createElement('div');ip.className='ip';ip.textContent='$'+it.p+' · '+it.d;d.appendChild(ip);b.appendChild(d);}
}
function shTab(t,e){var ts=document.querySelectorAll('#s-shop .tb');for(var i=0;i<ts.length;i++)ts[i].classList.remove('a');e.classList.add('a');el('sh-eq').style.display=t==='eq'?'block':'none';el('sh-bo').style.display=t==='bo'?'block':'none';}
function bsTab(t,e){var ts=document.querySelectorAll('#s-base .tb');for(var i=0;i<ts.length;i++)ts[i].classList.remove('a');e.classList.add('a');var ids=['re','op','ne'];for(var j=0;j<ids.length;j++)el('b-'+ids[j]).style.display=ids[j]===t?'block':'none';}
function buyEq(id){var it=null;for(var i=0;i<EQ.length;i++)if(EQ[i].id===id)it=EQ[i];if(!it)return;if(G.money<it.p){alert('Мало денег!');return;}
 var mo=el('modal'),mc=el('moc');mc.innerHTML='';
 var h=document.createElement('h3');h.style.cssText='color:#c9a84c;margin-bottom:12px';h.textContent='Выберите игрока: '+it.n;mc.appendChild(h);
 for(var a=0;a<G.players.length;a++){(function(idx){var p=G.players[idx];var d=document.createElement('div');d.className='card';d.style.cssText='cursor:pointer;margin:6px 0';d.onclick=function(){asEq(idx,id);};
  var row=document.createElement('div');row.style.cssText='display:flex;align-items:center;gap:10px';
  var av=document.createElement('div');av.style.fontSize='30px';av.textContent=p.ic;row.appendChild(av);
  var col=document.createElement('div');var n1=document.createElement('div');n1.style.cssText='color:#fff;font-weight:bold';n1.textContent=p.name;col.appendChild(n1);var n2=document.createElement('div');n2.style.cssText='color:#c9a84c;font-size:9px';n2.textContent=p.rl;col.appendChild(n2);row.appendChild(col);d.appendChild(row);mc.appendChild(d);})(a);}
 var cn=document.createElement('button');cn.className='btn sec';cn.style.marginTop='8px';cn.textContent='Отмена';cn.onclick=clMo;mc.appendChild(cn);mo.classList.add('a');
}
function asEq(i,id){var it=null;for(var x=0;x<EQ.length;x++)if(EQ[x].id===id)it=EQ[x];var p=G.players[i];if(G.money<it.p){clMo();alert('Мало денег!');return;}G.money-=it.p;p.eq[it.s]=it;var bk=Object.keys(it.b);for(var k=0;k<bk.length;k++){var kk=bk[k];if(kk!=='stam')p.st[kk]+=it.b[kk];else p.stamM+=it.b[kk];}clMo();alert(it.n+' -> '+p.name);rShop();}
function clMo(){el('modal').classList.remove('a');}
