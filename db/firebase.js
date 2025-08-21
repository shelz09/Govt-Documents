// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwuEBa5nyhXX_ifWp8rogZu1Syt331OzE",
  authDomain: "docsafe-6da37.firebaseapp.com",
  projectId: "docsafe-6da37",
  storageBucket: "docsafe-6da37.firebasestorage.app",
  messagingSenderId: "241618778206",
  appId: "1:241618778206:web:d67b29ba464a83552ddccf",
  measurementId: "G-3L9VFE6378"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);