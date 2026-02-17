# SecureKern Website - Headless CMS Integration

## 🎯 Überblick

Die SecureKern Website ist nun vollständig in ein **Headless CMS** (Decap CMS) integriert. Alle Seiten werden **dynamisch generiert** mit konsistenter Struktur und maximaler Wartbarkeit.

## 🏗️ Architektur

### Statischer Generator + Headless CMS

- **Build Tool**: Eleventy (11ty) - Statischer Site Generator
- **CMS**: Decap CMS (ehemals Netlify CMS)
- **Deployment**: Statische HTML-Dateien in `Website/` (Build-Output)
- **Backend**: Git-basiert (keine Datenbank erforderlich)

### Vorteile dieser Architektur

✅ **Flexibilität**: Inhalte einfach über CMS bearbeiten
✅ **Performance**: Blitzschnelle statische Seiten
✅ **Sicherheit**: Keine Server-Schwachstellen
✅ **Wartbarkeit**: Strukturierte Inhalte in Markdown
✅ **Versionskontrolle**: Alle Änderungen in Git erfasst
✅ **Skalierbarkeit**: Unbegrenzter Traffic möglich

## 📁 Verzeichnisstruktur

```
site/
├── admin/                  # CMS-Admin-Interface
│   ├── index.html         # CMS-Login-Seite
│   └── config.yml         # CMS-Konfiguration
├── pages/                 # Hauptseiten
│   ├── services/         # Service-Seiten
│   ├── solutions/        # Branchen-Lösungen
│   └── resources/        # Blog & Ressourcen
├── team/                  # Team-Mitglieder
├── webinars/             # Webinar-Inhalte
├── _includes/            # Templates & Komponenten
│   ├── layouts/          # Seitenlayouts
│   │   ├── base.njk      # Basis-Layout
│   │   ├── service.njk   # Service-Layout
│   │   ├── solution.njk  # Lösungs-Layout
│   │   └── blog-post.njk # Blog-Layout
│   └── partials/         # Wiederverwendbare Komponenten
│       ├── header.njk
│       ├── footer.njk
│       ├── services-grid.njk
│       ├── solutions-grid.njk
│       ├── blog-posts-grid.njk
│       ├── team-grid.njk
│       └── webinars-list.njk
└── _data/                # Globale Daten
    ├── site.cjs          # Site-Einstellungen (code-managed)
    ├── navigation.cjs    # Navigationsstruktur (code-managed)
    └── meta.cjs          # Meta-Informationen (Jahr, etc.)
```

## 🎨 Content-Typen & Collections

### 1. Hauptseiten (`pages`)

- Layout: `base.njk`
- Filter: `pageType: main`
- Felder: Titel, Beschreibung, Permalink, Hero-Bild, Inhalt

### 2. Leistungen (`services`)

- Layout: `service.njk` oder `base.njk`
- Ordner: `site/pages/services/`
- Felder: Titel, Kategorie, Preis, Dauer, Icon/Bild, Inhalt
- Kategorien: Beratung, Assessment, Implementation, Training

### 3. Branchen-Lösungen (`solutions`)

- Layout: `solution.njk` oder `base.njk`
- Ordner: `site/pages/solutions/`
- Felder: Titel, Branche, Hero-Bild, Inhalt

### 4. Blog & Ressourcen (`blog`)

- Layout: `blog-post.njk` oder `base.njk`
- Ordner: `site/pages/resources/`
- Felder: Titel, Datum, Autor, Tags, Featured-Bild, Inhalt

### 5. Webinare (`webinars`)

- Ordner: `site/webinars/`
- Felder: Titel, Beschreibung, Datum, Dauer, Referent, Bild, Registrierungslink
- Status: upcoming, past, recorded

### 6. Team (`team`)

- Ordner: `site/team/`
- Felder: Name, Position, Bild, LinkedIn, Email, Bio

## 🚀 CMS Verwenden

### Zugriff auf das CMS

#### Lokal (Entwicklung)

```bash
# CMS-Server starten
npm run cms

# In anderem Terminal: Entwicklungsserver
npm run dev
```

Dann öffnen: `http://localhost:8080/admin/`

#### Produktion

Nach dem Deployment: `https://www.securekern.de/admin/`

### Neue Inhalte erstellen

1. **Im CMS einloggen**
2. **Content-Typ wählen** (z.B. "Leistungen")
3. **"New Leistungen" klicken**
4. **Felder ausfüllen**
5. **Speichern** (Save)
6. **Veröffentlichen** (Publish)

### Inhalte bearbeiten

1. Im CMS zum gewünschten Content navigieren
2. Eintrag anklicken
3. Änderungen vornehmen
4. Speichern & Veröffentlichen

## 🔧 Entwicklung

### Befehle

```bash
# Website bauen
npm run build

# Entwicklungsserver mit Live-Reload
npm run dev

# CMS lokal betreiben
npm run cms
```

### Neues Layout erstellen

1. Layout in `site/_includes/layouts/` erstellen
2. In `site/admin/config.yml` zum entsprechenden Collection hinzufügen
3. Website neu bauen

Beispiel neues Layout:

```nunjucks
---
layout: layouts/base.njk
---

<div class="custom-layout">
  <h1>{{ title }}</h1>
  {{ content | safe }}
</div>
```

### Neue Collection hinzufügen

1. In `site/admin/config.yml` Collection definieren
2. In `eleventy.config.cjs` Collection-Filter hinzufügen
3. Optional: Komponente in `_includes/partials/` erstellen

Beispiel in `eleventy.config.cjs`:

```javascript
eleventyConfig.addCollection('meinecollection', function (collectionApi) {
  return collectionApi.getFilteredByGlob('site/meinordner/*.md');
});
```

## 📊 Dynamische Collections

Folgende Collections werden automatisch generiert und sind überall verfügbar:

- `collections.services` - Alle Services
- `collections.solutions` - Alle Lösungen
- `collections.blogPosts` - Blog-Beiträge (nach Datum sortiert)
- `collections.team` - Team-Mitglieder
- `collections.webinars` - Alle Webinare
- `collections.upcomingWebinars` - Nur zukünftige Webinare

### Collections in Templates verwenden

```nunjucks
<!-- Alle Services anzeigen -->
{% for service in collections.services %}
  <h3>{{ service.data.title }}</h3>
  <p>{{ service.data.description }}</p>
{% endfor %}

<!-- Oder Komponente verwenden -->
{% include "partials/services-grid.njk" %}
```

## 🎯 Filter & Funktionen

### Verfügbare Filter

```nunjucks
<!-- Begrenzen -->
{% for post in collections.blogPosts | limit(3) %}

<!-- Datum formatieren -->
{{ post.data.date | dateFormat }}

<!-- Sicheres HTML -->
{{ content | safe }}
```

## 🔒 Git-basiertes Workflow

1. **Änderungen im CMS** werden als Git-Commits gespeichert
2. **Editorial Workflow** aktiviert (Draft → Review → Published)
3. **Versionskontrolle** für alle Content-Änderungen
4. **Rollback** jederzeit möglich

## 📝 Best Practices

### Inhalte strukturieren

- ✅ Aussagekräftige Titel verwenden
- ✅ Meta-Beschreibungen für SEO ausfüllen
- ✅ Bilder komprimieren vor Upload
- ✅ Permalinks konsistent benennen (`/service-name.html`)

### Performance

- ✅ Bilder in `site/assets/images/uploads/` speichern (wird nach `dist/assets/images/uploads/` kopiert)
- ✅ Markdown für Inhalte nutzen
- ✅ HTML nur wenn nötig in Markdown einbetten

### Wartbarkeit

- ✅ Wiederverwendbare Komponenten in `partials/` erstellen
- ✅ Layouts für häufige Seitentypen definieren
- ✅ Globale Daten in `_data/` auslagern
- ℹ️ **Navigation & Site Settings:** Managed in `site/_data/*.cjs` (code-based for i18n & dynamic values)

## 🚀 Deployment

### Automatisches Deployment (Netlify/Vercel)

1. Repository pushen
2. Build-Command: `npm run build`
3. Publish-Directory: `dist`
4. Umgebungsvariablen konfigurieren (falls Git Gateway)

### Manuelles Deployment

```bash
npm run build
# Inhalt von dist/ auf Server hochladen
```

## 🔄 Updates & Wartung

### CMS aktualisieren

```bash
npm update
```

### Neue Felder hinzufügen

1. `site/admin/config.yml` bearbeiten
2. Feld zur Collection hinzufügen
3. Template anpassen (falls nötig)
4. Neu bauen

## 📚 Dokumentation

- **Eleventy**: https://www.11ty.dev/
- **Decap CMS**: https://decapcms.org/
- **Nunjucks**: https://mozilla.github.io/nunjucks/

## ✅ Zusammenfassung

Die Website ist nun vollständig CMS-gesteuert:

- ✅ Alle Seiten über CMS editierbar
- ✅ Dynamische Generierung aus Collections
- ✅ Konsistente Struktur durch Templates
- ✅ Flexible & leicht wartbar
- ✅ Git-basiertes Backend
- ✅ Schnelle Performance
- ✅ SEO-optimiert

**Alle Inhalte können jetzt einfach über das CMS verwaltet werden, ohne Code anfassen zu müssen!**
