# Asset-Audit & Deploy-Readiness

## 1. Logo

| Variante | Pfad | Einbau |
|----------|------|--------|
| **Primary (SK-Shield + Wordmark)** | `/assets/images/brand/logo-full.png` | **Header**: `nav.logo.srcFull` (Fallback: `logo.svg`) |
| **Secondary (Icon only)** | `/assets/images/logo.svg` | Fallback im Header wenn kein logo-full |
| **Reversed (für dunklen Hintergrund)** | `/assets/images/brand/logo-inverted.png` | **Footer**: `nav.logo.srcReversed` (sonst Text „SecureKern“) |
| **Favicon** | `/assets/images/favicons/favicon-32x32.png`, 16x16, apple-touch-icon | **base.njk** `<link rel="icon">` |

- **Vorher fehlend:** Footer nutzte nur Text; Header nutzte nur `logo.svg`.
- **Jetzt:** Navigation enthält `srcFull` und `srcReversed`; Header zeigt Primary, Footer zeigt Reversed-Bild (falls vorhanden).

---

## 2. Icons (Line, Teal #00886B)

| Icon | Pfad | Verwendung |
|------|------|------------|
| shield | `/assets/images/icons/shield.svg` | **Neu** – für Services/Cards (z. B. NIS2, IEC 62443) |
| checklist | `/assets/images/icons/checklist.svg` | **Neu** – Compliance/Checklisten |
| speed | `/assets/images/icons/speed.svg` | **Neu** – Schnelligkeit/Performance |
| expertise | `/assets/images/icons/expertise.svg` | **Neu** – Expertise-Stufen |
| germany | `/assets/images/icons/germany.svg` | **Neu** – DE-Fokus (Flagge) |

- **Vorher:** Nur Font Awesome (z. B. `fa-industry`, `fa-shield-halved`).
- **Jetzt:** Eigene SVGs in `site/assets/images/icons/` (Teal #00886B, line). In den Seiten können diese optional statt Font Awesome genutzt werden.

---

## 3. Partner-Logos

| Partner | Datei | Status |
|---------|--------|--------|
| Claroty | `partners/claroty-logo.svg` | vorhanden |
| Nozomi | `partners/nozomi-logo.svg` | vorhanden |
| Dragos | `partners/dragos-logo.svg` | vorhanden |
| Microsoft | `partners/microsoft-logo.svg` | vorhanden |
| Fortinet | `partners/fortinet-logo.svg` | vorhanden |
| Palo Alto | `partners/palo-alto-logo.svg` | vorhanden |
| Cisco | `partners/cisco-logo.svg` | vorhanden |
| Hirschmann | `partners/hirschmann-logo.svg` | vorhanden |
| **Bosch** | `partners/bosch-logo.svg` | **Neu** (Platzhalter-SVG) |
| **Siemens** | `partners/siemens-logo.svg` | **Neu** (Platzhalter-SVG) |
| **Schneider** | `partners/schneider-logo.svg` | **Neu** (Platzhalter-SVG) |

- **Einbau:** `certifications.html` – neue Kategorie „Industrie & OEM“ mit Bosch, Siemens, Schneider.

---

## 4. Hero & Decorative

| Asset | Pfad | Status |
|-------|------|--------|
| Hero-BG | `/assets/images/visual-assets/hero-industrial.jpg` | **Vorhanden** – Index nutzt es |
| pattern-dots | `visual-assets/pattern-dots.svg` | **Neu** – Navy #003D5B, dezentes Raster |
| divider-wave | `visual-assets/divider-wave.svg` | **Neu** – Teal-Linie für Sektionen |

- Hero bleibt `hero-industrial.jpg`. Für „SCADA Control Room“ später ggf. eigenes Bild ersetzen.
- pattern-dots und divider-wave können in Layouts/Sektionen per CSS oder `<img>` eingebunden werden.

---

## 5. Brand-Farben (CSS)

- **Neu in `main.css`:**
  `--brand-navy: #003D5B;`
  `--brand-teal: #00886B;`
- Bestehende Farben (z. B. `--primary-navy`, `--accent-cyan`) unverändert; neue Assets nutzen Brand-Farben.

---

## 6. Deploy-Readiness

| Punkt | Status |
|-------|--------|
| **Form action** | Kontakt DE/EN: `action` auf jeweilige Seite, `data-netlify="true"`, Honeypot |
| **HTTPS** | `site_local.baseUrl` in `site.cjs`: `https://www.securekern.de` |
| **Canonical** | In **base.njk**: `link rel="canonical"` mit baseUrl |
| **SEO** | Meta Description, **Open Graph** (og:title, og:description, og:url, og:image, og:locale) in base.njk |
| **Adresse** | Kontakt DE/EN nutzen `site_local.address` (Königstraße 10, 70173 Stuttgart) |

---

## 7. Screenshots (alle Seiten, DE + EN)

Nach `npm run preview` und Öffnen von **http://localhost:3000** folgende URLs durchgehen und pro Seite einen Screenshot erstellen (komplette Seite, ggf. gescrollt):

**DE:**
`/`, `/leistungen.html`, `/loesungen.html`, `/ueber-uns.html`, `/team.html`, `/certifications.html`, `/ressourcen.html`, `/blog.html`, `/downloads.html`, `/webinars.html`, `/kontakt.html`, `/impressum.html`, `/datenschutz.html`, `/agb.html`
sowie z. B. `/services/nis2-readiness.html`, `/services/iec-62443.html`.

**EN:**
`/en/`, `/en/services.html`, `/en/solutions.html`, `/en/about.html`, `/en/team.html`, `/en/certifications.html`, `/en/resources.html`, `/en/blog.html`, `/en/downloads.html`, `/en/webinars.html`, `/en/contact.html`, `/en/impressum.html`, `/en/datenschutz.html`, `/en/agb.html`
sowie z. B. `/en/services/nis2-readiness.html`, `/en/services/iec-62443.html`.

---

## Kurz: Was war fehlend, was wurde eingebaut?

- **Fehlend/vorher:** Footer-Logo (Bild), Primary-Logo (Wordmark) im Header, Icons (shield, checklist, speed, expertise, germany), Bosch/Siemens/Schneider auf Zertifizierungen, pattern-dots + divider-wave, Netlify-Form + Adresse/Kontakt-Daten, OG-Tags.
- **Neu/angepasst:**
  - Logo: Header `srcFull`, Footer `srcReversed`.
  - Icons: 5 SVGs unter `site/assets/images/icons/`.
  - Partner: 3 Platzhalter-SVGs + neue Kategorie auf certifications.
  - Decorative: pattern-dots.svg, divider-wave.svg.
  - Kontakt: Form Netlify-ready, Adresse aus `site_local`.
  - SEO: Canonical + Open Graph in base.njk.
  - CSS: `.footer-logo-img`, `.hidden` (Honeypot), Brand-Farben.

Die Site ist damit **branding-konform und deploy-ready**; Screenshots aller Seiten (DE + EN) wie oben manuell nach Build/Serve erstellen.
