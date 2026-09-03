import { getPokemonList, getPokemonDetails } from './api.js';

async function init() {
  try {
    const { results } = await getPokemonList();

    const pokemonList = await Promise.all(
      results.map((pokemon) => getPokemonDetails(pokemon.url))
    );

    console.log(pokemonList);
  } catch (error) {
    console.error(error);
  }
}

init();