

// Recupera l'ID dal URL della pagina
const gameId = window.location.pathname.split('/').pop();  // Ottieni l'ID dalla route

// Esegui una chiamata per ottenere i dati del gioco via API
fetch(`/api/${gameId}`)
    .then(response => response.json())
    .then(game => {
        // Popola i dettagli sulla pagina
        document.getElementById('game-name').innerText = game.name;
        document.getElementById('game-image').src = game.image;
        document.getElementById('game-release').innerText = game.relese;
        document.getElementById('game-category').innerText = game.categoria;
        document.getElementById('game-price').innerText = game.prezzo+'€';
    })
    .catch(error => console.error('Errore nel caricamento dei dettagli:', error));
