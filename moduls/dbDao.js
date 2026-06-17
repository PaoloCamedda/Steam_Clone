const sqlite3 = require('sqlite3').verbose();

// Crea una connessione al database
const db = new sqlite3.Database('./moduls/giochi.db', (err) => {
    if (err) {
        console.error('Errore di connessione al database:,(', err.message);
    } else {
        console.log('Connessione al database riuscita!  :)');
    }
});




module.exports = { db };