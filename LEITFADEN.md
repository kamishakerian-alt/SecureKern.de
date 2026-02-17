# SecureKern.de – Leitfaden (Setup, Run, Test, Conventions)

## Setup

```bash
git clone <repo>
cd SecureKern.de
npm install
```

- **Node:** Use a current LTS version (e.g. 18+).
- **Local CMS (optional):** `npm run cms` then open `/admin/` (e.g. with `npm run dev`).

## Run

- **Build:** `npm run build` → output in `dist/`.
- **Dev server:** `npm run dev` → Eleventy serve + watch (e.g. http://localhost:8080).

## Test

- After changes: `npm run build` must complete without errors.
- Manually check: EN nav “Services” dropdown links (must go to `/en/services/…`), DE contact/CTA links, and `/admin/` if using CMS.

## Conventions

- **Source:** All site content and templates live under `site/`.
- **Data:** Global data in `site/_data/*.cjs` (site, navigation, meta). Use `site_local` and `nav` in layouts (set by language).
- **Permalinks:** DE at root (e.g. `/leistungen.html`, `/kontakt.html`). EN under `/en/` (e.g. `/en/services.html`, `/en/services/nis2-readiness.html`).
- **Assets:** `site/assets` (css, js, images) are passthrough-copied to `dist/assets`.
- **Publish:** Netlify (or other host) should use build command `npm run build` and publish directory **dist** (not Website/dist).
- **Governance:** Keep STRATEGY.md, LEITFADEN.md, docs/BLOCKERS.md, and docs/AUDIT_LOG.md updated per workspace rules.
