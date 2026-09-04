// Lightweight browser demo: one-tap to gain points and simple obstacle collision
const startBtn = document.getElementById('startBtn');
const playArea = document.getElementById('playArea');
const scoreVal = document.getElementById('scoreVal');
const menu = document.getElementById('menu');
const gameOver = document.getElementById('gameOver');
const finalScore = document.getElementById('finalScore');
const reviveBtn = document.getElementById('reviveBtn');
const retryBtn = document.getElementById('retryBtn');

let score = 0;
let playing = false;
let player = null;
let obstacles = [];
let gameTimer = null;

function createPlayer(){
  const p = document.createElement('div');
  p.style.width = '40px';
  p.style.height = '40px';
  p.style.background = '#f44';
  p.style.position = 'absolute';
  p.style.left = '50px';
  p.style.bottom = '80px';
  p.style.borderRadius = '6px';
  playArea.appendChild(p);
  return p;
}

function spawnObstacle(){
  const o = document.createElement('div');
  o.style.width = Math.random() * 40 + 20 + 'px';
  o.style.height = Math.random() * 40 + 20 + 'px';
  o.style.background = '#333';
  o.style.position = 'absolute';
  o.style.right = '-60px';
  o.style.bottom = Math.random() * 200 + 20 + 'px';
  playArea.appendChild(o);
  obstacles.push({el:o,x:playArea.clientWidth*1});
}

function startGame(){
  menu.classList.add('hidden');
  gameOver.classList.add('hidden');
  score = 0; scoreVal.textContent = '0';
  playing = true;
  player = createPlayer();
  obstacles.forEach(o=>o.el.remove()); obstacles = [];
  gameTimer = setInterval(gameLoop, 16);
  // spawn obstacles periodically
  window.obSpawn = setInterval(spawnObstacle, 900);
}

function endGame(){
  playing = false;
  clearInterval(gameTimer);
  clearInterval(window.obSpawn);
  finalScore.textContent = String(score);
  gameOver.classList.remove('hidden');
}

function revive(){
  // simulate ad watch -> grant revive
  if (!playing){
    gameOver.classList.add('hidden');
    // remove obstacles and reset player
    obstacles.forEach(o=>o.el.remove()); obstacles = [];
    player.style.left = '50px';
    player.style.bottom = '80px';
    score = Math.max(0, score - 5);
    scoreVal.textContent = String(score);
    playing = true;
    gameTimer = setInterval(gameLoop, 16);
    window.obSpawn = setInterval(spawnObstacle, 900);
  }
}

function retry(){
  if (player) { player.remove(); player = null; }
  startGame();
}

function gameLoop(){
  // move obstacles left
  for (let i = obstacles.length-1;i>=0;i--){
    const obj = obstacles[i];
    obj.x -= 4 + Math.min(6, Math.floor(score/10));
    obj.el.style.right = (playArea.clientWidth - obj.x) + 'px';
    // remove offscreen
    if (obj.x < -100){ obj.el.remove(); obstacles.splice(i,1); score += 1; scoreVal.textContent = String(score);}    
    // simple AABB collision
    const pr = player.getBoundingClientRect();
    const or = obj.el.getBoundingClientRect();
    if (!(pr.right < or.left || pr.left > or.right || pr.bottom < or.top || pr.top > or.bottom)){
      // collision
      endGame();
    }
  }
}

// input: tap/click to jump (visual only)
playArea.addEventListener('pointerdown', ()=>{
  if (!playing) return;
  // small jump animation
  if (!player) return;
  player.style.transition = 'bottom 140ms ease-out';
  player.style.bottom = '160px';
  setTimeout(()=>{ player.style.bottom = '80px'; }, 140);
});

startBtn.addEventListener('click', startGame);
reviveBtn.addEventListener('click', ()=>{ revive(); });
retryBtn.addEventListener('click', retry);
