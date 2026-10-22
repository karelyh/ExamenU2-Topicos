import { useActionState } from 'react';
import { usePokemonRegistry } from '../context/PokemonContext'

type ActionState = {
  success: string | null;
  errorGeneral: string | null;
  fieldErrors: { nickname?: string; role?: string };
};

export default function PokemonForm() {
  const { state: { loadedPokemon }, dispatch } = usePokemonRegistry();

  const registerAction = async (prevState: ActionState, formData: FormData): Promise<ActionState> => {
    if (!loadedPokemon) {
      return { success: null, errorGeneral: 'No hay pokémon cargado válido.', fieldErrors: {} };
    }

    const nickname = formData.get('nickname')?.toString().trim() || '';
    const role = formData.get('role')?.toString() as 'titular' | 'reserva';
    const fieldErrors: ActionState['fieldErrors'] = {};

    if (nickname.length < 3) fieldErrors.nickname = 'El apodo debe tener al menos 3 caracteres.';
    if (role !== 'titular' && role !== 'reserva') fieldErrors.role = 'Debe seleccionar un rol válido.';

    if (Object.keys(fieldErrors).length > 0) {
      return { success: null, errorGeneral: null, fieldErrors };
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));

    dispatch({
      type: 'ADD_RECORD',
      payload: {
        entryId: crypto.randomUUID(),
        pokemonId: loadedPokemon.pokemonId,
        pokemonName: loadedPokemon.pokemonName,
        image: loadedPokemon.imagen,
        type: loadedPokemon.type,
        nickname,
        role
      }
    });

    return { success: 'Pokémon registrado correctamente', errorGeneral: null, fieldErrors: {} };
  };

  const [formState, formAction, isPending] = useActionState(registerAction, { success: null, errorGeneral: null, fieldErrors: {} });

  return (
    <section className="panel" aria-labelledby="form-title">
      <div className="section-heading">
        <span className="step">02</span>
        <div>
          <h2 id="form-title">Datos del pokémon</h2>
          <p>La búsqueda llena estos campos. Después simula el registro.</p>
        </div>
      </div>
      <form className="ticket-form" action={formAction} noValidate>
        <div className="preview">
          {loadedPokemon?.imagen && (
            <img src={loadedPokemon.imagen} alt="" width={72} height={72} style={{ borderRadius: '12px', border: '1px solid #f3d7c8', background: '#fff8f4' }} />
          )}
          <div>
            <p className="ticket-id">{loadedPokemon ? 'Pokémon seleccionado' : 'Sin selección'}</p>
            <strong>{loadedPokemon ? loadedPokemon.pokemonName : 'Ningún pokémon cargado'}</strong>
          </div>
        </div>

        <div className="field">
          <label htmlFor="pokemonId">Número</label>
          <input id="pokemonId" name="pokemonId" value={loadedPokemon?.pokemonId || ''} readOnly />
        </div>
        <div className="field">
          <label htmlFor="pokemonName">Nombre</label>
          <input id="pokemonName" name="pokemonName" value={loadedPokemon?.pokemonName || ''} readOnly />
        </div>
        <div className="field">
          <label htmlFor="type">Tipo</label>
          <input id="type" name="type" value={loadedPokemon?.type || ''} readOnly />
        </div>

        <div className="field">
          <label htmlFor="nickname">Apodo</label>
          <input id="nickname" name="nickname" placeholder="Ej. Chispa" disabled={!loadedPokemon} />
          <small>Mínimo 3 caracteres.</small>
          {formState.fieldErrors.nickname && <span className="field-error">{formState.fieldErrors.nickname}</span>}
        </div>
        
        <div className="field">
          <label htmlFor="role">Rol</label>
          <select id="role" name="role" defaultValue="" disabled={!loadedPokemon}>
            <option value="">Selecciona un rol</option>
            <option value="titular">Titular</option>
            <option value="reserva">Reserva</option>
          </select>
          {formState.fieldErrors.role && <span className="field-error">{formState.fieldErrors.role}</span>}
        </div>

        <div className="feedback error" aria-live="polite">{formState.errorGeneral}</div>
        {!isPending && <div className="feedback success" aria-live="polite">{formState.success}</div>}

        <button className="button primary" type="submit" disabled={isPending || !loadedPokemon}>
          {isPending ? 'Registrando...' : 'Registrar pokémon'}
        </button>
      </form>
    </section>
  );
}