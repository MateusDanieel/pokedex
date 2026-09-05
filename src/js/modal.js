const modal = document.querySelector('.sec-modal');
const modalBody = document.querySelector('.sec-modal__body');
const modalClose = document.querySelector('.sec-modal__close');
const modalOverlay = document.querySelector('.sec-modal__overlay');

const prevButton = document.querySelector(
  '.sec-modal__arrow--prev'
);

const nextButton = document.querySelector(
  '.sec-modal__arrow--next'
);

const pokemonListElement = document.querySelector(
  '.sec-pokemon-list__content'
);

let currentPokemonIndex = 0;
let pokemonList = [];

export function setupPokemonModal(list) {
  pokemonList = list;

  pokemonListElement.addEventListener(
    'click',
    handlePokemonClick
  );

  modalClose.addEventListener(
    'click',
    closePokemonModal
  );

  modalOverlay.addEventListener(
    'click',
    closePokemonModal
  );

  nextButton.addEventListener(
    'click',
    showNextPokemon
  );

  prevButton.addEventListener(
    'click',
    showPreviousPokemon
  );
}

function handlePokemonClick(event) {
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
}

function renderPokemonModal(pokemon) {
  const types = pokemon.types
    .map(({ type }) => type.name)
    .join(', ');

  const abilities = pokemon.abilities
    .map(({ ability }) => ability.name)
    .join(', ');

  modalBody.innerHTML = `
    <div class="sec-modal__body__info">
      <span class="sec-modal__body__number">
        #${String(pokemon.id).padStart(3, '0')}
      </span>

      <h2 class="sec-modal__body__name">
        ${pokemon.name}
      </h2>

      <div class="sec-modal__body__details">
        <div>
          <strong>Types</strong>
          <span>${types}</span>
        </div>

        <div>
          <strong>Height</strong>
          <span>${pokemon.height / 10} m</span>
        </div>

        <div>
          <strong>Weight</strong>
          <span>${pokemon.weight / 10} kg</span>
        </div>

        <div>
          <strong>Abilities</strong>
          <span>${abilities}</span>
        </div>
      </div>
    </div>

    <div class="sec-modal__body__artwork">
      <img
        src="${pokemon.sprites.other['official-artwork'].front_default}"
        alt="${pokemon.name}"
      >
    </div>
  `;
}

function openPokemonModal(pokemon) {
  currentPokemonIndex = pokemonList.findIndex(
    (item) => item.id === pokemon.id
  );

  renderPokemonModal(pokemon);

  modal.hidden = false;

  document.body.classList.add(
    'modal-open'
  );
}

function closePokemonModal() {
  modal.hidden = true;

  document.body.classList.remove(
    'modal-open'
  );
}

function showNextPokemon() {
  currentPokemonIndex++;

  if (currentPokemonIndex >= pokemonList.length) {
    currentPokemonIndex = 0;
  }

  renderPokemonModal(
    pokemonList[currentPokemonIndex]
  );
}

function showPreviousPokemon() {
  currentPokemonIndex--;

  if (currentPokemonIndex < 0) {
    currentPokemonIndex =
      pokemonList.length - 1;
  }

  renderPokemonModal(
    pokemonList[currentPokemonIndex]
  );
}