let pointsInput = document.getElementById('pointsInput');
let gameArea = document.getElementById('gameArea');
let gameStatus = document.getElementById('gameStatus');
let timeLabel = document.getElementById('timeLabel');
let gameBtn = document.getElementById('gameBtn');

let timer;
let currentPoint = 1;
let points = 0;
let gameOver = false;


gameBtn.addEventListener('click', () => {
    points = parseInt(pointsInput.value); 
    if (points > 0) {
        startGame();
    }
});

function startGame() {
    resetGame();

    if (!points || points <= 0) return;
    gameBtn.textContent = 'Restart'; 
    generateCircles(points);
    gameOver = false;

    let startTime = Date.now();
    timer = setInterval(() => {
        let elapsedTime = ((Date.now() - startTime) / 1000).toFixed(1);
        timeLabel.textContent = `${elapsedTime}s`;
    }, 100);
}

function generateCircles(points) {
    gameArea.innerHTML = '';
    const gameAreaWidth = gameArea.clientWidth;
    const gameAreaHeight = gameArea.clientHeight;

    for (let i = 1; i <= points; i++) {
        let circle = document.createElement('div');
        circle.className = 'circle';
        circle.textContent = i;

        let randomX = Math.random() * (gameAreaWidth - 50);
        let randomY = Math.random() * (gameAreaHeight - 50);

        circle.style.position = 'absolute';
        circle.style.left = `${randomX}px`;
        circle.style.top = `${randomY}px`;

        circle.addEventListener('click', () => checkClick(i, circle));
        gameArea.appendChild(circle);
    }
}

function checkClick(number, circleElement) {
    if (gameOver) return;

    if (number === currentPoint) {
        circleElement.style.backgroundColor = 'red';
        circleElement.style.opacity = '0';
        circleElement.style.transform = 'scale(0.5)';

        setTimeout(() => {
            circleElement.remove();
        }, 300);

        if (currentPoint === points) {
            gameStatus.textContent = 'ALL CLEARED';
            gameStatus.style.color = 'green';
            clearInterval(timer);
        }
        currentPoint++;
    } else {
        gameStatus.textContent = 'GAME OVER';
        gameStatus.style.color = 'red';
        clearInterval(timer);
        gameOver = true;
    }
}

function resetGame() {
    clearInterval(timer);
    gameStatus.textContent = "LET'S PLAY";
    timeLabel.textContent = '0.0s';
    gameStatus.style.color = 'black';
    currentPoint = 1;
    gameArea.innerHTML = '';
    gameOver = false;
}
