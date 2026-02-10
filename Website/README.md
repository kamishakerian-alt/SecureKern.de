# SecureKern Website (SecureKern.de)

**Status:** ✅ Headless‑CMS + Generator integriert  
**Last Updated:** 2026-02-09  
**Stack:** Eleventy (11ty) + Decap CMS + Vanilla CSS/JS

---

## Überblick

- Inhalte werden als Markdown in `site/pages/` gepflegt (über **Decap CMS** unter `/admin` oder direkt im Repo).
- Der Build erzeugt eine **statische Website** nach `Website/dist/` (Publish‑Ordner für Deployment).
- Header/Footer sind zentral als Templates definiert und damit über alle Seiten **identisch**.

---

## Projektstruktur (wichtig)

```
site/
  _includes/                  # Layout + Partials (Header/Footer)
  _data/                      # Navigation + Site-Config
  admin/                      # Decap CMS (/admin)
  pages/                      # Content-Seiten (Markdown)

Website/
  assets/                     # Global CSS/JS/Images
  dist/                       # Build Output (deploy this)

scripts/                      # Encoding + Migration Helpers
eleventy.config.cjs
package.json
```

---

## Lokal entwickeln

```powershell
npm install

# Terminal 1: Website Dev-Server
npm run dev

# Terminal 2: CMS Local Backend (für /admin Bearbeitung)
npm run cms
```

- Website: `http://localhost:8080/`
- CMS: `http://localhost:8080/admin/`

---

## Build & Deployment

```powershell
npm run build
```

- Output: `Website/dist`
- Netlify/Vercel:
  - Build Command: `npm run build`
  - Publish Directory: `Website/dist`

**Decap CMS auf Netlify aktivieren:**
- Netlify → Site settings → **Identity** aktivieren
- Identity → **Git Gateway** aktivieren
- Danach: `https://IHRE-DOMAIN/admin`

---

## Design System (global)

- Light Theme, max‑`1280px` Container
- Typografie: **Montserrat** (Headings) + **Inter** (Body)
- Accent: **Cyan** (`--accent-cyan`)
- Cards/Sections: konsistente Spacing‑Tokens + „Glass/Soft“ Oberflächen

