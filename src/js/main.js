import {
  getPokemonList,
  getPokemonDetails
} from './api.js';

import {
  renderPokemonList,
  setupSearch,
  showStatus,
  hideStatus
} from './ui.js';

import {
  setupPokemonModal
} from './modal.js';

async function init() {
  try {
    showStatus('Loading...');

    const { results } = await getPokemonList(151);

    const pokemonList = await Promise.all(
      results.map((pokemon) =>
        getPokemonDetails(pokemon.url)
      )
    );

    renderPokemonList(pokemonList);

    setupSearch(pokemonList);
    setupPokemonModal(pokemonList);

    hideStatus();
  } catch (error) {
    showStatus('Unable to load.');
    console.error(error);
  }
}

init();