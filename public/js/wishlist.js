document.addEventListener("DOMContentLoaded", async function() {
    const favoriteButton = document.getElementById("favorite");

    if (favoriteButton) {
        // Check if the user is logged in
        const response = await fetch('/auth/status');
        const data = await response.json();

        if (data.loggedIn) {
            const username = data.user.username;

            // Check if the game is already in the wishlist
            const gameId = window.location.pathname.split('/').pop();  // Extract the ID from the URL
            const wishlistResponse = await fetch(`/wishlist/check/${gameId}/${username}`);
            const wishlistData = await wishlistResponse.json();

            if (wishlistData.exists) {
                // Disable the button if the game is already in the wishlist
                favoriteButton.disabled = true;
                favoriteButton.textContent = "Already in Wishlist"; // Optional, change button text
            } else {
                // Enable the button if the game is not in the wishlist
                favoriteButton.disabled = false;
                favoriteButton.textContent = "Add to Favorites";
            }

            // Add click event to the button only if the game is not in the wishlist
            favoriteButton.addEventListener("click", addToFavorites);
        } else {
            // Disable the button if the user is not logged in
            favoriteButton.disabled = true;
            favoriteButton.textContent = "Log in to add to favorites"; // Optional, change button text
        }
    }
});








document.addEventListener("DOMContentLoaded", function() {
    const favoriteButton = document.getElementById("favorite");

    if (favoriteButton) {
        favoriteButton.addEventListener("click", addToFavorites);
    }
});



async function addToFavorites() {
    console.log("Funzione addToFavorites chiamata");
    const gameId = window.location.pathname.split('/').pop();  // Estrae l'ID dal URL

    const response = await fetch('/auth/status');
    const data = await response.json();

    if (data.loggedIn) {
        const username = data.user.username; // Ottieni il nome utente dalla sessione
        console.log(username);
        const addResponse = await fetch('/wishlist/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ gameId, username })
        });

        const addData = await addResponse.json();

        if (addData.success) {
            //alert('Gioco aggiunto ai preferiti!');
        } else {
            alert(addData.message);
        }
    } else {
       // alert('Devi essere loggato per aggiungere ai preferiti!');
    }
}
