import EmptyState from './EmptyState.tsx';
import RegistryItem from './RegistryItem.tsx';
import { usePokemonRegistry } from '../context/PokemonContext';

export default function RegistryList() {
  const { state: { records }, dispatch } = usePokemonRegistry();

  return (
    <section className="panel list-panel" aria-labelledby="list-title">
      <div className="section-heading">
        <span className="step">03</span>
        <div>
          <h2 id="list-title">Registros</h2>
          <p>Cada envío simulado agrega una tarjeta al final.</p>
        </div>
      </div>
      
      <div className="ticket-list">
        {records.length === 0 ? (
          <EmptyState />
        ) : (
          records.map(record => (
            <RegistryItem 
              key={record.entryId} 
              record={record} 
              onRemove={() => dispatch({ type: 'REMOVE_RECORD', payload: record.entryId })} 
            />
          ))
        )}
      </div>
    </section>
  );
}