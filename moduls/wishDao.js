const { db } = require('./dbDao');






async function addGameToFavorites(user, gameId) {
    if (!user || !user.username) {
        throw new Error('ID utente non valido.');
    }

    // Controlla se il gioco è già presente nella wishlist
    const checkQuery = 'SELECT * FROM wish WHERE id_game = ? AND id_user = ?';
    const checkValues = [gameId, user.username];
    const existingGame = await new Promise((resolve, reject) => {
        db.get(checkQuery, checkValues, (err, row) => {
            if (err) {
                reject('Errore nel controllo della wishlist: ' + err.message);
            } else {
                resolve(row); // Restituisce la riga se esiste
            }
        });
    });

    if (existingGame) {
        return { success: false, message: 'Il gioco è già presente nella tua wishlist.' };
    }

    // Recupera i dettagli del gioco dalla tabella `game`
    const getGameQuery = 'SELECT name, relese, prezzo, image FROM game WHERE id = ?';
    const gameDetails = await new Promise((resolve, reject) => {
        db.get(getGameQuery, [gameId], (err, row) => {
            if (err) {
                reject('Errore nel recupero dei dettagli del gioco: ' + err.message);
            } else if (!row) {
                reject('Il gioco con l\'ID specificato non esiste.');
            } else {
                resolve(row); // Restituisce i dettagli del gioco
            }
        });
    });

    // Inserisci il gioco nella wishlist
    const insertQuery = 'INSERT INTO wish (id_game, id_user, name, relese, prezzo, image) VALUES (?, ?, ?, ?, ?, ?)';
    const insertValues = [gameId, user.username, gameDetails.name, gameDetails.relese, gameDetails.prezzo, gameDetails.image];
    await new Promise((resolve, reject) => {
        db.run(insertQuery, insertValues, (err) => {
            if (err) {
                reject('Errore durante l\'inserimento nella wishlist: ' + err.message);
            } else {
                resolve();
            }
        });
    });

    return { success: true, message: 'Gioco aggiunto alla wishlist con successo.' };
}







async function getWishlistGames(user) {
    if (!user) {
        throw new Error('ID utente non valido perche non non lo riceve ');
    }

    const query = 'SELECT * FROM wish WHERE id_user = ?';
    const values = [user.username];

    return new Promise((resolve, reject) => {
        db.all(query, values, (err, rows) => {
            if (err) {
                reject('Errore nel recupero della wishlist: ' + err.message);
            } else {
                console.log('Giochi nella wishlist------>', rows);  // Log per vedere i giochi recuperati
                resolve(rows);  // Restituisci i giochi
            }
        });
    });
}


async function removeGameFromWishlist(gameId, username) {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM wish WHERE id_game = ? AND id_user = ?';
        const values = [gameId, username];

        db.run(query, values, function(err) {
            if (err) {
                reject('Errore nella rimozione del gioco: ' + err.message);
            } else {
                resolve(); // Operazione riuscita
            }
        });
    });
}

async function checkGameInWishlist(gameId, username) {
    return new Promise((resolve, reject) => {
        const checkQuery = 'SELECT * FROM wish WHERE id_game = ? AND id_user = ?';
        const checkValues = [gameId, username];

        // Esegui la query
        db.run(checkQuery, checkValues, (err, row) => {
            if (err) {
                reject('Errore nel controllo della wishlist: ' + err.message);
            } else {
                resolve(row); // Restituisce la riga se il gioco è trovato nella wishlist
            }
        });
    });
}



module.exports = { addGameToFavorites,getWishlistGames ,removeGameFromWishlist,checkGameInWishlist};
