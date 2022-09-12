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

  elementSize = (canvasSize / 10) * 0.97;

  startGame();
}

function startGame() {
  game.font = `${elementSize}px Verdana`;
  // game.textAlign = 'end';

  // creacrión de la matriz de 10x10
  const map = maps[0];
  const mapRows = map.trim().split('\n');
  const mapElements = mapRows.map((row) => row.trim().split('')); // Array multidimensional

  // // dibujar la matriz
  // for (let y = 1; y <= 10; y++) {
  //   for (let x = 1; x <= 10; x++) {
  //     game.fillText(emojis[mapElements[y - 1][x - 1]], (elementSize * x) + 7, (elementSize * y) - 7);
  //   }
  // }

  mapElements.forEach((row, rowIndex) => {
    row.forEach((colum, columIndex) => {
      const emoji = emojis[colum];
      const x = (elementSize * columIndex) - 1.5;
      const y = elementSize * (rowIndex + 1);

      game.fillText(emoji, x, y);

      console.log({ emoji, row, rowIndex, colum, columIndex, x, y });
    });
  });

  console.log({ canvasSize, elementSize });

  // game.fillRect(0, 0, 100, 100); // crea una zona en el canvas
  // game.clearRect(50, 50, 100, 100); // borra una zona en el canvas

  // game.font = '25px Verdana';
  // game.fillStyle = 'purple';
  // game.textAlign = 'center';
  // game.fillText('Hola', 100, 100); // escribe un texto en el canvas
}