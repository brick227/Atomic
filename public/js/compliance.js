async function initCompliance(){
 const controls = await loadJSON('../data/controls.json');
 const left = document.getElementById('leftList');
 const right = document.getElementById('rightList');
 const cmmc = controls.filter(c=>c.framework==='CMMC').slice(0,20);
 const nist = controls.filter(c=>c.framework==='NIST 800-171').slice(0,20);
 left.innerHTML = cmmc.map(c=>`<label><input type="checkbox" value="${c.id}"> ${c.id}</label><br>`).join('');
 right.innerHTML = nist.map(c=>`<label><input type="checkbox" value="${c.id}"> ${c.id}</label><br>`).join('');
 document.getElementById('mapBtn').onclick = ()=>{
   const l = [...left.querySelectorAll('input:checked')].slice(0,5).map(x=>x.value);
   const r = [...right.querySelectorAll('input:checked')].slice(0,5).map(x=>x.value);
   document.getElementById('mapResult').innerHTML = l.map((v,i)=>`<li>${v} → ${r[i]||'Unmapped'}</li>`).join('') || '<li>No controls selected.</li>';
 };
}
document.addEventListener('DOMContentLoaded', initCompliance);
