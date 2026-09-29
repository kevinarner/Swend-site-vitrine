// Swend — site vitrine : cartes retournables, navigation, copie de l’adresse.
// Logique reprise de maquette-source.html (version validée du 29/09/2026).
(function(){
      const root=document.getElementById('swend');
      root.querySelectorAll('.sw-flip').forEach(flip=>{
      const front=flip.querySelector('.sw-front');
      const back=flip.querySelector('.sw-back');
      let flipped=false;
      let angle=0,target=0,frame=0,lastTime=0,holding=false,holdTimer=0,suppressClick=false;
      const inner=flip.querySelector('.sw-flip-inner');
      inner.style.transition='none';
      function describeFace(value){
        flipped=value;
        flip.setAttribute('aria-pressed',String(value));
        flip.setAttribute('aria-label',value?(flip.dataset.frontLabel||'Revenir à l’invitation Swend'):(flip.dataset.backLabel||'Retourner la carte pour découvrir la définition de Swend'));
        front.setAttribute('aria-hidden',String(value));
        back.setAttribute('aria-hidden',String(!value));
      }
      function draw(){
        inner.style.transform='rotateY('+angle+'deg)';
        describeFace(Math.floor((angle+90)/180)%2===1);
      }
      function tick(time){
        const dt=lastTime?Math.min(time-lastTime,40):16;
        lastTime=time;
        if(holding){angle+=dt*.33;}else{
          angle+=(target-angle)*(1-Math.exp(-dt/115));
          if(Math.abs(target-angle)<.15)angle=target;
        }
        draw();
        if(holding||angle!==target)frame=requestAnimationFrame(tick);
        else{frame=0;lastTime=0;}
      }
      function run(){if(!frame)frame=requestAnimationFrame(tick);}
      function advance(){
        target=Math.max(target,Math.floor(angle/180)*180)+180;
        if(reducedMotion.matches){angle=target;draw();}else run();
      }
      function stopHold(){
        clearTimeout(holdTimer);
        if(!holding)return;
        holding=false;
        target=Math.ceil((angle+.01)/180)*180;
        run();
      }
      function resetFace(){
        clearTimeout(holdTimer);holding=false;
        target=Math.ceil(angle/360)*360;
        if(reducedMotion.matches){angle=target;draw();}else run();
      }
      const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
      function resetTilt(){
        flip.classList.remove('sw-hovering');
        flip.style.removeProperty('--sw-tilt-x');
        flip.style.removeProperty('--sw-tilt-y');
      }
      flip.addEventListener('pointerenter',event=>{
        if(event.pointerType==='mouse'&&!reducedMotion.matches)flip.classList.add('sw-hovering');
      });
      flip.addEventListener('pointermove',event=>{
        if(event.pointerType!=='mouse'||reducedMotion.matches)return;
        const rect=flip.getBoundingClientRect();
        const x=Math.max(-.5,Math.min(.5,(event.clientX-rect.left)/rect.width-.5));
        const y=Math.max(-.5,Math.min(.5,(event.clientY-rect.top)/rect.height-.5));
        flip.style.setProperty('--sw-tilt-x',(-y*7).toFixed(2)+'deg');
        flip.style.setProperty('--sw-tilt-y',(x*7).toFixed(2)+'deg');
      });
      flip.addEventListener('pointerleave',resetTilt);
      reducedMotion.addEventListener('change',()=>{resetTilt();stopHold();if(reducedMotion.matches){angle=target;draw();}});
      flip.addEventListener('pointerdown',event=>{
        if(event.button!==0||!event.isPrimary)return;
        suppressClick=false;
        if(reducedMotion.matches)return;
        flip.setPointerCapture(event.pointerId);
        holdTimer=setTimeout(()=>{holding=true;suppressClick=true;run();},280);
      });
      flip.addEventListener('pointerup',stopHold);
      flip.addEventListener('pointercancel',stopHold);
      flip.addEventListener('lostpointercapture',stopHold);
      flip.addEventListener('contextmenu',event=>event.preventDefault());
      flip.addEventListener('dragstart',event=>event.preventDefault());
      flip.addEventListener('click',()=>{
        if(suppressClick){suppressClick=false;return;}
        advance();
      });
      flip.addEventListener('keydown',event=>{if(event.key==='Escape')resetFace();});
      flip.addEventListener('blur',()=>{resetTilt();stopHold();});
      flip.addEventListener('sw-reset',()=>{resetFace();resetTilt();});
      document.addEventListener('visibilitychange',()=>{if(document.hidden)stopHold();});
      draw();
      });
      const pages=['concept','restaurants','contact'];
      function showPage(page){
        if(page==='restaurants')root.querySelector('.sw-restaurant-flip').dispatchEvent(new Event('sw-reset'));
        root.querySelectorAll('[data-content]').forEach(panel=>{panel.hidden=panel.dataset.content!==page;});
        root.querySelectorAll('nav [data-page]').forEach(item=>{if(item.dataset.page===page){item.setAttribute('aria-current','page');}else{item.removeAttribute('aria-current');}});
      }
      function pageFromHash(){const page=location.hash.slice(1);return pages.includes(page)?page:'concept';}
      root.querySelectorAll('[data-page]').forEach(button=>button.addEventListener('click',()=>{
        const page=button.dataset.page;
        showPage(page);
        const url=page==='concept'?location.pathname+location.search:'#'+page;
        if(pageFromHash()!==page)history.pushState(null,'',url);
        root.scrollIntoView({block:'start',behavior:'auto'});
      }));
      window.addEventListener('popstate',()=>{showPage(pageFromHash());root.scrollIntoView({block:'start',behavior:'auto'});});
      if(pageFromHash()!=='concept')showPage(pageFromHash());

      const copyButton=root.querySelector('.sw-copy');
      const copyStatus=root.querySelector('.sw-copy-status');
      copyButton.addEventListener('click',async()=>{
        try{
          await navigator.clipboard.writeText('contact@swend.fr');
          copyStatus.textContent='Adresse copiée !';
        }catch(error){
          const range=document.createRange();
          range.selectNodeContents(root.querySelector('.sw-contact-address'));
          const selection=window.getSelection();
          selection.removeAllRanges();
          selection.addRange(range);
          copyStatus.textContent='Copiez l’adresse sélectionnée, puis collez-la dans votre messagerie.';
        }
      });
      root.querySelector('[data-scroll]').addEventListener('click',()=>root.querySelector('#sw-steps').scrollIntoView({block:'start',behavior:'auto'}));
    })();
