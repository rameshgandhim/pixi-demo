import { initializeApp } from 'firebase/app';

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyARWfnfZlizjmfmf9fktCMuVKm_C3c7o1I',
  authDomain: 'pixijs-demo-f3037.firebaseapp.com',
  projectId: 'pixijs-demo-f3037',
  storageBucket: 'pixijs-demo-f3037.appspot.com',
  messagingSenderId: '71883800219',
  appId: '1:71883800219:web:e78d82f9ba030aa69b903e',
};
// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
