# Opening the site locally

**Important:** Open the project from this folder:
`C:\Users\skk2abt\Desktop\WP_Projetcs\SecureKern.de`
(File → Open Folder in Cursor). If you open a different folder (e.g. a worktree), the build and `Website` folder may not be there.

---

## Option A – Build once, then serve (recommended)

In the terminal (from the project root):

```bash
npm run preview
```

Then open in your browser: **http://localhost:3000**
(If the terminal shows another port, use that URL instead.)

This runs `npm run build` then serves the `Website` folder.

---

## Option B – Dev server (build + watch)

```bash
npm run dev
```

Then open: **http://localhost:8080**

Eleventy builds and serves; changes reload automatically.

---

## Option C – Only serve (if you already built)

```bash
npm run serve
```

Then open: **http://localhost:3000**

Use this only after `npm run build` has run successfully at least once.

---

## If it still doesn’t work

1. **Confirm you’re in the right folder**
   Terminal should show:
   `C:\Users\skk2abt\Desktop\WP_Projetcs\SecureKern.de`

2. **Build first**
   Run `npm run build`. Check that a `Website` folder appears with `index.html` inside.

3. **Port in use**
   If you see “Port 3000 is in use”, use the URL the terminal prints (e.g. http://localhost:3001).

4. **Firewall / browser**
   Try another browser or allow Node/npm in Windows Firewall if prompted.
