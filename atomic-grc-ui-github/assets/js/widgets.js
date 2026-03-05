/* assets/js/widgets.js
   Fake-data widgets for:
   - Compliance Assessment (Manual + Real-Time)
   - Monitoring Dashboard (health + drift + findings + charts)
   - Integrations (status + library)
   - Documentation Library (evidence + hashes + tags)
*/

(function () {
  // ---------- Fake Data ----------
  const DATA = {
    compliance: {
      manual: [
        {
          id: "AC.L2-3.1.1",
          domain: "Access Control",
          desc: "Limit system access to authorized users.",
          status: "Met",
          evidenceCount: 3,
          owner: "IAM",
          notes: "RBAC enforced; quarterly review scheduled."
        },
        {
          id: "AC.L2-3.1.5",
          domain: "Access Control",
          desc: "Employ the principle of least privilege.",
          status: "Not Met",
          evidenceCount: 1,
          owner: "IAM",
          notes: "3 elevated accounts missing review in last 30 days."
        },
        {
          id: "CM.L2-3.4.1",
          domain: "Configuration Management",
          desc: "Establish and maintain baseline configurations.",
          status: "Partial",
          evidenceCount: 2,
          owner: "SecEng",
          notes: "Baseline exists; drift detection needs expansion."
        },
        {
          id: "MA.L2-3.7.2",
          domain: "Maintenance",
          desc: "Identify, report, and correct system flaws (patching).",
          status: "Not Met",
          evidenceCount: 0,
          owner: "IT Ops",
          notes: "3 systems missing critical updates."
        }
      ],
      realtime: [
        { control: "Patch Management", source: "Microsoft Defender", status: "FAIL", detail: "3 endpoints missing critical KBs" },
        { control: "Privileged Account Review", source: "Entra ID / AD", status: "WARN", detail: "3 elevated accounts not reviewed" },
        { control: "Vulnerability Scanning", source: "ACAS", status: "PASS", detail: "Last scan: 2 days ago" },
        { control: "Log Centralization", source: "Splunk", status: "PASS", detail: "Ingestion healthy (24h)" }
      ],
      score: { value: 84, openPoam: 7, avgResolveHrs: 32 }
    },

    monitoring: {
      health: { great: 61, fair: 29, attention: 12 },
      drift: [
        { area: "Baseline Config", system: "WIN-ENG-021", change: "Local admin added", risk: "High", age: "6h" },
        { area: "GPO", system: "Domain Policy", change: "Password policy modified", risk: "Med", age: "2d" },
        { area: "Firewall", system: "AZ-VNET-CORE", change: "New inbound rule", risk: "Med", age: "1d" }
      ],
      findings: [
        { sev: "P1", finding: "Critical patches missing", owner: "IT Ops", sla: "24h", status: "In Progress" },
        { sev: "P2", finding: "Privileged accounts overdue review", owner: "IAM", sla: "72h", status: "Open" },
        { sev: "P3", finding: "Config drift on 2 endpoints", owner: "SecEng", sla: "7d", status: "Open" }
      ],
      trendWeeks: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"],
      trendScores: [78, 79, 80, 82, 81, 83, 84, 84],
      domainLabels: ["AC", "AU", "CM", "IA", "IR", "MA", "MP", "RA", "SC", "SI"],
      domainScores: [88, 82, 65, 90, 76, 61, 79, 84, 80, 73]
    },

    integrations: {
      status: [
        { tool: "Microsoft Defender for Cloud", state: "Connected", lastSync: "5 min ago" },
        { tool: "Splunk Cloud", state: "Connected", lastSync: "2 min ago" },
        { tool: "ServiceNow", state: "Connected", lastSync: "10 min ago" },
        { tool: "ACAS", state: "Degraded", lastSync: "1 hr ago" },
        { tool: "CrowdStrike", state: "Not Connected", lastSync: "—" }
      ],
      library: [
        { name: "Azure / Entra Connector", category: "Identity", supports: ["Users", "Roles", "Privileged Access", "Sign-in Logs"] },
        { name: "Endpoint Connector", category: "Endpoints", supports: ["Patching", "Inventory", "EDR Status"] },
        { name: "Ticketing Connector", category: "ITSM", supports: ["Incidents", "Changes", "POA&M Tickets"] },
        { name: "SIEM Connector", category: "Logging", supports: ["Alerts", "Dashboards", "Retention"] }
      ]
    },

    docs: {
      evidence: [
        { file: "patch_report_Mar.pdf", control: "MA.L2-3.7.2", hash: "c4a1...9fd2", uploaded: "Today", tags: ["patching", "defender"] },
        { file: "privileged_review.xlsx", control: "AC.L2-3.1.5", hash: "8b2e...1aa7", uploaded: "Yesterday", tags: ["iam", "least-privilege"] },
        { file: "baseline_config.docx", control: "CM.L2-3.4.1", hash: "0a77...bb10", uploaded: "2 days ago", tags: ["baseline", "drift"] }
      ]
    }
  };

  // ---------- Helpers ----------
  const $ = (id) => document.getElementById(id);

  function badgeForStatus(status) {
    const s = String(status).toLowerCase();
    if (s === "met" || s === "pass" || s === "connected") return "success";
    if (s === "partial" || s === "warn" || s === "degraded") return "warning";
    if (s === "not met" || s === "fail" || s === "not connected") return "danger";
    return "secondary";
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  // ---------- Render: Compliance Assessment ----------
  function renderComplianceAssessment() {
    const root = $("complianceAssessmentRoot");
    if (!root) return;

    const manualRows = DATA.compliance.manual.map((c) => `
      <tr>
        <td class="text-nowrap">${escapeHtml(c.id)}</td>
        <td class="text-nowrap">${escapeHtml(c.domain)}</td>
        <td>${escapeHtml(c.desc)}</td>
        <td><span class="badge text-bg-${badgeForStatus(c.status)}">${escapeHtml(c.status)}</span></td>
        <td class="text-center">${c.evidenceCount}</td>
        <td class="text-nowrap">${escapeHtml(c.owner)}</td>
        <td>${escapeHtml(c.notes)}</td>
      </tr>
    `).join("");

    const rtRows = DATA.compliance.realtime.map((r) => `
      <tr>
        <td>${escapeHtml(r.control)}</td>
        <td>${escapeHtml(r.source)}</td>
        <td><span class="badge text-bg-${badgeForStatus(r.status)}">${escapeHtml(r.status)}</span></td>
        <td class="text-muted small">${escapeHtml(r.detail)}</td>
      </tr>
    `).join("");

    root.innerHTML = `
      <div class="d-flex align-items-center justify-content-between mb-2">
        <h5 class="mb-0">Compliance Assessment</h5>
        <div class="small text-muted">
          Fake data demo • Score <span class="fw-semibold">${DATA.compliance.score.value}%</span>
        </div>
      </div>

      <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tabManual" type="button" role="tab">Manual Assessment</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" data-bs-toggle="tab" data-bs-target="#tabRealtime" type="button" role="tab">Real-Time Assessment</button>
        </li>
      </ul>

      <div class="tab-content border border-top-0 bg-white p-3 rounded-bottom shadow-sm">
        <div class="tab-pane fade show active" id="tabManual" role="tabpanel">
          <div class="row g-3 mb-3">
            <div class="col-12 col-md-4">
              <div class="card">
                <div class="card-body">
                  <div class="text-muted small">Open POA&M</div>
                  <div class="display-6 fw-bold">${DATA.compliance.score.openPoam}</div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-4">
              <div class="card">
                <div class="card-body">
                  <div class="text-muted small">Avg Resolve Time</div>
                  <div class="display-6 fw-bold">${DATA.compliance.score.avgResolveHrs}h</div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-4">
              <div class="card">
                <div class="card-body">
                  <div class="text-muted small">Assessment Mode</div>
                  <div class="fw-semibold">Self-Assessment (Demo)</div>
                  <div class="small text-muted">Switch to C3PAO later</div>
                </div>
              </div>
            </div>
          </div>

          <div class="table-responsive">
            <table class="table table-sm align-middle">
              <thead>
                <tr>
                  <th>Control</th>
                  <th>Domain</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th class="text-center">Evidence</th>
                  <th>Owner</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>${manualRows}</tbody>
            </table>
          </div>
        </div>

        <div class="tab-pane fade" id="tabRealtime" role="tabpanel">
          <div class="alert alert-info small mb-3">
            Demo view: these statuses will later come from Defender / SIEM / ACAS / IAM connectors.
          </div>

          <div class="table-responsive">
            <table class="table table-sm align-middle">
              <thead>
                <tr>
                  <th>Control Area</th>
                  <th>Integration</th>
                  <th>Status</th>
                  <th>Detail</th>
                </tr>
              </thead>
              <tbody>${rtRows}</tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  // ---------- Render: Monitoring Dashboard ----------
  function renderMonitoring() {
    const root = $("monitoringRoot");
    if (!root) return;

    const driftRows = DATA.monitoring.drift.map((d) => `
      <tr>
        <td>${escapeHtml(d.area)}</td>
        <td>${escapeHtml(d.system)}</td>
        <td>${escapeHtml(d.change)}</td>
        <td><span class="badge text-bg-${badgeForStatus(d.risk === "High" ? "fail" : d.risk === "Med" ? "warn" : "pass")}">${escapeHtml(d.risk)}</span></td>
        <td class="text-muted small">${escapeHtml(d.age)}</td>
      </tr>
    `).join("");

    const findingRows = DATA.monitoring.findings.map((f) => `
      <tr>
        <td><span class="badge text-bg-${f.sev === "P1" ? "danger" : f.sev === "P2" ? "warning" : "info"}">${escapeHtml(f.sev)}</span></td>
        <td>${escapeHtml(f.finding)}</td>
        <td>${escapeHtml(f.owner)}</td>
        <td>${escapeHtml(f.sla)}</td>
        <td><span class="badge text-bg-${badgeForStatus(f.status === "In Progress" ? "warn" : "partial")}">${escapeHtml(f.status)}</span></td>
      </tr>
    `).join("");

    root.innerHTML = `
      <div class="d-flex align-items-center justify-content-between mb-2">
        <h5 class="mb-0">Monitoring Dashboard</h5>
        <div class="small text-muted">Fake data demo • Drift + Findings + Charts</div>
      </div>

      <div class="row g-3">
        <div class="col-12 col-xl-4">
          <div class="card shadow-sm">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <div>
                  <div class="fw-semibold">System Health</div>
                  <div class="text-muted small">R/Y/G snapshot</div>
                </div>
                <i class="bi bi-activity"></i>
              </div>
              <div class="row g-2 mt-2">
                <div class="col-4"><div class="p-2 border rounded text-center"><div class="fw-bold">Great</div><div class="text-muted small">${DATA.monitoring.health.great}</div></div></div>
                <div class="col-4"><div class="p-2 border rounded text-center"><div class="fw-bold">Fair</div><div class="text-muted small">${DATA.monitoring.health.fair}</div></div></div>
                <div class="col-4"><div class="p-2 border rounded text-center"><div class="fw-bold">Attention</div><div class="text-muted small">${DATA.monitoring.health.attention}</div></div></div>
              </div>
              <div class="small text-muted mt-2">Tip: bind to endpoint health + SIEM signals later.</div>
            </div>
          </div>
        </div>

        <div class="col-12 col-xl-8">
          <div class="card shadow-sm">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <div class="fw-semibold">Compliance Trend</div>
                  <div class="text-muted small">Last 8 weeks</div>
                </div>
              </div>
              <canvas id="monitorTrendChart" height="90" class="mt-2"></canvas>
            </div>
          </div>
        </div>

        <div class="col-12 col-xl-6">
          <div class="card shadow-sm">
            <div class="card-body">
              <div class="fw-semibold">Drift Detection</div>
              <div class="text-muted small mb-2">Recent drift events (demo)</div>
              <div class="table-responsive">
                <table class="table table-sm align-middle mb-0">
                  <thead>
                    <tr>
                      <th>Area</th><th>System</th><th>Change</th><th>Risk</th><th>Age</th>
                    </tr>
                  </thead>
                  <tbody>${driftRows}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-xl-6">
          <div class="card shadow-sm">
            <div class="card-body">
              <div class="fw-semibold">Active Findings</div>
              <div class="text-muted small mb-2">Prioritized queue (demo)</div>
              <div class="table-responsive">
                <table class="table table-sm align-middle mb-0">
                  <thead>
                    <tr>
                      <th>Sev</th><th>Finding</th><th>Owner</th><th>SLA</th><th>Status</th>
                    </tr>
                  </thead>
                  <tbody>${findingRows}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12">
          <div class="card shadow-sm">
            <div class="card-body">
              <div class="fw-semibold">Domain Breakdown</div>
              <div class="text-muted small mb-2">Example scores by domain (demo)</div>
              <canvas id="domainBarChart" height="80"></canvas>
            </div>
          </div>
        </div>
      </div>
    `;

    // Charts
    const trendCtx = document.getElementById("monitorTrendChart");
    if (trendCtx) {
      new Chart(trendCtx, {
        type: "line",
        data: {
          labels: DATA.monitoring.trendWeeks,
          datasets: [{
            label: "Compliance %",
            data: DATA.monitoring.trendScores,
            tension: 0.35,
            borderWidth: 2,
            pointRadius: 3
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: true } },
          scales: { y: { suggestedMin: 60, suggestedMax: 100 } }
        }
      });
    }

    const barCtx = document.getElementById("domainBarChart");
    if (barCtx) {
      new Chart(barCtx, {
        type: "bar",
        data: {
          labels: DATA.monitoring.domainLabels,
          datasets: [{
            label: "Domain Score",
            data: DATA.monitoring.domainScores,
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: true } },
          scales: { y: { suggestedMin: 50, suggestedMax: 100 } }
        }
      });
    }
  }

  // ---------- Render: Integrations ----------
  function renderIntegrations() {
    const root = $("integrationsRoot");
    if (!root) return;

    const statusRows = DATA.integrations.status.map((x) => `
      <tr>
        <td>${escapeHtml(x.tool)}</td>
        <td><span class="badge text-bg-${badgeForStatus(x.state)}">${escapeHtml(x.state)}</span></td>
        <td class="text-muted small">${escapeHtml(x.lastSync)}</td>
      </tr>
    `).join("");

    const libCards = DATA.integrations.library.map((c) => `
      <div class="col-12 col-md-6 col-xl-3">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <div class="fw-semibold">${escapeHtml(c.name)}</div>
            <div class="text-muted small mb-2">${escapeHtml(c.category)}</div>
            <ul class="small mb-0">
              ${c.supports.map(s => `<li>${escapeHtml(s)}</li>`).join("")}
            </ul>
          </div>
          <div class="card-footer bg-white border-0 pt-0">
            <button class="btn btn-sm btn-outline-primary w-100" type="button">Configure</button>
          </div>
        </div>
      </div>
    `).join("");

    root.innerHTML = `
      <div class="d-flex align-items-center justify-content-between mb-2">
        <h5 class="mb-0">Integrations</h5>
        <div class="small text-muted">Fake data demo • Status + Library</div>
      </div>

      <div class="row g-3">
        <div class="col-12 col-xl-5">
          <div class="card shadow-sm">
            <div class="card-body">
              <div class="fw-semibold">Integration Status</div>
              <div class="text-muted small mb-2">Connectivity + last sync (demo)</div>
              <div class="table-responsive">
                <table class="table table-sm align-middle mb-0">
                  <thead>
                    <tr><th>Tool</th><th>Status</th><th>Last Sync</th></tr>
                  </thead>
                  <tbody>${statusRows}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-xl-7">
          <div class="card shadow-sm">
            <div class="card-body">
              <div class="fw-semibold">Integration Library</div>
              <div class="text-muted small mb-2">What you can enable (demo)</div>
              <div class="row g-3">
                ${libCards}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ---------- Render: Documentation Library ----------
  function renderDocs() {
    const root = $("docsRoot");
    if (!root) return;

    const rows = DATA.docs.evidence.map((e) => `
      <tr>
        <td class="text-nowrap">${escapeHtml(e.file)}</td>
        <td class="text-nowrap">${escapeHtml(e.control)}</td>
        <td class="text-monospace small">${escapeHtml(e.hash)}</td>
        <td class="text-muted small">${escapeHtml(e.uploaded)}</td>
        <td>${e.tags.map(t => `<span class="badge text-bg-secondary me-1">${escapeHtml(t)}</span>`).join("")}</td>
        <td class="text-end">
          <button class="btn btn-sm btn-outline-secondary" type="button">View</button>
          <button class="btn btn-sm btn-outline-primary" type="button">Tag</button>
        </td>
      </tr>
    `).join("");

    root.innerHTML = `
      <div class="d-flex align-items-center justify-content-between mb-2">
        <h5 class="mb-0">Documentation Library</h5>
        <div class="small text-muted">Fake data demo • Evidence + Hash + Tags</div>
      </div>

      <div class="card shadow-sm">
        <div class="card-body">
          <div class="row g-2 align-items-end mb-3">
            <div class="col-12 col-md-5">
              <label class="form-label small mb-1">Search evidence</label>
              <input class="form-control form-control-sm" placeholder="Search file, control, tag...">
            </div>
            <div class="col-12 col-md-3">
              <label class="form-label small mb-1">Filter by control</label>
              <select class="form-select form-select-sm">
                <option>All</option>
                <option>MA.L2-3.7.2</option>
                <option>AC.L2-3.1.5</option>
                <option>CM.L2-3.4.1</option>
              </select>
            </div>
            <div class="col-12 col-md-4 text-md-end">
              <button class="btn btn-sm btn-outline-secondary me-2" type="button"><i class="bi bi-hash me-1"></i>Re-hash</button>
              <button class="btn btn-sm btn-primary" type="button"><i class="bi bi-upload me-1"></i>Upload Evidence</button>
            </div>
          </div>

          <div class="table-responsive">
            <table class="table table-sm align-middle mb-0">
              <thead>
                <tr>
                  <th>File</th>
                  <th>Control</th>
                  <th>SHA-256</th>
                  <th>Uploaded</th>
                  <th>Tags</th>
                  <th class="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
          </div>

          <div class="small text-muted mt-2">
            Demo hashes are shortened; in production store full SHA-256 + chain-of-custody metadata.
          </div>
        </div>
      </div>
    `;
  }

  // ---------- Bootstrap on DOM Ready ----------
  document.addEventListener("DOMContentLoaded", () => {
    renderComplianceAssessment();
    renderMonitoring();
    renderIntegrations();
    renderDocs();
  });
})();