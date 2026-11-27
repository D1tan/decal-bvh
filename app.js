(function(){
  'use strict';
  const $=id=>document.getElementById(id),data=window.SCALABILITY_DATA;
  const endpoint=mode=>data.summaries.find(row=>row.count===1048576&&row.mode===mode);
  const original=endpoint(0),indexed=endpoint(1);
  $('cpu-before').textContent=original.cpu_ms.toFixed(3);
  $('cpu-after').textContent=indexed.cpu_ms.toFixed(3);
  $('fps-before').textContent=original.fps.toFixed(1);
  $('fps-after').textContent=indexed.fps.toFixed(1);
  let view='comparison';
  function show(next){
    view=view===next?'comparison':next;
    for(const id of ['comparison','scene','placement'])$(id+'-media').hidden=id!==view;
    for(const [id,target,label] of [['scene-toggle','scene','Scene'],['media-toggle','placement','Placement']]){
      $(id).textContent=view===target?'Comparison':label;
      $(id).setAttribute('aria-pressed',String(view===target));
    }
    $('media-caption').textContent=view==='scene'?'Camera and scene layout':view==='placement'?'256 remote walls · up to 4,096 decals/wall':'Default (left) / BVH (right)';
    $('media-note').textContent=view==='scene'?'Layout-only overview · click to inspect':view==='placement'?'Native UE views · click to inspect':'Real-time capture · recording adds overhead';
    if(view!=='comparison')document.querySelector('video').pause();
  }
  $('scene-toggle').onclick=()=>show('scene');
  $('media-toggle').onclick=()=>show('placement');
})();
