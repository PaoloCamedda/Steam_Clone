const express = require("express");
const router = express.Router();
const wishlistDao = require("../moduls/wishDao");
const userDao = require("../moduls/userDao");
const {ensureAuthenticated} = require("../moduls/midolwere");
const {db} = require("../moduls/dbDao");

/**
 * Rotta che mi consente di aggiungere i giochi tramite il pulsante add-favorite
 */
router.post('/wishlist/add', async (req, res) => {
    // Verifica che l'utente sia autenticato
    if (!req.isAuthenticated()) {
        return res.status(401).json({ success: false, message: 'Utente non autenticato' });
    }

    // Ottieni l'username dalla sessione (req.user è fornito da Passport)
    const username = req.user.username;  // Assuming req.user contains user details

    if (!username) {
        return res.status(400).json({ success: false, message: 'Username non trovato nella sessione' });
    }

    const { gameId } = req.body; // Ottieni l'ID del gioco dal corpo della richiesta
    console.log(username, gameId);
    try {
        // Recupera l'utente dal database usando lo username
        const user = await userDao.getUserByUsername(username);
        if (!user) {
            return res.status(404).json({ success: false, message: 'Utente non trovato' });
        }

        // Aggiungi il gioco ai preferiti nel database
        await wishlistDao.addGameToFavorites(user, gameId);

        return res.json({ success: true, message: 'Gioco aggiunto ai preferiti' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Errore nel salvataggio del gioco nei preferiti' });
    }
});


/**
 * rotta per far apparire wishlist
 */
router.get('/wishlist', ensureAuthenticated, async (req, res) => {
    try {
        const username = req.user.username; // Prendi l'username dalla sessione
        const games = await wishlistDao.getWishlistGames(username); // Recupera i giochi dalla lista desideri
        res.render('whislist', { username, games }); // Passa i dati alla vista
    } catch (error) {
        console.error('Errore nel recuperare la lista desideri:', error);
        res.status(500).send('Errore interno del server');
    }
});


/**
 * rotta che mi consente di avere i giochi in formato json di un utente
 */
router.get('/wishlist/games', ensureAuthenticated, async (req, res) => {
    try {
        const username = req.user.username;
        // Recupera i giochi dalla wishlist dell'utente
        const games = await wishlistDao.getWishlistGames(req.user);  // Assicurati che restituisca i giochi
        console.log('Giochi recuperati:', games);  // Log per vedere se i giochi sono effettivamente recuperati
        res.json(games);  // Rispondi con i giochi in formato JSON
    } catch (error) {
        console.error('Errore nel recuperare i giochi dalla wishlist:', error);
        res.status(500).json({ success: false, message: 'Errore interno del server' });
    }
});


/**
 * Rotta che mi consente di rimuovere un gioco dalla wishlist
 */
router.delete('/wishlist/remove/:gameId', ensureAuthenticated, async (req, res) => {
    const gameId = req.params.gameId;
    const username = req.user.username;

    try {
        // Chiamata al wishdao per rimuovere il gioco
        console.log(gameId+'<---- questo è l id da eliminare ')
        await wishlistDao.removeGameFromWishlist(gameId, username);
        res.status(200).json({ success: true, message: 'Gioco rimosso dalla wishlist.' });
    } catch (error) {
        console.error('Errore nella rimozione del gioco:', error);
        res.status(500).json({ success: false, message: 'Errore interno del server' });
    }
});


router.get('/wishlist/check/:gameId/:username', async (req, res) => {
    const { gameId, username } = req.params;

    try {
        const game = await wishlistDao.checkGameInWishlist(gameId, username);

        if (game) {
            // Se il gioco è trovato nella wishlist
            res.status(200).json({ exists: true });
        } else {
            // Se il gioco non è trovato nella wishlist
            res.status(200).json({ exists: false });
        }
    } catch (error) {
        console.error('Errore nel controllo della wishlist:', error);
        res.status(500).json({ success: false, message: 'Errore nel controllo della wishlist' });
    }
});


module.exports = router;
