import {
  getPokemonList,
  getPokemonDetails
} from './api.js';

const pokemonListElement = document.querySelector('.sec-pokemon-list__content');

async function init() {
  try {
    const { results } = await getPokemonList(20);

    const pokemonList = await Promise.all(
      results.map((pokemon) => getPokemonDetails(pokemon.url))
    );

    renderPokemonList(pokemonList);
  } catch (error) {
    console.error(error);
  }
}

function renderPokemonList(pokemonList) {
  pokemonListElement.innerHTML = pokemonList
    .map((pokemon) => createPokemonCard(pokemon))
    .join('');
}

function createPokemonCard(pokemon) {
  const types = pokemon.types
    .map(({ type }) => `<span class="sec-pokemon-list__content__card__type">${type.name}</span>`)
    .join('');

  return `
    <article class="sec-pokemon-list__content__card">
      <span class="sec-pokemon-list__content__card__number">
        #${String(pokemon.id).padStart(3, '0')}
      </span>

      <img
        class="sec-pokemon-list__content__card__image"
        src="${pokemon.sprites.other['official-artwork'].front_default}"
        alt="${pokemon.name}"
        loading="lazy"
      >

      <h2 class="sec-pokemon-list__content__card__name">
        ${pokemon.name}
      </h2>

      <small class="sec-pokemon-list__content__card__types">
        ${types}
      </small>
    </article>
  `;
}

init();