async function loadJSON(path){ const res = await fetch(path); return await res.json(); }
function statusClass(v){ return ({complete:'complete',in_progress:'in_progress',missing:'missing',Approved:'approved',Pending:'pending',Rejected:'rejected',Overdue:'overdue'})[v]||''; }
function calcMetrics(controls){
  const total = controls.length;
  const completed = controls.filter(c=>c.status==='complete').length;
  const inProgress = controls.filter(c=>c.status==='in_progress').length;
  const missing = controls.filter(c=>c.status==='missing').length;
  const evidence = controls.reduce((a,c)=>a+Math.min(c.evidenceCount,c.evidenceNeeded),0);
  const evidenceNeeded = controls.reduce((a,c)=>a+c.evidenceNeeded,0);
  return {total,completed,inProgress,missing,score:Math.round((completed/total)*100),evidence,evidenceNeeded};
}
function frameworkSummary(controls){
  const map = {};
  controls.forEach(c=>{ map[c.framework] ??= {total:0,completed:0}; map[c.framework].total++; if(c.status==='complete') map[c.framework].completed++; });
  return map;
}
function topPriority(controls){
  return controls.filter(c=>c.status!=='complete').slice(0,5);
}
function byFramework(controls, fw){ return fw==='All' ? controls : controls.filter(c=>c.framework===fw); }
