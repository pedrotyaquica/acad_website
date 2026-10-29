(function(){
  var r=document.documentElement;
  try{var t=sessionStorage.getItem('tema');if(t==='light'||t==='dark')r.setAttribute('data-theme',t);else r.setAttribute('data-theme','dark');}catch(e){r.setAttribute('data-theme','dark');}
  var btn=document.getElementById('theme-btn');
  function paint(){var d=r.getAttribute('data-theme')==='dark',s=d?'Mudar para o tema claro':'Mudar para o tema escuro';btn.title=s;btn.setAttribute('aria-label',s);}
  btn.addEventListener('click',function(){var n=r.getAttribute('data-theme')==='dark'?'light':'dark';r.setAttribute('data-theme',n);try{sessionStorage.setItem('tema',n);}catch(e){}paint();});
  paint();
  var P=window.PASTA||'', fotos=window.FOTOS||[], grid=document.getElementById('grid');
  if(!fotos.length){grid.outerHTML='<p class="vazio">As fotos deste embarque serão publicadas em breve.</p>';return;}
  var dlg=document.getElementById('lightbox'), img=dlg.querySelector('img'), cap=dlg.querySelector('p');
  fotos.forEach(function(f){
    var li=document.createElement('li'), b=document.createElement('button');
    b.type='button';
    b.innerHTML='<img loading="lazy" alt="'+(f.alt||f.legenda||'')+'" src="'+P+f.mini+'"><span class="cap">'+(f.legenda||'')+'</span>';
    b.addEventListener('click',function(){img.src=P+f.grande;img.alt=f.alt||f.legenda||'';cap.textContent=f.legenda||'';dlg.showModal();});
    li.appendChild(b);grid.appendChild(li);
  });
  dlg.querySelector('.fechar').addEventListener('click',function(){dlg.close();});
  dlg.addEventListener('click',function(e){if(e.target===dlg)dlg.close();});
})();
