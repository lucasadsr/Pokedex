const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        const pokemonData = await APIResponse.json();
        return pokemonData;
    }

}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const pokemonData = await fetchPokemon(pokemon);

    if (pokemonData) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = pokemonData.name;
        pokemonNumber.innerHTML = pokemonData.id;
        pokemonImage.src = pokemonData['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        searchPokemon = pokemonData.id;
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found!';
        pokemonNumber.innerHTML = '';
    }

    input.value = '';
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon--;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon++;
    renderPokemon(searchPokemon);
});

renderPokemon('1');