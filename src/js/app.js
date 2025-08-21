


const signup_form = document.querySelector(".sign-up-form");
const otp_form = document.querySelector(".otp-verify-form");
const login_gate = document.querySelector('.login-gate');
const login_form = document.querySelector(".login-form");
const openAlert = document.getElementById("dashboard-btn")
const closeAlert = document.querySelector(".alert-btn");
const alertbox = document.querySelector(".alert");
const lightmode = document.querySelector(".light-mode-btn");
const nightmode = document.querySelector(".night-mode-btn");




openAlert.addEventListener("click", ()=>{
    alertbox.classList.toggle("hide");
});
closeAlert.addEventListener("click", ()=>{
    alertbox.classList.add("hide");
})
nightmode.addEventListener("click", ()=>{
    document.body.classList.add("night-mode");
    lightmode.classList.remove("hide");
    nightmode.classList.add("hide");
})
lightmode.addEventListener("click", ()=>{
    document.body.classList.remove("night-mode");
    lightmode.classList.add("hide");
    nightmode.classList.remove("hide");
})
