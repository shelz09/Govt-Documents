// src/js/signup.js
import { auth, db, RecaptchaVerifier, signInWithPhoneNumber } from './firebase.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const form = document.querySelector('.sign-up-form'); // <form id="signupForm">
const nameEl = document.getElementById('name');     // <input id="name">
const aadhaarEl = document.getElementById('aadhaar');// <input id="aadhaar">
const phoneEl = document.getElementById('phone');    // <input id="phone">
let recaptcha;

function ensureRecaptcha(containerId) {
    if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(containerId, { size: 'invisible' }, auth);
    }
    return window.recaptchaVerifier;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = nameEl.value.trim();
  const aadhaar = aadhaarEl.value.trim();
  const phone = '+91' + phoneEl.value.trim();

  // Optional: client-side validation
  if (!name || !aadhaar || !phone) return alert('Please fill all fields.');

  // Check if already exists
  const snap = await getDoc(doc(db, 'users', phone));
  if (snap.exists()) {
    alert('This number is already registered. Please login.');
    return;
  }

  // reCAPTCHA + send OTP
  recaptcha = ensureRecaptcha('recaptcha-signup');  // <div id="recaptcha-signup"></div>
  try {
    const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha);
    // Persist data for the OTP page
    sessionStorage.setItem('flow', 'signup');
    sessionStorage.setItem('signupData', JSON.stringify({ name, aadhaar, phone }));
    sessionStorage.setItem('verificationId', confirmation.verificationId);
    window.location.href = 'otp.html';
  } catch (err) {
    console.error(err);
    alert('Failed to send OTP. Try again.');
  }
});
