import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAesNKEB4kNKekYH7xh2ajidrENfc8l-9E",
  authDomain: "senaali-klusjes.firebaseapp.com",
  projectId: "senaali-klusjes",
  storageBucket: "senaali-klusjes.firebasestorage.app",
  messagingSenderId: "450271958587",
  appId: "1:450271958587:web:8f039dc2a617dea1b26e1e",
  measurementId: "G-YJQEBPHD8M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Test Firebase connection
console.log('Firebase initialized with project:', firebaseConfig.projectId);

// Test Storage connection
console.log('Firebase Storage initialized');

export default app;