# 🚀 SecureKern Website - Deployment Guide

**For:** Kamran Shakarian / SecureKern Team  
**Goal:** Get website live on the internet in < 30 minutes  
**Difficulty:** Beginner-friendly (no coding required)

---

## ⚙️ Hinweis (Neu): Headless CMS + Generator

Diese Website wird jetzt **dynamisch generiert** (Static Site Generation) mit:

- **Eleventy (11ty)**: generiert die Website nach `Website/dist`
- **Decap CMS**: Content-UI unter `https://IHRE-DOMAIN/admin`

Für Deployment (Netlify/Vercel) ist daher wichtig:

- **Build command:** `npm run build`
- **Publish directory:** `Website/dist`

---

## 🎯 Quick Decision: Which Hosting?

| Option | Cost | Time | Best For |
|--------|------|------|----------|
| **Netlify** | FREE | 10 min | Quick launch, auto-SSL, easy |
| **Vercel** | FREE | 10 min | Alternative to Netlify |
| **Hetzner** | €5/mo | 30 min | Full control, self-hosted |

**Recommendation:** Start with **Netlify** (free, easiest, professional).

---

## 🟢 Option 1: Netlify Deploy (EASIEST - Recommended)

### Prerequisites
- GitHub account (free)
- Netlify account (free)

### Step-by-Step

#### 1. Upload to GitHub

1. **Go to:** https://github.com/new
2. **Repository name:** `securekern-website`
3. **Visibility:** Private (keep it confidential)
4. **Click:** "Create repository"

5. **Upload files:**
   - Click "uploading an existing file"
   - Drag & drop **alle Dateien aus dem Projekt-Root** (u. a. `site/`, `Website/`, `package.json`, `package-lock.json`)
   - **Wichtig:** Keine extra Unterordner-Ebene beim Upload (die Dateien müssen im Repository-Root liegen)
   - Click "Commit changes"

#### 2. Deploy to Netlify

1. **Go to:** https://app.netlify.com/
2. **Sign up** with GitHub (click "GitHub" login button)
3. **Click:** "Add new site" → "Import an existing project"
4. **Select:** "Deploy with GitHub"
5. **Authorize** Netlify (allow GitHub access)
6. **Select repository:** `securekern-website`
7. **Configure:**
   - Build command: `npm run build`
   - Publish directory: `Website/dist`
8. **Click:** "Deploy site"

#### 3. Wait 2 Minutes

Netlify will:
- ✅ Deploy your site
- ✅ Generate SSL certificate (https://)
- ✅ Give you a URL: `https://random-name-123.netlify.app`

#### 4. (Optional) CMS aktivieren (`/admin`)

Wenn Sie Inhalte später selbst pflegen wollen (Headless CMS):

1. **Netlify Dashboard → Site settings → Identity → Enable Identity**
2. **Identity → Services → Enable Git Gateway**
3. **Identity → Invite users** (oder Registration auf „Invite only“ lassen)
4. Öffnen: `https://IHRE-DOMAIN/admin`

#### 5. Custom Domain (Optional)

**If you own `secure-kern.ch` or `secure-kern.de`:**

1. **In Netlify dashboard:**
   - Go to "Domain settings"
   - Click "Add custom domain"
   - Enter: `secure-kern.ch`
   - Click "Verify"

2. **Update DNS at your domain registrar:**
   - Go to your domain provider (e.g., IONOS, Hetzner, Cloudflare)
   - Add DNS record:
     ```
     Type: CNAME
     Name: www
     Value: random-name-123.netlify.app
     ```
   - Add DNS record:
     ```
     Type: A
     Name: @
     Value: 75.2.60.5 (Netlify IP - shown in dashboard)
     ```

3. **Wait 10-60 minutes** for DNS propagation

4. **SSL Certificate:**
   - Netlify auto-generates SSL (https://)
   - No action needed!

---

## 🟡 Option 2: Vercel Deploy (Alternative to Netlify)

### Same as Netlify, but:

1. **Go to:** https://vercel.com/
2. **Sign up** with GitHub
3. **Click:** "Add New" → "Project"
4. **Import** `securekern-website` repository
5. **Project Settings (Build):**
   - Build Command: `npm run build`
   - Output Directory: `Website/dist`
6. **Deploy**

**Custom domain:** Same DNS setup as Netlify.

---

## 🔵 Option 3: Hetzner Cloud (Self-Hosted)

### Prerequisites
- Hetzner account (€5/month server)
- Basic command-line knowledge (or copy-paste skills)

### Step-by-Step

#### 1. Create Server

1. **Go to:** https://console.hetzner.cloud/
2. **Create project:** "SecureKern Website"
3. **Add server:**
   - Location: Nuremberg (Germany - GDPR)
   - Image: Ubuntu 22.04
   - Type: CX11 (€3.79/month - enough for website)
   - Networking: Enable IPv4
   - SSH key: Generate or upload your key
   - Name: `securekern-web`
4. **Click:** "Create & Buy now"

#### 2. Connect to Server

**Windows (PowerShell):**
```powershell
ssh root@YOUR_SERVER_IP
```

**Password/Key:** Use the one from Hetzner dashboard

#### 3. Install Nginx (Web Server)

Copy-paste these commands:

```bash
# Update system
apt update && apt upgrade -y

# Install Nginx
apt install nginx -y

# Start Nginx
systemctl start nginx
systemctl enable nginx
```

**Test:** Open browser, go to `http://YOUR_SERVER_IP` → should see "Welcome to nginx!"

#### 4. Upload Website Files

**On your Windows PC (PowerShell):**

```powershell
# Navigate to project root
cd "C:\Users\skk2abt\Desktop\WP_Projetcs\SecureKern.de"

# Build the site (outputs to Website/dist)
npm install
npm run build

# Upload files (replace YOUR_SERVER_IP)
scp -r Website/dist/* root@YOUR_SERVER_IP:/var/www/html/
```

**Enter password** when prompted.

#### 5. Configure Domain (Optional)

**If you have `secure-kern.ch` domain:**

1. **Update DNS at domain registrar:**
   - Add A record:
     ```
     Type: A
     Name: @
     Value: YOUR_SERVER_IP
     ```
   - Add A record:
     ```
     Type: A
     Name: www
     Value: YOUR_SERVER_IP
     ```

2. **Configure Nginx on server:**

```bash
# Edit Nginx config
nano /etc/nginx/sites-available/secure-kern
```

Paste this (replace `secure-kern.ch`):

```nginx
server {
    listen 80;
    server_name secure-kern.ch www.secure-kern.ch;
    root /var/www/html;
    index index.html;
    
    location / {
        try_files $uri $uri/ =404;
    }
}
```

**Save:** `Ctrl+X`, then `Y`, then `Enter`

```bash
# Enable site
ln -s /etc/nginx/sites-available/secure-kern /etc/nginx/sites-enabled/

# Test config
nginx -t

# Restart Nginx
systemctl restart nginx
```

#### 6. Add SSL Certificate (HTTPS)

```bash
# Install Certbot
apt install certbot python3-certbot-nginx -y

# Get certificate (replace email and domain)
certbot --nginx -d secure-kern.ch -d www.secure-kern.ch --email info@securekern.de --agree-tos
```

**Follow prompts:**
- Agree to Terms of Service: Yes
- Share email with EFF: Your choice
- Redirect HTTP to HTTPS: Yes (recommended)

**Done!** Your site is now live with SSL at `https://secure-kern.ch`

---

## 🧪 Testing Checklist

After deployment, verify:

### 1. Homepage Loads
- [ ] Go to your URL
- [ ] Logo appears
- [ ] Navigation works
- [ ] Hero section displays

### 2. All Pages Work
- [ ] Click "Leistungen" → services.html loads
- [ ] Click "Über uns" → about.html loads
- [ ] Click "Kontakt" → contact.html loads
- [ ] Click individual service links (NIS2, IEC 62443, etc.)

### 3. Mobile Responsive
- [ ] Open on phone (or use Chrome DevTools, F12 → Device toolbar)
- [ ] Navigation hamburger menu works
- [ ] Content readable on small screen
- [ ] Forms work on mobile

### 4. Contact Form
- [ ] Fill out form on contact.html
- [ ] Submit test entry
- [ ] Verify you receive email (check spam folder)

### 5. SSL Certificate (HTTPS)
- [ ] URL shows `https://` (padlock icon in browser)
- [ ] No security warnings
- [ ] Mixed content warnings (check browser console F12)

### 6. Legal Pages
- [ ] Impressum link in footer works
- [ ] Datenschutz link in footer works
- [ ] Content is complete (no placeholders)

---

## ⚙️ Post-Deployment: Update Content

### Update Contact Details

**Files to edit:**

1. `contact.html` (line 80-120)
2. `impressum.html` (line 45-80)
3. `datenschutz.html` (line 120-140)

**Replace:**
- `+49 711 XXX XXXX` → Your phone number
- `[Straße & Hausnummer]` → Your street address
- `HRB [XXXXX]` → Your Handelsregister number
- `DE [XXX XXX XXX]` → Your USt-ID

**How to edit:**
- If **Netlify/Vercel:** Edit files in GitHub, commit → auto-redeploys
- If **Hetzner:** Edit files on server with `nano /var/www/html/contact.html`

### Configure Contact Form

**Default:** Form uses Formspree (placeholder).

**To activate:**

1. **Sign up:** https://formspree.io/ (free tier: 50 submissions/month)
2. **Create form:** Click "New Form"
3. **Copy form ID:** `https://formspree.io/f/YOUR_FORM_ID`
4. **Edit `contact.html` line 64:**

```html
<form id="form" class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

5. **Re-deploy** (commit to GitHub or re-upload to server)

**Alternative (Netlify Forms):**

If using Netlify, replace `<form>` tag with:

```html
<form name="contact" method="POST" data-netlify="true">
```

---

## 🔐 Security Checklist

- [ ] **HTTPS enabled** (SSL certificate active)
- [ ] **Update Impressum** with real legal details
- [ ] **GDPR compliance:** Datenschutz page complete
- [ ] **Cookie consent banner** tested (should appear on first visit)
- [ ] **Form spam protection:** Add reCAPTCHA (optional, see below)

### Add reCAPTCHA (Optional)

Protects contact form from spam.

1. **Get keys:** https://www.google.com/recaptcha/admin/create
2. **Choose:** reCAPTCHA v2 (checkbox)
3. **Domain:** `secure-kern.ch`
4. **Add to contact.html** before `</form>`:

```html
<div class="g-recaptcha" data-sitekey="YOUR_SITE_KEY"></div>
```

5. **Add script** before `</body>`:

```html
<script src="https://www.google.com/recaptcha/api.js" async defer></script>
```

---

## 📊 Analytics Setup (Optional)

### Google Analytics 4

1. **Create account:** https://analytics.google.com/
2. **Create property:** "SecureKern Website"
3. **Get tracking ID:** `G-XXXXXXXXXX`
4. **Add to all HTML files** (before `</head>`):

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Verify:** Check "Realtime" report in Google Analytics after deployment.

---

## 🆘 Troubleshooting

### Problem: "404 Not Found" on service pages

**Cause:** Links are absolute (`/services/nis2-readiness.html`) but files in wrong folder.

**Fix:**
- Ensure folder structure is correct:
  ```
  /index.html
  /services/nis2-readiness.html
  /services/iec-62443.html
  etc.
  ```

### Problem: Fonts not loading

**Cause:** Google Fonts blocked or preconnect missing.

**Fix:**
- Check `<head>` has:
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  ```

### Problem: Mobile menu not working

**Cause:** JavaScript not loaded.

**Fix:**
- Check browser console (F12 → Console) for errors
- Verify `<script src="/assets/js/main.js"></script>` is before `</body>`

### Problem: Forms not submitting

**Cause:** Formspree URL not configured.

**Fix:**
- Update form action: `action="https://formspree.io/f/YOUR_FORM_ID"`

---

## 📞 Support

**Questions?**  
Email: info@securekern.de  
(Or ask the AI agent who built this 😉)

---

## ✅ Launch Day Checklist

- [ ] All files uploaded/deployed
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active (https://)
- [ ] Contact details updated (phone, address)
- [ ] Impressum legally reviewed
- [ ] Contact form tested (send test entry)
- [ ] Mobile responsiveness checked
- [ ] All navigation links work
- [ ] Google Analytics tracking (if enabled)
- [ ] Social media links updated (LinkedIn)
- [ ] Backup created (download all files)

**You're live! 🎉**

---

**Next:** Share URL with colleagues, post on LinkedIn, start Google Ads campaign.
