import emailjs from 'emailjs-com';

// EmailJS configuratie
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_senaali',
  TEMPLATE_OFFERTE: 'template_offerte',
  TEMPLATE_BEVESTIGING: 'template_bevestiging',
  PUBLIC_KEY: 'REPLACE_WITH_YOUR_ACTUAL_EMAILJS_PUBLIC_KEY', // Vervang met jouw echte EmailJS public key van https://dashboard.emailjs.com/admin/account
  ADMIN_EMAIL: 'senaalikemaldar@gmail.com'
};

// Initialize EmailJS (call this once in your app)
export const initEmailJS = () => {
  emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
};

// Send notification to admin
export const sendOfferteNotification = async (formData: any) => {
  try {
    const result = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_OFFERTE,
      {
        to_email: EMAILJS_CONFIG.ADMIN_EMAIL,
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        service: formData.service,
        description: formData.description,
        date: new Date().toLocaleDateString('nl-NL'),
        time: new Date().toLocaleTimeString('nl-NL'),
        // Extra info
        subject: `Nieuwe offerte aanvraag - ${formData.service}`,
        message: `
Nieuwe offerte aanvraag ontvangen:

Klant: ${formData.name}
Email: ${formData.email}
Telefoon: ${formData.phone}
Service: ${formData.service}

Beschrijving:
${formData.description}

Datum: ${new Date().toLocaleDateString('nl-NL')} om ${new Date().toLocaleTimeString('nl-NL')}
        `
      },
      EMAILJS_CONFIG.PUBLIC_KEY
    );
    
    console.log('Admin notification sent:', result);
    return { success: true, result };
  } catch (error) {
    console.error('Failed to send admin notification:', error);
    return { success: false, error };
  }
};

// Send confirmation to customer
export const sendCustomerConfirmation = async (formData: any) => {
  try {
    const result = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_BEVESTIGING,
      {
        to_email: formData.email,
        customer_name: formData.name,
        service: formData.service,
        date: new Date().toLocaleDateString('nl-NL'),
        admin_email: EMAILJS_CONFIG.ADMIN_EMAIL,
        admin_phone: '+32493071002',
        // Bevestiging bericht
        subject: 'Bevestiging offerte aanvraag - Senaali Klusjes',
        message: `
Beste ${formData.name},

Bedankt voor uw offerte aanvraag voor ${formData.service}.

Wij hebben uw aanvraag ontvangen en nemen binnen 24 uur contact met u op.

Uw gegevens:
- Service: ${formData.service}
- Datum aanvraag: ${new Date().toLocaleDateString('nl-NL')}

Voor vragen kunt u contact opnemen:
- Telefoon: +32493071002
- Email: senaalikemaldar@gmail.com

Met vriendelijke groet,
Senaali Klusjes
        `
      },
      EMAILJS_CONFIG.PUBLIC_KEY
    );
    
    console.log('Customer confirmation sent:', result);
    return { success: true, result };
  } catch (error) {
    console.error('Failed to send customer confirmation:', error);
    return { success: false, error };
  }
};

export default EMAILJS_CONFIG;