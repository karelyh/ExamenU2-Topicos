import type { RegistryEntry } from '../context/PokemonContext'

interface RegistryItemProps {
  record: RegistryEntry
  onRemove: () => void
}

export default function RegistryItem({ record, onRemove }: RegistryItemProps) {
  return (
    <article className="ticket">
      <div className="ticket-top">
        <span className="ticket-id">Registro #{record.pokemonId}</span>
        <div className="badges">
          <span className={`badge type-${record.type}`}>{record.type}</span>
          <span className={`badge role-${record.role}`}>
            {record.role === 'titular' ? 'Titular' : 'Reserva'}
          </span>
        </div>
      </div>
      <div className="preview">
        {record.image && <img src={record.image} alt="" width={72} height={72} />}
        <div>
          <h3>{record.nickname}</h3>
          <p className="requester">#{record.pokemonId} {record.pokemonName}</p>
        </div>
      </div>
      <div className="ticket-actions">
        <button className="button danger" type="button" onClick={onRemove}>
          Eliminar
        </button>
      </div>
    </article>
  );
}