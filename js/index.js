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
const toast = document.querySelector(".toast");
const toastMessage = document.querySelector(".toast-message")
const toastIcon = document.querySelector(".toast-icon")
const processBar = document.querySelector(".process")
const modalScreen = document.querySelector(".modal-screen")
const modalCard = document.querySelector(".modal-card")
const tryAgainBtn = document.querySelector("#try-again")

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
        if (index > 0) {
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


  toast.classList.remove("hidden")
  let processBarWidth = 0;

  if (userWritted.innerHTML === questions[questionIndex].answer) {
    currentScore += questions[questionIndex].score;
    score.innerHTML = currentScore;
    remainingGuess = 3;

    toast.classList.add("success")
    toastMessage.innerHTML = "آفرین، درست جواب دادی!"
    toastIcon.innerHTML = 
    `<i>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
        <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clip-rule="evenodd" />
      </svg>            
    </i>`

    let timer = setInterval( () => {
      continueBtn.classList.add("disabled")
      processBar.style.width = `${processBarWidth++}%`
      if (processBarWidth === 100) {
        continueBtn.classList.remove("disabled")
        processBarWidth = 0;
        inputs.innerHTML = "";
        questionIndex++;
        clearInterval(timer);

        loadQuestion()
      }
    }, 30)
    setTimeout(() => {
      toast.classList.add("hidden")
      toast.classList.remove("success")
    }, 3200);
  } else {
    remainingGuess--;

    toast.classList.add("error")
    toastMessage.innerHTML = "پاسخ اشتباه بود!"
    toastIcon.innerHTML = 
    `<i>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
        <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
      </svg>    
    </i>`

    let timer = setInterval( () => {
      processBar.style.width = `${processBarWidth++}%`
      if (processBarWidth === 100) {
        processBarWidth = 0;
        clearInterval(timer);
      }
    }, 30)
    setTimeout(() => {
      toast.classList.add("hidden")
      toast.classList.remove("error")
    }, 3200);

    if (remainingGuess === 0) {
      modalScreen.classList.remove("hidden")
      modalCard.classList.add("error")
    }
  }

  inputs.innerHTML = "";
  userAnswer = [];
  userWritted.innerHTML = ""
  loadQuestion();
};

const resetGame = () => {
  inputs.innerHTML = "";
  remainingGuess = 3;
  currentScore = 0;
  score.innerHTML = 0;
  questionIndex = 0;
  userAnswer = [];
  userWritted.innerHTML = ""

  loadQuestion();
};

window.addEventListener("load", loadQuestion);
continueBtn.addEventListener("click", nextQuestion);
resetBtn.addEventListener("click", resetGame);
tryAgainBtn.addEventListener("click" , ()=>{
  resetGame()
  modalScreen.classList.add("hidden")
  modalCard.classList.remove("error")
})