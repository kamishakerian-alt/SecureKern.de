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

- **Build:** `npm run build` → output in `Website/`.
- **Dev server:** `npm run dev` → Eleventy serve + watch (e.g. http://localhost:8080). Oder `npx serve Website` → http://localhost:3000.

## Test

- After changes: `npm run build` must complete without errors.
- Manually check: EN nav “Services” dropdown links (must go to `/en/services/…`), DE contact/CTA links, and `/admin/` if using CMS.

## Conventions

- **Source:** All site content and templates live under `site/`.
- **Data:** Global data in `site/_data/*.cjs` (site, navigation, meta). Use `site_local` and `nav` in layouts (set by language).
- **Permalinks:** DE at root (e.g. `/leistungen.html`, `/kontakt.html`). EN under `/en/` (e.g. `/en/services.html`, `/en/services/nis2-readiness.html`).
- **Assets:** `site/assets` (css, js, images) are passthrough-copied to `Website/assets`.
- **Publish:** Netlify (or other host): build command `npm run build`, publish directory **Website**.
- **Single source of truth:** Only `site/` and config at repo root. Build output `Website/` is generated and not committed.
