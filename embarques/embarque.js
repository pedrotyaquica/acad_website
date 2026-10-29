(function(){
  var r=document.documentElement;
  try{var t=sessionStorage.getItem('tema');if(t==='light'||t==='dark')r.setAttribute('data-theme',t);else r.setAttribute('data-theme','dark');}catch(e){r.setAttribute('data-theme','dark');}
  var btn=document.getElementById('theme-btn');
  function paint(){var d=r.getAttribute('data-theme')==='dark',s=d?'Mudar para o tema claro':'Mudar para o tema escuro';btn.title=s;btn.setAttribute('aria-label',s);}
  btn.addEventListener('click',function(){var n=r.getAttribute('data-theme')==='dark'?'light':'dark';r.setAttribute('data-theme',n);try{sessionStorage.setItem('tema',n);}catch(e){}paint();});
  paint();
  (function(){
    var up=document.createElement('button');up.type='button';up.className='topo';up.setAttribute('aria-label','Voltar ao topo');
    up.innerHTML='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 13V3M3 7.5 8 3l5 4.5"/></svg>Voltar ao topo';
    document.body.appendChild(up);
    function vis(){up.classList.toggle('on',window.scrollY>400);}
    window.addEventListener('scroll',vis,{passive:true});vis();
    up.addEventListener('click',function(){var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;window.scrollTo({top:0,behavior:rm?'auto':'smooth'});});
  })();
  var P=window.PASTA||'', fotos=window.FOTOS||[], grid=document.getElementById('grid');
  if(!fotos.length){grid.outerHTML='<p class="vazio">As fotos deste embarque serão publicadas em breve.</p>';return;}
  var dlg=document.getElementById('lightbox'), img=dlg.querySelector('img'), cap=dlg.querySelector('p'), cur=0;
  var prev=document.createElement('button'), next=document.createElement('button'), count=document.createElement('span');
  prev.type=next.type='button'; prev.className='nav prev'; next.className='nav next'; count.className='contador'; count.setAttribute('aria-live','polite');
  prev.setAttribute('aria-label','Foto anterior'); next.setAttribute('aria-label','Próxima foto');
  prev.innerHTML='&#10094;'; next.innerHTML='&#10095;';
  dlg.appendChild(prev); dlg.appendChild(next); dlg.appendChild(count);
  function pre(i){var n=fotos[(i+fotos.length)%fotos.length]; (new Image()).src=P+n.grande;}
  function show(i){
    cur=(i+fotos.length)%fotos.length; var f=fotos[cur];
    img.src=P+f.grande; img.alt=f.alt||f.legenda||''; cap.textContent=f.legenda||''; cap.hidden=!f.legenda;
    count.textContent=(cur+1)+' / '+fotos.length; pre(cur+1); pre(cur-1);
  }
  fotos.forEach(function(f,i){
    var li=document.createElement('li'), b=document.createElement('button');
    b.type='button';
    b.innerHTML='<img loading="lazy" alt="'+(f.alt||f.legenda||'')+'" src="'+P+f.mini+'">'+(f.legenda?'<span class="cap">'+f.legenda+'</span>':'');
    b.addEventListener('click',function(){show(i);dlg.showModal();});
    li.appendChild(b);grid.appendChild(li);
  });
  prev.addEventListener('click',function(e){e.stopPropagation();show(cur-1);});
  next.addEventListener('click',function(e){e.stopPropagation();show(cur+1);});
  dlg.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){e.preventDefault();show(cur+1);}else if(e.key==='ArrowLeft'){e.preventDefault();show(cur-1);}});
  var x0=null;
  dlg.addEventListener('touchstart',function(e){x0=e.changedTouches[0].clientX;},{passive:true});
  dlg.addEventListener('touchend',function(e){if(x0===null)return;var d=e.changedTouches[0].clientX-x0;x0=null;if(Math.abs(d)>50)show(d<0?cur+1:cur-1);},{passive:true});
  dlg.querySelector('.fechar').addEventListener('click',function(){dlg.close();});
  dlg.addEventListener('click',function(e){if(e.target===dlg)dlg.close();});
})();
