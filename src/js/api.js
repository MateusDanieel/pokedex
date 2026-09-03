const BASE_URL = 'https://pokeapi.co/api/v2';

export async function getPokemonList(limit = 20, offset = 0) {
  const response = await fetch(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
  );

  if (!response.ok) {
    throw new Error('Erro ao buscar Pokémon');
  }

  return response.json();
}

export async function getPokemonDetails(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Erro ao buscar detalhes do Pokémon');
  }

  return response.json();
}