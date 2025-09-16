# 🚀 Deployment Guide - Senaali Klusjes Website

## 📋 GitHub Setup (Stap voor Stap)

### Stap 1: GitHub Repository Maken
1. Ga naar [github.com](https://github.com)
2. Klik op **"New repository"** (groene knop)
3. Repository naam: `senaali-klusjes-website`
4. Beschrijving: `Professionele website voor Senaali Klusjes`
5. Zet op **Public** (voor gratis Netlify)
6. **NIET** aanvinken: "Add a README file"
7. Klik **"Create repository"**

### Stap 2: Bestanden Uploaden naar GitHub

#### Optie A: Web Interface (Aanbevolen)
1. **Klik "uploading an existing file"** in je nieuwe repository
2. **Sleep ALLE bestanden** uit de Bolt file explorer (links)
3. **Belangrijke bestanden om zeker te uploaden:**
   - `package.json`
   - `index.html`
   - `vite.config.ts`
   - `tailwind.config.js`
   - `netlify.toml`
   - Hele `src/` folder
   - Hele `public/` folder
   - `.gitignore`
4. **Commit message:** `Initial commit - Senaali Klusjes website`
5. **Klik "Commit changes"**

#### Optie B: Bestand voor bestand
1. Klik **"Create new file"**
2. Typ bestandsnaam (bijv. `package.json`)
3. Kopieer inhoud uit Bolt
4. Scroll naar beneden → **"Commit new file"**
5. Herhaal voor elk bestand

## 🌐 Netlify Deployment

### Stap 1: Netlify Account
1. Ga naar [netlify.com](https://netlify.com)
2. Klik **"Sign up"** → Gebruik GitHub account
3. Autoriseer Netlify om GitHub te gebruiken

### Stap 2: Site Deployen
1. **Dashboard** → Klik **"New site from Git"**
2. **Choose Git provider** → **GitHub**
3. **Pick repository** → `senaali-klusjes-website`
4. **Build settings:**
   - **Branch:** `main`
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. **Klik "Deploy site"**

### Stap 3: Environment Variables
⚠️ **BELANGRIJK:** Voeg deze toe in Netlify:

1. **Site dashboard** → **Site settings** → **Environment variables**
2. **Add variable** voor elk van deze:

```
VITE_FIREBASE_API_KEY=AIzaSyAesNKEB4kNKekYH7xh2ajidrENfc8l-9E
VITE_FIREBASE_AUTH_DOMAIN=senaali-klusjes.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=senaali-klusjes
VITE_FIREBASE_STORAGE_BUCKET=senaali-klusjes.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=450271958587
VITE_FIREBASE_APP_ID=1:450271958587:web:8f039dc2a617dea1b26e1e
```

### Stap 4: Custom Domain (Optioneel)
1. **Domain settings** → **Add custom domain**
2. Voeg je eigen domein toe
3. Volg DNS instructies

## ✅ Checklist

- [ ] GitHub repository gemaakt
- [ ] Alle bestanden geüpload
- [ ] Netlify account aangemaakt
- [ ] Site gedeployed
- [ ] Environment variables toegevoegd
- [ ] Website werkt (test alle functies)

## 🔧 Na Deployment

### Testen:
- [ ] Homepage laadt correct
- [ ] Navigatie werkt
- [ ] Offerte formulier werkt
- [ ] Portfolio laadt
- [ ] Admin login werkt
- [ ] Responsive design op mobiel

### Updates maken:
1. **Wijzig code** in GitHub (of lokaal)
2. **Push naar main branch**
3. **Netlify bouwt automatisch** nieuwe versie
4. **Live binnen 1-2 minuten**

## 🆘 Hulp Nodig?

### Veelvoorkomende Problemen:
- **Build fails:** Check environment variables
- **404 errors:** Controleer `netlify.toml` bestand
- **Firebase errors:** Controleer API keys
- **Styling issues:** Controleer Tailwind CSS build

### Contact:
- GitHub Issues voor bugs
- Netlify Support voor hosting problemen
- Firebase Console voor database issues

---

🎉 **Succes met je deployment!**