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
let userAnswer = [];

const loadQuestion = () => {
  const currentQuestion = questions[questionIndex];
  const answerLength = currentQuestion.answer.length;

  hintTitle.innerHTML = currentQuestion.hint;
  for (let i = 0; i < answerLength; i++) {
    inputs.insertAdjacentHTML(
      "beforeend",
      `<input class="letter" maxlength="1"></input>`
    );
  }

  
};

const nextQuestion = () => {
  // console.log(questions[questionIndex].answer);

  questionIndex++;
  inputs.innerHTML = "";
  loadQuestion();

  if (userWritted.innerHTML === questions[questionIndex].answer)
    console.log("ok");
};

window.addEventListener("load", loadQuestion);
continueBtn.addEventListener("click", nextQuestion);

