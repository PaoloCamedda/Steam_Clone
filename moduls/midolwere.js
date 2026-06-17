function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ error: 'Accesso non autorizzato. Effettua il login.' });
}

exports.ensureAuthenticated = ensureAuthenticated;