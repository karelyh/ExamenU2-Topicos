import { useState } from 'react';
import { usePokemonRegistry } from '../context/PokemonContext';

export default function PokemonSearch() {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const { dispatch } = usePokemonRegistry();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim().toLowerCase();

    if (trimmedQuery.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres.');
      return;
    }

    try {
      setError('');
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${trimmedQuery}`);
      
      if (res.status === 404) {
        setError('Sin resultados');
        return; 
      }
      
      if (!res.ok) throw new Error('Fallo la petición');

      const data = await res.json();
      
      dispatch({
        type: 'SET_POKEMON',
        payload: {
          pokemonId: data.id,
          pokemonName: data.name,
          imagen: data.sprites.front_default || "",
          type: data.types[0].type.name 
        }
      });
    } catch {
      setError('No se pudo consultar PokeAPI');
    }
  };

  return (
    <section className="panel" aria-labelledby="search-title">
      <div className="section-heading">
        <span className="step">01</span>
        <div>
          <h2 id="search-title">Buscar pokémon</h2>
          <p>Escribe el nombre exacto para cargarlo en el formulario.</p>
        </div>
      </div>
      <form className="ticket-form" onSubmit={handleSearch} noValidate>
        <div className="field">
          <label htmlFor="query">Nombre</label>
          <input 
            id="query" 
            name="query" 
            placeholder="Ej. pikachu" 
            autoComplete="off" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <small>Mínimo 3 caracteres.</small>
        </div>
        <div className="feedback error" aria-live="polite">{error}</div>
        <button className="button primary" type="submit">Buscar</button>
      </form>
    </section>
  );
}