const playerCar = document.querySelector('.player-car');
const obstacle = document.querySelector('.obstacle');
const scoreElement = document.querySelector('.score');
const gameOverPopup = document.querySelector('.game-over-popup');
const finalScoreElement = document.querySelector('.final-score');
const startMessage = document.querySelector('.start-message');

let playerPosition = 175;
let obstaclePosition = -100;
let speed = 5;
let gameOver = false;
let gameStarted = false;
let score = 0;

document.addEventListener('keydown', (event) => {
    if (!gameStarted && event.key === ' ') {
        startGame();
    } else if (gameOver) {
        restartGame();
    } else {
        handleMovement(event.key);
    }
});

document.querySelector('.left-arrow').addEventListener('click', () => {
    handleMovement('ArrowLeft');
});

document.querySelector('.right-arrow').addEventListener('click', () => {
    handleMovement('ArrowRight');
});

function startGame() {
    gameStarted = true;
    startMessage.style.display = 'none';
    moveObstacle();
}

function handleMovement(key) {
    if ((key === 'ArrowLeft' || key === 'a' || key === 'A') && playerPosition > 0) {
        playerPosition -= 25;
    }
    if ((key === 'ArrowRight' || key === 'd' || key === 'D') && playerPosition < 350) {
        playerPosition += 25;
    }
    if (key === ' ' && speed < 15) {
        speed += 5; // Speed up the car
    }
    playerCar.style.left = playerPosition + 'px';
}

function moveObstacle() {
    obstaclePosition += speed;
    obstacle.style.top = obstaclePosition + 'px';

    if (obstaclePosition > 600) {
        obstaclePosition = -100;
        obstacle.style.left = Math.floor(Math.random() * 350) + 'px';
        score += 1;
        scoreElement.textContent = `Score: ${score}`;
    }

    checkCollision();
    if (!gameOver) {
        requestAnimationFrame(moveObstacle);
    }
}

function checkCollision() {
    const playerRect = playerCar.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
        playerRect.x < obstacleRect.x + obstacleRect.width &&
        playerRect.x + playerRect.width > obstacleRect.x &&
        playerRect.y < obstacleRect.y + obstacleRect.height &&
        playerRect.y + playerRect.height > obstacleRect.y
    ) {
        endGame();
    }
}

function endGame() {
    gameOver = true;
    finalScoreElement.textContent = score;
    gameOverPopup.style.display = 'block';
}

function restartGame() {
    gameOver = false;
    gameOverPopup.style.display = 'none';
    playerPosition = 175;
    obstaclePosition = -100;
    speed = 5;
    score = 0;
    scoreElement.textContent = 'Score: 0';
    moveObstacle();
}

startMessage.style.display = 'block';
