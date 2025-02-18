// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwOKfoITmioGc96RJlC85ij6GkqIv5FKk",
  authDomain: "hola-mundo-idsg08.firebaseapp.com",
  databaseURL: "https://hola-mundo-idsg08-default-rtdb.firebaseio.com",
  projectId: "hola-mundo-idsg08",
  storageBucket: "hola-mundo-idsg08.firebasestorage.app",
  messagingSenderId: "1092138743278",
  appId: "1:1092138743278:web:3447e32f85998080facaff",
  measurementId: "G-QWLMJCBTNB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore and export it
export const db = getFirestore(app);
