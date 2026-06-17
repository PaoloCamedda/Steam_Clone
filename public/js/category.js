
//import {fetchGames} from "./games.js";

async function populateCategoryDropdown() {
    const dropdownMenu = document.getElementById('categoryDropdown');
    if (!dropdownMenu) {
        console.error("L'elemento con id 'categoryDropdown' non esiste nel DOM.");
        return;
    }

    try {

        const response = await fetch('/api/categories');
        if (!response.ok) {
            console.error("Errore nel recupero delle categorie:", response.statusText);
            return;
        }

        const categories = await response.json();
        if (!Array.isArray(categories)) {
            console.error("I dati ricevuti non sono un array:", categories);
            return;
        }

        // Rimuovi eventuali duplicati
        const uniqueCategories = [...new Set(categories)];

        // Popola il dropdown con le categorie
        uniqueCategories.forEach(category => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.className = 'dropdown-item';
            a.href = '#';
            a.textContent = category;
            a.setAttribute('data-filter', category);

            // Aggiungi il listener per applicare il filtro
            a.addEventListener('click', async function (event) {
                event.preventDefault(); // Previene il comportamento predefinito del link
                console.log("Categoria selezionata:", category);
                await filterGamesByCategory(category);  // Chiama la funzione di filtro
            });

            li.appendChild(a);
            dropdownMenu.appendChild(li);
        });

        console.log("Categorie caricate con successo:", uniqueCategories);
    } catch (error) {
        console.error("Errore nel recupero delle categorie:", error);
    }
}

async function filterGamesByCategory(category) {
    try {
        const response = await fetch('/api/games ',{
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
            console.error("Errore nel recupero dei giochi:", response.statusText);
            return;
        }


        const data = await response.json();  // Usa 'data' per il parsing della risposta
        console.log('array di giochi categoria:', data);  // Mostra l'array di giochi

        // Controlla che 'data.game' sia un array
        if (!Array.isArray(data)) {
            console.error("I dati ricevuti non sono un array:", data);
            return;
        }

        // Filtra i giochi per categoria
        const filteredGames = data.filter(game => game.category && game.category.includes(category));
        console.log('array di giochi categoria:', filteredGames);
        // Aggiungi i giochi filtrati alla tabella
        updateGameList(filteredGames);
    } catch (error) {
        console.error("Errore nel recupero dei giochi:", error);
    }
}

// Funzione per aggiornare la lista dei giochi visualizzati
function updateGameList(games) {
    const tableBody = document.querySelector('#games-table tbody');
    tableBody.innerHTML = ''; // Pulisce la tabella prima di aggiungere nuove righe

    if(Array.isArray(games) && games.length > 0){
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
    else {

        const row = document.createElement('tr');
        row.innerHTML = `
            <td colspan="5"><h3>Nessun gioco presente</h3></td>
        `;
        tableBody.appendChild(row);
    }
}

// Popola il dropdown delle categorie quando il DOM è pronto
document.addEventListener('DOMContentLoaded', populateCategoryDropdown);
