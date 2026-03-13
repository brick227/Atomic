async function initHeatmap(){
 const controls = await loadJSON('../data/controls.json');
 const mode = document.getElementById('mode');
 function color(c){
   if(mode.value==='status') return c.status==='complete'?'green':c.status==='in_progress'?'yellow':'red';
   const v = c[mode.value];
   return v==='low'||v==='easy'||v==='short' ? 'green' : v==='medium' ? 'yellow' : 'red';
 }
 function render(){
  document.getElementById('heatGrid').innerHTML = controls.map(c=>`<div class="heat ${color(c)}"><strong>${c.id}</strong><div>${c.framework}</div></div>`).join('');
 }
 mode.onchange=render; render();
}
document.addEventListener('DOMContentLoaded', initHeatmap);
