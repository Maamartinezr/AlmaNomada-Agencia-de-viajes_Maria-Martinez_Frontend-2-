import { Photo } from "../common/UI";
import { availableStay, money, roomRate } from "../../utils/travel";
export default function HotelCard({ hotel: h, trip, onSelect }) {
  const enough = trip.habitaciones * 2 >= trip.viajeras;
  const available =
    h.disponible &&
    h.habitacionesDisponibles >= trip.habitaciones &&
    availableStay(h, trip.fechaSalida, trip.noches) &&
    enough;
  const type = h.tiposHabitacion.find((t) => t.id === trip.tipoHabitacion);
  return (
    <article className="hotel-card">
      <Photo src={h.imagen} alt={`Ambientación ilustrativa de ${h.ciudad}`} />
      <div className="card-content">
        <span className="stars" aria-label={`${h.categoria} estrellas`}>
          {"★".repeat(h.categoria)}
        </span>
        <h3>{h.nombre}</h3>
        <p>
          {h.ciudad} · {type.nombre} · hasta 2 viajeras por habitación
        </p>
        <div className="tags">
          {h.servicios.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
        <p>
          {trip.habitaciones} de {h.habitacionesDisponibles} habitaciones
          disponibles · {trip.noches} noches
        </p>
        <p className={available ? "availability" : "unavailable"}>
          {available
            ? "Disponible para tu estancia"
            : !enough
              ? "Aumenta las habitaciones para alojar a todas las viajeras"
              : "Sin disponibilidad para esta selección"}
        </p>
        <p>
          <strong className="price">{money(roomRate(h, trip))}</strong> CLP /
          noche / habitación
          <br />
          <strong>
            {money(roomRate(h, trip) * trip.noches * trip.habitaciones)}
          </strong>{" "}
          CLP por toda la estancia
        </p>
        <button className="btn" disabled={!available} onClick={onSelect}>
          Seleccionar hotel
        </button>
      </div>
    </article>
  );
}
