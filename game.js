const canvas = document.querySelector('#game');
const btnArrowUp = document.querySelector('#up');
const btnArrowDown = document.querySelector('#down');
const btnArrowLeft = document.querySelector('#left');
const btnArrowRight = document.querySelector('#right');
const spanLives = document.querySelector('#lives');

// const ctx = canvas.getContext('2d');
const game = canvas.getContext('2d');

let canvasSize;
let elementSize;
let level = 0;
let lives = 3;

const playerPosition = { x: undefined, y: undefined };
const giftPosition = { x: undefined, y: undefined };
let enemiesPosition = [];
let horizontalMovement;
let verticalMovement;

// METODOS:
// game.fillReact(x, y, x, y) donde iniciará nuestro trazo o lo que se desee y donde terminará
// game.fillText

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }

  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize);

  elementSize = (canvasSize / 10) * 0.97;

  if (playerPosition.x != undefined) {
    playerPosition.x = horizontalMovement * elementSize;
    playerPosition.y = verticalMovement * elementSize;
  }

  startGame();
}

function startGame() {
  game.font = `${elementSize}px Verdana`;
  // game.textAlign = 'end';

  // creacrión de la matriz de 10x10
  const map = maps[level];

  const mapRows = map.trim().split('\n');
  const mapElements = mapRows.map((row) => row.trim().split('')); // Array multidimensional

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
      const posX = elementSize * columIndex;
      const posY = elementSize * (rowIndex + 1);

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

// document.addEventListener('keydown', keyPress); // Escucha el teclado solo cuando esta en el documento html
window.addEventListener('keyup', moveByKey); // Escucha el teclado para todo el navegador

function giftCollision() {
  const collisionX = playerPosition.x.toFixed(2) == giftPosition.x.toFixed(2);
  const collisionY = playerPosition.y.toFixed(2) == giftPosition.y.toFixed(2);
  const collision = collisionX && collisionY;

  if (collision) {
    levelWin();
  }
}

function enemiesCollision() {
  const collision = enemiesPosition.find((enemy) => {
    const collisionX = playerPosition.x.toFixed(2) == enemy.x.toFixed(2);
    const collisionY = playerPosition.y.toFixed(2) == enemy.y.toFixed(2);
    return collisionX && collisionY;
  });

  return collision;
}

function levelWin() {
  if (level < maps.length - 1) {
    level++;
  } else {
    gameWin();
  }
}

function levelFail() {
  lives--;
  console.log('You Lose!');
  console.log({ lives });
  playerPosition.x = undefined;
  playerPosition.y = undefined;

  if (lives == 0) {
    level = 0;
    lives = 3;
  }
}

function gameWin() {
  console.log('You Win!');
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

function moveByKey(event) {
  if (event.key == 'ArrowUp') moveUp();
  else if (event.key == 'ArrowLeft') moveLeft();
  else if (event.key == 'ArrowRight') moveRight();
  else if (event.key == 'ArrowDown') moveDown();
}

function moveUp() {
  console.log('up');

  if ((playerPosition.y - elementSize).toFixed(2) < elementSize) {
    console.log('OUT');
  } else {
    playerPosition.y -= elementSize;
    verticalMovement--;

    if (enemiesCollision()) {
      levelFail();
    } else {
      giftCollision();
    }
    startGame();
  }
}

function moveLeft() {
  console.log('left');

  if ((playerPosition.x - elementSize).toFixed(2) < 0) {
    console.log('OUT');
  } else {
    playerPosition.x -= elementSize;
    horizontalMovement--;

    if (enemiesCollision()) {
      levelFail();
    } else {
      giftCollision();
    }
    startGame();
  }
}

function moveRight() {
  console.log('right');

  if ((playerPosition.x + elementSize).toFixed(2) > elementSize * 9) {
    console.log('OUT');
  } else {
    playerPosition.x += elementSize;
    horizontalMovement++;

    if (enemiesCollision()) {
      levelFail();
    } else {
      giftCollision();
    }
    startGame();
  }
}

function moveDown() {
  console.log('down');

  if ((playerPosition.y + elementSize).toFixed(2) > elementSize * 10) {
    console.log('OUT');
  } else {
    playerPosition.y += elementSize;
    verticalMovement++;

    if (enemiesCollision()) {
      levelFail();
    } else {
      giftCollision();
    }
    startGame();
  }
}
