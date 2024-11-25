export function navbarInject() {
    return `


    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">
      <img src="../../image/steam_color.svg" width="30" height="30" class="d-inline-block align-top">
      Valvole
    </a>

    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <a class="nav-link" href="/whis" id="wishlist-link" >Wish</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/profile" id="profile-link">Profile</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" id="login-link">Login</a>

          <!-- Modale per il login -->
          <div id="login-modal" class="modal">
            <div class="modal-content">
              <span class="close-btn">&times;</span>
              <h2>Login</h2>
              <form id="login-form">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required>

                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required>

                <button type="submit" id="login-button">Login</button>
              </form>
              <hr>
              <h2>Registrazione</h2>
              <form id="register-form">

                <label for="reg-name">Name:</label>
                <input type="text" id="reg-name" name="name" required>

                <label for="reg-lastname">Lastname:</label>
                <input type="text" id="reg-lastname" name="lastname" required>

                <label for="reg-username">Username:</label>
                <input type="text" id="reg-username" name="username" required>

                <label for="reg-mail">E-mail:</label>
                <input type="mail" id="reg-mail" name="mail" required>

                <label for="reg-password">Password:</label>
                <input type="password" id="reg-password" name="password" required>


                <button type="submit">Registrati</button>
              </form>
            </div>
          </div>



        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" id="logout-link" >Logout</a>
        </li>
      </ul>
    </div>
  </div>
</nav>`
}