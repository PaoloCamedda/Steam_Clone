const express = require('express');
const {ensureAuthenticated} = require("../moduls/midolwere");
const router = express.Router();
const userDao = require("../moduls/userDao");
const multer = require("../multer");
const upload= require("../multer");




router.get('/', (req, res) => res.render('index'));

// Importa il controller o DAO per gestire i dati dell'utente (ad esempio, userDao)

router.get('/profile', ensureAuthenticated, async (req, res) => {
    const username = req.user.username; // Prendi il nome utente dalla sessione
    try {
        // Recupera i dettagli dell'utente dal database (assumiamo che esista un metodo per farlo)
        const user = await userDao.getUserDetails(username);

        // Passa i dati dell'utente al template profile.ejs
        res.render('profile', { user });
    } catch (error) {
        console.error('Errore nel recuperare i dettagli dell\'utente:', error);
        res.status(500).json({ success: false, message: 'Errore interno del server' });
    }
});

router.get('/profile/data', ensureAuthenticated, async (req, res) => {
    const username = req.user.username;
    try {
        const user = await userDao.getUserDetails(username);
        res.status(200).json(user); // Invia i dati come JSON
    } catch (error) {
        console.error('Errore nel recuperare i dettagli dell\'utente:', error);
        res.status(500).json({ success: false, message: 'Errore interno del server' });
    }
});




router.post('/profile/update', ensureAuthenticated, upload.single('profileImage'), async (req, res) => {
    const { firstname, lastname, password, mail } = req.body;
    const image = req.file ? `/image/${req.file.filename}` : null;



    console.log('File caricato:', req.file);

    const username = req.user.username;

    try {
        await userDao.updateUserDetails(username, { firstname, lastname, password, mail, image });
        res.redirect('/profile');
    } catch (error) {
        console.error('Errore aggiornamento profilo:', error);
        res.status(500).json({ success: false, message: 'Errore durante l\'aggiornamento del profilo' });
    }
});




module.exports = router;