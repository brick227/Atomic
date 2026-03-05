// Trend chart (dummy data)
const ctx = document.getElementById("trendChart");
new Chart(ctx, {
  type: "line",
  data: {
    labels: ["W1","W2","W3","W4","W5","W6","W7","W8"],
    datasets: [{
      label: "Compliance %",
      data: [78, 79, 80, 82, 81, 83, 84, 84],
      tension: 0.35,
      borderWidth: 2,
      pointRadius: 3
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { display: true } },
    scales: {
      y: { suggestedMin: 60, suggestedMax: 100 }
    }
  }
});

// Atomic Agent (dummy response)
const agentInput = document.getElementById("agentInput");
const agentSend = document.getElementById("agentSend");
const agentOutput = document.getElementById("agentOutput");

agentSend?.addEventListener("click", () => {
  const q = (agentInput.value || "").trim();
  if (!q) return;

  agentOutput.innerHTML = `
    <div class="fw-semibold mb-2">Atomic Agent (v1 stub)</div>
    <div class="small">
      <div><strong>Your question:</strong> ${escapeHtml(q)}</div>
      <hr class="my-2">
      <div><strong>Suggested next actions:</strong></div>
      <ul class="mb-0">
        <li>Identify affected systems/endpoints tied to the finding.</li>
        <li>Confirm evidence required (patch reports, screenshots, ticket closure).</li>
        <li>Create/assign POA&M item with owner + due date.</li>
        <li>Enable alert escalation if it stays open &gt; 72 hours.</li>
      </ul>
    </div>
  `;

  agentInput.value = "";
});

function escapeHtml(str) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}