import React from 'react';

// Cloudinary configuratie component
// Je moet deze waarden aanpassen naar jouw Cloudinary account

export const CLOUDINARY_CONFIG = {
  // Jouw Cloudinary cloud name
  CLOUD_NAME: 'ddgsjjbjv',
  
  // Upload preset (moet je maken in Cloudinary dashboard)
  UPLOAD_PRESET: 'senaali_portfolio',
  
  // API URL
  UPLOAD_URL: 'https://api.cloudinary.com/v1_1/ddgsjjbjv/image/upload'
};

// Instructies voor setup:
/*
1. Ga naar https://cloudinary.com en log in
2. Ga naar Settings > Upload presets
3. Maak een nieuwe preset genaamd 'senaali_portfolio'
4. Zet 'Signing Mode' op 'Unsigned'
5. Zet 'Folder' op 'senaali-klusjes/portfolio'
6. Vervang 'YOUR_CLOUD_NAME' hierboven met jouw cloud name
*/

export default CLOUDINARY_CONFIG;