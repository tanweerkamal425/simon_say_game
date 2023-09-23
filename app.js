let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "purple", "red", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
document.addEventListener("keypress", function() {
    if (started == false) {
        console.log("game started");
        started = true;
        levelUp();
    }
});

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    //random btn choice
    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    // console.log(gameSeq);
    gameFlash(randBtn);
}

function gameFlash(btn) {
    btn.classList.add("game-flash");
    setTimeout(function() {
        btn.classList.remove("game-flash");
    }, 500);
}

function userFlash(btn) {
    btn.classList.add("user-flash");
    setTimeout(function() {
        btn.classList.remove("user-flash");
    }, 250);
}

function btnPress() {
    let btn = this; //the currently pressed btn
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    // console.log(userSeq);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game over, Your score was <b>${level - 1} <br>Press any key to start!`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 200)
        reset();
    }
}

function reset() {
    started = false;
    level = 0;
    userSeq = [];
    gameSeq = [];
}
