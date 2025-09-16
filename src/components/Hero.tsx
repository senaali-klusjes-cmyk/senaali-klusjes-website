import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const Hero = () => {
  const features = [
    { icon: <CheckCircle className="w-5 h-5" />, text: '+30 jaar ervaring' },
    { icon: <CheckCircle className="w-5 h-5" />, text: 'Gratis offerte binnen 24u' },
  ];

  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-amber-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-orange-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Mobile: Logo first, Desktop: Content first */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Uw <span className="text-amber-600">klussen</span> in
              <br />
              <span className="text-amber-500">vakkundige handen</span>
            </h1>
            
            <p className="mt-6 text-xl text-gray-300 max-w-2xl">
              Van schilderwerk tot tuinonderhoud en ramenreiniging. Senaali Klusjes zorgt voor 
              professioneel vakmanschap met persoonlijke aandacht voor elk project.
            </p>

            {/* Features */}
            <div className="mt-8 space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center justify-center lg:justify-start space-x-3">
                  <span className="text-amber-600">{feature.icon}</span>
                  <span className="text-gray-200 font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/offerte"
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Gratis Offerte Aanvragen
              </Link>
              <Link
                to="/diensten"
                className="border-2 border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
              >
                Onze Diensten
              </Link>
            </div>

          </div>

          {/* Mobile: Logo first, Desktop: Logo second */}
          <div className="grid grid-cols-1 gap-6 order-1 lg:order-2">
            <div className="text-center">
              <img
                src="/Senaali-Klussen-Logo-NoBackground-Web copy.png"
                alt="Senaali Klusjes Logo"
                className="w-64 h-64 sm:w-80 sm:h-80 mx-auto animate-bounce filter-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;