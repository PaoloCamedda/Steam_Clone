import { navbarInject } from './navbar.js';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('navbar').innerHTML = navbarInject();
});
