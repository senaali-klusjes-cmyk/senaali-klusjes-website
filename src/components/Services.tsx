import React from 'react';
import { Paintbrush, TreePine, Droplets, CheckCircle } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Paintbrush className="w-12 h-12" />,
      title: 'Schilderwerk',
      description: 'Professioneel binnen- en buitenschilderwerk met hoogwaardige materialen',
      features: [
        'Muren en plafonds',
        'Kozijnen en deuren',
        'Hekwerken en poorten',
        'Behangwerk',
        'Grondige voorbereiding',
      ],
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600',
      borderColor: 'border-amber-200',
    },
    {
      icon: <TreePine className="w-12 h-12" />,
      title: 'Tuinieren',
      description: 'Complete tuinonderhoud en -aanleg voor een prachtige buitenruimte',
      features: [
        'Gras maaien & onderhoud',
        'Hagen snoeien',
        'Onkruid bestrijding',
        'Plantwerk & aanplant',
        'Tuinaanleg & ontwerp',
      ],
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      borderColor: 'border-green-200',
    },
    {
      icon: <Droplets className="w-12 h-12" />,
      title: 'Ramen Wassen',
      description: 'Kristalheldere ramen voor optimaal lichtinval in uw huis of bedrijf',
      features: [
        'Binnen- en buitenreiniging',
        'Kozijnen en dorpels',
        'Moeilijk bereikbare plekken',
        'Periodiek onderhoud',
        'Milieuvriendelijke middelen',
      ],
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-200',
    },
  ];

  return (
    <section className="py-16 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Onze <span className="text-amber-600">Diensten</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Wij bieden een compleet pakket aan klusjes en onderhoudsdiensten voor uw woning of bedrijf. 
            Vakkundig, betrouwbaar en tegen een scherpe prijs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-700 border-2 border-gray-600 hover:border-amber-600 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Icon */}
              <div className={`${service.iconColor} mb-6`}>
                {service.icon}
              </div>

              {/* Title and Description */}
              <h3 className="text-2xl font-bold text-white mb-4">
                {service.title}
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <CheckCircle className={`w-5 h-5 ${service.iconColor}`} />
                    <span className="text-gray-200">{feature}</span>
                  </li>
                ))}
              </ul>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;