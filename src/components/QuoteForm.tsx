import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { CheckCircle, Send, Phone, Mail, ArrowLeft } from 'lucide-react';
import emailjs from 'emailjs-com';
import EMAILJS_CONFIG from '../services/emailService';

const QuoteForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const services = [
    'Schilderwerk',
    'Tuinieren',
    'Ramen wassen',
    'Combinatie van diensten',
    'Anders',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Save to Firebase
      await addDoc(collection(db, 'quotes'), {
        ...formData,
        submittedDate: serverTimestamp(),
        status: 'pending',
      });

      // Send email notification to admin
      try {
        // EmailJS tijdelijk uitgeschakeld - configuratie nog niet compleet
        console.log('Email notification zou worden verstuurd naar:', EMAILJS_CONFIG.ADMIN_EMAIL);
      } catch (emailError) {
        console.error('Email notification failed:', emailError);
        // Don't fail the form submission if email fails
      }

      // Send confirmation email to customer
      try {
        // EmailJS tijdelijk uitgeschakeld - configuratie nog niet compleet
        console.log('Bevestigingsmail zou worden verstuurd naar:', formData.email);
      } catch (emailError) {
        console.error('Customer confirmation email failed:', emailError);
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error('Error submitting quote:', err);
      setError('Er is een fout opgetreden. Probeer het opnieuw.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">
              Bedankt voor uw aanvraag!
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Wij hebben uw offerte aanvraag ontvangen en nemen binnen 24 uur contact met u op.
            </p>
            
            <div className="bg-amber-900 bg-opacity-30 border border-amber-700 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-amber-400 mb-2">Wat gebeurt er nu?</h3>
              <ul className="text-left text-amber-200 space-y-2">
                <li>• Wij beoordelen uw aanvraag</li>
                <li>• Binnen 24 uur nemen wij contact op</li>
                <li>• Wij plannen een afspraak voor een vrijblijvende offerte</li>
                <li>• U ontvangt een gedetailleerde prijsopgave</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/"
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Terug naar Home
              </a>
              <a
                href="/diensten"
                className="border-2 border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all"
              >
                Onze Diensten
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <a
            href="/"
            className="inline-flex items-center space-x-2 text-amber-600 hover:text-amber-700 font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Terug naar Home</span>
          </a>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Gratis <span className="text-amber-600">Offerte</span> Aanvragen
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Beschrijf uw klus en ontvang binnen 24 uur een vrijblijvende offerte op maat.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-lg p-8 sticky top-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                Direct Contact
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Telefoon</h4>
                    <p className="text-gray-300">+32493071002</p>
                    <p className="text-sm text-gray-400 mt-1">Ma-vr 8:00-18:00</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">E-mail</h4>
                    <p className="text-gray-300 text-sm">senaali@gmail.com</p>
                    <p className="text-sm text-gray-400 mt-1">Respons binnen 4 uur</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">WhatsApp</h4>
                    <p className="text-gray-300">+32493071002</p>
                    <p className="text-sm text-gray-400 mt-1">Snelle reactie</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-amber-900 bg-opacity-30 border border-amber-700 rounded-lg">
                <p className="text-amber-400 font-medium text-center">
                  🏆 Gratis offerte binnen 24 uur gegarandeerd!
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-gray-800 border border-gray-700 rounded-2xl shadow-lg p-8 space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800">{error}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Volledige naam *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors placeholder-gray-400"
                    placeholder="Uw naam"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    E-mailadres *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors placeholder-gray-400"
                    placeholder="uw@email.nl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    Telefoonnummer *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors placeholder-gray-400"
                    placeholder="+32493071002"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
                    Type klus *
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                  >
                    <option value="">Kies een dienst</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                  Beschrijving van de klus *
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={6}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors resize-none placeholder-gray-400"
                  placeholder="Beschrijf uw klus zo gedetailleerd mogelijk. Denk aan: wat moet er gebeuren, welke ruimte/oppervlakte, gewenste materialen, timeline, etc."
                />
              </div>

              <div className="bg-gray-700 border border-gray-600 rounded-lg p-6">
                <h4 className="font-semibold text-white mb-3">✓ Wat krijgt u van ons?</h4>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• Gratis offerte binnen 24 uur</li>
                  <li>• Persoonlijk advies en vakkundig werk</li>
                </ul>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:transform-none flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Versturen...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Gratis Offerte Aanvragen</span>
                  </>
                )}
              </button>

              <p className="text-xs text-gray-400 text-center">
                Door dit formulier te versturen gaat u akkoord met onze verwerkingsvoorwaarden. 
                Uw gegevens worden niet gedeeld met derden.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteForm;