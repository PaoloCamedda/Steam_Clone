const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('path');


const index = express();
const router = express.Router();
const port = 3000;


/** Configurazione middleware
 */

index.use(express.json());
index.use(express.urlencoded({ extended: true }));

/** Configura express-session
 * con chiave segreta
 */
index.use(session({
    secret: 'P0edkG3is',  // Usa una chiave segreta
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Se usi HTTPS, imposta su true, altrimenti lascialo su false
        httpOnly: true, // Impedisce l'accesso ai cookie tramite JavaScript
        maxAge: 86400000 // Imposta la durata del cookie (es. 1 giorno)
    }
}));

/**
 * server side rendering
 */
index.set('view engine', 'ejs');
index.set('views', './views');

/** Inizializza Passport.js e la gestione delle sessioni */
index.use(passport.initialize());
index.use(passport.session());

/**
 * Definizione delle rotte, game , category
 */


/**Configurazione ejs come rendering
 */
index.set('view engine', 'ejs');

/**File statici da cartella public
 */
index.use(express.static('public'));
index.use('/public', express.static(path.join(__dirname, 'public')));
index.use('/css', express.static(path.join(__dirname, 'css')));

index.get('/', (req, res) => res.render('index'));



/**Start del server su porta scelta
 */
index.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
});



