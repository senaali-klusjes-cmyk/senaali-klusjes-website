# 🏠 Senaali Klusjes Website

Een professionele website voor Senaali Klusjes - uw betrouwbare partner voor schilderwerk, tuinonderhoud en ramenreiniging.

![Senaali Klusjes](./public/Senaali-Klussen-Logo-NoBackground-Web%20copy.png)

## 🌐 Live Website
- **Production:** [Wordt toegevoegd na deployment]
- **Staging:** [Wordt toegevoegd na deployment]

## 🚀 Features

### Voor Klanten:
- **📱 Responsive Design** - Werkt perfect op alle apparaten
- **🎨 Modern Design** - Professionele uitstraling met Tailwind CSS
- **📝 Offerte Aanvragen** - Eenvoudig contact formulier
- **🖼️ Portfolio** - Foto albums van afgeronde projecten
- **⭐ Reviews** - Klantbeoordelingen en ervaringen
- **📞 Direct Contact** - Telefoon, email en WhatsApp

### Voor Admin:
- **🔐 Beveiligd Dashboard** - Firebase authenticatie
- **📊 Offerte Beheer** - Overzicht en status updates
- **📸 Portfolio Beheer** - Upload en organiseer project foto's
- **🗂️ Album Beheer** - Maak en beheer foto categorieën

## 🛠️ Tech Stack

- **Frontend:** React 18 + TypeScript
- **Styling:** Tailwind CSS
- **Routing:** React Router v7
- **Backend:** Firebase (Firestore + Storage + Auth)
- **Icons:** Lucide React
- **Build Tool:** Vite
- **Hosting:** Netlify
- **Image Storage:** Cloudinary + Firebase Storage

## 📦 Installation & Development

### Prerequisites
- Node.js 18+ 
- npm of yarn

### Setup
```bash
# Clone repository
git clone https://github.com/[username]/senaali-klusjes-website.git
cd senaali-klusjes-website

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables
Maak een `.env` bestand in de root:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 🏗️ Project Structure

```
src/
├── components/          # React componenten
│   ├── Header.tsx      # Navigatie header
│   ├── Hero.tsx        # Homepage hero sectie
│   ├── Services.tsx    # Diensten overzicht
│   ├── Portfolio.tsx   # Portfolio galerij
│   ├── Reviews.tsx     # Klant reviews
│   ├── QuoteForm.tsx   # Offerte formulier
│   ├── Footer.tsx      # Website footer
│   ├── Login.tsx       # Admin login
│   ├── AdminDashboard.tsx    # Admin hoofdpagina
│   ├── AdminQuotes.tsx       # Offerte beheer
│   └── AdminPortfolio.tsx    # Portfolio beheer
├── hooks/              # Custom React hooks
│   └── useAuth.ts      # Authenticatie hook
├── services/           # External services
│   └── emailService.ts # EmailJS configuratie
├── types/              # TypeScript type definities
│   └── index.ts        # Gedeelde types
├── firebase.ts         # Firebase configuratie
├── App.tsx            # Hoofd app component
├── main.tsx           # App entry point
└── index.css          # Globale styles
```

## 📱 Pages & Routes

- **`/`** - Homepage met hero en overzicht
- **`/diensten`** - Gedetailleerd diensten overzicht
- **`/portfolio`** - Foto albums van projecten
- **`/over-ons`** - Bedrijfsinformatie
- **`/contact`** - Contactgegevens
- **`/reviews`** - Klantbeoordelingen
- **`/offerte`** - Offerte aanvraag formulier
- **`/login`** - Admin login (beveiligd)
- **`/admin`** - Admin dashboard (beveiligd)

## 🔐 Admin Features

### Toegang
- **Email:** senaali-klusjes@hotmail.com
- **Wachtwoord:** [Wordt privé gedeeld]

### Functionaliteiten
- **Offerte Beheer:** Bekijk, update status, verwijder aanvragen
- **Portfolio Beheer:** Upload foto's, maak albums, organiseer projecten
- **Status Updates:** Markeer offertes als gecontacteerd/afgerond

## 🚀 Deployment

### Netlify (Aanbevolen)
1. **Connect GitHub** repository
2. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Environment variables** toevoegen
4. **Deploy!**

### Manual Deployment
```bash
# Build project
npm run build

# Upload dist/ folder naar hosting provider
```

## 📞 Contact & Support

**Senaali Klusjes**
- 📱 Telefoon: +32493071002
- 📧 Email: senaalikemaldar@gmail.com
- 🌐 Website: [Na deployment]
- 📍 Servicegebied: Limburg, België

**Technical Support**
- 🐛 Issues: GitHub Issues
- 📖 Documentation: Dit README bestand
- 🔧 Updates: Via GitHub commits

## 📄 License & Copyright

© 2024 Senaali Klusjes. Alle rechten voorbehouden.

---

**Gemaakt met ❤️ voor professionele klusjes en onderhoud**