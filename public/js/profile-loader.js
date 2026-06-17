document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/profile/data');

        if (!response.ok) {
            throw new Error(`Errore nel recuperare i dati del profilo: ${response.statusText}`);
        }

        const user = await response.json();

        // Iniezione dei dati nell'HTML
        document.getElementById('username').textContent = user.username;
        document.getElementById('mail').textContent = `Email: ${user.mail}`;
        document.getElementById('name').textContent = `Name: ${user.firstname}`;
        document.getElementById('lastname').textContent = `Lastname: ${user.lastname}`;
        // document.getElementById('password').textContent = `Password: ${user.password}`;

        // Immagine del profilo
        const profileImage = document.getElementById('image-profile');
        profileImage.src = user.image || '../image/usr.svg';
        profileImage.alt = `${user.firstname} ${user.lastname}`;
    } catch (error) {
        console.error('Errore nel caricamento dei dati del profilo:', error);
        document.getElementById('profile-container').innerHTML = '<p>Errore nel caricamento dei dati utente.</p>';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const editButton = document.getElementById('edit-button');
    const editForm = document.getElementById('profile-edit-form');

    editButton.addEventListener('click', (e) => {
        e.preventDefault(); // Previene il comportamento di default del link
        // Alterna la visibilità del modulo
        if (editForm.style.display === 'none' || editForm.style.display === '') {
            editForm.style.display = 'block';
            editButton.textContent = 'Cancel'; // Cambia il testo del pulsante
        } else {
            editForm.style.display = 'none';
            editButton.textContent = 'Change-Attribute';
        }
    });
});
