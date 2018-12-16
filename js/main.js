let order = [], playerOrder = [];
let flash, turn, good, compTurn, intervalId, win;
let on = false, strict = false, noise = true;

const turnCnt = document.querySelector("#turn");
const topLeft = document.querySelector("#topleft");
const topRight = document.querySelector("#topright");
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright");
const strictBtn = document.querySelector("#strict");
const onBtn = document.querySelector("#on");
const startBtn = document.querySelector("#start");
const rulesBtn = document.querySelector("#rules-button");
const rulesOuter = document.querySelector(".rules-outer");

strictBtn.addEventListener('click', (event) => {
  if (!strict) {
    strict = true;
    strictBtn.style.backgroundColor = "green";
    strictBtn.innerHTML = "+";
  } else {
    strict = false;
    strictBtn.style.backgroundColor = "red";
    strictBtn.innerHTML = "-";
  }
});

onBtn.addEventListener('click', (event) => {
  if (!on) {
    on = true;
    turnCnt.innerHTML = "--";
    onBtn.style.backgroundColor = "green";
    onBtn.innerHTML = "+";
  } else {
    on = false;
    turnCnt.innerHTML = "";
    onBtn.style.backgroundColor = "red";
    onBtn.innerHTML = "-";
    clearColor();
    clearInterval(intervalId);
  }
});

rulesBtn.addEventListener('click', (event) => {
  $(".rules-outer").fadeIn('slow');
  $(".rules-inner").click(function(e) {
    e.stopPropagation();
  });
});

rulesOuter.addEventListener('click', (event) => {
  $(".rules-outer").fadeOut('slow');
});

startBtn.addEventListener('click', (event) => {
  if (on || win) {
    play();
  }
});

function play() {
  win = false;
  order = [];
  playerOrder = [];
  flash = 0;
  intervalId = 0;
  turn = 1;
  turnCnt.innerHTML = 1;
  good = true;
  for (let i = 0; i < 20; i++) {
    order.push(Math.floor(Math.random() * 4) + 1);
  }
  compTurn = true;

  intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
  on = false;

  if (flash == turn) {
    clearInterval(intervalId);
    compTurn = false;
    clearColor();
    on = true;
  }

  if (compTurn) {
    clearColor();
    setTimeout(() => {
      if (order[flash] == 1) { one(); }
      if (order[flash] == 2) { two(); }
      if (order[flash] == 3) { three(); }
      if (order[flash] == 4) { four(); }
      flash++;
    }, 200);
  }
}

function one() {
  if (noise) {
    let audio = document.getElementById("clip1");
    audio.play();
  }
  noise = true;
  topLeft.style.backgroundColor = "#88f6de";
}

function two() {
  if (noise) {
    let audio = document.getElementById("clip2");
    audio.play();
  }
  noise = true;
  topRight.style.backgroundColor = "#f37d59";
}

function three() {
  if (noise) {
    let audio = document.getElementById("clip3");
    audio.play();
  }
  noise = true;
  bottomLeft.style.backgroundColor = "#bdf359";
}

function four() {
  if (noise) {
    let audio = document.getElementById("clip4");
    audio.play();
  }
  noise = true;
  bottomRight.style.backgroundColor = "#da92ed";
}

function clearColor() {
  topLeft.style.backgroundColor = "rgb(14, 192, 153)";
  topRight.style.backgroundColor = "rgb(230, 66, 17)";
  bottomLeft.style.backgroundColor = "rgb(137, 202, 15)";
  bottomRight.style.backgroundColor = "rgb(126, 26, 151)";
}

function flashColor() {
  topLeft.style.backgroundColor = "#88f6de";
  topRight.style.backgroundColor = "#f37d59";
  bottomLeft.style.backgroundColor = "#bdf359";
  bottomRight.style.backgroundColor = "#da92ed";
}

topLeft.addEventListener('click', () => {
  if (on) {
    playerOrder.push(1);
    check();
    one();
    if (!win) {
      setTimeout(() => { clearColor() }, 300);
    }
  }
});

topRight.addEventListener('click', () => {
  if (on) {
    playerOrder.push(2);
    check();
    two();
    if (!win) {
      setTimeout(() => { clearColor() }, 300);
    }
  }
});

bottomLeft.addEventListener('click', () => {
  if (on) {
    playerOrder.push(3);
    check();
    three();
    if (!win) {
      setTimeout(() => { clearColor() }, 300);
    }
  }
});

bottomRight.addEventListener('click', () => {
  if (on) {
    playerOrder.push(4);
    check();
    four();
    if (!win) {
      setTimeout(() => { clearColor() }, 300);
    }
  }
});

function check() {
  let lastNum = playerOrder.length - 1;
  if (playerOrder[lastNum] !== order[lastNum]) {
    good = false;
  }

  if (lastNum + 1 == 20 && good) {
    winGame();
  }

  if (good == false) {
    flashColor();
    turnCnt.innerHTML = "NO!";
    setTimeout(() => {
      turnCnt.innerHTML = turn;
      clearColor();

      if (strict) {
        play();
      } else {
        compTurn = true;
        flash = 0;
        playerOrder = [];
        good = true;
        intervalId = setInterval(gameTurn, 800);

      }
    }, 800);

    noise = false;
  }

  if (turn == lastNum + 1 && good && !win) {
    turn++;
    playerOrder = [];
    compTurn = true;
    flash = 0;
    turnCnt.innerHTML = turn;
    intervalId = setInterval(gameTurn, 800);
  }
};

function winGame() {
  flashColor();
  turnCnt.innerHTML = "WIN!";
  on = false;
  win = true;
}