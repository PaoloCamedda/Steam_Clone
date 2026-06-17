const express = require('express');
//const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const pageRoutes = require('./routes/pagesRouters');
const gamesRoutes = require('./routes/gamesRoutes');
const authRoutes = require('./routes/authRoutes');
const wishRoutes = require('./routes/wishlistRouters');
const index = express();
const port = 5000;
const initializePassport = require('./passport');

/** Configurazione middleware
 */

index.use(express.json());
index.use(express.urlencoded({ extended: true }));
initializePassport(passport);


/** Configura express-session
 * con chiave segreta
 */
index.use(session({
    secret: 'P0edkG3is',  // Usa una chiave segreta
    resave: false,
    saveUninitialized: false,

}));

index.use(passport.initialize());
index.use(passport.session());

/**
 * server side rendering
 */
index.set('view engine', 'ejs');
index.set('views', './views');



/**File statici da cartella public
 */
index.use(express.static('public'));
index.use('/public', express.static(path.join(__dirname, 'public')));
index.use('/css', express.static(path.join(__dirname, 'css')));


/** requisito
 * Express: creare route modulari con express.Router
 */

index.use( pageRoutes);
index.use('/api',gamesRoutes);
index.use('/auth', authRoutes);
index.use(wishRoutes);
/**Start del server su porta scelta
 */
index.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
});





