document.addEventListener("DOMContentLoaded", async function() {
    const wishContainer = document.getElementById('wish-container');
    try {
        const response = await fetch('/wishlist/games');

        if (!response.ok) {
            throw new Error(`Errore nel recuperare i giochi: ${response.statusText}`);
        }

        const responseText = await response.text();
        console.log('Risposta grezza:', responseText);

        const games = responseText.trim() ? JSON.parse(responseText) : [];

        if (games.length > 0) {
            games.forEach(game => {
                const gameDiv = document.createElement('div');
                gameDiv.classList.add('game-item', 'col-4', 'mb-4');

                gameDiv.addEventListener('click', () => {
                    window.location.href = `/api/gameid/${game.id_game}`;
                });

                gameDiv.innerHTML = `
                    <div class="card">
                        <img src="${game.image}" class="card-img-top" alt="${game.name}">
                        <div class="card-body">
                            <h5 class="card-title">${game.name}</h5>
                            <p class="card-text">€${game.prezzo}</p>
                            <button class="btn btn-danger btn-remove" data-id="${game.id_game}">Rimuovi</button>
                        </div>
                    </div>
                `;

                wishContainer.appendChild(gameDiv);
            });

            const removeButtons = document.querySelectorAll('.btn-remove');
            removeButtons.forEach(button => {
                button.addEventListener('click', async function(event) {
                    event.stopPropagation(); // Impedisce il bubbling dell'evento
                    const gameId = this.getAttribute('data-id');
                    try {
                        const response = await fetch(`/wishlist/remove/${gameId}`, {
                            method: 'DELETE'
                        });

                        if (!response.ok) {
                            throw new Error(`Errore nel rimuovere il gioco: ${response.statusText}`);
                        }

                        // Rimuovi il gioco dal DOM
                        this.closest('.game-item').remove();

                        // Controlla se la wishlist è vuota e mostra un messaggio
                        const updatedGames = await fetch('/wishlist/games');
                        const updatedGamesData = await updatedGames.json();
                        if (updatedGamesData.length === 0) {
                            wishContainer.innerHTML = '<p>La tua wishlist è vuota.</p>';
                        }
                    } catch (error) {
                        console.error('Errore nel rimuovere il gioco:', error);
                    }
                });
            });

        } else {
            wishContainer.innerHTML = '<p>Your wishlist is empty.</p>';
        }
    } catch (error) {
        console.error('Errore nel recuperare i giochi:', error);
        wishContainer.innerHTML = '<p>Errore nel recuperare i giochi dalla wishlist.</p>';
    }
});