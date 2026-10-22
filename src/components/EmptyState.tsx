export default function EmptyState() {
  return (
    <div className="empty-state">
      <span className="empty-symbol" aria-hidden="true">＋</span>
      <h3>No hay pokémon registrados</h3>
      <p>Busca uno, cárgalo en el formulario y simula el registro.</p>
    </div>
  );
}
