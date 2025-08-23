import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

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
const auth = getAuth(app);
const db = getFirestore(app);  // <-- Add this

// Export everything you need
export { app, auth, db };
