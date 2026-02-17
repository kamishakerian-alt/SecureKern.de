# SecureKern.de – Strategy

## Goal

Professional, bilingual (DE/EN) static marketing site for SecureKern GmbH (OT/ICS cybersecurity), editable via Decap CMS where possible, single source of truth, clean repo.

## Current State

- **Source:** `site/` only. **Output:** `Website/` (Eleventy build). **Publish:** Netlify → `Website`.
- **Data:** `site/_data/*.cjs` (site, navigation, meta). No legacy JSON.
- **SEO:** robots.txt, sitemap.xml, sw.js in `site/static/` → copied to `Website/` root.
- **One workspace:** Main repo at `C:\Users\skk2abt\Desktop\WP_Projetcs\SecureKern.de`; no worktrees.

## Decisions

| Decision                       | Rationale                                              |
| ------------------------------ | ------------------------------------------------------ |
| Output = `Website`             | Single deploy folder; Netlify publish = Website.       |
| Data in `site/_data` as `.cjs` | i18n, dynamic year; no duplicate JSON.                 |
| Build output not committed     | `.gitignore` includes `Website/`; only source tracked. |
