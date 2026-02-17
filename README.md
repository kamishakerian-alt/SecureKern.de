# SecureKern Website

> Professionelle OT-Cybersicherheit für kritische Infrastrukturen

## 🎯 Übersicht

Die SecureKern Website ist eine moderne, **headless CMS-gesteuerte** statische Website, die mit Eleventy gebaut und über Decap CMS verwaltet wird.

### Technologie-Stack

- **Static Site Generator**: [Eleventy](https://www.11ty.dev/) (11ty)
- **Headless CMS**: [Decap CMS](https://decapcms.org/) (ehemals Netlify CMS)
- **Template Engine**: Nunjucks
- **Styling**: Custom CSS
- **JavaScript**: Vanilla JS mit i18n-Unterstützung
- **Deployment**: Statische HTML-Dateien (build output → `dist/`)

## ✨ Features

- ✅ **Headless CMS Integration** - Alle Inhalte über CMS verwaltbar
- ✅ **Dynamische Content-Generierung** - Automatische Seiten aus Collections
- ✅ **Mehrsprachig** - Deutsch/Englisch Umschaltung
- ✅ **Responsive Design** - Optimiert für alle Geräte
- ✅ **SEO-Optimiert** - Meta-Tags, Sitemap, Robots.txt
- ✅ **Schnelle Performance** - Statische Seiten, optimierte Assets
- ✅ **Git-basiertes Backend** - Versionskontrolle für alle Inhalte
- ✅ **Editorial Workflow** - Draft → Review → Published

## 🚀 Quick Start

### Installation

```bash
# Dependencies installieren
npm install

# CMS-Server starten (lokal)
npm run cms

# Entwicklungsserver starten
npm run dev

# Website bauen
npm run build
```

### Zugriff

- **Website**: http://localhost:8080
- **CMS**: http://localhost:8080/admin/

## 📁 Projektstruktur

```
SecureKern.de/
├── site/                   # Source-Dateien
│   ├── admin/             # CMS-Konfiguration
│   ├── pages/             # Content-Seiten
│   ├── team/              # Team-Mitglieder
│   ├── webinars/          # Webinar-Inhalte
│   ├── _includes/         # Templates & Komponenten
│   └── _data/             # Globale Daten
├── dist/
│   ├── assets/            # CSS, JS, Images
│   └── (generated files)  # Build-Output (generiert)
├── eleventy.config.cjs    # Eleventy-Konfiguration
├── package.json           # Dependencies & Scripts
└── netlify.toml           # Deployment-Config
```

## 📝 Content Management

### CMS Verwenden

1. **Lokal**: `npm run cms` und zu `/admin/` navigieren
2. **Produktion**: `https://www.securekern.de/admin/`

### Content-Typen

- **Hauptseiten** - Statische Seiten (Home, Über uns, Kontakt)
- **Leistungen** - Service-Angebote mit Kategorien
- **Branchen-Lösungen** - Branchenspezifische Lösungen
- **Blog & Ressourcen** - Blog-Beiträge mit Tags
- **Webinare** - Webinar-Verwaltung mit Status
- **Team** - Team-Mitglieder mit Profilen

Siehe [CMS Integration Guide](./CMS_INTEGRATION_GUIDE.md) für Details.

## 🔧 Entwicklung

### NPM Scripts

```bash
npm run build          # Production Build
npm run dev            # Entwicklungsserver mit Live-Reload
npm run cms            # CMS-Server lokal starten
```

### Neue Seite erstellen

#### Option 1: Via CMS (Empfohlen)
1. Zu `/admin/` navigieren
2. Content-Typ wählen
3. "New [Type]" klicken
4. Felder ausfüllen & speichern

#### Option 2: Manuell
1. Neue `.md`-Datei in entsprechendem Ordner erstellen
2. Frontmatter hinzufügen
3. Inhalt schreiben
4. Build ausführen

Beispiel Frontmatter:
```markdown
---
layout: layouts/base.njk
title: "Meine Seite"
description: "Beschreibung"
permalink: "/meine-seite.html"
---

Inhalt hier...
```

### Komponenten

Wiederverwendbare Komponenten in `site/_includes/partials/`:

- `header.njk` - Site-Header mit Navigation
- `footer.njk` - Site-Footer
- `services-grid.njk` - Service-Karten-Grid
- `solutions-grid.njk` - Lösungs-Grid
- `blog-posts-grid.njk` - Blog-Beiträge
- `team-grid.njk` - Team-Mitglieder
- `webinars-list.njk` - Webinar-Liste

Verwendung:
```nunjucks
{% include "partials/services-grid.njk" %}
```

### Layouts

Template-Layouts in `site/_includes/layouts/`:

- `base.njk` - Basis-Layout (Header/Footer)
- `service.njk` - Service-Seiten
- `solution.njk` - Lösungs-Seiten
- `blog-post.njk` - Blog-Beiträge

## 🎨 Styling

CSS-Dateien in `dist/assets/css/`:

- `main.css` - Haupt-Stylesheet

## 🌐 Mehrsprachigkeit

Die Website unterstützt Deutsch und Englisch:

- Sprach-Toggle im Header
- Übersetzungen via `data-i18n` Attribute
- Sprachdaten in `main.js`

## 🔍 SEO

- ✅ Meta-Tags (Title, Description)
- ✅ Canonical URLs
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Open Graph Tags (vorbereitet)
- ✅ Semantisches HTML

## 🚢 Deployment

### Netlify (Empfohlen)

1. Repository mit Netlify verbinden
2. Build-Einstellungen:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
3. Deploy!

### Manuell

```bash
npm run build
# dist/ Inhalt auf Server hochladen
```

## 📊 Collections & Dynamic Data

Eleventy Collections werden automatisch aus Content generiert:

```nunjucks
{# Alle Services #}
{% for service in collections.services %}
  {{ service.data.title }}
{% endfor %}

{# Blog-Posts (sortiert) #}
{% for post in collections.blogPosts %}
  {{ post.data.title }}
{% endfor %}

{# Kommende Webinare #}
{% for webinar in collections.upcomingWebinars %}
  {{ webinar.data.title }}
{% endfor %}
```

## 🔐 Git Workflow

1. Content-Änderungen im CMS → Git Commit
2. Editorial Workflow aktiviert
3. Alle Änderungen versioniert
4. Rollback jederzeit möglich

## 📚 Dokumentation

- [CMS Integration Guide](./CMS_INTEGRATION_GUIDE.md) - Vollständige CMS-Dokumentation
- [Eleventy Docs](https://www.11ty.dev/docs/)
- [Decap CMS Docs](https://decapcms.org/docs/)
- [Nunjucks Templating](https://mozilla.github.io/nunjucks/)

## 🤝 Beitragen

1. Branch erstellen
2. Änderungen vornehmen
3. Testen (`npm run build`)
4. Pull Request erstellen

## 📄 Lizenz

© 2026 SecureKern GmbH. Alle Rechte vorbehalten.

## 🆘 Support

Bei Fragen oder Problemen:
- Email: kontakt@securekern.de
- CMS-Probleme: Siehe [CMS_INTEGRATION_GUIDE.md](./CMS_INTEGRATION_GUIDE.md)

---

**Status**: ✅ Vollständig CMS-integriert und produktionsbereit
