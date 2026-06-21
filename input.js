const canvas = document.getElementById('game');
let touchStartX = 0;
let touchStartY = 0;

canvas.addEventListener('touchstart', e => {
  e.preventDefault();
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
  if (phase === 'idle') start(); // tap sekali buat mulai
}, { passive: false });

canvas.addEventListener('touchmove', e => {
  e.preventDefault();
  if (phase!== 'running') return;

  let dx = e.touches[0].clientX - touchStartX;
  let dy = e.touches[0].clientY - touchStartY;

  if (Math.abs(dx) > Math.abs(dy)) {
    // swipe kiri-kanan
    if (dx > 20) nextDir = {x: 1, y: 0}; // kanan
    if (dx < -20) nextDir = {x: -1, y: 0}; // kiri
  } else {
    // swipe atas-bawah
    if (dy > 20) nextDir = {x: 0, y: 1}; // bawah
    if (dy < -20) nextDir = {x: 0, y: -1}; // atas
  }

  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
}, { passive: false });
