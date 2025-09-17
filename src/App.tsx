import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CheckCircle, Phone, Mail } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Reviews from './components/Reviews';
import QuoteForm from './components/QuoteForm';
import Portfolio from './components/Portfolio';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';

// Home Page Component
const Home = () => (
  <>
    <Hero />
  </>
);

// Services Page Component
const ServicesPage = () => (
  <div className="pt-20">
    <Services />
  </div>
);

// Portfolio Page Component  
const PortfolioPage = () => (
  <div className="pt-20">
    <Portfolio />
  </div>
);

// Reviews Page Component  
const ReviewsPage = () => (
  <div className="pt-20">
    <Reviews />
  </div>
);

// Over Ons Page Component
const AboutPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-white mb-4">
          Over <span className="text-amber-600">Senaali Klusjes</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Leer meer over ons bedrijf, onze missie en waarom wij de juiste keuze zijn voor uw klussen.
        </p>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-lg p-8 space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Wie zijn wij?</h2>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-amber-400">Welkom bij Senaali Klussen</h3>
            <p className="text-gray-300 leading-relaxed">
              Al meer dan 30 jaar sta ik klaar om elke klus met zorg en precisie uit te voeren. De naam Senaali is ontstaan uit de namen van mijn kinderen, Sedika, Naz en Ali en staat symbool voor de toewijding en liefde die ik in mijn werk leg.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Of het nu gaat om tuinonderhoud, schilderwerken, ramen wassen of andere klussen: ik pak het aan met vakmanschap en een glimlach.
            </p>
            <p className="text-amber-400 font-semibold text-lg">
              Dé betrouwbare klusser voor heel Limburg
            </p>
            <p className="text-gray-300 leading-relaxed">
              Betrouwbaar, Vakkundig, gewoonweg Senaali 👌👌
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Onze Missie</h2>
          <p className="text-gray-300 leading-relaxed">
            Wij geloven dat elk huis en elke tuin het verdient om er op zijn best uit te zien. 
            Daarom zetten wij ons elke dag in om onze klanten te helpen hun droomwoning te realiseren 
            met hoogwaardige materialen, vakkundig werk en persoonlijke aandacht.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Waarom Senaali Klusjes?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-amber-600" />
                <span className="text-gray-200">+30 jaar ervaring</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-amber-600" />
                <span className="text-gray-200">Gratis offerte binnen 24 uur</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-amber-600" />
                <span className="text-gray-200">Transparante prijzen</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-amber-600" />
                <span className="text-gray-200">Persoonlijke service</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4">
            Klaar om samen te werken?
          </h3>
          <p className="text-gray-300 mb-6">
            Neem contact met ons op voor een vrijblijvende offerte.
          </p>
          <Link
            to="/offerte"
            className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 inline-block"
          >
            Gratis Offerte Aanvragen
          </Link>
        </div>
      </div>
    </div>
  </div>
);
// Contact Page (simple redirect to quote form for now)
const ContactPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-white mb-4">
          <span className="text-amber-600">Contact</span> Informatie
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Neem direct contact met ons op voor al uw klussen en onderhoudswerkzaamheden.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Telefoon */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 text-center hover:border-amber-600 transition-colors">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Phone className="w-8 h-8 text-amber-600" />
          </div>
          <h3 className="text-xl font-bold text-white mb-4">Telefoon</h3>
          <a 
            href="tel:+32493071002"
            className="text-2xl font-semibold text-amber-400 hover:text-amber-300 transition-colors block mb-2"
          >
            +32 493 071 002
          </a>
          <p className="text-gray-300 text-sm">Ma-za 8:00-18:00</p>
          <p className="text-gray-400 text-xs mt-2">Direct bereikbaar voor spoedklussen</p>
        </div>

        {/* Email */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 text-center hover:border-amber-600 transition-colors">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-amber-600" />
          </div>
          <h3 className="text-xl font-bold text-white mb-4">E-mail</h3>
          <a 
            href="mailto:senaalikemaldar@gmail.com"
            className="text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors block mb-2"
          >
            senaalikemaldar@gmail.com
          </a>
          <p className="text-gray-300 text-sm">Respons binnen 4 uur</p>
          <p className="text-gray-400 text-xs mt-2">Voor gedetailleerde offertes</p>
        </div>

        {/* WhatsApp */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 text-center hover:border-amber-600 transition-colors">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-4">WhatsApp</h3>
          <a 
            href="https://wa.me/32493071002"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl font-semibold text-green-400 hover:text-green-300 transition-colors block mb-2"
          >
            +32 493 071 002
          </a>
          <p className="text-gray-300 text-sm">Snelle reactie</p>
          <p className="text-gray-400 text-xs mt-2">Voor directe communicatie</p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-16">
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-4">
            Klaar voor uw volgende klus?
          </h3>
          <p className="text-gray-300 mb-6">
            Neem contact met ons op voor een vrijblijvende offerte.
          </p>
          <Link
            to="/offerte"
            className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 inline-block"
          >
            Gratis Offerte Aanvragen
          </Link>
        </div>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          {/* Admin Routes */}
          <Route path="/login" element={<Login />} />
          
          {/* Public Routes */}
          <Route path="/offerte" element={<QuoteForm />} />
          
          {/* Main Layout Routes */}
          <Route 
            path="/*" 
            element={
              <>
                <Header />
                <main>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/diensten" element={<ServicesPage />} />
                    <Route path="/portfolio" element={<PortfolioPage />} />
                    <Route path="/over-ons" element={<AboutPage />} />
                    <Route path="/reviews" element={<ReviewsPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                  </Routes>
                </main>
                <Footer />
              </>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;