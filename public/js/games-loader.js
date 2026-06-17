import { fetchGames, addGamesToTable,allGames } from './games.js';

document.addEventListener('DOMContentLoaded', async () => {
    const games = await fetchGames();
    allGames(games);
});
