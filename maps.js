/*
 * Reglas:
 * El final de cada nivel debe ser el inicio del siguiente
 */

const emojis = {
  '-': ' ',
  O: '🚪',
  X: '💣',
  I: '🎁',
  PLAYER: '💀',
  BOMB_COLLISION: '🔥',
  GAME_OVER: '👎',
  WIN: '🏆',
  HEART: '❤️',
};

const maps = [];
maps.push([
  'IXXXXXXXXX',
  '-XXXXXXXXX',
  '-XXXXXXXXX',
  '-XXXXXXXXX',
  '-XXXXXXXXX',
  '-XXXXXXXXX',
  '-XXXXXXXXX',
  '-XXXXXXXXX',
  '-XXXXXXXXX',
  'OXXXXXXXXX',
]);

maps.push([
  'O--XXXXXXX',
  'X--XXXXXXX',
  'XX----XXXX',
  'X--XX-XXXX',
  'X-XXX--XXX',
  'X-XXXX-XXX',
  'XX--XX--XX',
  'XX--XXX-XX',
  'XXXX---IXX',
  'XXXXXXXXXX'
]);
maps.push([
  'I-----XXXX',
  'XXXXX-XXXX',
  'XX----XXXX',
  'XX-XXXXXXX',
  'XX-----XXX',
  'XXXXXX-XXX',
  'XX-----XXX',
  'XX-XXXXXXX',
  'XX-----OXX',
  'XXXXXXXXXX'
]);
maps.push([
  'OX--------',
  '-X-XXXXXX-',
  '-X-X----X-',
  '-X-X-XX-X-',
  '-X-X-XX-X-',
  '-X-X-IX-X-',
  '-X-XXXX-X-',
  '-X------X-',
  '-XXXXXXXX-',
  '----------'
]);

maps.push([
  'XXXXXX--XX',
  'X--------X',
  'X-XXXXXX-X',
  'X-X----X-X',
  'X-X-XX-X-X',
  'X-X-XO-X-X',
  'X-X-XX-X-X',
  'X---XX-X-X',
  'XXXX--XX-X',
  'X--------I',
]);

maps.push([
  '----------',
  '-XXXXXX-XX',
  '-X------XX',
  '-X-XX-XXXX',
  '-X-XX-XXXX',
  '-X-XX--I-X',
  '-X-XXXXXXX',
  '-X-------X',
  '-XXXXXXXXX',
  '---------O',
]);

maps.push([
  'XXXXXX-XXX',
  'X--------X',
  'X-XX-XXXXX',
  'X-XX-XXXXX',
  'X-XX--XXXX',
  'X-XX---OXX',
  'X-X-XX-XXX',
  'X-XX-XXXXX',
  'X--------I',
  'XXXXXXXXXX',
]);

maps.push([
  '----------',
  '-XXXXXX--X',
  '-X-----X-X',
  '-X-XXXXX-X',
  '-X-XXX-X-X',
  '-X-XXX-X-X',
  '-X-IXX-X-X',
  '-XXXXXXX-X',
  '-X-XXX-X-O',
  '-------IXX',
]);

maps.push([
  'XXXXXXXXXXXXXXXXXXXX',
  'X-------I----------X',
  'X-XXXXXXXXXXXXXXXX-X',
  'X-X--------------X-X',
  'X-X-XXXXX--XXXXX-X-X',
  'X-X-X----------X-X-X',
  'X-X-X-XXXXXXXX-X-X-X',
  'X-X-X-X------X-X-X-X',
  'X-X-X-X--------X-X-X',
  'X-X-X-XO-----X-X-X-X',
  'X-X-X-XXXXXXXX-X-X-X',
  'X-X-X----------X-X-X',
  'X-X-XXXXXXXXXXXX-X-X',
  'X-X--------------X-X',
  'X-XXXXXXX-XXXXXXXX-X',
  'X------------------X',
  'XXXXXXXXXXXXXXXXXXXX',
  'X------------------X',
  'X------------------X',
  'XXXXXXXXXXXXXXXXXXXX',
]);
