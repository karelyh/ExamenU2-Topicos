import { createContext, useReducer, useContext} from 'react';
import type {ReactNode, Dispatch } from 'react'

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

const initialState: AppState = {
  records: [],
  loadedPokemon: null,
};

function pokemonReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_POKEMON':
      return { ...state, loadedPokemon: action.payload };
    case 'ADD_RECORD':
      return { ...state, records: [...state.records, action.payload] };
    case 'REMOVE_RECORD':
      return { ...state, records: state.records.filter(r => r.entryId !== action.payload) };
    default:
      return state;
  }
}

type PokemonContextType = {
  state: AppState;
  dispatch: Dispatch<Action>;
};

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export function PokemonProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(pokemonReducer, initialState);
  return (
    <PokemonContext.Provider value={{ state, dispatch }}>
      {children}
    </PokemonContext.Provider>
  );
}

export function usePokemonRegistry() {
  const context = useContext(PokemonContext);
  if (!context) throw new Error('Debe usarse dentro de un PokemonProvider');
  return context;
}