# Assets used (exact paths)

All paths relative to `site/assets/`. These files are referenced in layouts, pages, CSS, or `_data/navigation.cjs`.

## CSS & JS
- `css/main.css`
- `js/main.js`

## Brand & logo (SVG aus `images/brand/`)

**Aktuell verwendete Assets** (hochgeladen in `site/assets/images/brand/`):

| Datei | Verwendung |
|-------|------------|
| `logo-primary.svg` | Nav (Voll-Logo), Favicon |
| `Symbol-primary.svg` | Nav als Symbol + Text „SecureKern“ |
| `logo-primary-inverted.svg` | Hero (auf dunklem BG), Footer |
| `Symbol-Inverted.svg` | Optional (z. B. für dunkle Bereiche nur Symbol) |

**Im Layout genutzt:**  
- Nav: `Symbol-primary.svg` + Text **oder** `logo-primary.svg` (Voll-Logo).  
- Hero: `logo-primary-inverted.svg` (400px, zentral).  
- Footer: `logo-primary-inverted.svg` (300px, mittig).  
- Favicon: `logo-primary.svg` (SVG, type="image/svg+xml").

**Hinweis:** Das Skript `scripts/logo-white-to-transparent.mjs` und der Ordner `processed/` werden für Brand nicht mehr benötigt, sofern nur diese SVGs genutzt werden.

### SVG (bereits umgesetzt)

**Warum SVG:** Skalierbar (scharf auf Retina/4K), kleine Dateigröße, Transparenz, SEO-freundlich. Kein automatisches Tracing durch den Agent – das Ergebnis wäre oft unsauber.

**Manuell so vorgehen:**

1. **Vektor-Quelle nutzen:** Wenn du ein Logo in Illustrator/Figma/Sketch hast, exportiere direkt als SVG („Export as SVG“ / „Save as SVG“). Das ist die beste Qualität.
2. **PNG → SVG nur mit echtem Vektor-Tool:**  
   - **Adobe Illustrator:** Bild einfügen → Objekt → Bildnachzeichnung → Erweitern, dann manuell Pfade nachziehen/vereinfachen.  
   - **Inkscape (kostenlos):** Bild einfügen → Pfad → Bitmap nachzeichnen (Schwellenwert anpassen), dann Pfade bereinigen („Vereinfachen“).  
   - **Figma:** PNG als Referenz einlegen, mit Vektor-Werkzeugen (Pen/Shapes) neu zeichnen – sauberer als Auto-Trace.
3. **SVG einbinden:**  
   - Datei z. B. `site/assets/images/brand/logo.svg` (und ggf. `logo-symbol.svg`, `logo-inverted.svg`) ablegen.  
   - In `_data/navigation.cjs`: `logo.src`, `logo.symbolSrc`, `srcReversed` auf `.svg` zeigen lassen.  
   - In `site/pages/index.md`: Hero-Logo auf SVG umstellen.  
   - CSS bleibt gültig (`width`/`max-width`, `height: auto`, `object-fit: contain` funktionieren mit SVG).
4. **Dark Mode / Invert:** Für Footer/Hero auf dunklem Grund eine invertierte SVG-Variante oder CSS `filter: invert(1)` auf der hellen SVG-Variante nutzen (wie bereits bei Footer-PNG).

Wenn du die SVG-Dateien hast, können die Referenzen in Navigation, Hero und Footer einmalig auf die neuen Pfade umgestellt werden.

## Favicon
- `images/brand/sekurekern-main.png` (180×180, einziger Favicon)

## Flags
- `images/flags/de.svg`
- `images/flags/gb.svg`

## Icons (value/service cards, index, layouts)
- `images/icons/shield.svg`
- `images/icons/checklist.svg`
- `images/icons/speed.svg`
- `images/icons/expertise.svg`
- `images/icons/germany.svg`

## Partners (certifications + some pages use PNG, certifications use SVG for Bosch, Siemens, Schneider)
- `images/partners/bosch-logo.png`
- `images/partners/bosch-logo.svg`
- `images/partners/siemens-logo.png`
- `images/partners/siemens-logo.svg`
- `images/partners/schneider-logo.png`
- `images/partners/schneider-logo.svg`
- `images/partners/claroty-logo.png`
- `images/partners/nozomi-logo.png`
- `images/partners/dragos-logo.png`
- `images/partners/fortinet-logo.png`
- `images/partners/palo-alto-logo.png`
- `images/partners/cisco-logo.png`
- `images/partners/hirschmann-logo.png`

## Team
- `images/team/founder.jpg`
- `images/team/consultant-1.jpg`
- `images/team/consultant-2.jpg`
- `images/team/expert-2.jpg`
- `images/team/expert-3.jpg`

## Visual assets
- `images/visual-assets/blog-post-1.jpg` … `blog-post-6.jpg`
- `images/visual-assets/hero-industrial.jpg`
- `images/visual-assets/hero-bg.jpg`
- `images/visual-assets/hero-scada.webp`
- `images/visual-assets/pattern-dots.svg`
- `images/visual-assets/divider-wave.svg`
- `images/visual-assets/network-abstract.jpg` (CSS hero)
- `images/visual-assets/factory-floor.jpg` (CSS)
- `images/visual-assets/og-image.jpg` (Open Graph)

## Webinars
- `images/webinars/webinar-nis2.jpg`
- `images/webinars/webinar-segmentation.jpg`
- `images/webinars/webinar-incident-response.jpg`
- `images/webinars/webinar-automotive.jpg`
- `images/webinars/webinar-kritis.jpg`
- `images/webinars/webinar-ai.jpg`

## Root images (solutions/industry heroes)
- `images/automotive-factory.jpg`
- `images/chemical-plant.jpg`
- `images/energy-control-room.jpg`

---

**Referenced but missing on disk** (add or replace with correct files):
- `images/visual-assets/compliance-check.jpg`
- `images/visual-assets/industrial-network.jpg`
- `images/visual-assets/hacker-hoodie.jpg`
- `images/visual-assets/server-room-dark.jpg`
- `images/icons/icon-check.svg`, `icon-awareness.svg`, `icon-fundamentals.svg`, `icon-incident-response.svg`, `icon-legacy.svg`, `icon-protocol.svg`, `icon-geopolitics.svg`, `icon-availability.svg`, `icon-supply-chain.svg`, `icon-compliance.svg`

Anything under `site/assets` not listed above is unused and can be moved to `site/assets/Not Used`.
