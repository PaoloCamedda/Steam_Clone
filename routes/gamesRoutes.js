const express = require('express');
const { getAllGames , getGameFromDatabase} = require('../moduls/gameDao');
const router = express.Router();
const categories = [
    'Fps', 'Horror', 'Gdr', 'Survivle', 'Openworld',
    'Strategico', 'Puzzle', 'Corse', 'Action'
];

router.get('/games', async (req, res) => {
    try {
        const games = await getAllGames();
        res.json(games);
    } catch (error) {
        console.error('Errore API giochi:', error);
        res.status(500).send('Errore interno del server');
    }
});

router.get('/categories', (req, res) => {
    res.json(categories);
});


router.get('/gameid/:id', async (req, res) => {
    const gameId = req.params.id;  // Recupera l'ID del gioco dalla route parameter

    if (!gameId) {
        return res.status(400).send('ID gioco non specificato.');
    }

    try {
        const game = await getGameFromDatabase(gameId);  // Recupera i dettagli del gioco dal DB
        if (!game) {
            return res.status(404).send('Gioco non trovato.');
        }

        // Renderizza la pagina con i dettagli del gioco
        res.render('idgame', {
            gameId: game.id,
            gameName: game.name,
            gameRelease: game.relese,
            gameCategory: game.categoria,
            gamePrice: game.prezzo,
            gameImage: game.image
        });
    } catch (error) {
        console.error('Errore durante il recupero del gioco:', error);
        res.status(500).send('Errore nel recupero dei dettagli del gioco.');
    }
});


router.get('/:id', async (req, res) => {
    const gameId = req.params.id;  // Recupera l'ID dalla route parameter

    if (!gameId) {
        console.log(gameId);
        return res.status(400).send('ID gioco non specificato.');
    }

    try {
        const game = await getGameFromDatabase(gameId);
        if (!game) {
            return res.status(404).send('Gioco non trovato.');
        }

        // Restituisci i dettagli del gioco come JSON
        console.log('Giocho trovato con successo :=)');
        res.json(game);
    } catch (error) {
        console.error('Errore durante il recupero del gioco:', error);
        res.status(500).send('Errore nel recupero dei dettagli del gioco.');
    }
});







module.exports = router;