async function initWorkflow(){
 const tasks = await loadJSON('../data/tasks.json');
 const tbody = document.getElementById('taskBody');
 tbody.innerHTML = tasks.map(t=>`<tr><td>${t.taskId}</td><td>${t.title}</td><td>${t.controlId}</td><td>${t.owner}</td><td><span class="pill ${statusClass(t.status)}">${t.status}</span></td><td>${t.daysOpen}</td><td>${t.approval}</td></tr>`).join('');
 const avg = Math.round(tasks.reduce((a,t)=>a+t.daysOpen,0)/tasks.length);
 document.getElementById('avgDays').textContent = avg + ' days';
 document.getElementById('overdueCount').textContent = tasks.filter(t=>t.status==='Overdue').length;
 document.getElementById('approvedCount').textContent = tasks.filter(t=>t.status==='Approved').length;
}
document.addEventListener('DOMContentLoaded', initWorkflow);
