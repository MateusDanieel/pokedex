import {
  getPokemonList,
  getPokemonDetails
} from './api.js';

import {
  renderPokemonList,
  setupSearch
} from './ui.js';

import {
  setupPokemonModal
} from './modal.js';

async function init() {
  try {
    const { results } = await getPokemonList(151);

    const pokemonList = await Promise.all(
      results.map((pokemon) =>
        getPokemonDetails(pokemon.url)
      )
    );

    renderPokemonList(pokemonList);

    setupSearch(pokemonList);

    setupPokemonModal(pokemonList);
  } catch (error) {
    console.error(error);
  }
}

init();