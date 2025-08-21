// otp.js
import { auth, db, PhoneAuthProvider, signInWithCredential, RecaptchaVerifier, signInWithPhoneNumber } from './firebase.js';
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// DOM elements
const otpInput = document.getElementById('otp');
const verifyBtn = document.getElementById('verifyOtp');
const resendBtn = document.getElementById('resendOtp');
const tryAgainSpan = document.getElementById('tryagain-time');

// Load stored session data
let verificationId = sessionStorage.getItem('verificationId');
const flow = sessionStorage.getItem('flow'); // signup or login
const signupData = sessionStorage.getItem('signupData') ? JSON.parse(sessionStorage.getItem('signupData')) : null;
const phone = flow === 'signup' ? signupData?.phone : sessionStorage.getItem('phone');

// Prevent users from accessing OTP step directly
if (!verificationId || !phone) {
  alert("Session expired. Please restart the process.");
  window.location.reload();
}

// ---- Verify OTP ----
verifyBtn.addEventListener('click', async () => {
  const code = otpInput.value.trim();
  if (!code) {
    alert("Enter the OTP.");
    return;
  }

  try {
    const credential = PhoneAuthProvider.credential(verificationId, code);
    await signInWithCredential(auth, credential);

    if (flow === 'signup' && signupData) {
      await setDoc(doc(db, 'users', phone), {
        name: signupData.name,
        aadhaar: signupData.aadhaar,
        phone
      });
      sessionStorage.removeItem('signupData');
    }

    // Cleanup
    sessionStorage.removeItem('verificationId');
    sessionStorage.removeItem('phone');
    sessionStorage.removeItem('flow');

    alert('Verification successful!');
    window.location.href = 'index.html';
  } catch (err) {
    console.error(err);
    alert('Invalid OTP. Please try again.');
  }
});

// ---- Resend OTP with cooldown ----
let cooldown = 0;
let timerId = null;

function startCooldown(seconds = 30) {
  cooldown = seconds;
  resendBtn.disabled = true;
  updateTimerLabel();
  timerId = setInterval(() => {
    cooldown--;
    updateTimerLabel();
    if (cooldown <= 0) {
      clearInterval(timerId);
      resendBtn.disabled = false;
      if (tryAgainSpan) tryAgainSpan.textContent = '';
    }
  }, 1000);
}

function updateTimerLabel() {
  if (tryAgainSpan) tryAgainSpan.textContent = ` in ${cooldown}s`;
}

function ensureRecaptcha(containerId) {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(containerId, { size: 'invisible' }, auth);
  }
  return window.recaptchaVerifier;
}

// Resend logic
resendBtn?.addEventListener('click', async () => {
  if (cooldown > 0) return;

  try {
    const recaptcha = ensureRecaptcha('recaptcha-otp'); // div id="recaptcha-otp"
    const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha);
    verificationId = confirmation.verificationId;
    sessionStorage.setItem('verificationId', verificationId);
    startCooldown(30);
  } catch (err) {
    console.error(err);
    alert('Failed to resend OTP. Try again.');
  }
});

// Start cooldown timer immediately after OTP is sent
startCooldown(30);
