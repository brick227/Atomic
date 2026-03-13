async function initDashboard(){
  const controls = await loadJSON('../data/controls.json');
  const tasks = await loadJSON('../data/tasks.json');
  const sel = document.getElementById('frameworkSelect');
  const frameworks = ['All', ...new Set(controls.map(c=>c.framework))];
  sel.innerHTML = frameworks.map(f=>`<option>${f}</option>`).join('');
  function render(){
    const filtered = byFramework(controls, sel.value);
    const m = calcMetrics(filtered);
    document.getElementById('score').textContent = m.score + '%';
    document.getElementById('controlCount').textContent = `${m.completed} / ${m.total}`;
    document.getElementById('evidenceCount').textContent = `${m.evidence} / ${m.evidenceNeeded}`;
    document.getElementById('workflowCount').textContent = tasks.length;
    document.getElementById('governanceMetric').textContent = `${Math.max(3, Math.floor(missing=filtered.filter(c=>c.status==='missing').length/3))} open risks`;
    document.getElementById('trustNumber').textContent = 60 + Math.round(m.score * 0.4);
    const top = topPriority(filtered);
    document.getElementById('topFive').innerHTML = top.map(c=>`<li>${c.id} — ${c.title}</li>`).join('');
    const summary = frameworkSummary(filtered);
    document.getElementById('frameworkCards').innerHTML = Object.entries(summary).map(([k,v])=>`<div class="card"><h4>${k}</h4><div class="metric">${v.completed}/${v.total}</div><div class="muted">controls complete</div></div>`).join('');
  }
  sel.onchange = render; render();
}
document.addEventListener('DOMContentLoaded', initDashboard);
