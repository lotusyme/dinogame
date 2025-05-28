const dino = document.getElementById('dino');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.getElementById('score');
const gameOverText = document.getElementById('game-over');

let isJumping = false;
let isGameOver = false;
let score = 0;

function jump() {
  if (isJumping) return;
  isJumping = true;

  let position = 0;
  const upInterval = setInterval(() => {
    if (position >= 120) {
      clearInterval(upInterval);
      // fall down
      const downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
          dino.style.bottom = '0px';
        } else {
          position -= 10;
          dino.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      position += 10;
      dino.style.bottom = position + 'px';
    }
  }, 20);
}

function startGame() {
  gameOverText.classList.add('hidden');
  obstacle.style.left = '100%';
  score = 0;
  scoreDisplay.textContent = 'Score: ' + score;
  isGameOver = false;

  let obstacleLeft = window.innerWidth;
  let obstacleSpeed = 8;
  let gameLoop;

  function moveObstacle() {
    if (isGameOver) return;

    obstacleLeft -= obstacleSpeed;
    obstacle.style.left = obstacleLeft + 'px';

    // Check collision
    const dinoRect = dino.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
      obstacleLeft < dinoRect.right &&
      obstacleLeft + obstacleRect.width > dinoRect.left &&
      dinoRect.bottom > obstacleRect.top &&
      dinoRect.top < obstacleRect.bottom &&
      !isJumping
    ) {
      // collision detected
      gameOver();
      return;
    }

    // Reset obstacle
    if (obstacleLeft < -obstacleRect.width) {
      obstacleLeft = window.innerWidth;
      score++;
      scoreDisplay.textContent = 'Score: ' + score;

      // speed up every 5 points
      if (score % 5 === 0 && obstacleSpeed < 20) {
        obstacleSpeed += 1;
      }
    }

    gameLoop = requestAnimationFrame(moveObstacle);
  }

  moveObstacle();
}

function gameOver() {
  isGameOver = true;
  gameOverText.classList.remove('hidden');
  cancelAnimationFrame(moveObstacle);
}

window.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    if (isGameOver) {
      startGame();
    } else {
      jump();
    }
  }
});

// Start the game initially
startGame();
