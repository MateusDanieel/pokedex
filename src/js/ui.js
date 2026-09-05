const pokemonListElement = document.querySelector(
  '.sec-pokemon-list__content'
);

const searchInput = document.querySelector(
  '.sec-pokemon-list__search'
);

const statusElement = document.querySelector(
  '.sec-pokemon-list__status'
);

export function renderPokemonList(pokemonList) {
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
  return `
      <article
        class="sec-pokemon-list__content__card"
        data-id="${pokemon.id}"
      >
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

export function setupSearch(pokemonList) {
  searchInput.addEventListener('input', (event) => {
    const searchTerm = event.target.value
      .toLowerCase()
      .trim();

    const filteredPokemon = pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm)
    );

    renderPokemonList(filteredPokemon);
  });
}

export function showStatus(message) {
  statusElement.textContent = message;
  statusElement.hidden = false;
}

export function hideStatus() {
  statusElement.hidden = true;
}