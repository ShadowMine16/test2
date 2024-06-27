const questions = [
    {
        question: "Kāda ir Latvijas galvaspilsēta?",
        answers: [
            { text: "Rīga", correct: true },
            { text: "Liepāja", correct: false },
            { text: "Ventspils", correct: false },
            { text: "Daugavpils", correct: false }
        ]
    },
    {
        question: "Kurā gadā Latvija iestājās Eiropas Savienībā?",
        answers: [
            { text: "2004", correct: true },
            { text: "2000", correct: false },
            { text: "1995", correct: false },
            { text: "2010", correct: false }
        ]
    },
    {
        question: "Kurā gadā Latvija atguva savu neatkarību?",
        answers: [
            { text: "1999", correct: false },
            { text: "1989", correct: false },
            { text: "1995", correct: false },
            { text: "1991", correct: true }
        ]
    },
    {
        question: "Kas ir Latvijas nacionālais putns?",
        answers: [
            { text: "Pūķis", correct: false },
            { text: "Baltā Cielava", correct: true },
            { text: "Gulbis", correct: false },
            { text: "Pūce", correct: false }
        ]
    },
    {
        question: "Kurā Latvijas pilsētā atrodas Brīvības piemineklis?",
        answers: [
            { text: "Jelgavā", correct: false },
            { text: "Rīgā", correct: true },
            { text: "Siguldā", correct: false },
            { text: "Liepājā", correct: false }
        ]
    },
    {
        question: "Kura ir Latvijas valsts valoda?",
        answers: [
            { text: "Latviešu valoda", correct: true },
            { text: "Angļu valoda", correct: false },
            { text: "Krievu valoda", correct: false },
            { text: "Vācu valoda", correct: false }
        ]
    },
    {
        question: "Kurš bija Latvijas prezidents (2023. gadā)?",
        answers: [
            { text: "Egils Levits", correct: true },
            { text: "Andris Bērziņš", correct: false },
            { text: "Raimonds Vējonis", correct: false },
            { text: "Vaira Vīķe-Freiberga", correct: false }
        ]
    },
    {
        question: "Kas ir Latvijas nacionālais zieds?",
        answers: [
            { text: "Pienene", correct: false },
            { text: "Astere", correct: false },
            { text: "Pīpene", correct: true },
            { text: "Roze", correct: false }
        ]
    },
    {
        question: "Kura jūra apskalo Latvijas krastus?",
        answers: [
            { text: "Vidusjūra", correct: false },
            { text: "Ziemeļjūra", correct: false },
            { text: "Baltijas jūra", correct: true },
            { text: "Melnā jūra", correct: false }
        ]
    },
    {
        question: "Kas ir Latvijas nacionālais dzīvnieks?",
        answers: [
            { text: "Vilks", correct: false },
            { text: "Brūnais lācis", correct: false },
            { text: "Ezis", correct: false },
            { text: "Taurenis", correct: true }
        ]
    }
];

const questionContainer = document.getElementById('question-container');
const questionNumberElement = document.getElementById('question-number');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');
const nextButton = document.getElementById('next-button');
const restartButton = document.getElementById('restart-button');

let currentQuestionIndex = 0;
let score = 0;

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

restartButton.addEventListener('click', restartQuiz);

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.innerText = 'Punkti: 0';
    nextButton.classList.add('hide');
    restartButton.classList.add('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionNumberElement.innerText = `Jautājums ${currentQuestionIndex + 1} no ${questions.length}`;
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
    resultElement.innerText = '';
    nextButton.classList.add('hide');
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === 'true');
        button.disabled = true;
    });

    if (correct) {
        score++;
        scoreElement.innerText = 'Punkti: ' + score;
        resultElement.innerText = 'Pareizi!';
    } else {
        resultElement.innerText = 'Nepareizi!';
    }

    if (questions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        resultElement.innerText += ` Viktorīna pabeigta! Tavs rezultāts: ${score} no ${questions.length}`;
        restartButton.classList.remove('hide');
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function restartQuiz() {
    restartButton.classList.add('hide');
    startQuiz();
}

startQuiz();
