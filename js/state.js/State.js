// Глобальное состояние + утилиты + создание героев.
var G={lvl:1,xp:0,xpm:100,money:5000,rank:1200,wins:0,losses:0,players:[],sel:null,speed:2,iv:null,M:null};

function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;}return a;}
function uniq(arr,n){return shuffle(arr).slice(0,n);}
function el(id,v){var e=document.getElementById(id);if(v!==undefined)e.textContent=v;return e;}
function dist(a,b){var dx=a[0]-b[0],dy=a[1]-b[1];return Math.sqrt(dx*dx+dy*dy);}
function clamp(v,a,b){return v<a?a:(v>b?b:v);}
function jit(p,r){return [clamp(p[0]+(Math.random()-0.5)*r,2,98),clamp(p[1]+(Math.random()-0.5)*r,2,98)];}
function mirror(team){return team==='r'?'d':'r';}
function laneKey(role,team){
 if(role==='mid')return 'mid';
 if(role==='carry')return team==='r'?'bot':'top';
 if(role==='offlane')return team==='r'?'top':'bot';
 if(role==='support4')return team==='r'?'top':'bot';
 return team==='r'?'bot':'top';
}
function laneHome(role,team){return POI.lane[team+laneKey(role,team)].slice();}

function mkHero(i,name,role,team){
 var b={lasthit:65+Math.floor(Math.random()*25),sense:65+Math.floor(Math.random()*25),teamfight:65+Math.floor(Math.random()*25),shotcall:65+Math.floor(Math.random()*25),support:65+Math.floor(Math.random()*25)};
 return {id:i,name:name,role:role,rl:ROLE_NAME[role],ic:ROLE_IC[role],team:team,
  lvl:10+Math.floor(Math.random()*8),xp:Math.floor(Math.random()*800),xpm:2000,tier:8,
  st:{lasthit:b.lasthit,sense:b.sense,teamfight:b.teamfight,shotcall:b.shotcall,support:b.support},
  base:{lasthit:b.lasthit,sense:b.sense,teamfight:b.teamfight,shotcall:b.shotcall,support:b.support},
  eq:{},inv:[],lh:0,dn:0,gold:625,stam:80,stamM:100,dr:14,drm:14,
  alive:true,respawn:0,pos:laneHome(role,team),target:null,kda:{k:0,d:0,a:0},streak:0,buildIdx:0,_kind:'lane',vision:Math.random()<0.45,aegis:false};
}
function init(){
 var roles=['carry','mid','offlane','support4','support5'];
 var names=uniq(RN,5);
 G.players=[];for(var i=0;i<5;i++)G.players.push(mkHero(i,names[i],roles[i],'r'));
                                    }
