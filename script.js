// ===== CONFIG =====
const MAX_QUESTIONS = 3;

const questionsPool = [
    "What's the name of your dream pet dragon?",
    "If you could teleport anywhere right now, where would it be?",
    "What's your go-to karaoke song?",
    "What's your spirit animal and why?",
    "Describe your perfect lazy Sunday in one sentence",
    "If you had a theme song, what would it be?",
    "What's the strangest dream you've ever had?"
];

const symbols = ["!", "@", "#", "$", "%", "^", "&", "*", "~", "?"];

// ===== STATE =====
let username = "";
let answers = [];
let usedQuestions = new Set();
let answeredCount = 0;
let generatedPassword = "";

// ===== HELPERS =====
function showSection(id) {
    document.querySelectorAll(".section")
        .forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

// ===== AUTH FLOW =====
function startLogin() {
    username = document.getElementById("username").value.trim();
    if (!username) return alert("Please enter an email or cellphone.");
    showSection("mfa");
}

function verifyMFA() {
    const code = document.getElementById("mfa-code").value.trim();
    if (!/^\d{6}$/.test(code)) {
        return alert("Enter any 6-digit number.");
    }
    showSection("questionnaire");
    loadNextQuestion();
}

function backToLogin() {
    showSection("login");
}

// ===== QUESTIONS =====
function loadNextQuestion() {
    if (usedQuestions.size >= questionsPool.length) {
        usedQuestions.clear();
    }

    let idx;
    do {
        idx = Math.floor(Math.random() * questionsPool.length);
    } while (usedQuestions.has(idx));

    usedQuestions.add(idx);
    document.getElementById("question-text").textContent = questionsPool[idx];
    document.getElementById("answer").value = "";
}

function submitAnswer() {
    const ans = document.getElementById("answer").value.trim();
    if (!ans) return alert("Answer or skip.");

    answers.push(ans);
    answeredCount++;
    document.getElementById("count").textContent = answeredCount;

    if (answeredCount >= MAX_QUESTIONS) {
        generatePassword();
    } else {
        loadNextQuestion();
    }
}

function skipQuestion() {
    loadNextQuestion();
}

// ===== PASSWORD LOGIC =====
function generatePassword() {
    const seed = sha256(username.toLowerCase());
    const combined = answers.join("") + seed;
    const hash = sha256(combined);

    let baseWord = answers[parseInt(hash.slice(0, 8), 16) % answers.length]
        .replace(/\s+/g, "")
        .toLowerCase();

    baseWord = baseWord.charAt(0).toUpperCase() + baseWord.slice(1, 8);

    const sym = symbols[parseInt(hash.slice(8, 10), 16) % symbols.length];
    const num = (parseInt(hash.slice(10, 14), 16) % 900) + 100;

    generatedPassword = `${baseWord}${sym}${num}`;

    document.getElementById("password-display").textContent = generatedPassword;
    showSection("result");
}

// ===== COPY =====
function copyPassword() {
    navigator.clipboard.writeText(generatedPassword).then(() => {
        const msg = document.getElementById("copy-msg");
        msg.textContent = "Copied 🔒";
        setTimeout(() => msg.textContent = "", 2500);
    });
}

// ===== RESET =====
function resetAll() {
    username = "";
    answers = [];
    usedQuestions.clear();
    answeredCount = 0;
    generatedPassword = "";

    document.getElementById("username").value = "";
    document.getElementById("mfa-code").value = "";
    document.getElementById("count").textContent = "0";

    showSection("login");
}

// INIT
showSection("login");

