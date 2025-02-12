// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "prodigytaskmanager.firebaseapp.com",
  projectId: "prodigytaskmanager",
  storageBucket: "prodigytaskmanager.firebasestorage.app",
  messagingSenderId: "910580529342",
  appId: "1:910580529342:web:be7909a660633d35d146ef",
  measurementId: "G-8RSQ7BWFL4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
