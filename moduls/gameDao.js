"use strict";

const { db } = require('./dbDao');

async function getAllGames() {
    try {
        return await new Promise((resolve, reject) => {
            db.all(
                'SELECT id, name, categoria AS category, relese, prezzo, image FROM game',
                (err, rows) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(rows);
                }
            );
        });
    } catch (error) {
        console.error('Errore durante il recupero dei giochi:', error);
        throw error;
    }
}

/**
 * Funzione per recuperare un singolo gioco tramite id
 * @param gameId
 * @returns {Promise<unknown>}
 */
async function getGameFromDatabase(gameId) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM game WHERE id = ?`;
        db.get(query, [gameId], (err, row) => {
            if (err) {
                reject(err);
            } else if (!row) {
                reject(new Error(`Game with ID ${gameId} not found`));
            } else {
                resolve(row);
            }
        });
    });
}



module.exports = { getAllGames, getGameFromDatabase };
