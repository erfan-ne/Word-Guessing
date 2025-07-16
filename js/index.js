const questions = [
  {
    hint: "زبان نشانه‌گذاری که برای ساختاردهی صفحات وب استفاده می‌شود",
    answer: "HTML",
    score: 1,
  },
  {
    hint: "زبانی که برای استایل‌دهی به صفحات وب استفاده می‌شود",
    answer: "CSS",
    score: 0.75,
  },
  {
    hint: "زبانی که باعث زنده شدن صفحات وب می‌شود",
    answer: "JAVASCRIPT",
    score: 1.75,
  },
  {
    hint: "لایبرری محبوب جاوااسکریپت برای ساخت رابط کاربری",
    answer: "REACT",
    score: 1.5,
  },
  {
    hint: "ابزاری برای مدیریت و نسخه‌بندی کدها",
    answer: "GIT",
    score: 0.5,
  },
  {
    hint: "زبان برنامه‌نویسی تایپ‌محور که روی جاوااسکریپت ساخته شده است",
    answer: "TYPESCRIPT",
    score: 1.25,
  },
  {
    hint: "سیستمی که برای طراحی ریسپانسیو استفاده می‌شود",
    answer: "BOOTSTRAP",
    score: 1,
  },
  {
    hint: "فرمت محبوب برای تصاویر وکتوری در وب",
    answer: "SVG",
    score: 0.75,
  },
  {
    hint: "ابزاری برای بسته‌بندی ماژول‌های جاوااسکریپت",
    answer: "WEBPACK",
    score: 1,
  },
  {
    hint: "سرویسی برای میزبانی کد و همکاری تیمی",
    answer: "GITHUB",
    score: 0.5,
  },
];

const inputs = document.querySelector(".inputs");
const hintTitle = document.querySelector(".hint-title");
const userWritted = document.querySelector(".user-writted");
const guessCount = document.querySelector(".guess-count");
const score = document.querySelector(".score");
const continueBtn = document.querySelector(".continue");
const resetBtn = document.querySelector(".reset");

let questionIndex = 0;
let currentScore = 0;
let remainingGuess = 3;
let userAnswer = [];

const loadQuestion = () => {
  const currentQuestion = questions[questionIndex];
  const answerLength = currentQuestion.answer.length;

  guessCount.innerHTML = remainingGuess;

  hintTitle.innerHTML = currentQuestion.hint;
  for (let i = 0; i < answerLength; i++) {
    inputs.insertAdjacentHTML(
      "beforeend",
      `<input class="letter" maxlength="1"></input>`
    );
  }

  const letters = document.querySelectorAll(".letter");

  letters.forEach((letter, index) => {
    const regex = /^[a-zA-Z]$/;

    letter.addEventListener("input", () => {
      if (regex.test(letter.value)) {
        userAnswer[index] = letter.value.toUpperCase();
        userWritted.innerHTML = userAnswer.join("");
      }
    });

    letter.addEventListener("keyup", (event) => {
      if (!regex.test(event.key)) {
        event.target.value = "";
      }
      if (event.key === "Backspace") {
          userAnswer[index] = "";
          userWritted.innerHTML = userAnswer.join("");
          letters[index].value = "";
          if(index > 0){
            letters[index - 1].value = "";
            userAnswer[index - 1] = "";
            userWritted.innerHTML = userAnswer.join("");
            letters[index - 1].focus();
          }
      }
      if (event.target.value.length === 1 && index < answerLength - 1) {
        letters[index + 1].focus();
      }
    });
  });

  letters[0].focus();
};

const nextQuestion = () => {
  if (userWritted.innerHTML === questions[questionIndex].answer) {
    currentScore += questions[questionIndex].score;
    score.innerHTML = currentScore;
    questionIndex++;
  } else {
    remainingGuess--;
  }

  inputs.innerHTML = "";
  userAnswer = [];
  loadQuestion();
};

const resetGame = () => {
  remainingGuess = 3
  currentScore = 0
  questionIndex = 0
  userAnswer = []

  loadQuestion()
}

window.addEventListener("load", loadQuestion);
continueBtn.addEventListener("click", nextQuestion);
resetBtn.addEventListener("click", resetGame)

