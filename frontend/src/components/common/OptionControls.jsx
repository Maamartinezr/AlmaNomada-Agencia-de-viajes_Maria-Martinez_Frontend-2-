export function SortControl({ value, onChange }) {
  return (
    <label>
      Ordenar por
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="precio-asc">Precio menor a mayor</option>
        <option value="precio-desc">Precio mayor a menor</option>
        <option value="popularidad">Popularidad</option>
      </select>
    </label>
  );
}
export function RoomStepper({ value, onChange }) {
  return (
    <div className="room-stepper">
      <span id="room-count-label">Habitaciones</span>
      <div role="group" aria-labelledby="room-count-label">
        <button
          type="button"
          aria-label="Quitar una habitación"
          disabled={value <= 1}
          onClick={() => onChange(value - 1)}
        >
          −
        </button>
        <output aria-live="polite">{value}</output>
        <button
          type="button"
          aria-label="Agregar una habitación"
          disabled={value >= 25}
          onClick={() => onChange(value + 1)}
        >
          +
        </button>
      </div>
      <small>Entre 1 y 25 habitaciones</small>
    </div>
  );
}
