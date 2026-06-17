/**
 * Funzione per iniettare il codice HTML della navbar
 * @returns {string}
 */
export function navbarInject() {
    return `
<link rel="stylesheet" href="../../css/navbar.css">

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
        <a class="navbar-brand" href="/">
            <img src="../../image/steam_color.svg" width="30" height="30" class="d-inline-block align-top" alt="">
            Valvole
        </a>

        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <a class="nav-link" href="/wishlist/" id="wishlist-link" style="display: none;">Wish</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/profile" id="profile-link" style="display: none;">Profile</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" id="login-link">Login</a>
                    <!-- Modale per il login -->
                    <div id="login-modal" class="modal">
                        <div class="modal-content">
                            <span class="close-btn">&times;</span>
                            <h2>Login</h2>
                            <form id="login-form" action="/auth/login" method="POST" >
                                <label for="login-username">Username:</label>
                                <input type="text" id="login-username" name="username" minlength="4" placeholder="Username" required/>
                                <label for="login-password">Password:</label>
                                <input type="password" id="login-password" name="password" minlength="6" placeholder="Password" required/>
                                <button type="submit" id="login-button">Login</button>
                            </form>
                            <hr>
                            <h2>Sign In</h2>
                            <form action="/auth/register" method="POST">
                                <label for="register-firstname">Firstname:</label>
                                <input type="text" id="register-firstname" name="firstname" placeholder="Firstname" required>
                                <label for="register-lastname">Lastname:</label>
                                <input type="text" id="register-lastname" name="lastname" placeholder="Lastname" required>
                                <label for="register-username">Username:</label>
                                <input type="text" id="register-username" name="username" placeholder="Username" required>
                                <label for="register-mail">Email:</label>
                                <input type="email" id="register-mail" name="mail" placeholder="Email" required>
                                <label for="register-password">Password:</label>
                                <input type="password" id="register-password" name="password" placeholder="Password" required>
                                <button type="submit">Sign In</button>
                            </form>
                        </div>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" id="logout-link" style="display: none;">Logout</a>
                    <!-- Modale per il logout -->
                    <div id="logout-modal" class="modal">
                        <div class="modal-content">
                            <span class="close-btn-logout">&times;</span>
                            <h2>Are you sure you want to logout?</h2>
                            <button id="logout-yes" class="btn btn-danger">Yes</button>
                            <button id="logout-no" class="btn btn-secondary">No</button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</nav>
    `;
}

/**
 * Funzione per la validazione e aggiornamento dello stato della navbar
 */
document.addEventListener('DOMContentLoaded', () => {
    const updateLoginStatus = async () => {
        try {
            const response = await fetch('/auth/status'); // Route che ritorna lo stato dell'utente
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const user = await response.json();

            const loginLink = document.getElementById('login-link');
            const logoutLink = document.getElementById('logout-link');
            const wishlistLink = document.getElementById('wishlist-link');
            const profileLink = document.getElementById('profile-link');

            if (user.loggedIn) {
                loginLink.style.display = 'none';
                logoutLink.style.display = 'block';
                wishlistLink.style.display = 'block';
                profileLink.style.display = 'block';
            } else {
                loginLink.style.display = 'block';
                logoutLink.style.display = 'none';
                wishlistLink.style.display = 'none';
                profileLink.style.display = 'none';
            }
        } catch (error) {
            console.error('Errore nel recupero dello stato utente:', error);
        }
    };

    updateLoginStatus(); // Esegui al caricamento della pagina

    // Verifica che il form esista e aggiungi la validazione al login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Evita il comportamento di submit che ricaricherebbe la pagina

            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;

            // Verifica se i campi sono vuoti
            if (!username || !password) {
                alert('Per favore, inserisci username e password.');
                return; // Interrompe l'invio se uno dei campi è vuoto
            }

            try {
                const response = await fetch('/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });

                console.log(response);  // Aggiungi un log per visualizzare la risposta del server

                if (!response.ok) {
                    // Se la risposta non è OK (401), mostra il messaggio di errore
                    const data = await response.json();
                    alert(data.error); // Mostra il messaggio d'errore
                } else {
                    // Se la login è riuscita, fai qualcosa come navigare o aggiornare l'interfaccia
                    const data = await response.json();
                    console.log('Benvenuto', data.username);
                    // Reindirizzamento o aggiornamento dello stato dell'app
                    window.location.href = '/'; // Reindirizza manualmente
                }
            } catch (error) {
                console.error('Errore nella richiesta di login:', error);
            }
        });
    } else {
        console.error("Il form di login non è stato trovato.");
    }
});
