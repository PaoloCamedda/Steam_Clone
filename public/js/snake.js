const board = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const restartButton = document.getElementById('restart-btn');
const homeButton = document.getElementById('undo-btn');

// Configurazione iniziale
const boardSize = 20;
const cells = [];
let snake = [];
let food = {};
let direction = { x: 0, y: 0 };
let isGameRunning = false;
let score = 0;

// Crea la griglia
function createBoard() {
    board.innerHTML = '';
    for (let i = 0; i < boardSize * boardSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cells.push(cell);
        board.appendChild(cell);
    }
}

// Inizializza il gioco
function initializeGame() {
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    score = 0;
    scoreDisplay.textContent = score;
    isGameRunning = true;
    spawnFood();
    updateBoard();
    gameLoop();
}

// Aggiorna la griglia
function updateBoard() {
    cells.forEach(cell => cell.className = 'cell'); // Pulisce la griglia
    snake.forEach(segment => {
        const index = segment.y * boardSize + segment.x;
        cells[index].classList.add('snake');
    });
    const foodIndex = food.y * boardSize + food.x;
    cells[foodIndex].classList.add('food');
}

// Genera un nuovo cibo
function spawnFood() {
    food = {
        x: Math.floor(Math.random() * boardSize),
        y: Math.floor(Math.random() * boardSize)
    };
}

// Controlla se il serpente ha mangiato il cibo
function checkFood() {
    if (snake[0].x === food.x && snake[0].y === food.y) {
        spawnFood();
        score++;
        scoreDisplay.textContent = score;
        return true;
    }
    return false;
}

// Controlla le collisioni
function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize) {
        return true; // Collisione con il bordo
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true; // Collisione con se stesso
        }
    }
    return false;
}

// Movimento del serpente
function moveSnake() {
    const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(newHead); // Aggiungi una nuova testa
    if (!checkFood()) {
        snake.pop(); // Rimuove l'ultima parte se non c'è cibo
    }
}

// Gestisce gli input da tastiera
window.addEventListener('keydown', event => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
});

// Loop principale del gioco
function gameLoop() {
    if (!isGameRunning) return;
    moveSnake();
    if (checkCollision()) {
        isGameRunning = false;
       // alert('Game Over! Your score: ' + score);
        restartButton.style.display = 'block';
        return;
    }
    updateBoard();
    setTimeout(gameLoop, 200 - score * 5); // Velocità del gioco aumenta col punteggio
}

// Gestisce il pulsante di restart
restartButton.addEventListener('click', () => {
    restartButton.style.display = 'none';
    initializeGame();
});

// Gestisce il pulsante "Home"
homeButton.addEventListener('click', () => {
    window.location.href = '/'; // Reindirizza alla pagina principale (index.ejs)
});

// Avvia il gioco
createBoard();
initializeGame();
