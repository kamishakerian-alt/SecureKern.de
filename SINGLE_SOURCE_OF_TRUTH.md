# Single source of truth – SecureKern

**One repo, one output, one place to work.**

## Repo root (only workspace)

```
C:\Users\skk2abt\Desktop\WP_Projetcs\SecureKern.de
```

- **Source:** `site/` (pages, \_includes, \_data, assets, static)
- **Config:** `eleventy.config.cjs`, `package.json`, `netlify.toml`
- **Build output:** `Website/` (generated; not committed, see .gitignore)

## Commands

```bash
npm run build   # clean + Eleventy → writes to Website/
npm run dev     # Eleventy --serve --watch
npx serve Website   # serve built site (e.g. http://localhost:3000)
```

## Deploy

- **Netlify:** Publish directory = **Website**
- No worktrees; no `dist/`; no legacy Website-as-source. Only `site/` is source; `Website/` is build output only.
