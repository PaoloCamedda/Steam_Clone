import {addGamesToTable, fetchGames} from './games.js';


document.addEventListener('DOMContentLoaded', function () {


    // Funzione per applicare il filtro
    async function applyFilter(filter) {
        const games = await fetchGames();  // Funzione che recupera i giochi dal server
        let filteredGames;

        console.log(games);
        // Applica i filtri
        if (filter === 'All') {
            //filteredGames = games;
            addGamesToTable(games);
        } else if (filter === 'under-5') {
            filteredGames = games.filter(game =>  parseFloat(game.prezzo.replace(',', '.')) < 5);
            console.log(filteredGames);
            updateGameList(filteredGames);
        } else if (filter === 'under-10') {
            filteredGames = games.filter(game =>  parseFloat(game.prezzo.replace(',', '.')) < 10);
            updateGameList(filteredGames);
        }
    }



    // Aggiungi un listener di eventi a ciascun filtro
    const filterItems = document.querySelectorAll('.list-group-item[data-filter]');

    filterItems.forEach(item => {
        item.addEventListener('click', function (event) {
            const filter = event.target.getAttribute('data-filter');
            applyFilter(filter);  // Chiama la funzione per applicare il filtro
        });
    });



    // Funzione per aggiornare la lista dei giochi visualizzati
    function updateGameList(games) {
        const tableBody = document.querySelector('#games-table tbody');

        tableBody.innerHTML = ''; // Pulisce la tabella prima di aggiungere nuove righe


        games.forEach(game => {
            const row = document.createElement('tr');

            // Aggiungi un evento di click alla riga per mostrare i dettagli
            row.addEventListener('click', () => {
                window.location.href = `/api/gameid/${game.id}`;  // Reindirizza alla pagina del gioco
            });

            row.innerHTML = `
          <td>${game.image ? `<img src="${game.image}" alt="${game.name}" class="game-image" width="50" height="auto">` : 'Immagine non disponibile'}</td>

            <td>${game.name || 'Nome non disponibile'}</td>
            <td>${Array.isArray(game.category) ? game.category.join(', ') : game.category || 'N/A'}</td>
            <td>${game.relese || 'Data di rilascio non disponibile'}</td>
            <td>${game.prezzo || 'Prezzo non disponibile'}€</td>
        `;
            tableBody.appendChild(row);
        });
    }


});


