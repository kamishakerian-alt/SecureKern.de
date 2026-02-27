# SecureKern.de – Vollständiges Asset-Audit

**Stand:** Aus Codebasis ausgelesen. Nur Liste + fehlend/optimierbar. Kein Code.

---

## 1. Alle verwendeten Assets (exakte Pfade unter `site/`)

Alle Pfade relativ zu `site/`; im Build erscheinen sie unter `/assets/` bzw. wie angegeben.

### CSS & JS (global, jede Page)
| Pfad | Verwendung |
|------|------------|
| `site/assets/css/main.css` | Einziges Stylesheet, alle Pages |
| `site/assets/js/main.js` | Einziges Script, alle Pages |

### Brand & Logo (Header/Footer/Hero, DE + EN)
| Pfad | Verwendung |
|------|------------|
| `site/assets/images/brand/processed/logo-nav.png` | Nav: Voll-Logo (Fallback), 250px |
| `site/assets/images/brand/processed/logo-symbol.png` | Nav: Symbol + Text „SecureKern“ |
| `site/assets/images/brand/processed/logo-hero.png` | Hero Home (DE), 400px |
| `site/assets/images/brand/processed/logo-footer.png` | Footer, 300px, invertiert |
| `site/assets/images/brand/sekurekern-main.png` | Favicon 180×180 (base.njk) |

### Favicon / PWA (global)
| Pfad | Verwendung |
|------|------------|
| `site/assets/images/brand/sekurekern-main.png` | `<link rel="icon" sizes="180x180">` – nur eine Größe |

### Flags (Header-Sprachumschalter, DE + EN)
| Pfad | Verwendung |
|------|------------|
| `site/assets/images/flags/de.svg` | DE-Flagge |
| `site/assets/images/flags/gb.svg` | EN-Flagge |

### Icons (Value/Service-Cards, Listen, Branchen)
| Pfad | Verwendung |
|------|------------|
| `site/assets/images/icons/shield.svg` | Home: Value + NIS2-Card |
| `site/assets/images/icons/checklist.svg` | Home: Value + IEC-Card |
| `site/assets/images/icons/speed.svg` | Home: Value-Card |
| `site/assets/images/icons/expertise.svg` | Home: Value + OT-MDR-Card |
| `site/assets/images/icons/germany.svg` | Home: OT-Netzwerke-Card |
| `site/assets/images/icons/icon-check.svg` | Manufacturing, Energy, Risk-Training: Listen |
| `site/assets/images/icons/icon-availability.svg` | Manufacturing |
| `site/assets/images/icons/icon-supply-chain.svg` | Manufacturing |
| `site/assets/images/icons/icon-compliance.svg` | Manufacturing |
| `site/assets/images/icons/icon-legacy.svg` | Energy |
| `site/assets/images/icons/icon-protocol.svg` | Energy |
| `site/assets/images/icons/icon-geopolitics.svg` | Energy |
| `site/assets/images/icons/icon-awareness.svg` | Services: Risk-Training |
| `site/assets/images/icons/icon-fundamentals.svg` | Services: Risk-Training |
| `site/assets/images/icons/icon-incident-response.svg` | Services: Risk-Training |

### Visual Assets (Hero, Section-BGs, Decoration, OG)
| Pfad | Verwendung |
|------|------------|
| `site/assets/images/visual-assets/hero-scada.webp` | Home Hero-Hintergrund |
| `site/assets/images/visual-assets/hero-bg.jpg` | Ressourcen/Blog Hero |
| `site/assets/images/visual-assets/pattern-dots.svg` | Home Section-Pattern |
| `site/assets/images/visual-assets/divider-wave.svg` | Home Trennlinie |
| `site/assets/images/visual-assets/network-abstract.jpg` | CSS: Hintergrund einer Section |
| `site/assets/images/visual-assets/factory-floor.jpg` | CSS: Hintergrund einer Section |
| `site/assets/images/visual-assets/og-image.jpg` | Open Graph / Twitter Card (alle Pages) |
| `site/assets/images/visual-assets/compliance-check.jpg` | Leistungen, EN Services |
| `site/assets/images/visual-assets/industrial-network.jpg` | Leistungen, EN Services |
| `site/assets/images/visual-assets/hacker-hoodie.jpg` | Leistungen, EN Services |
| `site/assets/images/visual-assets/server-room-dark.jpg` | Leistungen, EN Services |
| `site/assets/images/visual-assets/blog-post-1.jpg` … `blog-post-6.jpg` | Blog (DE), ggf. EN |

### Partner-Logos (Zertifizierungen)
| Pfad | Verwendung |
|------|------------|
| `site/assets/images/partners/bosch-logo.png` | Certifications |
| `site/assets/images/partners/bosch-logo.svg` | Certifications |
| `site/assets/images/partners/siemens-logo.png` | Certifications |
| `site/assets/images/partners/siemens-logo.svg` | Certifications |
| `site/assets/images/partners/schneider-logo.png` | Certifications |
| `site/assets/images/partners/schneider-logo.svg` | Certifications |
| `site/assets/images/partners/claroty-logo.png` | Certifications |
| `site/assets/images/partners/nozomi-logo.png` | Certifications |
| `site/assets/images/partners/dragos-logo.png` | Certifications |
| `site/assets/images/partners/fortinet-logo.png` | Certifications |
| `site/assets/images/partners/palo-alto-logo.png` | Certifications |
| `site/assets/images/partners/cisco-logo.png` | Certifications |
| `site/assets/images/partners/hirschmann-logo.png` | Certifications |

### Team (Über uns, Team)
| Pfad | Verwendung |
|------|------------|
| `site/assets/images/team/founder.jpg` | Über uns, Team, EN Team |
| `site/assets/images/team/expert-2.jpg` | Über uns |
| `site/assets/images/team/expert-3.jpg` | Über uns |
| `site/assets/images/team/consultant-1.jpg` | Team, EN Team |
| `site/assets/images/team/consultant-2.jpg` | Team, EN Team |

### Webinare
| Pfad | Verwendung |
|------|------------|
| `site/assets/images/webinars/webinar-nis2.jpg` | Webinare DE + EN |
| `site/assets/images/webinars/webinar-segmentation.jpg` | Webinare DE + EN |
| `site/assets/images/webinars/webinar-incident-response.jpg` | Webinare DE + EN |
| `site/assets/images/webinars/webinar-automotive.jpg` | Webinare DE + EN |
| `site/assets/images/webinars/webinar-kritis.jpg` | Webinare DE + EN |
| `site/assets/images/webinars/webinar-ai.jpg` | Webinare DE + EN |

### Branchen/Solutions (Hero-BGs)
| Pfad | Verwendung |
|------|------------|
| `site/assets/images/automotive-factory.jpg` | Solutions: Automotive |
| `site/assets/images/chemical-plant.jpg` | Chemicals, Solutions: Chemical |
| `site/assets/images/energy-control-room.jpg` | Solutions: Energy |

---

## 2. Pro Page: Welche Assets werden gebraucht?

- **Alle Pages (Layout):**  
  `main.css`, `main.js`, Favicon (`sekurekern-main.png`), Nav-Logo (`processed/logo-nav.png`, `processed/logo-symbol.png`), Footer-Logo (`processed/logo-footer.png`), Flags (`de.svg`, `gb.svg`), OG-Image (`og-image.jpg`).

- **Home (DE):**  
  Zusätzlich: `hero-scada.webp`, `processed/logo-hero.png`, `pattern-dots.svg`, `shield.svg`, `checklist.svg`, `speed.svg`, `expertise.svg`, `germany.svg`, `divider-wave.svg`.

- **Leistungen (DE):**  
  Zusätzlich: `compliance-check.jpg`, `industrial-network.jpg`, `hacker-hoodie.jpg`, `server-room-dark.jpg`.

- **Kontakt (DE):**  
  Keine weiteren Bild-Assets.

- **Über uns / Team (DE):**  
  `founder.jpg`, `expert-2.jpg`, `expert-3.jpg`, `consultant-1.jpg`, `consultant-2.jpg`.

- **Zertifizierungen:**  
  Alle Partner-Logos (PNG + SVG wo referenziert).

- **Ressourcen/Blog:**  
  `hero-bg.jpg`; Blog: `blog-post-1.jpg` … `blog-post-6.jpg`.

- **Webinare (DE + EN):**  
  `webinar-nis2.jpg`, `webinar-segmentation.jpg`, `webinar-incident-response.jpg`, `webinar-automotive.jpg`, `webinar-kritis.jpg`, `webinar-ai.jpg`.

- **EN-Version (Services, Team, Webinars):**  
  Gleiche Bild-Assets wie DE (gleiche Pfade); nur Leistungen-Section-Bilder wie DE.

- **Manufacturing:**  
  `icon-availability.svg`, `icon-supply-chain.svg`, `icon-compliance.svg`, `icon-check.svg`.

- **Energy:**  
  `icon-legacy.svg`, `icon-protocol.svg`, `icon-geopolitics.svg`, `icon-check.svg`.

- **Chemicals:**  
  `chemical-plant.jpg`.

- **Solutions (Automotive / Chemical / Energy):**  
  `automotive-factory.jpg`, `chemical-plant.jpg`, `energy-control-room.jpg`.

- **Risk-Training (Service):**  
  `icon-awareness.svg`, `icon-fundamentals.svg`, `icon-incident-response.svg`, `icon-check.svg`.

---

## 3. Was fehlt oder ist nicht optimal

### Fehlend (referenziert, nicht auf Disk)
- `site/assets/images/visual-assets/compliance-check.jpg`
- `site/assets/images/visual-assets/industrial-network.jpg`
- `site/assets/images/visual-assets/hacker-hoodie.jpg`
- `site/assets/images/visual-assets/server-room-dark.jpg`
- `site/assets/images/icons/icon-check.svg`
- `site/assets/images/icons/icon-awareness.svg`
- `site/assets/images/icons/icon-fundamentals.svg`
- `site/assets/images/icons/icon-incident-response.svg`
- `site/assets/images/icons/icon-legacy.svg`
- `site/assets/images/icons/icon-protocol.svg`
- `site/assets/images/icons/icon-geopolitics.svg`
- `site/assets/images/icons/icon-availability.svg`
- `site/assets/images/icons/icon-supply-chain.svg`
- `site/assets/images/icons/icon-compliance.svg`

### Nicht optimal
- **Logo nur PNG:** Keine SVG-Varianten für Nav/Symbol/Hero/Footer → nicht skalierbar auf Retina/4K; Transparenz abhängig von PNG-Alpha.
- **Favicon:** Nur eine Größe (180×180); keine 32×32, 16×16, apple-touch-icon → nicht best-in-class.
- **Hero-BGs:** Keine Mobile-Varianten (z. B. schmalere/schnellere Versionen für Viewport & LCP).
- **OG-Image:** Ein globales `og-image.jpg` für alle Pages; keine seiten-spezifischen OG-Bilder für bessere Social-Preview.
- **Partner-Logos:** Teilweise nur PNG; wo SVG genutzt wird gut, Rest nicht konsistent skalierbar.
- **Blog/Webinar-Bilder:** Keine expliziten Responsive-/Mobile-Varianten oder `srcset`.
- **Unkomprimierte/schwere PNGs:** Processed-Logos und große PNGs nicht durchgehend komprimiert (z. B. TinyPNG/AVIF/WebP wo sinnvoll).
- **CSS-BG-Pfad:** `url('../images/visual-assets/factory-floor.jpg')` relativ aus CSS – von Build-Output abhängig; besser absoluter Pfad `/assets/images/...` für Konsistenz.

---

## 4. Asset-Liste für alle Pages: Pfad, Größe, Format, Transparenz

Ziel: Eine Liste dessen, was du für 100 % professionell brauchst – mit Anforderung Format (PNG/SVG), Größe, Transparenz.

### Brand & Logo
| Asset | Pfad (unter site/assets/images) | Größe (Display) | Format | Transparenz |
|------|---------------------------------|------------------|--------|-------------|
| Logo Nav | brand/processed/logo-nav.png | 250px Breite | PNG oder SVG | Ja (Alpha) |
| Logo Symbol | brand/processed/logo-symbol.png | 44px Höhe (Nav), 96px max | PNG oder SVG | Ja |
| Logo Hero | brand/processed/logo-hero.png | 400px Breite | PNG oder SVG | Ja |
| Logo Footer | brand/processed/logo-footer.png | 300px Breite | PNG oder SVG | Ja (invertiert) |
| Favicon | brand/sekurekern-main.png | 180×180 (aktuell) | PNG | Ja |
| Favicon 32 | brand/favicon-32x32.png | 32×32 | PNG | Ja |
| Favicon 16 | brand/favicon-16x16.png | 16×16 | PNG | Ja |
| Apple Touch | brand/apple-touch-icon.png | 180×180 | PNG | Nein (opak) |

### Symbole & Icons (alle SVG für Skalierbarkeit)
| Asset | Pfad | Größe | Format | Transparenz |
|------|------|-------|--------|-------------|
| Shield | icons/shield.svg | beliebig | SVG | N/A |
| Checklist | icons/checklist.svg | beliebig | SVG | N/A |
| Speed | icons/speed.svg | beliebig | SVG | N/A |
| Expertise | icons/expertise.svg | beliebig | SVG | N/A |
| Germany | icons/germany.svg | beliebig | SVG | N/A |
| icon-check | icons/icon-check.svg | beliebig | SVG | N/A |
| icon-availability | icons/icon-availability.svg | beliebig | SVG | N/A |
| icon-supply-chain | icons/icon-supply-chain.svg | beliebig | SVG | N/A |
| icon-compliance | icons/icon-compliance.svg | beliebig | SVG | N/A |
| icon-legacy | icons/icon-legacy.svg | beliebig | SVG | N/A |
| icon-protocol | icons/icon-protocol.svg | beliebig | SVG | N/A |
| icon-geopolitics | icons/icon-geopolitics.svg | beliebig | SVG | N/A |
| icon-awareness | icons/icon-awareness.svg | beliebig | SVG | N/A |
| icon-fundamentals | icons/icon-fundamentals.svg | beliebig | SVG | N/A |
| icon-incident-response | icons/icon-incident-response.svg | beliebig | SVG | N/A |

### Flags
| Asset | Pfad | Format | Transparenz |
|------|------|--------|-------------|
| DE | flags/de.svg | SVG | N/A |
| GB | flags/gb.svg | SVG | N/A |

### Hero-BGs
| Asset | Pfad | Größe (empf.) | Format | Mobile-Variante |
|------|------|----------------|--------|------------------|
| Hero Home | visual-assets/hero-scada.webp | z. B. 1920×1080 | WebP | hero-scada-mobile.webp (z. B. 768px breit) |
| Hero Blog/Ressourcen | visual-assets/hero-bg.jpg | z. B. 1920×800 | JPG/WebP | optional |
| Solutions Automotive | automotive-factory.jpg | 1920×800 | JPG/WebP | optional |
| Solutions Chemical | chemical-plant.jpg | 1920×800 | JPG/WebP | optional |
| Solutions Energy | energy-control-room.jpg | 1920×800 | JPG/WebP | optional |

### Section-Bilder (Leistungen/Services)
| Asset | Pfad | Format | Status |
|------|------|--------|--------|
| compliance-check | visual-assets/compliance-check.jpg | JPG/WebP | fehlt |
| industrial-network | visual-assets/industrial-network.jpg | JPG/WebP | fehlt |
| hacker-hoodie | visual-assets/hacker-hoodie.jpg | JPG/WebP | fehlt |
| server-room-dark | visual-assets/server-room-dark.jpg | JPG/WebP | fehlt |

### Decoration / UX
| Asset | Pfad | Format |
|------|------|--------|
| pattern-dots | visual-assets/pattern-dots.svg | SVG |
| divider-wave | visual-assets/divider-wave.svg | SVG |
| network-abstract (CSS) | visual-assets/network-abstract.jpg | JPG |
| factory-floor (CSS) | visual-assets/factory-floor.jpg | JPG |

### OG / Social
| Asset | Pfad | Größe | Format |
|------|------|-------|--------|
| og-image (global) | visual-assets/og-image.jpg | 1200×630 | JPG/PNG |
| og-image pro Page | optional: z. B. og-about.jpg, og-contact.jpg | 1200×630 | JPG/PNG |

### Partner
| Asset | Pfad | Format (empf.) |
|------|------|-----------------|
| Bosch, Siemens, Schneider | partners/*.svg | SVG (priorität) + PNG Fallback |
| Claroty, Nozomi, Dragos, Fortinet, Palo Alto, Cisco, Hirschmann | partners/*.png | PNG; SVG wenn verfügbar |

### Team
| Asset | Pfad | Format | Größe (empf.) |
|------|------|--------|----------------|
| founder, expert-2, expert-3, consultant-1, consultant-2 | team/*.jpg | JPG/WebP | z. B. 400×400 oder 600×600, komprimiert |

### Blog
| Asset | Pfad | Format |
|------|------|--------|
| blog-post-1 … 6 | visual-assets/blog-post-1.jpg … 6.jpg | JPG/WebP, komprimiert |

### Webinare
| Asset | Pfad | Format |
|------|------|--------|
| webinar-nis2, segmentation, incident-response, automotive, kritis, ai | webinars/*.jpg | JPG/WebP, komprimiert |

### CSS & JS
| Asset | Pfad | Anmerkung |
|------|------|-----------|
| main.css | assets/css/main.css | Minified/optimiert für Prod |
| main.js | assets/js/main.js | Minified/optimiert für Prod |

---

## 5. Was noch fehlt und was dazu nehmen für 100 % professionell / Best-in-Class

### Noch fehlen (inhaltlich)
- Alle 9 Icons: icon-check, icon-awareness, icon-fundamentals, icon-incident-response, icon-legacy, icon-protocol, icon-geopolitics, icon-availability, icon-supply-chain, icon-compliance.
- Vier Section-Bilder: compliance-check, industrial-network, hacker-hoodie, server-room-dark.
- Favicon-Set: 32×32, 16×16, apple-touch-icon (180×180).

### Was dazu nehmen für Top-Benchmark
- **Logo:** SVG-Varianten (logo-nav, logo-symbol, logo-hero, logo-footer) für scharfe Darstellung auf allen DPI; PNG als Fallback.
- **Favicon:** Vollständiges Set (16, 32, 180) + ggf. SVG-Favicon für moderne Browser.
- **Hero/BGs:** Mobile-Varianten (kleinere Auflösung/WebP) und `srcset`/`picture` für LCP und Mobile-Performance.
- **OG:** Pro wichtiger Page ein eigenes og-image (Home, Leistungen, Kontakt, Über uns, EN-Entsprechungen).
- **Partner:** Wo möglich alle als SVG; einheitliche Höhe/Breite in CSS.
- **Bilder allgemein:** WebP/AVIF wo sinnvoll; Komprimierung (TinyPNG/Sharp); klare Max-Dimensionen.
- **CSS/JS:** Production-Build mit Minify; ggf. Critical CSS für Above-the-fold.
- **Accessibility:** Konsistente alt-Texte; keine rein dekorativen Bilder ohne aria-hidden/alt="".
- **Lazy Loading:** Für Bilder unter dem Fold (Blog, Webinare, Team, Partner) explizit `loading="lazy"` wo noch nicht gesetzt.

Damit ist die Website asset-seitig auf 100 % professionell, transparent, skalierbar und mobil-optimiert ausgerichtet – ohne Bullshit, nur Liste und Lücken.
