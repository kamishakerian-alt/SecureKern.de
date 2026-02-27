# SecureKern.de – Leitfaden (Setup, Run, Test, Conventions)

## Setup

```bash
git clone <repo-url> SecureKern.de   # z. B. git@github.com:user/SecureKern.de.git
cd SecureKern.de
npm install
# Optional bei Peer-Dependency-Konflikten: npm install --legacy-peer-deps
# Prüfen: npm --version && node --version   # Node 18+ LTS empfohlen
```

- **Node:** LTS 18+ (z. B. 20/22). Unter Windows ggf. NVM nutzen für saubere Versionen; älteres Node kann EPERM/Compatibility-Probleme fördern.
- **Local CMS (optional):** `npm run cms`, dann `/admin/` öffnen (z. B. mit `npm run dev`). Nur lokal nutzen – nicht öffentlich exponieren.
- **Proxy/VPN:** Bei Firmennetz/Proxy: `npm config set proxy http://proxy:port` setzen, falls `npm install` hängt. Bei Problemen: `node_modules/` und `.npm/` löschen und erneut installieren.

## Run

- **Build (Standard):** `npm run build` → nur Eleventy `--incremental`. Kein Clean, kein Retry, kein Kill. Überschreibt nur, was neu ist – wie VS Code, ohne Drama.
- **Nach Änderungen:** build + serve vorschlagen.
- **Serve:** `npm run serve` → http://localhost:3000. Dev mit Watch: `npm run dev` → http://localhost:8080.
- **CI/Netlify:** `npm run build:ci`. Ohne Clean: `npm run build:no-clean`. Bei dauerhaft gesperrtem Ordner: `npm run build:preview` (Output: `Website_preview/`).
- **Logo:** Nav 250px (Symbol + Text „SecureKern“ wenn `processed/logo-symbol.png` vorhanden, sonst Voll-Logo), Hero 400px zentral, Footer 300px mittig. Transparenz: `node scripts/logo-white-to-transparent.mjs` (Weiß→transparent). Wenn PNG nicht sauber: neues PNG mit Alpha liefern oder SVG empfohlen.

## Troubleshooting (Windows: EPERM / ENOTEMPTY)

**Was passiert?** Der Standard-Build macht kein Clean (nur incremental, overwrite). Wenn Locks bleiben, kopiert Eleventy `site/assets` per Passthrough nach `Website/assets`. Unter Windows können Dateien in `Website/` gesperrt sein (z. B. durch `npx serve Website`, Browser, Cursor/VS Code, Antivirus). Dann: **ENOTEMPTY** beim Löschen, **EPERM** beim Kopieren (z. B. `main.css`). HTML-Seiten werden trotzdem geschrieben, aber Assets (CSS, Bilder) fehlen → unvollständiger Build.

**Sofortmaßnahmen:**

1. **Prozesse stoppen:** Alles beenden, das `Website/` nutzt: Terminal mit `npm run serve` (Ctrl+C), Browser-Tabs mit localhost, ggf. Editor-Tabs mit Dateien aus `Website/`. Task-Manager (Strg+Shift+Esc): nach `node.exe` suchen und beenden.
2. **Build erneut:** `npm run build`. Wenn es wieder scheitert:
3. **Build ohne Clean:** `npm run build:no-clean` – überspringt das Löschen; Eleventy überschreibt geänderte Dateien, Assets werden oft trotzdem aktualisiert.
4. **Ordner manuell leeren:** In Explorer `Website/` öffnen, Inhalt (oder den Ordner) manuell löschen, danach `npm run build`.

**Langfristig:** WSL2 nutzen (Build im Linux-Subsystem, weniger File-Locks). Oder vor jedem Build den lokalen Server stoppen.

## Test

- Nach Änderungen: `npm run build` muss ohne Fehler durchlaufen. Optional: Ausgabegröße prüfen (z. B. Ordner `Website/`) für grobe Plausibilität.
- **Manuell:** EN-Nav „Services“-Dropdown (Links nach `/en/services/…`), DE Kontakt/CTA-Links, `/admin/` falls CMS genutzt. Responsiveness prüfen (Mobile-First). Bei veralteter Anzeige: Hard-Reload (Strg+F5).
- **Automatisiert (optional):** Link-Checker oder E2E (z. B. Cypress) für wiederholbare Tests; siehe `scripts/link-check.mjs` falls vorhanden.

## Conventions

- **Source:** Alle Inhalte und Templates unter `site/`.
- **Data:** Globale Daten in `site/_data/*.cjs` (site, navigation, meta). In Layouts `site_local` und `nav` nutzen (sprachabhängig).
- **Permalinks:** DE im Root (z. B. `/leistungen.html`, `/kontakt.html`), EN unter `/en/` (z. B. `/en/services.html`, `/en/services/nis2-readiness.html`). Slugs in Kebab-Case.
- **Assets:** `site/assets` (CSS, JS, Bilder) werden per Passthrough nach `Website/assets` kopiert.
- **Publish:** Netlify (oder anderer Host): Build-Befehl `npm run build`, Publish-Verzeichnis **Website**. Für Production: `NODE_ENV=production` setzen (Netlify macht das automatisch).
- **Single source of truth:** Nur `site/` und Config im Repo-Root werden getrackt; Build-Output `Website/` ist generiert und wird nicht committed.
- **Meta/SEO:** YAML-Frontmatter in Markdown für Titel, Description, Tags (z. B. `tags: nis2`) nutzen.

## Erweiterungen & Best Practices

- **Security:** HTTPS auf Netlify aktiv lassen; keine sensiblen Daten (API-Keys, Passwörter) in Git – `.env` ist in `.gitignore`. Optional: CSS/JS minifizieren (Eleventy-Plugins).
- **Skalierbarkeit:** Bei mehr Sprachen i18n-Plugins oder bestehende `_data`-Struktur (DE/EN) erweitern.
- **Debugging:** `npx @11ty/eleventy --dryrun` für Tests ohne Schreiben in `Website/`. Bei großen Bildern/Logos: Sharp-Plugin (bereits in devDependencies) für Optimierung nutzen.
- **CI/CD:** GitHub Actions o. ä. für Build on Push einrichten; auf Netlify erfolgt Build automatisch beim Deploy. Für DSGVO-konforme Hosting-Optionen: EU-Server/Region bei Netlify oder Anbieter wählen.
