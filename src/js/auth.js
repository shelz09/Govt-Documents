// Import from your firebase.js
import { auth, db } from "./firebase.js";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { 
  setDoc, 
  getDoc, 
  doc 
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// -------------------- SIGN-UP HANDLER -------------------- //
document.querySelector(".sign-up-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.querySelector(".sign-up-form input[type='email']").value.trim();
  const password = document.querySelector(".sign-up-form input[type='password']").value.trim();
  const name = document.querySelector(".sign-up-form input[name='name']").value.trim();

  try {
    // Check if user already exists in Firestore
    const userDoc = await getDoc(doc(db, "users", email));
    if (userDoc.exists()) {
      alert("User already exists. Please log in.");
      return;
    }

    // Create account with Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store user data in Firestore
    await setDoc(doc(db, "users", email), {
      name: name,
      email: email,
      uid: user.uid,
      createdAt: new Date()
    });

    alert("Sign-up successful! Redirecting...");
    document.querySelector(".main").classList.add("hide");
    document.querySelector(".dashboard").classList.remove('hide');
    document.getElementById("dashboard-btn").classList.remove("hide");
  } catch (error) {
    console.error("Sign-up Error:", error.message);
    alert(error.message);
  }
});

// -------------------- LOGIN HANDLER -------------------- //
document.querySelector(".login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.querySelector(".login-form input[type='email']").value.trim();
  const password = document.querySelector(".login-form input[type='password']").value.trim();

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful! Redirecting...");
   document.querySelector(".main").classList.add("hide");
    document.querySelector(".dashboard").classList.remove('hide');
    document.getElementById("dashboard-btn").classList.remove("hide");
  } catch (error) {
    console.error("Login Error:", error.message);
    alert(error.message);
  }
});
