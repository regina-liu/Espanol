
// JavaScript 主控制檔：app.js

let vocabularyData = [];
let currentMode = null;
let totalQuestions = 0;
let correctAnswers = 0;
let mistakeSet = [];

window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("nav button").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentMode = btn.dataset.mode;
      totalQuestions = 0;
      correctAnswers = 0;
      loadMode(currentMode);
    });
  });
});

function updateProgress(main) {
  const progress = document.createElement("p");
  progress.innerHTML = `進度：${correctAnswers}/${totalQuestions} 題正確`;
  main.appendChild(progress);
}

function updateFamiliarity(word, correct) {
  if (correct) {
    word.familiar = Math.min(5, word.familiar + 1);
  } else {
    word.familiar = Math.max(1, word.familiar - 1);
    mistakeSet.push(word);
  }
}

function renderAudioTyping() {
  const main = document.getElementById("main-content");
  main.innerHTML = `<h2>聽力拼字</h2>`;
  const word = vocabularyData[Math.floor(Math.random() * vocabularyData.length)];
  const playBtn = document.createElement("button");
  playBtn.textContent = "播放語音";
  playBtn.onclick = () => speakText(word.es);

  const input = document.createElement("input");
  input.placeholder = "請輸入聽到的西文單字";

  const submit = document.createElement("button");
  submit.textContent = "送出";
  submit.onclick = () => {
    totalQuestions++;
    const isCorrect = input.value.trim().toLowerCase() === word.es.toLowerCase();
    updateFamiliarity(word, isCorrect);
    if (isCorrect) {
      alert("正確！");
      correctAnswers++;
    } else {
      alert(`錯誤，正確答案是：${word.es}`);
    }
    renderAudioTyping();
  };

  main.appendChild(playBtn);
  main.appendChild(input);
  main.appendChild(submit);
  updateProgress(main);
}

function renderTypingFromZh() {
  const main = document.getElementById("main-content");
  main.innerHTML = `<h2>中文提示 → 拼西文</h2>`;
  const word = vocabularyData[Math.floor(Math.random() * vocabularyData.length)];
  const prompt = document.createElement("p");
  prompt.textContent = `請輸入「${word.zh}」的西文：`;

  const input = document.createElement("input");
  input.placeholder = "請輸入西文單字";

  const submit = document.createElement("button");
  submit.textContent = "送出";
  submit.onclick = () => {
    totalQuestions++;
    const isCorrect = input.value.trim().toLowerCase() === word.es.toLowerCase();
    updateFamiliarity(word, isCorrect);
    if (isCorrect) {
      alert("正確！");
      correctAnswers++;
    } else {
      alert(`錯誤，正確答案是：${word.es}`);
    }
    renderTypingFromZh();
  };

  main.appendChild(prompt);
  main.appendChild(input);
  main.appendChild(submit);
  updateProgress(main);
}

function renderFillInBlank() {
  const main = document.getElementById("main-content");
  main.innerHTML = `<h2>例句填空</h2>`;
  const word = vocabularyData[Math.floor(Math.random() * vocabularyData.length)];
  const sentence = `Mi ___ favorito es el ${word.es}.`;

  const prompt = document.createElement("p");
  prompt.textContent = sentence;

  const input = document.createElement("input");
  input.placeholder = "請填入缺漏的單字";

  const submit = document.createElement("button");
  submit.textContent = "送出";
  submit.onclick = () => {
    totalQuestions++;
    const isCorrect = input.value.trim().toLowerCase() === word.es.toLowerCase();
    updateFamiliarity(word, isCorrect);
    if (isCorrect) {
      alert("正確！");
      correctAnswers++;
    } else {
      alert(`錯誤，正確答案是：${word.es}`);
    }
    renderFillInBlank();
  };

  main.appendChild(prompt);
  main.appendChild(input);
  main.appendChild(submit);
  updateProgress(main);
}

function renderMistakeReview() {
  const main = document.getElementById("main-content");
  main.innerHTML = `<h2>錯題複習</h2>`;
  if (mistakeSet.length === 0) {
    main.innerHTML += `<p>目前沒有錯題可複習！</p>`;
    return;
  }
  const word = mistakeSet[Math.floor(Math.random() * mistakeSet.length)];

  const prompt = document.createElement("p");
  prompt.textContent = `請輸入「${word.zh}」的西文：`;

  const input = document.createElement("input");
  const submit = document.createElement("button");
  submit.textContent = "送出";
  submit.onclick = () => {
    const isCorrect = input.value.trim().toLowerCase() === word.es.toLowerCase();
    updateFamiliarity(word, isCorrect);
    if (isCorrect) {
      alert("正確！");
      mistakeSet = mistakeSet.filter((w) => w !== word);
    } else {
      alert(`錯誤，正確答案是：${word.es}`);
    }
    renderMistakeReview();
  };

  main.appendChild(prompt);
  main.appendChild(input);
  main.appendChild(submit);
}

// 響應式樣式可用 CSS 實作，請搭配 styles.css
