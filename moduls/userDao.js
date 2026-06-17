const {db} = require('./dbDao');
const bcrypt = require('bcrypt');

const saltRounds = 10;

async function createUser(firstname, lastname, username, mail, password) {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const sql = `INSERT INTO user (firstname, lastname, username, mail, password)
                 VALUES (?, ?, ?, ?, ?)`;

        await db.run(sql, [firstname, lastname, username, mail, hashedPassword]);

        return { success: true };
    } catch (err) {
        if (err.code === 'SQLITE_CONSTRAINT') {
            throw new Error('Username o email già esistenti');
        }
        throw err;
    }
}


async function getUserByUsername(username) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM user WHERE username = ?`;

        db.get(sql, [username], (err, row) => {
            if (err) {
                return reject(err);
            }
            return resolve(row);  // Restituisce l'utente trovato (row) o null se non trovato
        });
    });
}


async function validatePassword(user, inputPassword) {
    try {
        // Confronta la password inserita con quella cifrata nel database
        return await bcrypt.compare(inputPassword, user.password);
    } catch (err) {
        throw err;
    }
}


async function getUserDetails(username) {
    const query = 'SELECT * FROM user WHERE username = ?';
    return new Promise((resolve, reject) => {
        db.get(query, [username], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}

// Funzione per aggiornare i dettagli dell'utente
async function updateUserDetails(username, { firstname, lastname, password, mail, image }) {
    try {
        const currentUser = await getUserDetails(username);

        const newFirstname = firstname && firstname.trim() !== '' ? firstname : currentUser.firstname;
        const newLastname = lastname && lastname.trim() !== '' ? lastname : currentUser.lastname;
        let newPassword = currentUser.password;
        const newMail = mail && mail.trim() !== '' ? mail.trim() : currentUser.mail;
        const newImage = image && image.trim() !== '' ? image.trim() : currentUser.image;

        if (password && password.trim() !== '') {
            newPassword = await bcrypt.hash(password, saltRounds);
        }

        console.log('Dati aggiornati:', { newFirstname, newLastname, newMail, newPassword, newImage, username });

        const query = 'UPDATE user SET firstname = ?, lastname = ?, mail = ?, password = ?, image = ? WHERE username = ?';
        return new Promise((resolve, reject) => {
            db.run(query, [newFirstname, newLastname, newMail, newPassword, newImage, username], function (err) {
                if (err) {
                    console.error('Errore nella query:', err);
                    return reject(err);
                }
                console.log('Numero di righe aggiornate:', this.changes);
                if (this.changes === 0) {
                    return reject(new Error('Nessun utente aggiornato'));
                }
                resolve();
            });
        });
    } catch (err) {
        console.error('Errore nella funzione updateUserDetails:', err.message);
        throw new Error(`Errore nell'aggiornare i dettagli dell'utente: ${err.message}`);
    }
}



module.exports = {
    createUser,
    getUserByUsername,
    validatePassword,
    getUserDetails,
    updateUserDetails,
};