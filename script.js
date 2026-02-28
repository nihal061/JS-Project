let gameSeq = [];
let userSeq = [];
let btns = ["one", "two", "three", "four"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.querySelector("body").addEventListener("keypress", () => {
  if (started == false) {
    started = true;

    levelUp();
  }
});

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let ranInd = Math.floor(Math.random() * 3);
  let ranBtn = btns[ranInd];
  let selectedBtn = document.querySelector(`.${ranBtn}`);

  gameSeq.push(ranBtn);

  btnFlash(selectedBtn);
}

function btnFlash(btn) {
  btn.classList.add("flash");

  setTimeout(() => {
    btn.classList.remove("flash");
  }, 250);
}

let allBtns = document.querySelectorAll(".btn");

for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function btnPress() {
  let btn = this;
  btnFlash(btn);

  let userPress = btn.getAttribute("id");
  userSeq.push(userPress);

  checkAns(userSeq.length - 1);
}

function checkAns(ind) {
  if (userSeq[ind] === gameSeq[ind]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(() => {
      document.querySelector("body").style.backgroundColor = "";
    }, 150);
    h2.innerHTML = `Game Over! Your score is <b>${
      level - 1
    }</b><br>Press any key to restart`;
    reset();
  }
}

function reset() {
  gameSeq = [];
  userSeq = [];
  level = 0;
  started = false;
}
