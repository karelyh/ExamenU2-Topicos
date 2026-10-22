import { usePokemonRegistry } from '../context/PokemonContext';

export default function RegistrySummary() {
  const { state: { records } } = usePokemonRegistry();
  
  const total = records.length;
  const titulares = records.filter(r => r.role === 'titular').length;
  const reservas = records.filter(r => r.role === 'reserva').length;

  return (
    <section className="summary" aria-label="Resumen de registros">
      <article className="stat">
        <span>Total</span>
        <strong>{total}</strong>
      </article>
      <article className="stat">
        <span>Titulares</span>
        <strong className="text-amber">{titulares}</strong>
      </article>
      <article className="stat">
        <span>Reservas</span>
        <strong className="text-green">{reservas}</strong>
      </article>
    </section>
  );
}