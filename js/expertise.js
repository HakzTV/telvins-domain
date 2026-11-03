(function(){

  var root=document.getElementById('expertise');

  if(!root)return;

  var tabs=Array.from(root.querySelectorAll('.xp-layer-tab'));

  var slabs=Array.from(root.querySelectorAll('.xp-layer-slab'));

  var panels=Array.from(root.querySelectorAll('.xp-layer-panel'));

  function pick(index,focus){

    tabs.forEach(function(tab,i){var active=i===index;tab.classList.toggle('on',active);tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;});

    slabs.forEach(function(slab,i){slab.classList.toggle('on',i===index);slab.setAttribute('aria-pressed',String(i===index));});

    panels.forEach(function(panel,i){panel.hidden=i!==index;});

    if(focus)tabs[index].focus();

  }

  tabs.concat(slabs).forEach(function(button){button.addEventListener('click',function(){pick(Number(button.dataset.layer),false);});});

  tabs.forEach(function(tab,index){tab.addEventListener('keydown',function(event){

    var next=index;

    if(event.key==='ArrowRight')next=(index+1)%tabs.length;

    else if(event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;

    else if(event.key==='Home')next=0;

    else if(event.key==='End')next=tabs.length-1;

    else return;

    event.preventDefault();pick(next,true);

  });});

})();
