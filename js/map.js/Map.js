// Карта: отрисовка POI, лагерей, рун, Рошана, аутпостов.
function rMap(){
 var m=el('map');m.innerHTML='';
 var c=document.createElement('div');c.className='mapc';c.style.cssText='position:relative;width:100%;height:100%';
 var poi=POI;
 for(var i=0;i<poi.towers.r.top.length;i++){var d=document.createElement('div');d.className='tw';d.style.cssText='position:absolute;left:'+poi.towers.r.top[i][0]+'%;top:'+poi.towers.r.top[i][1]+'%';c.appendChild(d);}
 for(var i=0;i<poi.towers.d.top.length;i++){var d=document.createElement('div');d.className='tw d';d.style.cssText='position:absolute;left:'+poi.towers.d.top[i][0]+'%;top:'+poi.towers.d.top[i][1]+'%';c.appendChild(d);}
 for(var i=0;i<poi.camps.r.length;i++){var d=document.createElement('div');d.className='cp';d.style.cssText='position:absolute;left:'+poi.camps.r[i][0]+'%;top:'+poi.camps.r[i][1]+'%';c.appendChild(d);}
 for(var i=0;i<poi.camps.d.length;i++){var d=document.createElement('div');d.className='cp d';d.style.cssText='position:absolute;left:'+poi.camps.d[i][0]+'%;top:'+poi.camps.d[i][1]+'%';c.appendChild(d);}
 var rn=document.createElement('div');rn.className='rn';rn.style.cssText='position:absolute;left:'+poi.runeTop[0]+'%;top:'+poi.runeTop[1]+'%';c.appendChild(rn);
 var rn2=document.createElement('div');rn2.className='rn';rn2.style.cssText='position:absolute;left:'+poi.runeBot[0]+'%;top:'+poi.runeBot[1]+'%';c.appendChild(rn2);
 var rs=document.createElement('div');rs.className='rs';rs.style.cssText='position:absolute;left:'+poi.roshan[0]+'%;top:'+poi.roshan[1]+'%';c.appendChild(rs);
 for(var i=0;i<poi.outposts.r.length;i++){var d=document.createElement('div');d.className='op';d.style.cssText='position:absolute;left:'+poi.outposts.r[i][0]+'%;top:'+poi.outposts.r[i][1]+'%';c.appendChild(d);}
 for(var i=0;i<poi.outposts.d.length;i++){var d=document.createElement('div');d.className='op d';d.style.cssText='position:absolute;left:'+poi.outposts.d[i][0]+'%;top:'+poi.outposts.d[i][1]+'%';c.appendChild(d);}
 m.appendChild(c);
}
