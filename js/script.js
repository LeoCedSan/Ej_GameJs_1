const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Player character
const player = {
  x: 50,
  y: canvas.height - 40,
  width: 30,
  height: 30,
  color: 'blue',
  speed: 5,
  isJumping: false,
  jumpHeight: 25,
  jumpSpeed: 3, // Nueva propiedad para la velocidad horizontal durante el salto
  horizontalVelocity: 0, // Nueva propiedad para la velocidad horizontal general
  gravity: 1.5,
};

// Floor
const floor = {
  y: canvas.height - 10,
  height: 10,
  color: 'green',
};

// Background
const background = new Image();
background.src = '../img/scene.png';

function drawBackground() {
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
}

function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawFloor() {
  ctx.fillStyle = floor.color;
  ctx.fillRect(0, floor.y, canvas.width, floor.height);
}

function update() {
  // Update game logic here
  checkCollision();
  applyGravity();
  applyHorizontalMovement();

  // Simulate other game logic as needed
}

function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw game elements
  drawBackground();
  drawFloor();
  drawPlayer();
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Handle keyboard input
window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'a':
      player.horizontalVelocity = -player.speed;
      break;
    case 'd':
      player.horizontalVelocity = player.speed;
      break;
    case 'w':
      jump();
      break;
  }
});

// Handle keyboard release
window.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'a':
    case 'd':
      player.horizontalVelocity = 0;
      break;
  }
});

function checkCollision() {
  if (player.y + player.height > floor.y) {
    player.y = floor.y - player.height;
    player.isJumping = false;
    player.verticalVelocity = 0;
  }
}

function jump() {
  if (!player.isJumping) {
    player.isJumping = true;
    player.verticalVelocity = -player.jumpHeight;
  }
}

function applyGravity() {
  if (player.isJumping) {
    player.y += player.verticalVelocity;
    player.verticalVelocity += player.gravity;
  }
}

function applyHorizontalMovement() {
  player.x += player.horizontalVelocity;

  // Limitar la posición del jugador para evitar que se salga del canvas
  player.x = Math.max(0, Math.min(player.x, canvas.width - player.width));
}

// Inicia el bucle del juego
gameLoop();
