const questions = [
    { question: "What is the capital of India?", options: ["Mumbai", "Delhi", "Chennai", "Kolkata"], answer: 1 },
    { question: "Who is the President of India?", options: ["Narendra Modi", "Droupadi Murmu", "Rahul Gandhi", "Amit Shah"], answer: 1 },
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 60;

function loadQuestion() {
    clearInterval(timer);
    timeLeft = 60;
    document.getElementById("timer").textContent = timeLeft;

    document.getElementById("question-number").innerText = `Question ${currentQuestion + 1}`;
    document.getElementById("question-text").innerText = questions[currentQuestion].question;

    let options = document.querySelectorAll(".option");
    options.forEach((button, index) => {
        button.innerText = questions[currentQuestion].options[index];
        button.onclick = () => selectOption(index);
    });

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = timeLeft;
        if (timeLeft === 0) {
            nextQuestion();
        }
    }, 1000);
}

function selectOption(selected) {
    clearInterval(timer);
    if (selected === questions[currentQuestion].answer) {
        score += 2;
    } else {
        score -= 0.5;
    }
    nextQuestion();
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        submitExam();
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

function submitExam() {
    clearInterval(timer);
    document.querySelector(".exam-box").style.display = "none";
    document.getElementById("result-container").style.display = "block";

    let ctx = document.getElementById("score-chart").getContext("2d");
    new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Correct", "Incorrect"],
            datasets: [{
                data: [score, questions.length * 2 - score],
                backgroundColor: ["green", "red"]
            }]
        }
    });
}

window.onload = loadQuestion;
