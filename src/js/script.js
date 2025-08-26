// ---------------- DOM ELEMENTS ----------------
const lightmode = document.querySelector(".light-mode-btn");
const nightmode = document.querySelector(".night-mode-btn");
const navbar = document.querySelector(".navbar");
const SignupForm = document.querySelector(".sign-up-form");
const loginForm = document.querySelector(".login-form");
const loginGate = document.querySelector(".login-gate");
const logout = document.getElementById("dashboard-btn");
const SignupGate = document.querySelector(".signup-gate");
const submit = document.querySelector(".submit");

const fileInput = document.getElementById('customFile');
const dashBody = document.querySelector('.dash-body');
const sideBody = document.querySelector('.side-body');

// ---------------- LOCAL STORAGE FUNCTIONS ----------------
function saveFileToLocalStorage(fileMeta) {
    let files = JSON.parse(localStorage.getItem('files')) || [];
    files.push(fileMeta);
    localStorage.setItem('files', JSON.stringify(files));
}

function removeFileFromLocalStorage(fileName) {
    let files = JSON.parse(localStorage.getItem('files')) || [];
    files = files.filter(f => f.fileName !== fileName);
    localStorage.setItem('files', JSON.stringify(files));
}

function loadFilesFromLocalStorage() {
    const files = JSON.parse(localStorage.getItem('files')) || [];
    files.forEach(fileMeta => {
        renderFileCard(fileMeta);
    });
}

// ---------------- FILE TO BASE64 ----------------
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result); // Base64 string
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}

// ---------------- RENDER FILE CARD ----------------
function renderFileCard(fileMeta) {
    const card = document.createElement('div');
    card.classList.add('file-card');
    card.style.backgroundImage = `url(${fileMeta.fileData})`;
    card.style.backgroundSize = 'cover';
    card.style.backgroundPosition = 'center';

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    // --- Share Button ---
    const shareBtn = document.createElement('button');
    shareBtn.textContent = 'Share';
    shareBtn.classList.add('share-btn');
    shareBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = fileMeta.fileData;
        link.download = fileMeta.fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // --- Delete Button ---
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
        card.remove();
        span.remove();
        removeFileFromLocalStorage(fileMeta.fileName);
    });

    overlay.appendChild(shareBtn);
    overlay.appendChild(deleteBtn);
    card.appendChild(overlay);
    dashBody.appendChild(card);

    // --- Sidebar ---
    const span = document.createElement('span');
    span.classList.add('items');
    span.textContent = fileMeta.fileName;
    sideBody.appendChild(span);
}

// ---------------- FILE UPLOAD HANDLER ----------------
fileInput.addEventListener('change', async function () {
    const file = fileInput.files[0];
    if (!file) return;

    const base64Data = await fileToBase64(file);

    const fileMeta = {
        fileName: file.name,
        fileData: base64Data, // store Base64 instead of blob URL
        size: file.size,
        type: file.type,
        uploadTime: new Date().toISOString()
    };

    renderFileCard(fileMeta);
    saveFileToLocalStorage(fileMeta);
});

// ---------------- LOAD FILES FROM LOCAL STORAGE ON PAGE LOAD ----------------
loadFilesFromLocalStorage();

// ---------------- SCROLL NAVBAR EFFECT ----------------
const handleScroll = () => {
    navbar.style.backdropFilter = window.scrollY > 10 ? "blur(10px)" : "none";
    navbar.style.backgroundColor = window.scrollY > 10 ? "rgba(0,0,0,0.2)" : "transparent";
};
window.addEventListener("scroll", handleScroll);

// ---------------- THEME TOGGLE ----------------
if (localStorage.getItem("theme") === "night") {
    document.body.classList.add("night-mode");
    lightmode.classList.remove("hide");
    nightmode.classList.add("hide");
} else {
    document.body.classList.remove("night-mode");
    lightmode.classList.add("hide");
    nightmode.classList.remove("hide");
}

nightmode.addEventListener("click", () => {
    document.body.classList.add("night-mode");
    localStorage.setItem("theme", "night");
    lightmode.classList.remove("hide");
    nightmode.classList.add("hide");
});

lightmode.addEventListener("click", () => {
    document.body.classList.remove("night-mode");
    localStorage.setItem("theme", "light");
    lightmode.classList.add("hide");
    nightmode.classList.remove("hide");
});

// ---------------- LOGIN & SIGNUP TOGGLE ----------------
loginGate.addEventListener("click", () => {
    loginForm.classList.remove("hide");
    SignupForm.classList.add("hide");
});

SignupGate.addEventListener("click", () => {
    loginForm.classList.add("hide");
    SignupForm.classList.remove("hide");
});

// ---------------- LOGOUT ----------------
logout.addEventListener("click", () => {
    document.querySelector(".main").classList.remove("hide");
    document.querySelector(".dashboard").classList.add("hide");
    logout.classList.add("hide");
});

// ---------------- SUBMIT BUTTON ----------------
submit.addEventListener("click", () => {
    logout.classList.add("remove");
});

// ---------------- SIDEBAR TOGGLE ----------------
function closeSidebar() {
    document.querySelector(".sidebar").classList.toggle("hide"); 
    document.querySelector(".dash-body").classList.toggle("width");
}
document.querySelector(".sidebarbtn").addEventListener("click", closeSidebar);
