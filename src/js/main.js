import {
  getPokemonList,
  getPokemonDetails
} from './api.js';

const pokemonListElement = document.querySelector('.sec-pokemon-list__content');

const searchInput = document.querySelector(
  '.sec-pokemon-list__search'
);

const modal = document.querySelector('.pokemon-modal');
const modalBody = document.querySelector('.pokemon-modal__body');
const modalClose = document.querySelector('.pokemon-modal__close');
const modalOverlay = document.querySelector('.pokemon-modal__overlay');

const prevButton = document.querySelector(
  '.pokemon-modal__arrow--prev'
);

const nextButton = document.querySelector(
  '.pokemon-modal__arrow--next'
);

let pokemonList = [];

let currentPokemonIndex = 0;



pokemonListElement.addEventListener('click', (event) => {
  const card = event.target.closest(
    '.sec-pokemon-list__content__card'
  );

  if (!card) return;

  const pokemonId = Number(card.dataset.id);

  const pokemon = pokemonList.find(
    (pokemon) => pokemon.id === pokemonId
  );

  if (!pokemon) return;

  openPokemonModal(pokemon);
});

async function init() {
  try {
    const { results } = await getPokemonList(151);

    pokemonList = await Promise.all(
      results.map((pokemon) => getPokemonDetails(pokemon.url))
    );

    renderPokemonList(pokemonList);
  } catch (error) {
    console.error(error);
  }
}

searchInput.addEventListener('input', (event) => {
  const searchTerm = event.target.value
    .toLowerCase()
    .trim();

  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm)
  );

  renderPokemonList(filteredPokemon);
});

function renderPokemonList(pokemonList) {
   if (!pokemonList.length) {
    pokemonListElement.innerHTML = `
      <p class="sec-pokemon-list__empty">
        Nenhum Pokémon encontrado.
      </p>
    `;

    return;
  }

  pokemonListElement.innerHTML = pokemonList
    .map((pokemon) => createPokemonCard(pokemon))
    .join('');
}

function createPokemonCard(pokemon) {
  const types = pokemon.types
    .map(({ type }) => `<span class="sec-pokemon-list__content__card__type">${type.name}</span>`)
    .join('');

  return `
    <article class="sec-pokemon-list__content__card" data-id="${pokemon.id}">
    
      <img
        class="sec-pokemon-list__content__card__image"
        src="${pokemon.sprites.other['official-artwork'].front_default}"
        alt="${pokemon.name}"
        loading="lazy"
      >

      <h2 class="sec-pokemon-list__content__card__name">
        ${pokemon.name}
      </h2>

    </article>
  `;
}

function renderPokemonModal(pokemon) {
  const types = pokemon.types
    .map(({ type }) => type.name)
    .join(', ');

  const abilities = pokemon.abilities
    .map(({ ability }) => ability.name)
    .join(', ');

  modalBody.innerHTML = `
    <img
      src="${pokemon.sprites.other['official-artwork'].front_default}"
      alt="${pokemon.name}"
    >

    <span>#${String(pokemon.id).padStart(3, '0')}</span>

    <h2>${pokemon.name}</h2>

    <p><strong>Tipo:</strong> ${types}</p>
    <p><strong>Altura:</strong> ${pokemon.height / 10} m</p>
    <p><strong>Peso:</strong> ${pokemon.weight / 10} kg</p>
    <p><strong>Habilidades:</strong> ${abilities}</p>
  `;
}

function openPokemonModal(pokemon) {
  currentPokemonIndex = pokemonList.findIndex(
    (item) => item.id === pokemon.id
  );

  renderPokemonModal(pokemon);
  modal.hidden = false;
  document.body.classList.add('modal-open');
}

function closePokemonModal() {
  modal.hidden = true;
  document.body.classList.remove('modal-open');
}

modalClose.addEventListener('click', closePokemonModal);
modalOverlay.addEventListener('click', closePokemonModal);

nextButton.addEventListener('click', () => {
  currentPokemonIndex++;

  if (currentPokemonIndex >= pokemonList.length) {
    currentPokemonIndex = 0;
  }

  renderPokemonModal(pokemonList[currentPokemonIndex]);
});

prevButton.addEventListener('click', () => {
  currentPokemonIndex--;

  if (currentPokemonIndex < 0) {
    currentPokemonIndex = pokemonList.length - 1;
  }

  renderPokemonModal(pokemonList[currentPokemonIndex]);
});

init();