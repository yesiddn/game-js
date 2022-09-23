const playGameBtn = document.querySelector('#play-game');
const canvas = document.querySelector('#game');

// BUTTONS

// MODALS
const modalStartGame = document.querySelector('#game--start');
const modalGameWin = document.querySelector('#game--win');
const modalGameOver = document.querySelector('#game--over');

// VARIABLES
const game = canvas.getContext('2d');
let canvasSize;
let elementSize;
let level = 0;
let lives = 3;

const playerPosition = { x: undefined, y: undefined };
const giftPosition = { x: undefined, y: undefined };
const lastPosition = { x: undefined, y: undefined };
let enemiesPosition = [];
let horizontalMovement;
let verticalMovement;

/**
 * Function that will fix the number to 1 decimal places or more.
 * @param {*} number Number to fix
 * @param {*} decimals Number of decimals to fix
 * @returns Number with the number of decimals specified
 */
function fixNumber(number, decimals = 1) {
  return Number(number.toFixed(decimals));
}

function isModalOpen() {
  const isModalStartGameOpen = modalStartGame.classList.contains('active');
  const isModalGameWinOpen = modalGameWin.classList.contains('active');
  const isModalGameOverOpen = modalGameOver.classList.contains('active');

  if (isModalStartGameOpen || isModalGameWinOpen || isModalGameOverOpen) {
    return true;
  } else {
    return false;
  }
}

/**
 * Function that will change the state of the modal.
 * If the modal is open, close it.
 * @param {*} modal Name of the modal to change the state
 */
function changeModalState(modal) {
  modal.classList.toggle('inactive');
  modal.classList.toggle('active');
}

function playGame() {
  changeModalState(modalStartGame);

  renderGame();
}

function renderGame() {
  setCanvasSize();
  drawCanvasContent();
  drawPlayer();
}

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.7;
  } else {
    canvasSize = window.innerHeight * 0.7;
  }
  canvasSize = fixNumber(canvasSize);

  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize);

  elementSize = (canvasSize / maps[level].length) * 0.97;
  elementSize = fixNumber(elementSize);
}

// DRAW CANVAS CONTENT
function drawCanvasContent() {
  game.clearRect(0, 0, canvasSize, canvasSize);
  enemiesPosition = [];
  game.font = `${elementSize * 0.85}px Verdana`;

  const map = maps[level];
  const mapRows = map.map((row) => row.split(''));
  mapRows.forEach((row, rowIndex) => {
    row.forEach((colum, columIndex) => {
      const emoji = emojis[colum];
      const posX = fixNumber(columIndex * elementSize);
      const posY = fixNumber((rowIndex + 1) * elementSize);

      drawElement(emoji, posX, posY);

      if (colum == 'X') {
        enemiesPosition.push({ x: posX, y: posY });
      } else if (colum == 'I') {
        giftPosition.x = posX;
        giftPosition.y = posY;
      } else if (colum == 'O' && playerPosition.x == undefined) {
        playerPosition.x = posX;
        playerPosition.y = posY;
        horizontalMovement = columIndex;
        verticalMovement = rowIndex + 1;
      }
    });
  });
}

function drawPlayer() {
  drawElement(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function drawElement(emoji, posX, posY) {
  game.fillText(emoji, posX, posY);
}

function drawLastPosition() {
  if (lastPosition.x != undefined) {
    game.fillText(emojis['BOMB_COLLISION'], lastPosition.x, lastPosition.y);
    setTimeout(() => {
      lastPosition.x = undefined;
      lastPosition.y = undefined;
      renderGame();
    }, 3000);
  }
}

// COLLISIONS
function enemiesCollision() {
  const collision = enemiesPosition.find((enemy) => {
    const collisionX = playerPosition.x == enemy.x;
    const collisionY = playerPosition.y == enemy.y;
    return collisionX && collisionY;
  });

  return collision;
}

// LEVELS LOSE AND WIN
function levelFail() {
  lives--;
  if (lives == 0) {
    changeModalState(modalGameOver);
  } else {
    playerPosition.x = undefined;
    playerPosition.y = undefined;
  }
}

// MOVE PLAYER
function moveByKey(event) {
  if (event.key == 'ArrowUp') moveUp();
  else if (event.key == 'ArrowLeft') moveLeft();
  else if (event.key == 'ArrowRight') moveRight();
  else if (event.key == 'ArrowDown') moveDown();
}

function moveUp() {
  if (isModalOpen()) {
    return;
  }

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
    }
  }

  renderGame();
}

function moveLeft() {
  if (isModalOpen()) {
    console.log('left');
    return;
  }

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
    }
  }

  renderGame();
}

function moveRight() {
  if (isModalOpen()) {
    return;
  }

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
    }
  }

  renderGame();
}

function moveDown() {
  if (isModalOpen()) {
    return;
  }

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
    }
  }

  renderGame();
}

// EVENTS
window.addEventListener('resize', renderGame);
window.addEventListener('load', renderGame);
window.addEventListener('keyup', moveByKey);
playGameBtn.addEventListener('click', playGame);
