


const signup_form = document.querySelector(".sign-up-form");
const otp_form = document.querySelector(".otp-verify-form");
const login_gate = document.querySelector('.login-gate');
const login_form = document.querySelector(".login-form");
const openAlert = document.querySelector(".dashboard-btn");
const closeAlert = document.querySelector(".alert-btn");

otp_form.style.display = "none";
login_form.style.display = "none";

const handleSignup = (e) => {
    e.preventDefault();
    signup_form.style.display="none";
    otp_form.style.display="flex";
}

const loginGate = () =>{
    signup_form.style.display = "none";
    login_form.style.display = "flex";
    otp_form.style.display = "none";
}
const handleLogin = (e) => {
    e.preventDefault();
    signup_form.style.display="none";
    login_form.style.display = "none";
    otp_form.style.display="flex";
}

signup_form.addEventListener("submit", handleSignup);
login_form.addEventListener("submit", handleLogin)
login_gate.addEventListener("click", loginGate);
