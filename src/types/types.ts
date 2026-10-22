export type PokemonDetails = {
  pokemonId: number;
  pokemonName: string;
  imagen: string;
  type: string;
};

export type RegistryEntry = {
  entryId: string;
  pokemonId: number;
  pokemonName: string;
  image: string;
  type: string;
  nickname: string;
  role: 'titular' | 'reserva';
};

export type AppState = {
  records: RegistryEntry[];
  loadedPokemon: PokemonDetails | null;
};

export type Action =
  | { type: 'SET_POKEMON'; payload: PokemonDetails | null }
  | { type: 'ADD_RECORD'; payload: RegistryEntry }
  | { type: 'REMOVE_RECORD'; payload: string };