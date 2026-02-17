# SecureKern.de – Strategy

## Goal

Deliver and maintain a professional, bilingual (DE/EN) static marketing site for SecureKern GmbH (OT/ICS cybersecurity), editable via Decap CMS where possible, with clear structure, correct links, and governance docs in place.

## Roadmap / Milestones

1. **Stable build & deploy** – Eleventy build and Netlify deploy (dist) working. ✅
2. **Fix EN navigation** – All EN nav links (especially Services) resolve to correct URLs (/en/services/…).
3. **Fix CMS integration** – Navigation/Site settings in Decap point to existing or synced data; media path consistent with site.
4. **SEO baseline** – robots.txt (and optional sitemap) in place.
5. **Link & doc consistency** – DE contact/leistungen links and README publish path corrected; legacy Website/ clarified or removed.

## Decisions Log

| Date       | Decision                                                                      | Rationale                                                                                           |
| ---------- | ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| 2026-02-17 | Use `site/` as Eleventy input and `dist/` as output; Netlify publishes `dist` | Matches current eleventy.config.cjs and netlify.toml.                                               |
| 2026-02-17 | Keep global data in `site/_data` as `.cjs` (site, navigation, meta)           | Allows i18n and dynamic year; Decap must be aligned (e.g. JSON mirrors or separate editable files). |
| 2026-02-17 | Add STRATEGY.md, LEITFADEN.md, docs/BLOCKERS.md, docs/AUDIT_LOG.md            | Align with workspace baseline governance.                                                           |
