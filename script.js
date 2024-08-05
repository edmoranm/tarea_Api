document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const characterContainer = document.getElementById('character-container');

    const fetchCharacterByName = async (name) => {
        try {
            const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${name}`);
            const data = await response.json();
            if (data.results) {
                displayCharacter(data.results[0]);
            } else {
                displayCharacter(null);
            }
        } catch (error) {
            console.error('Error fetching character:', error);
            displayCharacter(null);
        }
    };

    const displayCharacter = (character) => {
        characterContainer.innerHTML = '';
        if (character) {
            const characterDiv = document.createElement('div');
            characterDiv.classList.add('character');

            characterDiv.innerHTML = `
                <img src="${character.image}" alt="${character.name}">
                <h2>${character.name}</h2>
                <p>Status: ${character.status}</p>
                <p>Species: ${character.species}</p>
                <p>Gender: ${character.gender}</p>
                <p>Origin: ${character.origin.name}</p>
                <p>Location: ${character.location.name}</p>
            `;

            characterContainer.appendChild(characterDiv);
        } else {
            characterContainer.innerHTML = '<p>Character not found.</p>';
        }
    };

    searchButton.addEventListener('click', () => {
        const name = searchInput.value.trim();
        if (name) {
            fetchCharacterByName(name);
        }
    });
});
