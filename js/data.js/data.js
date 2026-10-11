// Константы игры. Не вызывает функций, не трогает DOM.
var RN=['Yatoro','Toronto','Collapse','Mira','Miposhka','Arteezy','SumaiL','N0tail','Ceb','Ana','Miracle','KuroKy','Puppey','YapzOr','Nisha','zai','Boxi','Cr1t','Rhasta','33'];
var DN=['Vex','Nyx','Ryl','Kao','Mip','Lgd','Egs','Nvg','Fnc','Tbr','Gmn','Bbm','Qst','9pd','Ast','Vpc','Liq','Ogs','Spirit','Blaze'];
var BUILD={
 carry:['Battle Fury','Manta Style','Black King Bar','Daedalus','Butterfly','Refresher Orb'],
 mid:['Power Treads','Blink Dagger','Black King Bar',"Aghanim's Scepter",'Scythe of Vyse','Refresher Orb'],
 offlane:['Phase Boots','Blink Dagger','Black King Bar','Assault Cuirass','Heart of Tarrasque','Overwhelming Blink'],
 support4:['Tranquil Boots','Blink Dagger','Glimmer Cape','Force Staff',"Aghanim's Scepter",'Abyssal Blade'],
 support5:['Arcane Boots','Glimmer Cape','Force Staff','Urn of Shadow',"Aghanim's Scepter",'Guardian Greaves']
};
var ITEM_GOLD={'Battle Fury':4100,'Manta Style':4600,'Black King Bar':4050,'Daedalus':5150,'Butterfly':5000,'Refresher Orb':5000,'Power Treads':1400,'Blink Dagger':2250,"Aghanim's Scepter":4200,'Scythe of Vyse':5650,'Phase Boots':1500,'Assault Cuirass':5075,'Heart of Tarrasque':5000,'Overwhelming Blink':3250,'Tranquil Boots':925,'Glimmer Cape':1950,'Force Staff':2200,'Urn of Shadow':875,'Abyssal Blade':6275,'Arcane Boots':1175,'Guardian Greaves':4950};
var ROLE_NAME={carry:'CARRY (Pos 1)',mid:'MID (Pos 2)',offlane:'OFFLANE (Pos 3)',support4:'SOFT SUP (Pos 4)',support5:'HARD SUP (Pos 5)'};
var ROLE_IC={carry:'🗡️',mid:'🔮',offlane:'🪓',support4:'🎭',support5:'💚'};
var ITEM_IC={'Battle Fury':'🌊','Manta Style':'🪞','Black King Bar':'🛡️','Daedalus':'🎯','Butterfly':'🦋','Refresher Orb':'🔄','Power Treads':'👟','Blink Dagger':'⚡',"Aghanim's Scepter":'📘','Scythe of Vyse':'🔱','Phase Boots':'🥾','Assault Cuirass':'🦺','Heart of Tarrasque':'❤️','Overwhelming Blink':'💥','Tranquil Boots':'🥿','Glimmer Cape':'✨','Force Staff':'💨','Urn of Shadow':'⚱️','Abyssal Blade':'🗡️','Arcane Boots':'🔮','Guardian Greaves':'👢'};
var EQ=[
 {id:'m1',n:'Игровая мышь',ic:'🖱️',p:500,r:'ra',b:{lasthit:2},s:'mouse'},
 {id:'m2',n:'Про мышь',ic:'🖱️',p:1500,r:'ep',b:{lasthit:3,sense:1},s:'mouse'},
 {id:'k1',n:'Мех. клава',ic:'⌨️',p:800,r:'ra',b:{teamfight:2},s:'kbd'},
 {id:'h1',n:'Наушники',ic:'🎧',p:600,r:'ra',b:{shotcall:2},s:'hs'},
 {id:'h2',n:'Про наушники',ic:'🎧',p:2000,r:'ep',b:{shotcall:3,sense:1},s:'hs'},
 {id:'mo1',n:'144Hz монитор',ic:'🖥️',p:1200,r:'ep',b:{lasthit:2,teamfight:1},s:'mon'},
 {id:'ch1',n:'Игровое кресло',ic:'🪑',p:1000,r:'ra',b:{sense:2},s:'chr'},
 {id:'d1',n:'Игровой стол',ic:'🟫',p:700,r:'ra',b:{support:2},s:'dsk'},
 {id:'g1',n:'Перчатки',ic:'🧤',p:1500,r:'ep',b:{stam:10},s:'glv'},
 {id:'f1',n:'Полный сетап',ic:'⭐',p:5000,r:'le',b:{lasthit:3,sense:2,teamfight:2,shotcall:2,support:2},s:'full'}
];
var SLOT_N={mouse:'МЫШЬ',kbd:'КЛАВИАТУРА',hs:'НАУШНИКИ',mon:'МОНИТОР',chr:'КРЕСЛО',dsk:'СТОЛ',glv:'ПЕРЧАТКИ'};
var BOOST=[{n:'Energy Drink',ic:'🥤',p:500,d:'7 дней',e:'6x реген выносливости'},{n:'XP Boost',ic:'📈',p:1000,d:'24ч',e:'+50% опыт'},{n:'Money Boost',ic:'💰',p:1000,d:'24ч',e:'+50% деньги'}];
// POI карты Доты (в % от размера карты). Radiant база низ-лево, Dire верх-право.
var POI={
 rBase:[8,92], dBase:[92,8], rFount:[4,96], dFount:[96,4],
 rThrone:[6,94], dThrone:[94,6],
 rBarMelee:[[14,92],[20,92]], rBarRange:[[8,86],[8,80]],
 dBarMelee:[[86,8],[80,8]],   dBarRange:[[92,14],[92,20]],
 towers:{
  r:{top:[[8,72],[8,52],[8,30]], bot:[[28,92],[50,92],[72,92]], mid:[[24,76],[38,62],[46,54]]},
  d:{top:[[30,8],[50,8],[70,8]], bot:[[92,72],[92,50],[92,30]], mid:[[76,24],[62,38],[54,46]]}
 },
 runeTop:[38,38], runeBot:[62,62], roshan:[60,40],
 outposts:{ r:[[70,80],[26,66]], d:[[30,20],[80,30]] },
 camps:{
  r:[[30,70],[20,80],[40,82],[15,60],[25,55],[35,90],[44,78],[12,72]],
  d:[[70,30],[80,20],[60,18],[85,40],[75,45],[65,10],[56,22],[88,28]]
 },
 lane:{ rtop:[12,46], rbot:[52,88], rmid:[40,60], dtop:[54,12], dbot:[88,46], dmid:[60,40] }
};
var TIMING={creepWave:30,siegeStart:300,runeFirst:120,runeInterval:120,runeDoubleAt:600,outpostSpawn:600,roshanMin:480,roshanMax:660,aegisDur:300};
