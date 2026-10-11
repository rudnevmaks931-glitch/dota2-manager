// Точка входа + аварийный бейдж.
window.onerror=function(m,s,l){var d=document.getElementById('dbg');if(d){d.style.display='block';d.textContent='ERR '+String(s||'').split('/').pop()+' L'+l+': '+m;}return false;};
(function(){
 try{
  if(typeof init!=='function'||typeof go!=='function'){
   var d=document.getElementById('dbg');if(d){d.style.display='block';d.textContent='MISSING MODULE: не все js/*.js загрузились';}
   return;
  }
  init();go('hub');
 }catch(e){var d2=document.getElementById('dbg');if(d2){d2.style.display='block';d2.textContent='BOOT ERR: '+e.message;}}
})();
