const dino = document.getElementById('dino');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.getElementById('score');
const gameOverText = document.getElementById('game-over');
const ground = 150;
const background = document.getElementById('background');
const ground = background.offsetHeight;

let isJumping = false;
let isGameOver = false;
let score = 0;

function jump() {
  if (isJumping) return;
  isJumping = true;

  let position = ground;  // bắt đầu từ vị trí ground, không phải 0
  const jumpHeight = 150; // chiều cao nhảy (có thể tùy chỉnh)

  const upInterval = setInterval(() => {
    if (position >= ground + jumpHeight) {
      clearInterval(upInterval);
      // rơi xuống
      const downInterval = setInterval(() => {
        if (position <= ground) {
          clearInterval(downInterval);
          isJumping = false;
          dino.style.bottom = ground + 'px';
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

  function moveObstacle() {
    if (isGameOver) return;

    obstacleLeft -= obstacleSpeed;
    obstacle.style.left = obstacleLeft + 'px';

    // Tính vị trí giới hạn đường chạy để obstacle không chạy ngoài background
    const background = document.getElementById('background');
    const bgRect = background.getBoundingClientRect();

    // Nếu obstacle chạy hết background thì reset
    if (obstacleLeft < bgRect.left - obstacle.offsetWidth) {
      obstacleLeft = bgRect.right;
      score++;
      scoreDisplay.textContent = 'Score: ' + score;

      if (score % 5 === 0 && obstacleSpeed < 20) {
        obstacleSpeed += 1;
      }
    }

    // Kiểm tra va chạm
    const dinoRect = dino.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
      obstacleRect.left < dinoRect.right &&
      obstacleRect.right > dinoRect.left &&
      obstacleRect.top < dinoRect.bottom &&
      obstacleRect.bottom > dinoRect.top &&
      !isJumping
    ) {
      gameOver();
      return;
    }

    requestAnimationFrame(moveObstacle);
  }

  moveObstacle();
}

function gameOver() {
  isGameOver = true;
  gameOverText.classList.remove('hidden');
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

// Bắt đầu game lúc đầu
startGame();
