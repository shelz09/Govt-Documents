const login_gate = document.querySelector('.login-gate');
const openAlert = document.getElementById("dashboard-btn");
const closeAlert = document.querySelector(".alert-btn");
const alertbox = document.querySelector(".alert");
const lightmode = document.querySelector(".light-mode-btn");
const nightmode = document.querySelector(".night-mode-btn");
const navbar = document.querySelector(".navbar");
const SignupForm = document.querySelector(".sign-up-form");
const loginForm = document.querySelector(".login-form");
const loginGate = document.querySelector(".login-gate");
const namelabel = document.querySelector(".nameLabel");
const adhrlbl = document.querySelector(".aadhaarLabel");
const SignupGate = document.querySelector(".signup-gate");

const handleScroll = () => {
    if(window.scrollY > 10){
        navbar.style.backdropFilter = "blur(10px)";
    }
    else{
        navbar.style.backgroundColor = "transparent";
    }
}


window.addEventListener("scroll", handleScroll);


// --- Apply saved theme on page load ---
if (localStorage.getItem("theme") === "night") {
    document.body.classList.add("night-mode");
    lightmode.classList.remove("hide");
    nightmode.classList.add("hide");
} else {
    document.body.classList.remove("night-mode");
    lightmode.classList.add("hide");
    nightmode.classList.remove("hide");
}

// --- Page redirection ---


// --- Alert toggle ---
openAlert.addEventListener("click", () => {
    alertbox.classList.toggle("hide");
});
closeAlert.addEventListener("click", () => {
    alertbox.classList.add("hide");
});

// --- Night Mode On ---
nightmode.addEventListener("click", () => {
    document.body.classList.add("night-mode");
    localStorage.setItem("theme", "night");
    lightmode.classList.remove("hide");
    nightmode.classList.add("hide");
});

// --- Light Mode On ---
lightmode.addEventListener("click", () => {
    document.body.classList.remove("night-mode");
    localStorage.setItem("theme", "light");
    lightmode.classList.add("hide");
    nightmode.classList.remove("hide");
});

loginGate.addEventListener("click", ()=>{
    loginForm.classList.remove("hide");
    SignupForm.classList.add("hide");
})

SignupGate.addEventListener("click", ()=>{
    loginForm.classList.add("hide");
    SignupForm.classList.remove("hide");
})