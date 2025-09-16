# Bestanden om naar GitHub te uploaden

## 📋 Checklist - Deze bestanden heb je nodig:

### Root bestanden:
- [ ] `package.json` - Dependencies en scripts
- [ ] `package-lock.json` - Exacte versies (als je hem hebt)
- [ ] `vite.config.ts` - Vite configuratie
- [ ] `tsconfig.json` - TypeScript configuratie
- [ ] `tsconfig.app.json` - TypeScript app config
- [ ] `tsconfig.node.json` - TypeScript node config
- [ ] `tailwind.config.js` - Tailwind CSS config
- [ ] `postcss.config.js` - PostCSS config
- [ ] `eslint.config.js` - ESLint configuratie
- [ ] `index.html` - Hoofd HTML bestand
- [ ] `netlify.toml` - Netlify configuratie
- [ ] `README.md` - Project documentatie
- [ ] `.gitignore` - Git ignore regels
- [ ] `firestore.rules` - Firestore database regels

### src/ folder:
- [ ] `src/main.tsx` - App entry point
- [ ] `src/App.tsx` - Hoofd App component
- [ ] `src/index.css` - Globale styles
- [ ] `src/vite-env.d.ts` - Vite types
- [ ] `src/firebase.ts` - Firebase configuratie
- [ ] `src/types/index.ts` - TypeScript types

### src/components/ folder:
- [ ] `src/components/Header.tsx`
- [ ] `src/components/Hero.tsx`
- [ ] `src/components/Services.tsx`
- [ ] `src/components/Reviews.tsx`
- [ ] `src/components/Portfolio.tsx`
- [ ] `src/components/QuoteForm.tsx`
- [ ] `src/components/Footer.tsx`
- [ ] `src/components/Login.tsx`
- [ ] `src/components/AdminDashboard.tsx`
- [ ] `src/components/AdminQuotes.tsx`
- [ ] `src/components/AdminPortfolio.tsx`
- [ ] `src/components/CloudinaryConfig.tsx`

### src/hooks/ folder:
- [ ] `src/hooks/useAuth.ts`

### src/services/ folder:
- [ ] `src/services/emailService.ts`

### public/ folder:
- [ ] `public/Senaali-Klussen-Logo-NoBackground-Web copy.png` - Logo bestand

## 🚫 NIET uploaden:
- `node_modules/` folder (te groot, wordt automatisch geïnstalleerd)
- `dist/` folder (wordt automatisch gebouwd)
- `.env` bestanden (bevatten geheime keys)

## 💡 Tips:
1. Maak eerst alle folders aan in GitHub
2. Upload bestanden een voor een
3. Kopieer de code uit Bolt en plak in GitHub editor
4. Commit na elke paar bestanden

## 🔧 Environment Variables:
Vergeet niet om in Netlify deze variabelen toe te voegen:
- VITE_FIREBASE_API_KEY
- VITE_FIREBASE_AUTH_DOMAIN  
- VITE_FIREBASE_PROJECT_ID
- VITE_FIREBASE_STORAGE_BUCKET
- VITE_FIREBASE_MESSAGING_SENDER_ID
- VITE_FIREBASE_APP_ID