// render.js — canvas setup and all drawing code
// Reads globals defined in game.js: CELL, COLS, ROWS, snake, food, score, best, phase

var canvas = document.getElementById('game');
var ctx    = canvas.getContext('2d');
var COLORS = {
  bg:        '#000',
  grid:      '#16213e',
  snakeHead: '#56ef83',
  snakeBody: '#2ecc71',
  food:      '#e74c3c',
  text:      '#ffffff',
  dimText:   'rgba(255,255,255,0.5)',
  overlay:   'rgba(0,0,0,0.55)',
};

function cell(x, y, color) {
  var pad = 1;
  ctx.fillStyle = color;
  ctx.fillRect(x * CELL + pad, y * CELL + pad, CELL - pad * 2, CELL - pad * 2);
}

function draw() {
  var W = canvas.width, H = canvas.height;

  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, W, H);

  // Subtle grid
  ctx.strokeStyle = COLORS.grid;
  ctx.lineWidth = 0.5;
  for (var x = 0; x <= COLS; x++) {
    ctx.beginPath(); ctx.moveTo(x * CELL, 0); ctx.lineTo(x * CELL, H); ctx.stroke();
  }
  for (var y = 0; y <= ROWS; y++) {
    ctx.beginPath(); ctx.moveTo(0, y * CELL); ctx.lineTo(W, y * CELL); ctx.stroke();
  }

  // Food (circle)
  ctx.font = CELL + "px Arial";
ctx.fillText("🍆", food.x * CELL, food.y * CELL + CELL);

  // Snake
  snake.forEach(function(s, i) {
  ctx.font = CELL + "px Arial";
  ctx.fillText(i === 0 ? "🗿" : "🗿", s.x * CELL, s.y * CELL + CELL);
});

  // Score
  var fontSize = Math.max(12, CELL * 0.8);
  ctx.font = 'bold ' + fontSize + 'px monospace';
  ctx.fillStyle = COLORS.dimText;
  ctx.textAlign = 'right';
  ctx.fillText(score, W - CELL * 0.5, CELL * 1.2);
  if (best) {
    ctx.font = Math.max(10, CELL * 0.6) + 'px monospace';
    ctx.fillText('best ' + best, W - CELL * 0.5, CELL * 2.0);
  }
  ctx.textAlign = 'left';

  if (phase === 'idle') {
    drawOverlay('SNAKE', 'CARA MAINYA DI GESER GESER,KLIK BUAT MULAI');
  } else if (phase === 'dead') {
    drawOverlay('YAHH TOLOL', 'score ' + score + '   AYO MAEN LAGI BEGO');
  }
}

function drawOverlay(title, sub) {
  var W = canvas.width, H = canvas.height;
  var titleSize = Math.max(20, CELL * 1.6);
  var subSize   = Math.max(11, CELL * 0.65);

  ctx.fillStyle = COLORS.overlay;
  ctx.fillRect(0, 0, W, H);

  ctx.textAlign = 'center';
  ctx.font = 'bold ' + titleSize + 'px monospace';
  ctx.fillStyle = COLORS.text;
  ctx.fillText(title, W / 2, H / 2 - titleSize * 0.6);

  ctx.font = subSize + 'px monospace';
  ctx.fillStyle = COLORS.dimText;
  ctx.fillText(sub, W / 2, H / 2 + subSize * 1.4);
  ctx.textAlign = 'left';
}
