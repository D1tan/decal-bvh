(function(){
  'use strict';
  const $=id=>document.getElementById(id),data=window.SCALABILITY_DATA;
  const endpoint=mode=>data.summaries.find(row=>row.count===1048576&&row.mode===mode);
  const original=endpoint(0),indexed=endpoint(1);
  $('cpu-before').textContent=original.cpu_ms.toFixed(3);
  $('cpu-after').textContent=indexed.cpu_ms.toFixed(3);
  $('fps-before').textContent=original.fps.toFixed(1);
  $('fps-after').textContent=indexed.fps.toFixed(1);
  const button=$('media-toggle');let placement=false;
  button.onclick=()=>{
    placement=!placement;
    $('comparison-media').hidden=placement;$('placement-media').hidden=!placement;
    button.textContent=placement?'Comparison':'Placement';
    button.setAttribute('aria-pressed',String(placement));
    $('media-caption').textContent=placement?'256 remote walls · up to 4,096 decals/wall · click to inspect':'Default (left) / BVH (right)';
    if(placement)document.querySelector('video').pause();
    $('media-note').textContent=placement?'Native UE views · click to inspect':'Real-time capture · recording adds overhead';
  };
})();
