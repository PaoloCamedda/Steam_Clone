const express = require('express');
const router = express.Router();
const { createUser } = require('../moduls/userDao');
const { body, validationResult } = require('express-validator');
const passport = require('passport');


// Route per login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error('Errore durante l\'autenticazione:', err);
            return res.status(500).render('index', { error: 'Errore interno del server. Riprova più tardi.' });
        }
        if (!user) {
            // Caso di login fallito (ad esempio credenziali errate)
            return res.status(401).render('index', { error: info.message || 'Credenziali non valide. Riprova.' });
        }
        // Login riuscito
        req.logIn(user, (err) => {
            if (err) {
                console.error('Errore durante il login:', err);
                return res.status(500).render('index', { error: 'Errore durante il login. Riprova più tardi.' });
            }
            // Login avvenuto con successo
            return res.render('index', { username: user.username, message: 'Login avvenuto con successo!' });
        });
    })(req, res, next);
});



/**
router.post('/loginejs',
    passport.authenticate('local', {
        successRedirect: '/', // Reindirizza alla homepage dopo il login
        failureRedirect: '/auth/login?error=true', // Reindirizza con errore se fallisce
    })
);
*/


// Route per logout
router.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).send({ error: 'Errore durante il logout' });
        }
        console.log('User logged out successfully');

        res.redirect('/');
    });
});

router.get('/status', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ loggedIn: true, user: req.user });
        console.log('User logged in successfully');
    } else {
        //res.redirect('/');
        res.json({ loggedIn: false });
    }
});







router.post(
    '/register',
    [
        body('firstname').isString().notEmpty().withMessage('Il nome è obbligatorio'),
        body('lastname').isString().notEmpty().withMessage('Il cognome è obbligatorio'),
        body('username').isString().notEmpty().withMessage('L\'username è obbligatorio'),
        body('mail').isEmail().withMessage('Email non valida'),
        body('password').isLength({ min: 6 }).withMessage('La password deve essere lunga almeno 6 caratteri'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { firstname, lastname, username, mail, password } = req.body;

        try {
            await createUser(firstname, lastname, username, mail, password);
            res.redirect('/');
            //res.status(201).json({ message: 'Registrazione avvenuta con successo' });

        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
);



module.exports = router;