document.querySelector('form[role="search"]').addEventListener('submit', async function (event) {
    event.preventDefault(); // Impedisce l'invio del form

    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value.trim().toLowerCase();

    if (!searchValue) {
        console.warn("Il campo di ricerca è vuoto.");
        return;
    }

    try {
        // Effettua una richiesta fetch all'endpoint dei giochi
        const response = await fetch('/api/games'); // Assicurati che il tuo endpoint sia corretto
        if (!response.ok) {
            throw new Error(`Errore nel caricamento dei dati: ${response.statusText}`);
        }

        const games = await response.json();

        // Filtra i giochi in base al nome
        const filteredGames = games.filter(game =>
            game.name.toLowerCase().includes(searchValue)
        );

        const tableBody = document.querySelector('#games-table tbody');
        tableBody.innerHTML = ""; // Svuota la tabella precedente

        if (filteredGames.length === 0) {
            console.info("Nessun gioco corrisponde alla ricerca.");
            tableBody.innerHTML = "<tr><td colspan='3'>Nessun gioco trovato.</td></tr>";
        } else {
                // Visualizza i giochi filtrati
                filteredGames.forEach(game => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
            <td><img src="${game.image}" alt="${game.name}"></td>
            <td>${game.name}</td>
            <td>${game.relese}</td>
            <td>${Array.isArray(game.category) ? game.category.join(', ') : game.category || "N/A"}</td>
            <td>${game.prezzo}€</td>
        `;
                    tableBody.appendChild(row);
                });
        }

        // Resetta il valore del campo di ricerca (opzionale)
        searchInput.value = "";
        searchInput.focus(); // Rimetti il focus sul campo di ricerca
    } catch (error) {
        console.error("Errore durante il caricamento o il filtraggio dei giochi:", error);
        document.querySelector('#games-table tbody').innerHTML = "<tr><td colspan='3'>Errore nel caricamento dei dati.</td></tr>";
    }
});