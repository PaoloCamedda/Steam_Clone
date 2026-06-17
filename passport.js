
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { getUserByUsername, validatePassword } = require('./moduls/userDao'); // Funzioni personalizzate per il DB

function initialize(passport) {
    const authenticateUser = async (username, password, done) => {
        try {
            const user = await getUserByUsername(username);  // Recupera l'utente dal DB
            if (!user) {
                return done(null, false, { message: 'Username non trovato' });
            }

            const isValid = await validatePassword(user, password);  // Confronta la password
            if (!isValid) {
                return done(null, false, { message: 'Password non corretta' });
            }

            return done(null, user);  // Autenticazione riuscita
        } catch (err) {
            return done(err);  // Gestisci gli errori
        }
    };

    passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser));

    passport.serializeUser((user, done) => {
        if (!user.username) {
            return done(new Error('User does not have a username'), null);
        }
        done(null, user.username);  // Usa l'username per serializzare
    });

    passport.deserializeUser(async (username, done) => {
        try {
            const user = await getUserByUsername(username);  // Usa l'username per recuperare l'utente
            if (!user) {
                return done(new Error('User not found'), null);
            }
            return done(null, user);  // Deserializza l'utente
        } catch (err) {
            return done(err);
        }
    });
}



module.exports = initialize;
