document.addEventListener('DOMContentLoaded', () => {
    const loginLink = document.getElementById('login-link');
    const loginModal = document.getElementById('login-modal');
    const logoutLink = document.getElementById('logout-link');
    const logoutModal = document.getElementById('logout-modal');
    const closeLoginBtn = document.querySelector('.close-btn');
    const closeLogoutBtn = document.querySelector('.close-btn-logout');
    const logoutYesBtn = document.getElementById('logout-yes');
    const logoutNoBtn = document.getElementById('logout-no');

    // Mostra la modale di login quando clicchi sul link "Login"
    loginLink.addEventListener('click', (event) => {
        event.preventDefault();  // Impedisce il comportamento predefinito del link
        loginModal.style.display = 'block';  // Mostra la modale di login
    });

    // Chiudi la modale di login quando clicchi sul pulsante di chiusura
    closeLoginBtn.addEventListener('click', () => {
        loginModal.style.display = 'none';  // Nasconde la modale di login
    });

    // Chiudi la modale di login se clicchi fuori dalla modale
    window.addEventListener('click', (event) => {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';  // Nasconde la modale di login
        }
    });

    // Mostra la modale di logout quando clicchi sul link "Logout"
    logoutLink.addEventListener('click', (event) => {
        event.preventDefault();  // Impedisce il comportamento predefinito del link
        logoutModal.style.display = 'block';  // Mostra la modale di logout
    });

    // Chiudi la modale di logout quando clicchi sul pulsante di chiusura
    closeLogoutBtn.addEventListener('click', () => {
        logoutModal.style.display = 'none';  // Nasconde la modale di logout
    });

    // Chiudi la modale di logout se clicchi fuori dalla modale
    window.addEventListener('click', (event) => {
        if (event.target === logoutModal) {
            logoutModal.style.display = 'none';  // Nasconde la modale di logout
        }
    });

    // Esegui il logout se l'utente clicca su "Yes"
    logoutYesBtn.addEventListener('click', async () => {
        try {
            const response = await fetch('/auth/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                console.log('Logout successful');
                window.location.href = '/';  // Reindirizza alla homepage dopo il logout
            } else {
                console.error('Errore durante il logout');
            }
        } catch (error) {
            console.error('Errore durante il logout:', error);
        }
        logoutModal.style.display = 'none';  // Nasconde la modale di logout
    });

    // Chiudi la modale di logout se l'utente clicca su "No"
    logoutNoBtn.addEventListener('click', () => {
        logoutModal.style.display = 'none';  // Nasconde la modale di logout
    });
});
