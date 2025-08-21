// src/js/login.js
import { auth, db, RecaptchaVerifier, signInWithPhoneNumber } from './firebase.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const form = document.getElementById('loginForm');   // <form id="loginForm">
const phoneEl = document.getElementById('loginPhone');// <input id="loginPhone">
let recaptcha;

function ensureRecaptcha(containerId) {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(containerId, { size: 'invisible' }, auth);
  }
  return window.recaptchaVerifier;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const phone = '+91' + phoneEl.value.trim();

  const snap = await getDoc(doc(db, 'users', phone));
  if (!snap.exists()) {
    alert('Number not registered. Please sign up.');
    return;
  }

  recaptcha = ensureRecaptcha('recaptcha-login');   // <div id="recaptcha-login"></div>
  try {
    const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha);
    sessionStorage.setItem('flow', 'login');
    sessionStorage.setItem('phone', phone);
    sessionStorage.setItem('verificationId', confirmation.verificationId);
    window.location.href = 'otp.html';
  } catch (err) {
    console.error(err);
    alert('Failed to send OTP. Try again.');
  }
});
