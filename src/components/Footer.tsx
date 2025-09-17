import React from 'react';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <img
                src="/Senaali-Klussen-Logo-NoBackground-Web copy.png"
                alt="Senaali Klusjes"
                className="h-12 w-auto mr-3 filter-none"
              />
              <div>
                <h3 className="text-xl font-bold text-white">Senaali Klusjes</h3>
                <p className="text-gray-400 text-sm">Vakmanschap & Kwaliteit</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Al meer dan 30 jaar uw betrouwbare partner voor schilderwerk, 
              tuinonderhoud en ramenreiniging in de regio.
            </p>
            
            <div className="mb-6">
              <p className="text-gray-400 text-sm">
                BTW: BE799688388
              </p>
            </div>
            
            {/* Trust Indicators */}
            <div className="space-y-2">
            </div>
          </div>

          {/* Services */}

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-300">+32493071002</p>
                  <p className="text-gray-500 text-sm">Ma-vr 8:00-18:00</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-300">info@senaaliklusjes.nl</p>
                  <p className="text-gray-500 text-sm">Respons binnen 4 uur</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-300">Servicegebied</p>
                  <p className="text-gray-500 text-sm">Limburg</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-300">Openingstijden</p>
                  <p className="text-gray-500 text-sm">Ma-za 8:00-18:00</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-6">
              <h5 className="text-sm font-semibold text-gray-400 mb-3">Volg Ons</h5>
              <div className="flex space-x-3">
                <a
                  href="https://www.facebook.com/profile.php?id=100091754747862"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/senaali.klusjes/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Senaali Klusjes. Alle rechten voorbehouden.
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end text-sm">
              <a href="/login" className="text-gray-400 hover:text-amber-400 transition-colors">
                Admin
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;