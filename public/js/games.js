
// Recupera i giochi dal server
export async function fetchGames() {
    try {
        const response = await fetch('/api/games');
        if (!response.ok) {
            throw new Error(`Errore: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Errore nel recupero dei giochi:', error);
        return [];
    }
}

export function allGames(games) {
    addGamesToTable(games);
    createSnake();
}



export function addGamesToTable(games) {
    const tableBody = document.getElementById('games-container').getElementsByTagName('tbody')[0] || document.createElement('tbody');

    // Svuota il contenuto esistente del tbody
    tableBody.innerHTML = '';

    // Aggiungi ogni gioco come una riga nella tabella
    //createSnake(tableBody);
    games.forEach(game => {
        const row = document.createElement('tr');

        // Aggiungi un evento di click alla riga per mostrare i dettagli
        row.addEventListener('click', () => {
            window.location.href = `/api/gameid/${game.id}`;  // Reindirizza alla pagina del gioco
        });

        // Cella per l'immagine
        const imgCell = document.createElement('td');
        const imgElement = document.createElement('img');
        imgElement.src = game.image;
        imgElement.alt = game.name;
        imgElement.width = 50;
        imgCell.appendChild(imgElement);
        row.appendChild(imgCell);

        // Cella per il nome
        row.appendChild(createTextCell(game.name));

        // Cella per la categoria
        row.appendChild(createTextCell(game.category));

        // Cella per la data di rilascio
        row.appendChild(createTextCell(game.relese));

        // Cella per il prezzo
        row.appendChild(createTextCell(`${game.prezzo}€`));

        // Aggiungi la riga al tbody
        tableBody.appendChild(row);
    });

    // Assicurati che tbody sia figlio della tabella
    const table = document.getElementById('games-table');
    if (!tableBody.parentNode) {
        table.appendChild(tableBody);
    }
}

// Funzione generica per creare una cella di testo
function createTextCell(content) {
    const cell = document.createElement('td');
    cell.textContent = content;
    return cell;
}

//Funzione per creare la riga snake
function createSnake() {
    const gameContent = document.getElementById('game-card');
    gameContent.classList.add('col-md-12', 'd-flex', 'flex-column', 'align-items-center', 'text-center'); // Impostiamo la direzione della flex in colonna

    // Cella per l'immagine
    const imgSnakeElement = document.createElement('img');
    imgSnakeElement.src = '../public/image/snake.png'; // Percorso all'immagine
    imgSnakeElement.alt = 'Snake';
    imgSnakeElement.id = 'imgSnake';
    imgSnakeElement.classList.add('img-fluid'); // Rende l'immagine reattiva e adatta al contenitore

    // Cella per il nome
    const nameCell = document.createElement('h1');
    nameCell.classList.add('mx-3');
    nameCell.textContent = 'Snake';
    nameCell.id = 'name';

    // Cella per il pulsante
    const playButton = document.createElement('button');
    playButton.textContent = 'Play Now';
    playButton.id = 'playSnake';
    playButton.classList.add('btn', 'btn-primary');
    playButton.onclick = () => {
        window.location.href = '../public/snake.html';
    };

    // Aggiungi l'immagine, il nome e il pulsante al contenitore principale
    gameContent.appendChild(imgSnakeElement);
    gameContent.appendChild(nameCell);
    gameContent.appendChild(playButton);
}

