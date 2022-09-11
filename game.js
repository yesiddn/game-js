const canvas = document.querySelector('#game');
// const ctx = canvas.getContext('2d');
const game = canvas.getContext('2d');

// METODOS:
// game.fillReact(x, y, x, y) donde iniciará nuestro trazo o lo que se desee y donde terminará
// game.fillText

window.addEventListener('load', startGame);

function startGame() {
  game.fillRect(0, 0, 100, 100); // crea una zona en el canvas
  game.clearRect(50, 50, 100, 100); // borra una zona en el canvas

  game.font = '25px Verdana';
  game.fillStyle = 'purple';
  game.textAlign = 'center';
  game.fillText('Hola', 100, 100); // escribe un texto en el canvas
}
