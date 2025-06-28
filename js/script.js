// === Цікаві факти про фрукти ===
const facts = [
    "Банани містять природний антидепресант — серотонін.",
    "Яблука покращують пам’ять і концентрацію.",
    "Манго — один з найстаріших культурних фруктів.",
    "Ківі має більше вітаміну C, ніж апельсин.",
    "Гранат — 'фрукт життя' через свої корисні властивості.",
    "Полуниця — єдиний фрукт із насінням зовні.",
    "Ананас містить фермент бромелайн, що допомагає травленню.",
    "Виноград багатий антиоксидантами для серця.",
    "Персики покращують стан шкіри.",
    "Апельсини підвищують імунітет."
];

const factBtn = document.getElementById('factBtn');
const factContainer = document.getElementById('fact-container');

factBtn.addEventListener('click', () => {
    const idx = Math.floor(Math.random() * facts.length);
    factContainer.textContent = facts[idx];
});

// === Квіз про фрукти ===
const quizData = [
    {
        question: "Який фрукт містить найбільше вітаміну C?",
        answers: ["Яблуко", "Ківі", "Банан", "Апельсин"],
        correct: 1
    },
    {
        question: "Який фрукт називають 'королем фруктів'?",
        answers: ["Манго", "Ананас", "Гранат", "Персик"],
        correct: 0
    },
    {
        question: "Який фрукт має зовнішні насіння?",
        answers: ["Полуниця", "Гранат", "Виноград", "Ківі"],
        correct: 0
    },
    {
        question: "Який фрукт містить фермент бромелайн?",
        answers: ["Ананас", "Манго", "Яблуко", "Банан"],
        correct: 0
    },
    {
        question: "Який фрукт багатий калієм?",
        answers: ["Банан", "Апельсин", "Персик", "Ківі"],
        correct: 0
    }
];

let currentQuiz = 0;
let score = 0;

const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const nextBtn = document.getElementById('nextBtn');
const quizResult = document.getElementById('quiz-result');

function clearAnswers() {
    answersEl.innerHTML = '';
}

function loadQuiz() {
    clearAnswers();
    quizResult.textContent = '';
    nextBtn.disabled = true;
    startTimer();

    const current = quizData[currentQuiz];
    questionEl.textContent = current.question;

    current.answers.forEach((ans, i) => {
        const btn = document.createElement('button');
        btn.textContent = ans;
        btn.addEventListener('click', () => selectAnswer(i, btn));
        answersEl.appendChild(btn);
    });
}

function selectAnswer(selectedIndex, btn) {
    const correctIndex = quizData[currentQuiz].correct;
    const buttons = answersEl.querySelectorAll('button');

    buttons.forEach((button, i) => {
        button.disabled = true;
        if (i === correctIndex) {
            button.classList.add('correct');
        }
    });

    if (selectedIndex === correctIndex) {
        btn.classList.add('correct');
        score++;
    } else {
        btn.classList.add('wrong');
    }

    clearInterval(timerInterval);
    nextBtn.disabled = false;
}

nextBtn.addEventListener('click', () => {
    currentQuiz++;
    if (currentQuiz < quizData.length) {
        loadQuiz();
    } else {
        showResult();
    }
});

function showResult() {
    questionEl.textContent = "Квіз завершено!";
    answersEl.innerHTML = '';
    nextBtn.disabled = true;
    quizResult.textContent = `Ви набрали ${score} з ${quizData.length} правильних відповідей.`;
    timerEl.textContent = '';
}

// === Таймер для квізу (30 секунд) ===
let quizTime = 30;
let timerInterval;
const timerEl = document.createElement('div');
timerEl.style.textAlign = 'center';
timerEl.style.fontWeight = '700';
timerEl.style.fontSize = '18px';
timerEl.style.marginTop = '10px';
document.getElementById('quiz').appendChild(timerEl);

function startTimer() {
    quizTime = 30;
    timerEl.textContent = `Час залишився: ${quizTime} с`;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        quizTime--;
        timerEl.textContent = `Час залишився: ${quizTime} с`;
        if (quizTime <= 0) {
            clearInterval(timerInterval);
            nextBtn.disabled = false;
            quizResult.textContent = 'Час вийшов! Переходьте до наступного питання.';
            document.querySelectorAll('#answers button').forEach(btn => btn.disabled = true);
        }
    }, 1000);
}

// === Міні-гра: збирай фрукти ===
const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');
const startGameBtn = document.getElementById('startGameBtn');

const fruitImages = [
    "./img/apple-svgrepo-com.svg",
    "./img/banana-svgrepo-com.svg",
    "./img/orange-svgrepo-com.svg",
    "./img/watermelon-part-4-svgrepo-com.svg",
    "./img/strawberry-svgrepo-com.svg"
];

let gameInterval;
let gameScore = 0;

function randomPosition(max) {
    return Math.floor(Math.random() * max);
}

function createFruit() {
    const fruit = document.createElement('div');
    fruit.classList.add('fruit-item');
    const imgIndex = Math.floor(Math.random() * fruitImages.length);
    fruit.style.backgroundImage = `url(${fruitImages[imgIndex]})`;
    fruit.style.top = randomPosition(gameArea.clientHeight - 60) + "px";
    fruit.style.left = randomPosition(gameArea.clientWidth - 60) + "px";

    fruit.addEventListener('click', () => {
        gameScore++;
        scoreDisplay.textContent = gameScore;
        gameArea.removeChild(fruit);
    });

    gameArea.appendChild(fruit);

    setTimeout(() => {
        if (gameArea.contains(fruit)) {
            gameArea.removeChild(fruit);
        }
    }, 2000);
}

function startGame() {
    gameScore = 0;
    scoreDisplay.textContent = gameScore;
    gameArea.innerHTML = '';
    startGameBtn.disabled = true;

    gameInterval = setInterval(() => {
        createFruit();
    }, 700);

    setTimeout(() => {
        clearInterval(gameInterval);
        alert(`Гра завершена! Ваш рахунок: ${gameScore}`);
        startGameBtn.disabled = false;
    }, 20000);
}

startGameBtn.addEventListener('click', startGame);

// === Форма відгуку ===
const feedbackForm = document.getElementById('feedback-form');
const feedbackResponse = document.getElementById('feedback-response');

feedbackForm.addEventListener('submit', e => {
    e.preventDefault();

    const name = feedbackForm.name.value.trim();
    const email = feedbackForm.email.value.trim();
    const message = feedbackForm.message.value.trim();

    if (name.length < 2) {
        feedbackResponse.textContent = "Будь ласка, введіть ім'я довше за 2 символи.";
        feedbackResponse.style.color = 'red';
        return;
    }
    if (!email.includes('@') || !email.includes('.')) {
        feedbackResponse.textContent = "Будь ласка, введіть валідний email.";
        feedbackResponse.style.color = 'red';
        return;
    }
    if (message.length < 10) {
        feedbackResponse.textContent = "Повідомлення має містити щонайменше 10 символів.";
        feedbackResponse.style.color = 'red';
        return;
    }

    feedbackResponse.textContent = "Дякуємо за ваш відгук! Ми його отримали.";
    feedbackResponse.style.color = 'green';

    feedbackForm.reset();
});

// === Анімація кнопок (ефект натискання) ===
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('mousedown', () => {
        btn.style.transform = 'scale(0.95)';
    });
    btn.addEventListener('mouseup', () => {
        btn.style.transform = 'scale(1)';
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'scale(1)';
    });
});

// === Плавне прокручування ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// === Ефект появи блоків при скролі ===
const fadeEls = document.querySelectorAll('.fade-on-scroll');

function checkFade() {
    const triggerBottom = window.innerHeight * 0.9;
    fadeEls.forEach(el => {
        const elTop = el.getBoundingClientRect().top;
        if (elTop < triggerBottom) {
            el.classList.add('visible');
        } else {
            el.classList.remove('visible');
        }
    });
}

window.addEventListener('scroll', checkFade);
window.addEventListener('load', checkFade);
