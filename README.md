# Atomic GRC Platform Starter

Static prototype for an Atomic GRC compliance dashboard.

## Run locally

### Option 1: Open directly
Open `public/index.html` in a browser.

### Option 2: Local server
```bash
cd atomic-grc-platform/public
python -m http.server 8000
```
Then browse to `http://localhost:8000`

## Pages
- `index.html` — Home / cockpit
- `controls.html` — Control library
- `heatmap.html` — Heatmap
- `workflow.html` — Workflow
- `governance.html` — Governance
- `compliance.html` — Compliance mapping
- `knowledge.html` — Knowledge management
- `reports.html` — Reporting center

## Notes
- Uses fake data from `../data/controls.json` and `../data/tasks.json`
- Designed for GitHub starter use
- Static only for version 1
