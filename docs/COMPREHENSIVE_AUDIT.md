# SecureKern.de – Comprehensive Audit Report

**Date:** 2026-02-17
**Scope:** Full project (structure, config, content, i18n, build, deployment, docs, governance)

---

## 1. Executive Summary

| Area                | Status          | Notes                                                                                              |
| ------------------- | --------------- | -------------------------------------------------------------------------------------------------- |
| Build               | ✅ Passes       | Eleventy builds 73 files to `dist/`                                                                |
| Structure           | ⚠️ Minor issues | Duplicate `Website/` vs `site/`; README publish path wrong                                         |
| Navigation (EN)     | ❌ Broken       | EN nav points to `/en/*.html` but services live at `/en/services/*.html`                           |
| Internal links (DE) | ⚠️ Inconsistent | Mix of `contact.html` vs `kontakt.html`; two CTA links on index use relative paths                 |
| CMS / Data          | ❌ Broken       | Decap config references deleted `navigation.json` / `site.json` (now `.cjs`)                       |
| SEO / Crawlers      | ⚠️ Missing      | No `site/robots.txt` (passthrough expects it); no sitemap in `site/`                               |
| Governance docs     | ❌ Missing      | STRATEGY.md, LEITFADEN.md, docs/BLOCKERS.md, docs/AUDIT_LOG.md absent                              |
| i18n                | ⚠️ Partial      | `data-i18n` used; no client-side i18n script in `main.js`; EN index links to `/en/leistungen.html` |

**Critical:** Fix EN navigation URLs and CMS config. **High:** Add robots.txt, unify DE contact links, fix README publish path.

---

## 2. Project Structure & Config

### 2.1 Layout

- **Source:** `site/` (Eleventy input)
- **Output:** `dist/` (per `eleventy.config.cjs`)
- **Legacy:** `Website/` exists with old assets/sitemap/robots (different domain secure-kern.ch); not used by current build.

**Recommendation:** Document that `Website/` is legacy or remove it to avoid confusion. README says "Build output → Website/dist" but actual publish dir is **dist/** (and netlify.toml correctly uses `publish = "dist"`).

### 2.2 Dependencies

- `package.json`: `"type": "module"` but `eleventy.config.cjs` uses CommonJS (`require`) – OK for `.cjs`.
- Eleventy `^3.1.2`, Decap CMS `^3.5.0`, markdown-it `^14.1.0`.
- `EleventyI18nPlugin` is required from `@11ty/eleventy`; confirm it is exported in v3 (plugin exists in 11ty i18n docs).

### 2.3 Scripts

- `build`, `dev`, `cms`, `fix:encoding`, `migrate:pages` – last two reference `scripts/*.mjs` but no `scripts/` directory in repo (scripts may be missing or elsewhere).

---

## 3. Data & Navigation

### 3.1 Global data

- `site/_data/site.cjs` – DE/EN title, baseUrl, CTA, contact, address, socials. ✅
- `site/_data/navigation.cjs` – DE/EN nav (main + footer). ✅
- `site/_data/meta.cjs` – `year` for footer. ✅

### 3.2 EN navigation – broken links

Navigation (e.g. Services submenu) points to:

- `/en/nis2-readiness.html`, `/en/iec-62443.html`, `/en/segmentation.html`, `/en/risk-training.html`, `/en/ot-mdr.html`

Actual permalinks are under **/en/services/**:

- `/en/services/nis2-readiness.html`, `/en/services/iec-62443.html`, etc.

**Result:** All EN “Services” dropdown links are 404 unless fixed.

**Fix:** In `site/_data/navigation.cjs`, under `en.main`, set each service child `href` to `/en/services/<slug>.html` (and add or map “OT Risk Assessment & Training” to e.g. `/en/services/ot-risk.html` or `/en/services/training.html`; there is no `en/risk-training.html` page).

### 3.3 EN index wrong link

- `site/pages/en/index.md` line ~49: `href="/en/leistungen.html"` – should be `href="/en/services.html"`.

---

## 4. Internal Links (DE)

- **Contact:** Both `contact.md` (permalink `/contact.html`) and `kontakt.md` (permalink `/kontakt.html`) exist. Many DE pages use `contact.html` or `contact.html#form`; nav and some CTAs use `/kontakt.html`. Works but inconsistent; recommend standardising on `/kontakt.html` for DE.
- **Index (DE):**
  - `href="services.html"` → resolves to `/services.html` (exists).
  - `href="contact.html"` → resolves to `/contact.html` (exists).
    Prefer absolute paths for clarity: `/leistungen.html` and `/kontakt.html`.
- **Service pages (DE):** Many use `/contact.html#form` – correct and consistent.

---

## 5. Decap CMS (admin/config.yml)

- **media_folder:** `Website/assets/images/uploads` – outside `site/`; uploads may not match Eleventy passthrough (assets are under `site/assets`).
- **Collections “settings”:** Reference `site/_data/navigation.json` and `site/_data/site.json`. Those files were removed and replaced by `navigation.cjs` and `site.cjs`. **CMS “Einstellungen” (Navigation/Site) will fail** when opening or saving.

**Fix:** Either restore JSON files and keep them in sync with `.cjs`, or change CMS to edit something else (e.g. separate editable JSON used only by CMS) and have build use that.

---

## 6. Build & Output

- **Run:** `npm run build` completes; 73 files written, 68 passthrough copies.
- **Passthrough:** `site/robots.txt` → `robots.txt` is configured but **site/robots.txt does not exist**; no error from Eleventy, so no robots.txt in `dist/`.
- **Favicons:** `site/assets/images/favicons/README.md` is processed as a page → `dist/assets/images/favicons/README/index.html`. Consider excluding or moving that README so it isn’t treated as content.

---

## 7. Deployment

- **netlify.toml:** `command = "npm run build"`, `publish = "dist"` – correct.
- **README:** Says “Publish Directory: Website/dist” – should be **dist** (or “dist” in Netlify UI).

---

## 8. i18n

- **Server-side:** Language derived from `page.url` and `page.lang`; `site_local` and `nav` from `site`/`navigation` by language. ✅
- **Client-side:** Many elements use `data-i18n` but `site/assets/js/main.js` has no i18n logic; strings are not swapped by script. If client-side i18n is desired, implement a small i18n layer (e.g. map of keys to DE/EN and script to replace text). Otherwise remove or document that `data-i18n` is for future use only.

---

## 9. Content & Collections

- **Collections:** services, solutions, blogPosts, team, webinars, upcomingWebinars – paths in config match existing folders (`site/pages/services`, `site/pages/solutions`, `site/pages/resources`, `site/team`, `site/webinars`). `blogPosts` filters by `layout` including `blog-post`; `site/pages/resources/blog.md` uses `base.njk`, so it won’t appear in `blogPosts` (only future blog-post layout items will).
- **Team/Webinars:** Only `.gitkeep` in `site/team` and `site/webinars` – collections empty; OK if by design.

---

## 10. Governance & Living Docs (Workspace Rules)

Per workspace rules, the following should exist and be kept current:

- **STRATEGY.md** – goal, roadmap, decisions log
- **LEITFADEN.md** – setup, run, test, conventions
- **docs/BLOCKERS.md** – primary blocker register
- **docs/AUDIT_LOG.md** – append-only audit trail

These were missing and have been added (see below).

---

## 11. Action Items Summary

| Priority | Item                     | Action                                                                                                             |
| -------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| P0       | EN nav service links 404 | Update `navigation.cjs` EN service hrefs to `/en/services/…` and align “risk-training” to existing EN page         |
| P0       | CMS settings broken      | Point CMS to existing data (e.g. JSON mirrors) or new editable files; fix media_folder to match `site/` if desired |
| P1       | robots.txt missing       | Add `site/robots.txt` and optional sitemap reference                                                               |
| P1       | EN index wrong link      | Change `/en/leistungen.html` → `/en/services.html` in `site/pages/en/index.md`                                     |
| P2       | DE index relative links  | Use `/leistungen.html` and `/kontakt.html` in `site/pages/index.md`                                                |
| P2       | README publish path      | Change “Website/dist” to “dist”                                                                                    |
| P2       | Favicon README as page   | Exclude or move `site/assets/images/favicons/README.md` from page processing                                       |
| P3       | Client-side i18n         | Implement or remove/document `data-i18n` usage                                                                     |
| P3       | Legacy `Website/`        | Document or remove to avoid confusion                                                                              |

---

## 12. Files Created by This Audit

- **STRATEGY.md** – Project goal, roadmap, decisions
- **LEITFADEN.md** – Setup, run, test, conventions
- **docs/BLOCKERS.md** – Blocker register
- **docs/AUDIT_LOG.md** – Audit trail (this audit appended)
- **docs/COMPREHENSIVE_AUDIT.md** – This report

These align the repo with the baseline governance expectations.
