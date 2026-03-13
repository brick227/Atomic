async function initControls(){
  const controls = await loadJSON('../data/controls.json');
  const tbody = document.getElementById('controlsBody');
  const search = document.getElementById('search');
  const fw = document.getElementById('fw');
  const st = document.getElementById('st');
  fw.innerHTML = '<option>All</option>' + [...new Set(controls.map(c=>c.framework))].map(v=>`<option>${v}</option>`).join('');
  function render(){
    const rows = controls.filter(c => (fw.value==='All'||c.framework===fw.value) && (st.value==='All'||c.status===st.value) && (`${c.id} ${c.title} ${c.description}`.toLowerCase().includes(search.value.toLowerCase())));
    tbody.innerHTML = rows.map(c=>`<tr>
      <td><strong>${c.id}</strong></td><td>${c.framework}</td><td>${c.title}</td>
      <td><span class="pill ${statusClass(c.status)}">${c.status}</span></td>
      <td>${c.owner}</td><td>${c.difficulty}</td><td>${c.cost}</td><td>${c.time}</td>
    </tr>`).join('');
    document.getElementById('count').textContent = rows.length;
  }
  ;[search,fw,st].forEach(el=>el.oninput=render); render();
}
document.addEventListener('DOMContentLoaded', initControls);
