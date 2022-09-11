const canvas = document.querySelector('#game');
// const ctx = canvas.getContext('2d');
const game = canvas.getContext('2d');

let canvasSize;
let elementSize;

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

  elementSize = canvasSize / 10;

  startGame();
}

function startGame() {
  game.font = `${elementSize}px Verdana`;
  // game.textAlign = 'end';

  // Horizontal
  for (let i = 1; i <= 10; i++) {
    for (let j = 0; j < 10; j++) {
      game.fillText(emojis['X'], (elementSize * j) - 7, (elementSize * i) - 6);
    }
  }

  console.log({ canvasSize, elementSize });

  // game.fillRect(0, 0, 100, 100); // crea una zona en el canvas
  // game.clearRect(50, 50, 100, 100); // borra una zona en el canvas

  // game.font = '25px Verdana';
  // game.fillStyle = 'purple';
  // game.textAlign = 'center';
  // game.fillText('Hola', 100, 100); // escribe un texto en el canvas
}