const playGame = document.getElementById('play-game');
const canvas = document.querySelector('#game');
const btnArrowUp = document.querySelector('#up');
const btnArrowDown = document.querySelector('#down');
const btnArrowLeft = document.querySelector('#left');
const btnArrowRight = document.querySelector('#right');
const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');
const spanScore = document.querySelector('#score');
const pResult = document.querySelector('.result');
const playAgain = document.querySelector('#play-again');
const playAgainWin = document.querySelector('#play-again--win');
const playAgainOver = document.querySelector('#play-again--over');
const modalGameWin = document.querySelector('#game--win');
const modalGameOver = document.querySelector('#game--over');
const modalStartGame = document.querySelector('#game--start');

playGame.addEventListener('click', setCanvasSize);
// window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

// const ctx = canvas.getContext('2d');
const game = canvas.getContext('2d');

let canvasSize;
let elementSize;
let level = 0;
let lives = 3;

let timeStart;
let timePlayer;
let timeInterval;

const playerPosition = { x: undefined, y: undefined };
const giftPosition = { x: undefined, y: undefined };
const lastPosition = { x: undefined, y: undefined };
let enemiesPosition = [];
let horizontalMovement;
let verticalMovement;

// METODOS:
// game.fillReact(x, y, x, y) donde iniciará nuestro trazo o lo que se desee y donde terminará
// game.fillText

function fixNumber(number, decimals = 1) {
  return Number(number.toFixed(decimals));
}

function setCanvasSize() {
  const isModalStartOpen = modalStartGame.classList.contains('active');
  if (isModalStartOpen) {
    closeModal(modalStartGame);
  }
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.7;
  } else {
    canvasSize = window.innerHeight * 0.7;
  }
  canvasSize = fixNumber(canvasSize);

  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize);

  elementSize = (canvasSize / 10) * 0.97;
  elementSize = fixNumber(elementSize);

  if (playerPosition.x != undefined) {
    playerPosition.x = horizontalMovement * elementSize;
    playerPosition.y = verticalMovement * elementSize;
  }

  startGame();
}

function startGame() {
  game.font = `${elementSize * 0.9}px Verdana`;
  // game.textAlign = 'end';

  // creacrión de la matriz de 10x10
  const map = maps[level];

  const mapRows = map.trim().split('\n');
  const mapElements = mapRows.map((row) => row.trim().split('')); // Array multidimensional

  if (!timeStart) {
    timeStart = Date.now();
    timeInterval = setInterval(showTime, 100);
    showScore();
  }

  // // dibujar la matriz
  // for (let y = 1; y <= 10; y++) {
  //   for (let x = 1; x <= 10; x++) {
  //     game.fillText(emojis[mapElements[y - 1][x - 1]], (elementSize * x) + 7, (elementSize * y) - 7);
  //   }
  // }

  enemiesPosition = [];
  game.clearRect(0, 0, canvasSize, canvasSize);

  mapElements.forEach((row, rowIndex) => {
    row.forEach((colum, columIndex) => {
      const emoji = emojis[colum];
      const posX = fixNumber(elementSize * columIndex);
      const posY = fixNumber(elementSize * (rowIndex + 1));

      game.fillText(emoji, posX, posY);

      if (playerPosition.x == undefined && colum == 'O') {
        playerPosition.x = posX;
        playerPosition.y = posY;

        horizontalMovement = columIndex;
        verticalMovement = rowIndex + 1;

        console.log({ playerPosition });
      } else if (colum == 'I') {
        giftPosition.x = posX;
        giftPosition.y = posY;
      } else if (colum == 'X') {
        enemiesPosition.push({ x: posX, y: posY });
      }
    });
  });

  showLives();
  movePlayer();
  fillLastPosition();

  console.log({ canvasSize, elementSize });

  // game.fillRect(0, 0, 100, 100); // crea una zona en el canvas
  // game.clearRect(50, 50, 100, 100); // borra una zona en el canvas

  // game.font = '25px Verdana';
  // game.fillStyle = 'purple';
  // game.textAlign = 'center';
  // game.fillText('Hola', 100, 100); // escribe un texto en el canvas
}

function movePlayer() {
  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
  console.log({ playerPosition });
}

btnArrowUp.addEventListener('click', moveUp);
btnArrowLeft.addEventListener('click', moveLeft);
btnArrowRight.addEventListener('click', moveRight);
btnArrowDown.addEventListener('click', moveDown);
playAgain.addEventListener('click', restartGame);
playAgainWin.addEventListener('click', restartGame);
playAgainOver.addEventListener('click', restartGame);

// document.addEventListener('keydown', keyPress); // Escucha el teclado solo cuando esta en el documento html
window.addEventListener('keyup', moveByKey); // Escucha el teclado para todo el navegador

function giftCollision() {
  const collisionX = playerPosition.x == giftPosition.x;
  const collisionY = playerPosition.y == giftPosition.y;
  const collision = collisionX && collisionY;

  return collision;
}

function enemiesCollision() {
  const collision = enemiesPosition.find((enemy) => {
    const collisionX = playerPosition.x == enemy.x;
    const collisionY = playerPosition.y == enemy.y;
    return collisionX && collisionY;
  });

  return collision;
}

function levelWin() {
  if (level < maps.length - 1) {
    level++;
    startGame();
  } else {
    gameWin();
  }
}

function levelFail() {
  lastPosition.x = playerPosition.x;
  lastPosition.y = playerPosition.y;

  if (lives == 1) {
    lives--;
    console.log('You Lose!');
  }

  if (lives == 0) {
    clearInterval(timeInterval);
    openModal(modalGameOver);
  }

  if (lives > 1) {
    lives--;
    console.log('You Lose!');
    console.log({ lives });
    playerPosition.x = undefined;
    playerPosition.y = undefined;
  }
}

function gameWin() {
  console.log('You Win!');

  clearInterval(timeInterval);
  openModal(modalGameWin);

  setScore();
}

function setScore() {
  timePlayer = Date.now() - timeStart;

  const recordTime = localStorage.getItem('recordTime');
  console.log({ recordTime, timePlayer });

  if (recordTime == undefined || timePlayer < recordTime) {
    localStorage.setItem('recordTime', timePlayer);
    pResult.innerText = `NEW RECORD ✨`;
  } else {
    pResult.innerText = `No superaste el record 😢`;
  }
}

function showLives() {
  // Array(lives) // [x, x, x]
  const heartsArray = Array(lives).fill(emojis['HEART']);

  // forma 1
  // spanLives.innerText = heartsArray.join('');

  // forma 2
  // spanLives.innerText = '';
  // heartsArray.forEach(heart => spanLives.append(heart));

  // forma 3
  spanLives.innerText = emojis['HEART'].repeat(lives);
}

function showTime() {
  const time = (Date.now() - timeStart) / 1000;
  spanTime.innerText = fixNumber(time) + 's';
}

function showScore() {
  if (!localStorage.getItem('recordTime')) {
    spanScore.innerText = 'No hay record';
  } else {
    const time = localStorage.getItem('recordTime') / 1000;
    spanScore.innerText = fixNumber(time) + 's';
  }
}

function moveByKey(event) {
  if (event.key == 'ArrowUp') moveUp();
  else if (event.key == 'ArrowLeft') moveLeft();
  else if (event.key == 'ArrowRight') moveRight();
  else if (event.key == 'ArrowDown') moveDown();
}

function moveUp() {
  console.log('up');
  const futurePosition = fixNumber(playerPosition.y - elementSize);

  if (futurePosition < elementSize) {
    console.log('OUT');
  } else {
    playerPosition.y = futurePosition;
    verticalMovement--;

    if (enemiesCollision()) {
      game.fillText(
        emojis['BOMB_COLLISION'],
        playerPosition.x,
        playerPosition.y
      );
      levelFail();
    } else if (giftCollision()) {
      levelWin();
    }
    startGame();
  }
}

function moveLeft() {
  console.log('left');
  const futurePosition = fixNumber(playerPosition.x - elementSize);

  if (futurePosition < 0) {
    console.log('OUT');
  } else {
    playerPosition.x = futurePosition;
    horizontalMovement--;

    if (enemiesCollision()) {
      game.fillText(
        emojis['BOMB_COLLISION'],
        playerPosition.x,
        playerPosition.y
      );
      levelFail();
    } else if (giftCollision()) {
      levelWin();
    }
    startGame();
  }
}

function moveRight() {
  console.log('right');
  const futurePosition = fixNumber(playerPosition.x + elementSize);
  const limit = fixNumber(elementSize * 9);

  if (futurePosition > limit) {
    console.log('OUT');
  } else {
    playerPosition.x = futurePosition;
    horizontalMovement++;

    if (enemiesCollision()) {
      game.fillText(
        emojis['BOMB_COLLISION'],
        playerPosition.x,
        playerPosition.y
      );
      levelFail();
    } else if (giftCollision()) {
      levelWin();
    }
    startGame();
  }
}

function moveDown() {
  console.log('down');
  const futurePosition = fixNumber(playerPosition.y + elementSize);
  const limit = fixNumber(elementSize * 10);

  if (futurePosition > limit) {
    console.log('OUT');
  } else {
    playerPosition.y = futurePosition;
    verticalMovement++;

    if (enemiesCollision()) {
      game.fillText(
        emojis['BOMB_COLLISION'],
        playerPosition.x,
        playerPosition.y
      );
      levelFail();
    } else if (giftCollision()) {
      levelWin();
    }
    startGame();
  }
}

function restartGame() {
  const isModalWinOpen = modalGameWin.classList.contains('active');
  const isModalOverOpen = modalGameOver.classList.contains('active');
  level = 0;
  lives = 3;
  timeStart = undefined;
  playerPosition.x = undefined;
  playerPosition.y = undefined;

  if (isModalWinOpen) {
    closeModal(modalGameWin);
  } else if (isModalOverOpen) {
    closeModal(modalGameOver);
  }

  startGame();
}

function closeModal(modal) {
  modal.classList.toggle('inactive');
  modal.classList.toggle('active');
}

function openModal(modal) {
  modal.classList.toggle('active');
  modal.classList.toggle('inactive');
}

function fillLastPosition() { 
  if (lastPosition.x != undefined) {
    game.fillText(emojis['BOMB_COLLISION'], lastPosition.x, lastPosition.y);
    setTimeout(() => {
      lastPosition.x = undefined;
      lastPosition.y = undefined;
      startGame();
    }, 3000);
  }
}
